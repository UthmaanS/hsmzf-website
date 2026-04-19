import Link from 'next/link'
import { siteConfig } from '@/lib/content'
import styles from './Footer.module.css'

export function Footer() {
  const { org, social } = siteConfig
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <div className={styles.brandName}>{org.name}</div>
          <p>{org.fullName} — transforming lives through education and community in Bolton since {org.founded}.</p>
          <span className={styles.charityNo}>Registered Charity No. {org.charityNumber}</span>
        </div>
        <div className={styles.col}>
          <h4>Navigate</h4>
          <Link href="/">Home</Link>
          <Link href="/project">The Project</Link>
          <Link href="/donate">Donate</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className={styles.col}>
          <h4>Ways to Give</h4>
          <Link href="/donate#sqm">Square Metre</Link>
          <Link href="/donate#lillah">Lillah</Link>
          <Link href="/donate#standing">Standing Order</Link>
          <a href={siteConfig.payments.gocardless} target="_blank" rel="noopener noreferrer">Direct Debit</a>
          <Link href="/donate#isaale">Isaale Thawab</Link>
        </div>
        <div className={styles.col}>
          <h4>Contact</h4>
          <p>📞 {org.phone}</p>
          <p>✉️ {org.email}</p>
          <p>📍 {org.address}</p>
          <div className={styles.socials}>
            <a href={social.instagram} target="_blank" rel="noopener noreferrer">IG</a>
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">X</a>
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">FB</a>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} {org.fullName}. All rights reserved.</p>
        <Link href="/privacy">Privacy Policy</Link>
      </div>
    </footer>
  )
}
