// Centralized profile data. Edit this file to update personal information
// across the entire site — nothing below should be hardcoded in components.

export const profile = {
  fullName: 'Muizzuddin Thaqif Ramlee',
  shortName: 'Muizz',
  initials: 'MR',
  title: 'Software Engineer',
  tagline: 'Integration & Backend Specialist',
  location: 'Cheras, Selangor, Malaysia',
  role: 'Software Engineer — Project Delivery & Integration',
  company: 'Silverlake',
  companyFull: 'Silverlake Structured Services Sdn Bhd | CloudLink.AI',

  email: 'muizz.thaqif@gmail.com',
  linkedin: 'https://www.linkedin.com/in/muizzuddin-thaqif-ramlee/',
  github: 'https://github.com/muizzthaqif10',
  githubUsername: 'muizzthaqif10',
  resumeUrl: '/resume.pdf',

  summary:
    'Results-driven Software Engineer with hands-on experience in enterprise system integration, Java/Spring Boot backend development, and cloud-native deployment within the banking and financial services sector. Proven track record as a project-side technical owner for cross-border banking integrations — root-causing critical middleware defects, authoring integration standards adopted across engineering teams, and building QA tracking tooling that improves release reliability.',

  about: [
    "I work as a software engineer on project delivery and integration at Silverlake, focused on CloudLink.AI middleware that connects Mobius Core Banking with external and legacy banking systems. My day-to-day includes configuring message mappings, debugging payload transformation issues, and coordinating fixes across integration, QA, runtime, and platform teams for production-ready delivery.",
    "The work spans Java/Spring Boot backend services, API design, data transformation, and issue ownership across the full lifecycle of a banking integration. I have been directly involved in delivering cross-border and hire-purchase integration solutions, building strong functional understanding of lending processes such as loan booking, disbursement, EIR and amortisation while translating business requirements into technical interface design and deployment-ready delivery.",
    "Beyond core delivery, I take ownership of root-cause analysis, documentation, and release validation across multiple environments. I also continue to deepen my backend and infrastructure fundamentals through Kubernetes, Docker, Helm, Go, and distributed systems learning to strengthen my engineering foundation beyond the current integration work.",
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
    degree: 'Bachelor of Software Engineering (Information System Development) (Hons)',
    institution: 'Universiti Kebangsaan Malaysia (UKM)',
    detail: 'CGPA 3.47 | Major: Information System Development',
  },

  social: {
    github: 'https://github.com/muizzthaqif10',
    linkedin: 'https://www.linkedin.com/in/muizzuddin-thaqif-ramlee/',
    email: 'mailto:muizz.thaqif@gmail.com',
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
