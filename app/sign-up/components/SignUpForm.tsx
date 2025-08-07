'use client'

import InputError from '@/app/(shared)/components/form/InputError'
import InputGroup from '@/app/(shared)/components/form/InputGroup'
import PasswordInput from '@/app/(shared)/components/PasswordInput'
import { Alert, AlertDescription } from '@/app/(shared)/components/ui/alert'
import { Button } from '@/app/(shared)/components/ui/button'
import { Checkbox } from '@/app/(shared)/components/ui/checkbox'
import { Input } from '@/app/(shared)/components/ui/input'
import { Label } from '@/app/(shared)/components/ui/label'
import regex from '@/app/(shared)/regex'
import authService from '@/app/(shared)/services/authService'
import { roles } from '@/app/(shared)/services/userService'
import { cn } from '@/app/(shared)/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import 'react-international-phone/style.css'
import * as z from 'zod'

const FormSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Please enter your email address.')
      .email('Invalid email address'),
    fullName: z.string().min(1, 'Please enter your full name.'),
    userType: z.string().min(1, 'Please select a user type.'),
    password: z
      .string()
      .min(1, 'Please enter your password.')
      .regex(
        regex.password,
        'Minimum of 8 characters with at least one uppercase, one lowercase, one number, and one special character.'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
    isTermsAndConditionsAccepted: z
      .boolean({
        required_error:
          "You must agree to the platform's Terms & Conditions and Privacy Policy to sign up."
      })
      .refine(
        (val) => val === true,
        "You must agree to the platform's Terms & Conditions and Privacy Policy to sign up."
      )
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password does not match.'
  })

type FormType = z.infer<typeof FormSchema>

export default function SignUpForm() {
  const [error, setError] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchParams = useSearchParams()
  const emailParam = searchParams.get('email')
  const userTypeParam = searchParams.get('user_type')
  const invitationToken = searchParams.get('invitation_token')

  const router = useRouter()

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
    watch
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    shouldFocusError: false,
    defaultValues: {
      isTermsAndConditionsAccepted: false
    }
  })

  useEffect(() => {
    if (emailParam && userTypeParam) {
      setValue('email', emailParam)
      setValue('userType', userTypeParam)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailParam, userTypeParam])

  /**
   * Invitation links redirect to sign up form.
   * However, regular sign up should not be possible anymore.
   * The difference between the two is the existence of these parameters,
   * which should be "guaranteed" to be set by the API.
   *
   * If regular sign up is attempted to be accessed (i.e. no parameters), redirect to homepage.
   *
   * It would be better to verify invitation token is valid,
   * e.g. actually in the database, is not expired
   */
  const isNotInvited =
    emailParam === null || userTypeParam === null || invitationToken === null

  const isUserTypeParamValid =
    userTypeParam !== null && Object.values(roles).includes(userTypeParam)

  if (isNotInvited || !isUserTypeParamValid) {
    router.replace('/')

    return null
  }

  const regPassword = register('password')
  const regConfirmPassword = register('confirmPassword')

  const onSubmit: SubmitHandler<FormType> = async (formData) => {
    const payload = { ...formData, invitationToken }
    setIsSubmitting(true)
    try {
      await authService.signUp(payload)
      router.replace(
        `/sign-up/successful?email=${formData.email}${
          invitationToken && `&invitation_token=${invitationToken}`
        }`
      )
    } catch (error: any) {
      setError(error?.response?.data?.message || 'An error occurred.')
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Logo */}
      <Link href='/' className='mb-[60px]'>
        <Image
          src='/images/logo.png'
          alt='Tridonic logo'
          height={80}
          width={400}
          className='hidden lg:block h-12 object-contain mx-auto'
        />
        <Image
          src='/images/logo.png'
          alt='Tridonic logo'
          height={146}
          width={185}
          className='lg:hidden h-[146px] object-contain mx-auto'
        />
      </Link>

      <form
        className='flex flex-col px-4 lg:px-0'
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && (
          <Alert variant='destructive' className='mb-[20px]'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <InputGroup>
          <Label htmlFor='fullName'>Full name</Label>
          <Input
            id='fullName'
            {...register('fullName')}
            placeholder='John Doe'
            isError={!!errors.fullName}
          />
          {errors.fullName && (
            <InputError>{errors.fullName.message}</InputError>
          )}
        </InputGroup>

        <InputGroup className='mt-[24px]'>
          <Label htmlFor='email'>Email address</Label>
          <Input
            type='email'
            id='email'
            {...register('email')}
            placeholder='example@email.com'
            className={cn(emailParam && 'bg-muted')}
            disabled={!!emailParam}
            isError={!!errors.email}
          />
          {errors.email && <InputError>{errors.email.message}</InputError>}
        </InputGroup>

        <InputGroup className='mt-[24px]'>
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
          {errors.password && (
            <InputError>{errors.password.message}</InputError>
          )}
        </InputGroup>

        <InputGroup className='mt-[24px]'>
          <Label htmlFor='confirmPassword'>Confirm password</Label>
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
        <InputGroup className='mt-[24px]'>
          <Controller
            name='isTermsAndConditionsAccepted'
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className='items-top flex gap-3'>
                <Checkbox
                  id='isTermsAndConditionsAccepted'
                  onCheckedChange={onChange}
                  checked={value}
                  {...register('isTermsAndConditionsAccepted')}
                  className='h-6 w-6 lg:h-5 lg:w-5'
                />
                <div className='grid gap-1.5'>
                  <Label
                    htmlFor='isTermsAndConditionsAccepted'
                    className='text-sm font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    I agree to the platform&apos;s{' '}
                    <Link
                      href='https://www.nudgyt.com/terms-of-service'
                      target='_blank'
                      className='text-brandcolora hover:text-brandcolora/90 font-medium'
                    >
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link
                      href='https://www.nudgyt.com/privacy'
                      target='_blank'
                      className='text-brandcolora hover:text-brandcolora/90 font-medium'
                    >
                      Privacy Policy
                    </Link>{' '}
                  </Label>
                </div>
              </div>
            )}
          />
        </InputGroup>
        <Button
          className='mt-[40px] w-full lg:w-max mx-auto'
          disabled={isSubmitting || !watch('isTermsAndConditionsAccepted')}
        >
          {isSubmitting ? (
            <>
              <Loader className='w-4 h-4 mr-2 animate-spin' /> Signing up
            </>
          ) : (
            'Sign up'
          )}
        </Button>

        <p className='mt-[40px] text-sm text-center lg:text-base'>
          Already have an account?{' '}
          <Link
            href='/sign-in'
            className='font-medium underline lg:text-base text-brandcolora'
          >
            Log in
          </Link>
        </p>
      </form>
    </>
  )
}
