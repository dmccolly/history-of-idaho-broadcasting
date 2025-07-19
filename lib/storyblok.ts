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
import Gallery from '@/components/storyblok/Gallery'
import VideoItem from '@/components/storyblok/VideoItem'
storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
 components: {
 'blog-post': BlogPost,
 'blog-listing': BlogListing,
 'navigation': Navigation,
 'navigation_item': NavigationItem,
  page': Page,
  'hero': Hero,
  'content_section': ContentSection,
  'features': Features,
  'feature_item': FeatureItem,
  'cta': CTA,
  'video_gallery': Gallery, // Map Storyblok component 'video_gallery' to your Gallery React
      component
   'video_item': VideoItem,   // Map Storyblok component 'video_item' to your new VideoItem React
      component
 },

export { storyblokInit, getStoryblokApi, StoryblokComponent, storyblokEditable }