'use client'

import { useEffect, useState } from 'react'

interface RSSItem {
  title?: string
  link?: string
  pubDate?: string
  contentSnippet?: string
}

export default function GoogleNewsFeed() {
  const [items, setItems] = useState<RSSItem[]>([])

  useEffect(() => {
    fetch('/api/google-news')
      .then(res => res.json())
      .then(data => setItems(data.items || []))
      .catch(() => setItems([]))
  }, [])

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-playfair-display text-slate-800">Broadcasting News</h2>
            <p className="text-xl text-slate-500">Latest headlines via Google News</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map(item => (
              <article key={item.link} className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition duration-300 ease-in-out">
                <header className="mb-4">
                  <h3 className="h4 font-playfair-display mb-2">
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:text-blue-600 transition duration-150 ease-in-out">
                      {item.title}
                    </a>
                  </h3>
                  {item.pubDate && (
                    <p className="text-sm text-slate-500">{new Date(item.pubDate).toLocaleDateString()}</p>
                  )}
                </header>
                {item.contentSnippet && <p className="text-slate-600 leading-relaxed">{item.contentSnippet}</p>}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
