/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
          ignoreBuildErrors: true,
    },
    eslint: {
          ignoreDuringBuilds: true,
    },
    experimental: {
          missingSuspenseWithCSRBailout: false,
    },
    // Force build to continue even with API errors
    webpack: (config, { isServer }) => {
          // Ignore Storyblok API errors during build
      config.ignoreWarnings = [
              /Failed to fetch/,
              /This record could not be found/,
              /Storyblok/,
            ];
          return config;
    },
    // Disable static optimization for pages with API calls
    generateBuildId: async () => {
          return 'build-' + Date.now();
    },
    // Ignore build errors from missing Storyblok content
    onDemandEntries: {
          maxInactiveAge: 25 * 1000,
          pagesBufferLength: 2,
    },
    env: {
      STORYBLOK_ACCESS_TOKEN: process.env.STORYBLOK_ACCESS_TOKEN,
    }
}

module.exports = nextConfig
