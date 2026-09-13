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
      'Contributed to the KKP Thai Bank Hire Purchase modernization from initial requirement gathering through integration scoping and Interface Design Document preparation, supporting the transition from the legacy Hire Purchase platform to Mobius Core Banking.',
      'Mapped the KKP target-state application and integration landscape with bank stakeholders and the Enterprise Architecture team, covering LOS, disbursement, tax, customer/CIF, car dealer and supporting systems, along with their upstream and downstream responsibilities.',
      'Analyzed and categorized legacy Hire Purchase interfaces across online APIs, Kafka events, scheduled APIs and batch/file processing, identifying where integrations should be replaced, consolidated, redirected or redesigned for Mobius.',
      'Documented complex loan creation and disbursement dependencies, including CIF synchronization, reference number generation, dealer validation and creation, dealer limit and rate checks, sequencing requirements and downstream processing across multiple channels.',
      'Contributed to consolidated Mobius inquiry APIs for customer information, account and loan balances, outstanding debt, relationships and other Hire Purchase-related information, establishing scope before detailed field-level technical design.',
      'Prepared and maintained Interface Design Documents covering interface purpose, source and target systems, business flows, communication mechanisms, request and response structures, processing sequences and integration dependencies.',
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
      'Contributed to Text2Social, a Vue.js-powered feature that generates engaging social media captions and supports automated publishing across multiple platforms.',
    highlights: [
      'Contributed to the development of Text2Social using Vue.js, enabling clients to generate engaging social media captions to strengthen their online presence.',
      'Collaborated with backend developers to design and implement authentication flows for Facebook, Instagram, LinkedIn and Twitter integrations.',
      'Integrated secure authentication mechanisms using the LinkedIn API, Facebook SDK and Twitter API to manage user access tokens and enable automated posting of generated content.',
      'Assisted with debugging, troubleshooting and resolving platform issues to improve the stability and performance of the Nexmind AI platform.',
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
      'Universiti Kebangsaan Malaysia — CGPA 3.5. Previously completed a Foundation in Pure Science at Pusat Genius Pintar UKM (Jun 2019 – Jun 2020, Grade 3.5) and SPM at Sekolah Menengah Sains Lahad Datu, Sabah (9A).',
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
