import React, { useLayoutEffect, useState } from 'react'
import { cn, millisecondsToSeconds, padStartTime } from '@/app/(shared)/utils'
import { useTimer } from 'react-timer-hook'
import { useParams } from 'next/navigation'
import { useGetSimulation } from '../hooks/useGetSimulation'
import PieChartTimer from './PieChartTimer'
import SimulationModal, { ModalTitle, SimulationTime } from './SimulationModal'
import useUser from '@/app/(shared)/hooks/useUser'
import io from 'socket.io-client'
import authTokenService from '@/app/(shared)/services/authTokenService'
import serverConfig from '@/app/(shared)/config/serverConfig'
import useTimeReminderStore from '../hooks/useTimeReminderStore'

function TimerValue({
  userTimeRemaining,
  isLoading,
  error
}: {
  userTimeRemaining: number
  isLoading: boolean
  error: boolean
}) {
  const [openModalByTitle, setOpenModalByTitle] = useState<string | null>(null)
  const [isInitialized, setIsInitialize] = useState(false)
  const [timerStarted, setTimerStarted] = useState(false)
  const [hasTimeLeft, setHasTimeLeft] = useState(false)

  const { users, setUserId, setIsTwentyMinutes, setIsFiveMinutesRemaining } =
    useTimeReminderStore()

  const { simulationId } = useParams()
  const accessToken = authTokenService.getAccessToken()

  const { user } = useUser()
  const { mutate } = useGetSimulation(String(simulationId))

  const userReminderState = users.find(
    (savedUser) => savedUser.userId === user?._id
  )

  const initializeExpiryTimestamp = new Date().getTime() + 0

  const { totalSeconds, seconds, minutes, hours, restart } = useTimer({
    expiryTimestamp: new Date(initializeExpiryTimestamp),
    autoStart: false
  })

  const totalTimeSpent =
    millisecondsToSeconds(user?.total_time || 0) - totalSeconds

  useLayoutEffect(() => {
    const socket = io(serverConfig.socketUrl, {
      reconnection: true,
      auth: {
        accessToken: `Bearer ${accessToken}`,
        payload: { simulationId: simulationId }
      }
    })
    if (hasTimeLeft) {
      socket.emit('reconnect')
    } else {
      socket.disconnect()
    }

    return () => {
      socket.disconnect()
      mutate()
    }
  }, [hasTimeLeft])

  useLayoutEffect(() => {
    if (user?._id) setUserId(user?._id)
    if (!isLoading && !error) {
      setIsInitialize(true)
      if (userTimeRemaining > 0) setTimerStarted(true)
      restart(new Date(Date.now() + userTimeRemaining))
    }
  }, [userTimeRemaining, isLoading, error])

  useLayoutEffect(() => {
    if (timerStarted && totalSeconds > 0) setHasTimeLeft(true)

    if (hasTimeLeft && openModalByTitle === ModalTitle.TIMES_UP)
      setOpenModalByTitle(null)

    if (
      userReminderState &&
      !userReminderState.isTwentyMinutes &&
      timerStarted &&
      isInitialized &&
      SimulationTime.TIME_REMINDER_IN_SECONDS < totalTimeSpent
    ) {
      setOpenModalByTitle(null)
      setOpenModalByTitle(ModalTitle.TIME_REMINDER)
      setIsTwentyMinutes(true)
    }

    if (
      !userReminderState?.isFiveMinutesRemaining &&
      timerStarted &&
      isInitialized &&
      totalSeconds < SimulationTime.REMAINING_5_MINUTES_IN_SECONDS
    ) {
      setOpenModalByTitle(null)
      setOpenModalByTitle(ModalTitle.REMAINING_5_MINUTES)
      setIsFiveMinutesRemaining(true)
    }

    if (
      userReminderState?.isFiveMinutesRemaining &&
      timerStarted &&
      isInitialized &&
      totalSeconds > SimulationTime.REMAINING_5_MINUTES_IN_SECONDS
    )
      setIsFiveMinutesRemaining(false)

    if (
      !isLoading &&
      isInitialized &&
      totalSeconds <= SimulationTime.TIMES_UP
    ) {
      setHasTimeLeft(false)
      setOpenModalByTitle(null)
      setOpenModalByTitle(ModalTitle.TIMES_UP)
    }
  }, [
    totalSeconds,
    totalTimeSpent,
    userReminderState,
    isLoading,
    timerStarted,
    isInitialized,
    userTimeRemaining
  ])

  const time =
    isLoading || error
      ? '--:--:--'
      : padStartTime(`${hours}:${minutes}:${seconds}`)

  const data = [
    { name: 'Remaining', value: totalSeconds },
    { name: 'Elapsed', value: totalTimeSpent }
  ]
  return (
    <div className='flex items-center p-4 gap-4 w-fit text-xs text-white bg-muted-foreground/50  rounded-[8px] h-[73px]'>
      <div className='w-10 h-10 '>
        <PieChartTimer data={data} />
      </div>
      <div className='flex flex-col justify-between h-full'>
        <label className='uppercase text-xs font-medium leading-none'>
          Remaining Time
        </label>
        <input
          type='text'
          disabled
          className={cn(
            'bg-transparent border-none text-lg lg:text-2xl w-[102px] h-[22px] p-0 text-left leading-none',
            totalSeconds < 300 && 'text-destructive'
          )}
          value={time}
        />
      </div>

      {openModalByTitle && (
        <SimulationModal
          title={openModalByTitle}
          forceOpen={openModalByTitle}
          setForceOpen={setOpenModalByTitle}
        />
      )}
    </div>
  )
}

export default TimerValue
