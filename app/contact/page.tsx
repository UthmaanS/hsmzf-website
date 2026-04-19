'use client'
import { useState } from 'react'
import { siteConfig } from '@/lib/content'
import { supabase } from '@/lib/supabase'
import styles from './contact.module.css'

export default function ContactPage() {
  const { org, social } = siteConfig
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('General Enquiry')
  const [msg, setMsg] = useState('')

  const submit = async () => {
    if (!email || !msg) { setError('Please fill in your email and message.'); return }
    setLoading(true); setError('')
    const { error: dbError } = await supabase.from('contact_messages').insert({
      first_name: fname, last_name: lname, email, subject, message: msg
    })
    setLoading(false)
    if (dbError) { setError('Something went wrong. Please email us directly at Admin@hsmzf.org'); return }
    setSubmitted(true)
  }

  return (
    <>
      <div className={styles.hero}>
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
          <span style={{ color: 'var(--gold-light)' }}>Get in touch</span>
        </div>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you — whether you're looking to volunteer, donate, or learn more about the Foundation.</p>
      </div>

      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.infoCol}>
              {[
                { icon: '📞', title: 'Phone', content: <a href={`tel:${org.phone.replace(/\s/g,'')}`}>{org.phone}</a> },
                { icon: '✉️', title: 'Email', content: <a href={`mailto:${org.email}`}>{org.email}</a> },
                { icon: '📍', title: 'Location', content: <p>{org.address}</p> },
                { icon: '📋', title: 'Charity Details', content: <p>Registered Charity No. {org.charityNumber}<br />Charitable Incorporated Organisation</p> },
              ].map(c => (
                <div key={c.title} className={styles.infoCard}>
                  <div className={styles.infoIcon}>{c.icon}</div>
                  <div><h4>{c.title}</h4>{c.content}</div>
                </div>
              ))}
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>🔗</div>
                <div>
                  <h4>Follow Us</h4>
                  <div className={styles.socials}>
                    <a href={social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href={social.twitter} target="_blank" rel="noopener noreferrer">Twitter / X</a>
                    <a href={social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formBox}>
              <h3>Send us a message</h3>
              {!submitted ? (
                <>
                  <div className="form-row">
                    <div className="form-group"><label>First Name</label><input type="text" value={fname} onChange={e=>setFname(e.target.value)} placeholder="Muhammad" /></div>
                    <div className="form-group"><label>Last Name</label><input type="text" value={lname} onChange={e=>setLname(e.target.value)} placeholder="Ali" /></div>
                  </div>
                  <div className="form-group"><label>Email *</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" /></div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select value={subject} onChange={e=>setSubject(e.target.value)}>
                      <option>General Enquiry</option>
                      <option>Donation Query</option>
                      <option>Volunteer</option>
                      <option>Project Information</option>
                      <option>Gift Aid</option>
                      <option>Media Enquiry</option>
                    </select>
                  </div>
                  <div className="form-group"><label>Message *</label><textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="How can we help you?" /></div>
                  {error && <p style={{color:'#c0392b',fontSize:'0.82rem',marginBottom:'0.75rem'}}>⚠️ {error}</p>}
                  <button className={styles.submitBtn} onClick={submit} disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </>
              ) : (
                <div className={styles.formSuccess}>
                  ✅ Thank you! Your message has been received. We'll be in touch shortly.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
