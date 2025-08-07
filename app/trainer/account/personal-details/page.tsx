import React from 'react'
import MainContainer from '@/app/(shared)/components/MainContainer'
import Profile from '../components/Profile'
import PersonalDetailsModal from '../components/PersonalDetailsModal'

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
