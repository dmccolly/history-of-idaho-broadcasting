import { getStoryblokApi, StoryblokComponent } from '@/lib/storyblok'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PageProps {
  params: {
    slug: string[]
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug ? params.slug.join('/') : 'home'
  
  // Return default metadata if no Storyblok token is provided
  if (!process.env.STORYBLOK_ACCESS_TOKEN) {
    return {
      title: 'History of Idaho Broadcasting Foundation',
      description: 'Preserving the rich history of broadcasting in Idaho',
    }
  }

  try {
    const storyblokApi = getStoryblokApi()
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: 'draft',
    })

    const story = data?.story
    if (!story) {
      return {
        title: 'Page Not Found',
        description: 'The requested page could not be found.',
      }
    }

    return {
      title: story.content.seo_title || story.content.title || story.name,
      description: story.content.meta_description || story.content.description || 'History of Idaho Broadcasting Foundation',
    }
  } catch (error) {
    console.error('Error fetching story metadata:', error)
    return {
      title: 'History of Idaho Broadcasting Foundation',
      description: 'Preserving the rich history of broadcasting in Idaho',
    }
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const slug = params.slug ? params.slug.join('/') : 'home'
  
  // Return a placeholder if no Storyblok token is provided
  if (!process.env.STORYBLOK_ACCESS_TOKEN) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Storyblok Setup Required
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            To enable visual editing for this page, please configure your Storyblok access token.
          </p>
          <div className="bg-gray-50 rounded-lg p-6 text-left max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Setup Instructions:</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Get your Storyblok access token from your space settings</li>
              <li>Add it to your .env file: STORYBLOK_ACCESS_TOKEN=your_token_here</li>
              <li>Create page content in Storyblok with slug: "{slug}"</li>
              <li>Refresh this page to see your content</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  try {
    const storyblokApi = getStoryblokApi()
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: 'draft',
    })

    const story = data?.story
    if (!story) {
      notFound()
    }

    return (
      <div className="min-h-screen">
        <StoryblokComponent blok={story.content} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching story:', error)
    
    // Show helpful error message
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The page "{slug}" could not be found in Storyblok.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 text-left max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold mb-4 text-blue-900">To create this page:</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Go to your Storyblok space</li>
              <li>Create a new story with slug: "{slug}"</li>
              <li>Choose content type: "page"</li>
              <li>Add your content and publish</li>
              <li>Refresh this page</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }
}