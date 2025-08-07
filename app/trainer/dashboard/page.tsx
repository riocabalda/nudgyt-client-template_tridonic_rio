'use client'

import React from 'react'
import RequireAuth from '@/app/(shared)/components/helper/RequireAuth'
import MainContainer from '@/app/(shared)/components/MainContainer'
import { roles } from '@/app/(shared)/services/userService'

function DashboardPage() {
  return (
    <RequireAuth role={[roles.trainer]}>
      <MainContainer
        headerMobile={<MainContainer.HeaderMobile title='Dashboard' />}
        headerDesktop={<MainContainer.HeaderDesktop title='Dashboard' />}
      ></MainContainer>
    </RequireAuth>
  )
}

export default DashboardPage
