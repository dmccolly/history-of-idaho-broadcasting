import { apiPlugin, storyblokInit, getStoryblokApi, StoryblokComponent, storyblokEditable } from '@storyblok/react'
import BlogPost from '@/components/storyblok/BlogPost'
import BlogListing from '@/components/storyblok/BlogListing'
import Navigation from '@/components/storyblok/Navigation'
import NavigationItem from '@/components/storyblok/NavigationItem'
import Page from '@/components/storyblok/Page'
import Hero from '@/components/storyblok/Hero'
import ContentSection from '@/components/storyblok/ContentSection'
import Features from '@/components/storyblok/Features'
import FeatureItem from '@/components/storyblok/FeatureItem'
import CTA from '@/components/storyblok/CTA'
import VideoGallery from '@/components/storyblok/VideoGallery'

storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    'blog-post': BlogPost,
    'blog-listing': BlogListing,
    'navigation': Navigation,
    'navigation_item': NavigationItem,
    'page': Page,
    'hero': Hero,
    'content_section': ContentSection,
    'features': Features,
    'feature_item': FeatureItem,
    'cta': CTA,
    'video_gallery': VideoGallery,
  },
})

export { storyblokInit, getStoryblokApi, StoryblokComponent, storyblokEditable }