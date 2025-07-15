import Header from '@/components/ui/header'
import FooterClient from '@/components/ui/footer-client'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header mode="light" />
      <main className="grow">{children}</main>
      <FooterClient />
    </div>
  )
}
