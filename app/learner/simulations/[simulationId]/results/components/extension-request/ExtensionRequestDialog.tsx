'use client'

import { Button } from '@/app/(shared)/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/app/(shared)/components/ui/dialog'
import requestService from '@/app/(shared)/services/learner/requestService'
import { useState } from 'react'
import { toast } from 'sonner'
import useExtensionRequestDialogStore from '../../hooks/useExtensionRequestDialogStore'
import useGetSimulationResults from '../../hooks/useGetSimulationResults'

/** https://stackoverflow.com/a/60871453 */
function ExtensionRequestDialog() {
  const { isOpen, setIsOpen } = useExtensionRequestDialogStore()
  const { resultsFetch } = useGetSimulationResults()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function requestExtension() {
    setIsSubmitting(true)
    try {
      await requestService.createRequest()
      await resultsFetch.mutate()

      setIsOpen(false)
      toast.info('Extension request sent. Please wait for approval.')
    } catch (error) {
      console.error(error)

      toast.error('Failed sending extension request.')
    }
    setIsSubmitting(false)
  }

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader className='text-left'>
          <DialogTitle>Request Extension</DialogTitle>
          <DialogDescription>
            Are you sure you want to ask for an extension?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='gap-2 lg:gap-0'>
          <DialogClose asChild>
            <Button variant='outline' size='lg'>
              Cancel
            </Button>
          </DialogClose>

          <Button size='lg' disabled={isSubmitting} onClick={requestExtension}>
            Request for extension
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ExtensionRequestDialog
