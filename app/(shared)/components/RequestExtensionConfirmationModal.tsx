'use client'
import useAlertStore from '@/app/(shared)/components/alert/useAlertStore'
import { Button } from '@/app/(shared)/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/app/(shared)/components/ui/dialog'
import requestsService from '@/app/(shared)/services/learner/requestService'
import { ModalTitle } from '@/app/learner/simulations/[simulationId]/components/SimulationModal'
import { HttpStatusCode } from 'axios'
import { Loader } from 'lucide-react'
import { FormEvent, useState } from 'react'

type RequestExtensionConfirmationModalProps = {
  isOpen: boolean
  variant?:
    | 'secondary'
    | 'default'
    | 'link'
    | 'destructive'
    | 'outline'
    | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSimulationModal?: React.Dispatch<React.SetStateAction<null | string>>
}

function RequestExtensionConfirmationModal({
  isOpen,
  variant,
  size,
  setIsOpen,
  setSimulationModal
}: RequestExtensionConfirmationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { showAlert } = useAlertStore()

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await requestsService.createRequest()

      if (response.status === HttpStatusCode.Ok) {
        setIsOpen(false)
        showAlert({
          message: (
            <p>
              Your request for a <strong>60-minute extension</strong> has been
              successfully submitted.
            </p>
          ),
          variant: 'success'
        })
      }
    } catch (error: any) {
      if (error?.request?.responseText) {
        const errorMessage = JSON.parse(error.request.responseText)
        if (error.response.status === 409 && setSimulationModal)
          setSimulationModal(ModalTitle.REQUEST_PENDING)
        if (errorMessage?.message) {
          setIsOpen(false)
          showAlert({
            message: <p>{errorMessage.message}</p>,
            variant: 'error'
          })
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant ? variant : 'default'}
          size={size ? size : 'sm'}
          className='px-4 py-2 w-full lg:min-w-56 lg:w-auto'
        >
          Request for extension
        </Button>
      </DialogTrigger>
      <DialogContent className='rounded-[8px] w-[90%] max-w-[500px] gap-6 p-6'>
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold lg:text-2xl'>
            Request for Extension
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <p className='text-lg text-justify my-4'>
            You are about to request a{' '}
            <span className='font-semibold'>60 minutes extension</span>. This
            will give you additional time to complete your remaining scenarios.
          </p>

          <div className='flex items-center justify-between gap-3'>
            <Button
              variant={'outline'}
              className='mt-6 self-end h-fit !px-8 py-3 w-full'
              type='button'
              disabled={isSubmitting}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className='mt-6 self-end h-fit !px-8 py-3 w-full'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader className='w-4 h-4 mr-2 animate-spin' /> Sending
                </>
              ) : (
                'Confirm'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RequestExtensionConfirmationModal
