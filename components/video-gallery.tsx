'use client'

import VideoGallery from '@/components/storyblok/VideoGallery'

interface VideoItem {
  title: string
  description: string
  role: string
  photo_credit: string
  vimeo_url: string
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
  _uid: string
  component: 'video_gallery'
  [key: string]: any
}

interface VideoGalleryComponentProps {
  blok: VideoGalleryStoryblok
}

export function VideoGalleryComponent({ blok }: VideoGalleryComponentProps) {
  return <VideoGallery blok={blok} />
}