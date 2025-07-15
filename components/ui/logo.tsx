import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="block transition duration-150 ease-in-out" aria-label="Idaho Broadcasting Foundation">
      <div className="flex items-center">
        <img src="/logo-white-transparent.png" alt="Idaho Broadcasting Foundation Logo" className="h-10 w-auto" />
      </div>
    </Link>
  )
}

