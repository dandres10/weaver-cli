# 🕷️ PROMPT PARA MODIFICACIONES - WEAVER CLI

## 📋 CONTEXTO DEL PROYECTO

**Weaver CLI** es un generador de código TypeScript que lee especificaciones OpenAPI/Swagger y genera automáticamente toda la estructura de entidades siguiendo principios de Clean Architecture para proyectos frontend.

### 🏗️ ARQUITECTURA ACTUAL

```
weaver-cli/
├── src/
│   ├── cli.ts                              # CLI principal con menú interactivo
│   ├── index.ts                            # Exportaciones principales
│   ├── auth/
│   │   └── auth-manager.ts                 # Sistema de autenticación (clave: "soyia")
│   ├── generators/
│   │   ├── correct-entity-flow-generator.ts # Generador CRUD (42 archivos por entidad)
│   │   ├── business-flow-generator.ts       # Generador flujos de negocio (DTOs + Entities + Mappers)
│   │   └── cleanup-generator.ts             # Generador de limpieza
│   ├── parsers/
│   │   └── swagger-parser.ts               # Parser OpenAPI/Swagger con detección de API
│   ├── validators/
│   │   └── project-validator.ts            # Validaciones pre-generación
│   └── utils/
│       └── directory-detector.ts           # Detección inteligente de APIs y directorios
├── package.json                            # Configuración NPM (comando: "weaver")
├── tsconfig.json                           # Configuración TypeScript
└── README.md                               # Documentación completa
```

### 🎯 FUNCIONALIDADES IMPLEMENTADAS

#### 🏗️ **GENERACIÓN CRUD (Entidades)**
1. **🔐 Autenticación**: Clave "soyia", sesión 30 días, archivo ~/.weaver-cli-auth
2. **⚡ CLI Interactivo**: Comando `weaver`, menú con inquirer, colores con chalk
3. **🌐 OpenAPI Integration**: Lectura automática, detección de entidades y tipos
4. **🎯 Detección Inteligente**: API actual vs API target, validación de rutas, detección desde cualquier directorio
5. **📁 Generación Flexible**: Desde cualquier directorio hacia cualquier API con selección de directorio destino
6. **🧪 Modo Local**: `weaver --local` genera en `./test-output/` con selección de carpetas existentes
7. **🛡️ Validaciones**: Estructura proyecto, entidades existentes, confirmaciones
8. **📊 Clean Architecture**: 42+ archivos por entidad (DTOs, Entities, Use Cases, Mappers, Facades, Injections)
9. **🔧 Repository Injection**: Generación automática de injection-platform-entities-repository.ts
10. **🧹 Sistema de Limpieza**: Detección y eliminación completa de entidades generadas desde cualquier directorio
11. **🎯 Flujo Dual Perfecto**: API name (estructura lógica) + directorio destino (ubicación física)
12. **🔍 Detección ID Swagger**: Incluye campos ID del Swagger automáticamente en DTOs main/update

#### 💼 **GENERACIÓN FLUJOS DE NEGOCIO (Completo)**
13. **🎯 Filtrado Inteligente**: Detecta automáticamente servicios de negocio vs operaciones CRUD
14. **📋 Generación Dinámica**: DTOs + Entities + Mappers + Use Cases + Repositories + Facades completos
15. **🔗 Interfaces Anidadas**: Archivos individuales para cada interface compleja con prefijo "I"
16. **🗂️ Convenciones Consistentes**: Prefijo "i-" en archivos, "I" en interfaces, imports con "@"
17. **🎨 Mapeo Inteligente**: CamelCase (DTOs) ↔ Snake_case (Entities) automático
18. **⚙️ Inyección de Dependencias**: Sistema completo con mappers, repositories, use cases y facades
19. **🔄 Sin Duplicaciones**: Evita "response-response" automáticamente y maneja nombres especiales
20. **🏗️ Arquitectura Unificada**: Repositories consolidados por servicio con métodos camelCase
21. **📁 Estructura Plana**: Use Cases sin subcarpetas, siguiendo patrón de entidades
22. **🔌 Inyección Acumulativa**: Archivos injection que se actualizan automáticamente por servicio
23. **🛣️ Rutas Constantes**: Uso de CONST_PLATFORM_API_ROUTES para endpoints
24. **🧩 Operaciones Flexibles**: Soporte para operaciones con/sin request body automáticamente

### 🗂️ ESTRUCTURA GENERADA

#### 🏗️ **ENTIDADES CRUD** (Flujo Entity)
```
{directorio-destino}/              # Seleccionado por el usuario (ej: platform/, bus/, test-output/platform/)
├── domain/
│   ├── models/apis/{api-name}/entities/{entity}/         # api-name configurado por usuario
│   │   ├── i-{entity}-dto.ts
│   │   ├── i-{entity}-save-dto.ts
│   │   ├── i-{entity}-read-dto.ts
│   │   ├── i-{entity}-update-dto.ts
│   │   ├── i-{entity}-delete-dto.ts
│   │   └── index.ts
│   └── services/
│       ├── repositories/apis/{api-name}/entities/
│       │   └── i-{entity}-repository.ts
│       └── use_cases/apis/{api-name}/entities/{entity}/
│           ├── {entity}-save-use-case.ts
│           ├── {entity}-read-use-case.ts
│           ├── {entity}-update-use-case.ts
│           ├── {entity}-delete-use-case.ts
│           ├── {entity}-list-use-case.ts
│           └── injection/entities/
│               └── injection-{api-name}-entities-{entity}-use-case.ts
├── infrastructure/
│   ├── entities/apis/{api-name}/entities/{entity}/
│   │   ├── i-{entity}-entity.ts
│   │   ├── i-{entity}-save-entity.ts
│   │   ├── i-{entity}-read-entity.ts
│   │   ├── i-{entity}-update-entity.ts
│   │   ├── i-{entity}-delete-entity.ts
│   │   └── index.ts
│   ├── mappers/apis/{api-name}/entities/{entity}/
│   │   ├── {entity}-entity-mapper.ts
│   │   ├── {entity}-save-mapper.ts
│   │   ├── {entity}-read-mapper.ts
│   │   ├── {entity}-update-mapper.ts
│   │   ├── {entity}-delete-mapper.ts
│   │   └── injection/entities/
│   │       └── injection-{api-name}-entities-{entity}-mapper.ts
│   └── repositories/apis/{api-name}/repositories/entities/{entity}/
│       ├── {entity}-repository.ts
│       └── injection/entities/
│           └── injection-{api-name}-entities-repository.ts
├── facade/apis/{api-name}/entities/
│   ├── {entity}-facade.ts
│   └── injection/entities/
│       └── injection-{api-name}-entities-facade.ts
```

#### 💼 **FLUJOS DE NEGOCIO** (Flujo Business - Completo)
```
{directorio-destino}/              # Ejemplo: test-output/platform/
├── domain/
│   ├── models/apis/{api-name}/business/{service}/        # Ejemplo: apis/platform/business/auth/
│   │   ├── {operation}/                                  # Por cada operación (login, logout, etc.)
│   │   │   ├── i-{service}-{operation}-request-dto.ts   # Ejemplo: i-auth-login-request-dto.ts
│   │   │   ├── i-{service}-{operation}-response-dto.ts  # Ejemplo: i-auth-login-response-dto.ts
│   │   │   ├── i-{service}-{operation}-{nested-type}-response-dto.ts  # Para cada tipo anidado con patrón completo
│   │   │   └── i-{service}-{operation}-{nested-type}-request-dto.ts   # Archivos individuales por interface
│   │   └── index.ts                                      # Exportaciones automáticas
│   └── services/
│       ├── repositories/apis/{api-name}/business/
│       │   └── i-{service}-repository.ts                 # Interface unificada del repositorio
│       └── use_cases/apis/{api-name}/business/{service}/
│           ├── {service}-{operation}-use-case.ts         # Use cases en estructura plana
│           ├── {service}-{operation}-use-case.ts         # Por cada operación
│           └── injection/business/
│               └── injection-{api-name}-business-{service}-use-case.ts
├── infrastructure/
│   ├── entities/apis/{api-name}/business/{service}/
│   │   ├── {operation}/
│   │   │   ├── i-{service}-{operation}-request-entity.ts   # snake_case attributes
│   │   │   ├── i-{service}-{operation}-response-entity.ts  # snake_case attributes  
│   │   │   ├── i-{service}-{operation}-{nested-type}-response-entity.ts  # Para cada tipo anidado con patrón completo
│   │   │   └── i-{service}-{operation}-{nested-type}-request-entity.ts   # Con prefijo "I" y patrón consistente
│   │   └── index.ts
│   ├── mappers/apis/{api-name}/business/{service}/
│   │   ├── {operation}/
│   │   │   ├── {service}-{operation}-request-mapper.ts     # CamelCase ↔ snake_case
│   │   │   ├── {service}-{operation}-response-mapper.ts    # Dependency injection
│   │   │   ├── {nested-type}-response-mapper.ts            # Mappers individuales
│   │   │   └── {nested-type}-response-mapper.ts            # Singleton pattern
│   │   └── injection/business/{service}/
│   │       ├── injection-{api-name}-business-{service}-{operation}-mapper.ts  # Un injection por operación
│   │       └── injection-{api-name}-business-{service}-{operation}-mapper.ts  # Mappers centralizados
│   └── repositories/apis/{api-name}/repositories/
│       ├── business/{service}/
│       │   └── {service}-repository.ts                     # Repositorio unificado por servicio
│       └── injection/business/
│           └── injection-{api-name}-business-repository.ts # Injection acumulativo
├── facade/apis/{api-name}/
│   ├── business/
│   │   └── {service}-facade.ts                           # Facade unificado por servicio
│   └── injection/business/
│       └── injection-{api-name}-business-facade.ts      # Injection acumulativo
```

### 📚 CONVENCIONES Y EJEMPLOS

#### 💼 **Flujos de Negocio - Ejemplos Reales**

**✅ Servicios de Negocio (Se muestran en el menú)**:
- `Auth`: login, logout, refresh_token, create-api-token
- `Notification`: send-email, send-sms, send-push
- `Payment`: process-payment, refund, validate-card

**❌ Operaciones CRUD (Se filtran automáticamente)**:
- `Company`: save, update, list, read, delete
- `User`: save, update, list, read, delete  
- `Product`: save, update, list, read, delete

#### 🎯 **Convenciones de Nombres**

**DTOs** (domain/models):
- Archivos: `i-auth-login-request-dto.ts`, `i-auth-login-company-response-dto.ts`
- Interfaces: `IAuthLoginRequestDTO`, `IAuthLoginCompanyResponseDTO`  
- Patrón: `i-<flujo>-<proceso>-<tipo>-<request/response>-dto.ts` → `I<Flujo><Proceso><Tipo><Request/Response>DTO`
- Atributos: camelCase (`firstName`, `emailAddress`)

**Entities** (infrastructure/entities):
- Archivos: `i-auth-login-request-entity.ts`, `i-auth-login-company-response-entity.ts`
- Interfaces: `IAuthLoginRequestEntity`, `IAuthLoginCompanyResponseEntity`
- Patrón: `i-<flujo>-<proceso>-<tipo>-<request/response>-entity.ts` → `I<Flujo><Proceso><Tipo><Request/Response>Entity`
- Atributos: snake_case (`first_name`, `email_address`)

**Mappers** (infrastructure/mappers):
- Archivos: `auth-login-request-mapper.ts`, `company-login-response-mapper.ts`
- Clases: `AuthLoginRequestMapper`, `CompanyLoginResponseMapper`
- Mapeo automático: camelCase ↔ snake_case
- Injection: `injection-platform-business-auth-login-mapper.ts` (por operación)

**Use Cases** (domain/services/use_cases):
- Archivos: `auth-login-use-case.ts`, `auth-refresh-token-use-case.ts`
- Clases: `AuthLoginUseCase`, `AuthRefreshTokenUseCase`
- Tipos: `UseCase<RequestDTO, ResponseDTO | null>` (con params) | `UseCase<any, ResponseDTO | null>` (sin params)
- Estructura plana: sin subcarpetas por operación
- Injection: `injection-platform-business-auth-use-case.ts` (por servicio)

**Repositories** (infrastructure/repositories):
- **Interface**: `i-auth-repository.ts` (abstract class, métodos camelCase, parámetros optimizados)
- **Implementation**: `auth-repository.ts` (config con defaults, solo response mappers, imports optimizados)
- Clases: `AuthRepository` (métodos camelCase: `login`, `refreshToken`)
- Rutas: `CONST_PLATFORM_API_ROUTES.AUTH_LOGIN`
- Injection: `injection-platform-business-repository.ts` (acumulativo)

**Facades** (facade):
- Archivos: `auth-facade.ts` (unificado por servicio)
- Clases: `AuthFacade` (métodos camelCase: `login`, `refreshToken`)
- Instances: `readonly loginUseCase = Injection...`
- Injection: `injection-platform-business-facade.ts` (acumulativo)

#### 🔗 **Detección Automática de Tipos**

El generador evita duplicaciones automáticamente y mantiene consistencia:
- `UserLoginResponse` → `i-auth-login-user-response-dto.ts` → `IAuthLoginUserResponseDTO` ✅
- `CompanyLoginResponse` → `i-auth-login-company-response-dto.ts` → `IAuthLoginCompanyResponseDTO` ✅  
- Directorio: `refresh_token` → `refresh-token` (kebab-case consistente) ✅
- Sin duplicaciones: No `i-auth-login-company-login-response-dto.ts` ✅
- Index.ts: Solo `export type { Interface }` (mejores prácticas) ✅
- **Consistencia archivo-interface**: Nombres coinciden perfectamente entre archivo e interface ✅
- Una interfaz por archivo + imports automáticos de dependencias

#### 🚀 **Optimizaciones Avanzadas (Diciembre 2024)**

**✅ Repository Pattern Optimizado:**
```typescript
// Interface (abstract class pattern)
export abstract class IAuthRepository {
  abstract login(params: IAuthLoginRequestEntity, config: IConfigDTO): Promise<IAuthLoginResponseDTO | null>;
  abstract refreshToken(config: IConfigDTO): Promise<IAuthRefreshTokenResponseDTO | null>; // Sin params innecesarios
}

// Implementation (config con defaults, imports optimizados)
export class AuthRepository extends IAuthRepository {
  private loginResponseMapper = Injection...ResponseMapper(); // Solo response mappers
  
  public async login(params: IAuthLoginRequestEntity, config: IConfigDTO = CONST_CORE_DTO.CONFIG) {
    // Config con valor por defecto
  }
}
```

**✅ Use Cases Optimizados:**
```typescript
// Solo mappers cuando hay request fields
export class AuthLoginUseCase implements UseCase<IAuthLoginRequestDTO, IAuthLoginResponseDTO | null> {
  private mapper = InjectionPlatformBusinessAuthLoginMapper.AuthLoginRequestMapper(); // ✅ Presente
}

export class AuthRefreshTokenUseCase implements UseCase<any, IAuthRefreshTokenResponseDTO | null> {
  // ✅ Sin mapper innecesario (no hay request fields)
  // ✅ UseCase<any, ...> para operaciones sin parámetros (más flexible que void)
  
  public async execute(config?: IConfigDTO): Promise<IAuthRefreshTokenResponseDTO | null> {
    return await this.repository.refreshToken(config); // ✅ Config directo
  }
}
```

**✅ Mappers con Naming Corregido:**
```typescript
// Variables en camelCase
private loginResponseMapper = // ✅ loginResponseMapper (no loginresponseMapper)
private refreshTokenResponseMapper = // ✅ refreshTokenResponseMapper (no refreshtokenResponseMapper)

// Injection methods abreviados
public static PlatformConfigurationResponseMapper(): AuthLoginPlatformConfigurationResponseMapper {
  // ✅ Método abreviado (no AuthLoginPlatformConfigurationResponseMapper())
}
```

**✅ Sintaxis y Validación:**
- Llaves de cierre en todas las clases ✅
- Imports consolidados via index.ts ✅
- Zero código innecesario ✅
- Variables camelCase consistentes ✅
- UseCase types optimizados: `UseCase<any, ...>` para operaciones sin parámetros ✅

#### 🎯 **Patrones de Consistencia (Última Actualización)**

**✅ Validación Archivo-Interface Perfecta:**
```typescript
// Archivo: i-auth-login-user-response-dto.ts
export interface IAuthLoginUserResponseDTO {
  // Patrón: i-<flujo>-<proceso>-<tipo>-<request/response>-dto.ts 
  //    ↓     ↓      ↓        ↓      ↓           ↓         ↓
  // IAuth Login    User   Response  DTO
}

// Archivo: i-auth-refresh-token-company-response-dto.ts  
export interface IAuthRefreshTokenCompanyResponseDTO {
  // Consistencia 100% garantizada entre nombre de archivo e interface
}
```

**✅ Index.ts con Export Type:**
```typescript
// Todas las exportaciones utilizan 'export type' para mejores prácticas
export type { IAuthLoginUserResponseDTO } from './login/i-auth-login-user-response-dto';
export type { IAuthRefreshTokenUserResponseDTO } from './refresh-token/i-auth-refresh-token-user-response-dto';
// Sin duplicaciones automáticamente detectadas y eliminadas
```

### 🔧 TECNOLOGÍAS Y DEPENDENCIAS

- **Core**: TypeScript, Node.js
- **CLI**: inquirer@8.2.5, chalk@4.1.2
- **File System**: fs-extra@11.0.0
- **HTTP**: axios@1.6.0
- **OpenAPI**: @apidevtools/swagger-parser@10.1.0, openapi-types@12.1.3
- **Build**: tsc (TypeScript compiler)

### 🎮 COMANDOS DISPONIBLES

```bash
weaver                # Comando principal
weaver --local        # Modo local (test-output)
weaver --session-info # Info de sesión
weaver --logout       # Cerrar sesión

# Scripts NPM
npm run build         # Compilar
npm run dev           # Watch mode
npm start             # Ejecutar CLI
npm run test:local    # Build + local
npm run logout        # Build + logout
```

### 🔄 FLUJO DE TRABAJO

#### 🏗️ **FLUJO ENTIDADES CRUD**
1. **Detección Automática**: Analizar directorio actual y APIs disponibles desde cualquier ubicación
2. **Autenticación**: Verificar clave "soyia" (válida 30 días)
3. **OpenAPI**: Solicitar URL, cargar y analizar especificación
4. **API Name**: Configurar nombre lógico de API (estructura apis/{api-name}/)
5. **Directorio Destino**: Seleccionar ubicación física (local: carpetas existentes/nueva, producción: APIs hermanas)
6. **Entity Selection**: Mostrar entidades disponibles del Swagger
7. **Validation**: Verificar estructura proyecto y entidades existentes
8. **Generation**: Crear 42+ archivos siguiendo patrón Clean Architecture con injection completo
9. **Confirmation**: Mostrar resultado y ubicación exacta de archivos

#### 💼 **FLUJO SERVICIOS DE NEGOCIO**
1. **Detección Automática**: Analizar directorio actual y APIs disponibles
2. **Autenticación**: Verificar clave "soyia" (válida 30 días)  
3. **OpenAPI**: Solicitar URL, cargar y analizar especificación
4. **Filtrado Inteligente**: Detectar servicios de negocio (excluir CRUD automáticamente)
5. **API Name**: Configurar nombre lógico de API
6. **Directorio Destino**: Seleccionar ubicación física
7. **Business Service Selection**: Mostrar solo flujos de negocio disponibles (ej: Auth)
8. **Operation Analysis**: Analizar operaciones específicas (login, logout, etc.)
9. **Validation**: Verificar estructura y servicios existentes
10. **Complete Generation**: Crear arquitectura completa Clean Architecture:
    - 📋 **DTOs + Entities + Mappers** por operación con interfaces anidadas
    - 🔗 **Repository Interfaces** unificados por servicio
    - 📊 **Use Cases** en estructura plana con inyección de dependencias
    - 🗄️ **Infrastructure Repositories** unificados con métodos camelCase
    - 🎭 **Facades** unificados con instancias readonly
    - 🔌 **Sistema de Inyección** acumulativo para repositories y facades
11. **Confirmation**: Mostrar resultado y archivos generados con arquitectura completa

---

## 🚀 INSTRUCCIONES DE USO

1. **Describe el cambio** que necesitas de forma concisa
2. **Incluye contexto** específico del problema o funcionalidad
3. **Menciona archivos** relevantes si los conoces
4. **Especifica criterios** si hay restricciones particulares

**¡Weaver CLI está listo para evolucionar según tus necesidades!** 🕷️✨

### 🎯 **ESTADO ACTUAL DEL PROYECTO**

✅ **Funcionalidades Completadas:**
- 🏗️ **Generación CRUD**: 42+ archivos por entidad con Clean Architecture completa
- 💼 **Generación Business COMPLETA**: Arquitectura Clean Architecture completa para flujos de negocio
  - 📋 **DTOs + Entities + Mappers** dinámicos con interfaces anidadas
  - 🔗 **Repository Interfaces** unificados por servicio (abstract class pattern)
  - 📊 **Use Cases** en estructura plana con inyección de dependencias optimizada
  - 🗄️ **Infrastructure Repositories** unificados con métodos camelCase y config defaults
  - 🎭 **Facades** unificados con instancias readonly y singleton pattern
  - 🔌 **Sistema de Inyección Completo** acumulativo para todos los componentes
- 🎯 **Filtrado Inteligente**: Detecta automáticamente CRUD vs Business
- 🔗 **Interfaces Anidadas**: Archivos individuales con imports automáticos
- ⚙️ **Mapeo Automático**: CamelCase ↔ snake_case con inyección de dependencias
- 🔄 **Sin Duplicaciones**: Evita automáticamente nombres duplicados, caracteres especiales y consistencia archivo-interface
- ✅ **Nombres Consistentes**: Patrón perfectamente alineado entre archivos e interfaces con validación automática
- 🎯 **Kebab-case Uniforme**: Directorios y archivos siguen convención kebab-case (`refresh-token/` no `refresh_token/`)
- 🛣️ **Integración Constantes**: Uso automático de CONST_PLATFORM_API_ROUTES
- 🧩 **Operaciones Flexibles**: Soporte completo para operaciones con/sin request body
- 🔌 **Actualización Acumulativa**: Los archivos de injection se actualizan automáticamente
- 🚀 **Optimización Completa**: Repository pattern, use cases optimizados, mappers corregidos, sintaxis validada

🎉 **¡SISTEMA COMPLETO!** 
Weaver CLI ahora genera **arquitectura Clean Architecture completa** tanto para **entidades CRUD** como para **flujos de negocio**, con sistema de inyección de dependencias unificado y acumulativo.

**🆕 Última Actualización (Diciembre 2024):**
- ✅ **Consistencia Archivo-Interface 100%**: Nombres perfectamente alineados entre archivos e interfaces
- ✅ **Export Type Únicos**: Solo `export type` en index.ts sin duplicaciones
- ✅ **Kebab-case Uniforme**: Directorios consistentes (`refresh-token/` no `refresh_token/`)
- ✅ **Validación Automática**: Detección y corrección de duplicaciones de sufijos
- ✅ **Patrones Completos**: `i-<flujo>-<proceso>-<tipo>-<request/response>-<dto/entity>.ts` → `I<Flujo><Proceso><Tipo><Request/Response><DTO/Entity>`

**🔥 Última Optimización Completa (Diciembre 2024):**
- ✅ **DTOs y Entities Optimizados**: Imports via index.ts, naming consistente, interfaces anidadas perfectas
- ✅ **Mappers Completamente Corregidos**: Eliminación de duplicaciones, nombres camelCase, imports optimizados
- ✅ **Repository Pattern Perfecto**: Abstract class, métodos camelCase, parámetros optimizados, config con defaults
- ✅ **Use Cases Optimizados**: Solo mappers necesarios, config directo, sintaxis válida, tipos correctos
- ✅ **Facades Perfectos**: Singleton pattern, delegación correcta, tipos explícitos, Clean Architecture
- ✅ **Sistema de Injection Completo**: Factory pattern, métodos abreviados, imports consolidados
- ✅ **Validación Sintáctica**: Llaves de cierre, imports limpios, zero código innecesario
- ✅ **UseCase Types**: `UseCase<any, ResponseDTO | null>` para operaciones sin parámetros (optimización TypeScript)

#### 🆕 **Mejora Reciente v2.1.2 (Diciembre 2024)**

**✅ UseCase Generic Types Optimizados:**

En la versión anterior, los casos de uso sin parámetros utilizaban `UseCase<void, ...>` lo cual no era la mejor práctica de TypeScript. Se optimizó a `UseCase<any, ...>` para mejor compatibilidad:

```typescript
// ❌ ANTES (v2.1.1):
export class AuthLogoutUseCase implements UseCase<void, IAuthLogoutResponseDTO | null>
export class AuthRefreshTokenUseCase implements UseCase<void, IAuthRefreshTokenResponseDTO | null>

// ✅ AHORA (v2.1.2):
export class AuthLogoutUseCase implements UseCase<any, IAuthLogoutResponseDTO | null>
export class AuthRefreshTokenUseCase implements UseCase<any, IAuthRefreshTokenResponseDTO | null>

// ✅ Se mantiene igual para operaciones con parámetros:
export class AuthLoginUseCase implements UseCase<IAuthLoginRequestDTO, IAuthLoginResponseDTO | null>
export class AuthCreateApiTokenUseCase implements UseCase<IAuthCreateApiTokenRequestDTO, IAuthCreateApiTokenResponseDTO | null>
```

**🎯 Beneficios:**
- **🔧 Mejor compatibilidad** con TypeScript para operaciones sin input
- **📋 Tipos más flexibles** que `void` para casos de uso sin parámetros
- **🎯 Consistencia mejorada** en el patrón de tipos genéricos
- **✅ Zero breaking changes** - mejora transparente
