"use client";

import { useState, useEffect } from 'react';
import { Clock, ExternalLink, Radio } from 'lucide-react';

interface StationActivity {
  id: string;
  title: string;
  station: string;
  stationUrl: string;
  url: string;
  date: string;
  category: 'promotion' | 'news' | 'event' | 'contest' | 'interview' | 'podcast' | 'community';
  excerpt: string;
  linkLabel?: string;
}

const STATION_SOURCES = [
  { name: '94.9 The River', url: 'riverboise.com' },
  { name: '101.9 The Bull', url: 'boisebull.com' },
  { name: 'KBOI 670/93.1', url: 'kboi.com' },
  { name: '96.1 Bob FM', url: '961bobfm.com' },
  { name: '107.9 Lite FM', url: 'liteonline.com' },
  { name: 'My 102.7', url: 'my1027fm.com' },
  { name: '100.3 The X', url: 'xrock.com' },
  { name: '103.5 Kiss FM', url: '1035kissfmboise.com' },
  { name: '99.1 I-Rock', url: 'rockboise.com' },
  { name: 'Mix 106', url: 'mix106.com' }
];

// Helper function to truncate text to word boundaries
const truncateToWords = (text: string, maxWords: number = 100): string => {
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
};

// Generate recent dates dynamically
const generateRecentDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// Minimal sample data for display purposes - replace with real API when ready
const placeholderActivities: StationActivity[] = [
  {
    id: '1',
    title: 'Morning Show Interview with Local Business Owner',
    station: 'KBOI 670/93.1',
    stationUrl: 'kboi.com',
    url: 'https://kboi.com',
    date: generateRecentDate(1),
    category: 'interview',
    excerpt: 'Local entrepreneur discusses new downtown business opening and community impact. The interview covered expansion plans, hiring initiatives, and partnership opportunities with other local businesses in the Treasure Valley area. The business owner shared insights about navigating startup challenges, securing funding, working with local suppliers, and building relationships with customers. They emphasized the importance of community support and how local radio stations help small businesses reach their target audience. The conversation also touched on future growth plans, potential job creation, employee benefits, workplace culture, and giving back to the community through charitable initiatives and local sponsorships that benefit the entire region.',
    linkLabel: 'to main page'
  },
  {
    id: '2',
    title: 'Community Blood Drive Event Announcement',
    station: '94.9 The River',
    stationUrl: 'riverboise.com',
    url: 'https://riverboise.com',
    date: generateRecentDate(2),
    category: 'community',
    excerpt: 'American Red Cross partnership for emergency blood drive at Expo Idaho. Event aims to address critical blood shortage affecting regional hospitals and medical facilities throughout southwestern Idaho. The drive will run from 9 AM to 6 PM with trained medical staff on site. Donors must be at least 17 years old, weigh over 110 pounds, and bring valid identification. The Red Cross emphasizes that one donation can save up to three lives. Local hospitals have reported dangerously low blood supplies, particularly O-negative and B-negative types. Refreshments will be provided, and donors receive a free t-shirt and comprehensive health screening including blood pressure and pulse checks.',
    linkLabel: 'to main page'
  },
  {
    id: '3',
    title: 'New Podcast Series Launch',
    station: '107.9 Lite FM',
    stationUrl: 'liteonline.com',
    url: 'https://liteonline.com',
    date: generateRecentDate(3),
    category: 'podcast',
    excerpt: 'Weekly podcast featuring local stories and community members. Each episode highlights remarkable individuals making positive changes in the Boise area, from teachers and volunteers to entrepreneurs and artists. The series will explore personal journeys, challenges overcome, and lessons learned. Upcoming episodes include interviews with a retired firefighter turned youth mentor, a local chef promoting farm-to-table dining, and a teacher developing innovative STEM programs. The podcast aims to inspire listeners while showcasing the diverse talents and contributions of Treasure Valley residents. Episodes will be available on all major podcast platforms including Spotify, Apple Podcasts, and Google Podcasts for maximum accessibility.',
    linkLabel: 'to main page'
  }
];

// Function to fetch real station activities (placeholder for future implementation)
const fetchStationActivities = async (): Promise<StationActivity[]> => {
  // TODO: Replace with actual API call when data source is ready
  // For now, return placeholder data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(placeholderActivities);
    }, 500);
  });
};

function getCategoryIcon(category: string) {
  switch (category) {
    case 'promotion':
      return '📢';
    case 'news':
      return '📰';
    case 'event':
      return '🎵';
    case 'contest':
      return '🎁';
    case 'interview':
      return '🎤';
    case 'podcast':
      return '🎧';
    case 'community':
      return '🤝';
    default:
      return '📻';
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'promotion':
      return 'bg-blue-100 text-blue-800';
    case 'news':
      return 'bg-green-100 text-green-800';
    case 'event':
      return 'bg-purple-100 text-purple-800';
    case 'contest':
      return 'bg-orange-100 text-orange-800';
    case 'interview':
      return 'bg-red-100 text-red-800';
    case 'podcast':
      return 'bg-indigo-100 text-indigo-800';
    case 'community':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString();
}

export default function StationActivitiesFeed() {
  const [activities, setActivities] = useState<StationActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchStationActivities();
        
        // Filter to last 10 days
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
        
        const recentActivities = data.filter(activity => {
          const activityDate = new Date(activity.date);
          return activityDate >= tenDaysAgo;
        });
        
        setActivities(recentActivities);
      } catch (err) {
        setError('Failed to load station activities');
        console.error('Error loading activities:', err);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Radio className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Station Activities</h3>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Radio className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Station Activities</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-red-500 text-sm mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-blue-600 text-sm hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Station Activities</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Last 10 days</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm mb-2">
              No recent activities from monitored stations
            </p>
            <p className="text-gray-400 text-xs">
              Data will appear here when station activity feeds are configured
            </p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="border-b border-gray-100 pb-4 last:border-b-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{getCategoryIcon(activity.category)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                      {activity.category}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                    <a 
                      href={activity.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      {activity.title}
                    </a>
                  </h4>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-6">
                    {truncateToWords(activity.excerpt, 100)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-medium">{activity.station}</span>
                    <div className="flex items-center gap-1">
                      <span>{formatTimeAgo(activity.date)}</span>
                      <span className="text-blue-600 font-medium">{activity.linkLabel || 'to main page'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          Monitoring {STATION_SOURCES.length} Boise area radio stations for promotional activities and news
        </p>
      </div>
    </div>
  );
}