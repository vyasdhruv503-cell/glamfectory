import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const gallerySchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  mediaType: z.enum(['PHOTO', 'VIDEO', 'BEFORE_AFTER']),
  category: z.string().optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
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
    const category = request.nextUrl.searchParams.get('category')
    const mediaType = request.nextUrl.searchParams.get('mediaType')
    const isActive = request.nextUrl.searchParams.get('isActive')

    const where: any = {}
    if (category && category !== 'All') where.category = category
    if (mediaType) where.mediaType = mediaType
    if (isActive !== null) where.isActive = isActive === 'true'
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const skip = (page - 1) * limit

    const [items, total] = await Promise.all([
      prisma.gallery.findMany({
        where,
        orderBy: { sortOrder: 'asc' },
        skip,
        take: limit,
      }),
      prisma.gallery.count({ where }),
    ])

    return NextResponse.json({
      items,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('Error fetching gallery:', error)
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 })
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
      title: z.string().min(2),
      description: z.string().optional(),
      mediaUrl: z.string().min(1),
      mediaType: z.enum(['PHOTO', 'VIDEO', 'BEFORE_AFTER']),
      category: z.string().optional(),
      sortOrder: z.number().int().min(0).default(0),
      isActive: z.boolean().default(true),
    }).safeParse(body)

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const item = await prisma.gallery.create({
      data: validated.data,
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery item:', error)
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 })
  }
}