'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/lib/content'
import { supabase } from '@/lib/supabase'
import styles from './page.module.css'

const openModal = (type: string) => {
  window.dispatchEvent(new CustomEvent('open-donate-modal', { detail: { type } }))
}

export default function HomePage() {
  const { home, org } = siteConfig
  const [imgs, setImgs] = useState<Record<string,string>>({})

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data }) => {
      if (data) {
        const map: Record<string,string> = {}
        data.forEach((r: any) => { map[r.key] = r.value || '' })
        setImgs(map)
      }
    })
  }, [])

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGeo} />
        <div className={styles.heroContent}>
          <div className={`${styles.heroText} fade-up`}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              <span>{home.hero.badge}</span>
            </div>
            <h1>{home.hero.heading}<br /><em>{home.hero.headingItalic}</em></h1>
            <p className={styles.heroSub}>{home.hero.subtext}</p>
            <div className={styles.heroActions}>
              <button className="btn-primary" onClick={() => openModal('general')}>Donate Today</button>
              <Link href="/project" className="btn-outline">View the Project</Link>
            </div>
          </div>
          <div className={`${styles.heroStats} fade-up delay-2`}>
            <div className={styles.statCard}><div className={styles.statNum}>6,000</div><div className={styles.statLabel}>Square metres acquired</div></div>
            <div className={styles.statCard}><div className={styles.statNum}>14</div><div className={styles.statLabel}>Planned classrooms</div></div>
            <div className={styles.statCard}><div className={styles.statNum}>{org.founded}</div><div className={styles.statLabel}>Foundation established</div></div>
            <div className={styles.statCard}><div className={styles.statNum}>SEND</div><div className={styles.statLabel}>Specialist facilities</div></div>
            <div className={`${styles.statCard} ${styles.statLarge}`}>
              <div className={styles.progressLabel}>
                <span>{home.progressBar.label}</span>
                <strong>{home.progressBar.amountLabel}</strong>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${home.progressBar.percent}%` }} />
              </div>
              <p className={styles.progressNote}>{home.progressBar.sublabel}</p>
            </div>
          </div>
        </div>
        <div className={styles.scrollIndicator}>
          <span>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      <div className={styles.missionStrip}>
        <div className={styles.missionInner}>
          <p>"{home.missionQuote}"</p>
          <span>Registered Charity No. {org.charityNumber}</span>
        </div>
      </div>

      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <div className="section-label"><span>About the Foundation</span></div>
          <h2 className="section-title">Building futures in<br />the heart of Bolton</h2>
          <div className={styles.aboutGrid}>
            <div className={styles.imageStack}>
              <div className={styles.goldBar} />
              <img className={styles.imgMain}
                src={imgs.about_image1_url || "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80"}
                alt="Education" />
              <img className={styles.imgAccent}
                src={imgs.about_image2_url || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80"}
                alt="Children" />
            </div>
            <div>
              <p className={styles.aboutPara}>{home.about.paragraph1}</p>
              <p className={styles.aboutPara}>{home.about.paragraph2}</p>
              <div className={styles.values}>
                {home.about.values.map(v => (
                  <div key={v.title} className={styles.valueItem}>
                    <div className={styles.valueIcon}>{v.icon}</div>
                    <div><h4>{v.title}</h4><p>{v.desc}</p></div>
                  </div>
                ))}
              </div>
              <Link href="/donate" className="btn-forest" style={{ marginTop: '2rem', display: 'inline-block' }}>
                Support the Foundation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.quoteSection}>
        <div className={styles.quoteInner}>
          <span className={styles.quoteMark}>"</span>
          <p className={styles.quoteText}>{home.hadith.text}</p>
          <p className={styles.quoteSource}>{home.hadith.source}</p>
        </div>
      </div>

      <section className={styles.impactSection}>
        <div className={styles.container}>
          <div className="section-label" style={{ justifyContent: 'center' }}><span style={{ color: 'var(--gold)' }}>What we aim to achieve</span></div>
          <h2 className="section-title" style={{ color: 'var(--cream)', textAlign: 'center' }}>The impact of your giving</h2>
          <div className={styles.impactGrid}>
            {home.stats.map(s => (
              <div key={s.label} className={styles.impactItem}>
                <div className={styles.impactNum}>{s.number}</div>
                <div className={styles.impactLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.donatePreview}>
        <div className={styles.container}>
          <div className="section-label"><span>Ways to Give</span></div>
          <h2 className="section-title">Choose how you'd like to help</h2>
          <p className="section-subtitle">Every pound you give directly supports the education and welfare of children in Bolton.</p>
          <div className={styles.previewGrid}>
            <Link href="/donate" className={styles.previewCard}>
              <div className={styles.previewIcon}>🏗️</div>
              <div className={styles.previewNum}>£350</div>
              <div className={styles.previewLabel}>Sponsor a Square Metre</div>
            </Link>
            <Link href="/donate" className={styles.previewCard}>
              <div className={styles.previewIcon}>📅</div>
              <div className={styles.previewNum}>Monthly</div>
              <div className={styles.previewLabel}>Standing Order / Direct Debit</div>
            </Link>
            <Link href="/donate" className={styles.previewCard}>
              <div className={styles.previewIcon}>🤲</div>
              <div className={styles.previewNum}>Lillah</div>
              <div className={styles.previewLabel}>General Donation</div>
            </Link>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/donate" className="btn-primary">View All Donation Options →</Link>
          </div>
        </div>
      </section>
    </>
  )
}