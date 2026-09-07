// Dates, titles and the degree match the CV exactly. Nothing here is rounded up.

export const roles = [
  {
    title: 'Founder and lead full-stack developer',
    org: 'SoftGlaze',
    detail: 'Self-employed, remote',
    when: 'Mar 2022 to present',
    note: 'Part-time alongside REBORN until Dec 2023, full-time since.',
    points: [
      'Author and maintain eight plugins and a block theme on the WordPress.org directory, every one through the plugin and theme teams manual code review.',
      'Review theme submissions for the WordPress.org Themes Team as an assigned reviewer, applying the team published requirements and writing the findings up for the author.',
      'Build and maintain WordPress, WooCommerce and custom PHP, Laravel and React work for clients in the UK, the Netherlands, Spain and Pakistan.',
    ],
  },
  {
    title: 'WordPress developer',
    org: 'REBORN',
    detail: 'Full-time, remote',
    when: 'Jan 2022 to Dec 2023',
    note: null,
    points: [
      'Built and maintained WordPress sites for the agency and its clients: custom theme work, plugin configuration and conflict resolution, and page speed.',
      'Handled support and fixes on live sites carrying real traffic, where changes had to be made without taking anything down.',
    ],
  },
  {
    title: 'Web developer',
    org: 'Creative Chaos',
    detail: 'Started as an intern, retained as a developer. Remote',
    when: 'Aug 2019 to Jul 2021',
    note: null,
    points: [
      'Built pages from designs and wrote PHP and JavaScript for features on client sites and web applications.',
      'Fixed defects raised in testing and by clients, and learned delivery from brief through to launch.',
    ],
  },
];

export const coreWork = {
  heading: 'WordPress core',
  body:
    'Credited in the WordPress 7.1 release on six changesets, mostly for testing and verifying other contributors patches. One of them shipped a PHPUnit regression test I wrote at a committer request. Separately I found a core function that had been assigning to an undeclared variable since 2024, which meant both of its hooks had silently done nothing for about two years. I proved it with a controlled reproduction, opened a pull request with a one line fix and two red-green unit tests, and a core committer took ownership and milestoned it for 7.2.',
};

// Replaces the deleted "stack" section. One line of prose, not a grid of logos.
export const stack =
  'Daily: WordPress, PHP, WooCommerce, MySQL and JavaScript. Regularly: Laravel, React, TypeScript, Node, Electron and Shopify. Tooling: PHPUnit, PHPCS in CI, Git, Docker, WP-CLI and Composer.';

export const education = {
  degree: 'BS Information Technology',
  org: 'The Islamia University of Bahawalpur',
  when: '2012 to 2016',
  detail: 'Grade A+',
};
