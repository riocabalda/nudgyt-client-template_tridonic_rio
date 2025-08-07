'use client'

import React from 'react'
import { redirect, useParams } from 'next/navigation'
import { useGetSimulation } from '../hooks/useGetSimulation'
import { Loader } from 'lucide-react'
import SimulationActive from './SimulationActive'
import FetchError from '@/app/(shared)/components/FetchError'
import SimulationRating from './SimulationRating'

function Simulation() {
  const { simulationId } = useParams()

  const { data, isLoading, error } = useGetSimulation(String(simulationId))

  const render = () => {
    if (data && data.data.ended_at === null && data.data.cancelled_at === null)
      return <SimulationActive simulation={data.data} />
    if (data && data.data.cancelled_at !== null)
      return redirect('/learner/dashboard')
    return <SimulationRating />
  }

  if (error) return <FetchError errorMessage={error?.response?.data?.message} />

  if (isLoading) return <Loader className='w-4 h-4 mr-2 animate-spin' />

  return <section>{render()}</section>
}

export default Simulation
