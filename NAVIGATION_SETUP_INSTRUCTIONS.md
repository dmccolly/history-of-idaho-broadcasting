# Navigation Setup Instructions

This document provides instructions on how to set up the navigation in Storyblok for the Idaho Broadcasting Foundation website.

## Overview

The website now uses Storyblok to manage the navigation menu. This allows you to:
- Add, remove, or reorder navigation items
- Change link text and URLs
- Add a call-to-action button
- All without touching the code

## Setup Steps

### 1. Create Navigation Content Type in Storyblok (if not already done)

1. Go to your Storyblok space
2. Navigate to "Block Library" in the sidebar
3. Click "Create new block"
4. Choose "Content type block"
5. Name it: `navigation`
6. Add these fields:

   **Menu Items** (Type: Blocks)
   - Field name: `menu_items`
   - Allow only: `navigation_item`
   - Description: "Navigation menu items"

   **CTA Text** (Type: Text)
   - Field name: `cta_text`
   - Description: "Call-to-action button text"
   - Default: "Join Events"

   **CTA Link** (Type: Link)
   - Field name: `cta_link`
   - Description: "Call-to-action button link"
   - Default: "/events"

### 2. Create Navigation Item Content Type

1. Create another "Content type block"
2. Name it: `navigation_item`
3. Add these fields:

   **Label** (Type: Text)
   - Field name: `label`
   - Required: Yes
   - Description: "Menu item text"

   **Link** (Type: Link)
   - Field name: `href`
   - Required: Yes
   - Description: "Menu item URL"

   **Target** (Type: Option)
   - Field name: `target`
   - Options: `_self`, `_blank`
   - Default: `_self`
   - Description: "Link target"

### 3. Create Navigation Content

1. Go to "Content" in your Storyblok space
2. Click "Create new"
3. Choose "Story"
4. Name it: `navigation`
5. Set the slug to: `navigation`
6. Choose content type: `navigation`
7. Add your menu items:
   - Home → `/`
   - About → `/about`
   - Events → `/events`
   - News → `/news`
   - Back Corner → `/back-corner`
   - Videos → `/video`
8. Set CTA text and link if desired
9. **Publish** the story

## Video Page Setup

The video page is now available at `/video` and displays 5 video interviews from Vimeo. To customize this page in Storyblok:

1. Create a new story in Storyblok
2. Name it: `video`
3. Set the slug to: `video`
4. Choose content type: `page`
5. Add a `video_gallery` component
6. Configure with your desired title, subtitle, and description
7. Add video items with Vimeo URLs
8. Publish the story

## Testing

After setting up the navigation in Storyblok:

1. Visit your website
2. Verify that the navigation items match what you configured in Storyblok
3. Check that the links work correctly
4. Test on mobile devices to ensure the mobile menu works properly
5. Visit the `/video` page to ensure videos display correctly

## Troubleshooting

If the navigation doesn't update:
- Check that you've published the navigation story in Storyblok
- Verify the slug is set to `navigation`
- Check browser console for any errors
- Clear your browser cache and reload

If videos don't display:
- Verify Vimeo URLs are correct
- Check that videos are publicly accessible on Vimeo
- Inspect browser console for any errors