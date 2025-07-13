'use client'

import { useState, useRef } from 'react'
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
      <div className="flex justify-center items-center">
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none border-2 border-slate-700 mt-3 ml-3 translate-x-4 translate-y-4 -z-10" aria-hidden="true"></div>
          <Image src={thumb} width={thumbWidth} height={thumbHeight} alt={thumbAlt} />
        </div>
        <button className="absolute group" onClick={() => { setModalOpen(true) }} aria-label="Watch the video" style={{position: 'absolute', zIndex: 10}}>
          <svg className="w-16 h-16 fill-current sm:w-20 sm:h-20 group" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg" style={{display: modalOpen ? 'none' : 'block'}}>
            <circle className="text-white opacity-80 group-hover:opacity-100 transition duration-150 ease-in-out" cx="44" cy="44" r="44" />
            <path className="text-blue-600" d="M52 44a.999.999 0 00-.427-.82l-10-7A1 1 0 0040 37V51a.999.999 0 001.573.82l10-7A.995.995 0 0052 44V44c0 .001 0 .001 0 0z" />
          </svg>
        </button>
      </div>
      {/* End: Video thumbnail */}

      <Dialog
        initialFocus={videoRef}
        open={modalOpen}
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
          <div className="fixed inset-0 bg-black/70" />
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
            <Dialog.Panel className="aspect-video max-h-full w-full overflow-hidden bg-black shadow-2xl">
              <video ref={videoRef} width={videoWidth} height={videoHeight} loop controls>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>

    </div>
  )
}