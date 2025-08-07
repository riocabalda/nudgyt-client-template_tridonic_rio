'use client'

import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'
import authService from '../../services/authService'
import authTokenService from '../../services/authTokenService'
import { User } from '../../services/userService'
import Foribidden from '../Foribidden'

function RequireAuth({
  role,
  children
}: PropsWithChildren<{ role: string[] }>) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User>()
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      try {
        const { data: user } = await authService.getAuthUser()
        setUser(user.data)
        setIsLoading(false)
      } catch (error: any) {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [])

  // Sign out event listener
  useEffect(() => {
    const handleSignOut = () => {
      authTokenService.removeTokens()
      router.replace('/sign-in')
    }
    window.addEventListener('user:signout', handleSignOut)
    return () => window.removeEventListener('user:signout', handleSignOut)
  }, [])

  if (isLoading)
    return (
      <div className='h-screen w-screen grid place-items-center'>
        <Loader className='w-4 h-4 mr-2 animate-spin' />
      </div>
    )

  if (!role.includes(user?.user_type || '')) return <Foribidden />

  return children
}

export default RequireAuth
