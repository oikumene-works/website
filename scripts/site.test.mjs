import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir,readFile,stat } from 'node:fs/promises';
import { join,resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { intro,projects,projectPath } from '../src/projects.mjs';
import { runInNewContext } from 'node:vm';
import { site } from '../src/content.mjs';
import { brand } from '../src/brand.mjs';
import { createHash } from 'node:crypto';
const out=fileURLToPath(new URL('../public/',import.meta.url));
const keys=['home','about','feedback','privacy'];
const read=(path)=>readFile(join(out,path),'utf8');
async function findHtml(dir=out){const files=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=join(dir,e.name);if(e.isDirectory())files.push(...await findHtml(p));else if(p.endsWith('.html'))files.push(p);}return files;}

test('complete bilingual page set and neutral landing / error',async()=>{
  const files=await findHtml();assert.equal(files.length,10+projects.length*2);
  for(const c of Object.values(site))for(const key of keys){const h=await read(c.paths[key].slice(1)+'index.html');assert.match(h,new RegExp(`<html lang="${c.locale}">`));assert.match(h,/<h1>[^<]+<\/h1>/);assert.match(h,/id="content"/);assert.equal((h.match(/aria-current="page"/g)||[]).length,1);}
});
test('every local href and src resolves, including the paired language versions',async()=>{
  for(const file of await findHtml()){const h=await readFile(file,'utf8');for(const m of h.matchAll(/\b(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){const href=m[1];const dest=resolve(out,'.'+href+(href.endsWith('/')?'index.html':''));assert.ok(dest.startsWith(out),href);assert.ok((await stat(dest)).isFile(),href);}}
  for(const [lang,c] of Object.entries(site)){const other=site[lang==='fi'?'en':'fi'];for(const key of keys){const h=await read(c.paths[key].slice(1)+'index.html');assert.ok(h.includes(`href="${other.paths[key]}"`));assert.ok(h.includes(`hreflang="${other.locale}"`));}}
});
test('preview does not collect feedback; only same-origin language script',async()=>{
  for(const f of await findHtml()){const h=await readFile(f,'utf8');assert.match(h,/name="robots" content="noindex, nofollow"/);assert.doesNotMatch(h,/<form\b|mailto:/i);assert.deepEqual(h.match(/<script\b[^>]*>/gi),['<script defer src="/assets/language.js">']);}
  for(const c of Object.values(site)){const h=await read(c.paths.feedback.slice(1)+'index.html');assert.match(h,/<fieldset disabled/);assert.match(h,/<button type="button" disabled/);assert.match(h,/feedback@oikumene\.works/);assert.match(h,/id="unavailable"/);}
});
test('preview indexing and browser security headers are staged',async()=>{
 assert.equal(await read('robots.txt'),'User-agent: *\nDisallow: /\n');const h=await read('_headers');assert.match(h,/X-Robots-Tag: noindex, nofollow/);assert.match(h,/form-action 'none'/);assert.match(h,/frame-ancestors 'none'/);assert.match(h,/X-Content-Type-Options: nosniff/);
});


test('every page uses the centralized brand and cache-versioned favicon', async()=>{
  const version = svg => createHash('sha256').update(svg).digest('hex').slice(0,12);
  for (const [path,svg,url] of [[brand.markPath,brand.markSvg,brand.markUrl],[brand.faviconPath,brand.faviconSvg,brand.faviconUrl]]) {
    assert.equal(await read(path),svg);
    assert.match(svg,/<svg\b[^>]*viewBox=/);
    assert.doesNotMatch(svg,/<script\b|<foreignObject\b|(?:href|src)=/i);
    assert.equal(url,`/${path}?v=${version(svg)}`);
  }
  for (const file of await findHtml()) {
    const h=await readFile(file,'utf8');
    assert.equal((h.match(/class="brand-mark"/g)||[]).length,1,file);
    assert.equal((h.match(/rel="icon"/g)||[]).length,1,file);
    assert.ok(h.includes(`src="${brand.markUrl}"`),file);
    assert.ok(h.includes(`href="${brand.faviconUrl}"`),file);
    assert.match(h,/<img class="brand-mark"[^>]*alt=""/);
  }
});

test('approved Finnish introduction, project links and paired language pages',async()=>{
 const home=await read('fi/index.html');
 for(const s of intro.fi)assert.ok(home.includes('<p>'+s+'</p>'));
 assert.equal(new Set(projects.map(q=>q.id)).size,projects.length);
 for(const lang of ['fi','en']){
  const other=lang==='fi'?'en':'fi',h=await read(lang+'/index.html');
  assert.equal((h.match(/<li><h3>/g)||[]).length,projects.length);
  for(const q of projects){
   const path=projectPath(lang,q.id);assert.ok(h.includes('href="'+path+'"'));
   const d=await read(path.slice(1)+'index.html');assert.ok(d.includes('href="'+projectPath(other,q.id)+'"'));
   assert.equal((d.match(/data-language-choice=/g)||[]).length,2);
   if(q.url)assert.ok(d.includes('href="'+q.url+'"'));
  }
 }
 assert.match(await read('_headers'),/script-src 'self'/);
});
test('language precedence and manual preference; storage failure tolerated',async()=>{
 const code=await read('assets/language.js');
 function simulate(path,languages,saved,blocked=false){
  let redirect=null,listener,stored=null;
  runInNewContext(code,{document:{addEventListener:(type,cb)=>listener=cb},location:{pathname:path,search:'',hash:'',replace:s=>redirect=s},navigator:{languages,language:languages[0]},localStorage:{getItem:()=>{if(blocked)throw Error('blocked');return saved;},setItem:(k,v)=>{if(blocked)throw Error('blocked');assert.equal(k,'oikumene.language');stored=v;}}});
  return {redirect,click:lang=>{listener({target:{closest:()=>({dataset:{languageChoice:lang}})}});return stored;}};
 }
 assert.equal(simulate('/fi/',['en'],'en').redirect,null);
 assert.equal(simulate('/en/',['fi'],'fi').redirect,null);
 assert.equal(simulate('/',['en'],'fi').redirect,'/fi/');
 assert.equal(simulate('/',['sv-SE','fi-FI'],null).redirect,'/fi/');
 assert.equal(simulate('/',['en-US','fi'],null).redirect,'/en/');
 assert.equal(simulate('/',['de-DE'],null).redirect,'/en/');
 assert.equal(simulate('/',['fi-FI'],null,true).redirect,'/fi/');
 assert.equal(simulate('/fi/',['fi'],null).click('en'),'en');
 assert.equal(simulate('/fi/',['fi'],null,true).click('en'),null);
});
