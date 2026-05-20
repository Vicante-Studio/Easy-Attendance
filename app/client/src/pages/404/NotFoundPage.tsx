import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className='text-center flex flex-col items-center justify-center h-screen border gap-8'>
      <h1 className='text-5xl font-bold'>Nothing To See Here</h1>
      <Button className='text-xl px-12 py-6' onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  )
}

export default NotFoundPage
