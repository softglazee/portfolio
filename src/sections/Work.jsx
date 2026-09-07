import Section from '../components/Section';
import { work } from '../data/work';

export default function Work() {
  return (
    <Section
      id="portfolio"
      title="Selected work"
      lead="Ten of them, chosen because each one had a problem worth describing. The rest were competent and unremarkable."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {work.map((w) => (
          <li key={w.name} className="flex h-full flex-col rounded-card border border-ink-800 p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-lg font-semibold text-ink-100">{w.name}</h3>
              <span className="text-xs text-ink-500">{w.kind}</span>
            </div>
            <p className="mt-2 flex-1 text-sm text-ink-400">{w.problem}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              {w.stack.map((s) => (
                <span key={s} className="font-mono text-xs text-ink-500">{s}</span>
              ))}
            </div>
            {w.href && (
              <a
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-sm text-ochre-400 underline decoration-ochre-700 underline-offset-4 transition-colors hover:decoration-ochre-400"
              >
                {w.hrefLabel}
              </a>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
