import Link from 'next/link'
import Logo from './logo'
import Dropdown from '@/components/utils/dropdown'
import MobileMenu from './mobile-menu'
import { getStoryblokApi, StoryblokComponent } from '@/lib/storyblok'
import { navItems } from '@/lib/navItems'

interface NavigationData {
  content: {
    component: string
    menu_items: any[]
    cta_text?: string
    cta_link?: string
  }
}

export default async function Header({ mode = 'dark' }: {
  mode?: string
}) {
  let navigationData: NavigationData | null = null
  
  // Try to fetch navigation from Storyblok
  try {
    if (process.env.STORYBLOK_ACCESS_TOKEN) {
      const storyblokApi = getStoryblokApi()
      const { data } = await storyblokApi.get('cdn/stories/navigation', {
        version: 'draft',
      })
      navigationData = data.story
    }
  } catch (error) {
    console.warn('Navigation not found in Storyblok, using fallback')
  }

  return (
    <header className={`absolute w-full z-30 ${mode !== 'light' && 'dark'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          {/* Desktop navigation */}
          {navigationData ? (
            <StoryblokComponent blok={navigationData.content} />
          ) : (
            // Fallback navigation when Storyblok is not configured
            <nav className="hidden md:flex md:grow">
              <ul className="flex grow justify-start flex-wrap items-center">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-medium text-slate-800 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <Dropdown title="MORE">
                  <li>
                    <Link href="/about" className="font-medium text-sm text-gray-600 hover:text-blue-600 flex py-2 px-5 leading-tight">About/Contact</Link>
                  </li>
                  <li>
                    <Link href="/support" className="font-medium text-sm text-gray-600 hover:text-blue-600 flex py-2 px-5 leading-tight">Support</Link>
                  </li>
                </Dropdown>
              </ul>
              <ul className="flex grow justify-end flex-wrap items-center">
                <li>
                  <Link href="/events" className="font-medium text-blue-600 dark:text-slate-300 dark:hover:text-white px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out group">
                    Join Events <span className="tracking-normal text-blue-600 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </Link>
                </li>
              </ul>
            </nav>
          )}

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}

