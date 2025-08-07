import { Card } from '@/app/(shared)/components/ui/card'
import { ScenarioType } from '@/app/(shared)/types'
import { cn, getDisplayScenarioTitle } from '@/app/(shared)/utils'
import DOMPurify from 'dompurify'
import SimulationModal, { ModalTitle } from './SimulationModal'

function Profile({ scenarioData }: { scenarioData: ScenarioType }) {
  const sanitizedSummaryHTML = DOMPurify.sanitize(scenarioData.summary)

  return (
    <>
      <Card className='rounded-t-[8px] rounded-b-none border border-b-transparent flex-1 p-6 overflow-y-auto scrollbar-thin'>
        <h1 className='text-foreground text-lg font-semibold'>
          {getDisplayScenarioTitle(scenarioData)}
        </h1>
        <div
          className={cn(
            'mt-6',
            'text-sm',
            [
              'text-muted-foreground',
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
      <Card className='rounded-b-[8px] rounded-t-none border border-t-transparent p-6'>
        <SimulationModal title={ModalTitle.LEAVE_SCENARIO} />
      </Card>
    </>
  )
}

export default Profile
