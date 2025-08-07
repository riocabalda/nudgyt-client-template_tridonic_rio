import StyledTooltip from '@/app/(shared)/components/StyledTooltip'
import { Card } from '@/app/(shared)/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/app/(shared)/components/ui/collapsible'
import { SoftSkillRating } from '@/app/(shared)/types'
import { hasStringData } from '@/app/(shared)/utils'
import { ChevronDown } from 'lucide-react'
import { ComponentProps } from 'react'

function SkillCardCollapsible(props: {
  rating: SoftSkillRating
  open: ComponentProps<typeof Collapsible>['open']
  onOpenChange: ComponentProps<typeof Collapsible>['onOpenChange']
}) {
  const { rating, open, onOpenChange } = props

  const { skill, score, total, description, rubrics } = rating

  const hasDescription = hasStringData(description)
  const hasRubrics = rubrics.length > 1
  const hasContent = hasDescription || hasRubrics

  return (
    <Collapsible open={open} onOpenChange={onOpenChange} className='group'>
      <Card>
        <CollapsibleTrigger disabled={!hasContent} className='w-full'>
          <header className='flex items-center justify-between gap-4 p-4 lg:p-6'>
            <h4 className='font-semibold lg:text-xl'>{skill}</h4>

            <div className='flex items-center gap-4'>
              <span className='font-semibold lg:text-xl text-brandcolora'>
                {score}/{total}
              </span>

              {hasContent && (
                <ChevronDown className='size-5 transition group-data-[state=open]:rotate-180' />
              )}
            </div>
          </header>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className='grid gap-6 p-4 lg:p-6 pt-0 lg:pt-0'>
            {hasDescription && <p>{description}</p>}

            {hasDescription && <hr className='border-neutral-gray-500' />}

            {hasRubrics && (
              <section className='grid gap-2 p-4 rounded-lg bg-neutral-gray-50'>
                <h5 className='font-semibold text-sm'>Assessment Rubrics</h5>

                <ul className='grid gap-2'>
                  {rubrics.map(({ name, description, score }, idx) => (
                    <li
                      key={idx}
                      className='flex justify-between gap-4 text-sm lg:text-base'
                    >
                      <StyledTooltip
                        withArrow={false}
                        contentSide='top'
                        trigger={
                          <p className='select-none cursor-help text-neutral-gray-600'>
                            {name}
                          </p>
                        }
                        content={
                          <p className='text-center text-xs'>{description}</p>
                        }
                      />

                      <StyledTooltip
                        withArrow={false}
                        contentSide='top'
                        trigger={
                          <p className='select-none cursor-help text-brandcolora font-semibold text-right'>
                            {score.level}
                          </p>
                        }
                        content={
                          <p className='text-center text-xs'>
                            {score.description}
                          </p>
                        }
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

export default SkillCardCollapsible
