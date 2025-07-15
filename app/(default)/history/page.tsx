import { getStoryblokApi, StoryblokComponent } from '@/lib/storyblok'
import '../../../lib/storyblok'
import HistorySection from '@/components/storyblok/HistorySection'
import { fallbackHistorySection } from '@/lib/data/history-fallback'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Broadcast History - Idaho Broadcasting Foundation',
  description: 'Discover the history of Idaho\'s radio stations',
}

export default async function HistoryPage() {
  if (!process.env.STORYBLOK_ACCESS_TOKEN) {
    return (
      <div className="min-h-screen bg-white">
        <HistorySection blok={fallbackHistorySection} />
      </div>
    )
  }

  try {
    const storyblokApi = getStoryblokApi()
    const { data } = await storyblokApi.get('cdn/stories/history', { version: 'draft' })
    const story = data?.story
    if (!story) {
      return (
        <div className="min-h-screen bg-white">
          <HistorySection blok={fallbackHistorySection} />
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
      <div className="min-h-screen bg-white">
        <HistorySection blok={fallbackHistorySection} />
      </div>
    )
  }
}
