'use client'

import FetchError from '@/app/(shared)/components/FetchError'
import { Card } from '@/app/(shared)/components/ui/card'
import { cn, getDisplayScenarioTitle } from '@/app/(shared)/utils'
import { HttpStatusCode } from 'axios'
import DOMPurify from 'dompurify'
import { Loader } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import useGetScenario from '../hooks/useGetScenarios'
import PreviousAttempts from './PreviewsAttempts'

function ScenarioDetails() {
  const router = useRouter()
  const { scenarioId } = useParams()
  const { data, isLoading, error } = useGetScenario(String(scenarioId))

  if (error?.response?.status === HttpStatusCode.Forbidden)
    router.push('/learner/dashboard')

  if (error) {
    return (
      <div className='grid place-items-center p-4'>
        <FetchError errorMessage={error?.response?.data?.message} />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='grid place-items-center p-4'>
        <Loader className='w-4 h-4 mr-2 animate-spin' />
      </div>
    )
  }

  const scenarioData = data?.data
  if (!scenarioData) {
    return null
  }

  const summary = scenarioData.summary ?? null
  if (summary === null) {
    return null
  }

  const sanitizedSummaryHTML = DOMPurify.sanitize(summary)

  return (
    <div className='px-4 lg:px-[40px] py-[40px] max-w-[715px] mx-auto'>
      <div className='flex flex-col gap-[25px]'>
        <h2 className='text-[24px] font-semibold'>
          {getDisplayScenarioTitle(scenarioData)}
        </h2>
        <Card className='flex flex-col p-8'>
          <h2 className='text-[18px] font-semibold pb-4'>
            <span>Scenario Summary</span>
          </h2>

          <div
            className={cn(
              'text-sm',
              [
                'text-neutral-gray-600',
                '[&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_h4]:text-foreground [&_h5]:text-foreground [&_h6]:text-foreground'
              ],
              [
                '[&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold [&_h4]:font-semibold [&_h5]:font-semibold [&_h6]:font-semibold',
                '[&_strong]:font-semibold'
              ],
              [
                'grid gap-2 lg:gap-3',
                '[&_ul]:grid [&_ul]:gap-2 [&_ul]:lg:gap-3',
                '[&_ol]:grid [&_ol]:gap-2 [&_ol]:lg:gap-3'
              ],
              '[&_ul]:list-disc [&_ul]:list-outside [&_ul]:ml-5 [&_ul]:lg:ml-6'
            )}
            dangerouslySetInnerHTML={{ __html: sanitizedSummaryHTML }}
          ></div>
        </Card>
        <PreviousAttempts />
      </div>
    </div>
  )
}

export default ScenarioDetails
