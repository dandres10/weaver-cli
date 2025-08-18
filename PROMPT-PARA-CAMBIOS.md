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

#### 💼 **GENERACIÓN FLUJOS DE NEGOCIO (Nuevo)**
13. **🎯 Filtrado Inteligente**: Detecta automáticamente servicios de negocio vs operaciones CRUD
14. **📋 Generación Dinámica**: DTOs + Entities + Mappers para cualquier flujo de negocio
15. **🔗 Interfaces Anidadas**: Archivos individuales para cada interface compleja con prefijo "I"
16. **🗂️ Convenciones Consistentes**: Prefijo "i-" en archivos, "I" en interfaces
17. **🎨 Mapeo Inteligente**: CamelCase (DTOs) ↔ Snake_case (Entities) automático
18. **⚙️ Inyección de Dependencias**: Mappers anidados con singleton pattern
19. **🔄 Sin Duplicaciones**: Evita "response-response" automáticamente

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

#### 💼 **FLUJOS DE NEGOCIO** (Flujo Business - Nuevo)
```
{directorio-destino}/              # Ejemplo: test-output/platform/
├── domain/
│   └── models/apis/{api-name}/business/{service}/        # Ejemplo: apis/platform/business/auth/
│       ├── {operation}/                                  # Por cada operación (login, logout, etc.)
│       │   ├── i-{service}-{operation}-request-dto.ts   # Ejemplo: i-auth-login-request-dto.ts
│       │   ├── i-{service}-{operation}-response-dto.ts  # Ejemplo: i-auth-login-response-dto.ts
│       │   ├── i-{nested-type}-response-dto.ts          # Para cada tipo anidado (company, user, etc.)
│       │   └── i-{nested-type}-response-dto.ts          # Archivos individuales por interface
│       └── index.ts                                      # Exportaciones automáticas
├── infrastructure/
│   ├── entities/apis/{api-name}/business/{service}/
│   │   ├── {operation}/
│   │   │   ├── i-{service}-{operation}-request-entity.ts   # snake_case attributes
│   │   │   ├── i-{service}-{operation}-response-entity.ts  # snake_case attributes  
│   │   │   ├── i-{nested-type}-response-entity.ts          # Para cada tipo anidado
│   │   │   └── i-{nested-type}-response-entity.ts          # Con prefijo "I"
│   │   └── index.ts
│   └── mappers/apis/{api-name}/business/{service}/
│       ├── {operation}/
│       │   ├── {service}-{operation}-request-mapper.ts     # CamelCase ↔ snake_case
│       │   ├── {service}-{operation}-response-mapper.ts    # Dependency injection
│       │   ├── {nested-type}-response-mapper.ts            # Mappers individuales
│       │   └── {nested-type}-response-mapper.ts            # Singleton pattern
│       └── index.ts
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
- Archivos: `i-auth-login-request-dto.ts`, `i-company-login-response-dto.ts`
- Interfaces: `IAuthLoginRequestDTO`, `ICompanyLoginResponseDTO`
- Atributos: camelCase (`firstName`, `emailAddress`)

**Entities** (infrastructure/entities):
- Archivos: `i-auth-login-request-entity.ts`, `i-company-login-response-entity.ts`
- Interfaces: `IAuthLoginRequestEntity`, `ICompanyLoginResponseEntity`
- Atributos: snake_case (`first_name`, `email_address`)

**Mappers** (infrastructure/mappers):
- Archivos: `auth-login-request-mapper.ts`, `company-login-response-mapper.ts`
- Clases: `AuthLoginRequestMapper`, `CompanyLoginResponseMapper`
- Mapeo automático: camelCase ↔ snake_case

#### 🔗 **Detección Automática de Tipos**

El generador evita duplicaciones automáticamente:
- `UserLoginResponse` → `IUserLoginResponseDTO` (no `IUserLoginResponseResponseDTO`)
- `CompanyLoginResponse` → `company-login-response-mapper.ts` (no `-response-response-`)
- `PlatformConfiguration` → `IPlatformConfigurationResponseDTO` (agrega sufijo)

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
10. **Dynamic Generation**: Crear DTOs + Entities + Mappers por operación con interfaces anidadas
11. **Confirmation**: Mostrar resultado y archivos generados

---

## 🚀 INSTRUCCIONES DE USO

1. **Describe el cambio** que necesitas de forma concisa
2. **Incluye contexto** específico del problema o funcionalidad
3. **Menciona archivos** relevantes si los conoces
4. **Especifica criterios** si hay restricciones particulares

**¡Weaver CLI está listo para evolucionar según tus necesidades!** 🕷️✨

### 🎯 **ESTADO ACTUAL DEL PROYECTO**

✅ **Funcionalidades Completadas:**
- 🏗️ **Generación CRUD**: 42+ archivos por entidad con Clean Architecture
- 💼 **Generación Business**: DTOs + Entities + Mappers dinámicos para flujos de negocio
- 🎯 **Filtrado Inteligente**: Detecta automáticamente CRUD vs Business
- 🔗 **Interfaces Anidadas**: Archivos individuales con convenciones consistentes
- ⚙️ **Mapeo Automático**: CamelCase ↔ snake_case con inyección de dependencias
- 🔄 **Sin Duplicaciones**: Evita automáticamente nombres duplicados

🚧 **Próximas Funcionalidades (Pendientes)**:
- 📊 **Use Cases**: Generación de casos de uso para flujos de negocio
- 🗄️ **Repositories**: Generación de repositorios para flujos de negocio  
- 🎭 **Facades**: Generación de facades para flujos de negocio
- 🔌 **Injections**: Sistema completo de inyección de dependencias
