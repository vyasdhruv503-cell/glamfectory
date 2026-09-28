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

    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, name: true, role: true, createdAt: true } },
        wallet: { select: { balance: true, totalEarned: true, totalRedeemed: true } },
        loyaltyTxns: { take: 10, orderBy: { createdAt: 'desc' } },
        membership: { include: { plan: true } },
        appointments: { take: 10, orderBy: { scheduledAt: 'desc' } },
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
    const validated = z.object({
      name: z.string().min(2).optional(),
      email: z.string().email().optional(),
      phone: z.string().min(10).optional(),
      dateOfBirth: z.string().optional(),
      gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
      segment: z.enum(['REGULAR', 'VIP', 'AT_RISK', 'INACTIVE', 'NEW']).optional(),
      referralCode: z.string().optional(),
    }).safeParse(await request.json())

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const updateData: any = {}
    if (validated.data.name) updateData.name = validated.data.name
    if (validated.data.email) updateData.email = validated.data.email
    if (validated.data.phone) updateData.phone = validated.data.phone
    if (validated.data.dateOfBirth !== undefined) updateData.dateOfBirth = validated.data.dateOfBirth ? new Date(validated.data.dateOfBirth) : null
    if (validated.data.gender) updateData.gender = validated.data.gender
    if (validated.data.segment) updateData.segment = validated.data.segment
    if (validated.data.referralCode !== undefined) updateData.referralCode = validated.data.referralCode

    const customer = await prisma.customer.update({
      where: { id },
      data: updateData,
      include: {
        user: { select: { id: true, email: true, name: true, role: true } },
        wallet: { select: { balance: true, totalEarned: true, totalRedeemed: true } },
        membership: { include: { plan: true } },
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

    await prisma.customer.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting customer:', error)
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 })
  }
}