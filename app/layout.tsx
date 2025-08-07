// RootLayout.tsx
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from './(shared)/components/ui/sonner'
import InitAuth from './(shared)/components/helper/InitAuth'
import './globals.css'
import Script from 'next/script'
import { get } from '@vercel/edge-config'
import { ReactNode } from 'react'
import MaintenancePage from './(shared)/components/MaintenancePage'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Tridonic AI Simulator',
  description: ''
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
}

async function fetchMaintenanceMode() {
  try {
    return (await get<boolean>('isInMaintenanceMode')) || false
  } catch (error) {
    console.error('Error fetching maintenance mode status:', error)
    return false
  }
}

export default async function RootLayout({
  children
}: {
  children: ReactNode
}) {
  const isMaintenance = await fetchMaintenanceMode()

  if (isMaintenance) return <MaintenancePage />

  return (
    <html lang='en'>
      <body className={`${poppins.variable} font-poppins`}>
        <InitAuth>{children}</InitAuth>
        <Toaster position='top-center' closeButton />
        <Script src='/scripts/e3dsCore.min.js' strategy='beforeInteractive' />
      </body>
    </html>
  )
}
