import React from 'react'
import { roles } from '@/app/(shared)/services/userService'
import RequireAuth from '@/app/(shared)/components/helper/RequireAuth'
import MainContainer from '@/app/(shared)/components/MainContainer'
import Simulation from './components/Simulation'

function SimulationPage() {
  return (
    <RequireAuth role={[roles.learner]}>
      <MainContainer
        headerMobile={<MainContainer.HeaderMobile title='Simulation' />}
        hideSidebar
      >
        <Simulation />
      </MainContainer>
    </RequireAuth>
  )
}

export default SimulationPage
