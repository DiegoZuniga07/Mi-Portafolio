import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Github, 
  Linkedin, 
  Phone, 
  Clock, 
  MapPin,
  Inbox
} from 'lucide-react';
import { INITIAL_PROFILE } from '../data/defaultData';
import { ContactMessage } from '../types/portfolio';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState(false);
  const [savedMessages, setSavedMessages] = useState<ContactMessage[]>(() => {
    try {
      const stored = localStorage.getItem('diego_portfolio_messages');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [showInbox, setShowInbox] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!name.trim()) {
      errs.name = 'Por favor escribe tu nombre completo.';
    } else if (name.trim().length < 3) {
      errs.name = 'El nombre debe tener al menos 3 letras.';
    }

    if (!email.trim()) {
      errs.email = 'Por favor ingresa tu correo electrónico.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Por favor ingresa un correo con formato válido (ej. nombre@correo.com).';
    }

    if (!subject.trim()) {
      errs.subject = 'Por favor especifica el motivo o asunto del mensaje.';
    }

    if (!message.trim()) {
      errs.message = 'Por favor escribe el contenido de tu mensaje.';
    } else if (message.trim().length < 10) {
      errs.message = 'El mensaje debe tener al menos 10 caracteres.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleString('es-SV', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
    };

    const updated = [newMessage, ...savedMessages];
    setSavedMessages(updated);
    try {
      localStorage.setItem('diego_portfolio_messages', JSON.stringify(updated));
    } catch (err) {
      console.warn('No se pudo guardar el mensaje en localStorage:', err);
    }

    setSuccessMsg(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setErrors({});

    setTimeout(() => {
      setSuccessMsg(false);
    }, 8000);
  };

  return (
    <section className="py-10 max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 mb-8">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1">
          <Mail className="w-4 h-4" />
          <span>Función 3 · Canales de Comunicación & Admisión</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Contacto & Comunicación Directa
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-xl">
          ¿Interesado en mi perfil académico para postulación universitaria o proyectos de desarrollo de software? Enviame un mensaje o comunícate directamente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna Izquierda: Información de Contacto */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-white mb-4">Información de Contacto</h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <a
                href={`mailto:${INITIAL_PROFILE.email}`}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/50 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 block">Correo Electrónico</span>
                  <span className="text-slate-200 font-medium group-hover:text-cyan-400 transition-colors truncate block">
                    {INITIAL_PROFILE.email}
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Ubicación y Centro</span>
                  <span className="text-slate-200 font-medium">
                    {INITIAL_PROFILE.location} · {INITIAL_PROFILE.institution}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Disponibilidad</span>
                  <span className="text-slate-200 font-medium">
                    Lunes a Viernes · Jornada estudiantil y proyectos
                  </span>
                </div>
              </div>
            </div>

            {/* Redes Sociales y Repositorios */}
            <div className="mt-6 pt-5 border-t border-slate-800/80">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                Enlaces Profesionales:
              </span>
              <div className="flex flex-wrap gap-2">
                <a
                  href={INITIAL_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={INITIAL_PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bandeja de Mensajes Registrados (Auditoría / Persistencia) */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <Inbox className="w-4 h-4 text-cyan-400" />
                Bandeja local ({savedMessages.length} recibidos)
              </span>
              <button
                type="button"
                onClick={() => setShowInbox(!showInbox)}
                className="text-xs text-cyan-400 hover:underline font-mono"
              >
                {showInbox ? 'Ocultar' : 'Ver registros'}
              </button>
            </div>

            {showInbox && (
              <div className="mt-3 pt-3 border-t border-slate-800 space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {savedMessages.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No hay mensajes almacenados en este navegador.</p>
                ) : (
                  savedMessages.map((msg) => (
                    <div key={msg.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1 font-mono">
                        <span className="text-slate-200 font-bold">{msg.name}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="text-cyan-300 font-semibold mb-0.5">{msg.subject}</p>
                      <p className="text-slate-300 line-clamp-2">{msg.message}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Columna Derecha: Formulario de Contacto Funcional */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              Enviar un Mensaje Directo
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mb-6">
              Todos los campos cuentan con validación en tiempo real y persistencia en la sesión.
            </p>

            {successMsg && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs sm:text-sm flex items-start gap-2.5 mb-6 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <b className="block text-emerald-300 mb-0.5">¡Mensaje registrado con éxito!</b>
                  <span>
                    El mensaje ha sido guardado en la bandeja local del portafolio. También puedes comunicarte de forma directa al correo {INITIAL_PROFILE.email}.
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-200 block mb-1">
                    Tu Nombre o Institución <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Ing. Carlos Martínez (Admisiones UES)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-slate-100 focus:outline-none transition-colors ${
                      errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-cyan-500'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-xs text-rose-400 mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label className="font-semibold text-slate-200 block mb-1">
                    Tu Correo Electrónico <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="correo@institucion.edu.sv"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-slate-100 focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-cyan-500'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs text-rose-400 mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-200 block mb-1">
                  Asunto del Mensaje <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej. Revisión de portafolio para postulación de beca / pasantía"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-slate-100 focus:outline-none transition-colors ${
                    errors.subject ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-cyan-500'
                  }`}
                />
                {errors.subject && (
                  <span className="text-xs text-rose-400 mt-1 block flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.subject}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-200">
                    Mensaje Detallado <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-slate-500">
                    {message.length} caracteres
                  </span>
                </div>
                <textarea
                  rows={4}
                  placeholder="Escribe tu mensaje, retroalimentación o propuesta aquí..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-slate-100 focus:outline-none transition-colors ${
                    errors.message ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-cyan-500'
                  }`}
                />
                {errors.message && (
                  <span className="text-xs text-rose-400 mt-1 block flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Enviar Mensaje de Contacto</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
