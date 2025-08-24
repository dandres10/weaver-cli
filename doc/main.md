# 🕷️ Weaver CLI - Documentación Completa

**Teje la estructura perfecta de tu código frontend**

Un generador de código CLI inteligente que lee especificaciones OpenAPI/Swagger y genera automáticamente toda la estructura de entidades siguiendo principios de Clean Architecture.

---

## 📚 Índice de Documentación

### 📖 Documentación Principal
- **[README](./README.md)** - Documentación principal del proyecto con instalación y uso
- **[Estructura Generada Correcta](./estructura-generada-correcta.md)** - Documentación detallada de la arquitectura y patrones generados
- **[Parser OpenAPI Avanzado](./parser-openapi.md)** - Documentación técnica del sistema de parsing OpenAPI/Swagger

### 🚀 Guías de Uso
- **[Comandos de Weaver](./COMANDOS-WEAVER.md)** - Lista completa de comandos disponibles y su uso
- **[Ejemplo de Uso](./ejemplo-uso.md)** - Tutorial paso a paso con ejemplos prácticos

### 🔧 Desarrollo y Mantenimiento
- **[Prompt para Cambios](./PROMPT-PARA-CAMBIOS.md)** - Contexto completo del proyecto para modificaciones
- **[Publicar en NPM](./PUBLICAR-NPM.md)** - Guía completa para publicar y mantener el paquete NPM
- **[Changelog](./CHANGELOG.md)** - Historial detallado de versiones y cambios

---

## 🎯 Acceso Rápido por Categorías

### 🆕 ¿Primera vez con Weaver CLI?
1. **Comienza aquí**: [README](./README.md) - Instalación y conceptos básicos
2. **Sigue con**: [Ejemplo de Uso](./ejemplo-uso.md) - Tutorial práctico paso a paso
3. **Consulta**: [Comandos](./COMANDOS-WEAVER.md) - Referencia rápida de comandos

### 🏗️ ¿Quieres entender la arquitectura?
1. **Estructura Completa**: [Estructura Generada Correcta](./estructura-generada-correcta.md)
2. **Parser OpenAPI**: [Parser OpenAPI Avanzado](./parser-openapi.md) - Cómo funciona el parsing de especificaciones
3. **Patrones Implementados**: Ver secciones de Clean Architecture
4. **Ejemplos de Código**: Revisar templates y casos de uso

### 🔧 ¿Vas a desarrollar o modificar Weaver CLI?
1. **Contexto del Proyecto**: [Prompt para Cambios](./PROMPT-PARA-CAMBIOS.md)
2. **Historial de Cambios**: [Changelog](./CHANGELOG.md)
3. **Publicación**: [Publicar en NPM](./PUBLICAR-NPM.md)

---

## 🚀 Características Principales

### ✨ Lo que hace Weaver CLI
- **🏗️ Clean Architecture**: 42+ archivos por entidad siguiendo principios SOLID
- **🔍 Parser OpenAPI Avanzado**: Manejo robusto de esquemas complejos (`anyOf`, `$ref`, inline schemas)
- **📋 Enums SCREAMING_SNAKE_CASE**: Nomenclatura estándar TypeScript con valores exactos del backend
- **🔄 Arrays de Respuesta**: Detección automática con `mapFromList()` vs `mapFrom()`
- **🎯 Dos tipos de generación**:
  - **Entidades CRUD**: DTOs, Use Cases, Repositories, Facades completos
  - **Flujos de Negocio**: Servicios complejos con mappers anidados
- **🧪 Testing Robusto**: 8 tests unitarios + validación end-to-end automática
- **🔐 Sistema de Autenticación**: Acceso controlado con clave de sesión
- **🧹 Sistema de Limpieza**: Eliminación inteligente de código generado

### 🎯 Casos de Uso Principales
- **Generación CRUD**: `User`, `Company`, `Product` → Estructura completa de entidades
- **Flujos de Negocio**: `Auth` (login, logout, refresh), `Payment`, `Notification`
- **APIs Múltiples**: Soporte para `platform`, `payment`, `core`, etc.
- **Proyectos Existentes**: Integración con arquitecturas existentes

---

## 📋 Estructura de la Documentación

```
doc/
├── main.md                           # 📍 Este archivo - Índice principal
├── README.md                         # 📖 Documentación principal
├── estructura-generada-correcta.md   # 🏗️ Arquitectura y patrones
├── COMANDOS-WEAVER.md                # 🚀 Comandos y uso
├── ejemplo-uso.md                    # 🧪 Tutorial paso a paso
├── PROMPT-PARA-CAMBIOS.md            # 🔧 Contexto para desarrollo
├── PUBLICAR-NPM.md                   # 📦 Guía de publicación
└── CHANGELOG.md                      # 📋 Historial de versiones
```

---

## 🔗 Enlaces Rápidos

### 🛠️ Instalación y Uso
```bash
# Instalar Weaver CLI
npm install -g weaver-frontend-cli

# Usar en tu proyecto
weaver

# Modo de prueba
weaver --local
```

### 📊 Estado del Proyecto
- **Versión Actual**: v2.2.0 (Diciembre 2024)
- **Estado**: ✅ Producción - Sistema completo y robusto
- **Características**: Clean Architecture + Parser OpenAPI Avanzado + Enums SCREAMING_SNAKE_CASE

### 🆘 Soporte
- **Autenticación**: Clave `soyia` (válida 30 días)
- **Comandos de Ayuda**: `weaver --session-info`, `weaver --logout`
- **Modo Seguro**: `weaver --local` para pruebas

---

## 💡 Tips de Navegación

### 📖 Para Lectura Lineal
1. [README](./README.md) → Visión general
2. [Ejemplo de Uso](./ejemplo-uso.md) → Práctica
3. [Estructura Generada](./estructura-generada-correcta.md) → Profundización

### 🔍 Para Consulta Rápida
- **Comandos**: [COMANDOS-WEAVER.md](./COMANDOS-WEAVER.md)
- **Novedades**: [CHANGELOG.md](./CHANGELOG.md)
- **Desarrollo**: [PROMPT-PARA-CAMBIOS.md](./PROMPT-PARA-CAMBIOS.md)

### 🎯 Para Casos Específicos
- **Primera instalación**: README → Instalación
- **Problema con comandos**: COMANDOS-WEAVER → Troubleshooting
- **Entender código generado**: Estructura Generada → Patrones
- **Publicar nueva versión**: PUBLICAR-NPM → Guía completa

---

**🕷️ Weaver CLI** - *Tejiendo el futuro del desarrollo frontend*

> **Nota**: Esta documentación está organizada para proporcionar acceso fácil y contextual a toda la información del proyecto. Cada documento tiene un propósito específico y se complementa con los demás para ofrecer una experiencia completa de documentación.
