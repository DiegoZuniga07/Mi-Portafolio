export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  repoUrl?: string;
  category: 'Web' | 'Móvil' | 'Sistemas' | 'Educación' | 'IA / Datos';
  tags: string[];
  highlights?: string[];
  date: string;
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  level: number; // 1 to 100
  badge: string;
  category: 'Frontend' | 'Backend' | 'Móvil & DB' | 'Herramientas' | 'Blandas';
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  status: string;
  achievements: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface AIEnhancementResult {
  titulo_profesional: string;
  descripcion_impacto: string;
  tecnologias_detectadas: string[];
  puntos_destacados: string[];
  sugerencia_mejora: string;
}
