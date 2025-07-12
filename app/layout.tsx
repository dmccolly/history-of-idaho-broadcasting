import './css/style.css'
import './css/checkmark-fix.css'

import { Inter, Playfair_Display } from 'next/font/google'
import AOSInit from '@/components/aos-init'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap'
})

export const metadata = {
  title: 'Idaho Broadcasting Foundation - Supporting Excellence in Broadcasting',
  description: 'Supporting broadcasting excellence across Idaho through education, resources, and community engagement.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-inter antialiased bg-white text-slate-800 tracking-tight`}>
        <AOSInit />
        {children}
      </body>
    </html>
  )
}
