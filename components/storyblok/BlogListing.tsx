'use client'

import { storyblokEditable } from '@/lib/storyblok'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPost {
  uuid: string
  slug: string
  content: {
    title: string
    excerpt?: string
    featured_image?: {
      filename: string
      alt: string
    }
    author?: string
    published_date?: string
    tags?: string[]
  }
}

interface BlogListingProps {
  blok: {
    title?: string
    description?: string
    _uid: string
  }
  posts: BlogPost[]
}

export default function BlogListing({ blok, posts }: BlogListingProps) {
  return (
    <section {...storyblokEditable(blok)} className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {blok.title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {blok.title}
            </h2>
            {blok.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {blok.description}
              </p>
            )}
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.uuid} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Featured Image */}
              {post.content.featured_image && (
                <div className="aspect-w-16 aspect-h-9">
                  <Image
                    src={post.content.featured_image.filename}
                    alt={post.content.featured_image.alt || post.content.title}
                    width={400}
                    height={225}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.content.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                {post.content.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.content.excerpt}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    {post.content.author && (
                      <span>By {post.content.author}</span>
                    )}
                    {post.content.published_date && (
                      <span>•</span>
                    )}
                    {post.content.published_date && (
                      <span>{new Date(post.content.published_date).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>

                {/* Tags */}
                {post.content.tags && post.content.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1">
                    {post.content.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.content.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{post.content.tags.length - 3} more</span>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts found.</p>
          </div>
        )}
      </div>
    </section>
  )
}