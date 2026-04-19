'use client'
import { useState, useEffect } from 'react'
import { siteConfig } from '@/lib/content'
import { supabase } from '@/lib/supabase'
import styles from './DonateModal.module.css'

type DonationType = typeof siteConfig.donations[0] | null

export function DonateModal() {
  const [open, setOpen] = useState(false)
  const [donation, setDonation] = useState<DonationType>(null)
  const [selectedAmount, setSelectedAmount] = useState(0)
  const [customAmount, setCustomAmount] = useState('')
  const [paymentTab, setPaymentTab] = useState<'card'|'bacs'|'paypal'>('card')
  const [giftAid, setGiftAid] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [dedication, setDedication] = useState('')

  useEffect(() => {
    const handler = (e: Event) => {
      const type = (e as CustomEvent).detail?.type || 'general'
      const found = siteConfig.donations.find(d => d.id === type) || siteConfig.donations[0]
      setDonation(found)
      setSelectedAmount(found.presetAmounts[0])
      setCustomAmount('')
      setSubmitted(false)
      setLoading(false)
      setError('')
      setPaymentTab('card')
      setFname(''); setLname(''); setEmail(''); setDedication('')
      setGiftAid(false)
      setOpen(true)
      document.body.style.overflow = 'hidden'
    }
    window.addEventListener('open-donate-modal', handler)
    return () => window.removeEventListener('open-donate-modal', handler)
  }, [])

  const close = () => { setOpen(false); document.body.style.overflow = '' }

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount
  const displayAmount = `£${finalAmount.toLocaleString()}`

  const submit = async () => {
    if (!fname || !email) { setError('Please enter your name and email.'); return }
    if (!finalAmount || finalAmount <= 0) { setError('Please select or enter a donation amount.'); return }
    setLoading(true); setError('')
    const { error: dbError } = await supabase.from('donations').insert({
      name: `${fname} ${lname}`.trim(),
      email, amount: finalAmount,
      type: donation?.id || 'general',
      gift_aid: giftAid,
      dedication: dedication || null,
      payment_method: paymentTab,
      status: 'pending',
    })
    setLoading(false)
    if (dbError) { setError('Something went wrong. Please try again or contact us directly.'); return }
    setSubmitted(true)
  }

  if (!open || !donation) return null

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && close()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{donation.title}</h2>
          <button className={styles.close} onClick={close}>✕</button>
        </div>
        <div className={styles.body}>
          {!submitted ? (
            <>
              <p className={styles.desc}>{donation.desc}</p>
              <div className={styles.amountSection}>
                <label>Select Amount</label>
                <div className={styles.amountGrid}>
                  {donation.presetAmounts.map(amt => (
                    <button key={amt} className={`${styles.amountBtn} ${selectedAmount === amt && !customAmount ? styles.selected : ''}`}
                      onClick={() => { setSelectedAmount(amt); setCustomAmount('') }}>
                      £{amt.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className={styles.customRow}>
                  <div className={styles.customInput}>
                    <span>£</span>
                    <input type="number" placeholder="Other amount" value={customAmount}
                      onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(0) }} />
                  </div>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className="form-group"><label>First Name *</label><input type="text" value={fname} onChange={e => setFname(e.target.value)} placeholder="Muhammad" /></div>
                <div className="form-group"><label>Last Name</label><input type="text" value={lname} onChange={e => setLname(e.target.value)} placeholder="Ali" /></div>
              </div>
              <div className="form-group"><label>Email *</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" /></div>
              {donation.id === 'isaale' && (
                <div className="form-group"><label>Dedication</label><input type="text" value={dedication} onChange={e => setDedication(e.target.value)} placeholder="In memory of..." /></div>
              )}
              <div className={styles.paymentSection}>
                <label>Payment Method</label>
                <div className={styles.tabs}>
                  {(['card','bacs','paypal'] as const).map(tab => (
                    <button key={tab} className={`${styles.tab} ${paymentTab===tab?styles.tabActive:''}`} onClick={()=>setPaymentTab(tab)}>
                      {tab==='card'?'💳 Card':tab==='bacs'?'🏦 Bank':'🅿️ PayPal'}
                    </button>
                  ))}
                </div>
                {paymentTab==='card' && (
                  <div className={styles.cardFields}>
                    <div className={styles.cardIcons}>
                      <span style={{color:'#1a1f71'}}>VISA</span><span style={{color:'#eb001b'}}>MC</span><span style={{color:'#006fcf'}}>AMEX</span>
                    </div>
                    <div className="form-group"><label>Card Number</label><input type="text" placeholder="1234 5678 9012 3456" maxLength={19}/></div>
                    <div className={styles.formRow}>
                      <div className="form-group"><label>Expiry</label><input type="text" placeholder="MM / YY" maxLength={7}/></div>
                      <div className="form-group"><label>CVV</label><input type="text" placeholder="123" maxLength={4}/></div>
                    </div>
                  </div>
                )}
                {paymentTab==='bacs' && <div className={styles.bacsBox}><p>Please email <strong>Admin@hsmzf.org</strong> for our bank details and use your full name as the reference.</p></div>}
                {paymentTab==='paypal' && (
                  <div className={styles.paypalBox}>
                    <p>Donate via PayPal Giving Fund — 100% reaches us with no fees.</p>
                    <a href={siteConfig.payments.paypal} target="_blank" rel="noopener noreferrer" className={styles.paypalBtn}>Open PayPal ↗</a>
                  </div>
                )}
              </div>
              <div className={styles.giftAid}>
                <input type="checkbox" id="ga" checked={giftAid} onChange={e=>setGiftAid(e.target.checked)} />
                <label htmlFor="ga"><strong>Boost your donation by 25% with Gift Aid 🇬🇧</strong><br/>I am a UK taxpayer and confirm this donation is eligible for Gift Aid.</label>
              </div>
              {error && <p className={styles.errorMsg}>⚠️ {error}</p>}
              <button className={styles.submitBtn} onClick={submit} disabled={loading}>
                {loading ? 'Processing...' : `Complete Donation · ${displayAmount}`}
              </button>
              <p className={styles.secureNote}>🔒 Secure & encrypted · Charity No. {siteConfig.org.charityNumber}</p>
            </>
          ) : (
            <div className={styles.success}>
              <div className={styles.successIcon}>🌟</div>
              <h3>JazakAllah Khayran!</h3>
              <p>Your donation of <strong>{displayAmount}</strong> has been recorded. May Allah accept it and grant you the highest reward.</p>
              <br/><button className={styles.closeBtn} onClick={close}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
