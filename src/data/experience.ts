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
    role: 'Software Engineer, Project Delivery & Integration',
    company: 'Silverlake',
    location: 'Kuala Lumpur, Malaysia',
    start: '2024',
    end: 'Present',
    summary:
      'Working on the integration middleware layer that connects a core banking platform to the channel, partner and internal systems around it — from mapping configuration to production troubleshooting.',
    highlights: [
      'Configure and debug API data mappings that translate JSON payloads between a core banking host and external channel/partner systems across multiple transaction types.',
      'Perform gap analysis between payload structures and mapping specifications, and raise/track change and incident requests with the platform vendor\'s product team when the issue traces back to the engine itself.',
      'Diagnose integration defects spanning mapping configuration, field-processing scripts, and date/format handling — including subtle issues like empty-value ambiguity and multi-pass mapping overwrites.',
      'Work within Kubernetes-based deployment environments: inspecting pod configuration and logs, reproducing environment-specific issues, and validating fixes across DEV, SIT and UAT.',
      'Use Liquibase-based snapshot diffing to track and promote UI-driven configuration changes safely across environments.',
      'Build and maintain tracking workbooks for API test pass-rates and mapping release coordination across multiple environments.',
      'Coordinate with multiple system owners and cross-functional teams during integration testing and production support.',
      'Contributed to integration delivery work for banking and cross-border financial system projects.',
    ],
    stack: [
      'Java',
      'Spring Boot',
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
      'DBeaver',
    ],
  },
  {
    id: 'nexmind',
    role: 'Frontend Intern',
    company: 'NexMind',
    location: 'Malaysia (Remote/On-site)',
    start: '2023',
    end: '2023',
    summary:
      'Frontend internship contributing to Text2Social, building UI features and integrating authentication flows for a social content tool.',
    highlights: [
      'Built frontend features for Text2Social using Vue.js, working from design and API specs through to implementation.',
      'Integrated OAuth-based SDK authentication flows for connecting third-party social accounts.',
      'Used Axios for API integration and Postman for testing and verifying endpoint behavior during development.',
      'Implemented rich-text editing features using the Quill editor.',
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
    title: 'Bachelor of Software Engineering, UKM',
    description:
      'Universiti Kebangsaan Malaysia — CGPA 3.47. Built a foundation across programming, databases and software design.',
  },
  {
    id: 'internship',
    year: 'Internship',
    title: 'Frontend Intern at NexMind',
    description:
      'First real-world engineering experience — Vue.js, API integration and OAuth on the Text2Social project.',
  },
  {
    id: 'silverlake',
    year: 'Software Engineering',
    title: 'Software Engineer at Silverlake',
    description:
      'Moved into backend-leaning integration engineering — API mapping, middleware debugging and Kubernetes-based delivery for core banking systems.',
  },
  {
    id: 'growth',
    year: 'Current Growth',
    title: 'Deepening backend & infrastructure fundamentals',
    description:
      'Learning Go and Kubernetes more deliberately, working toward distributed systems and system design.',
  },
];
