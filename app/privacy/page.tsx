import { siteConfig } from '@/lib/content'

export const metadata = { title: 'Privacy Policy – HSMZF' }

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--warm-white)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', color: 'var(--forest)', marginBottom: '2rem' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
          The Hadhrat Shaykh Maulana Muhammad Zakariyya Foundation (Charity No. {siteConfig.org.charityNumber}) is committed to protecting your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
        </p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: 'var(--forest)', margin: '2rem 0 1rem' }}>Information We Collect</h2>
        <p style={{ color: 'var(--text-light)', lineHeight: '1.7', marginBottom: '1rem' }}>
          We may collect your name, email address, phone number, and donation information when you contact us or make a donation.
        </p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: 'var(--forest)', margin: '2rem 0 1rem' }}>How We Use Your Data</h2>
        <p style={{ color: 'var(--text-light)', lineHeight: '1.7', marginBottom: '1rem' }}>
          Your data is used solely to process donations, respond to enquiries, and keep you updated on the Foundation's work — only where you have given consent.
        </p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: 'var(--forest)', margin: '2rem 0 1rem' }}>Contact</h2>
        <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>
          For any data-related queries, contact us at{' '}
          <a href={`mailto:${siteConfig.org.email}`} style={{ color: 'var(--forest)' }}>{siteConfig.org.email}</a>.
        </p>
      </div>
    </div>
  )
}
