# WikiLens 🔭

A modern, beautifully designed Wikipedia reader built with **Next.js 14** and the **Wikimedia REST API**.

![WikiLens Preview](https://via.placeholder.com/1200x630/0a0a0f/e8c97a?text=WikiLens)

## Features

- 🔍 **Smart search** with real-time autocomplete suggestions
- 📖 **Article viewer** with excerpts, descriptions, thumbnails
- 📋 **Revision metadata** — editor, timestamp, edit notes
- 🖼️ **Media gallery** — browse article images with lightbox
- 🎲 **Random article** discovery
- ⚡ **Server-side rendering** for instant first loads
- 🐳 **Dockerized** — production-ready, multi-stage build

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data | Wikimedia REST API |
| Containerization | Docker + Docker Compose |

---

## Quick Start

### Option 1 — Docker (recommended)

```bash
# Production
docker-compose up -d

# Development (hot reload)
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

App will be running at **http://localhost:3000**

### Option 2 — Local development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Option 3 — Build & run manually

```bash
npm install
npm run build
npm start
```

---

## Docker Commands

```bash
# Build the image
docker build -t wikilens .

# Run the container
docker run -p 3000:3000 wikilens

# Run with docker-compose (production)
docker-compose up -d

# Run with docker-compose (development, with hot reload)
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# View logs
docker-compose logs -f wikilens

# Stop
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

---

## Project Structure

```
wikilens/
├── app/
│   ├── api/
│   │   ├── media/route.ts       # GET /api/media?title=
│   │   ├── random/route.ts      # GET /api/random
│   │   ├── revision/route.ts    # GET /api/revision?title=
│   │   ├── search/route.ts      # GET /api/search?q=
│   │   └── suggest/route.ts     # GET /api/suggest?q=
│   ├── article/[title]/
│   │   └── page.tsx             # Article detail page (SSR)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Home page
├── components/
│   ├── ArticleCard.tsx          # Main article display
│   ├── Header.tsx               # Site header & nav
│   ├── MediaGallery.tsx         # Image grid with lightbox
│   ├── SearchBar.tsx            # Search with autocomplete
│   └── Sidebar.tsx              # Topics & trending sidebar
├── lib/
│   ├── types.ts                 # TypeScript interfaces
│   └── wiki.ts                  # Wikimedia API client
├── Dockerfile                   # Multi-stage production build
├── Dockerfile.dev               # Development build
├── docker-compose.yml           # Production compose
├── docker-compose.dev.yml       # Development compose override
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `GET /page/summary/{title}` | Article summary & metadata |
| `GET /page/title/{title}` | Revision metadata |
| `GET /page/media-list/{title}` | Media files on a page |
| `GET /page/random/summary` | Random article |
| MediaWiki OpenSearch API | Search autocomplete |

---

## Environment Variables

No required environment variables — the app uses public Wikimedia APIs.

Optional:
```env
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## License

MIT. Article content from [Wikipedia](https://en.wikipedia.org) under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
