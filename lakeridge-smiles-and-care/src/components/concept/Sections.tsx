import type React from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, MapPin, Clock } from "lucide-react";
import { FIRST_VISIT, HOME_FAQ, PRACTICE, PRIORITY_PATHWAYS, SERVICES, WHY } from "@/content/practice";
import type { ConceptId, SectionKey } from "@/content/concepts";
import { InactivePhone, RequestLink } from "./Shell";
import { IMAGERY } from "@/content/imagery";
import { PhotoHero } from "./PhotoHero";
import dentalCare from "@/assets/dental-care.jpg";

export function SectionHead({ eyebrow, title, intro, page = false }: { eyebrow?: string | undefined; title: string; intro?: string | undefined; page?: boolean }) {
  const Tag = page ? "h1" : "h2";
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className="mt-1 text-3xl font-semibold sm:text-4xl">{title}</Tag>
      {intro && <p className="mt-3 text-lg text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function AssetSlot({ label, className = "" }: { label: string; className?: string }) {
  const portrait = label.includes("Portrait");
  const image = portrait ? (label.includes("Varun") ? IMAGERY.malePortrait : IMAGERY.femalePortrait) : label.includes("Exterior") ? IMAGERY.family : IMAGERY.room;
  const caption = label.includes("Exterior") ? "Illustrative community photograph · Not the practice exterior" : image.caption;
  return (
    <figure className={`illustrative-photo ${className}`}>
      <img src={image.src} alt={image.alt} width={portrait ? 1024 : 1536} height={portrait ? 1280 : 1024} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function Hero({ c }: { c: ConceptId }) {
  return <PhotoHero c={c} />;
}

function EmergencyBar() {
  return (
    <section aria-label="Dental emergency" className="bg-urgent text-urgent-foreground">
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3">
        <p className="flex items-center gap-2 font-semibold">
          <AlertTriangle aria-hidden className="size-5" /> Tooth pain or a broken tooth? Please call during office hours.
        </p>
        <InactivePhone compact />
      </div>
    </section>
  );
}

function Pathways({ c }: { c: ConceptId }) {
  const title = c === "c" ? "Other ways we can help" : "Find the right care";
  return (
    <section className="container-page pathways-section py-14">
      <SectionHead eyebrow="Patient pathways" title={title} />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PRIORITY_PATHWAYS.map((p) => (
          <li key={p.slug} className="card-surface flex flex-col p-5">
            <h3 className="text-xl font-semibold">{p.label}</h3>
            <p className="mt-2 flex-1 text-muted-foreground">{p.detail}</p>
            <Link to="/concept/$c/services/$slug" params={{ c, slug: p.slug }} className="mt-4 inline-flex min-h-11 items-center gap-1 font-semibold text-primary hover:underline">
              Learn more <ArrowRight aria-hidden className="size-4" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ServiceExplainer({ c }: { c: ConceptId }) {
  const featured = SERVICES.filter((s) => ["dental-implants", "restorative", "cosmetic", "family-general"].includes(s.slug));
  return (
    <section id="treatments" className="border-y bg-muted">
      <div className="container-page py-14">
        <SectionHead eyebrow="Considering treatment?" title="Understand your options before you decide" intro="Each treatment starts with a conversation and an exam. Here are the questions patients ask most." />
        <img src={dentalCare} alt="Illustrative image of a gentle dental checkup" width={1536} height={1024} loading="lazy" className="mt-8 aspect-[3/2] w-full rounded-lg object-cover sm:aspect-[5/2]" />
        <div className="mt-8 divide-y border-y">
          {featured.map((s) => (
            <article key={s.slug} className="grid gap-4 py-6 md:grid-cols-[1fr_1.4fr_auto] md:items-start">
              <h3 className="text-2xl font-medium">{s.name}</h3>
              <div>
                <p>{s.intro}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
                  {s.questions.slice(0, 2).map((q) => <li key={q}>{q}</li>)}
                </ul>
              </div>
              <Link to="/concept/$c/services/$slug" params={{ c, slug: s.slug }} className="btn btn-outline">
                Read about {s.name.toLowerCase()}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="container-page why-section py-14">
      <SectionHead eyebrow="Why Lakeridge" title="What you can expect from us" />
      <dl className="mt-8 grid gap-6 sm:grid-cols-2">
        {WHY.map((w) => (
          <div key={w.title} className="border-l-4 border-primary pl-4">
            <dt className="text-lg font-semibold">{w.title}</dt>
            <dd className="mt-1 text-muted-foreground">{w.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Dentists({ c, heading = true }: { c: ConceptId; heading?: boolean }) {
  return (
    <section className="container-page dentists-section py-14">
      {heading && <SectionHead eyebrow="Our dentists" title="The people behind the practice" intro="Husband and wife team Dr. Varun Arora and Dr. Mridula Arora own Lakeridge Dentistry." />}
      <ul className="dentist-list mt-8 grid gap-6 sm:grid-cols-2">
        {PRACTICE.dentists.map((d) => (
          <li key={d.name} className="dentist-item card-surface overflow-hidden">
            <AssetSlot label={`Portrait of ${d.name}`} className="dentist-portrait aspect-[4/5] rounded-none border-0" />
            <div className="dentist-info p-5">
              <h3 className="text-xl font-semibold">{d.name}</h3>
              <p className="text-muted-foreground">{d.role}</p>
            </div>
          </li>
        ))}
      </ul>
      {heading && (
        <Link to="/concept/$c/team" params={{ c }} className="mt-6 inline-flex min-h-11 items-center gap-1 font-semibold text-primary hover:underline">
          About our team <ArrowRight aria-hidden className="size-4" />
        </Link>
      )}
    </section>
  );
}

export function FirstVisit({ c }: { c: ConceptId }) {
  return (
    <section className="first-visit-section bg-secondary">
      <div className="container-page py-14">
        <SectionHead eyebrow="Your first visit" title="What happens after you reach out" />
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {FIRST_VISIT.map((s, i) => (
            <li key={s.title} className="card-surface p-5">
              <span aria-hidden className="grid size-9 place-items-center rounded-full bg-primary font-bold text-primary-foreground">{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8"><RequestLink c={c} /></div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="container-page py-14">
      <SectionHead eyebrow="In the community" title="Serving Peterborough for over 30 years" intro="The practice has been at the same Romaine Street location for over three decades. Patient reviews will appear here only once they are reviewed and approved for use." />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <AssetSlot label="Exterior of 234 Romaine St." className="aspect-[16/9]" />
        <AssetSlot label="Reception or treatment room" className="aspect-[16/9]" />
      </div>
    </section>
  );
}

export function Faq({ items = HOME_FAQ, title = "Common questions" }: { items?: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="container-page py-14">
      <SectionHead eyebrow="Questions" title={title} />
      <div className="mt-6 max-w-3xl divide-y border-y">
        {items.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 text-lg font-semibold">
              {f.q}
              <span aria-hidden className="text-primary group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Location({ c }: { c: ConceptId }) {
  return (
    <section className="container-page py-14">
      <div className="location-layout grid gap-8 border-y py-10 md:grid-cols-3">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold"><MapPin aria-hidden className="size-5" /> Visit us</h2>
          <address className="mt-3 not-italic">
            {PRACTICE.address.street}<br />
            {PRACTICE.address.city}, {PRACTICE.address.region} {PRACTICE.address.postal}
          </address>
          <p className="mt-3 text-sm text-muted-foreground">{PRACTICE.accessibility}</p>
        </div>
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold"><Clock aria-hidden className="size-5" /> Hours</h2>
          <table className="mt-3 w-full text-sm">
            <tbody>
              {PRACTICE.hours.map((h) => (
                <tr key={h.day}><th scope="row" className="py-0.5 text-left font-medium">{h.day}</th><td className="text-right text-muted-foreground">{h.time}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Ready for your next visit?</h2>
          <RequestLink c={c} />
          <InactivePhone />
        </div>
      </div>
    </section>
  );
}

export function HomeSections({ c, order }: { c: ConceptId; order: SectionKey[] }) {
  const map: Record<SectionKey, () => React.ReactNode> = {
    hero: () => <Hero c={c} />,
    emergencyBar: () => <EmergencyBar />,
    pathways: () => <Pathways c={c} />,
    serviceExplainer: () => <ServiceExplainer c={c} />,
    why: () => <Why />,
    dentists: () => <Dentists c={c} />,
    firstVisit: () => <FirstVisit c={c} />,
    trust: () => <Trust />,
    faq: () => <Faq />,
    location: () => <Location c={c} />,
  };
  return <>{order.map((k) => <div key={k} data-section={k}>{map[k]()}</div>)}</>;
}
