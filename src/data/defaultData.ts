import { Project, SkillItem, EducationItem } from '../types/portfolio';

export const INITIAL_PROFILE = {
  name: 'Diego Fernando Zúñiga Aguilar',
  role: 'Desarrollador de Software Jr. · Aspirante a Ingeniería en Sistemas',
  institution: 'Instituto Nacional de Lourdes (INDEL)',
  section: '3.er año · Bachillerato Técnico en Desarrollo de Software «A»',
  location: 'Lourdes, Colón, La Libertad, El Salvador',
  email: 'diegofernandozunigaaguilar13@gmail.com',
  phone: '+503 7000-0000',
  github: 'https://github.com/diego-zuniga-indel',
  linkedin: 'https://linkedin.com/in/diego-zuniga-sv',
  bio: 'Estudiante de último año de bachillerato técnico en desarrollo de software con pasión por la construcción de aplicaciones web y móviles centradas en resolver problemas tangibles de mi comunidad y entorno educativo. Busco continuar mis estudios universitarios en Ingeniería en Sistemas y Computación, aportando disciplina técnica, visión de producto y dominio de arquitecturas modernas.',
  aspirations: 'Mi meta es ingresar a la carrera de Ingeniería en Ciencias de la Computación o Ingeniería de Software, especializarme en desarrollo full-stack escalable e inteligencia artificial aplicada, y liderar iniciativas tecnológicas con impacto social positivo en El Salvador y Centroamérica.',
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    title: 'Mi Bolsillo · Control Financiero Estudiantil',
    description: 'Aplicación web orientada a jóvenes estudiantes para presupuestar viáticos diarios, clasificar egresos en tiempo real y emitir alertas visuales tipo semáforo cuando el gasto acumulado se aproxima a la cuota límite establecida.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://diego-zuniga-indel.github.io/mi-bolsillo',
    repoUrl: 'https://github.com/diego-zuniga-indel/mi-bolsillo',
    category: 'Web',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'LocalStorage'],
    highlights: [
      'Algoritmo de alerta progresiva por cuadrantes de consumo semanal.',
      'Persistencia 100% offline sin necesidad de conexión continua a servidor.',
      'Exportación estructurada de balances en formato JSON y CSV.',
    ],
    date: '2026-06',
    featured: true,
  },
  {
    id: 'proj-02',
    title: 'Recicla Puntos · Gestión Escolar Ambiental',
    description: 'Sistema web interactivo para medir el pesaje de plástico y papel aportado por secciones del instituto, computando tabla de clasificación gamificada y cálculo de equivalencias ambientales (árboles salvados y agua ahorrada).',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://diego-zuniga-indel.github.io/recicla-puntos',
    repoUrl: 'https://github.com/diego-zuniga-indel/recicla-puntos',
    category: 'Educación',
    tags: ['TypeScript', 'Vite', 'CSS Grid', 'IndexedDB'],
    highlights: [
      'Dashboard comparativo entre aulas con métricas auditables.',
      'Conversor de factores de impacto respaldado en guías del MARN.',
      'Módulo de exportación de certificados de participación ecológica.',
    ],
    date: '2026-08',
    featured: true,
  },
  {
    id: 'proj-03',
    title: 'Ruta Segura · Red Colaborativa Cantonal',
    description: 'Herramienta pensada para estudiantes y trabajadores que transitan a pie, permitiendo documentar tramos con luminarias dañadas o zonas poco transitadas con marcas temporales y rutas recomendadas según la hora.',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://diego-zuniga-indel.github.io/ruta-segura',
    repoUrl: 'https://github.com/diego-zuniga-indel/ruta-segura',
    category: 'Sistemas',
    tags: ['JavaScript', 'PWA', 'Tailwind', 'GeoJSON'],
    highlights: [
      'Compatibilidad PWA para consultar tramos sin cobertura móvil.',
      'Filtro dinámico de seguridad por franja diurna y nocturna.',
      'Generación rápida de resúmenes de advertencia para grupos vecinales.',
    ],
    date: '2026-09',
    featured: false,
  },
  {
    id: 'proj-04',
    title: 'Repaso Espaciado · Simulador de Admisión Universitaria',
    description: 'Plataforma de tarjetas nemotécnicas basada en el algoritmo Leitner que ajusta los intervalos de repaso según la dificultad autoevaluada por el estudiante en materias de matemática, física, lenguaje y ciencias.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    projectUrl: 'https://diego-zuniga-indel.github.io/repaso-admision',
    repoUrl: 'https://github.com/diego-zuniga-indel/repaso-admision',
    category: 'IA / Datos',
    tags: ['React', 'Node.js', 'Algoritmos', 'Chart.js'],
    highlights: [
      'Planificador automático con cálculo de racha y predicción de retención.',
      'Banco de más de 120 preguntas categorizadas por temarios oficiales.',
      'Gráficos de rendimiento por área cognoscitiva.',
    ],
    date: '2026-09',
    featured: true,
  },
];

export const INITIAL_SKILLS: SkillItem[] = [
  // Frontend
  { name: 'HTML5 Semántico & Accesibilidad', level: 95, badge: 'Avanzado', category: 'Frontend' },
  { name: 'CSS3 / Tailwind CSS / Grid / Flexbox', level: 90, badge: 'Avanzado', category: 'Frontend' },
  { name: 'JavaScript Moderno (ES6+)', level: 88, badge: 'Avanzado', category: 'Frontend' },
  { name: 'React 19 & Hooks', level: 85, badge: 'Intermedio-Alto', category: 'Frontend' },
  { name: 'TypeScript', level: 82, badge: 'Intermedio-Alto', category: 'Frontend' },

  // Backend
  { name: 'Node.js & Express REST APIs', level: 78, badge: 'Intermedio', category: 'Backend' },
  { name: 'Arquitectura MVC y Clean Code', level: 80, badge: 'Intermedio', category: 'Backend' },
  { name: 'Consumo & Integración de APIs Externas', level: 85, badge: 'Avanzado', category: 'Backend' },
  { name: 'Gemini AI API & Salidas Estructuradas', level: 88, badge: 'Avanzado', category: 'Backend' },

  // Móvil & DB
  { name: 'SQLite & Modelado Relacional SQL', level: 80, badge: 'Intermedio', category: 'Móvil & DB' },
  { name: 'LocalStorage & Persistencia de Sesión', level: 95, badge: 'Avanzado', category: 'Móvil & DB' },
  { name: 'Android Studio & Kotlin Básico', level: 70, badge: 'Fundamentos', category: 'Móvil & DB' },

  // Herramientas
  { name: 'Git & GitHub (Flujo de Commits Semánticos)', level: 90, badge: 'Avanzado', category: 'Herramientas' },
  { name: 'Vite & Entornos de Desarrollo Rápido', level: 88, badge: 'Avanzado', category: 'Herramientas' },
  { name: 'Figma (Prototipado Mobile-First)', level: 75, badge: 'Intermedio', category: 'Herramientas' },

  // Blandas
  { name: 'Resolución Metódica de Problemas', level: 92, badge: 'Destacado', category: 'Blandas' },
  { name: 'Documentación Técnica y Bitácoras', level: 95, badge: 'Destacado', category: 'Blandas' },
  { name: 'Pensamiento Crítico y Verificación Anti-Alucinación', level: 90, badge: 'Destacado', category: 'Blandas' },
  { name: 'Trabajo Colaborativo y Comunicación Clara', level: 88, badge: 'Destacado', category: 'Blandas' },
];

export const INITIAL_EDUCATION: EducationItem[] = [
  {
    institution: 'Instituto Nacional de Lourdes (INDEL)',
    degree: 'Bachillerato Técnico Vocacional en Desarrollo de Software',
    period: '2024 – 2026',
    status: 'En curso · Último año (3DS A)',
    achievements: [
      'Promedio ponderado destacado en módulos técnicos de programación y bases de datos.',
      'Desarrollo de proyectos de software aplicado con enfoque en necesidades cantonales.',
      'Capacitación en metodologías ágiles, pruebas con usuarios reales y despliegue continuo.',
    ],
  },
  {
    institution: 'Formación Complementaria Autodidacta & Certificaciones',
    degree: 'Ruta Full-Stack, Fundamentos de IA y Arquitectura Web',
    period: '2025 – 2026',
    status: 'Activo',
    achievements: [
      'Construcción y publicación de aplicaciones web accesibles en GitHub Pages.',
      'Especialización práctica en diseño responsive móvil-primero desde 320px.',
      'Manejo de modelos generativos con salidas JSON tipadas y validaciones robustas.',
    ],
  },
];
