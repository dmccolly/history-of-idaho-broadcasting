import { storyblokEditable, renderRichText } from '@storyblok/react/rsc'
import Image from 'next/image'

interface BlogPostProps {
  blok: {
    title: string
    content: any
    featured_image?: {
      filename: string
      alt: string
    }
    excerpt?: string
    author?: string
    published_date?: string
    tags?: string[]
    _uid: string
  }
}

export default function BlogPost({ blok }: BlogPostProps) {
  return (
    <article {...storyblokEditable(blok)} className="max-w-4xl mx-auto px-4 py-8">
      {/* Featured Image */}
      {blok.featured_image && (
        <div className="mb-8">
          <Image
            src={blok.featured_image.filename}
            alt={blok.featured_image.alt || blok.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {blok.title}
      </h1>

      {/* Meta Information */}
      <div className="flex items-center text-gray-600 mb-8 space-x-4">
        {blok.author && (
          <span>By {blok.author}</span>
        )}
        {blok.published_date && (
          <span>{new Date(blok.published_date).toLocaleDateString()}</span>
        )}
      </div>

      {/* Excerpt */}
      {blok.excerpt && (
        <div className="text-xl text-gray-700 mb-8 font-medium">
          {blok.excerpt}
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
              {renderRichText(blok.content)}
            </div>

      {/* Tags */}
      {blok.tags && blok.tags.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {blok.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}