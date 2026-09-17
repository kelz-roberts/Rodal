# Rodal Anti-Slip Solutions — website

This repo is the Rodal Anti-Slip Solutions website: a small static site with no build
step. Pushing to `main` automatically deploys the site live in ~15 seconds.

The business is **Rodal Anti-Slip Solutions Ltd**, Unit 7, Knightcott Industrial
Estate, Banwell, BS29 6JN. Phones on the site: **0800 002 9078** (free) and
**01934 822 420**. Email: **info@rodal.co.uk**.

## What's in the repo

| File / folder | What it is |
|---|---|
| `index.html` | The home page — one long page with anchor sections (`#services`, `#testing`, `#why`, `#clients`, `#contact`) and the enquiry form |
| `knowledge.html` | The Knowledge Base hub page, linking to the four articles |
| `what-is-a-pendulum-slip-test.html`, `what-is-a-safe-ptv.html`, `slippery-floors-and-uk-law.html`, `anti-slip-treatment-vs-replacing-your-floor.html` | The four Knowledge Base articles |
| `styles.css` | **One shared stylesheet for every page.** A change here changes all six pages |
| `assets/` | The logo and the optimised photos the site actually uses, plus `rodal-forms.js` (form wiring — see guardrails) |
| `knowledge-base/*.md` | Kelly's Markdown **sources** for the four articles. Reference only — they are not published and not linked from the site. If an article changes, keep its `.md` and `.html` in step |
| `Photos/`, `uksrg.txt` | Local working files, ignored by git and never published |

## Who you're helping

You are usually helping **Kelly**, who looks after the site. She is **not a developer** —
she describes changes in plain English. So:

- Explain things simply, no jargon. Never make her read or write code.
- Make the change she asks for, then **offer to preview it before publishing**.
- After publishing, tell her plainly that it's live (and that it may take a minute
  to appear).
- If a request is ambiguous, ask a short plain-English question rather than guessing.

## How to publish ("put it live")

When she's happy and says something like *"publish it"* / *"put it live"*:

1. `git add` the changed files and commit with a short, plain message.
2. `git push origin main`.

That's it — GitHub Actions deploys automatically (`aws s3 sync`, then clears the CDN
cache). No build, no AWS steps, nothing else to run. You can watch it with
`gh run watch` if asked.

To **preview locally** before publishing: `python -m http.server 8000` in this folder,
then open `http://localhost:8000`.

## Guardrails — important

- **Make only the change requested.** Do not reformat, re-indent, restructure, or
  "tidy up" HTML that you weren't asked to change. The pages are hand-authored; leave
  everything else byte-for-byte as it is.
- **Preserve the look and feel.** Don't change the design, layout, colours, or fonts
  unless Kelly explicitly asks. This is her design.
- **The deploy is verbatim** — files are served exactly as they are in the repo. Never
  add a build/minify/transform step or a framework.
- **Do NOT touch the enquiry-form wiring.** Leave `assets/rodal-forms.js`, the form's
  `onsubmit` handler, the hidden `_gotcha` spam-trap field, the `enquirySent`
  confirmation block, and the `<script>` tag at the bottom of `index.html` alone. They
  connect the form to the backend that emails enquiries — changing them breaks real
  enquiries. (Editing the *visible text* around the form is fine.)
- **Remember `styles.css` is shared.** A style change meant for one page will show on
  all six unless it is scoped to that page.
- **If a page is ever added**, link it from the nav or the Knowledge Base hub, and add
  its address to `sitemap.xml` (once that exists, at launch) or Google won't find it.

## Not live yet

The site is being set up on its hosting. Until launch, `index.html` carries a
`<meta name="robots" content="noindex">` tag and a "PROTOTYPE" banner at the top. Both
come out at launch, **only** once the real web address serves the site — not before.

## What is NOT in this repo

Hosting, the web address, email, and the **enquiry email template** live in a separate
infrastructure repo (`Tofu-iac`, environment `rodal-prod`) — not here. If Kelly asks to
change how the site is hosted, the web address, where enquiries are emailed, or the
layout of the *email* that enquiries arrive in, tell her that lives in the other project
and can't be changed from this one.

> That repo also holds the infrastructure for the **KSS (Knightcott Surface Solutions)**
> and **Knightcott Self Storage** websites. They are different businesses and
> different sites — don't mix them up.
