import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { DocumentationModal } from './components/DocumentationModal';
import { QRModal } from './components/QRModal';
import { DataManageModal } from './components/DataManageModal';
import { Footer } from './components/Footer';
import { Project } from './types/portfolio';
import { INITIAL_PROJECTS } from './data/defaultData';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const STORAGE_KEY = 'diego_portfolio_projects_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'projects' | 'about' | 'contact'>('projects');
  
  // Projects state with LocalStorage persistence (M2)
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading from localStorage, using default projects:', e);
    }
    return INITIAL_PROJECTS;
  });

  // Modals state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);

  // Toast notifications
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }, [projects]);

  // Project Actions
  const handleSaveProject = (project: Project) => {
    if (editingProject) {
      setProjects((prev) => prev.map((p) => (p.id === project.id ? project : p)));
      showToast(`¡Proyecto "${project.title}" actualizado con éxito!`);
    } else {
      setProjects((prev) => [project, ...prev]);
      showToast(`¡Proyecto "${project.title}" registrado con éxito!`);
    }
    setEditingProject(null);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  const handleDeleteProject = (projectId: string) => {
    const projectToDelete = projects.find((p) => p.id === projectId);
    if (window.confirm(`¿Estás seguro de eliminar el proyecto "${projectToDelete?.title || 'seleccionado'}"?`)) {
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      showToast('Proyecto eliminado del portafolio.', 'info');
    }
  };

  const handleImportProjects = (imported: Project[]) => {
    setProjects(imported);
    showToast(`Se importaron ${imported.length} proyectos al portafolio.`);
  };

  const handleResetDefaultProjects = () => {
    setProjects(INITIAL_PROJECTS);
    showToast('Proyectos restablecidos a los datos demostrativos.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 shadow-2xl text-xs sm:text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDoc={() => setIsDocModalOpen(true)}
        onOpenQR={() => setIsQRModalOpen(true)}
        onExportData={() => setIsDataModalOpen(true)}
        onImportData={() => setIsDataModalOpen(true)}
        onResetData={handleResetDefaultProjects}
        onOpenNewProject={() => {
          setEditingProject(null);
          setIsProjectModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenNewProject={() => {
            setEditingProject(null);
            setIsProjectModalOpen(true);
          }}
          onExploreProjects={() => setActiveTab('projects')}
          onOpenDoc={() => setIsDocModalOpen(true)}
        />

        {/* Dynamic Section based on Active Tab */}
        {activeTab === 'projects' && (
          <ProjectsSection
            projects={projects}
            onOpenNewProject={() => {
              setEditingProject(null);
              setIsProjectModalOpen(true);
            }}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            onResetDefaultProjects={handleResetDefaultProjects}
          />
        )}

        {activeTab === 'about' && <AboutSection />}

        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* Footer */}
      <Footer
        onOpenDoc={() => setIsDocModalOpen(true)}
        onOpenDataModal={() => setIsDataModalOpen(true)}
        onOpenQR={() => setIsQRModalOpen(true)}
      />

      {/* Modals */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        editingProject={editingProject}
      />

      <DocumentationModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
      />

      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />

      <DataManageModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        projects={projects}
        onImportProjects={handleImportProjects}
        onResetProjects={handleResetDefaultProjects}
      />
    </div>
  );
}
