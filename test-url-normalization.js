#!/usr/bin/env node
/**
 * URL normalization regression test.
 * Ensures canonical, og:url, JSON-LD "url"/"item" fields, and sitemap <loc>
 * entries all use clean paths (no .html extension) so they resolve to the
 * final 200 URL served by Cloudflare Workers (html_handling: drop-extension).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const BASE = 'https://www.growthforge-ai.com';
const TRAILING_HTML_RE = /https:\/\/www\.growthforge-ai\.com\/[^"'\s<>]+\.html/g;

// Files to audit
const HTML_FILES = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(ROOT, f));
const SITEMAP = path.join(ROOT, 'sitemap.xml');

let errors = 0;

function check(file, context, match) {
  console.error(`FAIL  ${path.basename(file)}: ${context} contains ".html" URL → ${match}`);
  errors++;
}

// --- Audit HTML files ---
for (const file of HTML_FILES) {
  const src = fs.readFileSync(file, 'utf8');
  const lines = src.split('\n');

  lines.forEach((line, i) => {
    const lineNum = i + 1;

    // canonical
    if (line.includes('rel="canonical"')) {
      const m = line.match(/href="([^"]+)"/);
      if (m && m[1].endsWith('.html')) {
        check(file, `line ${lineNum} canonical href`, m[1]);
      }
    }

    // og:url
    if (line.includes('property="og:url"')) {
      const m = line.match(/content="([^"]+)"/);
      if (m && m[1].endsWith('.html')) {
        check(file, `line ${lineNum} og:url content`, m[1]);
      }
    }

    // JSON-LD absolute URLs (only absolute URLs in this domain, not img/logo refs)
    const jsonMatches = line.match(TRAILING_HTML_RE);
    if (jsonMatches) {
      // Skip lines that are clearly image or font references
      if (!line.includes('.jpg') && !line.includes('.png') && !line.includes('.gif') && !line.includes('.svg')) {
        for (const m of jsonMatches) {
          check(file, `line ${lineNum} JSON-LD / meta URL`, m);
        }
      }
    }
  });
}

// --- Audit sitemap ---
const sitemapSrc = fs.readFileSync(SITEMAP, 'utf8');
const locMatches = sitemapSrc.match(/<loc>[^<]+<\/loc>/g) || [];
for (const loc of locMatches) {
  const url = loc.replace(/<\/?loc>/g, '');
  if (url.endsWith('.html')) {
    check(SITEMAP, '<loc>', url);
  }
}

// Summary
if (errors === 0) {
  console.log(`PASS  All canonical, og:url, JSON-LD, and sitemap URLs use clean paths (no .html). [${HTML_FILES.length} HTML files + sitemap checked]`);
  process.exit(0);
} else {
  console.error(`\n${errors} URL normalization issue(s) found. Fix by removing ".html" from absolute canonical/sitemap URLs.`);
  process.exit(1);
}
