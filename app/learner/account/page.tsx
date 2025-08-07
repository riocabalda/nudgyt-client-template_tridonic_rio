import React from 'react'
import MainContainer from '@/app/(shared)/components/MainContainer'
import Profile from './components/Profile'

async function AccountPage() {
  return (
    <MainContainer
      headerMobile={<MainContainer.HeaderMobile title='Account' />}
      headerDesktop={<MainContainer.HeaderDesktop title='Account' />}
    >
      <div className='flex flex-col gap-4 lg:gap-[40px] items-center'>
        <Profile />
      </div>
    </MainContainer>
  )
}

export default AccountPage
