'use client'

import { storyblokEditable, StoryblokComponent } from '@/lib/storyblok'
import { SbBlokData } from '@storyblok/react'

interface PageStoryblok extends SbBlokData {
  title: string;
  slug: string
  meta_description?: string
  hero_section?: SbBlokData[]
  content_sections?: SbBlokData[]
  seo_title?: string
  _uid: string
  component: 'page'
}

interface PageProps {
  blok: PageStoryblok
}

export default function Page({ blok }: PageProps) {
  return (
    <div {...storyblokEditable(blok)} className="page-content">
      {/* Hero Section */}
      {blok.hero_section && blok.hero_section.length > 0 && (
        <div className="hero-container">
          {blok.hero_section.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      )}

      {/* Content Sections */}
      {blok.content_sections && blok.content_sections.length > 0 && (
        <div className="content-container">
          {blok.content_sections.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </div>
      )}

      {/* Fallback content if no sections are defined */}
      {(!blok.hero_section || blok.hero_section.length === 0) && 
       (!blok.content_sections || blok.content_sections.length === 0) && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {blok.title}
            </h1>
            <p className="text-lg text-gray-600">
              This page is ready for content. Add hero and content sections in Storyblok to get started.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}