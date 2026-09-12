export type ProjectCategory =
  | 'Backend'
  | 'Frontend'
  | 'Full Stack'
  | 'Cloud'
  | 'Kubernetes'
  | 'API'
  | 'Integration'
  | 'Learning';

export type Project = {
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  categories: ProjectCategory[];
  stack: string[];
  github: string | null;
  demo: string | null;
  status: 'Live' | 'In Progress' | 'Case Study' | 'Archived' | 'Planned';
  featured: boolean;
  year: string;
  problem?: string;
  solution?: string;
  architecture?: string[];
  implementation?: string;
  challenges?: string;
  learnings?: string;
  futureImprovements?: string;
  isPlaceholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'core-banking-integration-middleware',
    name: 'Core Banking Integration Middleware',
    description:
      'Case study: configuring and debugging the mapping layer that translates data between a core banking platform and its surrounding channel systems.',
    longDescription:
      "A generalized write-up of the integration work I do day-to-day at Silverlake. Specific client names, internal ticket references and proprietary configuration details are intentionally omitted — this describes the shape of the problem and how it gets solved, not a specific engagement.",
    categories: ['Integration', 'Backend', 'Cloud'],
    stack: ['Java', 'Spring Boot', 'Kafka', 'Kubernetes', 'Lua', 'MySQL', 'TiDB', 'Liquibase'],
    github: null,
    demo: null,
    status: 'Case Study',
    featured: true,
    year: '2024–Present',
    problem:
      "A core banking host and its surrounding channel/partner systems each speak their own JSON shape. A middleware layer sits between them, translating requests and responses field-by-field according to mapping specifications — and when a field doesn't survive the trip intact, the failure can look identical whether the cause is a missing value upstream, a misconfigured mapping, or a bug in the mapping engine itself.",
    solution:
      'The work is split between configuration and root-cause debugging: comparing payloads against mapping specs to isolate where a field diverges, tracing field-processing scripts (including date/time conversion helpers) for edge cases like empty-value ambiguity, and applying an alternate-mapping convention to prevent multi-pass mapping overwrites from silently clobbering error states.',
    architecture: ['External System', 'Middleware / Mapping Engine', 'Core Banking Host', 'Internal Services'],
    implementation:
      'Mapping changes are made through the platform\'s configuration UI rather than code, and only take effect after the relevant service pod is restarted — so a meaningful part of the work is coordinating mapping uploads against pod restarts across DEV, SIT, UAT and PROD, and tracking that in dedicated release-tracking workbooks. Where the root cause sits in the mapping engine itself rather than a specific mapping file, the fix path is a formal change/incident request to the platform vendor\'s product team.',
    challenges:
      'The hardest bugs are the ones where several unrelated things produce the same symptom — for example, an empty string can come from a JSONPath miss, a genuinely empty source value, or a failed field-processing step, and the debugging has to rule each one out in turn. Multi-pass processing added another layer: a value written by an error-handling path could get silently overwritten by the normal path running afterward.',
    learnings:
      'Debugging middleware forces you to hold a mental model of both sides of an integration at once, and to be precise about the difference between "the data is wrong" and "the data is missing." I also picked up practical Kubernetes operations skills (inspecting pod logs and JAR metadata, reasoning about broker configuration) mostly by needing them to reproduce a specific issue.',
    futureImprovements:
      'A cleaner long-term fix would be resolving the underlying empty-value ambiguity at the engine level rather than working around it per mapping — which is part of why the recurring pattern was written up and raised with the platform vendor rather than patched locally every time.',
  },
  {
    slug: 'kubernetes-home-lab',
    name: 'Kubernetes Home Lab',
    description:
      'A self-hosted Minikube cluster used to learn Kubernetes fundamentals hands-on — Deployments, Services, ConfigMaps, Ingress and PV/PVC.',
    longDescription:
      'A personal learning project: setting up and running a local Kubernetes cluster to build fundamentals beyond what shows up in day-to-day work tickets.',
    categories: ['Kubernetes', 'Cloud', 'Learning'],
    stack: ['Kubernetes', 'Minikube', 'Docker', 'YAML'],
    github: null,
    demo: null,
    status: 'In Progress',
    featured: true,
    year: '2026',
    problem:
      'Production Kubernetes work tends to be narrow and ticket-driven — you learn the slice of the system that\'s on fire, not the whole picture. I wanted a low-stakes environment to deliberately work through core resource types end to end.',
    solution:
      'Set up Minikube locally using the Docker driver (after running into Hyper-V conflicts on Windows), then worked systematically through YAML configuration for Deployments, Services, ConfigMaps, Ingress, and PersistentVolume/PersistentVolumeClaim resources.',
    architecture: ['Local Docker Driver', 'Minikube Cluster', 'Deployments & Services', 'ConfigMaps / Ingress / PV-PVC'],
    implementation:
      'Each resource type gets its own small, deliberately-scoped manifest so the behavior of that resource type is easy to isolate and reason about, rather than jumping straight to a full multi-service application.',
    challenges:
      'Getting a local cluster running reliably on Windows was itself the first obstacle — Hyper-V and Minikube\'s default drivers didn\'t play well together, which is what led to standardizing on the Docker driver instead.',
    learnings:
      'Working through resource types in isolation makes it much easier to recognize them later in a real cluster under pressure, instead of pattern-matching from memory.',
    futureImprovements:
      '[Add next steps here — e.g. deploying a small multi-service app, adding Helm charts, or wiring up basic observability.]',
  },
  {
    slug: 'text2social-oauth-integration',
    name: 'Text2Social — Frontend & OAuth Integration',
    description:
      'Internship project: frontend features and OAuth-based SDK authentication for a social content tool, built with Vue.js.',
    categories: ['Frontend', 'Integration'],
    stack: ['Vue.js', 'Axios', 'Node.js', 'OAuth', 'Quill', 'Postman'],
    github: null,
    demo: null,
    status: 'Archived',
    featured: false,
    year: '2023',
    problem:
      'Text2Social needed frontend features for composing and managing social content, including the ability to connect third-party social accounts.',
    solution:
      'Built UI features in Vue.js and implemented OAuth-based SDK authentication flows so users could connect external social accounts, alongside a rich-text composer built on the Quill editor.',
    implementation:
      'Used Axios for API integration and Postman to verify endpoint behavior during development, working from design and API specs provided by the team.',
    learnings:
      'My first exposure to authentication flows in a real product — specifically the details of OAuth handshakes and SDK-based auth, which don\'t fully click until you\'ve had to debug one that isn\'t working.',
  },
  {
    slug: 'placeholder-backend-project',
    name: '[Add a personal backend/API project here]',
    description:
      '[Placeholder — replace with a real personal project: what it does, why you built it, and what it taught you.]',
    categories: ['Backend', 'API'],
    stack: ['Go', 'PostgreSQL'],
    github: null,
    demo: null,
    status: 'Planned',
    featured: false,
    year: '—',
    isPlaceholder: true,
  },
];
