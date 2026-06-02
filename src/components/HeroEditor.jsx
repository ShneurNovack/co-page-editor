export default function HeroEditor({ hero, onChange }) {
  const set = (key) => (val) => onChange({ ...hero, [key]: val })

  return (
    <div className="editor-form">
      <h2 className="form-title">Hero Section</h2>

      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          value={hero.imageUrl}
          onChange={e => set('imageUrl')(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="form-group">
        <label>Image Alt Text</label>
        <input
          type="text"
          value={hero.imageAlt}
          onChange={e => set('imageAlt')(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={hero.title}
          onChange={e => set('title')(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Subtitle</label>
        <textarea
          value={hero.subtitle}
          onChange={e => set('subtitle')(e.target.value)}
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Background Color</label>
          <div className="color-input">
            <input type="color" value={hero.bgColor} onChange={e => set('bgColor')(e.target.value)} />
            <input type="text" value={hero.bgColor} onChange={e => set('bgColor')(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>Text Color</label>
          <div className="color-input">
            <input type="color" value={hero.textColor} onChange={e => set('textColor')(e.target.value)} />
            <input type="text" value={hero.textColor} onChange={e => set('textColor')(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={hero.showButton}
            onChange={e => set('showButton')(e.target.checked)}
          />
          Show Button
        </label>
      </div>

      {hero.showButton && (
        <>
          <div className="form-group">
            <label>Button Text</label>
            <input
              type="text"
              value={hero.buttonText}
              onChange={e => set('buttonText')(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Button Link (href)</label>
            <input
              type="text"
              value={hero.buttonHref}
              onChange={e => set('buttonHref')(e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  )
}
