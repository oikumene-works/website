# Legal and compliance — Oikumene Works

**Working record, 27 November 2026. Not a published privacy notice or a legal opinion.**
Scope: the website and its links to independent projects, not a blanket certification of those projects. Keep this public record free of private contact data, credentials, actual visitor data and detailed security-sensitive findings. Any records requiring such data belong in restricted storage.

## 1. Operating assumptions and design constraints

- Finnish private individual operating a free, independent, non-commercial site; no advertising, profiling, accounts, public user posts or payments. Operator confirmed 2026-11-27: Jyri Wennström, Finland. Public contact: contact@oikumene.works (operator confirmed successful incoming and outgoing mail test on 2026-11-27). Use the same address for general contact, feedback, corrections, security/accessibility reports and privacy requests; no separate feedback mailbox required.
- Apply data minimisation by design. Do not introduce browser analytics, advertising trackers, third-party embeds or non-essential terminal-device access without a new assessment. This is an implementation constraint, not a legal prohibition.
- **Approved 2026-11-27: measure overall site usage, not individual behaviour.** Use only Cloudflare's existing server-side aggregate Zone Analytics when the custom domain is active. Use approximate unique visitors and HTTP request totals for a broad trend. No added tracking scripts, cookies, identifiers, visitor-level exports, own IP database, analytics service or paid upgrade for this purpose. Do not enable Cloudflare Web Analytics (RUM). Do not sum daily unique counts and represent them as unique monthly people. Include bots/shared and changing IP addresses in the interpretation caveat. If the free tier is insufficient, review before adding anything. No analytics configuration or DNS changes have been made.
- Keep CBE responses/results on the user's device by default; do not send them in feedback or telemetry. Religious or philosophical beliefs may constitute special-category personal data (GDPR Art. 9). Other projects, including Visual Routines, need their own assessment based on what they actually process and distribute.
- Follow the existing README launch gates. No DNS cutover, production release, feedback activation or contract acceptance is authorised by this record alone.

## 2. Baseline audit — verified 2026-11-27

Source: main at [9850e6f](https://github.com/oikumene-works/website/tree/9850e6fc8fbd797c72ea9be5c844d3acb0bf7a2f). Inspected README, file tree, content and build sources, tests, configuration and generated privacy/feedback pages.

- Static assets only; no application JavaScript, form submission, backend, user accounts, application analytics or browser storage implementation in the inspected preview. Images and CSS are self-hosted. Feedback UI is disabled. No npm dependencies in the documented scaffold.
- Existing FI and EN privacy pages are draft descriptions and still say *if* hosted on Cloudflare. Both were independently fetched successfully from the public workers.dev host on 27 November; they match the draft wording and report noindex/nofollow. A public preview is not a private or GDPR-exempt site. Updating those pages is an immediate priority, not merely a production launch task.
- Read-only checks of the Oikumene Cloudflare account: website Worker version 5 is deployed at 100% (25 November); static assets served directly, no script bindings, no configured Tail consumers or Logpush jobs for the account or pending domain zone, no Web Analytics sites. Workers.dev and preview URLs are enabled; no custom Worker domain; oikumene.works zone remains pending.
- Active version configuration includes noindex/nofollow, no-referrer, nosniff, frame denial, restricted permissions and restrictive CSP (including no form submission). Verified configuration, not all actual response headers.
- Cloudflare still processes requests and may retain service/security telemetry. Absence of Logpush is not absence of Cloudflare logs. Exact provider retention, all applicable observability/security features and actual Set-Cookie/browser-network behaviour are not yet established. No claim of zero personal data, zero cookies or EU-only processing is justified.
- Website repository licence is explicitly undecided in README. CBE's original material is separately CC0 according to README; verify each project's actual licence and bundled third-party notices before linking downloads or republishing content.

## 3. Legal basis and immediate actions

For the limited delivery and security of the preview, GDPR Art. 6(1)(f) legitimate interests is a candidate basis (availability and security of the service). Record a proportionate purpose/necessity/balancing assessment; minimise metadata, avoid tracking, enable rights and do not treat the candidate basis as a completed assessment. The controller must inform visitors under Arts. 12–13 now, not only at production launch. Document processing and applicable retention/rights/recipients/transfers (Arts. 5, 24, 28, 30, 32); assess the Art. 30 small-organisation exception rather than assume it applies to non-occasional processing.

Cloudflare's publicly available DPA is v6.4 effective 3 April 2026. It describes processing including IP addresses and provides transfer mechanisms, including the EU-US Data Privacy Framework where applicable and SCCs for restricted transfers. The [published Self-Serve Subscription Agreement, section 6.1](https://www.cloudflare.com/terms/) incorporates the DPA by reference. Annex 1 of the DPA describes retention by necessity under the agreement and its termination, not a single fixed duration. Public terms do not establish the exact terms accepted on this account. Confirm the applicable agreement and DPA, covered services, current certification and relevant subprocessors/transfer safeguards; document any required transfer assessment. Do not sign or accept terms on behalf of the operator without their authority. Review provider retention by relevant product, not a generic Workers Logs number.

Finnish electronic communications services act section 205 and Traficom guidance apply also to equivalent terminal-device storage/access. No consent banner is needed **if** only strictly exempt storage/access is used; verify actual behaviour, classify any Cloudflare security cookies individually, give appropriate information. Do not disable security controls indiscriminately.

### Usage measurement — preliminary legitimate-interest assessment

Purpose: understand whether the free public site is being used and whether overall usage changes over time, to inform maintenance and development. Necessity: the approved metrics reuse existing traffic processing rather than introducing separate tracking, with the least detail needed for this purpose. Balance: ordinary requests already reach Cloudflare for hosting; use only aggregate statistics, not individual browsing histories, source IP filters, geographic or device profiles, or identifiers. No advertising, behavioural analysis or collection of responses. Residual risks include processing of IP addresses by the provider, imperfect aggregation and the possibility of revealing sensitive interests through detailed URL-level reports. Mitigate by keeping reports site-wide, not individual or fine-grained belief-related paths; never put personal answers in URLs. Explain the purpose and objection right in the notice. Final assessment depends on verification of actual service data flows, relevant retention, configuration and international transfer arrangements. Do not claim GDPR is inapplicable just because the operator sees aggregate figures.

Cloudflare's [Zone Analytics documentation](https://developers.cloudflare.com/analytics/account-and-zone-analytics/zone-analytics/) confirms the free-plan requests and unique visitors metrics. [Metric limitations](https://developers.cloudflare.com/analytics/faq/about-analytics/) explain that an IP-based estimate includes automated traffic. [October 2, 2026 analytics changelog](https://developers.cloudflare.com/changelog/post/2026-10-02-30-days-analytics-on-every-plan/) describes at least 31 days' retention for adaptive datasets and a 30-day query window; aggregated datasets retain separate limits. This is not a universal Cloudflare log retention period. Check the actual dashboard/available API once the domain is active; use rolling comparable periods or store only non-identifying period totals if useful, without a new visitor-level database.

### Priority register

| Item | State | Next evidence or action |
| --- | --- | --- |
| Preview hosting and source inventory | Checked | Recheck on material change |
| Controller and public contact | Confirmed, including receipt and reply test | Use contact@oikumene.works consistently in all public pages |
| Privacy notice FI/EN for current preview | Urgent / draft needed | Art. 13 contents, actual Cloudflare processing, rights/contact/complaint, retention criteria, transfer information; replace conditional hosting wording |
| Cloudflare Art. 28 agreement and transfers | Partially checked | Account contract applicability, current DPF listing, relevant subprocessors, safeguards, retention |
| Device storage and browser tests | Open | Clean-browser check of initial and subsequent navigation, response headers, Set-Cookie, storage, network destinations; repeat after DNS cutover |
| Feedback | Disabled | Existing contact@ address replaces planned feedback@; incoming and outgoing mail verified by operator. Verify mail provider/plan and applicable processor agreement where required; define necessary fields, access, retention/deletion, legal basis, sensitive-data handling and abuse protection before enablement. Update source, generated pages and tests together; do not enable form yet |
| Aggregate usage statistics | Approved / awaiting active domain | Confirm available Zone Analytics metrics after DNS cutover; do not enable RUM or other tracking; include processing purpose in privacy notice |
| Processing documentation and rights | Open | Restricted processing record if applicable, legitimate-interest assessment, rights request and incident procedure; one-month rights response deadline, assess 72-hour breach notification where required |
| Website and project rights | Open | Decide own website licence separately; verify each project, dependencies, icon/font/image rights, translations, quotations and third-party notices |
| Name and mark | Open | Preliminary PRH/EUIPO searches; consider relevant classes and similar marks; no promise of clearance or registration |
| Editorial responsibility | Open | Assess applicable Finnish publication rules; define corrections, attribution, AI-assisted content review, complaint/removal route and project-specific limitations |
| Accessibility | Open | Confirm legal scope; WCAG 2.2 AA as proposed voluntary engineering target; test keyboard, screen reader, contrast, zoom and both languages |
| Launch review | Blocked | Complete applicable obligations and evidence; keep existing explicit production gate |

### Notice drafting checklist (both languages)

Use existing /fi/yksityisyys/ and /en/privacy/ routes. Do not add a second privacy page or publish placeholders. Clearly distinguish processing for website delivery/security from the currently disabled feedback feature. State the controller and working contact, data categories, purposes and assessed legal basis/legitimate interests, recipients, third-country safeguards and how to obtain them, retention or concrete criteria, rights (including objection, access, correction, erasure and restriction as applicable), right to complain to the Finnish Data Protection Ombudsman, whether supplying data is required and consequences, and absence/presence of automated decisions. Explain actual cookie/storage use separately as needed. Avoid asserting that Cloudflare has no logs. When feedback is enabled, update notice before collection and provide the relevant notice at the form.

## 4. Ongoing maintenance

Before adding any functionality or data flow, assess privacy, storage, rights, accessibility, security and applicable regulation; update notice and evidence before release. At each release, inspect external resources, dependencies, licences and tests. Review the record quarterly and after changes to provider terms or applicable law; review unresolved items before launch. A periodic review is an engineering practice, not a statutory fixed deadline.

Reassess explicitly before enabling accounts, public submissions, payment/donation requests, marketing, external AI calls, identifiable belief/health responses, third-party embeds, or distribution as a commercial software activity. Consider Finnish fundraising law, DSA, consumer law, tax, AI Act, CRA and sector-specific rules only where triggered. No blanket disclaimer, banner, company formation or paid compliance service is assumed necessary.

## 5. Primary sources for verification

- [GDPR, especially Arts. 5, 6, 9, 12–13, 24, 28, 30, 32–34 and 44–49](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)
- [Finnish Data Protection Ombudsman](https://tietosuoja.fi/en/home)
- [Traficom guidance on cookies and similar technologies](https://www.kyberturvallisuuskeskus.fi/fi/viestintaverkkojen-ja-palveluiden-saantely/evasteet)
- [Cloudflare DPA v6.4](https://www.cloudflare.com/cloudflare-customer-dpa/)
- [Cloudflare self-serve terms](https://www.cloudflare.com/terms/)
- [Cloudflare EU standard contractual clauses](https://www.cloudflare.com/cloudflare-customer-scc/)
- [Cloudflare subprocessors](https://www.cloudflare.com/gdpr/subprocessors/)
- [Official DPF participant register](https://www.dataprivacyframework.gov/list)
- [Cloudflare Workers logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) and [metrics](https://developers.cloudflare.com/workers/observability/metrics-and-analytics/)
- [Finlex current legislation](https://www.finlex.fi/fi/lainsaadanto/) — check relevant Finnish acts as the corresponding items are worked on.

## 6. Change history

- 2026-11-27: Created legal work register after source, live preview and Cloudflare read-only checks. No changes to hosting configuration, DNS, application code, generated pages or licences. This public work record is not a complete Art. 30 record or a legal clearance. No claim that the site is compliant yet.

- 2026-11-27: Operator confirmed legal identity, existing public contact address and aggregate-only Cloudflare usage statistics. Updated preliminary balancing assessment, verified public documentation and plan-dependent limitations. Tuta support states that a DPA is available in business account subscription settings (https://tuta.com/support/general); actual account terms/role and agreement availability still require verification. No site code, live settings, mailbox or DNS changes in this update.

- 2026-11-27: Operator confirmed that contact@oikumene.works receives mail and can send replies. Contact delivery check closed; this does not enable the website feedback form or establish applicable mail-provider agreement terms.

## 7. Draft preview privacy notice — FI / EN

**Working draft for the existing public technical preview. Not yet deployed.** Before publishing, establish the applicable Cloudflare and Tuta contractual arrangements, check actual browser storage/response headers, and confirm the retention practice below. Reuse existing page routes. Do not publish unresolved assumptions as facts. The proposed email retention criterion is necessity for handling the matter and any justified follow-up, not an unverified automatic deletion schedule. The planned site-wide traffic totals are described prospectively because the custom domain is not yet active.

### FI — Tietosuoja

Päivitetty: [julkaisupäivä]

**Rekisterinpitäjä:** Jyri Wennström, Suomi. Yhteydenotot ja tietosuoja-asiat: contact@oikumene.works.

**Sivuston käyttö.** Oikumene Works on maksuton, kehitteillä oleva sivusto. Nykyinen esikatselu ei sisällä käyttäjätilejä, toimivaa palautelomaketta, kysymyksiin vastaamista eikä sivuston omaa kävijäseurantaa. Sivuston toimittamiseen ja suojaamiseen käytetään Cloudflarea. Verkkopyyntöjen yhteydessä käsitellään teknisiä tietoja, kuten IP-osoitetta ja pyydetyn resurssin tietoja. Käsittelyn perusteena on oikeutettu etu (EU:n yleisen tietosuoja-asetuksen 6 artiklan 1 kohdan f alakohta): sivuston pitäminen saatavilla ja turvallisena. Varsinaisen verkkotunnuksen käyttöönoton jälkeen on tarkoitus käyttää Cloudflaren valmiita koontitilastoja sivuston kokonaiskäyttömäärän arvioimiseen ja kehitystyön tueksi. Emme seuraa yksittäisen kävijän toimintaa tätä tarkoitusta varten.

**Evästeet.** Sivusto ei lisää analytiikka- tai mainosevästeitä eikä omaa seurantaskriptiä. Cloudflare voi käyttää palvelun turvallisuuteen liittyviä evästeitä. [Täsmennetään tosiasiallisesti käytetyt tekniikat, niiden tarkoitukset ja säilytysajat selaintestien perusteella.]

**Yhteydenotot.** Jos lähetät sähköpostia, käsittelemme sähköpostiosoitetta, viestin sisältöä ja lähetykseen liittyviä tarpeellisia tietoja asian hoitamiseksi. Käsittelyn peruste on oikeutettu etu vastata yhteydenottoihin ja kehittää sivustoa; lakisääteisen pyynnön käsittely perustuu siltä osin lakisääteiseen velvoitteeseen (6 artiklan 1 kohdan c alakohta). Älä lähetä tarpeettomia tai arkaluonteisia henkilötietoja. Yhteydenotto on vapaaehtoinen. Tavallista sähköpostia ei tule pitää päästä päähän salattuna.

**Palveluntarjoajat ja tietojen siirrot.** Sivuston tekninen palveluntarjoaja on Cloudflare, Inc. ja sähköpostipalveluna käytetään Tutaa, jonka palvelimet sijaitsevat palveluntarjoajan mukaan Saksassa. Cloudflaren maailmanlaajuisessa verkossa henkilötietoja voidaan käsitellä myös ETA-alueen ulkopuolella. Cloudflaren julkaistun tietojenkäsittelysopimuksen mukaisia siirtoperusteita ovat soveltuvin osin EU:n ja Yhdysvaltojen tietosuojakehys ja EU:n mallisopimuslausekkeet. [Varmennetaan soveltuminen, ajantasainen sertifiointi ja muut tarpeelliset suojatoimet ennen julkaisua.] Sopimuksen ehdot ovat saatavilla osoitteessa https://www.cloudflare.com/cloudflare-customer-dpa/. Lisätietoja voi pyytää yhteysosoitteestamme.

**Säilytys.** Oikumene ei ylläpidä omaa kävijäkohtaista tietokantaa. Cloudflaren teknisten tietojen säilytys riippuu palvelusta ja tietojen tarpeellisuudesta. [Täsmennetään tuotekohtaiset tiedossa olevat säilytysajat tai perustellut kriteerit.] Sähköpostiviestejä säilytetään vain niin kauan kuin asian hoitaminen ja perusteltu jatkokäsittely sitä edellyttävät, tai niin kauan kuin lakisääteinen velvoite tai oikeusvaateen käsittely edellyttää.

**Oikeutesi.** Sinulla on tietosuoja-asetuksen mukaisin edellytyksin oikeus tarkastaa tietosi, pyytää niiden oikaisua, poistamista tai käsittelyn rajoittamista ja vastustaa oikeutettuun etuun perustuvaa käsittelyä. Voit ottaa yhteyttä osoitteeseen contact@oikumene.works. Sinulla on oikeus tehdä valitus tietosuojavaltuutetun toimistolle (https://tietosuoja.fi/). Emme tee henkilöä koskevia yksinomaan automaattiseen käsittelyyn perustuvia oikeusvaikutteisia tai vastaavasti merkittäviä päätöksiä.

Verkkopyynnön teknisiä tietoja tarvitaan sivun toimittamiseen. Sivuston käyttö ei edellytä rekisteröitymistä eikä yhteydenottoa. Ulkopuolisilla linkitetyillä palveluilla on omat tietosuojakäytäntönsä.

### EN — Privacy notice

Updated: [publication date]

**Controller:** Jyri Wennström, Finland. Contact and privacy requests: contact@oikumene.works.

**Using the website.** Oikumene Works is a free website under development. The current preview has no user accounts, working feedback form, questionnaires or site-operated visitor tracking. Cloudflare is used to deliver and protect the site. Technical data, such as IP addresses and requested resources, are processed in connection with web requests. The legal basis is legitimate interests under Article 6(1)(f) of the EU General Data Protection Regulation: keeping the website available and secure. Once the custom domain is active, we intend to use Cloudflare's existing aggregate statistics to estimate overall usage and support development. We do not track individual visitors' behaviour for this purpose.

**Cookies.** The site does not add analytics or advertising cookies or its own tracking scripts. Cloudflare may use security-related cookies. [Specify actual storage/access technologies, purposes and lifetimes after browser tests.]

**Contacting us.** If you send an email, we process your email address, message contents and necessary delivery data to handle your enquiry. The legal basis is our legitimate interest in responding to enquiries and improving the site; where handling a request is a statutory obligation, Article 6(1)(c) applies to that processing. Please do not send unnecessary or sensitive personal information. Contacting us is voluntary. Ordinary email should not be assumed to be end-to-end encrypted.

**Service providers and transfers.** The website uses Cloudflare, Inc. and email is provided through Tuta, whose servers are located in Germany according to the provider. Cloudflare's global network may process personal data outside the EEA. Its published data processing agreement provides for the EU–US Data Privacy Framework and EU standard contractual clauses where applicable. [Verify applicable terms, current certification and other necessary safeguards before publication.] The agreement is available at https://www.cloudflare.com/cloudflare-customer-dpa/. Further information can be requested at our contact address.

**Retention.** Oikumene does not maintain its own visitor-level database. Retention of technical data by Cloudflare depends on the service and the necessity of the data. [Specify known product-specific retention periods or justified criteria.] Email correspondence is kept only for as long as handling the matter and justified follow-up require, or as required by a legal obligation or the handling of a legal claim.

**Your rights.** Subject to the conditions of the GDPR, you have the right to access your personal data, request rectification, erasure or restriction, and object to processing based on legitimate interests. Contact contact@oikumene.works. You have the right to lodge a complaint with the Finnish Office of the Data Protection Ombudsman (https://tietosuoja.fi/en/home). We do not make solely automated decisions concerning individuals that produce legal or similarly significant effects.

Technical data in web requests are needed to deliver the page. Using the site does not require registration or contacting us. Linked external services have their own privacy practices.

### Remaining verification for the notice

- Tuta publicly describes a GDPR DPA for business accounts in Settings → Subscription: https://tuta.com/support/general. Verify the actual account's applicable agreement and the provider's role(s); do not assume an upgrade is required solely because a particular plan name is used. Tuta's server location and encryption description: https://tuta.com/support/security.
- Cloudflare public DPA v6.4 (Annex 1 retention criteria, section 6 transfers) and current terms: https://www.cloudflare.com/cloudflare-customer-dpa/ and https://www.cloudflare.com/terms/. The public agreement alone does not establish the specific account's accepted terms.
- Actual clean-browser test and product-specific retention/transfer evidence; finalise and then publish the FI/EN source and generated pages together. Update feedback address in source, generated pages and tests at the same time. Keep form disabled.


## 8. Email provider review — 2026-11-27

Reviewed [Tutao GmbH privacy statement](https://tuta.com/privacy-policy) (dated 13 November 2025), [terms](https://tuta.com/terms) (sections 1.2 and 4.6), [GDPR support FAQ](https://tuta.com/support/general), and [EDPB Guidelines 07/2020, final version, p. 13](https://www.edpb.europa.eu/system/files/documents/2023-10/EDPB_guidelines_202007_controllerprocessor_final_en.pdf).

- Provider states data are stored in German ISO 27001-certified data centres. Stored message contents are encrypted; ordinary external mail is encrypted for storage after receipt, not necessarily end-to-end during transmission. Necessary delivery metadata are not encrypted. Mail-server logs are retained for at most seven days; this does not mean mailbox messages are automatically deleted after seven days.
- Terms allow business use on paid versions unless the tariff says otherwise. This alone does not establish a binding Art. 28 arrangement. The public privacy statement identifies Tutao as controller for its own processing, and its FAQ advertises a DPA with business accounts. The EDPB distinguishes a communications provider's own service-operation data from message content; ongoing storage on behalf of another controller may be a processor activity. Evaluate actual functions, not subscription labels or encryption alone.
- Obtain written clarification from Tutao (privacy@tutao.de or account support) whether existing terms cover Art. 28 for a Finnish private individual operating a free non-commercial website and keeping ordinary incoming/outgoing contact mail, or whether a supplementary agreement is required and available. No subscription change or contract acceptance assumed. If a processor arrangement is required but unavailable, select a compliant alternative before introducing additional collection. Keep feedback form disabled; do not treat this open issue as resolved.
- Provider's own privacy statement and retention evidence may now be used to refine the bilingual draft. Do not disclose private subscription details in public project records. The provider's own statement is not a substitute for Oikumene's notice or any required processor contract.
