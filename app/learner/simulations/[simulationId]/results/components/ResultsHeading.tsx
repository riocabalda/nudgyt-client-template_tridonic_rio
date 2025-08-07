'use client'

import StyledTooltip from '@/app/(shared)/components/StyledTooltip'
import { Button } from '@/app/(shared)/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/app/(shared)/components/ui/dropdown-menu'
import { formatDateTime } from '@/app/(shared)/utils'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import useGetSimulationResults from '../hooks/useGetSimulationResults'

function PreviousAttemptLink() {
  const { results } = useGetSimulationResults()

  const previousAttempt = results?.previousAttempt

  const hasNoPreviousSim = previousAttempt === undefined
  if (hasNoPreviousSim) {
    return (
      <button disabled className='disabled:opacity-50'>
        <ChevronLeft className='size-5 lg:size-6' />
      </button>
    )
  }

  const prevSimId = previousAttempt._id

  return (
    <StyledTooltip
      withArrow={false}
      contentSide='top'
      trigger={
        <Button
          asChild
          variant='ghost'
          size='icon'
          className='size-fit text-inherit p-1'
        >
          <Link href={`/learner/simulations/${prevSimId}/results`}>
            <ChevronLeft className='size-5 lg:size-6' />
          </Link>
        </Button>
      }
      content={<p>Previous Attempt</p>}
    />
  )
}

function NextAttemptLink() {
  const { results } = useGetSimulationResults()

  const nextAttempt = results?.nextAttempt

  const hasNoNextSim = nextAttempt === undefined
  if (hasNoNextSim) {
    return (
      <button disabled className='disabled:opacity-50'>
        <ChevronRight className='size-5 lg:size-6' />
      </button>
    )
  }
  const nextSimId = nextAttempt._id

  return (
    <StyledTooltip
      withArrow={false}
      contentSide='top'
      trigger={
        <Button
          asChild
          variant='ghost'
          size='icon'
          className='size-fit text-inherit p-1'
        >
          <Link href={`/learner/simulations/${nextSimId}/results`}>
            <ChevronRight className='size-5 lg:size-6' />
          </Link>
        </Button>
      }
      content={<p>Next Attempt</p>}
    />
  )
}

function SimulationLinksDropdown() {
  const { results } = useGetSimulationResults()

  const simulation = results?.simulation
  const allAttempts = results?.allAttempts

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='group'>
        <Button
          variant='ghost'
          size='sm'
          className='flex gap-2 items-center text-neutral-gray-800 text-sm lg:text-base font-medium lg:font-semibold'
        >
          {simulation !== undefined && simulation.started_at !== null && (
            <span>{formatDateTime(simulation?.started_at)}</span>
          )}

          <ChevronDown className='size-3 lg:size-4 transition group-data-[state=open]:rotate-180' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='max-h-48 overflow-y-auto scrollbar-thin'>
        <DropdownMenuLabel>Simulations</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {allAttempts?.map((sim) => (
          <DropdownMenuItem
            key={sim._id}
            disabled={sim._id === simulation?._id}
          >
            {sim.started_at !== null && (
              <Link href={`/learner/simulations/${sim._id}/results`}>
                {formatDateTime(sim.started_at)}
              </Link>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ResultsHeading() {
  const { results } = useGetSimulationResults()

  const scenario = results?.scenario

  return (
    <header className='grid gap-4'>
      <nav className='flex gap-4 items-center'>
        <PreviousAttemptLink />
        <NextAttemptLink />
        <SimulationLinksDropdown />
      </nav>

      <h2 className='font-semibold text-2xl'>{scenario?.title}</h2>
    </header>
  )
}

export default ResultsHeading
