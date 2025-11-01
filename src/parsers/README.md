# Parsers de Swagger

Este directorio contiene dos parsers de Swagger/OpenAPI especializados para diferentes propósitos.

## 📄 swagger-parser.ts

**Uso**: Entity Flows y Business Flows tradicionales

**Características**:
- Parser estándar de Swagger/OpenAPI
- Extrae entidades y servicios de negocio
- Genera código para operaciones CRUD estándar
- **NO modifica** los schemas del response
- Mantiene la estructura original del Swagger

**Usado por**:
- `correct-entity-flow-generator.ts`
- `business-flow-generator.ts`

**Ejemplo de uso**:
```typescript
import { SwaggerAnalyzer } from './parsers/swagger-parser';

const analyzer = new SwaggerAnalyzer();
await analyzer.loadFromUrl('http://api.example.com/openapi.json');

const entities = analyzer.getAvailableEntities();
const services = analyzer.getAvailableBusinessServices();
```

---

## 🔴 swagger-redux-parser.ts

**Uso**: Redux Flow Generator

**Características**:
- Parser especializado para Redux
- **Extrae automáticamente** el campo `response` de schemas wrapper
- Ignora campos de wrapper (message_type, notification_type, message)
- Retorna solo el schema real de la data
- Ideal para APIs que envuelven responses en objetos wrapper

**Usado por**:
- `redux-flow-generator.ts`
- `handleCreateReduxFlow()` en CLI

**Ejemplo de uso**:
```typescript
import { SwaggerReduxAnalyzer } from './parsers/swagger-redux-parser';

const analyzer = new SwaggerReduxAnalyzer();
await analyzer.loadFromUrl('http://api.example.com/openapi.json');

// Extrae automáticamente el campo "response"
const responseSchema = analyzer.getResponseSchema('/api/users', 'post');
// Solo retorna los campos del schema real, sin el wrapper
```

### 🔍 Extracción Automática del Campo "response"

Muchos endpoints de Swagger envuelven la respuesta real en un objeto wrapper:

**Schema Original en Swagger**:
```json
{
  "message_type": "SUCCESS",
  "notification_type": "INFO", 
  "message": "Operación exitosa",
  "response": [
    {
      "id": "123",
      "name": "Usuario",
      "email": "user@example.com"
    }
  ]
}
```

**Lo que extrae swagger-parser.ts** (parser estándar):
```javascript
{
  isArray: false,
  fields: [
    { name: 'message_type', type: 'enum' },
    { name: 'notification_type', type: 'enum' },
    { name: 'message', type: 'string' },
    { name: 'response', type: 'array' }
  ]
}
// ❌ Incluye campos del wrapper
```

**Lo que extrae swagger-redux-parser.ts** (parser Redux):
```javascript
🔍 Detectado campo "response" en el schema, extrayendo automáticamente...
✅ Usando array del campo "response"

{
  isArray: true,
  fields: [
    { name: 'id', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'email', type: 'string' }
  ]
}
// ✅ Solo campos del schema real
```

### Ventajas de la Separación

1. **Mantiene la compatibilidad**: Los flows existentes (Entity/Business) siguen funcionando sin cambios
2. **Especialización**: Cada parser está optimizado para su caso de uso
3. **Claridad**: El código de Redux no contamina el parser estándar
4. **Mantenibilidad**: Más fácil de mantener y extender cada parser por separado

---

## 🤔 ¿Cuál usar?

| Parser | Cuándo usarlo |
|--------|---------------|
| `swagger-parser.ts` | Entity Flows, Business Flows tradicionales |
| `swagger-redux-parser.ts` | Redux Flow Generator |

**Regla simple**: 
- Si estás generando **Redux flows** → usa `SwaggerReduxAnalyzer`
- Para todo lo demás → usa `SwaggerAnalyzer`

---

## 📝 Notas Técnicas

- Ambos parsers extienden de `@apidevtools/swagger-parser`
- Ambos soportan OpenAPI 3.0.x y 3.1.x
- Ambos exportan las mismas interfaces base (`EntityField`, `EntitySchema`)
- Solo `swagger-redux-parser.ts` exporta `ResponseSchema` y `Operation`

