import Header from '@/components/ui/header'
import FooterClient from '@/components/ui/footer-client'
import AOSInit from '@/components/aos-init'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <AOSInit />
      <Header />
      <main className="grow flex">{children}</main>
      <FooterClient />
    </div>
  )
}
