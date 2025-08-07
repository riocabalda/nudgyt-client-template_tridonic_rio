import RequireAuth from '@/app/(shared)/components/helper/RequireAuth'
import MainContainer from '@/app/(shared)/components/MainContainer'
import { roles } from '@/app/(shared)/services/userService'
import SimulationResults from './components/SimulationResults'
import './style.css'

function SimulationResultsPage() {
  return (
    <RequireAuth role={[roles.superadmin, roles.admin]}>
      <MainContainer
        headerMobile={<MainContainer.HeaderMobile title='Scenario Results' />}
        headerDesktop={
          <MainContainer.HeaderDesktop showBackBtn title='Scenario Results' />
        }
        className='container p-0'
      >
        <SimulationResults />
      </MainContainer>
    </RequireAuth>
  )
}

export default SimulationResultsPage
