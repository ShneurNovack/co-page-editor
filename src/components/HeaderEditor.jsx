export default function HeaderEditor({ section, onChange }) {
  const set = (key) => (val) => onChange({ [key]: val })

  return (
    <div className="editor-form">
      <h2 className="form-title">Title Header</h2>

      <div className="form-group">
        <label>Heading</label>
        <input
          type="text"
          value={section.title}
          onChange={e => set('title')(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Subtext</label>
        <textarea
          value={section.subtitle}
          onChange={e => set('subtitle')(e.target.value)}
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Background Color</label>
          <div className="color-input">
            <input type="color" value={section.bgColor} onChange={e => set('bgColor')(e.target.value)} />
            <input type="text" value={section.bgColor} onChange={e => set('bgColor')(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>Heading Color</label>
          <div className="color-input">
            <input type="color" value={section.titleColor} onChange={e => set('titleColor')(e.target.value)} />
            <input type="text" value={section.titleColor} onChange={e => set('titleColor')(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Subtext Color</label>
        <div className="color-input" style={{ maxWidth: '180px' }}>
          <input type="color" value={section.subtitleColor} onChange={e => set('subtitleColor')(e.target.value)} />
          <input type="text" value={section.subtitleColor} onChange={e => set('subtitleColor')(e.target.value)} />
        </div>
      </div>

      <div className="form-group">
        <label>Anchor ID <span className="label-hint">(optional — used for scroll links like #restaurants)</span></label>
        <input
          type="text"
          value={section.anchorId}
          onChange={e => set('anchorId')(e.target.value)}
          placeholder="e.g. restaurants"
        />
      </div>
    </div>
  )
}
