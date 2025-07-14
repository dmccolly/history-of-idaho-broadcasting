'use client'

import { storyblokEditable } from '@/lib/storyblok'
import Link from 'next/link'

interface NavigationItemStoryblok {
  _uid: string
  component: 'navigation_item'
  label: string
  href: string
  target?: '_self' | '_blank'
}

export default function NavigationItem({ blok }: { blok: NavigationItemStoryblok }) {
  return (
    <Link 
      {...storyblokEditable(blok)}
      href={blok.href || '/'} 
      className="font-medium text-slate-800 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-600 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
      target={blok.target || '_self'}
    >
      {blok.label}
    </Link>
  )
}