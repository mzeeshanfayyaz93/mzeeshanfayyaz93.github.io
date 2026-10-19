# Zeeshan Fayyaz | Portfolio

Futuristic fintech portfolio built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **Three.js / React Three Fiber** and **Framer Motion**.
Typeface: **Inter** throughout. Three themes: **Dark**, **Gray**, **Light** (switch in the navbar, remembered in localStorage, no flash on load).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Node 20+ recommended.

## Edit your content

Everything lives in **`lib/content.ts`**: profile, highlights, skills and proficiency levels, platform projects, client work (27 sites with links), testimonials, experience, education, certifications.
Change the text there and the whole site updates. Things to check before publishing:

- `profile.email`, `profile.linkedin`, `profile.site`: confirm they are correct.
- Client site screenshots live in `public/work/<name>.webp`; to add a site, drop an image there and add an entry to `clientWork` in `lib/content.ts`.
- Your photo is `public/me.webp`.
- Replace `public/Zeeshan_CV.pdf` with your latest CV (same file name keeps the Download CV button working).
- Project cards are intentionally generic descriptions. Keep them free of confidential company details.

## Theme colours

`app/globals.css` holds three variable sets (`[data-theme="dark" | "gray" | "light"]`). Tweak `--accent`, `--bg` etc. to rebrand.

## SEO and Google Search Console

Search setup is already in place: page title and description, canonical link, Open Graph and Twitter cards (an image is generated in `app/opengraph-image.tsx`), `robots.txt`, `sitemap.xml`, a web manifest, favicon, and JSON-LD structured data (Person, ProfilePage, WebSite) from `lib/seo.ts`.

1. Deploy the site, then set `NEXT_PUBLIC_SITE_URL` to your real address (for example `https://zeeshanfayyaz.com`). Without it the site falls back to `profile.site`.
2. In Google Search Console add the property, choose the HTML tag method and copy the code from `content="..."` into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, redeploy, then click Verify.
3. Submit `https://your-site/sitemap.xml` under Sitemaps.
4. Edit the title and description in `lib/seo.ts`. Keep the description under 160 characters.

## WhatsApp button

`components/WhatsAppButton.tsx` shows the floating chat button (bottom right). The number and starter message come from `profile.whatsapp` in `lib/content.ts`.

## Contact form

The form has no backend: it opens the visitor's email app with the message pre-filled (`mailto:`).
For a real inbox form, post to Formspree / Resend / a Next.js route handler from `components/Contact.tsx`.

## Hero animation

Intro curtain (`components/Intro.tsx`), letter-by-letter name reveal, magnetic buttons, floating tech chips with pointer parallax, and scroll parallax (`components/Hero.tsx`).

## 3D globe

`components/Globe.tsx`. Particle sphere, network lines, arcs from Dubai to 14 cities, travelling pulses, ping rings at the Dubai hub, satellites with comet tails on the orbit rings, a star field with pointer parallax, a fly-in intro and scroll-reactive zoom. It pauses when off-screen, falls back gracefully without WebGL, uses fewer points on mobile and respects reduced-motion.

## Deploy

**GitHub Pages** (`https://mzeeshanfayyaz93.github.io`): push to `main` — the workflow in `.github/workflows/deploy-pages.yml` runs `next build` (static export to `out/`) and publishes it. In the repo **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions** (not “Deploy from branch”).

Alternatively import into **Vercel** (zero config) for SSR without static export.
