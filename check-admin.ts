import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.findUnique({
    where: { email: 'admin@theglamfactory.in' },
    select: { id: true, email: true, name: true, role: true, isVerified: true }
  })
  
  console.log('Admin user:', admin)
  
  if (!admin) {
    console.log('Admin user not found!')
  } else {
    console.log('Role:', admin.role)
    console.log('Is verified:', admin.isVerified)
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })