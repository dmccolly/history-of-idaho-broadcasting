import {
  createClient,
  Entry,
  EntryCollection,
  EntrySkeletonType,
} from 'contentful'

const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN
const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master'

if (!space || !accessToken) {
  throw new Error('Contentful environment variables are missing')
}

export const contentfulClient = createClient({
  space,
  accessToken,
  environment,
})

export async function getEntries<T extends EntrySkeletonType>(
  contentType: string
): Promise<EntryCollection<T>> {
  return contentfulClient.getEntries<T>({ content_type: contentType })
}

export async function getEntry<T extends EntrySkeletonType>(
  id: string
): Promise<Entry<T>> {
  return contentfulClient.getEntry<T>(id)
}
