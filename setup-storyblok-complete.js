#!/usr/bin/env node

const https = require('https');
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// HTTP request helper
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${parsed.error || body}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${body}`));
        }
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Content type definitions
const components = [
  {
    name: 'page',
    display_name: 'Page',
    schema: {
      title: { type: 'text', required: true },
      slug: { type: 'text', required: true },
      meta_description: { type: 'text' },
      hero_section: { 
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['hero']
      },
      content_sections: {
        type: 'bloks', 
        restrict_components: true,
        component_whitelist: ['content_section', 'features', 'cta']
      },
      seo_title: { type: 'text' }
    },
    is_root: true,
    is_nestable: false
  },
  {
    name: 'hero',
    display_name: 'Hero Section',
    schema: {
      headline: { type: 'text', required: true },
      subheadline: { type: 'textarea' },
      description: { type: 'textarea' },
      primary_button_text: { type: 'text' },
      primary_button_link: { type: 'link' },
      secondary_button_text: { type: 'text' },
      secondary_button_link: { type: 'link' },
      background_image: { type: 'asset' },
      layout_style: {
        type: 'option',
        options: [
          { name: 'Default', value: 'default' },
          { name: 'Centered', value: 'centered' },
          { name: 'Split', value: 'split' }
        ]
      }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'content_section',
    display_name: 'Content Section',
    schema: {
      title: { type: 'text' },
      content: { type: 'richtext' },
      layout: {
        type: 'option',
        options: [
          { name: 'Single Column', value: 'single_column' },
          { name: 'Two Column', value: 'two_column' },
          { name: 'Three Column', value: 'three_column' }
        ]
      },
      background_color: {
        type: 'option',
        options: [
          { name: 'White', value: 'white' },
          { name: 'Gray', value: 'gray' },
          { name: 'Dark', value: 'dark' }
        ]
      },
      image: { type: 'asset' },
      image_position: {
        type: 'option',
        options: [
          { name: 'Left', value: 'left' },
          { name: 'Right', value: 'right' },
          { name: 'Top', value: 'top' },
          { name: 'Bottom', value: 'bottom' }
        ]
      }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'features',
    display_name: 'Features Section',
    schema: {
      title: { type: 'text' },
      subtitle: { type: 'text' },
      features_list: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['feature_item']
      },
      layout: {
        type: 'option',
        options: [
          { name: 'Grid', value: 'grid' },
          { name: 'List', value: 'list' },
          { name: 'Cards', value: 'cards' }
        ]
      }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'feature_item',
    display_name: 'Feature Item',
    schema: {
      title: { type: 'text', required: true },
      description: { type: 'textarea' },
      icon: { type: 'asset' },
      link: { type: 'link' }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'cta',
    display_name: 'Call to Action',
    schema: {
      title: { type: 'text', required: true },
      description: { type: 'textarea' },
      button_text: { type: 'text' },
      button_link: { type: 'link' },
      background_color: {
        type: 'option',
        options: [
          { name: 'Primary', value: 'primary' },
          { name: 'Secondary', value: 'secondary' },
          { name: 'Dark', value: 'dark' }
        ]
      },
      layout: {
        type: 'option',
        options: [
          { name: 'Centered', value: 'centered' },
          { name: 'Split', value: 'split' }
        ]
      }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'navigation',
    display_name: 'Navigation',
    schema: {
      items: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['navigation_item']
      }
    },
    is_root: true,
    is_nestable: false
  },
  {
    name: 'navigation_item',
    display_name: 'Navigation Item',
    schema: {
      label: { type: 'text', required: true },
      href: { type: 'text', required: true },
      children: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['navigation_item']
      }
    },
    is_root: false,
    is_nestable: true
  }
];

// Story definitions
const stories = [
  {
    name: 'home',
    slug: 'home',
    content: {
      component: 'page',
      title: 'Welcome to History of Idaho Broadcasting',
      slug: 'home',
      meta_description: 'Discover the rich history of broadcasting in Idaho',
      seo_title: 'History of Idaho Broadcasting - Home',
      hero_section: [{
        component: 'hero',
        _uid: 'hero-1',
        headline: 'History of Idaho Broadcasting',
        subheadline: 'Preserving Idaho\'s Broadcasting Legacy',
        description: 'Explore the stories, people, and technology that shaped broadcasting in Idaho.',
        primary_button_text: 'Explore History',
        primary_button_link: { url: '/about', linktype: 'url' },
        layout_style: 'centered'
      }],
      content_sections: [{
        component: 'content_section',
        _uid: 'content-1',
        title: 'Our Mission',
        content: {
          type: 'doc',
          content: [{
            type: 'paragraph',
            content: [{
              type: 'text',
              text: 'The History of Idaho Broadcasting Foundation is dedicated to preserving and sharing the rich heritage of radio and television broadcasting in Idaho. We collect, archive, and present the stories of the pioneers, innovators, and everyday heroes who brought news, entertainment, and community connection to Idaho homes.'
            }]
          }]
        },
        layout: 'single_column',
        background_color: 'white'
      }]
    },
    is_startpage: true
  },
  {
    name: 'about',
    slug: 'about',
    content: {
      component: 'page',
      title: 'About Us',
      slug: 'about',
      meta_description: 'Learn about the History of Idaho Broadcasting Foundation',
      seo_title: 'About - History of Idaho Broadcasting',
      hero_section: [{
        component: 'hero',
        _uid: 'hero-about',
        headline: 'About Our Foundation',
        subheadline: 'Preserving Broadcasting History',
        description: 'Learn about our mission to preserve and share Idaho\'s broadcasting heritage.',
        layout_style: 'centered'
      }],
      content_sections: [{
        component: 'content_section',
        _uid: 'content-about',
        title: 'Our Story',
        content: {
          type: 'doc',
          content: [{
            type: 'paragraph',
            content: [{
              type: 'text',
              text: 'Founded to preserve the rich history of broadcasting in Idaho, our foundation works to collect, archive, and share the stories of radio and television pioneers who shaped communication in the Gem State.'
            }]
          }]
        },
        layout: 'single_column',
        background_color: 'white'
      }]
    }
  },
  {
    name: 'navigation',
    slug: 'navigation',
    content: {
      component: 'navigation',
      items: [
        {
          component: 'navigation_item',
          _uid: 'nav-home',
          label: 'Home',
          href: '/'
        },
        {
          component: 'navigation_item',
          _uid: 'nav-about',
          label: 'About',
          href: '/about'
        },
        {
          component: 'navigation_item',
          _uid: 'nav-events',
          label: 'Events',
          href: '/events'
        },
        {
          component: 'navigation_item',
          _uid: 'nav-blog',
          label: 'Blog',
          href: '/blog'
        }
      ]
    }
  }
];

class StoryblokManager {
  constructor(token, spaceId) {
    this.token = token;
    this.spaceId = spaceId;
    this.baseUrl = `mapi.storyblok.com`;
    this.basePath = `/v1/spaces/${spaceId}`;
  }

  async createComponent(component) {
    const options = {
      hostname: this.baseUrl,
      path: `${this.basePath}/components`,
      method: 'POST',
      headers: {
        'Authorization': this.token,
        'Content-Type': 'application/json'
      }
    };

    try {
      console.log(`Creating component: ${component.name}`);
      const result = await makeRequest(options, { component });
      console.log(`✅ Created: ${component.name}`);
      return result;
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`⚠️  Component ${component.name} already exists`);
        return null;
      }
      throw error;
    }
  }

  async createStory(story) {
    const options = {
      hostname: this.baseUrl,
      path: `${this.basePath}/stories`,
      method: 'POST',
      headers: {
        'Authorization': this.token,
        'Content-Type': 'application/json'
      }
    };

    try {
      console.log(`Creating story: ${story.name}`);
      const result = await makeRequest(options, { story });
      console.log(`✅ Created story: ${story.name}`);
      
      // Publish the story
      await this.publishStory(result.story.id);
      
      return result;
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`⚠️  Story ${story.name} already exists`);
        return null;
      }
      throw error;
    }
  }

  async publishStory(storyId) {
    const options = {
      hostname: this.baseUrl,
      path: `${this.basePath}/stories/${storyId}/publish`,
      method: 'GET',
      headers: {
        'Authorization': this.token
      }
    };

    try {
      await makeRequest(options);
      console.log(`📤 Published story: ${storyId}`);
    } catch (error) {
      console.log(`⚠️  Could not publish story ${storyId}: ${error.message}`);
    }
  }

  async setup() {
    console.log('🚀 Starting Storyblok setup...\n');

    // Create components
    console.log('📦 Creating components...');
    for (const component of components) {
      try {
        await this.createComponent(component);
      } catch (error) {
        console.error(`❌ Failed to create ${component.name}: ${error.message}`);
      }
    }

    console.log('\n📄 Creating stories...');
    for (const story of stories) {
      try {
        await this.createStory(story);
      } catch (error) {
        console.error(`❌ Failed to create ${story.name}: ${error.message}`);
      }
    }

    console.log('\n🎉 Setup complete!');
    console.log('\nNext steps:');
    console.log('1. Visit https://app.storyblok.com');
    console.log('2. Go to Settings → Visual Editor');
    console.log('3. Set preview URL: http://localhost:3001');
    console.log('4. Test your visual editor!');
  }
}

async function main() {
  console.log('🔧 Storyblok Complete Setup');
  console.log('===========================\n');
  
  console.log('You need:');
  console.log('1. Management API token (Settings → Access Tokens → Management Tokens)');
  console.log('2. Space ID (Settings → General)\n');
  
  try {
    const token = await question('Management API token: ');
    const spaceId = await question('Space ID: ');
    
    if (!token || !spaceId) {
      console.log('❌ Both token and space ID are required');
      process.exit(1);
    }
    
    console.log('');
    const manager = new StoryblokManager(token, spaceId);
    await manager.setup();
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = { StoryblokManager, components, stories };