// Centralized profile data. Edit this file to update personal information
// across the entire site — nothing below should be hardcoded in components.

export const profile = {
  fullName: 'Muizzuddin Thaqif Ramlee',
  shortName: 'Muizz',
  initials: 'MR',
  title: 'Software Engineer',
  tagline: 'Integration & Delivery · Backend · APIs · Cloud & Kubernetes',
  location: 'Kuala Lumpur, Malaysia',
  role: 'Software Engineer, Project Delivery & Integration',
  company: 'Silverlake',
  companyFull: 'Silverlake Structured Services Sdn Bhd (Silverlake Axis Group)',

  // --- Placeholders: replace with real values before deploying ---
  email: 'muizz.thaqif@gmail.com', // [Add real email here]
  linkedin: 'https://www.linkedin.com/in/muizzuddin-thaqif-ramlee/', // [Add real LinkedIn URL here]
  github: 'https://github.com/muizzthaqif10', // [Add real GitHub URL here]
  githubUsername: '', // [Add real GitHub username here to enable live repo fetching]
  resumeUrl: '/resume.pdf',

  summary:
    "I'm a software engineer working on the systems that sit between applications rather than the ones people click on directly — integration middleware, API mapping, and the backend plumbing that keeps a core banking platform talking to everything around it. Most of my day is spent reading payload specs, tracing a field through three layers of transformation, and figuring out why one of them disagrees with the other two.",

  about: [
    "I work as a software engineer on project delivery and integration at Silverlake, focused on the middleware layer that connects a core banking platform to the channel and partner systems around it. Day to day, that means configuring and debugging API data mappings, tracing payload transformations across multiple transaction types, and figuring out why a field that works in one environment doesn't in another.",
    "A lot of the job is investigative: comparing a JSON payload against a mapping spec line by line, reading through field-processing scripts to find where an edge case slips through, and working with Kubernetes-based deployment environments to reproduce and verify fixes. I've picked up a working understanding of database internals, message transformation, and deployment tooling mostly by needing them to solve a specific problem in front of me.",
    "Outside of work, I'm building out my backend and infrastructure fundamentals more deliberately — going deeper on Kubernetes by running my own cluster locally, and learning Go with the goal of being comfortable writing production backend services in it, coming from a primarily Java background.",
  ],

  currentlyLearning: [
    { name: 'Go (Golang)', note: 'Building backend fundamentals coming from Java' },
    { name: 'Kubernetes', note: 'Deployments, Services, ConfigMaps, Ingress, PV/PVC — via a self-hosted Minikube cluster' },
    { name: 'Distributed systems', note: 'How services stay consistent and available across failure' },
    { name: 'System design', note: 'Structuring services and data flow at scale' },
  ],

  currentlyWorking:
    'Integration engineering on a core banking middleware platform — API mapping configuration, payload debugging, and Kubernetes-based deployment support.',

  education: {
    degree: 'Bachelor of Software Engineering',
    institution: 'Universiti Kebangsaan Malaysia (UKM)',
    detail: 'CGPA 3.47',
  },

  social: {
    github: 'https://github.com/muizz-placeholder',
    linkedin: 'https://linkedin.com/in/muizzuddin-placeholder',
    email: 'mailto:muizz@example.com',
  },
} as const;

export const seo = {
  siteName: 'Muizz Ramlee',
  title: 'Muizzuddin Thaqif Ramlee | Software Engineer',
  description:
    'Software Engineer focused on backend engineering, APIs, system integration and cloud infrastructure.',
  url: 'https://muizz-portfolio.vercel.app', // [Add real deployed domain here]
  twitterHandle: '', // [Add X/Twitter handle here if applicable]
} as const;
