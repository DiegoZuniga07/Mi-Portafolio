import React, { useRef, useState } from 'react';
import { X, Download, Upload, RefreshCw, Database, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Project } from '../types/portfolio';

interface DataManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onImportProjects: (imported: Project[]) => void;
  onResetProjects: () => void;
}

export const DataManageModal: React.FC<DataManageModalProps> = ({
  isOpen,
  onClose,
  projects,
  onImportProjects,
  onResetProjects,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    const dataToExport = {
      app: 'MI PORTAFOLIO - Ejercicio 37',
      author: 'Diego Fernando Zúniga Aguilar',
      exportedAt: new Date().toISOString(),
      projectsCount: projects.length,
      projects,
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portafolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setStatusMessage({
      text: '¡Respaldo JSON descargado con éxito a tu computadora!',
      type: 'success',
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        let projectsList: Project[] = [];
        if (Array.isArray(parsed)) {
          projectsList = parsed;
        } else if (parsed && Array.isArray(parsed.projects)) {
          projectsList = parsed.projects;
        } else {
          throw new Error('El archivo JSON no contiene un arreglo de proyectos válido.');
        }

        onImportProjects(projectsList);
        setStatusMessage({
          text: `¡Se importaron ${projectsList.length} proyectos exitosamente!`,
          type: 'success',
        });
      } catch (err: any) {
        setStatusMessage({
          text: `Error al leer el archivo: ${err.message || 'Formato no compatible'}`,
          type: 'error',
        });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4">
          <Database className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-white mb-1">
          Gestión de Datos & Respaldo (M2)
        </h3>
        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          Tus datos se guardan automáticamente en el almacenamiento local del navegador (<code>localStorage</code>). Aquí puedes descargar un respaldo en archivo JSON o restaurarlo.
        </p>

        {statusMessage && (
          <div
            className={`p-3 rounded-xl mb-4 text-xs flex items-start gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/70 border border-emerald-800 text-emerald-200'
                : 'bg-rose-950/70 border border-rose-800 text-rose-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <div className="space-y-3">
          {/* Exportar */}
          <button
            onClick={handleExport}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Descargar Respaldo JSON ({projects.length} proyectos)</span>
          </button>

          {/* Importar */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,application/json"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>Importar Proyectos desde Archivo JSON</span>
          </button>

          {/* Restaurar valores por defecto */}
          <button
            onClick={() => {
              if (window.confirm('¿Deseas restablecer los proyectos a los datos predeterminados de la práctica?')) {
                onResetProjects();
                setStatusMessage({
                  text: 'Proyectos restablecidos al catálogo inicial.',
                  type: 'success',
                });
              }
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restablecer Proyectos Iniciales de Fábrica</span>
          </button>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-500 text-center font-mono">
          Clave activa: <code>diego_portfolio_projects_v1</code>
        </div>
      </div>
    </div>
  );
};
