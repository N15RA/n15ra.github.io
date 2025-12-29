# NISRA Official Website

NISRA (Network and Information Security Research Association) official website for Fu Jen Catholic University.

**Live Site**: https://n15ra.github.io/

## Tech Stack

- **Framework**: [Astro](https://astro.build/) 5.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4 + [DaisyUI](https://daisyui.com/) 5
- **Deployment**: GitHub Pages via GitHub Actions
- **Languages**: Chinese (Traditional) & English

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable components
├── i18n/           # Internationalization
├── layouts/        # Page layouts
├── pages/          # Route pages
│   └── en/         # English pages
└── styles/         # Global styles

public/
└── images/         # Static assets
    ├── logos/
    ├── photos/
    ├── icons/
    └── backgrounds/
```

## Documentation

| Document | Description | Audience |
|----------|-------------|----------|
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Technical architecture and implementation details | Developers |
| [REQUIREMENTS.md](./docs/REQUIREMENTS.md) | Functional and non-functional requirements | Everyone |
| [CONTENT_GUIDE.md](./docs/CONTENT_GUIDE.md) | How to update website content | Content maintainers |
| [HANDOFF_CHECKLIST.md](./docs/HANDOFF_CHECKLIST.md) | Officer transition checklist | Club officers |

## Deployment

The website automatically deploys when pushing to the `main` branch.

**Manual deployment**: Go to Actions > "Deploy to GitHub Pages" > "Run workflow"

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Wait for review and merge

## License

This project is maintained by NISRA, Fu Jen Catholic University.
