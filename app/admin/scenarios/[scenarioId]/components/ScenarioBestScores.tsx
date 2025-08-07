import { Card } from '@/app/(shared)/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from '@/app/(shared)/components/ui/table'
import scenarioService from '@/app/(shared)/services/admin/scenarioService'
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'

function ScenarioBestScores() {
  const { scenarioId } = useParams()
  const router = useRouter()
  const { data } = useSWR(`/admin/scenarios/${scenarioId}/learners`, () =>
    scenarioService
      .getScenarioLearners(String(scenarioId))
      .then((res) => res.data)
  )

  const handleViewResults = (id: string) => {
    router.push(`/admin/simulations/${id}/results`)
  }

  return (
    data?.data.length !== 0 && (
      <Card className='px-2 py-6'>
        <div className='relative'>
          <div className='max-h-[400px] overflow-auto'>
            <Table>
              <TableHeader>
                <TableRow className='hover:bg-transparent border-none text-[16px] font-semibold sticky top-0 bg-background'>
                  <TableCell className='py-2'>Name</TableCell>
                  <TableCell className='py-2'>Time</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((entry, index) => (
                  <TableRow
                    key={index}
                    className='border-none text-[16px] cursor-pointer hover:bg-muted'
                    onClick={() => handleViewResults(entry.id)}
                  >
                    <TableCell className='py-2'>
                      <p className='text-neutral-gray-600'>{entry.fullname}</p>
                    </TableCell>
                    <TableCell className='py-2'>
                      <p className='text-neutral-gray-600'>
                        {entry.time_spent}
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    )
  )
}

export default ScenarioBestScores
