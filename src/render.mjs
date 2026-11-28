// Static renderer; directory, project data and page shell are independent.
export function renderSite(site,projects,brand,css,language,headers){
 const out={};
 const t=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#39;");
 const p=(s,cls='')=>`<p${cls?` class="${cls}"`:''}>${t(s)}</p>`;
 const link=(url,label,attrs='')=>`<a href="${t(url)}"${attrs?' '+attrs:''}>${t(label)}</a>`;
 const keys=['home','about','feedback','privacy','agape'];
 const navKeys=['home','about','feedback'];
 const projectPath=(c,id)=>c.projectBase+id+'/';
 const brandLink=(url,label)=>`<a href="${t(url)}" class="brand"><img class="brand-mark" src="${t(brand.markUrl)}" width="36" height="36" alt="" decoding="async"><span>${t(label)}</span></a>`;
 const head=(lang,title,otherPath=null)=>`<!doctype html>\n<html lang="${lang}">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="robots" content="noindex, nofollow">\n<meta name="referrer" content="no-referrer">\n<title>${t(title)} | Oikumene</title>\n<link rel="stylesheet" href="/assets/site.css">\n<link rel="icon" type="image/svg+xml" sizes="any" href="${t(brand.faviconUrl)}">\n${otherPath?`<link rel="alternate" hreflang="${lang==='fi'?'en':'fi'}" href="${t(otherPath)}">\n`:''}<script defer src="/assets/language.js"></script>\n</head>\n`;
 function shell(c,key,title,body,id=null){
  const other=site[c.locale==='fi'?'en':'fi'],path=id?projectPath(c,id):c.paths[key],otherPath=id?projectPath(other,id):other.paths[key];
  const choice=`<nav class="language-choice" aria-label="${t(c.langLabel)}">${['fi','en'].map(l=>link(l===c.locale?path:otherPath,l.toUpperCase(),`lang="${l}" hreflang="${l}" aria-label="${l==='fi'?'Suomi':'English'}" data-language-choice="${l}"${l===c.locale?' aria-current="true"':''}`)).join('<span aria-hidden="true">/</span>')}</nav>`;
  return head(c.locale,title,otherPath)+`<body>\n<a class="skip" href="#content">${t(c.skip)}</a>\n<div class="preview">${t(c.preview)}</div>\n<header><div class="wrap header-row">${brandLink(c.paths.home,c.brand)}<nav class="main-nav" aria-label="${t(c.navLabel)}"><ul class="nav-list">${navKeys.map(k=>`<li>${link(c.paths[k],c.nav[k],key===k&&!id?'aria-current="page"':'')}</li>`).join('')}</ul></nav>${choice}</div></header>\n<main id="content" class="wrap"><div class="prose">${body}</div></main>\n<footer><div class="wrap">${p(c.footer)}<p class="footer-links">${link(c.paths.privacy,c.nav.privacy,key==='privacy'?'aria-current="page"':'')}</p></div></footer>\n</body></html>\n`;
 }
 // Actions may have different labels and destinations for each language. No
 // generic call to action, no empty wrapper, no compulsory external target.
 function actions(q,c,extra=''){
  const a=(q.actions??[]).map(x=>x[c.locale]).filter(Boolean);
  return a.length?`<div class="project-actions${extra?' '+extra:''}">${a.map(x=>link(x.href,x.label)).join('')}</div>`:'';
 }
 // Native, independent disclosure elements; no JavaScript needed to expand them.
 function directory(c){
  const rows=area=>`<ul class="project-list">${projects.filter(q=>(q.area??'software')===area).map(q=>{const d=q[c.locale];return `<li id="entry-${t(q.id)}"><h3>${link(projectPath(c,q.id),d.name)}</h3>${d.description?p(d.description):''}${actions(q,c)}</li>`;}).join('')}</ul>`;
  const folder=(id,label,body,cls='')=>`<details id="${id}" class="folder ${cls}"><summary><svg class="folder-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path class="folder-closed" d="M3 6h7l2 2h9v12H3z"/><path class="folder-open" d="M3 19V6h7l2 2h9v3M3 19l4-8h15l-3 8z"/></svg><span>${t(label)}</span></summary><div class="folder-body">${body}</div></details>`;
  return `<h1 class="visually-hidden">${t(c.home.heading)}</h1><div class="home-directory">${folder('reflection-heading',c.home.reflection,rows('reflection'),'top-folder')}${folder('projects-heading',c.home.projects,folder('software-heading',c.home.software,rows('software'))+folder('tools-heading',c.home.tools,rows('tools')),'top-folder')}</div>`;
 }
 function about(c){
  const d=c.about;return `<h1>${t(d.heading)}</h1>${d.lead?p(d.lead):''}${d.sections.map(s=>`<section><h2>${t(s.heading)}</h2>${s.paragraphs.map(x=>p(x)).join('')}${s.reference?`<p class="principles-reference">${link(s.reference.href,s.reference.label)}</p>`:''}</section>`).join('')}`;
 }
 function agape(c){const d=c.agape;return `<h1>${t(d.heading)}</h1>${d.paragraphs.map(s=>p(s)).join('')}<h2>${t(d.sourcesHeading)}</h2>${p(d.sources)}`;}
 function project(c,q){
  const d=q[c.locale],m=d.metadata??[];
  return `<h1>${t(d.name)}</h1>${d.description?p(d.description,'lead'):''}${actions(q,c,'project-detail-actions')}${(d.detail??[]).map(s=>p(s)).join('')}${m.length?`<section class="project-details"><h2>${t(q.area==='reflection'?(c.locale==='fi'?'Lisätietoja':'Further information'):c.projectDetails)}</h2><dl>${m.map(x=>`<dt>${t(x.label)}</dt><dd>${x.href?link(x.href,x.value):t(x.value)}</dd>`).join('')}</dl></section>`:''}<p class="back-link">${link(c.paths.home+'#entry-'+q.id,c.home.back)}</p>`;
 }
 function feedback(c){const d=c.feedback;return `<h1>${t(d.heading)}</h1>${p(d.lead,'lead')}<p class="feedback-address">${link("mailto:"+d.address,d.address)}</p><aside class="note">${p(d.note)}</aside>`;}
 function privacy(c){const d=c.privacy;return `<h1>${t(d.heading)}</h1>${p(d.lead,'lead')}${d.paragraphs.map(s=>p(s)).join('')}<aside class="note">${p(d.note)}</aside>`;}
 for(const c of Object.values(site)){
  const bodies={home:()=>directory(c),about:()=>about(c),feedback:()=>feedback(c),privacy:()=>privacy(c),agape:()=>agape(c)};
  for(const key of keys)out[c.paths[key].slice(1)+'index.html']=shell(c,key,c[key].heading,bodies[key]());
  for(const q of projects)out[projectPath(c,q.id).slice(1)+'index.html']=shell(c,'project',q[c.locale].name,project(c,q),q.id);
 }
 function simple(title,body){return head('en',title)+`<body><div class="preview"><span lang="fi">Suunnitteluesikatselu</span> / Design preview</div><header><div class="wrap header-row">${brandLink('/',site.en.brand)}</div></header><main id="content" class="wrap"><div class="prose"><h1>${t(title)}</h1>${body}</div></main></body></html>\n`;}
 const langLinks=`<div class="language-links">${link('/fi/','Suomi','class="primary" lang="fi" hreflang="fi" data-language-choice="fi"')}${link('/en/','English','class="primary" lang="en" hreflang="en" data-language-choice="en"')}</div>`;
 out['index.html']=simple('Oikumene',`<p class="lead"><span lang="fi">Valitse kieli.</span> Choose your language.</p>${langLinks}`);
 out['404.html']=simple('404',`<p><span lang="fi">Sivua ei löytynyt.</span> Page not found.</p>${langLinks}`);
 out['assets/site.css']=css;out['assets/language.js']=language;out[brand.markPath]=brand.markSvg;out[brand.faviconPath]=brand.faviconSvg;out['robots.txt']='User-agent: *\nDisallow: /\n';out['_headers']=headers;
 return out;
}
