'use client'

import React, { useEffect } from 'react'
import { Input } from '@/app/(shared)/components/ui/input'
import { useDebounceValue } from 'usehooks-ts'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon } from 'lucide-react'
import { cn } from '../utils'

function Search({
  containerClass,
  isRemovePageQueryOnSearch = true
}: {
  containerClass?: string
  isRemovePageQueryOnSearch?: boolean
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [debouncedValue, setValue] = useDebounceValue(
    searchParams.get('search'),
    500
  )
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (debouncedValue) {
      params.set('search', debouncedValue || '')
    } else {
      params.delete('search')
    }
    if (isRemovePageQueryOnSearch && debouncedValue) {
      params.delete('page')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, [debouncedValue])

  return (
    <div
      className={cn(
        'flex items-center bg-white gap-3 px-4 py-3 w-full lg:h-[48px] rounded-sm border-[1px] border-input',
        containerClass
      )}
    >
      <SearchIcon className='w-5 h-5' />
      <Input
        placeholder='Search'
        className='bg-transparent w-full px-0 py-0 !h-fit border-none focus-visible:ring-transparent rounded-none focus-visible:ring-offset-0'
        onChange={(event) => setValue(event.target.value)}
        defaultValue={searchParams.get('search') || ''}
      />
    </div>
  )
}

export default Search
