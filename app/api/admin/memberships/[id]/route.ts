import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const updateMembershipPlanSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  duration: z.number().int().min(30).optional(),
  discountPercent: z.number().min(0).max(100).optional(),
  freeServices: z.number().int().min(0).optional(),
  benefits: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const plan = await prisma.membershipPlan.findUnique({
      where: { id },
      include: {
        memberships: {
          include: { user: { select: { id: true, name: true, email: true } } },
        },
      },
    })

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    return NextResponse.json(plan)
  } catch (error) {
    console.error('Error fetching membership plan:', error)
    return NextResponse.json({ error: 'Failed to fetch plan' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const validated = z.object({
      name: z.string().min(2).optional(),
      description: z.string().optional(),
      price: z.number().min(0).optional(),
      duration: z.number().int().min(30).optional(),
      discountPercent: z.number().min(0).max(100).optional(),
      freeServices: z.number().int().min(0).optional(),
      benefits: z.array(z.string()).optional(),
      isActive: z.boolean().optional(),
    }).safeParse(body)

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const plan = await prisma.membershipPlan.update({
      where: { id },
      data: validated.data,
    })

    return NextResponse.json(plan)
  } catch (error) {
    console.error('Error updating membership plan:', error)
    return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    await prisma.membershipPlan.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting membership plan:', error)
    return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 })
  }
}