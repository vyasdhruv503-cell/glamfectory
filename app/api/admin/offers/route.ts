import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const offerSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SERVICE', 'BUY_ONE_GET_ONE']),
  discountValue: z.number().min(0),
  code: z.string().optional(),
  minAmount: z.number().min(0).default(0),
  maxDiscount: z.number().optional(),
  validFrom: z.string(),
  validTill: z.string(),
  isActive: z.boolean().default(true),
  serviceIds: z.array(z.string().cuid()).optional(),
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
    const isActive = request.nextUrl.searchParams.get('isActive')

    const where: any = {}
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
      ]
    }
    if (isActive !== null) where.isActive = isActive === 'true'

    const skip = (page - 1) * limit

    const [offers, total] = await Promise.all([
      prisma.offer.findMany({
        where,
        include: {
          services: { include: { service: { select: { id: true, name: true } } } },
          _count: { select: { services: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.offer.count({ where }),
    ])

    return NextResponse.json({
      offers,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('Error fetching offers:', error)
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = offerSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const { serviceIds, validFrom, validTill, ...data } = validated.data

    const offer = await prisma.offer.create({
      data: {
        ...data,
        validFrom: new Date(validFrom),
        validTill: new Date(validTill),
        services: serviceIds?.length
          ? { create: serviceIds.map(sid => ({ serviceId: sid })) }
          : undefined,
      },
      include: { services: { include: { service: { select: { id: true, name: true } } } } },
    })

    return NextResponse.json(offer, { status: 201 })
  } catch (error) {
    console.error('Error creating offer:', error)
    return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 })
  }
}