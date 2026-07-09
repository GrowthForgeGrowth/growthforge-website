# AI Visibility Policy

Last updated: 2026-07-09

GrowthForge uses crawler directives to balance discoverability with content protection.

## Allowed

- Search engine indexing by standard search crawlers.
- Public access to website pages for normal browsing.

## Restricted

- AI training usage preference is set to `ai-train: no`.
- The following AI-related crawlers are disallowed in `robots.txt`:
  - GPTBot
  - Google-Extended
  - ClaudeBot
  - Meta-ExternalAgent
  - Applebot-Extended
  - Amazonbot

## Rationale

- Preserve search discoverability.
- Reduce unapproved AI training ingestion.
- Keep content use aligned with GrowthForge goals.

## Future updates

This policy may change over time, including selectively allowing high-value AI crawlers where beneficial.
