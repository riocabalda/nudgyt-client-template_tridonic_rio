'use client'

import { Card } from '@/app/(shared)/components/ui/card'
import { ComponentProps, useState } from 'react'
import useGetSimulationResults from '../../hooks/useGetSimulationResults'
import SoftSkillsChart from '../charts/SoftSkillsChart'
import SkillCardCollapsible from './soft-skills/SkillCardCollapsible'

function ChartCard() {
  const { results } = useGetSimulationResults()

  const softSkills = results?.softSkills ?? null
  if (softSkills === null) {
    return null
  }

  const chartData: ComponentProps<typeof SoftSkillsChart>['data'] =
    softSkills.ratings.map(({ skill, score, total }) => ({
      label: skill,
      value: score,
      total
    }))

  return (
    <Card>
      <div className='hidden lg:block p-6'>
        <SoftSkillsChart data={chartData} height={384} size='md' withLabels />
      </div>
      <div className='lg:hidden p-4'>
        <SoftSkillsChart data={chartData} height={256} size='md' withLabels />
      </div>
    </Card>
  )
}

/** Show only one collapsible at a time */
function CollapsiblesGroup() {
  const { results } = useGetSimulationResults()
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)

  const softSkills = results?.softSkills

  function toggleSelectedIdx(idx: number) {
    setSelectedIdx((selectedIdx) => (selectedIdx === idx ? null : idx))
  }

  return (
    <div className='grid gap-4 lg:gap-6'>
      {softSkills?.ratings.map((rating, idx) => (
        <SkillCardCollapsible
          key={idx}
          rating={rating}
          open={selectedIdx === idx}
          onOpenChange={() => toggleSelectedIdx(idx)}
        />
      ))}
    </div>
  )
}

function SoftSkillsTab() {
  const { results } = useGetSimulationResults()

  const softSkills = results?.softSkills ?? null
  const hasSoftSkillsData = softSkills !== null && softSkills.ratings.length > 0

  if (!hasSoftSkillsData) {
    return (
      <article className='max-w-[712px] mx-auto px-4 lg:px-6'>
        <p className='text-center text-neutral-gray-600'>
          Soft skills scores are being generated and will be ready in a few
          minutes.
        </p>
      </article>
    )
  }

  return (
    <article className='max-w-[560px] mx-auto grid gap-4 lg:gap-6'>
      <ChartCard />

      <CollapsiblesGroup />
    </article>
  )
}

export default SoftSkillsTab
