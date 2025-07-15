'use client'

import { storyblokEditable, StoryblokComponent } from '@/lib/storyblok'
import type { SbBlokData } from '@storyblok/react'
import { renderRichText } from '@storyblok/react'

export interface HistorySectionStoryblok extends SbBlokData {
  content: any
  station_cards: SbBlokData[]
  _uid: string
  component: 'history_section'
}

interface HistorySectionProps {
  blok: HistorySectionStoryblok
}

export default function HistorySection({ blok }: HistorySectionProps) {
  return (
    <section {...storyblokEditable(blok)} className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 prose max-w-none">
            {renderRichText(blok.content)}
          </div>
          <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
            {blok.station_cards?.map((card) => (
              <StoryblokComponent blok={card} key={card._uid} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
