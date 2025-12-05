# Scripts de Prueba Local

Scripts para probar y debuggear el generador sin usar la CLI interactiva.

## Uso

### 1. Analizar Swagger completo
```bash
npx ts-node scripts/test-swagger-analyzer.ts
```

### 2. Generar flujo de negocio
```bash
# Genera Auth completo
npx ts-node scripts/test-generate-business-flow.ts

# Genera un servicio específico
npx ts-node scripts/test-generate-business-flow.ts Auth

# Genera solo operaciones que contengan "delete-user"
npx ts-node scripts/test-generate-business-flow.ts Auth delete-user
```

### 3. Analizar una operación específica
```bash
npx ts-node scripts/test-single-operation.ts delete-user-internal
```

## Swagger URL por defecto

Todos los scripts usan por defecto:
```
http://backend-platform-prod-env.eba-dddmvypu.us-east-1.elasticbeanstalk.com/openapi.json
```

## Output

Los archivos generados se guardan en `test-output/platform/`

