# 🕷️ Comandos de Weaver CLI

## 🚀 Comando Principal

```bash
weaver
```
Ejecuta el menú principal de Weaver CLI con autenticación.

## 🧪 Modo de Prueba

```bash
weaver --local
```
Ejecuta en modo local - los archivos se generan en `./test-output/src/bus` en lugar del proyecto real.

## 🔑 Gestión de Autenticación

```bash
weaver --session-info
```
Muestra información de la sesión actual (estado, fecha de autenticación, días restantes).

```bash
weaver --logout
```
Cierra la sesión actual y sale de la aplicación.

## 📦 Scripts NPM (Desarrollo)

```bash
npm run build          # Compilar TypeScript
npm run dev            # Modo desarrollo con watch
npm start              # Ejecutar CLI directamente
npm run test:local     # Compilar y ejecutar en modo local
npm run logout         # Compilar y cerrar sesión
npm run session-info   # Compilar y mostrar info de sesión
```

## 🔐 Autenticación

- **Clave de acceso**: `soyia`
- **Duración de sesión**: 30 días
- **Archivo de configuración**: `~/.weaver-cli-auth` (solo lectura del usuario)

## 🎯 Flujo de Uso Típico

1. **Primera vez**:
   ```bash
   npm install -g weaver-frontend-cli
   weaver
   # Ingresar clave: soyia
   ```

2. **Uso normal**:
   ```bash
   cd mi-proyecto-frontend
   weaver
   # 1. Ingresar URL de OpenAPI/Swagger
   # 2. Seleccionar entidad
   # 3. Confirmar API name
   # 4. ¡Generar!
   ```

3. **Pruebas locales**:
   ```bash
   weaver --local
   # Los archivos se generan en ./test-output/
   ```

## 🎨 Características del CLI

- ✅ **Interfaz interactiva** con menús
- ✅ **Colores y emojis** para mejor UX
- ✅ **Validaciones previas** antes de generar
- ✅ **Confirmaciones** para evitar sobrescribir
- ✅ **Detección automática** de API names
- ✅ **Modo seguro** con autenticación

---

**🕷️ Weaver CLI** - *Tejiendo el futuro del desarrollo frontend*
