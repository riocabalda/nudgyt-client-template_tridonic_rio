'use client'

import scenarioService from '@/app/(shared)/services/admin/scenarioService'
import { GetLearnerPerScenario } from '@/app/(shared)/types'
import { getDisplayScenarioTitle } from '@/app/(shared)/utils'
import useSWR from 'swr'

function LearnerPerScenarioSection() {
  const { data } = useSWR(`/admin/scenarios/stats`, () =>
    scenarioService.getLearnerPerScenario().then((res) => res.data)
  )
  return (
    <div className='space-y-6 pl-0 xl:pl-10'>
      <h1 className='text-xl lg:text-2xl text-brandcolora font-semibold'>
        Learners per scenario
      </h1>
      <div className='grid grid-cols-4 gap-4'>
        <h5 className='text-sm lg:text-base col-span-3 font-semibold'>
          Scenario
        </h5>
        <h5 className='text-sm lg:text-base col-span-1 text-right font-semibold'>
          Learners
        </h5>
        {data?.data.map((scenario: GetLearnerPerScenario) => (
          <>
            <p className='text-sm lg:text-base col-span-3'>
              {getDisplayScenarioTitle({
                is_standalone: scenario.is_scenario_standalone,
                scenario_number: scenario.scenario_number,
                title: scenario.scenario_title
              })}
            </p>
            <p className='text-sm lg:text-base col-span-1 text-right'>
              {scenario.learners}
            </p>
          </>
        ))}
      </div>
    </div>
  )
}

export default LearnerPerScenarioSection
