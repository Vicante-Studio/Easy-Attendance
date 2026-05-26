import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { Field, FieldLabel, FieldError } from '../ui/form/field'
import { Input } from '../ui/form/input'
import axios from 'axios'
import { api } from '@/lib/api'
import { useNavigate } from 'react-router'
import type { Service, ServiceFormProps } from '@/types/serviceTypes'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'

const formSchema = z.object({
    name: z.string().min(1, 'Section name is required')
})

type FormValues = z.infer<typeof formSchema>

const ServiceForm = ({ service_id }: ServiceFormProps) => {
   const navigate = useNavigate()
   const [existingService, setExistingService] = useState<Service | null>(null)

   const isEditMode = !!existingService

   const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    })

    const resetForm = () => {
        reset()
    }

    const onSubmit = async (values: FormValues) => {
        try {

            if(isEditMode && service_id){
                const { data } = await api.put(`/api/churchService/${service_id}`, {
                    name: values.name.toLowerCase().trim()
                })

                console.log("Section editted:", data)
            } else {
                const { data } = await api.post('/api/churchService', {
                    name: values.name.toLowerCase().trim()
                })

                console.log("Success:", data)
            }
            
            resetForm()

            // TODO: Add success message card before navigating to adminPage
            navigate('/adminPage')
            
        } catch (error) {
            console.error("Submit failed:", error)

                    if(axios.isAxiosError(error)){
                        alert(
                            `Error: ${error.response?.status}\n${JSON.stringify(error.response?.data, null, 2)}`
                        )
                    } else {
                        alert((error as Error)?.message)
                    }
                }
    }

    useEffect(() => {
        if(!service_id) return

        const fetchSection = async () => {
            try {
                const { data } = await api.get(`/api/churchService/${service_id}`)

                setExistingService(data)

                reset({
                    name: data.name ?? ''
                })

            } catch (error) {

                if(axios.isAxiosError(error)){
                        alert(
                            `Error: ${error.response?.status}\n${JSON.stringify(error.response?.data, null, 2)}`
                        )
                    } else {
                        alert((error as Error)?.message)
                    }
                  }
        }

        fetchSection()
    }, [service_id, reset])

  return (
    <main className="w-full max-w-md mx-auto px-4 py-10">

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>

            <Field>
                <FieldLabel>Service Name</FieldLabel>
                <Input placeholder="Input Service name" {...register('name')} className='h-12' />
                <FieldError errors={[errors.name]} />
            </Field>

            <Button type='submit' className="h-12 mt-4" disabled={isSubmitting}>
                {
                    isSubmitting ? 'Creating...' : 'Create Service'
                }
            </Button>
        </form>
        <Button onClick={() => navigate('/adminPage')}>
            <ArrowLeft size={24} />
            Return Back
        </Button>
    </main>
  )
}

export default ServiceForm