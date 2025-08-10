# 🕷️ Weaver CLI

**Teje la estructura perfecta de tu código frontend**

Un generador de código CLI inteligente que lee especificaciones OpenAPI/Swagger y genera automáticamente toda la estructura de entidades siguiendo principios de Clean Architecture.

## 🚀 Instalación

```bash
npm install -g weaver-frontend-cli
```

## 🎯 Uso

Una vez instalado globalmente, ejecuta el comando en tu proyecto:

```bash
weaver
```

### 🔑 Autenticación

Weaver CLI requiere autenticación para su uso. Al ejecutar por primera vez, se te pedirá una clave de acceso. La sesión será válida por 30 días.

### 🧪 Modo de Prueba Local

Para probar la generación sin afectar tu proyecto principal:

```bash
weaver --local
```

### 📊 Comandos Adicionales

```bash
# Ver información de sesión
weaver --session-info

# Cerrar sesión
weaver --logout
```

## ✨ Características

### 🌐 Integración con OpenAPI/Swagger

- Lee automáticamente especificaciones OpenAPI 3.x
- Extrae entidades y sus propiedades
- Detecta tipos de datos y validaciones
- Sugiere nombres de API automáticamente

### 🏗️ Generación Inteligente

- **43+ archivos por entidad** siguiendo Clean Architecture
- **Validación previa** del proyecto y entidades existentes
- **Soporte para múltiples APIs** (platform, payment, etc.)
- **Nomenclatura consistente** (camelCase para DTOs, snake_case para Entities)

### 🛡️ Validaciones y Seguridad

- ✅ Verificación de estructura del proyecto
- ✅ Detección de entidades existentes
- ✅ Confirmación antes de sobrescribir
- ✅ Autenticación con clave de acceso

### 🎯 Estructura Generada (Patrón Clean Architecture)

Para una entidad llamada `User` en API `platform`, se generan estos archivos:

```
bus/
├── domain/
│   ├── models/apis/platform/entities/user/
│   │   ├── i-user-dto.ts                    # DTO principal
│   │   ├── i-user-save-dto.ts               # DTO para crear
│   │   ├── i-user-read-dto.ts               # DTO para leer (solo ID)
│   │   ├── i-user-update-dto.ts             # DTO para actualizar
│   │   ├── i-user-delete-dto.ts             # DTO para eliminar (solo ID)
│   │   └── index.ts                         # Exportaciones
│   └── services/
│       ├── repositories/apis/platform/entities/
│       │   └── i-user-repository.ts         # Interface abstracta del repositorio
│       └── use_cases/apis/platform/entities/user/
│           ├── user-save-use-case.ts        # Use case para crear
│           ├── user-read-use-case.ts        # Use case para leer
│           ├── user-update-use-case.ts      # Use case para actualizar
│           ├── user-delete-use-case.ts      # Use case para eliminar
│           └── user-list-use-case.ts        # Use case para listar
├── infrastructure/
│   ├── entities/apis/platform/entities/user/
│   │   ├── i-user-entity.ts                 # Entity principal (snake_case)
│   │   ├── i-user-save-entity.ts            # Entity para crear
│   │   ├── i-user-read-entity.ts            # Entity para leer
│   │   ├── i-user-update-entity.ts          # Entity para actualizar
│   │   ├── i-user-delete-entity.ts          # Entity para eliminar
│   │   └── index.ts                         # Exportaciones
│   ├── mappers/apis/platform/entities/user/
│   │   ├── user-entity-mapper.ts            # Mapper principal (Entity ↔ DTO)
│   │   ├── user-save-mapper.ts              # Mapper para operación save
│   │   ├── user-read-mapper.ts              # Mapper para operación read
│   │   ├── user-update-mapper.ts            # Mapper para operación update
│   │   └── user-delete-mapper.ts            # Mapper para operación delete
│   └── repositories/apis/platform/repositories/entities/user/
│       └── user-repository.ts               # Implementación del repositorio
├── facade/apis/platform/entities/
│   └── user-facade.ts                       # Facade con patrón singleton
└── injection/
    ├── domain/services/use_cases/apis/platform/injection/entities/
    │   └── injection-platform-entities-user-use-case.ts     # Inyección use cases
    ├── infrastructure/mappers/apis/platform/injection/entities/
    │   └── injection-platform-entities-user-mapper.ts       # Inyección mappers
    └── facade/apis/platform/injection/entities/
        └── injection-platform-entities-facade.ts            # Inyección facades (auto-actualizado)
```

## 🛠️ Características Técnicas

- ✅ **TypeScript** - Tipado fuerte y moderno
- ✅ **Clean Architecture** - Separación clara de responsabilidades
- ✅ **SOLID Principles** - Código mantenible y escalable
- ✅ **Dependency Injection** - Acoplamiento débil entre componentes
- ✅ **OpenAPI Integration** - Lectura automática de especificaciones
- ✅ **Multi-API Support** - Soporte para múltiples APIs backend
- ✅ **Authentication System** - Acceso controlado con clave
- ✅ **Smart Imports** - Importaciones inteligentes según contexto
- ✅ **Auto ID Field** - Campo `id` automático en DTOs y Entities principales
- ✅ **Smart Cleanup** - Sistema de limpieza inteligente para eliminar código generado

### 📦 Sistema de Importaciones

Weaver CLI genera importaciones inteligentes:

```typescript
// ✅ Archivos generados - Usa @{api-name}
import { IUserDTO } from "@platform/domain/models/apis/platform/entities/user";
import { UserRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/entities/user";

// ✅ Dependencias core - Mantiene @bus  
import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { Mapper } from "@bus/core/classes";
```

**Beneficios:**
- 🎯 **Consistencia**: Importaciones coherentes en todo el proyecto
- 🔧 **Flexibilidad**: Soporte para múltiples APIs sin conflictos
- 🛡️ **Separación**: Distingue claramente entre código generado y dependencias

## 🧩 Flujo de Trabajo

1. **Ejecutar** `weaver` en tu proyecto
2. **Autenticarse** con la clave de acceso
3. **Ingresar URL** de OpenAPI/Swagger
4. **Seleccionar entidad** de la lista disponible
5. **Configurar API name** (autodetectado o manual)
6. **Validar** estructura del proyecto
7. **Confirmar** generación
8. **¡Listo!** 43+ archivos generados automáticamente

## 🧪 Desarrollo

```bash
# Clonar el repositorio
git clone <tu-repo>
cd weaver-cli

# Instalar dependencias
npm install

# Compilar
npm run build

# Desarrollo con watch
npm run dev

# Ejecutar localmente
npm start

# Modo prueba local
npm run test:local
```

## 📝 Scripts Disponibles

```bash
npm run build          # Compilar TypeScript
npm run dev            # Desarrollo con watch
npm start              # Ejecutar CLI
npm run test:local     # Prueba en modo local
npm run logout         # Cerrar sesión
npm run session-info   # Ver info de sesión
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🆔 Campo ID Automático

Todas las entidades generadas incluyen automáticamente el campo `id`:

```typescript
// DTO Principal
export interface IUserDTO {
  id?: string;          // ← Agregado automáticamente
  name: string;
  email: string;
}

// Entity Principal  
export interface IUserEntity {
  id?: string;          // ← Agregado automáticamente
  name: string;
  email: string;
}

// Mapper Principal - Mapeo automático
public mapFrom(param: IUserEntity): IUserDTO {
  return {
    id: param.id,       // ← Mapeado automáticamente
    name: param.name,
    email: param.email
  };
}
```

## 🧹 Sistema de Limpieza Inteligente

Weaver CLI incluye un sistema completo de limpieza para eliminar código generado:

### 🗑️ **Limpieza por Entidad**
```bash
weaver --local
# Seleccionar: 🧹 Limpiar/Eliminar código generado
# Elegir: 🗑️ Eliminar entidad específica
```

- Detecta automáticamente entidades generadas
- Muestra vista previa de archivos a eliminar
- Elimina directorios completos de la entidad
- Limpia referencias en archivos de injection

### 🗂️ **Limpieza por API Completa**
```bash
# Elimina toda la estructura de una API
# Incluye: DTOs, Entities, Use Cases, Mappers, Repositories, Facades
```

### 🧨 **Limpieza Total**
```bash
# Elimina TODO el contenido generado
# Requiere doble confirmación: "ELIMINAR TODO"
```

### ✨ **Características de Seguridad**
- **Vista previa**: Muestra qué se eliminará antes de hacerlo
- **Confirmaciones múltiples**: Requiere confirmación explícita
- **Detección inteligente**: Identifica automáticamente contenido generado
- **Limpieza de referencias**: Elimina imports y métodos en archivos injection

## 📋 Historial de Versiones

### v1.0.9 - Smart Cleanup System 🧹
- **🧹 Sistema de Limpieza Completo**: Gestión completa del código generado
- **🗑️ Limpieza por Entidad**: Eliminación inteligente de entidades individuales
- **🗂️ Limpieza por API**: Eliminación completa de APIs con todos sus archivos
- **🧨 Limpieza Total**: Eliminación de todo el contenido con doble confirmación
- **🛡️ Operaciones Seguras**: Múltiples confirmaciones y vista previa

### v1.0.8 - Auto ID Field ✨
- **🆔 Campo ID Automático**: Agregado automáticamente `id?: string;` en DTOs y Entities principales
- **🔧 Mappers Inteligentes**: Mapeo automático del campo `id` en todos los mappers principales
- **✅ Consistencia ID**: Manejo uniforme del identificador único en toda la arquitectura

### v1.0.7 - Repository Import Fix 🔧
- **🐛 Repository Imports**: Corregidas las importaciones en injection-platform-entities-repository.ts
- **📁 Path específico**: Los repositories usan el path completo al archivo
- **✅ Consistencia**: Alineado con el patrón del proyecto goluti-frontend

### v1.0.6 - Importaciones Inteligentes ✨
- **🔧 Importaciones corregidas**: Los archivos generados usan `@{api-name}`, los core mantienen `@bus`
- **📦 33+ importaciones**: Sistemáticamente corregidas en todos los templates
- **🎯 Separación clara**: Distingue entre código generado y dependencias externas

### v1.0.5 - Repository Injection Completo 🔧  
- **📁 Archivo faltante**: Genera `injection-platform-entities-repository.ts`
- **🔄 Actualización automática**: Agrega nuevas entidades al archivo existente
- **🛡️ Evita duplicados**: Verificación inteligente de entidades existentes

### v1.0.4 - Clean Architecture Base 🏗️
- **43+ archivos**: Estructura completa por entidad
- **🔐 Autenticación**: Sistema con clave de acceso
- **🌐 OpenAPI**: Integración completa con Swagger
- **🧪 Modo local**: Pruebas con `--local`

## 📄 Licencia

MIT © Andrés León

---

**🕷️ Weaver CLI** - *Tejiendo el futuro del desarrollo frontend*