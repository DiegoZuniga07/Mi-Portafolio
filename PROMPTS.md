# BITÁCORA DE PROMPTS · EJERCICIO 37: MI PORTAFOLIO

> Estudiante: **Diego Fernando Zúñiga Aguilar**  
> Sección: **3.er año · Desarrollo de Software «A» (3DS A)**  
> Centro: **Instituto Nacional de Lourdes (INDEL)**  
> Docente: **Javier Arturo García Mineros**  
> Fecha: **Viernes 2 de octubre de 2026**  

---

## P0 · Prompt Cero (Que Exista)

### Prompt textual (escrito en papel previamente y ejecutado):
```text
ROL: Sos un desarrollador senior de aplicaciones web.

CONTEXTO: Estoy construyendo una app llamada MI PORTAFOLIO para el propio estudiante (Diego Fernando Zúñiga Aguilar, 3.er año Desarrollo de Software «A», INDEL).
El problema que resuelve es: Al postular a la universidad no hay dónde mostrar lo que uno ya hizo.

TAREA: Generá la primera versión funcional, con estas tres funciones y nada más:
1. Registrar proyecto con descripción, imagen y enlace.
2. Sección «sobre mí» con habilidades.
3. Formulario o datos de contacto.

RESTRICCIONES: en español, sin librerías de pago, sin login, sin base de datos en servidor todavía. Que se vea bien en un celular. Código comentado en los puntos donde alguien vaya a equivocarse.

FORMATO DE SALIDA: los archivos completos, cada uno con su nombre, y al final una lista de lo que NO hiciste y por qué.

CRITERIO DE ACEPTACIÓN: abro la app, hago clic en ver proyectos y veo la lista inicial y puedo llenar el formulario de contacto sin ningún error en la consola.
```

- **Qué devolvió:** Un esquema React con barra de navegación, sección de bienvenida, grid simple de tarjetas de proyectos estáticas, bloque de biografía con lista de tecnologías y un formulario de contacto básico.
- **Qué acepté:** La distribución semántica de secciones en un solo flujo ordenado (`Header`, `About`, `Projects`, `Contact`).
- **Qué corregí a mano:** Los estilos venían con fuentes no responsivas que causaban desborde horizontal en 320 px. Ajusté los contenedores a `max-w-6xl mx-auto px-4` y aseguré el renderizado en Vite.
- **Evidencia:** `evidencias/E0-inicial.png`
- **Commit:** `a4f891b` — `"P0: primera version generada con IA"`

---

## M1 · Mejora 1 · Función (Que Sirva)

### Prompt textual:
```text
La app ya hace la visualización de proyectos estáticos y la sección sobre mí. Necesito agregar la función completa de gestión de proyectos:
1. Modal interactivo para crear nuevo proyecto con validación de campos (título, descripción, URL de demo, repositorio en GitHub, categoría y tags).
2. Posibilidad de editar o eliminar proyectos de la lista.
3. Filtro interactivo por categorías (Web, Móvil, Sistemas, Educación, IA / Datos) y buscador por texto.

No reescribas lo que ya funciona. Dame únicamente:
1. Los fragmentos nuevos o modificados, indicando en qué archivo y en qué parte va cada uno.
2. Una prueba manual de tres pasos para comprobar que quedó bien.
3. Qué podría romperse en el resto de la app por este cambio.
```

- **Qué devolvió:** Código del componente modal con campos controlados en React, lógica de filtrado por categoría y funciones para agregar (`addProject`) y borrar (`deleteProject`).
- **Qué acepté:** El modal con backdrop oscuro y los chips de categoría interactivos.
- **Qué corregí a mano:** El botón de cancelar no reseteaba los errores del formulario; agregué un `handleClose` que limpia el estado y devuelve el foco.
- **Evidencias:** `evidencias/E1-antes.png` y `evidencias/E1-despues.png`
- **Commit:** `b71c42e` — `"M1: funcion completa de registro, edicion y filtrado de proyectos"`

---

## M2 · Mejora 2 · Datos (Que Recuerde)

### Prompt textual:
```text
Quiero que los datos de la app no se pierdan al cerrarla.

Usá localStorage y explicame:
1. Dónde queda guardada la información exactamente.
2. Qué pasa si el usuario borra el caché o cambia de dispositivo.
3. Cómo hago para exportar los datos a un archivo JSON, por si quiero respaldarlos o restaurarlos en otra máquina.

Dame el código de guardar, leer y borrar, y un dato de ejemplo ya cargado para probar.
```

- **Qué devolvió:** Un custom hook o funciones utilitarias con `localStorage.getItem` y `localStorage.setItem`, inicializador con `INITIAL_PROJECTS` por defecto y una función para descargar un archivo `portafolio-backup.json`.
- **Qué acepté:** El almacenamiento bajo la clave `'diego_portfolio_projects_v1'` y la lógica del input file oculto para restauración de copias de seguridad.
- **Qué corregí a mano:** Si el JSON en `localStorage` estaba corrupto, la app arrojaba pantalla en blanco en `JSON.parse`. Envolví la lectura en un bloque `try/catch` con fallback automático a los datos de fábrica.
- **Evidencias:** `evidencias/E2-antes.png` y `evidencias/E2-despues.png` (demostrando persistencia tras recargar y reabrir el navegador).
- **Commit:** `c83d56f` — `"M2: persistencia de datos en localStorage y exportacion JSON"`

---

## M3 · Mejora 3 · Experiencia (Que Se Entienda)

### Prompt textual:
```text
Ajustá la interfaz de la app con estos requisitos, sin cambiar la lógica:

1. Se usa bien desde 320 px de ancho, con una sola mano y sin hacer zoom.
2. Contraste suficiente para leerse al sol (cumpliendo WCAG AA); texto nunca menor a 15-16 px.
3. Todos los campos con etiqueta visible, no solo con texto de ejemplo dentro.
4. Un solo botón principal por pantalla; los demás, secundarios o de bajo contraste.
5. Estado vacío: qué se muestra cuando todavía no hay ningún dato o cuando la búsqueda no arroja resultados, con una frase que invite a la primera acción.
6. Mensajes de éxito y de error visibles, en español, sin palabras técnicas.

Dame los cambios y decime cuál de los seis puntos NO pudiste cumplir y por qué.
```

- **Qué devolvió:** Ajustes de padding, estilos para etiquetas `label` con `font-semibold text-slate-200`, diseño del componente `EmptyState` con botón para "Registrar mi primer proyecto" o "Limpiar filtros", y paleta de contraste alto en tonos esmeralda/cian y pizarra oscuro.
- **Qué acepté:** El diseño de estados vacíos y la disposición con un único botón primario destacado (`btn-primary`).
- **Qué corregí a mano:** La IA puso botones con padding de 6px en móvil, lo cual dificultaba el toque con el pulgar. Los aumenté a un área táctil mínima de 44x44 px (`min-h-[44px]`).
- **Evidencias:** `evidencias/E3-celular.png` y `evidencias/E3-vacio.png`
- **Commit:** `d94e78a` — `"M3: experiencia de uso en celular y estado vacio"`

---

## M4 · Mejora 4 · Robustez (Que No Se Rompa)

### Prompt textual:
```text
Actuá como tester de software, no como programador.

Dame diez formas concretas de romper esta app desde la interfaz: campos vacíos, texto donde va número, URLs con formato inválido o inyecciones html, textos de 1000 caracteres, doble clic rápido en guardar, caracteres especiales, y fallo al leer almacenamiento.

Para cada una decime: qué pasaría hoy, qué debería pasar, y el código mínimo que lo evita. No cambies el diseño ni agregues funciones nuevas.
```

- **Qué devolvió:** Lista de 10 vectores de fallo con funciones de validación regex para URL (`/^https?:\/\/.+/`), saneamiento de cadenas (`trim()`, longitud máxima de 800 caracteres), deshabilitación del botón de guardar durante la ejecución para evitar duplicados y protección contra `localStorage` bloqueado o lleno.
- **Qué acepté:** La matriz de validación y la función `validateProjectInput`.
- **Qué corregí a mano:** La validación de URL de la IA era demasiado rígida y rechazaba URLs locales válidas como `http://localhost:3000` o links de GitHub con ramas. Escribí un validador basado en el constructor nativo `new URL()` de JavaScript.
- **Evidencia:** `evidencias/E4-error.png` (con mensaje claro ante entrada inválida) y matriz de 5 pruebas documentada en el README.
- **Commit:** `e15f90c` — `"M4: validaciones estrictas y control de errores"`

---

## M5 · Mejora 5 · Inteligencia (Que Piense)

### Prompt textual:
```text
Integrá una llamada a la API de Gemini dentro del servidor de la app para esta tarea concreta:
SELLO DE IA EJERCICIO 37: La IA convierte las notas sueltas del estudiante en una descripción profesional de cada proyecto, y el estudiante la corrige para que no diga nada falso.

Requisitos:
1. La respuesta debe venir como JSON con un esquema fijo (responseSchema con @google/genai), no como texto libre. Dame el esquema.
2. La app consume ese JSON en el servidor Express (/api/gemini/enhance-project) y el frontend lo muestra en pantalla como campos estructurados (título sugerido, párrafo de impacto, tecnologías y puntos clave).
3. La llave de API se lee de process.env.GEMINI_API_KEY en el servidor; nunca expuesta en el cliente.
4. Manejo de fallo: qué se muestra si la IA no responde, responde lento o no hay internet. Plan B local automático sin botar la app.
5. Un ejemplo de respuesta de prueba para desarrollar sin gastar llamadas.
```

- **Qué devolvió:** Endpoint Express `/api/gemini/enhance-project` usando `GoogleGenAI` de `@google/genai` con `gemini-3.8-flash`, esquema tipado con `Type.OBJECT`, y componente frontend con preview visual del JSON y botón "Aplicar al proyecto".
- **Qué acepté:** La arquitectura segura servidor-cliente y el modal de asistencia inteligente.
- **Qué corregí a mano:** Implementé el Plan B heurístico local para que si la API de Gemini no tiene cuota o el estudiante está sin internet en el laboratorio del instituto, el sistema genere igualmente una estructuración coherente basada en palabras clave sin romper la interfaz.
- **Evidencias:** `evidencias/E5-json.png`, `evidencias/E5-app.png` y `evidencias/E5-falla.png`
- **Commit:** `f26a01d` — `"M5: inteligencia con salida estructurada y plan B"`

---

## Cierre y Reflexión

- **Prompts que escribí en total:** 6 prompts principales (uno por peldaño) + 2 consultas puntuales de refinamiento.
- **El prompt que más me sirvió y por qué:** El prompt de **M4 (actuá como tester)**. Cambiar el rol de la IA de programador complaciente a auditor hostil me reveló que pegar un enlace sin protocolo `https://` o enviar textos de 500 caracteres sin saltos rompía el diseño de las tarjetas.
- **El error más caro que cometí:** Intentar usar nombres de métodos y clases desactualizadas de librerías viejas de Gemini sugeridas en respuestas genéricas. Lo resolví consultando la especificación oficial del SDK moderno `@google/genai`.
- **Lo que haría distinto la próxima vez:** Escribir las pruebas manuales antes de pedir el código. Diseñar primero la matriz de casos límite ahorra tener que solicitar parches adicionales en peldaños posteriores.
