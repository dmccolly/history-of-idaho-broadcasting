import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="block transition duration-150 ease-in-out" aria-label="Idaho Broadcasting Foundation">
      <div className="flex items-center space-x-2">
        {/* Broadcasting icon */}
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17v-2.5c-2.33-.46-4-2.24-4-4.5 0-2.26 1.67-4.04 4-4.5V5c3.87.48 7 3.85 7 8s-3.13 7.52-7 8zm0-4v-8c-2.21 0-4 1.79-4 4s1.79 4 4 4z"/>
          </svg>
        </div>
        {/* Text logo */}
        <div className="text-slate-800 dark:text-white">
          <div className="font-bold text-lg leading-tight">Idaho Broadcasting</div>
          <div className="text-sm text-slate-600 dark:text-slate-400 leading-tight">Foundation</div>
        </div>
      </div>
    </Link>
  )
}

