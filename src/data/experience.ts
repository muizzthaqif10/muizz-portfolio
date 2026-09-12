export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string | 'Present';
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: 'silverlake',
    role: 'Software Engineer — Project Delivery & Integration',
    company: 'Silverlake Structured Services Sdn Bhd',
    location: 'Kuala Lumpur, Malaysia',
    start: 'Apr 2024',
    end: 'Present',
    summary:
      'Delivered enterprise banking integration work for CloudLink.AI middleware, covering API mapping, middleware configuration, backend integration development, and production issue resolution for core banking projects.',
    highlights: [
      'Served as project-side technical owner for CloudLink integration delivery on the KKP hire-purchase banking project, coordinating across Product, Runtime, QA, Architecture, and infrastructure teams to ship production-ready integration solutions.',
      'Delivered end-to-end integration support for CloudLink, a middleware platform that translates and routes messages between Mobius Core Banking and external or legacy bank systems, ensuring interoperability across channels and environments.',
      'Built and maintained backend integration services using Java and Spring Boot, implementing Controller–Service–Data Layer patterns, DTO-based request/response models, and downstream service integrations for enterprise banking flows.',
      'Owned source-to-target message translation and mapping design across JSON, fixed-length and XML formats, covering conditional and lookup logic, date/time conversion, character encoding, and error/response translation requirements.',
      'Performed root-cause analysis on complex defects including JSONPath/null propagation, Lua-based date conversion issues, mapping conflicts, and Kubernetes or middleware runtime failures across DEV, UAT and production environments.',
      'Authored Interface Design Documents (IDDs), technical specifications, release tracking tools, and QA validation reports to support architecture, development, infrastructure and business stakeholders.',
      'Worked across TiDB, MariaDB, MySQL and Liquibase to support configuration promotion, schema validation, DDL change handling, and issue resolution in multi-environment release cycles.',
      'Configured and deployed CloudLink in Kubernetes VM environments, managing Helm settings, environment variables and pod configurations to maintain availability and stability.',
    ],
    stack: [
      'Java',
      'Spring Boot',
      'REST APIs',
      'Kafka',
      'Kubernetes',
      'Helm',
      'Docker',
      'MySQL',
      'TiDB',
      'MariaDB',
      'Liquibase',
      'Lua',
      'Git',
      'GitLab',
      'Postman',
      'Mockoon',
      'DBeaver',
    ],
  },
  {
    id: 'nexmind',
    role: 'Frontend Developer Intern',
    company: 'Nexmind AI',
    location: 'Kuala Lumpur / Remote',
    start: 'Sep 2023',
    end: 'Feb 2024',
    summary:
      'Developed Text2Social, a Vue.js-powered feature enabling AI-generated social captions and integrated OAuth-based social posting flows into the NexMind AI SaaS platform.',
    highlights: [
      'Developed Text2Social, a Vue.js-powered feature that enables AI-generated social media captions and is adopted by the production user base.',
      'Engineered OAuth authentication flows for Facebook, LinkedIn, Instagram and Twitter APIs, enabling secure token management and direct social posting from the platform.',
      'Collaborated with backend engineers and product stakeholders to design seamless API integrations and support feature stability across the NexMind AI platform.',
      'Used Axios and Postman to validate API behavior and debug integration issues during development.',
    ],
    stack: ['Vue.js', 'Axios', 'Node.js', 'Postman', 'OAuth', 'Quill'],
  },
];

export type TimelineMilestone = {
  id: string;
  year: string;
  title: string;
  description: string;
};

export const journeyTimeline: TimelineMilestone[] = [
  {
    id: 'education',
    year: 'Education',
    title: 'Bachelor of Software Engineering (Information System Development) (Hons), UKM',
    description:
      'Universiti Kebangsaan Malaysia — CGPA 3.47. Relevant coursework included object-oriented programming, data structures, software engineering, databases, web apps, computer networks and AI/machine learning.',
  },
  {
    id: 'internship',
    year: 'Internship',
    title: 'Frontend Developer Intern at Nexmind AI',
    description:
      'Built Text2Social and implemented OAuth-based authentication flows for social platform integrations in a production SaaS environment.',
  },
  {
    id: 'silverlake',
    year: 'Software Engineering',
    title: 'Software Engineer at Silverlake Structured Services',
    description:
      'Worked on CloudLink.AI integration delivery for core banking and hire-purchase systems, covering middleware configuration, API mapping, debugging, and release validation.',
  },
  {
    id: 'growth',
    year: 'Current Growth',
    title: 'Deepening cloud-native and backend fundamentals',
    description:
      'Learning Go, Kubernetes, distributed systems and system design to strengthen production backend and infrastructure skills.',
  },
];
