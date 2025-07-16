import Header from '@/components/ui/header'
import FooterClient from '@/components/ui/footer-client'
import AOSInit from '@/components/aos-init'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <AOSInit />
      {/* Navigation from Storyblok */}
      <Header />
      <main className="grow">{children}</main>
      <FooterClient />
    </div>
  )
}
