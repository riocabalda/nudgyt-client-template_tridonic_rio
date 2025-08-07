import RequireAuth from '@/app/(shared)/components/helper/RequireAuth'
import MainContainer from '@/app/(shared)/components/MainContainer'
import { roles } from '@/app/(shared)/services/userService'
import RemainingTime from './components/RemainingTime'
import SimulationResults from './components/SimulationResults'
import './style.css'

function SimulationResultsPage() {
  return (
    <RequireAuth role={[roles.learner]}>
      <MainContainer
        headerMobile={<MainContainer.HeaderMobile title='Scenario Results' />}
        headerDesktop={
          <MainContainer.HeaderDesktop
            showBackBtn
            title='Scenario Results'
            slotEnd={<RemainingTime />}
          />
        }
        className='container p-0'
      >
        <SimulationResults />
      </MainContainer>
    </RequireAuth>
  )
}

export default SimulationResultsPage
