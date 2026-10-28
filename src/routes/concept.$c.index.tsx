import { createFileRoute } from "@tanstack/react-router";
import { HomeSections } from "@/components/concept/Sections";
import { CONCEPTS, isConceptId } from "@/content/concepts";

export const Route = createFileRoute("/concept/$c/")({
  head: ({ params }) => {
    const t = isConceptId(params.c) ? `${CONCEPTS[params.c].name}: ${CONCEPTS[params.c].title}` : "Concept";
    const d = "Family dental care in Peterborough. Lakeridge Dentistry website concept homepage.";
    return {
      meta: [
        { title: `Lakeridge Dentistry | ${t}` },
        { name: "description", content: d },
        { property: "og:title", content: `Lakeridge Dentistry | ${t}` },
        { property: "og:description", content: d },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: Home,
});

function Home() {
  const { c } = Route.useParams();
  if (!isConceptId(c)) return null;
  return <HomeSections c={c} order={CONCEPTS[c].order} />;
}
