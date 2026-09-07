export default function Section({ id, title, lead, children }) {
  return (
    <section id={id} className="border-t border-ink-800 py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink-100">
          {title}
        </h2>
        {lead && (
          <p className="mt-3 max-w-measure text-base text-ink-400">{lead}</p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
