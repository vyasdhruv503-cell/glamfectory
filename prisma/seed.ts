import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@theglamfactory.in' },
    update: {},
    create: {
      email: 'admin@theglamfactory.in',
      name: 'Admin User',
      phone: '+91 98765 43210',
      passwordHash: adminPassword,
      role: 'ADMIN',
      isVerified: true,
      referralCode: 'ADMIN001',
    },
  })

  // Create wallet for admin
  await prisma.wallet.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      balance: 0,
      totalEarned: 0,
      totalRedeemed: 0,
    },
  })

  // Create referral program
  await prisma.referralProgram.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      referrerReward: 100,
      refereeReward: 50,
      minAppointmentValue: 500,
      isActive: true,
    },
  })

  // Create sample categories
  const categories = [
    { name: 'Hair', slug: 'hair', description: 'Hair cuts, coloring, treatments', icon: 'scissors', sortOrder: 1 },
    { name: 'Skin', slug: 'skin', description: 'Facials, skin treatments', icon: 'sparkle', sortOrder: 2 },
    { name: 'Makeup', slug: 'makeup', description: 'Professional makeup services', icon: 'gem', sortOrder: 3 },
    { name: 'Bridal', slug: 'bridal', description: 'Complete bridal packages', icon: 'crown', sortOrder: 4 },
    { name: 'Nails', slug: 'nails', description: 'Manicure, pedicure, nail art', icon: 'flower2', sortOrder: 5 },
    { name: 'Waxing', slug: 'waxing', description: 'Body and facial waxing', icon: 'leaf', sortOrder: 6 },
    { name: 'Spa', slug: 'spa', description: 'Massage and body treatments', icon: 'droplet', sortOrder: 7 },
  ]

  for (const cat of categories) {
    await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  // Create sample services
  const hairCategory = await prisma.serviceCategory.findUnique({ where: { slug: 'hair' } })
  const skinCategory = await prisma.serviceCategory.findUnique({ where: { slug: 'skin' } })
  const makeupCategory = await prisma.serviceCategory.findUnique({ where: { slug: 'makeup' } })
  const bridalCategory = await prisma.serviceCategory.findUnique({ where: { slug: 'bridal' } })
  const nailsCategory = await prisma.serviceCategory.findUnique({ where: { slug: 'nails' } })
  const waxingCategory = await prisma.serviceCategory.findUnique({ where: { slug: 'waxing' } })
  const spaCategory = await prisma.serviceCategory.findUnique({ where: { slug: 'spa' } })

  const services = [
    { name: 'Haircut & Styling', slug: 'haircut-styling', categoryId: hairCategory!.id, price: 800, duration: 45, description: 'Precision cuts with personalized styling' },
    { name: 'Hair Color', slug: 'hair-color', categoryId: hairCategory!.id, price: 2500, duration: 90, description: 'Full color with premium L\'Oréal products' },
    { name: 'Hair Spa', slug: 'hair-spa', categoryId: hairCategory!.id, price: 1500, duration: 60, description: 'Deep conditioning treatment for damaged hair' },
    { name: 'Keratin Treatment', slug: 'keratin-treatment', categoryId: hairCategory!.id, price: 4500, duration: 120, description: 'Smooth, frizz-free hair for months' },
    { name: 'Gold Facial', slug: 'gold-facial', categoryId: skinCategory!.id, price: 2500, duration: 60, description: 'Anti-aging gold-infused facial treatment' },
    { name: 'HD Makeup', slug: 'hd-makeup', categoryId: makeupCategory!.id, price: 3500, duration: 90, description: 'High-definition makeup for events' },
    { name: 'Bridal Makeup Package', slug: 'bridal-makeup-package', categoryId: bridalCategory!.id, price: 15000, duration: 180, description: 'Complete bridal look with trial session' },
    { name: 'Gel Manicure', slug: 'gel-manicure', categoryId: nailsCategory!.id, price: 800, duration: 45, description: 'Long-lasting gel polish' },
    { name: 'Full Body Wax', slug: 'full-body-wax', categoryId: waxingCategory!.id, price: 2500, duration: 90, description: 'Complete body hair removal' },
    { name: 'Swedish Massage', slug: 'swedish-massage', categoryId: spaCategory!.id, price: 2000, duration: 60, description: 'Relaxing full body massage' },
  ]

  for (const svc of services) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {},
      create: svc,
    })
  }

  // Create sample stylists
  const stylists = [
    { 
      name: 'Priya Patel', 
      email: 'priya.patel@glamfactory.in', 
      phone: '+91 98765 43220', 
      role: 'STYLIST' as const,
      bio: '12+ years experience. Specialist in precision cuts, advanced color, and bridal hair.',
      experience: 12,
      specialization: ['Haircut', 'Hair Color', 'Keratin', 'Bridal Hair'],
      commissionRate: 15,
    },
    { 
      name: 'Anjali Sharma', 
      email: 'anjali.sharma@glamfactory.in', 
      phone: '+91 98765 43221', 
      role: 'STYLIST' as const,
      bio: 'Award-winning makeup artist with 10+ years in bridal, fashion, and editorial makeup.',
      experience: 10,
      specialization: ['Bridal Makeup', 'Airbrush', 'HD Makeup', 'Party Makeup'],
      commissionRate: 20,
    },
    { 
      name: 'Dr. Meera Desai', 
      email: 'meera.desai@glamfactory.in', 
      phone: '+91 98765 43222', 
      role: 'STYLIST' as const,
      bio: 'Dermatology-certified skin expert with 8+ years experience in advanced facial treatments.',
      experience: 8,
      specialization: ['Gold Facial', 'HydraFacial', 'Anti-Aging', 'Acne Treatment'],
      commissionRate: 18,
    },
    { 
      name: 'Rohit Singh', 
      email: 'rohit.singh@glamfactory.in', 
      phone: '+91 98765 43223', 
      role: 'STYLIST' as const,
      bio: 'Expert in modern men\'s cuts, beard styling, and grooming. 7+ years experience.',
      experience: 7,
      specialization: ['Men\'s Haircut', 'Beard Trim', 'Hair Spa', 'Scalp Treatment'],
      commissionRate: 15,
    },
    { 
      name: 'Sneha Reddy', 
      email: 'sneha.reddy@glamfactory.in', 
      phone: '+91 98765 43224', 
      role: 'STYLIST' as const,
      bio: 'Creative nail artist with 6+ years experience. Known for intricate 3D designs and gel extensions.',
      experience: 6,
      specialization: ['Nail Art', 'Gel Extensions', 'Acrylic Nails', 'Spa Manicure'],
      commissionRate: 15,
    },
    { 
      name: 'Kavya Nair', 
      email: 'kavya.nair@glamfactory.in', 
      phone: '+91 98765 43225', 
      role: 'STYLIST' as const,
      bio: 'Certified spa therapist with 9+ years in therapeutic massages and wellness therapies.',
      experience: 9,
      specialization: ['Swedish Massage', 'Deep Tissue', 'Aromatherapy', 'Body Scrub'],
      commissionRate: 15,
    },
  ]

  for (const staff of stylists) {
    const passwordHash = await hash('staff123', 12)
    const user = await prisma.user.upsert({
      where: { email: staff.email },
      update: {},
      create: {
        name: staff.name,
        email: staff.email,
        phone: staff.phone,
        passwordHash,
        role: staff.role,
        isVerified: true,
        referralCode: staff.name.toUpperCase().replace(/\s+/g, '') + '2024',
      },
    })

    const stylist = await prisma.stylist.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        bio: staff.bio,
        experience: staff.experience,
        specialization: staff.specialization,
        commissionRate: staff.commissionRate,
        isActive: true,
      },
    })

    // Assign services to stylists
    const servicesForStylist = await prisma.service.findMany({
      take: 5,
    })

    for (const svc of servicesForStylist) {
      await prisma.stylistService.upsert({
        where: { stylistId_serviceId: { stylistId: stylist.id, serviceId: svc.id } },
        update: {},
        create: { stylistId: stylist.id, serviceId: svc.id },
      })
    }
  }

  // Create membership plans
  const silverPlan = await prisma.membershipPlan.upsert({
    where: { id: 'silver-plan' },
    update: {},
    create: {
      id: 'silver-plan',
      name: 'Silver',
      description: 'Perfect for regular visits',
      price: 5000,
      duration: 365,
      discountPercent: 10,
      freeServices: 2,
      benefits: ['10% discount on all services', '2 free haircuts per year', 'Priority booking (24hr advance)', 'Birthday special gift worth ₹500', 'Free consultation anytime', 'Earn double loyalty points'],
      isActive: true,
    },
  })

  const goldPlan = await prisma.membershipPlan.upsert({
    where: { id: 'gold-plan' },
    update: {},
    create: {
      id: 'gold-plan',
      name: 'Gold',
      description: 'Best value for beauty enthusiasts',
      price: 12000,
      duration: 365,
      discountPercent: 20,
      freeServices: 4,
      benefits: ['20% discount on all services', '4 free services per year (any)', 'Priority booking + home service*', 'Birthday makeover worth ₹3,000', 'Free monthly consultation', 'Complimentary drink on visit', 'Earn triple loyalty points', 'Exclusive event invitations'],
      isActive: true,
    },
  })

  await prisma.membershipPlan.upsert({
    where: { id: 'platinum-plan' },
    update: {},
    create: {
      id: 'platinum-plan',
      name: 'Platinum',
      description: 'Ultimate luxury experience',
      price: 25000,
      duration: 365,
      discountPercent: 30,
      freeServices: 8,
      benefits: ['30% discount on all services', '8 free services per year (any)', 'VIP priority + home service*', 'Annual makeover worth ₹8,000', 'Free monthly premium facial', 'Exclusive event invitations', 'Dedicated stylist assignment', 'Earn 4x loyalty points', 'Free parking validation', 'Guest passes (2 per quarter)'],
      isActive: true,
    },
  })

  // Create referral program
  await prisma.referralProgram.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      referrerReward: 100,
      refereeReward: 50,
      minAppointmentValue: 500,
      isActive: true,
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('👤 Admin login: admin@theglamfactory.in / admin123')
  console.log('👥 Staff logins: staff123')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })