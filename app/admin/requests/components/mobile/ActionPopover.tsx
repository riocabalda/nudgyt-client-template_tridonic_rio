import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/app/(shared)/components/ui/popover'
import { Ellipsis } from 'lucide-react'
import { useState } from 'react'
import SelectButton from '../SelectButton'
import ApproveRequestModal from '../ApproveRequestModal'
import { useRequestStore } from '@/app/(shared)/hooks/useRequestStore'
import DenyRequestModal from '../DenyRequestModal'
import { cn } from '@/app/(shared)/utils'

type ActionPopverProps = {
  containerClass?: string
}

function ActionPopver({ containerClass }: ActionPopverProps) {
  const [openPopover, setOpenPopover] = useState(false)
  const { selectedRequests } = useRequestStore()

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'relative py-3 px-2 text-foreground-800',
            containerClass
          )}
        >
          <Ellipsis size={20} strokeWidth={1.5} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className='mt-[7px] w-[calc(100vw-2rem)] mx-4 px-0 py-2 lg:hidden'
        align='end'
      >
        <ul>
          <li>
            <SelectButton />
          </li>
          {selectedRequests.length !== 0 && (
            <>
              <li>
                <ApproveRequestModal data={selectedRequests} />
              </li>
              <li>
                <DenyRequestModal data={selectedRequests} />
              </li>
            </>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export default ActionPopver
