import { getStoryblokApi } from '@storyblok/react/rsc'
import BlogListing from '../../../components/storyblok/BlogListing'
import '../../../lib/storyblok'

export default async function BlogStoryblokPage() {
  try {
    const storyblokApi = getStoryblokApi()
    
    // Fetch the blog listing page
    const { data: pageData } = await storyblokApi.get('cdn/stories/blog-storyblok', {
      version: 'draft', // Use 'published' in production
    })

    // Fetch all blog posts
    const { data: postsData } = await storyblokApi.get('cdn/stories', {
      starts_with: 'blog-posts/',
      version: 'draft', // Use 'published' in production
      sort_by: 'created_at:desc',
    })

    return (
      <div className="min-h-screen bg-gray-50">
        <BlogListing 
          blok={pageData.story.content} 
          posts={postsData.stories}
        />
      </div>
    )
  } catch (error) {
    console.error('Error fetching Storyblok data:', error)
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog (Storyblok)</h1>
          <p className="text-gray-600 mb-4">
            To see this page working, you need to:
          </p>
          <ol className="text-left text-gray-600 space-y-2 max-w-md">
            <li>1. Create a Storyblok account at storyblok.com</li>
            <li>2. Add your access token to .env.local</li>
            <li>3. Create a "blog-storyblok" story in Storyblok</li>
            <li>4. Create blog posts in the "blog-posts/" folder</li>
          </ol>
        </div>
      </div>
    )
  }
}

export const metadata = {
  title: 'Blog - Storyblok CMS',
  description: 'Blog powered by Storyblok headless CMS',
}