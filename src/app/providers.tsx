"use client"

import { Toaster } from 'sonner'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position='bottom-center' />
      {children}
    </>
  )
}