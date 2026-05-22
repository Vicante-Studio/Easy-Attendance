import { prisma } from "../config/prisma.js"
import { v4 as uuidv4 } from "uuid"
import { ServiceType } from "../types/churchService.type.js"

// Create Service
export async function createService(serviceData: ServiceType) {
  return await prisma.service.create({
    data: {
      id: uuidv4(),
      name: serviceData.name,
    },
  })
}

// Get All Services
export async function getAllServices() {
  return await prisma.service.findMany({
    orderBy: {
      created_at: "desc",
    },
  })
}

// Get One Service
export async function getOneService(service_id: string) {
  const service = await prisma.service.findUnique({
    where: {
      id: service_id,
    },
  })

  if (!service) {
    throw new Error("Service not found")
  }

  return service
}

// Get Active Service
export async function getActiveService() {
  const activeService = await prisma.service.findFirst({
    where: {
      is_active: true,
    },
  })

  if (!activeService) {
    throw new Error("Active Service not found")
  }

  return activeService
}

// Update Service
export async function updateService(
  service_id: string,
  updatedService: {
    name?: string
  }
) {
  const existing = await prisma.service.findUnique({
    where: {
      id: service_id,
    },
  })

  if (!existing) {
    throw new Error("Service not found")
  }

  return await prisma.service.update({
    where: {
      id: service_id,
    },

    data: {
      name: updatedService.name ?? existing.name,
    },
  })
}

// Delete Service
export async function deleteService(service_id: string) {
  const existing = await prisma.service.findUnique({
    where: {
      id: service_id,
    },
  })

  if (!existing) {
    throw new Error("Service not found")
  }

  const linkedAttendance = await prisma.attendance.count({
    where: {
      service_id,
    },
  })

  if (linkedAttendance > 0) {
    throw new Error(
      `Cannot delete this service - It has ${linkedAttendance} attendance record(s) linked to it.`
    )
  }

  await prisma.service.delete({
    where: {
      id: service_id,
    },
  })

  return true
}

// Activate one service
export async function activateService(service_id: string) {
  const existing = await prisma.service.findUnique({
    where: {
      id: service_id,
    },
  })

  if (!existing) {
    throw new Error("Service not found")
  }

  // Transaction
  await prisma.$transaction([
    prisma.service.updateMany({
      data: {
        is_active: false,
      },
    }),

    prisma.service.update({
      where: {
        id: service_id,
      },

      data: {
        is_active: true,
      },
    }),
  ])

  return await prisma.service.findUnique({
    where: {
      id: service_id,
    },
  })
}