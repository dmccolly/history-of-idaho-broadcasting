import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

interface RSSItem {
  title?: string
  link?: string
  pubDate?: string
  contentSnippet?: string
}

export async function GET() {
  const parser = new Parser<RSSItem>()
  const feed = await parser.parseURL(
    'https://news.google.com/rss/search?q=idaho%20broadcasting&hl=en-US&gl=US&ceid=US:en'
  )
  return NextResponse.json({ items: feed.items.slice(0, 10) })
}
