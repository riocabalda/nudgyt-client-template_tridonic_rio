'use client'

import { cn } from '@/app/(shared)/utils'
import moment from 'moment-timezone'
import useGetSimulationResults from '../hooks/useGetSimulationResults'

function formatRemainingTime(timeMs: number) {
  const timeStr = moment.utc(timeMs).format('HH:mm:ss')

  return timeStr
}

function RemainingTime() {
  const { userTimeRemaining } = useGetSimulationResults()

  const hasRemainingTime = userTimeRemaining > 0
  const remainingTimeStr = formatRemainingTime(userTimeRemaining)

  return (
    <p
      className={cn(
        'text-neutral-gray-600',
        !hasRemainingTime && 'text-destructive'
      )}
    >
      Remaining time: <span className='font-bold'>{remainingTimeStr}</span>
    </p>
  )
}

export default RemainingTime
