import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { EntitySchema } from '../parsers/swagger-parser';

// Ruta base donde se ejecutará el comando
const DEFAULT_BASE_PATH = process.cwd(); // Directorio actual por defecto
const LOCAL_TEST_PATH = './test-output';

export async function createBusinessFlow(serviceName: string, basePath: string = DEFAULT_BASE_PATH, schema?: EntitySchema | null, targetApiName: string = 'platform'): Promise<void> {
  console.log(chalk.blue(`📁 Generando flujo de negocio completo para ${serviceName} en: ${basePath}`));

  const serviceNameLower = serviceName.toLowerCase();
  const apiPrefix = '';

  const paths = {
    // DTOs para business
    domainModels: path.join(basePath, `${apiPrefix}domain/models/apis/${targetApiName}/business/${serviceNameLower}`),
    // Entities para business
    infraEntities: path.join(basePath, `${apiPrefix}infrastructure/entities/apis/${targetApiName}/business/${serviceNameLower}`),
    // Mappers para business
    infraMappers: path.join(basePath, `${apiPrefix}infrastructure/mappers/apis/${targetApiName}/business/${serviceNameLower}`)
  };

  try {
    // Crear directorios necesarios
    await createDirectoriesIfNotExists(paths);
    // Generar DTOs por operación
    await generateDomainDTOs(serviceName, paths, schema, targetApiName);
    // Generar entities por operación
    await generateInfrastructureEntities(serviceName, paths, schema, targetApiName);
    // Generar mappers por operación
    await generateInfrastructureMappers(serviceName, paths, schema, targetApiName);
    console.log(chalk.green(`✨ Flujo de negocio ${serviceName} generado exitosamente!`));
  } catch (error) {
    console.error(chalk.red('❌ Error generando archivos:'), error);
    throw error;
  }
}

async function generateInfrastructureEntities(serviceName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  // Solo generar por operaciones de negocio (nunca legacy)
  if (schema?.businessOperations && schema.businessOperations.length > 0) {
    let exportStatements: string[] = [];

    for (const operation of schema.businessOperations) {
      const operationName = operation.path.split('/').pop() || operation.operationId.toLowerCase().replace(/_/g, '-');
      const operationFolder = path.join(paths.infraEntities, operationName);
      await fs.ensureDir(operationFolder);

      // --- Request Entity ---
      if (operation.fields && operation.fields.length > 0) {
        const requestInterface = generateBusinessEntityInterface(serviceName, operation, 'request');
        const requestFileName = `i-${serviceName.toLowerCase()}-${operationName}-request-entity.ts`;
        await fs.writeFile(
          path.join(operationFolder, requestFileName),
          requestInterface
        );
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        const requestInterfaceName = `I${toPascalCase(serviceName)}${cleanOperationName}RequestEntity`;
        exportStatements.push(`export { ${requestInterfaceName} } from './${operationName}/${requestFileName.replace('.ts', '')}';`);
        await generateNestedEntitiesForOperation(serviceName, operation, 'request', operationFolder, apiName, exportStatements, operationName);
      }

      // --- Response Entity ---
      if (operation.responseFields && operation.responseFields.length > 0) {
        const responseInterface = generateBusinessEntityInterface(serviceName, operation, 'response');
        const responseFileName = `i-${serviceName.toLowerCase()}-${operationName}-response-entity.ts`;
        await fs.writeFile(
          path.join(operationFolder, responseFileName),
          responseInterface
        );
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        const responseInterfaceName = `I${toPascalCase(serviceName)}${cleanOperationName}ResponseEntity`;
        exportStatements.push(`export { ${responseInterfaceName} } from './${operationName}/${responseFileName.replace('.ts', '')}';`);
        await generateNestedEntitiesForOperation(serviceName, operation, 'response', operationFolder, apiName, exportStatements, operationName);
      }
    }
    // Generar index.ts
    const indexContent = exportStatements.join('\n') + '\n';
    await fs.writeFile(
      path.join(paths.infraEntities, 'index.ts'),
      indexContent
    );
    console.log(chalk.green(`✅ Index Entity: index.ts`));
  } else {
    // Si no hay operaciones de negocio, NO generar nada (nunca legacy)
    console.log(chalk.yellow('⚠️  No se generaron entities porque no hay operaciones de negocio detectadas.'));
    // Eliminar archivos legacy si existen
    const legacyFiles = [
      `i-${serviceName.toLowerCase()}-entity.ts`,
      `i-${serviceName.toLowerCase()}-save-entity.ts`,
      `i-${serviceName.toLowerCase()}-read-entity.ts`,
      `i-${serviceName.toLowerCase()}-update-entity.ts`,
      `i-${serviceName.toLowerCase()}-delete-entity.ts`,
      'index.ts'
    ];
    for (const file of legacyFiles) {
      const filePath = path.join(paths.infraEntities, file);
      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath);
      }
    }
  }
}

async function generateInfrastructureMappers(serviceName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  // Solo generar por operaciones de negocio
  if (schema?.businessOperations && schema.businessOperations.length > 0) {
    let exportStatements: string[] = [];

    for (const operation of schema.businessOperations) {
      const operationName = operation.path.split('/').pop() || operation.operationId.toLowerCase().replace(/_/g, '-');
      const operationFolder = path.join(paths.infraMappers, operationName);
      await fs.ensureDir(operationFolder);

      // --- Request Mapper ---
      if (operation.fields && operation.fields.length > 0) {
        const requestMapper = generateBusinessMapper(serviceName, operation, 'request', apiName);
        const requestFileName = `${serviceName.toLowerCase()}-${operationName}-request-mapper.ts`;
        await fs.writeFile(
          path.join(operationFolder, requestFileName),
          requestMapper
        );
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        const requestMapperName = `${toPascalCase(serviceName)}${cleanOperationName}RequestMapper`;
        exportStatements.push(`export { ${requestMapperName} } from './${operationName}/${serviceName.toLowerCase()}-${operationName}-request-mapper';`);
      }

      // --- Response Mapper ---
      if (operation.responseFields && operation.responseFields.length > 0) {
        const responseMapper = generateBusinessMapper(serviceName, operation, 'response', apiName);
        const responseFileName = `${serviceName.toLowerCase()}-${operationName}-response-mapper.ts`;
        await fs.writeFile(
          path.join(operationFolder, responseFileName),
          responseMapper
        );
        
        // Generar mappers para interfaces anidadas
        await generateNestedMappersForOperation(serviceName, operation, 'response', operationFolder, apiName, exportStatements, operationName);
        
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        const responseMapperName = `${toPascalCase(serviceName)}${cleanOperationName}ResponseMapper`;
        exportStatements.push(`export { ${responseMapperName} } from './${operationName}/${serviceName.toLowerCase()}-${operationName}-response-mapper';`);
      }
    }
    
    // Generar index.ts para mappers
    const indexContent = exportStatements.join('\n') + '\n';
    await fs.writeFile(
      path.join(paths.infraMappers, 'index.ts'),
      indexContent
    );
    console.log(chalk.green(`✅ Index Mapper: index.ts`));
  } else {
    console.log(chalk.yellow('⚠️  No se generaron mappers porque no hay operaciones de negocio detectadas.'));
  }
}

async function generateDomainDTOs(serviceName: string, paths: any, schema?: EntitySchema | null, apiName: string = 'platform'): Promise<void> {
  // Solo generar por operaciones de negocio
  if (schema?.businessOperations && schema.businessOperations.length > 0) {
    let exportStatements: string[] = [];

    for (const operation of schema.businessOperations) {
      const operationName = operation.path.split('/').pop() || operation.operationId.toLowerCase().replace(/_/g, '-');
      const operationFolder = path.join(paths.domainModels, operationName);
      await fs.ensureDir(operationFolder);

      // --- Request DTO ---
      if (operation.fields && operation.fields.length > 0) {
        const requestDTO = generateBusinessDTO(serviceName, operation, 'request', apiName);
        const requestFileName = `i-${serviceName.toLowerCase()}-${operationName}-request-dto.ts`;
        await fs.writeFile(
          path.join(operationFolder, requestFileName),
          requestDTO
        );
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        const requestDTOName = `I${toPascalCase(serviceName)}${cleanOperationName}RequestDTO`;
        exportStatements.push(`export { ${requestDTOName} } from './${operationName}/${requestFileName.replace('.ts', '')}';`);
      }

      // --- Response DTO ---
      if (operation.responseFields && operation.responseFields.length > 0) {
        const responseDTO = generateBusinessDTO(serviceName, operation, 'response', apiName);
        const responseFileName = `i-${serviceName.toLowerCase()}-${operationName}-response-dto.ts`;
        await fs.writeFile(
          path.join(operationFolder, responseFileName),
          responseDTO
        );
        
        // Generar DTOs para interfaces anidadas
        await generateNestedDTOsForOperation(serviceName, operation, 'response', operationFolder, apiName, exportStatements, operationName);
        
        const cleanOperationName = operationName
          .replace(/_/g, '-')
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        const responseDTOName = `I${toPascalCase(serviceName)}${cleanOperationName}ResponseDTO`;
        exportStatements.push(`export { ${responseDTOName} } from './${operationName}/${responseFileName.replace('.ts', '')}';`);
      }
    }
    
    // Generar index.ts para DTOs
    const indexContent = exportStatements.join('\n') + '\n';
    await fs.writeFile(
      path.join(paths.domainModels, 'index.ts'),
      indexContent
    );
    console.log(chalk.green(`✅ Index DTO: index.ts`));
  } else {
    console.log(chalk.yellow('⚠️  No se generaron DTOs porque no hay operaciones de negocio detectadas.'));
  }
}

async function generateNestedMappersForOperation(serviceName: string, operation: any, type: 'request' | 'response', operationFolder: string, apiName: string, exportStatements: string[], operationName: string): Promise<void> {
  const fields = type === 'request' ? operation.fields : operation.responseFields;
  const generated = new Set<string>();

  function processNestedFields(field: any) {
    if (field.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type) && !generated.has(field.type)) {
      generated.add(field.type);
      
      // Generar mapper individual para cada interface anidada
      const nestedMapper = generateIndividualNestedMapper(field.type, field, apiName, serviceName, operationName, type);
      const baseFileName = field.type.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
      // Si el tipo ya termina en request o response, no duplicar
      const needsSuffix = !field.type.toLowerCase().endsWith('response') && !field.type.toLowerCase().endsWith('request');
      const nestedFileName = needsSuffix 
        ? `${baseFileName}-${type}-mapper.ts`
        : `${baseFileName}-mapper.ts`;
      
      fs.writeFileSync(
        path.join(operationFolder, nestedFileName),
        nestedMapper
      );
      
      const formattedFieldType = toPascalCase(field.type);
      const suffix = type === 'request' ? 'Request' : 'Response';
      // Evitar duplicación si el tipo ya termina en Request o Response
      const mapperClassName = formattedFieldType.endsWith('Response') || formattedFieldType.endsWith('Request') 
        ? `${formattedFieldType}Mapper` 
        : `${formattedFieldType}${suffix}Mapper`;
      exportStatements.push(`export { ${mapperClassName} } from './${operationName}/${nestedFileName.replace('.ts', '')}';`);

      // Procesar campos anidados recursivamente
      if (field.nestedFields && field.nestedFields.length > 0) {
        field.nestedFields.forEach(processNestedFields);
      }
    }
  }

  if (fields && fields.length > 0) {
    fields.forEach(processNestedFields);
  }
}

async function createDirectoriesIfNotExists(paths: any): Promise<void> {
  for (const [key, dir] of Object.entries(paths)) {
    if (typeof dir === 'string') {
      console.log(chalk.cyan(`📂 Directorio creado/verificado: ${dir}`));
      await fs.ensureDir(dir);
    }
  }
}

// Funciones auxiliares copiadas del generador original
function getDefaultFields(): any[] {
  return [
    { name: 'name', type: 'string', required: true },
    { name: 'state', type: 'boolean', required: false }
  ];
}

function toPascalCase(str: string): string {
  return str
    .replace(/(^|_|-)(\w)/g, (_: string, __: string, c: string) => c ? c.toUpperCase() : '')
    .replace(/Dto$/i, 'Entity')
    .replace(/EntityEntity$/, 'Entity');
}

function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1')
    .replace(/^_/, '')
    .toLowerCase();
}

function generateBusinessEntityInterface(serviceName: string, operation: any, type: 'request' | 'response'): string {
  const operationName = operation.path.split('/').pop() || type;
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  const interfaceName = `I${toPascalCase(serviceName)}${cleanOperationName}${type === 'request' ? 'Request' : 'Response'}Entity`;
  let content = `export interface ${interfaceName} {\n`;
  const fields = type === 'request' ? operation.fields : operation.responseFields;
  if (fields && fields.length > 0) {
    fields.forEach((field: any) => {
      const optionalMark = field.required ? '' : '?';
      const arrayMark = field.isArray ? '[]' : '';
      // Mantener los nombres de campos tal como vienen del swagger (camelCase)
      const fieldName = field.name;
      let fieldType = field.type;
      if (fieldType && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(fieldType)) {
        fieldType = 'I' + toPascalCase(fieldType) + 'Entity';
      }
      content += `  ${fieldName}${optionalMark}: ${fieldType}${arrayMark};\n`;
    });
  } else {
    content += `  // Define los campos del ${type} aquí\n`;
  }
  content += `}\n`;
  // Recursividad para interfaces hijas (solo para response)
  if (type === 'response' && fields && fields.length > 0) {
    const generated = new Set<string>();
    function generateNested(field: any) {
      if (
        field.type &&
        !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type) &&
        !generated.has(field.type)
      ) {
        generated.add(field.type);
        const nestedInterfaceName = toPascalCase(field.type) + 'Entity';
        content += `\nexport interface ${nestedInterfaceName} {\n`;
        if (field.nestedFields && field.nestedFields.length > 0) {
          field.nestedFields.forEach((nested: any) => {
            const optionalMark = nested.required ? '' : '?';
            const arrayMark = nested.isArray ? '[]' : '';
            // Mantener los nombres de campos tal como vienen del swagger (camelCase)
            const nestedFieldName = nested.name;
            let nestedType = nested.type;
            if (nestedType && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(nestedType)) {
              nestedType = toPascalCase(nestedType) + 'Entity';
            }
            content += `  ${nestedFieldName}${optionalMark}: ${nestedType}${arrayMark};\n`;
          });
        } else {
          content += `  // No hay propiedades definidas\n`;
        }
        content += `}\n`;
        if (field.nestedFields && field.nestedFields.length > 0) {
          field.nestedFields.forEach(generateNested);
        }
      } else if (field.nestedFields && field.nestedFields.length > 0) {
        field.nestedFields.forEach(generateNested);
      }
    }
    fields.forEach(generateNested);
  }
  return content;
}

function convertToCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function getFieldOptionalStatus(field: any, type: string): boolean {
  if (type === 'save') {
    return !field.required;
  }
  if (type === 'update') {
    return true; // En update, todos los campos son opcionales excepto ID
  }
  return !field.required;
}

function getTypeScriptType(field: any): string {
  switch (field.type) {
    case 'string':
      return 'string';
    case 'number':
    case 'integer':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'array':
      return 'any[]';
    case 'object':
      return 'any';
    default:
      return 'string';
  }
}

function generateBusinessMapper(serviceName: string, operation: any, type: 'request' | 'response', apiName: string = 'platform'): string {
  const operationName = operation.path.split('/').pop() || type;
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  const serviceNameLower = serviceName.toLowerCase();
  const dtoInterfaceName = `I${toPascalCase(serviceName)}${cleanOperationName}${type === 'request' ? 'Request' : 'Response'}DTO`;
  const entityInterfaceName = `I${toPascalCase(serviceName)}${cleanOperationName}${type === 'request' ? 'Request' : 'Response'}Entity`;
  const mapperClassName = `${toPascalCase(serviceName)}${cleanOperationName}${type === 'request' ? 'Request' : 'Response'}Mapper`;
  
  const fields = type === 'request' ? operation.fields : operation.responseFields;
  
  // Generar campos para mapFrom (Entity -> DTO)
  let mapFromFields = '';
  // Generar campos para mapTo (DTO -> Entity)  
  let mapToFields = '';
  // Agregar imports e instancias de mappers anidados
  let nestedMapperImports = '';
  let nestedMapperInstances = '';
  
  if (fields && fields.length > 0) {
    const nestedMappers: string[] = [];
    
    const mapFromMappings = fields.map((field: any) => {
      const dtoFieldName = convertToCamelCase(field.name); // DTO usa camelCase
      const entityFieldName = field.name; // Entity usa nombres del swagger (snake_case)
      
      // Si es un tipo complejo, usar mapper específico
      if (field.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type)) {
        const nestedMapperName = `${field.type.toLowerCase()}ResponseMapper`;
        nestedMappers.push(`    private ${nestedMapperName} = InjectionPlatformBusinessAuthMapper.${toPascalCase(field.type)}ResponseMapper()`);
        
        if (field.isArray) {
          return `            ${dtoFieldName}: this.${nestedMapperName}.mapFromList(param.${entityFieldName})`;
        } else {
          return `            ${dtoFieldName}: this.${nestedMapperName}.mapFrom(param.${entityFieldName})`;
        }
      } else {
        return `            ${dtoFieldName}: param.${entityFieldName}`;
      }
    });
    
    const mapToMappings = fields.map((field: any) => {
      const dtoFieldName = convertToCamelCase(field.name); // DTO usa camelCase
      const entityFieldName = field.name; // Entity usa nombres del swagger (snake_case)
      
      // Si es un tipo complejo, usar mapper específico
      if (field.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type)) {
        const nestedMapperName = `${field.type.toLowerCase()}ResponseMapper`;
        
        if (field.isArray) {
          return `            ${entityFieldName}: this.${nestedMapperName}.mapToList(param.${dtoFieldName})`;
        } else {
          return `            ${entityFieldName}: this.${nestedMapperName}.mapTo(param.${dtoFieldName})`;
        }
      } else {
        return `            ${entityFieldName}: param.${dtoFieldName}`;
      }
    });
    
    // Agregar imports e instancias de mappers anidados si existen
    if (nestedMappers.length > 0) {
      nestedMapperImports = `import { InjectionPlatformBusinessAuthMapper } from "../../../injection/business/injection-platform-business-auth-mapper";\n`;
      nestedMapperInstances = nestedMappers.join('\n');
    }
    
    mapFromFields = mapFromMappings.join(',\n');
    mapToFields = mapToMappings.join(',\n');
  }

  return `import { Mapper } from "@bus/core/classes";
import { ${dtoInterfaceName} } from "@${apiName}/domain/models/apis/${apiName}/business/${serviceNameLower}";
import { ${entityInterfaceName} } from "@${apiName}/infrastructure/entities/apis/${apiName}/business/${serviceNameLower}";
${nestedMapperImports}
export class ${mapperClassName} extends Mapper<${entityInterfaceName}, ${dtoInterfaceName}> {

    private static instance: ${mapperClassName};
${nestedMapperInstances}
    public constructor() { super(); }

    public static getInstance(): ${mapperClassName} {
        if (!${mapperClassName}.instance)
            ${mapperClassName}.instance = new ${mapperClassName}();
        return ${mapperClassName}.instance;
    }

    public mapFrom(param: ${entityInterfaceName}): ${dtoInterfaceName} {
        return {
${mapFromFields}
        }
    }

    public mapFromList(params: ${entityInterfaceName}[]): ${dtoInterfaceName}[] {
        return params.map((param: ${entityInterfaceName}) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ${dtoInterfaceName}): ${entityInterfaceName} {
        return {
${mapToFields}
        }
    }

    public mapToList(params: ${dtoInterfaceName}[]): ${entityInterfaceName}[] {
        return params.map((param: ${dtoInterfaceName}) => {
            return this.mapTo(param);
        })
    }
}`;
}

function generateIndividualNestedMapper(typeName: string, field: any, apiName: string, serviceName: string, operationName: string, type: 'request' | 'response' = 'response'): string {
  const serviceNameLower = serviceName.toLowerCase();
  const formattedTypeName = toPascalCase(typeName);
  const suffix = type === 'request' ? 'Request' : 'Response';
  
  // Evitar duplicación si el tipo ya termina en Request o Response
  const dtoInterfaceName = formattedTypeName.endsWith('Response') || formattedTypeName.endsWith('Request') 
    ? `I${formattedTypeName}DTO` 
    : `I${formattedTypeName}${suffix}DTO`;
  const entityInterfaceName = formattedTypeName.endsWith('Response') || formattedTypeName.endsWith('Request') 
    ? `I${formattedTypeName}Entity` 
    : `I${formattedTypeName}${suffix}Entity`;
  const mapperClassName = formattedTypeName.endsWith('Response') || formattedTypeName.endsWith('Request') 
    ? `${formattedTypeName}Mapper` 
    : `${formattedTypeName}${suffix}Mapper`;
  
  let mapFromFields = '';
  let mapToFields = '';
  let nestedMapperImports = '';
  let nestedMapperInstances = '';
  
  if (field.nestedFields && field.nestedFields.length > 0) {
    const nestedMappers: string[] = [];
    
    const mapFromMappings = field.nestedFields.map((nestedField: any) => {
      const dtoFieldName = convertToCamelCase(nestedField.name);
      const entityFieldName = nestedField.name;
      
      if (nestedField.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(nestedField.type)) {
        const nestedFieldTypeName = toPascalCase(nestedField.type);
        const nestedSuffix = type === 'request' ? 'Request' : 'Response';
        // Evitar duplicación si el tipo ya termina en Request o Response
        const nestedMapperClassName = nestedFieldTypeName.endsWith('Response') || nestedFieldTypeName.endsWith('Request') 
          ? `${nestedFieldTypeName}Mapper` 
          : `${nestedFieldTypeName}${nestedSuffix}Mapper`;
        const nestedMapperName = `${nestedField.type.toLowerCase()}${nestedSuffix.toLowerCase()}Mapper`;
        nestedMappers.push(`    private ${nestedMapperName} = InjectionPlatformBusinessAuthMapper.${nestedMapperClassName}()`);
        
        if (nestedField.isArray) {
          return `            ${dtoFieldName}: this.${nestedMapperName}.mapFromList(param.${entityFieldName})`;
        } else {
          return `            ${dtoFieldName}: this.${nestedMapperName}.mapFrom(param.${entityFieldName})`;
        }
      } else {
        return `            ${dtoFieldName}: param.${entityFieldName}`;
      }
    });
    
    const mapToMappings = field.nestedFields.map((nestedField: any) => {
      const dtoFieldName = convertToCamelCase(nestedField.name);
      const entityFieldName = nestedField.name;
      
      if (nestedField.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(nestedField.type)) {
        const nestedFieldTypeName = toPascalCase(nestedField.type);
        const nestedSuffix = type === 'request' ? 'Request' : 'Response';
        // Evitar duplicación si el tipo ya termina en Request o Response
        const nestedMapperName = nestedFieldTypeName.endsWith('Response') || nestedFieldTypeName.endsWith('Request') 
          ? `${nestedField.type.toLowerCase()}Mapper` 
          : `${nestedField.type.toLowerCase()}${nestedSuffix.toLowerCase()}Mapper`;
        
        if (nestedField.isArray) {
          return `            ${entityFieldName}: this.${nestedMapperName}.mapToList(param.${dtoFieldName})`;
        } else {
          return `            ${entityFieldName}: this.${nestedMapperName}.mapTo(param.${dtoFieldName})`;
        }
      } else {
        return `            ${entityFieldName}: param.${dtoFieldName}`;
      }
    });
    
    if (nestedMappers.length > 0) {
      nestedMapperImports = `import { InjectionPlatformBusinessAuthMapper } from "../../../injection/business/injection-platform-business-auth-mapper";\n`;
      nestedMapperInstances = nestedMappers.join('\n');
    }
    
    mapFromFields = mapFromMappings.join(',\n');
    mapToFields = mapToMappings.join(',\n');
  }

  return `import { Mapper } from "@bus/core/classes";
import { ${dtoInterfaceName} } from "@${apiName}/domain/models/apis/${apiName}/business/${serviceNameLower}/${operationName}";
import { ${entityInterfaceName} } from "@${apiName}/infrastructure/entities/apis/${apiName}/business/${serviceNameLower}/${operationName}";
${nestedMapperImports}
export class ${mapperClassName} extends Mapper<${entityInterfaceName}, ${dtoInterfaceName}> {

    private static instance: ${mapperClassName};
${nestedMapperInstances}
    public constructor() { super(); }

    public static getInstance(): ${mapperClassName} {
        if (!${mapperClassName}.instance)
            ${mapperClassName}.instance = new ${mapperClassName}();
        return ${mapperClassName}.instance;
    }

    public mapFrom(param: ${entityInterfaceName}): ${dtoInterfaceName} {
        return {
${mapFromFields}
        }
    }

    public mapFromList(params: ${entityInterfaceName}[]): ${dtoInterfaceName}[] {
        return params.map((param: ${entityInterfaceName}) => {
            return this.mapFrom(param)
        })
    }

    public mapTo(param: ${dtoInterfaceName}): ${entityInterfaceName} {
        return {
${mapToFields}
        }
    }

    public mapToList(params: ${dtoInterfaceName}[]): ${entityInterfaceName}[] {
        return params.map((param: ${dtoInterfaceName}) => {
            return this.mapTo(param);
        })
    }
}`;
}
async function generateNestedDTOsForOperation(serviceName: string, operation: any, type: 'request' | 'response', operationFolder: string, apiName: string, exportStatements: string[], operationName: string): Promise<void> {
  const fields = type === 'request' ? operation.fields : operation.responseFields;
  const generated = new Set<string>();

  function processNestedFields(field: any) {
    if (field.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type) && !generated.has(field.type)) {
      generated.add(field.type);
      
      // Generar DTO individual para cada interface anidada
      const nestedDTO = generateIndividualNestedDTO(field.type, field, apiName, serviceName, operationName, type);
      const baseFileName = field.type.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
      // Si el tipo ya termina en request o response, no duplicar
      const needsSuffix = !field.type.toLowerCase().endsWith('response') && !field.type.toLowerCase().endsWith('request');
      const nestedFileName = needsSuffix 
        ? `i-${baseFileName}-${type}-dto.ts`
        : `i-${baseFileName}-dto.ts`;
      
      fs.writeFileSync(
        path.join(operationFolder, nestedFileName),
        nestedDTO
      );
      
      const formattedFieldType = toPascalCase(field.type);
      const suffix = type === 'request' ? 'Request' : 'Response';
      // Evitar duplicación si el tipo ya termina en Request o Response
      const dtoClassName = formattedFieldType.endsWith('Response') || formattedFieldType.endsWith('Request') 
        ? `I${formattedFieldType}DTO` 
        : `I${formattedFieldType}${suffix}DTO`;
      exportStatements.push(`export { ${dtoClassName} } from './${operationName}/${nestedFileName.replace('.ts', '')}';`);

      // Procesar campos anidados recursivamente
      if (field.nestedFields && field.nestedFields.length > 0) {
        field.nestedFields.forEach(processNestedFields);
      }
    }
  }

  if (fields && fields.length > 0) {
    fields.forEach(processNestedFields);
  }
}

function generateBusinessDTO(serviceName: string, operation: any, type: 'request' | 'response', apiName: string = 'platform'): string {
  const operationName = operation.path.split('/').pop() || type;
  const cleanOperationName = operationName
    .replace(/_/g, '-')
    .split('-')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  const dtoInterfaceName = `I${toPascalCase(serviceName)}${cleanOperationName}${type === 'request' ? 'Request' : 'Response'}DTO`;
  
  const fields = type === 'request' ? operation.fields : operation.responseFields;
  
  let dtoFields = '';
  
  if (fields && fields.length > 0) {
    const fieldMappings = fields.map((field: any) => {
      const fieldName = convertToCamelCase(field.name); // DTO usa camelCase
      const optionalMark = field.required ? '' : '?';
      const arrayMark = field.isArray ? '[]' : '';
      
      // Si es un tipo complejo, usar el tipo con el sufijo DTO
      if (field.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type)) {
        const typeName = toPascalCase(field.type);
        const suffix = type === 'request' ? 'Request' : 'Response';
        // Evitar duplicación si el tipo ya termina en Request o Response
        const fieldType = typeName.endsWith('Response') || typeName.endsWith('Request') 
          ? `${typeName}DTO` 
          : `${typeName}${suffix}DTO`;
        return `  ${fieldName}${optionalMark}: ${fieldType}${arrayMark};`;
      } else {
        return `  ${fieldName}${optionalMark}: ${field.type}${arrayMark};`;
      }
    });
    
    dtoFields = fieldMappings.join('\n');
  }

  return `export interface ${dtoInterfaceName} {
${dtoFields}
}`;
}

function generateIndividualNestedDTO(typeName: string, field: any, apiName: string, serviceName: string, operationName: string, type: 'request' | 'response' = 'response'): string {
  const formattedTypeName = toPascalCase(typeName);
  const suffix = type === 'request' ? 'Request' : 'Response';
  // Evitar duplicación si el tipo ya termina en Request o Response
  const dtoInterfaceName = formattedTypeName.endsWith('Response') || formattedTypeName.endsWith('Request') 
    ? `I${formattedTypeName}DTO` 
    : `I${formattedTypeName}${suffix}DTO`;
  
  let dtoFields = '';
  
  if (field.nestedFields && field.nestedFields.length > 0) {
    const fieldMappings = field.nestedFields.map((nestedField: any) => {
      const fieldName = convertToCamelCase(nestedField.name); // DTO usa camelCase
      const optionalMark = nestedField.required ? '' : '?';
      const arrayMark = nestedField.isArray ? '[]' : '';
      
      // Si es un tipo complejo, usar el tipo con el sufijo DTO
      if (nestedField.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(nestedField.type)) {
        const nestedTypeName = toPascalCase(nestedField.type);
        const suffix = type === 'request' ? 'Request' : 'Response';
        // Evitar duplicación si el tipo ya termina en Request o Response
        const fieldType = nestedTypeName.endsWith('Response') || nestedTypeName.endsWith('Request') 
          ? `${nestedTypeName}DTO` 
          : `${nestedTypeName}${suffix}DTO`;
        return `  ${fieldName}${optionalMark}: ${fieldType}${arrayMark};`;
      } else {
        return `  ${fieldName}${optionalMark}: ${nestedField.type}${arrayMark};`;
      }
    });
    
    dtoFields = fieldMappings.join('\n');
  }

  return `export interface ${dtoInterfaceName} {
${dtoFields}
}`;
}

async function generateNestedEntitiesForOperation(serviceName: string, operation: any, type: 'request' | 'response', operationFolder: string, apiName: string, exportStatements: string[], operationName: string): Promise<void> {
  const fields = type === 'request' ? operation.fields : operation.responseFields;
  const generated = new Set<string>();

  function processNestedFields(field: any) {
    if (field.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(field.type) && !generated.has(field.type)) {
      generated.add(field.type);
      
      // Generar Entity individual para cada interface anidada
      const nestedEntity = generateIndividualNestedEntity(field.type, field, apiName, serviceName, operationName, type);
      const baseFileName = field.type.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
      // Si el tipo ya termina en request o response, no duplicar
      const needsSuffix = !field.type.toLowerCase().endsWith('response') && !field.type.toLowerCase().endsWith('request');
      const nestedFileName = needsSuffix 
        ? `i-${baseFileName}-${type}-entity.ts`
        : `i-${baseFileName}-entity.ts`;
      
      fs.writeFileSync(
        path.join(operationFolder, nestedFileName),
        nestedEntity
      );
      
      const formattedFieldType = toPascalCase(field.type);
      const suffix = type === 'request' ? 'Request' : 'Response';
      // Evitar duplicación si el tipo ya termina en Request o Response
      const entityClassName = formattedFieldType.endsWith('Response') || formattedFieldType.endsWith('Request') 
        ? `I${formattedFieldType}Entity` 
        : `I${formattedFieldType}${suffix}Entity`;
      exportStatements.push(`export { ${entityClassName} } from './${operationName}/${nestedFileName.replace('.ts', '')}';`);

      // Procesar campos anidados recursivamente
      if (field.nestedFields && field.nestedFields.length > 0) {
        field.nestedFields.forEach(processNestedFields);
      }
    }
  }

  if (fields && fields.length > 0) {
    fields.forEach(processNestedFields);
  }
}

function generateIndividualNestedEntity(typeName: string, field: any, apiName: string, serviceName: string, operationName: string, type: 'request' | 'response' = 'response'): string {
  const formattedTypeName = toPascalCase(typeName);
  const suffix = type === 'request' ? 'Request' : 'Response';
  // Evitar duplicación si el tipo ya termina en Request o Response
  const entityInterfaceName = formattedTypeName.endsWith('Response') || formattedTypeName.endsWith('Request') 
    ? `I${formattedTypeName}Entity` 
    : `I${formattedTypeName}${suffix}Entity`;
  
  let entityFields = '';
  
  if (field.nestedFields && field.nestedFields.length > 0) {
    const fieldMappings = field.nestedFields.map((nestedField: any) => {
      const fieldName = nestedField.name; // Entity usa snake_case como viene del swagger
      const optionalMark = nestedField.required ? '' : '?';
      const arrayMark = nestedField.isArray ? '[]' : '';
      
      // Si es un tipo complejo, usar el tipo con el sufijo Entity
      if (nestedField.type && !['string', 'number', 'boolean', 'any', 'object', 'array'].includes(nestedField.type)) {
        const nestedTypeName = toPascalCase(nestedField.type);
        const suffix = type === 'request' ? 'Request' : 'Response';
        // Evitar duplicación si el tipo ya termina en Request o Response
        const fieldType = nestedTypeName.endsWith('Response') || nestedTypeName.endsWith('Request') 
          ? `I${nestedTypeName}Entity` 
          : `I${nestedTypeName}${suffix}Entity`;
        return `  ${fieldName}${optionalMark}: ${fieldType}${arrayMark};`;
      } else {
        return `  ${fieldName}${optionalMark}: ${nestedField.type}${arrayMark};`;
      }
    });
    
    entityFields = fieldMappings.join('\n');
  }

  return `export interface ${entityInterfaceName} {
${entityFields}
}`;
}
