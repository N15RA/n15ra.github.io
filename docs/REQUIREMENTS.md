# Functional Requirements

## 1. Website Purpose

Showcase NISRA (Network and Information Security Research Association) club information and attract new members from Fu Jen Catholic University.

## 2. Target Users

| User Type           | Description                              | Primary Needs            |
| ------------------- | ---------------------------------------- | ------------------------ |
| Prospective Members | FJU students interested in cybersecurity | Club info, how to join   |
| Current Members     | Active club participants                 | Event updates, resources |
| External Visitors   | Security enthusiasts, recruiters         | Club activities, contact |

## 3. Functional Requirements

### 3.1 Homepage Sections

| Section    | Content                                                     | Acceptance Criteria                         |
| ---------- | ----------------------------------------------------------- | ------------------------------------------- |
| **Hero**   | Club name, tagline, CTA button                              | Visually appealing, clear value proposition |
| **About**  | Club introduction, 3 key features (Speech, Security, Share) | Concise, informative                        |
| **Events** | Annual events (Enlightened, Winter Training)                | Photos, descriptions, event badges          |
| **Join**   | Meeting time, location, map                                 | Accurate info, interactive map              |

### 3.2 Bilingual Support

| Requirement        | Implementation                          |
| ------------------ | --------------------------------------- |
| Default language   | Traditional Chinese (zh-TW)             |
| Secondary language | English (en)                            |
| Language switching | Dropdown menu in header                 |
| URL structure      | `/` for Chinese, `/en/` for English     |
| Content parity     | All content available in both languages |

### 3.3 Responsive Design

| Breakpoint | Width          | Layout                               |
| ---------- | -------------- | ------------------------------------ |
| Desktop    | >= 1024px      | Full layout, horizontal navigation   |
| Tablet     | 768px - 1023px | Adjusted spacing, may stack elements |
| Mobile     | < 768px        | Hamburger menu, stacked layout       |

### 3.4 Navigation

| Item     | Link          | Behavior                    |
| -------- | ------------- | --------------------------- |
| Home     | `/` or `/en/` | Scroll to top               |
| About    | `/#about`     | Smooth scroll to section    |
| Events   | `/#events`    | Smooth scroll to section    |
| Join     | `/#join`      | Smooth scroll to section    |
| Language | Dropdown      | Switch between zh-TW and en |

## 4. Performance Requirements

| Metric                  | Target | Measurement       |
| ----------------------- | ------ | ----------------- |
| Lighthouse Performance  | > 90   | Google Lighthouse |
| First Contentful Paint  | < 1.5s | WebPageTest       |
| Cumulative Layout Shift | < 0.1  | Core Web Vitals   |
| Time to Interactive     | < 3s   | Lighthouse        |

## 5. Non-Functional Requirements

### 5.1 Hosting

- **Platform**: GitHub Pages
- **Cost**: Free
- **SSL**: Enabled (HTTPS enforced)
- **Domain**: n15ra.github.io

### 5.2 Maintenance

- **Update frequency**: Monthly or as needed
- **Manual trigger**: Available via GitHub Actions
- **Automatic rebuild**: Daily at 6:00 AM Taiwan time

### 5.3 Accessibility

- Semantic HTML structure
- Alt text for images
- Keyboard navigation support
- Sufficient color contrast

### 5.4 SEO

- Meta descriptions
- Open Graph tags
- Alternate language links (hreflang)
- Sitemap (via Astro)

## 6. Content Requirements

### 6.1 Required Assets

| Asset Type   | Location                     | Format  |
| ------------ | ---------------------------- | ------- |
| Logo         | `public/images/logos/`       | PNG     |
| Event photos | `public/images/photos/`      | JPG/PNG |
| Icons        | `public/images/icons/`       | PNG     |
| Background   | `public/images/backgrounds/` | PNG     |

### 6.2 Text Content

| Section      | Chinese                | English                                                    |
| ------------ | ---------------------- | ---------------------------------------------------------- |
| Tagline      | 探索資訊安全的無限可能 | Explore the Infinite Possibilities of Information Security |
| Meeting time | 每週三 18:30 - 21:00   | Wednesday 18:30 - 21:00                                    |
| Location     | 輔仁大學 聖言樓        | Fu Jen Catholic University, Shengyan Building              |

## 7. Future Enhancements (Planned)

| Feature                   | Priority | Status  |
| ------------------------- | -------- | ------- |
| Google Sheets integration | High     | Planned |
| Independent About page    | Medium   | Planned |
| Independent Events page   | Medium   | Planned |
| Image optimization (WebP) | Low      | Planned |
