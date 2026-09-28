import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const updateOfferSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SERVICE', 'BUY_ONE_GET_ONE']).optional(),
  discountValue: z.number().min(0).optional(),
  code: z.string().optional().nullable(),
  minAmount: z.number().min(0).optional(),
  maxDiscount: z.number().optional().nullable(),
  validFrom: z.string().optional(),
  validTill: z.string().optional(),
  isActive: z.boolean().optional(),
  serviceIds: z.array(z.string().cuid()).optional(),
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

    const offer = await prisma.offer.findUnique({
      where: { id },
      include: {
        services: { include: { service: { select: { id: true, name: true } } } },
        _count: { select: { services: true } },
      },
    })

    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
    }

    return NextResponse.json(offer)
  } catch (error) {
    console.error('Error fetching offer:', error)
    return NextResponse.json({ error: 'Failed to fetch offer' }, { status: 500 })
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
      title: z.string().min(2).optional(),
      description: z.string().optional(),
      discountType: z.enum(['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SERVICE', 'BUY_ONE_GET_ONE']).optional(),
      discountValue: z.number().min(0).optional(),
      code: z.string().optional().nullable(),
      minAmount: z.number().min(0).optional(),
      maxDiscount: z.number().optional().nullable(),
      validFrom: z.string().optional(),
      validTill: z.string().optional(),
      isActive: z.boolean().optional(),
      serviceIds: z.array(z.string().cuid()).optional(),
    }).safeParse(body)

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const { serviceIds, validFrom, validTill, ...data } = validated.data

    const updateData: any = { ...data }
    if (validFrom) updateData.validFrom = new Date(validFrom)
    if (validTill) updateData.validTill = new Date(validTill)
    if (serviceIds !== undefined) {
      updateData.services = {
        deleteMany: {},
        create: serviceIds.map(sid => ({ serviceId: sid })),
      }
    }

    const offer = await prisma.offer.update({
      where: { id },
      data: updateData,
      include: { services: { include: { service: { select: { id: true, name: true } } } } },
    })

    return NextResponse.json(offer)
  } catch (error) {
    console.error('Error updating offer:', error)
    return NextResponse.json({ error: 'Failed to update offer' }, { status: 500 })
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

    await prisma.offer.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting offer:', error)
    return NextResponse.json({ error: 'Failed to delete offer' }, { status: 500 })
  }
}