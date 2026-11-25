import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/content.mjs';
import { brand } from '../src/brand.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = join(root, 'public');
const source = 'https://github.com/oikumene-works/christian-belief-explorer';
const escape = (s) => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const t = escape;
const p = (s, cls='') => `<p${cls?` class="${cls}"`:''}>${t(s)}</p>`;
const link = (url,label,attrs='') => `<a href="${t(url)}"${attrs?` ${attrs}`:''}>${t(label)}</a>`;
const keys = ['home','about','feedback','privacy'];
const brandLink = (url, label) => `<a href="${t(url)}" class="brand"><img class="brand-mark" src="${t(brand.markUrl)}" width="36" height="36" alt="" decoding="async"><span>${t(label)}</span></a>`;
const faviconLink = () => `<link rel="icon" type="image/svg+xml" sizes="any" href="${t(brand.faviconUrl)}">`;
function shell(lang, key, title, body) {
  const c=site[lang], other=site[lang==='fi'?'en':'fi'];
  return `<!doctype html>\n<html lang="${lang}">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="robots" content="noindex, nofollow">\n<meta name="referrer" content="no-referrer">\n<title>${t(title)} | Oikumene Works</title>\n<link rel="stylesheet" href="/assets/site.css">${faviconLink()}\n<link rel="alternate" hreflang="${other.locale}" href="${t(other.paths[key])}">\n</head>\n<body>\n<a class="skip" href="#content">${t(c.skip)}</a>\n<div class="preview">${t(c.preview)}</div>\n<header><div class="wrap header-row">${brandLink(c.paths.home,c.brand)}<nav aria-label="${lang==='fi'?'Päävalikko':'Main navigation'}"><ul class="nav-list">${keys.map(k=>`<li>${link(c.paths[k],c.nav[k],key===k?'aria-current="page"':'')}</li>`).join('')}</ul></nav>${link(other.paths[key],other.language,`class="lang" lang="${other.locale}" hreflang="${other.locale}"`)}</div></header>\n<main id="content" class="wrap"><div class="prose">${body}</div></main>\n<footer><div class="wrap">${p(c.footer)}</div></footer>\n</body></html>\n`;
}
function bodyFor(c,key) {
  const d=c[key];
  if(key==='home') return `${p(d.kicker,'eyebrow')}<h1>${t(d.heading)}</h1>${p(d.lead,'lead')}<section class="rule"><h2>${t(d.section)}</h2>${p(d.description)}<aside class="note">${p(d.status)}</aside>${link(c.paths.about,d.cta,'class="primary"')}</section>`;
  if(key==='about') return `<h1>${t(d.heading)}</h1>${p(d.lead,'lead')}<h2>${t(d.section)}</h2>${d.paragraphs.map(s=>p(s)).join('')}<ul><li>${link(source,d.sources)}</li><li>${link(`${source}/blob/main/LICENSE`,d.license)}</li></ul><aside class="note">${p(d.disclaimer)}</aside>`;
  if(key==='feedback') return `<h1>${t(d.heading)}</h1>${p(d.lead,'lead')}<aside class="note">${p(d.instructions)}</aside><fieldset disabled aria-describedby="unavailable"><legend>${t(d.formHeading)}</legend><label for="message">${t(d.message)}</label><textarea id="message" rows="5" maxlength="4000"></textarea><label for="reply">${t(d.reply)}</label><input type="email" id="reply"><button type="button" disabled>${t(d.button)}</button></fieldset><p id="unavailable" class="rule">${t(d.unavailable)}</p>${p(d.email)}`;
  return `<h1>${t(d.heading)}</h1>${p(d.lead,'lead')}${d.paragraphs.map(s=>p(s)).join('')}<aside class="note">${p(d.note)}</aside>`;
}
async function write(rel, data) {
  const dest=join(out,rel); await mkdir(resolve(dest,'..'),{recursive:true}); await writeFile(dest,data,'utf8');
}
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});
await write('assets/site.css',await readFile(join(root,'src/styles.css'),'utf8'));
await write(brand.markPath,brand.markSvg);
await write(brand.faviconPath,brand.faviconSvg);
for (const [lang,c] of Object.entries(site)) {
  for(const key of keys) await write(c.paths[key].slice(1)+'index.html',shell(lang,key,c[key].heading,bodyFor(c,key)));
}
const simple = (heading,body) => `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><meta name="referrer" content="no-referrer"><title>${t(heading)} | Oikumene Works</title><link rel="stylesheet" href="/assets/site.css">${faviconLink()}</head><body><div class="preview"><span lang="fi">Tekninen esikatselu</span> / Technical preview</div><header><div class="wrap header-row">${brandLink('/',site.en.brand)}</div></header><main id="content" class="wrap"><div class="prose"><h1>${t(heading)}</h1>${body}</div></main></body></html>\n`;
await write('index.html',simple('Oikumene Works',`<p class="lead"><span lang="fi">Valitse kieli.</span> Choose your language.</p><div class="language-links">${link('/fi/','Suomi','class="primary" lang="fi" hreflang="fi"')}${link('/en/','English','class="primary" lang="en" hreflang="en"')}</div>`));
await write('404.html',simple('404',`<p><span lang="fi">Sivua ei löytynyt.</span> Page not found.</p><div class="language-links">${link('/fi/','Suomi','class="primary" lang="fi"')}${link('/en/','English','class="primary"')}</div>`));
await write('robots.txt','User-agent: *\nDisallow: /\n');
// Cloudflare Workers Static Assets consumes these on deployment, not the Python local preview.
await write('_headers',`/*\n  X-Robots-Tag: noindex, nofollow\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: no-referrer\n  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: default-src 'none'; style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'\n`);
console.log('Built 10 HTML pages, CSS, shared brand SVGs, preview robots and headers.');
