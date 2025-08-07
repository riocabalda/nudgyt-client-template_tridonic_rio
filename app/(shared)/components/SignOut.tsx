'use client'

import { LogOut } from 'lucide-react'
import authTokenService from '../services/authTokenService'
import { useRouter } from 'next/navigation'

function SignOut() {
  const router = useRouter()

  const handleSignOutClick = () => {
    authTokenService.removeTokens()
    router.replace('/sign-in')
  }

  return (
    <button
      onClick={handleSignOutClick}
      className='flex items-center gap-4 lg:gap-[32px] p-4 font-medium rounded-[8px] text-foreground-800 hover:bg-white h-[48px]'
    >
      <LogOut className='size-[20px] text-brandcolora' /> Logout
    </button>
  )
}

export default SignOut
