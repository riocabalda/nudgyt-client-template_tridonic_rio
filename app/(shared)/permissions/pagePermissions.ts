import { roles } from '../services/userService'

const commonPages: string[] = []

const pagePermissions = {
  [roles.superadmin]: [
    '/admin/dashboard',
    '/admin/users',
    '/admin/requests',
    '/admin/account',
    '/admin/scenarios',
    ...commonPages
  ],
  [roles.admin]: [
    '/admin/dashboard',
    '/admin/users',
    '/admin/requests',
    '/admin/account',
    '/admin/scenarios',
    ...commonPages
  ],
  [roles.trainer]: ['/trainer/dashboard', '/trainer/account', ...commonPages],
  [roles.learner]: [
    '/learner/dashboard',
    '/learner/account',
    '/learner/scenarios',
    ...commonPages
  ]
}

export const canView = (role: string, requiredPermission: string) =>
  pagePermissions[role].includes(requiredPermission)

export default pagePermissions
