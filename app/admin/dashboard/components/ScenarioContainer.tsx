'use client'

import ScenarioCard from '@/app/(shared)/components/ScenarioCard'
import scenarioService from '@/app/(shared)/services/admin/scenarioService'
import { separateScenarioTypes } from '@/app/(shared)/utils'
import useSWR from 'swr'

function ScenarioContainer() {
  const { data: allScenarios = [] } = useSWR(`/admin/scenarios`, () =>
    scenarioService.getScenarios().then((res) => res.data.data)
  )

  const { regularScenarios, standaloneScenarios } =
    separateScenarioTypes(allScenarios)

  return (
    <div className='p-6 lg:p-0 space-y-6'>
      <h2 className='text-2xl font-semibold'>Scenarios</h2>

      <section className='space-y-5'>
        <h3 className='text-lg font-semibold'>
          Selling human-centric lighting solutions
        </h3>

        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {regularScenarios.map((scenario) => (
            <ScenarioCard
              key={scenario._id}
              scenarioData={{ ...scenario }}
              isUsedByAdmin={true}
              link={`/admin/scenarios/${scenario._id}`}
            />
          ))}
        </div>
      </section>

      <section className='space-y-5'>
        <h3 className='text-lg font-semibold'>
          Selling falcoSENSE occupancy analytics
        </h3>

        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {standaloneScenarios &&
            standaloneScenarios.map((scenario: any) => (
              <ScenarioCard
                key={scenario._id}
                scenarioData={{ ...scenario }}
                isUsedByAdmin={true}
                link={`/admin/scenarios/${scenario._id}`}
              />
            ))}
        </div>
      </section>
    </div>
  )
}

export default ScenarioContainer
