'use client'
import { Card } from '@/app/(shared)/components/ui/card'
import useGetUserTimeRemaining from '../../simulations/[simulationId]/hooks/useGetUserTimeRemaining'
import { millisecondsToTimeString } from '@/app/(shared)/utils'
import useUser from '@/app/(shared)/hooks/useUser'
import RequestExtensionConfirmationModal from '@/app/(shared)/components/RequestExtensionConfirmationModal'
import { useState } from 'react'

function RemainingTimeCard() {
  const { userTimeRemaining } = useGetUserTimeRemaining()
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const remainingTime = millisecondsToTimeString(userTimeRemaining, false)
  const totalTime = millisecondsToTimeString(user?.total_time, false)
  return (
    <Card className='p-6 flex justify-between flex-wrap space-y-4 lg:space-y-0'>
      <div className='grid grid-cols-1'>
        <p className='font-bold text-lg'>Remaining Time</p>
        <h1 className='text-brandcolora font-semibold text-3xl lg:text-4xl xl:place-self-end'>
          {remainingTime.timeString}{' '}
          <span className='text-base text-neutral-400 font-normal'>
            out of {totalTime.timeString}
          </span>
        </h1>
      </div>
      <div className='flex items-end gap-5 lg:gap-0'>
        <RequestExtensionConfirmationModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </Card>
  )
}

export default RemainingTimeCard
