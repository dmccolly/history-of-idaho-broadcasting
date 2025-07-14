'use client'

import { storyblokEditable } from '@/lib/storyblok'
import Link from 'next/link'
import Image from 'next/image'

interface FeatureItemStoryblok {
  title: string
  description?: string
  icon?: {
    filename: string
    alt?: string
  }
  link?: {
    url: string
    target?: string
  }
  _uid: string
  component: 'feature_item'
}

interface FeatureItemProps {
  blok: FeatureItemStoryblok
}

export default function FeatureItem({ blok }: FeatureItemProps) {
  const content = (
    <div {...storyblokEditable(blok)} className="feature-item">
      {/* Icon */}
      {blok.icon && (
        <div className="mb-4">
          <Image
            src={blok.icon.filename}
            alt={blok.icon.alt || blok.title}
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
          />
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {blok.title}
      </h3>

      {/* Description */}
      {blok.description && (
        <p className="text-gray-600 leading-relaxed">
          {blok.description}
        </p>
      )}
    </div>
  )

  // If there's a link, wrap in Link component
  if (blok.link && blok.link.url) {
    return (
      <Link
        href={blok.link.url}
        target={blok.link.target || '_self'}
        className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
      >
        <div className="group-hover:text-blue-600 transition-colors duration-200">
          {content}
        </div>
      </Link>
    )
  }

  // Otherwise, just return the content
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      {content}
    </div>
  )
}