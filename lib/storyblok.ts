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
import StationsPage from '@/components/storyblok/StationsPage'

// Check if Storyblok access token is available
const accessToken = process.env.STORYBLOK_ACCESS_TOKEN || '';

if (!accessToken) {
  console.warn('Storyblok access token is not set. Please set STORYBLOK_ACCESS_TOKEN in your environment variables.');
}

try {
  storyblokInit({
    accessToken: accessToken,
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
      'stations_page': StationsPage,
    },
  });
} catch (error) {
  console.error('Error initializing Storyblok:', error);
}

export { storyblokInit, getStoryblokApi, StoryblokComponent, storyblokEditable }