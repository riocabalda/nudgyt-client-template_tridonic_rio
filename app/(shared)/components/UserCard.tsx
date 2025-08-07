'use client'

import React from 'react'
import useUser from '../hooks/useUser'
import { Avatar, AvatarFallback } from './ui/avatar'
import { cn, generateAvatarInitials } from '../utils'
import { roles } from '../services/userService'
import UserRoleBadge from './UserRoleBadge'

function UserCard() {
  const { user } = useUser()

  return (
    <div className='flex items-center gap-4 bg-transparent'>
      <Avatar className='size-[46px] lg:size-[50px]'>
        <AvatarFallback
          className={cn(
            'text-white',
            user?.user_type === roles.learner
              ? 'bg-[#F3706F]'
              : 'bg-brandcolora'
          )}
        >
          {generateAvatarInitials(user?.fullname || 'N')}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col gap-1 grow'>
        <p className='font-medium truncate text-sm lg:text-base w-[150px]'>
          {user?.fullname}
        </p>
        <UserRoleBadge role={user?.user_type || ''} />
      </div>
    </div>
  )
}

export default UserCard
