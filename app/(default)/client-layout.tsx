'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const HeaderClient = dynamic(() => import('@/components/ui/header-client'), { ssr: false })
const FooterClient = dynamic(() => import('@/components/ui/footer-client'), { ssr: false })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <HeaderClient />
      {children}
      <FooterClient />
    </div>
  )
}