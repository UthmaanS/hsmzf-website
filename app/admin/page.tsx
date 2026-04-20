'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [donations, setDonations] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [tab, setTab] = useState('images')
  const [images, setImages] = useState<Record<string,string>>({})
  const [uploading, setUploading] = useState('')
  const [saveMsg, setSaveMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploadKey, setUploadKey] = useState('')

  const login = () => {
    if (password === 'hsmzf2024') setAuthed(true)
    else alert('Wrong password')
  }

  useEffect(() => {
    if (!authed) return
    supabase.from('donations').select('*').order('created_at', { ascending: false }).then(({ data }) => data && setDonations(data))
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).then(({ data }) => data && setMessages(data))
    supabase.from('site_settings').select('*').then(({ data }) => {
      if (data) {
        const map: Record<string,string> = {}
        data.forEach((r: any) => { map[r.key] = r.value || '' })
        setImages(map)
      }
    })
  }, [authed])

  const uploadImage = async (file: File, key: string) => {
    setUploading(key)
    const ext = file.name.split('.').pop()
    const fileName = `${key}-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('hsmzf-images').upload(fileName, file, { upsert: true })
    if (error) { alert('Upload failed: ' + error.message); setUploading(''); return }
    const { data: urlData } = supabase.storage.from('hsmzf-images').getPublicUrl(fileName)
    const url = urlData.publicUrl
    await supabase.from('site_settings').upsert({ key, value: url, updated_at: new Date().toISOString() })
    setImages(prev => ({ ...prev, [key]: url }))
    setUploading('')
    setSaveMsg('✅ Image uploaded successfully!')
    setTimeout(() => setSaveMsg(''), 3000)
  }

  const total = donations.reduce((s, d) => s + (d.amount || 0), 0)

  const imageSlots = [
    { key: 'logo_url', label: '🏷️ Logo', desc: 'Top-left navbar logo on every page' },
    { key: 'hero_image_url', label: '🏠 Hero Image', desc: 'Large image on the home page' },
    { key: 'about_image1_url', label: '📖 About Image (main)', desc: 'Large photo in the About section' },
    { key: 'about_image2_url', label: '📖 About Image (small)', desc: 'Small overlapping photo in About section' },
    { key: 'project_image1_url', label: '🏗️ Project Photo 1', desc: 'First photo on the Project page' },
    { key: 'project_image2_url', label: '🏗️ Project Photo 2', desc: 'Second photo on the Project page' },
    { key: 'project_image3_url', label: '🏗️ Project Photo 3', desc: 'Third photo on the Project page' },
  ]

  if (!authed) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#1a3a2a' }}>
      <div style={{ background:'#fff', borderRadius:16, padding:'2.5rem', width:340, textAlign:'center' }}>
        <div style={{ fontSize:'2.5rem', marginBottom:'0.75rem' }}>🕌</div>
        <h1 style={{ fontFamily:'serif', fontSize:'1.8rem', color:'#1a3a2a', marginBottom:'0.5rem' }}>HSMZF Admin</h1>
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key==='Enter' && login()}
          style={{ width:'100%', padding:'0.75rem', borderRadius:8, border:'1px solid #ccc', fontSize:'1rem', marginBottom:'0.75rem', boxSizing:'border-box' as any }} />
        <button onClick={login} style={{ width:'100%', padding:'0.75rem', background:'#1a3a2a', color:'#fff', border:'none', borderRadius:8, fontSize:'1rem', cursor:'pointer' }}>
          Log In
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#f5f5f5' }}>
      {/* Header */}
      <div style={{ background:'#1a3a2a', padding:'1rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h1 style={{ color:'#fff', fontFamily:'serif', fontSize:'1.5rem', margin:0 }}>🕌 HSMZF Admin</h1>
        <a href="/" target="_blank" style={{ color:'#c9a84c', fontSize:'0.85rem' }}>View Site ↗</a>
      </div>

      {/* Stats */}
      <div style={{ background:'#0e2018', display:'grid', gridTemplateColumns:'repeat(3,1fr)', padding:'1rem 2rem', gap:'1rem' }}>
        {[{ n:`£${total.toLocaleString()}`, l:'Total Donated' }, { n:donations.length, l:'Donations' }, { n:messages.length, l:'Messages' }].map(s => (
          <div key={s.l} style={{ textAlign:'center' }}>
            <div style={{ fontFamily:'serif', fontSize:'1.8rem', color:'#e4c97e' }}>{s.n}</div>
            <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.5)', textTransform:'uppercase' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', background:'#fff', borderBottom:'2px solid #eee', padding:'0 2rem' }}>
        {[
          { id:'images', label:'🖼️ Images & Logo' },
          { id:'donations', label:'💰 Donations' },
          { id:'messages', label:'✉️ Messages' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding:'1rem', border:'none', background:'none', cursor:'pointer', fontWeight: tab===t.id ? 600 : 400, borderBottom: tab===t.id ? '3px solid #1a3a2a' : '3px solid transparent', whiteSpace:'nowrap' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding:'2rem', maxWidth:900, margin:'0 auto' }}>

        {/* IMAGES TAB */}
        {tab === 'images' && (
          <div>
            <h2 style={{ fontFamily:'serif', color:'#1a3a2a', marginBottom:'0.5rem' }}>🖼️ Images & Logo</h2>
            <p style={{ color:'#666', fontSize:'0.88rem', marginBottom:'1.5rem' }}>Click Upload on any image to replace it. Changes appear on the website instantly.</p>
            {saveMsg && <div style={{ background:'#e8f5e9', border:'1px solid #a5d6a7', borderRadius:8, padding:'0.75rem 1rem', marginBottom:'1rem', color:'#2e7d32' }}>{saveMsg}</div>}
            <input type="file" ref={fileRef} style={{ display:'none' }} accept="image/*"
              onChange={e => { if (e.target.files?.[0]) uploadImage(e.target.files[0], uploadKey) }} />
            {imageSlots.map(img => (
              <div key={img.key} style={{ background:'#fff', borderRadius:12, padding:'1.25rem', marginBottom:'1rem', border:'1px solid #eee', display:'flex', gap:'1.25rem', alignItems:'center' }}>
                <div style={{ width:100, height:70, borderRadius:8, overflow:'hidden', border:'1px solid #eee', background:'#f5f5f5', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {images[img.key]
                    ? <img src={images[img.key]} alt={img.label} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    : <span style={{ fontSize:'0.7rem', color:'#999', textAlign:'center', padding:'0.25rem' }}>No image</span>
                  }
                </div>
                <div style={{ flex:1 }}>
                  <strong style={{ color:'#1a3a2a', display:'block', marginBottom:4 }}>{img.label}</strong>
                  <p style={{ fontSize:'0.8rem', color:'#666', margin:'0 0 0.75rem' }}>{img.desc}</p>
                  <button
                    disabled={uploading === img.key}
                    onClick={() => { setUploadKey(img.key); fileRef.current?.click() }}
                    style={{ background:'#1a3a2a', color:'#fff', border:'none', padding:'0.5rem 1rem', borderRadius:8, fontSize:'0.8rem', fontWeight:600, cursor:'pointer', marginRight:'0.5rem', opacity: uploading===img.key ? 0.6 : 1 }}>
                    {uploading === img.key ? 'Uploading...' : '📤 Upload Image'}
                  </button>
                  {images[img.key] && (
                    <button onClick={async () => {
                      await supabase.from('site_settings').upsert({ key: img.key, value: '', updated_at: new Date().toISOString() })
                      setImages(prev => ({ ...prev, [img.key]: '' }))
                    }} style={{ background:'none', border:'1px solid #e74c3c', color:'#e74c3c', padding:'0.5rem 0.75rem', borderRadius:8, fontSize:'0.78rem', cursor:'pointer' }}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DONATIONS TAB */}
        {tab === 'donations' && (
          <div>
            <h2 style={{ fontFamily:'serif', color:'#1a3a2a' }}>💰 Donations</h2>
            <p style={{ color:'#666', fontSize:'0.88rem', marginBottom:'1.5rem' }}>{donations.length} donations · Total: <strong>£{total.toLocaleString()}</strong></p>
            {donations.length === 0 ? <p style={{ color:'#999' }}>No donations yet.</p> : (
              <table style={{ width:'100%', borderCollapse:'collapse', background:'#fff', borderRadius:8, overflow:'hidden' }}>
                <thead><tr style={{ background:'#1a3a2a', color:'#e4c97e' }}>
                  {['Name','Email','Amount','Type','Gift Aid','Date'].map(h => <th key={h} style={{ padding:'0.75rem', textAlign:'left', fontSize:'0.78rem' }}>{h}</th>)}
                </tr></thead>
                <tbody>{donations.map((d,i) => (
                  <tr key={d.id} style={{ background: i%2===0?'#fff':'#f9f9f9', borderBottom:'1px solid #eee' }}>
                    <td style={{ padding:'0.75rem', fontSize:'0.85rem' }}>{d.name}</td>
                    <td style={{ padding:'0.75rem', fontSize:'0.85rem' }}>{d.email}</td>
                    <td style={{ padding:'0.75rem', fontSize:'0.85rem', fontWeight:600, color:'#1a3a2a' }}>£{d.amount}</td>
                    <td style={{ padding:'0.75rem', fontSize:'0.85rem' }}>{d.type}</td>
                    <td style={{ padding:'0.75rem', fontSize:'0.85rem' }}>{d.gift_aid ? '✅' : '—'}</td>
                    <td style={{ padding:'0.75rem', fontSize:'0.85rem' }}>{new Date(d.created_at).toLocaleDateString('en-GB')}</td>
                  </tr>
                ))}</tbody>
              </table>
            )}
          </div>
        )}

        {/* MESSAGES TAB */}
        {tab === 'messages' && (
          <div>
            <h2 style={{ fontFamily:'serif', color:'#1a3a2a' }}>✉️ Messages</h2>
            <p style={{ color:'#666', fontSize:'0.88rem', marginBottom:'1.5rem' }}>{messages.length} messages received</p>
            {messages.length === 0 ? <p style={{ color:'#999' }}>No messages yet.</p> : messages.map(m => (
              <div key={m.id} style={{ background:'#fff', borderRadius:8, padding:'1.25rem', marginBottom:'1rem', border:'1px solid #eee' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <strong style={{ color:'#1a3a2a' }}>{m.first_name} {m.last_name}</strong>
                  <span style={{ fontSize:'0.78rem', color:'#999' }}>{new Date(m.created_at).toLocaleDateString('en-GB')}</span>
                </div>
                <div style={{ fontSize:'0.8rem', color:'#666', marginBottom:'0.5rem' }}>{m.email} · {m.subject}</div>
                <p style={{ fontSize:'0.9rem', marginBottom:'0.75rem' }}>{m.message}</p>
                <a href={`mailto:${m.email}`} style={{ background:'#1a3a2a', color:'#fff', padding:'0.4rem 0.9rem', borderRadius:6, fontSize:'0.78rem', textDecoration:'none' }}>Reply →</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}