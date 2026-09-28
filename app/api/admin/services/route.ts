import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const serviceSchema = z.object({
  name: z.string().min(2),
  categoryId: z.string().cuid(),
  description: z.string().optional(),
  price: z.number().min(0),
  duration: z.number().int().min(5),
  discountPrice: z.number().min(0).optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  galleryUrls: z.array(z.string().url()).optional(),
  benefits: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
}

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
    const categoryId = request.nextUrl.searchParams.get('categoryId')
    const isActive = request.nextUrl.searchParams.get('isActive')

    const where: any = {}
    if (categoryId) where.categoryId = categoryId
    if (isActive !== null) where.isActive = isActive === 'true'
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          addOns: true,
          stylists: { include: { stylist: { select: { id: true, name: true } } } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.service.count({ where }),
    )

    return NextResponse.json({
      services,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
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
      categoryId: z.string().cuid(),
      description: z.string().optional(),
      price: z.number().min(0),
      duration: z.number().int().min(5),
      discountPrice: z.number().min(0).optional(),
      imageUrl: z.string().url().optional().or(z.literal('')),
      galleryUrls: z.array(z.string().url()).optional(),
      benefits: z.array(z.string()).optional(),
      isActive: z.boolean().default(true),
    }).safeParse(await request.json())

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const service = await prisma.service.create({
      data: validated.data,
      include: { category: { select: { id: true, name: true, slug: true } } },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}