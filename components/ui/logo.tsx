import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="block transition duration-150 ease-in-out" aria-label="Idaho Broadcasting Foundation">
      <div className="text-slate-800 dark:text-white">
        <div className="font-bold text-lg leading-tight">Idaho Broadcasting</div>
        <div className="text-sm text-slate-600 dark:text-slate-400 leading-tight">Foundation</div>
      </div>
    </Link>
  )
}