export const metadata = {
  title: 'Broadcasting News & Social - Idaho Broadcasting Foundation',
  description: 'Stay informed with the latest broadcasting industry news, local station updates, and social developments affecting the broadcasting industry.',
}

import BroadcastingNewsFeed from '@/components/broadcasting-news-feed'

export default function NewsPage() {
  return (
    <>
      <BroadcastingNewsFeed />
    </>
  )
}

