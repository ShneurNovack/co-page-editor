export default function SectionEditor({ section, onChange }) {
  const set = (key) => (val) => onChange({ [key]: val })

  return (
    <div className="editor-form">
      <h2 className="form-title">Content Section</h2>

      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          value={section.imageUrl}
          onChange={e => set('imageUrl')(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="form-group">
        <label>Image Alt Text</label>
        <input
          type="text"
          value={section.imageAlt}
          onChange={e => set('imageAlt')(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={section.title}
          onChange={e => set('title')(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Body Text</label>
        <textarea
          value={section.subtitle}
          onChange={e => set('subtitle')(e.target.value)}
          rows={5}
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
          <label>Text Color</label>
          <div className="color-input">
            <input type="color" value={section.textColor} onChange={e => set('textColor')(e.target.value)} />
            <input type="text" value={section.textColor} onChange={e => set('textColor')(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={section.flip}
            onChange={e => set('flip')(e.target.checked)}
          />
          Flip layout (image on left)
        </label>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={section.showButton}
            onChange={e => set('showButton')(e.target.checked)}
          />
          Show Button
        </label>
      </div>

      {section.showButton && (
        <>
          <div className="form-group">
            <label>Button Text</label>
            <input
              type="text"
              value={section.buttonText}
              onChange={e => set('buttonText')(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Button Link (href)</label>
            <input
              type="text"
              value={section.buttonHref}
              onChange={e => set('buttonHref')(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Button Background Color</label>
            <div className="color-input">
              <input type="color" value={section.buttonBgColor} onChange={e => set('buttonBgColor')(e.target.value)} />
              <input type="text" value={section.buttonBgColor} onChange={e => set('buttonBgColor')(e.target.value)} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
