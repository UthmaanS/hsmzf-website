import Link from 'next/link'
import { siteConfig } from '@/lib/content'
import styles from './project.module.css'

export const metadata = { title: 'The Project – HSMZF' }

export default function ProjectPage() {
  const { project } = siteConfig
  return (
    <>
      <div className={styles.hero}>
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
          <span style={{ color: 'var(--gold-light)' }}>{project.hero.badge}</span>
        </div>
        <h1>{project.hero.heading}</h1>
        <p>{project.hero.subtext}</p>
      </div>

      <section className={styles.specsSection}>
        <div className={styles.container}>
          <div className="section-label"><span>Site & Facilities</span></div>
          <h2 className="section-title">What we're building</h2>
          <p className="section-subtitle">Two state-of-the-art modular buildings housing world-class educational facilities designed with every child in mind.</p>
          <div className={styles.specsGrid}>
            {project.specs.map(s => (
              <div key={s.label} className={styles.specCard}>
                <div className={styles.specIcon}>{s.icon}</div>
                <div className={styles.specNum}>{s.number}</div>
                <div className={styles.specLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.phasesSection}>
        <div className={styles.container}>
          <div className="section-label"><span>Project Timeline</span></div>
          <h2 className="section-title">Milestones & Progress</h2>
          <div className={styles.phases}>
            {project.phases.map(p => (
              <div key={p.number} className={styles.phaseItem}>
                <div className={styles.phaseNum}>{p.number}</div>
                <div className={`${styles.phaseContent} ${styles[p.status]}`}>
                  <span className={`${styles.badge} ${styles[`badge_${p.status}`]}`}>{p.statusLabel}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Ready to make a difference?</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 2rem' }}>Sponsor a square metre of our foundation build for just £350 and become part of this historic project.</p>
          <div style={{ textAlign: 'center' }}>
            <Link href="/donate" className="btn-primary">View All Donation Options</Link>
          </div>
        </div>
      </section>
    </>
  )
}
