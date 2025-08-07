import { Card } from '@/app/(shared)/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from '@/app/(shared)/components/ui/table'
import Pagination from '@/app/(shared)/components/Pagination'
import useGetPreviousSimulations from '../hooks/useGetPreviousSimulations'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import {
  formatDateTime,
  getSimulationUsedTime,
  millisecondsToTimeString
} from '@/app/(shared)/utils'
import FetchError from '@/app/(shared)/components/FetchError'
import { Loader } from 'lucide-react'

const PreviousAttempts = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { scenarioId } = useParams()

  const { data, error, isLoading } = useGetPreviousSimulations(
    String(scenarioId),
    searchParams.toString()
  )

  const handleViewResults = (id: string) => {
    router.push(`/learner/simulations/${id}/results`)
  }

  if (error) {
    return (
      <div className='grid place-items-center p-4'>
        <FetchError errorMessage={error?.response?.data?.message} />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='grid place-items-center p-4'>
        <Loader className='w-4 h-4 mr-2 animate-spin' />
      </div>
    )
  }

  return (
    data &&
    data.data.length > 0 && (
      <Card className='w-full max-w-4xl mx-auto p-[24px]'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-[18px] font-semibold'>Previous Attempts</h2>
          <div className='text-sm flex items-center space-x-2'>
            <Pagination
              from={data?.from}
              to={data?.to}
              total={data?.total}
              prev={data?.prev_page ?? undefined}
              next={data?.next_page ?? undefined}
              currentPage={data?.current_page || 1}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className='bg-neutral-gray-50 border-none text-[14px] text-brandcolora'>
              <TableCell className='text-neutral-gray-800'>Learner</TableCell>
              <TableCell>Time spent</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className='[&>*:nth-child(odd)]:bg-neutral-gray-50'>
            {data.data.map((attempt, index) => (
              <TableRow
                key={index}
                className='border-none text-[14px] cursor-pointer hover:bg-muted text-brandcolora'
                onClick={() => handleViewResults(attempt._id)}
              >
                <TableCell className='underline text-neutral-gray-800'>
                  {formatDateTime(attempt.created_at)}
                </TableCell>
                <TableCell>
                  {
                    millisecondsToTimeString(
                      getSimulationUsedTime(attempt),
                      true
                    ).timeString
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    )
  )
}

export default PreviousAttempts
