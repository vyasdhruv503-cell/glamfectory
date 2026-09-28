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

    const { searchParams } = new URL(request.url)
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1')
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20')
    const search = request.nextUrl.searchParams.get('search')
    const segment = request.nextUrl.searchParams.get('segment')

    const where: any = {}
    if (segment) where.segment = segment
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ]
    }

    const skip = (page - 1) * limit

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        include: {
          user: { select: { id: true, email: true, name: true, role: true } },
          wallet: { select: { balance: true, totalEarned: true, totalRedeemed: true } },
          membership: { select: { status: true, plan: { select: { name: true } } } },
          _count: { select: { appointments: true, reviews: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.customer.count({ where }),
    )

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
    const validated = customerSchema.safeParse(await request.json())

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const { name, email, phone, dateOfBirth, gender, segment, referralCode } = validated.data

    const existingUser = await prisma.user.findUnique({ where: { email: validated.data.email } })
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    const passwordHash = await hash('TempPass123!', 12)
    const referralCode = generateReferralCode()

    const user = await prisma.user.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        phone: validated.data.phone,
        passwordHash: await hash('TempPass123!', 12),
        role: 'CUSTOMER',
        isVerified: true,
        referralCode,
      },
    )

    const customer = await prisma.customer.create({
      data: {
        userId: user.id,
        name: validated.data.name,
        email: validated.data.email,
        phone: validated.data.phone,
        dateOfBirth: validated.data.dateOfBirth ? new Date(validated.data.dateOfBirth) : null,
        gender: validated.data.gender,
        segment: validated.data.segment,
        referralCode,
      },
    })

    await prisma.wallet.create({
      data: { userId: user.id },
    })

    return NextResponse.json(customer, { status: 201 })
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

async function hash(password: string) {
  const bcrypt = await import('bcryptjs')
  return bcrypt.hash(password, 12)
}