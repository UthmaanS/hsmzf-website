'use client'
import { siteConfig } from '@/lib/content'
import styles from './donate.module.css'

export default function DonatePage() {
  const openModal = (id: string) => {
    window.dispatchEvent(new CustomEvent('open-donate-modal', { detail: { type: id } }))
  }

  return (
    <>
      <div className={styles.hero}>
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
          <span style={{ color: 'var(--gold-light)' }}>Sadaqah Jariyah</span>
        </div>
        <h1>Donate to HSMZF</h1>
        <p>Choose from a range of giving options — from one-off donations to monthly pledges, Qardh e Hasanah, and more.</p>
      </div>

      <section className={styles.donateSection}>
        <div className={styles.container}>
          <div className="section-label"><span>Give Today</span></div>
          <h2 className="section-title">Your generosity changes lives</h2>
          <p className="section-subtitle">All donations are managed transparently by the Foundation. UK taxpayers can increase the value of their gift through Gift Aid at no extra cost.</p>

          <div className={styles.grid}>
            {siteConfig.donations.map(d => (
              <div key={d.id} className={`${styles.card} ${d.featured ? styles.featured : ''}`}>
                <div className={styles.cardHeader}>
                  {d.featured && <span className={styles.ribbon}>⭐ Popular</span>}
                  <div className={styles.cardIcon}>{d.icon}</div>
                  <h3>{d.title}</h3>
                  <p className={styles.cardAmount}>{d.amount}</p>
                </div>
                <div className={styles.cardBody}>
                  <p>{d.desc}</p>
                  <button
                    className={`${styles.donateBtn} ${d.featured ? styles.featuredBtn : ''}`}
                    onClick={() => openModal(d.id)}
                  >
                    {d.buttonLabel}
                  </button>
                </div>
              </div>
            ))}

            {/* GoCardless */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>🏦</div>
                <h3>Direct Debit</h3>
                <p className={styles.cardAmount}>via GoCardless</p>
              </div>
              <div className={styles.cardBody}>
                <p>Set up a Direct Debit through our secure GoCardless integration. Easy, flexible, and fully managed online.</p>
                <a href={siteConfig.payments.gocardless} target="_blank" rel="noopener noreferrer" className={styles.donateBtn}>
                  Set Up via GoCardless ↗
                </a>
              </div>
            </div>

            {/* PayPal */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>💳</div>
                <h3>PayPal Giving Fund</h3>
                <p className={styles.cardAmount}>0% Fees · No Deductions</p>
              </div>
              <div className={styles.cardBody}>
                <p>Donate through PayPal Giving Fund — 100% of your donation reaches us with no fees deducted.</p>
                <a href={siteConfig.payments.paypal} target="_blank" rel="noopener noreferrer" className={styles.donateBtn}>
                  Donate via PayPal ↗
                </a>
              </div>
            </div>
          </div>

          {/* Ramadhan Giving banner */}
          <div className={styles.ramadhanBanner}>
            <div style={{ fontSize: '1.8rem' }}>🌙</div>
            <div>
              <strong>Ramadhan Giving</strong>
              <p>Also donate through the Ramadhan Giving platform — ideal during the blessed month of Ramadhan.</p>
              <a href={siteConfig.payments.ramadhanGiving} target="_blank" rel="noopener noreferrer">
                Visit Ramadhan Giving →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
