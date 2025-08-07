import React from 'react'
import RequireAuth from '@/app/(shared)/components/helper/RequireAuth'
import MainContainer from '@/app/(shared)/components/MainContainer'
import { roles } from '@/app/(shared)/services/userService'
import RemainingTimeCard from './components/RemainingTimeCard'
import { Card } from '@/app/(shared)/components/ui/card'
import MetricSection from './components/MetricSection'
import LearnerPerScenarioSection from './components/LearnerPerScenarioSection'
import ScenarioContainer from './components/ScenarioContainer'

function DashboardPage() {
  return (
    <RequireAuth role={[roles.superadmin, roles.admin]}>
      <MainContainer
        headerMobile={<MainContainer.HeaderMobile title='Dashboard' />}
        headerDesktop={<MainContainer.HeaderDesktop title='Dashboard' />}
      >
        <div className='container px-0 lg:px-[40px] space-y-5 lg:space-y-10'>
          <RemainingTimeCard />
          <Card className='p-6 grid grid-cols-1 gap-6 lg:grid-cols-1 lg:gap-8 xl:gap-0 xl:grid-cols-2'>
            <MetricSection />
            <LearnerPerScenarioSection />
          </Card>
          <ScenarioContainer />
        </div>
      </MainContainer>
    </RequireAuth>
  )
}

export default DashboardPage
