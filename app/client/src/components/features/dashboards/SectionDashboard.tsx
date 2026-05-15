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
    <section className='w-[70%] flex flex-col items-center gap-8 border p-2 rounded-md'>
      <h2 className='text-xl font-bold'>Sections</h2>

      <div className='w-full flex flex-col gap-2'>
        {
            sectionData.map(section => (
                <div className='flex justify-between items-center border p-2 rounded-md'>
                    <p>
                        {section?.name}
                    </p>
                </div>
            ))
        }
      </div>
    </section>
  )
}

export default SectionDashboard
