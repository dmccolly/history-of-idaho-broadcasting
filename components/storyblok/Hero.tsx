'use client'

import { storyblokEditable } from '@/lib/storyblok'
import { SbBlokData } from '@storyblok/react'
import Link from 'next/link'
import Image from 'next/image'

interface HeroStoryblok extends SbBlokData {
  headline: string
  subheadline?: string
  description?: string
  primary_button_text?: string
  primary_button_link?: {
    url: string
    target?: string
  }
  secondary_button_text?: string
  secondary_button_link?: {
    url: string
    target?: string
  }
  background_image?: {
    filename: string
    alt?: string
  }
  background_video?: {
    filename: string
  }
  layout_style?: 'default' | 'centered' | 'split'
  _uid: string
  component: 'hero'
}

interface HeroProps {
  blok: HeroStoryblok
}

export default function Hero({ blok }: HeroProps) {
  const layoutClass = {
    default: 'text-left',
    centered: 'text-center',
    split: 'lg:text-left text-center'
  }[blok.layout_style || 'default']

  return (
    <section 
      {...storyblokEditable(blok)} 
      className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black py-20 lg:py-32 overflow-hidden"
    >
      {/* Background overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800/30 to-gray-900/30"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${blok.layout_style === 'centered' ? 'lg:grid-cols-1 text-center' : ''}`}>
          {/* Content Column */}
          <div className={`${blok.layout_style === 'centered' ? 'mx-auto max-w-4xl' : ''}`}>
            <div className={layoutClass}>
              {/* Subheadline */}
              {blok.subheadline && (
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-4 drop-shadow-sm">
                  {blok.subheadline}
                </p>
              )}

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair-display text-white mb-6 leading-tight drop-shadow-lg">
                {blok.headline}
              </h1>

              {/* Description */}
              {blok.description && (
                <p className="text-xl text-gray-200 mb-8 leading-relaxed drop-shadow-sm">
                  {blok.description}
                </p>
              )}

              {/* Buttons */}
              {(blok.primary_button_text || blok.secondary_button_text) && (
                <div className="flex flex-col sm:flex-row gap-4">
                  {blok.primary_button_text && blok.primary_button_link && (
                    <Link
                      href={blok.primary_button_link.url}
                      target={blok.primary_button_link.target || '_self'}
                      className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      {blok.primary_button_text}
                    </Link>
                  )}

                  {blok.secondary_button_text && blok.secondary_button_link && (
                    <Link
                      href={blok.secondary_button_link.url}
                      target={blok.secondary_button_link.target || '_self'}
                      className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-base font-medium rounded-lg text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      {blok.secondary_button_text}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Media Column - Video or Image with offset style line */}
          {(blok.background_video || blok.background_image) && blok.layout_style !== 'centered' && (
            <div className="relative">
              {/* Offset decorative line */}
              <div className="absolute -top-8 -left-8 w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
              
              <div className="relative">
                {blok.background_video ? (
                  <div className="relative aspect-video bg-black overflow-hidden rounded-none shadow-2xl">
                    <video
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover"
                      controls
                    >
                      <source src={blok.background_video.filename} type="video/mp4" />
                    </video>
                  </div>
                ) : blok.background_image ? (
                  <div className="relative aspect-video bg-gray-900 overflow-hidden rounded-none shadow-2xl">
                    <Image
                      src={blok.background_image.filename}
                      alt={blok.background_image.alt || ''}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}