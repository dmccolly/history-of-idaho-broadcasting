'use client'

import { storyblokEditable } from '@/lib/storyblok'
import Image from 'next/image'
import { useState } from 'react'
import type { SbBlokData } from '@storyblok/react'
import { renderRichText } from '@storyblok/react'

export interface StationCardStoryblok extends SbBlokData {
  title: string
  content: any
  image?: {
    filename: string
    alt?: string
  }
  _uid: string
  component: 'station_card'
}

interface StationCardProps {
  blok: StationCardStoryblok
}

function richTextToPlainText(richText: any): string {
  if (!richText) return ''
  if (typeof richText === 'string') return richText
  if (richText.content) {
    return richText.content
      .map((item: any) => {
        if (item.type === 'paragraph' && item.content) {
          return item.content.map((t: any) => t.text || '').join('')
        }
        return ''
      })
      .join(' ')
  }
  return ''
}

function truncateToWords(text: string, maxWords: number = 100): string {
  const words = text.split(/\s+/)
  if (words.length <= maxWords) return text
  return words.slice(0, maxWords).join(' ') + '...'
}

export default function StationCard({ blok }: StationCardProps) {
  const [expanded, setExpanded] = useState(false)

  const plainText = richTextToPlainText(blok.content)
  const truncated = truncateToWords(plainText, 100)

  return (
    <div
      {...storyblokEditable(blok)}
      className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col"
    >
      {blok.image && (
        <Image
          src={blok.image.filename}
          alt={blok.image.alt || blok.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{blok.title}</h3>
      <div className="text-gray-700 mb-4 whitespace-pre-line">
        {expanded ? renderRichText(blok.content) : <p>{truncated}</p>}
      </div>
      {plainText.split(/\s+/).length > 100 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="self-start text-blue-600 hover:text-blue-800 font-medium"
        >
          {expanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  )
}
