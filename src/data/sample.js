export const sampleData = {
  summary: {
    description:
      "Keep your summary to 2-3 sentences max. Focus on your level, domain, and what you bring — not generic buzzwords. Skip it entirely if you have less than 3 years of experience; your work should speak for itself.",
  },
  personal: {
    name: "Jane Doe",
    email: "jane@email.com",
    linkedin: "https://www.linkedin.com/in/janedoe/",
    linkPortfolio: "janedoe.dev",
    linkGithub: "github.com/janedoe",
  },
  skills: [
    {
      id: crypto.randomUUID(),
      groupName: "Languages",
      items: "List actual languages you can interview in. Don't pad.",
    },
    {
      id: crypto.randomUUID(),
      groupName: "Technologies",
      items:
        "Frameworks, tools, platforms. Only list what you can defend in an interview.",
    },
  ],
  experience: [
    {
      id: crypto.randomUUID(),
      company: "Most Recent Company",
      position: "Job Title",
      dateFrom: "Jan 2023",
      dateTo: "Present",
      bullets: [
        "XYZ format: Accomplished [X] as measured by [Y] by doing [Z]. Always quantify impact.",
        "STAR format: [Situation] needed [Task], so I [Action], resulting in [Result].",
        "Start every bullet with a strong past-tense action verb — shipped, reduced, built, led, designed.",
        "Each bullet = 1 sentence, 1–2 lines. If it spills to a 3rd line, cut it.",
      ],
    },
    {
      id: crypto.randomUUID(),
      company: "Previous Company",
      position: "Job Title",
      dateFrom: "Jun 2021",
      dateTo: "Dec 2022",
      bullets: [
        "Don't just list responsibilities — show impact. 'Maintained codebase' is weak. 'Reduced bug count by 30%' is strong.",
        "If you don't have numbers, estimate. 'Served ~10k daily users' is better than nothing.",
        "Older jobs = fewer bullets. 2–3 bullets max for anything 3+ years ago.",
      ],
    },
    {
      id: crypto.randomUUID(),
      company: "Older Company",
      position: "Job Title",
      dateFrom: "Jul 2019",
      dateTo: "May 2021",
      bullets: [
        "Internships and early roles still count — especially if you shipped something real.",
        "Focus on what you built or improved, not the tools you learned.",
      ],
    },
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      title: "Project Name",
      techStack: "React, Tailwind",
      link: "github.com/you/project",
      bullets: [
        "Only list projects that are real, deployed, and actively maintained — not tutorial clones.",
        "Lead with what it does and who uses it, not how you built it.",
      ],
    },
    {
      id: crypto.randomUUID(),
      title: "Another Project",
      techStack: "React, Node.js, PostgreSQL",
      link: "project.com",
      bullets: [
        "The more experience you have, the less projects matter.",
        "If you list it, be ready to talk about every technical decision in an interview.",
      ],
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      school: "Your University",
      degree: "BS Computer Science",
      dateGraduated: "May 2021",
      bullets: [
        "Include GPA only if 3.5+. Include honors, relevant awards, or scholarships.",
        "Once you have 2+ years of experience, education moves to the bottom.",
      ],
    },
  ],
  certificates: [
    {
      id: crypto.randomUUID(),
      name: "Certification Name",
      organization: "Issuing Organization",
      dateIssued: "Jan 2024",
    },
  ],
};
