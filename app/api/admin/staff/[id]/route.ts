import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const updateStaffSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
  specialization: z.array(z.string()).optional(),
  experience: z.number().int().min(0).optional(),
  commissionRate: z.number().min(0).max(100).optional(),
  isActive: z.boolean().optional(),
  bio: z.string().optional(),
  avgRating: z.number().min(0).max(5).optional(),
  totalReviews: z.number().int().min(0).optional(),
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

    const staff = await prisma.stylist.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, email: true, name: true, role: true, avatarUrl: true, createdAt: true } },
        availability: true,
        services: { include: { service: { select: { id: true, name: true, category: { select: { name: true } } } } } },
        bookings: { take: 10, orderBy: { scheduledAt: 'desc' } },
        reviews: { take: 10, orderBy: { createdAt: 'desc' } },
        _count: { select: { bookings: true, reviews: true } },
      },
    })

    if (!staff) {
      return NextResponse.json({ error: 'Staff member not found' }, { status: 404 })
    }

    return NextResponse.json(staff)
  } catch (error) {
    console.error('Error fetching staff:', error)
    return NextResponse.json({ error: 'Failed to fetch staff member' }, { status: 500 })
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
    const validated = updateStaffSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 })
    }

    const updateData: any = {}
    if (validated.data.specialization !== undefined) updateData.specialization = validated.data.specialization
    if (validated.data.experience !== undefined) updateData.experience = validated.data.experience
    if (validated.data.commissionRate !== undefined) updateData.commissionRate = validated.data.commissionRate
    if (validated.data.isActive !== undefined) updateData.isActive = validated.data.isActive
    if (validated.data.bio !== undefined) updateData.bio = validated.data.bio
    if (validated.data.avgRating !== undefined) updateData.avgRating = validated.data.avgRating
    if (validated.data.totalReviews !== undefined) updateData.totalReviews = validated.data.totalReviews

    // If user info needs updating
    if (validated.data.name || validated.data.email || validated.data.phone) {
      const currentStaff = await prisma.stylist.findUnique({ where: { id }, select: { userId: true } })
      if (currentStaff) {
        await prisma.user.update({
          where: { id: currentStaff.userId },
          data: {
            name: validated.data.name,
            email: validated.data.email,
            phone: validated.data.phone,
          },
        })
      }
    }

    const staff = await prisma.stylist.update({
      where: { id },
      data: updateData,
      include: {
        user: { select: { id: true, email: true, name: true, role: true, avatarUrl: true } },
        services: { include: { service: { select: { id: true, name: true } } } },
      },
    })

    return NextResponse.json(staff)
  } catch (error) {
    console.error('Error updating staff:', error)
    return NextResponse.json({ error: 'Failed to update staff member' }, { status: 500 })
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

    // Delete related staff services first
    await prisma.stylistService.deleteMany({ where: { stylistId: id } })
    await prisma.stylistAvailability.deleteMany({ where: { stylistId: id } })

    // Get the user ID first
    const staff = await prisma.stylist.findUnique({ where: { id }, select: { userId: true } })
    if (staff) {
      await prisma.stylist.delete({ where: { id } })
      await prisma.user.delete({ where: { id: staff.userId } })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting staff:', error)
    return NextResponse.json({ error: 'Failed to delete staff member' }, { status: 500 })
  }
}