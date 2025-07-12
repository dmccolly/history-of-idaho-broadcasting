import { createClient } from 'contentful'

const space = process.env.CONTENTFUL_SPACE_ID || ''
const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN || ''

export const contentfulClient = createClient({
  space,
  accessToken,
})

export async function getEntries(contentType: string) {
  if (!space || !accessToken) {
    throw new Error('Contentful environment variables are missing')
  }
  return contentfulClient.getEntries({ content_type: contentType })
}
