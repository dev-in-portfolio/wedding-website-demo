# DSCG Wedding Websites — Site 3: Wedding Website Demo

The **Wedding Website Demo** is the customer-facing sales demonstration for **Dark Star Consulting Group's ★★ Wedding Website** service level ($795 starting price).

## Ecosystem Architecture

This repository is **Site 3 of 5** in the authoritative DSCG Wedding Websites ecosystem:

1. **Site 1: DSCG Wedding Portal** — [https://dscg-wedding-portal.netlify.app](https://dscg-wedding-portal.netlify.app)
2. **Site 2: Wedding Essential Demo (★)** — [https://wedding-essential-demo.netlify.app](https://wedding-essential-demo.netlify.app)
3. **Site 3: Wedding Website Demo (★★)** *(This Repository)* — [https://wedding-website-demo.netlify.app](https://wedding-website-demo.netlify.app)
4. **Site 4: Wedding Weekend / Destination Demo (★★★)**
5. **Site 5: DSCG Wedding Intake**

## Fictional Wedding Profile

- **Couple**: Sophia Bennett & Marcus Reed
- **Date**: Saturday, June 19, 2027
- **Location**: Charleston, South Carolina
- **Venue**: The Marlowe House & Gardens, 142 Church Street, Charleston, SC 29401 (Fictional)

## Demonstrated ★★ Capabilities

- **Interactive Front-End Demo RSVP**: Conditional attendance selection, entrée selection, dietary notes, and accessible submission feedback.
- **Day-of Schedule Timeline**: Full one-day celebration from 3:30 PM arrival to 10:30 PM farewell.
- **Venue & Practical Details**: Dress code, valet parking, and demo venue directions notice.
- **Wedding Party**: Structured presentation of Maid of Honor, Best Man, Bridesmaids, and Groomsmen with concise biographies.
- **Charleston Accommodations**: 3 fictional partner hotels (*The Millsbury Hotel*, *The Palmetto Grand*, *Harborline Suites*) with room-block booking demo notices.
- **Curated Gift Funds**: 3 registry categories (*Charleston Home Restoration*, *Amalfi Coast Honeymoon*, *Coastal Conservation League*) with contribution demo notices.
- **Accessible FAQ Accordion**: 8 comprehensive guest planning questions with keyboard and screen reader accessibility.
- **Celebration Gallery**: 8 high-resolution Charleston wedding images with dynamic layout transformations.
- **Demo Notices**: Accessible HTML5 `<dialog>` for all mock external actions without broken 404 links or fake domains.

## Five Selectable Visual Directions

1. **Coastal Editorial** (Default) — Airy composition, `Italiana` serif display, muted slate & stone palette.
2. **Southern Classic** — Balanced symmetry, `Cormorant Garamond` serif, ivory, deep cypress green & heirloom gold.
3. **Contemporary Luxe** — High-contrast evening luxury, `Playfair Display` serif, obsidian surfaces & champagne bronze.
4. **Garden Romantic** — Organic botanical curvature, `Fraunces` serif, live-oak sage & blush cream.
5. **Bold Modern** — Swiss architectural grid, `Plus Jakarta Sans` extra bold, stark monochrome & electric cobalt.

## Quality & Complexity Boundaries

- Strict **★★ complexity ceiling** (one-day celebration only, no multi-day itineraries, no hotel booking engines, no guest accounts, no backend database).
- Mobile-first, fully responsive across 390px, 768px, and 1440px viewports.
- Fully respects `prefers-reduced-motion` in both CSS and JavaScript.

## Development & Build

- **Development Server**: `npm run dev`
- **Production Build**: `npm run build` (outputs to `dist/`)
- **Preview Build**: `npm run preview`
- **Hosting Target**: Netlify
