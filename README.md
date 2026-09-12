# Muizz — Developer Portfolio

A personal portfolio, résumé, project showcase, and blog, built with Next.js (App Router),
TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 16** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** for subtle animation
- **next-themes** for dark/light mode
- **MDX** (via `next-mdx-remote`) for the blog
- **Lucide React** for icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

### Lint / Format

```bash
npm run lint
npm run format
```

## Editing Content

All personal content is centralized so nothing needs to be hardcoded inside components:

| What                          | Where                          |
| ----------------------------- | ------------------------------- |
| Name, title, bio, links       | `src/data/profile.ts`           |
| Work experience               | `src/data/experience.ts`        |
| Projects                      | `src/data/projects.ts`          |
| Skills                        | `src/data/skills.ts`            |
| Activities / achievements     | `src/data/activities.ts`        |
| Blog posts                    | `content/blog/*.mdx`            |
| Résumé PDF                    | `public/resume.pdf`             |

Several entries are intentionally left as placeholders (wrapped in `[brackets]`) where real
information wasn't available — replace these before treating the site as final. Search the
`src/data` folder for `isPlaceholder` and `[Add` to find them all.

### Adding a blog post

Create a new `.mdx` file in `content/blog/` with frontmatter:

```mdx
---
title: "Post title"
description: "One-sentence summary shown in listings and meta tags."
date: "2026-09-01"
tags: ["kubernetes", "backend"]
---

Post content in Markdown/MDX goes here.
```

The post will automatically appear on `/blog`, get a dynamic route at `/blog/[slug]`, and be
included in the sitemap.

### Enabling live GitHub repos

Set `NEXT_PUBLIC_GITHUB_USERNAME` in `.env.local` (copy from `.env.example`) to your GitHub
username to have the site attempt to fetch your public repositories. If unset, or if the request
fails, the site falls back to the static project data automatically — no code changes needed.

### Wiring up the contact form

The contact form on `/contact` is UI-complete but not wired to a backend. Point
`NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` at a [Resend](https://resend.com), [Formspree](https://formspree.io),
or Vercel Function endpoint and update the `onSubmit` handler in
`src/components/contact/ContactSection.tsx` to POST to it.

## Deploying to Vercel

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js — no build configuration is required.
4. If you're using the GitHub repo integration or contact form, add the corresponding
   environment variables from `.env.example` in the Vercel project settings.
5. Deploy. Every push to your default branch redeploys automatically.

No secrets are required for a baseline deployment — the site works fully with static data alone.

## Project Structure

```
src/
  app/            # Routes (App Router)
  components/     # UI, layout, and feature components
  data/           # Centralized content (profile, experience, projects, skills, activities)
  lib/            # Utilities (MDX parsing, GitHub fetch, class helpers)
content/
  blog/           # MDX blog posts
public/
  resume.pdf      # Downloadable résumé
  favicon.svg
```

## License

Personal project — feel free to use the structure/approach as a reference for your own portfolio.
