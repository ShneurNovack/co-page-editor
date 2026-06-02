import { useState, useCallback } from 'react'
import HeroEditor from './components/HeroEditor'
import SectionEditor from './components/SectionEditor'
import Preview from './components/Preview'
import { generateHTML } from './utils/generateHTML'
import './App.css'

const defaultHero = {
  imageUrl: '',
  imageAlt: 'Hero image',
  title: 'Your Title Here',
  subtitle: 'Your subtitle goes here',
  bgColor: '#3E5239',
  textColor: '#ffffff',
  showButton: true,
  buttonText: 'Continue Reading →',
  buttonHref: '#aboutread',
}

const newSection = () => ({
  id: `s${Date.now()}`,
  imageUrl: '',
  imageAlt: 'Section image',
  title: 'Section Title',
  subtitle: 'Section description goes here.',
  bgColor: '#ffebef',
  textColor: '#824550',
  flip: false,
  showButton: false,
  buttonText: 'Learn More →',
  buttonHref: '#',
  buttonBgColor: '#82454f',
})

export default function App() {
  const [hero, setHero] = useState(defaultHero)
  const [sections, setSections] = useState([])
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('hero')

  const addSection = () => {
    const s = newSection()
    setSections(prev => [...prev, s])
    setActiveTab(`section-${s.id}`)
  }

  const updateSection = useCallback((id, updates) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  }, [])

  const removeSection = useCallback((id) => {
    setSections(prev => prev.filter(s => s.id !== id))
    setActiveTab('hero')
  }, [])

  const moveSection = useCallback((id, dir) => {
    setSections(prev => {
      const idx = prev.findIndex(s => s.id === id)
      if (idx < 0) return prev
      const next = [...prev]
      const swap = idx + dir
      if (swap < 0 || swap >= next.length) return prev
      ;[next[idx], next[swap]] = [next[swap], next[idx]]
      return next
    })
  }, [])

  const handleCopy = () => {
    const html = generateHTML(hero, sections)
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Page Editor</h1>
          <button className="copy-btn" onClick={handleCopy}>
            {copied ? '✓ Copied!' : '⎘ Copy HTML'}
          </button>
        </div>

        <div className="section-list">
          <div
            className={`section-tab ${activeTab === 'hero' ? 'active' : ''}`}
            onClick={() => setActiveTab('hero')}
          >
            <span className="tab-icon">★</span>
            Hero Section
          </div>

          {sections.map((s, i) => (
            <div
              key={s.id}
              className={`section-tab ${activeTab === `section-${s.id}` ? 'active' : ''}`}
              onClick={() => setActiveTab(`section-${s.id}`)}
            >
              <span className="tab-icon">▬</span>
              <span className="tab-title">{s.title || `Section ${i + 1}`}</span>
              <div className="tab-actions" onClick={e => e.stopPropagation()}>
                <button onClick={() => moveSection(s.id, -1)} disabled={i === 0} title="Move up">↑</button>
                <button onClick={() => moveSection(s.id, 1)} disabled={i === sections.length - 1} title="Move down">↓</button>
                <button onClick={() => removeSection(s.id)} className="delete-btn" title="Delete">✕</button>
              </div>
            </div>
          ))}

          <button className="add-section-btn" onClick={addSection}>
            + Add Section
          </button>
        </div>
      </div>

      <div className="editor-panel">
        {activeTab === 'hero' ? (
          <HeroEditor hero={hero} onChange={setHero} />
        ) : (
          sections.filter(s => `section-${s.id}` === activeTab).map(s => (
            <SectionEditor key={s.id} section={s} onChange={updates => updateSection(s.id, updates)} />
          ))
        )}
      </div>

      <div className="preview-panel">
        <Preview hero={hero} sections={sections} />
      </div>
    </div>
  )
}
