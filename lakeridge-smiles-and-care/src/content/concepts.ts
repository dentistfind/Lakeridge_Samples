export type ConceptId = "a" | "b" | "c";

export type SectionKey =
  | "hero"
  | "emergencyBar"
  | "pathways"
  | "serviceExplainer"
  | "why"
  | "dentists"
  | "firstVisit"
  | "trust"
  | "faq"
  | "location";

export type Concept = {
  id: ConceptId;
  name: string;
  title: string;
  idea: string;
  emphasis: string;
  order: SectionKey[];
  pathwayCoverage: string;
  benefit: string;
  tradeoff: string;
  gaps: string;
  typeNote: string;
};

export const CONCEPTS: Record<ConceptId, Concept> = {
  a: {
    id: "a",
    name: "Concept A",
    title: "Familiar, Modern Family Care",
    idea: "Lead with the people, the neighbourhood, and reassurance about a first visit.",
    emphasis: "Families and people who have been away from the dentist and want to feel welcome first.",
    order: ["hero", "dentists", "why", "pathways", "firstVisit", "trust", "faq", "location"],
    pathwayCoverage: "Family, emergency, implants, and CDCP shown as cards after the team introduction.",
    benefit: "Builds personal trust early, which suits nervous or returning patients.",
    tradeoff: "Depends heavily on authentic team photography. Emergency visitors scroll further for the pathway cards (header phone remains).",
    gaps: "Approved dentist photos and a short approved welcome from the owners.",
    typeNote: "Fraunces and Nunito Sans, botanical green, centred photo opening and paired portrait cards.",
  },
  b: {
    id: "b",
    name: "Concept B",
    title: "Clear Pathways, Easy Next Step",
    idea: "Ask what the visitor needs, then route them to the right next step in one move.",
    emphasis: "Visitors with a specific task: urgent pain, booking a family checkup, or a coverage question.",
    order: ["emergencyBar", "hero", "firstVisit", "dentists", "why", "faq", "trust", "location"],
    pathwayCoverage: "All four pathways appear inside the opening, with an emergency phone strip above it.",
    benefit: "Shortest route from arrival to request or phone call. Easiest to scan on a phone.",
    tradeoff: "A more direct, task-led design. The carousel needs accessible controls and restrained movement.",
    gaps: "Confirmed emergency availability wording and approved phone activation.",
    typeNote: "Public Sans, crisp white and ocean blue, photo carousel with dot indicators and compact horizontal team cards.",
  },
  c: {
    id: "c",
    name: "Concept C",
    title: "Confidence in Your Next Visit",
    idea: "Explain treatment options and what a consultation involves before asking for a decision.",
    emphasis: "Visitors researching a specific treatment such as implants, crowns, or aligners.",
    order: ["hero", "serviceExplainer", "dentists", "firstVisit", "pathways", "faq", "why", "trust", "location"],
    pathwayCoverage: "Treatment explainer first, then family, emergency, and CDCP routes as a dedicated strip.",
    benefit: "Answers treatment questions up front and frames the consultation clearly.",
    tradeoff: "Longer reading path. Relies on approved provider details for each service.",
    gaps: "Implant provider and referral process, CDCP participation, treatment photography.",
    typeNote: "Newsreader and IBM Plex Sans, white with plum and sage accents, split-screen opening and editorial portrait rows.",
  },
};

export const CONCEPT_IDS: ConceptId[] = ["a", "b", "c"];

export const isConceptId = (v: string): v is ConceptId => v === "a" || v === "b" || v === "c";

export const SECTION_RATIONALE: Record<SectionKey, { question: string; requirement: string; needs: string }> = {
  hero: { question: "Is this the right dentist for me, here in Peterborough?", requirement: "Opening: explain the practice and local relevance, one primary action.", needs: "Headline approval, authentic photo." },
  emergencyBar: { question: "I am in pain. How do I reach someone now?", requirement: "Emergency phone access near the beginning (Concept B).", needs: "Phone activation approval." },
  pathways: { question: "Where do I go for what I need?", requirement: "Patient pathways in normal content, not a carousel.", needs: "Confirm priority services." },
  serviceExplainer: { question: "What does treatment actually involve?", requirement: "Service explanation and consultation guidance (Concept C).", needs: "Provider details per service." },
  why: { question: "Why choose this practice over another?", requirement: "Small number of supportable distinctions.", needs: "Owner confirmation of each point." },
  dentists: { question: "Who will I see?", requirement: "Approved names and roles only. No invented bios.", needs: "Photographs, optional approved bios." },
  firstVisit: { question: "What happens after I ask for an appointment?", requirement: "Request, office confirmation, preparation, next steps.", needs: "Confirm actual office process." },
  trust: { question: "Can I trust what I am reading?", requirement: "Attributable evidence only. No invented reviews.", needs: "Approved testimonials or affiliations." },
  faq: { question: "Practical questions before calling.", requirement: "Every answer addresses its question.", needs: "Office review of answers." },
  location: { question: "Where are you and when are you open?", requirement: "Approved practical details and closing action.", needs: "Confirm hours and access wording." },
};
