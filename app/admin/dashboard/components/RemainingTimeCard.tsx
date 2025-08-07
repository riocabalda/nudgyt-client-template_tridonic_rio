'use client'
import { Card } from '@/app/(shared)/components/ui/card'
import BuyAdditionalTimeButton from './BuyAdditionalTimeButton'
import useSWR from 'swr'
import settingService from '@/app/(shared)/services/admin/settingService'

function RemainingTimeCard() {
  const { data } = useSWR(`/admin/settings`, () =>
    settingService.getSetting().then((res) => res.data)
  )

  return (
    <Card className='px-6 py-4 gap-5 flex flex-wrap items-center justify-between lg:gap-0'>
      <div>
        <h5 className='text-neutral-600 text-base'>Overall remaining time</h5>
        <h1 className='text-brandcolora text-2xl font-bold'>
          {data?.data.formatted_total_time}
        </h1>
      </div>
      <BuyAdditionalTimeButton />
    </Card>
  )
}

export default RemainingTimeCard
