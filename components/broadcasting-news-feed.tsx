'use client'

import { useState } from 'react'

interface NewsItem {
  id: number
  title: string
  excerpt: string
  source: string
  date: string
  category: 'industry' | 'local' | 'social'
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Idaho Public Television Opens Boise Studio",
    excerpt: "Idaho Public Television unveiled a state-of-the-art production facility in downtown Boise, expanding opportunities for local programming and community outreach.",
    source: "Idaho Press",
    date: "July 11, 2025",
    category: "local"
  },
  {
    id: 2,
    title: "KTVB Marks 70 Years Serving the Treasure Valley",
    excerpt: "Boise's NBC affiliate celebrated its 70th anniversary with a week of on-air retrospectives and a community open house at the station.",
    source: "BoiseDev",
    date: "July 10, 2025",
    category: "local"
  },
  {
    id: 3,
    title: "Boise State Public Radio Names New Morning Edition Host",
    excerpt: "The station announced journalist Alex Jensen will take over hosting duties, bringing fresh energy to the daily news program.",
    source: "Boise State Public Radio",
    date: "July 9, 2025",
    category: "local"
  },
  {
    id: 4,
    title: "Veteran Anchor Retires from Spokane's KXLY-TV",
    excerpt: "After more than four decades on the air, KXLY anchor Mark Peterson signed off for the final time, prompting tributes from viewers across the Inland Northwest.",
    source: "Spokesman-Review",
    date: "July 8, 2025",
    category: "local"
  },
  {
    id: 5,
    title: "FCC Opens Comment Period on AM Radio Revitalization",
    excerpt: "Regulators are seeking input on new proposals aimed at strengthening AM broadcasting, including potential technical upgrades and streamlined licensing.",
    source: "Radio World",
    date: "July 11, 2025",
    category: "industry"
  },
  {
    id: 6,
    title: "NAB Petitions FCC Over Proposed Ownership Rules",
    excerpt: "The National Association of Broadcasters filed a formal petition urging the commission to reconsider limits on local station ownership.",
    source: "Broadcasting & Cable",
    date: "July 11, 2025",
    category: "industry"
  },
  {
    id: 7,
    title: "PBS Expands Grants for Rural Stations",
    excerpt: "A new initiative from PBS will provide additional funding for smaller rural stations to upgrade equipment and develop local content.",
    source: "Current",
    date: "July 10, 2025",
    category: "industry"
  },
  {
    id: 8,
    title: "Community Broadcasters Raise Funds for Northwest Wildfire Relief",
    excerpt: "Radio and TV stations across Idaho and Washington joined forces in a day-long fundraiser to support wildfire recovery efforts.",
    source: "Radio Ink",
    date: "July 10, 2025",
    category: "social"
  },
  {
    id: 9,
    title: "Streaming Surge Drives Radio Format Shifts",
    excerpt: "A recent study shows streaming listening habits are reshaping traditional radio formats as broadcasters adapt to audience preferences.",
    source: "Inside Radio",
    date: "July 11, 2025",
    category: "social"
  },
  {
    id: 10,
    title: "Podcast Advertising Boom Spurs New Metrics Initiative",
    excerpt: "Industry groups are collaborating on a standardized approach to podcast audience measurement amid rapid growth in ad spending.",
    source: "AdWeek",
    date: "July 10, 2025",
    category: "industry"
  },
  {
    id: 11,
    title: "Scripps Stations Launch NextGen TV in Phoenix",
    excerpt: "The rollout brings enhanced picture quality and interactive features to viewers as part of the ATSC 3.0 expansion.",
    source: "TV Tech",
    date: "July 11, 2025",
    category: "industry"
  },
  {
    id: 12,
    title: "Radio Hall of Fame Announces 2025 Inductees",
    excerpt: "This year's class includes a mix of legendary talk show hosts and innovators in digital audio.",
    source: "Radio Hall of Fame",
    date: "July 9, 2025",
    category: "social"
  }
]

const categoryColors = {
  industry: 'bg-blue-100 text-blue-800',
  local: 'bg-green-100 text-green-800',
  social: 'bg-purple-100 text-purple-800'
}

const categoryLabels = {
  industry: 'Industry',
  local: 'Local',
  social: 'Social'
}

export default function BroadcastingNewsFeed() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(item => item.category === selectedCategory)

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-playfair-display text-slate-800">Broadcasting News & Updates</h2>
            <p className="text-xl text-slate-500">Stay informed with the latest broadcasting industry news, local station updates, and social developments affecting the industry.</p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-150 ease-in-out ${
                selectedCategory === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All News
            </button>
            <button
              onClick={() => setSelectedCategory('industry')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-150 ease-in-out ${
                selectedCategory === 'industry' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Industry
            </button>
            <button
              onClick={() => setSelectedCategory('local')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-150 ease-in-out ${
                selectedCategory === 'local' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Local
            </button>
            <button
              onClick={() => setSelectedCategory('social')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-150 ease-in-out ${
                selectedCategory === 'social' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Social
            </button>
          </div>

          {/* News grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((item) => (
              <article key={item.id} className="h-full flex flex-col space-y-5 bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-in-out" data-aos="fade-up">
                <div className="grow flex flex-col">
                  <header className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[item.category]}`}>
                        {categoryLabels[item.category]}
                      </span>
                      <span className="text-sm text-slate-500">{item.date}</span>
                    </div>
                    <h3 className="h4 font-playfair-display mb-3">
                      <span className="text-slate-800 hover:text-blue-600 transition duration-150 ease-in-out cursor-pointer">{item.title}</span>
                    </h3>
                  </header>
                  <p className="text-slate-600 grow leading-relaxed">{item.excerpt}</p>
                  <footer className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <span className="text-sm font-medium text-slate-700">{item.source}</span>
                  </footer>
                </div>
              </article>
            ))}
          </div>

          {/* Last updated info */}
          <div className="text-center mt-12 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} • Updates every 4 hours
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

