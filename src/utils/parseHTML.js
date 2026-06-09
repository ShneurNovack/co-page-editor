function extractColorFromStyle(styleAttr, prop) {
  if (!styleAttr) return null
  const re = new RegExp(prop + '\\s*:\\s*(#[^;!\\s}]+)', 'i')
  const m = styleAttr.match(re)
  return m ? m[1].trim() : null
}

function extractColorFromCSS(css, selector, prop) {
  // Escape special regex chars in selector
  const sel = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(sel + '\\s*\\{[^}]*?' + prop + '\\s*:\\s*(#[^;!\\s}]+)', 'is')
  const m = css.match(re)
  return m ? m[1].trim() : null
}

function freshId(index) {
  return `s${Date.now()}${index}`
}

export function parseHTML(htmlString) {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html')

  // Pull all CSS text for global rule extraction
  const css = Array.from(doc.querySelectorAll('style')).map(s => s.textContent).join('\n')

  // --- Hero ---
  const heroEl = doc.querySelector('.homeHero-inner')
  let hero = {
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

  if (heroEl) {
    const imgEl = heroEl.querySelector('.hero-image')
    const titleEl = heroEl.querySelector('.homeHero-title')
    const subtitleEl = heroEl.querySelector('.homeHero-subtitle')
    const btnEl = heroEl.querySelector('a.hero-link')

    const bgColor =
      extractColorFromCSS(css, '.homeHero-2', 'background-color') ||
      '#3E5239'
    const textColor =
      extractColorFromCSS(css, '.homeHero-title', 'color') ||
      extractColorFromCSS(css, '.homeHero-subtitle', 'color') ||
      '#ffffff'

    hero = {
      imageUrl: imgEl?.getAttribute('src') || '',
      imageAlt: imgEl?.getAttribute('alt') || 'Hero image',
      title: titleEl?.textContent?.trim() || '',
      subtitle: subtitleEl?.textContent?.trim() || '',
      bgColor,
      textColor,
      showButton: !!btnEl,
      buttonText: btnEl?.textContent?.trim() || 'Continue Reading →',
      buttonHref: btnEl?.getAttribute('href') || '#',
    }
  }

  // Global section theme from CSS
  const globalBg =
    extractColorFromCSS(css, '.aboutSection-2', 'background-color') || '#ffebef'
  const globalText =
    extractColorFromCSS(css, 'h2\\.aboutSection-title', 'color') ||
    extractColorFromCSS(css, '.aboutSection-2', 'color') ||
    '#824550'
  const globalButtonBg =
    extractColorFromCSS(css, '.about-link', 'background') ||
    extractColorFromCSS(css, '.about-link', 'background-color') ||
    globalText

  // --- Sections (walk body children in document order) ---
  const sections = []
  let idx = 0

  for (const el of Array.from(doc.body.children)) {
    if (el.tagName === 'STYLE') continue
    if (el === heroEl || el.classList.contains('homeHero-inner')) continue

    if (el.classList.contains('aboutSection-inner')) {
      // Content section
      const flip = el.classList.contains('flip')
      const imgEl = el.querySelector('.about-image')
      const titleEl = el.querySelector('.aboutSection-title')
      const subtitleEls = el.querySelectorAll('.aboutSection-subtitle')
      const btnEl = el.querySelector('a.about-link')
      const panel2 = el.querySelector('.aboutSection-2')

      const panel2Style = panel2?.getAttribute('style') || ''
      const bgColor =
        extractColorFromStyle(panel2Style, 'background-color') ||
        extractColorFromStyle(panel2Style, 'background') ||
        globalBg

      const textColor =
        extractColorFromStyle(panel2Style, 'color') ||
        extractColorFromStyle(titleEl?.getAttribute('style') || '', 'color') ||
        globalText

      const btnStyle = btnEl?.getAttribute('style') || ''
      const buttonBgColor =
        extractColorFromStyle(btnStyle, 'background') ||
        extractColorFromStyle(btnStyle, 'background-color') ||
        globalButtonBg

      const subtitle = Array.from(subtitleEls)
        .map(e => e.textContent.trim())
        .filter(Boolean)
        .join('\n')

      sections.push({
        type: 'content',
        id: freshId(idx++),
        imageUrl: imgEl?.getAttribute('src') || '',
        imageAlt: imgEl?.getAttribute('alt') || 'Section image',
        title: titleEl?.textContent?.trim() || '',
        subtitle,
        bgColor,
        textColor,
        flip,
        showButton: !!btnEl,
        buttonText: btnEl?.textContent?.trim() || 'Learn More →',
        buttonHref: btnEl?.getAttribute('href') || '#',
        buttonBgColor,
      })
    } else if (el.tagName === 'DIV') {
      // Detect header divider: has h2 child and text-align:center in style
      const elStyle = el.getAttribute('style') || ''
      const hasCenter = /text-align\s*:\s*center/i.test(elStyle)
      const h2 = el.querySelector('h2')
      if (hasCenter && h2) {
        const p = el.querySelector('p')
        const bgColor =
          extractColorFromStyle(elStyle, 'background') ||
          extractColorFromStyle(elStyle, 'background-color') ||
          '#ffffff'
        const titleColor =
          extractColorFromStyle(h2.getAttribute('style') || '', 'color') ||
          '#3E5239'
        const subtitleColor =
          extractColorFromStyle(p?.getAttribute('style') || '', 'color') ||
          '#333333'

        sections.push({
          type: 'header',
          id: freshId(idx++),
          title: h2.textContent?.trim() || '',
          subtitle: p?.textContent?.trim() || '',
          bgColor,
          titleColor,
          subtitleColor,
          anchorId: el.getAttribute('id') || '',
        })
      }
    }
  }

  return { hero, sections }
}
