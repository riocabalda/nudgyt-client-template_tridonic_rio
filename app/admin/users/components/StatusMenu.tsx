'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/app/(shared)/components/ui/dropdown-menu'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

type StatusMenuProps = {
  handleApproveClick: () => void
  handleUnblockClick: () => void
  handleBlockClick: () => void
  handleArchiveClick: () => void
  status: string
  forApproval: boolean
  isApproved: boolean
  isBlocked: boolean
  isArchived: boolean
  isUserSameAsLoggedIn: boolean
  bgColor: string
}

function StatusMenu({
  handleApproveClick,
  handleUnblockClick,
  handleBlockClick,
  handleArchiveClick,
  status,
  forApproval,
  isApproved,
  isBlocked,
  isArchived,
  isUserSameAsLoggedIn,
  bgColor
}: StatusMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={` items-center gap-[10px] hidden lg:flex`}>
      <span
        className='h-[10px] w-[10px] rounded-full block'
        style={{ backgroundColor: bgColor }}
      ></span>
      {!(isArchived || isUserSameAsLoggedIn) ? (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger
            className={`outline-none flex items-center gap-[10px]`}
          >
            {open ? (
              <>
                <span>{status}</span>
                <ChevronUp className='size-4 text-foreground-800' />
              </>
            ) : (
              <>
                <span>{status}</span>
                <ChevronDown className='size-4 text-foreground-800' />
              </>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='px-0 min-w-[358px] fixed top-3 -right-[11px] lg:fixed lg:w-full lg:min-w-[120px]'
            align='end'
          >
            {forApproval && !isApproved && !isArchived && !isBlocked && (
              <DropdownMenuItem
                className='focus:bg-neutral-gray-300 rounded-none px-3 py-2 cursor-pointer'
                onClick={handleApproveClick}
              >
                Approve
              </DropdownMenuItem>
            )}

            {isBlocked ? (
              <DropdownMenuItem
                className='focus:bg-neutral-gray-300 rounded-none px-3 py-2 cursor-pointer'
                onClick={handleUnblockClick}
              >
                Unblock
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className='focus:bg-neutral-gray-300 rounded-none px-3 py-2 cursor-pointer'
                onClick={handleBlockClick}
              >
                Block
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              className='focus:bg-neutral-gray-300 rounded-none px-3 py-2 cursor-pointer'
              onClick={handleArchiveClick}
            >
              Archive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <span>{status}</span>
      )}
    </div>
  )
}

export default StatusMenu
