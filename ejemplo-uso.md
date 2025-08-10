# Ejemplo de Uso: Goluti Frontend Generator

## Paso a Paso

### 1. Ejecutar el generador
```bash
goluti-gen
```

### 2. Seleccionar "Crear flujo entity"
El menú mostrará:
```
🚀 Goluti Frontend Generator
Generador de código para arquitectura frontend

? ¿Qué deseas generar?
❯ 🏗️  Crear flujo entity
  🚪 Salir
```

### 3. Ingresar URL del Swagger
```
? URL del OpenAPI/Swagger JSON: http://backend-platform-prod-env.eba-dddmvypu.us-east-1.elasticbeanstalk.com/openapi.json
```

### 4. El sistema analizará automáticamente el OpenAPI
```
🔍 Analizando OpenAPI...
🔍 Descargando OpenAPI desde: http://backend-platform-prod-env.eba-dddmvypu.us-east-1.elasticbeanstalk.com/openapi.json
✅ OpenAPI cargado exitosamente
✅ Se encontraron 12 entidades disponibles
```

### 5. Seleccionar entidad de la lista
Basado en el swagger proporcionado, verás entidades como:
```
? Selecciona la entidad a generar:
❯ ApiToken
  Company
  Currency
  CurrencyLocation
  Language
  Location
  Permission
  Platform
  Rol
  RolPermission
  Translation
  User
  UserLocationRol
  📝 Ingresar nombre personalizado
```

### 6. Ver información de la entidad seleccionada
Por ejemplo, si seleccionas "User":
```
📋 Información de la entidad: User

🔧 Operaciones disponibles:
  • Crear: ✅
  • Leer: ✅
  • Actualizar: ✅
  • Eliminar: ❌
  • Listar: ✅

📊 Campos (9):
  🔴 id: string - Identificador único
  🔴 platform_id: string - ID de la plataforma
  🔴 password: string - Contraseña
  🔴 email: string - Email del usuario
  🔴 identification: string - Identificación
  🔵 first_name: string - Primer nombre
  🔵 last_name: string - Apellido
  🔵 phone: string - Teléfono
  🔵 refresh_token: string - Token de actualización
  🔴 state: boolean - Estado activo/inactivo
```

### 7. Confirmar generación
```
? ¿Generar flujo completo para la entity "User"? (Y/n)
```

### 8. Archivos generados automáticamente
```
🔧 Generando flujo para User...
📂 Directorio creado/verificado: /Users/andresleonleon/Documents/goluti-frontend/src/bus/domain/models/apis/platform/entities
📂 Directorio creado/verificado: /Users/andresleonleon/Documents/goluti-frontend/src/bus/domain/services/repositories/apis/platform
...
✅ Modelo de dominio: i-user-model.ts
✅ Repository interface: i-user-repository.ts
✅ Use case: user-use-case.ts
✅ Infrastructure entity: user-entity.ts
✅ Mapper: user-mapper.ts
✅ Repository implementation: user-repository.ts
✅ Facade: user-facade.ts
✅ Injection: injection-user-facade.ts

✅ Flujo User generado exitosamente!
```

## Archivos Generados

### Domain Layer
```typescript
// i-user-model.ts
export interface IUserModel {
  id: string;
  platformId: string;
  password: string;
  email: string;
  identification: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  refreshToken?: string;
  state: boolean;
}

export interface IUserCreateModel {
  platformId: string;
  password: string;
  email: string;
  identification: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  refreshToken?: string;
  state?: boolean;
}

export interface IUserUpdateModel {
  id: string;
  platformId?: string;
  password?: string;
  email?: string;
  identification?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  refreshToken?: string;
  state?: boolean;
}
```

### Infrastructure Layer
Se generan automáticamente:
- Entidades con los campos exactos del API
- Mappers que convierten entre domain e infrastructure
- Repository implementation con endpoints correctos

### Facade Layer
- Facade con métodos basados en las operaciones disponibles
- Injection configuration para DI

## Ventajas del Nuevo Enfoque

1. **🎯 Precisión**: Los tipos y campos son exactos al API
2. **⚡ Velocidad**: No necesitas escribir manualmente cada campo
3. **🔄 Consistencia**: Siempre sincronizado con el backend
4. **📝 Documentación**: Incluye descripciones del swagger
5. **🛡️ Validación**: Tipos TypeScript precisos y validaciones de negocio
6. **🚀 Operaciones reales**: Solo genera métodos para operaciones que existen en el API
