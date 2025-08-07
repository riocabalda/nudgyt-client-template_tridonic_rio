'use client'

import { useSearchParams } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import FetchError from '@/app/(shared)/components/FetchError'
import { Loader } from 'lucide-react'
import Pagination from '@/app/(shared)/components/Pagination'
import { Card } from '@/app/(shared)/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/(shared)/components/ui/table'
import {
  cn,
  convertNumberToTime,
  convertUtcToLocal
} from '@/app/(shared)/utils'
import { Checkbox } from '@/app/(shared)/components/ui/checkbox'
import { useRequestStore } from '@/app/(shared)/hooks/useRequestStore'
import DenyRequestModal from './DenyRequestModal'
import ApproveRequestModal from './ApproveRequestModal'
import Search from '@/app/(shared)/components/Search'
import ActionPopover from '../components/mobile/ActionPopover'
import useGetRequests from '../hooks/useGetRequests'

type RequestTableProps = {
  actionItems: ReactNode[]
}

function Requests({ actionItems }: RequestTableProps) {
  const { selectedRequests, toggleRequest, clearRequests, setAllRequests } =
    useRequestStore()
  const searchParams = useSearchParams()

  const { data, error, isLoading } = useGetRequests(searchParams.toString())

  useEffect(() => {
    clearRequests()
  }, [searchParams, clearRequests])

  useEffect(() => {
    if (data?.data) {
      setAllRequests(data.data)
    }
  }, [data, setAllRequests])

  const anySelected = selectedRequests.length > 0

  if (error) {
    return (
      <div className='grid place-items-center p-4'>
        <FetchError errorMessage={error?.response?.data?.message} />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='grid place-items-center p-4'>
        <Loader className='w-4 h-4 mr-2 animate-spin' />
      </div>
    )
  }

  return (
    <div className='mt-4 lg:mt-6 lg:px-0'>
      <div className='flex flex-col lg:flex-row p-2 gap-4 lg:p-0 items-stretch lg:items-center mb-6'>
        {...actionItems}
        <div className='flex items-center gap-2'>
          <Search containerClass='flex lg:w-full xl:w-[344px]' />
          <div className='m-0 ml-5 w-full lg:w-auto'>
            <Pagination
              from={data?.from}
              to={data?.to}
              total={data?.total}
              prev={data?.prev_page ?? undefined}
              next={data?.next_page ?? undefined}
              currentPage={data?.current_page || 1}
            />
          </div>
          <ActionPopover containerClass='lg:hidden' />
        </div>
        <div className='hidden ml-auto lg:flex gap-2'>
          {selectedRequests.length !== 0 && (
            <>
              <DenyRequestModal data={selectedRequests} />
              <ApproveRequestModal data={selectedRequests} />
            </>
          )}
        </div>
      </div>
      <Card className='overflow-hidden border-none rounded-none lg:rounded-sm'>
        <div className='max-h-[600px] overflow-auto'>
          <Table>
            <TableHeader className='bg-white'>
              <TableRow className='hover:bg-inherit '>
                <TableHead className='sticky top-0 px-4 py-2 font-semibold text-foreground'></TableHead>
                <TableHead className='sticky top-0 px-6 py-2 font-semibold text-foreground '>
                  Name
                </TableHead>
                <TableHead className='sticky top-0 px-6 py-2 font-semibold text-foreground '>
                  Email Address
                </TableHead>
                <TableHead className='sticky top-0 px-6 py-2 font-semibold text-foreground '>
                  Date Requested
                </TableHead>
                <TableHead className='sticky top-0 px-6 py-2 font-semibold text-foreground '>
                  Requested Time
                </TableHead>
                <TableHead className='sticky top-0 px-6 py-2 font-semibold text-foreground '></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='[&>*:nth-child(even)]:bg-muted border-b table-fixed'>
              {data && data.data?.length ? (
                data.data.map((request) => (
                  <TableRow
                    key={request._id}
                    className='group border-none hover:bg-muted'
                  >
                    <TableCell>
                      <div className='flex items-center justify-center'>
                        <Checkbox
                          className={cn(
                            anySelected ? 'block' : 'hidden group-hover:block'
                          )}
                          checked={selectedRequests.some(
                            (r) => r._id === request._id
                          )}
                          onCheckedChange={() => toggleRequest(request)}
                        />
                      </div>
                    </TableCell>
                    <TableCell
                      className='min-w-[200px] px-6 py-[14px] font-semibold'
                      onClick={(event) => {
                        event.stopPropagation()
                      }}
                    >
                      {request.creator.fullname}
                    </TableCell>
                    <TableCell className='px-6 py-[14px]'>
                      {request.creator.email}
                    </TableCell>
                    <TableCell className='truncate px-6 py-[14px]'>
                      {convertUtcToLocal(
                        request.created_at,
                        'MMMM D, YYYY h:mm A'
                      )}
                    </TableCell>
                    <TableCell className='px-6 py-[14px]'>
                      {convertNumberToTime(request.requested_time)}
                    </TableCell>
                    <TableCell className='flex gap-2 px-6 py-[14px]'>
                      <DenyRequestModal data={request} />
                      <ApproveRequestModal data={request} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className='text-center' colSpan={9}>
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}

export default Requests
