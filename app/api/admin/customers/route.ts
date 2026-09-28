import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'
import { hash } from 'bcryptjs'

const customerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  dateOfBirth: z.string().optional().nullable(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  segment: z.enum(['REGULAR', 'VIP', 'AT_RISK', 'INACTIVE', 'NEW']).default('NEW'),
  referralCode: z.string().optional(),
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

    const where: any = { role: 'CUSTOMER' }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ]
    }

    const skip = (page - 1) * limit

    const [customers, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          wallet: { select: { balance: true, totalEarned: true, totalRedeemed: true } },
          memberships: { select: { status: true, plan: { select: { name: true } } } },
          _count: { select: { bookings: true, reviews: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ])

    return NextResponse.json({
      customers,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = customerSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email: validated.data.email } })
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    const passwordHash = await hash('TempPass123!', 12)
    const referralCode = validated.data.referralCode || generateReferralCode()

    const user = await prisma.user.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        phone: validated.data.phone,
        passwordHash,
        role: 'CUSTOMER',
        isVerified: true,
        referralCode,
      },
    })

    await prisma.wallet.create({
      data: { userId: user.id },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating customer:', error)
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
  }
}

function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}