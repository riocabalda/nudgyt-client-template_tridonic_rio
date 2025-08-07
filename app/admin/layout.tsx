import { ReactNode } from 'react'
import Alert from '../(shared)/components/alert/Alert'

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Alert />
    </>
  )
}

export default AdminLayout
