import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { socket } from '@/lib/socket'
import type { Service } from '@/types/serviceTypes'

export const useActiveService = () => {
  const [activeService, setActiveService] = useState<Service | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [activeService_id, setActiveService_id] = useState<string>('')

  const fetchActiveService = async () => {
    try {
      const { data } = await api.get('/api/churchService/active')

      setActiveService(data)
      setActiveService_id(data.id)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

        fetchActiveService()

        socket.on('services:updated', fetchActiveService)

        return () => {
          socket.off('services:updated', fetchActiveService)
        }

    }, [])

  return {
    activeService,
    loading,
    activeService_id
  }
}