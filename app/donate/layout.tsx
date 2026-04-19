import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Donate – HSMZF',
  description: 'Support the Hadhrat Shaykh Maulana Muhammad Zakariyya Foundation. Donate via Square Metre, Lillah, Standing Order, GoCardless, and more.',
}

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
