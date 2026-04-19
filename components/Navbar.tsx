'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const openDonateModal = () => {
    window.dispatchEvent(new CustomEvent('open-donate-modal', { detail: { type: 'general' } }))
    setMobileOpen(false)
  }

  const links = [
    { href: '/', label: 'Home' },
    { href: '/project', label: 'The Project' },
    { href: '/donate', label: 'Donate' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="#c9a84c"/>
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.abbr}>HSMZF</span>
            <span className={styles.tagline}>Bolton · Est. 2021</span>
          </div>
        </Link>

        <div className={styles.links}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.link} ${pathname === l.href ? styles.active : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <button className={`${styles.link} ${styles.donateBtn}`} onClick={openDonateModal}>
            Donate Now
          </button>
        </div>

        <button className={styles.hamburger} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {links.map(l => (
            <Link key={l.href} href={l.href} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ))}
          <button className={`${styles.mobileLink} ${styles.mobileDonate}`} onClick={openDonateModal}>
            Donate Now
          </button>
        </div>
      )}
    </>
  )
}
