'use client'

import React from 'react'
import SignInForm from './components/SignInForm'
import { Card } from '../(shared)/components/ui/card'
import RedirectAuth from '../(shared)/components/helper/RedirectAuth'
import Image from 'next/image'
import Link from 'next/link'

function SignInPage() {
  return (
    <RedirectAuth>
      <main className='flex flex-col items-center lg:justify-center min-h-svh'>
        <Card className='flex flex-col min-h-[100svh] lg:min-h-max lg:h-auto bg-transparent bg-white w-full max-w-[560px] rounded-none lg:rounded-[10px] px-4 py-[60px] lg:px-[80px] shadow-none border-none lg:border lg:shadow-sm'>
          <Link href='/' className='mb-[60px]'>
            <Image
              src='/images/logo.png'
              alt='Tridonic logo'
              height={80}
              width={400}
              className='hidden lg:block h-12 object-contain mx-auto'
            />
            <Image
              src='/images/logo.png'
              alt='Tridonic logo'
              height={146}
              width={185}
              className='lg:hidden h-[146px] object-contain mx-auto'
            />
          </Link>
          <SignInForm />
        </Card>
      </main>
    </RedirectAuth>
  )
}

export default SignInPage
