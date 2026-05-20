import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { socket } from '@/lib/socket'
import type { AttendanceDashboardProps } from '@/types/attendanceTypes'
import type { Attendance } from '@/types/attendanceTypes'
import type { Service } from '@/types/serviceTypes'

const AttendanceDashboard = ({ service_id, view }: AttendanceDashboardProps) => {
  const [data, setData] = useState<Attendance[]>([])
  const [currentService, setCurrentService] = useState<Service | null>(null)

  useEffect(() => {
    const fetchAttendanceData = async () => {

      // Fetch attendance based on what the dashboard view is
      if(view === "active" || view === "single"){

        const { data } = await api.get(`/api/churchAttendance/service/${service_id}`)

        setData(data)

      } else {

        const { data } = await api.get(`/api/churchAttendance/`)

        setData(data)

      }

    }

    const getServiceData = async() => {
      const { data } = await api.get(`/api/churchService/${service_id}`)

      setCurrentService(data)
    }

    getServiceData()
    fetchAttendanceData()

    socket.on('attendance:updated', fetchAttendanceData)

    return () => {
      socket.off('attendance:updated', fetchAttendanceData)
    }
  }, [service_id, view])

  const grandTotal = data.reduce((sum, s) => sum + s.men + s.women + s.children, 0)

  return (
    <main className="p-6">
      <div className='flex flex-col items-center justify-between mb-6 gap-4'>
            <h2 className="text-xl font-semibold">Attendance Dashboard</h2>
            <div className='text-center'>
                <p className='text-sm text-muted-foreground'>Current Service</p>
                <p className='font-medium text-lg'>
                    {currentService ? currentService.name : 'No active service'}
                </p>
            </div>
        </div>

        {grandTotal > 0 && (
                <div className='mb-6 p-4 bg-muted rounded-lg text-center'>
                    <p className='text-sm text-muted-foreground'>Grand Total</p>
                    <p className='text-4xl font-bold'>{grandTotal}</p>
                </div>
            )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Counter's Name</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Men</TableHead>
            <TableHead>Women</TableHead>
            <TableHead>Children</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
              <TableRow>
                  <TableCell colSpan={6} className='text-center text-muted-foreground py-10'>
                      Waiting for counters to submit...
                  </TableCell>
              </TableRow>
          ) : (
              data.map((section) => {
                  const total = section.men + section.women + section.children
                  return (
                      <TableRow key={section.id}>
                          <TableCell>{section.counter_name ?? '—'}</TableCell>
                          <TableCell>{section.section_name}</TableCell>
                          <TableCell>{section.men}</TableCell>
                          <TableCell>{section.women}</TableCell>
                          <TableCell>{section.children}</TableCell>
                          <TableCell className="font-bold">{total}</TableCell>
                      </TableRow>
                  )
              })
          )}
      </TableBody>
      </Table>
    </main>
  )
}

export default AttendanceDashboard
