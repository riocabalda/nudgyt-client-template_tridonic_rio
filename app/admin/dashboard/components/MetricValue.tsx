import { MetricValues } from '@/app/(shared)/types'
import { cn } from '@/app/(shared)/utils'
import { ArrowDown, ArrowUp } from 'lucide-react'

function MetricValue(params: MetricValues | undefined) {
  return (
    <div className='flex items-center gap-2'>
      <h1 className='text-brandcolora text-xl lg:text-2xl font-semibold'>
        {params?.value}
      </h1>
      <span
        className={cn(
          `text-sm flex items-center gap-1 font-medium`,
          params?.changeDirection === 'decreased' && 'text-red-300',
          params?.changeDirection === 'increased' && 'text-green-300'
        )}
      >
        {params?.changeDirection !== 'unchanged' && (
          <>
            {params?.percentageChange}
            {params?.changeDirection === 'increased' && <ArrowUp size={12} />}
            {params?.changeDirection === 'decreased' && <ArrowDown size={12} />}
          </>
        )}
      </span>
    </div>
  )
}

export default MetricValue
