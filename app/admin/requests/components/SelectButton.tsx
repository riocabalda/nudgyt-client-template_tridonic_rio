import { Button } from '@/app/(shared)/components/ui/button'
import { Checkbox } from '@/app/(shared)/components/ui/checkbox'
import { useEffect, useRef } from 'react'
import { useRequestStore } from '@/app/(shared)/hooks/useRequestStore'

function SelectButton() {
  const { selectedRequests, allRequests, addRequest, removeRequest } =
    useRequestStore()

  const allSelected =
    allRequests.length > 0 && selectedRequests.length === allRequests.length
  const someSelected =
    selectedRequests.length > 0 && selectedRequests.length < allRequests.length

  const checkboxRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = someSelected && !allSelected
    }
  }, [someSelected, allSelected])

  const toggleAll = () => {
    if (allSelected || someSelected) {
      allRequests.forEach((request) => removeRequest(request._id))
    } else {
      allRequests.forEach((request) => addRequest(request))
    }
  }

  return (
    <Button
      className='w-full flex justify-start gap-4 text-foreground-800 border-none lg:border-solid lg:border lg:border-input'
      variant='outline'
      onClick={toggleAll}
    >
      <Checkbox
        checked={(allSelected as boolean) || (someSelected && 'indeterminate')}
        id='select-all'
        aria-label='Select all'
      />
      {allSelected
        ? `All ${selectedRequests.length} selected`
        : someSelected
          ? `${selectedRequests.length} selected`
          : 'Select All'}
    </Button>
  )
}

export default SelectButton
