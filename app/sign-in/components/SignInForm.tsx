'use client'

import React, { useState } from 'react'
import { Loader } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import authService from '@/app/(shared)/services/authService'
import { Input } from '@/app/(shared)/components/ui/input'
import { Alert, AlertDescription } from '@/app/(shared)/components/ui/alert'
import { Button } from '@/app/(shared)/components/ui/button'
import { Label } from '@/app/(shared)/components/ui/label'
import Link from 'next/link'
import PasswordInput from '@/app/(shared)/components/PasswordInput'
import authTokenService from '@/app/(shared)/services/authTokenService'
import { useRouter } from 'next/navigation'
import { roles } from '@/app/(shared)/services/userService'
import InputError from '@/app/(shared)/components/form/InputError'
import InputGroup from '@/app/(shared)/components/form/InputGroup'

const FormSchema = z.object({
  email: z
    .string()
    .min(1, 'Please enter your email address.')
    .email('Invalid email address'),
  password: z.string().min(1, 'Please enter your password.')
})

type FormType = z.infer<typeof FormSchema>

export default function SignInForm() {
  const [error, setError] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    shouldFocusError: false
  })

  const regPassword = register('password')

  const onSubmit: SubmitHandler<FormType> = async (formData) => {
    setIsSubmitting(true)
    try {
      const { data } = await authService.signIn(formData)
      const userRole = data.data.user.user_type
      authTokenService.setAccessToken(data.data.token)

      if (userRole === roles.learner) {
        router.replace('/learner/dashboard')
      } else if (userRole === roles.trainer) {
        router.replace('/trainer/dashboard')
      } else if (userRole === roles.admin || userRole === roles.superadmin) {
        router.replace('/admin/dashboard')
      }
    } catch (error: any) {
      setError(error?.response?.data?.message || 'An error occurred.')
      setIsSubmitting(false)
    }
  }

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert variant='destructive' className='mb-[20px]'>
          <AlertDescription className='lg:text-base'>{error}</AlertDescription>
        </Alert>
      )}

      <InputGroup>
        <Label htmlFor='email'>Email address</Label>
        <Input
          type='email'
          id='email'
          {...register('email')}
          placeholder='example@email.com'
          isError={!!errors.email}
        />
        {errors.email && <InputError>{errors.email.message}</InputError>}
      </InputGroup>

      <InputGroup className='mt-[24px]'>
        <div className='flex items-end justify-between'>
          <Label htmlFor='password'>Password</Label>
          <Link
            href='/forgot-password'
            className='text-sm font-medium lg:text-base text-brandcolora'
          >
            Forgot password?
          </Link>
        </div>
        <PasswordInput
          id='password'
          placeholder='Enter password'
          onChange={regPassword.onChange}
          onBlur={regPassword.onBlur}
          name={regPassword.name}
          inputRef={regPassword.ref}
          eye
          isError={!!errors.password}
        />
        {errors.password && <InputError>{errors.password.message}</InputError>}
      </InputGroup>

      <Button
        className='mt-[40px] lg:text-base w-full lg:w-max mx-auto'
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader className='w-4 h-4 mr-2 animate-spin' /> Logging in
          </>
        ) : (
          'Log in'
        )}
      </Button>
    </form>
  )
}
