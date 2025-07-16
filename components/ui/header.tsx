import Logo from './logo'
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
    console.error('Error fetching navigation from Storyblok:', error)
  }

  const renderFallbackNav = () => (
    <nav className="hidden md:flex md:grow">
      <ul className="flex grow justify-start flex-wrap items-center">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="font-medium text-slate-800 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )

  const hasMenu =
    navigationData && navigationData.content && navigationData.content.menu_items

  return (
    <header className={`absolute w-full z-30 ${mode !== 'light' && 'dark'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          {/* Desktop navigation */}
          {hasMenu ? (
            <>
              <StoryblokComponent blok={navigationData!.content} />
              <MobileMenu items={navigationData!.content.menu_items} />
            </>
          ) : (
            <>
              {console.warn('Navigation not found in Storyblok, using fallback.')}
              {renderFallbackNav()}
              <MobileMenu items={navItems.map((i) => ({ label: i.name, href: i.href }))} />
            </>
          )}

        </div>
      </div>
    </header>
  )
}

