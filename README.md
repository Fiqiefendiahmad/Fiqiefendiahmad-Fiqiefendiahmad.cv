# Ahmad Fiqi Efendi — Portfolio

Personal CV/portfolio website deployed at [cv.sadeyan.my.id](https://cv.sadeyan.my.id).

## Tech Stack

- **HTML5** — static pages, no build step
- **CSS3** — custom properties (tokens), CSS Grid, Flexbox
- **Vanilla JavaScript** — scroll-reveal animations, sticky nav, mobile menu, project filters
- **Google Fonts** — Space Grotesk, Inter, JetBrains Mono
- **Nginx** — reverse proxy on Ubuntu VPS

## Design System

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
| Home | `index.html` |
| About | `about.html` |
| Experience | `experience.html` |
| Projects | `projects.html` |
| Skills | `skills.html` |
| Education | `education.html` |
| Contact | `contact.html` |
| Leadership | `leadership.html` |

### Case Studies

| Project | File |
|---------|------|
| Hystory | `case-study/hystory.html` |
| Tan Malaka AI | `case-study/tan-malaka-ai.html` |
| Election Result Tracking | `case-study/election-tracking.html` |
| iWash Laundry Services | `case-study/iwash.html` |
| Educational Apps | `case-study/educational-apps.html` |
| Room Management | `case-study/room-management.html` |
| Content Rewards | `case-study/content-rewards.html` |
| Telegram Automation | `case-study/telegram-automation.html` |
| AI Video Editing | `case-study/ai-video.html` |
| Self-Hosted Infrastructure | `case-study/self-hosted.html` |

## File Structure

```
cv-portfolio/
├── css/
│   ├── tokens.css          # Design tokens (colors, typography, spacing)
│   ├── base.css            # Reset, typography, scroll-reveal
│   ├── layout.css          # Grid, nav, footer, page-header
│   └── components.css      # Cards, tags, buttons, timeline, filters
├── js/
│   ├── nav.js              # Sticky scroll + mobile toggle
│   ├── animations.js       # IntersectionObserver scroll reveals
│   └── projects.js         # Filter button logic (projects page)
├── case-study/             # 10 case study pages
├── index.html              # Homepage
├── about.html
├── experience.html
├── projects.html
├── skills.html
├── education.html
├── contact.html
└── leadership.html
```

## Deployment

Served via Nginx on Ubuntu VPS. Config at `/etc/nginx/sites-available/cv.sadeyan`.

```bash
# After edits
git add -A && git commit -m "message" && git push origin main

# SSH to server and pull
ssh ubuntu@server
cd /home/ubuntu/cv-portfolio && git pull origin main
```

## License

© 2026 Ahmad Fiqi Efendi. All rights reserved.
