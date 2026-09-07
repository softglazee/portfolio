import Hero from './sections/Hero';
import WordPressOrg from './sections/WordPressOrg';
import Work from './sections/Work';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

const nav = [
  { id: 'wporg', label: 'WordPress.org' },
  { id: 'portfolio', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-card focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-ink-100"
      >
        Skip to content
      </a>

      <header className="border-b border-ink-800">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-5 py-4 md:px-8">
          <a href="#hero" className="font-display text-base font-semibold text-ink-100">
            Azhar Ali
          </a>
          <nav aria-label="Sections">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="text-sm text-ink-400 transition-colors hover:text-ochre-400"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        <Hero />
        <WordPressOrg />
        <Work />
        <Experience />
      </main>

      <Contact />
    </>
  );
}
