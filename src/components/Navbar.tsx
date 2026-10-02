import React from 'react';
import { 
  FolderGit2, 
  User, 
  Mail, 
  FileText, 
  QrCode, 
  Download, 
  Upload, 
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'projects' | 'about' | 'contact';
  setActiveTab: (tab: 'projects' | 'about' | 'contact') => void;
  onOpenDoc: () => void;
  onOpenQR: () => void;
  onExportData: () => void;
  onImportData: () => void;
  onResetData: () => void;
  onOpenNewProject: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDoc,
  onOpenQR,
  onExportData,
  onImportData,
  onResetData,
  onOpenNewProject,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
            37
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 tracking-wide text-base sm:text-lg">MI PORTAFOLIO</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
                INDEL · 3DS A
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Diego Fernando Zúñiga Aguilar · Ejercicio 37
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'projects'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Proyectos</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'about'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Sobre Mí</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'contact'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contacto</span>
          </button>
        </nav>

        {/* Action Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="/api/download/documento-md"
            download="DOCUMENTO_ENTREGA_DIEGO_ZUNIGA_EJ37.md"
            title="Descargar documento de entrega completo (.md)"
            className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Descargar .MD</span>
          </a>

          <button
            onClick={onOpenQR}
            title="Abrir en celular mediante código QR"
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500 transition-colors flex items-center gap-1 text-xs"
          >
            <QrCode className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline font-mono">QR Móvil</span>
          </button>

          <button
            onClick={onOpenDoc}
            title="Ver documentación completa de la práctica (README.md, PROMPTS.md, rúbrica)"
            className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Documento & Bitácora</span>
          </button>

          <button
            onClick={onOpenNewProject}
            className="hidden lg:flex px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ Nuevo Proyecto</span>
          </button>
        </div>
      </div>
    </header>
  );
};
