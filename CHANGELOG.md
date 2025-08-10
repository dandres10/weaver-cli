# 📋 Changelog - Weaver CLI

Todas las mejoras importantes de Weaver CLI están documentadas en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
