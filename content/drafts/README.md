# Drafts

This directory holds auto-generated Markdown blog drafts created by the
[Trend Post Generator workflow](../../.github/workflows/trend-post.yml).

Each file is named `{slug}.md` and is opened as a **draft PR** for editorial
review. No file in this directory is published directly.

## Publishing flow

1. A `trend-post` GitHub Issue triggers the workflow.
2. The workflow creates `content/drafts/{slug}.md` on a feature branch.
3. A draft PR is opened for human review and editing.
4. An editor completes all `<!-- TODO -->` sections and converts the Markdown
   to a site-ready HTML file (`{slug}.html` in the repo root).
5. The HTML file is added to the PR, the Markdown draft can be removed or kept
   as a source record, and the PR is merged after approval.
