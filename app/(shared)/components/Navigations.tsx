'use client'

import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { canView } from '../permissions/pagePermissions'
import { cn } from '../utils'
import Link from 'next/link'
import useUser from '../hooks/useUser'
import AdminRequestsNav from './AdminRequestsNav'

type Nav = {
  label: string
  pathname: string
  icon: ReactNode
}

type NavigationsProps = {
  navs: Nav[]
}

function Navigations({ navs }: NavigationsProps) {
  const { user } = useUser()
  const pathname = usePathname()

  if (user) {
    return navs
      .filter((nav) => canView(user.user_type, nav.pathname))
      .map((nav) => {
        const isActive = pathname.includes(nav.pathname)

        if (nav.pathname.includes('/admin/requests')) {
          return (
            <AdminRequestsNav
              key={nav.pathname}
              label={nav.label}
              icon={nav.icon}
              pathname={nav.pathname}
              isActive={isActive}
            />
          )
        }

        return (
          <Link
            key={nav.pathname}
            href={nav.pathname}
            className={cn(
              'p-4 flex items-center gap-4 lg:gap-[32px] text-foreground-800 rounded-[8px] font-medium hover:bg-white h-[48px]',
              isActive && 'bg-white font-bold'
            )}
          >
            {nav.icon} {nav.label}
          </Link>
        )
      })
  }
  return null
}

export default Navigations
