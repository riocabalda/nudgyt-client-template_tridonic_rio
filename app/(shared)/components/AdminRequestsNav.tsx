import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'
import { Badge } from './ui/badge'
import authTokenService from '../services/authTokenService'
import useGetRequests from '@/app/admin/requests/hooks/useGetRequests'
import { io } from 'socket.io-client'
import serverConfig from '../config/serverConfig'
import requestService from '../services/admin/requestService'
import { cn } from '../utils'
import { Loader } from 'lucide-react'
import { Button } from './ui/button'
import { useSearchParams } from 'next/navigation'

type AdminRequestsNavProps = {
  label: string
  pathname: string
  icon: ReactNode
  isActive: boolean
}

function AdminRequestsNav({
  label,
  pathname,
  icon,
  isActive
}: AdminRequestsNavProps) {
  const accessToken = authTokenService.getAccessToken()
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const {
    data,
    isLoading,
    mutate: mutateRequestsCount
  } = useGetRequests('is_read=false')
  const { mutate: mutateTable } = useGetRequests(searchParams.toString())
  const [tooltipOpen, setTooltipOpen] = useState(false)

  useEffect(() => {
    const socket = io(serverConfig.socketUrl, {
      reconnection: true,
      auth: {
        accessToken: `Bearer ${accessToken}`
      }
    })

    socket.on('new_request', () => {
      mutateRequestsCount()
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleMarkRead = async () => {
    setLoading(true)
    try {
      await requestService.markAllAsRead()
      mutateRequestsCount()
      mutateTable()
      setTooltipOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Link
      key={pathname}
      href={pathname}
      className={cn(
        'p-4 flex items-center gap-4 lg:gap-[32px] text-foreground-800 rounded-[8px] font-medium hover:bg-white h-[48px]',
        isActive && 'bg-white font-bold'
      )}
    >
      {icon} {label}{' '}
      {data?.data ? (
        <TooltipProvider delayDuration={0}>
          <Tooltip
            open={tooltipOpen}
            onOpenChange={(open) => setTooltipOpen(open)}
          >
            <TooltipTrigger>
              {data.data.length > 0 && (
                <Badge>
                  {isLoading ? (
                    <Loader className='w-4 h-4 animate-spin' />
                  ) : (
                    data.data.length
                  )}
                </Badge>
              )}
            </TooltipTrigger>
            <TooltipContent className='mb-1' side='bottom'>
              <TooltipArrow height={12} width={16} className='' />
              <div className='ml-4 cursor-default'>
                <p className='font-normal'>
                  You have <strong>{data.data.length}</strong> new extension{' '}
                  {data.data.length === 1 ? 'request' : 'requests'}.{' '}
                  <Button
                    variant='link'
                    disabled={loading}
                    size='sm'
                    onClick={handleMarkRead}
                    className='px-0 hover:text-blue-600 focus:text-blue-600 transition-colors -translate-x-5'
                  >
                    Reload Page
                  </Button>
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        ''
      )}
    </Link>
  )
}

export default AdminRequestsNav
