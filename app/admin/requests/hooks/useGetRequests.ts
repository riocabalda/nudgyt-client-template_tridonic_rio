'use client'

import useSWR from 'swr'
import requestService from '@/app/(shared)/services/admin/requestService'

const useGetRequests = (queryString?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/admin/requests?${queryString}`,
    () => requestService.getRequests(queryString).then((res) => res.data)
  )

  return { data, error, isLoading, mutate }
}

export default useGetRequests
