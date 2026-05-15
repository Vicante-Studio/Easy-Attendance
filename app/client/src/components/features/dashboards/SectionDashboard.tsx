import { api } from '@/lib/api'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface Section {
    id: string
    name: string,
    display_order: number,
    created_at: string
}

const SectionDashboard = () => {
    const [sectionData, setSectionData] = useState<Section[]>([])

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const res = await api.get('/api/churchSection')

                setSectionData(res.data)
            } catch (error) {

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

        fetchSections()
    }, [])

    console.log(sectionData)
  return (
    <section>
      <h2 className='text-xl'>Sections</h2>

      <div>
        {
            sectionData.map(section => (
                <p>
                    {section?.name}
                </p>
            ))
        }
      </div>
    </section>
  )
}

export default SectionDashboard
