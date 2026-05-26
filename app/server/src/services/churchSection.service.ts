import { prisma } from "../config/prisma.js"
import { v4 as uuidv4 } from "uuid"

// Create Section
export async function createChurchSection(sectionData: {
  name: string
  display_order?: number
}) {
  return await prisma.section.create({
    data: {
      id: uuidv4(),
      name: sectionData.name,
      display_order: sectionData.display_order ?? 0,
    },
  })
}

// Get All Sections
export async function getAllChurchSections() {
  return await prisma.section.findMany({
    orderBy: {
      display_order: "asc",
    },
  })
}

// Get One Section
export async function getOneChurchSection(section_id: string) {
  const section = await prisma.section.findUnique({
    where: {
      id: section_id,
    },
  })

  if (!section) {
    throw new Error("Section not found")
  }

  return section
}

// Update Section
export async function updateChurchSection(
  section_id: string,
  updatedSection: {
    name?: string
    display_order?: number
  }
) {
  const existing = await prisma.section.findUnique({
    where: {
      id: section_id,
    },
  })

  if (!existing) {
    throw new Error("Section not found")
  }

  return await prisma.section.update({
    where: {
      id: section_id,
    },

    data: {
      name: updatedSection.name ?? existing.name,
      display_order:
        updatedSection.display_order ?? existing.display_order,
    },
  })
}

// Delete Section
export async function deleteChurchSection(section_id: string) {
  const existing = await prisma.section.findUnique({
    where: {
      id: section_id,
    },
  })

  if (!existing) {
    throw new Error("Section not found")
  }

  const linkedAttendance = await prisma.attendance.count({
    where: {
      section_id,
    },
  })

  if (linkedAttendance > 0) {
    throw new Error(
      `Cannot delete this section - It has ${linkedAttendance} attendance record(s) linked to it.`
    )
  }

  await prisma.section.delete({
    where: {
      id: section_id,
    },
  })

  return true
}

// Get section ID by name
export async function getSectionIdByName(section_name: string) {
  const section = await prisma.section.findFirst({
    where: {
      name: {
        equals: section_name,
        mode: 'insensitive'
      }
    },

    select: {
      id: true,
    },
  })

  if (!section) {
    throw new Error("Cannot get section ID")
  }

  return section.id
}