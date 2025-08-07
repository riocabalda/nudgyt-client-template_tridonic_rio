'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader } from 'lucide-react'
import { User } from '@/app/(shared)/services/userService'
import { WithPagination } from '@/app/(shared)/types'
import Search from '@/app/(shared)/components/Search'
import ActionPopover from './ActionPopover'
import UserCard from './UserCard'
import FetchError from '@/app/(shared)/components/FetchError'
import useSWRInfinite from 'swr/infinite'
import userService from '@/app/(shared)/services/admin/userService'

function UsersInfiniteScroll() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [fetchLoading, setFetchLoading] = useState(false)
  const searchParams = useSearchParams()

  const getKey = (
    pageIndex: number,
    previousPageData: WithPagination<User[]> | null
  ) => {
    const currentPageIndex = pageIndex + 1

    // If we reach the end, return null
    if (previousPageData && !previousPageData.next_page) return null

    // Build query string dynamically

    const keyParams = `page=${currentPageIndex}${searchParams.toString() && `&${searchParams.toString()}`}`

    // Return the key for the next page
    return keyParams
  }
  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite<WithPagination<User[]>>(getKey, async (params: string) => {
      return userService.getUsers(params).then((res) => res.data)
    })

  const usersData = data && data.flatMap((page) => page.data)
  const isTotalUsers = data?.at(-1)?.total === usersData?.length

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const scrolledHeight = window.scrollY
      const percentageScrolled =
        (scrolledHeight / (totalHeight - viewportHeight)) * 100
      setScrollPosition(Number(percentageScrolled.toFixed()))
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (
      scrollPosition > 90 &&
      !fetchLoading &&
      !isValidating &&
      !isTotalUsers
    ) {
      setFetchLoading(true)
      setSize(size + 1)
    }

    if (!isValidating) {
      setFetchLoading(false)
    }
  }, [scrollPosition])

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
    <div className='flex flex-col'>
      <div className='flex gap-4 bg-white px-4 py-6 border-b border-b-gray-300'>
        <Search />
        <ActionPopover />
      </div>
      <div className='flex flex-col gap-4 px-4 py-6'>
        {usersData && usersData?.length ? (
          usersData.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <p className='text-center text-foreground'>No data found.</p>
        )}
        {isValidating && !isTotalUsers && (
          <li className='flex items-center justify-center gap-2'>
            <Loader className='w-4 h-4 mr-2 animate-spin' />
            <span>Loading more users...</span>
          </li>
        )}
      </div>
    </div>
  )
}

export default UsersInfiniteScroll
