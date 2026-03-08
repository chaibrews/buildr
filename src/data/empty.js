export const EMPTY_ITEMS = {
  experience: {
    company: "",
    position: "",
    dateFrom: "",
    dateTo: "",
    bullets: [],
  },
  education: { school: "", degree: "", dateGraduated: "", bullets: [] },
  projects: { title: "", link: "", bullets: [] },
  skills: { groupName: "", items: "" },
  certificates: { name: "", organization: "", dateIssued: "" },
};

export function emptyData() {
  return {
    summary: { description: "" },
    personal: { name: "", email: "", linkPortfolio: "", linkGithub: "" },
    experience: [{ id: crypto.randomUUID(), ...EMPTY_ITEMS.experience }],
    education: [{ id: crypto.randomUUID(), ...EMPTY_ITEMS.education }],
    projects: [{ id: crypto.randomUUID(), ...EMPTY_ITEMS.projects }],
    skills: [{ id: crypto.randomUUID(), ...EMPTY_ITEMS.skills }],
    certificates: [{ id: crypto.randomUUID(), ...EMPTY_ITEMS.certificates }],
  };
}
