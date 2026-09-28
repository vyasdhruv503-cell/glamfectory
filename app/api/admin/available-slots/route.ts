import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const stylistId = searchParams.get('stylistId')
    const serviceId = searchParams.get('serviceId')
    const date = searchParams.get('date')

    if (!stylistId || !serviceId || !date) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      select: { duration: true },
    })

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    const dateObj = new Date(date)
    const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0))
    const endOfDay = new Date(dateObj.setHours(23, 59, 59, 999))

    const stylist = await prisma.stylist.findUnique({
      where: { id: serviceId },
      include: {
        user: true,
        availability: { where: { dayOfWeek: new Date(date).getDay() } },
        services: { where: { serviceId: serviceId } },
      },
    })

    if (!stylist || !stylist.isActive) {
      return NextResponse.json({ error: 'Stylist not available' }, { status: 404 })
    }

    const dayOfWeek = new Date(date).getDay()
    const availability = stylist.availability.find(a => a.dayOfWeek === dayOfWeek && a.isAvailable)

    if (!availability) {
      return NextResponse.json({ slots: [] })
    }

    const startTime = new Date(`1970-01-01T${availability.startTime}:00`)
    const endTime = new Date(`1970-01-01T${availability.endTime}:00`)

    const duration = await prisma.service.findUnique({
      where: { id: searchParams.get('serviceId') },
      select: { duration: true },
    })

    if (!duration) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    const serviceDuration = duration.duration
    const slots: string[] = []
    let currentTime = new Date(startTime)
    const endTimeObj = new Date(endTime)

    while (currentTime < endTimeObj) {
      const slotStart = new Date(currentTime)
      const slotEnd = new Date(currentTime.getTime() + 60000 * 30) // 30 min intervals

      const existingAppointment = await prisma.appointment.findFirst({
        where: {
          stylistId: searchParams.get('stylistId') || undefined,
          scheduledAt: {
            gte: new Date(date),
            lt: new Date(new Date(date).getTime() + 86400000),
          },
          status: { in: ['SCHEDULED', 'CONFIRMED', 'IN_PROGRESS'] },
        },
      })

      // Simplified: check if slot overlaps with existing appointment
      const isAvailable = !await prisma.appointment.findFirst({
        where: {
          stylistId: searchParams.get('stylistId') || undefined,
          status: { in: ['SCHEDULED', 'CONFIRMED', 'IN_PROGRESS'] },
          scheduledAt: {
            gte: new Date(new Date(date).setHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0)),
            lt: new Date(new Date(date).setHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0) + 60000 * 30),
          },
        },
      })

      if (isAvailable) {
        slots.push(currentTime.toTimeString().slice(0, 5))
      }

      currentTime = new Date(currentTime.getTime() + 60000 * 30)
    }

    return NextResponse.json({ slots })
  } catch (error) {
    console.error('Error fetching available slots:', error)
    return NextResponse.json({ error: 'Failed to fetch available slots' }, { status: 500 })
  }
}