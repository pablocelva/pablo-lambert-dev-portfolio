import type { Project } from '../lib/schemas/project.schema';
import type { Experience } from '../lib/schemas/experience.schema';
import type { Certification } from '../lib/schemas/certification.schema';
import type { Service } from '../lib/schemas/service.schema';
import type { Profile } from '../lib/schemas/profile.schema';

export const initialProfile: Profile = {
  fullName: 'Pablo Lambert',
  headline: 'Full Stack Developer & AI Solutions Engineer',
  subheadline: 'Construyo aplicaciones web robustas y escalables, combinando ingeniería de software de alto rendimiento con inteligencia artificial aplicada, visualización de datos y diseño UX centrado en resultados.',
  location: 'Santiago, Chile · Disponible para trabajo Remoto Global',
  availability: 'Disponible para posiciones Senior / Staff Full Stack y Proyectos de Consultoría',
  experienceYears: 6,
  email: 'pablo.lambert.dev@gmail.com',
  github: 'https://github.com/pablolambert-dev',
  linkedin: 'https://linkedin.com/in/pablolambert-dev',
  cvUrl: '/cv-pablo-lambert.pdf',
  recruiterSummary: {
    topSkills: ['Full Stack Architecture', 'TypeScript/Node.js', 'React/Astro', 'Python & AI Pipelines (RAG/Agents)', 'Data Engineering (SQL/Vector)', 'UX/UI Engineering (WCAG AAA)'],
    primaryStack: ['TypeScript', 'Astro', 'React / Next.js', 'Node.js', 'Python', 'PostgreSQL / Supabase', 'Docker / Cloud Native'],
    languages: ['Español (Nativo)', 'Inglés (C1 Profesional Fluido)'],
    idealRoles: ['Senior / Staff Full Stack Developer', 'AI Solutions / Full Stack Engineer', 'Frontend & UX Architect', 'Technical Consultant'],
    timezone: 'UTC-3 / UTC-4 (Overlap directo con USA EST/PST y Europa)'
  },
  metrics: [
    {
      value: '+6 Años',
      label: 'Experiencia Profesional',
      description: 'Liderando desarrollo y arquitectura en entornos ágiles.'
    },
    {
      value: '+25 Proyectos',
      label: 'Desplegados a Producción',
      description: 'Desde plataformas SaaS hasta pipelines de IA y Data.'
    },
    {
      value: '99.98%',
      label: 'SLA de Disponibilidad',
      description: 'Arquitecturas tolerantes a fallos con observabilidad activa.'
    },
    {
      value: '100 / 100',
      label: 'Core Web Vitals & a11y',
      description: 'Compromiso riguroso con performance, UX y estándares web.'
    }
  ]
};

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    slug: 'nexus-ai-orchestrator',
    title: 'NexusAI · Autonomous Agent & RAG Platform',
    tagline: 'Plataforma empresarial de orquestación de agentes IA y recuperación semántica con latencia sub-120ms.',
    description: 'Sistema integral de orquestación de flujos de trabajo autónomos para empresas. Integra bases vectoriales distribuidas (pgvector), conectores para modelos LLM (OpenAI, Anthropic, Gemini) y un motor de evaluación en tiempo real con observabilidad continua.',
    category: 'ai-ml',
    tags: ['AI Agents', 'RAG', 'TypeScript', 'Python', 'pgvector', 'Supabase', 'FastAPI'],
    featured: true,
    metrics: [
      { label: 'Latencia RAG', value: '<120ms' },
      { label: 'Precisión de respuesta', value: '98.4%' },
      { label: 'Documentos procesados', value: '+2.5M' }
    ],
    techStack: ['TypeScript', 'FastAPI', 'Python', 'LangChain', 'Supabase / pgvector', 'React', 'Tailwind', 'Docker'],
    architectureNotes: 'Arquitectura híbrida serverless con ingestion pipeline asíncrono sobre Celery + Redis, streaming de tokens vía WebSockets y almacenamiento híbrido en Supabase.',
    githubUrl: 'https://github.com/pablolambert-dev/nexus-ai-orchestrator',
    demoUrl: 'https://nexus-ai-preview.pablolambert-dev.com',
    caseStudyUrl: '',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    order: 1,
    published: true
  },
  {
    id: 'proj-2',
    slug: 'insight-stream-analytics',
    title: 'InsightFlow · Real-Time Data Intelligence',
    tagline: 'Motor de analítica y visualización de datos de streaming de alto volumen para SaaS.',
    description: 'Plataforma de inteligencia de negocio y monitoreo en tiempo real capaz de procesar hasta 450k eventos por segundo. Proporciona dashboards interactivos con drill-down instantáneo y detección automática de anomalías mediante algoritmos estadísticos.',
    category: 'data-science',
    tags: ['Data Science', 'Streaming ETL', 'DuckDB', 'Python', 'React', 'ECharts', 'ClickHouse'],
    featured: true,
    metrics: [
      { label: 'Eventos/segundo', value: '450k/s' },
      { label: 'Tiempo de consulta', value: '<45ms' },
      { label: 'Reducción de costos de consulta', value: '62%' }
    ],
    techStack: ['Python', 'DuckDB', 'ClickHouse', 'TypeScript', 'Next.js', 'Apache Arrow', 'Apache Kafka'],
    architectureNotes: 'Pipeline de agregación columnar optimizado en memoria con DuckDB y WebAssembly para visualizaciones instantáneas en el cliente sin recargar el backend.',
    githubUrl: 'https://github.com/pablolambert-dev/insight-stream-analytics',
    demoUrl: 'https://insightflow.pablolambert-dev.com',
    caseStudyUrl: '',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    order: 2,
    published: true
  },
  {
    id: 'proj-3',
    slug: 'synthetix-fullstack-crm',
    title: 'Synthetix Core · High-Scale B2B CRM',
    tagline: 'Plataforma de gestión comercial y automatización de procesos para empresas de tecnología.',
    description: 'Aplicación web full stack de alto rendimiento con arquitectura limpia modular, gestión de permisos granulares (RBAC), pipelines de ventas personalizables y sincronización offline-first para equipos globales.',
    category: 'fullstack',
    tags: ['Full Stack', 'Node.js', 'React', 'PostgreSQL', 'Prisma', 'Redis', 'Clean Architecture'],
    featured: true,
    metrics: [
      { label: 'Usuarios concurrentes', value: '+15k' },
      { label: 'Test Coverage', value: '96%' },
      { label: 'Lighthouse Score', value: '99/100' }
    ],
    techStack: ['TypeScript', 'Astro / React', 'Node.js', 'PostgreSQL', 'Redis', 'Zod', 'Docker'],
    architectureNotes: 'Diseño Domain-Driven Design (DDD) con separación estricta de capas, cache multinivel en Redis y validación transversal en tiempo de compilación y ejecución con Zod.',
    githubUrl: 'https://github.com/pablolambert-dev/synthetix-core',
    demoUrl: 'https://synthetix.pablolambert-dev.com',
    caseStudyUrl: '',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    order: 3,
    published: true
  },
  {
    id: 'proj-4',
    slug: 'aurora-design-system',
    title: 'Aurora UI · Accessible Enterprise Design System',
    tagline: 'Sistema de diseño y librería de componentes WCAG 2.2 AAA con sincronización de tokens Figma.',
    description: 'Framework de componentes UI y sistema de diseño desarrollado para acelerar el time-to-market de 8 equipos de producto. Incluye micro-interacciones pulidas, soporte completo para lectores de pantalla y soporte de temas dinámicos.',
    category: 'ux-ui',
    tags: ['UX/UI', 'Design System', 'A11y (WCAG AAA)', 'Figma Tokens', 'Storybook', 'CSS Modules'],
    featured: true,
    metrics: [
      { label: 'Cumplimiento Accesibilidad', value: 'WCAG AAA' },
      { label: 'Componentes Reutilizables', value: '+65' },
      { label: 'Aceleración Time-to-Market', value: '+40%' }
    ],
    techStack: ['React', 'TypeScript', 'CSS Modules', 'Storybook', 'Figma API', 'Axe-core', 'Radix Primitives'],
    architectureNotes: 'Estructura modular basada en headless primitives con wrappers estilizados vía CSS Modules aislados y pipeline CI de auditoría a11y automatizada.',
    githubUrl: 'https://github.com/pablolambert-dev/aurora-design-system',
    demoUrl: 'https://aurora-ui.pablolambert-dev.com',
    caseStudyUrl: '',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    order: 4,
    published: true
  },
  {
    id: 'proj-5',
    slug: 'pulse-ml-churn-predictor',
    title: 'PulsePredict · Customer Churn ML Pipeline',
    tagline: 'Modelo predictivo de abandono de usuarios con explicabilidad SHAP y API de scoring en tiempo real.',
    description: 'Pipeline end-to-end de Machine Learning que predice la probabilidad de churn en clientes SaaS con 14 días de antelación. Incluye panel de control para interpretar factores de riesgo individuales mediante valores SHAP.',
    category: 'data-science',
    tags: ['Machine Learning', 'Python', 'XGBoost', 'SHAP', 'FastAPI', 'Streamlit', 'Docker'],
    featured: false,
    metrics: [
      { label: 'ROC-AUC Score', value: '94.6%' },
      { label: 'Tiempo de inferencia', value: '18ms' },
      { label: 'Retención adicional lograda', value: '+22%' }
    ],
    techStack: ['Python', 'Scikit-Learn', 'XGBoost', 'SHAP', 'FastAPI', 'Pandas', 'PostgreSQL'],
    architectureNotes: 'Model serving encapsulado en contenedores Docker livianos con versionado de modelos mediante MLflow y endpoints REST optimizados con FastAPI.',
    githubUrl: 'https://github.com/pablolambert-dev/pulse-ml-churn-predictor',
    demoUrl: '',
    caseStudyUrl: '',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    order: 5,
    published: true
  }
];

export const initialExperiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Senior Full Stack & AI Solutions Engineer',
    company: 'Vanguard Tech Labs',
    companyUrl: 'https://vanguardtech.example.com',
    location: 'Remoto (Internacional)',
    period: '2023 - Presente',
    type: 'lead',
    current: true,
    description: 'Liderazgo técnico en el diseño e implementación de productos web impulsados por IA generativa y arquitecturas full stack modernas basadas en microservicios y SSR.',
    achievements: [
      'Diseñé y desplegué la arquitectura RAG central que redujo el tiempo de búsqueda de información en un 70% para clientes empresariales.',
      'Lideré un equipo de 6 ingenieros full stack, estandarizando pipelines de CI/CD, testing automatizado con coverage >90% y lineamientos de Clean Code.',
      'Optimicé el rendimiento frontend de la plataforma principal logrando un puntaje perfecto de 100/100 en Core Web Vitals en producción.'
    ],
    tech: ['TypeScript', 'Astro', 'React', 'Node.js', 'Python', 'LangChain', 'pgvector', 'Supabase', 'AWS', 'Docker'],
    order: 1
  },
  {
    id: 'exp-2',
    role: 'Full Stack Developer & UX Specialist',
    company: 'Innovatech Solutions',
    companyUrl: 'https://innovatech.example.com',
    location: 'Santiago, Chile (Híbrido)',
    period: '2021 - 2023',
    type: 'full-time',
    current: false,
    description: 'Desarrollo de aplicaciones web complejas B2B/SaaS, liderando tanto la arquitectura técnica frontend/backend como la investigación de experiencia de usuario y accesibilidad.',
    achievements: [
      'Construí desde cero un sistema de diseño empresarial modular adoptado por más de 5 productos de la compañía.',
      'Reduje la tasa de errores de servidor en un 45% mediante refactorización a patrones de arquitectura limpia y validación estricta con Zod y TypeScript.',
      'Diseñé e implementé flujos de onboarding que incrementaron la conversión de registros activos en un 32% en 6 meses.'
    ],
    tech: ['React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Figma', 'CSS Modules', 'Vitest'],
    order: 2
  },
  {
    id: 'exp-3',
    role: 'Data Science & Web Engineer',
    company: 'DataCore Analytics',
    companyUrl: 'https://datacore.example.com',
    location: 'Santiago, Chile',
    period: '2019 - 2021',
    type: 'full-time',
    current: false,
    description: 'Desarrollo de pipelines de ingesta de datos, modelos analíticos predictivos e interfaces web interactivas para clientes de retail y finanzas.',
    achievements: [
      'Desarrollé pipelines de procesamiento de datos en Python que transformaban más de 10GB diarios de información con cero downtime.',
      'Creé dashboards analíticos dinámicos que permitieron a stakeholders no técnicos tomar decisiones basadas en datos en minutos.',
      'Implementé modelos de machine learning para forecasting de demanda con una mejora del 18% en precisión frente al baseline histórico.'
    ],
    tech: ['Python', 'Pandas', 'Scikit-Learn', 'FastAPI', 'JavaScript', 'SQL', 'PostgreSQL', 'Docker'],
    order: 3
  }
];

export const initialCertifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2024',
    credentialUrl: 'https://aws.amazon.com/verification',
    badgeUrl: '',
    category: 'cloud-devops',
    skills: ['AWS Lambda', 'ECS/Fargate', 'S3', 'CloudFront', 'RDS / DynamoDB', 'VPC Architecture'],
    order: 1
  },
  {
    id: 'cert-2',
    title: 'Deep Learning & LLM Generative AI Specialization',
    issuer: 'DeepLearning.AI / Coursera',
    issueDate: '2023',
    credentialUrl: 'https://coursera.org/verify/specialization',
    badgeUrl: '',
    category: 'ai-ml',
    skills: ['Transformers', 'Fine-Tuning', 'RAG', 'Vector Embeddings', 'Prompt Engineering', 'LangChain'],
    order: 2
  },
  {
    id: 'cert-3',
    title: 'Meta Professional Front-End Engineering Certification',
    issuer: 'Meta',
    issueDate: '2022',
    credentialUrl: 'https://coursera.org/verify/meta-frontend',
    badgeUrl: '',
    category: 'fullstack',
    skills: ['React Advanced Patterns', 'Accessibility (a11y)', 'State Management', 'Testing & CI/CD'],
    order: 3
  },
  {
    id: 'cert-4',
    title: 'Google Cloud Certified - Professional Data Engineer',
    issuer: 'Google Cloud',
    issueDate: '2022',
    credentialUrl: 'https://cloud.google.com/certification',
    badgeUrl: '',
    category: 'data-science',
    skills: ['BigQuery', 'Data Pipelines', 'Cloud Storage', 'ML Engine', 'Streaming ETL'],
    order: 4
  },
  {
    id: 'cert-5',
    title: 'UX Master Practitioner & Interaction Design',
    issuer: 'Nielsen Norman Group (NN/g)',
    issueDate: '2021',
    credentialUrl: 'https://nngroup.com/ux-certification',
    badgeUrl: '',
    category: 'ux-design',
    skills: ['User Research', 'Information Architecture', 'Usability Testing', 'Interaction Design'],
    order: 5
  }
];

export const initialServices: Service[] = [
  {
    id: 'serv-1',
    title: 'Arquitectura & Desarrollo Full Stack Escalable',
    tagline: 'Construcción de aplicaciones web de alto rendimiento y código limpio preparadas para crecer.',
    description: 'Desarrollo integral de plataformas web con Astro, React, Node.js y TypeScript. Aplicación rigurosa de Clean Architecture, validación transversal de datos con Zod, alta cobertura de tests automatizados y rendimiento óptimo en Core Web Vitals.',
    deliverables: [
      'Arquitectura desacoplada y mantenible (DDD / Clean Architecture)',
      'Desarrollo Frontend rápido, accesible (a11y) y responsive',
      'APIs REST / GraphQL / RPC con tipado estricto extremo a extremo',
      'Estrategias de bases de datos relacionales, NoSQL y caching',
      'Configuración de CI/CD, linters y suites de tests automatizados'
    ],
    icon: 'Code2',
    badge: 'Core Expertise',
    targetAudience: 'Startups, Scaleups y Reclutadores buscando Senior/Staff Engineers',
    order: 1
  },
  {
    id: 'serv-2',
    title: 'Integraciones de Inteligencia Artificial & RAG',
    tagline: 'Implementación pragmática y segura de LLMs, agentes y sistemas de recuperación aumentada.',
    description: 'Diseño e integración de pipelines de IA en productos existentes. Desde sistemas RAG con bases vectoriales hasta agentes autónomos capaces de ejecutar tareas complejas con herramientas personalizadas y costos optimizados de inferencia.',
    deliverables: [
      'Arquitectura de sistemas RAG con pgvector y bases vectoriales',
      'Orquestación de agentes con LangChain, LlamaIndex o APIs nativas',
      'Optimización de prompts y guardrails para evitar alucinaciones',
      'Pipelines de embeddings y búsqueda semántica de documentos',
      'Monitoreo y métricas de costo/latencia de llamadas a modelos'
    ],
    icon: 'Sparkles',
    badge: 'Alta Demanda',
    targetAudience: 'Compañías que buscan agregar valor real mediante IA sin hype',
    order: 2
  },
  {
    id: 'serv-3',
    title: 'Data Science, Pipelines & Visualización Analítica',
    tagline: 'Transformación de datos crudos en dashboards ejecutivos interactivos y modelos predictivos.',
    description: 'Construcción de pipelines ETL/ELT eficientes, procesamiento analítico en memoria y visualización de datos en tiempo real para habilitar decisiones informadas en negocios digitales.',
    deliverables: [
      'Diseño de pipelines de datos y almacenamiento analítico columnar',
      'Desarrollo de dashboards interactivos de alto impacto visual',
      'Modelado predictivo y algoritmos de Machine Learning explicables',
      'Automatización de reportes e integración con almacenes de datos'
    ],
    icon: 'BarChart3',
    badge: 'Data-Driven',
    targetAudience: 'Empresas con grandes volúmenes de datos que necesitan claridad operativa',
    order: 3
  },
  {
    id: 'serv-4',
    title: 'Consultoría Técnica, Auditoría de Código & UX/A11y',
    tagline: 'Diagnóstico profundo y plan de acción para optimizar rendimiento, accesibilidad y arquitectura.',
    description: 'Auditorías exhaustivas de código fuente, rendimiento web (LCP, INP, CLS), accesibilidad WCAG y experiencia de usuario para elevar la calidad de productos digitales.',
    deliverables: [
      'Auditoría técnica de arquitectura, escalabilidad y deuda técnica',
      'Optimización de Core Web Vitals para alcanzar 95-100 en Lighthouse',
      'Revisión y remediación de accesibilidad WCAG 2.1/2.2 AA/AAA',
      'Mentoring técnico y estandarización de buenas prácticas para equipos'
    ],
    icon: 'ShieldCheck',
    badge: 'Consultoría',
    targetAudience: 'CTOs, Engineering Leads y fundadores buscando elevar el estándar técnico',
    order: 4
  }
];
