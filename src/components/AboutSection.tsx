import React, { useState } from 'react';
import { 
  GraduationCap, 
  Target, 
  Award, 
  CheckCircle2, 
  Layers, 
  Terminal, 
  Sparkles,
  BookOpen,
  Calendar
} from 'lucide-react';
import { INITIAL_PROFILE, INITIAL_SKILLS, INITIAL_EDUCATION } from '../data/defaultData';
import { SkillItem } from '../types/portfolio';

export const AboutSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Frontend', 'Backend', 'Móvil & DB', 'Herramientas', 'Blandas'];

  const filteredSkills = selectedCategory === 'Todas'
    ? INITIAL_SKILLS
    : INITIAL_SKILLS.filter(s => s.category === selectedCategory);

  return (
    <section className="py-10 max-w-6xl mx-auto px-4">
      {/* Header de Sección */}
      <div className="border-b border-slate-800 pb-5 mb-8">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1">
          <Terminal className="w-4 h-4" />
          <span>Función 2 · Perfil del Estudiante & Competencias</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Sobre Mí & Habilidades Técnicas
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Conocé mi trayectoria académica en el INDEL, mis motivaciones vocacionales para ingresar a la educación superior y las competencias técnicas que he consolidado.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Columna Izquierda: Perfil y Trayectoria */}
        <div className="lg:col-span-6 space-y-6">
          {/* Tarjeta de Biografía & Vocación */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Perfil Vocacional & Metas Universitarias
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {INITIAL_PROFILE.bio}
            </p>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 text-sm">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-1.5 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                Aspiración de Ingreso a la Universidad
              </span>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {INITIAL_PROFILE.aspirations}
              </p>
            </div>
          </div>

          {/* Formación Académica */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
              Formación Académica
            </h3>

            <div className="space-y-4">
              {INITIAL_EDUCATION.map((edu, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-slate-800 pb-2 last:pb-0">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-400 flex items-center justify-center" />
                  
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <h4 className="text-sm font-bold text-white">{edu.institution}</h4>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-emerald-400 mb-2">{edu.degree}</p>
                  
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {edu.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Principios de Trabajo */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Compromiso Profesional & Anti-Alucinación
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              En mi práctica como programador en bachillerato aplico el principio de <b>verificación de fuentes</b>: toda función implementada cuenta con respaldo de documentación oficial, pruebas unitarias y contraste con las necesidades reales de los usuarios.
            </p>
          </div>
        </div>

        {/* Columna Derecha: Matriz de Habilidades */}
        <div className="lg:col-span-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                Matriz de Habilidades
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {filteredSkills.length} competencias
              </span>
            </div>

            {/* Categorías Filter Chips */}
            <div className="flex flex-wrap gap-1.5 mb-5 pb-3 border-b border-slate-800/80">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Lista de Habilidades */}
            <div className="space-y-4 max-h-[560px] overflow-y-auto pr-1">
              {filteredSkills.map((skill, index) => (
                <div key={index} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/70 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-200">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        {skill.badge}
                      </span>
                      <span className="font-mono text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
