import React from 'react'
import { Card } from '@/app/(shared)/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { User } from '@/app/(shared)/services/userService'
import { useRouter } from 'next/navigation'

function UserCard({ user }: { user: User }) {
  const router = useRouter()
  const indicatorColor = {
    ['Approved']: '#80D1AC',
    ['Verified']: '#5E7AAD',
    ['Unverified']: '#CBCDD0',
    ['Archived']: '#ee2f56',
    ['Blocked']: '#393C3F'
  }
  const getStatus = (user: User) => {
    if (user.archived_at !== null) return 'Archived'
    if (user.blocked_at !== null) return 'Blocked'
    if (user.approved_at !== null && user.email_verified_at !== null)
      return 'Approved'
    if (user.email_verified_at !== null) return 'Verified'
    return 'Unverified'
  }

  const status = getStatus(user)

  const bgColor = indicatorColor[status]

  const handleGetUserDetails = (userId: string) => {
    router.push(`/admin/users/${userId}`)
  }
  return (
    <Card
      className='block p-4 rounded-[8px] cursor-pointer'
      onClick={() => handleGetUserDetails(user._id)}
    >
      <div className='block text-foreground'>
        <div className='flex items-center justify-between'>
          <h2 className='font-semibold '>{user.fullname}</h2>
          <span>
            <ChevronRight size={24} strokeWidth={1.5} />
          </span>
        </div>
        <p className='text-muted-foreground'>{user.user_type}</p>
      </div>
      <div className='flex items-center justify-between mt-4'>
        <div className='flex items-center gap-2'>
          <span
            className='block w-[10px] h-[10px] rounded-full bg-brandcolora'
            style={{ backgroundColor: bgColor }}
          />
          <p className='text-sm'>{status}</p>
        </div>
      </div>
    </Card>
  )
}

export default UserCard
