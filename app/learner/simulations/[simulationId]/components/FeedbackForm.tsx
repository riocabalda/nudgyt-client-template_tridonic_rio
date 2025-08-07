'use client'

import InputError from '@/app/(shared)/components/form/InputError'
import InputGroup from '@/app/(shared)/components/form/InputGroup'
import { Button } from '@/app/(shared)/components/ui/button'
import { Card } from '@/app/(shared)/components/ui/card'
import { Textarea } from '@/app/(shared)/components/ui/textarea'
import simulationService from '@/app/(shared)/services/learner/simulationService'
import { cn } from '@/app/(shared)/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
import { useGetSimulationSurvey } from '../hooks/useGetSimulationSurvey'

const schema = z.object({
  confident: z
    .number()
    .min(1, { message: 'Please select a rating between 1 and 6.' })
    .max(6, { message: 'Please select a rating between 1 and 6.' }),
  useful: z
    .number()
    .min(1, { message: 'Please select a rating between 1 and 6.' })
    .max(6, { message: 'Please select a rating between 1 and 6.' }),
  easy: z
    .number()
    .min(1, { message: 'Please select a rating between 1 and 6.' })
    .max(6, { message: 'Please select a rating between 1 and 6.' }),
  comment: z.string().min(1, { message: 'Please provide your comments.' })
})

// Define the form data type based on the schema
type FormData = z.infer<typeof schema>

function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)
  const { simulationId } = useParams()
  const choices = [1, 2, 3, 4, 5, 6]

  const searchParams = useSearchParams()
  const router = useRouter()
  const params = new URLSearchParams(searchParams.toString())

  const { mutateSurvey } = useGetSimulationSurvey(String(simulationId))

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const confidenceRating = watch('confident')
  const simulationRating = watch('useful')
  const platformRating = watch('easy')
  const comments = watch('comment')

  const isFormValid =
    confidenceRating && simulationRating && platformRating && comments

  useEffect(() => {
    params.delete('panel')
    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.push(newUrl)
  }, [])

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true)
    const payload = {
      simulation_id: String(simulationId),
      ...data
    }

    try {
      await simulationService.createSimulationSurvey(payload)
      mutateSurvey()
      const newUrl = `${window.location.pathname}/results`
      router.push(newUrl)
    } catch (error: any) {
      setIsSubmitting(false)
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col'>
      <Card className='flex flex-col gap-6 lg:gap-10 p-4 lg:p-10 mt-10 rounded-[8px]'>
        <div className='flex flex-col items-center justify-center gap-6'>
          <svg
            width='60'
            height='60'
            viewBox='0 0 60 60'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M18.0246 37.5L6.64965 17.85C6.15915 17.0022 5.92847 16.029 5.98625 15.0512C6.04403 14.0734 6.38772 13.1342 6.97465 12.35L10.9996 7C11.4654 6.37902 12.0693 5.875 12.7636 5.52786C13.4579 5.18073 14.2234 5 14.9996 5H44.9996C45.7759 5 46.5414 5.18073 47.2357 5.52786C47.93 5.875 48.5339 6.37902 48.9996 7L52.9996 12.35C53.5905 13.1316 53.9386 14.0696 54.0008 15.0474C54.063 16.0252 53.8366 16.9998 53.3496 17.85L41.9746 37.5M27.5 29.9999L12.8 5.49988M32.4998 29.9999L47.1998 5.49988M19.9998 17.5H39.9998M29.9998 45V40H28.7498M42.4998 42.5C42.4998 49.4036 36.9033 55 29.9998 55C23.0962 55 17.4998 49.4036 17.4998 42.5C17.4998 35.5964 23.0962 30 29.9998 30C36.9033 30 42.4998 35.5964 42.4998 42.5Z'
              stroke='#1A4595'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <h1 className='font-medium text-[32px] leading-10'>Well done!</h1>
        </div>
        <h3 className='text-sm lg:text-base text-muted-foreground'>
          We’d love to hear your feedback about your experience with the
          platform.
        </h3>
        <form
          id='feedbackForm'
          ref={formRef}
          className='flex flex-col gap-6 lg:gap-10'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <span className='text-sm lg:text-base text-foreground-800 font-medium'>
              How useful has this simulation been?
            </span>
            <div className='flex gap-3 mt-2'>
              {choices.map((num) => (
                <Button
                  className={cn(
                    'text-sm lg:text-base w-[70px] py-1 h-fit',
                    simulationRating === num && 'disabled:text-foreground'
                  )}
                  key={num}
                  variant='outline'
                  disabled={simulationRating === num}
                  onClick={() => setValue('useful', num)}
                >
                  {num}
                </Button>
              ))}
            </div>
            <div className='flex justify-between text-xs text-gray-800 mt-2'>
              <span>Not useful</span>
              <span>Very useful</span>
            </div>
            {errors.useful && <InputError>{errors.useful.message}</InputError>}
          </div>
          <div>
            <span className='text-sm lg:text-base text-foreground-800 font-medium'>
              How easy has the platform been to use?
            </span>
            <div className='flex gap-3 mt-2'>
              {choices.map((num) => (
                <Button
                  className={cn(
                    'text-sm lg:text-base w-[70px] py-1 h-fit',
                    platformRating === num && 'disabled:text-foreground'
                  )}
                  key={num}
                  variant='outline'
                  disabled={platformRating === num}
                  onClick={() => setValue('easy', num)}
                >
                  {num}
                </Button>
              ))}
            </div>
            <div className='flex justify-between text-xs text-gray-800 mt-2'>
              <span>Not easy</span>
              <span>Very easy</span>
            </div>
            {errors.easy && <InputError>{errors.easy.message}</InputError>}
          </div>
          <div>
            <span className='text-sm lg:text-base text-foreground-800 font-medium'>
              Do you feel more confident after the practice?
            </span>
            <div className='flex gap-3 mt-2'>
              {choices.map((num) => (
                <Button
                  className={cn(
                    'text-sm lg:text-base w-[70px] py-1 h-fit',
                    confidenceRating === num && 'disabled:text-foreground'
                  )}
                  key={num}
                  variant='outline'
                  disabled={confidenceRating === num}
                  onClick={() => setValue('confident', num)}
                >
                  {num}
                </Button>
              ))}
            </div>
            <div className='flex justify-between text-xs text-gray-800 mt-2'>
              <span>Not confident</span>
              <span>Very confident</span>
            </div>
            {errors.confident && (
              <InputError>{errors.confident.message}</InputError>
            )}
          </div>
          <div>
            <span className='text-sm lg:text-base text-foreground-800 font-medium'>
              Do you have any comments on how to improve the scenario?
            </span>
            <div className='flex flex-col mt-2'>
              <InputGroup>
                <Textarea
                  {...register('comment')}
                  className='text-sm lg:text-base w-full rounded-sm focus:!ring-transparent'
                  placeholder='Share your feedback...'
                />
              </InputGroup>
              {errors.comment && (
                <InputError>{errors.comment.message}</InputError>
              )}
            </div>
          </div>
        </form>
        <Button
          variant='default'
          form='feedbackForm'
          type='submit'
          onClick={() => formRef.current?.requestSubmit()}
          className='w-full lg:w-fit z-50 lg:self-center'
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting && <Loader className='w-4 h-4 mr-2 animate-spin' />}View
          Result
        </Button>
      </Card>
    </div>
  )
}

export default FeedbackForm
