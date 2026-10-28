import family from "@/assets/family-care.jpg";
import checkup from "@/assets/dental-care.jpg";
import consultation from "@/assets/dental-consultation.jpg";
import room from "@/assets/illustrative-dental-room.jpg";
import femalePortrait from "@/assets/illustrative-female-dentist.jpg";
import malePortrait from "@/assets/illustrative-male-dentist.jpg";

// Illustrations describe dental care, never the named providers or actual premises.
export const IMAGERY = {
  femalePortrait: { src: femalePortrait, alt: "Illustrative female dentist model, not Dr. Mridula Arora", caption: "Illustrative model · Not Dr. Mridula Arora" },
  malePortrait: { src: malePortrait, alt: "Illustrative male dentist model, not Dr. Varun Arora", caption: "Illustrative model · Not Dr. Varun Arora" },
  family: { src: family, alt: "Illustrative family smiling outdoors", caption: "Illustrative family photograph" },
  checkup: { src: checkup, alt: "Illustrative dental checkup, not a Lakeridge dentist or patient", caption: "Illustrative dental care" },
  consultation: { src: consultation, alt: "Illustrative gloved hands explaining a tooth model", caption: "Illustrative care photograph; not a dentist portrait" },
  room: { src: room, alt: "Illustrative dental treatment room, not the Lakeridge office", caption: "Illustrative interior; not the Lakeridge office" },
} as const;