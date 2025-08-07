import { Card } from '@/app/(shared)/components/ui/card'
import { formatDateTime, getSimulationUsedTime } from '@/app/(shared)/utils'
import moment from 'moment-timezone'
import useGetSimulationResults from '../../hooks/useGetSimulationResults'

function formatDiff(diffMs: number) {
  const diffStr = moment.utc(diffMs).format('HH:mm:ss')

  return diffStr
}

function CompletedTimeCard() {
  const { results } = useGetSimulationResults()

  const simulation = results?.simulation ?? null
  const simStart = results?.simulation.started_at ?? null
  const simEnd = results?.simulation.ended_at ?? null

  if (simulation === null || simStart === null || simEnd === null) {
    return null
  }

  const durationMs = getSimulationUsedTime(simulation)
  const durationStr = formatDiff(durationMs)
  const startStr = formatDateTime(simStart)
  const endStr = formatDateTime(simEnd)

  return (
    <Card className='grid gap-4 lg:gap-6 p-4 lg:p-6'>
      <header className='grid gap-4 lg:gap-6'>
        <h3 className='text-lg font-semibold'>Completed Time</h3>
        <p className='text-neutral-gray-600 text-2xl font-medium'>
          {durationStr}
        </p>
      </header>

      <hr className='border-neutral-gray-400' />

      <section className='grid gap-3'>
        <p className='flex justify-between gap-3 text-sm text-neutral-gray-600'>
          <span className='font-semibold'>Start time</span>
          <span>{startStr}</span>
        </p>
        <p className='flex justify-between gap-3 text-sm text-neutral-gray-600'>
          <span className='font-semibold'>End time</span>
          <span>{endStr}</span>
        </p>
      </section>
    </Card>
  )
}

export default CompletedTimeCard
