'use client'

import React, { useEffect } from 'react'
import io from 'socket.io-client'
import useAlertStore from '../alert/useAlertStore'
import authTokenService from '../../services/authTokenService'
import serverConfig from '../../config/serverConfig'
import useUser from '../../hooks/useUser'
import useGetUserSimulations from '@/app/learner/simulations/[simulationId]/hooks/useGetUserSimulations'

function InitSocket({ children }: { children: React.ReactNode }) {
  const { showAlert } = useAlertStore()
  const { user } = useUser()
  const accessToken = authTokenService.getAccessToken()
  const { mutateSimulations } = useGetUserSimulations()

  useEffect(() => {
    if (!user?._id) return

    const socket = io(serverConfig.socketUrl, {
      reconnection: true,
      auth: {
        accessToken: `Bearer ${accessToken}`,
        payload: { userId: user._id }
      }
    })

    socket.on('notification', (data) => {
      const getMessageContent = (message: string) => {
        switch (message) {
          case 'REQUEST_EXTENSION_GRANTED':
            mutateSimulations()
            return (
              <p>
                <strong>Extension granted:</strong> 60 minutes added to your
                timer.
              </p>
            )
          case 'REQUEST_EXTENSION_DENIED':
            return (
              <p>
                <strong>Extension denied:</strong> Your request for extension
                was not granted.
              </p>
            )
          default:
            return null
        }
      }

      showAlert({
        message: getMessageContent(data.message),
        variant: data.type
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [user?._id, accessToken, showAlert])

  return children
}

export default InitSocket
