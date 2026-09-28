import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const membershipPlanSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().min(0),
  duration: z.number().int().min(30),
  discountPercent: z.number().min(0).max(100).default(0),
  freeServices: z.number().int().min(0).default(0),
  benefits: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
})

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [plans, subscriptions] = await Promise.all([
      prisma.membershipPlan.findMany({
        orderBy: { price: 'asc' },
        include: { memberships: { select: { id: true, status: true } } },
      }),
      prisma.membership.findMany({
        include: {
          user: { select: { id: true, name: true, email: true } },
          plan: { select: { id: true, name: true, price: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    return NextResponse.json({ plans, subscriptions })
  } catch (error) {
    console.error('Error fetching memberships:', error)
    return NextResponse.json({ error: 'Failed to fetch memberships' }, { status: 500 })
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
      description: z.string().optional(),
      price: z.number().min(0),
      duration: z.number().int().min(30),
      discountPercent: z.number().min(0).max(100).default(0),
      freeServices: z.number().int().min(0).default(0),
      benefits: z.array(z.string()).optional(),
      isActive: z.boolean().default(true),
    }).safeParse(body)

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const plan = await prisma.membershipPlan.create({
      data: validated.data,
    })

    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    console.error('Error creating membership plan:', error)
    return NextResponse.json({ error: 'Failed to create membership plan' }, { status: 500 })
  }
}