import React from 'react'
import { roles } from '@/app/(shared)/services/userService'
import RequireAuth from '@/app/(shared)/components/helper/RequireAuth'
import MainContainer from '@/app/(shared)/components/MainContainer'
import ScenarioDetails from './components/ScenarioDetails'
import StartScenarioButton from './components/StartScenarioButton'

function ScenarioDetailsPage() {
  return (
    <RequireAuth role={[roles.learner]}>
      <MainContainer
        headerMobile={
          <MainContainer.HeaderMobile title='Scenario Details' showBackBtn />
        }
        headerDesktop={
          <MainContainer.HeaderDesktop
            title='Scenario Details'
            slotEnd={
              <div className='flex items-center gap-[12px]'>
                <StartScenarioButton />
              </div>
            }
            showBackBtn
          />
        }
      >
        <ScenarioDetails />
        <div className='fixed bottom-0 w-full p-4 pb-[40px] bg-white flex flex-col lg:hidden'>
          <StartScenarioButton />
        </div>
      </MainContainer>
    </RequireAuth>
  )
}

export default ScenarioDetailsPage
