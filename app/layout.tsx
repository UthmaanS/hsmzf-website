import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { DonateModal } from '@/components/DonateModal'
import { siteConfig } from '@/lib/content'

export const metadata: Metadata = {
  title: `${siteConfig.org.name} – ${siteConfig.org.fullName}`,
  description: 'A charitable foundation committed to building an outstanding educational and community centre for underprivileged children in Bolton.',
  keywords: 'HSMZF, Bolton charity, Islamic charity, education, SEND, donation',
  openGraph: {
    title: `${siteConfig.org.name} – ${siteConfig.org.fullName}`,
    description: 'Transforming lives through education in Bolton, UK.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <DonateModal />
      </body>
    </html>
  )
}
