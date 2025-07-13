import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import BlogPost from '../components/storyblok/BlogPost'
import BlogListing from '../components/storyblok/BlogListing'

// Initialize Storyblok
storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    'blog-post': BlogPost,
    'blog-listing': BlogListing,
  },
})

export { storyblokInit }