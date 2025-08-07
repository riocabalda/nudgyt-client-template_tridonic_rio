'use client'

import StatusMenu from './StatusMenu'
import useUser from '@/app/(shared)/hooks/useUser'
import userService from '@/app/(shared)/services/admin/userService'
import { User, roles } from '@/app/(shared)/services/userService'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import useUsers from '../hooks/useUsers'
import ArchiveUserModal from './ArchiveUserModal'
import StatusSelect from './StatusSelect'
import { useSWRConfig } from 'swr'
import useAlertStore from '@/app/(shared)/components/alert/useAlertStore'

const indicatorColor = {
  ['Approved']: '#80D1AC',
  ['Verified']: '#5E7AAD',
  ['Unverified']: '#CBCDD0',
  ['Archived']: '#ee2f56',
  ['Blocked']: '#393C3F'
}

export const SELECT_STATUS_ITEMS = {
  APPROVED: 'Approved',
  UNBLOCKED: 'Unblocked',
  BLOCKED: 'Blocked',
  ARCHIVED: 'Archived',
  UNVERIFIED: 'Unverified'
}

function Status({ user }: { user: User }) {
  const getStatus = (user: User) => {
    if (user.archived_at !== null) return 'Archived'
    if (user.blocked_at !== null) return 'Blocked'
    if (user.approved_at !== null && user.email_verified_at !== null)
      return 'Approved'
    if (user.email_verified_at !== null) return 'Verified'
    return 'Unverified'
  }

  const [status, setStatus] = useState<string>(getStatus(user))
  const [openArchive, setOpenArchive] = useState(false)
  const searchParams = useSearchParams()
  const { mutate: mutateUsers } = useUsers(searchParams.toString())
  const { mutate: mutateUser } = useSWRConfig()
  const { user: loggedInUser } = useUser()
  const { showAlert } = useAlertStore()

  const bgColor = indicatorColor[status as keyof typeof indicatorColor]
  const isUserSameAsLoggedIn = loggedInUser?._id === user._id
  const isBlocked = user.blocked_at !== null
  const isArchived = user.archived_at !== null
  const isApproved = user.approved_at !== null
  const forApproval =
    user.email_verified_at !== null &&
    (user?.user_type === roles.admin || user?.user_type === roles.trainer)

  const handleApproveClick = async () => {
    const confirmed = window.confirm(
      `Approve ${user.user_type.toLocaleLowerCase()} ${user.fullname}?`
    )

    if (confirmed) {
      try {
        await userService.approveUser(user._id)

        mutateUsers()
        mutateUser(`/admin/users/${user._id}`)
        setStatus(SELECT_STATUS_ITEMS.APPROVED)
        showAlert({
          message: 'Trainer approved!',
          variant: 'success'
        })
      } catch (error: any) {
        console.log(error)
        showAlert({
          message: error?.response?.data?.message || 'An error occurred.',
          variant: 'error'
        })
      }
    }
  }

  const handleBlockClick = async () => {
    const confirmed = window.confirm(`Block user ${user.fullname}?`)

    if (confirmed) {
      try {
        await userService.blockUser(user._id)

        mutateUsers()
        mutateUser(`/admin/users/${user._id}`)
        setStatus(SELECT_STATUS_ITEMS.BLOCKED)
        showAlert({
          message: 'User blocked!',
          variant: 'success'
        })
      } catch (error: any) {
        console.log(error)
        showAlert({
          message: error?.response?.data?.message || 'An error occurred.',
          variant: 'error'
        })
      }
    }
  }

  const handleUnblockClick = async () => {
    const confirmed = window.confirm(`Unblock user ${user.fullname}?`)

    if (confirmed) {
      try {
        await userService.unblockUser(user._id)

        mutateUsers()
        mutateUser(`/admin/users/${user._id}`)
        setStatus(SELECT_STATUS_ITEMS.UNBLOCKED)
        showAlert({
          message: 'User unblocked!',
          variant: 'success'
        })
      } catch (error: any) {
        console.log(error)
        showAlert({
          message: error?.response?.data?.message || 'An error occurred.',
          variant: 'error'
        })
      }
    }
  }

  const handleArchiveClick = async () => {
    setOpenArchive(true)
  }

  const handleStatusChange = (value: string) => {
    if (SELECT_STATUS_ITEMS.APPROVED === value) {
      handleApproveClick()
    } else if (SELECT_STATUS_ITEMS.UNBLOCKED === value) {
      handleUnblockClick()
    } else if (SELECT_STATUS_ITEMS.BLOCKED === value) {
      handleBlockClick()
    } else if (SELECT_STATUS_ITEMS.ARCHIVED === value) {
      handleArchiveClick()
    }
  }
  const statusData = {
    status,
    forApproval,
    isApproved,
    isBlocked,
    isArchived,
    isUserSameAsLoggedIn,
    bgColor
  }

  return (
    <>
      <StatusMenu
        handleApproveClick={handleApproveClick}
        handleUnblockClick={handleUnblockClick}
        handleBlockClick={handleBlockClick}
        handleArchiveClick={handleArchiveClick}
        {...statusData}
      />
      <StatusSelect handleStatusChange={handleStatusChange} {...statusData} />
      {openArchive && (
        <ArchiveUserModal
          user={user}
          setStatus={setStatus}
          onCancel={() => setOpenArchive(false)}
        />
      )}
    </>
  )
}

export default Status
