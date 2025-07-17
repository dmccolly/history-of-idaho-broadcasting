'use client'

import { useState } from 'react'
import BroadcastingNewsFeed from './broadcasting-news-feed'
import StationActivitiesFeed from './station-activities-feed'

// Compact News Feed Component
function CompactNewsFeed() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())
  
  // Sample news data - this would typically come from an API
  const newsData = [
    {
      id: 1,
      title: "KTVB Boise Launches New Morning Show Format",
      excerpt: "Idaho's leading news station introduces enhanced morning programming with local weather integration and community spotlight segments.",
      source: "KTVB",
      date: "2024-01-15",
      category: "local"
    },
    {
      id: 2,
      title: "Idaho Public Television Receives Federal Grant",
      excerpt: "$2.3 million grant will fund educational programming and rural broadcast infrastructure improvements across the state.",
      source: "Idaho Public Television",
      date: "2024-01-14",
      category: "local"
    },
    {
      id: 3,
      title: "KBOI Radio Celebrates 75 Years of Broadcasting",
      excerpt: "Boise's historic radio station marks three-quarters of a century serving the Treasure Valley with news, music, and community programming.",
      source: "KBOI Radio",
      date: "2024-01-13",
      category: "local"
    },
    {
      id: 4,
      title: "FCC Approves New Low-Power FM Stations in Idaho",
      excerpt: "Federal Communications Commission grants licenses for community radio stations in Pocatello, Twin Falls, and Coeur d'Alene.",
      source: "FCC",
      date: "2024-01-12",
      category: "local"
    },
    {
      id: 5,
      title: "Streaming Services Impact Traditional Broadcasting",
      excerpt: "Industry report shows continued shift in viewing habits as broadcasters adapt to digital-first strategies.",
      source: "Broadcasting & Cable",
      date: "2024-01-11",
      category: "industry"
    },
    {
      id: 6,
      title: "Social Media Integration in Local News",
      excerpt: "Idaho stations leading the way in community engagement through innovative social media strategies and viewer interaction.",
      source: "Social Media Today",
      date: "2024-01-10",
      category: "social"
    },
    {
      id: 7,
      title: "Emergency Broadcasting System Upgrades",
      excerpt: "Idaho's emergency alert system receives technology updates to improve response times and coverage area.",
      source: "Emergency Management",
      date: "2024-01-09",
      category: "local"
    },
    {
      id: 8,
      title: "Podcast Growth in Regional Markets",
      excerpt: "Local broadcasters expanding into podcast production to reach younger demographics and extend content reach.",
      source: "Podcast Industry Report",
      date: "2024-01-08",
      category: "industry"
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
  
  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(item => item.category === selectedCategory)

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const truncateText = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">News/Social</h3>
        <p className="text-sm text-slate-600">Latest broadcasting updates from Idaho and beyond</p>
      </div>
      
      {/* Compact category filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition ${
            selectedCategory === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedCategory('local')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition ${
            selectedCategory === 'local' 
              ? 'bg-green-600 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Idaho
        </button>
        <button
          onClick={() => setSelectedCategory('industry')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition ${
            selectedCategory === 'industry' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Industry
        </button>
        <button
          onClick={() => setSelectedCategory('social')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition ${
            selectedCategory === 'social' 
              ? 'bg-purple-600 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Social
        </button>
      </div>

      {/* Compact news list */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredNews.slice(0, 15).map((item) => {
          const isExpanded = expandedItems.has(item.id)
          return (
            <article key={item.id} className="border-b border-slate-100 pb-4 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${categoryColors[item.category]}`}>
                  {item.category === 'local' ? 'Idaho' : categoryLabels[item.category as keyof typeof categoryLabels]}
                </span>
                <span className="text-xs text-slate-500">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <h4 className="font-medium text-slate-800 text-sm mb-2 leading-tight">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 mb-2">
                {isExpanded ? item.excerpt : truncateText(item.excerpt)}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{item.source}</span>
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              </div>
            </article>
          )
        })}
      </div>

      {/* Compact last updated info */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500 text-center">
          {selectedCategory === 'social' ? 'Updates daily' : selectedCategory === 'all' ? 'News updates every 4 hours • Social updates daily' : 'Updates every 4 hours'} • Last: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  )
}

export default function NewsLayout() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-playfair-display text-slate-800">Broadcasting News & Social</h2>
            <p className="text-xl text-slate-500">Stay informed with the latest broadcasting industry news, with special focus on Idaho and Boise area stations, plus social developments affecting the industry.</p>
          </div>

          {/* Three-column layout */}
          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Column 1: News/Social Feed */}
            <div className="lg:col-span-1">
              <CompactNewsFeed />
            </div>
            
            {/* Column 2: Placeholder for future content */}
            <div className="lg:col-span-1">
              <div className="bg-slate-100 rounded-lg p-6 h-96 flex items-center justify-center">
                <p className="text-slate-500 text-center">Column 2<br />Content Coming Soon</p>
              </div>
            </div>
            
            {/* Column 3: Station Activities Feed */}
            <div className="lg:col-span-1">
              <StationActivitiesFeed />
            </div>
            
          </div>

        </div>
      </div>
    </section>
  )
}
