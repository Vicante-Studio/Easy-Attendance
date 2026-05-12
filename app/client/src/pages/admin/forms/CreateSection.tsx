import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import SectionForm from '@/components/features/SectionForm'

const CreateSectionPage = () => {
  const navigate = useNavigate()

  return (
    <main className='w-full mx-auto px-4 py-10 flex flex-col gap-8 h-full items-center'>
          <section className='flex flex-col text-center gap-4 max-w-md'>
            <h1 className='text-4xl font-bold'>Create a Section</h1>
            <p>Fill in the form below to create a section</p>
          </section>

          <Button onClick={() => navigate('/adminPage')}>Return to Dashboard</Button>

          <SectionForm />
    </main>
  )
}

export default CreateSectionPage
