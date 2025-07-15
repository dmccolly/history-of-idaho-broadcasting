'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import dynamic from 'next/dynamic'
const Header = dynamic(() => import('@/components/ui/header'), { ssr: false })
const Footer = dynamic(() => import('@/components/ui/footer'), { ssr: false })

import "..\/globals.css";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {

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
      <Header />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
