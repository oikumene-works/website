import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir,readFile,stat } from 'node:fs/promises';
import { join,resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/content.mjs';
import { brand } from '../src/brand.mjs';
import { createHash } from 'node:crypto';
const out=fileURLToPath(new URL('../public/',import.meta.url));
const keys=['home','about','feedback','privacy'];
const read=(path)=>readFile(join(out,path),'utf8');
async function findHtml(dir=out){const files=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=join(dir,e.name);if(e.isDirectory())files.push(...await findHtml(p));else if(p.endsWith('.html'))files.push(p);}return files;}

test('complete bilingual page set and neutral landing / error',async()=>{
  const files=await findHtml();assert.equal(files.length,10);
  for(const c of Object.values(site))for(const key of keys){const h=await read(c.paths[key].slice(1)+'index.html');assert.match(h,new RegExp(`<html lang="${c.locale}">`));assert.match(h,/<h1>[^<]+<\/h1>/);assert.match(h,/id="content"/);assert.equal((h.match(/aria-current="page"/g)||[]).length,1);}
});
test('every local href and src resolves, including the paired language versions',async()=>{
  for(const file of await findHtml()){const h=await readFile(file,'utf8');for(const m of h.matchAll(/\b(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){const href=m[1];const dest=resolve(out,'.'+href+(href.endsWith('/')?'index.html':''));assert.ok(dest.startsWith(out),href);assert.ok((await stat(dest)).isFile(),href);}}
  for(const [lang,c] of Object.entries(site)){const other=site[lang==='fi'?'en':'fi'];for(const key of keys){const h=await read(c.paths[key].slice(1)+'index.html');assert.ok(h.includes(`href="${other.paths[key]}"`));assert.ok(h.includes(`hreflang="${other.locale}"`));}}
});
test('preview does not submit or collect feedback and includes no scripts',async()=>{
  for(const f of await findHtml()){const h=await readFile(f,'utf8');assert.match(h,/name="robots" content="noindex, nofollow"/);assert.doesNotMatch(h,/<script\b|<form\b|mailto:/i);}
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
