import React from 'react'
import { Card } from './ui/card'
import { cn } from '../utils'
import { Sparkle, Trophy } from 'lucide-react'
import colors from '../tailwind/colors'
import { GetScenarioExperience } from '../types'

export default function LearnerXPCard({
  experience,
  tier,
  nextLevelExp,
  expUntilNextLevel,
  percentage,
  nextTier,
  isUsedByLearner
}: GetScenarioExperience) {
  const TIER = {
    bronze: 'bronze',
    silver: 'silver',
    gold: 'gold'
  }
  const MAX_XP = 10000

  return (
    <Card
      className={`rounded-none col-span-1 w-full h-full bg-white px-4 lg:rounded-lg lg:p-6 ${isUsedByLearner ? 'space-y-10 py-10' : 'space-y-6 pt-10'}  `}
    >
      <div
        className={cn(
          `bg-gradient-to-b p-0 m-0 rounded-[8px] lg:bg-none lg:bg-white`,
          tier?.toLowerCase() === TIER.bronze &&
            'from-tier-bronze-from to-tier-bronze-to',
          tier?.toLowerCase() === TIER.silver &&
            'from-tier-silver-from to-tier-silver-to',
          tier?.toLowerCase() === TIER.gold &&
            'from-tier-gold-from to-tier-gold-to'
        )}
      >
        <div className='p-4 flex flex-col justify-between space-y-10 lg:space-y-10 lg:p-0'>
          <div className='flex justify-between'>
            <div className='space-y-3 block lg:flex lg:gap-3 w-full'>
              <div className='flex items-center justify-between w-full'>
                <div className='flex items-center text-white space-x-2 lg:text-black lg:p-3 lg:rounded-[8px] lg:gap-3 lg:bg-gradient-to-b lg:from-neutral-gray-100 lg:to-white'>
                  <Sparkle fill='#fff' className='block lg:hidden' />
                  <Sparkle
                    fill={colors.brandcolora}
                    stroke={colors.brandcolora}
                    className='hidden lg:block'
                  />
                  <h1 className='font-semibold text-xl lg:text-base'>
                    {experience?.toLocaleString()} XP
                  </h1>
                </div>
                <div
                  className={cn(
                    `hidden px-3 py-[6px] rounded-[8px] lg:flex items-center gap-3 lg:min-h-[41px] lg:min-w-[111px] lg:text-white lg:bg-gradient-to-b`,
                    tier?.toLowerCase() === TIER.bronze &&
                      'lg:from-tier-bronze-from lg:to-tier-bronze-to',
                    tier?.toLowerCase() === TIER.silver &&
                      'lg:from-tier-silver-from lg:to-tier-silver-to',
                    tier?.toLowerCase() === TIER.gold &&
                      'lg:from-tier-gold-from lg:to-tier-gold-to'
                  )}
                >
                  <Trophy className='h-4 w-4 lg:h-5 lg:w-5' />
                  <p className='text-sm leading-5 font-medium lg:text-base capitalize'>
                    {tier?.toLocaleLowerCase()}
                  </p>
                </div>
              </div>
              <p className='block font-light text-xs text-white lg:text-black lg:hidden'>
                {experience && experience >= MAX_XP
                  ? 'Max XP'
                  : `${expUntilNextLevel?.toLocaleString()} XP until ${nextTier}`}
              </p>
            </div>
            <div className='px-3 py-[6px] max-h-8 max-w-[100px] bg-white rounded-[8px] flex items-center gap-3 lg:hidden '>
              <Trophy className='h-4 w-[16px] lg:h-5 lg:w-5' />
              <p className='text-sm leading-[20px] font-medium lg:text-base capitalize'>
                {tier}
              </p>
            </div>
          </div>
          {/* <div className='space-y-3 grid grid-cols-1 lg:grid-cols-7 lg:space-y-0 lg:items-center'> */}
          <div className='space-y-0 lg:space-y-[10px]'>
            <div className='space-y-3 flex flex-col lg:flex lg:flex-row lg:flex-grow lg:space-y-0 lg:items-center lg:gap-4 w-full'>
              <div className='flex items-center w-full'>
                <div className='w-full bg-white overflow-hidden lg:bg-neutral-gray-200 rounded-sm'>
                  <div
                    className='bg-gradient-to-r from-purple-gradient-start to-purple-gradient-end h-2 border-[1px] border-white rounded-sm lg:bg-none lg:bg-brandcolora'
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              <p className='font-normal text-nowrap leading-[16px] text-xs text-white lg:text-sm lg:font-semibold lg:text-neutral-gray-600 lg:leading-[20px]'>
                {experience?.toLocaleString()} /{' '}
                {nextLevelExp?.toLocaleString()} XP
              </p>
            </div>
            <p className='hidden font-normal text-base lg:block text-white lg:text-black capitalize'>
              {experience && experience >= MAX_XP
                ? 'Max XP'
                : `${expUntilNextLevel?.toLocaleString()} XP until ${nextTier?.toLocaleLowerCase()}`}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
