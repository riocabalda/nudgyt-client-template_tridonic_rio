'use client'
import RequireAuth from '@/app/(shared)/components/helper/RequireAuth'
import MainContainer from '@/app/(shared)/components/MainContainer'
import { Card } from '@/app/(shared)/components/ui/card'
import { roles } from '@/app/(shared)/services/userService'
import React from 'react'
import Status from '../components/Status'
import useSWR from 'swr'
import userService from '@/app/(shared)/services/admin/userService'
import { useParams, useRouter } from 'next/navigation'
import { formatDateTime } from '@/app/(shared)/utils'

export default function UserPageDetails() {
  const params = useParams() as { userId: string }
  const router = useRouter()

  const { data: user, isLoading } = useSWR(
    `/admin/users/${params.userId}`,
    () => userService.getUserById(params?.userId).then((res) => res)
  )

  if (!isLoading) {
    if (!user) {
      router.push('/admin/users')
    }
  }

  const isLearner = user?.user_type === roles.learner

  return (
    <>
      <RequireAuth role={[roles.superadmin, roles.admin]}>
        <MainContainer
          headerMobile={
            <MainContainer.HeaderMobile title={user?.fullname || 'User'} />
          }
          headerDesktop={
            <MainContainer.HeaderDesktop
              title={user?.fullname || 'User'}
              showBackBtn
            />
          }
        >
          <div className='container px-0 lg:px-[40px] space-y-0 lg:space-y-[42px]'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-[24px]'>
              <Card className='rounded-none px-[16px] py-[40px] lg:p-[24px] space-y-[40px] lg:rounded-lg'>
                <div className='space-y-[24px] lg:space-y-0'>
                  <h1 className='text-[20px] lg:text-[24px] font-semibold mb-0 lg:mb-[16px]'>
                    {isLearner ? 'Learner' : 'Admin'} Details
                  </h1>
                  <div className='space-y-0 xl:space-y-[8px] block lg:flex lg:items-center lg:justify-between'>
                    <span className='uppercase text-xs font-medium text-neutral-gray-600 lg:capitalize lg:text-sm'>
                      Email address
                    </span>
                    <p className='text-sm font-normal text-neutral-gray-800 lg:text-sm break-all'>
                      {user?.email}
                    </p>
                  </div>
                  <div className='space-y-0 xl:space-y-[8px] block lg:flex lg:items-center lg:justify-between'>
                    <span className='uppercase text-xs font-medium text-neutral-gray-600 lg:capitalize lg:text-sm'>
                      Date Joined
                    </span>
                    <p className='text-sm font-normal text-neutral-gray-800 lg:text-sm'>
                      {user?.approved_at && formatDateTime(user?.approved_at)}
                    </p>
                  </div>
                </div>
                <div className='block lg:flex items-center justify-between p-0 lg:pt-[19px] border-transparent lg:border-t-[1px] lg:border-neutral-300'>
                  <p className='hidden lg:block text-xs font-medium text-neutral-gray-800 leading-tight uppercase tracking-wide'>
                    Status
                  </p>
                  {user && <Status user={user} />}
                </div>
              </Card>
            </div>
          </div>
        </MainContainer>
      </RequireAuth>
    </>
  )
}
