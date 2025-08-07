'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/app/(shared)/components/ui/dialog'
import PasswordForm from './PasswordForm'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

function PasswordModal() {
  const router = useRouter()

  return (
    <Dialog open={true}>
      <DialogContent
        className='rounded-[8px] w-[90%] max-w-[560px] gap-[24px] p-6'
        hideCloseButton
      >
        <DialogHeader className='flex flex-row items-start justify-between'>
          <DialogTitle className='text-lg font-semibold lg:text-2xl'>
            Change Password
          </DialogTitle>
          <button
            onClick={() => {
              router.back()
            }}
            className='!mt-0'
          >
            <X />
          </button>
        </DialogHeader>
        <PasswordForm />
      </DialogContent>
    </Dialog>
  )
}

export default PasswordModal
