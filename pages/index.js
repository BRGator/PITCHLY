// pages/index.js (React with Tailwind + Dark Mode)

import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Home() {
  const [brief, setBrief] = useState('')
  const [role, setRole] = useState('Designer')
  const [tone, setTone] = useState('Professional')
  const [style, setStyle] = useState('Direct')
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
    }
  }, [])

  const generateProposal = async () => {
    setLoading(true)
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brief, role, tone, style, to, from })
    })
    const data = await res.json()
    setResponse(data.proposal)
    setLoading(false)
  }

  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-gray-100 text-gray-900 min-h-screen'}>
      <Head>
        <title>Pitchly | AI Proposal Generator</title>
      </Head>

      <header className="text-center p-10 border-b border-gray-300 dark:border-gray-700">
        <img src="/logo.png" alt="Pitchly logo" className="mx-auto h-14 mb-4" />
        <h1 className="text-3xl font-bold">Win More Clients with AI-Generated Proposals</h1>
        <p className="text-sm mt-2 max-w-xl mx-auto">
          Pitchly helps freelancers and agencies create personalized, persuasive proposals in seconds — not hours.
        </p>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold mb-4">Generate Your Proposal</h2>

        <div className="grid gap-4">
          <input
            className="p-3 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
            placeholder="To (Client Name)"
            value={to}
            onChange={e => setTo(e.target.value)}
          />
          <input
            className="p-3 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
            placeholder="From (Your Name)"
            value={from}
            onChange={e => setFrom(e.target.value)}
          />
          <textarea
            rows={6}
            placeholder="Paste job description here..."
            value={brief}
            onChange={e => setBrief(e.target.value)}
            className="p-3 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
          />
          <div className="flex flex-wrap gap-4">
            <select className="p-2 rounded bg-white dark:bg-gray-800 border dark:border-gray-600" value={role} onChange={e => setRole(e.target.value)}>
              <option>Designer</option>
              <option>Developer</option>
              <option>Marketer</option>
              <option>Copywriter</option>
            </select>
            <select className="p-2 rounded bg-white dark:bg-gray-800 border dark:border-gray-600" value={tone} onChange={e => setTone(e.target.value)}>
              <option>Professional</option>
              <option>Friendly</option>
              <option>Bold</option>
              <option>Humble</option>
            </select>
            <select className="p-2 rounded bg-white dark:bg-gray-800 border dark:border-gray-600" value={style} onChange={e => setStyle(e.target.value)}>
              <option>Direct</option>
              <option>Detailed</option>
              <option>Persuasive</option>
              <option>Creative</option>
            </select>
          </div>

          <button
            onClick={generateProposal}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? 'Generating...' : 'Generate Proposal'}
          </button>

          {response && (
            <div className="mt-6 p-5 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-2">Your Proposal:</h3>
              <pre className="whitespace-pre-wrap text-sm overflow-x-auto">
                {response}
              </pre>
            </div>
          )}
        </div>
      </main>

      <footer className="text-center py-4 text-sm border-t border-gray-300 dark:border-gray-700">
        &copy; {new Date().getFullYear()} Pitchly. All rights reserved.
      </footer>
    </div>
  )
}
