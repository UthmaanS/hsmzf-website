import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact – HSMZF',
  description: 'Get in touch with the Hadhrat Shaykh Maulana Muhammad Zakariyya Foundation.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
