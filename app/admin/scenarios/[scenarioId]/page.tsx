import React from 'react'
import RequireAuth from '@/app/(shared)/components/helper/RequireAuth'
import MainContainer from '@/app/(shared)/components/MainContainer'
import { roles } from '@/app/(shared)/services/userService'
import ScenarioDetails from './components/ScenarioDetails'

function ScenarioDetailsPage() {
  return (
    <RequireAuth role={[roles.superadmin, roles.admin]}>
      <MainContainer
        headerMobile={
          <MainContainer.HeaderMobile title='Scenario Details' showBackBtn />
        }
        headerDesktop={
          <MainContainer.HeaderDesktop title='Scenario Details' showBackBtn />
        }
      >
        <ScenarioDetails />
      </MainContainer>
    </RequireAuth>
  )
}

export default ScenarioDetailsPage
