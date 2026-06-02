import { generateHTML } from '../utils/generateHTML'

export default function Preview({ hero, sections }) {
  const html = generateHTML(hero, sections)

  return (
    <div className="preview-container">
      <div className="preview-header">Live Preview</div>
      <iframe
        className="preview-iframe"
        srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet"></head><body style="margin:0;padding:0;">${html}</body></html>`}
        title="Preview"
      />
    </div>
  )
}
