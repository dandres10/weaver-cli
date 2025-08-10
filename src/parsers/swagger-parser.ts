import axios from 'axios';
import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';

export interface EntityField {
  name: string;
  type: string;
  required: boolean;
  format?: string;
  description?: string;
  maxLength?: number;
  isArray?: boolean;
  isEnum?: boolean;
  enumValues?: string[];
}

export interface EntitySchema {
  name: string;
  description?: string;
  fields: EntityField[];
  operations: {
    create?: boolean;
    read?: boolean;
    update?: boolean;
    delete?: boolean;
    list?: boolean;
  };
}

export class SwaggerAnalyzer {
  private openApiDoc: OpenAPIV3.Document | null = null;
  private detectedApiName: string | null = null;

  async loadFromUrl(url: string): Promise<void> {
    try {
      console.log(`🔍 Descargando OpenAPI desde: ${url}`);
      const response = await axios.get(url);
      this.openApiDoc = await SwaggerParser.validate(response.data) as OpenAPIV3.Document;
      this.detectedApiName = this.detectApiName();
      console.log(`✅ OpenAPI cargado exitosamente`);
      if (this.detectedApiName) {
        console.log(`🔗 API detectada: ${this.detectedApiName}`);
      }
    } catch (error) {
      throw new Error(`Error cargando OpenAPI: ${error}`);
    }
  }

  getAvailableEntities(): string[] {
    if (!this.openApiDoc?.components?.schemas) {
      return [];
    }

    const schemas = this.openApiDoc.components.schemas;
    const entities: string[] = [];

    // Buscar schemas que parecen entidades (que tienen Save, Update o están en operaciones CRUD)
    for (const schemaName in schemas) {
      // Filtrar schemas que son entidades (no son request/response/error schemas)
      if (this.isEntitySchema(schemaName)) {
        const entityName = this.extractEntityName(schemaName);
        if (entityName && !entities.includes(entityName)) {
          entities.push(entityName);
        }
      }
    }

    return entities.sort();
  }

  getEntitySchema(entityName: string): EntitySchema | null {
    if (!this.openApiDoc?.components?.schemas) {
      return null;
    }

    const schemas = this.openApiDoc.components.schemas;

    // Buscar el schema base de la entidad
    const saveSchemaName = `${entityName}Save`;
    const updateSchemaName = `${entityName}Update`;
    const baseSchemaName = entityName;

    let primarySchema = schemas[saveSchemaName] || schemas[baseSchemaName] || schemas[updateSchemaName];

    if (!primarySchema || !('properties' in primarySchema)) {
      return null;
    }

    const fields = this.extractFields(primarySchema as OpenAPIV3.SchemaObject);
    const operations = this.analyzeOperations(entityName);

    return {
      name: entityName,
      description: primarySchema.description,
      fields,
      operations
    };
  }

  private isEntitySchema(schemaName: string): boolean {
    // Excluir schemas que claramente no son entidades
    const excludePatterns = [
      'Response', 'Error', 'HTTPValidationError', 'ValidationError',
      'Pagination', 'MESSAGE_TYPE', 'NOTIFICATION_TYPE'
    ];

    if (excludePatterns.some(pattern => schemaName.includes(pattern))) {
      return false;
    }

    // Incluir schemas que terminan en Save, Update o que están en operaciones CRUD
    return schemaName.endsWith('Save') ||
      schemaName.endsWith('Update') ||
      this.hasEntityOperations(schemaName);
  }

  private extractEntityName(schemaName: string): string | null {
    // Extraer nombre de la entidad removiendo sufijos
    if (schemaName.endsWith('Save')) {
      return schemaName.replace('Save', '');
    }
    if (schemaName.endsWith('Update')) {
      return schemaName.replace('Update', '');
    }

    // Si es un schema base, verificar si tiene operaciones CRUD
    if (this.hasEntityOperations(schemaName)) {
      return schemaName;
    }

    return null;
  }

  private hasEntityOperations(entityName: string): boolean {
    if (!this.openApiDoc?.paths) return false;

    const entityPath = `/${entityName.toLowerCase()}`;
    const entityPaths = Object.keys(this.openApiDoc.paths).filter(path =>
      path.includes(entityPath) || path.includes(entityName.toLowerCase())
    );

    return entityPaths.length > 0;
  }

  private extractFields(schema: OpenAPIV3.SchemaObject): EntityField[] {
    const fields: EntityField[] = [];

    if (!schema.properties) return fields;

    for (const [fieldName, fieldSchema] of Object.entries(schema.properties)) {
      if (typeof fieldSchema === 'boolean') continue;

      const field = this.parseFieldSchema(fieldName, fieldSchema as OpenAPIV3.SchemaObject, schema.required || []);
      fields.push(field);
    }

    return fields;
  }

  private parseFieldSchema(name: string, schema: OpenAPIV3.SchemaObject, requiredFields: string[]): EntityField {
    let type = 'string';
    let isArray = false;
    let isEnum = false;
    let enumValues: string[] | undefined;

    // Manejar arrays
    if (schema.type === 'array' && schema.items && typeof schema.items === 'object') {
      isArray = true;
      const itemSchema = schema.items as OpenAPIV3.SchemaObject;
      type = this.getTypeFromSchema(itemSchema);
    } else {
      type = this.getTypeFromSchema(schema);
    }

    // Manejar enums
    if (schema.enum) {
      isEnum = true;
      enumValues = schema.enum.map(val => String(val));
      type = 'enum';
    }

    // Manejar anyOf (generalmente para campos opcionales)
    if (schema.anyOf) {
      const nonNullSchema = schema.anyOf.find(s =>
        typeof s === 'object' && !('$ref' in s) && (s as any).type !== 'null'
      ) as OpenAPIV3.SchemaObject;

      if (nonNullSchema) {
        type = this.getTypeFromSchema(nonNullSchema);
      }
    }

    return {
      name,
      type,
      required: requiredFields.includes(name),
      format: schema.format,
      description: schema.description,
      maxLength: schema.maxLength,
      isArray,
      isEnum,
      enumValues
    };
  }

  private getTypeFromSchema(schema: OpenAPIV3.SchemaObject): string {
    if (schema.format === 'uuid4') return 'string';
    if (schema.format === 'date-time') return 'Date';
    if (schema.format === 'date') return 'Date';

    switch (schema.type) {
      case 'string': return 'string';
      case 'integer': return 'number';
      case 'number': return 'number';
      case 'boolean': return 'boolean';
      case 'array': return 'any[]';
      case 'object': return 'object';
      default: return 'any';
    }
  }

  private analyzeOperations(entityName: string): EntitySchema['operations'] {
    if (!this.openApiDoc?.paths) {
      return { create: false, read: false, update: false, delete: false, list: false };
    }

    const operations = {
      create: false,
      read: false,
      update: false,
      delete: false,
      list: false
    };

    const entityLower = entityName.toLowerCase();
    const entityKebab = entityName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);

    for (const [path, pathItem] of Object.entries(this.openApiDoc.paths)) {
      if (!pathItem || typeof pathItem !== 'object') continue;

      // Buscar paths relacionados con la entidad
      const pathLower = path.toLowerCase();
      if (!pathLower.includes(entityLower) && !pathLower.includes(entityKebab)) {
        continue;
      }

      // Analizar operaciones HTTP
      if (pathItem.post) operations.create = true;
      if (pathItem.get && path.includes('{id}')) operations.read = true;
      if (pathItem.get && path.includes('/list')) operations.list = true;
      if (pathItem.put) operations.update = true;
      if (pathItem.delete) operations.delete = true;
    }

    return operations;
  }

    /**
   * Detecta el nombre de la API basándose en el título, URL base o paths
   */
  private detectApiName(): string | null {
    if (!this.openApiDoc) return null;

    // 1. Intentar extraer del título
    if (this.openApiDoc.info?.title) {
      const title = this.openApiDoc.info.title.toLowerCase();
      
      // Buscar patrones comunes
      const patterns = [
        /(\w+)\s+api/i,           // "Platform API" -> "platform"
        /api\s+(\w+)/i,           // "API Platform" -> "platform"
        /(\w+)\s+backend/i,       // "Platform Backend" -> "platform"
        /(\w+)\s+service/i,       // "Platform Service" -> "platform"
        /(\w+)\s+aws/i,           // "Platform AWS" -> "platform"
      ];

      for (const pattern of patterns) {
        const match = title.match(pattern);
        if (match && match[1] && match[1] !== 'api') {
          return match[1].toLowerCase();
        }
      }
      
      // Si no hay patrón, usar la primera palabra significativa
      const words = title.split(/\s+/).filter(word => 
        word.length > 2 && !['api', 'backend', 'service', 'rest'].includes(word.toLowerCase())
      );
      if (words.length > 0) {
        return words[0].toLowerCase();
      }
    }

    // 2. Intentar extraer de los servers/base URL
    if (this.openApiDoc.servers && this.openApiDoc.servers.length > 0) {
      const serverUrl = this.openApiDoc.servers[0].url;
      const urlMatch = serverUrl.match(/\/api\/(\w+)/i);
      if (urlMatch) {
        return urlMatch[1].toLowerCase();
      }
    }

    // 3. Intentar extraer de los paths más comunes
    if (this.openApiDoc.paths) {
      const paths = Object.keys(this.openApiDoc.paths);
      const pathSegments = paths
        .flatMap(path => path.split('/'))
        .filter(segment => segment && segment !== 'api' && !segment.startsWith('{'))
        .map(segment => segment.toLowerCase());
      
      // Buscar el segmento más común que no sea una entidad
      const segmentCounts: { [key: string]: number } = {};
      pathSegments.forEach(segment => {
        segmentCounts[segment] = (segmentCounts[segment] || 0) + 1;
      });
      
      const sortedSegments = Object.entries(segmentCounts)
        .sort(([,a], [,b]) => b - a)
        .map(([segment]) => segment);
      
      // Filtrar nombres de entidades conocidas
      const entityNames = this.getAvailableEntities().map(e => e.toLowerCase());
      const nonEntitySegments = sortedSegments.filter(segment => 
        !entityNames.includes(segment) && 
        segment.length > 2 &&
        !['list', 'create', 'update', 'delete', 'get', 'post', 'put'].includes(segment)
      );
      
      if (nonEntitySegments.length > 0) {
        return nonEntitySegments[0];
      }
    }

    return null;
  }

  /**
   * Obtiene el nombre de la API detectado
   */
  getDetectedApiName(): string | null {
    return this.detectedApiName;
  }

  /**
   * Sugiere posibles nombres de API basándose en análisis
   */
  suggestApiNames(): string[] {
    const suggestions: string[] = [];
    
    if (this.detectedApiName) {
      suggestions.push(this.detectedApiName);
    }

    // Agregar sugerencias comunes
    const commonApiNames = ['platform', 'api', 'core', 'backend', 'service', 'main'];
    commonApiNames.forEach(name => {
      if (!suggestions.includes(name)) {
        suggestions.push(name);
      }
    });

    return suggestions;
  }

  printEntityInfo(entityName: string): void {
    const schema = this.getEntitySchema(entityName);
    if (!schema) {
      console.log(`❌ No se encontró información para la entidad: ${entityName}`);
      return;
    }

    console.log(`\n📋 Información de la entidad: ${entityName}`);
    if (schema.description) {
      console.log(`📝 Descripción: ${schema.description}`);
    }
    
    console.log(`\n🔧 Operaciones disponibles:`);
    console.log(`  • Crear: ${schema.operations.create ? '✅' : '❌'}`);
    console.log(`  • Leer: ${schema.operations.read ? '✅' : '❌'}`);
    console.log(`  • Actualizar: ${schema.operations.update ? '✅' : '❌'}`);
    console.log(`  • Eliminar: ${schema.operations.delete ? '✅' : '❌'}`);
    console.log(`  • Listar: ${schema.operations.list ? '✅' : '❌'}`);

    console.log(`\n📊 Campos (${schema.fields.length}):`);
    schema.fields.forEach(field => {
      const required = field.required ? '🔴' : '🔵';
      const array = field.isArray ? '[]' : '';
      const description = field.description ? ` - ${field.description}` : '';
      console.log(`  ${required} ${field.name}: ${field.type}${array}${description}`);
    });
  }
}
