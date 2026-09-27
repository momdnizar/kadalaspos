# Kadalas POS

Responsive React + Vite + TypeScript site with Tailwind CSS v4, Lucide icons and reusable components.

## Run

```sh
npm install
npm run dev
```

## Verify

```sh
npm run build
npm run test:e2e
```

The POS screens use sample data and support adding items, searching, changing quantities and selecting tables. Payments are simulated. The carousel pauses on hover or keyboard focus, offers manual pause, and respects reduced motion.

Browser tests use locally installed Microsoft Edge. Change `channel` in `playwright.config.ts` to use another installed browser.

## Before publishing

- Website branding and demo POS headers use `public/logos/kadalaslogolong.png`. Favicon and launch icons use `public/logos/kadalaslogo.jfif`, exported to standard PNG sizes.
- Connect the enquiry form in `src/components/Modal.tsx` to your approved contact service. It currently prepares a copyable draft, explicitly sends nothing and stores nothing.
- Set official social URLs in `src/components/Footer.tsx`; current links are labelled platform homepages.
- Export `public/social-card.svg` to a PNG. Set absolute production Open Graph image/URL metadata and canonical URL in `index.html` once the domain is confirmed.
- Confirm product descriptions, partner reward terms and support availability with the business.

Menu preview photography is served from Unsplash; the font is served from Google Fonts. Self-host assets if required for deployment.
