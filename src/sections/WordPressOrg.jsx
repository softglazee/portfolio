import Section from '../components/Section';
import { plugins, themes, wporgSummary } from '../data/wporg';

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-card bg-sage-900 px-2 py-1 text-xs text-sage-300">
      <span className="h-1.5 w-1.5 rounded-full bg-sage-300" aria-hidden="true" />
      Live on WordPress.org
    </span>
  );
}

function Entry({ name, version, summary, tags, href, live }) {
  const Wrapper = href ? 'a' : 'div';
  const linkProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : {};
  return (
    <Wrapper
      {...linkProps}
      className={`flex h-full flex-col rounded-card border border-ink-800 p-5 transition-colors ${
        href ? 'hover:border-ochre-400' : ''
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-ink-100">{name}</h3>
        <span className="font-mono text-xs text-ink-500">{version}</span>
      </div>
      <p className="mt-2 flex-1 text-sm text-ink-400">{summary}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {live === false ? (
          <span className="rounded-card border border-ink-700 px-2 py-1 text-xs text-ink-500">
            Coming soon
          </span>
        ) : (
          <LiveBadge />
        )}
        {tags.map((t) => (
          <span key={t} className="text-xs text-ink-500">
            {t}
          </span>
        ))}
      </div>
    </Wrapper>
  );
}

export default function WordPressOrg() {
  return (
    <Section
      id="wporg"
      title="Published on WordPress.org"
      lead={`${wporgSummary.plugins} plugins, a block theme and ${wporgSummary.patterns} patterns in the directory, each one read line by line by the plugin or theme review team before it went live. I am also credited in the WordPress ${wporgSummary.creditsRelease} release, and I review theme submissions for the Themes Team.`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {plugins.map((p) => (
          <Entry
            key={p.slug}
            {...p}
            href={`https://wordpress.org/plugins/${p.slug}/`}
          />
        ))}
      </div>

      <h3 className="mt-12 font-display text-lg font-semibold text-ink-200">Themes</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {themes.map((t) => (
          <Entry
            key={t.name}
            {...t}
            href={t.slug ? `https://wordpress.org/themes/${t.slug}/` : null}
          />
        ))}
      </div>

      <p className="mt-10 text-sm text-ink-400">
        Verify any of it:{' '}
        <a href={wporgSummary.profileUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-ink-600 underline-offset-4 transition-colors hover:text-ochre-400">profile</a>,{' '}
        <a href={wporgSummary.creditsUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-ink-600 underline-offset-4 transition-colors hover:text-ochre-400">7.1 credits</a>,{' '}
        <a href={wporgSummary.patternsUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-ink-600 underline-offset-4 transition-colors hover:text-ochre-400">patterns</a>,{' '}
        <a href={wporgSummary.coreTicketUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-ink-600 underline-offset-4 transition-colors hover:text-ochre-400">ticket #65802</a>.
      </p>
    </Section>
  );
}
