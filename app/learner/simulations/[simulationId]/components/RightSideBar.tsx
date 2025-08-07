'use client'

import React, { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Loader } from 'lucide-react'
import { SimulationType } from '@/app/(shared)/services/learner/simulationService'
import Transcript from './Transcript'
import Profile from './Profile'
import NavigationPanel from './NavigationPanel'
import useSWR from 'swr'
import scenarioService from '@/app/(shared)/services/learner/scenarioService'
import FetchError from '@/app/(shared)/components/FetchError'
import '../style.css'
import Tips from './Tips'

function RightSideBar({ simulation }: { simulation: SimulationType }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = new URLSearchParams(searchParams.toString())
  const navParam = params.get('panel')
  const pathname = usePathname()

  const { data, isLoading, error } = useSWR(
    `/admin/scenarios/${simulation.scenario_id}`,
    () =>
      scenarioService
        .getScenarioById(String(simulation.scenario_id))
        .then((res) => res.data)
  )

  useEffect(() => {
    if (!navParam) {
      params.set('panel', 'transcript')
      router.replace(`${pathname}?${params.toString()}`)
    }
  }, [searchParams.toString()])

  const render = () => {
    if (navParam === 'transcript') return <Transcript />
    if (navParam === 'profile' && data)
      return <Profile scenarioData={data.data} />
  }

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
    <div className='flex flex-col h-[calc(100vh-346px)] lg:max-w-[400px] lg:min-w-[400px] lg:h-[667px] pb-14 lg:pb-0'>
      {render()}
      <Tips />
      <div className='hidden lg:block mt-4'>
        <NavigationPanel />
      </div>
    </div>
  )
}

export default RightSideBar
