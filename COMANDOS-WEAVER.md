# 🕷️ Comandos de Weaver CLI

## 🚀 Comando Principal

```bash
wc
```
Ejecuta el menú principal de Weaver CLI con autenticación.

## 🧪 Modo de Prueba

```bash
wc --local
```
Ejecuta en modo local - los archivos se generan en `./test-output/src/bus` en lugar del proyecto real.

## 🔑 Gestión de Autenticación

```bash
wc --session-info
```
Muestra información de la sesión actual (estado, fecha de autenticación, días restantes).

```bash
wc --logout
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
   npm install -g weaver-cli
   wc
   # Ingresar clave: soyia
   ```

2. **Uso normal**:
   ```bash
   cd mi-proyecto-frontend
   wc
   # 1. Ingresar URL de OpenAPI/Swagger
   # 2. Seleccionar entidad
   # 3. Confirmar API name
   # 4. ¡Generar!
   ```

3. **Pruebas locales**:
   ```bash
   wc --local
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
