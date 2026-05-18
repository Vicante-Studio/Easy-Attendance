import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import EditSection from '@/components/features/section/EditSectionForm'

const EditSectionPage = () => {
  const navigate = useNavigate()

  return (
    <main className='w-full mx-auto px-4 py-10 flex flex-col gap-8 h-full items-center'>
          <section className='flex flex-col text-center gap-4 max-w-md'>
            <h1 className='text-4xl font-bold'>Edit a Section</h1>
            <p>Change the values in the form below to edit the section</p>
          </section>

          <Button onClick={() => navigate('/adminPage')}>Return to Dashboard</Button>

          <EditSection />
    </main>
  )
}

export default EditSectionPage