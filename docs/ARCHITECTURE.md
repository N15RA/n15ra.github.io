# Technical Architecture

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Astro | 5.x |
| Styling | Tailwind CSS | 4.x |
| UI Components | DaisyUI | 5.x |
| Language | TypeScript | - |
| Deployment | GitHub Pages | - |
| CI/CD | GitHub Actions | - |

## Project Structure

```
n15ra.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── docs/                        # Project documentation
├── public/
│   ├── images/
│   │   ├── backgrounds/        # Background images
│   │   ├── icons/              # Icon images
│   │   ├── logos/              # Logo files
│   │   └── photos/             # Event photos
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro        # Navigation bar
│   │   ├── Footer.astro        # Page footer
│   │   ├── LanguageSwitcher.astro
│   │   ├── EventCard.astro     # Event display card
│   │   └── CourseCard.astro    # Course display card
│   ├── i18n/
│   │   ├── ui.ts               # Translation strings
│   │   └── utils.ts            # i18n utility functions
│   ├── layouts/
│   │   └── Layout.astro        # Main page layout
│   ├── lib/
│   │   └── sheets.ts           # Google Sheets data fetching
│   ├── pages/
│   │   ├── index.astro         # Chinese homepage
│   │   └── en/
│   │       └── index.astro     # English homepage
│   ├── styles/
│   │   └── global.css          # Global styles & theme
│   └── types/
│       └── content.ts          # TypeScript type definitions
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Component Overview

### Layout.astro
Main page layout providing:
- HTML document structure
- SEO meta tags
- Open Graph tags
- Alternate language links (hreflang)
- Header and Footer inclusion

### Header.astro
Responsive navigation bar:
- Logo with home link
- Navigation menu (Home, About, Events, Join)
- Mobile hamburger menu
- Language switcher integration
- Fixed position with scroll behavior

### Footer.astro
Page footer containing:
- NISRA logo and name
- Copyright information
- Social media links (GitHub, Facebook)

### LanguageSwitcher.astro
Dropdown language selector:
- Current language display
- Available language options
- URL-based language switching

### EventCard.astro
Reusable event display card:
- Event image, title, description
- Badge/tag display
- Used in Events section

### CourseCard.astro
Reusable course display card:
- Course title, description
- Date, time, speaker information
- Used in Courses section

## Internationalization (i18n)

### Routing Strategy
- **Default language**: zh-TW (no URL prefix)
- **English**: `/en/` prefix
- Example: `/` (Chinese), `/en/` (English)

### Translation Files

**Location**: `src/i18n/ui.ts`

```typescript
export const ui = {
  'zh-TW': {
    'nav.home': '首頁',
    'hero.subtitle': '輔仁大學資訊安全研究社',
    // ...
  },
  en: {
    'nav.home': 'Home',
    'hero.subtitle': 'FJU Network and Information Security Research Association',
    // ...
  },
};
```

### Utility Functions

**Location**: `src/i18n/utils.ts`

| Function | Purpose |
|----------|---------|
| `getCurrentLocale()` | Get current language from URL |
| `useTranslations()` | Get translation function for locale |
| `getRelativeLocaleUrl()` | Generate localized URL |
| `getAlternateUrl()` | Get URL for alternate language |

## Deployment

### Trigger Conditions
1. Push to `master` branch
2. Manual trigger (workflow_dispatch)
3. Scheduled daily at UTC 22:00 (Taiwan 06:00)

### Workflow Steps
1. Checkout repository
2. Build with `withastro/action@v3`
   - Installs dependencies
   - Runs `npm run build`
   - Uploads artifact
3. Deploy to GitHub Pages

### Configuration
- **Source**: GitHub Actions (not branch deployment)
- **URL**: https://n15ra.github.io/

## Theme Configuration

### DaisyUI Custom Theme

**Location**: `src/styles/global.css`

```css
@plugin "daisyui/theme" {
  name: "nisra";
  default: true;
  color-scheme: dark;
  --color-primary: oklch(90% 0.18 105);    /* #E4F46C yellow-green */
  --color-base-100: oklch(18% 0.01 240);   /* Dark background */
  --color-accent: oklch(70% 0.2 220);      /* Tech blue */
}
```

### Color Palette

| Token | Color | Usage |
|-------|-------|-------|
| primary | #E4F46C | Main accent, buttons, links |
| base-100 | Dark gray | Page background |
| base-200 | Slightly lighter | Section backgrounds |
| base-300 | Even lighter | Card backgrounds |
| accent | Cyan blue | Secondary highlights |

## Development

### Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Local Development
1. Clone repository
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:4321

## Google Sheets Integration

### Data Flow

```
Google Sheets (Public)
        │
        ▼
  OpenSheet API
  (opensheet.elk.sh)
        │
        ▼
  src/lib/sheets.ts
  (fetchEvents, fetchCourses)
        │
        ▼
  index.astro (build time)
        │
        ▼
  Static HTML (deployed)
```

### Configuration

Environment variable required:
- `PUBLIC_GOOGLE_SHEET_ID`: The Google Spreadsheet ID

### Data Types

Defined in `src/types/content.ts`:
- `Event`: id, title, description_zh, description_en, badge, image, date, order, visible
- `Course`: id, title_zh, title_en, description_zh, description_en, date, time, speaker, order, visible

### Error Handling

- If no spreadsheet ID is configured, empty arrays are returned
- If API fails, errors are logged but build continues
- Pages display "no events/courses" message as fallback
