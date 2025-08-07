import { ReactNode } from 'react'
import Alert from '../(shared)/components/alert/Alert'
import InitSocket from '../(shared)/components/helper/InitSocket'

function LearnerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <InitSocket>{children}</InitSocket>
      <Alert />
    </>
  )
}

export default LearnerLayout
