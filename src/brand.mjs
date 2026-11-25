// Single source of the Oikumene site mark, selected 25 November 2026: A2+.
// The ring represents the world; the Latin cross extends above it and remains
// separate from the ring at the bottom. Keep the tiny gaps visible at icon size.
// All HTML references and both SVG assets are derived from this module.
import { createHash } from 'node:crypto';

const colour = '#042e58';
const normal = {
  radius: 25.5, ringWeight: 1.5, opening: 4.6,
  crossWeight: 3.05, top: 4.5, bottom: 57.4,
  barY: 23.3, barWidth: 26.2, corner: 0.45,
};
// Optical correction, not a different logo: reinforce the strokes and enlarge
// the upper and lower gaps so they survive rasterization to a 16 px favicon.
const compact = {
  ...normal,
  radius: 24.5, ringWeight: 3.4, opening: 8.2,
  crossWeight: 5.2, bottom: 52.3,
  barWidth: 27, corner: 0.65,
};

function renderMark(g) {
  const cx = 32, cy = 35;
  const f = n => Number(n.toFixed(3));
  const arcY = f(cy - Math.sqrt(g.radius ** 2 - g.opening ** 2));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">\n  <path d="M ${f(cx + g.opening)} ${arcY} A ${g.radius} ${g.radius} 0 1 1 ${f(cx - g.opening)} ${arcY}" fill="none" stroke="${colour}" stroke-width="${g.ringWeight}"/>\n  <g fill="${colour}">\n    <rect x="${f(cx - g.crossWeight / 2)}" y="${g.top}" width="${g.crossWeight}" height="${f(g.bottom - g.top)}" rx="${g.corner}"/>\n    <rect x="${f(cx - g.barWidth / 2)}" y="${f(g.barY - g.crossWeight / 2)}" width="${g.barWidth}" height="${g.crossWeight}" rx="${g.corner}"/>\n  </g>\n</svg>\n`;
}

// To replace the mark entirely, supply the new master SVG here. Set the small
// override to null to reuse that master as the favicon, or provide its optical
// variant here. Do not edit individual HTML pages or generated assets.
const masterSvg = renderMark(normal);
const smallSvgOverride = renderMark(compact);
const faviconSvg = smallSvgOverride ?? masterSvg;
const revision = svg => createHash('sha256').update(svg).digest('hex').slice(0, 12);
const markPath = 'assets/brand-mark.svg';
const faviconPath = 'favicon.svg';

export const brand = Object.freeze({
  markPath, faviconPath,
  markSvg: masterSvg, faviconSvg,
  markUrl: `/${markPath}?v=${revision(masterSvg)}`,
  faviconUrl: `/${faviconPath}?v=${revision(faviconSvg)}`,
});
