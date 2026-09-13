export type ProjectCategory =
  | 'Backend'
  | 'Frontend'
  | 'Full Stack'
  | 'Cloud'
  | 'Kubernetes'
  | 'API'
  | 'Integration'
  | 'Learning';

export type ProjectType = 'Company' | 'Personal/Freelance';

export type Project = {
  slug: string;
  name: string;
  type: ProjectType;
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
  relatedRepos?: { name: string; url: string }[];
  isPlaceholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'kkp-thai-bank-hire-purchase-modernization',
    name: 'KKP Thai Bank Hire Purchase Modernization',
    type: 'Company',
    description:
      'Integration case study: defining the target integration landscape for a Hire Purchase migration from a legacy platform to Mobius Core Banking.',
    longDescription:
      'Contributed from initial requirement gathering through integration scoping and Interface Design Document preparation. The work focused on clarifying system responsibilities, interface dependencies and end-to-end business flows before detailed API design and implementation.',
    categories: ['Integration', 'Backend', 'API'],
    stack: [
      'Mobius Core Banking',
      'REST APIs',
      'Kafka',
      'Scheduled APIs',
      'Batch / File Interfaces',
      'Interface Design Documents',
    ],
    github: null,
    demo: null,
    status: 'Case Study',
    featured: true,
    year: '2024–Present',
    problem:
      'The existing Hire Purchase platform was connected to a broad and complex integration landscape. Moving the capability to Mobius required the team to understand which systems communicated with the legacy platform, what each interface supported, and how those responsibilities should change in the target state.',
    solution:
      'Mapped the high-level application and integration landscape with the bank and Enterprise Architecture team, categorized interfaces by communication pattern, and established the target integration scope and system responsibilities before moving into field-level design.',
    architecture: [
      'KKP Systems',
      'CloudLink Integration',
      'Mobius Core Banking',
      'Other Cloud Applications',
    ],
    implementation:
      'Analyzed inbound and outbound interfaces across online APIs, Kafka events, scheduled APIs and batch/file processing. Contributed to consolidated Mobius-facing inquiries for customer information, loan and account balances, outstanding debt, relationships and other Hire Purchase data, while documenting complex loan creation and disbursement flows.',
    challenges:
      'Loan creation and disbursement involved multiple dependent steps and systems, including CIF synchronization, reference number generation, dealer creation or validation, dealer limit checks, rate validation and downstream processing across multiple channels. Each flow required clear sequencing and ownership across system boundaries.',
    learnings:
      'The IDD process provided a shared baseline for business stakeholders, system owners, architects and technical teams. It also reinforced that integration delivery starts with understanding what systems need to communicate, why they communicate and which mechanism fits each interaction.',
    futureImprovements:
      'Continue the detailed technical design with field-level mappings, transformation rules, API contracts, message schemas, error handling and implementation-specific sequence definitions for each approved interface.',
  },
  {
    slug: 'bizmathpro-quiz-platform',
    name: 'BizMathPro Quiz Platform',
    type: 'Personal/Freelance',
    description:
      'A complete math quiz platform built for a freelance client, combining a React frontend with a Sequelize.js REST API and hosted MySQL database.',
    longDescription:
      'BizMathPro is a simple math quiz experience created for a client. The responsive frontend presents the quiz flow clearly, while a separately deployed API handles quiz data and server-side operations.',
    categories: ['Frontend', 'Full Stack', 'Backend', 'API'],
    stack: [
      'React',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Sequelize.js',
      'MySQL',
      'REST API',
      'Vercel',
      'Render',
      'Clever Cloud',
    ],
    github: 'https://github.com/muizzthaqif10/Quiz-App',
    demo: 'https://bizmathpro.vercel.app',
    status: 'Live',
    featured: true,
    year: '2026',
    relatedRepos: [
      {
        name: 'Quiz API backend',
        url: 'https://github.com/muizzthaqif10/api-quiz-app',
      },
    ],
    problem:
      'The client needed a straightforward, accessible math quiz website with a separate backend for serving and managing quiz content.',
    solution:
      'Created a React frontend with Tailwind CSS and connected it to a Node.js and Sequelize.js REST API backed by hosted MySQL.',
    implementation:
      'The frontend is hosted on Vercel and uses the quiz API deployed with Render and Clever Cloud MySQL as its data source. Tailwind CSS provides the responsive layout while React manages the quiz interaction flow.',
    learnings:
      'This freelance project gave me practical experience delivering a complete frontend-to-API workflow, from responsive UI implementation through database-backed deployment and client-facing delivery.',
  },
  {
    slug: 'core-banking-integration-middleware',
    name: 'Core Banking Integration Middleware',
    type: 'Company',
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
    type: 'Personal/Freelance',
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
    type: 'Company',
    description:
      'Internship project: a Vue.js social content tool that generates engaging captions and supports secure multi-platform publishing.',
    categories: ['Frontend', 'Integration'],
    stack: ['Vue.js', 'Axios', 'Node.js', 'OAuth', 'Quill', 'Postman'],
    github: null,
    demo: null,
    status: 'Archived',
    featured: false,
    year: '2023',
    problem:
      'Text2Social needed a way for clients to generate engaging captions and connect third-party social accounts for automated publishing.',
    solution:
      'Contributed Vue.js features for caption generation and implemented secure authentication flows for Facebook, Instagram, LinkedIn and Twitter integrations.',
    implementation:
      'Used the LinkedIn API, Facebook SDK and Twitter API to manage access tokens and support automated posting, while collaborating with backend developers and troubleshooting platform issues.',
    learnings:
      'My first exposure to authentication flows in a real product — specifically the details of OAuth handshakes and SDK-based auth, which don\'t fully click until you\'ve had to debug one that isn\'t working.',
  },
];
