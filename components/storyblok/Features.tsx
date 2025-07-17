'use client'

import { storyblokEditable, StoryblokComponent } from '@/lib/storyblok'
import { SbBlokData } from '@storyblok/react'

interface FeaturesStoryblok {
  title?: string
  subtitle?: string
  features_list?: SbBlokData[]
  layout?: 'grid' | 'list' | 'cards'
  _uid: string
  component: 'features
  [key: string]: any
}

interface FeaturesProps {
  blok: FeaturesStoryblok
}

export default function Features({ blok }: FeaturesProps) {
  const layoutClass = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    list: 'space-y-8',
    cards: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
  }[blok.layout || 'grid']

  return (
    <section {...storyblokEditable(blok)} className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        {(blok.title || blok.subtitle) && (
          <div className="text-center mb-12">
            {blok.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {blok.title}
              </h2>
            )}
            {blok.subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {blok.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Features List */}
        {blok.features_list && blok.features_list.length > 0 && (
          <div className={layoutClass}>
            {blok.features_list.map((nestedBlok) => (
              <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
          </div>
        )}

        {/* Fallback if no features */}
        {(!blok.features_list || blok.features_list.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Add feature items in Storyblok to display them here.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
