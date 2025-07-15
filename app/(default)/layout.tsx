'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import HeaderClient from '@/components/ui/header-client'
import FooterClient from '@/components/ui/footer-client'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <HeaderClient />
      <main className="grow">{children}</main>
      <FooterClient />
    </div>
  )
}
