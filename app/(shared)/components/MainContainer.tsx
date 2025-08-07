import React, { PropsWithChildren, ReactNode } from 'react'
import Sidebar from './Sidebar'
import SidebarDrawer from './SidebarMobile'
import BackButton from './BackButton'
import { cn } from '../utils'

function MainContainer({
  children,
  headerMobile,
  headerDesktop,
  className,
  hideSidebar
}: PropsWithChildren<{
  className?: string
  headerMobile?: ReactNode
  headerDesktop?: ReactNode
  hideSidebar?: boolean
}>) {
  return (
    <div className='flex min-h-svh'>
      {!hideSidebar && <Sidebar />}
      <div className='w-full overflow-hidden'>
        {headerMobile}
        {headerDesktop}
        <main className={cn('pb-4 lg:pb-[24px] lg:overflow-y-auto', className)}>
          {children}
        </main>
      </div>
    </div>
  )
}

function HeaderMobile({
  title,
  hideMenuBtn,
  showBackBtn
}: {
  title: string
  hideMenuBtn?: boolean
  showBackBtn?: boolean
}) {
  return (
    <div className='flex items-center justify-between  border-b h-[60px] bg-white lg:hidden px-4'>
      <div className='flex items-center'>
        {showBackBtn && <BackButton />}
        <h1 className='font-medium font-poppins'>{title}</h1>
      </div>
      {!hideMenuBtn && <SidebarDrawer />}
    </div>
  )
}

function HeaderDesktop({
  title,
  slotEnd,
  showBackBtn
}: {
  title: string
  slotEnd?: ReactNode
  showBackBtn?: boolean
}) {
  return (
    <div className='hidden lg:container lg:px-[40px] lg:flex flex-col gap-[20px] lg:flex-row lg:items-center justify-between py-[32px] px-[40px]'>
      <div className='flex items-center'>
        {showBackBtn && <BackButton />}
        <h1 className='text-2xl font-medium lg:text-[32px]'>{title}</h1>
      </div>
      {slotEnd}
    </div>
  )
}

MainContainer.HeaderMobile = HeaderMobile
MainContainer.HeaderDesktop = HeaderDesktop

export default MainContainer
