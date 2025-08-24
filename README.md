# 🕷️ Weaver CLI

**Teje la estructura perfecta de tu código frontend**

Un generador de código CLI inteligente que lee especificaciones OpenAPI/Swagger y genera automáticamente toda la estructura de entidades siguiendo principios de Clean Architecture.

---

## 🚀 Instalación Rápida

```bash
npm install -g weaver-frontend-cli
```

## 🎯 Uso Básico

```bash
weaver
```

### 🔑 Autenticación
Al ejecutar por primera vez, se te pedirá una clave de acceso. La sesión será válida por 30 días.

### 🧪 Modo de Prueba
```bash
weaver --local
```

---

## ✨ Características Principales

- **🏗️ Clean Architecture**: 42+ archivos por entidad
- **🔍 Parser OpenAPI Avanzado**: Lectura inteligente de especificaciones complejas
- **🎯 Dos tipos de generación**: Entidades CRUD + Flujos de Negocio
- **📋 Enums SCREAMING_SNAKE_CASE**: Nomenclatura estándar TypeScript
- **🔄 Arrays de Respuesta**: Soporte completo para `Promise<DTO[] | null>`
- **🔐 Sistema de Autenticación**: Acceso controlado
- **🧹 Sistema de Limpieza**: Eliminación inteligente
- **🧪 Modo Local**: Pruebas seguras
- **🧪 Suite de Tests**: Validación completa automatizada

---

## 📚 Documentación Completa

La documentación está organizada en la carpeta `doc/` para mejor accesibilidad:

### 📖 [Documentación Principal](./doc/main.md)
**Índice completo de toda la documentación con acceso rápido por categorías**

### 🚀 Guías Esenciales
- **[Comandos de Weaver](./doc/COMANDOS-WEAVER.md)** - Lista completa de comandos
- **[Ejemplo de Uso](./doc/ejemplo-uso.md)** - Tutorial paso a paso
- **[Estructura Generada](./doc/estructura-generada-correcta.md)** - Arquitectura detallada

### 🔧 Para Desarrolladores
- **[Prompt para Cambios](./doc/PROMPT-PARA-CAMBIOS.md)** - Contexto del proyecto
- **[Publicar en NPM](./doc/PUBLICAR-NPM.md)** - Guía de publicación
- **[Changelog](./doc/CHANGELOG.md)** - Historial de versiones

---

## 🎯 Casos de Uso

### 🏗️ Generación CRUD
Genera estructura completa para entidades como `User`, `Company`, `Product`:
```bash
weaver → Entidades → Seleccionar entidad
```

### 💼 Flujos de Negocio
Genera servicios complejos como `Auth`, `Payment`, `Notification`:
```bash
weaver → Flujos de Negocio → Seleccionar servicio
```

---

## 📊 Estado del Proyecto

- **Versión**: v2.2.0 (Diciembre 2024)
- **Estado**: ✅ Producción
- **Arquitectura**: Clean Architecture completa
- **Soporte**: CRUD + Business Flows + Parser OpenAPI Avanzado

---

## 🛠️ Comandos Útiles

```bash
weaver --session-info    # Ver información de sesión
weaver --logout         # Cerrar sesión
weaver --local          # Modo de prueba
```

---

## 🤝 Contribuir

Para contribuir al proyecto, consulta la [documentación completa](./doc/main.md) que incluye el contexto técnico necesario.

---

## 📄 Licencia

MIT © Andrés León

---

**🕷️ Weaver CLI** - *Tejiendo el futuro del desarrollo frontend*

> **💡 Tip**: Comienza con la [documentación principal](./doc/main.md) para obtener acceso organizado a todas las guías y referencias.
