'use client'

import { storyblokEditable } from '@/lib/storyblok'
import Image from 'next/image'
import { useState, useMemo } from 'react'

interface VideoItem {
  title: string
  description: string
  role: string
  photo_credit: string
  vimeo_url: string
  category?: string
  thumbnail?: {
    filename: string
    alt?: string
  }
  _uid: string
  [key: string]: any
}

interface VideoGalleryStoryblok {
  title?: string
  subtitle?: string
  description?: string
  videos?: VideoItem[]
  layout?: 'grid' | 'list'
  columns?: '2' | '3' | '4'
  background_color?: 'white' | 'gray' | 'dark'
  enable_filtering?: boolean
  _uid: string
  component: 'video_gallery'
  [key: string]: any
}

interface VideoGalleryProps {
  blok: VideoGalleryStoryblok
}

export default function VideoGallery({ blok }: VideoGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  
  const backgroundClass = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900 text-white'
  }[blok.background_color || 'white']

  const gridCols = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[blok.columns || '3']

  const extractVimeoId = (url: string): string | null => {
    if (!url) return null
    const match = url.match(/vimeo\.com\/(\d+)/)
    return match ? match[1] : null
  }
  
  // Extract unique categories from videos
  const categories = useMemo(() => {
    if (!blok.videos || !blok.enable_filtering) return []
    
    const categorySet = new Set<string>()
    blok.videos.forEach(video => {
      if (video.category) {
        categorySet.add(video.category)
      }
    })
    
    return Array.from(categorySet)
  }, [blok.videos, blok.enable_filtering])
  
  // Filter videos based on active category
  const filteredVideos = useMemo(() => {
    if (!blok.videos) return []
    if (activeFilter === 'all') return blok.videos
    
    return blok.videos.filter(video => video.category === activeFilter)
  }, [blok.videos, activeFilter])

  const VideoCard = ({ video }: { video: VideoItem }) => {
    const vimeoId = extractVimeoId(video.vimeo_url)
    const embedUrl = vimeoId ? `https://player.vimeo.com/video/${vimeoId}` : null

    return (
      <div className="video-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Video Embed */}
        <div className="aspect-video bg-gray-100 relative">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={video.title}
            />
          ) : video.thumbnail ? (
            <Image
              src={video.thumbnail.filename}
              alt={video.thumbnail.alt || video.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">Video Player</p>
              </div>
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {video.title}
          </h3>
          
          {video.role && (
            <p className="text-sm font-medium text-blue-600 mb-3">
              {video.role}
            </p>
          )}
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {video.description}
          </p>
          
          {video.photo_credit && (
            <p className="text-xs text-gray-400 italic">
              Photos courtesy: {video.photo_credit}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <section 
      {...storyblokEditable(blok)} 
      className={`py-16 ${backgroundClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          {blok.title && (
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {blok.title}
            </h1>
          )}
          
          {blok.subtitle && (
            <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
              {blok.subtitle}
            </h2>
          )}
          
          {blok.description && (
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                {blok.description}
              </p>
            </div>
          )}
        </div>
        
        {/* Category Filters */}
        {blok.enable_filtering && categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All Videos
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className={`grid ${gridCols} gap-8`}>
            {filteredVideos.map((video) => (
              <VideoCard key={video._uid} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600">
              {activeFilter !== 'all' 
                ? `No videos found in the "${activeFilter}" category.` 
                : 'Add video content in Storyblok to populate this gallery.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}