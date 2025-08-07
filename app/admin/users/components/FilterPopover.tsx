'use client'

import { Filter } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/app/(shared)/components/ui/popover'
import { Button } from '@/app/(shared)/components/ui/button'
import { Checkbox } from '@/app/(shared)/components/ui/checkbox'
import { useState } from 'react'
import { cn } from '@/app/(shared)/utils'

export function FilterCheckbox({
  label,
  onChange,
  id,
  checked
}: {
  label: string
  onChange: (checked: boolean) => void
  id: string
  checked: boolean
}) {
  return (
    <div className='flex items-center space-x-2 '>
      <Checkbox
        className='h-6 w-6 lg:h-4 lg:w-4'
        id={id}
        onCheckedChange={onChange}
        checked={checked}
      />
      <label
        htmlFor={id}
        className='text-base lg:text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      >
        {label}
      </label>
    </div>
  )
}

function FilterPopover() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [statusFilters, setStatusFilters] = useState({
    APPROVED: searchParams.getAll('status[]').includes('APPROVED'),
    VERIFIED: searchParams.getAll('status[]').includes('VERIFIED'),
    UNVERIFIED: searchParams.getAll('status[]').includes('UNVERIFIED'),
    BLOCKED: searchParams.getAll('status[]').includes('BLOCKED'),
    ARCHIVED: searchParams.getAll('status[]').includes('ARCHIVED')
  })

  const [userTypeFilters, setUserTypeFilters] = useState({
    Admin: searchParams.getAll('user_type[]').includes('Admin'),
    Trainer: searchParams.getAll('user_type[]').includes('Trainer'),
    Learner: searchParams.getAll('user_type[]').includes('Learner')
  })

  const isFiltered =
    searchParams.has('status[]') || searchParams.has('user_type[]')

  const handleStatusChange = (checked: boolean, status: string) => {
    setStatusFilters((prev) => ({
      ...prev,
      [status]: checked
    }))
  }

  const handleUserTypeChange = (checked: boolean, userType: string) => {
    setUserTypeFilters((prev) => ({
      ...prev,
      [userType]: checked
    }))
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams()
    const search = searchParams.get('search')

    if (search) params.append('search', search)

    Object.entries(statusFilters).forEach(([status, checked]) => {
      if (checked) {
        params.append('status[]', status)
      }
    })

    Object.entries(userTypeFilters).forEach(([userType, checked]) => {
      if (checked) {
        params.append('user_type[]', userType)
      }
    })

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleResetFilters = () => {
    const params = new URLSearchParams()
    const search = searchParams.get('search')

    if (search) params.append('search', search)

    setStatusFilters({
      APPROVED: false,
      VERIFIED: false,
      UNVERIFIED: false,
      BLOCKED: false,
      ARCHIVED: false
    })
    setUserTypeFilters({
      Admin: false,
      Trainer: false,
      Learner: false
    })

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'flex gap-1 lg:min-w-[101px] lg:h-[48px] bg-white text-foreground-800 hover:bg-transparent',
            isFiltered &&
              'text-brandcolora border-2 lg:gap-0 border-brandcolora/50'
          )}
        >
          <Filter
            className={cn(
              'h-5 w-5 text-foreground-800',
              isFiltered && 'text-brandcolora -mr-1'
            )}
            strokeWidth={2}
          />
          {isFiltered && (
            <div className='relative -top-2 -left-[0.3rem] w-[10px] h-[10px] bg-brandcolora rounded-full' />
          )}
          <p className='hidden lg:block text-sm lg:text-base !leading-none'>
            Filter
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='max-w-[146px] w-max py-2 px-2' align='end'>
        <div className='flex flex-col px-1'>
          <div>
            <p className='text-xs text-muted-foreground py-2'>VERIFICATION</p>
            <div className='flex flex-col gap-[16px] py-2'>
              <FilterCheckbox
                label='Approved'
                onChange={(checked) => handleStatusChange(checked, 'APPROVED')}
                id='approved'
                checked={statusFilters.APPROVED}
              />
              <FilterCheckbox
                label='Verified'
                onChange={(checked) => handleStatusChange(checked, 'VERIFIED')}
                id='verified'
                checked={statusFilters.VERIFIED}
              />
              <FilterCheckbox
                label='Unverified'
                onChange={(checked) =>
                  handleStatusChange(checked, 'UNVERIFIED')
                }
                id='unverified'
                checked={statusFilters.UNVERIFIED}
              />
              <FilterCheckbox
                label='Blocked'
                onChange={(checked) => handleStatusChange(checked, 'BLOCKED')}
                id='blocked'
                checked={statusFilters.BLOCKED}
              />
              <FilterCheckbox
                label='Archived'
                onChange={(checked) => handleStatusChange(checked, 'ARCHIVED')}
                id='archived'
                checked={statusFilters.ARCHIVED}
              />
            </div>
          </div>
          <div>
            <p className='text-xs text-muted-foreground py-2'>USER TYPE</p>
            <div className='flex flex-col gap-[16px] py-2 text-xs lg:text-sm'>
              <FilterCheckbox
                label='Admin'
                onChange={(checked) => handleUserTypeChange(checked, 'Admin')}
                id='admin'
                checked={userTypeFilters.Admin}
              />
              <FilterCheckbox
                label='Trainer'
                onChange={(checked) => handleUserTypeChange(checked, 'Trainer')}
                id='trainer'
                checked={userTypeFilters.Trainer}
              />
              <FilterCheckbox
                label='Learner'
                onChange={(checked) => handleUserTypeChange(checked, 'Learner')}
                id='learner'
                checked={userTypeFilters.Learner}
              />
            </div>
          </div>
        </div>
        <div>
          <Button
            className='text-xs lg:text-sm w-full h-fit py-2 mt-2'
            onClick={handleApplyFilters}
          >
            Apply Filter
          </Button>
          <Button
            className='text-xs lg:text-sm w-full h-fit py-2 mt-2 bg-white text-brandcolora hover:bg-brandcolora/10'
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default FilterPopover
