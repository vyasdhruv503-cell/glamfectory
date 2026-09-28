import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const updateServiceSchema = z.object({
  name: z.string().min(2).optional(),
  categoryId: z.string().cuid().optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  duration: z.number().int().min(5).optional(),
  discountPrice: z.number().min(0).optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  galleryUrls: z.array(z.string().url()).optional(),
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

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        addOns: true,
        stylists: { include: { stylist: { select: { id: true, name: true, user: { select: { name: true } } } } } },
        _count: { select: { bookings: true, reviews: true } },
      },
    })

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error) {
    console.error('Error fetching service:', error)
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 })
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
      categoryId: z.string().cuid().optional(),
      description: z.string().optional(),
      price: z.number().min(0).optional(),
      duration: z.number().int().min(5).optional(),
      discountPrice: z.number().min(0).optional().nullable(),
      imageUrl: z.string().url().optional().nullable(),
      galleryUrls: z.array(z.string().url()).optional(),
      benefits: z.array(z.string()).optional(),
      isActive: z.boolean().optional(),
    }).safeParse(await request.json())

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const updateData: any = {}
    if (validated.data.name !== undefined) updateData.name = validated.data.name
    if (validated.data.categoryId) updateData.categoryId = validated.data.categoryId
    if (validated.data.description !== undefined) updateData.description = validated.data.description
    if (validated.data.price !== undefined) updateData.price = validated.data.price
    if (validated.data.duration !== undefined) updateData.duration = validated.data.duration
    if (validated.data.discountPrice !== undefined) updateData.discountPrice = validated.data.discountPrice
    if (validated.data.imageUrl !== undefined) updateData.imageUrl = validated.data.imageUrl
    if (validated.data.galleryUrls !== undefined) updateData.galleryUrls = validated.data.galleryUrls
    if (validated.data.benefits !== undefined) updateData.benefits = validated.data.benefits
    if (validated.data.isActive !== undefined) updateData.isActive = validated.data.isActive

    const service = await prisma.service.update({
      where: { id },
      data: updateData,
      include: { category: { select: { id: true, name: true, slug: true } } },
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
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

    await prisma.service.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}