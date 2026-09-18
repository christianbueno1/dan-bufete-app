# Resumen del proyecto Dan Bufete

## 1. Descripción general

Dan Bufete es una aplicación web para la gestión de expedientes jurídicos. Está construida con Angular 22 y utiliza una arquitectura standalone, rutas lazy, servicios basados en `@Service()`, inyección mediante `inject()` y estado reactivo con signals.

La aplicación se inicia mediante `bootstrapApplication()` y no utiliza `NgModule`.

## 2. Stack y paquetes

### Dependencias de ejecución

| Paquete | Uso |
| --- | --- |
| `@angular/common` | Funcionalidades comunes de Angular y cliente HTTP. |
| `@angular/compiler` | Compilación de templates Angular. |
| `@angular/core` | Componentes, signals, servicios, inyección y configuración principal. |
| `@angular/forms` | Infraestructura para formularios Angular; todavía no hay un formulario funcional implementado. |
| `@angular/platform-browser` | Arranque de la aplicación en el navegador. |
| `@angular/router` | Navegación y definición de rutas. |
| `rxjs` | `Observable` y flujo de respuestas HTTP. |
| `tslib` | Helpers de runtime de TypeScript. |

### Dependencias de desarrollo

| Paquete | Uso |
| --- | --- |
| `@angular/build` | Builder moderno de Angular para aplicación, servidor y pruebas. |
| `@angular/cli` | Comandos de desarrollo y generación del proyecto. |
| `@angular/compiler-cli` | Compilación TypeScript y templates Angular. |
| `jsdom` | Entorno DOM para pruebas. |
| `prettier` | Formateo de código. |
| `typescript` | Lenguaje y compilación estática. |
| `vitest` | Ejecución de pruebas unitarias. |

Comandos principales:

```bash
pnpm start       # Servidor de desarrollo
pnpm build       # Build de producción
pnpm test        # Pruebas unitarias con Vitest
pnpm run watch   # Build en modo watch
```

## 3. Ventanas y navegación

El punto de entrada redirige a `/cases`. Las vistas se cargan bajo demanda con `loadComponent()`.

| Ruta | Ventana | Componente | Estado actual |
| --- | --- | --- | --- |
| `/cases` | Lista de casos | `CaseList` | Muestra el título traducible de casos. La consulta y los filtros aún no están conectados a la API. |
| `/cases/new` | Nuevo caso | `CaseForm` | Ruta y encabezado inicial disponibles; falta implementar formulario, validación y guardado. |
| `/cases/:caseId` | Detalle de caso | `CaseDetail` | Ruta y encabezado inicial disponibles; falta cargar y mostrar el expediente. |
| `/` | Redirección | Router | Redirige a `/cases`. |

### Shell de la aplicación

`App` compone la interfaz común:

- `AppHeader` como cabecera global.
- `RouterOutlet` para mostrar la ventana activa.
- Layout principal definido en `app.html` y sus estilos asociados.

### Cabecera

La cabecera (`AppHeader`) contiene:

- Marca visual `Dan Bufete`.
- Enlace de navegación a casos.
- Enlace etiquetado como documentos, actualmente apuntando también a `/cases` porque todavía no existe una ventana independiente de documentos.
- Selector de idioma Español/Inglés.

## 4. Funciones por módulo

### `CaseList`

Archivo: `src/app/cases/case-list/case-list.ts`

- Inyecta `LanguageService` con `inject()`.
- Expone las traducciones mediante el signal computado `t`.
- Renderiza el título traducido de la sección de casos.
- Está preparada para crecer con listado, búsqueda, filtros, paginación y acciones sobre casos.

### `CaseForm`

Archivo: `src/app/cases/case-form/case-form.ts`

- Define la ventana de alta de casos.
- Actualmente solo renderiza el encabezado `New case`.
- Debe incorporar campos para área de práctica, título, descripción, cliente, abogado, prioridad, estado y fechas.
- El guardado deberá utilizar `CasesApiService.createCase()`.

### `CaseDetail`

Archivo: `src/app/cases/case-detail/case-detail.ts`

- Define la ventana de detalle de un caso.
- Actualmente solo renderiza el encabezado `Case detail`.
- Debe leer `caseId` desde la ruta y cargar el caso con `CasesApiService.getCase()`.
- Puede incorporar edición, eliminación, cambio de estado y listado de documentos asociados.

### `AppHeader`

Archivo: `src/app/layout/app-header.ts`

- Obtiene el idioma actual desde `LanguageService.language`.
- Obtiene las traducciones desde `LanguageService.translations`.
- Cambia el idioma con `setLanguage('es' | 'en')`.
- Usa `RouterLink` para la navegación.

## 5. Servicios

### `CasesApiService`

Archivo: `src/app/cases/cases-api.service.ts`

Servicio singleton mediante `@Service()` que encapsula la comunicación HTTP con el backend `http://localhost:8000`.

Métodos disponibles:

| Método | Endpoint | Resultado |
| --- | --- | --- |
| `getCases(filters?)` | `GET /cases` | `Observable<Case[]>`; admite área, estado, `skip` y `limit`. |
| `getCase(caseId)` | `GET /cases/{caseId}` | `Observable<Case>`. |
| `createCase(data)` | `POST /cases` | `Observable<Case>`. |
| `updateCase(caseId, data)` | `PATCH /cases/{caseId}` | `Observable<Case>`. |
| `deleteCase(caseId)` | `DELETE /cases/{caseId}` | `Observable<void>`. |

El servicio utiliza `HttpClient`, `HttpParams` y tipos TypeScript para las peticiones de creación y actualización.

### `LanguageService`

Archivo: `src/app/i18n/language.service.ts`

Servicio singleton mediante `@Service()` para la internacionalización:

- Mantiene el idioma con `signal<Language>()`.
- Expone el idioma como signal de solo lectura mediante `asReadonly()`.
- Calcula las traducciones activas con `computed()`.
- Soporta `es` y `en`.
- Persiste la preferencia en `localStorage` con la clave `dan-bufete-language`.
- Usa español como idioma predeterminado.

## 6. Modelos y tipos

### `Case`

Representa un expediente jurídico con:

- Identificación: `id`, `case_number`.
- Clasificación: `practice_area`, `status`, `priority`.
- Información principal: `title`, `description`.
- Participantes: `client_name`, `lawyer_name`.
- Fechas: `filing_date`, `opened_at`, `closed_at`, `created_at`, `updated_at`.
- Documentos relacionados opcionales: `documents?: CaseDocument[]`.

### Tipos de dominio

- `PracticeArea`: comercial, civil, penal, laboral, familia, administrativo, tributario y constitucional.
- `CaseStatus`: `open`, `in_progress`, `on_hold` y `closed`.
- `CasePriority`: `low`, `medium` y `high`.

### `CaseDocument`

Representa un documento asociado a un expediente:

- `id` y `case_id`.
- Nombre y tipo documental.
- URL del archivo.
- Usuario que lo cargó.
- Fecha de carga.

`DocumentType` admite `contract`, `evidence`, `court_filing`, `correspondence` y `other`.

## 7. Internacionalización

Las traducciones están tipadas mediante `AppTranslations` y se mantienen en:

- `src/app/i18n/es.ts`
- `src/app/i18n/en.ts`
- `src/app/i18n/language.ts`

El catálogo incluye navegación, acciones comunes, campos de casos, estados, prioridades y áreas de práctica.

## 8. Configuración Angular

`app.config.ts` registra:

- `provideBrowserGlobalErrorListeners()` para errores globales del navegador.
- `provideHttpClient()` para peticiones HTTP.
- `provideRouter(routes)` para navegación.

La configuración usa el builder `@angular/build:application`. El build de producción aplica hashing y presupuestos de tamaño. Los assets estáticos se sirven desde `public/`.

## 9. Convenciones modernas utilizadas

- Componentes standalone implícitos en Angular 22.
- Templates externos y estilos por componente.
- Rutas lazy con `loadComponent()`.
- Servicios con `@Service()`.
- Inyección funcional con `inject()`.
- Signals para estado local y `computed()` para estado derivado.
- Tipos e interfaces TypeScript para contratos de dominio y API.
- Control de dependencias a través de `ApplicationConfig`.

## 10. Próximas funciones recomendadas

1. Conectar `CaseList` con `CasesApiService.getCases()` y mostrar estados de carga, error y lista vacía.
2. Implementar filtros por área, estado, prioridad y búsqueda.
3. Crear el formulario reactivo o Signal Form de alta y edición, con validaciones.
4. Cargar el detalle desde `caseId` y habilitar actualización y eliminación.
5. Añadir gestión de documentos y una ruta específica para documentos.
6. Centralizar la URL de la API en configuración de entorno.
7. Añadir pruebas unitarias para servicios, rutas y flujos principales.
