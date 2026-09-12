# User Guide — Muizz Portfolio Site

This guide is for maintaining the site day to day: updating your info, adding projects
and blog posts, and deploying changes. It assumes no prior Next.js knowledge — if you
just need setup/build commands, see the shorter `README.md` instead. This is the deeper
reference.

> **Golden rule of this codebase:** you should almost never need to touch a component
> file just to change what's *on* the page. Everything visible is pulled from a small
> set of data files and content files. If you find yourself editing a `.tsx` file inside
> `src/components/` to fix a typo or update a date, you're probably in the wrong file —
> check the tables below first.

---

## 1. Before You Do Anything Else

Install dependencies once:

```bash
npm install
```

Then, while you're making changes, keep this running in a terminal — it live-reloads as
you save files:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Leave this running in the
background for everything in this guide.

---

## 2. Where Everything Lives

| You want to change...              | Edit this file                          |
| ----------------------------------- | ---------------------------------------- |
| Name, title, bio, email, links      | `src/data/profile.ts`                    |
| Jobs / work history                 | `src/data/experience.ts`                 |
| Projects                            | `src/data/projects.ts`                   |
| Skills & interests                  | `src/data/skills.ts`                     |
| Activities, achievements, roadmap   | `src/data/activities.ts`                 |
| Blog posts                          | `content/blog/*.mdx` (one file per post) |
| Résumé PDF                          | `public/resume.pdf`                      |
| Colors, fonts, spacing, dark theme  | `src/app/globals.css`                    |
| Nav bar links                       | `src/lib/nav.ts`                         |
| Site title/description for Google   | `src/data/profile.ts` (the `seo` export) |

Everything in the table above is a plain data file — arrays and objects, no JSX, no
styling. You can edit these safely without understanding React.

---

## 3. Finding and Clearing Placeholders

Some content was left as an honest placeholder rather than invented. Before treating the
site as finished, search the project for these two markers:

```bash
grep -rn "\[Add" src content
grep -rn "isPlaceholder" src
```

That will surface things like your real email address, LinkedIn/GitHub URLs, and any
certification/hackathon entries that don't exist yet. Replace or delete each one.

**Highest priority fixes**, all in `src/data/profile.ts`:

```ts
email: 'muizz@example.com',              // → your real email
linkedin: 'https://linkedin.com/in/...', // → your real LinkedIn URL
github: 'https://github.com/...',        // → your real GitHub URL
githubUsername: '',                      // → your GitHub username (see §7)
```

---

## 4. Updating Your Profile

Open `src/data/profile.ts`. Every field is a plain string or array:

- `fullName`, `shortName`, `title`, `tagline`, `location` — shown in the hero, footer,
  and page titles.
- `summary` — the one-paragraph professional summary used on the résumé page.
- `about` — an array of paragraphs for the `/about` page. Add or remove array entries to
  add/remove paragraphs; each string becomes one `<p>`.
- `currentlyLearning` — array of `{ name, note }` objects shown on `/about`.
- `education` — degree, institution, and a free-text detail line.

Save the file, and the dev server updates automatically.

---

## 5. Managing Work Experience

Open `src/data/experience.ts`. The `experience` array holds one object per job:

```ts
{
  id: 'unique-id',           // used internally, must be unique
  role: 'Your Job Title',
  company: 'Company Name',
  location: 'City, Country',
  start: '2024',
  end: 'Present',            // or an end year/date
  summary: 'One or two sentences shown collapsed.',
  highlights: ['Bullet one', 'Bullet two', ...],  // shown when expanded
  stack: ['Tech', 'Tech'],   // shown as badges when expanded
}
```

**To add a new job:** copy an existing object, give it a new `id`, and add it to the
array (newest jobs should go first — the page displays them in array order).

**To remove a job:** delete its object from the array.

The same file also exports `journeyTimeline`, which powers the "journey" timeline on the
`/about` page — separate from the experience list, so update both if a milestone should
appear in each place.

---

## 6. Managing Projects

Open `src/data/projects.ts`. This is the biggest data file, because each project can
have a full case-study page.

Repositories should be added as normal project objects with a local `slug`, description,
tech stack, and GitHub URL. This makes them searchable in the project grid and gives them
their own `/projects/[slug]` detail page.

### The basics (always required)

```ts
{
  slug: 'my-project',          // becomes the URL: /projects/my-project
  name: 'My Project',
  description: 'One sentence shown on the project card.',
  categories: ['Backend', 'API'],  // used by the filter buttons on /projects
  stack: ['Go', 'PostgreSQL'],
  github: 'https://github.com/you/repo',  // or null if private/no repo
  demo: 'https://your-demo.com',          // or null if there isn't one
  status: 'Live',   // 'Live' | 'In Progress' | 'Case Study' | 'Archived' | 'Planned'
  featured: true,   // shows on the homepage "Selected Projects" section
  year: '2026',
}
```

### The case-study fields (optional, but recommended for featured projects)

Add any of these to give a project its own detailed `/projects/[slug]` page:

```ts
longDescription: '...',
problem: 'What problem was this solving?',
solution: 'How did you solve it?',
architecture: ['Client', 'API', 'Service', 'Database'],  // renders as a flow diagram
implementation: 'How it was built.',
challenges: 'What was hard about it.',
learnings: 'What you took away from it.',
futureImprovements: 'What you'd do next.',
```

Any of these you omit just won't render a section — there's no need to fill in every
field for every project.

### Adding a brand-new project

1. Copy the placeholder object at the bottom of `projects.ts` (`slug:
   'placeholder-backend-project'`).
2. Give it a real `slug`, `name`, and fields.
3. Remove the `isPlaceholder: true` line.
4. Save — the new project automatically appears on `/projects`, is filterable, and gets
   its own detail page at `/projects/<your-slug>`. No other file needs to change.

### Marking something confidential

If a project is real work you can't link to publicly (an employer's proprietary system,
an NDA'd client project), set `github: null` and `demo: null`. The site automatically
shows a "Private / confidential" label instead of a broken link — this is what's done for
the core banking case study already on the site.

---

## 7. Enabling Live GitHub Repos

The `/projects` page can show your actual public GitHub repositories automatically,
underneath your curated project list.

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Set your GitHub username:
   ```
   NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
   ```
3. Restart `npm run dev`.

If you leave this unset, or the GitHub API request fails for any reason, that section
simply doesn't render — nothing breaks, and your curated project list above it is
unaffected. No code changes are needed either way.

---

## 8. Managing Skills & Interests

Open `src/data/skills.ts`.

- `skillGroups` — an array of categories (`Programming`, `Backend`, etc.), each with a
  list of `{ name, level }` skills. `level` must be exactly one of `'Learning'`,
  `'Working Knowledge'`, or `'Experienced'` — these map to the colored badges.
- `interests` — the "What I'm interested in" cards on `/skills`. Each is just a
  `{ id, title, description }`.

To add a new skill category, add a new object to `skillGroups` with a unique `id`.

---

## 9. Managing Activities & the Learning Roadmap

Open `src/data/activities.ts`.

- `activities` — powers the `/activities` page. Each entry needs a `category` from the
  predefined list at the top of the file (`'Technical Learning'`, `'Certifications'`,
  etc.) — stick to these so filtering/styling stays consistent if you add filtering
  later.
- `learningRoadmap` — powers the roadmap chips on `/about`. Each item's `status` must be
  `'Completed'`, `'Learning'`, or `'Next'`.

---

## 10. Writing Blog Posts

Every post is one Markdown/MDX file in `content/blog/`. To add a post, create a new
file — the filename (minus `.mdx`) becomes the URL.

**`content/blog/my-new-post.mdx`:**

```mdx
---
title: "A clear, specific title"
description: "One sentence shown in listings and search-engine results."
date: "2026-09-15"
tags: ["kubernetes", "backend"]
---

Write your post here using normal Markdown: **bold**, _italics_, lists, and

```bash
code blocks with syntax highlighting
```

## Headings become entries in the table of contents

### So do sub-headings

Regular [links](https://example.com) work as expected.
```

That's it — the post automatically:
- Appears on `/blog`, sorted newest-first by `date`
- Gets its own page at `/blog/my-new-post`
- Shows up under any tag filter matching its `tags`
- Gets a calculated reading time
- Gets a table of contents generated from its `##`/`###` headings
- Shows "related posts" that share a tag with it
- Is included in the sitemap

**To unpublish a post without deleting it**, add `draft: true` to its frontmatter — it
will only show up while running `npm run dev`, not in a production build.

**To feature a post**, nothing special is needed — the single most recent post (by
`date`) is automatically shown as the featured post at the top of `/blog`.

---

## 11. The Résumé Page & PDF

The `/resume` page is generated from your existing data (`profile.ts`, `experience.ts`,
`skills.ts`, `projects.ts`, `activities.ts`) — you don't edit it directly. Update those
files and the résumé page updates itself. It's also print-friendly: the "Download PDF"
button links to a static file, but visitors can also just print the page
(`Cmd/Ctrl + P`) and it will hide the nav bar and footer automatically.

The downloadable file at `public/resume.pdf` is a **separate, static file** — updating
the data files does not regenerate it. To update it:

- **Easiest:** open `/resume` in your browser, print to PDF, and replace
  `public/resume.pdf` with the result.
- **Scripted:** edit `scripts/generate_resume_pdf.py` (a plain Python/ReportLab script)
  to match your latest info, then run:
  ```bash
  pip install reportlab
  python3 scripts/generate_resume_pdf.py
  ```

---

## 12. Setting Up the Contact Form

The form sends messages through Resend using the server-side `/api/contact` route. Add
these server-only environment variables to `.env.local` for local development and to
your Vercel project settings for production:

```bash
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL=your-email@example.com
```

The form will show an error instead of sending when these values are not configured.
---

## 13. Customizing Colors, Fonts & Theme

All design tokens live in one place: the top of `src/app/globals.css`.

```css
.dark {
  --background: #0a0e14;   /* page background */
  --surface: #10151d;      /* card backgrounds */
  --foreground: #e6eaf0;   /* main text color */
  --muted: #8b95a5;        /* secondary text */
  --accent: #5eead4;       /* links, highlights, buttons */
  --amber: #f2b849;        /* "learning" / in-progress status */
  --signal: #7fd858;       /* "completed" / live status */
}
```

Change a value and every component using that color updates — nothing is hardcoded
elsewhere. The `:root` block just above `.dark` holds the equivalent light-mode values.

**Fonts** are self-hosted via `@fontsource` packages, imported in `src/app/layout.tsx`.
To swap a typeface, install a different `@fontsource/*` package and update both the
import in `layout.tsx` and the matching `--font-body` / `--font-heading` / `--font-code`
variable in `globals.css`.

---

## 14. Navigation & Command Palette

- **Top nav / footer links:** edit `src/lib/nav.ts`. `navLinks` is the main desktop menu
  and mobile menu; `secondaryNavLinks` appears in the footer only.
- **Command palette (⌘/Ctrl+K):** edit the `commands` array in
  `src/components/CommandPalette.tsx` to add, remove, or reorder commands.

---

## 15. Deploying to Vercel

1. Push the project to a GitHub (or GitLab/Bitbucket) repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import that repository.
3. Vercel detects Next.js automatically — no configuration needed.
4. If you've set up the GitHub repos section or the contact form, add the same
   environment variables from `.env.local` under **Project Settings → Environment
   Variables** in Vercel.
5. Click Deploy.

Every subsequent push to your default branch redeploys automatically. A baseline
deployment works with **zero environment variables** — the site is fully functional on
static data alone.

---

## 16. Troubleshooting

| Problem                                       | Likely cause / fix                                                                 |
| ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| A new project doesn't show up                  | Check the `slug` is unique and there's no trailing comma/syntax error in the object. |
| A new blog post 404s                           | The filename must end in `.mdx` and match the URL exactly (case-sensitive).          |
| `npm run build` fails after an edit            | Run `npm run lint` first — it usually points at the exact line.                      |
| GitHub repos section is empty                  | Confirm `NEXT_PUBLIC_GITHUB_USERNAME` is set and the username has public repos.      |
| Dark/light toggle flashes on page load          | This is a one-time hydration flash and is expected/handled — it resolves in <100ms.  |
| Styles don't seem to update                    | Hard-refresh the browser; occasionally restart `npm run dev`.                        |

---

## 17. Pre-Launch Checklist

- [ ] Replace `email`, `linkedin`, `github` in `src/data/profile.ts`
- [ ] Set `githubUsername` if you want live repos, or leave blank to skip that section
- [ ] Replace or remove every `[Add ...]` placeholder (see §3)
- [ ] Replace `public/resume.pdf` with your real, current résumé
- [ ] Update `seo.url` in `profile.ts` to your real deployed domain
- [ ] Skim `/resume` and `/about` once more end-to-end — these are what most recruiters
      will actually read closely
- [ ] Run `npm run build` one last time locally before pushing, to catch anything early
