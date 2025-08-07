'use client'

import React from 'react'
import { Card } from '@/app/(shared)/components/ui/card'
import { Lightbulb, MessagesSquare, UserCircle2 } from 'lucide-react'
import { cn } from '@/app/(shared)/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import TipsModal from './TipsModal'

const navItems = [
  {
    name: 'Transcript',
    param: 'transcript',
    icon: <MessagesSquare size={24} strokeWidth={1.5} />
  },
  {
    name: 'Profile',
    param: 'profile',
    icon: <UserCircle2 size={24} strokeWidth={1.5} />
  },
  {
    name: 'Tips',
    param: 'tips',
    icon: <Lightbulb size={24} strokeWidth={1.5} />
  }
]

function NavigationPanel() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = new URLSearchParams(searchParams.toString())

  const navParam = params.get('panel')

  const handleSelectedPanel = (value: string) => {
    params.set('panel', value)
    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.push(newUrl)
  }

  return (
    <Card className='flex items-center justify-around rounded-none lg:rounded-[9px] border p-4 '>
      {navItems.map((item) =>
        item.name === 'Tips' ? (
          <TipsModal key={item.name} />
        ) : (
          <button
            key={item.name}
            className={cn(
              'flex flex-col items-center gap-[10px] text-muted-foreground min-w-[72px]',
              navParam === item.param && 'text-brandcolora'
            )}
            onClick={() => handleSelectedPanel(item.param)}
          >
            {item.icon}
            <span
              className={cn(
                'text-[11px] font-medium',
                navParam === item.param && 'font-semibold'
              )}
            >
              {item.name}
            </span>
          </button>
        )
      )}
    </Card>
  )
}

export default NavigationPanel
