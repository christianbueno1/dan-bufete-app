# Angular 22

Angular 22 salió el 3 de junio de 2026, siguiendo el ciclo de un mayor cada seis meses. Esto es lo más importante:

**Estabilización de APIs.** Tres funciones pasan a estado estable: Signal Forms, Angular Aria y las APIs de reactividad asíncrona. Con esto, `resource`, `rxResource` y `httpResource` quedan listos para producción.

**Cambios por defecto.** OnPush pasa a ser la estrategia de detección de cambios por defecto, y el cliente HTTP usa Fetch por defecto. La estrategia anterior se llama ahora Eager. Hay una migración automática que añade `ChangeDetectionStrategy.Eager` a los componentes que no especifican estrategia, para que conserven su comportamiento al actualizar.

**Inyección de dependencias.** El nuevo decorador `@Service` simplifica el registro de servicios y reemplaza la configuración manual a nivel raíz en los casos comunes. También llega `injectAsync`, que carga servicios bajo demanda y difiere dependencias pesadas. Además, hay nuevos mecanismos de limpieza a nivel de ruta para evitar fugas de memoria.

**Formularios.** Signal Forms incorpora la interfaz `FormValueControl`, más potente y simple que `ControlValueAccessor`. Los componentes antiguos basados en `ControlValueAccessor` son compatibles con Signal Forms, y sus errores de validación se propagan a los campos.

**Plantillas y resiliencia.** Se pueden escribir comentarios dentro de las declaraciones de atributos de un elemento, y se presenta en preview la API `@boundary`, con límites de error a nivel de plantilla.

**Requisitos.** Angular 22 exige TypeScript 6 y abandona Node 20; Node 26 es compatible. También hay más soporte para integraciones con IA.

Para tu proyecto, lo más relevante es que los componentes nuevos serán OnPush sin que lo indiques, y que `HttpClient` usará Fetch al configurarlo. Para `cases-api`, conviene mirar el decorador `@Service`, que puede sustituir al `@Injectable({ providedIn: 'root' })` de siempre. Antes de usarlo, revisa la sintaxis exacta en la documentación oficial.