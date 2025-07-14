// Get space info from preview token
const https = require('https');

const previewToken = 'tNqtjK1vM36qpg6XDJmvsgtt';

console.log('Getting space info from preview token...');

// Try to get space info from CDN API
const options = {
  hostname: 'api.storyblok.com',
  port: 443,
  path: `/v2/cdn/spaces/me?token=${previewToken}`,
  method: 'GET',
  headers: {
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
      const response = JSON.parse(data);
      console.log('✅ Space info retrieved!');
      console.log('Space ID:', response.space?.id);
      console.log('Space Name:', response.space?.name);
      console.log('Domain:', response.space?.domain);
    } else {
      console.log('❌ Error:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error.message);
});

req.end();