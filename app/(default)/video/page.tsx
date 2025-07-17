import { getStoryblokApi } from '@/lib/storyblok'
import { VideoGalleryComponent } from '@/components/video-gallery'

// Metadata for the page
export const metadata = {
  title: 'Video Gallery - Idaho Broadcasting Foundation',
  description: 'Watch interviews with Idaho broadcasting legends and personalities.',
}

// Vimeo video IDs for the gallery
const videoData = [
  {
    title: "Dee Sarton Interview",
    role: "Former KTVB-TV, Channel 7 anchor/reporter/program host",
    description: "DEE SARTON talks about what it was like starting out as a young reporter in Boise back in the late '70s, and working with legendary Channel 7 news director Sal Celeski.",
    photo_credit: "KTVB News Group",
    vimeo_url: "https://vimeo.com/863352797",
    _uid: "video-1"
  },
  {
    title: "Marcia Franklin Interview",
    role: "Idaho Public Television producer/Dialogue host",
    description: "MARCIA FRANKLIN talks about some of her most memorable Sun Valley Writers' Conference interviews, especially her 2016 sit-down with David Benioff and D.B. Weiss, creators of HBO's epic Game of Thrones series.",
    photo_credit: "Idaho Public Television",
    vimeo_url: "https://vimeo.com/863352797",
    _uid: "video-2"
  },
  {
    title: "Don Nelson Interview",
    role: "KIVI-TV, Channel 6 anchor/reporter",
    description: "DON NELSON explains how Brink Chipman, who did three stints as the station's news director (1980-83; 1991-93; and 1996-97), came up with the now-legendary \"6 On Your Side\" consumer watchdog branding.",
    photo_credit: "KIVI, Channel 6",
    vimeo_url: "https://vimeo.com/863352797",
    _uid: "video-3"
  },
  {
    title: "Kevin Miller Interview",
    role: "KIDO radio talk show host",
    description: "KEVIN MILLER tells us how \"Miller's Mission,\" his annual on-air fundraising effort to help support the Boise Rescue Mission, came about.",
    photo_credit: "Boise Rescue Mission",
    vimeo_url: "https://vimeo.com/863352797",
    _uid: "video-4"
  },
  {
    title: "Marty Holtman Interview",
    role: "KBOI radio deejay and KBOI-TV/KBCI-TV, Channel 2 weatherman/feature reporter",
    description: "The late MARTY HOLTMAN reminisces about his days — and nights — as late-night horror-movie-show host \"Claude Gloom.\" \"Claude\" hosted the hugely popular show entitled The Unknown, sponsored by Capital Volkswagen of Boise.",
    photo_credit: "KBOI, Channel 2",
    vimeo_url: "https://vimeo.com/863352797",
    _uid: "video-5"
  }
];

export default async function VideoPage() {
  // Try to fetch from Storyblok first
  let storyblokContent = null;
  
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get('cdn/stories/video', {
      version: 'published',
    });
    
    if (data && data.story && data.story.content) {
      storyblokContent = data.story.content;
    }
  } catch (error) {
    console.error('Error fetching video page from Storyblok:', error);
  }
  
  // If Storyblok content is available, use it
  // Otherwise, use our hardcoded data
  const galleryData = storyblokContent || {
    component: 'video_gallery',
    title: 'Our Video Interviews',
    subtitle: 'Preserving Idaho\'s Broadcasting History',
    description: 'In our ongoing effort to visually preserve Idaho\'s fascinating radio and television past, the History of Idaho Broadcasting Foundation has thus far conducted more than 75 video interviews with media legends and personalities throughout the state — who have generously shared with us anecdotal insights into their careers. Here are clips from some of those interviews.',
    videos: videoData,
    layout: 'grid',
    columns: '3',
    background_color: 'white',
    _uid: 'video-gallery-1'
  };

  return (
    <>
      <VideoGalleryComponent blok={galleryData} />
    </>
  );
}