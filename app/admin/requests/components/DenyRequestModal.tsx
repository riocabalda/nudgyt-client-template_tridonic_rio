import useAlertStore from '@/app/(shared)/components/alert/useAlertStore'
import { Button } from '@/app/(shared)/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/app/(shared)/components/ui/dialog'
import { useRequestStore } from '@/app/(shared)/hooks/useRequestStore'
import requestService from '@/app/(shared)/services/admin/requestService'
import { Request } from '@/app/(shared)/types'
import { Loader, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import useGetRequests from '../hooks/useGetRequests'

type DenyRequestModalProps = {
  data: Request | Request[]
}

function DenyRequestModal({ data }: DenyRequestModalProps) {
  const isBulk = Array.isArray(data)
  const { clearRequests } = useRequestStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { showAlert } = useAlertStore()
  const searchParams = useSearchParams()
  const { mutate } = useGetRequests(searchParams.toString())

  const handleUndoDeny = async () => {
    try {
      setLoading(true)
      if (isBulk) {
        await requestService.bulkUndoDenyRequests(
          (data as Request[]).map((request) => request._id)
        )
      } else {
        await requestService.undoDenyRequest((data as Request)._id)
      }
      clearRequests()
      mutate()
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeny = async () => {
    try {
      setLoading(true)
      if (isBulk) {
        await requestService.bulkDenyRequests(
          (data as Request[]).map((request) => request._id)
        )
      } else {
        await requestService.denyRequest((data as Request)._id)
      }
      showAlert({
        message: isBulk ? (
          <>
            <p>
              You have denied <strong>{(data as Request[]).length}</strong>{' '}
              extension requests.
            </p>
            <Button
              variant='link'
              className='text-white text-base mb-0.5 ml-2'
              size='icon'
              onClick={handleUndoDeny}
              disabled={loading}
            >
              Undo
            </Button>
          </>
        ) : (
          <>
            <p>
              You have denied{' '}
              <strong>{(data as Request).creator.fullname}&rsquo;s</strong>{' '}
              extension request.
            </p>
            <Button
              variant='link'
              className='text-white text-base mb-0.5 ml-2'
              size='icon'
              onClick={handleUndoDeny}
              disabled={loading}
            >
              Undo
            </Button>
          </>
        ),
        variant: 'info'
      })
      clearRequests()
      mutate()
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'An error occurred.')
    } finally {
      setLoading(false)
      setIsModalOpen(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger className='w-full'>
        {isBulk ? (
          <Button
            size={isBulk ? 'default' : 'sm'}
            variant='outline'
            className='px-8 bg-transparent hover:bg-muted lg:hover:bg-accent flex justify-start lg:justify-center text-foreground-800 w-full border-none lg:border-solid lg:border lg:border-input'
          >
            <X className='size-5 mr-[26px] -ml-[14px]' />
            <span className='text-base'>Deny all</span>
          </Button>
        ) : (
          <Button
            size={isBulk ? 'default' : 'sm'}
            variant='outline'
            className='px-8 hover:bg-accent flex justify-center text-foreground-800 w-full'
          >
            Deny
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='rounded-[8px] w-[90%] max-w-[500px] gap-6 p-6'>
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold lg:text-2xl'>
            Deny {isBulk ? 'Requests' : 'Request'}
          </DialogTitle>
        </DialogHeader>
        <p>
          You are about to deny{' '}
          {isBulk ? (
            <span className='font-bold'>All {(data as Request[]).length}</span>
          ) : (
            <span className='font-bold'>
              {(data as Request).creator.fullname}&rsquo;s
            </span>
          )}{' '}
          extension requests. Are you sure you want to proceed?
        </p>
        <div className='flex gap-6 justify-end'>
          <DialogClose>
            <Button disabled={loading} variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          <Button variant='destructive' disabled={loading} onClick={handleDeny}>
            {loading && <Loader className='w-4 h-4 mr-2 animate-spin' />} Deny{' '}
            {isBulk ? `${(data as Request[]).length} requests` : 'request'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DenyRequestModal
