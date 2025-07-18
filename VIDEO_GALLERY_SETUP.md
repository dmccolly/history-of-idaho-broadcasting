# Video Gallery Setup Guide

This guide will help you set up the video gallery on your History of Idaho Broadcasting Foundation website using Storyblok CMS.

## Overview

The video gallery has been implemented with the following components:
- **VideoGallery Component**: Main gallery component for displaying video collections
- **Gallery Page**: Dedicated `/gallery` route for the video content
- **Storyblok Integration**: Full CMS integration for easy content management

## Files Created/Modified

### New Files:
1. `components/storyblok/VideoGallery.tsx` - Main video gallery component
2. `app/(default)/gallery/page.tsx` - Gallery page route
3. `video-gallery-data.json` - Structured data for content setup
4. `VIDEO_GALLERY_SETUP.md` - This setup guide

### Modified Files:
1. `lib/storyblok.ts` - Added VideoGallery component registration

## Storyblok Setup Instructions

### Step 1: Create Component Schemas in Storyblok

1. **Create Video Gallery Component**:
   - Go to your Storyblok space
   - Navigate to "Components" in the sidebar
   - Click "New Component"
   - Name: `video_gallery`
   - Display Name: `Video Gallery`
   - Add the following fields:

   | Field Name | Type | Required | Options/Description |
   |------------|------|----------|-------------------|
   | title | Text | No | Gallery title |
   | subtitle | Text | No | Gallery subtitle |
   | description | Textarea | No | Gallery description |
   | videos | Blocks | No | Restrict to: video_item |
   | layout | Option | No | Options: grid, list (default: grid) |
   | columns | Option | No | Options: 2, 3, 4 (default: 3) |
   | background_color | Option | No | Options: white, gray, dark (default: white) |

2. **Create Video Item Component**:
   - Create another component
   - Name: `video_item`
   - Display Name: `Video Item`
   - Add the following fields:

   | Field Name | Type | Required | Description |
   |------------|------|----------|-------------|
   | title | Text | Yes | Video title |
   | description | Textarea | Yes | Video description |
   | role | Text | No | Person's role/position |
   | photo_credit | Text | No | Photo credit information |
   | vimeo_url | Text | Yes | Vimeo video URL |
   | thumbnail | Asset | No | Video thumbnail image |

### Step 2: Create Gallery Page in Storyblok

1. **Create New Story**:
   - Go to "Content" in Storyblok
   - Click "Create new"
   - Choose "Story"
   - Name: `Gallery`
   - Slug: `gallery`
   - Content Type: `page`

2. **Configure Page Content**:
   - In the content editor, add content sections
   - Add a `video_gallery` component
   - Configure the gallery with:
     - Title: "Our Video Interviews"
     - Subtitle: "Preserving Idaho's Broadcasting History"
     - Description: "In our ongoing effort to visually preserve Idaho's fascinating radio and television past..."

3. **Add Video Content**:
   For each video from the scraped content, add a `video_item` with:

   **Video 1 - Dee Sarton**:
   - Title: "Dee Sarton Interview"
   - Role: "Former KTVB-TV, Channel 7 anchor/reporter/program host"
   - Description: "DEE SARTON talks about what it was like starting out as a young reporter in Boise back in the late '70s, and working with legendary Channel 7 news director Sal Celeski."
   - Photo Credit: "KTVB News Group"
   - Vimeo URL: https://vimeo.com/982877483

   **Video 2 - Marcia Franklin**:
   - Title: "Marcia Franklin Interview"
   - Role: "Idaho Public Television producer/Dialogue host"
   - Description: "MARCIA FRANKLIN talks about some of her most memorable Sun Valley Writers' Conference interviews, especially her 2016 sit-down with David Benioff and D.B. Weiss, creators of HBO's epic Game of Thrones series."
   - Photo Credit: "Idaho Public Television"
   - Vimeo URL: https://vimeo.com/982872224

   **Video 3 - Don Nelson**:
   - Title: "Don Nelson Interview"
   - Role: "KIVI-TV, Channel 6 anchor/reporter"
   - Description: "DON NELSON explains how Brink Chipman, who did three stints as the station's news director (1980-83; 1991-93; and 1996-97), came up with the now-legendary '6 On Your Side' consumer watchdog branding."
   - Photo Credit: "KIVI, Channel 6"
   - Vimeo URL: https://vimeo.com/982856307

   **Video 4 - Kevin Miller**:
   - Title: "Kevin Miller Interview"
   - Role: "KIDO radio talk show host"
   - Description: "KEVIN MILLER tells us how 'Miller's Mission,' his annual on-air fundraising effort to help support the Boise Rescue Mission, came about."
   - Photo Credit: "Boise Rescue Mission"
   - Vimeo URL: https://vimeo.com/982690679

   **Video 5 - Marty Holtman**:
   - Title: "Marty Holtman Interview"
   - Role: "KBOI radio deejay and KBOI-TV/KBCI-TV, Channel 2 weatherman/feature reporter"
   - Description: "The late MARTY HOLTMAN reminisces about his days — and nights — as late-night horror-movie-show host 'Claude Gloom.' 'Claude' hosted the hugely popular show entitled The Unknown, sponsored by Capital Volkswagen of Boise..."
   - Photo Credit: "KBOI, Channel 2"
   - Vimeo URL: https://vimeo.com/967979349

   **Video 6 - Marty Holtman Santa Express**:
   - Title: "Marty Holtman's Santa Express"
   - Role: "Special Holiday Feature"
   - Description: "Idaho Broadcasting Foundation proudly presents Marty Holtman's Santa Express. Follow along in an adventure to the North Pole as our beloved Marty Holtman goes on a journey to deliver letters for Santa from the children of Idaho..."
   - Photo Credit: "KBOI, Channel 2"
   - Vimeo URL: [Add actual Vimeo URL when available]

### Step 3: Publish and Test

1. **Publish the Story**: Click "Publish" in Storyblok
2. **Test the Gallery**: Visit `https://your-site.netlify.app/gallery`
3. **Verify Functionality**: Check that videos load and display correctly

## Vimeo URL Format

The component expects Vimeo URLs in the format:
- `https://vimeo.com/VIDEO_ID`
- `https://player.vimeo.com/video/VIDEO_ID`

The component will automatically extract the video ID and create the proper embed URL.

## Customization Options

### Layout Options:
- **Grid**: Videos displayed in a responsive grid
- **List**: Videos displayed in a vertical list

### Column Options (Grid Layout):
- **2 Columns**: 2 videos per row on larger screens
- **3 Columns**: 3 videos per row (default)
- **4 Columns**: 4 videos per row

### Background Options:
- **White**: White background (default)
- **Gray**: Light gray background
- **Dark**: Dark background with white text

## Troubleshooting

### Common Issues:

1. **Videos not loading**: Check that Vimeo URLs are correct and videos are publicly accessible
2. **Component not appearing**: Ensure the component is registered in `lib/storyblok.ts`
3. **Styling issues**: Check that Tailwind CSS classes are properly configured

### Support:

For additional support with Storyblok setup, refer to:
- [Storyblok Documentation](https://www.storyblok.com/docs)
- [Next.js Storyblok Integration Guide](https://www.storyblok.com/tp/nextjs-headless-cms)

## Next Steps

1. **Add Actual Vimeo URLs**: Replace placeholder URLs with actual video URLs
2. **Add Thumbnails**: Upload and assign thumbnail images for better visual appeal
3. **Test Responsive Design**: Verify the gallery works well on mobile devices
4. **SEO Optimization**: Add meta descriptions and titles for better search visibility

The video gallery is now ready for use and can be easily managed through the Storyblok CMS interface.

