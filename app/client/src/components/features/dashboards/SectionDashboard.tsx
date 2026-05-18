import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import type { Section } from '@/types/sectionTypes'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const SectionDashboard = () => {
    const navigate = useNavigate()
    
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

    const handleDelete = async(id: string) => {
        try {
            
            const res = await api.delete(`/api/churchSection${id}`)

            console.log(res.data)

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
    
  return (
    <section className='w-[70%] flex flex-col items-center gap-8 border p-2 rounded-md'>
      <h2 className='text-xl font-bold'>Sections</h2>

      <div className='w-full flex flex-col gap-2'>
        {
            sectionData.map(section => (
                <div key={section.id} className='flex justify-between items-center border p-2 rounded-md'>
                    <p>
                        {section?.name}
                    </p>

                    <div className='flex gap-2'>
                        <Button onClick={() => navigate(`/createSection/${section.id}/edit`)}>Edit</Button>
                        <Button onClick={() => handleDelete(section.id)}>Delete</Button>
                    </div>
                </div>
            ))
        }
      </div>

      <Button onClick={() => navigate('/createSection')}>Add Section</Button>
    </section>
  )
}

export default SectionDashboard
