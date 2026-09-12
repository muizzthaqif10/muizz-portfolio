# Architecture Guide — How This Site Actually Works

This is the technical companion to `docs/USER_GUIDE.md`. That guide tells you *which
file to edit*. This one explains *what happens to that file after you save it* — the
rendering model, the build pipeline, where every page's data actually comes from, and
why the project is structured the way it is.

Written for someone comfortable with backend/systems concepts but new to the current
Next.js App Router model — I've drawn the comparisons to backend concepts you already
know where they help.

---

## 1. The Core Mental Model

Next.js (App Router) blurs a line you're used to being sharp: "server code" and "client
code" live in the same file tree, often the same folder, and the framework decides —
based on one directive — which environment each component actually runs in.

Two kinds of components exist in this codebase:

| | Server Component (default) | Client Component (`'use client'`) |
|---|---|---|
| Where it runs | Only on the server (build time or request time) | Server (for the initial HTML) *and* the browser |
| Can it use `useState`/`useEffect`? | No | Yes |
| Can it read the filesystem, hit a DB, use secrets? | Yes | No |
| Ships JavaScript to the browser? | No | Yes |
| Example in this repo | `src/app/blog/page.tsx` | `src/components/CommandPalette.tsx` |

**Every file is a Server Component unless its first line is `'use client'`.** That one
string is the entire boundary mechanism — there's no separate build config, no different
file extension. Grep for it and you'll find exactly the components that need browser
interactivity: the command palette, the theme toggle, the terminal, the project/blog
filter UIs, the navbar (needs scroll listeners), and the contact form.

Everything else — every page's outer shell, the data-fetching, the layout — is a Server
Component. This is the opposite default from older React setups (create-react-app,
plain Vite+React), where *everything* was client-side by default. Here, you opt *into*
the browser, not out of it. The practical effect: this entire site ships very little
JavaScript, because most of it (project cards, experience timeline text, blog post
bodies) never needs to run in the browser at all — it's just HTML by the time it reaches
the visitor.

---

## 2. What `npm run build` Actually Does

Running `next build` does four distinct things, in order:

1. **Compile & bundle.** Turbopack (Next 16's default bundler, replacing Webpack)
   compiles every `.ts`/`.tsx` file, resolves the `@/*` import alias (configured in
   `tsconfig.json` → maps to `src/*`), and bundles client-side JavaScript per route.

2. **Type-check.** The entire project is checked against `tsconfig.json`'s `strict:
   true` setting. This is where you'd see an error if, say, a project object in
   `projects.ts` was missing a required field from the `Project` type.

3. **Render every page it can render ahead of time.** This is the step most worth
   understanding — see §3 below.

4. **Emit a route manifest.** The final build output (in `.next/`, which is
   gitignored — it's a build artifact, not something you edit or commit) tells the
   Next.js server (or Vercel's infrastructure) exactly which files to serve statically
   and which routes need a server to run on each request.

You saw this output directly in the build log:

```
Route (app)
┌ ○ /
├ ○ /about
├   /blog/[slug]
│ ├ ● /blog/building-my-developer-portfolio
│ ├ ● /blog/setting-up-a-minikube-homelab-on-windows
│ └ [+4 more paths]
...
○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses generateStaticParams)
```

`○` and `●` both mean the same practical thing: **this HTML was generated once, at
build time, and is then served as a static file** — no server computation happens per
visitor. The only difference is `●` routes are *dynamic route templates*
(`/blog/[slug]`) that got expanded into a fixed list of concrete pages ahead of time.

### Why every page here is static

Every single route in this project builds to static HTML. There's no database, no
per-user data, nothing that legitimately needs to be computed fresh for each visitor.
That's a deliberate property of a portfolio site, and it's why deploying it costs
effectively nothing and loads almost instantly — Vercel just serves pre-built files from
a CDN edge location, the same way it'd serve a JPEG.

---

## 3. `generateStaticParams`: Turning One Template Into Many Pages

This is the mechanism behind both `/projects/[slug]` and `/blog/[slug]`, and it's worth
understanding once properly rather than treating it as magic.

`src/app/projects/[slug]/page.tsx`:

```ts
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
```

At build time, Next.js calls this function, gets back something like
`[{slug: 'kubernetes-home-lab'}, {slug: 'core-banking-integration-middleware'}, ...]`,
and then **renders the page component once per entry**, substituting each `slug` into
`params`. The result: five project objects in an array become five separate static HTML
files, with zero manual routing code.

`src/app/blog/[slug]/page.tsx` does the identical thing, except its list comes from
`getAllPosts()` — which reads the filesystem instead of an in-memory array (more on that
in §5). The *pattern* is identical either way: **look at your data, enumerate every slug
that should get a page, hand that list to `generateStaticParams`.**

If you add a sixth project or a seventh blog post, you don't touch this function or
this file at all — you only touch the data source, and the next build automatically
picks up the new entry, because the function re-reads that source every time it runs.

### The `params` Promise

One detail that trips people up coming from older Next.js versions: in this version,
route parameters are delivered as a `Promise`, not a plain object:

```ts
type Props = { params: Promise<{ slug: string }> };

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  // ...
}
```

This looks unnecessary for something that's known at build time, but it's a framework-
wide consistency decision (the same `Promise` shape is used for dynamic *and*
server-rendered routes), so every page component that reads `params` is written as an
`async function` that `await`s it.

---

## 4. Where Each Page's Data Actually Comes From

This is the part most worth tracing end-to-end, because "where does the data come
from" has three different answers depending on the page:

### a) In-memory TypeScript objects (Profile, Experience, Projects, Skills, Activities)

Files like `src/data/projects.ts` export a plain array:

```ts
export const projects: Project[] = [ { slug: 'kubernetes-home-lab', ... }, ... ];
```

A page imports it directly — `import { projects } from '@/data/projects';` — the way
you'd import a constant in any language. There is no fetch, no I/O, no async step.
**This is why editing these files feels instant**: at build time, the value is just
inlined into whatever component imports it. There is genuinely nothing happening
between "you save the file" and "the page has the new data" beyond a normal recompile.

### b) The filesystem, read at build time (the blog)

The blog does *not* work this way — there's no `posts.ts` array. Instead,
`src/lib/mdx.ts` reads the `content/blog/` directory directly:

```ts
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  // ...parse frontmatter out of each file with gray-matter...
}
```

This function only works in a Server Component (Node's `fs` module doesn't exist in a
browser) — which is exactly why `src/app/blog/page.tsx` has no `'use client'` directive.
It calls `getAllPosts()` directly in the component body, at build time, the same way a
static site generator would.

The actual MDX → HTML conversion happens per-post, in
`src/app/blog/[slug]/page.tsx`, via `next-mdx-remote/rsc`:

```tsx
<MDXRemote
  source={post.content}                 // raw markdown string
  components={mdxComponents}            // custom renderers for h2/h3/a — see §4d
  options={{
    mdxOptions: {
      remarkPlugins: [remarkGfm],       // adds GitHub-flavored tables, strikethrough, etc.
      rehypePlugins: [rehypeHighlight], // adds syntax-highlighting CSS classes to code blocks
    },
  }}
/>
```

This is a **server-side compile step**: the raw Markdown string is parsed into an AST,
transformed by the remark/rehype plugin chain, and rendered to React elements — all
before any HTML reaches the browser. The browser never sees Markdown; it receives
finished HTML with `<h2 id="...">`, `<pre><code class="hljs-...">`, etc.

### c) An external API, fetched at build/revalidation time (GitHub repos)

`src/lib/github.ts`:

```ts
const res = await fetch(
  `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
  { next: { revalidate: 3600 } },
);
```

The `next: { revalidate: 3600 }` option is Next's caching directive: fetch fresh data at
most once per hour (3600 seconds), and serve the cached result for every request in
between. This is what's called **Incremental Static Regeneration (ISR)** — the page
isn't purely static like the others, but it's *not* re-fetching GitHub on every visitor
either. On Vercel, this cache is handled by their infrastructure automatically; there's
nothing extra to configure.

If the fetch fails (no username set, GitHub rate-limits you, network error), the
function catches the error and returns `null`, and `GithubReposSection` renders nothing
— no error boundary needed, because the failure is handled at the data layer, not the UI
layer.

### d) Derived at render time from another file's raw content (table of contents)

The blog's table of contents isn't stored anywhere — it's computed by scanning the raw
Markdown string with a regex, before MDX compilation happens:

```ts
// src/lib/toc.ts
const match = /^(##|###)\s+(.*)/.exec(line.trim());
```

This produces a list of `{ depth, text, slug }`. Separately,
`src/components/blog/mdx-components.tsx` overrides how `<h2>`/`<h3>` render during MDX
compilation, generating an `id` from the *exact same* `slugify()` function:

```tsx
h2: ({ children }) => <h2 id={slugify(headingText(children))}>{children}</h2>,
```

Two independent processes — the raw-text regex scan (for the sidebar links) and the MDX
render override (for the actual anchor targets) — have to produce matching slugs for
`<a href="#slug">` to actually scroll to the right heading. That's why both call the
same `slugify()` utility rather than each rolling their own logic.

---

## 5. The Styling System: Tailwind v4 + CSS Variables

This project uses Tailwind CSS v4, which changed its configuration model significantly
from v3 — there is deliberately **no `tailwind.config.ts`** in this repo, which is
correct for v4, not a missing file.

### How a utility class becomes CSS

1. `postcss.config.mjs` registers the `@tailwindcss/postcss` plugin.
2. `src/app/globals.css` starts with `@import 'tailwindcss';` — this single line is what
   pulls in all of Tailwind's base utilities.
3. Design tokens (colors, fonts) are declared as plain CSS custom properties, then
   mapped into Tailwind's theme namespace via `@theme inline`:

   ```css
   :root {
     --background: #f6f7f9;
     --accent: #0c9c88;
   }
   .dark {
     --background: #0a0e14;
     --accent: #5eead4;
   }
   @theme inline {
     --color-background: var(--background);
     --color-accent: var(--accent);
   }
   ```

   The `@theme inline` block is what makes `bg-background` and `text-accent` valid
   Tailwind classes anywhere in the codebase — Tailwind scans the project at build time,
   sees these are registered "color" tokens, and generates the corresponding utility
   classes automatically. No plugin, no manual utility list.

### How dark mode actually flips

`next-themes` (in `src/components/ThemeProvider.tsx`) adds or removes a `dark` class on
the `<html>` element and persists the choice. Because every color in this codebase is a
`var(--token)` reference rather than a literal hex value, **the moment that class
toggles, every single color on the page updates simultaneously** — there's no
JavaScript re-render involved in the color change itself, it's pure CSS cascade.

`suppressHydrationWarning` on `<html>` in `layout.tsx` exists because the *server*
doesn't know the visitor's theme preference (it's stored in their browser), so the
server-rendered HTML and the client's first paint can briefly disagree about the `dark`
class — this prop tells React that specific, expected mismatch is fine to ignore.

### Why fonts are self-hosted instead of using `next/font/google`

Font files are bundled from `@fontsource/*` npm packages (imported directly in
`layout.tsx`) rather than fetched from Google's CDN via `next/font/google`. Practically,
this means the font files ship as part of your own build output — no request to a
third-party domain happens when someone visits the site, which is both faster (one less
DNS lookup/connection) and removes a dependency on Google Fonts' availability.

---

## 6. SEO & Metadata

### Per-page `<title>`/`<meta>` tags

Every static page exports a `metadata` object; every dynamic page exports a
`generateMetadata` **function** instead (because the title needs the specific project's
or post's name, which isn't known until `params` resolves):

```ts
// static page
export const metadata: Metadata = { title: 'Projects', description: '...' };

// dynamic page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project.name, description: project.description };
}
```

Next.js merges these with the root layout's `metadata` (which sets the `%s | Muizz`
title template), so you never write the site name into every page's title manually.

### `sitemap.ts` and `robots.ts`

These aren't regular pages — they're special file conventions that Next.js compiles
into `/sitemap.xml` and `/robots.txt` automatically. `sitemap.ts` calls the same
`projects` array and `getAllPosts()` function used everywhere else, so the sitemap can
never drift out of sync with what's actually on the site — there's exactly one source of
truth for "what pages exist."

### The Open Graph image

`src/app/opengraph-image.tsx` is another special file convention. It doesn't return
JSX to render on the page — it returns an `ImageResponse` (from `next/og`), which is a
**PNG generated at build time from JSX**, using a stripped-down layout engine (not a
full browser). This is why its styles are inline `style={{ }}` objects instead of
Tailwind classes — Tailwind's class-scanning doesn't apply inside `ImageResponse`.

---

## 7. Interactive Features: What's Actually Running in the Browser

Everything below is a Client Component, and each is intentionally self-contained —
there's no global state management library (Redux, Zustand, etc.) anywhere in this
project, because nothing here needs state shared across more than one component tree.

| Feature | File | Mechanism |
|---|---|---|
| Command palette (⌘/Ctrl+K) | `CommandPalette.tsx` + `SiteChrome.tsx` | A `keydown` listener on `window`, added/removed in a `useEffect`. Open/closed state lives in the parent `SiteChrome`, passed down as props. |
| Project/blog filtering & search | `ProjectsExplorer.tsx`, `BlogExplorer.tsx` | Plain `useState` for the query/category, `useMemo` to re-filter the array on every keystroke — no server round-trip, since the full data set is already in the page's initial HTML/JS. |
| Terminal widget | `Terminal.tsx` | A hardcoded lookup object (`COMMANDS`) checked against whatever the user types — no real shell, no execution, just string matching. |
| Theme toggle | `ThemeToggle.tsx` | Calls `next-themes`' `setTheme()`, which flips the `dark` class (see §5). |
| Konami code / easter egg | `SiteChrome.tsx` | A rolling buffer of the last 10 keys pressed, compared against a fixed sequence on every keystroke. |
| Scroll-aware navbar | `Navbar.tsx` | A `scroll` listener on `window`, throttled implicitly by `{ passive: true }`, toggling a boolean that swaps Tailwind classes. |

None of these need a backend, which is why the whole site can be static — "interactive"
here means "runs in the visitor's browser," not "talks to a server."

---

## 8. What Happens When You Deploy to Vercel

1. Vercel detects `next build` from `package.json` and runs it in a fresh container —
   the exact same command you can run locally.
2. Every statically-generated page (which, per §2, is all of them) becomes a file
   served directly from Vercel's CDN — physically distributed to edge locations near
   each visitor, no server round-trip per request.
3. The one exception is the GitHub-repos fetch (§4c): because it uses
   `revalidate: 3600`, Vercel keeps a lightweight serverless function around to
   re-run that fetch on a schedule and swap the cached HTML fragment, without
   rebuilding the whole site.
4. Environment variables (`NEXT_PUBLIC_GITHUB_USERNAME`, etc.) are baked in at build
   time for anything prefixed `NEXT_PUBLIC_` — that prefix specifically means "safe to
   expose in browser-shipped JavaScript," which is why it's used here (a GitHub
   username isn't a secret) and would **not** be the right prefix for something like an
   API key.

---

## 9. Project Layout Reference

```
src/
  app/                      # One folder = one URL segment (App Router convention)
    layout.tsx              # Wraps every page: fonts, theme provider, nav, footer
    page.tsx                # → /
    about/page.tsx          # → /about
    projects/
      page.tsx              # → /projects
      [slug]/page.tsx        # → /projects/anything (see §3)
    blog/
      page.tsx              # → /blog
      [slug]/page.tsx        # → /blog/anything
    sitemap.ts              # → /sitemap.xml (special convention, not a page)
    robots.ts               # → /robots.txt
    opengraph-image.tsx     # → generated PNG for social-share previews
  components/               # Reusable UI, grouped by feature area
  data/                     # Plain TypeScript data — see §4a
  lib/                      # Non-visual logic: MDX parsing, GitHub fetch, class helpers
content/
  blog/*.mdx                # Blog posts — see §4b
public/                     # Served as-is at the site root (resume.pdf → /resume.pdf)
```

The rule of thumb: **the `app/` folder structure *is* the URL structure.** There's no
separate router configuration file to keep in sync — if you can see the folder, you can
guess the URL.
