import { createFileRoute } from "@tanstack/react-router";
import { Location, SectionHead } from "@/components/concept/Sections";
import { PRACTICE } from "@/content/practice";
import { isConceptId } from "@/content/concepts";

export const Route = createFileRoute("/concept/$c/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Lakeridge Dentistry concept" },
      { name: "description", content: "Address, hours, and how to reach Lakeridge Dentistry at 234 Romaine St., Peterborough." },
      { property: "og:title", content: "Contact | Lakeridge Dentistry concept" },
      { property: "og:description", content: "Find Lakeridge Dentistry in Peterborough." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { c } = Route.useParams();
  if (!isConceptId(c)) return null;
  return (
    <>
      <section className="container-page pt-14">
        <SectionHead page eyebrow="Contact" title="Visit or reach our office" intro={`Email: ${PRACTICE.email}. Email and phone links are inactive in this concept.`} />
      </section>
      <Location c={c} />
    </>
  );
}
