export type ActivityCategory =
  | 'Technical Learning'
  | 'Certifications'
  | 'Hackathons'
  | 'University'
  | 'Community'
  | 'Personal Projects'
  | 'Conferences'
  | 'Talks'
  | 'Workshops'
  | 'Achievements';

export type Activity = {
  id: string;
  date: string;
  title: string;
  description: string;
  category: ActivityCategory;
  link?: string;
  isPlaceholder?: boolean;
};

export const activities: Activity[] = [
  {
    id: 'ukm-degree',
    date: '2020 – 2023',
    title: 'Bachelor of Software Engineering, UKM',
    description:
      'Universiti Kebangsaan Malaysia. Graduated with a CGPA of 3.47, covering programming fundamentals, databases, and software design.',
    category: 'University',
  },
  {
    id: 'nexmind-internship',
    date: '2023',
    title: 'Frontend Internship at NexMind',
    description:
      'Worked on the Text2Social project — Vue.js frontend features and OAuth-based SDK authentication integration.',
    category: 'Personal Projects',
  },
  {
    id: 'kubernetes-learning',
    date: '2026',
    title: 'Learning Kubernetes systematically',
    description:
      'Set up a local Minikube cluster (Docker driver, after working around Hyper-V conflicts on Windows) and worked through Deployments, Services, ConfigMaps, Ingress and PV/PVC resource types.',
    category: 'Technical Learning',
  },
  {
    id: 'go-learning',
    date: '2026',
    title: 'Learning Go (Golang)',
    description:
      'Building toward writing production-grade backend services in Go, coming from a primarily Java background.',
    category: 'Technical Learning',
  },
];

export type RoadmapStatus = 'Completed' | 'Learning' | 'Next';

export type RoadmapItem = {
  id: string;
  name: string;
  status: RoadmapStatus;
};

export const learningRoadmap: RoadmapItem[] = [
  { id: 'java', name: 'Java', status: 'Completed' },
  { id: 'spring-boot', name: 'Spring Boot', status: 'Completed' },
  { id: 'rest-api', name: 'REST APIs', status: 'Completed' },
  { id: 'microservices', name: 'Microservices', status: 'Learning' },
  { id: 'docker', name: 'Docker', status: 'Learning' },
  { id: 'kubernetes', name: 'Kubernetes', status: 'Learning' },
  { id: 'go', name: 'Go', status: 'Learning' },
  { id: 'cloud', name: 'Cloud Infrastructure', status: 'Next' },
  { id: 'distributed-systems', name: 'Distributed Systems', status: 'Next' },
];
