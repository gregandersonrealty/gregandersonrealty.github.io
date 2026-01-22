export type OfficeHour = {
  day: string;
  hours: string;
};

export const OFFICE = {
  name: "RE/MAX Advisors West",
  addressLines: ["207 Chestnut St, Ste. 100", "Chaska, MN 55318"],
  addressOneLine: "207 Chestnut St, Ste. 100, Chaska, MN 55318",
  email: "thehybridbroker@gmail.com",
  phones: {
    mobile: { label: "Mobile", tel: "+16123866155", display: "(612) 386-6155" },
    direct: { label: "Direct", tel: "+19523686014", display: "(952) 368-6014" },
  },

  // The user-provided share link is kept as-is for clicking.
  googleMapsShareUrl: "https://share.google/98c3GDw3VjiH3180b",

  // Reliable, no-JS embed: use a plain address query.
  googleMapsQueryUrl:
    "https://www.google.com/maps?q=207+Chestnut+St,+Ste.+100,+Chaska,+MN+55318",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=207+Chestnut+St,+Ste.+100,+Chaska,+MN+55318&output=embed",

  // Google doesn’t expose hours via static HTML; set these manually if desired.
  hours: [] as OfficeHour[],
};
