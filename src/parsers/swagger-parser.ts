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
  nestedFields?: EntityField[];
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
  businessOperations?: {
    operationId: string;
    method: string;
    path: string;
    summary?: string;
    requestSchema?: string;
    responseSchema?: string;
    fields: EntityField[];
    responseFields?: EntityField[];
    isResponseArray?: boolean;
  }[];
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
    if (!this.openApiDoc?.paths || !this.openApiDoc?.components?.schemas) {
      return [];
    }

    const allTags = new Set<string>();
    const tagOperations = new Map<string, Set<string>>();

    // Recopilar todos los tags y sus operaciones
    for (const path in this.openApiDoc.paths) {
      const pathItem = this.openApiDoc.paths[path];
      if (!pathItem || typeof pathItem !== 'object') continue;

      const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
      
      for (const method of methods) {
        const operation = pathItem[method];
        if (operation && operation.tags) {
          operation.tags.forEach(tag => {
            allTags.add(tag);
            
            if (!tagOperations.has(tag)) {
              tagOperations.set(tag, new Set());
            }
            
            // Mapear método HTTP a operación CRUD
            const crudOperation = this.mapHttpMethodToCrud(method, path);
            if (crudOperation) {
              tagOperations.get(tag)!.add(crudOperation);
            }
          });
        }
      }
    }

    // Filtrar tags que SÍ tienen CRUD completo (son entidades)
    const entities: string[] = [];
    
    for (const tag of allTags) {
      const operations = tagOperations.get(tag) || new Set();
      const hasCompleteCrud = this.hasCompleteCrudOperations(operations);
      
      if (hasCompleteCrud) {
        entities.push(tag);
      }
    }

    return entities.sort();
  }

  /**
   * Obtiene los servicios de negocio disponibles basándose en tags que NO tienen CRUD completo
   */
  getAvailableBusinessServices(): string[] {
    if (!this.openApiDoc?.paths) {
      return [];
    }

    const allTags = new Set<string>();
    const tagOperations = new Map<string, Set<string>>();

    // Recopilar todos los tags y sus operaciones
    for (const path in this.openApiDoc.paths) {
      const pathItem = this.openApiDoc.paths[path];
      if (!pathItem || typeof pathItem !== 'object') continue;

      const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
      
      for (const method of methods) {
        const operation = pathItem[method];
        if (operation && operation.tags) {
          operation.tags.forEach(tag => {
            allTags.add(tag);
            
            if (!tagOperations.has(tag)) {
              tagOperations.set(tag, new Set());
            }
            
            // Mapear método HTTP a operación CRUD
            const crudOperation = this.mapHttpMethodToCrud(method, path);
            if (crudOperation) {
              tagOperations.get(tag)!.add(crudOperation);
            }
          });
        }
      }
    }

    // Filtrar tags que NO tienen CRUD completo (son servicios de negocio)
    const businessServices: string[] = [];
    
    for (const tag of allTags) {
      const operations = tagOperations.get(tag) || new Set();
      const hasCompleteCrud = this.hasCompleteCrudOperations(operations);
      
      if (!hasCompleteCrud) {
        businessServices.push(tag);
      }
    }

    return businessServices.sort();
  }

  /**
   * Mapea un método HTTP y path a una operación CRUD
   */
  private mapHttpMethodToCrud(method: string, path: string): string | null {
    switch (method.toLowerCase()) {
      case 'post':
        // POST /entity/list es list, no save
        if (path.includes('/list')) {
          return 'list';
        }
        return 'save';
      case 'get':
        // Si el path tiene parámetros, es read; si no, es list
        return (path.includes('{') || path.includes('/:')) ? 'read' : 'list';
      case 'put':
      case 'patch':
        return 'update';
      case 'delete':
        return 'delete';
      default:
        return null;
    }
  }

  /**
   * Verifica si un conjunto de operaciones incluye CRUD completo
   */
  private hasCompleteCrudOperations(operations: Set<string>): boolean {
    const requiredOperations = ['save', 'update', 'list', 'delete', 'read'];
    return requiredOperations.every(op => operations.has(op));
  }

  /**
   * Obtiene el schema de un servicio de negocio basándose en sus operaciones Request/Response
   */
  getBusinessServiceSchema(serviceName: string): EntitySchema | null {
    if (!this.openApiDoc?.paths) {
      return null;
    }

    const operations = {
      create: false,
      read: false,
      update: false,
      delete: false,
      list: false
    };

    const businessOperations: any[] = [];
    let description = '';

    // Buscar operaciones relacionadas con este servicio
    for (const path in this.openApiDoc.paths) {
      const pathItem = this.openApiDoc.paths[path];
      if (!pathItem || typeof pathItem !== 'object') continue;

      const methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
      
      for (const method of methods) {
        const operation = pathItem[method];
        if (operation && operation.tags && operation.tags.includes(serviceName)) {
          // Determinar tipo de operación
          if (method === 'post') operations.create = true;
          if (method === 'get') {
            if (path.includes('{') || path.includes('/:')) {
              operations.read = true;
            } else {
              operations.list = true;
            }
          }
          if (method === 'put' || method === 'patch') operations.update = true;
          if (method === 'delete') operations.delete = true;

          // Obtener descripción
          if (operation.description && !description) {
            description = operation.description;
          }

          // Extraer información de la operación de negocio
          const businessOp: any = {
            operationId: operation.operationId,
            method: method.toUpperCase(),
            path: path,
            summary: operation.summary,
            requestSchema: null,
            responseSchema: null,
            fields: []
          };

          // Extraer schema del requestBody
          if (operation.requestBody && 'content' in operation.requestBody) {
            const content = operation.requestBody.content;
            if (content['application/json'] && content['application/json'].schema) {
              const schema = content['application/json'].schema as any;
              if (schema.$ref) {
                businessOp.requestSchema = schema.$ref.split('/').pop();
              }
              
              // Extraer campos del request
              if (schema.properties) {
                for (const [fieldName, fieldSchema] of Object.entries(schema.properties)) {
                  if (typeof fieldSchema === 'object' && fieldSchema !== null) {
                    const field = this.parseFieldSchema(
                      fieldName, 
                      fieldSchema as any, 
                      schema.required || []
                    );
                    businessOp.fields.push(field);
                  }
                }
              }
            }
          }

          // Extraer schema de la response (buscar 200, 201, o el primer código de éxito 2xx)
          const successResponse = operation.responses?.['200'] || operation.responses?.['201'] || 
            Object.entries(operation.responses || {}).find(([code]) => code.startsWith('2'))?.[1];
          
          if (successResponse) {
            const responseObj = successResponse as any;
            if ('content' in responseObj && responseObj.content && responseObj.content['application/json'] && responseObj.content['application/json'].schema) {
              const schema = responseObj.content['application/json'].schema as any;
              
              // Manejar tanto referencias ($ref) como schemas expandidos
              let responseSchemaObj = null;
              let responseSchemaName = null;
              
              if (schema.$ref) {
                // Schema por referencia
                responseSchemaName = schema.$ref.split('/').pop();
                businessOp.responseSchema = responseSchemaName;
                if (this.openApiDoc?.components?.schemas && responseSchemaName) {
                  responseSchemaObj = this.openApiDoc.components.schemas[responseSchemaName] as any;
                }
              } else if (schema.anyOf) {
                // Manejar anyOf directamente en el schema principal
                console.log('  Found anyOf in main schema');
                for (const subSchema of schema.anyOf) {
                  if (subSchema.$ref) {
                    responseSchemaName = subSchema.$ref.split('/').pop();
                    if (this.openApiDoc?.components?.schemas && responseSchemaName) {
                      responseSchemaObj = this.openApiDoc.components.schemas[responseSchemaName] as any;
                      console.log('  Using first $ref from anyOf:', responseSchemaName);
                      break;
                    }
                  } else if (subSchema.properties && Object.keys(subSchema.properties).length > 0) {
                    // Usar el primer schema con propiedades válidas
                    responseSchemaObj = subSchema;
                    responseSchemaName = subSchema.title || 'InlineResponse';
                    console.log('  Using first properties schema from anyOf:', responseSchemaName);
                    break;
                  }
                }
                businessOp.responseSchema = responseSchemaName || 'InlineResponse';
              } else if (schema.properties) {
                // Schema expandido directamente
                responseSchemaObj = schema;
                businessOp.responseSchema = 'InlineResponse';
              }
              
              if (responseSchemaObj && responseSchemaObj.properties) {
                businessOp.responseFields = [];
                
                // Buscar específicamente el campo "response" y extraer su contenido
                console.log('  Response schema properties:', Object.keys(responseSchemaObj.properties));
                if (responseSchemaObj.properties.response) {
                  const responseField = responseSchemaObj.properties.response as any;
                  console.log('  Found response field, analyzing structure...');
                  console.log('  Response field type:', responseField.type);
                  console.log('  Response field has anyOf:', !!responseField.anyOf);

                  
                  // Si el campo response tiene propiedades (es un objeto)
                  if (responseField.properties) {
                    for (const [fieldName, fieldSchema] of Object.entries(responseField.properties)) {
                      if (typeof fieldSchema === 'object' && fieldSchema !== null) {
                        const field = this.parseFieldSchemaWithRefs(
                          fieldName, 
                          fieldSchema as any, 
                          responseField.required || []
                        );
                        businessOp.responseFields.push(field);
                      }
                    }
                  } else if (responseField.anyOf || responseField.oneOf) {
                    // Manejar casos donde response tiene anyOf/oneOf
                    const schemas = responseField.anyOf || responseField.oneOf;
                    console.log(`  Processing ${schemas.length} schemas in anyOf...`);
                    let foundSpecificSchema = false;
                    
                    // Buscar el primer schema útil en anyOf (que no sea null)
                    for (const [index, subSchema] of schemas.entries()) {
                      console.log(`  Schema ${index + 1}:`, {
                        type: subSchema.type,
                        hasRef: !!subSchema.$ref,
                        hasProperties: !!subSchema.properties,
                        hasItems: !!subSchema.items,
                        title: subSchema.title
                      });
                      
                      if (subSchema.$ref) {
                        // Si es una referencia directa, resolver y usar sus propiedades
                        const refName = subSchema.$ref.split('/').pop();
                        if (this.openApiDoc?.components?.schemas && refName) {
                          const refSchemaObj = this.openApiDoc.components.schemas[refName] as any;
                          if (refSchemaObj && refSchemaObj.properties) {
                            for (const [fieldName, fieldSchema] of Object.entries(refSchemaObj.properties)) {
                              if (typeof fieldSchema === 'object' && fieldSchema !== null) {
                                const field = this.parseFieldSchemaWithRefs(
                                  fieldName, 
                                  fieldSchema as any, 
                                  refSchemaObj.required || []
                                );
                                

                                
                                businessOp.responseFields.push(field);
                              }
                            }
                            foundSpecificSchema = true;
                            break;
                          }
                        }
                      } else if (subSchema.properties && Object.keys(subSchema.properties).length > 0) {
                        // Encontramos un schema específico con propiedades directas
                        for (const [fieldName, fieldSchema] of Object.entries(subSchema.properties)) {
                          if (typeof fieldSchema === 'object' && fieldSchema !== null) {
                            const field = this.parseFieldSchemaWithRefs(
                              fieldName, 
                              fieldSchema as any, 
                              subSchema.required || []
                            );

                            
                            businessOp.responseFields.push(field);
                          }
                        }
                        foundSpecificSchema = true;
                        break;
                      } else if (subSchema.type === 'array' && subSchema.items) {
                        // ✅ MANEJAR ARRAY CON ITEMS.PROPERTIES (como AppointmentTableResponse[])
                        const arrayItemSchema = subSchema.items;
                        console.log('    🎯 Processing array with items.properties...');
                        
                        if (arrayItemSchema.properties) {
                          // Extraer todos los campos del items.properties
                          for (const [fieldName, fieldSchema] of Object.entries(arrayItemSchema.properties)) {
                            if (typeof fieldSchema === 'object' && fieldSchema !== null) {
                              const field = this.parseFieldSchemaWithRefs(
                                fieldName,
                                fieldSchema as any,
                                arrayItemSchema.required || []
                              );
                              businessOp.responseFields.push(field);
                            }
                          }
                          foundSpecificSchema = true;
                          // Marcar que la respuesta es un array
                          businessOp.isResponseArray = true;
                          console.log(`    ✅ Extracted ${businessOp.responseFields.length} fields from array items`);
                          break;
                        }
                      }
                    }
                    
                    // Si no encontramos schema específico, generar campos por contexto
                    if (!foundSpecificSchema) {
                      this.generateContextualResponseFields(operation.operationId || '', businessOp);
                    }
                  }
                } else {
                  // Si no hay campo response específico, usar todos los campos del schema
                  for (const [fieldName, fieldSchema] of Object.entries(responseSchemaObj.properties)) {
                    if (typeof fieldSchema === 'object' && fieldSchema !== null) {
                      const field = this.parseFieldSchemaWithRefs(
                        fieldName, 
                        fieldSchema as any, 
                        responseSchemaObj.required || []
                      );
                      businessOp.responseFields.push(field);
                    }
                  }
                }
              }
            }
          }

          businessOperations.push(businessOp);
        }
      }
    }

    return {
      name: serviceName,
      description: description || `Servicio de negocio ${serviceName}`,
      fields: businessOperations.length > 0 ? businessOperations[0].fields : [], // Para compatibilidad
      operations,
      businessOperations // Nueva propiedad con operaciones de negocio
    };
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

    // Priorizar el schema que tenga el campo 'id' (normalmente Update o base)
    let primarySchema = schemas[updateSchemaName] || schemas[baseSchemaName] || schemas[saveSchemaName];

    // Si ninguno existe, usar el primero disponible
    if (!primarySchema) {
      const availableSchemas = Object.keys(schemas).filter(name => 
        name.includes(entityName) && ('properties' in (schemas[name] || {}))
      );
      if (availableSchemas.length > 0) {
        primarySchema = schemas[availableSchemas[0]];
      }
    }

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
    let nestedFields: EntityField[] | undefined;
    if (schema.type === 'array' && schema.items && typeof schema.items === 'object') {
      isArray = true;
      const itemSchema = schema.items as any;
      
      // Si el item es una referencia, obtener el tipo de la referencia
      if (itemSchema.$ref) {
        const refName = itemSchema.$ref.split('/').pop();
        type = refName || 'any';
        
        // Extraer los campos anidados del elemento del array si es un objeto
        if (this.openApiDoc?.components?.schemas && refName) {
          const refSchema = this.openApiDoc.components.schemas[refName] as any;
          if (refSchema && refSchema.type === 'object' && refSchema.properties) {
            nestedFields = [];
                  for (const [propName, propSchema] of Object.entries(refSchema.properties)) {
        if (typeof propSchema === 'object' && propSchema !== null) {
          const nestedField = this.parseFieldSchemaWithRefs(
            propName,
            propSchema,
            refSchema.required || []
          );
          nestedFields.push(nestedField);
        }
      }
          }
        }
      } else if (itemSchema.title && itemSchema.properties) {
        // Si el item tiene title y properties (como FilterManager), usar el title como tipo
        type = itemSchema.title;
        
        // Extraer los campos anidados del inline schema
        nestedFields = [];
        for (const [propName, propSchema] of Object.entries(itemSchema.properties)) {
          if (typeof propSchema === 'object' && propSchema !== null) {
            const nestedField = this.parseFieldSchemaWithRefs(
              propName,
              propSchema,
              itemSchema.required || []
            );
            nestedFields.push(nestedField);
          }
        }
      } else {
        type = this.getTypeFromSchema(itemSchema);
      }
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
      // Buscar el primer schema útil (que no sea null)
      for (const subSchema of schema.anyOf) {
        if (typeof subSchema === 'object' && (subSchema as any).type !== 'null') {
          if ((subSchema as any).type === 'array' && (subSchema as any).items) {
            // Array en anyOf - procesar como array
            isArray = true;
            const itemSchema = (subSchema as any).items;
            
            if (itemSchema.$ref) {
              const refName = itemSchema.$ref.split('/').pop();
              type = refName || 'any';
            } else if (itemSchema.title && itemSchema.properties) {
              // Inline schema con title (como FilterManager)
              type = itemSchema.title;
              
              // Extraer campos anidados
              nestedFields = [];
              for (const [propName, propSchema] of Object.entries(itemSchema.properties)) {
                if (typeof propSchema === 'object' && propSchema !== null) {
                  const nestedField = this.parseFieldSchemaWithRefs(
                    propName,
                    propSchema,
                    itemSchema.required || []
                  );
                  nestedFields.push(nestedField);
                }
              }
            } else {
              type = this.getTypeFromSchema(itemSchema);
            }
            break;
          } else {
            // No es array, usar lógica normal
            type = this.getTypeFromSchema(subSchema as OpenAPIV3.SchemaObject);
            break;
          }
        }
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
      enumValues,
      nestedFields
    };
  }

  private getTypeFromSchema(schema: OpenAPIV3.SchemaObject): string {
    if (schema.format === 'uuid4') return 'string';
    if (schema.format === 'date-time') return 'string';
    if (schema.format === 'date') return 'string';

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
    schema.    fields.forEach(field => {
      const required = field.required ? '🔴' : '🔵';
      const array = field.isArray ? '[]' : '';
      const description = field.description ? ` - ${field.description}` : '';
      console.log(`  ${required} ${field.name}: ${field.type}${array}${description}`);
    });
  }

  /**
   * Genera campos de respuesta basándose en el contexto de la operación
   */
  private generateContextualResponseFields(operationId: string, businessOp: any): void {
    const opId = operationId.toLowerCase();
    
    if (opId.includes('login')) {
      // Para login, típicamente se retorna información del usuario/rol
      businessOp.responseFields.push(
        { name: 'user_id', type: 'string', required: false },
        { name: 'rol_id', type: 'string', required: false },
        { name: 'rol_code', type: 'string', required: false },
        { name: 'permissions', type: 'string[]', required: false, isArray: true },
        { name: 'token', type: 'string', required: false },
        { name: 'expires_at', type: 'string', required: false }
      );
    } else if (opId.includes('refresh')) {
      // Para refresh token
      businessOp.responseFields.push(
        { name: 'token', type: 'string', required: false },
        { name: 'expires_at', type: 'string', required: false }
      );
    } else if (opId.includes('create') && opId.includes('token')) {
      // Para crear API token
      businessOp.responseFields.push(
        { name: 'token', type: 'string', required: false },
        { name: 'token_id', type: 'string', required: false },
        { name: 'expires_at', type: 'string', required: false }
      );
    } else {
      // Fallback genérico
      businessOp.responseFields.push(
        { name: 'data', type: 'any', required: false }
      );
    }
  }

  /**
   * Parsea un campo resolviendo referencias $ref
   */
  private parseFieldSchemaWithRefs(name: string, schema: any, required: string[]): EntityField {
    // Si es una referencia, resolverla
    if (schema.$ref) {
      const refName = schema.$ref.split('/').pop();
      if (this.openApiDoc?.components?.schemas && refName) {
        const refSchema = this.openApiDoc.components.schemas[refName] as any;
        if (refSchema) {
          // Para enums o tipos simples, usar el nombre de la referencia
          if (refSchema.enum) {
            return {
              name,
              type: refName, // Usar el nombre del enum
              required: required.includes(name),
              isEnum: true,
              enumValues: refSchema.enum
            };
          }
          // Para objetos complejos, usar el nombre de la referencia y extraer campos anidados
          if (refSchema.type === 'object') {
            let nestedFields: EntityField[] | undefined;
            if (refSchema.properties) {
              nestedFields = [];
              for (const [propName, propSchema] of Object.entries(refSchema.properties)) {
                if (typeof propSchema === 'object' && propSchema !== null) {
                  let nestedField: EntityField;
                  if ((propSchema as any).$ref) {
                    nestedField = this.parseFieldSchemaWithRefs(
                      propName,
                      propSchema,
                      refSchema.required || []
                    );
                  } else if ((propSchema as any).type === 'object' && (propSchema as any).properties) {
                    // Recursividad para objetos anidados inline
                    nestedField = this.parseFieldSchemaWithRefs(
                      propName,
                      propSchema,
                      refSchema.required || []
                    );
                  } else if ((propSchema as any).type === 'array' && (propSchema as any).items) {
                    // Recursividad para arrays anidados
                    nestedField = this.parseFieldSchemaWithRefs(
                      propName,
                      propSchema,
                      refSchema.required || []
                    );
                  } else {
                    nestedField = this.parseFieldSchema(propName, propSchema as any, refSchema.required || []);
                    if ((propSchema as any).title && nestedField.type === 'object') {
                      nestedField.type = (propSchema as any).title;
                    }
                  }
                  nestedFields.push(nestedField);
                }
              }
            }
            return {
              name,
              type: refName,
              required: required.includes(name),
              nestedFields: nestedFields
            };
          }
          // Para arrays referenciados
          if (refSchema.type === 'array' && refSchema.items) {
            const itemField = this.parseFieldSchemaWithRefs(
              name,
              refSchema.items,
              refSchema.required || []
            );
            return {
              name,
              type: itemField.type,
              required: required.includes(name),
              isArray: true,
              nestedFields: itemField.nestedFields
            };
          }
          // Para tipos primitivos, usar el tipo base
          if (refSchema.type) {
            return {
              name,
              type: this.getTypeFromSchema(refSchema),
              required: required.includes(name)
            };
          }
        }
      }
    }
    // Si es un objeto con propiedades directas (ya expandido por el parser de Swagger)
    if (schema.type === 'object' && schema.properties) {
      const nestedFields: EntityField[] = [];
      for (const [propName, propSchema] of Object.entries(schema.properties)) {
        if (typeof propSchema === 'object' && propSchema !== null) {
          let nestedField: EntityField;
          if ((propSchema as any).$ref) {
            nestedField = this.parseFieldSchemaWithRefs(
              propName,
              propSchema,
              schema.required || []
            );
          } else if ((propSchema as any).type === 'object' && (propSchema as any).properties) {
            // Recursividad para objetos anidados inline
            nestedField = this.parseFieldSchemaWithRefs(
              propName,
              propSchema,
              schema.required || []
            );
          } else if ((propSchema as any).type === 'array' && (propSchema as any).items) {
            // Recursividad para arrays anidados
            nestedField = this.parseFieldSchemaWithRefs(
              propName,
              propSchema,
              schema.required || []
            );
          } else {
            nestedField = this.parseFieldSchema(propName, propSchema as any, schema.required || []);
            if ((propSchema as any).title && nestedField.type === 'object') {
              nestedField.type = (propSchema as any).title;
            }
          }
          nestedFields.push(nestedField);
        }
      }
      return {
        name,
        type: schema.title || 'object',
        required: required.includes(name),
        nestedFields: nestedFields
      };
    }
    // Si es un array, manejar el tipo del elemento y sus nestedFields
    if (schema.type === 'array' && schema.items) {
      const itemField = this.parseFieldSchemaWithRefs(
        name,
        schema.items,
        required
      );
      return {
        name,
        type: itemField.type,
        required: required.includes(name),
        isArray: true,
        nestedFields: itemField.nestedFields
      };
    }

    
    // Si no es una referencia, usar el parser normal
    return this.parseFieldSchema(name, schema, required);
  }
}
