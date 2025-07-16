'use client'

import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'

interface MenuItem {
  label: string
  href: string
  target?: string
}

const navItems: MenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Stations', href: '/stations' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'News', href: '/news' },
  { label: 'Events', href: '/events' },
  { label: 'Back Corner', href: '/back-corner' },
]

export default function HeaderClient() {
  return (
    <header className="fixed w-full z-30 bg-white backdrop-blur-sm shadow-lg">
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
                    className="text-slate-700 hover:text-slate-900 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <MobileMenu items={navItems} />

        </div>
      </div>
    </header>
  )
}