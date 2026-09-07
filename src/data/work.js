// Ten entries, cut from thirty-one. Each one says what the engineering problem
// actually was, because a list of client names is not a portfolio.
//
// The eleven near-identical Dubai notary domains are one entry: they were one
// client and one estate, and listing them separately padded the count.

export const work = [
  {
    name: 'SoftGlaze Browser',
    kind: 'Product',
    href: 'https://github.com/softglazee/softglaze-browser',
    hrefLabel: 'Source on GitHub',
    stack: ['Electron', 'React', 'Prisma', 'SQLite'],
    problem:
      'Running many isolated browser profiles at once, each with its own data directory, proxy and fingerprint. The hard part is not launching Chromium, it is keeping profile state, proxy health and team permissions consistent when any of the three can fail independently. Local-first, so nothing leaves the machine.',
  },
  {
    name: 'Inventory and Accounts',
    kind: 'Product',
    href: 'https://github.com/softglazee/softglaze-inventory-management',
    hrefLabel: 'Source on GitHub',
    stack: ['React', 'Node', 'Prisma', 'TypeScript'],
    problem:
      'Stock and point of sale for retail and wholesale, with double-entry accounting and pay-later (udhaar) credit as a first-class part of the data model rather than a note on an invoice. One codebase ships to both the browser and a Windows desktop build.',
  },
  {
    name: 'SoftGlaze Screen Recorder',
    kind: 'Product',
    href: 'https://chromewebstore.google.com/detail/softglaze-screen-recorder/ofjommapkklakbolagajoiklgfldhlmp',
    hrefLabel: 'Chrome Web Store',
    stack: ['Manifest V3', 'MediaRecorder', 'Canvas'],
    problem:
      'Desktop, tab and camera capture with an annotation layer that stays anchored to page elements while the page scrolls underneath it. Anchoring drawings to the DOM rather than to screen coordinates is the whole trick. All processing is local.',
  },
  {
    name: 'Kliniektarieven',
    kind: 'Client',
    href: 'https://kliniektarieven.nl',
    hrefLabel: 'kliniektarieven.nl',
    stack: ['WordPress', 'PHP', 'MySQL'],
    problem:
      'A Dutch clinic price comparison network. Provider listings, geographic search and structured quote requests routed to the right clinic. Built by me and still run by me, which means every performance and data decision comes back to me eventually.',
  },
  {
    name: 'Klustarief and Schildertarief',
    kind: 'Client',
    href: 'https://klustarief.nl',
    hrefLabel: 'klustarief.nl',
    stack: ['WordPress', 'PHP'],
    problem:
      'The same comparison model applied to two other Dutch trades. The interesting work was making one codebase serve three verticals without forking it three ways.',
  },
  {
    name: 'CarPartHQ',
    kind: 'Client',
    href: 'https://carparthq.com',
    hrefLabel: 'carparthq.com',
    stack: ['WordPress', 'WooCommerce', 'PHP'],
    problem:
      'An auto parts marketplace where a part has to be matched to make, model, year and trim before it can be sold. The compatibility matrix is the product; the storefront is the easy half.',
  },
  {
    name: 'Dubai legal services network',
    kind: 'Client',
    href: 'https://dubainotaryservices.com',
    hrefLabel: 'dubainotaryservices.com',
    stack: ['WordPress', 'PHP'],
    problem:
      'Eight WordPress sites for a single client, run as one estate rather than eight projects. Shared plugin and template work, one update path, and content that had to stay distinct per domain for search without diverging in code.',
  },
  {
    name: 'CPC Clue',
    kind: 'Client',
    href: 'https://cpcclue.com',
    hrefLabel: 'cpcclue.com',
    stack: ['WordPress', 'JavaScript'],
    problem:
      'A suite of browser-based calculators producing live results. Getting the arithmetic right was straightforward; keeping every input, unit and rounding rule consistent across a dozen calculators was not.',
  },
  {
    name: 'Silkosoft',
    kind: 'Client',
    href: 'https://silkosoft.com',
    hrefLabel: 'silkosoft.com',
    stack: ['WordPress', 'PHP'],
    problem:
      'A software agency site with a deep service architecture. Mostly an information design problem: many services, several audiences, one navigation that had to hold all of it.',
  },
  {
    name: 'Security remediation at scale',
    kind: 'Engagement',
    href: null,
    hrefLabel: null,
    stack: ['Incident response', 'Hardening'],
    problem:
      'Malware cleanup, vulnerability patching and post-incident recovery across roughly ninety client sites on an agency hosting platform. Cleaning one compromised site is routine. Doing it across ninety without reinfecting the ones already cleaned is the actual problem.',
  },
];
