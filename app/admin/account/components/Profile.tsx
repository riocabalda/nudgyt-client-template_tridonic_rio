'use client'

import { Avatar, AvatarFallback } from '@/app/(shared)/components/ui/avatar'
import { Button } from '@/app/(shared)/components/ui/button'
import { Card } from '@/app/(shared)/components/ui/card'
import { cn, generateAvatarInitials } from '@/app/(shared)/utils'
import useUser from '@/app/(shared)/hooks/useUser'
import Link from 'next/link'
import UserRoleBadge from '@/app/(shared)/components/UserRoleBadge'
import { roles } from '@/app/(shared)/services/userService'

function Profile() {
  const { user } = useUser()
  const isSuperAdmin = user?.user_type === roles.superadmin
  return (
    <Card className='shadow-sm rounded-none lg:rounded-[8px] py-[40px] px-4 lg:px-[80px] flex flex-col gap-[24px] items-center w-full lg:max-w-[600px]'>
      <Avatar className='size-[80px]'>
        <AvatarFallback className='text-white bg-brandcolora text-[36px]'>
          {generateAvatarInitials(user?.fullname || 'N')}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col items-center'>
        <p className='text-center text-[20px] font-semibold text-foreground-800'>
          {user?.fullname}
        </p>
        <UserRoleBadge
          classname='bg-neutral-gray-200 mt-[8px]'
          role={user?.user_type || ''}
        />
        <p className='text-center text-muted-foreground mt-[8px]'>
          {user?.email}
        </p>
      </div>
      <div
        className={cn(
          'grid items-stretch w-full grid-cols-1 gap-4 lg:grid-cols-2',
          isSuperAdmin && 'lg:grid-cols-1'
        )}
      >
        <Link
          href='/admin/account/mobile/personal-details'
          className='lg:hidden'
        >
          <Button variant='outline' className='w-full'>
            Edit Profile
          </Button>
        </Link>
        <Link
          href='/admin/account/personal-details'
          className='hidden lg:block'
        >
          <Button variant='outline' className='w-full'>
            Edit Profile
          </Button>
        </Link>

        {!isSuperAdmin && (
          <>
            {' '}
            <Link
              href='/admin/account/mobile/change-password'
              className='lg:hidden'
            >
              <Button variant='outline' className='w-full'>
                Change Password
              </Button>
            </Link>
            <Link
              href='/admin/account/change-password'
              className='hidden lg:block'
            >
              <Button variant='outline' className='w-full'>
                Change Password
              </Button>
            </Link>
          </>
        )}
      </div>
    </Card>
  )
}

export default Profile
