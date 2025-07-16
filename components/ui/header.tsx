import Logo from './logo'
import MobileMenu from './mobile-menu'
import { getStoryblokApi, StoryblokComponent } from '@/lib/storyblok'

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

  return (
    <header className={`absolute w-full z-30 ${mode !== 'light' && 'dark'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Logo />
          </div>

          {/* Desktop navigation */}
          {navigationData && <StoryblokComponent blok={navigationData.content} />}

          {navigationData && <MobileMenu items={navigationData.content.menu_items} />}

        </div>
      </div>
    </header>
  )
}

