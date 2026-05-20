import { api } from '@/lib/api'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AttendanceDashboard from './AttendanceDashboard'
import SectionDashboard from '@/components/features/dashboards/SectionDashboard'
import ServiceDashboard from '@/components/features/dashboards/ServiceDashboard'
import { Button } from '@/components/ui/button'
import { History } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useActiveService } from '@/hooks/useActiveService'
// import { socket } from '@/lib/socket'

const AdminPage = () => {
  const navigate = useNavigate()
  const [ip, setIp] = useState<string>('')
  const [port, setPort] = useState<number>(8000)

  const { activeService_id } = useActiveService()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if(!activeService_id) {
  //       return
  //     }

  //     const res = await api.get(`/api/churchAttendance/service/${activeService_id}`)

  //     setData(res.data)
  //   }

  //   fetchData()

  //   socket.on('attendance:updated', fetchData)

  //   return () => {
  //     socket.off('attendance:updated', fetchData)
  //   }
  // }, [activeService])

  useEffect(() => {
      async function getLocalIPAddress(){
      try {
        const response = await api.get('/api/network/ip')

        setIp(response.data.ip)
        setPort(response.data.port)
      } catch (error) {
        console.error("Submit failed:", error)

                      if(axios.isAxiosError(error)){
                          alert(
                              error?.response?.data?.message ||
                              "Something went wrong"
                          )
                      } else {
                          alert('Something went wrong')
                      }
                  }
      }

      getLocalIPAddress()
    },[])


  return (
    <main className='w-full h-full flex flex-col items-center gap-6 mb-20'>
      <h1 className='text-xl text-center w-fit'><span className='font-bold'>Counters</span> <br /> Open your browsers and go to:</h1>

      <section className='border border-gray-300 bg-gray-200 p-20 rounded-lg'>
        <p className='text-5xl'>
          {
            ip ? `${ip}:${port}` : 'Loading ...'
          }
        </p>
      </section>

      <section className='w-full flex flex-col items-center' >
        <SectionDashboard />
      </section>

      <section className='w-full flex flex-col items-center'>
        <ServiceDashboard />
      </section>

      <AttendanceDashboard service_id={activeService_id} view='active' />

      <Button onClick={() => navigate('/history/admin')}>
        <History />
        View all Attendance Submissions
      </Button>
    </main>
  )
}

export default AdminPage
