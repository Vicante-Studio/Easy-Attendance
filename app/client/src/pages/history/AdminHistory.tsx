import { useEffect, useState } from 'react'
import AttendanceDashboard from '../admin/AttendanceDashboard'
import type { Service } from '@/types/serviceTypes'
import { api } from '@/lib/api'
import { socket } from '@/lib/socket'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const AdminHistory = () => {
  const navigate = useNavigate()
  const [ServiceData, setServiceData] = useState<Service[]>([])

  useEffect(() => {
    const fetchAllServices = async() => {
      const { data } = await api.get(`/api/churchService`)

      setServiceData(data)
    }

    fetchAllServices()

    socket.on('attendance:updated', fetchAllServices)
        socket.on('services:updated', fetchAllServices)
    
    return () => {
      socket.off('attendance:updated', fetchAllServices)
      socket.off('services:updated', fetchAllServices)
    }
  }, [])
  return (
    <main className='w-full h-full p-20 gap-30 flex flex-wrap'>
      <Button onClick={() => navigate(-1)}>
        <ArrowLeft size={24} />
        Return Back
      </Button>
        {
          ServiceData.map(service => (
            <div key={service.id} className='h-full w-full'>
              <AttendanceDashboard service_id={service.id} view="single"/>
            </div>
          ))
        }
    </main>
  )
}

export default AdminHistory
