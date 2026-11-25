// Initial assets-only technical preview. No custom domains or server-side bindings.
export default {
  worker: {
    name: "website",
    compatibilityDate: "2026-11-25",
    workersDev: true,
    previewUrls: true,
    assets: {
      htmlHandling: "auto-trailing-slash",
      notFoundHandling: "404-page"
    }
  }
};
