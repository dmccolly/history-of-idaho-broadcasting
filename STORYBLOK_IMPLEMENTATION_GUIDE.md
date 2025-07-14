# Storyblok Implementation Guide

This guide will walk you through setting up your complete Storyblok configuration step by step.

## Prerequisites

✅ Storyblok access token is configured in `.env`
✅ Development server is running on `http://localhost:3001`
✅ All Storyblok components are created in the codebase

## Step 1: Access Your Storyblok Space

1. Go to https://app.storyblok.com
2. Select your space or create a new one
3. You should see your space dashboard

## Step 2: Create Content Type Blocks (Block Library)

Go to **Block Library** in the left sidebar and create these blocks in order:

### 2.1 Basic Content Types

#### A. Create `page` Content Type
1. Click **+ New Block**
2. Name: `page`
3. Add these fields:
   - `title` (Text, Required)
   - `slug` (Text, Required)
   - `meta_description` (Text)
   - `hero_section` (Blocks, Allow: hero)
   - `content_sections` (Blocks, Allow: content_section, features, cta)
   - `seo_title` (Text)
4. Save

#### B. Create `hero` Content Type
1. Click **+ New Block**
2. Name: `hero`
3. Add these fields:
   - `headline` (Text, Required)
   - `subheadline` (Textarea)
   - `description` (Textarea)
   - `primary_button_text` (Text)
   - `primary_button_link` (Link)
   - `secondary_button_text` (Text)
   - `secondary_button_link` (Link)
   - `background_image` (Asset)
   - `layout_style` (Option: default, centered, split)
4. Save

#### C. Create `content_section` Content Type
1. Click **+ New Block**
2. Name: `content_section`
3. Add these fields:
   - `title` (Text)
   - `content` (Richtext)
   - `layout` (Option: single_column, two_column, three_column)
   - `background_color` (Option: white, gray, dark)
   - `image` (Asset)
   - `image_position` (Option: left, right, top, bottom)
4. Save

#### D. Create `features` Content Type
1. Click **+ New Block**
2. Name: `features`
3. Add these fields:
   - `title` (Text)
   - `subtitle` (Text)
   - `features_list` (Blocks, Allow: feature_item)
   - `layout` (Option: grid, list, cards)
4. Save

#### E. Create `feature_item` Content Type
1. Click **+ New Block**
2. Name: `feature_item`
3. Add these fields:
   - `title` (Text, Required)
   - `description` (Textarea)
   - `icon` (Asset)
   - `link` (Link)
4. Save

#### F. Create `cta` Content Type
1. Click **+ New Block**
2. Name: `cta`
3. Add these fields:
   - `title` (Text, Required)
   - `description` (Textarea)
   - `button_text` (Text)
   - `button_link` (Link)
   - `background_color` (Option: primary, secondary, dark)
   - `layout` (Option: centered, split)
4. Save

### 2.2 Navigation Content Types

#### G. Create `navigation` Content Type
1. Click **+ New Block**
2. Name: `navigation`
3. Add these fields:
   - `items` (Blocks, Allow: navigation_item)
4. Save

#### H. Create `navigation_item` Content Type
1. Click **+ New Block**
2. Name: `navigation_item`
3. Add these fields:
   - `label` (Text, Required)
   - `href` (Text, Required)
   - `children` (Blocks, Allow: navigation_item)
4. Save

## Step 3: Create Your First Content

Go to **Content** in the left sidebar:

### 3.1 Create Home Page
1. Click **+ Create new**
2. Name: `home`
3. Content type: `page`
4. Fill in the fields:
   - Title: "Welcome to History of Idaho Broadcasting"
   - Slug: "home"
   - Meta Description: "Discover the rich history of broadcasting in Idaho"
   - SEO Title: "History of Idaho Broadcasting - Home"
5. Add Hero Section:
   - Click **+ Add block** in hero_section
   - Choose `hero`
   - Headline: "History of Idaho Broadcasting"
   - Subheadline: "Preserving Idaho's Broadcasting Legacy"
   - Description: "Explore the stories, people, and technology that shaped broadcasting in Idaho."
   - Primary Button Text: "Explore History"
   - Primary Button Link: "/about"
   - Layout Style: "centered"
6. Add Content Sections:
   - Click **+ Add block** in content_sections
   - Choose `content_section`
   - Title: "Our Mission"
   - Content: Add rich text about your mission
   - Layout: "single_column"
   - Background Color: "white"
7. **Publish** the story

### 3.2 Create Navigation
1. Click **+ Create new**
2. Name: `navigation`
3. Content type: `navigation`
4. Add navigation items:
   - Click **+ Add block** in items
   - Choose `navigation_item`
   - Label: "Home"
   - Href: "/"
   - Repeat for: About (/about), Events (/events), Blog (/blog)
5. **Publish** the story

### 3.3 Create About Page
1. Click **+ Create new**
2. Name: `about`
3. Content type: `page`
4. Fill in basic fields:
   - Title: "About Us"
   - Slug: "about"
   - Meta Description: "Learn about the History of Idaho Broadcasting Foundation"
5. Add content sections as needed
6. **Publish** the story

## Step 4: Enable Visual Editor

### 4.1 Configure Preview URL
1. Go to **Settings** → **Visual Editor**
2. Set Preview URL: `https://localhost:3001/`
3. Enable "Https"
4. Save settings

### 4.2 Test Visual Editor
1. Go back to your `home` story
2. Click **Visual Editor** tab
3. You should see your site loading with editing capabilities
4. Try editing the hero headline - changes should appear in real-time

## Step 5: Create Additional Content Types (Optional)

If you want blog and events functionality:

### Blog Post Content Type
1. Name: `blog_post`
2. Fields:
   - `title` (Text, Required)
   - `slug` (Text, Required)
   - `excerpt` (Textarea)
   - `content` (Richtext, Required)
   - `featured_image` (Asset)
   - `author` (Text)
   - `publish_date` (Date)
   - `tags` (Text, Multiple)

### Event Content Type
1. Name: `event`
2. Fields:
   - `title` (Text, Required)
   - `slug` (Text, Required)
   - `description` (Richtext)
   - `event_date` (Date, Required)
   - `event_time` (Text)
   - `location` (Text)
   - `featured_image` (Asset)

## Step 6: Test Your Setup

1. Visit `http://localhost:3001` in your browser
2. You should see your Storyblok content loading
3. Check the browser console - no "Navigation not found" errors
4. Test the visual editor by making changes

## Troubleshooting

### Common Issues:

1. **"Navigation not found in Storyblok"**
   - Ensure you created and published the `navigation` story
   - Check that the content type is exactly `navigation`

2. **"You can't use getStoryblokApi if you're not loading apiPlugin"**
   - This should resolve once content is created in Storyblok
   - Restart your development server after creating content

3. **Visual Editor not loading**
   - Check that preview URL is set correctly
   - Ensure your development server is running
   - Try using `http://localhost:3001` instead of `https://`

4. **Content not appearing**
   - Verify content is published (not just saved as draft)
   - Check that field names match exactly
   - Ensure content type names are correct

## Next Steps

1. ✅ Create all content types in Block Library
2. ✅ Create initial content (home, navigation, about)
3. ✅ Test visual editor functionality
4. 🔄 Add more pages and content as needed
5. 🔄 Configure production deployment with webhooks
6. 🔄 Train team members on content editing

## Success Indicators

- ✅ No console errors about missing Storyblok content
- ✅ Visual editor loads and allows real-time editing
- ✅ Navigation appears correctly on the site
- ✅ Page content loads from Storyblok
- ✅ Changes in Storyblok appear immediately on the site

Once these steps are complete, your entire site will be editable through Storyblok's visual editor!