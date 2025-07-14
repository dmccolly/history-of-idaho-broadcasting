const axios = require('axios');
require('dotenv').config();

// Get access token from environment
const ACCESS_TOKEN = process.env.STORYBLOK_ACCESS_TOKEN;

if (!ACCESS_TOKEN || ACCESS_TOKEN === 'your_storyblok_access_token_here') {
  console.error('❌ Please set STORYBLOK_ACCESS_TOKEN in your .env file');
  process.exit(1);
}

// For this demo, we'll use a common space ID pattern
// In production, you'd get this from Storyblok settings
const SPACE_ID = '123456'; // This will need to be updated with actual space ID

const STORYBLOK_MANAGEMENT_API = 'https://mapi.storyblok.com/v1';

// Simple content creation using the preview API
const STORYBLOK_API = 'https://api.storyblok.com/v2/cdn';

async function checkStoryblokConnection() {
  try {
    console.log('🔍 Checking Storyblok connection...');
    
    // Try to fetch stories to verify connection
    const response = await axios.get(`${STORYBLOK_API}/stories`, {
      params: {
        token: ACCESS_TOKEN,
        version: 'draft'
      }
    });
    
    console.log('✅ Successfully connected to Storyblok!');
    console.log(`📊 Found ${response.data.stories.length} existing stories`);
    
    // List existing stories
    if (response.data.stories.length > 0) {
      console.log('\n📄 Existing stories:');
      response.data.stories.forEach(story => {
        console.log(`  - ${story.name} (${story.content.component || 'no component'})`);
      });
    }
    
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to Storyblok:');
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Message: ${error.response.data?.error || error.response.statusText}`);
    } else {
      console.error(`   Error: ${error.message}`);
    }
    return false;
  }
}

async function createSampleContent() {
  console.log('\n📝 Creating sample content structure...');
  
  // Create a simple JSON file with the content structure
  const contentStructure = {
    contentTypes: [
      {
        name: 'page',
        description: 'Main page content type',
        fields: [
          'title (Text, Required)',
          'slug (Text, Required)', 
          'meta_description (Text)',
          'hero_section (Blocks, Allow: hero)',
          'content_sections (Blocks, Allow: content_section, features, cta)',
          'seo_title (Text)'
        ]
      },
      {
        name: 'hero',
        description: 'Hero section component',
        fields: [
          'headline (Text, Required)',
          'subheadline (Textarea)',
          'description (Textarea)',
          'primary_button_text (Text)',
          'primary_button_link (Link)',
          'secondary_button_text (Text)',
          'secondary_button_link (Link)',
          'background_image (Asset)',
          'layout_style (Option: default, centered, split)'
        ]
      },
      {
        name: 'content_section',
        description: 'Flexible content section',
        fields: [
          'title (Text)',
          'content (Richtext)',
          'layout (Option: single_column, two_column, three_column)',
          'background_color (Option: white, gray, dark)',
          'image (Asset)',
          'image_position (Option: left, right, top, bottom)'
        ]
      },
      {
        name: 'features',
        description: 'Features section',
        fields: [
          'title (Text)',
          'subtitle (Text)',
          'features_list (Blocks, Allow: feature_item)',
          'layout (Option: grid, list, cards)'
        ]
      },
      {
        name: 'feature_item',
        description: 'Individual feature item',
        fields: [
          'title (Text, Required)',
          'description (Textarea)',
          'icon (Asset)',
          'link (Link)'
        ]
      },
      {
        name: 'cta',
        description: 'Call to action section',
        fields: [
          'title (Text, Required)',
          'description (Textarea)',
          'button_text (Text)',
          'button_link (Link)',
          'background_color (Option: primary, secondary, dark)',
          'layout (Option: centered, split)'
        ]
      },
      {
        name: 'navigation',
        description: 'Site navigation',
        fields: [
          'items (Blocks, Allow: navigation_item)'
        ]
      },
      {
        name: 'navigation_item',
        description: 'Navigation menu item',
        fields: [
          'label (Text, Required)',
          'href (Text, Required)',
          'children (Blocks, Allow: navigation_item)'
        ]
      }
    ],
    sampleContent: {
      home: {
        component: 'page',
        title: 'Welcome to History of Idaho Broadcasting',
        slug: 'home',
        meta_description: 'Discover the rich history of broadcasting in Idaho',
        seo_title: 'History of Idaho Broadcasting - Home'
      },
      about: {
        component: 'page',
        title: 'About Us',
        slug: 'about',
        meta_description: 'Learn about the History of Idaho Broadcasting Foundation'
      },
      navigation: {
        component: 'navigation',
        items: [
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Events', href: '/events' },
          { label: 'Blog', href: '/blog' }
        ]
      }
    },
    instructions: {
      step1: 'Go to https://app.storyblok.com',
      step2: 'Navigate to Block Library',
      step3: 'Create each content type listed above with the specified fields',
      step4: 'Go to Content section',
      step5: 'Create stories using the sample content structure',
      step6: 'Enable Visual Editor with preview URL: http://localhost:3001'
    }
  };
  
  // Write the structure to a JSON file
  const fs = require('fs');
  fs.writeFileSync(
    'storyblok-content-structure.json', 
    JSON.stringify(contentStructure, null, 2)
  );
  
  console.log('✅ Created storyblok-content-structure.json with complete setup guide');
  
  return contentStructure;
}

async function main() {
  console.log('🚀 Storyblok Auto-Setup Tool');
  console.log('============================\n');
  
  // Check connection first
  const connected = await checkStoryblokConnection();
  
  if (connected) {
    // Create content structure guide
    const structure = await createSampleContent();
    
    console.log('\n🎯 Next Steps:');
    console.log('==============');
    console.log('1. ✅ Your Storyblok access token is working');
    console.log('2. 📋 Review the generated storyblok-content-structure.json file');
    console.log('3. 🏗️  Go to https://app.storyblok.com and create the content types');
    console.log('4. 📄 Create initial stories using the sample content');
    console.log('5. 👁️  Enable Visual Editor with preview URL: http://localhost:3001');
    console.log('\n💡 Tip: The JSON file contains the exact field specifications for each content type!');
    
  } else {
    console.log('\n❌ Please check your Storyblok access token and try again.');
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Verify your token in the .env file');
    console.log('   2. Make sure you\'re using a Preview token (not Management token)');
    console.log('   3. Check that your Storyblok space is active');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkStoryblokConnection, createSampleContent };