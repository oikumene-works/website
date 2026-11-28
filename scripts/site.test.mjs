import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir,readFile,stat } from 'node:fs/promises';
import { join,resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { site } from '../src/content.mjs';
import { projects } from '../src/projects.mjs';
import { brand } from '../src/brand.mjs';
import { renderSite } from '../src/render.mjs';
const out=fileURLToPath(new URL('../public/',import.meta.url));
const read=p=>readFile(join(out,p),'utf8');
const keys=['home','about','feedback','privacy','agape'];
async function findHtml(dir=out){const files=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=join(dir,e.name);if(e.isDirectory())files.push(...await findHtml(p));else if(p.endsWith('.html'))files.push(p);}return files;}
const pathFor=(c,id)=>c.projectBase+id+'/';
const fileFor=path=>path.slice(1)+'index.html';
const otherOf=c=>site[c.locale==='fi'?'en':'fi'];
test('complete bilingual pages with one main heading and stable project routes',async()=>{
 assert.equal((await findHtml()).length,2+2*(keys.length+projects.length));
 assert.equal(new Set(projects.map(q=>q.id)).size,projects.length);
 for(const c of Object.values(site)){
  const paths=[...keys.map(k=>c.paths[k]),...projects.map(q=>pathFor(c,q.id))];
  for(const path of paths){
   const h=await read(fileFor(path));assert.ok(h.includes('<html lang="'+c.locale+'">'));
   assert.equal((h.match(/<h1\b/g)||[]).length,1,path);
   assert.match(h,/id="content"/);assert.equal((h.match(/data-language-choice=/g)||[]).length,2,path);
  }
 }
});
test('local links and assets resolve, every paired language page points to its counterpart',async()=>{
 for(const file of await findHtml()){
  const h=await readFile(file,'utf8');
  for(const m of h.matchAll(/\b(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){
   const href=m[1],dest=resolve(out,'.'+href+(href.endsWith('/')?'index.html':''));
   assert.ok(dest.startsWith(out),href);assert.ok((await stat(dest)).isFile(),href);
  }
 }
 for(const c of Object.values(site)){
  const other=otherOf(c);
  const pairs=[...keys.map(k=>[c.paths[k],other.paths[k]]),...projects.map(q=>[pathFor(c,q.id),pathFor(other,q.id)])];
  for(const [here,there] of pairs){
   const h=await read(fileFor(here));
   assert.ok(h.includes('href="'+there+'"'),here);
   assert.ok(h.includes('hreflang="'+other.locale+'" href="'+there+'"'),here);
  }
 }
});
test('email-only preview, no form, no external scripts and no indexing',async()=>{
 for(const f of await findHtml()){const h=await readFile(f,'utf8');assert.match(h,/name="robots" content="noindex, nofollow"/);assert.doesNotMatch(h,/<form\b|<fieldset\b|<textarea\b|\/api\/feedback|feedback@oikumene\.works/i);for(const m of h.matchAll(/href="(mailto:[^"]+)"/g))assert.equal(m[1],'mailto:contact@oikumene.works');assert.deepEqual(h.match(/<script\b[^>]*>/gi),['<script defer src="/assets/language.js">']);}
 for(const c of Object.values(site)){const h=await read(fileFor(c.paths.feedback));assert.match(h,/class="feedback-address"><a href="mailto:contact@oikumene\.works">contact@oikumene\.works<\/a>/);assert.ok(h.includes(c.feedback.note));}
});
test('security headers remain staged; only same-origin script permitted',async()=>{
 assert.equal(await read('robots.txt'),'User-agent: *\nDisallow: /\n');
 const h=await read('_headers');
 for(const s of ["X-Robots-Tag: noindex, nofollow","X-Content-Type-Options: nosniff","default-src 'none'","script-src 'self'","form-action 'none'","frame-ancestors 'none'"])assert.ok(h.includes(s));
});
test('every page uses the unchanged centralized brand and cache-versioned favicon',async()=>{
 const version=svg=>createHash('sha256').update(svg).digest('hex').slice(0,12);
 for(const [path,svg,url] of [[brand.markPath,brand.markSvg,brand.markUrl],[brand.faviconPath,brand.faviconSvg,brand.faviconUrl]]){
  assert.equal(await read(path),svg);assert.match(svg,/<svg\b[^>]*viewBox=/);assert.doesNotMatch(svg,/<script\b|<foreignObject\b|(?:href|src)=/i);
  assert.equal(url,'/'+path+'?v='+version(svg));
 }
 for(const f of await findHtml()){const h=await readFile(f,'utf8');assert.equal((h.match(/class="brand-mark"/g)||[]).length,1,f);assert.equal((h.match(/rel="icon"/g)||[]).length,1,f);assert.ok(h.includes(brand.markUrl),f);assert.ok(h.includes(brand.faviconUrl),f);}
});
test('home folders are initially closed, independent and ordered; all eight entries are in the agreed area',async()=>{
 const expected={reflection:['christian-belief-explorer','deep-research-guide'],software:['ewoc','visual-routines'],tools:['android-test-helpers','tasi','app-testing-notes','flip-the-phone']};
 for(const [area,ids] of Object.entries(expected))assert.deepEqual(projects.filter(q=>q.area===area).map(q=>q.id),ids);
 assert.equal(projects.length,8);
 for(const c of Object.values(site)){const h=await read(fileFor(c.paths.home));assert.deepEqual([...h.matchAll(/<details id="([^"]+)" class="folder[^"\n]*">/g)].map(m=>m[1]),['reflection-heading','projects-heading','software-heading','tools-heading']);assert.equal((h.match(/<details\b/g)||[]).length,4);assert.doesNotMatch(h,/<details\b[^>]*\bopen(?:[=\s>])/);assert.equal((h.match(/<li id="entry-/g)||[]).length,8);for(const q of projects)assert.ok(h.includes('id="entry-'+q.id+'"'));for(const name of ['reflection','projects','software','tools'])assert.ok(h.includes('<span>'+c.home[name]+'</span>'));assert.doesNotMatch(h,/home-intro|<h1>Oikumene<\/h1>/);assert.match(h,/<footer>[\s\S]*?class="footer-links"/);}
 assert.equal(site.fi.home.reflection,'Pohdintaan ja tutkimiseen');assert.equal(site.en.home.reflection,'For Reflection and Research');
});
test('approved Finnish About wording, separate Agape explanation, bilingual pairing and new visible name',async()=>{
 const about=await read(fileFor(site.fi.paths.about)),home=await read(fileFor(site.fi.paths.home));
 for(const section of site.fi.about.sections){for(const s of section.paragraphs){assert.ok(about.includes('<p>'+s+'</p>'),s);assert.ok(!home.includes(s),s);}}
 assert.ok(about.includes('Tutkimiseen tarkoitettu tieto pyritään esittämään mahdollisimman uskollisesti lähteilleen.'));assert.doesNotMatch(about,/perustaltaan kristillinen|mahdollisimman puhdasta tietoa/);
 for(const c of Object.values(site)){const h=await read(fileFor(c.paths.about)),g=await read(fileFor(c.paths.agape));assert.ok(h.includes('<p><a href="'+c.paths.agape+'">Agape.</a></p>'));assert.ok(g.includes(c.agape.paragraphs[0]));assert.ok(g.includes(c.agape.sources));const q=projects.find(q=>q.id==='christian-belief-explorer');assert.equal(q[c.locale].name,c.locale==='fi'?'Tutki kristillisiä näkemyksiä':'Explore Christian Perspectives');}
});
test('zero, one and multiple actions and optional metadata; no generic compulsory action',async()=>{
 for(const c of Object.values(site)){
  const home=await read(fileFor(c.paths.home));
  for(const q of projects){
   const path=pathFor(c,q.id),d=await read(fileFor(path)),a=(q.actions??[]).map(x=>x[c.locale]).filter(Boolean);
   assert.ok(home.includes('href="'+path+'"'));assert.ok(d.includes(c.paths.home+'#entry-'+q.id));
   if(a.length){assert.match(d,/class="project-actions project-detail-actions"/);for(const x of a){const s='href="'+x.href+'">'+x.label+'</a>';assert.ok(home.includes(s));assert.ok(d.includes(s));}}
   else assert.doesNotMatch(d,/project-detail-actions|Avaa projekti|Open the project<\/a>/);
   assert.equal(d.includes('class="project-details"'),!!q[c.locale].metadata?.length);
  }
 }
 // Synthetic fixture proves each language can choose different destinations, or no actions.
 const fixture={id:'fixture',area:'software',fi:{name:'Esimerkki'},en:{name:'Example'},actions:[{fi:{href:'https://example.com/fi',label:'Lue'},en:{href:'https://example.com/en',label:'Read'}},{fi:{href:'https://example.com/second',label:'Toinen'}}]};
 const pages=renderSite(site,[fixture],brand,'','','');
 assert.ok(pages['fi/projektit/fixture/index.html'].includes('href="https://example.com/fi">Lue</a>'));
 assert.ok(pages['fi/projektit/fixture/index.html'].includes('href="https://example.com/second">Toinen</a>'));
 assert.ok(pages['en/projects/fixture/index.html'].includes('href="https://example.com/en">Read</a>'));
 assert.ok(!pages['en/projects/fixture/index.html'].includes('https://example.com/second'));
});
test('language preference: explicit URL, saved choice, browser order and English fallback',async()=>{
 const code=await read('assets/language.js');
 function simulate(path,languages,saved,blocked=false){
  let redirect=null,listener,stored=null;
  runInNewContext(code,{document:{addEventListener:(type,cb)=>listener=cb},location:{pathname:path,search:'',hash:'',replace:s=>redirect=s},navigator:{languages,language:languages[0]},localStorage:{getItem:()=>{if(blocked)throw Error('blocked');return saved;},setItem:(k,v)=>{if(blocked)throw Error('blocked');assert.equal(k,'oikumene.language');stored=v;}}});
  return {redirect,click:lang=>{listener({target:{closest:()=>({dataset:{languageChoice:lang}})}});return stored;}};
 }
 assert.equal(simulate('/fi/',['en'],'en').redirect,null);assert.equal(simulate('/en/projects/tasi/',['fi'],'fi').redirect,null);
 assert.equal(simulate('/',['en'],'fi').redirect,'/fi/');assert.equal(simulate('/',['sv-SE','fi-FI'],null).redirect,'/fi/');
 assert.equal(simulate('/',['en-US','fi'],null).redirect,'/en/');assert.equal(simulate('/',['de-DE'],null).redirect,'/en/');
 assert.equal(simulate('/',['fi-FI'],null,true).redirect,'/fi/');assert.equal(simulate('/fi/',['fi'],null).click('en'),'en');
 assert.equal(simulate('/fi/',['fi'],null,true).click('en'),null);
});
