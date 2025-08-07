'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/app/(shared)/components/ui/select'
import React from 'react'
import { cn } from '@/app/(shared)/utils'

const SELECT_STATUS_ITEMS = {
  APPROVED: 'Approved',
  UNBLOCKED: 'Unblocked',
  BLOCKED: 'Blocked',
  ARCHIVED: 'Archived',
  UNVERIFIED: 'Unverified'
}

type StatusSelectProps = {
  handleStatusChange: (value: string) => void
  status: string
  bgColor: string
  forApproval: boolean
  isApproved: boolean
  isBlocked: boolean
  isArchived: boolean
  isUserSameAsLoggedIn: boolean
}

function StatusSelect({
  handleStatusChange,
  status,
  bgColor,
  forApproval,
  isApproved,
  isBlocked,
  isArchived,
  isUserSameAsLoggedIn
}: StatusSelectProps) {
  if (isArchived || isUserSameAsLoggedIn) {
    return (
      <div className={`items-center gap-[10px] flex lg:hidden`}>
        <span
          className='h-[10px] w-[10px] rounded-full block'
          style={{ backgroundColor: bgColor }}
        ></span>
        <span>{status}</span>
      </div>
    )
  }

  return (
    <Select onValueChange={handleStatusChange} value={status}>
      <SelectTrigger className='w-full text-md flex lg:hidden'>
        <div className='flex items-center gap-[10px]'>
          <span
            className='h-[10px] w-[10px] rounded-full block'
            style={{ backgroundColor: bgColor }}
          ></span>
          <p>{status}</p>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          className={cn(
            !(forApproval && !isApproved && !isArchived && !isBlocked) &&
              'hidden'
          )}
          value={SELECT_STATUS_ITEMS.APPROVED}
        >
          Approve
        </SelectItem>
        <SelectItem
          className={cn(!isBlocked && 'hidden')}
          value={SELECT_STATUS_ITEMS.UNBLOCKED}
        >
          Unblock
        </SelectItem>
        <SelectItem
          className={cn(isBlocked && 'hidden')}
          value={SELECT_STATUS_ITEMS.BLOCKED}
        >
          Block
        </SelectItem>
        <SelectItem value={SELECT_STATUS_ITEMS.ARCHIVED}>Archive</SelectItem>
        <SelectItem className='hidden' value={SELECT_STATUS_ITEMS.UNVERIFIED}>
          {SELECT_STATUS_ITEMS.UNVERIFIED}
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default StatusSelect
