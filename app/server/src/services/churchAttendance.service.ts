import { prisma } from "../config/prisma.js"
import { v4 as uuidv4 } from "uuid"

// Create Attendance
export async function createChurchAttendance(attendanceData: {
  section_id: string
  service_id: string
  men: number
  women: number
  children: number
  counter_name?: string
}) {
  return await prisma.attendance.create({
    data: {
      id: uuidv4(),

      section_id: attendanceData.section_id,
      service_id: attendanceData.service_id,

      men: attendanceData.men,
      women: attendanceData.women,
      children: attendanceData.children,

      counter_name: attendanceData.counter_name ?? null,
    },

    include: {
      section: true,
      service: true,
    },
  })
}

// Get All Attendance
export async function getAllChurchAttendance() {
  return await prisma.attendance.findMany({
    include: {
      section: true,
    },

    orderBy: {
      submitted_at: "desc",
    },
  })
}

// Get Attendance By Service
export async function getAttendanceByService(service_id: string) {
  return await prisma.attendance.findMany({
    where: {
      service_id,
    },

    include: {
      section: true,
    },

    orderBy: {
      submitted_at: "asc",
    },
  })
}

// Get Totals By Service
export async function getTotalsByService(service_id: string) {
  const attendance = await prisma.attendance.findMany({
    where: {
      service_id,
    },

    include: {
      section: true,
    },
  })

  const grouped: Record<
    string,
    {
      section_name: string
      men: number
      women: number
      children: number
      total: number
      display_order: number
    }
  > = {}

  attendance.forEach((record) => {
    const key = record.section_id

    if (!grouped[key]) {
      grouped[key] = {
        section_name: record.section.name,
        men: 0,
        women: 0,
        children: 0,
        total: 0,
        display_order: record.section.display_order,
      }
    }

    grouped[key].men += record.men
    grouped[key].women += record.women
    grouped[key].children += record.children
    grouped[key].total +=
      record.men + record.women + record.children
  })

  return Object.values(grouped).sort(
    (a, b) => a.display_order - b.display_order
  )
}

// Get One Attendance
export async function getOneChurchAttendance(
  attendance_id: string
) {
  const record = await prisma.attendance.findUnique({
    where: {
      id: attendance_id,
    },

    include: {
      section: true,
      service: true,
    },
  })

  if (!record) {
    throw new Error("Attendance record not found")
  }

  return record
}

// Update Attendance
export async function updateChurchAttendance(
  attendance_id: string,
  updatedData: {
    men?: number
    women?: number
    children?: number
    counter_name?: string
  }
) {
  const existing = await prisma.attendance.findUnique({
    where: {
      id: attendance_id,
    },
  })

  if (!existing) {
    throw new Error("Attendance record not found")
  }

  return await prisma.attendance.update({
    where: {
      id: attendance_id,
    },

    data: {
      men: updatedData.men ?? existing.men,
      women: updatedData.women ?? existing.women,
      children: updatedData.children ?? existing.children,
      counter_name:
        updatedData.counter_name ?? existing.counter_name,
    },
  })
}

// Delete Attendance
export async function deleteChurchAttendance(
  attendance_id: string
) {
  const existing = await prisma.attendance.findUnique({
    where: {
      id: attendance_id,
    },
  })

  if (!existing) {
    throw new Error("Attendance record not found")
  }

  await prisma.attendance.delete({
    where: {
      id: attendance_id,
    },
  })

  return true
}