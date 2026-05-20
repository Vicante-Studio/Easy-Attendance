import { useEffect, useState } from 'react'
import AttendanceDashboard from '../admin/AttendanceDashboard'
import type { Service } from '@/types/serviceTypes'
import { api } from '@/lib/api'

const AdminHistory = () => {
  const [ServiceData, setServiceData] = useState<Service[]>([])

  useEffect(() => {
    const fetchAllServices = async() => {
      const { data } = await api.get(`/api/churchService`)

      setServiceData(data)
    }

    fetchAllServices()
  }, [])
  return (
    <main className='w-full h-full p-20 gap-30 flex flex-wrap'>
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
