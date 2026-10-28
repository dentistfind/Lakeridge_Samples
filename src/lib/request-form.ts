export type RequestValues = {
  name: string;
  contactMethod: "phone" | "email";
  phone: string;
  email: string;
  service: string;
  patientType: "" | "new" | "returning";
  preferredTime: string;
  note: string;
};

export type RequestErrors = Partial<Record<keyof RequestValues, string>>;

export const emptyRequest = (service = ""): RequestValues => ({
  name: "",
  contactMethod: "phone",
  phone: "",
  email: "",
  service,
  patientType: "",
  preferredTime: "",
  note: "",
});

/** Validation only. The concept form never sends, stores, or tracks entries. */
export function validateRequest(v: RequestValues): RequestErrors {
  const e: RequestErrors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name so the office knows who to contact.";
  if (v.contactMethod === "phone") {
    const digits = v.phone.replace(/\D/g, "");
    if (digits.length < 10) e.phone = "Please enter a 10 digit phone number, for example 705-555-0123.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) {
    e.email = "Please enter an email address, for example name@example.com.";
  }
  if (!v.service) e.service = "Please choose the kind of visit, or choose Not sure.";
  if (!v.patientType) e.patientType = "Please tell us if you are new or returning.";
  return e;
}
