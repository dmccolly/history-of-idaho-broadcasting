'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from './logo'
import { getStoryblokApi } from '@/lib/storyblok'
import { STORYBLOK_TOKEN } from '@/lib/storyblok-config'
import { Transition } from '@headlessui/react'

export default function HeaderClient() {
  const [top, setTop] = useState<boolean>(true)
  const [navigation, setNavigation] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

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
        if (!storyblokApi) {
          console.error('Storyblok API not initialized');
          setLoading(false);
          return;
        }

        console.log('Fetching navigation with token:', STORYBLOK_TOKEN);
        const { data } = await storyblokApi.get('cdn/stories/navigation', {
          version: 'draft',
          token: STORYBLOK_TOKEN, // Use hardcoded token
        })
        
        if (data && data.story && data.story.content) {
          console.log('Navigation data fetched successfully:', data.story.content);
          setNavigation(data.story.content)
        } else {
          console.error('Navigation data structure unexpected:', data);
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
    { name: 'HOME', href: '/' },
    { name: 'EVENTS', href: '/events' },
    { name: 'THE BACK CORNER', href: '/back-corner' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'HISTORY', href: '/history' },
    { name: 'STATIONS', href: '/stations' },
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
                    className="font-medium text-white hover:text-blue-300 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                    target={item.target}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              className={`group inline-flex w-8 h-8 text-white hover:text-blue-300 text-center items-center justify-center transition`}
              aria-controls="mobile-nav"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg className="w-4 h-4 fill-current pointer-events-none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <rect 
                  className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] -translate-y-[5px] group-aria-expanded:rotate-[315deg] group-aria-expanded:translate-y-0"
                  y="7" 
                  width="16" 
                  height="2" 
                  rx="1"
                />
                <rect 
                  className="origin-center group-aria-expanded:rotate-45 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]"
                  y="7" 
                  width="16" 
                  height="2" 
                  rx="1"
                />
                <rect 
                  className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] translate-y-[5px] group-aria-expanded:rotate-[135deg] group-aria-expanded:translate-y-0"
                  y="7" 
                  width="16" 
                  height="2" 
                  rx="1"
                />
              </svg>
            </button>

            {/* Mobile Navigation */}
            <Transition
              show={mobileNavOpen}
              as="nav"
              id="mobile-nav"
              className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white transform transition ease-out duration-200 data-enter:data-closed:-translate-y-2 data-closed:opacity-0"
            >        
              <ul className="px-5 py-2">
                {navItems.map((item: any, index: number) => (
                  <li key={index}>
                    <Link 
                      href={item.href} 
                      className="flex font-medium text-slate-800 hover:text-blue-600 py-2" 
                      onClick={() => setMobileNavOpen(false)}
                      target={item.target}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                
                {/* CTA Link */}
                {navigation?.cta_text && navigation?.cta_link && (
                  <li>
                    <Link 
                      href={navigation.cta_link} 
                      className="flex font-medium text-blue-600 py-2 group" 
                      onClick={() => setMobileNavOpen(false)}
                    >
                      {navigation.cta_text} <span className="tracking-normal text-blue-600 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                    </Link>
                  </li>
                )}
              </ul>
            </Transition>
          </div>

        </div>
      </div>
    </header>
  )
}