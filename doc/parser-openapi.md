# 🔍 Parser OpenAPI Avanzado - Weaver CLI

## 📋 Resumen

Weaver CLI v2.2.0 incluye un **parser OpenAPI completamente reescrito** que maneja especificaciones complejas con precisión y robustez. El parser respeta estrictamente lo que define el OpenAPI sin hacer inferencias incorrectas.

---

## ✨ Características del Parser

### 🎯 **Tipos Dinámicos y Precisos**
- **Respeto total al OpenAPI**: No hace inferencias, sigue exactamente lo que especifica el backend
- **Tipos complejos**: Maneja `anyOf`, `items`, esquemas inline y referencias `$ref`
- **Arrays detectados**: Identifica automáticamente respuestas tipo array para generar `Promise<DTO[] | null>`

### 📋 **Enums con Nomenclatura Estándar**
```typescript
// ✅ Nomenclatura estándar SCREAMING_SNAKE_CASE
export enum AVAILABILITY_APPOINTMENT_TABLE_ENUM {
  EQUALS = "==",
  GREATER_THAN = ">",
  LESS_THAN = "<",
  GREATER_THAN_OR_EQUAL_TO = ">=",
  LIKE = "like",
  IN = "in"
}

// ✅ Uso en DTOs/Entities
interface FilterManagerDTO {
  condition: AVAILABILITY_APPOINTMENT_TABLE_ENUM;
  value?: any;
}
```

### 🔄 **Respuestas de Array Inteligentes**
```typescript
// ✅ El parser detecta automáticamente arrays en responses
interface IAvailabilityRepository {
  // Array response → Promise<DTO[] | null>
  appointmentTable(params: RequestDTO, config: IConfigDTO): Promise<ResponseDTO[] | null>;
  
  // Single response → Promise<DTO | null>  
  scheduleAppointment(params: RequestDTO, config: IConfigDTO): Promise<ResponseDTO | null>;
}

// ✅ Mappers usan el método correcto automáticamente
class AvailabilityRepository {
  async appointmentTable(params: RequestEntity, config: IConfigDTO) {
    const entity = this.resolve.ResolveRequest<ResponseEntity[]>(data);
    if (entity)
      return this.responseMapper.mapFromList(entity); // ← Array: mapFromList()
    return null;
  }
  
  async scheduleAppointment(params: RequestEntity, config: IConfigDTO) {
    const entity = this.resolve.ResolveRequest<ResponseEntity>(data);
    if (entity)
      return this.responseMapper.mapFrom(entity); // ← Single: mapFrom()
    return null;
  }
}
```

---

## 🛠️ Casos Complejos Soportados

### 1. **Esquemas anyOf con Arrays**
```yaml
# OpenAPI Schema
filters:
  anyOf:
    - type: array
      items:
        $ref: "#/components/schemas/FilterManager"
    - type: "null"
```

```typescript
// ✅ Resultado generado
interface RequestDTO {
  filters?: FilterManagerDTO[];
}
```

### 2. **Esquemas Inline con Title**
```yaml
# OpenAPI Schema  
filters:
  anyOf:
    - type: array
      items:
        type: object
        title: "FilterManager"
        properties:
          field: { type: string }
          condition: { type: string, enum: ["==", ">"] }
```

```typescript
// ✅ Genera automáticamente interface + enum
interface FilterManagerDTO {
  field: string;
  condition: FILTER_CONDITION_ENUM;
}

export enum FILTER_CONDITION_ENUM {
  EQUALS = "==",
  GREATER_THAN = ">"
}
```

### 3. **Respuestas con items.properties**
```yaml
# OpenAPI Response
response:
  anyOf:
    - type: array
      items:
        type: object
        properties:
          clientId: { type: string }
          appointmentStart: { type: string, format: date-time }
          appointmentEnd: { type: string, format: date-time }
```

```typescript
// ✅ Extrae campos específicos del array
interface ResponseDTO {
  clientId: string;
  appointmentStart: string; // ← date-time → string
  appointmentEnd: string;   // ← date-time → string
}

// ✅ Repository retorna array
Promise<ResponseDTO[] | null>
```

### 4. **Tipos anyOf con Objetos Vacíos**
```yaml
# OpenAPI Schema
value:
  anyOf:
    - {} # ← Objeto vacío = "any type"
    - type: "null"
```

```typescript
// ✅ Respeta el OpenAPI: any | null
interface FilterDTO {
  value?: any; // ← Sigue exactamente lo que dice el OpenAPI
}
```

---

## 📚 Arquitectura Técnica

### **Función Principal: `parseFieldSchema`**
```typescript
private parseFieldSchema(
  name: string, 
  schema: OpenAPIV3.SchemaObject, 
  requiredFields: string[]
): EntityField {
  // Lógica robusta para:
  // - Arrays con $ref
  // - Esquemas inline con title
  // - anyOf complejos
  // - Enums
  // - Tipos primitivos
}
```

### **Detección de Arrays de Respuesta**
```typescript
// El parser añade automáticamente esta flag
interface BusinessOperation {
  isResponseArray?: boolean; // ← Detectado automáticamente
}

// Usado en generadores para tipos correctos
const responseType = operation.isResponseArray 
  ? `${baseResponseType}[] | null`
  : `${baseResponseType} | null`;
```

### **Conversión de Nombres de Enums**
```typescript
function toScreamingSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toUpperCase().replace(/^_/, '');
}

// AvailabilityAppointmentTableEnum → AVAILABILITY_APPOINTMENT_TABLE_ENUM
```

---

## 🧪 Suite de Tests

### **Tests Unitarios (8 tests)**
```bash
npm test
```

**Cobertura de tests:**
- ✅ Parsing de FilterManager con esquemas complejos
- ✅ anyOf con arrays y $ref
- ✅ Esquemas inline con title  
- ✅ Propiedades específicas (value, initialValue, finalValue)
- ✅ Integration con OpenAPI real
- ✅ Casos edge y arrays vacíos
- ✅ Respuestas de array con items.properties

### **Validación End-to-End**
```bash
node validate-complete-generation.js
```

**Valida automáticamente:**
- ✅ Generación completa de 6 operaciones
- ✅ DTOs/Entities con tipos correctos
- ✅ Enums con nomenclatura SCREAMING_SNAKE_CASE
- ✅ Arrays de respuesta con mappers correctos
- ✅ Campos date-time como string

---

## 🎯 Filosofía del Parser

### **"Fuente de Verdad: OpenAPI"**

El parser v2.2.0 sigue el principio fundamental:

> **"Si el OpenAPI lo define así, el código generado debe respetarlo exactamente"**

**Ejemplos:**
- `anyOf: [{}, {type: "null"}]` → `any | null` (no inferimos `string`)
- `type: array, items: {$ref: FilterManager}` → `FilterManager[]`
- `format: date-time` → `string` (no `Date`)
- `enum: ["==", ">"]` → valores exactos con keys SCREAMING_SNAKE_CASE

### **Sin Inferencias Incorrectas**

❌ **Parser anterior:**
```typescript
// Inferencia incorrecta
value?: string; // ← El OpenAPI dice anyOf: [{}], no string
```

✅ **Parser v2.2.0:**
```typescript
// Respeta el OpenAPI
value?: any; // ← El OpenAPI dice anyOf: [{}] = any type
```

---

## 📈 Beneficios para Desarrolladores

### **1. Código Predecible**
- El código generado coincide exactamente con el contrato del backend
- Sin sorpresas por inferencias incorrectas
- Tipos TypeScript precisos

### **2. Mantenimiento Fácil**
- Cambios en el OpenAPI se reflejan automáticamente
- No hay lógica "mágica" que oculte el comportamiento
- Debugging más simple

### **3. Robustez**
- Maneja cualquier especificación OpenAPI compleja
- Arquitectura preparada para futuros casos edge
- Test suite completa que valida comportamiento

### **4. Estándares de Industria**
- Enums siguen nomenclatura estándar TypeScript
- Respuestas de array con tipos correctos
- Mappers inteligentes según tipo de respuesta

---

## 🔄 Migración desde Versiones Anteriores

### **Si tienes código generado con v2.1.x:**

1. **Regenerar código:**
```bash
weaver → Flujos de Negocio → Seleccionar servicio
```

2. **Verificar tipos:**
- Enums ahora usan `SCREAMING_SNAKE_CASE`
- Algunos campos `string` pueden ser `any` (siguiendo OpenAPI)
- Arrays de respuesta son `Promise<DTO[] | null>`

3. **Actualizar imports:**
```typescript
// Antes
import { AvailabilityAppointmentTableEnum } from "...";

// Después  
import { AVAILABILITY_APPOINTMENT_TABLE_ENUM } from "...";
```

---

## 🤝 Contribuir al Parser

### **Agregar Nuevos Casos Edge**

1. **Crear test unitario:**
```typescript
test('should handle my_edge_case correctly', () => {
  const schema = { /* tu caso específico */ };
  const result = analyzer.parseFieldSchema('fieldName', schema, []);
  expect(result.type).toBe('expected_type');
});
```

2. **Modificar parser si es necesario:**
```typescript
// En parseFieldSchema()
if (/* tu condición específica */) {
  return { /* comportamiento deseado */ };
}
```

3. **Validar con generación real:**
```bash
npm test
node validate-complete-generation.js
```

---

**🔍 Parser OpenAPI Avanzado** - *Precisión y robustez en cada especificación*
