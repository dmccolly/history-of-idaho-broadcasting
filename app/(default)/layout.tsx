import Header from '@/components/ui/header'
import FooterClient from '@/components/ui/footer-client'

export default async function DefaultLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow">{children}</main>
      <FooterClient />
    </div>
  )
}
