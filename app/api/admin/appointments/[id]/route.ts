import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const updateAppointmentSchema = z.object({
  stylistId: z.string().cuid().optional(),
  scheduledAt: z.string().datetime().optional(),
  status: z.enum(['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW']).optional(),
  notes: z.string().optional(),
  serviceIds: z.array(z.string().cuid()).optional(),
  addOnIds: z.array(z.string().cuid()).optional(),
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

    const appointment = await prisma.booking.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        stylist: { select: { id: true, user: { select: { name: true } } } },
        services: { include: { service: { select: { id: true, name: true, price: true, duration: true } } } },
        addOns: { include: { addOn: { select: { id: true, name: true, price: true } } } },
        payment: { select: { id: true, amount: true, status: true, method: true } },
      },
    })

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
    }

    return NextResponse.json(appointment)
  } catch (error) {
    console.error('Error fetching appointment:', error)
    return NextResponse.json({ error: 'Failed to fetch appointment' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const validated = updateAppointmentSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const updateData: any = {}
    if (validated.data.stylistId) updateData.stylistId = validated.data.stylistId
    if (validated.data.scheduledAt) updateData.scheduledAt = new Date(validated.data.scheduledAt)
    if (validated.data.status) updateData.status = validated.data.status
    if (validated.data.notes !== undefined) updateData.notes = validated.data.notes

    if (validated.data.status === 'COMPLETED') {
      updateData.completedAt = new Date()
    }

    const appointment = await prisma.booking.update({
      where: { id },
      data: updateData,
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        stylist: { select: { id: true, user: { select: { name: true } } } },
        services: { include: { service: { select: { id: true, name: true, price: true, duration: true } } } },
        addOns: { include: { addOn: { select: { id: true, name: true, price: true } } } },
      },
    })

    return NextResponse.json(appointment)
  } catch (error) {
    console.error('Error updating appointment:', error)
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 })
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

    await prisma.booking.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting appointment:', error)
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 })
  }
}