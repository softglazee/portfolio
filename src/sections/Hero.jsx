import { profile } from '../data/profile';

export default function Hero() {
  return (
    <section id="hero" className="mx-auto w-full max-w-5xl px-5 pb-16 pt-20 md:px-8 md:pb-24 md:pt-32">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        <img
          src="/profile.jpg"
          alt=""
          width="112"
          height="112"
          decoding="async"
          className="h-24 w-24 flex-shrink-0 rounded-card object-cover md:h-28 md:w-28"
        />
        <div>
          <h1 className="font-display text-4xl font-semibold text-ink-50">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg text-ochre-400">{profile.role}</p>
          <p className="mt-1 text-sm text-ink-500">
            {profile.location} &middot; {profile.timezone}
          </p>
          <p className="mt-6 max-w-measure text-base text-ink-300">{profile.intro}</p>
          <nav aria-label="Profiles" className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
            {profile.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-300 underline decoration-ink-600 underline-offset-4 transition-colors hover:text-ochre-400 hover:decoration-ochre-400"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
