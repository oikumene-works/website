import {mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {site} from '../src/content.mjs';
import {projects} from '../src/projects.mjs';
import {brand} from '../src/brand.mjs';
import {renderSite} from '../src/render.mjs';
const root=fileURLToPath(new URL('../',import.meta.url)),out=join(root,'public');
const source=file=>readFile(join(root,'src',file),'utf8');
const pages=renderSite(site,projects,brand,await source('styles.css'),await source('language.js'),await source('preview-headers.txt'));
await rm(out,{recursive:true,force:true});
for(const [rel,data] of Object.entries(pages)){
 const dest=join(out,rel);
 await mkdir(dirname(dest),{recursive:true});
 await writeFile(dest,data,'utf8');
}
console.log('Built '+Object.keys(pages).filter(p=>p.endsWith('.html')).length+' HTML pages and shared assets.');
