#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { createCorrectEntityFlow } from './generators/correct-entity-flow-generator';
import { createBusinessFlow } from './generators/business-flow-generator';
import { detectGeneratedEntities, cleanupEntity } from './generators/cleanup-generator';
import { SwaggerAnalyzer } from './parsers/swagger-parser';
import { ProjectValidator } from './validators/project-validator';
import { AuthManager } from './auth/auth-manager';
import { DirectoryDetector } from './utils/directory-detector';
import * as path from 'path';
import * as fs from 'fs-extra';

interface MenuChoice {
  name: string;
  value: string;
}

const menuChoices: MenuChoice[] = [
  {
    name: '🏗️  Crear flujo entity',
    value: 'create-entity-flow'
  },
  {
    name: '💼 Crear flujo de negocio',
    value: 'create-business-flow'
  },
  {
    name: '🧹 Limpiar/Eliminar código generado',
    value: 'cleanup'
  },
  {
    name: '📊 Ver información de sesión',
    value: 'session-info'
  },
  {
    name: '🚪 Cerrar sesión y salir',
    value: 'logout'
  },
  {
    name: '🚪 Salir',
    value: 'exit'
  }
];

async function showMainMenu(isLocalMode: boolean = false): Promise<void> {
  console.log(chalk.blue.bold('\n🕷️  WEAVER CLI'));
  console.log(chalk.gray('Teje la estructura perfecta de tu código frontend\n'));

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: '¿Qué deseas generar?',
      choices: menuChoices,
      pageSize: 10
    }
  ]);

  switch (action) {
    case 'create-entity-flow':
      await handleCreateEntityFlow(isLocalMode);
      break;
    case 'create-business-flow':
      await handleCreateBusinessFlow(isLocalMode);
      break;
    case 'cleanup':
      await handleCleanup(isLocalMode);
      break;
    case 'session-info':
      await AuthManager.showSessionInfo();
      await showMainMenu(isLocalMode);
      break;
    case 'logout':
      await AuthManager.logout();
      console.log(chalk.green('\n👋 ¡Hasta luego!'));
      process.exit(0);
      break;
    case 'exit':
      console.log(chalk.green('\n👋 ¡Hasta luego!'));
      process.exit(0);
      break;
    default:
      console.log(chalk.red('Opción no válida'));
      await showMainMenu(isLocalMode);
  }
}

async function handleCreateEntityFlow(isLocalMode: boolean = false): Promise<void> {
  try {
    console.log(chalk.yellow('\n📋 Configurando flujo entity...'));

    // 🔍 DETECTAR DIRECTORIO ACTUAL Y APIs DISPONIBLES
    console.log(chalk.blue('🔍 Analizando estructura del directorio...'));
    const directoryInfo = await DirectoryDetector.detectCurrentApi();
    
    if (directoryInfo.currentApiName) {
      console.log(chalk.green(`✅ API detectada en directorio actual: ${directoryInfo.currentApiName}`));
    } else {
      console.log(chalk.yellow('⚠️  No se detectó estructura de API en el directorio actual'));
    }

    if (directoryInfo.possibleApiNames.length > 0) {
      console.log(chalk.gray(`📁 APIs disponibles: ${directoryInfo.possibleApiNames.join(', ')}`));
    }

    // 1. Solicitar URL del OpenAPI/Swagger
    const { swaggerUrl } = await inquirer.prompt([
      {
        type: 'input',
        name: 'swaggerUrl',
        message: 'URL del OpenAPI/Swagger JSON:',
        default: 'http://backend-platform-prod-env.eba-dddmvypu.us-east-1.elasticbeanstalk.com/openapi.json',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'La URL del swagger es requerida';
          }
          try {
            new URL(input.trim());
            return true;
          } catch {
            return 'Por favor ingresa una URL válida';
          }
        }
      }
    ]);

    // Cargar y analizar el swagger
    console.log(chalk.blue('\n🔍 Analizando OpenAPI...'));
    const swaggerAnalyzer = new SwaggerAnalyzer();

    try {
      await swaggerAnalyzer.loadFromUrl(swaggerUrl.trim());
    } catch (error) {
      console.error(chalk.red('\n❌ Error cargando el swagger:'), error);
      return await handleCreateEntityFlow(isLocalMode);
    }

    const availableEntities = swaggerAnalyzer.getAvailableEntities();

    if (availableEntities.length === 0) {
      console.log(chalk.yellow('\n⚠️  No se encontraron entidades en el swagger'));
      return await showMainMenu(isLocalMode);
    }

    console.log(chalk.green(`\n✅ Se encontraron ${availableEntities.length} entidades disponibles`));

    // 🔗 CONFIGURAR NOMBRE DE LA API
    const detectedApiName = swaggerAnalyzer.getDetectedApiName();
    const suggestedNames = swaggerAnalyzer.suggestApiNames();

    let apiName: string;

    if (detectedApiName) {
      const { useDetectedApi } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'useDetectedApi',
          message: `¿Usar la API detectada "${detectedApiName}"?`,
          default: true
        }
      ]);

      if (useDetectedApi) {
        apiName = detectedApiName;
      } else {
        const { selectedApiName } = await inquirer.prompt([
          {
            type: 'list',
            name: 'selectedApiName',
            message: 'Selecciona el nombre de la API:',
            choices: [
              ...suggestedNames.map(name => ({ name, value: name })),
              { name: '📝 Ingresar nombre personalizado', value: 'custom' }
            ]
          }
        ]);

        if (selectedApiName === 'custom') {
          const { customApiName } = await inquirer.prompt([
            {
              type: 'input',
              name: 'customApiName',
              message: 'Nombre de la API:',
              validate: (input: string) => {
                if (!input.trim()) {
                  return 'El nombre de la API es requerido';
                }
                if (!/^[a-z][a-z0-9-]*$/.test(input.trim())) {
                  return 'El nombre debe empezar con minúscula y solo contener letras, números y guiones';
                }
                return true;
              }
            }
          ]);
          apiName = customApiName.trim();
        } else {
          apiName = selectedApiName;
        }
      }
    } else {
      const { selectedApiName } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedApiName',
          message: 'No se pudo detectar automáticamente. Selecciona el nombre de la API:',
          choices: [
            ...suggestedNames.map(name => ({ name, value: name })),
            { name: '📝 Ingresar nombre personalizado', value: 'custom' }
          ]
        }
      ]);

      if (selectedApiName === 'custom') {
        const { customApiName } = await inquirer.prompt([
          {
            type: 'input',
            name: 'customApiName',
            message: 'Nombre de la API:',
            validate: (input: string) => {
              if (!input.trim()) {
                return 'El nombre de la API es requerido';
              }
              if (!/^[a-z][a-z0-9-]*$/.test(input.trim())) {
                return 'El nombre debe empezar con minúscula y solo contener letras, números y guiones';
              }
              return true;
            }
          }
        ]);
        apiName = customApiName.trim();
      } else {
        apiName = selectedApiName;
      }
    }

    console.log(chalk.blue(`🔗 API configurada: ${apiName}`));

    // 📁 SELECCIONAR DIRECTORIO DE DESTINO (dónde crear físicamente)
    console.log(chalk.yellow('\n📁 Configurando directorio de destino...'));
    
    let targetBasePath: string;

    if (isLocalMode) {
      // En modo local, permitir seleccionar carpeta existente o crear nueva
      const testOutputPath = path.resolve('./test-output');
      await fs.ensureDir(testOutputPath);
      
      // Buscar carpetas existentes en test-output
      const existingDirs = [];
      if (await fs.pathExists(testOutputPath)) {
        const contents = await fs.readdir(testOutputPath);
        for (const item of contents) {
          const itemPath = path.join(testOutputPath, item);
          const stat = await fs.stat(itemPath);
          if (stat.isDirectory()) {
            existingDirs.push(item);
          }
        }
      }
      
      const directoryChoices: any[] = [];
      
      // Agregar carpetas existentes
      for (const dir of existingDirs) {
        directoryChoices.push({
          name: `${dir} (existente)`,
          value: path.join(testOutputPath, dir),
          short: dir
        });
      }
      
      // Agregar opción para crear nueva carpeta
      directoryChoices.push({
        name: `Crear nueva carpeta: ${apiName}`,
        value: 'create_new',
        short: `nuevo: ${apiName}`
      });

      const { selectedDirectory } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedDirectory',
          message: '¿En qué directorio crear la entidad?',
          choices: directoryChoices,
          pageSize: 10
        }
      ]);

      if (selectedDirectory === 'create_new') {
        targetBasePath = path.resolve(`./test-output/${apiName}`);
        await fs.ensureDir(targetBasePath);
      } else {
        targetBasePath = selectedDirectory;
      }
      
      console.log(chalk.green(`✅ Directorio target válido: ${targetBasePath}`));
    } else {
      // En proyecto real, crear opciones de directorio
      const directoryChoices: any[] = [];
      
      // Opción 1: Directorio actual (si tiene estructura de API)
      if (directoryInfo.currentApiName) {
        directoryChoices.push({
          name: `${directoryInfo.currentApiName} (directorio actual)`,
          value: directoryInfo.baseDirectory,
          short: directoryInfo.currentApiName
        });
      }
      
      // Opción 2: APIs hermanas disponibles
      for (const siblingApi of directoryInfo.possibleApiNames) {
        if (siblingApi !== directoryInfo.currentApiName) {
          const siblingPath = path.join(path.dirname(directoryInfo.baseDirectory), siblingApi);
          directoryChoices.push({
            name: `${siblingApi} (API hermana)`,
            value: siblingPath,
            short: siblingApi
          });
        }
      }

      const { selectedDirectory } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedDirectory',
          message: '¿En qué directorio crear la entidad?',
          choices: directoryChoices,
          pageSize: 10
        }
      ]);

      targetBasePath = selectedDirectory;

      // Verificar que el directorio target sea válido
      const validation = await DirectoryDetector.validateTargetPath(targetBasePath);
      if (!validation.isValid) {
        console.log(chalk.red(`\n❌ ${validation.message}`));
        return await showMainMenu(isLocalMode);
      }
      console.log(chalk.green(`✅ ${validation.message}`));
    }

    console.log(chalk.blue(`🎯 Generando entidad en API: ${apiName}`));
    console.log(chalk.gray(`📁 Estructura: ${targetBasePath}/domain/models/apis/${apiName}/entities/...`));

    // Mostrar entidades disponibles para selección
    const entityChoices = availableEntities.map(entity => ({
      name: entity,
      value: entity
    }));

    entityChoices.push({
      name: chalk.gray('📝 Ingresar nombre personalizado'),
      value: 'custom'
    });

    const { selectedEntity } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedEntity',
        message: 'Selecciona la entidad a generar:',
        choices: entityChoices,
        pageSize: 15
      }
    ]);

    let entityName = selectedEntity;

    // Si seleccionó custom, pedir el nombre
    if (selectedEntity === 'custom') {
      const { customEntityName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'customEntityName',
          message: 'Nombre de la entity personalizada:',
          validate: (input: string) => {
            if (!input.trim()) {
              return 'El nombre de la entity es requerido';
            }
            if (!/^[A-Z][a-zA-Z0-9]*$/.test(input.trim())) {
              return 'El nombre debe empezar con mayúscula y solo contener letras y números';
            }
            return true;
          }
        }
      ]);
      entityName = customEntityName.trim();
    }

    // Mostrar información de la entidad seleccionada
    if (selectedEntity !== 'custom') {
      swaggerAnalyzer.printEntityInfo(entityName);
    }

    const { confirmGeneration } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmGeneration',
        message: `¿Generar flujo completo para la entity "${entityName}"?`,
        default: true
      }
    ]);

    if (confirmGeneration) {
      const entitySchema = selectedEntity !== 'custom'
        ? swaggerAnalyzer.getEntitySchema(entityName)
        : null;

      // 🔍 VALIDACIONES PRE-GENERACIÓN (usar variables target)
      const validation = await ProjectValidator.validateBeforeGeneration(entityName, targetBasePath, apiName);

      if (!validation.canProceed) {
        console.log(chalk.red('\n❌ No se puede continuar debido a problemas de validación'));
        if (validation.recommendations.length > 0) {
          console.log(chalk.yellow('\n💡 Recomendaciones:'));
          validation.recommendations.forEach(rec =>
            console.log(chalk.gray(`  • ${rec}`))
          );
        }
        return await showMainMenu(isLocalMode);
      }

      // Mostrar advertencias si existen
      if (validation.recommendations.length > 0) {
        console.log(chalk.yellow('\n⚠️  Advertencias:'));
        validation.recommendations.forEach(rec =>
          console.log(chalk.gray(`  • ${rec}`))
        );
      }

      // Mostrar resumen de lo que se va a generar
      ProjectValidator.showGenerationSummary(entityName, targetBasePath, validation.entityResult.exists);

      // Confirmación final si hay conflictos
      if (validation.entityResult.exists) {
        const { proceedWithOverwrite } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'proceedWithOverwrite',
            message: chalk.yellow('⚠️  ¿Continuar y sobrescribir los archivos existentes?'),
            default: false
          }
        ]);

        if (!proceedWithOverwrite) {
          console.log(chalk.yellow('\n❌ Generación cancelada por el usuario'));
          return await showMainMenu(isLocalMode);
        }
      }

      console.log(chalk.blue(`\n🔧 Generando flujo para ${entityName}...`));

      await createCorrectEntityFlow(entityName, targetBasePath, entitySchema, apiName);

      console.log(chalk.green(`\n✅ Flujo ${entityName} generado exitosamente!`));

      if (isLocalMode) {
        console.log(chalk.blue(`📁 Archivos generados en: ${targetBasePath}`));
        console.log(chalk.gray('💡 Puedes revisar los archivos en la carpeta test-output/'));
      } else {
        console.log(chalk.blue(`📁 Archivos generados en el proyecto real: ${targetBasePath}`));
      }
    } else {
      console.log(chalk.yellow('\n❌ Generación cancelada'));
    }

    // Volver al menú principal
    const { backToMenu } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'backToMenu',
        message: '¿Volver al menú principal?',
        default: true
      }
    ]);

    if (backToMenu) {
      await showMainMenu(isLocalMode);
    } else {
      console.log(chalk.green('\n👋 ¡Hasta luego!'));
      process.exit(0);
    }

  } catch (error) {
    console.error(chalk.red('\n❌ Error al generar el flujo:'), error);
    await showMainMenu(isLocalMode);
  }
}

/**
 * Maneja la creación de un flujo de negocio completo basado en swagger
 */
async function handleCreateBusinessFlow(isLocalMode: boolean = false): Promise<void> {
  try {
    console.log(chalk.yellow('\n📋 Configurando flujo de negocio...'));

    // 🔍 DETECTAR DIRECTORIO ACTUAL Y APIs DISPONIBLES
    console.log(chalk.blue('🔍 Analizando estructura del directorio...'));
    const directoryInfo = await DirectoryDetector.detectCurrentApi();
    
    if (directoryInfo.currentApiName) {
      console.log(chalk.green(`✅ API detectada en directorio actual: ${directoryInfo.currentApiName}`));
    } else {
      console.log(chalk.yellow('⚠️  No se detectó estructura de API en el directorio actual'));
    }

    if (directoryInfo.possibleApiNames.length > 0) {
      console.log(chalk.gray(`📁 APIs disponibles: ${directoryInfo.possibleApiNames.join(', ')}`));
    }

    // 1. Solicitar URL del OpenAPI/Swagger
    const { swaggerUrl } = await inquirer.prompt([
      {
        type: 'input',
        name: 'swaggerUrl',
        message: 'URL del OpenAPI/Swagger JSON:',
        default: 'http://backend-platform-prod-env.eba-dddmvypu.us-east-1.elasticbeanstalk.com/openapi.json',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'La URL del swagger es requerida';
          }
          try {
            new URL(input.trim());
            return true;
          } catch {
            return 'Por favor ingresa una URL válida';
          }
        }
      }
    ]);

    // Cargar y analizar el swagger
    console.log(chalk.blue('\n🔍 Analizando OpenAPI...'));
    const swaggerAnalyzer = new SwaggerAnalyzer();

    try {
      await swaggerAnalyzer.loadFromUrl(swaggerUrl.trim());
    } catch (error) {
      console.error(chalk.red('\n❌ Error cargando el swagger:'), error);
      return await handleCreateBusinessFlow(isLocalMode);
    }

    const availableBusinessServices = swaggerAnalyzer.getAvailableBusinessServices();

    if (availableBusinessServices.length === 0) {
      console.log(chalk.yellow('\n⚠️  No se encontraron servicios de negocio en el swagger'));
      return await showMainMenu(isLocalMode);
    }

    console.log(chalk.green(`\n✅ Se encontraron ${availableBusinessServices.length} servicios de negocio disponibles`));

    // 🔗 CONFIGURAR NOMBRE DE LA API
    const detectedApiName = swaggerAnalyzer.getDetectedApiName();
    const suggestedNames = swaggerAnalyzer.suggestApiNames();

    let apiName: string;

    if (detectedApiName) {
      const { useDetectedApi } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'useDetectedApi',
          message: `¿Usar la API detectada "${detectedApiName}"?`,
          default: true
        }
      ]);

      if (useDetectedApi) {
        apiName = detectedApiName;
      } else {
        const { selectedApiName } = await inquirer.prompt([
          {
            type: 'list',
            name: 'selectedApiName',
            message: 'Selecciona el nombre de la API:',
            choices: [
              ...suggestedNames.map(name => ({ name, value: name })),
              { name: '📝 Ingresar nombre personalizado', value: 'custom' }
            ]
          }
        ]);

        if (selectedApiName === 'custom') {
          const { customApiName } = await inquirer.prompt([
            {
              type: 'input',
              name: 'customApiName',
              message: 'Nombre de la API:',
              validate: (input: string) => {
                if (!input.trim()) {
                  return 'El nombre de la API es requerido';
                }
                return true;
              }
            }
          ]);
          apiName = customApiName.trim();
        } else {
          apiName = selectedApiName;
        }
      }
    } else {
      // No se detectó API, solicitar nombre
      const choices = [
        ...suggestedNames.map(name => ({ name, value: name })),
        { name: '📝 Ingresar nombre personalizado', value: 'custom' }
      ];

      const { selectedApiName } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedApiName',
          message: 'Selecciona el nombre de la API:',
          choices
        }
      ]);

      if (selectedApiName === 'custom') {
        const { customApiName } = await inquirer.prompt([
          {
            type: 'input',
            name: 'customApiName',
            message: 'Nombre de la API:',
            validate: (input: string) => {
              if (!input.trim()) {
                return 'El nombre de la API es requerido';
              }
              return true;
            }
          }
        ]);
        apiName = customApiName.trim();
      } else {
        apiName = selectedApiName;
      }
    }

    console.log(chalk.green(`🔗 API configurada: ${apiName}`));

    // 📁 CONFIGURAR DIRECTORIO DE DESTINO
    console.log(chalk.blue('\n📁 Configurando directorio de destino...'));

    let targetDirectory: string;

    if (isLocalMode) {
      // En modo local, usar test-output con opciones más flexibles
      const localTestPath = './test-output';
      
      // Crear test-output si no existe
      await fs.ensureDir(localTestPath);
      
      // Obtener carpetas existentes en test-output
      const existingFolders = (await fs.readdir(localTestPath, { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      const folderChoices = [
        ...existingFolders.map(folder => ({
          name: `📁 ${folder} (existente)`,
          value: folder
        })),
        {
          name: '✨ Crear nueva carpeta',
          value: 'new-folder'
        }
      ];

      if (folderChoices.length === 1) {
        // Solo la opción de crear nueva carpeta
        const { newFolderName } = await inquirer.prompt([
          {
            type: 'input',
            name: 'newFolderName',
            message: '¿En qué directorio crear la entidad?',
            default: apiName,
            validate: (input: string) => {
              if (!input.trim()) {
                return 'El nombre del directorio es requerido';
              }
              return true;
            }
          }
        ]);
        targetDirectory = path.join(localTestPath, newFolderName.trim());
      } else {
        const { selectedFolder } = await inquirer.prompt([
          {
            type: 'list',
            name: 'selectedFolder',
            message: '¿En qué directorio crear la entidad?',
            choices: folderChoices
          }
        ]);

        if (selectedFolder === 'new-folder') {
          const { newFolderName } = await inquirer.prompt([
            {
              type: 'input',
              name: 'newFolderName',
              message: 'Nombre del nuevo directorio:',
              default: apiName,
              validate: (input: string) => {
                if (!input.trim()) {
                  return 'El nombre del directorio es requerido';
                }
                return true;
              }
            }
          ]);
          targetDirectory = path.join(localTestPath, newFolderName.trim());
        } else {
          targetDirectory = path.join(localTestPath, selectedFolder);
        }
      }
    } else {
      // Modo producción: detectar APIs hermanas
      const currentDir = process.cwd();
      
      // Buscar directorios hermanos que puedan ser APIs
      const parentDir = path.dirname(currentDir);
      const siblingDirs = (await fs.readdir(parentDir, { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .filter(name => !name.startsWith('.'));

      if (siblingDirs.length > 0) {
        const dirChoices = siblingDirs.map(dir => ({
          name: `📁 ${dir}`,
          value: path.join(parentDir, dir)
        }));

        const { selectedDir } = await inquirer.prompt([
          {
            type: 'list',
            name: 'selectedDir',
            message: 'Selecciona el directorio de destino:',
            choices: dirChoices
          }
        ]);
        targetDirectory = selectedDir;
      } else {
        targetDirectory = currentDir;
      }
    }

    // Validar que el directorio target es válido
    try {
      await fs.ensureDir(targetDirectory);
      console.log(chalk.green(`✅ Directorio target válido: ${targetDirectory}`));
    } catch (error) {
      console.error(chalk.red(`❌ Error accediendo al directorio target: ${targetDirectory}`));
      return await showMainMenu(isLocalMode);
    }

    console.log(chalk.cyan(`🎯 Generando servicio de negocio en API: ${apiName}`));
    console.log(chalk.gray(`📁 Estructura: ${targetDirectory}/domain/models/apis/${apiName}/business/...`));

    // 4. Seleccionar servicio de negocio a generar
    const serviceChoices = availableBusinessServices.map(service => ({
      name: service,
      value: service
    }));

    const { selectedService } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedService',
        message: 'Selecciona el servicio de negocio a generar:',
        choices: serviceChoices,
        pageSize: 15
      }
    ]);

    // 5. Obtener schema del servicio de negocio seleccionado
    const serviceSchema = swaggerAnalyzer.getBusinessServiceSchema(selectedService);

    if (!serviceSchema) {
      console.log(chalk.red(`❌ No se pudo obtener el schema para el servicio: ${selectedService}`));
      return await showMainMenu(isLocalMode);
    }

    // 6. Mostrar información del servicio de negocio
    console.log(chalk.cyan(`\n📋 Información del servicio: ${selectedService}`));
    
    if (serviceSchema.businessOperations && serviceSchema.businessOperations.length > 0) {
      console.log(chalk.blue('\n🔧 Operaciones de negocio:'));
      serviceSchema.businessOperations.forEach(op => {
        console.log(`  • ${op.method} ${op.path} - ${op.summary || 'Sin descripción'}`);
        if (op.requestSchema) {
          console.log(`    📥 Request: ${op.requestSchema}`);
        }
        if (op.responseSchema) {
          console.log(`    📤 Response: ${op.responseSchema}`);
        }
        if (op.fields.length > 0) {
          console.log(chalk.gray(`    📊 Campos (${op.fields.length}):`));
          op.fields.forEach(field => {
            const required = field.required ? '🔴' : '🔵';
            console.log(chalk.gray(`      ${required} ${field.name}: ${field.type}`));
          });
        }
        console.log('');
      });
    } else {
      console.log(chalk.blue('\n🔧 Operaciones disponibles:'));
      console.log(`  • Crear: ${serviceSchema.operations.create ? '✅' : '❌'}`);
      console.log(`  • Leer: ${serviceSchema.operations.read ? '✅' : '❌'}`);
      console.log(`  • Actualizar: ${serviceSchema.operations.update ? '✅' : '❌'}`);
      console.log(`  • Eliminar: ${serviceSchema.operations.delete ? '✅' : '❌'}`);
      console.log(`  • Listar: ${serviceSchema.operations.list ? '✅' : '❌'}`);

      console.log(chalk.blue(`\n📊 Campos (${serviceSchema.fields.length}):`));
      serviceSchema.fields.forEach(field => {
        const required = field.required ? '🔴' : '🔵';
        console.log(`  ${required} ${field.name}: ${field.type}`);
      });
    }

    // 7. Confirmar generación
    const { shouldGenerate } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldGenerate',
        message: `¿Generar flujo de negocio completo para el servicio "${selectedService}"?`,
        default: true
      }
    ]);

    if (!shouldGenerate) {
      return await showMainMenu(isLocalMode);
    }

    // 8. Ejecutar validaciones pre-generación
    console.log(chalk.blue('\n🔍 Ejecutando validaciones pre-generación...'));
    
    const validation = await ProjectValidator.validateProjectStructure(targetDirectory);
    
    console.log(chalk.blue('\n🔍 Validando estructura del proyecto...'));
    console.log(chalk.blue(`🔍 Verificando si el servicio "${selectedService}" ya existe...`));
    
    // Validar que el servicio no existe en business (similar a entities)
    const businessEntityExists = await ProjectValidator.checkBusinessEntityExists(selectedService, targetDirectory, apiName);
    
    if (validation.isValid) {
      console.log(chalk.green('✅ Estructura del proyecto válida'));
    }

    // Mostrar warnings si los hay
    if (validation.warnings && validation.warnings.length > 0) {
      validation.warnings.forEach((warning: string) => {
        console.log(chalk.yellow(`⚠️  ${warning}`));
      });
    }

    if (businessEntityExists.exists) {
      console.log(chalk.yellow(`⚠️  El servicio "${selectedService}" ya existe parcial o completamente en business`));
      
      if (businessEntityExists.conflictingFiles.length > 0) {
        console.log(chalk.yellow('\nArchivos/directorios existentes:'));
        businessEntityExists.conflictingFiles.forEach((detail: string) => {
          console.log(chalk.gray(`  ${detail}`));
        });
      }
    }

    // Mostrar warnings de validación
    if ((validation.warnings && validation.warnings.length > 0) || businessEntityExists.exists) {
      console.log(chalk.yellow('\n⚠️  Advertencias:'));
      
      if (businessEntityExists.exists) {
        console.log(chalk.yellow('  • La entidad ya existe. Si continúas, se sobrescribirán los archivos existentes'));
        console.log(chalk.yellow('  • Considera hacer un backup antes de continuar'));
      }
      
      if (validation.warnings) {
        validation.warnings.forEach((warning: string) => {
          console.log(chalk.yellow(`  • ${warning}`));
        });
      }
    }

    // 9. Mostrar resumen antes de generar
    console.log(chalk.blue('\n📋 Resumen de generación:'));
    console.log(chalk.white(`Servicio: ${selectedService}`));
    console.log(chalk.white(`Ubicación: ${targetDirectory}`));
    console.log(chalk.white(`Archivos a generar: ~29 archivos TypeScript`));
    
    if (businessEntityExists.exists) {
      console.log(chalk.yellow('⚠️  Se sobrescribirán archivos existentes'));
    }

    console.log(chalk.gray('\n📁 Directorios que se crearán/utilizarán:'));
    const serviceNameLower = selectedService.toLowerCase();
    console.log(chalk.gray(`  📂 domain/models/apis/${apiName}/business/${serviceNameLower}/`));
    console.log(chalk.gray(`  📂 domain/services/use_cases/apis/${apiName}/business/${serviceNameLower}/`));
    console.log(chalk.gray(`  📂 infrastructure/entities/apis/${apiName}/business/${serviceNameLower}/`));
    console.log(chalk.gray(`  📂 infrastructure/mappers/apis/${apiName}/business/${serviceNameLower}/`));
    console.log(chalk.gray(`  📂 infrastructure/repositories/.../business/${serviceNameLower}/`));
    console.log(chalk.gray(`  📂 facade/apis/${apiName}/business/`));
    console.log(chalk.gray(`  📂 injection folders...`));

    // Confirmación final si hay advertencias
    if ((validation.warnings && validation.warnings.length > 0) || businessEntityExists.exists) {
      const { shouldContinue } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'shouldContinue',
          message: '⚠️  ¿Continuar y sobrescribir los archivos existentes?',
          default: false
        }
      ]);

      if (!shouldContinue) {
        console.log(chalk.yellow('Operación cancelada por el usuario'));
        return await showMainMenu(isLocalMode);
      }
    }

    // 10. Generar el flujo de negocio
    console.log(chalk.green(`\n🔧 Generando flujo de negocio para ${selectedService}...`));
    await createBusinessFlow(selectedService, targetDirectory, serviceSchema, apiName);

    console.log(chalk.green(`\n✅ Flujo de negocio ${selectedService} generado exitosamente!`));
    console.log(chalk.cyan(`📁 Archivos generados en: ${targetDirectory}`));
    console.log(chalk.gray('💡 Puedes revisar los archivos en la carpeta especificada'));

    // Preguntar si quiere continuar
    const { continueWorking } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continueWorking',
        message: '¿Volver al menú principal?',
        default: true
      }
    ]);

    if (continueWorking) {
      await showMainMenu(isLocalMode);
    } else {
      console.log(chalk.blue('\n👋 ¡Hasta luego!'));
    }

  } catch (error) {
    console.error(chalk.red('\n❌ Error en el flujo de negocio:'), error);
    
    const { retry } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'retry',
        message: '¿Intentar nuevamente?',
        default: true
      }
    ]);

    if (retry) {
      await handleCreateBusinessFlow(isLocalMode);
    } else {
      await showMainMenu(isLocalMode);
    }
  }
}

/**
 * Maneja el flujo de limpieza/eliminación de código generado
 */
async function handleCleanup(isLocalMode: boolean): Promise<void> {
  console.log(chalk.blue.bold('\n🧹 LIMPIEZA DE CÓDIGO GENERADO'));
  console.log(chalk.gray('Elimina entidades, APIs o todo el contenido generado\n'));

  // Determinar la ruta base
  let basePath;
  if (isLocalMode) {
    // Si ya estamos en test-output, usar el directorio actual
    if (process.cwd().includes('test-output')) {
      basePath = process.cwd();
    } else {
      basePath = './test-output';
    }
  } else {
    basePath = process.cwd();
  }
  
  try {
    // Detectar qué está disponible para limpiar
    const entities = await detectGeneratedEntities(basePath);
    
    console.log(chalk.cyan('📊 Estado actual:'));
    console.log(chalk.gray(`   Entidades detectadas: ${entities.length}`));
    console.log(chalk.gray(`   Directorio base: ${basePath}`));
    if (entities.length > 0) {
      console.log(chalk.gray(`   APIs encontradas: ${[...new Set(entities.map(e => e.apiName))].join(', ')}`));
    }
    console.log('');
    


    if (entities.length === 0) {
      console.log(chalk.yellow('⚠️  No se encontraron entidades para eliminar'));
      await showMainMenu(isLocalMode);
      return;
    }
    
    // Ir directamente a la selección de entidad
    await handleEntityCleanup(basePath, entities, isLocalMode);
    
  } catch (error) {
    console.error(chalk.red('❌ Error en la limpieza:'), error);
    await showMainMenu(isLocalMode);
  }
}

/**
 * Maneja la limpieza de una entidad específica
 */
async function handleEntityCleanup(basePath: string, entities: any[], isLocalMode: boolean): Promise<void> {
  console.log(chalk.blue('\n📋 Seleccionar entidad a eliminar'));
  
  // Crear choices organizadas por API
  const entityChoices: any[] = [];
  const groupedEntities = entities.reduce((acc: any, entity) => {
    if (!acc[entity.apiName]) {
      acc[entity.apiName] = [];
    }
    acc[entity.apiName].push(entity);
    return acc;
  }, {});
  
  Object.keys(groupedEntities).forEach(apiName => {
    entityChoices.push(new inquirer.Separator(`--- API: ${apiName} ---`));
    groupedEntities[apiName].forEach((entity: any) => {
      entityChoices.push({
        name: `${entity.name} (${entity.paths.length} archivos)`,
        value: { apiName: entity.apiName, entityName: entity.name, paths: entity.paths }
      });
    });
  });
  
  entityChoices.push({
    name: '🔙 Volver',
    value: 'back'
  });
  
  const { selectedEntity } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedEntity',
      message: 'Selecciona la entidad a eliminar:',
      choices: entityChoices,
      pageSize: 15
    }
  ]);
  
  if (selectedEntity === 'back') {
    await handleCleanup(isLocalMode);
    return;
  }
  
  // Mostrar vista previa de lo que se eliminará
  console.log(chalk.yellow(`\n⚠️  Vista previa de eliminación:`));
  console.log(chalk.gray(`   Entidad: ${selectedEntity.entityName}`));
  console.log(chalk.gray(`   API: ${selectedEntity.apiName}`));
  console.log(chalk.gray(`   Archivos a eliminar: ${selectedEntity.paths.length}`));
  
  const { confirmDelete } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmDelete',
      message: `¿Estás seguro de eliminar la entidad "${selectedEntity.entityName}"?`,
      default: false
    }
  ]);
  
  if (confirmDelete) {
    await cleanupEntity(basePath, selectedEntity.apiName, selectedEntity.entityName);
    console.log(chalk.green('\n✅ Entidad eliminada exitosamente!'));
  } else {
    console.log(chalk.blue('\n🚫 Operación cancelada'));
  }
  
  const { goToMenu } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'goToMenu',
      message: '¿Volver al menú principal?',
      default: true
    }
  ]);
  
  if (goToMenu) {
    await showMainMenu(isLocalMode);
  } else {
    await handleCleanup(isLocalMode);
  }
}





// Función principal
async function main(): Promise<void> {
  try {
    // Verificar argumentos especiales
    if (process.argv.includes('--logout')) {
      await AuthManager.logout();
      return;
    }
    
    if (process.argv.includes('--session-info')) {
      await AuthManager.showSessionInfo();
      return;
    }

    // 🔐 AUTENTICACIÓN REQUERIDA
    const isAuthenticated = await AuthManager.authenticate();
    if (!isAuthenticated) {
      console.log(chalk.red('❌ Acceso denegado'));
      process.exit(1);
    }

    // Detectar si es modo local
    const isLocalMode = process.argv.includes('--local');
    
    if (isLocalMode) {
      console.log(chalk.blue('🧪 Modo LOCAL activado'));
      console.log(chalk.gray('Los archivos se generarán en: ./test-output/{api-name}/\n'));
    } else {
      console.log(chalk.blue('🚀 Modo PRODUCCIÓN activado'));
      console.log(chalk.gray(`Los archivos se generarán en: ${process.cwd()}/{api-name}/\n`));
    }
    
    await showMainMenu(isLocalMode);
  } catch (error) {
    console.error(chalk.red('Error en la aplicación:'), error);
    process.exit(1);
  }
}

// Ejecutar solo si es el archivo principal
if (require.main === module) {
  main();
}

export { showMainMenu };
