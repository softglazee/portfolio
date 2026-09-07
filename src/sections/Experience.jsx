import Section from '../components/Section';
import { roles, coreWork, stack, education } from '../data/experience';

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="mb-12 rounded-card border border-ink-800 p-5">
        <h3 className="font-display text-lg font-semibold text-ink-100">{coreWork.heading}</h3>
        <p className="mt-2 max-w-measure text-sm text-ink-400">{coreWork.body}</p>
      </div>

      <ol className="space-y-10">
        {roles.map((r) => (
          <li key={r.org}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-lg font-semibold text-ink-100">
                {r.title}, {r.org}
              </h3>
              <span className="font-mono text-xs text-ink-500">{r.when}</span>
            </div>
            <p className="mt-1 text-sm text-ink-500">{r.detail}</p>
            <ul className="mt-3 max-w-measure space-y-2">
              {r.points.map((p, i) => (
                <li key={i} className="text-sm text-ink-400">{p}</li>
              ))}
            </ul>
            {r.note && <p className="mt-2 text-sm text-ink-500">{r.note}</p>}
          </li>
        ))}
      </ol>

      <div className="mt-12 space-y-6 border-t border-ink-800 pt-8">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink-200">Stack</h3>
          <p className="mt-2 max-w-measure text-sm text-ink-400">{stack}</p>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-ink-200">Education</h3>
          <p className="mt-2 text-sm text-ink-400">
            {education.degree}, {education.org}.{' '}
            <span className="font-mono text-xs text-ink-500">{education.when}</span> &middot; {education.detail}
          </p>
        </div>
      </div>
    </Section>
  );
}
