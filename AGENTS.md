# Contexto de Proyecto: PadelDraw

## 1. Descripción General
PadelDraw es una App para la gestión de torneos de pádel. Permite a los organizadores y jugadores crear torneos, gestionar inscripciones y visualizar rankings. Los usuarios pueden buscar torneos, armar parejas y seguir sus resultados.

## 2. Stack Tecnológico
- **Frontend:** Nuxt 4 (Vue 3 Composition API).
- **Estilos:** Tailwind CSS.
- **Backend/Base de Datos:** Supabase (PostgreSQL).
- **Almacenamiento:** Supabase Storage (Buckets para Flyers).
- **Iconos:** Iconify (usando el componente `<Icon />`).

## 3. Arquitectura de Base de Datos (Reglas de Negocio)

### Categorías y Niveles
El sistema utiliza una escala numérica para los niveles de los jugadores (`category_rank` o `level_rank`):
- **Escala:** 1 (Nivel más alto/1ra) hasta 8 (Nivel inicial).
- **Validación Estándar:** Un jugador puede inscribirse si su rank es MAYOR o IGUAL al `target_level` de la categoría (Ej: un rank 5 puede jugar en 4ta, pero un rank 3 no).

### Modalidad "Suma"
Existen categorías especiales donde se suma el nivel de ambos integrantes:
- **Flag:** `is_suma: boolean`.
- **Lógica:** Si `is_suma` es true, el `target_level` representa la suma máxima permitida de los ranks de la pareja (Ej: Suma 10 => Jugador A(4) + Jugador B(6) = 10).

### Géneros
Se manejan tres tipos mediante un ENUM: `Caballeros`, `Damas`, y `Mixto`.

## 4. Estándares de Código
- **Naming:** camelCase para variables/funciones en JS y PascalCase para archivos de componentes.
- **TypeScript:** Uso estricto de interfaces para modelos de base de datos.
- No usar `any` en TypeScript
- **Supabase:** Utilizar el composable `useSupabaseClient()` para las consultas.
- **UI:** - Seguir la paleta de colores: **Navy** (Primary), **Lime** (Secondary) y **Orange** (Action)
  - Usar el componente de UI `Tag.vue` para categorías y estados.
  - Las imágenes de torneos deben usar `flyer_url` proveniente del bucket `flyers` de Supabase.

## 5. Estructura de Datos Clave
- `profiles`: Datos de usuario y nivel de juego.
- `tournaments`: Info del evento y `flyer_url`.
- `categories`: `is_suma`, `target_level`, `gender`.
- `tournament_categories`: Tabla intermedia que vincula torneos con sus categorías.
- `teams`: Parejas formadas por dos `profiles`.
- `tournament_registrations`: Solicitudes de inscripción con estados (`pending`, `accepted`, `rejected`).
- `matches`: Partidos a jugar o jugados con su información pertinente (están asociados a un torneo).

## 6. Consideraciones
- **Autoimports** Como se utiliza Nuxt, recordar que éste cuenta con autoimports para los componentes.
- **Semicolons** No utilizar semicolons al final de cada instrucción.
- **Quotes:** Usar siempre comillas simples ('') a menos que sea JSON.

## Comandos útiles
- `pnpm dev` — servidor de desarrollo
- `pnpm lint` — ESLint
- `pnpm test` — Vitest