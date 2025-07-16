import { getStoryblokApi, StoryblokServerComponent } from '@/lib/storyblok'
import { notFound } from 'next/navigation'
import '../../../../lib/storyblok'

interface BlogPostPageProps {
  params: {
    slug: string
import { getStoryblokApi, import { getStoryblokApi, StoryblokComponent } from '@/lib/storyblok'
import { notFound } from 'next/navigation'
import '../../../../lib/storyblok'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const storyblokApi = getStoryblokApi()
    
    const { data } = await storyblokApi.get(`cdn/stories/blog-posts/${params.slug}`, {
      version: 'draft', // Use 'published' in production
    })
    
    if (!data.story) {
      notFound()
    }
    
    return (
      <div className="min-h-screen bg-white">
        <StoryblokComponent blok={data.story.content} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  // Return a placeholder if no Storyblok token is provided
  if (!process.env.STORYBLOK_TOKEN) {
    return []
  }

  try {
    const storyblokApi = getStoryblokApi()
    const { data } = await storyblokApi.get('cdn/stories', {
      starts_with: 'blog-posts/',
      version: 'published',
    })
    
    return data.stories.map((story: any) => ({
      slug: story.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const storyblokApi = getStoryblokApi()
    const { data } = await storyblokApi.get(`cdn/stories/blog-posts/${params.slug}`, {
      version: 'published',
    })
    
    if (!data.story) {
      return {
        title: 'Blog Post Not Found',
      }
    }
    
    return {
      title: data.story.content.title || data.story.name,
      description: data.story.content.description || '',
    }
  } catch (error) {
    return {
      title: 'Blog Post',
    }
  }
} } from '@/lib/storyblok'
import { notFound } from 'next/navigation'
import '../../../../lib/storyblok'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const storyblokApi = getStoryblokApi()
    
    const { data } = await storyblokApi.get(`cdn/stories/blog-posts/${params.slug}`, {
      version: 'draft', // Use 'published' in production
    })
    
    if (!data.story) {
      notFound()
    }
    
    return (
      <div className="container mx-auto px-4 py-8">
        <StoryblokComponent blok={data.story.content} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }
}

export async function generateStaticParams() {
  try {
    const storyblokApi = getStoryblokApi()
    const { data } = await storyblokApi.get('cdn/stories', {
      starts_with: 'blog-posts/',
      version: 'published',
    })
    
    return data.stories.map((story: any) => ({
      slug: story.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const storyblokApi = getStoryblokApi()
    const { data } = await storyblokApi.get(`cdn/stories/blog-posts/${params.slug}`, {
      version: 'published',
    })
    
    if (!data.story) {
      return {
        title: 'Blog Post Not Found',
      }
    }
    
    return {
      title: data.story.content.title || data.story.name,
      description: data.story.content.description || '',
    }
  } catch (error) {
    return {
      title: 'Blog Post',
    }
  }
}
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const storyblokApi = getStoryblokApi()
    
    const { data } = await storyblokApi.get(`cdn/stories/blog-posts/${params.slug}`, {
      version: 'draft', // Use 'published' in production
    })

    if (!data.story) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-white">
        <StoryblokServerComponent blok={data.story.content} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  // Return a placeholder if no Storyblok token is provided
  if (!process.env.STORYBLOK_ACCESS_TOKEN) {
    return [{ slug: 'setup-required' }]
  }

  try {
    const storyblokApi = getStoryblokApi()
    
    const { data } = await storyblokApi.get('cdn/stories', {
      starts_with: 'blog-posts/',
      version: 'published',
    })

    return data.stories.map((story: any) => ({
      slug: story.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return [{ slug: 'setup-required' }]
  }
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps) {
  // Return default metadata if no Storyblok token is provided
  if (!process.env.STORYBLOK_ACCESS_TOKEN) {
    return {
      title: 'Blog Post - Storyblok',
      description: 'Blog post powered by Storyblok CMS',
    }
  }

  try {
    const storyblokApi = getStoryblokApi()
    
    const { data } = await storyblokApi.get(`cdn/stories/blog-posts/${params.slug}`, {
      version: 'draft',
    })

    if (!data.story) {
      return {
        title: 'Post Not Found',
      }
    }

    const { content } = data.story
    
    return {
      title: content.title || 'Blog Post',
      description: content.excerpt || 'Read this blog post on History of Idaho Broadcasting',
      openGraph: {
        title: content.title,
        description: content.excerpt,
        images: content.featured_image ? [content.featured_image.filename] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Blog Post',
    }
  }
}
