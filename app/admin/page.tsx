'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import styles from './admin.module.css'

const ADMIN_PASSWORD = 'hsmzf2024'

type Tab = 'content' | 'images' | 'donations' | 'messages' | 'progress'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [wrongPassword, setWrongPassword] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('content')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [donations, setDonations] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [uploading, setUploading] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [currentUploadKey, setCurrentUploadKey] = useState('')

  const login = () => {
    if (password === ADMIN_PASSWORD) { setAuthed(true) }
    else { setWrongPassword(true); setTimeout(() => setWrongPassword(false), 2000) }
  }

  useEffect(() => {
    if (!authed) return
    loadSettings()
    loadDonations()
    loadMessages()
  }, [authed])

  const loadSettings = async () => {
    const { data } = await supabase.from('site_settings').select('*')
    if (data) {
      const map: Record<string, string> = {}
      data.forEach((row: any) => { map[row.key] = row.value || '' })
      setSettings(map)
    }
  }

  const loadDonations = async () => {
    const { data } = await supabase.from('donations').select('*').order('created_at', { ascending: false })
    if (data) setDonations(data)
  }

  const loadMessages = async () => {
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
    if (data) setMessages(data)
  }

  const saveSetting = async (key: string, value: string) => {
    await supabase.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString() })
  }

  const saveAllContent = async () => {
    setSaving(true)
    const updates = Object.entries(settings).map(([key, value]) =>
      supabase.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString() })
    )
    await Promise.all(updates)
    setSaving(false)
    setSaveMsg('✅ Saved! Changes will appear on the website shortly.')
    setTimeout(() => setSaveMsg(''), 4000)
  }

  const uploadImage = async (file: File, settingKey: string) => {
    setUploading(settingKey)
    const ext = file.name.split('.').pop()
    const fileName = `${settingKey}-${Date.now()}.${ext}`
    const { data, error } = await supabase.storage.from('hsmzf-images').upload(fileName, file, { upsert: true })
    if (error) { alert('Upload failed: ' + error.message); setUploading(null); return }
    const { data: urlData } = supabase.storage.from('hsmzf-images').getPublicUrl(fileName)
    const url = urlData.publicUrl
    setSettings(prev => ({ ...prev, [settingKey]: url }))
    await saveSetting(settingKey, url)
    setUploading(null)
    setSaveMsg('✅ Image uploaded successfully!')
    setTimeout(() => setSaveMsg(''), 3000)
  }

  const totalRaised = donations.filter(d => d.status !== 'cancelled').reduce((sum, d) => sum + (d.amount || 0), 0)
  const giftAidCount = donations.filter(d => d.gift_aid).length

  if (!authed) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginBox}>
          <div className={styles.loginLogo}>🕌</div>
          <h1>HSMZF Admin</h1>
          <p>Enter your password to manage the website</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            className={wrongPassword ? styles.wrongInput : ''}
          />
          {wrongPassword && <p className={styles.wrongMsg}>Incorrect password</p>}
          <button onClick={login}>Log In</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.admin}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.headerLogo}>🕌</span>
          <div>
            <h1>HSMZF Admin</h1>
            <p>Manage your website content</p>
          </div>
        </div>
        <a href="/" target="_blank" className={styles.viewSite}>View Live Site ↗</a>
      </div>

      {/* Stats bar */}
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <div className={styles.statNum}>£{totalRaised.toLocaleString()}</div>
          <div className={styles.statLabel}>Total Donated</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>{donations.length}</div>
          <div className={styles.statLabel}>Donations</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>{giftAidCount}</div>
          <div className={styles.statLabel}>Gift Aid</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>{messages.length}</div>
          <div className={styles.statLabel}>Messages</div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {([
          { id: 'content', label: '📝 Text Content' },
          { id: 'images', label: '🖼️ Images & Logo' },
          { id: 'progress', label: '📈 Progress Bar' },
          { id: 'donations', label: '💰 Donations' },
          { id: 'messages', label: '✉️ Messages' },
        ] as { id: Tab; label: string }[]).map(t => (
          <button
            key={t.id}
            className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>

        {/* ── TEXT CONTENT ── */}
        {activeTab === 'content' && (
          <div className={styles.section}>
            <h2>Edit Website Text</h2>
            <p className={styles.hint}>Change any text below and click Save. The website will update automatically.</p>

            <div className={styles.fieldGroup}>
              <h3>🏠 Home Page — Hero</h3>
              <div className={styles.field}>
                <label>Main Heading</label>
                <input value={settings.hero_heading || ''} onChange={e => setSettings(p => ({ ...p, hero_heading: e.target.value }))} />
              </div>
              <div className={styles.field}>
                <label>Italic Heading (green text)</label>
                <input value={settings.hero_heading_italic || ''} onChange={e => setSettings(p => ({ ...p, hero_heading_italic: e.target.value }))} />
              </div>
              <div className={styles.field}>
                <label>Hero Description</label>
                <textarea rows={3} value={settings.hero_subtext || ''} onChange={e => setSettings(p => ({ ...p, hero_subtext: e.target.value }))} />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <h3>📖 About Section</h3>
              <div className={styles.field}>
                <label>First Paragraph</label>
                <textarea rows={3} value={settings.about_paragraph1 || ''} onChange={e => setSettings(p => ({ ...p, about_paragraph1: e.target.value }))} />
              </div>
              <div className={styles.field}>
                <label>Second Paragraph</label>
                <textarea rows={3} value={settings.about_paragraph2 || ''} onChange={e => setSettings(p => ({ ...p, about_paragraph2: e.target.value }))} />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <h3>📞 Contact Details</h3>
              <div className={styles.field}>
                <label>Phone Number</label>
                <input value={settings.phone || ''} onChange={e => setSettings(p => ({ ...p, phone: e.target.value }))} />
              </div>
              <div className={styles.field}>
                <label>Email Address</label>
                <input value={settings.email || ''} onChange={e => setSettings(p => ({ ...p, email: e.target.value }))} />
              </div>
            </div>

            {saveMsg && <div className={styles.saveMsg}>{saveMsg}</div>}
            <button className={styles.saveBtn} onClick={saveAllContent} disabled={saving}>
              {saving ? 'Saving...' : '💾 Save All Changes'}
            </button>
          </div>
        )}

        {/* ── IMAGES ── */}
        {activeTab === 'images' && (
          <div className={styles.section}>
            <h2>Images & Logo</h2>
            <p className={styles.hint}>Click "Upload" on any image to replace it. Images update on the website instantly.</p>
            <input type="file" ref={fileRef} style={{ display: 'none' }} accept="image/*"
              onChange={e => { if (e.target.files?.[0]) uploadImage(e.target.files[0], currentUploadKey) }} />

            {[
              { key: 'logo_url', label: '🏷️ Logo', desc: 'Appears in the top-left navbar on every page' },
              { key: 'hero_image_url', label: '🏠 Hero Image', desc: 'Large image on the home page' },
              { key: 'about_image1_url', label: '📖 About Image (main)', desc: 'Large photo in the About section' },
              { key: 'about_image2_url', label: '📖 About Image (small)', desc: 'Small overlapping photo in About section' },
              { key: 'project_image1_url', label: '🏗️ Project Photo 1', desc: 'First photo on the Project page' },
              { key: 'project_image2_url', label: '🏗️ Project Photo 2', desc: 'Second photo on the Project page' },
              { key: 'project_image3_url', label: '🏗️ Project Photo 3', desc: 'Third photo on the Project page' },
            ].map(img => (
              <div key={img.key} className={styles.imageRow}>
                <div className={styles.imagePreview}>
                  {settings[img.key]
                    ? <img src={settings[img.key]} alt={img.label} />
                    : <div className={styles.imagePlaceholder}>No image yet</div>
                  }
                </div>
                <div className={styles.imageInfo}>
                  <strong>{img.label}</strong>
                  <p>{img.desc}</p>
                  <button
                    className={styles.uploadBtn}
                    disabled={uploading === img.key}
                    onClick={() => { setCurrentUploadKey(img.key); fileRef.current?.click() }}
                  >
                    {uploading === img.key ? 'Uploading...' : '📤 Upload Image'}
                  </button>
                  {settings[img.key] && (
                    <button className={styles.removeBtn} onClick={async () => {
                      setSettings(p => ({ ...p, [img.key]: '' }))
                      await saveSetting(img.key, '')
                    }}>Remove</button>
                  )}
                </div>
              </div>
            ))}
            {saveMsg && <div className={styles.saveMsg}>{saveMsg}</div>}
          </div>
        )}

        {/* ── PROGRESS BAR ── */}
        {activeTab === 'progress' && (
          <div className={styles.section}>
            <h2>📈 Fundraising Progress Bar</h2>
            <p className={styles.hint}>Update the progress bar shown on the home page.</p>
            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <label>Progress Percentage (0–100)</label>
                <input
                  type="number" min="0" max="100"
                  value={settings.progress_percent || '38'}
                  onChange={e => setSettings(p => ({ ...p, progress_percent: e.target.value }))}
                />
                <small>Current: {settings.progress_percent || 38}% complete</small>
              </div>
              <div className={styles.progressPreview}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${settings.progress_percent || 38}%` }} />
                </div>
                <p>{settings.progress_percent || 38}% of target reached</p>
              </div>
            </div>
            {saveMsg && <div className={styles.saveMsg}>{saveMsg}</div>}
            <button className={styles.saveBtn} onClick={saveAllContent} disabled={saving}>
              {saving ? 'Saving...' : '💾 Save Progress'}
            </button>
          </div>
        )}

        {/* ── DONATIONS ── */}
        {activeTab === 'donations' && (
          <div className={styles.section}>
            <h2>💰 Donations</h2>
            <p className={styles.hint}>{donations.length} donations recorded · Total: <strong>£{totalRaised.toLocaleString()}</strong></p>
            {donations.length === 0 ? (
              <div className={styles.empty}>No donations yet. They will appear here when people donate.</div>
            ) : (
              <div className={styles.table}>
                <div className={styles.tableHead}>
                  <span>Name</span><span>Email</span><span>Amount</span><span>Type</span><span>Gift Aid</span><span>Date</span>
                </div>
                {donations.map(d => (
                  <div key={d.id} className={styles.tableRow}>
                    <span>{d.name}</span>
                    <span>{d.email}</span>
                    <span className={styles.amount}>£{d.amount?.toLocaleString()}</span>
                    <span>{d.type}</span>
                    <span>{d.gift_aid ? '✅ Yes' : '—'}</span>
                    <span>{new Date(d.created_at).toLocaleDateString('en-GB')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── MESSAGES ── */}
        {activeTab === 'messages' && (
          <div className={styles.section}>
            <h2>✉️ Contact Messages</h2>
            <p className={styles.hint}>{messages.length} messages received</p>
            {messages.length === 0 ? (
              <div className={styles.empty}>No messages yet. They will appear here when people contact you.</div>
            ) : (
              <div className={styles.messageList}>
                {messages.map(m => (
                  <div key={m.id} className={styles.messageCard}>
                    <div className={styles.messageHeader}>
                      <strong>{m.first_name} {m.last_name}</strong>
                      <span>{new Date(m.created_at).toLocaleDateString('en-GB')}</span>
                    </div>
                    <div className={styles.messageMeta}>
                      <a href={`mailto:${m.email}`}>{m.email}</a> · {m.subject}
                    </div>
                    <p className={styles.messageBody}>{m.message}</p>
                    <a href={`mailto:${m.email}?subject=Re: ${m.subject}`} className={styles.replyBtn}>
                      Reply via Email →
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
