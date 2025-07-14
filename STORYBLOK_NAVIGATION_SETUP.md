# Storyblok Navigation Setup Guide

This guide will help you set up editable navigation in Storyblok's visual editor that connects to your GitHub repository.

## Prerequisites

1. **Storyblok Account**: Create account at https://app.storyblok.com
2. **Access Token**: Get your preview token from Storyblok
3. **GitHub Integration**: Connect Storyblok to your GitHub repository

## Step 1: Configure Access Token

1. In your `.env` file, replace the placeholder with your actual Storyblok access token:
   ```
   STORYBLOK_ACCESS_TOKEN=your_actual_token_here
   ```

## Step 2: Create Content Type Blocks in Storyblok

### A. Create Navigation Content Type

1. Go to **Block Library** in your Storyblok space
2. Click **"Create new block"**
3. Choose **"Content type block"**
4. Name it: `navigation`
5. Add these fields:

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

### B. Create Navigation Item Content Type

1. Create another **"Content type block"**
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

## Step 3: Create Navigation Content

1. Go to **Content** in your Storyblok space
2. Click **"Create new"**
3. Choose **"Story"**
4. Name it: `navigation`
5. Set the slug to: `navigation`
6. Choose content type: `navigation`
7. Add your menu items:
   - HOME → `/`
   - EVENTS → `/events`
   - THE BACK CORNER → `/back-corner`
   - GALLERY → `/gallery`
   - HISTORY → `/history`
8. Set CTA text and link
9. **Publish** the story

## Step 4: Connect to GitHub (Optional but Recommended)

1. Go to **Settings** → **General**
2. Scroll to **"GitHub Integration"**
3. Connect your GitHub repository
4. This allows Storyblok to trigger builds when content changes

## Step 5: Enable Visual Editor

1. In your navigation story, click **"Visual Editor"**
2. Enter your preview URL: `http://localhost:3001` (for local development)
3. For production, use your deployed URL
4. You can now edit navigation in real-time!

## Step 6: Deploy to Production

### For Netlify/Vercel:
1. Add your `STORYBLOK_ACCESS_TOKEN` to environment variables
2. Set up webhook in Storyblok:
   - Go to **Settings** → **Webhooks**
   - Add your deploy hook URL
   - This triggers rebuilds when content changes

### For GitHub Pages:
1. Add token to GitHub Secrets
2. Update your GitHub Actions workflow to include the token

## How to Edit Navigation

### In Storyblok Visual Editor:
1. Go to your navigation story
2. Click **"Visual Editor"**
3. Edit menu items directly in the interface
4. Add/remove/reorder menu items
5. Changes appear instantly
6. Click **"Publish"** to make changes live

### Menu Item Management:
- **Add Item**: Click "+" in menu_items field
- **Reorder**: Drag and drop items
- **Edit**: Click on any item to modify
- **Delete**: Click trash icon

## Benefits of This Setup

✅ **Visual Editing**: Edit navigation without touching code
✅ **Real-time Preview**: See changes instantly
✅ **GitHub Integration**: Automatic deployments
✅ **Fallback**: Site works even without Storyblok
✅ **Team Friendly**: Non-developers can edit navigation
✅ **Version Control**: Storyblok tracks content changes

## Troubleshooting

**Navigation not loading?**
- Check your access token in `.env`
- Ensure navigation story exists with slug `navigation`
- Check browser console for errors

**Visual editor not working?**
- Verify preview URL is correct
- Ensure dev server is running
- Check CORS settings if needed

**Changes not deploying?**
- Verify webhook is set up correctly
- Check deployment logs
- Ensure environment variables are set in production

## Next Steps

1. Set up your Storyblok access token
2. Create the content types as described
3. Create your navigation content
4. Test the visual editor
5. Deploy to production with webhooks

Once set up, you'll be able to edit your site's navigation entirely through Storyblok's cloud interface!