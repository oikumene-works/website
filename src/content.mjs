// Working copy for the technical preview. Editorial approval is separate.
// Keep FI and EN independent, but preserve matching page identities.
export const site = {
  fi: {
    locale: 'fi', language: 'Suomi', other: 'English',
    skip: 'Siirry sisältöön', preview: 'Tekninen esikatselu · ei julkaistu palvelu',
    nav: { home: 'Etusivu', about: 'Tietoa hankkeesta', feedback: 'Palaute', privacy: 'Yksityisyys' },
    paths: { home: '/fi/', about: '/fi/tietoa/', feedback: '/fi/palaute/', privacy: '/fi/yksityisyys/' },
    brand: 'Oikumene Works',
    footer: 'Sivusto on kehitteillä. Tämä versio on tekninen kokeilu, ei valmis teologinen palvelu.',
    home: {
      kicker: 'Kristillinen ajattelu',
      heading: 'Tutki kysymyksiä. Vertaa näkemyksiä.',
      lead: 'Oikumene Works kehittää kysymyksiin ja lähteisiin perustuvia välineitä kristillisten näkemysten tarkasteluun.',
      section: 'Kehitteillä: Christian Belief Explorer',
      description: 'Tavoitteena on auttaa käyttäjää ymmärtämään omia käsityksiään ja tarkastelemaan niiden yhtäläisyyksiä ja eroja muihin kristillisiin näkemyksiin. Käyttäjää ei pyritä sijoittamaan yhteen valmiiseen luokkaan.',
      status: 'Kysymykset ja lähdeaineisto ovat vielä kehitysvaiheessa. Tässä esikatselussa ei esitetä valmiita tuloksia tai kysymyssarjaa.',
      cta: 'Tutustu hankkeeseen'
    },
    about: {
      heading: 'Tietoa hankkeesta',
      lead: 'Christian Belief Explorer on kokeellinen hanke, jonka kehitystyö on avointa.',
      section: 'Mitä kehitetään?',
      paragraphs: ['Kysymysten tarkoitus on auttaa käyttäjää jäsentämään omaa ajatteluaan. Vertailut perustuvat nimettyihin näkemyksiin ja lähteisiin; ne eivät ole arvio käyttäjän uskosta.', 'Ensimmäisen pilotin aihe on Raamattu ja sen tulkinnan auktoriteetti. Varsinainen kysymyssisältö ja vertailut ovat vielä kokeiluasteella.', 'Tavoitteena on kaksikielinen palvelu, jossa kysymykset, selitykset ja lähteet tarkistetaan kummallakin kielellä.'],
      sources: 'Projektin lähdekoodi ja dokumentaatio', license: 'Projektin alkuperäisen aineiston lisenssi (CC0 1.0)',
      disclaimer: 'Tämä tekstiluonnos perustuu projektin nykyiseen README-dokumenttiin; lopullinen esittelyteksti ja nimi tarkistetaan ennen julkaisua.'
    },
    feedback: {
      heading: 'Anna palautetta',
      lead: 'Palautekanava on suunnitteilla. Tässä esikatselussa lomake ei vastaanota eikä lähetä viestejä.',
      formHeading: 'Lomakkeen käyttöliittymän luonnos',
      instructions: 'Varsinaisessa palvelussa voit antaa palautetta ilman käyttäjätiliä. Älä sisällytä viestiin arkaluonteisia henkilötietoja. Kysymyksiin antamiasi vastauksia ei liitetä automaattisesti mukaan.',
      message: 'Viesti (pakollinen)', reply: 'Sähköpostiosoite vastausta varten (valinnainen)',
      button: 'Lähetys ei vielä käytössä', unavailable: 'Kentät on poistettu käytöstä, koska turvallista lähetyspalvelua ei ole vielä testattu.',
      email: 'Suunniteltu osoite: feedback@oikumene.works. Osoitteen toimivuus on vielä vahvistamatta.'
    },
    privacy: {
      heading: 'Yksityisyys tässä esikatselussa',
      lead: 'Tämä versio ei sisällä käyttäjätiliä, kysymyksiin vastaamista, toimivaa palautelomaketta eikä omaa analytiikkaa.',
      paragraphs: ['Sivun käyttöliittymä ei pyydä henkilötietoja eikä tallenna käyttäjän antamia vastauksia.', 'Jos esikatselu julkaistaan Cloudflaressa, palveluntarjoaja käsittelee verkkopyyntöjä sivun toimittamiseksi. Palvelun asetukset ja tietosuojatiedot tarkistetaan ennen julkista julkaisua.', 'Palautteen käsittelyä koskeva varsinainen tietosuojakuvaus laaditaan, kun käytetty sähköpostin toimitusketju ja säilytyskäytännöt on vahvistettu.'],
      note: 'Tämä ei ole lopullisen palvelun tietosuojaseloste.'
    }
  },
  en: {
    locale: 'en', language: 'English', other: 'Suomi',
    skip: 'Skip to content', preview: 'Technical preview · not a launched service',
    nav: { home: 'Home', about: 'About', feedback: 'Feedback', privacy: 'Privacy' },
    paths: { home: '/en/', about: '/en/about/', feedback: '/en/feedback/', privacy: '/en/privacy/' },
    brand: 'Oikumene Works',
    footer: 'The site is under development. This is a technical preview, not a finished theological service.',
    home: {
      kicker: 'Christian thought',
      heading: 'Explore questions. Compare perspectives.',
      lead: 'Oikumene Works develops question-based, source-based tools for exploring Christian views.',
      section: 'In development: Christian Belief Explorer',
      description: 'The aim is to help people clarify their own views and explore similarities and differences with other Christian perspectives, rather than assign each person to one predefined category.',
      status: 'The questions and sources are still being developed. This preview does not offer a finished questionnaire or results.',
      cta: 'Explore the project'
    },
    about: {
      heading: 'About the project',
      lead: 'Christian Belief Explorer is an experimental project being developed openly.',
      section: 'What is being developed?',
      paragraphs: ['The questions aim to help people clarify their own thinking. Comparisons refer to named views and sources; they are not judgments of a person’s faith.', 'The first pilot concerns the Bible and interpretive authority. The questions and comparisons are still experimental.', 'The intended service is bilingual, with questions, explanations and sources reviewed separately in each language.'],
      sources: 'Project source code and documentation', license: 'License for original project material (CC0 1.0)',
      disclaimer: 'This draft follows the project’s current README; the final description and naming will be reviewed before launch.'
    },
    feedback: {
      heading: 'Send feedback',
      lead: 'A feedback channel is planned. This preview does not accept or send messages.',
      formHeading: 'Draft feedback interface',
      instructions: 'In the finished service, you will be able to send feedback without an account. Do not include sensitive personal information. Your answers to questions will not be attached automatically.',
      message: 'Message (required)', reply: 'Email address for a reply (optional)',
      button: 'Submission not available yet', unavailable: 'The fields are disabled because secure delivery has not yet been tested.',
      email: 'Planned address: feedback@oikumene.works. The address has not yet been verified.'
    },
    privacy: {
      heading: 'Privacy in this preview',
      lead: 'This version does not include accounts, question responses, a working feedback form or our own analytics.',
      paragraphs: ['The interface does not request personal data or store user answers.', 'If the preview is hosted on Cloudflare, the provider processes web requests to deliver the site. Its settings and privacy information will be reviewed before public launch.', 'The full privacy information for feedback will be written once the actual mail delivery chain and retention practices have been confirmed.'],
      note: 'This is not the privacy notice for the finished service.'
    }
  }
};
