'use client'

import { Card } from '@/app/(shared)/components/ui/card'
import {
  cn,
  formatDateTime,
  getDisplayScenarioTitle
} from '@/app/(shared)/utils'
import { ChevronRight, Lock } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import serverConfig from '../config/serverConfig'
import { ScenarioType } from '../types'
import { Badge } from './ui/badge'

type ScenarioCardProps = {
  scenarioData: ScenarioType & {
    simulation?: {
      _id: string
      learner_id: string
      scenario_id: string
      started_at: Date
      paused_at: Date[]
      resumed_at: Date[]
      ended_at: Date
    }
    isLocked?: boolean
    isPassed?: boolean
    requiredScenario?: number
  }
  link: string
  isUsedByAdmin?: boolean
}

function ScenarioCard({
  scenarioData,
  link,
  isUsedByAdmin
}: ScenarioCardProps) {
  const router = useRouter()

  const handleGoToScenarioDetails = () => {
    if (scenarioData.isLocked && !isUsedByAdmin) return

    router.push(link)
  }

  return (
    <Card
      className='overflow-hidden relative flex flex-col h-full cursor-pointer'
      onClick={handleGoToScenarioDetails}
    >
      <div className='relative pb-[32%]'>
        <Image
          src={serverConfig.assetUrl + scenarioData.thumbnail}
          fill
          alt='Environment image'
          className='absolute object-cover'
        />
      </div>
      <div className='p-4 flex flex-col h-full'>
        <div className='flex justify-between grow gap-3'>
          <h4 className='text-sm font-semibold lg:text-base line-clamp-2'>
            {getDisplayScenarioTitle(scenarioData, 'Pitch')}
          </h4>
          <ChevronRight className='text-muted-foreground shrink-0' />
        </div>
        <div className='flex items-end justify-between'>
          <div>
            {scenarioData.isLocked && !scenarioData.isPassed && (
              <p className='mt-4 text-muted-foreground font-normal text-sm leading-none'>
                Complete{' '}
                <span className='font-bold'>
                  Scenario {scenarioData.requiredScenario}
                </span>{' '}
                to unlock
              </p>
            )}
            {scenarioData.simulation?.started_at && (
              <>
                <p className='mt-4 text-muted-foreground font-medium text-[10px] lg:text-xs leading-none'>
                  LAST ATTEMPT
                </p>
                <p className='mt-1 text-xs lg:text-sm'>
                  {scenarioData.simulation?.started_at
                    ? formatDateTime(
                        scenarioData.simulation?.started_at.toString()
                      )
                    : '-'}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      {scenarioData?.isLocked && (
        <div className='bg-white/50 h-full w-full absolute' />
      )}
      {scenarioData?.isLocked && (
        <Badge
          className={cn(
            `absolute text-xs top-[18px] right-4 rounded-sm bg-white uppercase border-[1px] flex items-center justify-center gap-1 tracking-wider font-medium px-2 text-red-500 border-red-500`
          )}
          variant={'outline'}
        >
          <Lock size={12} strokeWidth={3} />
          Locked
        </Badge>
      )}
    </Card>
  )
}

export default ScenarioCard
