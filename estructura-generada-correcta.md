# Estructura Correcta Generada por Weaver CLI

## 🎯 Patrón Clean Architecture Completo

Weaver CLI genera una estructura completa siguiendo Clean Architecture con importaciones inteligentes y sistema de injection automático.

## 📂 Estructura Completa Generada

Para una entidad `User`, se generarán estos archivos siguiendo el patrón correcto:

```
bus/
├── domain/
│   ├── models/apis/platform/entities/user/
│   │   ├── i-user-dto.ts                    ✨ DTO principal
│   │   ├── i-user-save-dto.ts               ✨ DTO para crear
│   │   ├── i-user-read-dto.ts               ✨ DTO para leer (solo ID)
│   │   ├── i-user-update-dto.ts             ✨ DTO para actualizar
│   │   ├── i-user-delete-dto.ts             ✨ DTO para eliminar (solo ID)
│   │   └── index.ts                         ✨ Exportaciones
│   └── services/
│       ├── repositories/apis/platform/entities/
│       │   └── i-user-repository.ts         ✨ Interface abstracta del repositorio
│       └── use_cases/apis/platform/entities/user/
│           ├── user-save-use-case.ts        ✨ Use case para crear
│           ├── user-read-use-case.ts        ✨ Use case para leer
│           ├── user-update-use-case.ts      ✨ Use case para actualizar
│           ├── user-delete-use-case.ts      ✨ Use case para eliminar
│           └── user-list-use-case.ts        ✨ Use case para listar
├── infrastructure/
│   ├── entities/apis/platform/entities/user/
│   │   ├── i-user-entity.ts                 ✨ Entity principal (snake_case)
│   │   ├── i-user-save-entity.ts            ✨ Entity para crear
│   │   ├── i-user-read-entity.ts            ✨ Entity para leer
│   │   ├── i-user-update-entity.ts          ✨ Entity para actualizar
│   │   ├── i-user-delete-entity.ts          ✨ Entity para eliminar
│   │   └── index.ts                         ✨ Exportaciones
│   ├── mappers/apis/platform/entities/user/
│   │   ├── user-entity-mapper.ts            ✨ Mapper principal (Entity ↔ DTO)
│   │   ├── user-save-mapper.ts              ✨ Mapper para operación save
│   │   ├── user-read-mapper.ts              ✨ Mapper para operación read
│   │   ├── user-update-mapper.ts            ✨ Mapper para operación update
│   │   └── user-delete-mapper.ts            ✨ Mapper para operación delete
│   └── repositories/apis/platform/repositories/entities/user/
│       └── user-repository.ts               ✨ Implementación del repositorio
├── facade/apis/platform/entities/
│   └── user-facade.ts                       ✨ Facade con patrón singleton
└── injection/
    ├── domain/services/use_cases/apis/platform/injection/entities/
    │   └── injection-platform-entities-user-use-case.ts     ✨ Inyección use cases
    ├── infrastructure/mappers/apis/platform/injection/entities/
    │   └── injection-platform-entities-user-mapper.ts       ✨ Inyección mappers
    └── infrastructure/repositories/apis/platform/repositories/injection/entities/
        └── (nota para añadir a archivo existente)            ✨ Inyección repositories
```

## 🔄 Diferencias Clave vs Versión Anterior

### ❌ **Antes (Incorrecto)**
```typescript
// Un solo archivo con todas las interfaces mezcladas
export interface IUserModel {
  id: string;
  name: string;
  // Todo junto
}

// Use cases genéricos sin separación
export class UserUseCase {
  async getAllUsers() { ... }
  async getUserById() { ... }
  // Todo en una clase
}

// Mappers básicos
export class UserMapper {
  // Mapeo simple sin considerar operaciones específicas
}
```

### ✅ **Ahora (Correcto)**
```typescript
// Separación clara por responsabilidad
// i-user-dto.ts
export interface IUserDTO {
  id?: string;
  platformId?: string;
  email: string;
  // Campos con camelCase para domain
}

// i-user-save-dto.ts  
export interface IUserSaveDTO {
  platformId?: string;
  email: string;
  // Sin id, createdDate, updatedDate
}

// user-save-use-case.ts
export class UserSaveUseCase implements UseCase<IUserSaveDTO, IUserDTO | null> {
  // Responsabilidad única: crear usuarios
  public async execute(params: IUserSaveDTO, config?: IConfigDTO): Promise<IUserDTO | null> {
    const paramsEntity = this.mapper.mapTo(params);
    return await this.repository.save(paramsEntity, config).then((data) => data ?? null);
  }
}

// user-save-mapper.ts
export class UserSaveMapper extends Mapper<IUserSaveEntity, IUserSaveDTO> {
  // Mapeo específico para operación save con valores por defecto
  public mapTo(param: IUserSaveDTO): IUserSaveEntity {
    return {
      platform_id: param.platformId,
      email: param.email,
      state: param.state ?? true  // Valor por defecto
    };
  }
}
```

## 🎯 **Patrones Implementados Correctamente**

### 1. **Separación de DTOs por Operación**
- `IUserDTO` - Modelo completo del dominio
- `IUserSaveDTO` - Solo campos necesarios para crear
- `IUserReadDTO` - Solo ID para buscar
- `IUserUpdateDTO` - ID + campos opcionales para actualizar
- `IUserDeleteDTO` - Solo ID para eliminar

### 2. **Use Cases Individuales**
- Cada operación CRUD tiene su propio use case
- Implementan la interface `UseCase<Input, Output>`
- Patrón singleton con `getInstance()`
- Responsabilidad única

### 3. **Mappers Específicos**
- `UserEntityMapper` - Mapeo bidireccional Entity ↔ DTO
- `UserSaveMapper` - Mapeo específico para crear con defaults
- `UserReadMapper` - Mapeo simple ID
- `UserUpdateMapper` - Mapeo con campos opcionales
- `UserDeleteMapper` - Mapeo simple ID

### 4. **Entities vs DTOs**
- **DTOs** - `camelCase` para el dominio (frontend)
- **Entities** - `snake_case` para infraestructura (backend)
- Conversión automática entre formatos

### 5. **Inyección de Dependencias**
- Archivos de injection separados por tipo
- Factory methods para obtener instancias
- Patrón singleton en toda la arquitectura

### 6. **Repository Pattern**
- Interface abstracta en dominio
- Implementación concreta en infraestructura  
- Uso de `platformAxios` con rutas de constantes
- Manejo correcto de errores y null values

### 7. **Facade Pattern**
- Punto de entrada único para la entidad
- Orchestración de todos los use cases
- Patrón singleton
- Interface limpia para el frontend

## 🚀 **Beneficios del Nuevo Enfoque**

1. **🎯 Precisión Total** - Replica exactamente el patrón usado en `location`
2. **📐 Arquitectura Limpia** - Separación clara de responsabilidades  
3. **🔧 Mantenibilidad** - Cada archivo tiene una responsabilidad específica
4. **⚡ Escalabilidad** - Fácil agregar nuevas operaciones
5. **🛡️ Type Safety** - TypeScript preciso en todas las capas
6. **🔄 Consistency** - Mismo patrón en toda la aplicación
7. **📝 Trazabilidad** - Fácil seguir el flujo de datos
8. **🧪 Testeable** - Cada componente se puede testear independientemente

## 📋 **Ejemplo Generado**

Si seleccionas `User` del swagger, obtendrás:

```typescript
// i-user-dto.ts
export interface IUserDTO {
  id?: string;
  platformId?: string;
  password: string;
  email: string;
  identification: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  refreshToken?: string;
  state: boolean;
}

// user-facade.ts (punto de entrada)
export class UserFacade {
  private static instance: UserFacade;
  
  public async save(params: IUserSaveDTO, config?: IConfigDTO): Promise<IUserDTO | null> {
    return await this.saveUseCase.execute(params, config);
  }
  
  public async read(params: IUserReadDTO, config?: IConfigDTO): Promise<IUserDTO | null> {
    return await this.readUseCase.execute(params, config);
  }
  
  // ... resto de operaciones
}
```

## 📦 Sistema de Importaciones Inteligentes

### ✅ **Importaciones Corregidas (v1.0.5+)**

Weaver CLI ahora genera importaciones inteligentes que distinguen entre código generado y dependencias core:

```typescript
// ✅ user-save-use-case.ts
import { IConfigDTO } from "@bus/core/interfaces";                    // ← Core: mantiene @bus
import { UseCase } from "@bus/core/interfaces/use-case";              // ← Core: mantiene @bus
import { IUserDTO, IUserSaveDTO } from "@platform/domain/models/apis/platform/entities/user";           // ← Generado: usa @platform
import { InjectionPlatformEntitiesUserMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-user-mapper";   // ← Generado: usa @platform
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";  // ← Generado: usa @platform

// ✅ user-entity-mapper.ts
import { Mapper } from "@bus/core/classes";                           // ← Core: mantiene @bus
import { IUserDTO } from "@platform/domain/models/apis/platform/entities/user";     // ← Generado: usa @platform
import { IUserEntity } from "@platform/infrastructure/entities/apis/platform/entities/user";  // ← Generado: usa @platform

// ✅ user-repository.ts
import { IConfigDTO } from "@bus/core/interfaces";                    // ← Core: mantiene @bus
import platformAxios from "@bus/core/axios/platform-axios";          // ← Core: mantiene @bus
import { CONST_PLATFORM_API_ROUTES } from "@bus/core/const";          // ← Core: mantiene @bus
import { IUserRepository } from "@platform/domain/services/repositories/apis/platform/entities/i-user-repository";  // ← Generado: usa @platform
```

### 🎯 **Reglas de Importación**

1. **Archivos Core (mantiene `@bus`):**
   - `@bus/core/interfaces/*`
   - `@bus/core/classes/*`
   - `@bus/core/axios/*`
   - `@bus/core/const/*`
   - `@bus/core/injection/*`

2. **Archivos Generados (usa `@{api-name}`):**
   - `@platform/domain/models/*`
   - `@platform/domain/services/*`
   - `@platform/infrastructure/*`
   - `@platform/facade/*`

### 🔧 **Beneficios**

- **🎯 Consistencia**: Importaciones coherentes en todo el proyecto
- **🔧 Flexibilidad**: Soporte para múltiples APIs (platform, payment, etc.)
- **🛡️ Separación**: Distingue claramente entre código generado y dependencias
- **📦 Modularidad**: Facilita la gestión de múltiples módulos de API

### 📋 **Archivos de Injection Completos**

```typescript
// injection-platform-entities-repository.ts
import { UserRepository } from "../../entities/user";
import { MenuRepository } from "../../entities/menu";

export class InjectionPlatformEntitiesRepository {
  public static UserRepository() { return UserRepository.getInstance(); }
  public static MenuRepository() { return MenuRepository.getInstance(); }
}

// injection-platform-entities-facade.ts  
import { UserFacade } from "@platform/facade/apis/platform/entities/user-facade";
import { MenuFacade } from "@platform/facade/apis/platform/entities/menu-facade";

export class InjectionPlatformEntitiesFacade {
    public static UserFacade() { return UserFacade.getInstance(); }
    public static MenuFacade() { return MenuFacade.getInstance(); }
}
```

¡Ahora el generador produce código que sigue exactamente el mismo patrón que `location` y se integra perfectamente con tu arquitectura existente! 🎉
