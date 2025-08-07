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
import { Check, Loader } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import useGetRequests from '../hooks/useGetRequests'

type ApproveRequestModalProps = {
  data: Request | Request[]
}

function ApproveRequestModal({ data }: ApproveRequestModalProps) {
  const isBulk = Array.isArray(data)
  const { clearRequests } = useRequestStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { showAlert } = useAlertStore()
  const searchParams = useSearchParams()

  const { mutate } = useGetRequests(searchParams.toString())

  const handleApprove = async () => {
    try {
      setLoading(true)
      if (isBulk) {
        await requestService.bulkApproveRequests(
          (data as Request[]).map((request) => request._id)
        )
      } else {
        await requestService.approveRequest((data as Request)._id)
      }

      showAlert({
        message: isBulk ? (
          <p>
            You have approved <strong>{(data as Request[]).length}</strong>{' '}
            extension requests.
          </p>
        ) : (
          <p>
            You have approved{' '}
            <strong>{(data as Request).creator.fullname}&rsquo;s</strong>{' '}
            extension request.
          </p>
        ),
        variant: 'success'
      })

      clearRequests()
      mutate()
    } catch (error: any) {
      console.log(error)
      showAlert({
        message: (
          <p>{error?.response?.data?.message || 'An error occurred.'}</p>
        ),
        variant: 'error'
      })
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
            className='px-8 bg-transparent hover:bg-muted lg:hover:bg-brandcolora/90 lg:bg-brandcolora flex justify-start lg:justify-center text-foreground-800 lg:text-white w-full'
          >
            <Check className='size-5 mr-[26px] -ml-[14px]' />
            <span className='text-base'>Extend all</span>
          </Button>
        ) : (
          <Button
            size={isBulk ? 'default' : 'sm'}
            className='px-8 hover:bg-brandcolora/90 bg-brandcolora flex justify-center text-white w-full'
          >
            Approve
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='rounded-[8px] w-[90%] max-w-[500px] gap-6 p-6'>
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold lg:text-2xl'>
            Approve {isBulk ? 'Requests' : 'Request'}
          </DialogTitle>
        </DialogHeader>
        <p className='text-sm'>
          You are about to approve{' '}
          {isBulk ? (
            <span className='font-bold'>All {(data as Request[]).length}</span>
          ) : (
            <span className='font-bold'>
              {(data as Request).creator.fullname}&rsquo;s
            </span>
          )}{' '}
          extension {isBulk ? 'requests' : 'request'} for{' '}
          <span className='font-bold'>60 minutes each</span>. Are you sure you
          want to proceed?
        </p>
        <div className='flex gap-6 justify-end'>
          <DialogClose>
            <Button disabled={loading} variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={loading} onClick={handleApprove}>
            {loading && <Loader className='w-4 h-4 mr-2 animate-spin' />}{' '}
            Approve{' '}
            {isBulk ? `${(data as Request[]).length} requests` : 'request'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ApproveRequestModal
