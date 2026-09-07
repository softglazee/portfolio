# Portfolio

Interactive developer portfolio and CV for Azhar Ali, WordPress and PHP engineer in Multan, Pakistan.

Live at **[azhar.softglaze.com](https://azhar.softglaze.com)**

## What it is

A single-page React application that doubles as a browsable portfolio and a print-ready CV. It includes an interactive terminal, a filterable project gallery, a work timeline, and a print stylesheet that produces a clean one-page document straight from the browser.

## Stack

React 19, Vite, Tailwind CSS, Lucide icons. No backend, no tracking, no external data calls.

## Running it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # serve the production build
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site and uploads `dist/` to the web root of azhar.softglaze.com over SSH.

Required repository secrets: `SERVER_HOST`, `SERVER_USER`, `SSH_PRIVATE_KEY`.

## About the content

Everything factual in this site is verifiable against public sources:

- WordPress.org profile: [profiles.wordpress.org/softglaze](https://profiles.wordpress.org/softglaze)
- WordPress 7.1 credits: [credits.wordpress.org/7.1](https://credits.wordpress.org/7.1/)
- Core ticket #65802: [core.trac.wordpress.org/ticket/65802](https://core.trac.wordpress.org/ticket/65802)

## Licence

MIT. See [LICENSE](LICENSE).
