# Complete Storyblok Visual Editor Setup

This guide will set up your entire site to be editable through Storyblok's visual editor, not just navigation.

## Step 1: Get Your Storyblok Access Token

1. Go to https://app.storyblok.com
2. Navigate to **Settings** → **Access Tokens**
3. Copy your **Preview** access token
4. Replace the placeholder in your `.env` file:
   ```
   STORYBLOK_ACCESS_TOKEN=your_actual_preview_token_here
   ```

## Step 2: Create Content Type Blocks

In Storyblok, go to **Block Library** and create these content type blocks:

### A. Page Content Type
```
Name: page
Fields:
- title (Text, Required)
- slug (Text, Required)
- meta_description (Text)
- hero_section (Blocks, Allow: hero)
- content_sections (Blocks, Allow: content_section, features, testimonials, cta, stats)
- seo_title (Text)
```

### B. Hero Content Type
```
Name: hero
Fields:
- headline (Text, Required)
- subheadline (Textarea)
- description (Textarea)
- primary_button_text (Text)
- primary_button_link (Link)
- secondary_button_text (Text)
- secondary_button_link (Link)
- background_image (Asset)
- background_video (Asset)
- layout_style (Option: default, centered, split)
```

### C. Content Section
```
Name: content_section
Fields:
- title (Text)
- content (Richtext)
- layout (Option: single_column, two_column, three_column)
- background_color (Option: white, gray, dark)
- image (Asset)
- image_position (Option: left, right, top, bottom)
```

### D. Features Section
```
Name: features
Fields:
- title (Text)
- subtitle (Text)
- features_list (Blocks, Allow: feature_item)
- layout (Option: grid, list, cards)
```

### E. Feature Item
```
Name: feature_item
Fields:
- title (Text, Required)
- description (Textarea)
- icon (Asset)
- link (Link)
```

### F. Testimonials Section
```
Name: testimonials
Fields:
- title (Text)
- testimonials_list (Blocks, Allow: testimonial_item)
- layout (Option: carousel, grid, single)
```

### G. Testimonial Item
```
Name: testimonial_item
Fields:
- quote (Textarea, Required)
- author_name (Text, Required)
- author_title (Text)
- author_company (Text)
- author_image (Asset)
- rating (Number)
```

### H. CTA Section
```
Name: cta
Fields:
- title (Text, Required)
- description (Textarea)
- button_text (Text)
- button_link (Link)
- background_color (Option: primary, secondary, dark)
- layout (Option: centered, split)
```

### I. Stats Section
```
Name: stats
Fields:
- title (Text)
- stats_list (Blocks, Allow: stat_item)
- layout (Option: horizontal, vertical)
```

### J. Stat Item
```
Name: stat_item
Fields:
- number (Text, Required)
- label (Text, Required)
- description (Text)
```

### K. Blog Post
```
Name: blog_post
Fields:
- title (Text, Required)
- slug (Text, Required)
- excerpt (Textarea)
- content (Richtext, Required)
- featured_image (Asset)
- author (Text)
- publish_date (Date)
- tags (Text, Multiple)
- meta_description (Text)
```

### L. Event
```
Name: event
Fields:
- title (Text, Required)
- slug (Text, Required)
- description (Richtext)
- event_date (Date, Required)
- event_time (Text)
- location (Text)
- featured_image (Asset)
- registration_link (Link)
- price (Text)
- capacity (Number)
```

## Step 3: Create Global Settings

### Site Settings Content Type
```
Name: site_settings
Fields:
- site_title (Text)
- site_description (Text)
- logo (Asset)
- favicon (Asset)
- primary_color (Text)
- secondary_color (Text)
- footer_text (Richtext)
- social_links (Blocks, Allow: social_link)
- contact_info (Blocks, Allow: contact_item)
```

### Social Link
```
Name: social_link
Fields:
- platform (Option: facebook, twitter, instagram, linkedin, youtube)
- url (Link, Required)
- icon (Asset)
```

### Contact Item
```
Name: contact_item
Fields:
- type (Option: email, phone, address)
- label (Text)
- value (Text, Required)
```

## Step 4: Create Your Content

### A. Create Site Settings
1. Go to **Content**
2. Create new story: `site-settings`
3. Choose content type: `site_settings`
4. Fill in your site information
5. Publish

### B. Create Pages
1. Create story: `home`
   - Content type: `page`
   - Add hero section
   - Add content sections
   - Publish

2. Create story: `about`
   - Content type: `page`
   - Add relevant sections
   - Publish

3. Create story: `events`
   - Content type: `page`
   - Add events listing
   - Publish

### C. Create Navigation
1. Create story: `navigation`
2. Use the navigation content type from previous setup
3. Publish

## Step 5: Update Components

The following components will be created/updated to fetch from Storyblok:

- `components/storyblok/Page.tsx` - Main page component
- `components/storyblok/Hero.tsx` - Hero sections
- `components/storyblok/ContentSection.tsx` - Content blocks
- `components/storyblok/Features.tsx` - Features sections
- `components/storyblok/Testimonials.tsx` - Testimonials
- `components/storyblok/CTA.tsx` - Call-to-action sections
- `components/storyblok/Stats.tsx` - Statistics sections
- `components/storyblok/SiteSettings.tsx` - Global settings

## Step 6: Enable Visual Editor

1. In each story, click **Visual Editor**
2. Set preview URL: `http://localhost:3001` (development)
3. For production: use your live domain
4. Enable real-time editing

## Step 7: Page Routes

Update your Next.js pages to fetch from Storyblok:

- `app/(default)/page.tsx` - Home page
- `app/(default)/about/page.tsx` - About page
- `app/(default)/events/page.tsx` - Events page
- `app/(default)/[...slug]/page.tsx` - Dynamic pages

## Benefits

✅ **Complete Visual Editing**: Edit any part of your site
✅ **Real-time Preview**: See changes instantly
✅ **Component-based**: Reusable content blocks
✅ **SEO Friendly**: Meta tags and structured data
✅ **Team Collaboration**: Multiple editors
✅ **Version Control**: Content versioning
✅ **Responsive**: Mobile-friendly editing
✅ **GitHub Integration**: Automatic deployments

## What You Can Edit

- **Homepage**: Hero, features, testimonials, stats
- **About Page**: Team, history, mission
- **Events**: Event listings and details
- **Blog**: Posts and categories
- **Navigation**: Menu items and structure
- **Footer**: Links and contact info
- **Global Settings**: Colors, logos, site info
- **SEO**: Meta descriptions and titles

## Next Steps

1. Set up your Storyblok access token
2. Create all content types listed above
3. Create your initial content
4. Test the visual editor
5. Deploy with webhooks for automatic updates

Once complete, you'll have full visual editing control over your entire website through Storyblok's cloud interface!