'use client'

import useSWR from 'swr'
import userService from '@/app/(shared)/services/admin/userService'

const useUsers = (queryString?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/admin/users?${queryString}`,
    () => userService.getUsers(queryString).then((res) => res.data)
  )
  return { data, error, isLoading, mutate }
}

export default useUsers
