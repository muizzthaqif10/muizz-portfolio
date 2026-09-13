const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const root = path.resolve(__dirname, '..');
const outputPath = path.join(root, 'public', 'resume.pdf');

function addWrappedText(doc, text, options = {}) {
  const {
    font = 'Helvetica',
    size = 10,
    color = '#1f2937',
    indent = 0,
    bullet = false,
    lineGap = 2,
    maxWidth,
  } = options;

  doc.font(font).fontSize(size).fillColor(color);
  const lines = doc
    .font(font)
    .fontSize(size)
    .currentLineHeight();

  if (bullet) {
    doc.text('• ', { continued: true, indent, width: maxWidth || 500 });
  }

  const wrapOptions = {
    width: maxWidth || 500,
    indent,
    continued: bullet,
    lineGap,
  };

  if (typeof text === 'string') {
    doc.text(text, wrapOptions);
  } else {
    text.forEach((line) => doc.text(line, wrapOptions));
  }
}

function addSection(doc, title, x = 72, y = doc.y) {
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#0f766e').text(title, x, y, { characterSpacing: 0.8 });
  doc.moveTo(x, doc.y + 6).lineTo(520, doc.y + 6).strokeColor('#dfe7ee').stroke();
  doc.moveDown(0.6);
}

const doc = new PDFDocument({
  size: 'LETTER',
  margin: 54,
  info: {
    Title: 'Muizzuddin Thaqif Ramlee Resume',
    Author: 'Muizzuddin Thaqif Ramlee',
    Subject: 'Software Engineer Resume',
  },
});

doc.pipe(fs.createWriteStream(outputPath));

doc.fillColor('#111827');

doc.font('Helvetica-Bold').fontSize(24).text('MUIZZUDDIN THAQIF BIN RAMLEE', { align: 'left' });
doc.moveDown(0.2);
doc.font('Helvetica').fontSize(11).fillColor('#475569').text('Software Engineer | Integration & Backend Specialist');
doc.moveDown(0.5);
doc.font('Helvetica').fontSize(9).fillColor('#475569').text('+60 11-5165 2817   |   muizz.thaqif@gmail.com   |   Cheras, Selangor, Malaysia   |   linkedin.com/in/muizzuddin-thaqif-ramlee');
doc.moveDown(1.1);

doc.moveTo(54, doc.y).lineTo(558, doc.y).strokeColor('#dfe7ee').stroke();
doc.moveDown(0.8);

addSection(doc, 'PROFESSIONAL SUMMARY');
doc.font('Helvetica').fontSize(9.5).fillColor('#1f2937').text(
  'Results-driven Software Engineer with hands-on experience in enterprise system integration, Java/Spring Boot backend development, and cloud-native deployment within the banking and financial services sector. Proven track record as a project-side technical owner for cross-border banking integrations — root-causing critical middleware defects, authoring integration standards adopted across engineering teams, and building QA tracking tooling that improves release reliability. Brings strong functional understanding of core banking and lending processes (loan booking, disbursement, EIR and amortisation) alongside deep technical expertise in RESTful API design, message mapping, and database-driven configuration management. Adept at producing comprehensive technical documentation (IDD, TSD) and coordinating across product, architecture, QA, and infrastructure teams to drive end-to-end delivery.',
  { width: 500, align: 'justify' }
);
doc.moveDown(0.7);

addSection(doc, 'CORE COMPETENCIES');
const competencies = [
  'Enterprise System Integration',
  'API Design & Engineering',
  'Java & Spring Boot',
  'Microservices Architecture',
  'Banking & Fintech Systems',
  'Kafka & Event-Driven Design',
  'Kubernetes & Cloud-Native',
  'Message Mapping & Data Transformation',
  'Root Cause Analysis & Debugging',
  'Change & Incident Management (CR/IR)',
  'Database Schema Design & SQL',
  'Technical Documentation',
  'Solution & Interface Design',
  'CI/CD & DevOps Practices',
  'Cross-Functional Collaboration',
  'Performance & Regression Testing',
  'Requirements Analysis',
  'Error/Status-Code Standardization',
];

doc.font('Helvetica').fontSize(9).fillColor('#1f2937');
const cols = [competencies.slice(0, 9), competencies.slice(9)];
const left = 72;
const right = 315;
const colWidth = 180;
for (let i = 0; i < Math.max(cols[0].length, cols[1].length); i += 1) {
  const leftText = cols[0][i] || '';
  const rightText = cols[1][i] || '';
  if (leftText) doc.text(`• ${leftText}`, left, doc.y, { width: colWidth });
  if (rightText) doc.text(`• ${rightText}`, right, doc.y, { width: colWidth });
  doc.moveDown(0.25);
}
doc.moveDown(0.4);

addSection(doc, 'TECHNICAL SKILLS');
const skills = [
  ['Languages', 'Java, SQL, JavaScript, PHP, Lua'],
  ['Backend / APIs', 'Spring Boot, REST APIs, JSON, DTO Design, API Integration, Microservices'],
  ['Integration', 'Enterprise Integration, System-to-System Integration, API Gateway, IDD, Data Mapping, JSON/Fixed-Length/XML Transformation, JRQ/JRS/SRQ/SRS Message Structures, Lookup & Conditional Mapping'],
  ['Messaging', 'Apache Kafka, Event-Driven Architecture, Message Queues, Async Processing'],
  ['Cloud & DevOps', 'Kubernetes, Helm Charts, Docker, Argo CD, Linux, CI/CD Pipelines, Git, Jenkins'],
  ['Databases', 'MySQL, TiDB/MariaDB, Firebase, Liquibase, DDL/Schema Design, Relational DB Design, SQL Querying, Data Validation'],
  ['Issue & Release Mgmt', 'Change Requests (CR), Incident Reports (IR), Root-Cause Documentation, Regression & Release Validation, Multi-Environment Promotion (DEV/DEV2/VIT2/SIT/UAT/PROD)'],
  ['Documentation', 'IDD, TSD, System Architecture Diagrams, API Specifications, OpenAPI/Swagger'],
  ['Frontend', 'Vue.js, React.js, Node.js, HTML, CSS'],
  ['Tools', 'Postman, Mockoon, Swagger/OpenAPI, Obsidian, Jira, Confluence, Git/GitLab, DBeaver, Huawei Console'],
];

for (const [label, value] of skills) {
  doc.font('Helvetica-Bold').fontSize(9).fillColor('#111827').text(`${label}: `, { continued: true });
  doc.font('Helvetica').fontSize(9).fillColor('#374151').text(value, { width: 420, lineGap: 2 });
  doc.moveDown(0.2);
}
doc.moveDown(0.5);

addSection(doc, 'PROFESSIONAL EXPERIENCE');

doc.font('Helvetica-Bold').fontSize(10.5).fillColor('#111827').text('Software Engineer — Project Delivery & Integration');
doc.font('Helvetica').fontSize(9).fillColor('#475569').text('April 2024 – Present');
doc.font('Helvetica').fontSize(9).fillColor('#475569').text('Silverlake Structured Services Sdn Bhd | CloudLink.AI');
doc.moveDown(0.4);
const silverlakeBullets = [
  'Delivered end-to-end integration support for CloudLink, a middleware platform facilitating message translation and routing between Mobius Core Banking and external/legacy banks, ensuring seamless interoperability across channels.',
  'Configured and deployed CloudLink on Kubernetes VM environments, managing Helm chart settings, environment variables, and pod configurations to maintain high availability across development, UAT, and production environments.',
  'Designed and executed test cases covering transaction simulation, edge-case validation, and regression testing; produced test reports measuring TPS, transaction bucket throughput, and timeout thresholds for stakeholder review.',
  'Performed performance testing using in-house tooling, simulating thousands of concurrent transactions to validate system stability under peak load conditions.',
  'Served as the project-side technical owner for CloudLink integration delivery on the KKP hire-purchase banking project, coordinating with the CloudLink Product Team, Runtime/IO Engine teams, and banking stakeholders to deliver configurations, mappings, fixes, enhancements, and production-ready integration solutions.',
  'Delivered enterprise banking integrations using CloudLink.AI middleware, managing end-to-end configuration through its web administration platform — channel/host setup, message-type transformation, mapping maintenance, and lookup/script-function configuration across JSON, fixed-length, and XML formats.',
  'Owned source-to-target message translation and mapping design between banking systems and Mobius, including conditional/lookup logic, JSON and fixed-length transformations, date/time conversion, and character encoding handling.',
  'Authored comprehensive Interface Design Documents (IDDs) covering architecture diagrams, API request/response schemas, mapping specifications, and integration flows used as the technical reference by development, QA, architecture, and infrastructure teams.',
  'Drove CloudLink product enhancements and CR/IR delivery end-to-end with the Product Team — issue reproduction, root-cause analysis, impact assessment, solution design, implementation coordination, deployment, and fix validation.',
  'Investigated and resolved complex integration defects including JSONPath/null propagation, mapping conflicts, lookup failures, Lua-based date conversion, header/authorization handling, character encoding, and message transformation issues.',
  'Worked across TiDB, MariaDB, MySQL and Liquibase to support integration configuration and environment promotion, resolving schema, DDL, primary-key, migration and deployment issues.',
  'Diagnosed Kubernetes and middleware infrastructure issues — pod crashes, health-check failures, routing issues, runtime instability, Kafka broker configuration, and version compatibility using Kubernetes, Docker, Helm, Argo CD, Git and Linux across environments.',
];
for (const item of silverlakeBullets) {
  doc.font('Helvetica').fontSize(8.7).fillColor('#374151').text(`• ${item}`, { width: 480, align: 'left' });
  doc.moveDown(0.22);
}

doc.moveDown(0.5);
doc.font('Helvetica-Bold').fontSize(10.5).fillColor('#111827').text('Frontend Developer Intern');
doc.font('Helvetica').fontSize(9).fillColor('#475569').text('September 2023 – February 2024');
doc.font('Helvetica').fontSize(9).fillColor('#475569').text('Nexmind AI');
doc.moveDown(0.4);
const internshipBullets = [
  'Contributed to Text2Social using Vue.js, enabling clients to generate engaging social media captions to strengthen their online presence.',
  'Collaborated with backend developers to design and implement authentication flows for Facebook, Instagram, LinkedIn, and Twitter integrations.',
  'Integrated secure authentication mechanisms using the LinkedIn API, Facebook SDK, and Twitter API to manage user access tokens and enable automated posting of generated content.',
  'Assisted with debugging, troubleshooting, and resolving platform issues to improve the stability and performance of the NexMind AI platform.',
];
for (const item of internshipBullets) {
  doc.font('Helvetica').fontSize(8.7).fillColor('#374151').text(`• ${item}`, { width: 480 });
  doc.moveDown(0.22);
}
doc.moveDown(0.8);

addSection(doc, 'KEY ACHIEVEMENTS');
const achievements = [
  'Technical Delivery Ownership: Served as the project-side technical owner for CloudLink integration delivery on a cross-border KKP hire-purchase banking project, coordinating across Product, Runtime, QA, and Architecture teams to ship production-ready integration solutions.',
  'Standardized API Mapping: Root-caused a critical two-pass mapping-engine defect affecting alternate-path error handling and authored the resulting integration pattern, subsequently adopted as the default implementation standard across inbound API mappings.',
  'Delivered Critical Integration Fixes: Owned and drove resolution of multiple Change Requests (CRs) and Incident Reports (IRs), covering mapping defects, date/time handling, and logging/persistence issues, from root-cause analysis through fix validation.',
  'Unblocked Cross-Border Integration: Investigated a TiDB composite primary-key limitation affecting database design and delivered a compatible schema redesign, enabling a stalled cross-border integration requirement to proceed.',
  'Delivered Enterprise Banking Integration: Supported KKP Bank’s hire purchase banking integration, connecting Mobius Core Banking with legacy and external systems through CloudLink middleware for mission-critical financial transaction processing.',
  'Established Integration Documentation & QA Visibility: Authored authoritative Interface Design Documents (IDDs) and built QA/release tracking dashboards covering API test coverage, pass rates, and deployment coordination across five environments.',
  'Validated System Performance & Reliability: Conducted structured performance testing and transaction simulation to establish TPS benchmarks and system reliability metrics for stakeholder validation.',
];
for (const item of achievements) {
  doc.font('Helvetica').fontSize(8.7).fillColor('#374151').text(`• ${item}`, { width: 480, align: 'left' });
  doc.moveDown(0.2);
}
doc.moveDown(0.6);

addSection(doc, 'EDUCATION');
doc.font('Helvetica-Bold').fontSize(10).fillColor('#111827').text('Bachelor of Software Engineering (Information System Development) (Hons)');
doc.font('Helvetica').fontSize(9).fillColor('#475569').text('Sept 2020 – Sept 2023');
doc.font('Helvetica').fontSize(9).fillColor('#475569').text('Universiti Kebangsaan Malaysia (UKM)');
doc.font('Helvetica').fontSize(9).fillColor('#475569').text('CGPA: 3.5 | Major: Information System Development');
doc.font('Helvetica').fontSize(9).fillColor('#475569').text('Relevant Coursework: Object-Oriented Programming, Data Structures & Algorithms, Software Engineering Principles, Database Management Systems, Web Application Development, Computer Networks, AI & Machine Learning');
doc.moveDown(0.3);
doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#111827').text('Foundation in Pure Science');
doc.font('Helvetica').fontSize(9).fillColor('#475569').text('Pusat Genius Pintar UKM | Jun 2019 – Jun 2020 | Grade 3.5');
doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#111827').text('Secondary School');
doc.font('Helvetica').fontSize(9).fillColor('#475569').text('Sekolah Menengah Sains Lahad Datu, Sabah | SPM: 9A');
doc.moveDown(0.8);

addSection(doc, 'CERTIFICATIONS, LANGUAGES & ADDITIONAL');
const additional = [
  'Vue.js 2: From Beginner to Professional — Udemy',
  'Responsive Website Development Using HTML/CSS — Udemy',
  'JavaScript: From Beginner to Expert — Udemy',
  'Self-Directed Learning: Explored building a RAG-based AI agent using Claude’s API to automate document-heavy workflows',
  'Languages: English (Professional), Bahasa Malaysia (Native)',
];
for (const item of additional) {
  doc.font('Helvetica').fontSize(8.8).fillColor('#374151').text(`• ${item}`, { width: 480 });
  doc.moveDown(0.2);
}

doc.end();
console.log(`Generated resume PDF at ${outputPath}`);
