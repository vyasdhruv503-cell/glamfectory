import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'
import { hash } from 'bcryptjs'

const staffSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  role: z.enum(['STYLIST', 'ADMIN', 'CUSTOMER']).default('STYLIST'),
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

    const page = parseInt(request.nextUrl.searchParams.get('page') || '1')
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20')
    const search = request.nextUrl.searchParams.get('search')
    const isActive = request.nextUrl.searchParams.get('isActive')

    const where: any = {}
    if (isActive !== null && isActive !== undefined) where.isActive = isActive === 'true'
    if (search) {
      where.user = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search } },
        ],
      }
    }

    const [staff, total] = await Promise.all([
      prisma.stylist.findMany({
        where,
        include: {
          user: { select: { id: true, email: true, name: true, role: true, avatarUrl: true } },
          services: { include: { service: { select: { id: true, name: true } } } },
          availability: true,
          _count: { select: { bookings: true, reviews: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.stylist.count({ where }),
    ])

    return NextResponse.json({
      staff,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
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
    const validated = staffSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const passwordHash = await hash('staff123', 12)

    const user = await prisma.user.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        phone: validated.data.phone,
        passwordHash,
        role: validated.data.role,
        isVerified: true,
        referralCode: validated.data.name.toUpperCase().replace(/\s+/g, '') + '2024',
      },
    })

    const staff = await prisma.stylist.create({
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