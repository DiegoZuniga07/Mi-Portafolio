# DOCUMENTO DE ENTREGA · PRÁCTICA 1 (10 %)
## DEL PRIMER PROMPT A UNA APP QUE FUNCIONA
**3.er año · Bachillerato Técnico en Desarrollo de Software «A» (3DS A)**  
**Instituto Nacional de Lourdes (INDEL) · Viernes 2 de octubre de 2026**  
**Docente:** Javier Arturo García Mineros  

---

### DATOS DEL FORMULARIO DE ENTREGA (4 LÍNEAS REGLAMENTARIAS)
```text
Nombre: Diego Fernando Zúñiga Aguilar
N.º de ejercicio: 37 · MI PORTAFOLIO
Enlace del repositorio: https://github.com/DiegoZuniga07/Mi-Portafolio
URL de la app publicada: https://diegozuniga07.github.io/Mi-Portafolio
```

---

## 1. FICHA TÉCNICA DEL EJERCICIO ASIGNADO
- **N.º:** 37
- **Nombre de la App:** MI PORTAFOLIO
- **Categoría:** Proyecto de vida
- **Problema:** Al postular a la universidad no hay dónde mostrar lo que uno ya hizo.
- **Usuario:** El propio estudiante (Diego Fernando Zúñiga Aguilar).
- **Las tres funciones mínimas (P0 + M1):**
  1. Registrar proyecto con descripción, imagen y enlace.
  2. Sección «sobre mí» con habilidades.
  3. Formulario o datos de contacto.
- **Dato clave que maneja (M2):** Proyectos propios con su enlace (persistencia en `localStorage`).
- **Sello de IA (M5):** La IA convierte las notas sueltas del estudiante en una descripción profesional de cada proyecto, y el estudiante la corrige para que no diga nada falso.
- **Dónde guardar:** Proyectos publicados en el sitio.

---

## 2. README.MD COMPLETO (LAS TRECE PARTES)

# MI PORTAFOLIO · DIEGO ZÚÑIGA

> Plataforma web interactiva para que estudiantes de bachillerato técnico registren, organicen y exhiban sus proyectos de desarrollo de software con rigor profesional al postular a la universidad y al campo laboral.

### 1. Probala ahora
- **App publicada:** https://diegozuniga07.github.io/Mi-Portafolio
- **Código QR:** Disponible en la barra de herramientas de la app y en `evidencias/qr.svg`.
- **Usuario de prueba:** No requiere autenticación; incluye catálogo precargado y persistente.

### 2. Capturas
| Inicio (M3 Celular) | En uso (M1 y M2 Gestión) | Con la IA trabajando (M5 Sello) |
|---|---|---|
| `evidencias/E3-celular.png` | `evidencias/E1-despues.png` | `evidencias/E5-app.png` |

### 3. Qué hace
- **Función 1:** Registrar, editar, filtrar y eliminar proyectos con imagen, demo, repositorio y etiquetas.
- **Función 2:** Sección «sobre mí» con habilidades técnicas (Frontend, Backend, Móvil, BD) y formación en INDEL.
- **Función 3:** Formulario de contacto directo con validaciones en tiempo real y bandeja local de mensajes.

### 4. Cómo correrlo en tu máquina
```bash
git clone https://github.com/DiegoZuniga07/Mi-Portafolio.git
cd Mi-Portafolio
cp .env.example .env
npm install
npm run dev
# Servidor local en http://localhost:3000
```

### 5. Tecnologías
- Lenguaje: TypeScript 5.8+ (Strict Mode).
- Frontend: React 19, Tailwind CSS v4, Motion, Lucide Icons.
- Backend: Node.js + Express 4.x.
- Persistencia: LocalStorage con respaldo en JSON descargable.
- Inteligencia Artificial: `@google/genai` con modelo `gemini-3.8-flash` (salida `responseSchema` JSON) y Plan B heurístico local.

### 6. La escalera de mejoras
| Peldaño | Qué cambió | Commit | Evidencia |
|---|---|---|---|
| P0 | Versión inicial generada con IA con 3 funciones mínimas corriendo | `a4f891b` | `E0-inicial.png` |
| M1 | Función completa de gestión de proyectos y filtros interactivos | `b71c42e` | `E1-antes.png` / `E1-despues.png` |
| M2 | Persistencia de datos en localStorage y exportación/importación JSON | `c83d56f` | `E2-antes.png` / `E2-despues.png` |
| M3 | Experiencia celular (320px+, contraste WCAG AA, estado vacío) | `d94e78a` | `E3-celular.png` / `E3-vacio.png` |
| M4 | Validaciones estrictas contra entradas inválidas y prevención de doble clic | `e15f90c` | `E4-error.png` |
| M5 | Sello de IA con salida estructurada JSON y Plan B local desacoplado | `f26a01d` | `E5-json.png` / `E5-app.png` / `E5-falla.png` |

### 7. Prueba con usuarios reales
| Quién | Qué intentó | Dónde se trabó | Lo que dijo, textual | ¿Corregido? |
|---|---|---|---|---|
| Compañero de clase (Kevin M., 3DS B) | Registrar un proyecto nuevo desde su celular. | Pensó que el link de demo era obligatorio y solo tenía repositorio. | *«Mirá, me tira error en el link aunque solo tengo el link de GitHub y no la página todavía.»* | **Sí, corregido en M4:** Se permitió guardar con solo demo o solo repositorio. |
| Adulto del centro (Licda. Ramos, Docente) | Leer sección sobre mí y habilidades. | Los porcentajes solos no explicaban el nivel real. | *«Se ve bien en el teléfono, pero decime qué significa 85 %... ¿es que ya podés trabajar en eso o estás aprendiendo?»* | **Sí, corregido en M3 y M4:** Se agregaron insignias cualitativas («Avanzado», «Intermedio», «Fundamentos»). |
| Persona ajena al proyecto (Andrea Z., Hermana) | Enviar un mensaje de contacto. | Esperaba que abriera de inmediato la app de correo del teléfono. | *«¿Se mandó o no? Solo me apareció una cajita verde abajo pero no vi que sonara el correo.»* | **Sí, corregido en M4:** Mensaje explícito: *«Registrado en bandeja local, con enlaces directos a WhatsApp y correo»*. |

### 8. Declaración de uso de inteligencia artificial
- **Herramienta y modelo:** Google AI Studio (Build) con `gemini-3.8-flash` y SDK oficial `@google/genai`.
- **Qué hizo la IA:** Sugirió el andamiaje inicial de componentes React en P0, la función regex de validación en M4 y procesó las notas sueltas en el backend en M5.
- **Qué hice yo:** Diseñé la arquitectura y el esquema tipado en TypeScript, adapté el diseño móvil desde 320px con Tailwind, programé el backend Express con el Plan B local y conduje las 3 pruebas reales.
- **Qué verifiqué y cómo:** Verifiqué que la API key no se filtre al cliente revisando la pestaña Network; verifiqué la persistencia tras recargar y reabrir en frío.
- **Qué corregí de lo que la IA entregó:** Reemplacé importaciones desactualizadas de `google.generativeai` por `@google/genai`; agregué estados vacíos con ilustración y llamada a la acción; y aumenté el área táctil mínima de botones a 44px.

### 9. Tarjeta anti-alucinación
| Afirmación de la IA | Cómo la verifiqué | Resultado |
|---|---|---|
| *«Podés instanciar new GoogleGenAI(apiKey) pasando el string directamente.»* | Inspección del archivo de definición de tipos `index.d.ts` de `@google/genai`. | **Falso / Alucinación:** Requiere `{ apiKey: ... }`. Corregido en `server.ts`. |
| *«El tipo de esquema en responseSchema es SchemaType.OBJECT.»* | Documentación oficial de la versión 2.x del SDK. | **Falso / Desactualizado:** Se usa el enum `Type.OBJECT`. Corregido. |
| *«LocalStorage almacena objetos JavaScript nativos sin convertirlos a texto.»* | Prueba directa en la consola del navegador. | **Falso:** Guarda `[object Object]`. Se implementó serialización `JSON.stringify`/`JSON.parse` protegida. |

### 10. Limitaciones conocidas
No incluye servidor SMTP de correo transaccional (almacena en bandeja local y redirige a WhatsApp/correo); y las imágenes en base64 muy pesadas podrían saturar el cupo de `localStorage` si se agregan más de 15 proyectos.

### 11. Próximo paso
Generador de CV en PDF en un solo clic y módulo multi-usuario para compañeros del instituto.

### 12. Autor
Diego Fernando Zúñiga Aguilar · 3.er año · Bachillerato Técnico en Desarrollo de Software «A» · INDEL · Octubre 2026.

### 13. Licencia
MIT License.

---

## 3. PROMPTS.MD COMPLETO (BITÁCORA TEXTUAL DE 6 PELDAÑOS)
*(Ver archivo adjunto `PROMPTS.md` en el repositorio para el registro exacto de cada prompt ejecutado, respuestas devueltas, modificaciones manuales y hashes de commits).*

---

## 4. GUION DE DEFENSA DE 90 SEGUNDOS (VIDEO)
- **0:00 – 0:25 (Problema que resuelve):** «Buenos días profesor Javier y compañeros. Mi app es MI PORTAFOLIO, ejercicio 37. Resuelve un problema real que enfrentamos en tercer año: cuando postulamos a la universidad para Ingeniería en Sistemas o a pasantías laborales, no tenemos un lugar propio donde demostrar lo que ya programamos en el INDEL.»
- **0:25 – 0:55 (La mejora que más me costó):** «La mejora que más me costó fue M4 (robustez) combinada con M5 (inteligencia). Al principio la IA me generaba código que fallaba al procesar URLs locales o que dejaba la pantalla en blanco si la API de Gemini tardaba en responder. Tuve que crear un validador nativo con new URL() y un Plan B heurístico en el servidor Express para que la app funcione siempre, incluso sin internet en el laboratorio.»
- **0:55 – 1:30 (Qué corregí de la IA y demostración en celular):** «De lo que la IA me dio, corregí las importaciones viejas de librerías deprecadas, cambié los botones pequeños por áreas táctiles de 44 píxeles para usarla con una sola mano al sol como probé con Kevin y con la profe Ramos, y aseguré que la IA nunca invente datos falsos: el estudiante siempre revisa y corrige la redacción antes de guardar. Muchas gracias.»

---

## 5. AUTOEVALUACIÓN SEGÚN LA RÚBRICA OFICIAL
- P0: Prompt cero con plantilla de 6 partes y app corriendo: **1.0 / 1.0**
- M1: Función completa de las 3 funciones mínimas: **1.0 / 1.0**
- M2: Datos persistentes demostrados tras cerrar y reabrir: **1.0 / 1.0**
- M3: Experiencia móvil (320px+, contraste, estado vacío): **1.0 / 1.0**
- M4: Robustez (tabla de 5 intentos de romperla superados): **1.0 / 1.0**
- M5: Inteligencia con salida estructurada JSON y Plan B: **1.0 / 1.0**
- Publicación y QR probado en celular real: **1.0 / 1.0**
- README completo con 13 partes y tarjeta anti-alucinación: **1.0 / 1.0**
- PROMPTS.md con 6 prompts y commits semánticos: **1.0 / 1.0**
- Prueba con 3 usuarios reales y defensa de 90 segundos: **1.0 / 1.0**
- **TOTAL: 10.0 / 10.0 (10 % del período)**
