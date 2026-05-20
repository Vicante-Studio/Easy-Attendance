import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { socket } from '@/lib/socket'
import type { AttendanceDashboardProps } from '@/types/attendanceTypes'
import type { Attendance } from '@/types/attendanceTypes'
import type { Service } from '@/types/serviceTypes'
import { useActiveService } from '@/hooks/useActiveService'
import { formatDate } from '@/utils/formatDate'

const AttendanceDashboard = ({ service_id, view }: AttendanceDashboardProps) => {
  const [data, setData] = useState<Attendance[]>([])
  const [Service, setService] = useState<Service | null>(null)
  const { activeService, activeService_id } = useActiveService()

  useEffect(() => {
    const getServiceData = async() => {
      const { data } = await api.get(`/api/churchService/${service_id}`)

      return data
    }

    const fetchAttendanceData = async () => {

      // Fetch attendance based on what the dashboard view is
      if(view === "active"){

        const { data } = await api.get(`/api/churchAttendance/service/${activeService_id}`)

        setData(data)
        setService(activeService)

      } else if(view === "single"){

        const { data } = await api.get(`/api/churchAttendance/service/${service_id}`)
        const serviceData = await getServiceData()

        setData(data)
        setService(serviceData)

      } else {

        const { data } = await api.get(`/api/churchAttendance/`)

        setData(data)

      }

    }

    getServiceData()
    fetchAttendanceData()

    socket.on('attendance:updated', fetchAttendanceData)
    socket.on('services:updated', getServiceData)

    return () => {
      socket.off('attendance:updated', fetchAttendanceData)
      socket.off('services:updated', getServiceData)
    }
  }, [service_id, activeService, activeService_id, view])

  const grandTotal = data.reduce((sum, s) => sum + s.men + s.women + s.children, 0)

  return (
    <main className="p-6 w-full h-full border rounded-md bg-neutral-50">
      <div className='mb-6 text-center w-full justify-between flex flex-wrap '>
            <div className='text-left w-fit bg-neutral-200 rounded-lg p-4'>
                
              <h2 className="text-xl font-bold">Service</h2>
              <p className=' text-lg'>
                  {Service ? Service.name : 'No active service'}
              </p>
            </div>

            <div className='text-left w-fit bg-muted rounded-lg p-4'>
                
              <h2 className="text-lg font-bold">Date</h2>
              <p>
                  {Service ? formatDate(Service.created_at) : 'No active service'}
              </p>
            </div>
        </div>

        {grandTotal > 0 && (
                <div className='mb-6 p-4 bg-neutral-200 rounded-lg text-center'>
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
