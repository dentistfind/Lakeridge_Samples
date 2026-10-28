/**
 * Single shared content model for all three concepts.
 * Source: published pages at lakeridgedentistry.ca (Home, Our Team, Services,
 * Contact), read Oct 22 2026. Anything not confirmed by the practice is flagged
 * in CONTENT_REGISTER and kept out of patient-facing claims.
 */

export const PRACTICE = {
  name: "Lakeridge Dentistry",
  city: "Peterborough",
  address: { street: "234 Romaine St.", city: "Peterborough", region: "ON", postal: "K9J 2C5" },
  phone: "705-742-0241",
  email: "info@lakeridgedentistry.ca",
  // Published on the Contact page. Needs confirmation before launch.
  hours: [
    { day: "Monday", time: "8:30 AM to 5:00 PM" },
    { day: "Tuesday", time: "8:30 AM to 5:00 PM" },
    { day: "Wednesday", time: "8:30 AM to 5:00 PM" },
    { day: "Thursday", time: "8:30 AM to 5:00 PM" },
    { day: "Friday", time: "8:30 AM to 1:00 PM" },
    { day: "Saturday", time: "Closed" },
    { day: "Sunday", time: "Closed" },
  ],
  accessibility:
    "Please note that our office is not wheelchair accessible. Call us before your visit and we can talk through what will work for you.",
  dentists: [
    { name: "Dr. Varun Arora", role: "Dentist and co-owner" },
    { name: "Dr. Mridula Arora", role: "Dentist and co-owner" },
  ],
  headline: "Family dental care in Peterborough.",
  supporting:
    "Get to know our team, explore dental care options for your family, and contact us to arrange your next visit.",
} as const;

export const DEMO_RESPONSE =
  "This is a website concept. Your request has not been sent and no appointment has been booked.";

export type ServiceSlug =
  | "family-general"
  | "emergency"
  | "restorative"
  | "cosmetic"
  | "dental-implants"
  | "cdcp";

export type Service = {
  slug: ServiceSlug;
  name: string;
  short: string;
  intro: string;
  questions: string[];
  explanation: string[];
  provider: string;
  firstStep: string;
  faq: { q: string; a: string }[];
  related: ServiceSlug[];
  /** "approved-published" = based on live site text; "pending" = needs practice input. */
  status: "published-source" | "pending";
};

export const SERVICES: Service[] = [
  {
    slug: "family-general",
    name: "Family and general care",
    short: "Checkups, cleanings, and X-rays for kids through seniors.",
    intro:
      "Regular visits help us find small problems early, before they turn into bigger ones. We see patients of every age, from a child's first cleaning to care for seniors.",
    questions: [
      "How often should my family come in?",
      "What happens at a routine checkup?",
      "It has been years since my last visit. Is that okay?",
    ],
    explanation: [
      "A routine visit usually includes a cleaning to remove plaque and tartar, a check for cavities and early signs of gum disease, and X-rays when they are needed to see what is not visible on the surface.",
      "Your dentist also looks for changes in your mouth, jaw, and neck that may need a closer look, and will refer you to a doctor or specialist if something should be checked further.",
    ],
    provider:
      "Checkups are provided by our dentists and hygienists. Dr. Varun Arora and Dr. Mridula Arora own and practise at Lakeridge Dentistry.",
    firstStep:
      "Send an appointment request or call the office. Our team will contact you to confirm a time and let you know what to bring.",
    faq: [
      {
        q: "How often should we book a checkup?",
        a: "Many dentists suggest a visit about every six months. Your dentist will recommend a schedule that suits your own oral health.",
      },
      {
        q: "Will I be judged if I have not been in for a long time?",
        a: "No. We make no judgments about how often you have visited. We start from where you are today.",
      },
      {
        q: "Do you see children?",
        a: "Yes. We see patients of all ages, including first dental cleanings for young children.",
      },
    ],
    related: ["restorative", "emergency", "cdcp"],
    status: "published-source",
  },
  {
    slug: "emergency",
    name: "Emergency dental care",
    short: "Pain, a broken tooth, or swelling? Call the office first.",
    intro:
      "If you have tooth pain, a broken tooth, or swelling, the fastest way to reach us is by phone during office hours. We will talk through what is happening and the next available option.",
    questions: [
      "Who do I contact when something hurts?",
      "Can I be seen today?",
      "What should I do outside office hours?",
    ],
    explanation: [
      "Dental emergencies are given priority. Availability depends on the day's schedule, so calling lets our team understand your situation and tell you honestly when we can see you.",
      "A web request is not the right choice for urgent pain, because it is only read during office hours and does not reserve a time.",
    ],
    provider: "Emergency visits are seen by one of our dentists.",
    firstStep:
      "Call the office during business hours. If you have facial swelling that affects breathing or swallowing, or uncontrolled bleeding, go to the nearest emergency department or call 911.",
    faq: [
      {
        q: "Can I be seen the same day?",
        a: "We give dental emergencies priority, and same-day visits may be possible depending on the schedule. Please call so we can tell you what is available.",
      },
      {
        q: "Should I fill out the online request for an emergency?",
        a: "Please call instead. The online request does not book a time and may not be read until later.",
      },
      {
        q: "What if it happens on a weekend?",
        a: "Our office is closed on weekends. For severe symptoms such as swelling that affects breathing, go to the nearest emergency department.",
      },
    ],
    related: ["family-general", "restorative"],
    status: "published-source",
  },
  {
    slug: "restorative",
    name: "Restorative dentistry",
    short: "Fillings, crowns, bridges, root canals, and dentures.",
    intro:
      "Restorative care repairs or replaces teeth that are damaged, decayed, or missing, so you can eat and speak comfortably.",
    questions: [
      "What are my options for a damaged tooth?",
      "Is a crown or a filling better for me?",
      "Do you make dentures?",
    ],
    explanation: [
      "Options range from fillings and crowns to bridges and dentures. Your dentist will explain what each option involves so you can decide together.",
      "The practice uses a dental operating microscope, which gives very high magnification during root canal and restorative procedures.",
    ],
    provider: "Restorative treatment is planned and provided by our dentists.",
    firstStep:
      "Request an appointment for an exam. Your dentist will look at the tooth, explain the options, and answer your questions before any treatment begins.",
    faq: [
      {
        q: "How do I know which option I need?",
        a: "That depends on the tooth and your health. An exam, and sometimes an X-ray, lets your dentist recommend an option and explain why.",
      },
      {
        q: "Do you offer dentures for seniors?",
        a: "Yes. Dentures are one of the restorative services offered at Lakeridge Dentistry.",
      },
    ],
    related: ["dental-implants", "family-general", "cosmetic"],
    status: "published-source",
  },
  {
    slug: "cosmetic",
    name: "Cosmetic dentistry",
    short: "Whitening, veneers, and Invisalign® clear aligners.",
    intro:
      "If you would like to change how your smile looks, cosmetic options include whitening, veneers, and teeth straightening with Invisalign® clear aligners.",
    questions: [
      "Which cosmetic option fits my goal?",
      "Can teens and adults use Invisalign®?",
      "What does a first conversation involve?",
    ],
    explanation: [
      "Your dentist starts by understanding what you would like to change, then checks that your teeth and gums are healthy enough for the option you are considering.",
      "Invisalign® is offered for teens and adults. Your dentist can explain whether aligners suit your situation.",
    ],
    provider: "Cosmetic care is discussed and provided by our dentists.",
    firstStep:
      "Request an appointment and choose cosmetic dentistry. Tell us what you would like to change, and we will plan a conversation with your dentist.",
    faq: [
      {
        q: "Is whitening right for everyone?",
        a: "Not always. Your dentist will check your teeth first and explain what results are realistic for you.",
      },
      {
        q: "Do you offer Invisalign® for teens?",
        a: "Yes. Invisalign® is offered for teens as well as adults.",
      },
    ],
    related: ["restorative", "dental-implants"],
    status: "published-source",
  },
  {
    slug: "dental-implants",
    name: "Dental implants",
    short: "A consultation to see whether implants suit you.",
    intro:
      "Dental implants are one way to replace a missing tooth. The first step is a consultation to understand your situation and whether implants are a suitable option.",
    questions: [
      "Am I a candidate for an implant?",
      "What happens at the consultation?",
      "What are the alternatives?",
    ],
    explanation: [
      "At a consultation, your dentist reviews your health history, examines the area, and may take X-rays. Suitability depends on factors that can only be assessed in person.",
      "Your dentist will also explain alternatives, such as a bridge or denture, so you can compare options. Results vary from person to person.",
    ],
    provider:
      "Implant consultations are with one of our dentists. Details of who places implants and any referral steps need practice confirmation.",
    firstStep:
      "Request an appointment and choose dental implants. We will contact you to arrange a consultation.",
    faq: [
      {
        q: "Will an implant work for me?",
        a: "We cannot say before an assessment. Your dentist will review your health and the area in person and explain whether an implant is a suitable option.",
      },
      {
        q: "Are there other ways to replace a missing tooth?",
        a: "Yes. Bridges and dentures are also options, and your dentist will explain how they compare.",
      },
    ],
    related: ["restorative", "cosmetic"],
    status: "published-source",
  },
  {
    slug: "cdcp",
    name: "Canadian Dental Care Plan (CDCP)",
    short: "Questions about the federal plan? Ask our office.",
    intro:
      "The Canadian Dental Care Plan is a federal program that helps some eligible residents with the cost of dental care. If you have questions about how it may apply to a visit, please contact our office.",
    questions: [
      "Does Lakeridge Dentistry accept CDCP?",
      "Am I eligible?",
      "What will be covered?",
    ],
    explanation: [
      "Eligibility is decided by the Government of Canada, not by the dental office, and not every treatment is covered in full.",
      "Practice participation details for this page are awaiting confirmation from Lakeridge Dentistry before publication.",
    ],
    provider: "Our front office team can answer billing and coverage questions.",
    firstStep:
      "Call the office or send a request and mention CDCP. Our team will explain what applies to your visit.",
    faq: [
      {
        q: "Who decides if I qualify for CDCP?",
        a: "Eligibility is determined by the Government of Canada. You can check eligibility through the federal program.",
      },
      {
        q: "Is every treatment fully covered?",
        a: "No. Coverage depends on the program rules and the treatment. Our team can explain what to expect before treatment.",
      },
    ],
    related: ["family-general", "emergency"],
    status: "pending",
  },
];

export const PRIORITY_PATHWAYS: { slug: ServiceSlug; label: string; detail: string }[] = [
  { slug: "family-general", label: "New patient or family checkup", detail: "Routine care for every age." },
  { slug: "emergency", label: "Tooth pain or emergency", detail: "Call during office hours." },
  { slug: "dental-implants", label: "Replacing a missing tooth", detail: "Start with a consultation." },
  { slug: "cdcp", label: "Questions about CDCP", detail: "Ask how it applies to you." },
];

export const WHY = [
  {
    title: "Family-owned, same location for over 30 years",
    body: "The practice has served Peterborough from Romaine Street for over 30 years and is now owned by Dr. Varun Arora and Dr. Mridula Arora.",
  },
  {
    title: "Care for every age",
    body: "Kids, teens, adults, and seniors can be seen in one office, which keeps family scheduling simpler.",
  },
  {
    title: "Direct insurance billing",
    body: "The office bills your insurance directly, so you are not left paying first and following up on your own.",
  },
  {
    title: "Patient comfort and no judgment",
    body: "Whether it has been years or months since your last visit, we start where you are and explain each step.",
  },
];

export const FIRST_VISIT = [
  { title: "Send a request or call", body: "Use the appointment request or call the office during business hours." },
  { title: "We contact you to confirm", body: "Our team reaches out to find a time that works. Nothing is booked until we confirm with you." },
  { title: "Prepare for your visit", body: "Bring your insurance details and a list of any medications. Tell us if you feel nervous." },
  { title: "Your visit and next steps", body: "Your dentist explains what they find and talks through any options before treatment." },
];

export const HOME_FAQ = [
  {
    q: "Are you accepting new patients?",
    a: "The practice states that it welcomes new patients. Send a request or call and our team will confirm availability.",
  },
  {
    q: "Do you bill insurance directly?",
    a: "Yes. Lakeridge Dentistry offers direct insurance billing.",
  },
  {
    q: "Is the office wheelchair accessible?",
    a: "No. The office is not wheelchair accessible. Please call before your visit so we can talk about your needs.",
  },
  {
    q: "What are your hours?",
    a: "Monday to Thursday 8:30 AM to 5:00 PM, Friday 8:30 AM to 1:00 PM, closed weekends.",
  },
];

export const CONTENT_REGISTER: { item: string; status: string; source: string }[] = [
  { item: "Dentist photographs", status: "Missing. No approved photos supplied.", source: "Practice" },
  { item: "Dentist biographies and credentials", status: "Not published. Names and ownership only.", source: "Our Team page" },
  { item: "Hygienist and staff names", status: "Not supplied.", source: "Practice" },
  { item: "Logo and brand colours", status: "Supplied sailboat logo in use. Concept palettes remain provisional.", source: "Practice" },
  { item: "Office and team photography", status: "Authentic photos not supplied. Clearly labelled illustrative photographs shown.", source: "Practice" },
  { item: "Business hours", status: "Published on Contact page. Confirm before launch.", source: "Contact page" },
  { item: "Same-day emergency and drop-in wording", status: "Published but not assumed. Copy says 'may be possible, call'.", source: "Home page" },
  { item: "CDCP participation", status: "Unconfirmed. Page held as pending.", source: "Practice" },
  { item: "Implant provider and referral process", status: "Unconfirmed.", source: "Practice" },
  { item: "0% financing and student discounts", status: "Published on Contact page. Excluded until approved.", source: "Contact page" },
  { item: "New Patient Promotion", status: "Image on live site. Excluded, terms unknown.", source: "Home page" },
  { item: "Patient testimonials and reviews", status: "Not reviewed or approved. Trust section uses facts only.", source: "Testimonials page" },
  { item: "Phone and email activation", status: "Inactive in concept until approved.", source: "Project brief" },
  { item: "Actual appointment-request process", status: "Assumed: request, office confirms by phone or email. Confirm.", source: "Practice" },
  { item: "Proposed headline and supporting copy", status: "Draft, pending approval.", source: "Strategy brief" },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
