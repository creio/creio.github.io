# DESIGN.md — creio.github.io

Visual design system for the creio personal site & blog. Based on shadcn/ui design language, adapted for Hugo + Bootstrap 5 + SCSS stack.

## 1. Visual Theme & Atmosphere

- **Mood**: Clean, minimal, developer-focused. Dark-first aesthetic with a calm, professional tone.
- **Density**: Compact but breathable. Content-heavy pages (blog, docs) use generous whitespace. Navigation and sidebars stay tight.
- **Design philosophy**: Function over decoration. No gradients on surfaces, no drop shadows on cards. Borders and subtle background shifts create hierarchy.
- **Dark mode**: Primary mode. Light mode available but dark is the default experience.

## 2. Color Palette & Roles

### Light Mode

| Token | Hex | Role |
|-------|-----|------|
| `--background` | `#ffffff` | Page background |
| `--foreground` | `#0a0a0a` | Primary text |
| `--card` | `#ffffff` | Card surfaces |
| `--card-foreground` | `#0a0a0a` | Card text |
| `--primary` | `#4b64b4` | Primary buttons, links, active states |
| `--primary-foreground` | `#ffffff` | Text on primary |
| `--secondary` | `#f4f4f5` | Secondary backgrounds, hover states |
| `--secondary-foreground` | `#18181b` | Text on secondary |
| `--muted` | `#f4f4f5` | Muted backgrounds, disabled states |
| `--muted-foreground` | `#71717a` | Subtle text, placeholders |
| `--accent` | `#f4f4f5` | Accent hover, highlight |
| `--accent-foreground` | `#18181b` | Text on accent |
| `--destructive` | `#ef4444` | Errors, delete actions |
| `--border` | `#e4e4e7` | Default borders |
| `--input` | `#e4e4e7` | Input field borders |
| `--ring` | `#4b64b4` | Focus rings |

### Dark Mode

| Token | Hex | Role |
|-------|-----|------|
| `--background` | `#141419` | Page background |
| `--foreground` | `#b3b4b6` | Primary text |
| `--card` | `#141419` | Card surfaces |
| `--card-foreground` | `#efefef` | Card text |
| `--primary` | `#5a74ca` | Primary buttons, links, active states |
| `--primary-foreground` | `#141419` | Text on primary |
| `--secondary` | `#1c1c24` | Secondary backgrounds, hover states |
| `--secondary-foreground` | `#efefef` | Text on secondary |
| `--muted` | `#1c1c24` | Muted backgrounds, disabled states |
| `--muted-foreground` | `#72748c` | Subtle text, placeholders |
| `--accent` | `#1c1c24` | Accent hover, highlight |
| `--accent-foreground` | `#efefef` | Text on accent |
| `--destructive` | `#dc2626` | Errors, delete actions |
| `--border` | `#25252c` | Default borders |
| `--input` | `#25252c` | Input field borders |
| `--ring` | `#5a74ca` | Focus rings |

### Chart Colors

| Token | Light | Dark |
|-------|-------|------|
| `--chart-1` | `#4b64b4` | `#5a74ca` |
| `--chart-2` | `#22c55e` | `#4ade80` |
| `--chart-3` | `#f59e0b` | `#fbbf24` |
| `--chart-4` | `#ef4444` | `#f87171` |
| `--chart-5` | `#8b5cf6` | `#a78bfa` |

## 3. Typography

### Font Families

| Role | Font | Stack |
|------|------|-------|
| Body | Roboto | `"Roboto", -apple-system, blinkmacsystemfont, "Segoe UI", "Helvetica Neue", arial, "Noto Sans", sans-serif` |
| Code | JetBrains Mono | `"JetBrains Mono", sfmono-regular, menlo, monaco, consolas, "Liberation Mono", "Courier New", monospace` |
| Headings | Roboto (700) | Same as body, weight 700 |

### Type Scale (Fluid)

| Step | Size | Use |
|------|------|-----|
| `--size-step-0` | `clamp(1rem, 0.87rem + 0.65vw, 1.38rem)` | Body text |
| `--size-step-1` | `clamp(1.25rem, 1.05rem + 1.01vw, 1.83rem)` | H6, large body |
| `--size-step-2` | `clamp(1.56rem, 1.26rem + 1.53vw, 2.44rem)` | H5 |
| `--size-step-3` | `clamp(1.95rem, 1.5rem + 2.27vw, 3.26rem)` | H4 |
| `--size-step-4` | `clamp(2.44rem, 1.78rem + 3.3vw, 4.34rem)` | H3 |
| `--size-step-5` | `clamp(3.05rem, 2.1rem + 4.76vw, 5.79rem)` | H2 |
| `--size-step-6` | `clamp(3.82rem, 2.46rem + 6.78vw, 7.71rem)` | H1, hero |

### Font Weights

| Weight | Use |
|--------|-----|
| 400 | Body text, lead paragraphs |
| 500 | Buttons, labels, navigation |
| 700 | Headings, bold text |
| 900 | Hero headings (optional) |

### Line Heights

| Context | Value |
|---------|-------|
| Body | 1.6 |
| Headings | 1.2 |
| Code blocks | 1.5 |

## 4. Component Patterns

### Buttons

| Variant | Background | Text | Border | Use |
|---------|-----------|------|--------|-----|
| `primary` | `--primary` | `--primary-foreground` | none | Main CTA |
| `secondary` | `--secondary` | `--secondary-foreground` | none | Secondary actions |
| `outline` | transparent | `--foreground` | `--border` | Tertiary actions |
| `ghost` | transparent | `--foreground` | none | Hover-only actions |
| `destructive` | `--destructive` | `#ffffff` | none | Delete, danger |
| `link` | transparent | `--primary` | none | Inline navigation |

**Border radius**: `0.375rem` (6px) default. Use `--radius` token.
**Padding**: `0.5rem 1rem` default. `size-` utility for icon-only buttons.
**Font weight**: 500 for all buttons.

### Cards

- Background: `--card`
- Border: `1px solid --border`
- Border radius: `0.5rem` (8px)
- No box shadow by default
- Hover state: subtle background shift or border color change
- Padding: `1.5rem` (24px)

### Inputs / Forms

- Background: `--background`
- Border: `1px solid --input`
- Border radius: `0.375rem` (6px)
- Focus: `1px solid --ring` with `0 0 0 2px` ring offset
- Padding: `0.5rem 0.75rem`
- Font size: `0.875rem` (14px)
- Placeholder color: `--muted-foreground`

### Badges

| Variant | Background | Text |
|---------|-----------|------|
| `default` | `--primary` | `--primary-foreground` |
| `secondary` | `--secondary` | `--secondary-foreground` |
| `outline` | transparent | `--foreground` |
| `destructive` | `--destructive` | `#ffffff` |

**Border radius**: Full pill (`9999px`).
**Padding**: `0.125rem 0.625rem`.
**Font size**: `0.75rem` (12px).

### Alerts

- Border radius: `0.375rem`
- Padding: `1rem 1.25rem`
- Border: `1px solid` matching variant color
- Variants: `default`, `destructive`, `success`, `warning`

### Tables

- Header background: `--muted`
- Border: `1px solid --border`
- Cell padding: `0.75rem 1rem`
- Striped rows: alternating `--background` / `--muted` (subtle)

### Navigation / Navbar

- Background: `--background` (light) / `--background` (dark)
- Border bottom: `1px solid --border`
- Link color: `--foreground`
- Active link: `--primary`
- Sticky positioning supported
- Height: `3.5rem` (56px)

### Sidebar (Docs)

- Background: `--background`
- Border right: `1px solid --border`
- Link color: `--muted-foreground`
- Active link: `--primary`, font-weight 500
- Hover: `--foreground`

## 5. Layout Principles

### Spacing Scale

| Token | Value | Use |
|-------|-------|-----|
| `0` | `0` | Reset |
| `1` | `0.25rem` (4px) | Tight gaps |
| `2` | `0.5rem` (8px) | Icon gaps, small padding |
| `3` | `0.75rem` (12px) | Form field gaps |
| `4` | `1rem` (16px) | Standard spacing |
| `5` | `1.25rem` (20px) | Card padding |
| `6` | `1.5rem` (24px) | Section gaps |
| `8` | `2rem` (32px) | Large section gaps |
| `10` | `2.5rem` (40px) | Page margins |
| `12` | `3rem` (48px) | Grid gutter |
| `16` | `4rem` (64px) | Major sections |

### Grid

- Columns: 16 (Bootstrap extended)
- Gutter: `48px` on desktop, `24px` on mobile
- Max width: `1320px` (xxl container)
- Content max width: `720px` for blog posts, `960px` for docs

### Breakpoints

| Name | Min-width | Container |
|------|-----------|-----------|
| `sm` | `576px` | 540px |
| `md` | `768px` | 720px |
| `lg` | `992px` | 960px |
| `xl` | `1200px` | 1240px |
| `xxl` | `1400px` | 1320px |

### Whitespace Philosophy

- Generous vertical rhythm between sections (2-4rem)
- Consistent horizontal padding on containers (1rem mobile, 2rem desktop)
- Content blocks separated by clear visual breaks, not just margins
- Sidebar and main content area maintain equal visual weight

## 6. Elevation & Shadows

Minimal shadow usage. Hierarchy through borders and background shifts.

| Level | Use | Token |
|-------|-----|-------|
| 0 | Default surfaces | none |
| 1 | Dropdowns, popovers | `0 1px 3px rgba(0,0,0,0.1)` |
| 2 | Modals, dialogs | `0 4px 12px rgba(0,0,0,0.15)` |
| 3 | Fixed elements (toasts) | `0 8px 24px rgba(0,0,0,0.2)` |

**Dark mode**: Reduce shadow opacity or rely on border differentiation instead.

## 7. Do's and Don'ts

### Do

- Use semantic color tokens (`--primary`, `--muted-foreground`) not raw hex values
- Use `gap-*` instead of `space-x-*` / `space-y-*`
- Use `size-*` for equal width/height (icons, avatars)
- Use `truncate` for text overflow
- Use `cn()` for conditional class merging
- Keep borders consistent: `1px solid --border`
- Match component density to context (compact in sidebars, spacious in content)

### Don't

- Don't use raw Tailwind colors (`bg-white`, `text-gray-500`) — use semantic tokens
- Don't add manual `dark:` overrides — CSS variables handle mode switching
- Don't use `space-y-*` / `space-x-*` — use flexbox + `gap`
- Don't add `z-index` to overlay components — let the framework handle stacking
- Don't use box shadows on cards or surfaces — use borders
- Don't mix font families — stick to Roboto for body, JetBrains Mono for code
- Don't use gradient backgrounds on UI elements
- Don't add decorative elements that don't serve function

## 8. Responsive Behavior

### Mobile (< 768px)

- Sidebar collapses to off-canvas drawer
- Navbar becomes hamburger menu
- Cards stack vertically
- Font sizes clamp to minimum fluid values
- Touch targets: minimum 44x44px
- Padding reduces to `1rem` horizontal

### Tablet (768px - 991px)

- Sidebar visible but narrow (240px)
- Two-column layouts possible
- Font sizes at mid-range fluid values

### Desktop (≥ 992px)

- Full sidebar (280px)
- Three-column layouts for docs
- Full fluid font scale
- Generous whitespace

### Print

- Strip navigation, sidebar, footer
- Use `--foreground` for all text
- Borders for structure, no backgrounds
- Font size: 12pt body

## 9. Agent Prompt Guide

### Quick Color Reference

```text
Primary:        #4b64b4 (light) / #5a74ca (dark)
Background:     #ffffff (light) / #141419 (dark)
Foreground:     #0a0a0a (light) / #b3b4b6 (dark)
Muted:          #f4f4f5 (light) / #1c1c24 (dark)
Muted text:     #71717a (light) / #72748c (dark)
Border:         #e4e4e7 (light) / #25252c (dark)
Destructive:    #ef4444 (light) / #dc2626 (dark)
```

### Ready-to-Use Prompts

**Create a new page:**
> Follow the DESIGN.md in this project. Create a [page type] using the defined color palette, typography, spacing, and component patterns. Use semantic tokens, not raw values.

**Restyle existing component:**
> Restyle this [component] to match the DESIGN.md design system. Use the defined border radius, spacing tokens, and color variables.

**Add dark mode support:**
> Add dark mode to this component using the CSS variable system from DESIGN.md. Do not use manual `dark:` overrides.

**Create a card grid:**
> Build a card grid following DESIGN.md card patterns. Use `--card` background, `--border` borders, consistent padding, and no shadows.

### Rules for AI Agents

1. Always reference DESIGN.md before generating UI
2. Use CSS variables for all colors — never hardcode hex values
3. Follow the spacing scale (4/8/12/16/24/32/48/64px)
4. Use Roboto for body, JetBrains Mono for code
5. Border radius: 6px for small elements, 8px for cards, 12px for modals
6. No shadows — use borders for elevation
7. Dark mode is default — design dark-first
8. Use `gap` not `space-*` utilities
9. Truncate long text, don't let it overflow
10. Keep navigation compact, content spacious

---

*This DESIGN.md follows the [Google Stitch DESIGN.md specification](https://stitch.withgoogle.com/docs/design-md/specification/). It is the source of truth for visual design decisions on creio.github.io.*
