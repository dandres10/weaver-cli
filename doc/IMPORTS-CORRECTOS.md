# 📋 Patrones de Imports Correctos

## ✅ Reglas Generales

### 1. **Dependencias Core → `@core`**
Todas las importaciones de dependencias del framework usan el alias `@core`:

```typescript
import { IConfigDTO } from "@core/interfaces/i-config-repository-dto";
import { UseCase } from "@core/interfaces/use-case";
import { Mapper } from "@core/classes";
import platformAxios from "@core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@core/const";
import { InjectionCore } from "@core/injection/injection-core";
import { IPaginationBackendDTO } from "@core/interfaces/i-pagination-backend-dto";
import { Response } from "@core/interfaces/response";
import { CONST_CORE_DTO } from "@core/const/const-core";
```

### 2. **Código Generado → `@{apiName}`**
Todo el código generado por Weaver usa el alias de la API:

```typescript
// Para API "platform"
import { ILocationDTO } from "@platform/domain/models/apis/platform/entities/location";
import { IAuthLoginRequestDTO } from "@platform/domain/models/apis/platform/business/auth";

// Para API "payment" 
import { IPaymentDTO } from "@payment/domain/models/apis/payment/entities/payment";
```

---

## 📦 Patrones por Tipo de Archivo

### 🎯 Use Cases (Entities)

**Ubicación**: `domain/services/use_cases/apis/{apiName}/entities/{entityName}/`

```typescript
import { IConfigDTO } from "@core/interfaces/i-config-repository-dto";
import { UseCase } from "@core/interfaces/use-case";
import { ILocationDTO, ILocationSaveDTO } from "@platform/domain/models/apis/platform/entities/location";
import { InjectionPlatformEntitiesLocationMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-location-mapper";
import { InjectionPlatformEntitiesRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/entities/injection-platform-entities-repository";

export class LocationSaveUseCase implements UseCase<ILocationSaveDTO, ILocationDTO | null> {
  // ... implementation
}
```

### 💼 Use Cases (Business)

**Ubicación**: `domain/services/use_cases/apis/{apiName}/business/{serviceName}/`

```typescript
import { IConfigDTO } from "@core/interfaces/i-config-repository-dto";
import { UseCase } from "@core/interfaces/use-case";
import { IAuthLoginRequestDTO, IAuthLoginResponseDTO } from "@platform/domain/models/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthLoginMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-login-mapper";
import { InjectionPlatformBusinessRepository } from "@platform/infrastructure/repositories/apis/platform/repositories/injection/business/injection-platform-business-repository";

export class AuthLoginUseCase implements UseCase<IAuthLoginRequestDTO, IAuthLoginResponseDTO | null> {
  // ... implementation
}
```

### 🗺️ Mappers (Entities)

**Ubicación**: `infrastructure/mappers/apis/{apiName}/entities/{entityName}/`

```typescript
import { Mapper } from "@core/classes";
import { ILocationSaveDTO } from "@platform/domain/models/apis/platform/entities/location";
import { ILocationSaveEntity } from "@platform/infrastructure/entities/apis/platform/entities/location";

export class LocationSaveMapper extends Mapper<ILocationSaveEntity, ILocationSaveDTO> {
  // ... implementation
}
```

### 🗺️ Mappers (Business)

**Ubicación**: `infrastructure/mappers/apis/{apiName}/business/{serviceName}/{operationName}/`

```typescript
import { Mapper } from "@core/classes";
import { IAuthLoginRequestDTO } from "@platform/domain/models/apis/platform/business/auth";
import { IAuthLoginRequestEntity } from "@platform/infrastructure/entities/apis/platform/business/auth";

export class AuthLoginRequestMapper extends Mapper<IAuthLoginRequestEntity, IAuthLoginRequestDTO> {
  // ... implementation
}
```

### 🏪 Repositories (Entities)

**Ubicación**: `infrastructure/repositories/apis/{apiName}/repositories/entities/{entityName}/`

```typescript
import { IConfigDTO } from "@core/interfaces/i-config-repository-dto";
import platformAxios from "@core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@core/const/const-platform-api-routes";
import { CONST_CORE_DTO } from "@core/const/const-core";
import { InjectionCore } from "@core/injection/injection-core";
import { ILocationRepository } from "@platform/domain/services/repositories/apis/platform/entities/i-location-repository";
import { IPaginationBackendDTO } from "@core/interfaces/i-pagination-backend-dto";
import { ILocationDTO } from "@platform/domain/models/apis/platform/entities/location";
import {
  ILocationDeleteEntity,
  ILocationEntity,
  ILocationReadEntity,
  ILocationSaveEntity,
  ILocationUpdateEntity,
} from "@platform/infrastructure/entities/apis/platform/entities/location";
import { InjectionPlatformEntitiesLocationMapper } from "@platform/infrastructure/mappers/apis/platform/injection/entities/injection-platform-entities-location-mapper";

export class LocationRepository extends ILocationRepository {
  // ... implementation
}
```

### 🏪 Repositories (Business)

**Ubicación**: `infrastructure/repositories/apis/{apiName}/repositories/business/{serviceName}/`

```typescript
import { IConfigDTO } from "@core/interfaces/i-config-repository-dto";
import { Response } from "@core/interfaces/response";
import platformAxios from "@core/axios/platform-axios";
import { CONST_PLATFORM_API_ROUTES } from "@core/const";
import { CONST_CORE_DTO } from "@core/const/const-core";
import { InjectionCore } from "@core/injection/injection-core";
import { IAuthRepository } from "@platform/domain/services/repositories/apis/platform/business/i-auth-repository";
import {
  IAuthLoginResponseDTO,
  IAuthRefreshTokenResponseDTO,
  IAuthLogoutResponseDTO,
  IAuthCreateApiTokenResponseDTO,
} from "@platform/domain/models/apis/platform/business/auth";
import {
  IAuthLoginRequestEntity,
  IAuthLoginResponseEntity,
  IAuthRefreshTokenResponseEntity,
  IAuthLogoutResponseEntity,
  IAuthCreateApiTokenRequestEntity,
  IAuthCreateApiTokenResponseEntity,
} from "@platform/infrastructure/entities/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthLoginMapper } from "@platform/infrastructure/mappers/apis/platform/injection/business/auth/injection-platform-business-auth-login-mapper";

export class AuthRepository extends IAuthRepository {
  // ... implementation
}
```

### 🎭 Facades (Entities)

**Ubicación**: `facade/apis/{apiName}/entities/`

```typescript
import { IConfigDTO } from "@core/interfaces/i-config-repository-dto";
import {
  ILocationDTO,
  ILocationDeleteDTO,
  ILocationReadDTO,
  ILocationSaveDTO,
  ILocationUpdateDTO,
} from "@platform/domain/models/apis/platform/entities/location";
import { IPaginationBackendDTO } from "@core/interfaces/i-pagination-backend-dto";
import { InjectionPlatformEntitiesLocationUseCase } from "@platform/domain/services/use_cases/apis/platform/injection/entities/injection-platform-entities-location-use-case";

export class LocationFacade {
  // ... implementation
}
```

### 🎭 Facades (Business)

**Ubicación**: `facade/apis/{apiName}/business/`

```typescript
import { IConfigDTO } from "@core/interfaces/i-config-repository-dto";
import {
  IAuthLoginRequestDTO,
  IAuthLoginResponseDTO,
  IAuthRefreshTokenResponseDTO,
  IAuthLogoutResponseDTO,
  IAuthCreateApiTokenRequestDTO,
  IAuthCreateApiTokenResponseDTO,
} from "@platform/domain/models/apis/platform/business/auth";
import { InjectionPlatformBusinessAuthUseCase } from "@platform/domain/services/use_cases/apis/platform/injection/business/injection-platform-business-auth-use-case";

export class AuthFacade {
  // ... implementation
}
```

---

## 🔄 Cambios Necesarios

### ❌ Incorrecto (lo que genera actualmente)

```typescript
import { IConfigDTO } from "@bus/core/interfaces";
import { UseCase } from "@bus/core/interfaces/use-case";
import { Mapper } from "@bus/core/classes";
```

### ✅ Correcto (lo que debe generar)

```typescript
import { IConfigDTO } from "@core/interfaces/i-config-repository-dto";
import { UseCase } from "@core/interfaces/use-case";
import { Mapper } from "@core/classes";
```

---

## 📝 Resumen de Aliases

| Tipo | Alias | Ejemplo |
|------|-------|---------|
| Core Framework | `@core` | `@core/interfaces/use-case` |
| API Platform | `@platform` | `@platform/domain/models/...` |
| API Payment | `@payment` | `@payment/domain/models/...` |
| API Custom | `@{apiName}` | `@custom/domain/models/...` |

---

**🕷️ Weaver CLI** - *Generando imports correctos y consistentes*

