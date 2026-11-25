# Oikumene Works website — technical scaffold 0.1.0

**Status: pre-launch technical preview, 25 November 2026.** This is a separate website scaffold, not a new version of the Christian Belief Explorer pilot. The intended repository is `oikumene-works/website` (not yet created when this archive was prepared). The canonical CBE project remains at <https://github.com/oikumene-works/christian-belief-explorer>.

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

## Cloudflare deployment (next step, not yet performed)

The selected platform is **Cloudflare Workers + Static Assets** in the separate **Oikumene** account. Before the first deployment, create the intended GitHub repository and commit this scaffold. Establish an authenticated Cloudflare CLI (`cf`) session in the correct account; use the current official [Cloudflare CLI instructions](https://developers.cloudflare.com/cf/projects/) and [programmatic configuration](https://developers.cloudflare.com/cf/projects/cloudflare-config/). For a new project, follow `cf init .`, review its generated configuration to confirm `public/` is the static asset source, no custom domain is connected, and no paid service is enabled. Commit the reviewed config and dependency lockfile. Do not use a second CLI configuration in parallel. The Cloudflare CLI was not available in the scaffold's build environment; its generated configuration, deployment and Cloudflare-specific routing/headers remain to be tested.

Use a `workers.dev` preview (not the production domain), test bilingual URLs, 404 and headers, and then establish GitHub integration. Keep the DNS zone pending until the planned migration checks are complete. Do not modify Dynadot nameservers or Tuta DNS as part of this deployment. Do not use Cloudflare Email Routing.

## Launch gates

- Editorial review of both languages and actual project scope.
- Tested feedback API and verified Tuta recipient; no accounts or automatic transmission of player answers.
- Verified preview deployment, headers and link tests, accessibility testing and complete privacy information.
- Authoritative DNS comparison and controlled nameserver migration; incoming and outgoing Tuta mail tests.
- Production release explicitly gated after these checks.

License of this new website repository remains to be confirmed before public release. The separate CBE project's original material is CC0 1.0 as documented in that repository; no third-party material or original pilot source has been copied here.
