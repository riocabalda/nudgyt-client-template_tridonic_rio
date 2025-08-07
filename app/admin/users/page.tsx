import React from 'react'
import { roles } from '@/app/(shared)/services/userService'
import FilterPopover from './components/FilterPopover'
import Users from './components/Users'
import AddUserModal from './components/AddUserModal'
import RequireAuth from '@/app/(shared)/components/helper/RequireAuth'
import MainContainer from '@/app/(shared)/components/MainContainer'
import Search from '@/app/(shared)/components/Search'
import UsersInfiniteScroll from './components/mobile/UsersInfiniteScroll'

function UsersPage() {
  return (
    <>
      <RequireAuth role={[roles.superadmin, roles.admin]}>
        <MainContainer
          headerMobile={<MainContainer.HeaderMobile title='Users' />}
          headerDesktop={
            <MainContainer.HeaderDesktop
              title='Users'
              slotEnd={<AddUserModal />}
            />
          }
        >
          <div className='hidden lg:block container px-0 lg:px-[40px]'>
            <Users
              actionItems={[
                <>
                  <div className='hidden lg:block'>
                    <FilterPopover />
                  </div>
                  <div className='flex gap-2'>
                    <Search containerClass='lg:w-full xl:w-[344px]' />
                    <div className='block lg:hidden'>
                      <FilterPopover />
                    </div>
                  </div>
                </>
              ]}
            />
          </div>

          <div className='lg:hidden'>
            <UsersInfiniteScroll />
          </div>
        </MainContainer>
      </RequireAuth>
    </>
  )
}

export default UsersPage
