import React from 'react'
import MainContainer from '@/app/(shared)/components/MainContainer'
import PersonalDetailsModal from '../components/PersonalDetailsModal'
import Profile from '../components/Profile'

async function PersonalDetailsPage() {
  return (
    <>
      <MainContainer
        headerMobile={<MainContainer.HeaderMobile title='Personal Details' />}
        headerDesktop={<MainContainer.HeaderDesktop title='Account' />}
      >
        <div className='flex flex-col gap-4 lg:gap-[40px] items-center'>
          <Profile />
        </div>
      </MainContainer>
      <PersonalDetailsModal />
    </>
  )
}

export default PersonalDetailsPage
