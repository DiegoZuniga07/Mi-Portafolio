import React, { useState } from 'react';
import { 
  FolderGit2, 
  Search, 
  ExternalLink, 
  Github, 
  Edit3, 
  Trash2, 
  Sparkles, 
  Filter,
  Plus,
  Layers,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectsSectionProps {
  projects: Project[];
  onOpenNewProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onResetDefaultProjects: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onOpenNewProject,
  onEditProject,
  onDeleteProject,
  onResetDefaultProjects,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Web', 'Móvil', 'Sistemas', 'Educación', 'IA / Datos'];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'Todas' || project.category === selectedCategory;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = 
      !term ||
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.tags.some(t => t.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-10 max-w-6xl mx-auto px-4">
      {/* Sección Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1">
            <FolderGit2 className="w-4 h-4" />
            <span>Función 1 · Catálogo de Proyectos & Auditoría</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Proyectos Desarrollados
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Soluciones de software construidas con foco en impacto social, estabilidad técnica y metodologías ágiles.
          </p>
        </div>

        <button
          onClick={onOpenNewProject}
          className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>+ Registrar Proyecto</span>
        </button>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por tecnología, título o palabra clave (ej. React, finanzas, offline)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700/80 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400 px-2">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>{filteredProjects.length} de {projects.length} mostrados</span>
          </div>
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-mono text-slate-500 mr-2 uppercase tracking-wider">Área:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Proyectos o Estado Vacío (M3) */}
      {filteredProjects.length === 0 ? (
        <div className="border border-dashed border-slate-800 rounded-2xl p-8 sm:p-12 text-center bg-slate-900/30 max-w-xl mx-auto my-6">
          <div className="w-14 h-14 rounded-2xl bg-slate-800/80 text-cyan-400 flex items-center justify-center mx-auto mb-4 border border-slate-700">
            <Layers className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No se encontraron proyectos</h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
            {searchTerm || selectedCategory !== 'Todas'
              ? 'No hay registros que coincidan con los filtros seleccionados. Probá limpiando el buscador o cambiando de categoría.'
              : 'Todavía no has registrado ningún proyecto en tu portafolio. ¡Da el primer paso y añade tu trabajo realizado!'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {searchTerm || selectedCategory !== 'Todas' ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todas');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Limpiar filtros
              </button>
            ) : null}
            <button
              onClick={onOpenNewProject}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20"
            >
              + Registrar Nuevo Proyecto
            </button>
            <button
              onClick={onResetDefaultProjects}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white text-xs font-medium"
            >
              Restaurar Proyectos Demo
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all hover:shadow-xl group"
            >
              {/* Imagen / Preview */}
              <div className="relative h-48 w-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 overflow-hidden border-b border-slate-800 flex items-center justify-center">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : null}

                {/* Fallback overlay icon */}
                <div className="absolute inset-0 -z-0 flex flex-col items-center justify-center text-slate-700 pointer-events-none">
                  <FolderGit2 className="w-12 h-12 text-slate-800 mb-1" />
                  <span className="text-[11px] font-mono text-slate-600 uppercase tracking-widest">{project.category}</span>
                </div>

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-slate-950/90 text-cyan-300 border border-cyan-800/80 backdrop-blur-md">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-amber-500/90 text-slate-950">
                      Destacado
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={() => onEditProject(project)}
                    title="Editar proyecto"
                    className="p-1.5 rounded-lg bg-slate-900/90 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 border border-slate-700 transition-colors backdrop-blur-md"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteProject(project.id)}
                    title="Eliminar proyecto"
                    className="p-1.5 rounded-lg bg-slate-900/90 hover:bg-rose-500 hover:text-white text-slate-300 border border-slate-700 transition-colors backdrop-blur-md"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="absolute bottom-2 right-3 font-mono text-[11px] text-slate-300 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  {project.date}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Highlights si existen */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mb-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                        Aspectos Destacados:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-cyan-400 shrink-0 mt-0.5">▸</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800/90 text-slate-300 border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enlaces de Acción */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Ver Demo</span>
                      </a>
                    )}

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Código</span>
                      </a>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-slate-500">
                    ID: {project.id}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
