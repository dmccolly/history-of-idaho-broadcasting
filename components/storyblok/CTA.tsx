'use client'
[key: string]: any

import { storyblokEditable } from '@/lib/storyblok'
import Link from 'next/link'

interface CTAStoryblok {
  title: string
  description?: string
  button_text?: string
  button_link?: {
    url: string
    target?: string
  }
  background_color?: 'primary' | 'secondary' | 'dark'
  layout?: 'centered' | 'split'
  _uid: string
  component: 'cta'
  [key: string]: any
}

interface CTAProps {
  blok: CTAStoryblok
}

export default function CTA({ blok }: CTAProps) {
  const backgroundClass = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-100 text-gray-900',
    dark: 'bg-gray-900 text-white'
  }[blok.background_color || 'primary']

  const buttonClass = {
    primary: 'bg-white text-blue-600 hover:bg-gray-100',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700',
    dark: 'bg-white text-gray-900 hover:bg-gray-100'
  }[blok.background_color || 'primary']

  const layoutClass = blok.layout === 'split' 
    ? 'flex flex-col lg:flex-row lg:items-center lg:justify-between'
    : 'text-center'

  return (
    <section {...storyblokEditable(blok)} className={`py-16 ${backgroundClass}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={layoutClass}>
          {/* Content */}
          <div className={blok.layout === 'split' ? 'lg:flex-1 lg:pr-8' : ''}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {blok.title}
            </h2>
            {blok.description && (
              <p className="text-lg opacity-90 mb-8 lg:mb-0 max-w-3xl mx-auto">
                {blok.description}
              </p>
            )}
          </div>

          {/* Button */}
          {blok.button_text && blok.button_link && (
            <div className={blok.layout === 'split' ? 'lg:flex-shrink-0' : 'mt-8'}>
              <Link
                href={blok.button_link.url}
                target={blok.button_link.target || '_self'}
                className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md transition-colors duration-200 ${buttonClass}`}
              >
                {blok.button_text}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
