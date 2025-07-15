import { getStoryblokApi, StoryblokComponent } from '@/lib/storyblok'
import '../../../lib/storyblok'

export const metadata = {
  title: 'Broadcast History - Idaho Broadcasting Foundation',
  description: 'Discover the history of Idaho\'s radio stations',
}

export default async function HistoryPage() {
  if (!process.env.STORYBLOK_ACCESS_TOKEN) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <p>Storyblok access token not configured.</p>
      </div>
    )
  }

  try {
    const storyblokApi = getStoryblokApi()
    const { data } = await storyblokApi.get('cdn/stories/history', { version: 'draft' })
    const story = data?.story
    if (!story) {
      return (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <p>History page not found.</p>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-white">
        <StoryblokComponent blok={story.content} />
      </div>
    )
  } catch (error) {
    console.error('Error loading history page:', error)
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <p>Error loading history content.</p>
      </div>
    )
  }
}
