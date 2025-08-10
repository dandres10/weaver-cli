# 🚀 Guía para Publicar Weaver CLI en NPM

## 📋 Requisitos Previos

1. **Cuenta en NPM**: Crear cuenta en [npmjs.com](https://npmjs.com) si no tienes
2. **CLI de NPM**: Asegúrate de tener npm instalado
3. **Repositorio actualizado**: El código debe estar sincronizado con GitHub

## 🔧 Pasos para Publicar

### 1. 🏗️ Preparar el Proyecto

```bash
# Compilar el proyecto
npm run build

# Verificar que el dist/ esté generado
ls dist/
```

### 2. 🔐 Autenticarse en NPM

```bash
# Iniciar sesión en NPM
npm login

# Verificar usuario autenticado
npm whoami
```

### 3. ✅ Verificar Configuración

```bash
# Verificar package.json
npm pack --dry-run

# Esto muestra qué archivos se incluirán en el paquete
```

### 4. 🚀 Publicar Primera Versión

```bash
# Publicar en NPM (primera vez)
npm publish

# Si el nombre está ocupado, cambiar en package.json:
# "name": "@dandres10/weaver-cli"
# npm publish --access public
```

## 📦 Estructura de Archivos Incluidos

Los siguientes archivos se incluirán en el paquete NPM:

```
weaver-cli/
├── dist/                    # ✅ Código compilado
│   ├── cli.js
│   ├── index.js
│   ├── auth/
│   ├── generators/
│   ├── parsers/
│   ├── validators/
│   └── utils/
├── package.json             # ✅ Configuración
├── README.md               # ✅ Documentación
├── COMANDOS-WEAVER.md      # ✅ Guía de comandos
└── ejemplo-uso.md          # ✅ Ejemplos
```

## 🔄 Actualizaciones Futuras

### Actualizar Versión

```bash
# Incrementar versión patch (1.0.0 → 1.0.1)
npm version patch

# Incrementar versión minor (1.0.0 → 1.1.0)
npm version minor

# Incrementar versión major (1.0.0 → 2.0.0)
npm version major

# Publicar nueva versión
npm publish
```

### Sincronizar con GitHub

```bash
# Después de npm version (crea commit y tag automáticamente)
git push origin master --tags
```

## ✅ Verificación Post-Publicación

### 1. Verificar en NPM

- Visitar: https://npmjs.com/package/weaver-cli
- Verificar información, documentación y archivos

### 2. Instalar Globalmente

```bash
# Instalar desde NPM
npm install -g weaver-frontend-cli

# Verificar instalación
weaver --session-info
```

### 3. Probar Funcionalidad

```bash
# Crear directorio de prueba
mkdir test-weaver && cd test-weaver

# Ejecutar Weaver CLI
weaver --local

# Verificar autenticación y generación
```

## 🔧 Comandos de Mantenimiento

### Despublicar (Solo primeras 24 horas)

```bash
# ⚠️ Solo usar en emergencias
npm unpublish weaver-frontend-cli@1.0.0 --force
```

### Ver Información del Paquete

```bash
# Ver info del paquete
npm info weaver-frontend-cli

# Ver versiones publicadas
npm view weaver-frontend-cli versions --json
```

### Gestionar Acceso

```bash
# Ver colaboradores
npm owner ls weaver-frontend-cli

# Agregar colaborador
npm owner add usuario weaver-frontend-cli
```

## 📊 Estadísticas y Monitoreo

### NPM Analytics

- **Descargas**: https://npmjs.com/package/weaver-frontend-cli
- **Dependencias**: Verificar actualizaciones
- **Issues**: Monitorear reportes de usuarios

### GitHub Integration

- **Releases**: Crear releases en GitHub para versiones importantes
- **Issues**: Enlazar issues de NPM con GitHub
- **Documentation**: Mantener README sincronizado

## 🏷️ Tags y Keywords

El package.json incluye keywords para mejor descubrimiento:

```json
{
  "keywords": [
    "weaver",
    "cli",
    "generator",
    "frontend",
    "typescript",
    "clean-architecture",
    "code-generator",
    "entity-generator",
    "swagger",
    "openapi"
  ]
}
```

## 🛡️ Seguridad

### Autenticación de 2 Factores

```bash
# Habilitar 2FA en NPM
npm profile enable-2fa auth-and-writes
```

### Verificar Dependencias

```bash
# Auditar dependencias
npm audit

# Corregir vulnerabilidades automáticamente
npm audit fix
```

## 📈 Promoción

### 1. Documentación

- ✅ README completo en GitHub
- ✅ Ejemplos de uso claros
- ✅ Comandos documentados

### 2. Community

- Crear issues template en GitHub
- Documentar contribuciones
- Establecer code of conduct

### 3. Marketing

- Compartir en redes sociales de desarrollo
- Escribir artículo en Medium/Dev.to
- Presentar en meetups locales

---

## 🎯 Checklist de Publicación

- [ ] ✅ Código compilado correctamente (`npm run build`)
- [ ] ✅ Tests pasando (si existen)
- [ ] ✅ Documentación actualizada
- [ ] ✅ Version incrementada (`npm version`)
- [ ] ✅ Autenticado en NPM (`npm whoami`)
- [ ] ✅ Package.json configurado correctamente
- [ ] ✅ .gitignore incluye `node_modules/` pero NO `dist/`
- [ ] ✅ README con ejemplos claros
- [ ] ✅ Keywords para descubrimiento
- [ ] ✅ Repository URL configurada
- [ ] ✅ License definida

**¡Una vez completado este checklist, 🕷️ Weaver CLI estará listo para conquistar NPM!** 🚀✨
