'use client'

import { Button } from '@/app/(shared)/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/app/(shared)/components/ui/dialog'
import userService from '@/app/(shared)/services/admin/userService'
import { User } from '@/app/(shared)/services/userService'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'
import { SELECT_STATUS_ITEMS } from './Status'
import useUsers from '../hooks/useUsers'

function ArchiveUserModal({
  onCancel,
  setStatus,
  user
}: {
  user: User
  setStatus: React.Dispatch<React.SetStateAction<string>>
  onCancel: () => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const searchParams = useSearchParams()
  const { mutate } = useUsers(searchParams.toString())

  const handleArchiveClick = async () => {
    setIsSubmitting(true)
    try {
      await userService.archiveUser(user._id)
      mutate()
      setStatus(SELECT_STATUS_ITEMS.ARCHIVED)
      toast.success('User archived!')
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'An error occurred.')
    } finally {
      setIsSubmitting(false)
      onCancel()
    }
  }

  const triggerCancel = () => {
    onCancel()
  }

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) triggerCancel()
      }}
    >
      <DialogContent className='rounded-[8px] w-[90%] max-w-[420px] gap-[20px] p-[30px]'>
        <DialogHeader>
          <DialogTitle>Archive User</DialogTitle>
          <DialogDescription className='text-destructive'>
            Warning: You are about to archive a user. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <div className='flex justify-end gap-[10px] mt-[30px]'>
          <Button type='button' variant='outline' onClick={triggerCancel}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            type='submit'
            className='w-full'
            disabled={isSubmitting}
            onClick={handleArchiveClick}
          >
            {isSubmitting ? (
              <>
                <Loader className='w-4 h-4 mr-2 animate-spin' /> Archiving
              </>
            ) : (
              'Archive'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ArchiveUserModal
