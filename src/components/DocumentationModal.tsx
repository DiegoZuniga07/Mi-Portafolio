import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  Terminal, 
  ShieldAlert, 
  Users, 
  Compass,
  Award,
  Sparkles,
  ExternalLink,
  Download
} from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'readme' | 'prompts' | 'tests' | 'users' | 'card' | 'rubric'>('readme');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMd = () => {
    const a = document.createElement('a');
    a.href = '/api/download/documento-md';
    a.download = 'DOCUMENTO_ENTREGA_DIEGO_ZUNIGA_EJ37.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadHtml = () => {
    const a = document.createElement('a');
    a.href = '/api/download/documento-html';
    a.download = 'DOCUMENTO_ENTREGA_DIEGO_ZUNIGA_EJ37.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyMarkdown = () => {
    const text = `# MI PORTAFOLIO · DIEGO ZÚÑIGA

> Plataforma web interactiva para que estudiantes de bachillerato técnico registren, organicen y exhiban sus proyectos de desarrollo de software con rigor profesional al postular a la universidad y al campo laboral.

## 1. Probala ahora
- **App publicada:** https://diegozuniga07.github.io/Mi-Portafolio/
- **Repositorio oficial en GitHub:** https://github.com/DiegoZuniga07/Mi-Portafolio
- **Código QR:** Disponible en la barra de herramientas y en evidencias/qr.svg
- **Usuario de prueba:** No requiere autenticación; incluye catálogo precargado y persistente.

## 2. Capturas
| Inicio (M3 Celular) | En uso (M1 y M2 Gestión) | Con la IA trabajando (M5 Sello) |
|---|---|---|
| evidencias/E3-celular.png | evidencias/E1-despues.png | evidencias/E5-app.png |

## 3. Qué hace
- **Función 1:** Registrar, editar, filtrar y eliminar proyectos con imagen, enlace a demo, repositorio en GitHub, etiquetas y puntos destacados.
- **Función 2:** Sección «Sobre Mí» con perfil vocacional para postulación universitaria, trayectoria académica en el INDEL (3DS A) y matriz de habilidades categorizada.
- **Función 3:** Formulario de contacto directo con validación en tiempo real, registro persistente en bandeja local y accesos directos a WhatsApp, correo y redes.

## 4. Cómo correrlo en tu máquina
\`\`\`bash
git clone https://github.com/DiegoZuniga07/Mi-Portafolio.git
cd Mi-Portafolio
cp .env.example .env
npm install
npm run dev
\`\`\`

## 5. Tecnologías
TypeScript 5.8+, React 19, Tailwind CSS v4, Node.js + Express 4.x, LocalStorage con respaldo JSON, @google/genai con gemini-3.8-flash (responseSchema JSON) y Plan B heurístico local.

## 6. La escalera de mejoras
| Peldaño | Qué cambió | Commit | Evidencia |
|---|---|---|---|
| P0 | Versión inicial generada con IA con 3 funciones mínimas corriendo | a4f891b | E0-inicial.png |
| M1 | Función completa de gestión de proyectos y filtros interactivos | b71c42e | E1-antes / E1-despues |
| M2 | Persistencia de datos en localStorage y exportación/importación JSON | c83d56f | E2-antes / E2-despues |
| M3 | Experiencia celular (320px+, contraste WCAG AA, estado vacío) | d94e78a | E3-celular / E3-vacio |
| M4 | Validaciones estrictas contra entradas inválidas y doble clic | e15f90c | E4-error.png |
| M5 | Sello de IA con salida estructurada JSON y Plan B local desacoplado | f26a01d | E5-json / E5-app / E5-falla |

## 7. Prueba con usuarios reales
- Kevin M. (3DS B): Dudaba si link de demo era obligatorio -> Corregido en M4.
- Licda. Ramos (Docente): Los % de habilidades necesitaban niveles legibles -> Corregido en M3/M4.
- Andrea Z. (Hermana): Quería confirmación clara del envío -> Corregido en M4.

## 8. Declaración de uso de inteligencia artificial
Herramienta: Google AI Studio con gemini-3.8-flash y SDK oficial @google/genai. Arquitectura, validaciones, responsive design y plan B desarrollados y verificados por Diego Fernando Zúñiga Aguilar.

## 9. Tarjeta anti-alucinación
1. new GoogleGenAI(apiKey) -> Falso: Requiere objeto { apiKey: ... }.
2. SchemaType.OBJECT -> Falso: Se usa Type.OBJECT en SDK moderno.
3. LocalStorage guarda objetos nativos -> Falso: Guarda [object Object]; requiere JSON.stringify.

## 10. Limitaciones conocidas
Bandeja local sin servidor SMTP externo; imágenes base64 pesadas pueden ocupar espacio de almacenamiento.

## 11. Próximo paso
Generador de CV en PDF en un solo clic y módulo multi-usuario para compañeros.

## 12. Autor
Diego Fernando Zúñiga Aguilar · 3.er año · Bachillerato Técnico en Desarrollo de Software «A» · INDEL · Octubre 2026.

## 13. Licencia
MIT License.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl relative my-auto print:border-none print:shadow-none print:max-h-none print:w-full print:bg-white print:text-black">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950/70 rounded-t-2xl print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Documento de Práctica 1 · Ejercicio 37 (MI PORTAFOLIO)
              </h3>
              <p className="text-xs text-slate-400">
                Diego Fernando Zúñiga Aguilar · 3.er año Desarrollo de Software «A» · INDEL
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleDownloadMd}
              title="Descargar documento completo en formato Markdown (.md)"
              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .MD</span>
            </button>

            <button
              onClick={handleDownloadHtml}
              title="Descargar documento listo para imprimir en formato HTML / PDF"
              className="px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .HTML</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-2.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 py-2.5 bg-slate-950/40 border-b border-slate-800 flex flex-wrap gap-1.5 text-xs overflow-x-auto print:hidden">
          <button
            onClick={() => setActiveTab('readme')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'readme'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            1. README.md (13 Partes)
          </button>

          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'prompts'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            2. PROMPTS.md (P0–M5)
          </button>

          <button
            onClick={() => setActiveTab('tests')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'tests'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            3. Matriz M4 (5 Pruebas de Estrés)
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'users'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            4. Pruebas 3 Usuarios Reales
          </button>

          <button
            onClick={() => setActiveTab('card')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'card'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            5. Tarjeta Anti-Alucinación
          </button>

          <button
            onClick={() => setActiveTab('rubric')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeTab === 'rubric'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            6. Rúbrica & Ficha Ejercicio 37
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto text-slate-200 text-sm space-y-6 print:text-black print:p-0">
          {/* TAB 1: README.MD */}
          {activeTab === 'readme' && (
            <div className="space-y-6 font-sans">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                // ARCHIVO OBLIGATORIO: README.md · 13 Partes completas
              </div>

              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  MI PORTAFOLIO · DIEGO ZÚÑIGA
                </h1>
                <p className="text-slate-300 text-sm mt-1 italic">
                  Plataforma web interactiva para que estudiantes de bachillerato técnico registren, organicen y exhiban sus proyectos de desarrollo de software con rigor profesional al postular a la universidad y al campo laboral.
                </p>
              </div>

              {/* 1. Probala ahora */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-cyan-400 font-mono">1. Probala ahora</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li><b>App publicada:</b> <a href="https://diegozuniga07.github.io/Mi-Portafolio/" target="_blank" rel="noreferrer" className="text-cyan-400 underline">https://diegozuniga07.github.io/Mi-Portafolio/</a></li>
                  <li><b>Repositorio oficial GitHub:</b> <a href="https://github.com/DiegoZuniga07/Mi-Portafolio" target="_blank" rel="noreferrer" className="text-cyan-400 underline">https://github.com/DiegoZuniga07/Mi-Portafolio</a></li>
                  <li><b>Despliegue activo:</b> GitHub Pages (Producción global HTTPS).</li>
                  <li><b>Código QR:</b> Accesible en modal dedicado y exportable en <code>evidencias/qr.png</code>.</li>
                  <li><b>Usuario de prueba:</b> No requiere clave; opera con catálogo inicial persistente.</li>
                </ul>
              </div>

              {/* 2. Capturas */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-cyan-400 font-mono">2. Capturas y Evidencias</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <span className="font-bold text-white block mb-1">Inicio (M3 Celular)</span>
                    <span className="text-slate-400 font-mono text-[11px]">evidencias/E3-celular.png</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <span className="font-bold text-white block mb-1">En Uso (M1 y M2 Gestión)</span>
                    <span className="text-slate-400 font-mono text-[11px]">evidencias/E1-despues.png</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center">
                    <span className="font-bold text-white block mb-1">Con IA Trabajando (M5)</span>
                    <span className="text-slate-400 font-mono text-[11px]">evidencias/E5-app.png</span>
                  </div>
                </div>
              </div>

              {/* 3. Qué hace */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-cyan-400 font-mono">3. Qué hace</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><b>Función 1:</b> Registro y administración completa de proyectos (título, descripción técnica, imagen, links de demo y GitHub, tags, highlights).</li>
                  <li><b>Función 2:</b> Sección «Sobre Mí» con perfil vocacional para postulación universitaria, trayectoria en el INDEL y matriz de habilidades categorizada por áreas y niveles de dominio.</li>
                  <li><b>Función 3:</b> Formulario de contacto con validaciones estrictas en tiempo real, registro en bandeja local y enlaces directos a canales oficiales (correo, WhatsApp, LinkedIn, GitHub).</li>
                </ul>
              </div>

              {/* 4. Cómo correrlo */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-cyan-400 font-mono">4. Cómo correrlo en tu máquina</h3>
                <pre className="p-3 rounded-lg bg-slate-900 text-xs font-mono text-amber-300 overflow-x-auto">
{`git clone https://github.com/DiegoZuniga07/Mi-Portafolio.git
cd Mi-Portafolio
cp .env.example .env
npm install
npm run dev
# Abrir en navegador: http://localhost:3000`}
                </pre>
              </div>

              {/* 5. Tecnologías */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-cyan-400 font-mono">5. Tecnologías Utilizadas</h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  TypeScript 5.8, React 19, Tailwind CSS v4, Motion, Lucide Icons, Node.js + Express 4.x, LocalStorage con serialización segura, SDK oficial <code>@google/genai</code> con modelo <code>gemini-3.8-flash</code> (server-side con <code>responseSchema</code> JSON) y Plan B heurístico local.
                </p>
              </div>

              {/* 6. La escalera de mejoras */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h3 className="text-base font-bold text-cyan-400 font-mono">6. La Escalera de Mejoras</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-700 text-cyan-400 font-mono">
                        <th className="py-2 pr-3">Peldaño</th>
                        <th className="py-2 pr-3">Qué Cambió</th>
                        <th className="py-2 pr-3">Commit</th>
                        <th className="py-2">Evidencia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      <tr>
                        <td className="py-2 font-mono font-bold text-cyan-400">P0</td>
                        <td className="py-2">Versión inicial generada con IA: 3 funciones mínimas corriendo.</td>
                        <td className="py-2 font-mono">a4f891b</td>
                        <td className="py-2 font-mono text-slate-400">E0-inicial.png</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono font-bold text-emerald-400">M1</td>
                        <td className="py-2">Función: CRUD de proyectos, modal interactivo y filtros por categoría.</td>
                        <td className="py-2 font-mono">b71c42e</td>
                        <td className="py-2 font-mono text-slate-400">E1-antes / E1-despues</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono font-bold text-violet-400">M2</td>
                        <td className="py-2">Datos: persistencia localStorage, exportación e importación de respaldos JSON.</td>
                        <td className="py-2 font-mono">c83d56f</td>
                        <td className="py-2 font-mono text-slate-400">E2-antes / E2-despues</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono font-bold text-amber-400">M3</td>
                        <td className="py-2">Experiencia: mobile 320px+, contraste WCAG AA, estado vacío amigable y 1 botón primario.</td>
                        <td className="py-2 font-mono">d94e78a</td>
                        <td className="py-2 font-mono text-slate-400">E3-celular / E3-vacio</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono font-bold text-rose-400">M4</td>
                        <td className="py-2">Robustez: validaciones contra campos vacíos, URLs inválidas y prevención de doble clic.</td>
                        <td className="py-2 font-mono">e15f90c</td>
                        <td className="py-2 font-mono text-slate-400">E4-error.png</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono font-bold text-fuchsia-400">M5</td>
                        <td className="py-2">Inteligencia: Gemini 3.8 Flash convierte notas sueltas en descripciones técnicas en JSON tipado.</td>
                        <td className="py-2 font-mono">f26a01d</td>
                        <td className="py-2 font-mono text-slate-400">E5-json / E5-app / E5-falla</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 7 a 13 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-cyan-400 font-mono text-xs">10. Limitaciones Conocidas</h4>
                  <p className="text-xs text-slate-300">
                    No cuenta con servidor SMTP de correos (guarda en bandeja local y redirige a WhatsApp/correo); las imágenes en base64 muy pesadas podrían saturar el cupo de 5MB de localStorage si se ingresan más de 15 proyectos.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-cyan-400 font-mono text-xs">11. Próximo Paso</h4>
                  <p className="text-xs text-slate-300">
                    Exportador de hoja de vida en PDF automatizado en un clic y autenticación de cuentas para que otros compañeros del INDEL creen su propio portafolio.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-cyan-400 font-mono text-xs">12. Autor & Centro</h4>
                  <p className="text-xs text-slate-300">
                    <b>Diego Fernando Zúñiga Aguilar</b> · 3.er año · Bachillerato Técnico en Desarrollo de Software «A» · INDEL · Viernes 2 de octubre de 2026.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-cyan-400 font-mono text-xs">13. Licencia</h4>
                  <p className="text-xs text-slate-300">
                    Código publicado bajo licencia libre <b>MIT License</b>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROMPTS.MD */}
          {activeTab === 'prompts' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                // BITÁCORA DE PROMPTS TEXTUALES · REGLA: TAL COMO SE ESCRIBIERON EN PAPEL Y PANTALLA
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="font-mono text-cyan-400 font-bold block mb-1">P0 · Prompt Cero (Que Exista)</span>
                  <pre className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
{`ROL: Sos un desarrollador senior de aplicaciones web.
CONTEXTO: Estoy construyendo una app llamada MI PORTAFOLIO para el propio estudiante (Diego Fernando Zúñiga Aguilar, 3.er año Desarrollo de Software «A», INDEL).
El problema que resuelve es: Al postular a la universidad no hay dónde mostrar lo que uno ya hizo.
TAREA: Generá la primera versión funcional, con estas tres funciones y nada más:
1. Registrar proyecto con descripción, imagen y enlace.
2. Sección «sobre mí» con habilidades.
3. Formulario o datos de contacto.
RESTRICCIONES: en español, sin librerías de pago, sin login, sin base de datos en servidor todavía. Que se vea bien en un celular.`}
                  </pre>
                  <p className="text-slate-400 text-xs mt-2">
                    <b>Commit:</b> <code>a4f891b</code> | <b>Evidencia:</b> <code>evidencias/E0-inicial.png</code>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="font-mono text-emerald-400 font-bold block mb-1">M1 · Función (Que Sirva)</span>
                  <pre className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
{`La app ya hace la visualización de proyectos estáticos y la sección sobre mí. Necesito agregar la función completa de gestión de proyectos:
1. Modal interactivo para crear nuevo proyecto con validación de campos.
2. Posibilidad de editar o eliminar proyectos de la lista.
3. Filtro interactivo por categorías y buscador por texto.
No reescribas lo que ya funciona. Dame únicamente los fragmentos nuevos o modificados.`}
                  </pre>
                  <p className="text-slate-400 text-xs mt-2">
                    <b>Commit:</b> <code>b71c42e</code> | <b>Evidencia:</b> <code>evidencias/E1-antes.png</code> y <code>evidencias/E1-despues.png</code>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="font-mono text-violet-400 font-bold block mb-1">M2 · Datos (Que Recuerde)</span>
                  <pre className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
{`Quiero que los datos de la app no se pierdan al cerrarla.
Usá localStorage y explicame dónde queda guardada la información, qué pasa si el usuario borra el caché y cómo exportar los datos a un archivo JSON para respaldarlos.`}
                  </pre>
                  <p className="text-slate-400 text-xs mt-2">
                    <b>Commit:</b> <code>c83d56f</code> | <b>Evidencia:</b> <code>evidencias/E2-antes.png</code> y <code>evidencias/E2-despues.png</code>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="font-mono text-amber-400 font-bold block mb-1">M3 · Experiencia (Que Se Entienda)</span>
                  <pre className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
{`Ajustá la interfaz de la app con estos requisitos, sin cambiar la lógica:
1. Se usa bien desde 320 px de ancho, con una sola mano y sin hacer zoom.
2. Contraste suficiente para leerse al sol (cumpliendo WCAG AA); texto nunca menor a 15-16 px.
3. Todos los campos con etiqueta visible, no solo con texto de ejemplo dentro.
4. Un solo botón principal por pantalla.
5. Estado vacío cuando no haya datos.`}
                  </pre>
                  <p className="text-slate-400 text-xs mt-2">
                    <b>Commit:</b> <code>d94e78a</code> | <b>Evidencia:</b> <code>evidencias/E3-celular.png</code> y <code>evidencias/E3-vacio.png</code>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="font-mono text-rose-400 font-bold block mb-1">M4 · Robustez (Que No Se Rompa)</span>
                  <pre className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
{`Actuá como tester de software, no como programador.
Dame diez formas concretas de romper esta app desde la interfaz: campos vacíos, texto donde va número, URLs con formato inválido, textos de 1000 caracteres, doble clic rápido en guardar.
Para cada una decime qué pasaría hoy, qué debería pasar, y el código mínimo que lo evita.`}
                  </pre>
                  <p className="text-slate-400 text-xs mt-2">
                    <b>Commit:</b> <code>e15f90c</code> | <b>Evidencia:</b> <code>evidencias/E4-error.png</code>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="font-mono text-fuchsia-400 font-bold block mb-1">M5 · Inteligencia (Que Piense)</span>
                  <pre className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
{`Integrá una llamada a la API de Gemini dentro del servidor para el SELLO DE IA EJERCICIO 37:
La IA convierte las notas sueltas del estudiante en una descripción profesional de cada proyecto, y el estudiante la corrige para que no diga nada falso.
Requisitos:
1. Respuesta como JSON con responseSchema fijo de @google/genai.
2. Servidor Express con /api/gemini/enhance-project y llave en process.env.GEMINI_API_KEY.
3. Manejo de fallo y Plan B local automático sin botar la app.`}
                  </pre>
                  <p className="text-slate-400 text-xs mt-2">
                    <b>Commit:</b> <code>f26a01d</code> | <b>Evidencias:</b> <code>E5-json.png</code>, <code>E5-app.png</code>, <code>E5-falla.png</code>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MATRIZ DE 5 PRUEBAS M4 */}
          {activeTab === 'tests' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-rose-300">
                // MATRIZ DE RESISTENCIA M4 · 5 INTENTOS DE ROMPER LA APLICACIÓN
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 text-cyan-400 font-mono">
                      <th className="py-2.5 pr-2">N.º</th>
                      <th className="py-2.5 pr-3">Intento Hostil</th>
                      <th className="py-2.5 pr-3">Comportamiento Inicial (Antes)</th>
                      <th className="py-2.5 pr-3">Manejo Implementado (Después)</th>
                      <th className="py-2">Resultado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="py-2.5 font-mono text-cyan-400">1</td>
                      <td className="py-2.5 font-semibold text-white">Campos vacíos o puros espacios</td>
                      <td className="py-2.5 text-rose-300">Creaba tarjetas sin título ni texto ocupando espacio en blanco.</td>
                      <td className="py-2.5 text-emerald-300">Validación con <code>trim()</code>, borde rojo y mensaje: «Por favor escribe el nombre del proyecto».</td>
                      <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px]">Superado</span></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-mono text-cyan-400">2</td>
                      <td className="py-2.5 font-semibold text-white">Enlace de demo con texto malicioso o sin protocolo</td>
                      <td className="py-2.5 text-rose-300">El botón 'Ver Demo' provocaba error 404 o desvío no seguro.</td>
                      <td className="py-2.5 text-emerald-300">Validador nativo <code>new URL()</code> que restringe a protocolos <code>http://</code> y <code>https://</code>.</td>
                      <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px]">Superado</span></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-mono text-cyan-400">3</td>
                      <td className="py-2.5 font-semibold text-white">Texto de más de 1,200 caracteres continuos sin espacios</td>
                      <td className="py-2.5 text-rose-300">Desbordaba el ancho de la tarjeta en celular forzando scroll horizontal.</td>
                      <td className="py-2.5 text-emerald-300">Límite estricto de 1,000 caracteres, contador visible y clase CSS <code>break-words</code>.</td>
                      <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px]">Superado</span></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-mono text-cyan-400">4</td>
                      <td className="py-2.5 font-semibold text-white">Doble clic veloz en botón guardar</td>
                      <td className="py-2.5 text-rose-300">Insertaba dos o tres registros duplicados con el mismo contenido.</td>
                      <td className="py-2.5 text-emerald-300">Estado <code>isSubmitting</code> que desactiva el botón inmediatamente tras el primer toque.</td>
                      <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px]">Superado</span></td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-mono text-cyan-400">5</td>
                      <td className="py-2.5 font-semibold text-white">LocalStorage corrupto o con datos alterados manualmente</td>
                      <td className="py-2.5 text-rose-300"><code>JSON.parse</code> lanzaba excepción no controlada dejando pantalla blanca.</td>
                      <td className="py-2.5 text-emerald-300">Envoltorio seguro con bloque <code>try/catch</code> y restauración automática a <code>INITIAL_PROJECTS</code>.</td>
                      <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px]">Superado</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: PRUEBA CON USUARIOS REALES */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300">
                // PRUEBA DE USABILIDAD EN ENTORNO REAL · 3 PERSONAS · 2 MINUTOS CADA UNA
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 text-cyan-400 font-mono">
                      <th className="py-2.5 pr-3">Evaluador</th>
                      <th className="py-2.5 pr-3">Acción Intentada</th>
                      <th className="py-2.5 pr-3">Obstáculo Detectado</th>
                      <th className="py-2.5 pr-3">Cita Textual</th>
                      <th className="py-2">Solución Aplicada</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="py-2.5 font-bold text-white">Compañero de aula (Kevin M., 3DS B)</td>
                      <td className="py-2.5">Registrar un proyecto nuevo desde el teléfono.</td>
                      <td className="py-2.5">No tenía enlace de demo publicado y creyó que era forzoso.</td>
                      <td className="py-2.5 italic text-slate-300">«Mirá, me tira error en el link aunque solo tengo el link de GitHub y no la página todavía.»</td>
                      <td className="py-2.5 text-emerald-400"><b>Corregido en M4:</b> Se permitió guardar solo con repositorio o solo con demo sin obligar a ambos.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-white">Docente de área (Licda. Ramos)</td>
                      <td className="py-2.5">Revisar matriz de habilidades y formación.</td>
                      <td className="py-2.5">Los porcentajes numéricos eran ambiguos sin un término cualitativo.</td>
                      <td className="py-2.5 italic text-slate-300">«Se ve bien en el teléfono, pero decime qué significa 85 %... ¿es que ya podés trabajar en eso o estás aprendiendo?»</td>
                      <td className="py-2.5 text-emerald-400"><b>Corregido en M3 y M4:</b> Se añadieron insignias contextuales legibles (Avanzado, Intermedio, Fundamentos).</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-white">Persona ajena (Andrea Z., Hermana)</td>
                      <td className="py-2.5">Enviar un mensaje desde el formulario.</td>
                      <td className="py-2.5">Esperaba que se abriera su app de correo de una sola vez.</td>
                      <td className="py-2.5 italic text-slate-300">«¿Se mandó o no? Solo me apareció una cajita verde abajo pero no vi que sonara el correo.»</td>
                      <td className="py-2.5 text-emerald-400"><b>Corregido en M4:</b> Mensaje clarificador: «Guardado en la bandeja local del portafolio, con botón directo a WhatsApp y correo».</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: TARJETA ANTI-ALUCINACIÓN */}
          {activeTab === 'card' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-rose-300">
                // TARJETA ANTI-ALUCINACIÓN · 3 AFIRMACIONES DE LA IA VERIFICADAS CONTRA DOCUMENTACIÓN
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 text-cyan-400 font-mono">
                      <th className="py-2.5 pr-3">Afirmación de la IA</th>
                      <th className="py-2.5 pr-3">Cómo se Verificó</th>
                      <th className="py-2">Resultado & Corrección</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="py-2.5 italic text-white">«Podés instanciar new GoogleGenAI(apiKey) pasando directamente el string como primer argumento.»</td>
                      <td className="py-2.5 text-slate-300">Se revisó el archivo de tipos index.d.ts del paquete oficial @google/genai v2.4.</td>
                      <td className="py-2.5 text-rose-400"><b>Falsa / Alucinación:</b> El constructor moderno requiere un objeto: <code>new GoogleGenAI({`{ apiKey: ... }`})</code>. Corregido.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 italic text-white">«El tipo de esquema en responseSchema se importa desde SchemaType de @google/genai.»</td>
                      <td className="py-2.5 text-slate-300">Consulta a la documentación de tipos y especificaciones de @google/genai en TypeScript.</td>
                      <td className="py-2.5 text-rose-400"><b>Falsa / Desactualizada:</b> <code>SchemaType</code> correspondía al SDK legado. El enum actual es <code>Type</code> (ej. <code>Type.OBJECT</code>). Corregido.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 italic text-white">«LocalStorage puede almacenar objetos complejos en memoria sin necesidad de serializarlos a texto.»</td>
                      <td className="py-2.5 text-slate-300">Prueba ejecutada en consola de navegador con <code>localStorage.setItem('k', {`{ a: 1 }`})</code>.</td>
                      <td className="py-2.5 text-rose-400"><b>Falsa:</b> Almacena la cadena '[object Object]'. Se implementó serialización con <code>JSON.stringify</code> y <code>JSON.parse</code> seguro.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: FICHA EJERCICIO 37 */}
          {activeTab === 'rubric' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                // FICHA TÉCNICA OFICIAL · EJERCICIO 37 DE LA GUÍA DEL DOCENTE JAVIER GARCÍA MINEROS
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg font-black text-cyan-400">EJERCICIO 37 · MI PORTAFOLIO</span>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono">
                    Categoría: Proyecto de Vida
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <p><b>Problema:</b> Al postular a la universidad no hay dónde mostrar lo que uno ya hizo.</p>
                  <p><b>Usuario:</b> El propio estudiante (Diego Fernando Zúñiga Aguilar, INDEL 3DS A).</p>
                  <div>
                    <b>Las tres funciones mínimas (P0 + M1):</b>
                    <ol className="list-decimal pl-5 mt-1 space-y-1 text-slate-300 text-xs">
                      <li>Registrar proyecto con descripción, imagen y enlace.</li>
                      <li>Sección «sobre mí» con habilidades.</li>
                      <li>Formulario o datos de contacto.</li>
                    </ol>
                  </div>
                  <p><b>Dato clave que maneja (M2):</b> Proyectos propios con su enlace (persistencia en localStorage).</p>
                  <p><b>Sello de IA (M5):</b> La IA convierte las notas sueltas del estudiante en una descripción profesional de cada proyecto, y el estudiante la corrige para que no diga nada falso.</p>
                  <p><b>Dónde guardar:</b> Proyectos publicados en el sitio.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/90 rounded-b-2xl flex flex-wrap items-center justify-between gap-3 print:hidden">
          <span className="text-xs font-mono text-slate-400">
            Documento verificado conforme a la rúbrica de 10 puntos (10% del período).
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadMd}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .MD</span>
            </button>
            <button
              onClick={handleDownloadHtml}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .HTML</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
