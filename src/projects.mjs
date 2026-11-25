// Project examples and English introduction are provisional; Finnish introduction approved 25 November 2026.
export const intro = {
  "fi": [
    "Oikumene kokoaa yhteen hengellisiä ja maallisia projekteja.",
    "Projekteissa keskeinen arvo on vastikkeeton hyödyllisyys ihmisille heidän vakaumuksestaan riippumatta.",
    "Tutkimiseen tarjotaan mahdollisimman puhdasta tietoa, ja päätelmien tekeminen jätetään lukijalle aina, kun se suinkin on mahdollista."
  ],
  "en": [
    "Oikumene brings together spiritual and secular projects.",
    "A central value across the projects is to benefit people without asking for anything in return, regardless of their beliefs.",
    "For research, information is provided as free from distortion as possible, and conclusions are left to the reader whenever possible."
  ]
};
export const projects = [
  {
    "id": "app-testing-notes",
    "url": "https://github.com/oikumene-works/app-testing-notes",
    "fi": {
      "name": "App Testing Notes",
      "description": "Ohjeita, menetelmiä ja käytännön esimerkkejä Android-sovellusten testaamisesta tekoälyn kanssa.",
      "detail": "Aineisto perustuu ihmisen ja Codexin yhteistyössä tehtyihin sovellustesteihin. Aloituspakettia ei ole vielä varmennettu uusilla käyttäjillä tai muilla avustajilla.",
      "action": "Avaa aineisto GitHubissa"
    },
    "en": {
      "name": "App Testing Notes",
      "description": "Guides, methods and practical examples of testing Android apps with AI.",
      "detail": "The material is based on app tests carried out by a person in collaboration with Codex. The starter kit has not yet been validated with newcomers or other assistants.",
      "action": "Open the material on GitHub"
    }
  },
  {
    "id": "christian-belief-explorer",
    "url": "https://github.com/oikumene-works/christian-belief-explorer",
    "fi": {
      "name": "Christian Belief Explorer",
      "description": "Kristillisten näkemysten itsenäinen tutkiminen ja vertailu.",
      "detail": "Kysymyksiin ja lähteisiin perustuva kokeellinen hanke. Ensimmäinen pilotti käsittelee Raamattua ja sen tulkinnan auktoriteettia. Varsinainen sovellus on kehitteillä.",
      "action": "Avaa projektin repositorio"
    },
    "en": {
      "name": "Christian Belief Explorer",
      "description": "Independent exploration and comparison of Christian views.",
      "detail": "An experimental project based on questions and sources. The first pilot concerns the Bible and interpretive authority. The application is still in development.",
      "action": "Open the project repository"
    }
  },
  {
    "id": "deep-research-guide",
    "url": "https://wennström.fi/syvatutkimus/",
    "fi": {
      "name": "Syvätutkimusohje",
      "description": "Ohjeita itsenäiseen tekoälyavusteiseen tutkimiseen.",
      "detail": "Nykyinen ohje sijaitsee wennström.fi-sivustolla. Oikumenen oma versio on suunnitteilla.",
      "action": "Avaa nykyinen ohje"
    },
    "en": {
      "name": "Deep Research Guide",
      "description": "Guidance for independent AI-assisted research.",
      "detail": "The current guide is in Finnish on wennström.fi. An Oikumene version is planned.",
      "action": "Open the current guide (Finnish)"
    }
  },
  {
    "id": "tasi",
    "url": null,
    "fi": {
      "name": "TASI",
      "description": "Projektin esittely on valmisteilla.",
      "detail": "Kuvausta ja kohdeosoitetta ei ole vielä vahvistettu tätä esikatselua varten."
    },
    "en": {
      "name": "TASI",
      "description": "Project description pending.",
      "detail": "The description and destination have not yet been confirmed for this preview."
    }
  }
];
export function projectPath(lang,id){return '/'+lang+'/'+(lang==='fi'?'projektit':'projects')+'/'+id+'/';}

export function escape(s){return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#39;");}

export function languageChoice(lang,path,otherPath){
 const e=escape;return `<div class="language-choice" aria-label="${lang==='fi'?'Kieli':'Language'}">${['fi','en'].map(l=>`<a href="${e(l===lang?path:otherPath)}" lang="${l}" hreflang="${l}" aria-label="${l==='fi'?'Suomi':'English'}" data-language-choice="${l}"${l===lang?' aria-current="true"':''}>${l.toUpperCase()}</a>`).join('<span aria-hidden="true">/</span>')}</div>`;
}

export function directory(lang,projects){const e=escape;return `<section class="project-directory" aria-labelledby="projects-heading"><h2 id="projects-heading">${lang==='fi'?'Projektit':'Projects'}</h2><ul class="project-list">${projects.map(q=>{const d=q[lang];return `<li><h3><a href="${e(projectPath(lang,q.id))}">${e(d.name)}</a></h3><p>${e(d.description)}</p>${q.url?`<div class="project-actions"><a href="${e(q.url)}">${e(d.action)}</a></div>`:''}</li>`;}).join('')}</ul></section>`;}

export function homeBody(lang,intro,projects){return `<h1>Oikumene</h1><div class="home-intro">${intro[lang].map(s=>`<p>${escape(s)}</p>`).join('')}</div>${directory(lang,projects)}`;}

export function aboutBody(lang,intro){return `<h1>${lang==='fi'?'Tietoa Oikumenesta':'About Oikumene'}</h1><p class="lead">${escape(intro[lang][0])}</p><p>${lang==='fi'?'Sivuston tarkoituksen ja toimintaperiaatteiden tarkempi esittely on vielä valmisteilla.':'A fuller description of the site’s purpose and principles is being prepared.'}</p>`;}

export function projectBody(lang,q){const e=escape,d=q[lang];return `<h1>${e(d.name)}</h1><p class="lead">${e(d.description)}</p><p>${e(d.detail)}</p>${q.url?`<p><a href="${e(q.url)}">${e(d.action)}</a></p>`:''}<p class="back-link"><a href="/${lang}/#projects-heading">${lang==='fi'?'Takaisin projekteihin':'Back to projects'}</a></p>`;}

export function privacyNote(lang){return `<p>${lang==='fi'?'Kun vaihdat kieltä, valinta voidaan tallentaa selaimen paikalliseen tallennustilaan (localStorage). Sitä käytetään vain kielivalintaan, eikä sitä lähetetä palvelimelle. Voit poistaa sen selaimen sivustotiedoista.':'When you switch languages, your choice may be saved in browser local storage. It is used only for language selection and is not sent to the server. You can remove it in your browser’s site data settings.'}</p>`;}

export function updateShell(h,lang,path,otherPath){
 h=h.replaceAll('Oikumene Works','Oikumene').replace('Tekninen esikatselu · ei julkaistu palvelu','Suunnitteluesikatselu · ei julkaistu palvelu').replace('Technical preview · not a launched service','Design preview · not a launched service').replace('Tietoa hankkeesta','Tietoa Oikumenesta').replace('>About</a>','>About Oikumene</a>').replace('>Yksityisyys</a>','>Tietosuoja</a>').replace('Sivusto on kehitteillä. Tämä versio on tekninen kokeilu, ei valmis teologinen palvelu.','Oikumene · Sivusto on kehitteillä.').replace('The site is under development. This is a technical preview, not a finished theological service.','Oikumene · The site is under development.');
 h=h.replace(/<a href="[^"]*" class="lang" lang="[^"]*" hreflang="[^"]*">[^<]*<\/a>/,languageChoice(lang,path,otherPath));
 h=h.replace(/(<link rel="alternate" hreflang="[^"]*" href=")[^"]*(")/,(_,a,b)=>a+escape(otherPath)+b);
 return h.replace('</head>','<script defer src="/assets/language.js"></script>\n</head>');
}

export function replaceBody(h,body){return h.replace(/(<main id="content" class="wrap"><div class="prose">)[\s\S]*?(<\/div><\/main>)/,(_,a,b)=>a+body+b);}

export function title(h,s){return h.replace(/<title>[^<]*<\/title>/,`<title>${escape(s)} | Oikumene</title>`);}
