# Oikumene Works website — technical scaffold 0.1.0

**Status: pre-launch technical preview, 25 November 2026.** This is a separate website scaffold, not a new version of the Christian Belief Explorer pilot. The website repository is `oikumene-works/website`. The canonical CBE project remains at <https://github.com/oikumene-works/christian-belief-explorer>.

## Accepted site-wide design decisions — 25 November 2026

**Permanent general objective:** “Tehdään nykyinen ratkaisu toimivaksi sitomatta tarpeettomasti tulevia valintoja.” (Make the current solution work without unnecessarily constraining future choices.)

Apply this objective to all website decisions, including technical architecture, content structure, visual identity and publishing practices. Avoid unnecessary lock-in as well as speculative complexity; do not implement future features solely in anticipation of possible needs.

**Third design preview, 28 November 2026:** two initially closed, independently expandable home folders: For Reflection and Research, then Projects (Software; Tools and Solutions). All eight entries are included, with stable existing URLs, separate data and native HTML disclosures. The revised Finnish About text and Agape page are included; their English translations and the project summaries are editorial drafts. The feedback form is postponed until needed; the proposed email address is displayed but not yet verified. No production or DNS changes.
## Scope

- Bilingual static landing, two-folder home, about, Agape, email-only feedback preview, privacy preview, eight detail pages and 404 page.
- Independent FI and EN copy in a shared source structure (`src/content.mjs`); the Finnish About page is approved for this review; other copy remains draft. Project metadata and zero/one/many localized actions live in `src/projects.mjs`; the reusable directory and other page renderers live in `src/render.mjs`. No questionnaire, user answer data, scoring or historical profiles are included. Project metadata fields and action links are optional; no compulsory generic action link is rendered.
- No feedback form, API, analytics, mail delivery or server-side storage. A single same-origin script chooses the language at the root and remembers explicit choices in browser localStorage, with English fallback. Language links and native folder disclosures work without JavaScript. The proposed feedback address is displayed as unverified text; enable its mailto link only after verifying delivery. The separate CBE launch requirement is not changed.
- Every HTML page is `noindex, nofollow`; `robots.txt` disallows crawling, and Cloudflare Static Assets `_headers` sets preview safety headers. These do not make a preview URL private. Never include secrets or real feedback in a public preview.

## Local development

Requires Node.js 22.18+ for the planned Cloudflare CLI integration; the plain static build and tests use Node built-ins and were tested with Node.js 22.16.0. Python 3 is used only for the local preview server.

```sh
npm test
npm run preview
```

Open <http://127.0.0.1:8080/>. Generated files are committed in `public/` for inspection and reproducible first deployment. Edit the source, not generated HTML, then run `npm run build`. No npm dependencies are required for the scaffold. Do not put credentials in the repository.

## Site-wide visual identity

The selected Oikumene mark is **A2+** (25 November 2026): a cross extending above an open circle, with a small gap below the cross. The compact favicon is an optical variant of the same mark, using heavier strokes and wider gaps to remain legible at 16 px.

The editable single source of truth is `src/brand.mjs`. Change its geometry and colour, or replace the master SVG and set the optional compact override to a new SVG (or `null` to reuse the master). Run `npm run build` or `npm test`. The build regenerates `public/assets/brand-mark.svg`, `public/favicon.svg`, and the logo and favicon references for every page, including both languages, the landing page and the 404 page. Content-based URL revisions update automatically so the browser requests the new images. Do not modify the generated assets or page references individually. The brand is deliberately a shared site component, not language-specific content. The SVG favicon targets modern browsers.

## Cloudflare deployment (technical preview only)

The selected platform is **Cloudflare Workers + Static Assets**, in the separate **Oikumene** account. The source is this repository. `cloudflare.config.ts` explicitly names the Worker `website`, enables its workers.dev host and Preview URLs, and configures static HTML routing and custom 404 handling. No custom domain or server-side bindings are configured.

Initial Workers Builds settings (repository root, main branch):

- Project name: `website`
- Build command: `npm test` (builds the static site and runs its tests)
- Deploy command: `npx --yes cf@1.0.0-rc.2 deploy ./public`
- Preview command: `npx --yes cf@1.0.0-rc.2 previews deploy ./public`

The pinned Cloudflare CLI release candidate supports direct deployment of an already built directory as an assets-only Worker. See [Cloudflare CLI documentation](https://developers.cloudflare.com/cf/projects/) and [programmatic configuration](https://developers.cloudflare.com/cf/projects/cloudflare-config/). The initial deployment must target the Oikumene account and workers.dev only. The CLI configuration has been prepared, but its actual cloud build, deployment, HTTP routing, and headers have not yet been verified. The preview is publicly reachable if deployed, not private; retain noindex, nofollow and the unverified-email notice.

Do not add a second CLI configuration in parallel. Keep the DNS zone pending until the migration checks are complete. Do not modify Dynadot nameservers or Tuta DNS as part of this deployment. Do not enable Cloudflare Email Routing.

## Launch gates

- Editorial review of both languages and actual project scope.
- Verified feedback email recipient, delivery and mailto link, updated privacy notice; no feedback API required for the website's first launch.
- Verified preview deployment, headers and link tests, accessibility testing and complete privacy information.
- Authoritative DNS comparison and controlled nameserver migration; incoming and outgoing Tuta mail tests.
- Production release explicitly gated after these checks.

License of this new website repository remains to be confirmed before public release. The separate CBE project's original material is CC0 1.0 as documented in that repository; no third-party material or original pilot source has been copied here.
