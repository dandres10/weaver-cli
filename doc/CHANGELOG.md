# 📋 Changelog - Weaver CLI

Todas las mejoras importantes de Weaver CLI están documentadas en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.3] - 2024-12-27

### 🔧 COMPREHENSIVE FIXES - MÚLTIPLES CORRECCIONES CRÍTICAS

#### 🛠️ Fixed - CORRECCIONES FUNDAMENTALES DE GENERACIÓN
- **🛡️ Null Safety en Arrays**: Agregado `?? []` en todos los `mapFromList` y `mapToList` para prevenir errores
- **📁 Imports de Repositories**: Corregidos imports incorrectos que incluían `[]` en nombres de interfaces
- **🔧 FilterManagerRequestMapper**: Mappers anidados de request incluidos en injection files
- **✅ Sintaxis TypeScript**: Imports limpios con `[]` solo en tipos de retorno, no en nombres de interfaces

#### 📚 Technical Details - Correcciones Específicas

**🛡️ Null Safety en Arrays:**
- **Before**: `filters: this.filterManagerrequestMapper.mapFromList(param.filters)`
- **After**: `filters: this.filterManagerrequestMapper.mapFromList(param.filters ?? [])`
- **Impact**: Previene errores cuando campos de array son `null` o `undefined`
- **Scope**: 14+ ubicaciones en mappers de business flows

**📁 Imports de Repositories:**
- **Before**: `import { IAvailabilityServicesByLocationResponseDTO[] } from "..."`
- **After**: `import { IAvailabilityServicesByLocationResponseDTO } from "..."`
- **Correct Usage**: `Promise<IAvailabilityServicesByLocationResponseDTO[] | null>`
- **Impact**: Eliminados errores de sintaxis TypeScript en imports

**🔧 FilterManager Support:**
- **Before**: Solo mappers anidados de response en injection files
- **After**: Mappers anidados de request y response incluidos
- **Result**: `FilterManagerRequestMapper()` disponible en injection files
- **Scope**: Todos los tipos complejos en requests (FilterManager, AppointmentRequest, etc.)

#### 🎯 Impact - GENERACIÓN ROBUSTA Y COMPLETA
- ✅ Zero errores de TypeScript en código generado
- ✅ Null safety completo en todos los mappers de arrays
- ✅ Imports sintácticamente correctos en repositories
- ✅ Mappers anidados completamente funcionales
- ✅ FilterManager y tipos complejos working al 100%
- ✅ Arquitectura Clean Architecture completamente estable

## [2.2.2] - 2024-12-27

### 🐛 HOTFIX CRÍTICO - MAPPERS ANIDADOS EN INJECTION FILES

#### 🔧 Fixed - CORRECCIÓN CRÍTICA DE MAPPERS ANIDADOS
- **📁 Injection Files**: Corregida generación de mappers anidados en injection files para business flows
- **🔧 FilterManager Support**: Mappers como `FilterManagerRequestMapper` ahora se incluyen correctamente en injection files
- **🔄 Request Nested Mappers**: Agregado soporte completo para mappers anidados de request además de response
- **✅ Complete Injection**: Todos los mappers anidados (request y response) se agregan automáticamente a injection files

#### 📚 Technical Details - Corrección de Generación
- **Before**: Solo se incluían mappers anidados de response en injection files
- **After**: Se incluyen mappers anidados tanto de request como response
- **Impact**: `FilterManagerRequestMapper()` ahora disponible en `InjectionPlatformBusinessAvailabilityAppointmentTableMapper`
- **Logic**: Función `collectNestedMappersForOperation` ahora procesa ambos tipos (request/response)
- **Method Generation**: Métodos abreviados correctos (ej: `FilterManagerRequestMapper()`)

#### 🎯 Solución - ARQUITECTURA COMPLETA FUNCIONAL
- ✅ Mappers anidados de request incluidos en injection files
- ✅ Variables como `filterManagerrequestMapper` resuelven correctamente
- ✅ Métodos `FilterManagerRequestMapper()` disponibles en injection
- ✅ Zero errores de compilación en mappers complejos
- ✅ Soporte completo para tipos anidados en requests
- ✅ Consistencia total entre generación y uso de mappers

## [2.2.1] - 2024-12-27

### 🧹 MAINTENANCE RELEASE - LIMPIEZA DE ARCHIVOS DEBUG

#### 🐛 Fixed - LIMPIEZA Y MANTENIMIENTO
- **📁 Debug Files Cleanup**: Eliminados archivos debug temporales del repositorio
- **🧹 Repository Cleanup**: Limpieza de archivos de desarrollo no necesarios en producción
- **📦 Clean State**: Repositorio limpio sin archivos de testing temporal
- **✅ Build Verification**: Verificación completa de compilación antes de release

#### 📚 Archivos Eliminados
- `debug-appointment-table.js` - Debug para tabla de citas
- `debug-field-type.js` - Debug para tipos de campos
- `debug-responses.js` - Debug para respuestas de API
- `debug-swagger-parsing.js` - Debug para parsing de Swagger
- `generate-test.js` - Script de generación de pruebas
- `simple-test-parser.js` - Parser simple de pruebas
- `temp-dto-functions.txt` - Funciones temporales de DTOs
- `temp-entity-functions.txt` - Funciones temporales de entidades
- `test-anyarray-fix.js` - Prueba para corrección de arrays
- `test-appointment-table-array.js` - Prueba para arrays de tabla de citas
- `test-parser-debug.js` - Debug del parser principal
- `test-topascalcase.js` - Prueba para conversión de casos
- `validate-complete-generation.js` - Validación de generación completa

#### 🎯 Impact - REPOSITORY LIMPIO Y MANTENIDO
- ✅ Eliminación de archivos temporales de desarrollo
- ✅ Repositorio más limpio y profesional
- ✅ Reducción del tamaño del package NPM
- ✅ Mejor experiencia para desarrolladores que clonen el repo
- ✅ Preparación para futuras mejoras sin archivos legacy
- ✅ Build verification completa antes de release

## [2.2.0] - 2024-12-23

### 🚀 MAJOR RELEASE - PARSER OPENAPI COMPLETAMENTE REESCRITO

#### ✨ Added - PARSER ROBUSTO Y COMPLETO
- **🔍 Parser OpenAPI Inteligente**: Reescritura completa del sistema de parsing de especificaciones OpenAPI/Swagger
- **🎯 Tipos Dinámicos**: Respeto estricto a tipos definidos en OpenAPI sin inferencias incorrectas
- **📋 Enums con SCREAMING_SNAKE_CASE**: Nomenclatura estándar para enums TypeScript
- **🔄 Respuestas de Array**: Soporte completo para endpoints que retornan arrays (`Promise<DTO[] | null>`)
- **🗂️ Mappers Inteligentes**: Generación correcta de `mapFromList()` vs `mapFrom()` según tipo de respuesta
- **🧪 Suite de Tests Completa**: 8 tests unitarios + validación end-to-end

#### 🔧 Changed - MEJORAS FUNDAMENTALES DEL PARSER
- **Parsing de Campos Complejos**: Manejo correcto de `anyOf` con arrays y esquemas inline
- **Generación de Respuestas**: Extrae correctamente el contenido del campo `response` sin metadatos wrapper
- **Tipos Date-Time**: Campos `date-time` del OpenAPI se generan como `string` en TypeScript
- **Enum Values**: Enums usan valores exactos del backend (`"=="`, `">"`, etc.) con keys SCREAMING_SNAKE_CASE
- **Array Detection**: Detección automática de respuestas tipo array para generar tipos `DTO[]`

#### 🐛 Fixed - CORRECCIONES CRÍTICAS DEL PARSER
- **Campo Filters**: Corrección completa del parsing de `filters: FilterManager[]` con esquemas complejos
- **Tipos anyOf**: Manejo correcto de `anyOf: [{}, {type: "null"}]` → respeta `any` del OpenAPI
- **Respuestas Complejas**: Parsing correcto de respuestas con `items.properties` para extraer campos específicos
- **Enum Generation**: Eliminación de duplicaciones en nombres (`AvailabilityAppointmentTableEnum` → `AVAILABILITY_APPOINTMENT_TABLE_ENUM`)
- **Request vs Response**: Lógica independiente y correcta para parsing de requests y responses

#### 📚 Technical Details - Arquitectura del Parser
- **SwaggerAnalyzer**: Clase principal completamente refactorizada
- **parseFieldSchema**: Función core reescrita para manejar casos complejos
- **getBusinessServiceSchema**: Lógica de extracción de esquemas mejorada
- **Array Response Detection**: `isResponseArray` flag para determinar tipos de retorno
- **Enum Name Conversion**: Función `toScreamingSnakeCase()` para nomenclatura estándar

#### 🧪 Testing - Suite Completa de Validación
- **Unit Tests**: 8 tests específicos para casos complejos del parser
- **Integration Tests**: Validación con OpenAPI real del backend
- **End-to-End Tests**: Script automático que valida generación completa
- **Edge Cases**: Cobertura de casos límite y esquemas complejos

#### 🎯 Impact - GENERACIÓN PERFECTA Y ROBUSTA
- ✅ Parsing correcto de cualquier especificación OpenAPI/Swagger compleja
- ✅ Tipos TypeScript precisos que respetan exactamente el contrato del backend  
- ✅ Enums con nomenclatura estándar y valores correctos del backend
- ✅ Respuestas de array completamente funcionales con mappers correctos
- ✅ Zero inferencias incorrectas - respeto total al OpenAPI como fuente de verdad
- ✅ Arquitectura robusta preparada para futuros casos complejos

## [2.1.9] - 2024-12-23

### 🔧 CORRECCIÓN DEFINITIVA - INJECTION FILES COMPLETAMENTE ALINEADOS

#### 🛠️ Fixed - IMPORTS Y MÉTODOS EN INJECTION FILES
- **📥 Injection Imports**: Imports alineados con exports reales del index.ts
- **🔄 Consistent Naming**: Nombres de clases consistentes entre mappers e injections
- **📞 Method Names**: Métodos que coinciden con clases reales generadas
- **✅ Full Alignment**: Zero inconsistencias entre archivos

#### 📚 Technical Details - Injection Files Corregidos
- **Before Import**: `AuthRefreshTokenUserLoginResponseMapper` ❌ (no existe)
- **After Import**: `AuthRefreshTokenUserResponseMapper` ✅ (existe en index.ts)
- **Before Method**: `UserLoginResponseMapper(): AuthRefreshTokenUserLoginResponseMapper` ❌
- **After Method**: `UserResponseMapper(): AuthRefreshTokenUserResponseMapper` ✅
- **Logic**: Aplicada misma lógica de limpieza en `collectNestedMappersForOperation`

#### 📚 Technical Details - Funciones Corregidas
- **collectNestedMappersForOperation**: Aplica lógica de limpieza simplificada igual que `generateIndividualNestedMapper`
- **Pattern**: `finalTypeName.replace(/LoginResponse$|LoginRequest$|Response$|Request$/, '')`
- **Result**: Nombres de clases consistentes: `AuthRefreshToken{CleanType}ResponseMapper`
- **Injection Generation**: `generateMapperInjectionPerOperation` usa nombres correctos

#### 🎯 Impact - SISTEMA COMPLETAMENTE FUNCIONAL
- ✅ Injection files importan clases que existen
- ✅ Métodos en injection coinciden con clases reales
- ✅ Zero errores de compilación en injection files
- ✅ Mappers y injections 100% alineados
- ✅ Architecture Clean completamente funcional
- ✅ Zero inconsistencias en todo el sistema

## [2.1.8] - 2024-12-23

### 🔧 CORRECCIÓN FINAL - MAPPERS ANIDADOS COMPLETAMENTE CORREGIDOS

#### 🛠️ Fixed - VARIABLES Y MÉTODOS DE MAPPERS ANIDADOS
- **🎯 Variables Anidadas**: Nombres de variables corregidos sin sufijos duplicados
- **📞 Métodos Injection**: Llamadas a métodos existentes en injection files
- **🔄 Lógica Simplificada**: Implementación más robusta para mappers con dependencias
- **✅ Consistency**: Variables y métodos completamente alineados

#### 📚 Technical Details - Variables Corregidas
- **Before**: `private userLoginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.UserLoginResponseMapper()` ❌
- **After**: `private userresponseMapper = InjectionPlatformBusinessAuthLoginMapper.UserResponseMapper()` ✅
- **Variables**: Sin sufijos redundantes como "LoginResponse"
- **Methods**: Llamadas a métodos reales que existen en injection
- **Pattern**: `{basename}ResponseMapper` para variables y métodos

#### 📚 Technical Details - Casos Cubiertos
- **Login Operation**: Variables como `userResponseMapper` → método `UserResponseMapper()`
- **Refresh Token**: Variables como `companyResponseMapper` → método `CompanyResponseMapper()` 
- **All Operations**: Lógica consistente independiente de la operación
- **Nested Types**: Funciona para cualquier tipo anidado sin importar sufijos

#### 🎯 Impact - MAPPERS ANIDADOS FUNCIONANDO AL 100%
- ✅ Variables con nombres correctos sin duplicaciones
- ✅ Métodos que existen y funcionan en injection files
- ✅ Zero errores de compilación en mappers complejos
- ✅ Consistencia total entre variables y métodos
- ✅ Lógica robusta para cualquier combinación de tipos
- ✅ Mappers anidados completamente funcionales

## [2.1.7] - 2024-12-23

### 🔧 CORRECCIÓN CRÍTICA - IMPORT PATHS A INDEX.TS

#### 🛠️ Fixed - IMPORT PATHS HACIA INDEX.TS CORRECTO
- **📁 Import Paths**: Imports corregidos para ir hasta index.ts del servicio, no a operación específica
- **📋 DTOs Import**: Imports van a `/business/auth` donde está el index.ts que exporta todas las interfaces
- **🏗️ Entities Import**: Misma corrección aplicada para entities
- **✅ Unified Import**: Todos los mappers importan desde el mismo lugar centralizado
- **🎯 Index.ts Usage**: Aprovecha correctamente los index.ts que exportan todas las interfaces

#### 📚 Technical Details
- **Before**: `import { IAuthRefreshTokenLocationResponseDTO } from "@platform/domain/models/apis/platform/business/auth/refresh-token";` ❌
- **After**: `import { IAuthRefreshTokenLocationResponseDTO } from "@platform/domain/models/apis/platform/business/auth";` ✅
- **Before**: `import { IAuthRefreshTokenLocationResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth/refresh-token";` ❌ 
- **After**: `import { IAuthRefreshTokenLocationResponseEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";` ✅
- **Consistent Pattern**: Todos los imports van hasta `/auth` donde están los index.ts centralizados

#### 🎯 Impact
- ✅ Imports funcionan correctamente aprovechando index.ts
- ✅ Menos imports específicos, más centralización
- ✅ Mejor organización usando exports centralizados
- ✅ Consistencia total entre todos los mappers
- ✅ Zero errores de importación por rutas incorrectas

## [2.1.6] - 2024-12-23

### 🔧 CORRECCIÓN COMPLETA - IMPORTS Y INDEX.TS DE MAPPERS

#### 🛠️ Fixed - CORRECCIÓN FINAL DE IMPORTS Y EXPORTS
- **📋 Interface Imports**: Imports corregidos en mappers para usar nombres de interfaces correctos
- **📁 Index.ts Consistency**: Exports en index.ts alineados con nombres reales de clases
- **🔄 Contextual Logic**: Lógica contextual aplicada tanto en contenido como en exports
- **✅ Complete Alignment**: Perfecta consistencia entre nombres de archivos, clases, imports y exports
- **🎯 Unified Naming**: Sistema unificado de nomenclatura para todas las operaciones

#### 📚 Technical Details
- **DTOs Import Before**: `import { IAuthRefreshTokenCompanyDTO }` ❌
- **DTOs Import After**: `import { IAuthRefreshTokenCompanyResponseDTO }` ✅
- **Index Export Before**: `AuthRefreshTokenUserLoginResponseMapper` ❌
- **Index Export After**: `AuthRefreshTokenUserResponseMapper` ✅
- **Login Operations**: Mantienen "Response" correctamente (ej: `IAuthLoginCountryResponseDTO`)
- **Refresh-Token Operations**: Remueven "Login" duplicado pero mantienen "Response"

#### 🎯 Impact
- ✅ Imports de mappers coinciden con interfaces reales existentes
- ✅ Index.ts exporta nombres que coinciden con clases reales
- ✅ Zero errores de importación en TypeScript
- ✅ Nomenclatura contextual perfecta (login vs refresh-token)
- ✅ Consistencia total entre archivos, clases, imports y exports

## [2.1.5] - 2024-12-23

### 🔧 CORRECCIÓN CRÍTICA - NOMBRES DE ARCHIVOS DE MAPPERS

#### 🛠️ Fixed - ELIMINACIÓN DE SUFIJOS DUPLICADOS EN MAPPERS
- **📁 File Naming**: Nombres de archivos de mappers sin sufijos "Login" duplicados en refresh-token
- **🏷️ Class Names**: Clases de mappers con nomenclatura limpia y consistente
- **📋 Interface Names**: Interfaces con patrones de nombres coherentes sin duplicaciones
- **🔄 Unified Logic**: Aplicación de la misma lógica de limpieza usada en DTOs y Entities a mappers
- **✅ Pattern Consistency**: Eliminación automática de sufijos LoginResponse, LoginRequest, Login, Response, Request

#### 📚 Technical Details
- **Before**: `auth-refresh-token-company-login-response-mapper.ts` ❌
- **After**: `auth-refresh-token-company-mapper.ts` ✅
- **Before**: `AuthRefreshTokenCompanyLoginResponseMapper` ❌
- **After**: `AuthRefreshTokenCompanyMapper` ✅
- **Before**: `IAuthRefreshTokenCompanyLoginResponseDTO` ❌
- **After**: `IAuthRefreshTokenCompanyDTO` ✅
- **Cleanup Pattern**: Sufijos removidos en orden: LoginResponse → LoginRequest → Login → Response → Request

#### 🎯 Impact
- ✅ Archivos de mappers con nombres limpios y sin duplicaciones
- ✅ Clases e interfaces con nomenclatura consistente
- ✅ Imports corregidos automáticamente
- ✅ Eliminación de confusión entre operaciones (login vs refresh-token)
- ✅ Patrón unificado entre DTOs, Entities y Mappers

## [2.1.4] - 2024-12-23

### 🔧 CORRECCIONES DE NOMENCLATURA EN MAPPERS

#### 🛠️ Fixed - CORRECCION MAPPERS BUSINESS FLOWS
- **🏷️ Variable Naming**: Variables de mappers anidados ahora usan camelCase correcto (`userResponseMapper` vs `userloginresponseMapper`)
- **🔗 Injection Methods**: Métodos de injection alineados con llamadas en mappers (ej: `UserResponseMapper()` vs `UserLoginResponseMapper()`)
- **🧹 Duplicate Removal**: Eliminación de duplicaciones en nombres de variables y métodos
- **📝 Consistent Naming**: Nomenclatura consistente entre mappers principales y anidados
- **⚡ Method Alignment**: Referencias de injection usan nombres de métodos abreviados correctos

#### 📚 Technical Details
- **Before**: `private userloginresponseMapper = InjectionPlatformBusinessAuthLoginMapper.UserLoginResponseMapper()` ❌
- **After**: `private userResponseMapper = InjectionPlatformBusinessAuthLoginMapper.UserResponseMapper()` ✅
- **Variable Pattern**: `{type}ResponseMapper` en lugar de `{type}{operation}responseMapper`
- **Method Pattern**: Métodos abreviados sin prefijo de servicio/operación
- **Zero Breaking Changes**: Solo corrección de nomenclatura interna

#### 🎯 Impact
- ✅ Mappers compilados sin errores de métodos inexistentes
- ✅ Variables en camelCase consistente
- ✅ Mejor legibilidad y mantenibilidad del código generado
- ✅ Alineación perfecta entre injection definitions y usage

## [2.1.3] - 2024-12-23

### 🚨 HOTFIX CRÍTICO - IMPORTS DE INTERFACES PRINCIPALES

#### 🔧 Fixed - CORRECCIÓN CRÍTICA DE IMPORTS
- **💥 Main Interface Imports**: Corregidos imports incorrectos en interfaces principales de business flows
- **📁 Import Names**: Nombres de imports ahora usan patrón completo `I<Flujo><Proceso><Tipo><Request/Response><DTO/Entity>`
- **✅ TypeScript Validation**: Eliminados errores de compilación en interfaces principales
- **🔄 Pattern Consistency**: DTOs y Entities principales siguen patrón consistente con interfaces anidadas
- **🎯 Zero Breaking Changes**: Solo corrección de imports incorrectos sin cambios funcionales

#### 📚 Technical Details
- **Before**: `import { IPlatformConfigurationResponseDTO } from "./i-auth-login-platform-configuration-response-dto"` ❌
- **After**: `import { IAuthLoginPlatformConfigurationResponseDTO } from "./i-auth-login-platform-configuration-response-dto"` ✅
- **Impact**: Zero TypeScript compilation errors in main business interfaces
- **Scope**: Affects all business flow main interfaces (login, refresh-token, logout, etc.)
- **Files Fixed**: `generateBusinessDTO` and `generateBusinessEntityInterface` functions

#### 🎯 Root Cause Analysis
- **Issue**: Main interfaces used abbreviated import names while nested interfaces used full pattern
- **Solution**: Modified fieldType generation to use complete `I<Service><Operation><Type><Suffix>` pattern
- **Result**: Perfect alignment between import names and actual interface names

## [2.1.2] - 2024-12-23

### 🔧 MEJORA MENOR - TIPOS USECASE

#### ✨ Enhanced - TIPOS OPTIMIZADOS
- **🔧 UseCase Generic Types**: Cambio de `UseCase<void, ...>` a `UseCase<any, ...>` para operaciones sin parámetros
- **🎯 Better Typing**: Tipos más flexibles para casos de uso que no requieren parámetros de entrada
- **📋 Operations Affected**: refresh-token, logout y similares

#### 📚 Technical Details
- **Before**: `UseCase<void, IAuthLogoutResponseDTO | null>` ❌
- **After**: `UseCase<any, IAuthLogoutResponseDTO | null>` ✅
- **Impact**: Mejor compatibilidad de TypeScript para operaciones sin input
- **Scope**: Affects use cases without request parameters

## [2.1.1] - 2024-12-23

### 🐛 HOTFIX CRÍTICO - IMPORTS DE INTERFACES ANIDADAS

#### 🔧 Fixed - CORRECCIÓN CRÍTICA
- **💥 Nested Interface Imports**: Corregidos imports incorrectos en interfaces anidadas que causaban errores de TypeScript
- **📁 Import Paths**: Rutas de import ahora usan el patrón completo `i-<flujo>-<proceso>-<tipo>-<request/response>-<dto/entity>`
- **🏷️ Interface Names**: Nombres de interfaces corregidos para usar patrón completo `I<Flujo><Proceso><Tipo><Request/Response><DTO/Entity>`
- **✅ TypeScript Validation**: Eliminados todos los errores de linter en archivos generados
- **🔄 Consistency**: DTOs y Entities ahora siguen el mismo patrón de naming e imports

#### 📚 Technical Details
- **Before**: `import { IUserLoginResponseEntity } from "./i-user-login-response-entity"` ❌
- **After**: `import { IAuthLoginUserResponseEntity } from "./i-auth-login-user-response-entity"` ✅
- **Impact**: Zero TypeScript compilation errors in generated nested interfaces
- **Scope**: Affects all business flow generations with complex nested types

## [2.1.0] - 2024-12-23

### 🚀 OPTIMIZACIÓN COMPLETA - CLEAN ARCHITECTURE PERFECTA

#### ✨ Added - NUEVAS OPTIMIZACIONES
- **🔧 Repository Pattern Optimizado**: Abstract class en interfaces con parámetros optimizados
- **⚙️ Use Cases Optimizados**: Solo mappers cuando hay request fields, config directo
- **🎯 Mappers Corregidos**: Eliminación de duplicaciones, nombres camelCase, imports optimizados
- **✅ Validación Sintáctica**: Llaves de cierre, imports limpios, zero código innecesario
- **🏗️ Facades Perfectos**: Singleton pattern, delegación correcta, tipos explícitos

#### 🔧 Changed - MEJORAS ARQUITECTURALES
- **Repository Interface**: Ahora usa `abstract class` en lugar de `interface`
- **Repository Methods**: Parámetros optimizados (sin params innecesarios para operaciones sin request)
- **Use Case Mappers**: Solo se instancian mappers cuando hay request fields
- **Config Handling**: Config directo en use cases, defaults en repository implementation
- **Variable Naming**: Nombres camelCase consistentes (`refreshTokenResponseMapper` no `refreshtokenResponseMapper`)

#### 🐛 Fixed - CORRECCIONES CRÍTICAS
- **Mapper Imports**: Imports incorrectos corregidos en mappers de business flows
- **Repository Interface**: Métodos ahora en camelCase (`refreshToken` no `refresh-token`)
- **Use Case Syntax**: Llaves de cierre faltantes agregadas en todas las clases
- **Injection Methods**: Métodos abreviados en injections (`PlatformConfigurationResponseMapper()`)
- **Import Optimization**: Imports consolidados via index.ts donde sea posible

#### 📚 Documentation
- **Documentación Completa**: PROMPT-PARA-CAMBIOS.md actualizada con ejemplos de código
- **Patrones Documentados**: Repository pattern, use cases, mappers y facades documentados
- **Optimizaciones**: Nueva sección con ejemplos específicos de optimizaciones

## [2.0.0] - 2024-12-22

### 🎉 MAJOR RELEASE - ARQUITECTURA CLEAN COMPLETA PARA FLUJOS DE NEGOCIO

#### ✨ Added - GENERACIÓN BUSINESS FLOWS COMPLETA
- **📊 Use Cases**: Generación completa de casos de uso para flujos de negocio
  - Estructura plana sin subcarpetas (siguiendo patrón entities)
  - Inyección de dependencias con mappers y repositories
  - Soporte para operaciones con/sin request body
  - Archivos de injection unificados por servicio
- **🗄️ Infrastructure Repositories**: Repositorios unificados por servicio
  - Un solo archivo por servicio (ej: `auth-repository.ts`)
  - Métodos en camelCase (`login`, `refreshToken`, `createApiToken`)
  - Integración con `CONST_PLATFORM_API_ROUTES` para endpoints
  - Soporte automático para operaciones sin request body
- **🎭 Facades**: Facades unificados por servicio
  - Un solo archivo por servicio siguiendo patrón entities
  - Instancias readonly de use cases con injection
  - Métodos camelCase coherentes con repositories
  - Manejo automático de parámetros según tipo de operación
- **🔌 Sistema de Inyección Completo**: Dependency injection unificado y acumulativo
  - `injection-platform-business-repository.ts` acumulativo
  - `injection-platform-business-facade.ts` acumulativo  
  - `injection-platform-business-{service}-use-case.ts` por servicio
  - `injection-platform-business-{service}-{operation}-mapper.ts` por operación

#### 🔧 Changed - MEJORAS ARQUITECTURALES FUNDAMENTALES
- **🏗️ Arquitectura Unificada**: Repositories consolidados por servicio vs por operación
- **📁 Estructura Plana**: Use Cases sin subcarpetas, alineado con patrón entities
- **🔌 Inyección Acumulativa**: Los archivos injection se actualizan automáticamente
- **🛣️ Rutas Constantes**: Uso automático de `CONST_PLATFORM_API_ROUTES`
- **🧩 Operaciones Flexibles**: Soporte inteligente para operaciones con/sin request body
- **📄 Una Interfaz por Archivo**: Interfaces individuales con imports automáticos

#### 🐛 Fixed - CORRECCIONES CRÍTICAS
- **🔤 Nombres de Archivos Válidos**: `string[]` → `string-array` para evitar caracteres especiales
- **📋 Imports Automáticos**: Todas las interfaces incluyen imports necesarios con `@platform`
- **🎯 Métodos camelCase**: Coherencia en naming (`refreshToken`, `createApiToken`)
- **🔄 Sin Duplicaciones**: Evita automáticamente nombres duplicados en mappers
- **📦 Injection Centralizado**: Mappers injection por operación en ubicación correcta

#### 🧪 Tested - VALIDACIÓN COMPLETA
- **✅ Regeneración**: Los archivos injection mantienen servicios existentes
- **✅ Operaciones Mixtas**: Auth con `login` (request), `logout` (sin request) 
- **✅ Estructura Coherente**: Alineación completa con patrón entities
- **✅ Imports Correctos**: Todas las referencias usan `@platform` apropiadamente

### 📊 MÉTRICAS DE LA RELEASE

| **Componente** | **Antes v1.x** | **Después v2.0** | **Mejora** |
|----------------|-----------------|-------------------|------------|
| **Business Flows** | Solo DTOs + Entities + Mappers | Clean Architecture Completa | +400% |
| **Use Cases** | ❌ No implementado | ✅ Completo con injection | +∞ |
| **Repositories** | ❌ No implementado | ✅ Unificados con camelCase | +∞ |
| **Facades** | ❌ No implementado | ✅ Unificados con readonly | +∞ |
| **Injection System** | ❌ Solo mappers | ✅ Sistema completo acumulativo | +400% |
| **Architecture** | Parcial | Clean Architecture 100% | +200% |

### 🎯 BREAKING CHANGES

**⚠️ Esta es una release MAJOR (2.0.0) con cambios que pueden afectar proyectos existentes:**

1. **Estructura de Mappers Injection**: 
   - **Antes**: `injection-platform-business-auth-mapper.ts` (por servicio)
   - **Después**: `injection-platform-business-auth-login-mapper.ts` (por operación)

2. **Ubicación de Injection Mappers**:
   - **Antes**: Dentro de subcarpetas de operación
   - **Después**: Centralizado en `infrastructure/mappers/apis/{api}/injection/business/{service}/`

3. **Naming de Métodos**:
   - **Antes**: `refresh_token`, `create-api-token`  
   - **Después**: `refreshToken`, `createApiToken` (camelCase estricto)

### 🚀 MIGRACIÓN DE v1.x A v2.0

Para proyectos existentes que usen business flows de v1.x:

1. **Regenerar servicios business**: Ejecutar `weaver` y seleccionar "Business Flows"
2. **Actualizar imports**: Los nuevos archivos de injection tienen nombres diferentes
3. **Verificar rutas**: Asegurar que `CONST_PLATFORM_API_ROUTES` esté disponible
4. **Revisar métodos**: Usar nombres camelCase en lugar de kebab-case/snake_case

### 💡 NUEVO WORKFLOW RECOMENDADO

```bash
# 1. Generar entidades CRUD (sin cambios)
weaver → "Entidades" → Seleccionar entidad

# 2. Generar flujos de negocio (COMPLETAMENTE NUEVO)  
weaver → "Flujos de Negocio" → Seleccionar servicio (ej: Auth)
# Genera: DTOs + Entities + Mappers + Use Cases + Repositories + Facades + Injections

# 3. Uso en código (NUEVO)
import { InjectionPlatformBusinessFacade } from "@platform/facade/apis/platform/injection/business/injection-platform-business-facade";

const authFacade = InjectionPlatformBusinessFacade.AuthFacade();
const loginResult = await authFacade.login(loginParams, config);
const refreshResult = await authFacade.refreshToken(config);
```

---

## [1.1.8] - 2024-12-21

### 🐛 Fixed - CORRECCIÓN DETECCIÓN DE CAMPOS ID DEL SWAGGER

#### **Problema Resuelto**
- **Campo ID faltante**: Los DTOs de `update` y `main` no incluían el campo `id` cuando estaba presente en el schema del Swagger
- **Parser incorrecto**: El `SwaggerAnalyzer` priorizaba el schema `Save` sobre `Update`, perdiendo información del campo `id`

#### **Mejoras Implementadas**
- **Parser corregido**: Ahora prioriza `UpdateSchema` → `BaseSchema` → `SaveSchema` para detectar todos los campos
- **Detección inteligente**: Detecta automáticamente si el campo `id` viene del Swagger y lo incluye apropiadamente
- **Lógica mejorada**: Solo incluye `id` en DTOs `main` y `update` cuando está presente en el schema

#### **Resultado**
- ✅ **Main DTO**: Incluye `id` con la opcionalidad correcta del Swagger
- ✅ **Update DTO**: Incluye `id` según requerimientos del Swagger  
- ✅ **Save DTO**: No incluye `id` (correcto para creación)
- ✅ **Read/Delete DTOs**: Siempre incluyen `id` (sin cambios)

#### **Archivos Modificados**
- `src/parsers/swagger-parser.ts`: Corregida prioridad de schemas
- `src/generators/correct-entity-flow-generator.ts`: Mejorada detección de campos del Swagger

## [1.1.7] - 2024-12-20

### 🎯 Fixed - FLUJO PERFECTO CON API NAME + DIRECTORIO FLEXIBLE
- **Flujo simplificado y claro**: API name define estructura lógica, directorio define ubicación física
- **Selección de directorio**: Modo local permite elegir carpeta existente o crear nueva
- **Eliminada confusión**: Sin duplicidad entre apiName y targetApiName
- **Lógica correcta**: apiPrefix = '' siempre, sin carpetas adicionales innecesarias

### ✨ Added
- **Selección de directorio en modo local**: Lista carpetas existentes + opción crear nueva
- **Flujo dual perfecto**: Mismo API + nueva carpeta o API diferente + carpeta existente
- **Estructura lógica clara**: apis/{api-name}/ siempre respeta el nombre configurado
- **Compatibilidad total**: Funciona igual en modo local y producción

### 🎯 Casos de Uso Implementados
- **Caso 1**: `platform` → `nuevo: platform` → `platform/apis/platform/`
- **Caso 2**: `leon` → `platform (existente)` → `platform/apis/leon/`
- **Flexibilidad total**: Cualquier combinación API + directorio

### 🚀 Mejoras Técnicas
- Simplificado calculateTargetPath() para usar siempre directorio actual
- Mejorada lógica de selección de directorio en modo local
- Eliminada lógica confusa de shouldCreateApiDir
- Código más lineal y fácil de mantener

### ✅ Probado y Funcionando
- **4 casos diferentes**: Todos exitosos en modo local ✅
- **Estructura correcta**: APIs y entidades en ubicaciones exactas ✅
- **Detección dinámica**: Desde cualquier carpeta funcionando ✅
- **Eliminación completa**: 32+ elementos eliminados perfectamente ✅

## [1.1.6] - 2024-12-20

### 🎯 Fixed - DETECCIÓN DINÁMICA UNIVERSAL
- **Detección desde cualquier directorio**: Ya no necesitas estar en `/bus`, funciona desde `/platform`, `/core`, `/app`, etc.
- **Búsqueda inteligente**: Detecta automáticamente la estructura Weaver desde donde estés parado
- **Subcarpetas soportadas**: Funciona desde `domain/models/apis/`, `facade/apis/`, y cualquier nivel
- **Sin dependencia de raíz fija**: Se adapta dinámicamente a tu estructura de proyecto

### ✨ Added
- **Función findBestBasePath**: Nueva lógica más inteligente para encontrar la base
- **Detección automática**: Identifica si estás en test-output o proyecto real
- **Compatibilidad universal**: Funciona con cualquier nombre de directorio (`bus`, `platform`, `core`, etc.)
- **Búsqueda hacia arriba**: Si no encuentra estructura en el directorio actual, busca en niveles superiores

### 🚀 Mejoras Técnicas
- Eliminada dependencia de `findProjectRoot` obsoleta
- Algoritmo más eficiente de detección de estructura
- Sin logs de debug en versión de producción
- Código más limpio y mantenible

### ✅ Probado y Funcionando
- **Desde `/platform`**: Detecta 2 entidades (location, menu) ✅
- **Desde subcarpetas**: Funciona desde cualquier nivel ✅
- **Test-output**: Mantiene compatibilidad completa ✅
- **Proyectos reales**: Detección perfecta ✅

## [1.1.5] - 2024-12-20

### 🎉 Fixed - ELIMINACIÓN COMPLETA FUNCIONANDO AL 100%
- **Kebab-case corregido**: Nombres de archivos correctos (`location` en lugar de `ocation`)
- **Archivos de injection específicos**: Ahora se eliminan completamente sin dejar rastros
- **Eliminación perfecta**: 32+ elementos eliminados por entidad (archivos + directorios)
- **Sin archivos huérfanos**: Limpieza completa de toda la estructura generada

### ✨ Added
- **Eliminación inteligente**: Diferencia entre archivos específicos de entidad y compartidos
- **Limpieza de referencias**: En archivos compartidos de injection
- **Información detallada**: Muestra exactamente qué archivos elimina
- **Verificación post-eliminación**: Confirma que todos los archivos fueron eliminados

### 🗑️ Elimina Completamente
- **26+ archivos específicos**: DTOs, entities, use cases, mappers, repositories, facades
- **5+ directorios**: Limpieza automática de directorios vacíos
- **Archivos de injection**: Tanto específicos como referencias en compartidos
- **Todo rastro**: Eliminación perfecta sin archivos huérfanos

### ✅ Probado y Funcionando
- **Eliminación completa**: 32 elementos eliminados exitosamente ✅
- **Archivos de injection**: Eliminados completamente ✅
- **Directorios vacíos**: Limpieza automática ✅
- **Sin rastros**: Verificación de eliminación completa ✅

## [1.1.4] - 2024-12-20

### 🎉 Fixed - SOLUCIÓN DEFINITIVA
- **Detección PERFECTA desde proyecto real**: Funciona al 100% desde carpeta `/bus` real del proyecto
- **Sistema dual inteligente**: Detecta automáticamente si está en proyecto real o test-output
- **Estructura correcta identificada**: Proyecto real usa `/bus/domain/models/apis/{api}/entities/`
- **Test-output funcionando**: Mantiene compatibilidad completa con modo de pruebas

### ✨ Added
- **Detección automática de modo**: Identifica automáticamente proyecto real vs test-output
- **Búsqueda dual**: DTOs en domain/models + facades como respaldo
- **Soporte completo para subcarpetas**: Funciona desde cualquier carpeta del proyecto

### 📦 Technical
- Implementado sistema dual de detección con rutas específicas para cada modo
- Eliminados logs de debug para versión de producción
- Optimización de rendimiento en búsqueda de entidades

### ✅ Probado y Funcionando
- **Proyecto real**: Detecta entidad `location` (API: platform) ✅
- **Test-output**: Detecta 4 entidades correctamente ✅
- **Subcarpetas**: Funciona desde cualquier ubicación ✅

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
