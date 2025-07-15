const axios = require('axios');
const readline = require('readline');

// Storyblok Management API configuration
const STORYBLOK_MANAGEMENT_API = 'https://mapi.storyblok.com/v1';

// Get user input for management token
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Content type definitions
const contentTypes = [
  {
    name: 'page',
    display_name: 'Page',
    schema: {
      title: {
        type: 'text',
        required: true,
        display_name: 'Title'
      },
      slug: {
        type: 'text',
        required: true,
        display_name: 'Slug'
      },
      meta_description: {
        type: 'text',
        display_name: 'Meta Description'
      },
      hero_section: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['hero'],
        display_name: 'Hero Section'
      },
      content_sections: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['content_section', 'features', 'cta'],
        display_name: 'Content Sections'
      },
      seo_title: {
        type: 'text',
        display_name: 'SEO Title'
      }
    }
  },
  {
    name: 'hero',
    display_name: 'Hero',
    schema: {
      headline: {
        type: 'text',
        required: true,
        display_name: 'Headline'
      },
      subheadline: {
        type: 'textarea',
        display_name: 'Subheadline'
      },
      description: {
        type: 'textarea',
        display_name: 'Description'
      },
      primary_button_text: {
        type: 'text',
        display_name: 'Primary Button Text'
      },
      primary_button_link: {
        type: 'link',
        display_name: 'Primary Button Link'
      },
      secondary_button_text: {
        type: 'text',
        display_name: 'Secondary Button Text'
      },
      secondary_button_link: {
        type: 'link',
        display_name: 'Secondary Button Link'
      },
      background_image: {
        type: 'asset',
        display_name: 'Background Image'
      },
      layout_style: {
        type: 'option',
        options: [
          { name: 'Default', value: 'default' },
          { name: 'Centered', value: 'centered' },
          { name: 'Split', value: 'split' }
        ],
        display_name: 'Layout Style'
      }
    }
  },
  {
    name: 'content_section',
    display_name: 'Content Section',
    schema: {
      title: {
        type: 'text',
        display_name: 'Title'
      },
      content: {
        type: 'richtext',
        display_name: 'Content'
      },
      layout: {
        type: 'option',
        options: [
          { name: 'Single Column', value: 'single_column' },
          { name: 'Two Column', value: 'two_column' },
          { name: 'Three Column', value: 'three_column' }
        ],
        display_name: 'Layout'
      },
      background_color: {
        type: 'option',
        options: [
          { name: 'White', value: 'white' },
          { name: 'Gray', value: 'gray' },
          { name: 'Dark', value: 'dark' }
        ],
        display_name: 'Background Color'
      },
      image: {
        type: 'asset',
        display_name: 'Image'
      },
      image_position: {
        type: 'option',
        options: [
          { name: 'Left', value: 'left' },
          { name: 'Right', value: 'right' },
          { name: 'Top', value: 'top' },
          { name: 'Bottom', value: 'bottom' }
        ],
        display_name: 'Image Position'
      }
    }
  },
  {
    name: 'features',
    display_name: 'Features',
    schema: {
      title: {
        type: 'text',
        display_name: 'Title'
      },
      subtitle: {
        type: 'text',
        display_name: 'Subtitle'
      },
      features_list: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['feature_item'],
        display_name: 'Features List'
      },
      layout: {
        type: 'option',
        options: [
          { name: 'Grid', value: 'grid' },
          { name: 'List', value: 'list' },
          { name: 'Cards', value: 'cards' }
        ],
        display_name: 'Layout'
      }
    }
  },
  {
    name: 'feature_item',
    display_name: 'Feature Item',
    schema: {
      title: {
        type: 'text',
        required: true,
        display_name: 'Title'
      },
      description: {
        type: 'textarea',
        display_name: 'Description'
      },
      icon: {
        type: 'asset',
        display_name: 'Icon'
      },
      link: {
        type: 'link',
        display_name: 'Link'
      }
    }
  },
  {
    name: 'cta',
    display_name: 'Call to Action',
    schema: {
      title: {
        type: 'text',
        required: true,
        display_name: 'Title'
      },
      description: {
        type: 'textarea',
        display_name: 'Description'
      },
      button_text: {
        type: 'text',
        display_name: 'Button Text'
      },
      button_link: {
        type: 'link',
        display_name: 'Button Link'
      },
      background_color: {
        type: 'option',
        options: [
          { name: 'Primary', value: 'primary' },
          { name: 'Secondary', value: 'secondary' },
          { name: 'Dark', value: 'dark' }
        ],
        display_name: 'Background Color'
      },
      layout: {
        type: 'option',
        options: [
          { name: 'Centered', value: 'centered' },
          { name: 'Split', value: 'split' }
        ],
        display_name: 'Layout'
      }
    }
  },
  {
    name: 'station_card',
    display_name: 'Station Card',
    schema: {
      title: { type: 'text', display_name: 'Title', required: true },
      content: { type: 'richtext', display_name: 'Content' },
      image: { type: 'asset', display_name: 'Image' }
    }
  },
  {
    name: 'history_section',
    display_name: 'History Section',
    schema: {
      content: { type: 'richtext', display_name: 'Content' },
      station_cards: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['station_card'],
        display_name: 'Station Cards'
      }
    }
  },
  {
    name: 'navigation',
    display_name: 'Navigation',
    schema: {
      items: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['navigation_item'],
        display_name: 'Navigation Items'
      }
    }
  },
  {
    name: 'navigation_item',
    display_name: 'Navigation Item',
    schema: {
      label: {
        type: 'text',
        required: true,
        display_name: 'Label'
      },
      href: {
        type: 'text',
        required: true,
        display_name: 'Link (href)'
      },
      children: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['navigation_item'],
        display_name: 'Sub-items'
      }
    }
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
        headline: 'History of Idaho Broadcasting',
        subheadline: 'Preserving Idaho\'s Broadcasting Legacy',
        description: 'Explore the stories, people, and technology that shaped broadcasting in Idaho.',
        primary_button_text: 'Explore History',
        primary_button_link: { url: '/about' },
        layout_style: 'centered'
      }],
      content_sections: [{
        component: 'content_section',
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
    }
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
        headline: 'About Our Foundation',
        subheadline: 'Preserving Broadcasting History',
        description: 'Learn about our mission to preserve and share Idaho\'s broadcasting heritage.',
        layout_style: 'centered'
      }],
      content_sections: [{
        component: 'content_section',
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
    name: "history",
    slug: "history",
    content: {
      component: "page",
      title: "Broadcast History",
      slug: "history",
      meta_description: "Historical overview of Idaho radio stations",
      seo_title: "Idaho Broadcasting History",
      content_sections: [
        {
          component: "history_section",
          content: {
            type: "doc",
            content: [{ type: "paragraph", content: [{ type: "text", text: "Historical notes go here." }] }]
          },
          station_cards: []
        }
      ]
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
          label: 'Home',
          href: '/'
        },
        {
          component: 'navigation_item',
          label: 'About',
          href: '/about'
        },
        {
          component: 'navigation_item',
          label: 'Events',
          href: '/events'
        },
        {
          component: 'navigation_item',
          label: 'Blog',
          href: '/blog'
        }
      ]
    }
  }
];

class StoryblokSetup {
  constructor(managementToken, spaceId) {
    this.managementToken = managementToken;
    this.spaceId = spaceId;
    this.baseURL = `${STORYBLOK_MANAGEMENT_API}/spaces/${spaceId}`;
    this.headers = {
      'Authorization': managementToken,
      'Content-Type': 'application/json'
    };
  }

  async createComponent(componentData) {
    try {
      console.log(`Creating component: ${componentData.name}`);
      const response = await axios.post(
        `${this.baseURL}/components`,
        { component: componentData },
        { headers: this.headers }
      );
      console.log(`✅ Created component: ${componentData.name}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 422 && error.response?.data?.error?.includes('already exists')) {
        console.log(`⚠️  Component ${componentData.name} already exists, skipping...`);
        return null;
      }
      console.error(`❌ Error creating component ${componentData.name}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async createStory(storyData) {
    try {
      console.log(`Creating story: ${storyData.name}`);
      const response = await axios.post(
        `${this.baseURL}/stories`,
        { story: storyData },
        { headers: this.headers }
      );
      console.log(`✅ Created story: ${storyData.name}`);
      
      // Publish the story
      const storyId = response.data.story.id;
      await this.publishStory(storyId);
      
      return response.data;
    } catch (error) {
      if (error.response?.status === 422 && error.response?.data?.error?.includes('already exists')) {
        console.log(`⚠️  Story ${storyData.name} already exists, skipping...`);
        return null;
      }
      console.error(`❌ Error creating story ${storyData.name}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async publishStory(storyId) {
    try {
      await axios.get(
        `${this.baseURL}/stories/${storyId}/publish`,
        { headers: this.headers }
      );
      console.log(`📤 Published story ID: ${storyId}`);
    } catch (error) {
      console.error(`❌ Error publishing story ${storyId}:`, error.response?.data || error.message);
    }
  }

  async setupStoryblok() {
    console.log('🚀 Starting Storyblok setup...');
    console.log('');

    try {
      // Create components first
      console.log('📦 Creating content type components...');
      for (const contentType of contentTypes) {
        await this.createComponent(contentType);
      }
      
      console.log('');
      console.log('📄 Creating initial stories...');
      
      // Create stories
      for (const story of stories) {
        await this.createStory(story);
      }
      
      console.log('');
      console.log('🎉 Storyblok setup completed successfully!');
      console.log('');
      console.log('Next steps:');
      console.log('1. Visit https://app.storyblok.com to see your content');
      console.log('2. Go to Settings → Visual Editor');
      console.log('3. Set preview URL to: http://localhost:3001');
      console.log('4. Test the visual editor with your stories');
      console.log('5. Your site should now load content from Storyblok!');
      
    } catch (error) {
      console.error('❌ Setup failed:', error.message);
      process.exit(1);
    }
  }
}

async function main() {
  console.log('🔧 Storyblok Content Setup Tool');
  console.log('================================');
  console.log('');
  console.log('This tool will create all content types and initial content in your Storyblok space.');
  console.log('');
  console.log('You will need:');
  console.log('1. Management API token (from Settings → Access Tokens → Management Tokens)');
  console.log('2. Space ID (from Settings → General)');
  console.log('');
  
  try {
    const managementToken = await askQuestion('Enter your Storyblok Management API token: ');
    const spaceId = await askQuestion('Enter your Storyblok Space ID: ');
    
    if (!managementToken || !spaceId) {
      console.log('❌ Management token and Space ID are required.');
      process.exit(1);
    }
    
    console.log('');
    const setup = new StoryblokSetup(managementToken, spaceId);
    await setup.setupStoryblok();
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = { StoryblokSetup, contentTypes, stories };
