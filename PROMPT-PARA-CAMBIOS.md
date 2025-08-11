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
├── package.json                            # Configuración NPM (comando: "weaver")
├── tsconfig.json                           # Configuración TypeScript
└── README.md                               # Documentación completa
```

### 🎯 FUNCIONALIDADES IMPLEMENTADAS

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

### 🗂️ ESTRUCTURA GENERADA

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

1. **Detección Automática**: Analizar directorio actual y APIs disponibles desde cualquier ubicación
2. **Autenticación**: Verificar clave "soyia" (válida 30 días)
3. **OpenAPI**: Solicitar URL, cargar y analizar especificación
4. **API Name**: Configurar nombre lógico de API (estructura apis/{api-name}/)
5. **Directorio Destino**: Seleccionar ubicación física (local: carpetas existentes/nueva, producción: APIs hermanas)
6. **Entity Selection**: Mostrar entidades disponibles del Swagger
7. **Validation**: Verificar estructura proyecto y entidades existentes
8. **Generation**: Crear 42+ archivos siguiendo patrón Clean Architecture con injection completo
9. **Confirmation**: Mostrar resultado y ubicación exacta de archivos

---

## 📝 PROMPT PARA MODIFICACIONES

```
Necesito hacer cambios en Weaver CLI, el generador de código TypeScript que lee OpenAPI/Swagger y genera entidades con Clean Architecture.

**CONTEXTO ACTUAL:**
- Comando: `weaver` con autenticación "soyia"
- Flujo dual: API name (lógico) + directorio destino (físico)
- Genera en: {directorio-destino}/domain/models/apis/{api-name}/...
- 42+ archivos por entidad (DTOs, Entities, Use Cases, Mappers, Facades, Injections completas)
- Detección automática desde cualquier directorio (/bus, /platform, /core, etc.)
- Modo local con selección de carpetas existentes/nuevas
- Sistema de limpieza completo de entidades generadas
- Validaciones pre-generación completas

**ARQUITECTURA DE ARCHIVOS:**
- `src/cli.ts`: Menú interactivo principal con flujo dual simplificado
- `src/generators/correct-entity-flow-generator.ts`: Lógica de generación con targetApiName
- `src/generators/cleanup-generator.ts`: Sistema completo de limpieza de entidades
- `src/parsers/swagger-parser.ts`: Parser OpenAPI con detección API
- `src/validators/project-validator.ts`: Validaciones estructura y entidades
- `src/utils/directory-detector.ts`: Detección inteligente desde cualquier directorio
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

### ✅ Corrección de Archivos Faltantes
```
CAMBIO SOLICITADO:
Generar el archivo injection-platform-entities-repository.ts que no se estaba creando

CONTEXTO: Los Use Cases importan InjectionPlatformEntitiesRepository pero el archivo 
no se generaba, causando referencias rotas.

SOLUCIÓN IMPLEMENTADA:
- Función generateRepositoryInjection() que crea/actualiza el archivo automáticamente
- Soporte para múltiples entidades en el mismo archivo
- Patrón singleton consistente con el resto de la arquitectura
```



---

## 🚀 INSTRUCCIONES DE USO

1. **Copia el prompt** desde "PROMPT PARA MODIFICACIONES"
2. **Reemplaza** `Corre el generador a ver que genera de forma local` con tu solicitud específica
3. **Incluye contexto adicional** si es necesario
4. **Envía el prompt** para obtener la implementación

**¡Weaver CLI está listo para evolucionar según tus necesidades!** 🕷️✨
