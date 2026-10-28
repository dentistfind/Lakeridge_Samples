import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Faq } from "@/components/concept/Sections";
import { InactivePhone, RequestLink } from "@/components/concept/Shell";
import { getService } from "@/content/practice";
import { isConceptId } from "@/content/concepts";

export const Route = createFileRoute("/concept/$c/services/$slug")({
  beforeLoad: ({ params }) => {
    if (!getService(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const s = getService(params.slug);
    const t = s ? `${s.name} | Lakeridge Dentistry concept` : "Service unavailable";
    return {
      meta: [
        { title: t },
        { name: "description", content: s?.short ?? "Service not found." },
        { property: "og:title", content: t },
        { property: "og:description", content: s?.short ?? "Service not found." },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { c, slug } = Route.useParams();
  const s = getService(slug);
  if (!s || !isConceptId(c)) return null;
  const urgent = s.slug === "emergency";
  return (
    <>
      <section className={urgent ? "bg-secondary" : ""}>
        <div className="container-page py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/concept/$c/services" params={{ c }} className="hover:underline">Services</Link> / {s.name}
          </nav>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{s.name}</h1>
          <p className="mt-4 max-w-2xl text-lg">{s.intro}</p>
          {s.status === "pending" && <p className="note-chip mt-4">Practice details awaiting confirmation</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            {urgent ? (
              <>
                <InactivePhone />
                <RequestLink c={c} service={s.slug} variant="outline" label="Request an Appointment (not for urgent pain)" />
              </>
            ) : (
              <RequestLink c={c} service={s.slug} />
            )}
          </div>
        </div>
      </section>
      <section className="container-page grid gap-10 py-12 md:grid-cols-[1fr_1.5fr]">
        <div>
          <h2 className="text-2xl font-semibold">Questions patients ask</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
            {s.questions.map((q) => <li key={q}>{q}</li>)}
          </ul>
        </div>
        <div className="prose-body">
          <h2 className="text-2xl font-semibold">What to know</h2>
          {s.explanation.map((p) => <p key={p} className="mt-3">{p}</p>)}
          <h2 className="mt-8 text-2xl font-semibold">Who you will see</h2>
          <p className="mt-3">{s.provider}</p>
          <h2 className="mt-8 text-2xl font-semibold">Your first step</h2>
          <p className="mt-3">{s.firstStep}</p>
        </div>
      </section>
      <Faq items={s.faq} title={`Questions about ${s.name.toLowerCase()}`} />
      <section className="container-page">
        <h2 className="text-xl font-semibold">Related care</h2>
        <ul className="mt-3 flex flex-wrap gap-3">
          {s.related.map((r) => {
            const rs = getService(r)!;
            return (
              <li key={r}>
                <Link to="/concept/$c/services/$slug" params={{ c, slug: r }} className="btn btn-outline">{rs.name}</Link>
              </li>
            );
          })}
        </ul>
        <div className="card-surface mt-10 flex flex-wrap items-center justify-between gap-4 p-6">
          <p className="text-lg font-semibold">{urgent ? "In pain? Calling is the quickest way to reach us." : "Ready to take the first step?"}</p>
          {urgent ? <InactivePhone /> : <RequestLink c={c} service={s.slug} />}
        </div>
      </section>
    </>
  );
}
