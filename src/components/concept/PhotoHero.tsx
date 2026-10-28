import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRACTICE, PRIORITY_PATHWAYS } from "@/content/practice";
import { IMAGERY } from "@/content/imagery";
import type { ConceptId } from "@/content/concepts";
import { Link } from "@tanstack/react-router";
import { RequestLink } from "./Shell";

const slides = [IMAGERY.family, IMAGERY.checkup, IMAGERY.consultation];

export function PhotoHero({ c }: { c: ConceptId }) {
  const rotating = c === "b";
  const [ref, api] = useEmblaCarousel({ loop: true, active: rotating });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reduced, setReduced] = useState(true);
  const update = useCallback(() => setSelected(api?.selectedScrollSnap() ?? 0), [api]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!api) return;
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api, update]);

  useEffect(() => {
    if (!rotating || !api || paused || interacting || reduced) return;
    const timer = window.setInterval(() => { if (!document.hidden) api.scrollNext(); }, 6000);
    return () => window.clearInterval(timer);
  }, [api, rotating, paused, interacting, reduced]);

  return (
    <>
      <section className={`photo-hero${c === "c" ? " split-hero" : ""}`} aria-label={rotating ? "Lakeridge Dentistry photo carousel" : "Lakeridge Dentistry"}
        aria-roledescription={rotating ? "carousel" : undefined}
        onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
        onFocusCapture={() => setInteracting(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
        <div className="hero-viewport" ref={ref}>
          <div className="hero-track">
            {(rotating ? slides : [c === "c" ? IMAGERY.consultation : IMAGERY.family]).map((image, i) => (
              <div className="hero-slide" key={image.src} role={rotating ? "group" : undefined}
                aria-roledescription={rotating ? "slide" : undefined} aria-label={rotating ? `Photo ${i + 1} of ${slides.length}` : undefined}>
                <img src={image.src} alt={image.alt} width={1536} height={1024} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} />
              </div>
            ))}
          </div>
        </div>
        <div className="hero-shade" />
        <div className="container-page hero-content">
          <p className="hero-eyebrow">Family-owned · Peterborough, Ontario</p>
          <h1>Lakeridge{c === "a" ? " " : <br />}Dentistry<span className="hero-period">.</span></h1>
          <p className="hero-intro">{PRACTICE.headline} {PRACTICE.supporting}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <RequestLink c={c} />
            <Button asChild variant="outline" className="hero-secondary">
              <Link to={c === "a" ? "/concept/$c/team" : "/concept/$c/services"} params={{ c }}>
                {c === "a" ? "Meet our dentists" : "Explore dental care"} <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
        <div className="container-page hero-bottom">
          <span className="hero-image-note">Illustrative photography · Not practice portraits or premises</span>
          {rotating && <div className="carousel-controls">
            <div className="carousel-dots" role="group" aria-label="Choose a photo">
              {slides.map((image, i) => <Button key={image.src} variant="ghost" size="icon" className="carousel-dot" title={`Go to photo ${i + 1}`} aria-label={`Go to photo ${i + 1}`} aria-pressed={selected === i} onClick={() => api?.scrollTo(i)}><span aria-hidden /></Button>)}
            </div>
            <Button variant="ghost" size="icon" title="Previous photo" aria-label="Previous photo" onClick={() => api?.scrollPrev()}><ArrowLeft /></Button>
            <Button variant="ghost" size="icon" title={paused || reduced ? "Play slideshow" : "Pause slideshow"} aria-label={paused || reduced ? "Play slideshow" : "Pause slideshow"} onClick={() => { setPaused(!paused); if (reduced) setReduced(false); }}>{paused || reduced ? <Play /> : <Pause />}</Button>
            <Button variant="ghost" size="icon" title="Next photo" aria-label="Next photo" onClick={() => api?.scrollNext()}><ArrowRight /></Button>
          </div>}
        </div>
      </section>
      {rotating && <section className="hero-pathways border-b bg-background">
        <div className="container-page py-8">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2"><h2 className="text-2xl font-semibold">What do you need today?</h2><span className="eyebrow">Your next step starts here</span></div>
          <ul className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {PRIORITY_PATHWAYS.map((p, i) => <li key={p.slug}>
              <Link to="/concept/$c/services/$slug" params={{ c, slug: p.slug }} className="pathway-tile group">
                <span className="eyebrow">0{i + 1}</span><h3 className="text-lg font-semibold">{p.label}</h3>
                <span className="flex items-center justify-between gap-3 text-sm text-muted-foreground">{p.detail}<ArrowRight className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </Link>
            </li>)}
          </ul>
        </div>
      </section>}
    </>
  );
}