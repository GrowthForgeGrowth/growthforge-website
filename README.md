# GrowthForge Website

Static marketing site for [growthforge-ai.com](https://www.growthforge-ai.com) — deployed via Cloudflare Workers.

---

## Trend Topic → Blog Draft Automation

This repository includes an automated workflow that generates a Markdown blog draft and opens a pull request whenever a trend topic is submitted via a GitHub Issue.

### How it works (overview)

```
New Issue (trend-post label)
        │
        ▼
GitHub Action: trend-post.yml
  ├── Rate-limit check   (max 1 open draft PR at a time)
  ├── Blocked-topic check (.github/blocked-topics.txt)
  ├── Parse issue fields
  ├── Generate Markdown draft (content/drafts/{slug}.md)
  ├── Push to feature branch
  └── Open draft PR for editorial review
        │
        ▼
Human editor: complete TODOs → convert to HTML → merge
```

No content is published directly. A PR is always required.

---

### 1 · Submit a trend topic issue

1. Go to **Issues → New Issue**.
2. Choose the **"New Trend Blog Request"** template.
3. Fill in all required fields:
   - **Keyword / Topic** — the primary search term to target
   - **Search Intent** — TOFU / MOFU / BOFU
   - **Proposed Target Slug** — the URL path (e.g. `ai-seo-for-saas`)
   - **Internal Links to Include** — paths to weave into the post
   - **Call to Action** — what you want readers to do
   - **Additional Notes** — optional context or angle guidance
4. Submit the issue. The `trend-post` label is applied automatically.

The workflow triggers within seconds.

---

### 2 · Required setup (first-time only)

The `trend-post` label must exist in the repository before the issue form can apply it. The workflow creates it automatically on first run, but you can also create it manually:

```
GitHub → Issues → Labels → New label
Name:  trend-post
Color: #0075ca
```

No secrets or external API keys are required — the workflow uses the built-in `GITHUB_TOKEN`.

---

### 3 · Where the draft appears

- **Branch:** `trend-post/{issue-number}-{slug}`
- **File:** `content/drafts/{slug}.md`
- **PR:** Opened as a **draft PR** with label `trend-post` + `content-draft`
- **Issue comment:** A link to the PR is posted on the originating issue

---

### 4 · Reviewing and publishing the draft

1. Open the draft PR and review `content/drafts/{slug}.md`.
2. Complete all `<!-- TODO -->` sections in the draft.
3. Verify every internal link resolves to a live `200` page.
4. Convert the Markdown to an HTML file (`{slug}.html`) in the repo root, following existing page conventions (header, footer, meta tags, structured data).
5. Add the HTML file to the PR.
6. Work through the **Editorial & QA Checklist** in the PR description.
7. Mark the PR as **Ready for review** and request approval from an editor.
8. Merge only after approval. The file is served at `/{slug}` automatically by Cloudflare Workers.

> **Never merge a draft PR directly to main without completing the checklist and human review.**

---

### 5 · Safety guardrails

| Guardrail | Behaviour |
|-----------|-----------|
| **No direct publish** | Workflow always creates a PR; never commits to `main` |
| **Rate limit** | Maximum **1 open trend-post PR** at a time; the issue stays open and receives a comment explaining how to re-trigger once the existing PR is merged or closed (re-apply the `trend-post` label) |
| **Blocked topics** | Keywords matching `.github/blocked-topics.txt` are rejected with an explanatory comment |
| **Draft PR** | PRs are opened as GitHub **draft PRs** — they cannot be accidentally merged |

#### Adding blocked topics

Edit `.github/blocked-topics.txt`. Each line is a case-insensitive partial match.
Lines starting with `#` are comments.

```
# Example: block any keyword containing "lawsuit"
lawsuit
```

---

### 6 · File reference

| File | Purpose |
|------|---------|
| `.github/ISSUE_TEMPLATE/trend-blog-request.yml` | Structured issue form for trend submissions |
| `.github/workflows/trend-post.yml` | Automation workflow |
| `.github/PULL_REQUEST_TEMPLATE.md` | Editorial QA checklist applied to all PRs |
| `.github/blocked-topics.txt` | Blocked keyword/topic list |
| `content/templates/trend-post-template.md` | Markdown blog draft template |
| `content/drafts/` | Generated draft files (never published directly) |

---

## Development

This is a static HTML site with no build step.

```bash
npm run build   # echoes "no build step needed"
```

Deployment is managed via Cloudflare Workers (`wrangler.jsonc`). Pages are served with `.html` extension stripped (`drop-extension`), so canonical URLs use clean paths (e.g. `/about`, not `/about.html`).

---

## Editorial Standards

See [growthforge-ai.com/editorial-standards](https://www.growthforge-ai.com/editorial-standards) for GrowthForge's full content policy.
