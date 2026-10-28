import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "@/components/concept/Sections";
import { SERVICES } from "@/content/practice";
import { isConceptId } from "@/content/concepts";

export const Route = createFileRoute("/concept/$c/services/")({
  head: () => ({
    meta: [
      { title: "Services | Lakeridge Dentistry concept" },
      { name: "description", content: "Family, emergency, restorative, cosmetic, and implant dental care in Peterborough." },
      { property: "og:title", content: "Services | Lakeridge Dentistry concept" },
      { property: "og:description", content: "Dental care options for every age at Lakeridge Dentistry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Services,
});

function Services() {
  const { c } = Route.useParams();
  if (!isConceptId(c)) return null;
  return (
    <section className="container-page py-14">
      <SectionHead page eyebrow="Services" title="Dental care for kids through seniors" intro="Choose a topic to see what it involves and how to take the first step." />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <li key={s.slug} className="card-surface flex flex-col p-6">
            <h2 className="text-2xl font-semibold">{s.name}</h2>
            <p className="mt-2 flex-1 text-muted-foreground">{s.short}</p>
            <Link to="/concept/$c/services/$slug" params={{ c, slug: s.slug }} className="mt-4 inline-flex min-h-11 items-center gap-1 font-semibold text-primary hover:underline">
              Read more <ArrowRight aria-hidden className="size-4" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
