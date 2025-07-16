'use client'

import { storyblokEditable, StoryblokComponent } from '@/lib/storyblok'
import Link from 'next/link'
import type { SbBlokData } from '@storyblok/react'

interface NavigationItem {
  _uid: string
  component: string
  label: string
  href: string
  target?: string
}

interface NavigationStoryblok extends SbBlokData {
  _uid: string
  component: 'navigation'
  menu_items: NavigationItem[]
  logo_text?: string
  cta_text?: string
  cta_link?: string
}

export default function Navigation({ blok }: { blok: NavigationStoryblok }) {
  return (
    <nav {...storyblokEditable(blok)} className="hidden md:flex md:grow">
      {/* Desktop menu links */}
      <ul className="flex grow justify-start flex-wrap items-center">
        {blok.menu_items?.map((item) => (
          <li key={item._uid}>
            <Link 
              href={item.href || '/'} 
              className="font-medium text-slate-800 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
              target={item.target || '_self'}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop action links */}
      {blok.cta_text && blok.cta_link && (
        <ul className="flex grow justify-end flex-wrap items-center">
          <li>
            <Link 
              href={blok.cta_link} 
              className="font-medium text-blue-600 dark:text-slate-300 dark:hover:text-white px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out group"
            >
              {blok.cta_text} <span className="tracking-normal text-blue-600 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}