import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [brief, setBrief] = useState('')
  const [role, setRole] = useState('Designer')
  const [tone, setTone] = useState('Professional')
  const [style, setStyle] = useState('Direct')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const generateProposal = async () => {
    setLoading(true)
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brief, role, tone, style })
    })
    const data = await res.json()
    setResponse(data.proposal)
    setLoading(false)
  }

  return (
    <div>
      <Head>
        <title>Pitchly | AI Proposal Generator</title>
      </Head>
      <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1>🚀 Pitchly</h1>
        <p>Instantly generate AI-powered client proposals.</p>

        <textarea rows={6} placeholder="Paste job description here..." value={brief} onChange={e => setBrief(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option>Designer</option>
            <option>Developer</option>
            <option>Marketer</option>
            <option>Copywriter</option>
          </select>
          <select value={tone} onChange={e => setTone(e.target.value)}>
            <option>Professional</option>
            <option>Friendly</option>
            <option>Bold</option>
            <option>Humble</option>
          </select>
          <select value={style} onChange={e => setStyle(e.target.value)}>
            <option>Direct</option>
            <option>Detailed</option>
            <option>Persuasive</option>
            <option>Creative</option>
          </select>
        </div>

        <button onClick={generateProposal} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Proposal'}
        </button>

        {response && (
          <div style={{ marginTop: '2rem' }}>
            <h3>Your Proposal:</h3>
            <pre>{response}</pre>
          </div>
        )}
      </main>
    </div>
  )
}
