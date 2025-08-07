'use client'
import React from 'react'
import RequireAuth from '@/app/(shared)/components/helper/RequireAuth'
import MainContainer from '@/app/(shared)/components/MainContainer'
import { roles } from '@/app/(shared)/services/userService'
import LearnerXPCardSection from './components/LearnerXPCardSection'
import RemainingTimeCard from './components/RemainingTimeCard'
import ScenarioContainer from './components/ScenarioContainer'
import useUser from '@/app/(shared)/hooks/useUser'

function DashboardPage() {
  const { user } = useUser()
  return (
    <RequireAuth role={[roles.learner]}>
      <MainContainer
        headerMobile={<MainContainer.HeaderMobile title='Dashboard' />}
        headerDesktop={<MainContainer.HeaderDesktop title='Dashboard' />}
      >
        <div className='container px-0 lg:px-[40px] space-y-3 lg:space-y-[60px]'>
          <div className='space-y-3 mt-4 lg:mt-0 lg:space-y-6'>
            <h1 className='font-semibold text-2xl px-6 lg:px-0'>
              Welcome back, {user?.fullname}
            </h1>
            <div className='grid grid-cols-1 gap-3 lg:gap-6 xl:grid-cols-2'>
              <LearnerXPCardSection />
              <RemainingTimeCard />
            </div>
          </div>
          <ScenarioContainer />
        </div>
      </MainContainer>
    </RequireAuth>
  )
}

export default DashboardPage
