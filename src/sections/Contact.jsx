import { profile } from '../data/profile';

export default function Contact() {
  return (
    <footer id="contact" className="border-t border-ink-800 py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <h2 className="font-display text-2xl font-semibold text-ink-100 md:text-3xl">
          Get in touch
        </h2>
        <p className="mt-3 max-w-measure text-base text-ink-400">
          Open to full-time remote roles. I work US and European hours from Pakistan, so overlap is
          not a problem, and I can be engaged through an employer of record or as a contractor
          invoicing in USD or EUR.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <a
            href={`mailto:${profile.email}`}
            className="text-base text-ochre-400 underline decoration-ochre-700 underline-offset-4 transition-colors hover:decoration-ochre-400"
          >
            {profile.email}
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            className="text-base text-ink-300 underline decoration-ink-600 underline-offset-4 transition-colors hover:text-ochre-400"
          >
            {profile.phone}
          </a>
        </div>
        <p className="mt-12 text-sm text-ink-500">
          Built by {profile.name}. Source on{' '}
          <a href="https://github.com/softglazee/portfolio" target="_blank" rel="noopener noreferrer" className="underline decoration-ink-600 underline-offset-4 transition-colors hover:text-ochre-400">GitHub</a>.
        </p>
      </div>
    </footer>
  );
}
