'use client'

import { Card } from '@/app/(shared)/components/ui/card'
import { hasStringData } from '@/app/(shared)/utils'
import { ComponentProps } from 'react'
import useGetSimulationResults from '../../hooks/useGetSimulationResults'
import SoftSkillsChart from '../charts/SoftSkillsChart'

function SoftSkillsCardContent() {
  const { results } = useGetSimulationResults()

  const softSkills = results?.softSkills ?? null

  const hasSoftSkillsData = softSkills !== null && softSkills.ratings.length > 0
  if (!hasSoftSkillsData) {
    return (
      <p className='text-neutral-gray-600 text-sm'>
        Soft skills scores are being generated and will be ready in a few
        minutes.
      </p>
    )
  }

  const chartData: ComponentProps<typeof SoftSkillsChart>['data'] =
    softSkills.ratings.map(({ skill, score, total }) => ({
      label: skill,
      value: score,
      total
    }))

  return (
    <>
      <SoftSkillsChart data={chartData} height={176} size='md' withLabels />

      {hasStringData(softSkills.summary) && (
        <p className='text-sm text-neutral-gray-600'>{softSkills.summary}</p>
      )}
    </>
  )
}

function SoftSkillsCard() {
  return (
    <Card className='grid gap-4 p-4 lg:p-6'>
      <h3 className='text-lg font-semibold'>Soft Skills</h3>

      <SoftSkillsCardContent />
    </Card>
  )
}

export default SoftSkillsCard
