import React from 'react'
import MainContainer from '@/app/(shared)/components/MainContainer'
import Profile from '../components/Profile'
import PasswordModal from '../components/PasswordModal'

async function ChangePasswordPage() {
  return (
    <>
      <MainContainer
        headerMobile={<MainContainer.HeaderMobile title='Account' />}
        headerDesktop={<MainContainer.HeaderDesktop title='Account' />}
      >
        <div className='flex flex-col gap-4 lg:gap-[40px] items-center'>
          <Profile />
        </div>
      </MainContainer>
      <PasswordModal />
    </>
  )
}

export default ChangePasswordPage
