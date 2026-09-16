# Ahmad Fiqi Efendi — Portfolio & CV

Personal CV/portfolio website — static, no build step, deployed via nginx.

**Live:** https://cv.sadeyan.my.id
**Analytics:** https://cv.sadeyan.my.id/stats (self-hosted Umami)

## Features

- 8 main pages: Home, About, Experience, Projects, Skills, Education,
  Contact, Leadership — plus 10 case-study deep dives.
- **Live Projects section** on the homepage and `projects.html` with
  direct links to production deployments (Madrasahku, Alufiliate,
  POS Kok Online, Jastip).
- Project filtering (All / Live / per-category) via `js/projects.js`.
- Scroll-reveal animations (`js/animations.js`), sticky nav + mobile menu
  (`js/nav.js`), shared site behavior (`js/site.js`), on-site AI chat
  widget (`js/chat.js`, Cloudflare Workers + Llama 3.1 backend).
- Umami tracker snippet included for privacy-friendly analytics.

## Live projects

| Project | URL | Repo |
|---------|-----|------|
| Madrasahku (Islamic Learning) | https://islamic.sadeyan.my.id/#/home | `ngajiproject` + `shelf_api` |
| Alufiliate (TikTok automation) | https://alufiliate.sadeyan.my.id/ | `alufiliate` |
| POS Kok Online | https://poskoko.sadeyan.my.id/ | `omni-pos` |
| Jastip (reservation) | https://jastip.sadeyan.my.id/ | `aluluf` |

## Tech stack

- **HTML5** — static pages, no build step.
- **CSS3** — custom properties (tokens), CSS Grid, Flexbox.
- **Vanilla JavaScript** — scroll-reveal, sticky nav, mobile menu,
  project filters, chat widget.
- **Google Fonts** — Space Grotesk, Inter, JetBrains Mono.
- **Nginx** — reverse proxy on Ubuntu VPS.

## Design system

| Token | Value |
|-------|-------|
| Surface | `#141414` |
| Surface 2 | `#1c1c1c` |
| Accent | `#d4a017` |
| Text Primary | `#f0ede8` |
| Font Display | Space Grotesk |
| Font Body | Inter |
| Font Mono | JetBrains Mono |

## Pages

### Main

| Page | File |
|------|------|
| Home | `index.html` (includes Live Projects §06) |
| About | `about.html` |
| Experience | `experience.html` |
| Projects | `projects.html` (All / Live filters + cards 11–14) |
| Skills | `skills.html` |
| Education | `education.html` |
| Contact | `contact.html` |
| Leadership | `leadership.html` |

### Case studies (`case-study/`)

Hystory, Tan Malaka AI, Election Result Tracking, iWash Laundry,
Educational Apps, Room Management, Content Rewards, Telegram Automation,
AI Video Editing, Self-Hosted Infrastructure.

### Data

- `cv-data.json` — structured CV data incl. live project entries with URLs.

## File structure

```
cv-portfolio/
├── css/
│   ├── tokens.css          # colors, typography, spacing
│   ├── base.css            # reset, typography, scroll-reveal
│   ├── layout.css          # grid, nav, footer, page-header
│   └── components.css      # cards, tags, buttons, timeline, filters
├── js/
│   ├── nav.js              # sticky scroll + mobile toggle
│   ├── animations.js       # IntersectionObserver scroll reveals
│   ├── projects.js         # filter button logic (projects page)
│   ├── site.js             # shared site behavior
│   └── chat.js             # AI chat widget client
├── case-study/             # 10 case study pages
├── index.html              # homepage + Live Projects
├── projects.html           # filterable project grid
├── cv.html                 # printable CV with Key Projects — Live
├── cv-data.json            # structured data with live URLs
└── README.md
```

## Local preview

No build — just open or serve statically:

```bash
cd /home/ubuntu/projects/cv-portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Deployment

Served via Nginx on Ubuntu VPS (`/etc/nginx/sites-available/cv.sadeyan`).
`/stats` on the same domain proxies to the Umami container
(`127.0.0.1:3002`, see the `analytics` repo).

```bash
# after edits
git add -A && git commit -m "message" && git push origin main

# deploy on server
ssh ubuntu@server
cd /home/ubuntu/projects/cv-portfolio && git pull origin main
sudo systemctl reload nginx
```

Verify:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://cv.sadeyan.my.id/
curl -s -o /dev/null -w "%{http_code}\n" https://cv.sadeyan.my.id/stats
```

## Troubleshooting

- **Filters not working** — check `js/projects.js` filter-button
  `data-filter` values match card categories incl. `live`.
- **Chat widget silent** — verify the Workers endpoint in `js/chat.js`.
- **Stale content** — hard-refresh; nginx serves files directly.

## License

© 2026 Ahmad Fiqi Efendi. All rights reserved.
