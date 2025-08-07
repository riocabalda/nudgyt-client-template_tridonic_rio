import { Avatar, AvatarFallback } from '@/app/(shared)/components/ui/avatar'
import { Card } from '@/app/(shared)/components/ui/card'
import UserRoleBadge from '@/app/(shared)/components/UserRoleBadge'
import { generateAvatarInitials } from '@/app/(shared)/utils'
import useGetSimulationResults from '../../hooks/useGetSimulationResults'

function LearnerCard() {
  const { results } = useGetSimulationResults()

  const learner = results?.learner

  if (learner === undefined) {
    return null
  }

  const fullName = learner.fullname
  const userType = learner.user_type

  return (
    <Card className='flex items-center gap-4 p-4'>
      <Avatar className='size-11 lg:size-12'>
        <AvatarFallback className='text-white bg-brandcolora text-lg lg:text-xl'>
          {generateAvatarInitials(fullName)}
        </AvatarFallback>
      </Avatar>

      <div className='grid gap-2'>
        <h3 className='font-medium'>{fullName}</h3>

        <UserRoleBadge role={userType} />
      </div>
    </Card>
  )
}

export default LearnerCard
