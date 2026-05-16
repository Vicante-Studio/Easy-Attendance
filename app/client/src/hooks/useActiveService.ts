import { api } from '@/lib/api'
import { useEffect, useState } from 'react'

export const useActiveService = () => {
  const [activeService, setActiveService] = useState(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchActiveService = async() => {
        try {

            const res = await api.get('/api/churchService/active')

            setActiveService(res.data)

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    fetchActiveService()

  }, [])

  return {
    activeService,
    loading
  }
}