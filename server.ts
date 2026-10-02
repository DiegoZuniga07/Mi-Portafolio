import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));

  // API endpoint: Sello de IA M5 - Convierte notas sueltas del estudiante en descripción profesional de proyecto
  app.post('/api/gemini/enhance-project', async (req, res) => {
    try {
      const { notes, category, title } = req.body;

      if (!notes || typeof notes !== 'string' || notes.trim().length === 0) {
        return res.status(400).json({
          error: 'Por favor ingresa notas o descripción inicial del proyecto.',
        });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      const isPlaceholderKey = !apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.startsWith('MY_') || apiKey.trim() === '';

      // Plan B / Fallback inteligente si no hay llave o si falla la API externa
      const fallbackGeneration = () => {
        const lower = notes.toLowerCase();
        
        const detectedTechs: string[] = [];
        const techDict = [
          'react', 'typescript', 'javascript', 'python', 'tailwind', 'css', 'html',
          'node.js', 'express', 'sqlite', 'mysql', 'postgresql', 'mongodb', 'git',
          'github', 'kotlin', 'android', 'jetpack compose', 'figma', 'vite', 'pwa',
          'rest api', 'next.js', 'vue', 'django', 'firebase', 'c#', 'java', 'sql'
        ];

        techDict.forEach((t) => {
          if (lower.includes(t)) {
            const formatted = t === 'pwa' ? 'PWA' 
              : t === 'css' ? 'CSS3' 
              : t === 'html' ? 'HTML5' 
              : t === 'sql' ? 'SQL'
              : t === 'rest api' ? 'REST API'
              : t.charAt(0).toUpperCase() + t.slice(1);
            if (!detectedTechs.includes(formatted)) {
              detectedTechs.push(formatted);
            }
          }
        });

        if (detectedTechs.length === 0) {
          detectedTechs.push('TypeScript', 'React', 'Tailwind CSS');
        }

        // Título inteligente
        let projectTitle = title && title.trim().length > 0 ? title.trim() : '';
        if (!projectTitle) {
          if (lower.includes('recicl') || lower.includes('basura') || lower.includes('ecolog')) {
            projectTitle = 'Recicla Puntos · Monitoreo y Gestión Ambiental';
          } else if (lower.includes('bolsillo') || lower.includes('finanz') || lower.includes('dinero') || lower.includes('gasto')) {
            projectTitle = 'Mi Bolsillo · Asistente Financiero para Estudiantes';
          } else if (lower.includes('ruta') || lower.includes('camino') || lower.includes('segur') || lower.includes('mapa')) {
            projectTitle = 'Ruta Segura · Georeferenciación y Alerta Cantonal';
          } else if (lower.includes('estudio') || lower.includes('examen') || lower.includes('repaso') || lower.includes('tarea')) {
            projectTitle = 'Repaso Espaciado · Simulador de Preparación Universitaria';
          } else {
            projectTitle = category ? `${category} · Solución de Software Aplicado` : 'Sistema de Aplicación Digital';
          }
        }

        return {
          titulo_profesional: projectTitle,
          descripcion_impacto: `Desarrollo enfocado en resolver ${notes.trim().slice(0, 160)}. Diseñado con arquitectura desacoplada para garantizar rendimiento en dispositivos móviles desde 320 px, persistencia de datos local tolerante a cortes de conexión y una experiencia de usuario accesible y directa.`,
          tecnologias_detectadas: detectedTechs,
          puntos_destacados: [
            'Interfaz móvil responsiva diseñada para interacción con una sola mano y contraste alto.',
            'Manejo de almacenamiento persistente con validaciones contra entradas erróneas.',
            'Estructura de código modular orientada a estándares de evaluación universitaria.',
          ],
          sugerencia_mejora: 'Incorporar métricas de uso real y pruebas automatizadas para elevar el nivel de madurez técnica del proyecto.',
        };
      };

      if (isPlaceholderKey) {
        // Fallback local estructurado (Plan B documentado en rúbrica)
        const fallback = fallbackGeneration();
        return res.json({
          source: 'local_engine',
          data: fallback,
          note: 'Generado con motor heurístico local (Plan B activo por entorno de laboratorio sin internet).',
        });
      }

      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const promptText = `Eres un evaluador y redactor senior para portafolios de bachillerato técnico en desarrollo de software que postulan a la universidad en carreras de Ingeniería de Software y Ciencias de la Computación.
Tu misión es transformar notas desordenadas o breves del estudiante en una descripción profesional, veraz y de alto impacto técnico.
Reglas:
1. NUNCA inventes tecnologías o logros que el estudiante no haya mencionado o insinuado razonablemente.
2. Destaca el valor del software, las competencias demostradas y el impacto práctico.
3. Responde estrictamente con el esquema JSON solicitado.

Título sugerido por el usuario (si existe): "${title || 'Sin título provisto'}"
Categoría: "${category || 'Desarrollo de Software'}"
Notas sueltas del estudiante:
"""${notes.trim()}"""`;

        // Timeout promise para evitar bloqueos de red prolongados (2 segundos)
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Tiempo de espera agotado al conectar con Gemini (timeout 2s)')), 2000);
        });

        const apiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptText,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                titulo_profesional: {
                  type: Type.STRING,
                  description: 'Título profesional y conciso para el proyecto en el portafolio',
                },
                descripcion_impacto: {
                  type: Type.STRING,
                  description: 'Párrafo profesional (2 a 4 oraciones) describiendo el problema, la solución técnica y el impacto',
                },
                tecnologias_detectadas: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Lista de tecnologías, lenguajes o herramientas identificadas',
                },
                puntos_destacados: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: '3 viñetas concretas con logros técnicos o características clave',
                },
                sugerencia_mejora: {
                  type: Type.STRING,
                  description: 'Una recomendación constructiva para llevar el proyecto a nivel universitario',
                },
              },
              required: [
                'titulo_profesional',
                'descripcion_impacto',
                'tecnologias_detectadas',
                'puntos_destacados',
              ],
            },
          },
        });

        const response: any = await Promise.race([apiPromise, timeoutPromise]);

        const textOutput = response.text ? response.text.trim() : '';
        const parsed = JSON.parse(textOutput);

        return res.json({
          source: 'gemini-3.8-flash',
          data: parsed,
          rawJson: textOutput,
        });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, using graceful fallback:', geminiError?.message || geminiError);
        const fallback = fallbackGeneration();
        return res.json({
          source: 'local_fallback',
          data: fallback,
          note: `Plan B activado: ${geminiError?.message || 'Error temporal de conexión con el proveedor de IA'}.`,
        });
      }
    } catch (err: any) {
      console.error('Error in /api/gemini/enhance-project:', err);
      return res.status(500).json({
        error: 'Ocurrió un error al procesar la solicitud con IA. Inténtalo de nuevo.',
      });
    }
  });

  // Download Endpoints
  app.get('/api/download/documento-md', (_req, res) => {
    const filePath = path.resolve(__dirname, 'DOCUMENTO_ENTREGA.md');
    res.download(filePath, 'DOCUMENTO_ENTREGA_DIEGO_ZUNIGA_EJ37.md');
  });

  app.get('/api/download/readme-md', (_req, res) => {
    const filePath = path.resolve(__dirname, 'README.md');
    res.download(filePath, 'README_DIEGO_ZUNIGA_EJ37.md');
  });

  app.get('/api/download/prompts-md', (_req, res) => {
    const filePath = path.resolve(__dirname, 'PROMPTS.md');
    res.download(filePath, 'PROMPTS_BITACORA_DIEGO_ZUNIGA_EJ37.md');
  });

  app.get('/api/download/documento-html', (_req, res) => {
    const filePath = path.resolve(__dirname, 'public', 'documento-entrega.html');
    res.download(filePath, 'DOCUMENTO_ENTREGA_DIEGO_ZUNIGA_EJ37.html');
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      app: 'MI PORTAFOLIO - Ejercicio 37',
      student: 'Diego Fernando Zúñiga Aguilar',
      section: '3.er año · Desarrollo de Software «A»',
    });
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Error al iniciar el servidor:', err);
  process.exit(1);
});
