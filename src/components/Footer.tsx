import React from 'react';
import { FileText, Database, QrCode, Github, Heart } from 'lucide-react';
import { INITIAL_PROFILE } from '../data/defaultData';

interface FooterProps {
  onOpenDoc: () => void;
  onOpenDataModal: () => void;
  onOpenQR: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDoc,
  onOpenDataModal,
  onOpenQR,
}) => {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950 text-slate-400 py-12 text-xs">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="font-mono text-cyan-400 font-bold text-sm tracking-wide block mb-1">
              EJERCICIO 37 · MI PORTAFOLIO
            </span>
            <p className="text-slate-300 text-xs">
              {INITIAL_PROFILE.name} · {INITIAL_PROFILE.section}
            </p>
            <p className="text-slate-500 text-[11px] mt-0.5">
              {INITIAL_PROFILE.institution} · Colón, La Libertad, El Salvador
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenDoc}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ver Documento Completo</span>
            </button>

            <button
              onClick={onOpenDataModal}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Respaldar / Importar</span>
            </button>

            <button
              onClick={onOpenQR}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
            >
              <QrCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>QR Celular</span>
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 text-center sm:text-left font-mono">
          <p>
            PRÁCTICA 1 · DEL PRIMER PROMPT A UNA APP QUE FUNCIONA · 10 % DEL PERÍODO
          </p>
          <p>
            Docente evaluador: <b>Javier Arturo García Mineros</b>
          </p>
        </div>
      </div>
    </footer>
  );
};
