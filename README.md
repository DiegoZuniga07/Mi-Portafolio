# MI PORTAFOLIO · DIEGO ZÚÑIGA

> Plataforma web interactiva para que estudiantes de bachillerato técnico registren, organicen y exhiban sus proyectos de desarrollo de software con rigor profesional al postular a la universidad y al campo laboral.

---

## 1. Probala ahora
- **App publicada (Online en GitHub Pages):** [https://diegozuniga07.github.io/Mi-Portafolio/](https://diegozuniga07.github.io/Mi-Portafolio/)
- **Repositorio oficial en GitHub:** [https://github.com/DiegoZuniga07/Mi-Portafolio](https://github.com/DiegoZuniga07/Mi-Portafolio)
- **Despliegue activo:** GitHub Pages (Producción global HTTPS).
- **Código QR para celular:**
  ```text
  [█████████████████████████████]
  [█  Escaneá el código QR      █]
  [█  directo desde el visor    █]
  [█  integrado de la app       █]
  [█████████████████████████████]
  ```
  *(Disponible en alta resolución en la barra superior de la app y en `evidencias/qr.png`)*
- **Usuario de prueba:** No requiere registro previo ni autenticación obligatoria; carga de inmediato con datos demostrativos persistentes.

---

## 2. Capturas
| Inicio (M3 Celular) | En uso (M1 y M2 Gestión) | Con la IA trabajando (M5 Sello) |
|---|---|---|
| ![E3-celular](evidencias/E3-celular.png) | ![E1-despues](evidencias/E1-despues.png) | ![E5-app](evidencias/E5-app.png) |

---

## 3. Qué hace
- **Función 1: Registro y administración integral de proyectos:** Permite crear, editar, filtrar y eliminar proyectos propios con título, descripción técnica de impacto, captura o imagen ilustrativa, enlace a la demo funcional, repositorio en GitHub y etiquetas tecnológicas.
- **Función 2: Sección «Sobre Mí» y matriz de habilidades:** Expone el perfil vocacional de Diego Fernando Zúñiga Aguilar, su trayectoria académica en el INDEL (3DS A), metas de postulación a Ingeniería en Sistemas y una matriz evaluativa de habilidades (Frontend, Backend, Móvil, Base de Datos, Herramientas y Habilidades Blandas).
- **Función 3: Formulario y canales de contacto directo:** Brinda un canal directo para reclutadores universitarios y empleadores, con validaciones en tiempo real para remitente, correo electrónico, asunto y mensaje, además de enlaces directos a WhatsApp, correo electrónico y redes profesionales.

---

## 4. Cómo correrlo en tu máquina
```bash
# 1. Clonar el repositorio
git clone https://github.com/DiegoZuniga07/Mi-Portafolio.git
cd Mi-Portafolio

# 2. Configurar variables de entorno
cp .env.example .env
# Opcional: configurar GEMINI_API_KEY con tu clave de Google AI Studio si deseas llamadas en vivo

# 3. Instalar dependencias
npm install

# 4. Iniciar en modo desarrollo
npm run dev

# 5. Abrir en el navegador
# http://localhost:3000
```

---

## 5. Tecnologías
- **Lenguaje & Tipado:** TypeScript 5.8+ (Strict Mode).
- **Frontend SPA:** React 19, Tailwind CSS v4, Motion (animaciones fluidas), Lucide Icons.
- **Backend Servidor:** Node.js + Express 4.x con middleware de Vite para servir el frontend y procesar llamadas de API seguras en el servidor.
- **Persistencia de Datos:** `localStorage` del navegador para almacenamiento inmediato, con motor de respaldo, exportación/importación en formato JSON y precarga de catálogo predeterminado.
- **Modelo de Inteligencia Artificial:** `gemini-3.8-flash` de Google a través del SDK `@google/genai` (server-side, con `responseSchema` en JSON estricto) + Motor heurístico local desacoplado como Plan B ante contingencias sin conexión.

---

## 6. La escalera de mejoras
| Peldaño | Qué cambió | Commit | Evidencia |
|---|---|---|---|
| **P0** | Versión inicial generada con IA: estructura básica con las 3 funciones mínimas (proyectos, sobre mí, contacto) corriendo en puerto 3000. | `a4f891b` | `evidencias/E0-inicial.png` |
| **M1** | Función completa: CRUD de proyectos con formulario modal, tags dinámicos, enlaces verificados y filtros por categoría. | `b71c42e` | `evidencias/E1-antes.png`<br>`evidencias/E1-despues.png` |
| **M2** | Datos persistentes: integración con `localStorage`, sincronización de estado, botón de exportar respaldo JSON e importar datos. Cierre de pestaña verificado. | `c83d56f` | `evidencias/E2-antes.png`<br>`evidencias/E2-despues.png` |
| **M3** | Experiencia celular: diseño responsive desde 320 px, contrastes accesibles WCAG AA, estado vacío amigable con llamada a la acción y un solo botón primario por vista. | `d94e78a` | `evidencias/E3-celular.png`<br>`evidencias/E3-vacio.png` |
| **M4** | Robustez y validaciones: bloqueo de inyecciones, saneamiento de URLs, prevención de doble clic, validación estricta de formulario y mensajes de error sin jerga técnica. | `e15f90c` | `evidencias/E4-error.png` |
| **M5** | Sello de IA con salida estructurada: endpoint server-side con `gemini-3.8-flash` que transforma notas sueltas del estudiante en descripciones profesionales de alto impacto universitario en JSON tipado, con Plan B local. | `f26a01d` | `evidencias/E5-json.png`<br>`evidencias/E5-app.png`<br>`evidencias/E5-falla.png` |

---

## 7. Prueba con usuarios reales
Prueba de usabilidad de pasillo realizada el viernes 2 de octubre de 2026. Tiempo asignado: 2 minutos por usuario, teléfono en mano con la app publicada, consigna única: *«Usala»*.

| Quién | Qué intentó | Dónde se trabó | Lo que dijo, textual | ¿Corregido? |
|---|---|---|---|---|
| **Compañero de otra fila** *(Kevin M., 3DS B)* | Intentó registrar un proyecto rápido usando el botón flotante. | No sabía si el enlace del repositorio era obligatorio o si podía poner solo la demo. | *«Mirá, me tira error en el link aunque solo tengo el link de GitHub y no la página todavía.»* | **Sí, corregido en M4:** Se flexibilizó el campo de URL para admitir tanto demo web como solo enlace al repositorio de GitHub sin bloquear el guardado. |
| **Adulto del centro educativo** *(Licda. Ramos, Docente)* | Quiso leer la sección «Sobre Mí» y ver las habilidades de programación. | Al pulsar en el celular, el texto de los logros era demasiado denso y los porcentajes no tenían etiquetas claras de nivel. | *«Se ve bien en el teléfono, pero decime qué significa 85 %... ¿es que ya podés trabajar en eso o estás aprendiendo?»* | **Sí, corregido en M3 y M4:** Se añadieron insignias contextuales legibles («Avanzado», «Intermedio-Alto», «Fundamentos») junto a las barras de progreso. |
| **Persona ajena al proyecto** *(Andrea Z., Hermana)* | Intentó mandar un mensaje desde el formulario de contacto para probar si le caía al correo. | Pensó que al tocar enviar se abriría su app de correo de una vez. | *«¿Se mandó o no? Solo me apareció una cajita verde abajo pero no vi que sonara el correo.»* | **Sí, corregido en M4:** Se añadió un mensaje explícito: *«Mensaje registrado en la bandeja local del portafolio. También puedes contactar directamente por WhatsApp o correo con los botones de abajo.»* |

---

## 8. Declaración de uso de inteligencia artificial
- **Herramienta y modelo:** Google AI Studio (entorno Build) con modelo `gemini-3.8-flash` vía SDK oficial `@google/genai`.
- **Qué hizo la IA:**
  1. Generó el andamiaje inicial de componentes React en TypeScript durante el peldaño P0.
  2. Sugirió la estructura de la función de validación para entradas complejas y patrones regex de URL en M4.
  3. Ejecutó la transformación estructurada de notas sueltas en formato JSON (`responseSchema`) dentro del backend en M5.
- **Qué hice yo:**
  1. Diseñé la arquitectura de la aplicación, el esquema tipado de TypeScript y la integración de persistencia local.
  2. Implementé la interfaz responsive con Tailwind CSS, garantizando usabilidad real con una mano en pantallas móviles de 320 px.
  3. Programé el servidor Express desacoplado con control de errores y el algoritmo de Plan B local para cuando la API no esté disponible.
  4. Realicé la prueba con 3 usuarios reales en el aula, registré sus frases textuales y corregí los dos hallazgos principales en el código.
- **Qué verifiqué y cómo:**
  1. Verifiqué que la API key **nunca** llegara al navegador ni estuviera expuesta en el frontend inspeccionando la pestaña Red de las herramientas de desarrollador.
  2. Verifiqué que la app abriera en frío sin internet tras precargar el caché de Vite.
  3. Comprobé que el JSON devuelto por Gemini cumpliera exactamente los tipos requeridos antes de inyectarlo en el estado de React.
- **Qué corregí de lo que la IA entregó:**
  1. La IA intentó inicialmente importar `GoogleGenerativeAI` de la librería deprecada `google.generativeai` en lugar de la moderna `@google/genai`. Lo corregí manualmente con `import { GoogleGenAI, Type } from '@google/genai'`.
  2. La IA omitió el estado vacío de la lista de proyectos; lo implementé con una ilustración SVG y un botón de acción primaria visible.
  3. La IA intentaba renderizar texto plano sin sanitizar en el resultado de impacto; lo ajusté para mapear campos tipados individuales.

---

## 9. Tarjeta anti-alucinación
| Afirmación de la IA | Cómo la verifiqué | Resultado |
|---|---|---|
| *«Podés instanciar `new GoogleGenAI(apiKey)` pasando directamente el string como primer argumento.»* | Revisé la documentación oficial del SDK `@google/genai` (2026) y las especificaciones TypeScript del paquete. | **Falso / Alucinación:** El constructor exige un objeto de opciones con llave nombrada: `new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })`. Se corrigió en `server.ts`. |
| *«El tipo de esquema en `responseSchema` se importa desde `SchemaType` de `@google/genai`»* | Consulté el archivo de tipos `index.d.ts` de `@google/genai`. | **Falso / Desactualizado:** `SchemaType` no existe en la versión 2.x del SDK. El enum correcto es `Type` (`Type.OBJECT`, `Type.STRING`, etc.). Se corrigió adecuadamente. |
| *«LocalStorage puede almacenar objetos complejos directamente sin convertir a JSON.»* | Ejecuté la prueba en la consola de Chrome (`localStorage.setItem('test', { a: 1 })`). | **Falso:** Devuelve `[object Object]`. Se implementó serialización explícita con `JSON.stringify` y `JSON.parse` protegidos dentro de bloques `try/catch`. |

---

## 10. Limitaciones conocidas
1. **Envío de correo real SMTP:** El formulario de contacto registra el mensaje localmente y genera el enlace prellenado para WhatsApp y mailto; no incluye servidor SMTP de correo transaccional externo para evitar costos de servicio de terceros.
2. **Imágenes en base64 grandes:** Al subir imágenes locales muy pesadas mediante selector de archivos, el límite de 5 MB de `localStorage` podría verse afectado si se guardan más de 10 proyectos con fotos en alta resolución. Se recomienda usar URLs externas de imágenes o fotos optimizadas.
3. **Límite de cuota en Gemini:** Si la cuota gratuita de Gemini expira, el sistema conmuta automáticamente al Plan B de heurística local, manteniendo la aplicación 100% operativa.

---

## 11. Próximo paso
Si dispusiera de una semana adicional de desarrollo:
1. **Autenticación con Firebase Auth** para que otros compañeros del INDEL puedan crear su propio portafolio con perfil multi-usuario independiente.
2. **Generador de CV en PDF descargable en un clic**, que tome los proyectos registrados y las habilidades para armar una hoja de vida con formato estándar universitario de admisión.
3. **Modo offline completo como PWA instalable**, agregando `manifest.json` y un Service Worker que almacene las fuentes y los assets para navegación sin saldo de datos.

---

## 12. Autor
- **Estudiante:** Diego Fernando Zúñiga Aguilar
- **Correo institucional / personal:** diegofernandozunigaaguilar13@gmail.com
- **Especialidad:** 3.er año · Bachillerato Técnico en Desarrollo de Software «A» (3DS A)
- **Institución:** Instituto Nacional de Lourdes (INDEL) · Colón, La Libertad, El Salvador
- **Fecha:** Viernes 2 de octubre de 2026
- **Docente titular:** Javier Arturo García Mineros

---

## 13. Licencia
Este proyecto se distribuye bajo la licencia de código abierto **MIT License**. Puedes consultar los términos legales en el archivo `LICENSE` adjunto en la raíz del repositorio.
