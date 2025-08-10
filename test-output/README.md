# 🧪 Directorio de Pruebas Locales

Este directorio contiene los archivos generados en **modo local** para pruebas y verificación.

## 🎯 Propósito

- **Verificar** que el generador funciona correctamente
- **Revisar** la estructura de archivos antes de generar en el proyecto real
- **Testear** diferentes entidades sin afectar el código de producción

## 📁 Estructura

Los archivos se generan siguiendo la misma estructura que en el proyecto real:

```
test-output/
└── src/
    └── bus/
        ├── domain/
        ├── infrastructure/
        └── facade/
```

## 🚀 Comandos

- **Modo Local**: `npm run test:local` - Genera archivos aquí
- **Modo Producción**: `npm run test:generate` - Genera en el proyecto real

## 🔍 Verificación

Después de generar una entidad, puedes:

1. Revisar los archivos generados
2. Verificar que la estructura sea correcta
3. Comprobar que los tipos TypeScript sean precisos
4. Validar que siga el patrón del flujo `location`

## ⚠️ Nota Importante

Este directorio es solo para pruebas. Los archivos aquí **NO** se utilizan en el proyecto real.
