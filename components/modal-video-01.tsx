'use client'

import React, { useState, useRef } from 'react'
import type { StaticImageData } from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'

interface ModalVideo01Props {
  thumb: StaticImageData
  thumbWidth: number
  thumbHeight: number
  thumbAlt: string
  video: string
  videoWidth: number
  videoHeight: number
}

export default function ModalVideo01({
  thumb,
  thumbWidth,
  thumbHeight,
  thumbAlt,
  video,
  videoWidth,
  videoHeight,
}: ModalVideo01Props) {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="shrink-0" data-aos="fade-left">

      {/* Video thumbnail */}
      <div className="relative group cursor-pointer" onClick={() => { setModalOpen(true) }}>
        {/* Enhanced shadow layers for more depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl transform translate-x-2 translate-y-2 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-black/30 rounded-2xl blur-lg transform translate-x-1 translate-y-1"></div>
        
        <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-slate-600/30 bg-gradient-to-br from-slate-800/40 to-slate-900/60">
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 rounded-2xl"></div>
          
          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent z-20"></div>
          
          {/* Image with hover effect */}
          <div className="transform transition-all duration-500 group-hover:scale-105">
            <Image 
              src={thumb} 
              width={thumbWidth} 
              height={thumbHeight} 
              alt={thumbAlt} 
              className="rounded-2xl object-cover"
            />
          </div>
          
          {/* Enhanced Play button */}
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="relative">
              {/* Multiple pulsing ring effects that stop after 5 seconds */}
              <div className="absolute inset-0 rounded-full bg-blue-500/30 scale-150" style={{ animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) 5' }}></div>
              <div className="absolute inset-0 rounded-full bg-white/20" style={{ animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) 5' }}></div>
              <div className="absolute inset-0 rounded-full bg-blue-400/20 scale-125" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 3' }}></div>
              
              {/* Main play button with enhanced styling */}
              <button 
                className="relative flex items-center justify-center w-24 h-24 bg-white/95 backdrop-blur-md rounded-full shadow-2xl transform transition-all duration-300 group-hover:scale-125 group-hover:bg-white group-hover:shadow-blue-500/25 group-hover:shadow-3xl border-2 border-white/20"
                aria-label="Watch the video"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-blue-50"></div>
                <svg className="relative w-10 h-10 text-blue-600 ml-1 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Enhanced video label */}
          <div className="absolute bottom-4 left-4 z-30">
            <div className="bg-black/70 backdrop-blur-md rounded-xl px-4 py-2 border border-white/10">
              <span className="text-white text-sm font-semibold tracking-wide">▶ Watch Overview</span>
            </div>
          </div>
          
          {/* Subtle corner accent */}
          <div className="absolute top-4 right-4 z-30">
            <div className="w-3 h-3 bg-blue-500 rounded-full opacity-60 animate-pulse"></div>
          </div>
        </div>
      </div>
      {/* End: Video thumbnail */}
Qu
      <Transition appear show={modalOpen} as={React.Fragment}>
        <Dialog
          initialFocus={videoRef}
          onClose={() => setModalOpen(false)}
          className="fixed inset-0 z-50 flex px-4 py-6 sm:px-6"
        >
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="mx-auto flex h-full max-w-6xl items-center">
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="aspect-video max-h-full w-full overflow-hidden bg-black shadow-2xl rounded-2xl border border-slate-700/50">
                <video 
                  ref={videoRef} 
                  width={videoWidth} 
                  height={videoHeight} 
                  loop 
                  controls
                  className="w-full h-full rounded-2xl"
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

    </div>
  )
}