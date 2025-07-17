'use client'

import { storyblokEditable } from '@/lib/storyblok'
// import { render } from '@storyblok/richtext'
import Image from 'next/image'
[key: string]: any

interface ContentSectionStoryblok {
  title?: string
  content?: any // Richtext content
  layout?: 'single_column' | 'two_column' | 'three_column'
  background_color?: 'white' | 'gray' | 'dark'
  image?: {
    filename: string
    alt?: string
  }
  image_position?: 'left' | 'right' | 'top' | 'bottom'
  _uid: string
component: 'content_section'
  [key: string]: any
}

interface ContentSectionProps {
  blok: ContentSectionStoryblok
}

export default function ContentSection({ blok }: ContentSectionProps) {
  const backgroundClass = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900 text-white'
  }[blok.background_color || 'white']

  const layoutClass = {
    single_column: 'max-w-4xl mx-auto',
    two_column: 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
    three_column: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
  }[blok.layout || 'single_column']

  const renderContent = () => {
    if (!blok.content) return null
    
    try {
      // Simple fallback for rich text content
      if (typeof blok.content === 'string') {
        return (
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blok.content }} />
        )
      }
      
      // If content is an object, try to extract text
      if (blok.content && blok.content.content) {
        const textContent = blok.content.content.map((item: any) => {
          if (item.type === 'paragraph' && item.content) {
            return item.content.map((text: any) => text.text || '').join('')
          }
          return ''
        }).join('\n')
        
        return (
          <div className="prose prose-lg max-w-none">
            <p>{textContent}</p>
          </div>
        )
      }
      
      return (
        <div className="prose prose-lg max-w-none">
          <p>{JSON.stringify(blok.content)}</p>
        </div>
      )
    } catch (error) {
      console.error('Error rendering richtext:', error)
      return (
        <div className="text-gray-600">
          Content could not be rendered. Please check the richtext format.
        </div>
      )
    }
  }

  const ContentBlock = () => (
    <div className="content-block">
      {blok.title && (
        <h2 className="text-3xl font-bold mb-6">
          {blok.title}
        </h2>
      )}
      {renderContent()}
    </div>
  )

  const ImageBlock = () => (
    blok.image && (
      <div className="image-block">
        <Image
          src={blok.image.filename}
          alt={blok.image.alt || blok.title || ''}
          width={600}
          height={400}
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </div>
    )
  )

  return (
    <section 
      {...storyblokEditable(blok)} 
      className={`py-16 ${backgroundClass}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {blok.layout === 'single_column' ? (
          <div className={layoutClass}>
            {blok.image && blok.image_position === 'top' && <ImageBlock />}
            <ContentBlock />
            {blok.image && blok.image_position === 'bottom' && <ImageBlock />}
          </div>
        ) : blok.layout === 'two_column' ? (
          <div className={layoutClass}>
            {blok.image_position === 'left' ? (
              <>
                <ImageBlock />
                <ContentBlock />
              </>
            ) : (
              <>
                <ContentBlock />
                <ImageBlock />
              </>
            )}
          </div>
        ) : (
          // Three column layout
          <div className={layoutClass}>
            <div className="col-span-full mb-8">
              {blok.title && (
                <h2 className="text-3xl font-bold text-center">
                  {blok.title}
                </h2>
              )}
            </div>
            <div className="col-span-full">
              {renderContent()}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
