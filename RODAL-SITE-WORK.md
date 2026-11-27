# Rodal website — outstanding work

**Written 18 November 2026.** For Laron, and for whoever builds the pages.

This covers the **website repo** (`kelz-roberts/Rodal`). It does **not** repeat the
infrastructure work — that lives in `Tofu-iac`, in
`infra/environments/rodal-prod/HANDOFF.md`, which is current and accurate.

This document exists to answer the open question in that file:

> *"When Kelly's new service pages go live: retarget them in `legacy_redirects` and add
> them to the Rodal `sitemap.xml`. Agree the exact URLs with Kelly first."*

**The URLs are agreed below.** That unblocks item 7.

---

## Where things stand

**Done, and working** (verified 18 Nov 2026):

- Site live at `https://www.rodal.co.uk` since 21 September 2026.
- All five old inner pages on `rodalantislipfloors.co.uk` now `301` correctly (done 2–3 Nov).
  No visitor hits a 404 any more.
- Google Search Console verified for both domains; sitemap submitted; Change of Address
  filed 3 Nov.

**The problem that remains.** Organic search was 11 sessions in October and has not moved.
Three reasons:

1. **Too soon.** As of 18 Nov the old URLs still appear in search results. Google has not
   yet re-crawled them and followed the redirects. Weeks to months, not days.
2. **Four of the five redirects land on the home page** (`/#services`, `/#bathrooms` —
   Google ignores everything after the `#`). When a batch of pages all redirect to a home
   page, Google commonly treats that as *"those pages are gone"* rather than *"those pages
   moved"*, and little ranking value transfers. This is working as designed for visitors,
   but it is not rescuing the old pages' standing.
3. **The service pages do not exist.** Nothing has changed in the site repo since
   29 September. There is nowhere specific to send those visitors, and nothing that can
   rank for the searches the old pages used to win.

**Point 3 is the blocker. Points 1 and 2 are substantially fixed by solving point 3.**

---

## Part 1 — The five service pages (the main piece)

### Agreed URLs

These match Laron's proposal in `HANDOFF.md`. **Confirmed — build to these exactly.**

| Old path (on `rodalantislipfloors.co.uk`) | New page | Currently redirects to |
|---|---|---|
| `/anti-slip-bath-treatments` | `/anti-slip-bath-treatments.html` | `/#bathrooms` |
| `/anti-slip-vinyl` | `/anti-slip-vinyl.html` | `/#services` |
| `/anti-slip-tiles` | `/anti-slip-tiles.html` | `/#services` |
| `/anti-slip-treatments` | `/anti-slip-treatments.html` | `/#services` |
| `/pendulum-slip-test` | `/pendulum-slip-testing.html` | `/what-is-a-pendulum-slip-test.html` |

Reusing the old names deliberately: they match what people actually searched for.

**Note on the fifth.** `/pendulum-slip-testing.html` is a **service** page ("we test your
floor, here is what you get, book us"). It is distinct from the existing
`/what-is-a-pendulum-slip-test.html`, which is an **explainer**. Both should exist — they
catch different searches and different intent. Internal links between them.

### Why separate pages at all

The rebuild collapsed five service pages into one home page with anchor sections. Google
ranks pages, not sections. A home page covering five services competes poorly against a
competitor's page covering one. The companies currently outranking Rodal for
"anti slip bath treatment" — SlipDoctors, Mendabath, Surface Master — each have a
dedicated page for it.

The content is largely already written, inside the home page's `#services`, `#bathrooms`
and "What we treat" sections. This is mostly **expanding and separating existing material**,
not writing from scratch.

### What each page needs

- A unique `<title>` and `<meta name="description">`, written for the search that page
  targets. Keep titles roughly under 60 characters so Google does not truncate them —
  several existing pages run to 80–90 and are being cut off.
- One `<h1>` matching the page's subject.
- A clear call to action — phone, and the enquiry form.
- Links **from** the home page and the main navigation, and **between** related pages.
- An entry in `sitemap.xml`.

### Build and release order

Laron's rules from `HANDOFF.md`, repeated because they matter:

1. **Page live first, redirect second. Never the reverse.** A redirect merged before its
   page exists sends people to a 404 on the new site.
2. **Pages can go one at a time.** Each redirect is one line in `legacy_redirects`. Split
   per page if they do not all land together.
3. After each page: retarget its line in `legacy_redirects`, add it to `sitemap.xml`, then
   GET-test the old URL on `www.rodalantislipfloors.co.uk`.

**Suggested order** — bath and shower trays first. It is the clearest search intent
(someone with a slippery bath knows exactly what they want), and it proves the approach
before the other four are built.

---

## Part 2 — Supporting site changes

### 2.1 Internal linking (quick, and overdue)

The home page links to **exactly one** other page (`knowledge.html`). As a result, all four
Knowledge Base articles recorded **zero views** in the month to mid-November, and the hub
page got three.

- Link the four guides from the home page, not only from the hub.
- Link the new service pages from the home page and the navigation.
- Cross-link guides to the service pages they relate to, and back.

### 2.2 Location coverage (this is the "nationwide" problem)

The site currently mentions **no UK location other than Banwell**. Not Bristol, not
Weston-super-Mare, not the South West, nowhere else. "Nationwide" appears as a word but
there is nothing concrete behind it.

Combined with `LocalBusiness` markup and a Banwell postcode, everything on the site tells
Google this is a north Somerset business. That is why it surfaces locally and not
nationally.

- Add real geographic coverage to the service pages: where teams travel, named regions,
  and the national clients already cited (NHS, TfL, hotel groups — TfL in particular is a
  strong national signal and is currently buried).
- Consider location pages for the main areas served, if the business genuinely covers them.

### 2.3 Structured data

- `index.html` carries one `LocalBusiness` block with `areaServed: United Kingdom`. That is
  correct as far as it goes, but `LocalBusiness` + a physical address is a strong local
  signal. Worth reviewing whether `ProfessionalService` with explicit `areaServed` better
  describes a nationwide operation. **This needs a considered decision, not a quick swap** —
  the Banwell address should stay for consistency with the Google Business Profile.
- The four Knowledge Base articles have **no structured data at all**. Adding `Article`
  markup is low-effort and helps Google understand them.

### 2.4 Open Graph tags

**Zero** across all six pages. Any link shared on WhatsApp, LinkedIn or Facebook appears as
a bare URL with no title, description or image. Add `og:title`, `og:description`,
`og:image` and `og:url` per page.

---

## Part 3 — Outside the website

Noted for completeness; none of it is a repo change.

- **Google Business Profile.** Confirm it points at `rodal.co.uk`, not the old domain. For
  a trade business this is often the single largest source of enquiries.
- **Directory listings** still point at `rodalantislipfloors.co.uk`: construction.co.uk,
  ZoomInfo, nicelocal, and the UK Slip Resistance members list. The redirects mean these no
  longer break, but the links pass their value through a redirect rather than directly.
- **Google Analytics.** Internal traffic is not excluded — Kelly's and Laron's own visits
  are counted as UK users, which materially distorts a site at this volume. Roughly half of
  October's traffic (Paraguay 36, much of US 15) appears to be bot traffic.

---

## Part 4 — Separate from SEO: the analytics consent gap

**Not a ranking issue. Flagging it because it is a legal exposure and it is in this repo.**

Google Analytics (`G-7B5XFCHS1D`) runs on all six pages with **no cookie banner and no
privacy policy**. There is a commit on 28 September titled *"Run Google Analytics without a
consent banner"*, so this looks deliberate rather than overlooked.

Under UK PECR, analytics cookies require consent before they are set. This needs a decision
from Kelly — either add a consent banner and privacy policy, or switch to a
cookieless/consent-free analytics setup. The same gap exists on the KSS site.

---

## Guardrails for whoever edits the site

From `CLAUDE.md` in this repo. These matter:

- **Do not touch the enquiry-form wiring.** `assets/rodal-forms.js`, the form's `onsubmit`
  handler, the hidden `_gotcha` field, the `enquirySent` block, and the `<script>` tag at
  the bottom of `index.html` connect the form to the backend that emails real enquiries.
  Editing the visible text around the form is fine.
- **`styles.css` is shared by all six pages.** A change intended for one page will show on
  all of them unless it is scoped.
- **The deploy is verbatim.** Files are served exactly as committed. No build step, no
  minifier, no framework.
- **Every new page must be linked** from the nav or the Knowledge Base hub, **and added to
  `sitemap.xml`**, or Google will not find it.

---

## Honest expectations

None of this shows results next week. Google must re-crawl the old URLs, follow the
redirects, find the new pages, and decide where they rank.

- **Weeks 1–4 after the pages go live:** the pages get indexed. Organic search should start
  to creep above 11 sessions a month, and the Knowledge Base articles should begin
  registering views at all.
- **Three to six months:** the meaningful gains, as the old pages' standing transfers and
  the new service pages start competing.

Laron's `HANDOFF.md` already sets a review point: Search Console Performance on
`rodal.co.uk` in mid-December, against the baseline of **11 organic sessions in October**.
That is the right measure. Judge it on that, not on Analytics, which is carrying a large
amount of bot traffic.
