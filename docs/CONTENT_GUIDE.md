# Content Maintenance Guide

This guide is for club members who need to update website content. No programming experience required.

## Quick Reference

| Task | Where to Edit |
|------|---------------|
| Change text (Chinese/English) | `src/i18n/ui.ts` |
| Update meeting time | `src/pages/index.astro` (line ~162) |
| Add/replace images | `public/images/` folder |
| Trigger website update | GitHub Actions page |

---

## How to Edit Text Content

### Option 1: Edit Directly on GitHub

1. Go to https://github.com/N15RA/n15ra.github.io
2. Navigate to the file you want to edit
3. Click the pencil icon (Edit this file)
4. Make your changes
5. Scroll down and click "Commit changes"
6. The website will automatically update in a few minutes

### Translation File Location

**File**: `src/i18n/ui.ts`

This file contains all translatable text in both Chinese and English.

```typescript
export const ui = {
  'zh-TW': {
    'nav.home': '首頁',           // Chinese text here
    'hero.subtitle': '輔仁大學資訊安全研究社',
    // ... more translations
  },
  en: {
    'nav.home': 'Home',           // English text here
    'hero.subtitle': 'FJU Network and Information Security Research Association',
    // ... more translations
  },
};
```

### Common Edits

#### Change Meeting Time

**File**: `src/pages/index.astro` (around line 162)

Find:
```html
<p>每週三 18:30 - 21:00</p>
```

Change to your new time.

Also update the English version in `src/pages/en/index.astro`.

#### Change Location

**File**: `src/pages/index.astro` (around line 175)

Find:
```html
<p>輔仁大學 聖言樓</p>
```

Change to your new location.

---

## How to Update Images

### Step 1: Prepare Your Image
- **Format**: JPG or PNG (WebP preferred for better performance)
- **Size**: Maximum 2000px width
- **File size**: Keep under 500KB if possible

### Step 2: Upload to GitHub

1. Go to `public/images/` folder on GitHub
2. Choose the appropriate subfolder:
   - `logos/` - Logo files
   - `photos/` - Event photos
   - `icons/` - Icon images
   - `backgrounds/` - Background images
3. Click "Add file" > "Upload files"
4. Drag and drop your image
5. Click "Commit changes"

### Step 3: Reference in Code (if adding new image)

If you're adding a completely new image (not replacing existing), you'll need to update the code to use it. Contact a developer for help.

---

## How to Trigger Website Update

The website automatically updates when you commit changes. But if you need to force an update:

### Manual Update Steps

1. Go to https://github.com/N15RA/n15ra.github.io/actions
2. Click "Deploy to GitHub Pages" in the left sidebar
3. Click "Run workflow" button (top right)
4. Click the green "Run workflow" button
5. Wait 1-2 minutes for deployment

---

## Google Sheets Integration (Planned)

> This feature is not yet implemented. Below is the planned design.

### Purpose
Allow non-technical members to update event information via Google Sheets without touching code.

### How It Will Work
1. Maintainer updates event data in Google Sheets
2. Website automatically pulls data during build
3. Manual GitHub Actions trigger to update immediately

### Planned Spreadsheet Format

| Column | Description | Example |
|--------|-------------|---------|
| Event Name | Event title | Enlightened 2025 |
| Date | YYYY-MM-DD format | 2025-03-15 |
| Description (zh) | Chinese description | 年度資安研討會 |
| Description (en) | English description | Annual Security Conference |
| Image URL | Link to event image | https://... |
| Badge | Event type label | Annual Event |

### Implementation Steps (For Developers)
1. Create Google Sheet template
2. Set up OpenSheet API or Google Sheets API
3. Fetch data at build time in Astro
4. Create Events page component

---

## Troubleshooting

### Website didn't update after commit
- Wait 2-3 minutes; deployments take time
- Check Actions page for errors
- Try manual trigger

### Image not showing
- Check file path matches exactly (case-sensitive)
- Ensure image is in `public/images/` folder
- Check file extension matches

### Text change not appearing
- Make sure you edited the correct language block
- Check for syntax errors (missing quotes, commas)
- Try clearing browser cache

---

## Need Help?

If you encounter issues you can't resolve:
1. Check the [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
2. Contact the previous technical officer
3. Create an issue on GitHub
