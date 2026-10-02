import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink, 
  Github, 
  Image as ImageIcon, 
  Tag, 
  Check, 
  Code,
  Wand2,
  RefreshCw,
  Info
} from 'lucide-react';
import { Project, AIEnhancementResult } from '../types/portfolio';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  editingProject?: Project | null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProject,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Project['category']>('Web');
  const [imageUrl, setImageUrl] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [featured, setFeatured] = useState(false);
  const [highlights, setHighlights] = useState<string[]>([]);

  // Sello de IA M5 state
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [rawNotes, setRawNotes] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AIEnhancementResult | null>(null);
  const [aiSource, setAiSource] = useState<string | null>(null);
  const [rawJsonView, setRawJsonView] = useState(false);

  // Form errors M4
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingProject) {
      setTitle(editingProject.title);
      setDescription(editingProject.description);
      setCategory(editingProject.category);
      setImageUrl(editingProject.imageUrl);
      setProjectUrl(editingProject.projectUrl);
      setRepoUrl(editingProject.repoUrl || '');
      setTagsInput(editingProject.tags.join(', '));
      setFeatured(!!editingProject.featured);
      setHighlights(editingProject.highlights || []);
    } else {
      resetForm();
    }
    setErrors({});
    setShowAIAssistant(false);
    setAiResult(null);
    setAiError(null);
  }, [editingProject, isOpen]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('Web');
    setImageUrl('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80');
    setProjectUrl('https://github.com');
    setRepoUrl('');
    setTagsInput('React, TypeScript, CSS');
    setFeatured(false);
    setHighlights([]);
    setRawNotes('');
  };

  if (!isOpen) return null;

  // Validación M4
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Por favor escribe el nombre del proyecto.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'El título debe tener al menos 3 caracteres.';
    } else if (title.trim().length > 90) {
      newErrors.title = 'El título no puede superar los 90 caracteres.';
    }

    if (!description.trim()) {
      newErrors.description = 'Por favor agrega una breve descripción de lo que hace el proyecto.';
    } else if (description.trim().length < 15) {
      newErrors.description = 'La descripción debe tener al menos 15 caracteres para explicar la solución.';
    } else if (description.trim().length > 1000) {
      newErrors.description = 'La descripción no puede exceder 1,000 caracteres.';
    }

    const validateUrl = (url: string, fieldName: string) => {
      if (!url.trim()) return;
      try {
        const parsed = new URL(url.trim());
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          newErrors[fieldName] = 'El enlace debe iniciar con http:// o https://';
        }
      } catch {
        newErrors[fieldName] = 'Por favor ingresa una dirección web válida (ej. https://...)';
      }
    };

    if (projectUrl.trim()) validateUrl(projectUrl, 'projectUrl');
    if (repoUrl.trim()) validateUrl(repoUrl, 'repoUrl');
    if (imageUrl.trim()) validateUrl(imageUrl, 'imageUrl');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0)
      .slice(0, 8);

    const newProject: Project = {
      id: editingProject ? editingProject.id : `proj-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      projectUrl: projectUrl.trim(),
      repoUrl: repoUrl.trim() || undefined,
      tags: tags.length > 0 ? tags : ['Software', 'Bachillerato'],
      highlights: highlights.length > 0 ? highlights : undefined,
      date: editingProject ? editingProject.date : new Date().toISOString().slice(0, 7),
      featured,
    };

    setTimeout(() => {
      onSave(newProject);
      setIsSubmitting(false);
      onClose();
    }, 150);
  };

  // Función Sello de IA M5: Llamar a /api/gemini/enhance-project
  const handleEnhanceWithAI = async () => {
    if (!rawNotes.trim()) {
      setAiError('Por favor escribe algunas notas o ideas de tu proyecto para que la IA pueda redactarlas.');
      return;
    }

    setAiLoading(true);
    setAiError(null);
    setAiResult(null);

    try {
      const response = await fetch('/api/gemini/enhance-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: rawNotes,
          category,
          title: title.trim() || undefined,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'No se pudo generar la descripción con IA.');
      }

      setAiResult(resData.data);
      setAiSource(resData.source);
    } catch (err: any) {
      console.error('Error enhancing project with AI:', err);
      setAiError(err.message || 'Error de conexión con el servicio de IA. Inténtalo de nuevo.');
    } finally {
      setAiLoading(false);
    }
  };

  // Aplicar resultado de IA al formulario (cumpliendo: el estudiante la revisa y la corrige)
  const applyAIResult = () => {
    if (!aiResult) return;

    if (aiResult.titulo_profesional && !title.trim()) {
      setTitle(aiResult.titulo_profesional);
    }
    if (aiResult.descripcion_impacto) {
      setDescription(aiResult.descripcion_impacto);
    }
    if (aiResult.tecnologias_detectadas && aiResult.tecnologias_detectadas.length > 0) {
      setTagsInput(aiResult.tecnologias_detectadas.join(', '));
    }
    if (aiResult.puntos_destacados && aiResult.puntos_destacados.length > 0) {
      setHighlights(aiResult.puntos_destacados);
    }

    setShowAIAssistant(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl relative my-auto">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              {editingProject ? 'Editar Proyecto' : 'Registrar Nuevo Proyecto'}
            </h3>
            <p className="text-xs text-slate-400">
              {editingProject ? 'Actualiza los datos de tu trabajo' : 'Ingresa los detalles para exhibirlo en tu portafolio'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-sm flex-1">
          {/* Asistente IA Toggle Button (Sello M5) */}
          <div className="rounded-xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 to-blue-950/40 p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                  <Wand2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs text-white block">
                    Sello de IA (M5): Redactor Profesional
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    ¿Tienes notas sueltas? La IA las convierte en una descripción técnica para postulación.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAIAssistant(!showAIAssistant)}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shrink-0"
              >
                {showAIAssistant ? 'Ocultar Asistente' : '✨ Usar Asistente'}
              </button>
            </div>

            {/* Panel Desplegable del Asistente IA */}
            {showAIAssistant && (
              <div className="mt-3 pt-3 border-t border-cyan-800/40 space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-200 block mb-1">
                    Pegá tus notas sueltas, apuntes o ideas desordenadas:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ejemplo: hice una app en react para la escuela para medir los kilos de plastico que reciclan las secciones y saca cuantos arboles salvamos, usamos typescript y se guarda en el cel sin internet..."
                    value={rawNotes}
                    onChange={(e) => setRawNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleEnhanceWithAI}
                    disabled={aiLoading}
                    className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {aiLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Consultando Gemini 3.8 Flash...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Generar Redacción Estructurada (JSON)</span>
                      </>
                    )}
                  </button>

                  {aiResult && (
                    <button
                      type="button"
                      onClick={() => setRawJsonView(!rawJsonView)}
                      className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <Code className="w-3.5 h-3.5" />
                      {rawJsonView ? 'Ver Vista Formateada' : 'Ver JSON Recibido'}
                    </button>
                  )}
                </div>

                {aiError && (
                  <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{aiError}</span>
                  </div>
                )}

                {/* Resultado Estructurado de la IA */}
                {aiResult && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-cyan-800/80 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Estructura validada ({aiSource})
                      </span>
                      <span className="text-slate-400">Esquema: responseSchema JSON</span>
                    </div>

                    {rawJsonView ? (
                      <pre className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 overflow-x-auto max-h-40">
                        {JSON.stringify(aiResult, null, 2)}
                      </pre>
                    ) : (
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-mono block">Título sugerido:</span>
                          <span className="font-bold text-white">{aiResult.titulo_profesional}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-mono block">Descripción técnica:</span>
                          <p className="text-slate-300 leading-relaxed">{aiResult.descripcion_impacto}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-mono block">Puntos destacados:</span>
                          <ul className="list-disc pl-4 text-slate-300 space-y-0.5 text-[11px]">
                            {aiResult.puntos_destacados?.map((pt, i) => (
                              <li key={i}>{pt}</li>
                            ))}
                          </ul>
                        </div>
                        {aiResult.sugerencia_mejora && (
                          <div className="p-2 rounded bg-amber-950/40 border border-amber-800/60 text-amber-200 text-[11px]">
                            <b>Sugerencia universitaria:</b> {aiResult.sugerencia_mejora}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-amber-300">
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span>Recordatorio: Podrás corregir y revisar antes de guardar.</span>
                      </div>
                      <button
                        type="button"
                        onClick={applyAIResult}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Aplicar al Formulario</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Campo: Título */}
          <div>
            <label className="font-semibold text-slate-200 block mb-1 text-xs">
              Título del Proyecto <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej. Mi Bolsillo · Control Financiero Estudiantil"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none transition-colors ${
                errors.title ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-cyan-500'
              }`}
            />
            {errors.title && (
              <span className="text-xs text-rose-400 mt-1 block flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.title}
              </span>
            )}
          </div>

          {/* Campo: Categoría */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-200 block mb-1 text-xs">
                Categoría del Software
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Project['category'])}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="Web">Web</option>
                <option value="Móvil">Móvil</option>
                <option value="Sistemas">Sistemas</option>
                <option value="Educación">Educación</option>
                <option value="IA / Datos">IA / Datos</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-200 block mb-1 text-xs">
                Etiquetas / Tecnologías (separadas por coma)
              </label>
              <input
                type="text"
                placeholder="React, TypeScript, LocalStorage, Tailwind"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Campo: Descripción */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-200 text-xs">
                Descripción del Proyecto <span className="text-rose-400">*</span>
              </label>
              <span className="text-[11px] font-mono text-slate-500">
                {description.length} / 1000 caracteres
              </span>
            </div>
            <textarea
              rows={4}
              placeholder="Describe el problema que resuelve, a quién ayuda y qué tecnologías clave utilizaste..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none transition-colors ${
                errors.description ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-cyan-500'
              }`}
            />
            {errors.description && (
              <span className="text-xs text-rose-400 mt-1 block flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.description}
              </span>
            )}
          </div>

          {/* URLs: Demo y Repositorio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-200 block mb-1 text-xs flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                URL de Demo / App Publicada
              </label>
              <input
                type="text"
                placeholder="https://diego-zuniga-indel.github.io/mi-app"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl bg-slate-950 border text-slate-100 text-xs sm:text-sm focus:outline-none transition-colors ${
                  errors.projectUrl ? 'border-rose-500' : 'border-slate-700 focus:border-cyan-500'
                }`}
              />
              {errors.projectUrl && (
                <span className="text-xs text-rose-400 mt-1 block">{errors.projectUrl}</span>
              )}
            </div>

            <div>
              <label className="font-semibold text-slate-200 block mb-1 text-xs flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-slate-400" />
                URL del Repositorio en GitHub
              </label>
              <input
                type="text"
                placeholder="https://github.com/diego-zuniga-indel/mi-app"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl bg-slate-950 border text-slate-100 text-xs sm:text-sm focus:outline-none transition-colors ${
                  errors.repoUrl ? 'border-rose-500' : 'border-slate-700 focus:border-cyan-500'
                }`}
              />
              {errors.repoUrl && (
                <span className="text-xs text-rose-400 mt-1 block">{errors.repoUrl}</span>
              )}
            </div>
          </div>

          {/* URL de Imagen y Presets rápidos */}
          <div>
            <label className="font-semibold text-slate-200 block mb-1 text-xs flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
              URL de Imagen / Captura
            </label>
            <input
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
            />
            {/* Presets visuales */}
            <div className="flex flex-wrap gap-2 mt-2 items-center text-[11px] text-slate-400">
              <span>Plantillas rápidas de imagen:</span>
              <button
                type="button"
                onClick={() => setImageUrl('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80')}
                className="hover:text-cyan-400 underline"
              >
                Código Web
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setImageUrl('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80')}
                className="hover:text-cyan-400 underline"
              >
                Dashboard / Métricas
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setImageUrl('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80')}
                className="hover:text-cyan-400 underline"
              >
                App Celular
              </button>
            </div>
          </div>

          {/* Destacado */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="featured-check"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0 focus:ring-offset-0"
            />
            <label htmlFor="featured-check" className="text-xs text-slate-300 font-medium cursor-pointer">
              Marcar como proyecto destacado en el portafolio
            </label>
          </div>

          {/* Modal Footer / Acciones */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{editingProject ? 'Guardar Cambios' : 'Registrar Proyecto'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
