'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import { navItems } from '@/lib/navItems'

export default function HeaderClient() {
  const [top, setTop] = useState<boolean>(true)

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true)
  }

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])


  return (
    <header className={`fixed w-full z-30 transition duration-300 ease-in-out ${!top ? 'bg-white backdrop-blur-sm shadow-lg' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`${top ? 'text-white hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'} px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}