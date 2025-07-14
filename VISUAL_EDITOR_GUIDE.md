# 🎨 Complete Visual Editor Setup Guide

Transform your entire website into a visually editable experience with Storyblok! This guide will help you set up cloud-based editing for every part of your site.

## 🚀 Quick Start

### Option 1: Automated Setup
```bash
node setup-storyblok.js
```

### Option 2: Manual Setup
1. Get your Storyblok access token from https://app.storyblok.com
2. Add it to your `.env` file:
   ```
   STORYBLOK_ACCESS_TOKEN=your_actual_token_here
   ```
3. Restart your dev server: `npm run dev`

## 📋 What You Can Edit

Once set up, you can visually edit:

### 🏠 **Pages**
- Homepage content and layout
- About page sections
- Events page
- Any custom pages

### 🧭 **Navigation**
- Menu items and links
- Call-to-action buttons
- Mobile menu

### 🎯 **Content Sections**
- Hero banners
- Feature lists
- Testimonials
- Call-to-action blocks
- Statistics sections
- Rich text content

### 📝 **Blog & Events**
- Blog posts and listings
- Event details and schedules
- Categories and tags

### ⚙️ **Global Settings**
- Site title and description
- Logo and branding
- Contact information
- Social media links

## 🛠️ Content Types Available

Your site supports these Storyblok content types:

| Content Type | Purpose | Fields |
|--------------|---------|--------|
| `page` | Main pages | Title, hero, content sections, SEO |
| `hero` | Hero banners | Headline, description, buttons, background |
| `content_section` | Flexible content | Title, rich text, images, layout options |
| `features` | Feature listings | Title, feature items, layout styles |
| `feature_item` | Individual features | Title, description, icon, link |
| `cta` | Call-to-actions | Title, description, button, styling |
| `navigation` | Site navigation | Menu items, CTA button |
| `navigation_item` | Menu items | Label, link, target |
| `blog_post` | Blog content | Title, content, author, tags |
| `event` | Event details | Title, date, location, registration |

## 📖 Step-by-Step Setup

### 1. Create Storyblok Account
- Go to https://app.storyblok.com
- Sign up for a free account
- Create a new space for your project

### 2. Get Access Token
- In your Storyblok space, go to **Settings** → **Access Tokens**
- Copy your **Preview** access token
- Add it to your `.env` file

### 3. Create Content Types
In Storyblok's **Block Library**, create these content type blocks:

#### Page Content Type
```
Name: page
Fields:
- title (Text, Required)
- slug (Text, Required) 
- meta_description (Text)
- hero_section (Blocks, Allow: hero)
- content_sections (Blocks, Allow: content_section, features, cta)
- seo_title (Text)
```

#### Hero Content Type
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
- layout_style (Option: default, centered, split)
```

*See `COMPLETE_STORYBLOK_SETUP.md` for all content type definitions.*

### 4. Create Your First Page
1. Go to **Content** in Storyblok
2. Click **Create new** → **Story**
3. Name it `home`
4. Choose content type: `page`
5. Add a hero section and content sections
6. **Publish** the story

### 5. Enable Visual Editor
1. In your story, click **Visual Editor**
2. Set preview URL: `http://localhost:3001`
3. Start editing visually!

## 🎯 How to Edit Content

### Visual Editor
1. Open any story in Storyblok
2. Click **Visual Editor**
3. Edit content directly on your site
4. Changes appear in real-time
5. Click **Publish** to make changes live

### Content Management
- **Add Sections**: Use the "+" button to add new content blocks
- **Reorder**: Drag and drop sections to reorder
- **Edit**: Click on any element to edit its properties
- **Delete**: Use the trash icon to remove sections
- **Preview**: See changes before publishing

## 🌐 Production Deployment

### Environment Variables
Add to your production environment:
```
STORYBLOK_ACCESS_TOKEN=your_production_token
```

### Webhooks (Recommended)
1. In Storyblok, go to **Settings** → **Webhooks**
2. Add your deployment webhook URL
3. Select "Story published" trigger
4. Now content changes trigger automatic deployments!

### Supported Platforms
- ✅ Netlify
- ✅ Vercel
- ✅ GitHub Pages
- ✅ Any static hosting

## 🔧 Troubleshooting

### Content Not Loading?
- ✅ Check your access token in `.env`
- ✅ Ensure story exists with correct slug
- ✅ Verify story is published
- ✅ Check browser console for errors

### Visual Editor Not Working?
- ✅ Confirm preview URL is correct
- ✅ Make sure dev server is running
- ✅ Check for CORS issues
- ✅ Try refreshing the visual editor

### Changes Not Appearing?
- ✅ Click "Publish" in Storyblok
- ✅ Clear browser cache
- ✅ Check if using draft vs published version

## 💡 Pro Tips

### Content Strategy
- **Start Simple**: Begin with basic page content, add complexity later
- **Reuse Components**: Create reusable content blocks for consistency
- **Plan Structure**: Design your content hierarchy before building

### Team Collaboration
- **Roles**: Set up different user roles in Storyblok
- **Workflows**: Use Storyblok's workflow features for content approval
- **Comments**: Use built-in commenting for team feedback

### Performance
- **Image Optimization**: Use Storyblok's image service for automatic optimization
- **Caching**: Implement proper caching strategies
- **CDN**: Leverage Storyblok's global CDN

## 📚 Additional Resources

- 📖 [Complete Setup Guide](./COMPLETE_STORYBLOK_SETUP.md)
- 🧭 [Navigation Setup](./STORYBLOK_NAVIGATION_SETUP.md)
- 📝 [Blog Setup](./STORYBLOK_SETUP.md)
- 🔗 [Storyblok Documentation](https://www.storyblok.com/docs)
- 🎥 [Video Tutorials](https://www.storyblok.com/tutorials)

## 🎉 You're Ready!

Once set up, you'll have:
- ✅ Complete visual editing control
- ✅ Real-time content preview
- ✅ Team collaboration features
- ✅ Automatic deployments
- ✅ SEO-friendly content management
- ✅ Mobile-responsive editing

Start editing your site visually at: **http://localhost:3001**

---

*Need help? Check the troubleshooting section above or refer to the detailed setup guides.*