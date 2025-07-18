import MobileMenuClient from './mobile-menu-client'
import { getStoryblokApi } from '@/lib/storyblok'
import { STORYBLOK_TOKEN } from '@/lib/storyblok-config'

interface NavigationData {
  content: {
    component: string
    menu_items: any[]
    cta_text?: string
    cta_link?: string
  }
}

export default async function MobileMenu() {
  let navigationItems = [];
  let ctaText = "Join Events";
  let ctaLink = "/events";
  
  // Try to fetch navigation from Storyblok using hardcoded token
  try {
    const storyblokApi = getStoryblokApi()
    if (storyblokApi) {
      try {
        const { data } = await storyblokApi.get('cdn/stories/navigation', {
          version: 'draft',
          token: STORYBLOK_TOKEN, // Use hardcoded token directly
        })
        
        // Extract navigation items and CTA from Storyblok data
        if (data && data.story && data.story.content) {
          navigationItems = data.story.content.menu_items || [];
          ctaText = data.story.content.cta_text || ctaText;
          ctaLink = data.story.content.cta_link || ctaLink;
          console.log('Mobile navigation data fetched successfully');
        }
      } catch (error) {
        console.log('Error fetching navigation from Storyblok:', error)
      }
    } else {
      console.log('Storyblok API not initialized')
    }
  } catch (error) {
    console.log('Navigation not found in Storyblok, using fallback');
    // Keep using default values defined above
  }

  // If no navigation items were found, use fallback
  if (navigationItems.length === 0) {
    navigationItems = [
      { _uid: 'home', component: 'navigation_item', label: 'HOME', href: '/' },
      { _uid: 'events', component: 'navigation_item', label: 'EVENTS', href: '/events' },
      { _uid: 'back-corner', component: 'navigation_item', label: 'THE BACK CORNER', href: '/back-corner' },
      { _uid: 'gallery', component: 'navigation_item', label: 'GALLERY', href: '/gallery' },
      { _uid: 'history', component: 'navigation_item', label: 'HISTORY', href: '/history' },
      { _uid: 'stations', component: 'navigation_item', label: 'STATIONS', href: '/stations' }
    ];
  }

  return (
    <MobileMenuClient 
      navigationItems={navigationItems}
      ctaText={ctaText}
      ctaLink={ctaLink}
    />
  )
}