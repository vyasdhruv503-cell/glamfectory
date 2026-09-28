import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const staffSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  role: z.enum(['STYLIST', 'MANAGER', 'RECEPTIONIST']),
  specialization: z.array(z.string()).optional(),
  experience: z.number().int().min(0).default(0),
  commissionRate: z.number().min(0).max(100).default(0),
  isActive: z.boolean().default(true),
})

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1')
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20')
    const search = request.nextUrl.searchParams.get('search')
    const role = request.nextUrl.searchParams.get('role')
    const isActive = request.nextUrl.searchParams.get('isActive')

    const where: any = {}
    if (role) where.role = role
    if (isActive !== null) where.isActive = isActive === 'true'
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ]
    }

    const [staff, total] = await Promise.all([
      prisma.staff.findMany({
        where,
        include: {
          user: { select: { id: true, email: true, name: true, role: true, image: true } },
          services: { include: { service: { select: { id: true, name: true } } } },
          availability: true,
          _count: { select: { bookings: true, reviews: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.staff.count({ where }),
    )

    return NextResponse.json({
      staff,
      pagination: { page: 1, limit: 20, total: staff.length, pages: 1 },
    })
  } catch (error) {
    console.error('Error fetching staff:', error)
    return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      phone: z.string().min(10),
      role: z.enum(['STYLIST', 'MANAGER', 'RECEPTIONIST']),
      specialization: z.array(z.string()).optional(),
      experience: z.number().int().min(0).default(0),
      commissionRate: z.number().min(0).max(100).default(0),
      isActive: z.boolean().default(true),
    }).safeParse(await request.json())

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const passwordHash = await import('bcryptjs').then(m => m.hash('staff123', 12))

    const user = await prisma.user.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        phone: validated.data.phone,
        passwordHash: await hash('staff123', 12),
        role: validated.data.role,
        isVerified: true,
        referralCode: validated.data.name.toUpperCase().replace(/\s+/g, '') + '2024',
      },
    })

    const staff = await prisma.staff.create({
      data: {
        userId: user.id,
        bio: '',
        experience: validated.data.experience,
        specialization: validated.data.specialization || [],
        commissionRate: validated.data.commissionRate,
        isActive: validated.data.isActive,
        avgRating: 0,
        totalReviews: 0,
      },
      include: { user: { select: { id: true, email: true, name: true, role: true } } },
    })

    return NextResponse.json(staff, { status: 201 })
  } catch (error) {
    console.error('Error creating staff:', error)
    return NextResponse.json({ error: 'Failed to create staff member' }, { status: 500 })
  }
}

async function hash(password: string) {
  const bcrypt = await import('bcryptjs')
  return bcrypt.hash(password, 12)
}