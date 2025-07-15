import type { HistorySectionStoryblok } from '@/components/storyblok/HistorySection'

export const fallbackHistorySection: HistorySectionStoryblok = {
  _uid: 'history-fallback',
  component: 'history_section',
  content: {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Explore the origins of Idaho radio through these station profiles.'
          }
        ]
      }
    ]
  },
  station_cards: [
    {
      _uid: 'krvb-card',
      component: 'station_card',
      title: 'KRVB - The River 94.9 FM',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'KRVB began broadcasting in Boise in the early 1990s as a modern rock station known as The River. Throughout its early years, the station carved out a loyal following thanks to a mix of alternative hits, community-driven promotions, and local DJ personalities. In the mid-2000s, it shifted toward an adult-leaning playlist while keeping its distinct River branding. The station was a pioneer in sponsoring local concerts and charity events, helping nurture Idaho\u2019s live music scene. KRVB\u2019s history reflects the broader evolution of FM radio, from its experimentations with emerging genres to its embrace of digital streaming. Today the River continues to broadcast a curated mix of rock favorites alongside local news and events.'
              }
            ]
          }
        ]
      }
    }
  ]
} as const
