'use client'

import RequireAuth from '@/app/(shared)/components/helper/RequireAuth'
import MainContainer from '@/app/(shared)/components/MainContainer'
import { roles } from '@/app/(shared)/services/userService'
import Requests from './components/Requests'
import SelectButton from './components/SelectButton'
import RemainingTimeCard from '../dashboard/components/RemainingTimeCard'

function RequestsPage() {
  return (
    <>
      <RequireAuth role={[roles.superadmin, roles.admin]}>
        <MainContainer
          headerMobile={
            <MainContainer.HeaderMobile title='Extension Requests' />
          }
          headerDesktop={
            <MainContainer.HeaderDesktop title='Extension Requests' />
          }
        >
          <div className='block container px-0 lg:px-[40px]'>
            <RemainingTimeCard />
            <Requests
              actionItems={[
                <div key={1} className='hidden lg:block'>
                  <SelectButton />
                </div>
              ]}
            />
          </div>
        </MainContainer>
      </RequireAuth>
    </>
  )
}

export default RequestsPage
