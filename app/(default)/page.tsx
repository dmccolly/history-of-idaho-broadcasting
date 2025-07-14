import { getStoryblokApi, StoryblokComponent } from '@/lib/storyblok'
import HeroServer from '@/components/HeroServer'
import FeaturesBlocks from '@/components/features-blocks'
import VoxProPlayer from '@/components/broadcasting/voxpro-player'
import KeyAssignments from '@/components/broadcasting/key-assignments'
import Stats from '@/components/stats'
import Cta from '@/components/cta'
import ModalVideo01 from '@/components/modal-video-01'
import VideoThumb from '@/public/images/hero-image-01.jpg'

export const metadata = {
  title: 'Idaho Broadcasting Foundation - Supporting Excellence in Broadcasting',
  description: 'Supporting broadcasting excellence across Idaho through education, resources, and community engagement.',
}

export default async function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Welcome to Idaho Broadcasting Foundation
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Supporting broadcasting excellence across Idaho through education, resources, and community engagement. Access professional tools, join industry events, and connect with fellow broadcasting professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  View Events
                </button>
                <button className="border border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3 rounded-lg font-medium transition-colors">
                  Explore Tools
                </button>
              </div>
            </div>
            <div className="relative">
              <ModalVideo01
                thumb={VideoThumb}
                thumbWidth={540}
                thumbHeight={405}
                thumbAlt="Idaho Broadcasting Foundation overview"
                video="/videos/video.mp4"
                videoWidth={1920}
                videoHeight={1080}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Robust Workflow</h3>
               <p className="text-slate-300 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>

            {/* Feature 2 */}
             <div className="text-center">
               <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
               <h3 className="text-xl font-bold text-white mb-3">Robust Workflow</h3>
               <p className="text-slate-300 leading-relaxed">
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
               </p>
             </div>
 
             {/* Feature 3 */}
             <div className="text-center">
               <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                 </svg>
               </div>
               <h3 className="text-xl font-bold text-white mb-3">Robust Workflow</h3>
               <p className="text-slate-300 leading-relaxed">
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
               </p>
             </div>
 
             {/* Feature 4 */}
             <div className="text-center">
               <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                 </svg>
               </div>
               <h3 className="text-xl font-bold text-white mb-3">Robust Workflow</h3>
               <p className="text-slate-300 leading-relaxed">
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
               </p>
             </div>
 
             {/* Feature 5 */}
             <div className="text-center">
               <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                 </svg>
               </div>
               <h3 className="text-xl font-bold text-white mb-3">Robust Workflow</h3>
               <p className="text-slate-300 leading-relaxed">
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
               </p>
             </div>
 
             {/* Feature 6 */}
             <div className="text-center">
               <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                 </svg>
               </div>
               <h3 className="text-xl font-bold text-white mb-3">Robust Workflow</h3>
               <p className="text-slate-300 leading-relaxed">
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* Professional Broadcasting Tools Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-white mb-6">
              Professional Broadcasting Tools
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Access our state-of-the-art VoxPro media control system and explore our extensive library of broadcasting content. 
              Experience professional-grade tools designed for modern broadcasting workflows.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="order-2 lg:order-1">
              <VoxProPlayer />
            </div>
            <div className="order-1 lg:order-2">
              <KeyAssignments />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Broadcasting Events */}
            <div className="bg-slate-700 rounded-2xl border border-slate-600 p-8 text-center hover:bg-slate-600 transition-colors duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Broadcasting Events</h3>
               <p className="text-slate-300 mb-6 leading-relaxed">
                Join our conferences, workshops, and seminars designed for broadcasting professionals.
              </p>
              <a
                href="/events"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                View Events →
              </a>
            </div>

            {/* The Back Corner */}
             <div className="bg-slate-700 rounded-2xl border border-slate-600 p-8 text-center hover:bg-slate-600 transition-colors duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 8.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">The Back Corner</h3>
               <p className="text-slate-300 mb-6 leading-relaxed">
                Explore our interactive broadcasting tools and resources.
              </p>
              <a
                href="/back-corner"
                className="inline-flex items-center text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
              >
                Explore Tools →
              </a>
            </div>

            {/* News & Updates */}
             <div className="bg-slate-700 rounded-2xl border border-slate-600 p-8 text-center hover:bg-slate-600 transition-colors duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">News & Updates</h3>
               <p className="text-slate-300 mb-6 leading-relaxed">
                Stay informed with the latest broadcasting news and foundation updates.
              </p>
              <a
                href="/news"
                className="inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
              >
                Read News →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
       <section className="py-20 bg-slate-900">
         <div className="max-w-6xl mx-auto px-4 sm:px-6">
           <div className="grid md:grid-cols-3 gap-8 text-center">
             <div>
               <div className="text-4xl font-bold text-white mb-2">79%</div>
               <div className="text-slate-300">Incremental Uplift</div>
             </div>
             <div>
               <div className="text-4xl font-bold text-white mb-2">-32%</div>
               <div className="text-slate-300">Cost of Acquisition</div>
             </div>
             <div>
               <div className="text-4xl font-bold text-white mb-2">128%</div>
               <div className="text-slate-300">ROI Increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
       <section className="py-20 bg-slate-800">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
           <h2 className="text-4xl font-bold text-white mb-6">
             Say goodbye to long queues, big updates, and confusion.
           </h2>
           <p className="text-xl text-slate-300 leading-relaxed">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.
          </p>
        </div>
      </section>
    </>
  )
}

