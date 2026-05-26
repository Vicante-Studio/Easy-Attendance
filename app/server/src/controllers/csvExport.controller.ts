import { Request, Response } from 'express'
import { prisma } from '../config/prisma.js'
import { generateAttendanceCSV } from '../services/csvExport.service.js'
import { getOneService } from '../services/churchService.service.js'

// Generate Attendance CSV
export const handleGenerateAttendanceCSV = async (req: Request, res: Response) => {
  const { service_id } = req.params

  try {
    // Get service details from Prisma
    const service = await prisma.service.findUnique({
      where: {
        id: service_id as string
      },
      select: {
        name: true,
        created_at: true
      }
    })

    // Generate CSV from local DB (Prisma-backed service)
    const csv = await generateAttendanceCSV(service_id as string)

    const { name } = await getOneService(service_id as string)

    // Build filename safely
    const filename = service
      ? `${service.name.replace(/\s+/g, '-')}-${new Date(service.created_at).toISOString().split('T')[0]}.csv`
      : `attendance-${service_id}.csv`

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)

    return res.send(csv)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message })
    }
  }
}