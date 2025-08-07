'use client'

import { PropsWithChildren, useLayoutEffect, useState } from 'react'
import { User, roles } from '../../services/userService'
import { redirect } from 'next/navigation'
import authService from '../../services/authService'

function RedirectAuth({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User>()
  const userRole = user?.user_type

  useLayoutEffect(() => {
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

  useLayoutEffect(() => {
    if (userRole === roles.learner) return redirect('/learner/dashboard')
    if (userRole === roles.trainer) return redirect('/trainer/dashboard')
    if (userRole === roles.admin || userRole === roles.superadmin)
      return redirect('/admin/dashboard')
  }, [user, userRole])

  if (isLoading) {
    return null
  }

  return children
}

export default RedirectAuth
