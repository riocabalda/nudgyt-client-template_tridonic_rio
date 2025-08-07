'use client'

import React, { ReactNode } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/(shared)/components/ui/table'
import FetchError from '@/app/(shared)/components/FetchError'
import Pagination from '@/app/(shared)/components/Pagination'
import Status from './Status'
import useUsers from '../hooks/useUsers'
import { convertUtcToLocal } from '@/app/(shared)/utils'
import { Loader } from 'lucide-react'
import { Card } from '@/app/(shared)/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'

type UserTableProps = {
  actionItems: ReactNode[]
}

function Users({ actionItems }: UserTableProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const { data, error, isLoading } = useUsers(searchParams.toString())

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

  const handleGetUserDetails = (userId: string) => {
    router.push(`/admin/users/${userId}`)
  }

  return (
    <div className='mt-4 lg:mt-6 lg:px-0'>
      <div className='flex flex-col lg:flex-row p-2 gap-4 lg:p-0 items-stretch lg:items-center mb-6'>
        {...actionItems}
        <div className='m-0 lg:ml-5 w-full lg:w-auto'>
          <Pagination
            from={data?.from}
            to={data?.to}
            total={data?.total}
            prev={data?.prev_page ?? undefined}
            next={data?.next_page ?? undefined}
            currentPage={data?.current_page || 1}
          />
        </div>
      </div>
      <Card className='overflow-hidden border-none rounded-none lg:rounded-sm'>
        <div className='max-h-[600px] overflow-auto'>
          <Table>
            <TableHeader className='bg-white'>
              <TableRow className='hover:bg-inherit '>
                <TableHead className='sticky top-0 px-6 py-2 font-semibold text-foreground '>
                  Status
                </TableHead>
                <TableHead className='sticky top-0 px-6 py-2 font-semibold text-foreground '>
                  Name
                </TableHead>
                <TableHead className='sticky top-0 px-6 py-2 font-semibold text-foreground '>
                  Type
                </TableHead>
                <TableHead className='sticky top-0 px-6 py-2 font-semibold text-foreground '>
                  Joined
                </TableHead>
                <TableHead className='sticky top-0 px-6 py-2 font-semibold text-foreground'>
                  Email address
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='[&>*:nth-child(even)]:bg-muted border-b table-fixed'>
              {data && data.data?.length ? (
                data.data.map((user) => (
                  <TableRow
                    key={user._id}
                    className='border-none cursor-pointer hover:bg-muted'
                    onClick={() => handleGetUserDetails(user._id)}
                  >
                    <TableCell
                      className='px-6 py-[14px]'
                      onClick={(event) => {
                        event.stopPropagation()
                      }}
                    >
                      <Status user={user} />
                    </TableCell>
                    <TableCell className='min-w-[200px] px-6 py-[14px] font-semibold'>
                      {user.fullname}
                    </TableCell>
                    <TableCell className='truncate px-6 py-[14px]'>
                      {user.user_type}
                    </TableCell>
                    <TableCell className='min-w-[200px] px-6 py-[14px]'>
                      {convertUtcToLocal(
                        user.created_at,
                        'MMMM D, YYYY h:mm A'
                      )}
                    </TableCell>
                    <TableCell className='px-6 py-[14px]'>
                      {user.email}
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

export default Users
