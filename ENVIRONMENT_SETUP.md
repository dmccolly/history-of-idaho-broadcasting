# Environment Variables Setup Guide

This guide explains how to set up the required environment variables for the History of Idaho Broadcasting website.

## Required Environment Variables

The website requires the following environment variables to function properly:

1. **STORYBLOK_ACCESS_TOKEN** - Access token for the Storyblok API
2. **STORYBLOK_SPACE_ID** - ID of your Storyblok space
3. **NEXT_PUBLIC_SUPABASE_URL** - URL of your Supabase project (if using Supabase)
4. **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Anonymous key for Supabase authentication (if using Supabase)

## Setting Up Environment Variables in Netlify

1. **Log in to Netlify**:
   - Go to [https://app.netlify.com/](https://app.netlify.com/)
   - Log in to your account

2. **Navigate to Your Site**:
   - Select your site from the dashboard

3. **Access Environment Variables**:
   - Click on "Site settings" in the top navigation
   - In the left sidebar, click on "Environment variables"

4. **Add Environment Variables**:
   - Click "Add a variable"
   - Select "Add a single variable"
   - Enter the key (e.g., `STORYBLOK_ACCESS_TOKEN`) and its value
   - Repeat for all required variables

5. **Redeploy Your Site**:
   - After adding all variables, go to the "Deploys" tab
   - Click "Trigger deploy" > "Deploy site"
   - This will rebuild your site with the new environment variables

## Getting Your Storyblok Access Token

1. **Log in to Storyblok**:
   - Go to [https://app.storyblok.com/](https://app.storyblok.com/)
   - Log in to your account

2. **Access Your Space**:
   - Select your space from the dashboard

3. **Get Access Token**:
   - Click on "Settings" in the top navigation
   - In the left sidebar, click on "API Keys"
   - Find your Preview API Key (for development) or Public API Key (for production)
   - Copy the token

4. **Get Space ID**:
   - The Space ID is visible in the URL when you're in your space
   - The URL format is: `https://app.storyblok.com/#/me/spaces/SPACE_ID/dashboard`
   - Copy the number that appears in place of `SPACE_ID`

## Local Development Setup

For local development:

1. **Create a `.env.local` File**:
   - Copy the `.env.local.example` file to `.env.local`
   - Fill in your actual values for each variable

2. **Start the Development Server**:
   - Run `npm install` to install dependencies
   - Run `npm run dev` to start the development server
   - The site should now be running with your environment variables

## Troubleshooting

If you encounter issues with environment variables:

1. **Check Variable Names**:
   - Ensure variable names are exactly as specified (case-sensitive)

2. **Verify Values**:
   - Double-check that token values are correct and complete

3. **Rebuild After Changes**:
   - Always trigger a new deploy after changing environment variables

4. **Check Build Logs**:
   - If issues persist, check the build logs in Netlify for specific errors

5. **Local vs. Production**:
   - Remember that `.env.local` is only for local development
   - Production environment variables must be set in Netlify

## Security Notes

- Never commit your actual tokens to the repository
- Use environment variables for all sensitive information
- Restrict access to your Netlify and Storyblok accounts
- Regularly rotate your access tokens for better security