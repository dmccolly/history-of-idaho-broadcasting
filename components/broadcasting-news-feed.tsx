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
    title: "Boise Radio Station KBOI Launches New Morning Show",
    excerpt: "KBOI 670 AM announces the debut of 'Idaho Morning Drive' featuring local hosts discussing state politics, weather, and community events...",
    source: "Idaho Statesman",
    date: "January 15, 2025",
    category: "local"
  },
  {
    id: 2,
    title: "Idaho Public Television Expands Rural Coverage",
    excerpt: "Idaho Public Television announces new transmitter installations in eastern Idaho, improving signal coverage for rural communities...",
    source: "Idaho Public Television",
    date: "January 14, 2025",
    category: "local"
  },
  {
    id: 3,
    title: "Pocatello TV Station KPVI Celebrates 70 Years",
    excerpt: "KPVI-DT marks seven decades of serving southeastern Idaho with special programming and community events throughout the month...",
    source: "East Idaho News",
    date: "January 13, 2025",
    category: "local"
  },
  {
    id: 4,
    title: "Twin Falls Broadcasting Group Acquires New FM Frequency",
    excerpt: "Local broadcasting company secures 101.5 FM license, plans country music format to serve Magic Valley region...",
    source: "Times-News",
    date: "January 12, 2025",
    category: "local"
  },
  {
    id: 5,
    title: "FCC Seeks Comments on 39% National TV Ownership Cap",
    excerpt: "The FCC has set comment dates for updating the record on the 39% national television ownership cap, with comments due August 4 and replies by August 22...",
    source: "Broadcast Law Blog",
    date: "January 11, 2025",
    category: "industry"
  },
  {
    id: 6,
    title: "Coeur d'Alene Radio Stations Partner for Emergency Broadcasting",
    excerpt: "KVNI and KBBD announce joint emergency alert system to better serve North Idaho during winter weather events...",
    source: "Coeur d'Alene Press",
    date: "January 10, 2025",
    category: "local"
  },
  {
    id: 7,
    title: "Boise State Public Radio Receives Grant for Rural Outreach",
    excerpt: "BSU's public radio station awarded $150,000 federal grant to expand programming for rural Idaho communities...",
    source: "Boise State News",
    date: "January 9, 2025",
    category: "local"
  },
  {
    id: 8,
    title: "Idaho Falls TV Station KIFI Upgrades to 4K Broadcasting",
    excerpt: "Local ABC affiliate completes major technical upgrade, becoming first eastern Idaho station to broadcast in 4K resolution...",
    source: "Post Register",
    date: "January 8, 2025",
    category: "local"
  },
  {
    id: 9,
    title: "Radio Groups Push for Expanded AM Band Policy",
    excerpt: "Four radio groups ask FCC to keep expanded AM band rule as Chair Carr's push opens door for permanent approval...",
    source: "Radio World",
    date: "January 7, 2025",
    category: "industry"
  },
  {
    id: 5,
    title: "Soros Fires Back at Warshaw Over Audacy CEO Deal Dispute",
    excerpt: "The legal standoff between Connoisseur Media CEO Jeffrey Warshaw and Soros Fund Management escalated as both SFM and its Head of Media Investments filed aggressive responses seeking to dismantle Warshaw's lawsuit over promised Audacy CEO role.",
    source: "Radio Ink",
    date: "July 11, 2025",
    category: "industry"
  },
  {
    id: 6,
    title: "iHeartMedia Chicago Recruits Kashon Powell As VP/Programming",
    excerpt: "Kashon Powell, who was notably the first female VP of Programming at Radio One, has joined iHeartMedia Chicago as VP of Programming for urban contemporary WGCI, urban AC V103, inspirational gospel WGRB, and talk BIN 640. She begins August 18.",
    source: "Inside Radio",
    date: "July 11, 2025",
    category: "industry"
  },
  {
    id: 7,
    title: "Audacy Wisconsin Adds Brett Andrews to Programming Leadership",
    excerpt: "Following a 15-year run with iHeartMedia, Brett Andrews is returning to Audacy Wisconsin as Brand Manager for hot AC Mix 105.1 Madison and Assistant Brand Manager for WXSS and WMYX Milwaukee, while also hosting afternoons.",
    source: "Radio Ink",
    date: "July 11, 2025",
    category: "industry"
  },
  {
    id: 8,
    title: "ABC News Shifts 'GMA3' Hosting Duties to 'Good Morning America' Team",
    excerpt: "ABC News has confirmed that DeMarco Morgan and Eva Pilgrim are leaving their roles as co-anchors of 'GMA3: What You Need to Know', marking another change in the network's morning programming lineup.",
    source: "NewscastStudio",
    date: "July 7, 2025",
    category: "industry"
  },
  {
    id: 9,
    title: "Indiana Public Broadcasters Cut News Team After State Defunding",
    excerpt: "Indiana's network of public broadcasters is dissolving its entire statewide reporting team following the General Assembly's decision to exclude $3.675 million in annual Indiana Public Broadcasting Stations funding from the state's new two-year budget.",
    source: "Radio Ink",
    date: "July 10, 2025",
    category: "local"
  },
  {
    id: 10,
    title: "Spokane Stations Raise $32,400 After Deadly Firefighter Ambush",
    excerpt: "Morgan Murphy Media's KXLY Radio Group raised $32,400 during a special Honor the Fallen broadcast event and radiothon to support families of firefighters affected by the deadly ambush on Canfield Mountain in Coeur d'Alene, ID.",
    source: "Radio Ink",
    date: "July 10, 2025",
    category: "local"
  },
  {
    id: 11,
    title: "WETA Washington Launches WETA+ Free Streaming Service",
    excerpt: "The Washington D.C. public television station has launched a new free streaming service, expanding its digital presence and providing additional access to public media content for viewers in the region.",
    source: "TV Tech",
    date: "July 11, 2025",
    category: "local"
  },
  {
    id: 12,
    title: "Scripps Raises $75,000 For Central Texas Flood Relief",
    excerpt: "Scripps television stations have successfully raised $75,000 to support flood relief efforts in Central Texas, demonstrating local broadcasting's role in community emergency response and support.",
    source: "TVNewsCheck",
    date: "July 11, 2025",
    category: "local"
  },
  {
    id: 13,
    title: "KTIV Announces Retirement of News Anchor Larry Wentz",
    excerpt: "Long-time news anchor Larry Wentz is retiring from KTIV, marking the end of a significant tenure at the station. The announcement reflects ongoing personnel changes in local television news.",
    source: "Industry Sources",
    date: "July 7, 2025",
    category: "local"
  },
  {
    id: 14,
    title: "Trump Issues Ultimatum to GOP: Defund NPR or Pay the Price",
    excerpt: "President Donald Trump has openly threatened any Republican who votes to preserve funding for public broadcasting, making defunding NPR and PBS a key demand as his rescissions package faces challenges in Congress.",
    source: "Radio Ink",
    date: "July 11, 2025",
    category: "social"
  },
  {
    id: 15,
    title: "Public Radio Funding Fight Could Induce Government Shutdown",
    excerpt: "As President Trump threatens Senate Republicans to get his rescissions package stripping public broadcasters of $1.1 billion across the finish line, the move could spark a standoff with Congressional Democrats that could shut down the federal government.",
    source: "Radio Ink",
    date: "July 10, 2025",
    category: "social"
  },
  {
    id: 16,
    title: "Texas Flood Underscores Need for Public Media Funding",
    excerpt: "A deadly Texas flood underscores the need for public media funding as radio remains a vital lifeline in emergencies, especially in rural areas with poor cell coverage. Senate Democrats warn that proposed CPB cuts could silence stations, jeopardizing critical alerts.",
    source: "Inside Radio",
    date: "July 10, 2025",
    category: "social"
  },
  {
    id: 17,
    title: "Radio Offers Double ROI, But Marketers Still Missing the Signal",
    excerpt: "Despite ranking low in perceived effectiveness, radio delivers double the returns on investment, outperforming all other platforms but one. Marketers may be bullish on digital, but data shows they are overlooking one of the strongest assets around.",
    source: "Radio Ink",
    date: "July 11, 2025",
    category: "social"
  },
  {
    id: 18,
    title: "Katz: As Commutes Rise, Radio's In-Car Advantage Grows Stronger",
    excerpt: "As more Americans return to the road for work, Katz Media Group says radio's in-car strength is proving essential. A new analysis shows over 70% of employed adults are now commuting, a 29% increase since 2020, creating fresh opportunities for advertisers.",
    source: "Inside Radio",
    date: "July 11, 2025",
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

export default function BroadcastingNewsFeed({ isCompact = false }: { isCompact?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())
  
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

  if (isCompact) {
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
                    {item.category === 'local' ? 'Idaho' : categoryLabels[item.category]}
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

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-playfair-display text-slate-800">Broadcasting News & Social</h2>
            <p className="text-xl text-slate-500">Stay informed with the latest broadcasting industry news, with special focus on Idaho and Boise area stations, plus social developments affecting the industry.</p>
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
              })} • {selectedCategory === 'social' ? 'Updates daily' : selectedCategory === 'all' ? 'News updates every 4 hours • Social updates daily' : 'Updates every 4 hours'}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

