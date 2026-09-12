export type SkillLevel = 'Learning' | 'Working Knowledge' | 'Experienced';

export type Skill = {
  name: string;
  level: SkillLevel;
};

export type SkillGroup = {
  id: string;
  title: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    title: 'Programming',
    skills: [
      { name: 'Java', level: 'Experienced' },
      { name: 'TypeScript', level: 'Working Knowledge' },
      { name: 'JavaScript', level: 'Working Knowledge' },
      { name: 'SQL', level: 'Working Knowledge' },
      { name: 'Lua', level: 'Working Knowledge' },
      { name: 'Go', level: 'Learning' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'Spring Boot', level: 'Experienced' },
      { name: 'REST APIs', level: 'Experienced' },
      { name: 'API Integration & Mapping', level: 'Experienced' },
      { name: 'Kafka', level: 'Working Knowledge' },
      { name: 'Node.js', level: 'Working Knowledge' },
    ],
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud / Infrastructure',
    skills: [
      { name: 'Kubernetes', level: 'Working Knowledge' },
      { name: 'Docker', level: 'Working Knowledge' },
      { name: 'Helm', level: 'Working Knowledge' },
      { name: 'Linux', level: 'Working Knowledge' },
      { name: 'Argo CD', level: 'Learning' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    skills: [
      { name: 'MySQL', level: 'Experienced' },
      { name: 'TiDB', level: 'Working Knowledge' },
      { name: 'MariaDB', level: 'Working Knowledge' },
      { name: 'Liquibase', level: 'Working Knowledge' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'Vue.js', level: 'Working Knowledge' },
      { name: 'React', level: 'Working Knowledge' },
      { name: 'Next.js', level: 'Working Knowledge' },
      { name: 'HTML / CSS', level: 'Working Knowledge' },
      { name: 'Tailwind CSS', level: 'Working Knowledge' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    skills: [
      { name: 'Git', level: 'Experienced' },
      { name: 'GitLab', level: 'Experienced' },
      { name: 'Postman', level: 'Experienced' },
      { name: 'DBeaver', level: 'Experienced' },
      { name: 'VS Code', level: 'Experienced' },
      { name: 'Eclipse', level: 'Working Knowledge' },
    ],
  },
];

export type InterestCard = {
  id: string;
  title: string;
  description: string;
};

export const interests: InterestCard[] = [
  {
    id: 'backend-engineering',
    title: 'Backend Engineering',
    description: 'The logic and data flow behind an application — the part users never see directly but always feel.',
  },
  {
    id: 'api-integration',
    title: 'API & System Integration',
    description: 'Making systems that were never designed together understand each other reliably.',
  },
  {
    id: 'distributed-systems',
    title: 'Distributed Systems',
    description: 'How independent services stay correct and available when any one of them can fail.',
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud Infrastructure',
    description: 'The platforms and primitives that let software run reliably at a scale beyond one machine.',
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes',
    description: 'Container orchestration as a way of thinking about deployment, not just a tool to operate.',
  },
  {
    id: 'developer-tools',
    title: 'Developer Tools',
    description: 'The tooling that makes an engineering team faster without anyone noticing it\'s there.',
  },
  {
    id: 'system-design',
    title: 'System Design',
    description: 'Trading off consistency, latency and complexity before a single line of code gets written.',
  },
  {
    id: 'software-architecture',
    title: 'Software Architecture',
    description: 'Structuring a codebase so the easy change stays easy a year later.',
  },
];
