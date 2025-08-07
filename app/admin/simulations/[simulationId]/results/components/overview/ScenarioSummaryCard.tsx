'use client'

import { Card } from '@/app/(shared)/components/ui/card'
import { cn } from '@/app/(shared)/utils'
import DOMPurify from 'dompurify'
import useGetSimulationResults from '../../hooks/useGetSimulationResults'

function ScenarioSummaryCard() {
  const { results } = useGetSimulationResults()

  const summary = results?.scenario.summary ?? null
  if (summary === null) {
    return null
  }

  const sanitizedSummaryHTML = DOMPurify.sanitize(summary)

  return (
    <Card className='grid gap-4 lg:gap-6 p-4 lg:p-6'>
      <h3 className='text-lg font-semibold'>Scenario Summary</h3>

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
  )
}

export default ScenarioSummaryCard
