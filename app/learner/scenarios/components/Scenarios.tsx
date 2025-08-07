'use client'

import FetchError from '@/app/(shared)/components/FetchError'
import ScenarioCard from '@/app/(shared)/components/ScenarioCard'
import scenarioService from '@/app/(shared)/services/learner/scenarioService'
import { separateScenarioTypes } from '@/app/(shared)/utils'
import { Loader, SearchX } from 'lucide-react'
import useSWR from 'swr'

function Scenarios() {
  const {
    data: allScenarios = [],
    isLoading,
    error
  } = useSWR(`/learner/scenarios/scenarios-current-status`, () =>
    scenarioService.getScenariosCurrentStatus().then((res) => res.data.data)
  )

  const { regularScenarios, standaloneScenarios } =
    separateScenarioTypes(allScenarios)
  const hasScenarios = allScenarios.length > 0

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

  if (!hasScenarios) {
    return (
      <div className='h-[500px] flex flex-col items-center justify-center'>
        <SearchX className='text-neutral-gray-300 size-[24px]' />
        <p className='text-sm text-muted-foreground mt-[10px]'>No scenarios</p>
      </div>
    )
  }

  return (
    <article className='space-y-9'>
      <section className='space-y-5'>
        <h2 className='text-lg font-semibold'>
          Selling human-centric lighting solutions
        </h2>

        <ul className='grid gap-[24px] lg:grid-cols-3 px-4 lg:px-0'>
          {regularScenarios.map((scenario) => (
            <li key={scenario._id}>
              <ScenarioCard
                scenarioData={scenario}
                link={`/learner/scenarios/${scenario._id}`}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className='space-y-5'>
        <h2 className='text-lg font-semibold'>
          Selling falcoSENSE occupancy analytics
        </h2>

        <ul className='grid gap-[24px] lg:grid-cols-3 px-4 lg:px-0'>
          {standaloneScenarios.map((scenario) => (
            <li key={scenario._id}>
              <ScenarioCard
                scenarioData={scenario}
                link={`/learner/scenarios/${scenario._id}`}
              />
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

export default Scenarios
