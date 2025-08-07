'use client'

import FetchError from '@/app/(shared)/components/FetchError'
import { Loader } from 'lucide-react'
import useGetSimulationResults from '../hooks/useGetSimulationResults'
import InfoTabs from './InfoTabs'
import ResultsHeading from './ResultsHeading'
import ResultsOverview from './ResultsOverview'

function SimulationResults() {
  const { resultsFetch } = useGetSimulationResults()

  if (resultsFetch.isLoading) {
    return (
      <div className='grid place-items-center p-4'>
        <Loader className='w-4 h-4 mr-2 animate-spin' />
      </div>
    )
  }

  if (resultsFetch.error) {
    return (
      <div className='grid place-items-center p-4'>
        <FetchError
          errorMessage={resultsFetch.error?.response?.data?.message}
        />
      </div>
    )
  }

  return (
    <article>
      <>
        <div className='hidden lg:block p-6'>
          <ResultsOverview />
        </div>
        <div className='lg:hidden p-4'>
          <ResultsHeading />
        </div>
      </>

      <InfoTabs />
    </article>
  )
}

export default SimulationResults
