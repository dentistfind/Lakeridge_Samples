import { describe, expect, it } from "vitest";
import { emptyRequest, validateRequest } from "@/lib/request-form";
import { DEMO_RESPONSE } from "@/content/practice";

describe("appointment request demo", () => {
  it("shows the exact non-booking response from the brief", () => {
    expect(DEMO_RESPONSE).toBe(
      "This is a website concept. Your request has not been sent and no appointment has been booked.",
    );
  });

  it("requires a name, a contact detail, a service, and patient type", () => {
    const errors = validateRequest(emptyRequest());
    expect(Object.keys(errors).sort()).toEqual(["name", "patientType", "phone", "service"]);
  });

  it("accepts a complete request and keeps the preselected service", () => {
    const v = { ...emptyRequest("emergency"), name: "Sam Lee", phone: "705 555 0123", patientType: "new" as const };
    expect(v.service).toBe("emergency");
    expect(validateRequest(v)).toEqual({});
  });
});
