export const profile = {
  name: "Akashraj Kalathingal",
  title: "Senior Software Engineer",
  tagline: "I design and ship the backend systems and AI platforms that move money and inform decisions at scale.",
  location: "Toronto, ON",
  email: "akashraj0134@gmail.com",
  phone: "+1 (548) 333-6191",
  github: "https://github.com/akashraj11",
  linkedin: "https://www.linkedin.com/in/akashrajkalathingal/",
  portfolioLegacy: "https://akashraj-kalathingal-portfolio.netlify.app",
  resumeUrl: "/Akashraj_Kalathingal_Resume_Master.pdf",
  yearsExperience: 6,
};

export const summary = [
  "Senior full-stack engineer with 6+ years building high-scale, mission-critical systems across banking, payments, and enterprise data platforms.",
  "Currently a Senior Full Stack Engineer at RBC, setting up Java 25 / Spring Boot 4.x microservices from scratch and enabling new and existing repositories for the AI Development Life Cycle (AI-DLC) as a core architect on the enterprise Agentic Lab. Previously built an LLM-powered financial advisory chatbot at BMO using Java microservices, MCP tools, and Azure-backed RAG pipelines, and led ISO 20022 modernization at Scotiabank for high-value wire payments processing billions of dollars in daily volume.",
  "I write the design doc, ship the service, own the on-call rotation, and mentor the next engineer.",
];

export const expertise = [
  "Distributed Systems",
  "Microservices",
  "Java / Spring Boot",
  "React / Angular",
  "Cloud Native (AWS, Azure, OCP)",
  "Event-Driven Architecture",
  "LLM & RAG Platforms",
  "Agentic AI & AI-DLC",
  "Payments Infrastructure",
];

export const rotatingTitles = [
  "Backend Engineering",
  "Distributed Systems",
  "Cloud Architecture",
  "Microservices at Scale",
  "System Design",
  "AI / LLM Platforms",
  "Agentic Development (AI-DLC)",
  "Payments Infrastructure",
  "Performance Engineering",
];

export type Role = {
  company: string;
  companyShort: string;
  role: string;
  start: string;
  end: string;
  location: string;
  blurb: string;
  highlights: string[];
  stack: string[];
  scale: { label: string; value: string }[];
};

export const experience: Role[] = [
  {
    company: "Royal Bank of Canada (RBC)",
    companyShort: "RBC",
    role: "Senior Full Stack Engineer — Consumer Banking & Enterprise Agentic Lab",
    start: "Jul 2026",
    end: "Present",
    location: "Toronto, ON",
    blurb:
      "Building greenfield Java 25 / Spring Boot 4.x microservices for the Consumer Banking investment platform, and helping lead the enterprise Agentic Lab's move to the AI Development Life Cycle (AI-DLC).",
    highlights: [
      "Set up multiple backend microservices from scratch on Java 25 and Spring Boot 4.x, running on Liberty server and OpenShift, with custom REST APIs, end-to-end Spring Security, and Resilience4j circuit breakers and retries.",
      "Work within the AI Development Life Cycle (AI-DLC), the new AI-native model of software delivery, and enabled both new and existing repositories for AI-DLC through agentic repo setup so teams adopt it consistently.",
      "Selected as a core architect for the enterprise Agentic Lab: designed and deployed reusable AI agents, custom skills, and optimized workflows, and standardized LLM prompt and token strategies for cost efficiency.",
      "Implemented scheduled background processing with Spring Scheduler and ShedLock for single-node execution across service instances, with service data persisted in MongoDB.",
      "Built API integrations with downstream enterprise services and designed MapStruct mapping layers to translate schemas between upstream contracts and downstream systems.",
      "Spearheaded integration of the Investment Account Opening flow into the core Consumer Banking platform across web and mobile journeys, and decoupled legacy monolithic business logic into isolated microservices.",
      "Hardened investment backend services by resolving critical vulnerabilities surfaced through SAST, SCA, and LLM static-analysis scans.",
    ],
    stack: ["Java 25", "Spring Boot 4.x", "Spring Scheduler", "ShedLock", "Spring Security", "Resilience4j", "MapStruct", "MongoDB", "Liberty", "OpenShift", "AI-DLC", "GitHub Copilot", "Windsurf"],
    scale: [
      { label: "Services built from scratch", value: "Multiple" },
      { label: "Delivery model", value: "AI-DLC" },
      { label: "Runtime", value: "Java 25 · Boot 4.x" },
    ],
  },
  {
    company: "Bank of Montreal (BMO)",
    companyShort: "BMO",
    role: "Senior Software Engineer — AdviceDirect & AI Advisory Platform",
    start: "Apr 2025",
    end: "Jul 2026",
    location: "Toronto, ON",
    blurb:
      "Building BMO InvestorLine's AI-powered financial advisory chatbot — Java microservices exposing banking capabilities as MCP tools for LLM RAG pipelines.",
    highlights: [
      "Architected Java/Spring Boot microservices that expose internal banking APIs as MCP tools consumed by an LLM agent, enabling tool-using AI workflows on regulated banking data.",
      "Designed data ingestion pipelines with Kedro and Azure Document Intelligence powering retrieval-augmented generation across the chatbot's knowledge base.",
      "Led secrets-management migration from OpenShift to HashiCorp Vault across 10+ production services — eliminating in-cluster secret stores in favor of Vault-issued dynamic credentials.",
      "Drove on-prem to AWS migration of critical production services with IaC-driven deployments and multi-AZ resilience.",
      "Shipped modular Angular components and RESTful APIs for the AdviceDirect onboarding journey across self-directed and assisted-investing flows.",
    ],
    stack: ["Java 17", "Spring Boot", "Angular", "MCP", "Kedro", "Azure", "AWS", "OpenShift", "HashiCorp Vault", "Ansible"],
    scale: [
      { label: "Services migrated to Vault", value: "10+" },
      { label: "Cloud platforms", value: "Azure" },
      { label: "Bank assets", value: "C$1.4T+" },
    ],
  },
  {
    company: "Scotiabank",
    companyShort: "Scotia",
    role: "Software Engineer — High-Value Payments & Core Banking",
    start: "Jan 2024",
    end: "Feb 2025",
    location: "Toronto, ON",
    blurb:
      "Engineered Scotiabank's next-generation high-value payments platform — billions in daily SWIFT volume, ISO 20022 modernization, fraud-integrated wire flows.",
    highlights: [
      "Led ISO 20022 migration for outgoing MX-format wire payments — automating fraud validation, FX conversion, and charges posting in alignment with global SWIFT 2025 standards.",
      "Acted as both IBM FTM developer and Java full-stack engineer on Scotiabank's core payments platform handling Canadian and cross-border transactions.",
      "Owned end-to-end SSL/TLS certificate remediation across production payment applications, preventing service disruption and closing audit findings.",
      "Provided front-line production support on rotating on-call for systems with strict business-hour SLAs and zero tolerance for transaction loss.",
      "Evaluated interrelationships across payment hubs, fraud engines, and clearing systems — providing build-vs-buy recommendations on multi-million dollar platform investments.",
    ],
    stack: ["Java", "Spring Boot", "IBM FTM", "IBM IIB", "IBM MQ", "Oracle", "SWIFT MT/MX", "ISO 20022"],
    scale: [
      { label: "Daily transaction volume", value: "Billions $" },
      { label: "Payment standard", value: "ISO 20022" },
      { label: "Production SLA", value: "24x7" },
    ],
  },
  {
    company: "Target Corporation",
    companyShort: "Target",
    role: "Senior Software Engineer — Enterprise Orchestration Platform",
    start: "Dec 2019",
    end: "Apr 2023",
    location: "Bangalore, India",
    blurb:
      "Scaled core microservices for Target's enterprise data orchestration platform — petabyte-scale workflows, self-healing job recovery, real-time analytics.",
    highlights: [
      "Designed and scaled core microservices for Target's enterprise data orchestration and scheduling platform moving petabyte-scale data across heterogeneous systems.",
      "Architected the platform's Patroller subsystem for self-healing job recovery, materially improving job success rates and reducing operator pages across peak retail seasons.",
      "Built the platform's reporting and analytics layer on Apache Druid + Grafana, giving leadership real-time visibility into throughput, error rates, and capacity utilization.",
      "Drove platform-wide Log4Shell (CVE-2021-44228) remediation, coordinating patching across services under tight executive timelines.",
      "Modernized the platform UI in React (Hooks, Context API, Material UI) — reusable components adopted by hundreds of internal users.",
      "Won the Target Data Science Hackathon; awarded multiple Pyramid Performance Awards and Quarterly Best Performer.",
    ],
    stack: ["Java", "Spring Boot", "React", "Apache Druid", "Apache Hive", "Apache Spark", "Kafka", "Kubernetes", "Drone", "Jenkins"],
    scale: [
      { label: "Data movement", value: "Petabyte-scale" },
      { label: "Company revenue", value: "$107B (Fortune 50)" },
      { label: "Peak event coverage", value: "BFCM" },
    ],
  },
  {
    company: "CGI Inc.",
    companyShort: "CGI",
    role: "Software Engineer",
    start: "Aug 2018",
    end: "Dec 2019",
    location: "Bangalore, India",
    blurb:
      "Built an enterprise ERP web application and an event-hosting platform end-to-end — backend, data modeling, REST APIs, and frontend delivery.",
    highlights: [
      "Owned backend services (Java/Spring), relational data modeling, REST APIs, and frontend delivery for an enterprise ERP application.",
      "Investigated and resolved high-severity production defects under strict client SLAs with reproducible RCAs.",
      "Authored production-grade technical documentation and runbooks adopted as onboarding material for new engineers.",
    ],
    stack: ["Java", "Spring", "JavaScript", "SQL"],
    scale: [
      { label: "Org size", value: "Global Fortune 500 IT services" },
      { label: "Domain", value: "ERP / Events" },
    ],
  },
];

export const skills = [
  {
    category: "Languages",
    items: ["Java (8/11/17/25)", "TypeScript", "JavaScript", "Python", "SQL", "Scala", "GraphQL"],
  },
  {
    category: "Backend & Frameworks",
    items: ["Spring Boot (3.x / 4.x)", "Spring MVC", "Spring Batch", "Spring Scheduler", "ShedLock", "Spring Security", "Resilience4j", "MapStruct", "REST", "gRPC", "Kafka", "OAuth2 / JWT", "JPA / Hibernate"],
  },
  {
    category: "Frontend",
    items: ["React (Hooks, Router, Context)", "Angular", "Material UI", "Redux", "Cypress"],
  },
  {
    category: "Cloud & Infra",
    items: ["AWS (EKS, S3, Lambda)", "Azure", "GCP", "Kubernetes", "OpenShift", "Liberty Server", "Docker", "Ansible", "HashiCorp Vault"],
  },
  {
    category: "Data & Storage",
    items: ["PostgreSQL", "Oracle", "IBM DB2", "MongoDB", "Neo4j", "Apache Hadoop", "Apache Hive", "Apache Spark", "Apache Druid"],
  },
  {
    category: "AI / ML Platforms",
    items: ["Agentic AI Development", "AI-DLC (AI Development Life Cycle)", "Agentic Repo Enablement", "Spec-Driven Development", "GitHub Copilot", "Windsurf", "LLM RAG Pipelines", "MCP (Model Context Protocol)", "Vector Embeddings", "Kedro", "Azure Document Intelligence", "scikit-learn"],
  },
  {
    category: "DevOps & CI/CD",
    items: ["Azure DevOps", "Jenkins", "Drone", "GitHub Actions", "Maven", "Gradle", "SonarQube"],
  },
  {
    category: "Observability",
    items: ["Grafana", "Kibana", "ELK Stack", "Splunk", "Filebeat", "DOMO"],
  },
  {
    category: "Payments & Banking",
    items: ["IBM FTM", "IBM IIB", "IBM MQ", "IBM WebSphere", "SWIFT", "ISO 20022 (MX)", "Wire & FX Processing"],
  },
];

export const caseStudies = [
  {
    slug: "agentic-ai-dlc",
    title: "Enterprise Agentic Lab & AI-DLC Enablement",
    subtitle: "RBC • 2026–Present",
    summary:
      "Core architect on RBC's enterprise Agentic Lab: reusable AI agents, custom skills, and agentic repo setup that moves new and existing codebases onto the AI Development Life Cycle (AI-DLC), alongside greenfield Java 25 / Spring Boot 4.x microservices.",
    problem:
      "Teams were adopting AI coding tools unevenly, with inconsistent prompts, rising token costs, and no shared way of working. Legacy and new repositories each needed to be ready for an AI-native delivery model without slowing down feature work.",
    approach: [
      "Designed and deployed reusable AI agents, custom skills, and optimized workflows that teams across the enterprise can adopt as-is.",
      "Enabled new and existing repositories for AI-DLC through agentic repo setup, so the same workflow applies from day one on greenfield services and retrofits onto legacy code.",
      "Standardized LLM prompt and token strategies and integrated GitHub Copilot and Windsurf across multiple LLM backends to support Spec-Driven Development, documentation, and architecture planning.",
      "Applied the same model to real delivery: set up multiple Spring Boot 4.x microservices from scratch with Spring Security, Resilience4j, MapStruct schema mapping, downstream API integration, and Spring Scheduler with ShedLock over MongoDB.",
    ],
    impact: [
      "A repeatable AI-DLC setup that new and existing repositories can adopt consistently.",
      "Lower LLM cost and faster cross-team development through shared prompt and token standards.",
      "Several production-ready microservices stood up on a modern Java 25 / Spring Boot 4.x baseline.",
    ],
    stack: ["Java 25", "Spring Boot 4.x", "Spring Scheduler", "ShedLock", "MongoDB", "Resilience4j", "MapStruct", "Liberty", "OpenShift", "GitHub Copilot", "Windsurf"],
  },
  {
    slug: "ai-banking-chatbot",
    title: "AI-Powered Financial Advisory Chatbot",
    subtitle: "BMO InvestorLine • 2025–2026",
    summary:
      "Customer-facing AI chatbot for personalized investment advice across BMO retail accounts. Java microservices expose banking APIs as MCP tools consumed by the LLM, with a Kedro + Azure Document Intelligence ingestion layer powering RAG.",
    problem:
      "Retail investors need timely, personalized advisory but human advisors don't scale. The system must reason over real account data and regulated financial documents — without leaking secrets, hallucinating numbers, or violating compliance.",
    approach: [
      "Designed Java/Spring Boot microservices exposing banking capabilities as MCP tools with strict input/output schemas, scoped auth, and audit logging.",
      "Built Kedro pipelines + Azure Document Intelligence to extract entities and embeddings from prospectuses, statements, and filings into a vector store.",
      "Engineered tool-use orchestration, prompt routing, and deterministic guardrails so advisory outputs are auditable, citation-backed, and bounded.",
      "Operated on OpenShift with autoscaling, zero-downtime rollouts, and Vault-managed secrets.",
    ],
    impact: [
      "Foundational infrastructure for BMO's customer-facing AI advisory product.",
      "Tool-use pattern reusable across other AI-powered banking features.",
    ],
    stack: ["Java 17", "Spring Boot", "MCP", "Kedro", "Azure Document Intelligence", "OpenShift", "AWS", "HashiCorp Vault"],
  },
  {
    slug: "iso-20022-payments",
    title: "ISO 20022 High-Value Wire Payment Automation",
    subtitle: "Scotiabank • 2024–2025",
    summary:
      "Modernization of outgoing high-value wire payments to align with global SWIFT 2025 standards. Automated processing of MX-format wire messages with fraud validation, FX conversion, and charge posting.",
    problem:
      "SWIFT's industry-wide migration from MT to ISO 20022 MX required Scotiabank to overhaul its high-value payment pipeline — without disrupting billions in daily transaction flow or breaking integrations with hubs, fraud engines, and clearing systems.",
    approach: [
      "Designed planning matrices and impact analyses for ISO 20022 enablement across the payments stack, partnering with risk, fraud, and SWIFT operations.",
      "Built automated processing for MX wire messages — fraud validation, FX conversion, charges posting — replacing manual operator workflows.",
      "Hardened SSL/TLS certificate lifecycle management across the payment platform, preventing service-affecting expirations and closing audit findings.",
    ],
    impact: [
      "Aligned Scotiabank with global SWIFT 2025 mandates ahead of deadlines.",
      "Eliminated manual operator steps on a critical, high-stakes payment path.",
      "Zero certificate-related production incidents during ownership tenure.",
    ],
    stack: ["Java", "Spring Boot", "IBM FTM", "IBM IIB", "IBM MQ", "Oracle", "SWIFT MX", "ISO 20022"],
  },
  {
    slug: "patroller-self-healing",
    title: "Patroller — Self-Healing Job Recovery Engine",
    subtitle: "Target Corporation • 2019–2023",
    summary:
      "A reliability subsystem for Target's enterprise data orchestration platform that detects stuck and failed workflows, retries with backoff, escalates, and feeds telemetry into Druid + Grafana.",
    problem:
      "Petabyte-scale workflow orchestration during Black Friday / Cyber Monday peak generated long-tail failures across heterogeneous systems. Manual operator intervention didn't scale and paged engineers around the clock.",
    approach: [
      "Built detection logic for stuck and failed workflows with exponential backoff and dead-letter queues.",
      "Designed an escalation policy with operator-overrides and automatic ticket creation for unrecoverable jobs.",
      "Modeled Druid datasources for sub-second slice-and-dice across throughput, latency, and error metrics — adopted by leadership for capacity decisions.",
    ],
    impact: [
      "Materially reduced operator paging load during Target's highest-throughput retail events.",
      "Improved end-to-end job success rates across the platform.",
      "Became the source-of-truth dashboard for platform health and capacity planning.",
    ],
    stack: ["Java", "Spring Boot", "Apache Druid", "Kafka", "Grafana", "Kubernetes"],
  },
];

export const education = [
  {
    school: "Conestoga College",
    degree: "PG Certificate, Big Data Solutions & Architecture",
    when: "2023",
    note: "High Distinction • Dean's Honour List (top of cohort)",
  },
  {
    school: "UT Austin, McCombs School of Business",
    degree: "PG Program, AI & Machine Learning",
    when: "2020 – 2021",
    note: "",
  },
  {
    school: "National Institute of Technology, Calicut",
    degree: "B.Tech, Computer Science & Engineering",
    when: "2014 – 2018",
    note: "One of India's premier engineering institutes",
  },
];

export const awards = [
  "Winner — Target Corporation Data Science Hackathon",
  "Pyramid Performance Award (multiple) — Target & Scotiabank",
  "Quarterly Best Performer Award — Target Corporation",
  "Dean's Honour List — Conestoga College",
];

export const snapshot = {
  yearsExperience: "6+",
  productionScale: "Petabyte-scale",
  cloudPlatforms: "AWS · Azure · GCP",
  primaryLanguages: "Java · TypeScript · Python",
};
