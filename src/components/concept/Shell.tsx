import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, Phone, X, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/lakeridge-logo.png.asset.json";
import { PRACTICE } from "@/content/practice";
import { CONCEPTS, type ConceptId } from "@/content/concepts";

export function InactivePhone({ compact = false }: { compact?: boolean }) {
  return (
    <span
      role="button"
      aria-disabled="true"
      tabIndex={0}
      title="Phone link is inactive in this concept until activation is approved"
      className="btn btn-inactive"
    >
      <Phone aria-hidden className="size-4" />
      <span>
        {compact ? PRACTICE.phone : `Call ${PRACTICE.phone}`}
        <span className="sr-only"> (call link inactive in concept)</span>
      </span>
      {!compact && <span className="note-chip">Inactive in concept</span>}
    </span>
  );
}

export function RequestLink({ c, service, label = "Request an Appointment", variant = "primary" }: { c: ConceptId; service?: string; label?: string; variant?: "primary" | "outline" }) {
  return (
    <Button asChild variant={variant === "outline" ? "outline" : "default"} className={`btn btn-${variant}`}><Link to="/concept/$c/request" params={{ c }} search={service ? { service } : {}}>
      {label}
    </Link></Button>
  );
}

const NAV = [
  { to: "/concept/$c/services", label: "Services" },
  { to: "/concept/$c/team", label: "Our Team" },
  { to: "/concept/$c/contact", label: "Contact" },
] as const;

export function ConceptShell({ c, children }: { c: ConceptId; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const concept = CONCEPTS[c];
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div data-concept={c} className="min-h-screen bg-background font-sans text-foreground">
      <div className="bg-note text-note-foreground">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 py-1.5 text-xs">
          <span>
            Website concept preview: {concept.name}, {concept.title}. Not the live practice website.
          </span>
          <Link to="/" className="font-semibold underline underline-offset-2">
            Back to comparison
          </Link>
        </div>
      </div>
      <div className="contact-strip">
        <div className="container-page contact-strip-inner">
          <span className="contact-address"><MapPin aria-hidden className="size-3.5 shrink-0" />{PRACTICE.address.street}, {PRACTICE.city}</span>
          <span className="contact-email" title="Email action inactive in this concept"><Mail aria-hidden className="size-3.5 shrink-0" />{PRACTICE.email}</span>
          <span title="Call action inactive in this concept"><Phone aria-hidden className="size-3.5 shrink-0" />{PRACTICE.phone}</span>
        </div>
      </div>
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="container-page main-header flex items-center justify-between gap-4 py-4">
          <Link to="/concept/$c" params={{ c }} className="brand-logo" aria-label="Lakeridge Dentistry home">
            <img src={logo.url} alt="Lakeridge Dentistry sailboat logo" width={594} height={151} />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} params={{ c }} className="font-medium hover:text-primary" activeProps={{ className: "text-primary underline underline-offset-8" }}>
                {n.label}
              </Link>
            ))}
            <RequestLink c={c} />
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <span className="mobile-request text-sm [&_.btn]:px-3"><RequestLink c={c} label="Appointment" /></span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-11 shrink-0"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </Button>
          </div>
        </div>
        {open && (
          <nav id="mobile-menu" aria-label="Mobile" className="border-t bg-background md:hidden">
            <div className="container-page flex flex-col gap-1 py-3">
              <Link to="/concept/$c" params={{ c }} onClick={() => setOpen(false)} className="rounded-md px-2 py-3 font-medium hover:bg-muted">
                Home
              </Link>
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} params={{ c }} onClick={() => setOpen(false)} className="rounded-md px-2 py-3 font-medium hover:bg-muted">
                  {n.label}
                </Link>
              ))}
              <div className="pt-2">
                <InactivePhone />
              </div>
            </div>
          </nav>
        )}
      </header>
      <main id="main">{children}</main>
      <Footer c={c} />
    </div>
  );
}

function Footer({ c }: { c: ConceptId }) {
  return (
    <footer className="mt-16 border-t bg-muted">
      <div className="container-page grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <img src={logo.url} alt="Lakeridge Dentistry" width={594} height={151} className="footer-logo" />
          <address className="mt-2 not-italic text-muted-foreground">
            {PRACTICE.address.street}
            <br />
            {PRACTICE.address.city}, {PRACTICE.address.region} {PRACTICE.address.postal}
          </address>
          <p className="mt-2 text-muted-foreground">
            {PRACTICE.phone} · {PRACTICE.email}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow">Pages</p>
          <ul className="mt-2 space-y-1">
            <li><Link to="/concept/$c" params={{ c }} className="hover:underline">Home</Link></li>
            <li><Link to="/concept/$c/services" params={{ c }} className="hover:underline">Services</Link></li>
            <li><Link to="/concept/$c/team" params={{ c }} className="hover:underline">Our Team</Link></li>
            <li><Link to="/concept/$c/contact" params={{ c }} className="hover:underline">Contact</Link></li>
            <li><Link to="/concept/$c/request" params={{ c }} className="hover:underline">Request an Appointment</Link></li>
          </ul>
        </nav>
        <div>
          <p className="eyebrow">Access</p>
          <p className="mt-2 text-sm text-muted-foreground">{PRACTICE.accessibility}</p>
        </div>
      </div>
    </footer>
  );
}
