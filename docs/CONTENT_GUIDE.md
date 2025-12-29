# Content Maintenance Guide

This guide is for club members who need to update website content. No programming experience required.

## Quick Reference

| Task                          | Where to Edit                       |
| ----------------------------- | ----------------------------------- |
| Change text (Chinese/English) | `src/i18n/ui.ts`                    |
| Update meeting time           | `src/pages/index.astro` (line ~162) |
| Add/replace images            | `public/images/` folder             |
| Trigger website update        | GitHub Actions page                 |

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
  "zh-TW": {
    "nav.home": "首頁", // Chinese text here
    "hero.subtitle": "輔仁大學資訊安全研究社",
    // ... more translations
  },
  en: {
    "nav.home": "Home", // English text here
    "hero.subtitle":
      "FJU Network and Information Security Research Association",
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

## Google Sheets Integration

The website fetches Events and Courses data from Google Sheets using [OpenSheet API](https://github.com/benborgers/opensheet).

### Setup Steps

1. **Create a Google Sheet** with two sheets named exactly:

   - `Events`
   - `Courses`

2. **Set up the Events sheet** with these columns (first row as headers):

| Column         | Description         | Example                        |
| -------------- | ------------------- | ------------------------------ |
| id             | Unique identifier   | enlightened-2025               |
| title          | Event title         | Enlightened 2025               |
| description_zh | Chinese description | 年度資安研討會...              |
| description_en | English description | Annual security...             |
| badge          | Label/tag           | Annual Event                   |
| image          | Image path          | /images/photos/enlightened.jpg |
| date           | Date (optional)     | 2025-03-15                     |
| order          | Display order       | 1                              |
| visible        | Show on website     | TRUE                           |

3. **Set up the Courses sheet** with these columns:

| Column         | Description           | Example             |
| -------------- | --------------------- | ------------------- |
| id             | Unique identifier     | web-security-101    |
| semester       | Semester code         | 2025-1              |
| semester_label | Semester display name | 2025 年第 1 學期    |
| title_zh       | Chinese title         | Web 安全入門        |
| title_en       | English title         | Web Security 101    |
| description_zh | Chinese description   | 學習常見網頁漏洞... |
| description_en | English description   | Learn common web... |
| date           | Date                  | 2025-03-12          |
| time           | Time                  | 18:30-21:00         |
| speaker        | Speaker name          | 王小明              |
| order          | Display order         | 1                   |

**Note**: The `semester` field uses the format `YYYY-N` where YYYY is the year and N is the semester number (1 or 2).

The website automatically:
- Shows only the latest semester's courses on the homepage
- Provides a "View All Courses" link to `/courses` page
- Groups all courses by semester on the courses page

4. **Make the sheet public**:

   - Click "Share" button
   - Change to "Anyone with the link can view"

5. **Get the Spreadsheet ID**:

   - Copy from URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`

6. **Configure the website**:
   - Create a `.env` file with: `PUBLIC_GOOGLE_SHEET_ID=your_spreadsheet_id`
   - Or set it in GitHub repository secrets

### Updating Content

1. Open the Google Sheet
2. Add or modify rows
3. Set `visible` to `TRUE` for items to display
4. Trigger a website rebuild (push to main or manual Actions trigger)

### Image Handling

Images should be:

- Uploaded to `public/images/photos/` in the repository
- Referenced in the sheet as relative paths: `/images/photos/filename.jpg`

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
