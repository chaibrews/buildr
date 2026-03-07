export const sampleData = {
  personal: {
    name: "Jane Doe",
    email: "name@gmail.com",
    linkPortfolio: "portfolio.com",
    linkGithub: "github.com/name",
  },
  skills: [
    {
      id: crypto.randomUUID(),
      groupName: "CAD",
      items: "Siemens NX, CATIA V5, SolidWorks",
    },
    {
      id: crypto.randomUUID(),
      groupName: "Analysis",
      items: "Thermal Desktop, Abaqus, LS-DYNA, STAR-CCM+",
    },
  ],
  experience: [
    {
      id: crypto.randomUUID(),
      company: "Company",
      position: "Job Title",
      bullets: [
        "STAR: Situation Task Action Result",
        "STAR: Situation Task Action Result",
        "STAR: Situation Task Action Result",
      ],
      dateFrom: "June 2022",
      dateTo: "Present",
    },
    {
      id: crypto.randomUUID(),
      company: "Company",
      position: "Job Title",
      bullets: [
        "XYZ: Accomplished X as measured by Y by doing Z",
        "XYZ: Accomplished X as measured by Y by doing Z",
        "XYZ: Accomplished X as measured by Y by doing Z",
      ],
      dateFrom: "Jan 2021",
      dateTo: "May 2022",
    },
    {
      id: crypto.randomUUID(),
      company: "Company",
      position: "Job Title",
      bullets: [
        "CAR: Challenge Action Result",
        "CAR: Challenge Action Result",
        "CAR: Challenge Action Result",
      ],
      dateFrom: "Aug 2014",
      dateTo: "Sept 2020",
    },
    {
      id: crypto.randomUUID(),
      company: "Company",
      position: "Job Title",
      bullets: [
        "Start each bullet with a strong, past-tense action verb",
        "Each bullet point should be 1–2 lines long and max 1 sentence long.",
        "Don’t let bullets spill onto the next line with only 1–4 words on it, it’s a huge waste of space",
      ],
      dateFrom: "June 2014",
      dateTo: "July 2014",
    },
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      title: "Project Title",
      link: "github.com/name/project",
      bullets: [
        "The more work experience you have, the less relevant outside-work projects tend to become",
        "If you have something that really stands out, consider listing it here",
      ],
    },
    {
      id: crypto.randomUUID(),
      title: "Project Title",
      link: "project.com",
      bullets: [
        "Only list real projects, not mandatory school projects or trivial tutorial projects found online",
        "Something that someone uses to solve a problem",
        "Something that has users (can be just you, as long as you use it often) and is actively maintained and not just rotting in a GitHub repo, never to see a PR for the rest of its life `,",
      ],
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      school: "School",
      degree: "BS in Computer Engineering",
      dateGraduated: "June 2010",
      bullets: [
        "magna cum laude, GPA: 3.8/4.0",
        "DOST MERIT scholar, Dean’s List (2006-2010)",
      ],
    },
  ],
  certificates: [
    {
      id: crypto.randomUUID(),
      name: "Certificate Title",
      organization: "Issuing Organization",
      dateIssued: "Feb 2024",
    },
  ],
};
