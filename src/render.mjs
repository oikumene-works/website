// Static renderer; directory, project data and page shell are independent.
export function renderSite(site,projects,brand,css,language,headers){
 const out={};
 const t=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#39;");
 const p=(s,cls='')=>`<p${cls?` class="${cls}"`:''}>${t(s)}</p>`;
 const link=(url,label,attrs='')=>`<a href="${t(url)}"${attrs?' '+attrs:''}>${t(label)}</a>`;
 const keys=['home','about','feedback','privacy'];
 const projectPath=(c,id)=>c.projectBase+id+'/';
 const brandLink=(url,label)=>`<a href="${t(url)}" class="brand"><img class="brand-mark" src="${t(brand.markUrl)}" width="36" height="36" alt="" decoding="async"><span>${t(label)}</span></a>`;
 const head=(lang,title,otherPath=null)=>`<!doctype html>\n<html lang="${lang}">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="robots" content="noindex, nofollow">\n<meta name="referrer" content="no-referrer">\n<title>${t(title)} | Oikumene</title>\n<link rel="stylesheet" href="/assets/site.css">\n<link rel="icon" type="image/svg+xml" sizes="any" href="${t(brand.faviconUrl)}">\n${otherPath?`<link rel="alternate" hreflang="${lang==='fi'?'en':'fi'}" href="${t(otherPath)}">\n`:''}<script defer src="/assets/language.js"></script>\n</head>\n`;
 function shell(c,key,title,body,id=null){
  const other=site[c.locale==='fi'?'en':'fi'],path=id?projectPath(c,id):c.paths[key],otherPath=id?projectPath(other,id):other.paths[key];
  const choice=`<nav class="language-choice" aria-label="${t(c.langLabel)}">${['fi','en'].map(l=>link(l===c.locale?path:otherPath,l.toUpperCase(),`lang="${l}" hreflang="${l}" aria-label="${l==='fi'?'Suomi':'English'}" data-language-choice="${l}"${l===c.locale?' aria-current="true"':''}`)).join('<span aria-hidden="true">/</span>')}</nav>`;
  return head(c.locale,title,otherPath)+`<body>\n<a class="skip" href="#content">${t(c.skip)}</a>\n<div class="preview">${t(c.preview)}</div>\n<header><div class="wrap header-row">${brandLink(c.paths.home,c.brand)}<nav class="main-nav" aria-label="${t(c.navLabel)}"><ul class="nav-list">${keys.map(k=>`<li>${link(c.paths[k],c.nav[k],key===k&&!id?'aria-current="page"':'')}</li>`).join('')}</ul></nav>${choice}</div></header>\n<main id="content" class="wrap"><div class="prose">${body}</div></main>\n<footer><div class="wrap">${p(c.footer)}</div></footer>\n</body></html>\n`;
 }
 // Actions may have different labels and destinations for each language. No
 // generic call to action, no empty wrapper, no compulsory external target.
 function actions(q,c,extra=''){
  const a=(q.actions??[]).map(x=>x[c.locale]).filter(Boolean);
  return a.length?`<div class="project-actions${extra?' '+extra:''}">${a.map(x=>link(x.href,x.label)).join('')}</div>`:'';
 }
 function directory(c,headingLevel=1){
  const titleTag='h'+headingLevel,itemTag='h'+(headingLevel+1);
  return `<section class="project-directory" aria-labelledby="projects-heading"><${titleTag} id="projects-heading">${t(c.home.heading)}</${titleTag}><ul class="project-list">${projects.map(q=>{const d=q[c.locale];return `<li><${itemTag}>${link(projectPath(c,q.id),d.name)}</${itemTag}>${d.description?p(d.description):''}${actions(q,c)}</li>`;}).join('')}</ul></section>`;
 }
 function about(c){
  const d=c.about;return `<h1>${t(d.heading)}</h1>${p(d.lead)}${d.sections.map(s=>`<section><h2>${t(s.heading)}</h2>${s.paragraphs.map(x=>p(x)).join('')}</section>`).join('')}`;
 }
 function project(c,q){
  const d=q[c.locale],m=d.metadata??[];
  return `<h1>${t(d.name)}</h1>${d.description?p(d.description,'lead'):''}${actions(q,c,'project-detail-actions')}${(d.detail??[]).map(s=>p(s)).join('')}${m.length?`<section class="project-details"><h2>${t(c.projectDetails)}</h2><dl>${m.map(x=>`<dt>${t(x.label)}</dt><dd>${x.href?link(x.href,x.value):t(x.value)}</dd>`).join('')}</dl></section>`:''}<p class="back-link">${link(c.paths.home+'#projects-heading',c.home.back)}</p>`;
 }
 function feedback(c){const d=c.feedback;return `<h1>${t(d.heading)}</h1>${p(d.lead,'lead')}<aside class="note">${p(d.instructions)}</aside><fieldset disabled aria-describedby="unavailable"><legend>${t(d.formHeading)}</legend><label for="message">${t(d.message)}</label><textarea id="message" rows="5" maxlength="4000"></textarea><label for="reply">${t(d.reply)}</label><input type="email" id="reply"><button type="button" disabled>${t(d.button)}</button></fieldset><p id="unavailable" class="rule">${t(d.unavailable)}</p>${p(d.email)}`;}
 function privacy(c){const d=c.privacy;return `<h1>${t(d.heading)}</h1>${p(d.lead,'lead')}${d.paragraphs.map(s=>p(s)).join('')}<aside class="note">${p(d.note)}</aside>`;}
 for(const c of Object.values(site)){
  const bodies={home:()=>directory(c),about:()=>about(c),feedback:()=>feedback(c),privacy:()=>privacy(c)};
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
