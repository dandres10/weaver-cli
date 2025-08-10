# 📋 Changelog - Weaver CLI

Todas las mejoras importantes de Weaver CLI están documentadas en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.3] - 2024-12-20

### 🐛 Fixed
- **Detección desde subcarpetas funcionando 100%**: Corrección definitiva para ejecutar desde `/bus` y otras subcarpetas
- **Modo local corregido**: Funcionamiento perfecto cuando se ejecuta desde `test-output`
- **Detección por facade**: Implementado sistema de detección alternativo usando archivos de facade
- **Rutas consistentes**: Alineación completa entre generador y sistema de limpieza usando `entityNameLower`

### ✨ Added
- **Detección múltiple**: Sistema híbrido que detecta entidades por DTOs y por archivos de facade
- **Manejo inteligente de rutas**: Detección automática si ya estamos en el directorio correcto
- **Información detallada**: Muestra número de archivos por entidad en el menú de selección

### 📦 Technical
- Corrección de inconsistencias en paths entre `correct-entity-flow-generator.ts` y `cleanup-generator.ts`
- Mejora en la función `findProjectRoot()` para casos edge
- Validación robusta de existencia de directorios y archivos

## [1.1.2] - 2024-12-20

### 🐛 Fixed
- **Detección de entidades desde subcarpetas**: Corregido problema donde no se detectaban entidades cuando se ejecuta desde `/bus` u otras subcarpetas
- **Función findProjectRoot()**: Implementada para detectar automáticamente el directorio raíz correcto del proyecto
- **Mejor información de estado**: Agregada información adicional sobre APIs encontradas en el menú de limpieza

### 📦 Technical
- Mejorado algoritmo de detección de estructura de proyecto
- Soporte robusto para ejecución desde cualquier subcarpeta del proyecto
- Validaciones adicionales de existencia de directorios

## [1.1.1] - 2024-12-20

### 🔧 Changed
- Versión de mantenimiento con mejoras de estabilidad
- Optimizaciones menores en el generador de código

### 📦 Technical
- Actualización de dependencias y compilación optimizada
- Mejora en la robustez del sistema de limpieza

## [1.1.0] - 2024-12-19

### ✨ Added
- **🎯 Limpieza Simplificada**: Sistema de limpieza directo y enfocado en entidades
- **📍 Ejecución Contextual**: Funciona desde la carpeta donde se ejecuta
- **🚀 Flujo Directo**: Sin menús innecesarios, directo a seleccionar entidad

### 🔧 Changed
- Simplificado el flujo de limpieza para eliminar solo entidades específicas
- Removida la opción "Eliminar API completa" - no necesaria para el flujo de trabajo
- Removida la opción "Eliminar TODO" - simplificado para uso práctico
- Eliminada la selección de carpetas - funciona directamente en la carpeta actual

### 🎯 Benefits
- Flujo más directo y rápido para eliminar entidades
- Menos opciones confusas, enfocado en el caso de uso principal
- Ejecución contextual desde la carpeta específica (ej: /bus)
- Experiencia de usuario simplificada y clara

## [1.0.9] - 2024-12-19

### ✨ Added
- **🧹 Smart Cleanup System**: Sistema completo de limpieza inteligente para código generado
- **🗑️ Entity Cleanup**: Eliminación de entidades individuales con detección automática
- **🗂️ API Cleanup**: Eliminación completa de APIs con todos sus archivos
- **🧨 Full Cleanup**: Eliminación total de contenido generado con doble confirmación
- **🛡️ Safety Features**: Múltiples confirmaciones y vista previa antes de eliminar

### 🔧 Changed
- Agregada nueva opción "🧹 Limpiar/Eliminar código generado" al menú principal
- Sistema de detección automática de entidades y APIs generadas
- Limpieza inteligente de referencias en archivos de injection
- Navegación mejorada entre menús de limpieza

### 🎯 Benefits
- Gestión completa del ciclo de vida del código generado
- Operaciones de limpieza seguras con confirmaciones múltiples
- Detección automática de contenido generado
- Mantenimiento fácil del workspace durante desarrollo

## [1.0.8] - 2024-12-19

### ✨ Added
- **Campo ID Automático**: Agregado automáticamente `id?: string;` en DTOs y Entities principales
- **Mappers Inteligentes**: Mapeo automático del campo `id` en todos los mappers principales
- **Consistencia ID**: Manejo uniforme del identificador único en toda la arquitectura

### 🔧 Changed
- DTOs principales (`I{Entity}DTO`) incluyen automáticamente `id?: string;`
- Entities principales (`I{Entity}Entity`) incluyen automáticamente `id?: string;`
- Mappers principales mapean automáticamente el campo `id` entre DTO ↔ Entity
- Garantiza que todas las entidades tengan un identificador único consistente

### 🎯 Benefits
- Reduce la necesidad de agregar manualmente el campo `id` en cada entidad
- Garantiza consistencia en el identificador único de todas las entidades
- Simplifica el mapeo entre DTOs y Entities para el campo `id`

## [1.0.7] - 2024-12-19

### 🐛 Fixed
- **Repository Imports**: Corregidas las importaciones en injection-platform-entities-repository.ts
- **Path específico**: Los repositories ahora se importan con el path completo al archivo
- **Consistencia**: Alineado con el patrón del proyecto goluti-frontend

### 📦 Technical
- Importaciones cambiadas de `from "../../entities/location"` a `from "../../entities/location/location-repository"`
- Aplica tanto para archivos nuevos como para actualizaciones de archivos existentes

## [1.0.6] - 2024-12-19

### 🔧 Added
- **Importaciones Inteligentes**: Sistema que distingue entre archivos generados y dependencias core
- **Separación automática**: Los archivos generados usan `@{api-name}`, los core mantienen `@bus`
- **33+ importaciones corregidas**: Sistemáticamente actualizadas en todos los templates

### 🐛 Fixed
- Importaciones incorrectas que usaban `@bus` para todos los archivos
- Referencias cruzadas entre entidades generadas
- Consistencia en paths de importación across APIs

### 📦 Technical
- Parámetro `apiName` agregado a funciones auxiliares (`generateEntityMapper`, `generateSpecificMapper`)
- Actualización de todas las llamadas a funciones para incluir `apiName`
- Templates de Use Cases, Mappers, Repositories y Facades corregidos

## [1.0.5] - 2024-12-19

### 🔧 Added
- **Repository Injection completo**: Genera `injection-platform-entities-repository.ts`
- **Actualización automática**: Agrega nuevas entidades al archivo existente
- **Gestión de múltiples entidades**: Soporte para n entidades en mismo archivo

### 🐛 Fixed
- Archivo de injection para repositories que no se generaba
- Referencias rotas en Use Cases que importaban `InjectionPlatformEntitiesRepository`
- Sistema de injection incompleto

### 📦 Technical
- Función `generateRepositoryInjection()` implementada
- Lógica de detección de duplicados para evitar entidades repetidas
- Patrón consistente con `generateFacadeInjection()`

## [1.0.4] - 2024-12-18

### 🚀 Initial Release
- **43+ archivos por entidad**: Estructura completa siguiendo Clean Architecture
- **Autenticación con clave**: Sistema de acceso con sesión de 30 días
- **OpenAPI Integration**: Lectura automática de especificaciones Swagger
- **Modo local**: Pruebas con `--local` flag
- **Detección inteligente**: APIs y directorios automáticamente detectados
- **Validaciones completas**: Pre-generación y estructura del proyecto
- **Multi-API support**: Soporte para platform, payment, etc.

### 📂 Estructura Generada
- **Domain Layer**: DTOs, Repository interfaces, Use Cases
- **Infrastructure Layer**: Entities, Mappers, Repository implementations  
- **Facade Layer**: Punto de entrada simplificado
- **Injection System**: Dependency injection automático

---

## 🔄 Formato de Versiones

- **MAJOR**: Cambios incompatibles en la API
- **MINOR**: Funcionalidad nueva compatible hacia atrás
- **PATCH**: Correcciones de bugs compatibles hacia atrás

## 📝 Tipos de Cambios

- `Added` - Nuevas funcionalidades
- `Changed` - Cambios en funcionalidad existente
- `Deprecated` - Funcionalidades que serán removidas
- `Removed` - Funcionalidades removidas
- `Fixed` - Correcciones de bugs
- `Security` - Correcciones de seguridad

---

**🕷️ Weaver CLI** - *Tejiendo el futuro del desarrollo frontend*
