// Simple test to verify Storyblok credentials
const https = require('https');

const managementToken = process.argv[2] || process.env.STORYBLOK_ACCESS_TOKEN;
const spaceId = process.argv[3] || process.env.STORYBLOK_SPACE_ID;

console.log('Testing Storyblok credentials...');
console.log(`Token: ${managementToken ? managementToken.substring(0, 8) : 'undefined'}...`);
console.log(`Space ID: ${spaceId}`);

const options = {
  hostname: 'mapi.storyblok.com',
  port: 443,
  path: `/v1/spaces/${spaceId}/components`,
  method: 'GET',
  headers: {
    'Authorization': managementToken,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Credentials are valid!');
      const response = JSON.parse(data);
      console.log(`Found ${response.components ? response.components.length : 0} components`);
    } else {
      console.log('❌ Error:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error.message);
});

req.end();

// This change ensures the script uses the .env values if no CLI args are provided