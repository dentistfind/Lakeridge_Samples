import { createFileRoute, Link } from "@tanstack/react-router";
import { CONCEPTS, CONCEPT_IDS, SECTION_RATIONALE, type SectionKey } from "@/content/concepts";
import { CONTENT_REGISTER } from "@/content/practice";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Presenter notes and handoff | Lakeridge concepts" },
      { name: "description", content: "Section rationale, content register, and developer handoff for the Lakeridge Dentistry concepts." },
      { property: "og:title", content: "Presenter notes and handoff | Lakeridge concepts" },
      { property: "og:description", content: "Internal notes for the Lakeridge Dentistry website concepts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Notes,
});

const H = ({ children }: { children: React.ReactNode }) => <h2 className="mt-12 text-2xl font-semibold">{children}</h2>;

function Notes() {
  return (
    <main className="container-page py-12">
      <Link to="/" className="underline">Back to comparison</Link>
      <h1 className="mt-4 text-4xl font-semibold">Presenter notes and developer handoff</h1>
      <p className="mt-2 text-muted-foreground">Internal only. Not shown on concept pages.</p>

      <H>Section rationale</H>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[44rem] border text-left text-sm">
          <thead className="bg-muted"><tr><th className="p-3">Section</th><th className="p-3">Patient question</th><th className="p-3">Requirement</th><th className="p-3">Position (A / B / C)</th><th className="p-3">Still needed</th></tr></thead>
          <tbody>
            {(Object.keys(SECTION_RATIONALE) as SectionKey[]).map((k) => (
              <tr key={k} className="border-t align-top">
                <th scope="row" className="p-3">{k}</th>
                <td className="p-3">{SECTION_RATIONALE[k].question}</td>
                <td className="p-3">{SECTION_RATIONALE[k].requirement}</td>
                <td className="p-3">{CONCEPT_IDS.map((id) => { const i = CONCEPTS[id].order.indexOf(k); return i < 0 ? "none" : i + 1; }).join(" / ")}</td>
                <td className="p-3">{SECTION_RATIONALE[k].needs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Position reflects the order on each homepage and why it sits there: A puts people first for reassurance, B puts the task first for speed, C puts treatment understanding first for confidence.</p>

      <H>Route from entry to request or phone</H>
      <ul className="mt-3 list-disc space-y-1 pl-5">
        <li>A: Opening, Request an Appointment button, or Meet our dentists, then pathway card, service page, Request with service filled in.</li>
        <li>B: Emergency strip phone (inactive) or pathway tile in the opening, service page, Request with service filled in.</li>
        <li>C: Treatment explainer, service page with provider and first step, Request with service filled in.</li>
        <li>All: header Request button on every page; phone in mobile menu and every Location block.</li>
      </ul>

      <H>What the client is selecting</H>
      <p className="mt-3">A content priority and section order, plus a general visual direction. The supplied sailboat logo is in use. Final colours, authentic photography, page inventory, production platform, and URLs are later production decisions.</p>

      <H>Content and asset register</H>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[36rem] border text-left text-sm">
          <thead className="bg-muted"><tr><th className="p-3">Item</th><th className="p-3">Status</th><th className="p-3">Source</th></tr></thead>
          <tbody>{CONTENT_REGISTER.map((r) => <tr key={r.item} className="border-t"><td className="p-3 font-medium">{r.item}</td><td className="p-3">{r.status}</td><td className="p-3">{r.source}</td></tr>)}</tbody>
        </table>
      </div>

      <H>Developer handoff</H>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li><strong>Shared components:</strong> ConceptShell (notice bar, upper contact strip, logo header, mobile menu, footer), RequestLink, InactivePhone, illustrative AssetSlot, PhotoHero, and shared home sections. Concept B has a three-photo scrolling carousel with previous, next, pause, and play controls; automatic movement pauses on interaction and honours reduced motion.</li>
        <li><strong>Content model:</strong> one practice file holds facts, services, pathways, FAQ, and the register. Concepts only change order, hero variant, and theme tokens.</li>
        <li><strong>Routes (demo only):</strong> /, /notes, /concept/a|b|c, /services, /services/[family-general, emergency, restorative, cosmetic, dental-implants, cdcp], /team, /contact, /request. Production URLs must follow the accepted inventory and redirect plan.</li>
        <li><strong>Conditional content:</strong> emergency pages lead with phone and label the request as not for urgent pain; CDCP shows a pending notice until participation is confirmed.</li>
        <li><strong>Form behaviour:</strong> ?service= preselects the visit type and remains editable. Client-side validation only. Nothing is transmitted, stored, emailed, or sent to analytics. Success shows the fixed concept response.</li>
        <li><strong>Responsive:</strong> header collapses to Request button plus menu below 768px; grids stack to one column; tables scroll horizontally inside their own container.</li>
        <li><strong>Production needs:</strong> approved phone and email activation, a real form handler with privacy review, authentic approved photography and brand colours, confirmed hours and service facts. Illustrative photos are labelled and do not represent named dentists or the real office.</li>
        <li><strong>Known constraints:</strong> no practice-management integration, real-time scheduling, call tracking, or export method has been built or tested.</li>
      </ul>
    </main>
  );
}
