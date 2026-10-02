import React from 'react';
import { Sparkles, Code2, GraduationCap, MapPin, ArrowRight, ShieldCheck, Database, QrCode } from 'lucide-react';
import { INITIAL_PROFILE } from '../data/defaultData';

interface HeroProps {
  onOpenNewProject: () => void;
  onExploreProjects: () => void;
  onOpenDoc: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenNewProject,
  onExploreProjects,
  onOpenDoc,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(244,114,182,0.08),transparent_40%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Banner de estado de la práctica */}
        <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs text-slate-300 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-cyan-400 font-semibold">PRÁCTICA 1 · EJERCICIO 37</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Escalón P0 → M5 Completado</span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-400 font-medium">10% Período</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Hola, soy{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                {INITIAL_PROFILE.name}
              </span>
            </h1>

            <p className="mt-3 text-lg sm:text-xl font-medium text-slate-300">
              {INITIAL_PROFILE.role}
            </p>

            <div className="mt-3 flex flex-wrap gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                {INITIAL_PROFILE.institution} ({INITIAL_PROFILE.section})
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-400" />
                {INITIAL_PROFILE.location}
              </span>
            </div>

            <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {INITIAL_PROFILE.bio}
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenNewProject}
                className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>+ Registrar Proyecto</span>
              </button>

              <button
                onClick={onExploreProjects}
                className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center gap-2 transition-all"
              >
                <span>Explorar Proyectos</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={onOpenDoc}
                className="px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-semibold text-sm flex items-center gap-2 transition-all"
              >
                <span>Ver Bitácora P0–M5</span>
              </button>
            </div>
          </div>

          {/* Quick Stats / Highlights Card */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-xs font-mono tracking-wider uppercase text-cyan-400 font-bold mb-4 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Ficha Técnica de Postulación
              </h3>

              <div className="space-y-3.5">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-400">Proyectos Publicados</span>
                  <span className="text-sm font-bold text-white font-mono">4 Verificados</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-400">Sello de IA (M5)</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Gemini 3.8 Flash (JSON)
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-400">Persistencia</span>
                  <span className="text-xs font-mono text-cyan-300 flex items-center gap-1">
                    <Database className="w-3.5 h-3.5" />
                    LocalStorage + Respaldo
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="text-xs text-slate-400">Adaptabilidad</span>
                  <span className="text-xs font-mono text-amber-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Mobile First (320px+)
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center font-mono">
                Desarrollo evaluado bajo rúbrica INDEL 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
