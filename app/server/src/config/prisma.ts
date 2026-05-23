import { PrismaClient } from '@prisma/client'

function createPrismaClient() {
  const url = process.env.DATABASE_URL
  
  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

export const prisma = createPrismaClient()
