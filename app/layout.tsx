import './css/style.css'
import '../styles/stations.css'

import { Inter } from 'next/font/google'
import AOSInit from '@/components/aos-init'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      <body className={`${inter.variable} font-inter antialiased bg-white text-slate-800 tracking-tight`}>
        <AOSInit />
        {children}
      </body>
    </html>
  )
}