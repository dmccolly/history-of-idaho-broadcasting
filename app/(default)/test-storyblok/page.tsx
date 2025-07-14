'use client'

import { StoryblokComponent } from '@/lib/storyblok'
import { useState, useEffect } from 'react'

// Mock Storyblok story data for testing
const mockStory = {
  content: {
    _uid: 'test-page-uid',
    component: 'page',
    body: [
      {
        _uid: 'hero-uid',
        component: 'hero',
        headline: 'Welcome to Idaho Broadcasting History',
        subheadline: 'Preserving Our Heritage',
        description: 'Discover the rich heritage of radio and television in Idaho through our comprehensive archives and stories.',
        background_image: {
          filename: '/images/hero-image-01.jpg',
          alt: 'Idaho Broadcasting'
        },
        primary_button_text: 'Learn More',
        primary_button_link: {
          url: '/about',
          target: '_self'
        },
        secondary_button_text: 'View Archives',
        secondary_button_link: {
          url: '/archives',
          target: '_self'
        },
        layout_style: 'default'
      },
      {
        _uid: 'content-section-uid',
        component: 'content_section',
        title: 'Our Story',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'The History of Idaho Broadcasting Foundation preserves and shares the stories of radio and television pioneers who shaped communication in the Gem State. From the early days of AM radio to modern digital broadcasting, we celebrate the voices that connected communities across Idaho.'
                }
              ]
            }
          ]
        },
        layout: 'single_column',
        background_color: 'white'
      },
      {
        _uid: 'features-uid',
        component: 'features',
        title: 'What We Preserve',
        subtitle: 'Documenting Idaho\'s broadcasting legacy',
        features_list: [
          {
            _uid: 'feature-1-uid',
            component: 'feature_item',
            title: 'Radio History',
            description: 'Stories from Idaho\'s pioneering radio stations and personalities'
          },
          {
            _uid: 'feature-2-uid',
            component: 'feature_item',
            title: 'Television Legacy',
            description: 'The evolution of TV broadcasting across the state'
          },
          {
            _uid: 'feature-3-uid',
            component: 'feature_item',
            title: 'Digital Archives',
            description: 'Preserving audio, video, and documents for future generations'
          }
        ],
        layout: 'grid'
      },
      {
        _uid: 'cta-uid',
        component: 'cta',
        title: 'Support Our Mission',
        description: 'Help us preserve Idaho\'s broadcasting heritage for future generations',
        button_text: 'Donate Now',
        button_link: {
          url: '/support',
          target: '_self'
        },
        background_color: 'dark',
        layout: 'centered'
      }
    ]
  },
  name: 'Test Storyblok Page',
  full_slug: 'test-storyblok',
  uuid: 'test-uuid',
  id: 12345
}

export default function TestStoryblokPage() {
  const [story, setStory] = useState(mockStory)
  const [isEditorMode, setIsEditorMode] = useState(false)

  useEffect(() => {
    // Check if we're in Storyblok editor mode
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      setIsEditorMode(urlParams.has('_storyblok'))
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Simple header without Storyblok navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Idaho Broadcasting Foundation</h1>
            <div className="text-sm text-gray-600">Test Page</div>
          </div>
        </div>
      </header>

      {isEditorMode && (
        <div className="bg-blue-600 text-white p-4 text-center">
          <p className="font-semibold">🎯 Storyblok Visual Editor Mode Active</p>
          <p className="text-sm">You can now edit this content using the Storyblok visual editor</p>
        </div>
      )}
      
      <div className="container mx-auto">
        {story.content.body.map((blok: any) => (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))}
      </div>
      
      {!isEditorMode && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <p className="text-sm mb-2">Test Storyblok Integration</p>
          <a 
            href="/test-storyblok?_storyblok=1" 
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
          >
            Enter Editor Mode
          </a>
        </div>
      )}
    </div>
  )
}