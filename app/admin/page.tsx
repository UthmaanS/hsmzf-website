'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [donations, setDonations] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [tab, setTab] = useState('donations')

  const login = () => {
    if (password === 'hsmzf2024') setAuthed(true)
    else alert('Wrong password')
  }

  useEffect(() => {
    if (!authed) return
    supabase.from('donations').select('*').order('created_at', { ascending: false }).then(({ data }) => data && setDonations(data))
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).then(({ data }) => data && setMessages(data))
  }, [authed])

  const total = donations.reduce((s, d) => s + (d.amount || 0), 0)

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
      <div style={{ background:'#1a3a2a', padding:'1rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h1 style={{ color:'#fff', fontFamily:'serif', fontSize:'1.5rem', margin:0 }}>🕌 HSMZF Admin</h1>
        <a href="/" style={{ color:'#c9a84c', fontSize:'0.85rem' }}>View Site ↗</a>
      </div>
      <div style={{ background:'#0e2018', display:'grid', gridTemplateColumns:'repeat(3,1fr)', padding:'1rem 2rem', gap:'1rem' }}>
        {[{ n:`£${total.toLocaleString()}`, l:'Total Donated' }, { n:donations.length, l:'Donations' }, { n:messages.length, l:'Messages' }].map(s => (
          <div key={s.l} style={{ textAlign:'center' }}>
            <div style={{ fontFamily:'serif', fontSize:'1.8rem', color:'#e4c97e' }}>{s.n}</div>
            <div style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.5)', textTransform:'uppercase' }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', background:'#fff', borderBottom:'2px solid #eee', padding:'0 2rem' }}>
        {['donations','messages'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding:'1rem', border:'none', background:'none', cursor:'pointer', fontWeight: tab===t ? 600 : 400, borderBottom: tab===t ? '3px solid #1a3a2a' : '3px solid transparent', textTransform:'capitalize' }}>
            {t === 'donations' ? '💰 Donations' : '✉️ Messages'}
          </button>
        ))}
      </div>
      <div style={{ padding:'2rem', maxWidth:900, margin:'0 auto' }}>
        {tab === 'donations' && (
          <>
            <h2 style={{ fontFamily:'serif', color:'#1a3a2a' }}>Donations</h2>
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
          </>
        )}
        {tab === 'messages' && (
          <>
            <h2 style={{ fontFamily:'serif', color:'#1a3a2a' }}>Messages</h2>
            {messages.length === 0 ? <p style={{ color:'#999' }}>No messages yet.</p> : messages.map(m => (
              <div key={m.id} style={{ background:'#fff', borderRadius:8, padding:'1.25rem', marginBottom:'1rem', border:'1px solid #eee' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <strong>{m.first_name} {m.last_name}</strong>
                  <span style={{ fontSize:'0.78rem', color:'#999' }}>{new Date(m.created_at).toLocaleDateString('en-GB')}</span>
                </div>
                <div style={{ fontSize:'0.8rem', color:'#666', marginBottom:'0.5rem' }}>{m.email} · {m.subject}</div>
                <p style={{ fontSize:'0.9rem', marginBottom:'0.75rem' }}>{m.message}</p>
                <a href={`mailto:${m.email}`} style={{ background:'#1a3a2a', color:'#fff', padding:'0.4rem 0.9rem', borderRadius:6, fontSize:'0.78rem', textDecoration:'none' }}>Reply →</a>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}