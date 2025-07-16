import { getStoryblokApi, StoryblokComponent } from '@/lib/storyblok'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  // Return default metadata if no Storyblok token is provided
  if (!process.env.STORYBLOK_ACCESS_TOKEN) {
    return {
      title: 'Gallery - History of Idaho Broadcasting Foundation',
      description: 'Video interviews and historical content from Idaho broadcasting personalities',
    }
  }

  try {
    const storyblokApi = getStoryblokApi()
    const { data } = await storyblokApi.get(`cdn/stories/gallery`, {
      version: 'draft',
    })

    const story = data?.story
    if (!story) {
      return {
        title: 'Gallery - History of Idaho Broadcasting Foundation',
        description: 'Video interviews and historical content from Idaho broadcasting personalities',
      }
    }

    return {
      title: story.content.seo_title || story.content.title || 'Gallery - History of Idaho Broadcasting Foundation',
      description: story.content.meta_description || 'Video interviews and historical content from Idaho broadcasting personalities',
    }
  } catch (error) {
    console.error('Error fetching gallery metadata:', error)
    return {
      title: 'Gallery - History of Idaho Broadcasting Foundation',
      description: 'Video interviews and historical content from Idaho broadcasting personalities',
    }
  }
}

export default async function GalleryPage() {
  // Return a placeholder if no Storyblok token is provided
  if (!process.env.STORYBLOK_ACCESS_TOKEN) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gallery
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Video interviews and historical content from Idaho broadcasting personalities.
          </p>
          <div className="bg-gray-50 rounded-lg p-6 text-left max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Setup Instructions:</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Configure your Storyblok access token in .env</li>
              <li>Create a "gallery" story in Storyblok</li>
              <li>Add VideoGallery components to display your content</li>
              <li>Refresh this page to see your gallery</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  try {
    const storyblokApi = getStoryblokApi()
    const { data } = await storyblokApi.get(`cdn/stories/gallery`, {
      version: 'draft',
    })

    const story = data?.story
    if (!story) {
      // Return a default gallery page with sample content
      return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Gallery
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Video interviews and historical content from Idaho broadcasting personalities.
            </p>
            <div className="bg-blue-50 rounded-lg p-6 text-left max-w-2xl mx-auto">
              <h2 className="text-lg font-semibold mb-4 text-blue-900">To set up your gallery:</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                <li>Go to your Storyblok space</li>
                <li>Create a new story with slug: "gallery"</li>
                <li>Choose content type: "page"</li>
                <li>Add VideoGallery components with your video content</li>
                <li>Publish and refresh this page</li>
              </ol>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen">
        <StoryblokComponent blok={story.content} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching gallery story:', error)
    
    // Show helpful error message
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gallery Setup Required
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The gallery page needs to be created in Storyblok.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 text-left max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold mb-4 text-blue-900">To create the gallery:</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Go to your Storyblok space</li>
              <li>Create a new story with slug: "gallery"</li>
              <li>Choose content type: "page"</li>
              <li>Add VideoGallery components to showcase your videos</li>
              <li>Publish and refresh this page</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

