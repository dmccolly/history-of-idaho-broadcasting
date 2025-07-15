require('dotenv').config();
const https = require('https');

const managementToken = process.env.STORYBLOK_ACCESS_TOKEN;
const spaceId = process.env.STORYBLOK_SPACE_ID;

console.log('Testing Storyblok credentials...');
console.log(`Token: ${managementToken ? managementToken.substring(0, 8) : 'undefined'}...`);
console.log(`Space ID: ${spaceId}`);

const options = {
  hostname: 'api.storyblok.com',
  path: '/v2/cdn/stories/navigation',
  method: 'GET',
  headers: {
    'Authorization': managementToken
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();