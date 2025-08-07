'use client'

import { Button } from '@/app/(shared)/components/ui/button'
import { Card } from '@/app/(shared)/components/ui/card'
import { cn } from '@/app/(shared)/utils'
import DOMPurify from 'dompurify'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import useGetSimulationResults from '../../hooks/useGetSimulationResults'

function TipsSlider(props: { tips: string[] }) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const { tips } = props

  function goToPreviousTip() {
    setSelectedIdx((idx) => Math.max(idx - 1, 0))
  }
  function goToNextTip() {
    setSelectedIdx((idx) => Math.min(idx + 1, maxTipIdx))
  }
  function goToTip(idx: number) {
    setSelectedIdx(() => idx)
  }

  const tipCt = tips?.length ?? 0
  const maxTipIdx = tipCt - 1

  return (
    <>
      <section className='mb-6 lg:mb-8 grid grid-flow-col lg:grid-cols-[auto_1fr_auto] items-center gap-10'>
        <Button
          variant='ghost'
          size='icon'
          disabled={selectedIdx === 0}
          onClick={goToPreviousTip}
          className='hidden lg:block p-2 disabled:opacity-25 disabled:bg-inherit disabled:hover:bg-inherit disabled:text-inherit size-fit'
        >
          <ChevronLeft className='size-6' />
        </Button>

        <div className='grid *:row-[1] *:col-[1] overflow-clip'>
          {tips.map((tip, idx) => (
            <section
              key={idx}
              className={cn(
                'max-h-64 overflow-y-auto scrollbar-thin pr-4 lg:pr-6',
                'text-sm lg:text-base',
                'transition duration-500',
                selectedIdx < idx && 'translate-x-full opacity-0',
                idx < selectedIdx && '-translate-x-full opacity-0'
              )}
            >
              <div
                className={cn(
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
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(tip)
                }}
              ></div>
            </section>
          ))}
        </div>

        <Button
          variant='ghost'
          size='icon'
          disabled={selectedIdx === maxTipIdx}
          onClick={goToNextTip}
          className='hidden lg:block p-2 disabled:opacity-25 disabled:bg-inherit disabled:hover:bg-inherit disabled:text-inherit size-fit'
        >
          <ChevronRight className='size-6' />
        </Button>
      </section>

      <footer>
        <div className='flex lg:hidden justify-between items-center'>
          <Button
            variant='ghost'
            size='icon'
            disabled={selectedIdx === 0}
            onClick={goToPreviousTip}
            className='p-1 disabled:opacity-25 disabled:bg-inherit disabled:hover:bg-inherit disabled:text-inherit size-fit'
          >
            <ChevronLeft className='size-6' />
          </Button>

          <p className='text-xs'>
            {selectedIdx + 1} of {tipCt}
          </p>

          <Button
            variant='ghost'
            size='icon'
            disabled={selectedIdx === maxTipIdx}
            onClick={goToNextTip}
            className='p-1 disabled:opacity-25 disabled:bg-inherit disabled:hover:bg-inherit disabled:text-inherit size-fit'
          >
            <ChevronRight className='size-6' />
          </Button>
        </div>

        <div className='mb-2 hidden lg:block'>
          <ol className='flex gap-3 mx-auto w-min'>
            {tips.map((_, idx) => (
              <li key={idx}>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => goToTip(idx)}
                  className={cn(
                    'size-2 rounded-full',
                    'bg-neutral-gray-400 hover:bg-neutral-gray-400',
                    idx === selectedIdx && 'bg-brandcolora hover:bg-brandcolora'
                  )}
                ></Button>
              </li>
            ))}
          </ol>
        </div>
      </footer>
    </>
  )
}

function TipsCard() {
  const { results } = useGetSimulationResults()

  const tips = results?.tips

  const hasTips = tips !== undefined && tips.length > 0

  return (
    <Card className='shadow-sm rounded-[8px] p-4 lg:p-6'>
      <h3 className='mb-4 lg:mb-6 text-lg font-semibold'>
        Tips for Improvement
      </h3>

      {!hasTips ? (
        <p className='text-destructive text-sm lg:text-base'>
          Your personalized tips are being generated and will be ready soon.
          Please refresh the page in about 2 minutes to view your AI-generated
          results.
        </p>
      ) : (
        <TipsSlider tips={tips} />
      )}
    </Card>
  )
}

export default TipsCard
