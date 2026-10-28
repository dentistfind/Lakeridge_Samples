import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { Info } from "lucide-react";
import { SectionHead } from "@/components/concept/Sections";
import { InactivePhone } from "@/components/concept/Shell";
import { DEMO_RESPONSE, SERVICES } from "@/content/practice";
import { emptyRequest, validateRequest, type RequestErrors, type RequestValues } from "@/lib/request-form";

type Search = { service?: string | undefined };

export const Route = createFileRoute("/concept/$c/request")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    service: typeof s["service"] === "string" && SERVICES.some((x) => x.slug === s["service"]) ? s["service"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Request an Appointment | Lakeridge Dentistry concept" },
      { name: "description", content: "Preview of the Lakeridge Dentistry appointment request journey." },
      { property: "og:title", content: "Request an Appointment | Lakeridge Dentistry concept" },
      { property: "og:description", content: "Appointment request preview for Lakeridge Dentistry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RequestPage,
});

function Field({ id, label, error, children, hint }: { id: string; label: string; error?: string | undefined; hint?: string | undefined; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">{label}</label>
      {hint && <p id={`${id}-hint`} className="text-sm text-muted-foreground">{hint}</p>}
      <div className="mt-1">{children}</div>
      {error && <p id={`${id}-error`} className="mt-1 text-sm font-semibold text-destructive">{error}</p>}
    </div>
  );
}

const inputCls = "w-full min-h-11 rounded-md border border-input bg-card px-3 py-2";

function RequestPage() {
  const { service } = Route.useSearch();
  const [v, setV] = useState<RequestValues>(() => emptyRequest(service ?? ""));
  const [errors, setErrors] = useState<RequestErrors>({});
  const [done, setDone] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const set = <K extends keyof RequestValues>(k: K, val: RequestValues[K]) => setV((p) => ({ ...p, [k]: val }));
  const aria = (k: keyof RequestValues) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  function submit(e: FormEvent) {
    e.preventDefault();
    const errs = validateRequest(v);
    setErrors(errs);
    // Nothing is sent, stored, or tracked. Demo only.
    setDone(Object.keys(errs).length === 0);
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  return (
    <section className="container-page py-14">
      <SectionHead page eyebrow="Request an Appointment" title="Tell us how to reach you" intro="Our office will contact you to confirm a time. A request does not book an appointment." />
      <div className="mt-4 flex items-start gap-2 rounded-md bg-note p-3 text-sm text-note-foreground">
        <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
        <p>Concept preview: this form does not send or save anything. For tooth pain or an emergency, please call the office instead.</p>
      </div>

      <div ref={summaryRef} tabIndex={-1} aria-live="polite" className="mt-6 outline-none">
        {done && (
          <div className="card-surface border-primary p-5">
            <p className="text-lg font-semibold">{DEMO_RESPONSE}</p>
            <button type="button" className="btn btn-outline mt-4" onClick={() => setDone(false)}>Edit request</button>
          </div>
        )}
        {!done && Object.keys(errors).length > 0 && (
          <p className="rounded-md border border-destructive p-3 font-semibold text-destructive">Please fix the {Object.keys(errors).length} highlighted item(s) below.</p>
        )}
      </div>

      {!done && (
        <form noValidate onSubmit={submit} className="mt-6 grid max-w-2xl gap-5">
          <Field id="service" label="Kind of visit" error={errors["service"]} hint={service ? "Filled in from the page you came from. You can change it." : undefined}>
            <select id="service" className={inputCls} value={v.service} onChange={(e) => set("service", e.target.value)} {...aria("service")}>
              <option value="">Choose one</option>
              {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
              <option value="not-sure">Not sure</option>
            </select>
          </Field>
          <fieldset>
            <legend className="font-semibold">Are you new to Lakeridge Dentistry?</legend>
            <div className="mt-2 flex flex-wrap gap-4">
              {(["new", "returning"] as const).map((t) => (
                <label key={t} className="flex min-h-11 items-center gap-2">
                  <input type="radio" name="patientType" checked={v.patientType === t} onChange={() => set("patientType", t)} className="size-5" />
                  {t === "new" ? "New patient" : "Returning patient"}
                </label>
              ))}
            </div>
            {errors.patientType && <p id="patientType-error" className="mt-1 text-sm font-semibold text-destructive">{errors.patientType}</p>}
          </fieldset>
          <Field id="name" label="Your name" error={errors.name}>
            <input id="name" autoComplete="name" className={inputCls} value={v.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />
          </Field>
          <fieldset>
            <legend className="font-semibold">How should we contact you?</legend>
            <div className="mt-2 flex gap-4">
              {(["phone", "email"] as const).map((m) => (
                <label key={m} className="flex min-h-11 items-center gap-2">
                  <input type="radio" name="contactMethod" checked={v.contactMethod === m} onChange={() => set("contactMethod", m)} className="size-5" />
                  {m === "phone" ? "Phone" : "Email"}
                </label>
              ))}
            </div>
          </fieldset>
          {v.contactMethod === "phone" ? (
            <Field id="phone" label="Phone number" error={errors.phone}>
              <input id="phone" type="tel" autoComplete="tel" className={inputCls} value={v.phone} onChange={(e) => set("phone", e.target.value)} {...aria("phone")} />
            </Field>
          ) : (
            <Field id="email" label="Email address" error={errors.email}>
              <input id="email" type="email" autoComplete="email" className={inputCls} value={v.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />
            </Field>
          )}
          <Field id="preferredTime" label="Best time to reach you (optional)">
            <select id="preferredTime" className={inputCls} value={v.preferredTime} onChange={(e) => set("preferredTime", e.target.value)}>
              <option value="">No preference</option>
              <option>Morning</option>
              <option>Afternoon</option>
            </select>
          </Field>
          <Field id="note" label="Anything we should know? (optional)" hint="Please do not include detailed health information.">
            <textarea id="note" rows={3} className={inputCls} value={v.note} onChange={(e) => set("note", e.target.value)} aria-describedby="note-hint" />
          </Field>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="btn btn-primary">Preview Appointment Request</button>
            <InactivePhone />
          </div>
        </form>
      )}
    </section>
  );
}
