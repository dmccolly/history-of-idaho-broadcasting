#!/usr/bin/env node

/**
 * Storyblok Setup Helper Script
 * 
 * This script helps you set up your Storyblok access token in the .env file.
 * Run with: node setup-storyblok.js
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function updateEnvFile(token) {
  const envPath = path.join(__dirname, '.env')
  
  try {
    let envContent = ''
    
    // Read existing .env file if it exists
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8')
    }
    
    // Check if STORYBLOK_ACCESS_TOKEN already exists
    if (envContent.includes('STORYBLOK_ACCESS_TOKEN=')) {
      // Replace existing token
      envContent = envContent.replace(
        /STORYBLOK_ACCESS_TOKEN=.*/,
        `STORYBLOK_ACCESS_TOKEN=${token}`
      )
    } else {
      // Add new token
      if (envContent && !envContent.endsWith('\n')) {
        envContent += '\n'
      }
      envContent += `\n# Storyblok Configuration\nSTORYBLOK_ACCESS_TOKEN=${token}\n`
    }
    
    // Write updated content
    fs.writeFileSync(envPath, envContent)
    
    console.log('✅ Successfully updated .env file with your Storyblok access token!')
    console.log('\n🚀 Next steps:')
    console.log('1. Restart your development server (npm run dev)')
    console.log('2. Go to your Storyblok space and create content')
    console.log('3. Visit your site to see the visual editor in action!')
    
  } catch (error) {
    console.error('❌ Error updating .env file:', error.message)
  }
}

function validateToken(token) {
  // Basic validation - Storyblok tokens are typically long alphanumeric strings
  if (!token || token.length < 20) {
    return false
  }
  
  // Check if it's still a placeholder
  const placeholders = [
    'your_storyblok_access_token_here',
    'your_access_token_here',
    'your_actual_token_here',
    'your_actual_preview_token_here'
  ]
  
  return !placeholders.includes(token.toLowerCase())
}

console.log('🎨 Storyblok Visual Editor Setup')
console.log('================================\n')
console.log('This script will help you configure your Storyblok access token.\n')
console.log('📋 To get your access token:')
console.log('1. Go to https://app.storyblok.com')
console.log('2. Navigate to Settings → Access Tokens')
console.log('3. Copy your Preview access token\n')

rl.question('🔑 Please enter your Storyblok access token: ', (token) => {
  const trimmedToken = token.trim()
  
  if (!validateToken(trimmedToken)) {
    console.log('\n❌ Invalid token. Please make sure you\'re using a valid Storyblok access token.')
    console.log('   Tokens should be long alphanumeric strings, not placeholders.\n')
    rl.close()
    return
  }
  
  updateEnvFile(trimmedToken)
  rl.close()
})

rl.on('close', () => {
  console.log('\n👋 Setup complete! Happy editing with Storyblok!')
  process.exit(0)
})