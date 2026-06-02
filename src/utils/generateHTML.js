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

  return `<div class="homeHero-inner">
<div class="homeHero-1">${img}</div>
<div class="homeHero-2">
<div class="homeHero-2-inner">
<div class="homeHero-title">${esc(hero.title)}</div>
<div class="homeHero-subtitle">${esc(hero.subtitle)}</div>${btn}
</div>
</div>
</div>`
}

function heroCss(hero) {
  return `<style type="text/css">
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
  justify-content: center;
}
.hero-image {
  width: 100%;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center;
}
.homeHero-title {
  font-size: 45px;
  font-family: archivo;
  font-weight: 700;
  word-spacing: 5px;
  text-align: center;
}
.homeHero-subtitle {
  font-size: 17px;
  margin-top: 15px;
  font-family: 'Archivo';
  font-weight: 300;
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
  .homeHero-inner {
    display: flex;
    flex-direction: column-reverse !important;
    align-items: center;
    height: 750px !important;
    margin-top: 0 !important;
  }
  .homeHero-2 { width: 100% !important; height: 60% !important; }
  .homeHero-1 { width: 100% !important; height: 40% !important; }
  .homeHero-2-inner {
    max-width: 300px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .homeHero-title { font-size: 40px !important; line-height: 1.4; margin-bottom: 25px; text-align: center; }
  .homeHero-subtitle { text-align: center; }
}
</style>`
}

function sectionHTML(section) {
  const img = section.imageUrl
    ? `<img alt="${esc(section.imageAlt)}" border="0" class="about-image-${section.id}" src="${esc(section.imageUrl)}" />`
    : `<div style="width:100%;height:100%;background:#ccc;display:flex;align-items:center;justify-content:center;color:#666;font-family:poppins;">No image set</div>`

  const btn = section.showButton
    ? `\n<a class="about-link-${section.id}" href="${esc(section.buttonHref)}">${esc(section.buttonText)}</a>`
    : ''

  const flipClass = section.flip ? ' flip' : ''

  if (section.flip) {
    return `<div class="aboutSection-inner${flipClass} section-${section.id}">
<div class="aboutSection-1-${section.id}">${img}</div>
<div class="aboutSection-2-${section.id}">
<div class="aboutSection-2-inner-${section.id}">
<div class="aboutSection-title-${section.id}">${esc(section.title)}</div>
<div class="aboutSection-subtitle-${section.id}">${esc(section.subtitle)}</div>${btn}
</div>
</div>
</div>`
  }

  return `<div class="aboutSection-inner${flipClass} section-${section.id}">
<div class="aboutSection-2-${section.id}">
<div class="aboutSection-2-inner-${section.id}">
<div class="aboutSection-title-${section.id}">${esc(section.title)}</div>
<div class="aboutSection-subtitle-${section.id}">${esc(section.subtitle)}</div>${btn}
</div>
</div>
<div class="aboutSection-1-${section.id}">${img}</div>
</div>`
}

function sectionCss(section) {
  const id = section.id

  const btnCss = section.showButton ? `
.about-link-${id} {
  color: #fff;
  text-decoration: none !important;
  font-family: archivo !important;
  margin-top: 25px;
  display: inline-block;
  background: ${section.buttonBgColor};
  padding: 12px 25px;
  transition: 0.2s;
}
.about-link-${id}:hover {
  background: #0000002e !important;
  color: #000;
}` : ''

  return `<style type="text/css">
.section-${id} {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 500px;
}
.aboutSection-1-${id} {
  width: 45%;
  overflow: hidden;
  position: relative;
}
.about-image-${id} {
  width: 100%;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center;
}
.aboutSection-2-${id} {
  background-color: ${section.bgColor};
  width: 55%;
  padding: 40px;
  color: ${section.textColor};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.aboutSection-title-${id} {
  font-size: 40px;
  font-family: archivo;
  font-weight: 700;
  word-spacing: 5px;
}
.aboutSection-subtitle-${id} {
  font-size: 17px;
  margin-top: 15px;
  font-family: 'Archivo';
  font-weight: 300;
  line-height: 150%;
}${btnCss}
.aboutSection-2-inner-${id} {
  max-width: 500px;
}
@media screen and (max-width: 800px) {
  .section-${id} {
    display: flex;
    flex-direction: column !important;
    align-items: center;
    height: unset !important;
  }
  .aboutSection-title-${id} { text-align: center; font-size: 40px !important; }
  .aboutSection-subtitle-${id} { text-align: center; }
  .aboutSection-2-${id} { width: 100% !important; height: auto !important; padding: 70px 40px !important; }
  .aboutSection-1-${id} { width: 100% !important; height: 220px !important; }
  .aboutSection-2-inner-${id} { max-width: 300px !important; display: flex; flex-direction: column; align-items: center; }
  .section-${id}.flip { flex-direction: column-reverse !important; }
}
</style>`
}

function globalCss() {
  return `<style type="text/css">
.body_wrapper.clearfix.co_body { padding: 0px !important; margin: 0px !important; width: 100% !important; }
#co_body_container { padding: 0px !important; }
@media only screen and (min-width: 320px) {
  .content .co_body { margin-left: 0px !important; margin-right: 0px !important; }
}
.master-content-wrapper.g960 { display: none !important; }
</style>`
}

export function generateHTML(hero, sections) {
  const parts = []

  parts.push(heroHTML(hero))
  parts.push(heroCss(hero))

  for (const section of sections) {
    parts.push(sectionHTML(section))
    parts.push(sectionCss(section))
  }

  if (sections.length > 0) {
    parts.push(globalCss())
  }

  return parts.join('\n')
}
