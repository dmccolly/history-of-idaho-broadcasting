'use client'

import { getStoryblokApi, StoryblokComponent } from '@/lib/storyblok'

export default async function Footer() {
  let footerData = null

  try {
    if (process.env.STORYBLOK_ACCESS_TOKEN) {
      const storyblokApi = getStoryblokApi()
      const { data } = await storyblokApi.get('cdn/stories/footer', {
        version: 'draft',
      })
      footerData = data.story
    }
  } catch (error) {
    console.error('Footer not found in Storyblok, using fallback', error)
  }

  if (!footerData) {
    // Fallback static footer content if Storyblok data is not available
    return (
      <footer>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-sm text-gray-500">© Your Company. All rights reserved.</p>
        </div>
      </footer>
    )
  }

  return (
    <footer>
      <StoryblokComponent blok={footerData.content} />
    </footer>
  )
}
