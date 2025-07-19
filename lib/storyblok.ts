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
    2     'blog-post': BlogPost,
    3     'blog-listing': BlogListing,
    4     'navigation': Navigation,
    5     'navigation_item': NavigationItem,
    6     'page': Page,
    7     'hero': Hero,
    8     'content_section': ContentSection,
    9     'features': Features,
   10     'feature_item': FeatureItem,
   11     'cta': CTA,
   12     'video_gallery': Gallery, // Map Storyblok component 'video_gallery' to your Gallery React
      component
   13     'video_item': VideoItem,   // Map Storyblok component 'video_item' to your new VideoItem React
      component
   14   },

export { storyblokInit, getStoryblokApi, StoryblokComponent, storyblokEditable }