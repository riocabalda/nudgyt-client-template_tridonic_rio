import React, { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/app/(shared)/components/ui/popover'
import { Ellipsis } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import AddUserModal from '../AddUserModal'
import FilterDrawer from './FilterDrawer'

enum Option {
  ADD_USER = 'addUser',
  SELECT_MULTIPLE = 'selectMultiple',
  FILTER = 'filter'
}

function ActionPopover() {
  const [openPopover, setOpenPopover] = useState(false)
  const [openActionPopOver, setActionPopOver] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const isFiltered =
    searchParams.has('status[]') || searchParams.has('user_type[]')

  const handleFilterSort = (value: string) => {
    setActionPopOver(value)
  }

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <button className='relative py-3 px-2 text-foreground-800'>
          <Ellipsis size={20} strokeWidth={1.5} />
          {isFiltered && (
            <span className='block absolute top-0 right-0 h-[10px] w-[10px] bg-brandcolora rounded-full' />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className='mt-[7px] w-[calc(100vw-2rem)] mx-4 px-0 py-2 lg:hidden'
        align='end'
      >
        <ul>
          <li
            className={openActionPopOver === Option.ADD_USER ? 'bg-muted' : ''}
            onClick={() => handleFilterSort(Option.ADD_USER)}
          >
            <AddUserModal setOpen={setOpenPopover} />
          </li>
          {/* <li>
            <button
              className={cn(
                'w-full flex items-center gap-2 p-3 text-foreground-800 hover:bg-muted',
                openActionPopOver === Option.SELECT_MULTIPLE && 'bg-muted'
              )}
              onClick={() => handleFilterSort(Option.SELECT_MULTIPLE)}
            >
              <CopyCheck size={20} />
              <span>Select multiple</span>
            </button>
          </li> */}
          <li
            className={openActionPopOver === Option.FILTER ? 'bg-muted' : ''}
            onClick={() => handleFilterSort(Option.FILTER)}
          >
            <FilterDrawer setOpen={setOpenPopover} />
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export default ActionPopover
