import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const updateCustomerSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
  dateOfBirth: z.string().optional().nullable(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  segment: z.enum(['REGULAR', 'VIP', 'AT_RISK', 'INACTIVE', 'NEW']).optional(),
  referralCode: z.string().optional().nullable(),
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

    const customer = await prisma.user.findUnique({
      where: { id },
      include: {
        wallet: { select: { balance: true, totalEarned: true, totalRedeemed: true } },
        loyaltyTxns: { take: 10, orderBy: { createdAt: 'desc' } },
        memberships: { include: { plan: true } },
        bookings: { take: 10, orderBy: { scheduledAt: 'desc' } },
        reviews: { take: 5, orderBy: { createdAt: 'desc' } },
        referralsAsReferrer: { take: 10 },
      },
    })

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    return NextResponse.json(customer)
  } catch (error) {
    console.error('Error fetching customer:', error)
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 })
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
    const validated = updateCustomerSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const updateData: any = {}
    if (validated.data.name) updateData.name = validated.data.name
    if (validated.data.email) updateData.email = validated.data.email
    if (validated.data.phone) updateData.phone = validated.data.phone
    if (validated.data.referralCode !== undefined) updateData.referralCode = validated.data.referralCode

    const customer = await prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        wallet: { select: { balance: true, totalEarned: true, totalRedeemed: true } },
        memberships: { include: { plan: true } },
      },
    })

    return NextResponse.json(customer)
  } catch (error) {
    console.error('Error updating customer:', error)
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 })
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

    await prisma.user.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting customer:', error)
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 })
  }
}