# Oikumene Works website — technical scaffold 0.1.0

**Status: pre-launch technical preview, 25 November 2026.** This is a separate website scaffold, not a new version of the Christian Belief Explorer pilot. The website repository is `oikumene-works/website`. The canonical CBE project remains at <https://github.com/oikumene-works/christian-belief-explorer>.

## Scope

- Bilingual static landing, home, about, feedback-preview, privacy-preview and 404 pages.
- Independent FI and EN copy in a shared source structure (`src/content.mjs`); the wording is a working draft, not an accepted editorial decision. The description follows the existing CBE README. No questionnaire, user answer data, scoring or historical profiles are included.
- Feedback controls are intentionally disabled. There is no form action, script, analytics, mail delivery, or storage. The proposed feedback address has not been tested. Do not enable collection before server-side validation, abuse protection, delivery and privacy tests pass.
- Every HTML page is `noindex, nofollow`; `robots.txt` disallows crawling, and Cloudflare Static Assets `_headers` sets preview safety headers. These do not make a preview URL private. Never include secrets or real feedback in a public preview.

## Local development

Requires Node.js 22.18+ for the planned Cloudflare CLI integration; the plain static build and tests use Node built-ins and were tested with Node.js 22.16.0. Python 3 is used only for the local preview server.

```sh
npm test
npm run preview
```

Open <http://127.0.0.1:8080/>. Generated files are committed in `public/` for inspection and reproducible first deployment. Edit the source, not generated HTML, then run `npm run build`. No npm dependencies are required for the scaffold. Do not put credentials in the repository.

## Cloudflare deployment (technical preview only)

The selected platform is **Cloudflare Workers + Static Assets**, in the separate **Oikumene** account. The source is this repository. `cloudflare.config.ts` explicitly names the Worker `website`, enables its workers.dev host and Preview URLs, and configures static HTML routing and custom 404 handling. No custom domain or server-side bindings are configured.

Initial Workers Builds settings (repository root, main branch):

- Project name: `website`
- Build command: `npm test` (builds the static site and runs its tests)
- Deploy command: `npx --yes cf@1.0.0-rc.2 deploy ./public`
- Preview command: `npx --yes cf@1.0.0-rc.2 previews deploy ./public`

The pinned Cloudflare CLI release candidate supports direct deployment of an already built directory as an assets-only Worker. See [Cloudflare CLI documentation](https://developers.cloudflare.com/cf/projects/) and [programmatic configuration](https://developers.cloudflare.com/cf/projects/cloudflare-config/). The initial deployment must target the Oikumene account and workers.dev only. The CLI configuration has been prepared, but its actual cloud build, deployment, HTTP routing, and headers have not yet been verified. The preview is publicly reachable if deployed, not private; retain noindex, nofollow and disabled feedback.

Do not add a second CLI configuration in parallel. Keep the DNS zone pending until the migration checks are complete. Do not modify Dynadot nameservers or Tuta DNS as part of this deployment. Do not enable Cloudflare Email Routing.

## Launch gates

- Editorial review of both languages and actual project scope.
- Tested feedback API and verified Tuta recipient; no accounts or automatic transmission of player answers.
- Verified preview deployment, headers and link tests, accessibility testing and complete privacy information.
- Authoritative DNS comparison and controlled nameserver migration; incoming and outgoing Tuta mail tests.
- Production release explicitly gated after these checks.

License of this new website repository remains to be confirmed before public release. The separate CBE project's original material is CC0 1.0 as documented in that repository; no third-party material or original pilot source has been copied here.
