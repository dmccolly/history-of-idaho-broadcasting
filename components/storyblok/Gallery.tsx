
'use client'

import { storyblokEditable } from '@/lib/storyblok'
import { SbBlokData } from '@storyblok/react'

interface Video {
  _uid: string
  vimeo_id: string
  caption: string
}

interface GalleryStoryblok extends SbBlokData {
  _uid: string
  component: 'gallery'
  title: string
  description: string
  videos: Video[]
}

export default function Gallery({ blok }: { blok: GalleryStoryblok }) {
  return (
    <div {...storyblokEditable(blok)} className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{blok.title}</h1>
      <p className="text-lg mb-8">{blok.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blok.videos?.map((video) => (
          <div key={video._uid} className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://player.vimeo.com/video/${video.vimeo_id}`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
            <p className="text-center mt-2">{video.caption}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
