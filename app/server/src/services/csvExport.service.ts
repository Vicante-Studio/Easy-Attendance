import { stringify } from 'csv-stringify'
import { getAttendanceByService } from './churchAttendance.service.js'

export const generateAttendanceCSV = async (serviceID: string): Promise<string> => {
    
    const data = await getAttendanceByService(serviceID)

    if (!data || data.length === 0) {
        throw new Error('No attendance data found for this service')
    }

    const rows = (data as any[]).map((record) => ({
        Section: record.section_name ?? 'Unknown',
        Men: record.men,
        Women: record.women,
        Children: record.children,
        Total: record.men + record.women + record.children,
        'Submitted At': new Date(record.submitted_at).toLocaleString()
    }))

    return new Promise((resolve, reject) => {
        stringify(rows, { header: true }, (err, output) => {
            if (err) reject(err)
            else resolve(output)
        })
    })
}