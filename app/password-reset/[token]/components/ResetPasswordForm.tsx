'use client'

import React, { useState } from 'react'
import { Loader } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Alert, AlertDescription } from '@/app/(shared)/components/ui/alert'
import { Button } from '@/app/(shared)/components/ui/button'
import { Label } from '@/app/(shared)/components/ui/label'
import userService from '@/app/(shared)/services/userService'
import PasswordInput from '@/app/(shared)/components/PasswordInput'
import regex from '@/app/(shared)/regex'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import InputGroup from '@/app/(shared)/components/form/InputGroup'
import InputError from '@/app/(shared)/components/form/InputError'

const ResetPasswordFormSchema = z.object({
  password: z
    .string()
    .min(1, 'Please enter your password.')
    .regex(
      regex.password,
      'Minimum of 8 characters with at least one uppercase, one lowercase, one number, and one special character.'
    ),
  confirmPassword: z.string().min(1, 'Please confirm your password.')
})

type ResetPasswordFormType = z.infer<typeof ResetPasswordFormSchema>

function ResetPasswordForm() {
  const [errorResetPassword, setErrorResetPassword] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchParams = useSearchParams()
  const params = useParams()
  const token = Array.isArray(params.token) ? params.token[0] : params.token
  const email = searchParams.get('email') || ''
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ResetPasswordFormType>({
    resolver: zodResolver(ResetPasswordFormSchema)
  })

  const regPassword = register('password')
  const regConfirmPassword = register('confirmPassword')

  const onSubmit: SubmitHandler<ResetPasswordFormType> = async (formData) => {
    setIsSubmitting(true)

    try {
      await userService.resetPassword({
        token: decodeURIComponent(token),
        email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      })
      router.push('/password-reset/successful')
    } catch (error: any) {
      setErrorResetPassword(
        error?.response?.data?.message || 'An error occurred.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      {errorResetPassword && (
        <Alert variant='destructive' className='mb-[20px]'>
          <AlertDescription className='lg:text-base'>
            {errorResetPassword}
          </AlertDescription>
        </Alert>
      )}

      <InputGroup>
        <Label htmlFor='password'>Password</Label>
        <PasswordInput
          id='password'
          onChange={regPassword.onChange}
          onBlur={regPassword.onBlur}
          name={regPassword.name}
          inputRef={regPassword.ref}
          eye
          isError={!!errors.password}
        />
        {errors.password && <InputError>{errors.password.message}</InputError>}
      </InputGroup>

      <InputGroup className='mt-[24px]'>
        <Label htmlFor='confirmPassword'>Confirm Password</Label>
        <PasswordInput
          type='password'
          id='confirmPassword'
          onChange={regConfirmPassword.onChange}
          onBlur={regConfirmPassword.onBlur}
          name={regConfirmPassword.name}
          inputRef={regConfirmPassword.ref}
          eye
          isError={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <InputError>{errors.confirmPassword.message}</InputError>
        )}
      </InputGroup>

      <Button
        className='mt-[40px] w-full lg:w-max mx-auto'
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader className='w-4 h-4 mr-2 animate-spin' /> Reset password
          </>
        ) : (
          'Reset password'
        )}
      </Button>
    </form>
  )
}

export default ResetPasswordForm
