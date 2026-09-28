import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const appointmentSchema = z.object({
  customerId: z.string().cuid(),
  stylistId: z.string().cuid().optional(),
  serviceIds: z.array(z.string().cuid()).min(1),
  addOnIds: z.array(z.string().cuid()).optional(),
  scheduledAt: z.string().datetime(),
  notes: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const stylistId = searchParams.get('stylistId')

    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status
    if (stylistId) where.stylistId = stylistId
    if (dateFrom || dateTo) {
      where.scheduledAt = {}
      if (dateFrom) where.scheduledAt.gte = new Date(dateFrom)
      if (dateTo) where.scheduledAt.lte = new Date(dateTo)
    }
    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { user: { phone: { contains: search } } },
      ]
    }

    const [appointments, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, email: true, phone: true } },
          stylist: { select: { id: true, user: { select: { name: true } } } },
          services: { include: { service: { select: { id: true, name: true, price: true, duration: true } } } },
          addOns: { include: { addOn: { select: { id: true, name: true, price: true } } } },
          payment: { select: { id: true, amount: true, status: true, method: true } },
        },
        orderBy: { scheduledAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ])

    return NextResponse.json({
      appointments,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = appointmentSchema.safeParse(body)
    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const { customerId, stylistId, serviceIds, addOnIds, scheduledAt, notes } = validated.data

    // Calculate total price
    const services = await prisma.service.findMany({
      where: { id: { in: serviceIds } },
      select: { id: true, duration: true, price: true, discountPrice: true },
    })

    const addOns = addOnIds?.length
      ? await prisma.serviceAddOn.findMany({
          where: { id: { in: addOnIds } },
          select: { id: true, price: true, duration: true },
        })
      : []

    const totalPrice = services.reduce((sum, s) => sum + (s.discountPrice ?? s.price), 0) +
      addOns.reduce((sum, a) => sum + a.price, 0)

    const appointment = await prisma.booking.create({
      data: {
        userId: customerId,
        stylistId: stylistId,
        scheduledAt: new Date(scheduledAt),
        totalAmount: totalPrice,
        finalAmount: totalPrice,
        notes: notes,
        status: 'CONFIRMED',
        services: {
          create: services.map(s => ({
            serviceId: s.id,
            price: s.discountPrice ?? s.price,
          })),
        },
        addOns: addOnIds?.length
          ? {
              create: addOnIds.map(aid => ({
                addOnId: aid,
                price: addOns.find(a => a.id === aid)!.price,
              })),
            }
          : undefined,
      },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        stylist: { select: { id: true, user: { select: { name: true } } } },
        services: { include: { service: { select: { id: true, name: true, price: true, duration: true } } } },
        addOns: { include: { addOn: { select: { id: true, name: true, price: true } } } },
      },
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}