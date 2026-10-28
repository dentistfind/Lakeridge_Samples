import { createFileRoute, Link } from "@tanstack/react-router";
import { CONCEPTS, CONCEPT_IDS } from "@/content/concepts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lakeridge Dentistry | Website concept comparison" },
      { name: "description", content: "Compare three website concepts for Lakeridge Dentistry in Peterborough." },
      { property: "og:title", content: "Lakeridge Dentistry | Website concept comparison" },
      { property: "og:description", content: "Three website directions built on one shared content model." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Compare,
});

const LABELS: Record<string, string> = {
  hero: "Opening", emergencyBar: "Emergency strip", pathways: "Pathways", serviceExplainer: "Treatment explainer",
  why: "Why Lakeridge", dentists: "Dentists", firstVisit: "First visit", trust: "Trust", faq: "Questions", location: "Location",
};

const CATEGORIES = ["Navigation and routes", "Pathway clarity", "Request journey", "Mobile layout", "Content accuracy", "Accessibility basics"];

function Compare() {
  return (
    <main className="container-page py-12">
      <p className="eyebrow">Internal presentation · not patient-facing</p>
      <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">Lakeridge Dentistry website concepts</h1>
      <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
        Three directions built on the same practice facts, pages, and components. They differ in what a visitor meets first and how they reach a request or phone call. All palettes and type are provisional.
      </p>
      <div className="mt-4"><Link to="/notes" className="btn btn-outline">Presenter rationale, content register, and handoff</Link></div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {CONCEPT_IDS.map((id) => {
          const k = CONCEPTS[id];
          return (
            <article key={id} data-concept={id} className="card-surface flex flex-col bg-background p-6 font-sans text-foreground">
              <p className="eyebrow">{k.name}</p>
              <h2 className="mt-1 text-2xl font-semibold">{k.title}</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div><dt className="font-semibold">Strategic idea</dt><dd className="text-muted-foreground">{k.idea}</dd></div>
                <div><dt className="font-semibold">Visitor emphasis</dt><dd className="text-muted-foreground">{k.emphasis}</dd></div>
                <div>
                  <dt className="font-semibold">Homepage order</dt>
                  <dd><ol className="mt-1 flex flex-wrap gap-1">{k.order.map((s, i) => <li key={s} className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{i + 1}. {LABELS[s]}</li>)}</ol></dd>
                </div>
                <div><dt className="font-semibold">Pathway coverage</dt><dd className="text-muted-foreground">{k.pathwayCoverage}</dd></div>
                <div><dt className="font-semibold">Intended benefit</dt><dd className="text-muted-foreground">{k.benefit}</dd></div>
                <div><dt className="font-semibold">Tradeoff</dt><dd className="text-muted-foreground">{k.tradeoff}</dd></div>
                <div><dt className="font-semibold">Content gaps</dt><dd className="text-muted-foreground">{k.gaps}</dd></div>
                <div><dt className="font-semibold">Visual treatment</dt><dd className="text-muted-foreground">{k.typeNote}</dd></div>
              </dl>
              <div className="mt-6 flex flex-col gap-2">
                <Link to="/concept/$c" params={{ c: id }} className="btn btn-primary">Open {k.name} homepage</Link>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                  <Link to="/concept/$c/services" params={{ c: id }} className="underline">Services</Link>
                  <Link to="/concept/$c/services/$slug" params={{ c: id, slug: "emergency" }} className="underline">Emergency</Link>
                  <Link to="/concept/$c/services/$slug" params={{ c: id, slug: "dental-implants" }} className="underline">Implants</Link>
                  <Link to="/concept/$c/services/$slug" params={{ c: id, slug: "cdcp" }} className="underline">CDCP</Link>
                  <Link to="/concept/$c/team" params={{ c: id }} className="underline">Team</Link>
                  <Link to="/concept/$c/contact" params={{ c: id }} className="underline">Contact</Link>
                  <Link to="/concept/$c/request" params={{ c: id }} className="underline">Request</Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Assessment by category</h2>
        <p className="mt-1 text-muted-foreground">No conversion winner is claimed. Scores are not given where checks have not been completed with real users or the practice.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[36rem] border text-left text-sm">
            <thead className="bg-muted"><tr><th className="p-3">Category</th>{CONCEPT_IDS.map((id) => <th key={id} className="p-3">{CONCEPTS[id].name}</th>)}</tr></thead>
            <tbody>
              {CATEGORIES.map((cat) => (
                <tr key={cat} className="border-t">
                  <th scope="row" className="p-3 font-medium">{cat}</th>
                  {CONCEPT_IDS.map((id) => <td key={id} className="p-3 text-muted-foreground">{cat === "Navigation and routes" || cat === "Request journey" ? "Links and demo form checked in preview" : "Not yet verified"}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
