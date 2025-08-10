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
│   │   └── correct-entity-flow-generator.ts # Generador principal (42 archivos por entidad)
│   ├── parsers/
│   │   └── swagger-parser.ts               # Parser OpenAPI/Swagger con detección de API
│   ├── validators/
│   │   └── project-validator.ts            # Validaciones pre-generación
│   └── utils/
│       └── directory-detector.ts           # Detección inteligente de APIs y directorios
├── package.json                            # Configuración NPM (comando: "wc")
├── tsconfig.json                           # Configuración TypeScript
└── README.md                               # Documentación completa
```

### 🎯 FUNCIONALIDADES IMPLEMENTADAS

1. **🔐 Autenticación**: Clave "soyia", sesión 30 días, archivo ~/.weaver-cli-auth
2. **⚡ CLI Interactivo**: Comando `wc`, menú con inquirer, colores con chalk
3. **🌐 OpenAPI Integration**: Lectura automática, detección de entidades y tipos
4. **🎯 Detección Inteligente**: API actual vs API target, validación de rutas
5. **📁 Generación Flexible**: Desde cualquier directorio hacia cualquier API
6. **🧪 Modo Local**: `wc --local` genera en `./test-output/`
7. **🛡️ Validaciones**: Estructura proyecto, entidades existentes, confirmaciones
8. **📊 Clean Architecture**: 42 archivos por entidad (DTOs, Entities, Use Cases, Mappers, Facades, Injections)

### 🗂️ ESTRUCTURA GENERADA

```
{directorio-actual}/
└── {api-name}/                    # Ej: platform/, payment/, etc.
    ├── domain/
    │   ├── models/apis/{api-name}/entities/{entity}/
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
    │           └── {entity}-list-use-case.ts
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
    │   │   └── {entity}-delete-mapper.ts
    │   └── repositories/apis/{api-name}/repositories/entities/{entity}/
    │       └── {entity}-repository.ts
    ├── facade/apis/{api-name}/entities/
    │   └── {entity}-facade.ts
    └── injection/
        ├── domain/services/use_cases/apis/{api-name}/injection/entities/
        │   └── injection-{api-name}-entities-{entity}-use-case.ts
        └── infrastructure/mappers/apis/{api-name}/injection/entities/
            └── injection-{api-name}-entities-{entity}-mapper.ts
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

1. **Detección**: Analizar directorio actual y APIs disponibles
2. **Autenticación**: Verificar clave "soyia" (válida 30 días)
3. **OpenAPI**: Solicitar URL, cargar y analizar especificación
4. **API Selection**: Detectar API del Swagger, sugerir opciones
5. **Target Selection**: Elegir dónde generar (mismo API, hermana, custom)
6. **Entity Selection**: Mostrar entidades disponibles del Swagger
7. **Validation**: Verificar estructura proyecto y entidades existentes
8. **Generation**: Crear 42 archivos siguiendo patrón Clean Architecture
9. **Confirmation**: Mostrar resultado y ubicación de archivos

---

## 📝 PROMPT PARA MODIFICACIONES

```
Necesito hacer cambios en Weaver CLI, el generador de código TypeScript que lee OpenAPI/Swagger y genera entidades con Clean Architecture.

**CONTEXTO ACTUAL:**
- Comando: `weaver` con autenticación "soyia"
- Genera en: {directorio-actual}/{api-name}/domain/...
- 43+ archivos por entidad (DTOs, Entities, Use Cases, Mappers, Facades, Injections)
- Detección inteligente de APIs y directorios
- Modo local con `--local` flag
- Validaciones pre-generación completas

**ARQUITECTURA DE ARCHIVOS:**
- `src/cli.ts`: Menú interactivo principal
- `src/generators/correct-entity-flow-generator.ts`: Lógica de generación
- `src/parsers/swagger-parser.ts`: Parser OpenAPI con detección API
- `src/validators/project-validator.ts`: Validaciones estructura y entidades
- `src/utils/directory-detector.ts`: Detección APIs y directorios
- `src/auth/auth-manager.ts`: Sistema autenticación

**CAMBIO SOLICITADO:**
[DESCRIBIR AQUÍ EL CAMBIO QUE NECESITAS]

**CRITERIOS:**
- Mantener compatibilidad con funcionalidad existente
- Seguir patrones de código actuales
- Actualizar validaciones si es necesario
- Conservar Clean Architecture en archivos generados
- Mantener sistema de autenticación
- Preservar detección inteligente de APIs
- Mantener modo local para pruebas

**ENTREGABLES ESPERADOS:**
- Código modificado con explicación de cambios
- Actualización de README.md si aplica
- Scripts de prueba si es necesario
- Documentación de nuevas funcionalidades
```

---

## 🔍 EJEMPLOS DE CAMBIOS COMUNES

### 📝 Agregar Nueva Funcionalidad
```
CAMBIO SOLICITADO:
Agregar opción para generar solo DTOs (sin Use Cases ni Mappers)

CONTEXTO: Necesito una opción en el menú que permita generar solo los DTOs 
de una entidad, sin toda la estructura completa.
```

### 🔧 Modificar Estructura Generada
```
CAMBIO SOLICITADO:
Cambiar la estructura de carpetas para que sea:
{api-name}/src/domain/ en lugar de {api-name}/domain/

CONTEXTO: El proyecto target tiene una carpeta src/ intermedia que necesito incluir.
```

### 🎯 Ajustar Validaciones
```
CAMBIO SOLICITADO:
Relajar las validaciones para permitir generar en cualquier directorio sin verificar estructura

CONTEXTO: Quiero usar el generador en proyectos nuevos que aún no tienen la estructura completa.
```

### 🔐 Modificar Autenticación
```
CAMBIO SOLICITADO:
Cambiar la clave de "soyia" a "nueva-clave" y extender sesión a 60 días

CONTEXTO: Necesito actualizar la clave de acceso por seguridad.
```

### 📊 Personalizar Templates
```
CAMBIO SOLICITADO:
Modificar el template de los Use Cases para incluir logging automático

CONTEXTO: Todos los Use Cases generados deben incluir logs de entrada y salida.
```

---

## 🚀 INSTRUCCIONES DE USO

1. **Copia el prompt** desde "PROMPT PARA MODIFICACIONES"
2. **Reemplaza** `[DESCRIBIR AQUÍ EL CAMBIO QUE NECESITAS]` con tu solicitud específica
3. **Incluye contexto adicional** si es necesario
4. **Envía el prompt** para obtener la implementación

**¡Weaver CLI está listo para evolucionar según tus necesidades!** 🕷️✨
