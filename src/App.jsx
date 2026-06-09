import { useState, useCallback } from 'react'
import HeroEditor from './components/HeroEditor'
import SectionEditor from './components/SectionEditor'
import HeaderEditor from './components/HeaderEditor'
import Preview from './components/Preview'
import { generateHTML } from './utils/generateHTML'
import { parseHTML } from './utils/parseHTML'
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
  type: 'content',
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

const newHeader = () => ({
  type: 'header',
  id: `s${Date.now()}`,
  title: 'Section Title',
  subtitle: 'A short description for this section.',
  bgColor: '#ffffff',
  titleColor: '#3E5239',
  subtitleColor: '#333333',
  anchorId: '',
})

export default function App() {
  const [hero, setHero] = useState(defaultHero)
  const [sections, setSections] = useState([])
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('hero')
  const [showImport, setShowImport] = useState(false)
  const [importText, setImportText] = useState('')
  const [importError, setImportError] = useState('')

  const addSection = () => {
    const s = newSection()
    setSections(prev => [...prev, s])
    setActiveTab(`section-${s.id}`)
  }

  const addHeader = () => {
    const s = newHeader()
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

  const handleImport = () => {
    try {
      const { hero: newHero, sections: newSections } = parseHTML(importText)
      setHero(newHero)
      setSections(newSections)
      setShowImport(false)
      setImportText('')
      setImportError('')
      setActiveTab('hero')
    } catch (e) {
      setImportError('Could not parse the HTML. Make sure it uses the correct format.')
    }
  }

  const handleCopy = () => {
    const html = generateHTML(hero, sections)
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const activeSection = sections.find(s => `section-${s.id}` === activeTab)

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Page Editor</h1>
          <div className="header-btns">
            <button className="import-btn" onClick={() => { setShowImport(true); setImportError('') }}>
              ↓ Import HTML
            </button>
            <button className="copy-btn" onClick={handleCopy}>
              {copied ? '✓ Copied!' : '⎘ Copy HTML'}
            </button>
          </div>
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
              <span className="tab-icon">{s.type === 'header' ? '⬛' : '▬'}</span>
              <span className="tab-title">{s.title || `Section ${i + 1}`}</span>
              <span className="tab-type-badge">{s.type === 'header' ? 'HDR' : 'IMG'}</span>
              <div className="tab-actions" onClick={e => e.stopPropagation()}>
                <button onClick={() => moveSection(s.id, -1)} disabled={i === 0} title="Move up">↑</button>
                <button onClick={() => moveSection(s.id, 1)} disabled={i === sections.length - 1} title="Move down">↓</button>
                <button onClick={() => removeSection(s.id)} className="delete-btn" title="Delete">✕</button>
              </div>
            </div>
          ))}

          <div className="add-buttons">
            <button className="add-section-btn" onClick={addSection}>+ Image Section</button>
            <button className="add-section-btn add-header-btn" onClick={addHeader}>+ Title Header</button>
          </div>
        </div>
      </div>

      <div className="editor-panel">
        {activeTab === 'hero' ? (
          <HeroEditor hero={hero} onChange={setHero} />
        ) : activeSection?.type === 'header' ? (
          <HeaderEditor key={activeSection.id} section={activeSection} onChange={updates => updateSection(activeSection.id, updates)} />
        ) : activeSection ? (
          <SectionEditor key={activeSection.id} section={activeSection} onChange={updates => updateSection(activeSection.id, updates)} />
        ) : null}
      </div>

      <div className="preview-panel">
        <Preview hero={hero} sections={sections} />
      </div>

      {showImport && (
        <div className="modal-overlay" onClick={() => setShowImport(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Import HTML</h2>
            <p className="modal-desc">Paste existing page HTML below. All sections will be loaded into the editor.</p>
            <textarea
              className="modal-textarea"
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder="Paste HTML here..."
              rows={18}
              autoFocus
            />
            {importError && <p className="import-error">{importError}</p>}
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setShowImport(false)}>Cancel</button>
              <button className="modal-confirm" onClick={handleImport} disabled={!importText.trim()}>
                Import & Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
