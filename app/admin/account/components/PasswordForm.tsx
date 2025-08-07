'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Label } from '@/app/(shared)/components/ui/label'
import { Button } from '@/app/(shared)/components/ui/button'
import { Loader } from 'lucide-react'
import * as z from 'zod'
import regex from '@/app/(shared)/regex'
import 'react-international-phone/style.css'
import accountService from '@/app/(shared)/services/accountService'
import InputGroup from '@/app/(shared)/components/form/InputGroup'
import InputError from '@/app/(shared)/components/form/InputError'
import PasswordInput from '@/app/(shared)/components/PasswordInput'

const FormSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Please enter your password.')
      .regex(
        regex.password,
        'Minimum of 8 characters with at least one uppercase, one lowercase, one number, and one special character.'
      ),
    confirm_password: z.string().min(1, 'Please confirm your password.')
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Password does not match.'
  })

export type FormType = z.infer<typeof FormSchema>

function PasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty }
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema)
  })

  const regPassword = register('password')
  const regConfirmPassword = register('confirm_password')

  const onSubmit: SubmitHandler<FormType> = async (formData) => {
    setIsSubmitting(true)
    try {
      await accountService.updatePassword(formData)

      toast.success('Password updated!')
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'An error occurred.')
    } finally {
      setIsSubmitting(false)
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <Label htmlFor='password'>Password</Label>
        <PasswordInput
          id='password'
          onChange={regPassword.onChange}
          onBlur={regPassword.onBlur}
          name={regPassword.name}
          inputRef={regPassword.ref}
          eye
        />
        {errors.password && <InputError>{errors.password.message}</InputError>}
      </InputGroup>

      <InputGroup className='mt-[24px]'>
        <Label htmlFor='confirm_password'>Confirm Password</Label>
        <PasswordInput
          type='password'
          id='confirm_password'
          onChange={regConfirmPassword.onChange}
          onBlur={regConfirmPassword.onBlur}
          name={regConfirmPassword.name}
          inputRef={regConfirmPassword.ref}
          eye
        />
        {errors.confirm_password && (
          <InputError>{errors.confirm_password.message}</InputError>
        )}
      </InputGroup>
      <Button
        type='submit'
        className='mt-[30px] w-full lg:w-max float-end'
        disabled={!isDirty || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader className='w-4 h-4 mr-2 animate-spin' /> Changing Password
          </>
        ) : (
          'Change Password'
        )}
      </Button>
    </form>
  )
}

export default PasswordForm
