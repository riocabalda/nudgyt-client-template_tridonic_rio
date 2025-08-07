import React from 'react'
import RequireAuth from '@/app/(shared)/components/helper/RequireAuth'
import MainContainer from '@/app/(shared)/components/MainContainer'
import { roles } from '@/app/(shared)/services/userService'
import Scenarios from './components/Scenarios'

function ScenariosPage() {
  return (
    <RequireAuth role={[roles.superadmin, roles.admin]}>
      <MainContainer
        headerMobile={<MainContainer.HeaderMobile title='Scenarios' />}
        headerDesktop={<MainContainer.HeaderDesktop title='Scenarios' />}
      >
        <div className='container pt-[40px] px-0 lg:px-[40px]'>
          <Scenarios />
        </div>
      </MainContainer>
    </RequireAuth>
  )
}

export default ScenariosPage
