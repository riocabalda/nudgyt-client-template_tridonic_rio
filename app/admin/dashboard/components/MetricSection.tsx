'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/app/(shared)/components/ui/select'
import scenarioService from '@/app/(shared)/services/admin/scenarioService'
import { convertUtcToLocal } from '@/app/(shared)/utils'
import { useState } from 'react'
import useSWR from 'swr'
import MetricValue from './MetricValue'

const DATE_FILTER_VALUE = {
  TODAY: '0',
  YESTERDAY: '2',
  LAST_7_DAYS: '7',
  LAST_30_DAYS: '30',
  THIS_YEAR: '365'
}

function MetricSection() {
  const [filterDateBy, setFilterDateBy] = useState<string>('0')

  const handleFilterDateBy = (value: string) => setFilterDateBy(value)

  const handleGetTimezoneDateTime = (filter_by_days: string) => {
    let currentDate = new Date()

    if (filter_by_days === DATE_FILTER_VALUE.YESTERDAY) {
      const yesterday = new Date()
      const timestamp = yesterday.setDate(yesterday.getDate() - 1)
      currentDate = new Date(timestamp)
      filter_by_days = DATE_FILTER_VALUE.TODAY
    }

    const startDate = new Date(currentDate)
    startDate.setDate(startDate.getDate() - Number(filter_by_days))

    const tzStartDate = convertUtcToLocal(
      startDate.toUTCString(),
      'MMMM D, YYYY'
    )
    const tzCurrentEndDate = convertUtcToLocal(
      currentDate.toUTCString(),
      'MMMM D, YYYY'
    )

    return { startDate: tzStartDate, endDate: tzCurrentEndDate }
  }

  const { startDate, endDate } = handleGetTimezoneDateTime(filterDateBy)
  const params = new URLSearchParams({ startDate, endDate })

  const { data } = useSWR(`/admin/scenarios/metrics?${params.toString()}`, () =>
    scenarioService
      .getScenarioMetrics(params.toString())
      .then((res) => res.data)
  )

  return (
    <div className='space-y-6 border-0 pr-0 xl:border-r-2 xl:pr-10'>
      <Select value={filterDateBy} onValueChange={handleFilterDateBy}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select Filter' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={DATE_FILTER_VALUE.TODAY}>Today</SelectItem>
            <SelectItem value={DATE_FILTER_VALUE.YESTERDAY}>
              Yesterday
            </SelectItem>
            <SelectItem value={DATE_FILTER_VALUE.LAST_7_DAYS}>
              Last 7 days
            </SelectItem>
            <SelectItem value={DATE_FILTER_VALUE.LAST_30_DAYS}>
              Last 30 days
            </SelectItem>
            <SelectItem value={DATE_FILTER_VALUE.THIS_YEAR}>
              This year
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className='grid grid-cols-2 gap-6'>
        <div className='space-y-1'>
          <p className='text-sm lg:text-base text-neutral-600 font-semibold'>
            Average Time
          </p>
          <MetricValue {...data?.data.averageTimeData} />
        </div>
        <div className='space-y-1'>
          <p className='text-sm lg:text-base text-neutral-600 font-semibold'>
            Total Time Used
          </p>
          <MetricValue {...data?.data.totalTimeUsedData} />
        </div>
        <div className='space-y-1'>
          <p className='text-sm lg:text-base text-neutral-600 font-semibold'>
            Total Extension Requests
          </p>
          <MetricValue {...data?.data.totalRequestsData} />
        </div>
        <div className='space-y-1'>
          <p className='text-sm lg:text-base text-neutral-600 font-semibold'>
            Total Learners
          </p>
          <MetricValue {...data?.data.totalLearnersData} />
        </div>
      </div>
    </div>
  )
}

export default MetricSection
