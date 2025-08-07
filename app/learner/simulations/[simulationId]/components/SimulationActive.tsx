'use client'

import React from 'react'
import { SimulationType } from '@/app/(shared)/services/learner/simulationService'
import SimulationE3dsIframe from './SimulationE3dsIframe'
import RightSideBar from './RightSideBar'
import NavigationPanel from './NavigationPanel'

function SimulationActive({ simulation }: { simulation: SimulationType }) {
  return (
    <div className='relative flex flex-col lg:flex-row lg:gap-6 overflow-hidden lg:max-w-[1920px] lg:mx-auto lg:px-10 lg:pt-[60px]'>
      <SimulationE3dsIframe simulation={simulation} />
      <RightSideBar simulation={simulation} />
      <div className='lg:hidden w-full fixed bottom-0'>
        <NavigationPanel />
      </div>
    </div>
  )
}

export default SimulationActive
