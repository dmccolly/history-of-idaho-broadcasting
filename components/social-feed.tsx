'use client'

import { useState } from 'react'
import { ExternalLink, Calendar, Users } from 'lucide-react'

interface SocialItem {
  id: number
  title: string
  excerpt: string
  source: string
  date: string
  url: string
  type: 'facebook' | 'website' | 'news'
}

// Get current date and calculate 21 days ago
const currentDate = new Date();
const twentyOneDaysAgo = new Date(currentDate.getTime() - (21 * 24 * 60 * 60 * 1000));

// Sample social feed data - this would typically come from scraped sources
const allSocialData: SocialItem[] = [
  {
    id: 1,
    title: "History of Idaho Broadcasting Foundation Updates",
    excerpt: "New archival materials added to the collection including rare KBOI radio recordings from the 1960s.",
    source: "History of Idaho Broadcasting | Facebook",
    date: "2024-12-15",
    url: "https://www.facebook.com/historyofidahobroadcasting",
    type: "facebook"
  },
  {
    id: 2,
    title: "Former KIVI Employees Reunion Planning",
    excerpt: "Annual gathering scheduled for spring 2024. Looking for contact information for staff from the 1980s-1990s era.",
    source: "KIVI Alumni Group | Facebook",
    date: "2024-12-14",
    url: "https://www.facebook.com/groups/kivialumni",
    type: "facebook"
  },
  {
    id: 3,
    title: "KTVB Celebrates 65 Years of Broadcasting",
    excerpt: "Station marks milestone with special programming featuring historical footage and interviews with longtime staff.",
    source: "KTVB.com",
    date: "2024-12-13",
    url: "https://www.facebook.com/KTVB7",
    type: "website"
  },
  {
    id: 4,
    title: "Idaho Public Television Memories",
    excerpt: "Viewers share favorite memories of educational programming and local productions from the past four decades.",
    source: "Idaho Public Television | Facebook",
    date: "2024-12-12",
    url: "https://www.facebook.com/IdahoPTV",
    type: "facebook"
  },
  {
    id: 5,
    title: "Boise Radio Reunion 2024 Announced",
    excerpt: "Multi-station reunion event planned for summer featuring DJs and staff from KBOI, KQFC, and other local stations.",
    source: "Boise Broadcasting Alumni",
    date: "2024-12-11",
    url: "https://www.facebook.com/groups/1171927166300235",
    type: "facebook"
  },
  {
    id: 6,
    title: "Vintage Broadcasting Equipment Display",
    excerpt: "Local collector showcases rare transmitters and studio equipment from Idaho's broadcasting history.",
    source: "historyofidahobroadcasting.org",
    date: "2024-12-10",
    url: "https://www.facebook.com/groups/1171927166300235",
    type: "website"
  },
  {
    id: 7,
    title: "KBOI-TV Alumni Network Growing",
    excerpt: "Former employees connecting through social media to share stories and career updates from their time at Channel 2.",
    source: "KBOI Alumni | Facebook",
    date: "2024-12-09",
    url: "https://www.facebook.com/groups/idahobroadcastingveterans",
    type: "facebook"
  },
  {
    id: 8,
    title: "Idaho Broadcasting Hall of Fame Nominations",
    excerpt: "Seeking nominations for pioneers who shaped radio and television in the Gem State.",
    source: "Idaho Broadcasting Foundation",
    date: "2024-12-08",
    url: "https://www.facebook.com/historyofidahobroadcasting",
    type: "website"
  }
]

// Filter content to only show posts from the last 21 days
const socialData = allSocialData.filter(item => {
  const itemDate = new Date(item.date);
  return itemDate >= twentyOneDaysAgo;
});

const typeIcons = {
  facebook: Users,
  website: ExternalLink,
  news: Calendar
}

const typeColors = {
  facebook: 'bg-blue-100 text-blue-800',
  website: 'bg-green-100 text-green-800',
  news: 'bg-purple-100 text-purple-800'
}

export default function SocialFeed() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

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
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Social & Community</h3>
        <p className="text-sm text-slate-600">Broadcasting history, reunions, and community connections</p>
      </div>
      
      {/* Social feed list */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {socialData.slice(0, 12).map((item) => {
          const isExpanded = expandedItems.has(item.id)
          const IconComponent = typeIcons[item.type]
          
          return (
            <article key={item.id} className="border-b border-slate-100 pb-4 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeColors[item.type]}`}>
                  <IconComponent className="w-3 h-3 mr-1" />
                  {item.type === 'facebook' ? 'Social' : item.type === 'website' ? 'Web' : 'News'}
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
                <span className="text-xs text-slate-500 truncate flex-1 mr-2">{item.source}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {isExpanded ? 'Less' : 'More'}
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-slate-600"
                    title="View source"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Last updated info */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-500 text-center">
          Updates daily • Last: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  )
}