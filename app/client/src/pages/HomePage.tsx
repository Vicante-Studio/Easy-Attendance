import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router'

const HomePage = () => {
    const navigate = useNavigate()
  return (
    <main className='text-center p-4 h-screen flex flex-col justify-center gap-16'> 
      <section className='flex flex-col gap-2'>
        <h1 className='text-5xl text-center font-bold'>
            Easy Counter
        </h1>

        <h2 className='text-2xl'>
            Simple live attendance counting for church services.
        </h2>
      </section>

      <section className='flex w-full justify-between gap-2'>
        <Card className='w-fit py-4 px-2 text-center justify-between'>
            <CardHeader>
                <CardTitle>I'm a Counter</CardTitle>
                <CardDescription>Submit attendance numbers for your assigned section.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => navigate('/counterPage')}> Open Counter Page </Button>
            </CardContent>
        </Card>

        <Card className='max-w-sm w-fit p-2 text-center'>
            <CardHeader>
                <CardTitle>I'm an Admin</CardTitle>
                <CardDescription>Manage services, monitor live totals, and export reports.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => navigate('/adminPage')}> Open Admin Dashboard </Button>
            </CardContent>
        </Card>
      </section>
    </main>
  )
}

export default HomePage
