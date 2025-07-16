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
    },
    {
      _uid: 'kspd-card',
      component: 'station_card',
      title: 'KSPD 790 AM',
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'KSPD 790 AM represents a remarkable journey through multiple format transformations, ultimately finding its calling as "Boise\'s Solid Talk" under the stewardship of Inspirational Family Radio since 1982. Licensed to Boise and broadcasting with 1,000 watts during the day and 61 watts at night to protect other stations on the 790 frequency, this station has evolved from its origins as KEST in 1961 through progressive rock as "KSPD" (a clever play on "spud," celebrating Idaho\'s potato heritage) in the 1970s, to an all-news format in the mid-1970s and 1980s, before settling into its current identity as a Christian talk and teaching station. Operating from studios on South Weideman Avenue and supplemented since 2017 by FM translator K233DE at 94.5 MHz, KSPD serves the Boise metropolitan area with a unique brokered programming model that combines nationally recognized Christian leaders like Chuck Swindoll, Joyce Meyer, James Dobson, and David Jeremiah with secular conservative voices including Dave Ramsey, Charlie Kirk, and Eric Metaxas. Under the ownership of the Schafer family through Inspirational Family Radio\u2014a network that has grown to include multiple Idaho stations\u2014KSPD demonstrates how specialized programming can successfully serve niche audiences while maintaining community relevance and financial viability in an increasingly competitive media landscape.'
              }
            ]
          }
        ]
      }
    }
  ]
} as const
