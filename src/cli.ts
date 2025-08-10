#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import { createCorrectEntityFlow } from './generators/correct-entity-flow-generator';
import { SwaggerAnalyzer } from './parsers/swagger-parser';
import { ProjectValidator } from './validators/project-validator';
import { AuthManager } from './auth/auth-manager';
import { DirectoryDetector } from './utils/directory-detector';
import * as path from 'path';

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

    // 🎯 SELECCIONAR API TARGET (dónde generar)
    console.log(chalk.yellow('\n📁 Configurando directorio de generación...'));
    
    let targetApiName: string;
    let targetBasePath: string;

    // Crear opciones para selección de API target
    const targetApiChoices: any[] = [];
    
    // Opción 1: API del Swagger (siempre disponible)
    targetApiChoices.push({
      name: `${apiName} ${directoryInfo.currentApiName === apiName ? '(actual directorio - mismo API)' : '(del Swagger)'}`,
      value: apiName,
      short: apiName
    });
    
    // Opción 2: APIs hermanas disponibles (solo si son diferentes)
    for (const siblingApi of directoryInfo.possibleApiNames) {
      if (siblingApi !== apiName) {
        targetApiChoices.push({
          name: `${siblingApi} ${siblingApi === directoryInfo.currentApiName ? '(actual directorio)' : '(API hermana)'}`,
          value: siblingApi,
          short: siblingApi
        });
      }
    }
    
    // Opción 3: API personalizada
    targetApiChoices.push({
      name: 'Otra API (personalizada)',
      value: 'custom',
      short: 'custom'
    });

    const { selectedTargetApi } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedTargetApi',
        message: '¿En qué API quieres generar el código?',
        choices: targetApiChoices,
        default: directoryInfo.currentApiName || apiName
      }
    ]);

    if (selectedTargetApi === 'custom') {
      const { customTargetApi } = await inquirer.prompt([
        {
          type: 'input',
          name: 'customTargetApi',
          message: 'Nombre de la API target:',
          validate: (input: string) => {
            if (!input.trim()) {
              return 'El nombre de la API es requerido';
            }
            return true;
          }
        }
      ]);
      targetApiName = customTargetApi.trim();
    } else {
      targetApiName = selectedTargetApi;
    }

    // Calcular la ruta target
    if (isLocalMode) {
      targetBasePath = path.resolve('./test-output');
    } else {
      targetBasePath = DirectoryDetector.calculateTargetPath(
        directoryInfo.baseDirectory,
        directoryInfo.currentApiName,
        targetApiName
      );
    }

    // Validar la ruta target
    const targetValidation = await DirectoryDetector.validateTargetPath(targetBasePath);
    if (!targetValidation.isValid) {
      console.log(chalk.red(`\n❌ Error con directorio target: ${targetValidation.message}`));
      return await showMainMenu(isLocalMode);
    }

    console.log(chalk.green(`✅ ${targetValidation.message}`));
    console.log(chalk.blue(`🎯 Generando en API: ${targetApiName}`));
    console.log(chalk.gray(`📁 Ruta completa: ${targetBasePath}/${targetApiName}/domain/...`));

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
      const validation = await ProjectValidator.validateBeforeGeneration(entityName, targetBasePath, targetApiName);

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

      await createCorrectEntityFlow(entityName, targetBasePath, entitySchema, targetApiName);

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
