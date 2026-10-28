import { createFileRoute } from "@tanstack/react-router";
import { Dentists, FirstVisit, SectionHead } from "@/components/concept/Sections";
import { isConceptId } from "@/content/concepts";

export const Route = createFileRoute("/concept/$c/team")({
  head: () => ({
    meta: [
      { title: "Our Team | Lakeridge Dentistry concept" },
      { name: "description", content: "Meet Dr. Varun Arora and Dr. Mridula Arora, owners of Lakeridge Dentistry in Peterborough." },
      { property: "og:title", content: "Our Team | Lakeridge Dentistry concept" },
      { property: "og:description", content: "Meet the dentists behind Lakeridge Dentistry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Team,
});

function Team() {
  const { c } = Route.useParams();
  if (!isConceptId(c)) return null;
  return (
    <>
      <section className="container-page pt-14">
        <SectionHead page eyebrow="Our team" title="A family-owned practice on Romaine Street" />
        <div className="prose-body mt-6 max-w-3xl text-lg">
          <p>Lakeridge Dentistry started in Peterborough over 30 years ago and has been at the same location ever since. It is now owned by the husband and wife team of Dr. Varun Arora and Dr. Mridula Arora.</p>
          <p>We know not everyone looks forward to the dentist. Whether it has been years since your last visit or you come in regularly, we respect your comfort level, your time, and your privacy, and we explain each step of your care.</p>
        </div>
      </section>
      <Dentists c={c} heading={false} />
      <section className="container-page pb-6">
        <p className="text-muted-foreground">Hygienist and front office team details will be added once names and photos are approved.</p>
      </section>
      <FirstVisit c={c} />
    </>
  );
}
