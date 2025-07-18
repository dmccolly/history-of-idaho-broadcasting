import MobileMenuClient from './mobile-menu-client'
import { getStoryblokApi } from '@/lib/storyblok'

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
  
  // Try to fetch navigation from Storyblok
  try {
    if (process.env.STORYBLOK_ACCESS_TOKEN) {
      const storyblokApi = getStoryblokApi()
      const { data } = await storyblokApi.get('cdn/stories/navigation', {
        version: 'draft',
      })
      
      // Extract navigation items and CTA from Storyblok data
      if (data && data.story && data.story.content) {
        navigationItems = data.story.content.menu_items || [];
        ctaText = data.story.content.cta_text || ctaText;
        ctaLink = data.story.content.cta_link || ctaLink;
      }
    }
  } catch (error) {
    console.log('Navigation not found in Storyblok, using fallback');
    // Keep using default values defined above
  }

  return (
    <MobileMenuClient 
      navigationItems={navigationItems}
      ctaText={ctaText}
      ctaLink={ctaLink}
    />
  )
}