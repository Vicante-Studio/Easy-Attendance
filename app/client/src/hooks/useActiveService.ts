import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { socket } from '@/lib/socket'

interface Service {
  id: string
  name: string
  is_active: number
  created_at: string
}
export const useActiveService = () => {
  const [activeService, setActiveService] = useState<Service | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchActiveService = async () => {
    try {
      const res = await api.get('/api/churchService/active')

      setActiveService(res.data)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

        fetchActiveService()

        socket.on('services:changed', fetchActiveService)

        return () => {
          socket.off('services:changed', fetchActiveService)
        }

    }, [])

  return {
    activeService,
    loading
  }
}