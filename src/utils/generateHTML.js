function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function heroHTML(hero) {
  const btn = hero.showButton
    ? `\n<a class="hero-link" href="${esc(hero.buttonHref)}">${esc(hero.buttonText)}</a>`
    : ''

  const img = hero.imageUrl
    ? `<img alt="${esc(hero.imageAlt)}" border="0" class="hero-image" src="${esc(hero.imageUrl)}" />`
    : `<div style="width:100%;height:100%;background:#ccc;display:flex;align-items:center;justify-content:center;color:#666;font-family:poppins;">No image set</div>`

  return `<!-- HERO -->
<div class="homeHero-inner">
<div class="homeHero-1">${img}</div>
<div class="homeHero-2">
<div class="homeHero-2-inner">
<h1 class="homeHero-title">${esc(hero.title)}</h1>
<p class="homeHero-subtitle">${esc(hero.subtitle)}</p>${btn}
</div>
</div>
</div>`
}

function heroCss(hero) {
  return `<style type="text/css">
.homeHero-2-inner {
    max-width: 555px !important;
}
@media screen and (max-width: 800px) {
    .homeHero-2 {
        height: 80% !important;
    }
}
.co_body * {
    font-family: poppins !important;
}

.homeHero-inner {
width: 100%;
display: flex;
flex-direction: row;
height: 800px;
}

.homeHero-1 {
width: 45%;
height: 800px;
overflow: hidden;
position: relative;
}

.homeHero-2 {
background-color: ${hero.bgColor};
width: 55%;
padding: 40px;
color: ${hero.textColor};
display: flex;
align-items: center;
flex-direction: column;
}

.hero-image {
width: 100%;
height: 100% !important;
object-fit: cover !important;
object-position: center;
}

.homeHero-2 {
background-color: ${hero.bgColor};
width: 60%;
padding: 40px;
color: ${hero.textColor};
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
}

.homeHero-title {
font-size: 45px !important;
color: ${hero.textColor} !important;
font-family: archivo;
font-weight: 700;
word-spacing: 5px;
}

.homeHero-subtitle {
    font-size: 17px !important;
    margin-top: 15px !important;
    font-family: 'poppins' !important;
    font-weight: 300;
    color: ${hero.textColor} !important;
}

a.hero-link {
color: ${hero.textColor};
text-decoration: none !important;
font-family: archivo !important;
margin-top: 42px;
display: flex;
}

.homeHero-2-inner {
max-width: 500px;
}

@media screen and (max-width: 800px) {
.homeHero-subtitle {
    text-align: center;
}
.homeHero-title {
    text-align: center;
}
.homeHero-inner {
        margin-top: 0 !important;
    }
.homeHero-inner {
display: flex;
flex-direction: column-reverse !important;
align-items: center;
height: 750px !important;
}
.homeHero-2 {
width: 100% !important;
}
.homeHero-1 {
width: 100%!important;
}
.homeHero-2 {
height: 80% !important;
}
.homeHero-1 {
height: 40% !important;
}
.homeHero-2-inner {
max-width: 300px !important;
}
.homeHero-title {
font-size: 40px !important;
        line-height: 1.4;
        margin-bottom: 25px;
}
.homeHero-2-inner {
display: flex;
flex-direction: column;
align-items: center;
}
}
</style>`
}

function headerHTML(section) {
  const idAttr = section.anchorId ? ` id="${esc(section.anchorId)}"` : ''
  const subtitle = section.subtitle
    ? `\n<p style="max-width:650px; margin:20px auto 0; font-family:poppins; font-size:18px; color:${section.subtitleColor};">${esc(section.subtitle)}</p>`
    : ''
  return `<!-- ${section.title.toUpperCase().replace(/[<>]/g, '') || 'HEADER'} -->
<div${idAttr} style="width:100%; padding:80px 40px; text-align:center; background:${section.bgColor};">
<h2 style="font-family:archivo; font-size:46px; margin:0; color:${section.titleColor};">${esc(section.title)}</h2>${subtitle}
</div>`
}

function sectionHTML(section, globalBgColor, globalTextColor, globalButtonBgColor) {
  const img = section.imageUrl
    ? `<img alt="${esc(section.imageAlt)}" border="0" class="about-image" src="${esc(section.imageUrl)}" />`
    : `<div style="width:100%;height:100%;background:#ccc;display:flex;align-items:center;justify-content:center;color:#666;font-family:poppins;">No image set</div>`

  const bgDiffers = section.bgColor !== globalBgColor
  const textDiffers = section.textColor !== globalTextColor
  const btnBgDiffers = section.buttonBgColor !== globalButtonBgColor

  const panelStyle = (bgDiffers || textDiffers)
    ? ` style="${bgDiffers ? `background-color:${section.bgColor};` : ''}${textDiffers ? `color:${section.textColor};` : ''}"`
    : ''
  const titleStyle = textDiffers ? ` style="color:${section.textColor};"` : ''
  const btnStyle = section.showButton && btnBgDiffers ? ` style="background:${section.buttonBgColor};"` : ''

  const btn = section.showButton
    ? `\n<a class="about-link"${btnStyle} href="${esc(section.buttonHref)}">${esc(section.buttonText)}</a>`
    : ''

  const flipClass = section.flip ? ' flip' : ''
  const comment = section.title ? `\n<!-- ${section.title.toUpperCase().replace(/[<>]/g, '')} -->` : ''

  if (section.flip) {
    return `${comment}
<div class="aboutSection-inner${flipClass}">
<div class="aboutSection-1">${img}</div>
<div class="aboutSection-2"${panelStyle}>
<div class="aboutSection-2-inner">
<h2 class="aboutSection-title"${titleStyle}>${esc(section.title)}</h2>
<p class="aboutSection-subtitle">${esc(section.subtitle)}</p>${btn}
</div>
</div>
</div>`
  }

  return `${comment}
<div class="aboutSection-inner${flipClass}">
<div class="aboutSection-2"${panelStyle}>
<div class="aboutSection-2-inner">
<h2 class="aboutSection-title"${titleStyle}>${esc(section.title)}</h2>
<p class="aboutSection-subtitle">${esc(section.subtitle)}</p>${btn}
</div>
</div>
<div class="aboutSection-1">${img}</div>
</div>`
}

function sectionsCss(globalBgColor, globalTextColor, globalButtonBgColor) {
  return `<style type="text/css">.aboutSection-inner {
width: 100%;
display: flex;
flex-direction: row;
height: 500px;
}

.aboutSection-1 {
width: 50%;
overflow: hidden;
position: relative;
}

.about-image {
width: 100%;
height: 100% !important;
object-fit: cover !important;
object-position: center;
}

.aboutSection-2 {
background-color: ${globalBgColor};
width: 50%;
padding: 40px;
color: ${globalTextColor};
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
}

h2.aboutSection-title {
    font-size: 40px !important;
    font-family: archivo;
    font-weight: 700;
    word-spacing: 5px;
    color: ${globalTextColor};
}

.aboutSection-subtitle {
font-size: 17px;
margin-top: 15px;
font-family: 'Archivo';
font-weight: 300;
line-height: 150%;
}

.about-link {
color: #fff;
text-decoration: none !important;
font-family: archivo !important;
margin-top: 25px;
display: inline-block;
background: ${globalButtonBgColor};
padding: 12px 25px;
transition: 0.2s;
}
.about-link:hover {
background: #0000002e !important;
color: #000;
}

.aboutSection-2-inner {
max-width: 500px;
}

@media screen and (max-width: 800px) {
.aboutSection-inner {
display: flex;
flex-direction: column !important;
align-items: center;
height: unset !important;
}
.aboutSection-title {
    text-align: center;
}
.aboutSection-subtitle {
text-align: center;
}
.aboutSection-2 {
width: 100% !important;
}

.aboutSection-1 {
width: 100% !important;
}

.aboutSection-2 {
height: auto !important;
padding: 70px 40px !important;
}

.aboutSection-1 {
height: 220px !important;
}

.aboutSection-2-inner {
max-width: 300px !important;
}

.aboutSection-title {
font-size: 40px !important;
}

.aboutSection-2-inner {
display: flex;
flex-direction: column;
align-items: center;
}
.flip {
flex-direction: column-reverse!important;
}
}

.body_wrapper.clearfix.co_body {
    padding: 0px !important;
    margin: 0px !important;
}
.body_wrapper.clearfix.co_body {
    width: 100% !important;
}
#co_body_container {
    padding: 0px !important;
}
@media only screen and (min-width: 320px) {
    .content .co_body {
        margin-left: 0px !important;
        margin-right: 0px !important;
    }
}
.master-content-wrapper.g960 {
    display: none !important;
}
.co_body .content p, .cps-container h1, .cps-container h2, .cps-container p, html body.cco_body, html body.cco_body p {
    color: ${globalTextColor};
    font-size: 17px;
}
h2 {
    line-height: 1;
}
.article-body h2 {
    margin-bottom: 30px;
}
h1.homeHero-title {
    line-height: 1.2;
}
</style>`
}

export function generateHTML(hero, sections) {
  const parts = []

  parts.push(heroHTML(hero))
  parts.push(heroCss(hero))

  if (sections.length > 0) {
    // Use first content section's colors as the global theme for shared CSS
    const firstContent = sections.find(s => s.type !== 'header') || sections[0]
    const globalBgColor = firstContent.bgColor || '#ffffff'
    const globalTextColor = firstContent.textColor || '#333333'
    const globalButtonBgColor = firstContent.buttonBgColor || firstContent.textColor || '#333333'

    for (const section of sections) {
      if (section.type === 'header') {
        parts.push(headerHTML(section))
      } else {
        parts.push(sectionHTML(section, globalBgColor, globalTextColor, globalButtonBgColor))
      }
    }

    parts.push(sectionsCss(globalBgColor, globalTextColor, globalButtonBgColor))
  }

  return parts.join('\n')
}
