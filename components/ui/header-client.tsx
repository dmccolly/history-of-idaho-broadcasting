'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from './logo'
import MobileMenu from './mobile-menu'
import { getStoryblokApi } from '@/lib/storyblok'

export default function HeaderClient() {
  const [top, setTop] = useState<boolean>(true)
  const [navigation, setNavigation] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true)
  }

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  // Fetch navigation data from Storyblok
  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const storyblokApi = getStoryblokApi()
        const { data } = await storyblokApi.get('cdn/stories/navigation', {
          version: 'published',
        })
        
        if (data && data.story && data.story.content) {
          setNavigation(data.story.content)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching navigation:', error)
        setLoading(false)
      }
    }

    fetchNavigation()
  }, [])

  // Default navigation items (fallback)
  const defaultNavItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'News', href: '/news' },
    { name: 'Stations', href: '/stations' },
    { name: 'Back Corner', href: '/back-corner' },
    { name: 'Videos', href: '/video' },
  ]

  // Use Storyblok navigation if available, otherwise use default
  const navItems = navigation?.menu_items?.length > 0
    ? navigation.menu_items.map((item: any) => ({
        name: item.label,
        href: item.href || '/',
        target: item.target || '_self',
      }))
    : defaultNavItems

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
              {navItems.map((item: any, index: number) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="font-medium text-slate-900 hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                    target={item.target}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <MobileMenu navItems={navItems} />

        </div>
      </div>
    </header>
  )
}