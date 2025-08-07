import React from 'react'
import Navigations from './Navigations'
import { Home, User, Users, Flag, LibraryBig } from 'lucide-react'
import UserCard from './UserCard'
import SignOut from './SignOut'
import Link from 'next/link'
import Image from 'next/image'

export const adminDashboardNavs = [
  {
    label: 'Dashboard',
    pathname: '/admin/dashboard',
    icon: <Home className='size-[20px] text-brandcolora' />
  },
  {
    label: 'Scenarios',
    pathname: '/admin/scenarios',
    icon: <LibraryBig className='size-[20px] text-brandcolora' />
  },
  {
    label: 'Users',
    pathname: '/admin/users',
    icon: <Users className='size-[20px] text-brandcolora' />
  },
  {
    label: 'Requests',
    pathname: '/admin/requests',
    icon: <Flag className='size-[20px] text-brandcolora' />
  }
]

export const trainerDashboardNavs = [
  {
    label: 'Dashboard',
    pathname: '/trainer/dashboard',
    icon: <Home className='size-[20px] text-brandcolora' />
  }
]
export const learnerDashboardNavs = [
  {
    label: 'Dashboard',
    pathname: '/learner/dashboard',
    icon: <Home className='size-[20px] text-brandcolora' />
  },
  {
    label: 'Scenarios',
    pathname: '/learner/scenarios',
    icon: <LibraryBig className='size-[20px] text-brandcolora' />
  }
]

export const adminSettingsNavs = [
  {
    label: 'Account',
    pathname: '/admin/account',
    icon: <User className='size-[20px] text-brandcolora' />
  }
]
export const trainerSettingsNavs = [
  {
    label: 'Account',
    pathname: '/trainer/account',
    icon: <User className='size-[20px] text-brandcolora' />
  }
]
export const learnerSettingsNavs = [
  {
    label: 'Account',
    pathname: '/learner/account',
    icon: <User className='size-[20px] text-brandcolora' />
  }
]

function Sidebar() {
  return (
    <aside className='flex-col bg-neutral-gray-200 min-w-[300px] p-[20px] hidden lg:flex sticky top-0 h-screen overflow-y-auto'>
      {/* Logo */}
      <Link href='/'>
        <Image
          src='/images/logo.png'
          alt='Tridonic logo'
          height={80}
          width={400}
          className='lg:block h-10 object-contain object-left'
        />
      </Link>
      <div className='mt-[40px]'>
        <UserCard />
      </div>

      <nav className='flex flex-col gap-1 grow'>
        <p className='text-sm font-bold mt-[40px] mb-2'>DASHBOARD</p>
        <Navigations
          navs={[
            ...adminDashboardNavs,
            ...trainerDashboardNavs,
            ...learnerDashboardNavs
          ]}
        />

        <p className='text-sm font-bold mt-[40px] mb-2'>SETTINGS</p>
        <Navigations
          navs={[
            ...adminSettingsNavs,
            ...trainerSettingsNavs,
            ...learnerSettingsNavs
          ]}
        />
        <SignOut />
        <div className='grow' />
      </nav>
    </aside>
  )
}

export default Sidebar
