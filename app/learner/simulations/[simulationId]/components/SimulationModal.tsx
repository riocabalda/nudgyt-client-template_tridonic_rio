'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/app/(shared)/components/ui/dialog'
import { Button } from '@/app/(shared)/components/ui/button'
import { Pause, Square, X } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useGetSimulation } from '../hooks/useGetSimulation'
import { cn } from '@/app/(shared)/utils'
import simulationService from '@/app/(shared)/services/learner/simulationService'
import RequestExtensionConfirmationModal from '@/app/(shared)/components/RequestExtensionConfirmationModal'
import useCharacterSelectionStore from '../hooks/useCharacterSelectionStore'

export enum ModalTitle {
  END_SIMULATION = 'End Simulation',
  LEAVE_SCENARIO = 'Leave scenario?',
  TIME_REMINDER = 'Time Reminder',
  REMAINING_5_MINUTES = '5 minutes remaining',
  TIMES_UP = 'Time’s up',
  REQUEST_PENDING = 'Request pending'
}

export enum SimulationTime {
  TIME_REMINDER_IN_SECONDS = 1200,
  REMAINING_5_MINUTES_IN_SECONDS = 300,
  TIMES_UP = 0
}

const modalDetails = [
  {
    title: ModalTitle.END_SIMULATION,
    description:
      'This will stop the remaining time and complete the simulation. Are you sure you want to end the simulation?'
  },
  {
    title: ModalTitle.LEAVE_SCENARIO,
    description:
      'Leaving the scenario now will take you back to the Dashboard. This attempt will not be saved.'
  },
  {
    title: ModalTitle.TIME_REMINDER,
    description:
      'You have spent over 20 minutes on this scenario. To ensure you have time to complete the entire scenario, you may want to consider moving on to the next stage.'
  },
  {
    title: ModalTitle.REMAINING_5_MINUTES,
    description:
      'You have 5 minutes remaining for your account. Please wrap up the conversation with the customer.'
  },
  {
    title: ModalTitle.TIMES_UP,
    description:
      'Your allotted time for this scenario has ended. To continue working on this scenario, you may request an extension from your administrator.<br><br>Extension requests are subject to approval.'
  },
  {
    title: ModalTitle.REQUEST_PENDING,
    description:
      "You've already requested an extension. Please wait for an approval notification from your Administrator."
  }
]

function SimulationModal({
  title,
  forceOpen,
  setForceOpen
}: {
  title: string
  forceOpen?: string | null
  setForceOpen?: React.Dispatch<React.SetStateAction<string | null>>
}) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const { simulationId } = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = new URLSearchParams(searchParams.toString())
  const { mutate } = useGetSimulation(String(simulationId))
  const selectCharacter = useCharacterSelectionStore(
    (store) => store.selectCharacter
  )

  const modalData = modalDetails.find((item) => item.title === title)

  const handleEndSimulation = async () => {
    setIsSubmitting(true)
    try {
      selectCharacter(null)
      await simulationService.stopSimulation(String(simulationId))
      mutate()
      params.delete('panel')
      const newUrl = `${window.location.pathname}?${params.toString()}`
      router.push(newUrl)
    } catch (err) {
      console.log(err)
    } finally {
      setIsSubmitting(false)
      setOpen(false)
    }
  }

  const handleLeaveScenario = async () => {
    setIsSubmitting(true)
    try {
      await simulationService.cancelSimulation(String(simulationId))
      params.delete('panel')
      router.replace('/learner/dashboard')
    } catch (err) {
      console.log(err)
    } finally {
      setIsSubmitting(false)
      setOpen(false)
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (setForceOpen) {
      setForceOpen(isOpen ? title : null)
    } else {
      setOpen(isOpen)
    }
  }

  const renderModalBtn = () => {
    switch (modalData?.title) {
      case ModalTitle.LEAVE_SCENARIO:
        return (
          <>
            <Button
              variant='outline'
              disabled={isSubmitting}
              className='w-full !px-7 lg:w-fit h-12'
              onClick={() => setOpen(!open)}
            >
              Continue
            </Button>
            <Button
              variant='default'
              disabled={isSubmitting}
              className='w-full !px-7 lg:w-fit h-12'
              onClick={handleLeaveScenario}
            >
              Leave Scenario
            </Button>
          </>
        )
      case ModalTitle.END_SIMULATION:
        return (
          <>
            <Button
              variant='outline'
              disabled={isSubmitting}
              className='w-full !px-7 lg:w-fit h-12'
              onClick={() => setOpen(!open)}
            >
              Continue
            </Button>
            <Button
              variant='default'
              disabled={isSubmitting}
              className='w-full !px-7 lg:w-fit h-12'
              onClick={handleEndSimulation}
            >
              End Simulation
            </Button>
          </>
        )
      case ModalTitle.TIME_REMINDER:
        return (
          <>
            <Button
              variant='outline'
              disabled={isSubmitting}
              className='w-full lg:w-[170px] h-12'
              onClick={() => setForceOpen && setForceOpen(null)}
            >
              OK
            </Button>
          </>
        )
      case ModalTitle.REMAINING_5_MINUTES:
        return (
          <>
            <Button
              variant='outline'
              disabled={isSubmitting}
              className='w-full !px-7 lg:w-fit h-12'
              onClick={() => setForceOpen && setForceOpen(null)}
            >
              Continue
            </Button>
            <RequestExtensionConfirmationModal
              variant='default'
              size='default'
              isOpen={isConfirmationOpen}
              setIsOpen={setIsConfirmationOpen}
              setSimulationModal={setForceOpen}
            />
          </>
        )
      case ModalTitle.TIMES_UP:
        return (
          <>
            <RequestExtensionConfirmationModal
              variant='outline'
              size='default'
              isOpen={isConfirmationOpen}
              setIsOpen={setIsConfirmationOpen}
              setSimulationModal={setForceOpen}
            />
            <Button
              variant='default'
              disabled={isSubmitting}
              className='w-full !px-7 lg:w-fit h-12'
              onClick={handleEndSimulation}
            >
              End scenario
            </Button>
          </>
        )
      case ModalTitle.REQUEST_PENDING:
        return (
          <>
            <Button
              variant='outline'
              disabled={isSubmitting}
              className='w-full !px-7 lg:w-fit h-12'
              onClick={handleLeaveScenario}
            >
              Go back to dashboard
            </Button>
            <Button
              variant='default'
              disabled={isSubmitting}
              className='w-full !px-7 lg:w-fit h-12'
              onClick={handleEndSimulation}
            >
              OK, end scenario
            </Button>
          </>
        )

      default:
        return null
    }
  }

  return (
    <Dialog
      open={forceOpen ? !!forceOpen : open}
      onOpenChange={handleOpenChange}
    >
      {!forceOpen && (
        <DialogTrigger asChild>
          {title === ModalTitle.END_SIMULATION ? (
            <Button
              variant='destructive'
              className='rounded-full w-12 h-12 lg:rounded-[4px] lg:w-fit lg:h-fit lg:px-4 lg:py-3 hover:bg-rose-400'
            >
              <Pause
                size={20}
                strokeWidth={2}
                className='hidden lg:block'
                fill='white'
              />
              <span className='hidden lg:block text-base text-white font-medium ml-[10px] px-4'>
                End Scenario
              </span>
              <Square
                size={16}
                strokeWidth={2}
                className='bg-white lg:hidden'
              />
            </Button>
          ) : (
            <Button variant='outline' className='w-full'>
              Back to Dashboard
            </Button>
          )}
        </DialogTrigger>
      )}

      <DialogContent
        onInteractOutside={(e) => {
          if (title === ModalTitle.TIMES_UP) e.preventDefault()
          if (title === ModalTitle.REQUEST_PENDING && setForceOpen) {
            e.preventDefault()
            setForceOpen(ModalTitle.TIMES_UP)
          }
        }}
        className={cn(
          'gap-0 w-[90vw] lg:w-[500px] rounded-[8px]',
          isConfirmationOpen && 'hidden'
        )}
        hideCloseButton={
          title === ModalTitle.TIMES_UP || title === ModalTitle.REQUEST_PENDING
            ? true
            : false
        }
      >
        <DialogHeader className='flex flex-row items-start justify-between'>
          <DialogTitle className='text-xl lg:text-2xl font-semibold text-left'>
            {modalData?.title}
          </DialogTitle>
          {title === ModalTitle.REQUEST_PENDING && (
            <button
              onClick={() => {
                if (setForceOpen) setForceOpen(ModalTitle.TIMES_UP)
              }}
              className='!mt-0'
            >
              <X />
            </button>
          )}
        </DialogHeader>
        <DialogDescription
          className='!mt-6 text-sm text-left'
          dangerouslySetInnerHTML={{
            __html: modalData ? modalData?.description : ''
          }}
        />
        <div className='flex flex-col lg:flex-row items-center justify-end gap-6 mt-6'>
          {renderModalBtn()}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SimulationModal
