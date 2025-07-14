const axios = require('axios');

// Get command line arguments
const managementToken = process.argv[2];
const spaceId = process.argv[3];

if (!managementToken || !spaceId) {
  console.log('Usage: node setup-storyblok-automated.js <management_token> <space_id>');
  console.log('Example: node setup-storyblok-automated.js N3ntRLBQ29VEjNXXJLz2Agtt 285765618421794');
  process.exit(1);
}

console.log('🔧 Storyblok Automated Setup');
console.log(`Management Token: ${managementToken.substring(0, 8)}...`);
console.log(`Space ID: ${spaceId}`);
console.log('\n🚀 Starting Storyblok setup...\n');

const baseURL = `https://mapi.storyblok.com/v1/spaces/${spaceId}`;
const headers = {
  'Authorization': managementToken,
  'Content-Type': 'application/json'
};

// Component definitions
const components = [
  {
    name: 'page',
    display_name: 'Page',
    schema: {
      title: { type: 'text', required: true },
      slug: { type: 'text', required: true },
      meta_description: { type: 'text' },
      hero_section: { type: 'bloks', restrict_components: true, component_whitelist: ['hero'] },
      content_sections: { type: 'bloks', restrict_components: true, component_whitelist: ['content_section', 'features', 'cta'] },
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
      background_image: { type: 'asset', filetypes: ['images'] },
      layout_style: { type: 'option', options: [{ name: 'Default', value: 'default' }, { name: 'Centered', value: 'centered' }, { name: 'Split', value: 'split' }] }
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
      layout: { type: 'option', options: [{ name: 'Single Column', value: 'single_column' }, { name: 'Two Column', value: 'two_column' }, { name: 'Three Column', value: 'three_column' }] },
      background_color: { type: 'option', options: [{ name: 'White', value: 'white' }, { name: 'Gray', value: 'gray' }, { name: 'Dark', value: 'dark' }] },
      image: { type: 'asset', filetypes: ['images'] },
      image_position: { type: 'option', options: [{ name: 'Left', value: 'left' }, { name: 'Right', value: 'right' }, { name: 'Top', value: 'top' }, { name: 'Bottom', value: 'bottom' }] }
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
      features_list: { type: 'bloks', restrict_components: true, component_whitelist: ['feature_item'] },
      layout: { type: 'option', options: [{ name: 'Grid', value: 'grid' }, { name: 'List', value: 'list' }, { name: 'Cards', value: 'cards' }] }
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
      icon: { type: 'asset', filetypes: ['images'] },
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
      background_color: { type: 'option', options: [{ name: 'Primary', value: 'primary' }, { name: 'Secondary', value: 'secondary' }, { name: 'Dark', value: 'dark' }] },
      layout: { type: 'option', options: [{ name: 'Centered', value: 'centered' }, { name: 'Split', value: 'split' }] }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'navigation',
    display_name: 'Navigation',
    schema: {
      items: { type: 'bloks', restrict_components: true, component_whitelist: ['navigation_item'] }
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
      children: { type: 'bloks', restrict_components: true, component_whitelist: ['navigation_item'] }
    },
    is_root: false,
    is_nestable: true
  }
];

// Stories to create
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
        subheadline: 'Preserving the Legacy of Idaho\'s Broadcasting Heritage',
        description: 'Explore the rich history and evolution of radio and television broadcasting in Idaho.',
        primary_button_text: 'Learn More',
        primary_button_link: { url: '/about' },
        layout_style: 'centered'
      }],
      content_sections: [{
        component: 'content_section',
        title: 'Our Mission',
        content: '<p>The History of Idaho Broadcasting Foundation is dedicated to preserving and sharing the stories of Idaho\'s broadcasting pioneers and their contributions to our state\'s media landscape.</p>',
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
      hero_section: [{
        component: 'hero',
        headline: 'About Our Foundation',
        description: 'Learn about our mission to preserve Idaho\'s broadcasting heritage.',
        layout_style: 'centered'
      }],
      content_sections: [{
        component: 'content_section',
        title: 'Our Story',
        content: '<p>Founded to preserve the rich history of broadcasting in Idaho, our foundation collects and shares stories from the pioneers who shaped our state\'s media landscape.</p>',
        layout: 'single_column'
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

async function createComponent(component) {
  try {
    console.log(`Creating component: ${component.name}`);
    const response = await axios.post(`${baseURL}/components`, {
      component: component
    }, { headers });
    console.log(`✅ Created ${component.name}`);
    return response.data;
  } catch (error) {
    console.log(`❌ Failed to create ${component.name}: HTTP ${error.response?.status}: ${error.response?.statusText}`);
    if (error.response?.data) {
      console.log('Error details:', error.response.data);
    }
    return null;
  }
}

async function createStory(story) {
  try {
    console.log(`Creating story: ${story.name}`);
    const response = await axios.post(`${baseURL}/stories`, {
      story: story
    }, { headers });
    console.log(`✅ Created ${story.name}`);
    return response.data;
  } catch (error) {
    console.log(`❌ Failed to create ${story.name}: HTTP ${error.response?.status}: ${error.response?.statusText}`);
    if (error.response?.data) {
      console.log('Error details:', error.response.data);
    }
    return null;
  }
}

async function main() {
  console.log('📦 Creating components...');
  for (const component of components) {
    await createComponent(component);
  }

  console.log('\n📄 Creating stories...');
  for (const story of stories) {
    await createStory(story);
  }

  console.log('\n🎉 Setup complete!');
  console.log('\nNext steps:');
  console.log('1. Visit https://app.storyblok.com');
  console.log('2. Go to Settings → Visual Editor');
  console.log('3. Set preview URL: http://localhost:3001');
  console.log('4. Test your visual editor!');
}

main().catch(console.error);