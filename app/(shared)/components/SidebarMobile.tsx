'use client'

import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from '@/app/(shared)/components/ui/sheet'
import { Button } from '@/app/(shared)/components/ui/button'
import { Menu } from 'lucide-react'
import Navigations from './Navigations'
import UserCard from './UserCard'
import {
  adminDashboardNavs,
  adminSettingsNavs,
  trainerDashboardNavs,
  trainerSettingsNavs,
  learnerDashboardNavs,
  learnerSettingsNavs
} from './Sidebar'
import SignOut from './SignOut'
import Link from 'next/link'
import Image from 'next/image'

function SidebarDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='bg-transparent border-none hover:bg-muted translate-x-[8px]'
        >
          <Menu className='size-[32px]' strokeWidth='1.5' />
        </Button>
      </SheetTrigger>
      <SheetContent
        side='right'
        className='px-4 border-none bg-neutral-gray-200 overflow-y-auto'
      >
        <SheetHeader className='mb-6'></SheetHeader>
        {/* Logo */}
        <Link href='/'>
          <Image
            src='/images/logo.png'
            alt='Tridonic logo'
            height={80}
            width={400}
            className='lg:block h-9 object-contain object-left'
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
      </SheetContent>
    </Sheet>
  )
}

export default SidebarDrawer
