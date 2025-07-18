import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="block transition duration-150 ease-in-out" aria-label="Idaho Broadcasting Foundation">
      <div className="flex items-center space-x-2">
        <div className="text-slate-800 dark:text-white">
          <div className="font-bold text-lg leading-tight">Idaho Broadcasting</div>
          <div className="text-sm text-slate-600 dark:text-slate-400 leading-tight">Foundation</div>
        </div>
      </div>
    </Link>
  )
}