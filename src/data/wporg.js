// Every figure here was checked against the WordPress.org API and the public
// author pages on 8 September 2026. Install counts are deliberately absent:
// they are not mine to publish and they go stale the day after they are typed.

export const wporgSummary = {
  plugins: 8,
  themes: 1,
  patterns: 14,
  creditsRelease: '7.1',
  profileUrl: 'https://profiles.wordpress.org/softglaze/',
  creditsUrl: 'https://credits.wordpress.org/7.1/',
  patternsUrl: 'https://wordpress.org/patterns/author/softglaze/',
  coreTicketUrl: 'https://core.trac.wordpress.org/ticket/65802',
};

export const plugins = [
  {
    name: 'PDF Invoices for WooCommerce',
    slug: 'softglaze-pdf-invoices',
    version: '2.28.3',
    summary:
      'Invoices, credit notes and packing slips for WooCommerce, with partial payments, deposits and client e-signature. Around 7,800 lines of PHP. The PDF engine is vendored, so no document ever leaves the server.',
    tags: ['WooCommerce', 'dompdf'],
  },
  {
    name: 'Invoices Gulf',
    slug: 'softglaze-invoices-gulf',
    version: '0.4.1',
    summary:
      'ZATCA generation-phase tax invoices for Saudi Arabia and the UAE. The TLV QR payload has to be byte exact or the tax authority rejects it, so the plugin records what it encoded rather than what it meant to encode.',
    tags: ['ZATCA', 'UBL 2.1'],
  },
  {
    name: 'AI Crawler Monitor',
    slug: 'softglaze-ai-crawler-monitor',
    version: '0.7.0',
    summary:
      'Records every request from a known AI crawler, which pages it asked for, and what the site actually returned. Most plugins in this space stop at writing the rule. This one reports whether the rule was honoured.',
    tags: ['robots.txt'],
  },
  {
    name: 'Maintenance Mode and Coming Soon',
    slug: 'softglaze-maintenance-mode-coming-soon',
    version: '1.6.0',
    summary:
      'Three response modes and ten templates, with scheduled switching and access control by role, user, IP range, bypass link or password.',
    tags: ['Scheduling'],
  },
  {
    name: 'Click to Chat',
    slug: 'softglaze-click-to-chat',
    version: '1.0.0',
    summary:
      'A WhatsApp button with multiple agents, working-hour schedules and display rules. Its own REST namespace, per-submitter rate limiting, and GDPR export and erase handlers.',
    tags: ['REST API', 'GDPR'],
  },
  {
    name: 'Driveline Core',
    slug: 'driveline-core',
    version: '0.1.0',
    summary:
      'Content types and booking logic for vehicle rental sites. Availability counts against unit stock over a half-open date window, so a rental ending exactly as another starts is not treated as a conflict.',
    tags: ['Booking'],
  },
  {
    name: 'Driveline for Elementor',
    slug: 'driveline-for-elementor',
    version: '0.1.1',
    summary:
      'Fourteen widgets and four dynamic tags that read from Driveline Core rather than reimplementing it, so the price on the page and the price at checkout come from one code path.',
    tags: ['Elementor'],
  },
  {
    name: 'Driveline for WPBakery',
    slug: 'driveline-for-wpbakery',
    version: '0.1.0',
    summary:
      'The same fourteen placements as the Elementor pack, built for the WPBakery editor and reading from the same core.',
    tags: ['WPBakery'],
  },
];

export const themes = [
  {
    name: 'Warqa',
    slug: 'warqa',
    version: '1.1.0',
    live: true,
    summary:
      'A block theme for writers and publishers. theme.json v3, nine templates, 36 insertable patterns, light and dark variations, and fonts bundled locally so it makes no remote requests. The review team set it live with no required changes and no revision round.',
    tags: ['Full site editing', 'theme.json v3'],
  },
  {
    name: 'Driveline',
    slug: null,
    version: '1.0.1',
    live: false,
    summary:
      'A theme for vehicle rental and fleet sites, built to sit on top of Driveline Core. Fourteen block patterns, four page templates, a live-preview Customizer panel and no remote requests. Currently in the theme review queue.',
    tags: ['In review'],
  },
];
