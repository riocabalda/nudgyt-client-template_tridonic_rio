'use client'

import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
import 'react-international-phone/style.css'
import accountService from '@/app/(shared)/services/accountService'
import { toast } from 'sonner'
import InputGroup from '@/app/(shared)/components/form/InputGroup'
import { Label } from '@/app/(shared)/components/ui/label'
import { Input } from '@/app/(shared)/components/ui/input'
import InputError from '@/app/(shared)/components/form/InputError'
import { Button } from '@/app/(shared)/components/ui/button'
import { Loader } from 'lucide-react'
import useUser from '@/app/(shared)/hooks/useUser'

const FormSchema = z.object({
  fullname: z.string().min(1, 'Required.'),
  email: z
    .string()
    .min(1, 'Please enter your email address.')
    .email('Invalid email address')
})

export type FormType = z.infer<typeof FormSchema>

function PersonalDetailsForm() {
  const { user, mutateUser } = useUser()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty }
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema)
  })

  const onSubmit: SubmitHandler<FormType> = async (formData) => {
    setIsSubmitting(true)
    const payload = {
      fullname: formData.fullname
    }
    try {
      await accountService.updatePersonalDetails(payload)
      mutateUser()
      toast.success('Personal details updated!')
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'An error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (user) {
      reset({
        fullname: user.fullname,
        email: user.email
      })
    }
  }, [user])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <Label htmlFor='fullname'>Full name</Label>
        <Input id='fullname' {...register('fullname')} placeholder='John Doe' />
        {errors.fullname && <InputError>{errors.fullname.message}</InputError>}
      </InputGroup>

      <InputGroup className='mt-[24px]'>
        <Label htmlFor='email'>Email address</Label>
        <Input
          type='email'
          id='email'
          {...register('email')}
          placeholder='example@email.com'
          disabled
        />
        {errors.email && <InputError>{errors.email.message}</InputError>}
      </InputGroup>

      <Button
        type='submit'
        className='mt-[24px] w-full lg:w-max float-end'
        disabled={!isDirty || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader className='w-4 h-4 mr-2 animate-spin' /> Updating
          </>
        ) : (
          'Update Personal Details'
        )}
      </Button>
    </form>
  )
}

export default PersonalDetailsForm
