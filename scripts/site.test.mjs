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
const keys=['home','about','feedback','privacy'];
async function findHtml(dir=out){const files=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=join(dir,e.name);if(e.isDirectory())files.push(...await findHtml(p));else if(p.endsWith('.html'))files.push(p);}return files;}
const pathFor=(c,id)=>c.projectBase+id+'/';
const fileFor=path=>path.slice(1)+'index.html';
const otherOf=c=>site[c.locale==='fi'?'en':'fi'];
test('complete bilingual pages with one main heading and stable project routes',async()=>{
 assert.equal((await findHtml()).length,10+2*projects.length);
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
test('preview has no enabled feedback, no external scripts, and is not indexed',async()=>{
 for(const f of await findHtml()){
  const h=await readFile(f,'utf8');
  assert.match(h,/name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(h,/<form\b|mailto:/i);
  assert.deepEqual(h.match(/<script\b[^>]*>/gi),['<script defer src="/assets/language.js">']);
 }
 for(const c of Object.values(site)){
  const h=await read(fileFor(c.paths.feedback));
  assert.match(h,/<fieldset disabled/);assert.match(h,/<button type="button" disabled/);
  assert.match(h,/feedback@oikumene\.works/);assert.match(h,/id="unavailable"/);
 }
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
test('home is only the project directory; approved Finnish About copy is unchanged',async()=>{
 const expected=[
  'Oikumene on perustaltaan kristillinen verkkosivusto, joka kokoaa yhteen monenlaisia projekteja. Mukaan voidaan ottaa myös muiden kuin sivuston ylläpitäjän projekteja.',
  'Projekteissa keskeinen arvo on vastikkeeton hyödyllisyys käyttäjälle riippumatta hänen vakaumuksestaan tai elämänkatsomuksestaan.',
  'Sivustolla ei markkinoida eikä promotoida henkilöitä, traditioita, kirkkokuntia, oppeja tai muita vastaavia kohteita.',
  'Tutkimiseen tarjotaan mahdollisimman puhdasta tietoa. Aineiston lähteet, tulkinnat ja olennaiset epävarmuudet pyritään tuomaan näkyviin.',
  'Johtopäätösten tekeminen jätetään lukijalle itselleen aina, kun se suinkin on mahdollista.',
  'Projektien kehittämisessä hyödynnetään myös tekoälyä. Sen osuudesta kerrotaan erityisesti silloin, kun tiedolla on merkitystä aineiston alkuperän, tutkimusmenetelmän tai luotettavuuden arvioinnissa.'
 ];
 const about=await read(fileFor(site.fi.paths.about)),home=await read(fileFor(site.fi.paths.home));
 for(const s of expected){assert.ok(about.includes('<p>'+s+'</p>'),s);assert.ok(!home.includes(s),s);}
 for(const c of Object.values(site)){
  const h=await read(fileFor(c.paths.home));assert.ok(h.includes('<h1 id="projects-heading">'+c.home.heading+'</h1>'));
  assert.doesNotMatch(h,/home-intro|<h1>Oikumene<\/h1>/);
  assert.equal((h.match(/<li><h2>/g)||[]).length,projects.length);
 }
});
test('zero, one and multiple actions and optional metadata; no generic compulsory action',async()=>{
 for(const c of Object.values(site)){
  const home=await read(fileFor(c.paths.home));
  for(const q of projects){
   const path=pathFor(c,q.id),d=await read(fileFor(path)),a=(q.actions??[]).map(x=>x[c.locale]).filter(Boolean);
   assert.ok(home.includes('href="'+path+'"'));
   if(a.length){assert.match(d,/class="project-actions project-detail-actions"/);for(const x of a){const s='href="'+x.href+'">'+x.label+'</a>';assert.ok(home.includes(s));assert.ok(d.includes(s));}}
   else assert.doesNotMatch(d,/project-detail-actions|Avaa projekti|Open the project<\/a>/);
   assert.equal(d.includes('class="project-details"'),!!q[c.locale].metadata?.length);
  }
 }
 // Synthetic fixture proves each language can choose different destinations, or no actions.
 const fixture={id:'fixture',fi:{name:'Esimerkki'},en:{name:'Example'},actions:[{fi:{href:'https://example.com/fi',label:'Lue'},en:{href:'https://example.com/en',label:'Read'}},{fi:{href:'https://example.com/second',label:'Toinen'}}]};
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
