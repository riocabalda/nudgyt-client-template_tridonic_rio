'use client'

import ScenarioCard from '@/app/(shared)/components/ScenarioCard'
import scenarioService from '@/app/(shared)/services/learner/scenarioService'
import { separateScenarioTypes } from '@/app/(shared)/utils'
import useSWR from 'swr'

function ScenarioContainer() {
  const { data: allScenarios = [] } = useSWR(
    `/learner/scenarios/scenarios-current-status`,
    () =>
      scenarioService.getScenariosCurrentStatus().then((res) => res.data.data)
  )

  const { regularScenarios, standaloneScenarios } =
    separateScenarioTypes(allScenarios)

  return (
    <div className='p-6 lg:p-0 space-y-9'>
      <section>
        <h2 className='text-2xl font-semibold'>Scenarios</h2>

        <p className='text-sm text-muted-foreground lg:text-base mt-[18px]'>
          Pitch Tridonic&apos;s lighting solutions to the potential clients
          based on the e-mail you received. Ask questions to learn more about
          their needs and challenges, and negotiate to close a sale.
        </p>
      </section>

      <section className='space-y-5'>
        <h3 className='text-lg font-semibold'>
          Selling human-centric lighting solutions
        </h3>

        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {regularScenarios &&
            regularScenarios.map((scenario: any) => (
              <ScenarioCard
                key={scenario._id}
                scenarioData={{ ...scenario }}
                link={`/learner/scenarios/${scenario._id}`}
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
                link={`/learner/scenarios/${scenario._id}`}
              />
            ))}
        </div>
      </section>
    </div>
  )
}

export default ScenarioContainer
