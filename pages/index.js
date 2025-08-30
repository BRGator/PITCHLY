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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background-color: #f9fafb;
          color: #1f2937;
        }
        h1, h2 {
          color: #111827;
        }
        button {
          background-color: #4f46e5;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 1rem;
        }
        button:disabled {
          opacity: 0.6;
        }
        .hero {
          background: white;
          padding: 4rem 2rem;
          text-align: center;
          border-bottom: 1px solid #e5e7eb;
        }
        .section {
          padding: 3rem 2rem;
          max-width: 800px;
          margin: auto;
        }
      `}</style>

      <header className="hero">
        <img src="/logo.png" alt="Pitchly logo" style={{ height: '60px', marginBottom: '1rem' }} />
        <h1>Win More Clients with AI-Generated Proposals</h1>
        <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
          Pitchly helps freelancers and agencies create personalized, persuasive proposals in seconds — not hours.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <button onClick={() => document.getElementById('generator').scrollIntoView({ behavior: 'smooth' })}>
            Try it Free
          </button>
          <button style={{ backgroundColor: '#6366f1' }}>See a Sample</button>
        </div>
        <img src="/hero.png" alt="Pitchly hero" style={{ width: '100%', maxWidth: '600px', marginTop: '2rem' }} />
      </header>

      <main className="section" id="generator">
        <h2>Generate Your Proposal</h2>
        <textarea
          rows={6}
          placeholder="Paste job description here..."
          value={brief}
          onChange={e => setBrief(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
        />

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
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
          <div style={{ marginTop: '2rem', backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem' }}>
            <h3>Your Proposal:</h3>
            <pre>{response}</pre>
          </div>
        )}
      </main>

      <footer className="section" style={{ textAlign: 'center', fontSize: '0.9rem', color: '#6b7280' }}>
        &copy; {new Date().getFullYear()} Pitchly. All rights reserved.
      </footer>
    </div>
  )
}
