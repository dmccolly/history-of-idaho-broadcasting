# Storyblok CMS Setup Guide

This guide will help you set up Storyblok as a visual CMS for your Next.js project.

## 1. Create a Storyblok Account

1. Go to [storyblok.com](https://www.storyblok.com/)
2. Sign up for a free account
3. Create a new space for your project

## 2. Get Your Access Token

1. In your Storyblok space, go to **Settings** → **Access Tokens**
2. Copy the **Preview** access token (for development)
3. For production, use the **Public** access token

## 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Storyblok access token:
   ```
   STORYBLOK_ACCESS_TOKEN=your_access_token_here
   ```

## 4. Create Content Types in Storyblok

### Blog Post Content Type

1. Go to **Block Library** in your Storyblok space
2. Create a new **Content Type** called `blog-post`
3. Add these fields:
   - `title` (Text)
   - `content` (Rich Text)
   - `featured_image` (Asset)
   - `excerpt` (Textarea)
   - `author` (Text)
   - `published_date` (Date/Time)
   - `tags` (Multi-Options)

### Blog Listing Content Type

1. Create another **Content Type** called `blog-listing`
2. Add these fields:
   - `title` (Text)
   - `description` (Textarea)

## 5. Create Content Structure

### Create the Blog Listing Page

1. Go to **Content** in your Storyblok space
2. Create a new **Story** called `blog-storyblok`
3. Set the content type to `blog-listing`
4. Fill in the title and description
5. Publish the story

### Create Blog Posts Folder

1. Create a new **Folder** called `blog-posts`
2. Inside this folder, create your first blog post:
   - Name: `my-first-post`
   - Content type: `blog-post`
   - Fill in all the fields
   - Publish the story

## 6. Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/blog-storyblok` to see your blog listing
3. Click on a blog post to view the individual post page

## 7. Visual Editing

1. In Storyblok, open any of your stories
2. Click the **Visual Editor** tab
3. Enter your local development URL: `http://localhost:3000/blog-storyblok/[story-slug]`
4. You can now edit content and see changes in real-time!

## 8. Production Deployment

1. Update your environment variables on Netlify:
   - Add `STORYBLOK_ACCESS_TOKEN` with your **Public** access token

2. Update the API calls to use `published` instead of `draft`:
   ```typescript
   version: 'published' // Change from 'draft'
   ```

## 9. Migration from MDX

To migrate your existing MDX blog posts:

1. **Manual Migration**: Copy content from your `.mdx` files into Storyblok stories
2. **Automated Migration**: Use Storyblok's Management API to bulk import content
3. **Gradual Migration**: Keep both systems running and migrate posts one by one

## 10. Advanced Features

### Webhooks for Auto-Rebuild

1. In Storyblok, go to **Settings** → **Webhooks**
2. Add your Netlify build hook URL
3. Select "Story published" and "Story unpublished" events
4. Now your site will rebuild automatically when content changes

### Preview Mode

Add preview functionality to see draft content:

```typescript
// In your page components
const version = searchParams.preview ? 'draft' : 'published'
```

### Custom Components

Create more Storyblok components for:
- Hero sections
- Call-to-action blocks
- Image galleries
- Video embeds

## Troubleshooting

### Common Issues

1. **"Access token not found"**: Check your `.env.local` file
2. **"Story not found"**: Ensure your story names match the routes
3. **"Component not found"**: Check component registration in `lib/storyblok.ts`

### Getting Help

- [Storyblok Documentation](https://www.storyblok.com/docs)
- [Storyblok React SDK](https://github.com/storyblok/storyblok-react)
- [Community Discord](https://discord.gg/storyblok)

## Benefits Over TinaCMS

✅ **Reliable Deployments**: No build failures
✅ **Visual Editor**: Real-time preview while editing
✅ **Scalable**: Handles high traffic and large content volumes
✅ **Team Collaboration**: Multiple editors can work simultaneously
✅ **Asset Management**: Built-in image optimization and CDN
✅ **Webhooks**: Automatic rebuilds when content changes
✅ **Professional Support**: Dedicated support team

Your Storyblok setup is now complete! You can start creating and editing content visually.