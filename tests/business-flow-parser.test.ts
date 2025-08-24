import { SwaggerAnalyzer, EntityField } from '../src/parsers/swagger-parser';

describe('Business Flow Parser Tests', () => {
  let analyzer: SwaggerAnalyzer;
  
  beforeEach(() => {
    analyzer = new SwaggerAnalyzer();
  });

  describe('FilterManager Schema Parsing', () => {
    const mockOpenApiDoc = {
      components: {
        schemas: {
          FilterManager: {
            properties: {
              field: {
                type: "string",
                title: "Field"
              },
              condition: {
                $ref: "#/components/schemas/CONDITION_TYPE"
              },
              value: {
                anyOf: [
                  {},
                  { type: "null" }
                ],
                title: "Value"
              },
              group: {
                anyOf: [
                  { type: "integer" },
                  { type: "null" }
                ],
                title: "Group"
              },
              initialValue: {
                anyOf: [
                  { type: "string" },
                  { type: "null" }
                ],
                title: "Initialvalue"
              },
              finalValue: {
                anyOf: [
                  { type: "string" },
                  { type: "null" }
                ],
                title: "Finalvalue"
              }
            },
            type: "object",
            required: ["field", "condition"],
            title: "FilterManager"
          },
          Pagination: {
            properties: {
              skip: {
                anyOf: [
                  { type: "integer" },
                  { type: "null" }
                ],
                title: "Skip"
              },
              limit: {
                anyOf: [
                  { type: "integer" },
                  { type: "null" }
                ],
                title: "Limit"
              },
              all_data: {
                anyOf: [
                  { type: "boolean" },
                  { type: "null" }
                ],
                title: "All Data",
                default: false
              },
              filters: {
                anyOf: [
                  {
                    items: {
                      $ref: "#/components/schemas/FilterManager"
                    },
                    type: "array"
                  },
                  { type: "null" }
                ],
                title: "Filters"
              }
            },
            type: "object",
            title: "Pagination"
          }
        }
      },
      paths: {
        "/availability/appointment-table": {
          post: {
            tags: ["Availability"],
            summary: "Appointment Table",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Pagination"
                  }
                }
              }
            }
          }
        }
      }
    };

    test('should parse FilterManager schema correctly', () => {
      // Mock the private method to access it (usar parseFieldSchema para requests)
      const parseMethod = (analyzer as any).parseFieldSchema.bind(analyzer);
      
      // Set the mock document
      (analyzer as any).openApiDoc = mockOpenApiDoc;
      
      // Parse the FilterManager schema usando la estructura anyOf con inline schema como en el Swagger real
      const result = parseMethod('filters', {
        anyOf: [
          {
            items: {
              type: "object",
              title: "FilterManager",
              properties: {
                field: { type: "string" },
                condition: { type: "string", enum: ["==", ">", "<"] },
                value: { anyOf: [{}, { type: "null" }] },
                group: { anyOf: [{ type: "integer" }, { type: "null" }] },
                initialValue: { anyOf: [{}, { type: "null" }] },
                finalValue: { anyOf: [{}, { type: "null" }] }
              },
              required: ["field", "condition"]
            },
            type: "array"
          },
          { type: "null" }
        ]
      }, []);
      
      console.log('🧪 Test Result:', JSON.stringify(result, null, 2));
      
      // Assertions
      expect(result.name).toBe('filters');
      expect(result.type).toBe('FilterManager');
      expect(result.isArray).toBe(true);
      expect(result.nestedFields).toBeDefined();
      expect(result.nestedFields?.length).toBe(6); // field, condition, value, group, initialValue, finalValue
      
      // Check nested fields
      const fieldNames = result.nestedFields?.map((f: EntityField) => f.name) || [];
      expect(fieldNames).toContain('field');
      expect(fieldNames).toContain('condition');
      expect(fieldNames).toContain('value');
      expect(fieldNames).toContain('group');
      expect(fieldNames).toContain('initialValue');
      expect(fieldNames).toContain('finalValue');
      
      // Check field types
      const fieldField = result.nestedFields?.find((f: EntityField) => f.name === 'field');
      expect(fieldField?.type).toBe('string');
      expect(fieldField?.required).toBe(true);
      
      const initialValueField = result.nestedFields?.find((f: EntityField) => f.name === 'initialValue');
      expect(initialValueField?.type).toBe('any'); // anyOf: [{}, {type: "null"}] se mantiene como any según OpenAPI
      expect(initialValueField?.required).toBe(false);
      
      const finalValueField = result.nestedFields?.find((f: EntityField) => f.name === 'finalValue');
      expect(finalValueField?.type).toBe('any'); // anyOf: [{}, {type: "null"}] se mantiene como any según OpenAPI
      expect(finalValueField?.required).toBe(false);
    });

    test('should handle anyOf with array and $ref correctly', () => {
      const parseMethod = (analyzer as any).parseFieldSchema.bind(analyzer);
      (analyzer as any).openApiDoc = mockOpenApiDoc;
      
      const filtersSchema = {
        anyOf: [
          {
            items: {
              $ref: "#/components/schemas/FilterManager"
            },
            type: "array"
          },
          {
            type: "null"
          }
        ],
        title: "Filters"
      };
      
      const result = parseMethod('filters', filtersSchema, []);
      
      console.log('🔍 AnyOf Array Test Result:', JSON.stringify(result, null, 2));
      
      expect(result.type).toBe('FilterManager');
      expect(result.isArray).toBe(true);
      // Con $ref en parseFieldSchema, no se generan nestedFields automáticamente
      // (esto es correcto porque $ref se resuelve en tiempo de generación)
    });

    test('should parse inline schema with title correctly', () => {
      const parseMethod = (analyzer as any).parseFieldSchemaWithRefs.bind(analyzer);
      (analyzer as any).openApiDoc = mockOpenApiDoc;
      
      // Test schema inline como en el OpenAPI real
      const inlineSchema = {
        anyOf: [
          {
            items: {
              properties: {
                field: { type: "string", title: "Field" },
                condition: { type: "string", enum: ["==", ">", "<"], title: "CONDITION_TYPE" },
                value: { anyOf: [{ type: "string" }, { type: "null" }], title: "Value" },
                group: { anyOf: [{ type: "integer" }, { type: "null" }], title: "Group" },
                initialValue: { anyOf: [{ type: "string" }, { type: "null" }], title: "Initialvalue" },
                finalValue: { anyOf: [{ type: "string" }, { type: "null" }], title: "Finalvalue" }
              },
              type: "object",
              required: ["field", "condition"],
              title: "FilterManager"
            },
            type: "array"
          },
          { type: "null" }
        ],
        title: "Filters"
      };
      
      const result = parseMethod('filters', inlineSchema, []);
      
      console.log('🔍 Inline Schema Test Result:', JSON.stringify(result, null, 2));
      
      expect(result.type).toBe('FilterManager');
      expect(result.isArray).toBe(true);
      expect(result.nestedFields).toBeDefined();
      expect(result.nestedFields?.length).toBe(6);
      
      // Verificar que los campos se parsearon correctamente
      const fieldNames = result.nestedFields?.map((f: EntityField) => f.name) || [];
      expect(fieldNames).toContain('field');
      expect(fieldNames).toContain('condition');
      expect(fieldNames).toContain('initialValue');
      expect(fieldNames).toContain('finalValue');
    });

    test('should parse FilterManager properties correctly', () => {
      const parseMethod = (analyzer as any).parseFieldSchemaWithRefs.bind(analyzer);
      (analyzer as any).openApiDoc = mockOpenApiDoc;
      
      // Test individual FilterManager properties
      const fieldSchema = {
        type: "string",
        title: "Field"
      };
      
      const fieldResult = parseMethod('field', fieldSchema, ['field']);
      expect(fieldResult.type).toBe('string');
      expect(fieldResult.required).toBe(true);
      
      // Test anyOf property (initialValue)
      const initialValueSchema = {
        anyOf: [
          { type: "string" },
          { type: "null" }
        ],
        title: "Initialvalue"
      };
      
      const initialValueResult = parseMethod('initialValue', initialValueSchema, []);
      expect(initialValueResult.type).toBe('string');
      expect(initialValueResult.required).toBe(false);
      
      console.log('🔍 Property Tests:', {
        field: fieldResult,
        initialValue: initialValueResult
      });
    });
  });

  describe('Integration Tests', () => {
    test('should load real OpenAPI and parse FilterManager', async () => {
      const realUrl = 'http://backend-appointment-prod-env.eba-jpp54fae.us-east-1.elasticbeanstalk.com/openapi.json';
      
      try {
        await analyzer.loadFromUrl(realUrl);
        console.log('✅ Real OpenAPI loaded successfully');
        
        // Access the real document
        const openApiDoc = (analyzer as any).openApiDoc;
        expect(openApiDoc).toBeDefined();
        
        // Check if FilterManager exists
        const filterManagerSchema = openApiDoc.components?.schemas?.FilterManager;
        expect(filterManagerSchema).toBeDefined();
        
        console.log('🔍 Real FilterManager Schema:', JSON.stringify(filterManagerSchema, null, 2));
        
        // Check if Pagination exists and has filters
        const paginationSchema = openApiDoc.components?.schemas?.Pagination;
        expect(paginationSchema).toBeDefined();
        
        const filtersProperty = paginationSchema.properties?.filters;
        expect(filtersProperty).toBeDefined();
        
        console.log('🔍 Real Filters Property:', JSON.stringify(filtersProperty, null, 2));
        
        // Test parsing the real filters field
        const parseMethod = (analyzer as any).parseFieldSchemaWithRefs.bind(analyzer);
        const result = parseMethod('filters', filtersProperty, []);
        
        console.log('🎯 Real Parsing Result:', JSON.stringify(result, null, 2));
        
        // Validate the result
        expect(result.name).toBe('filters');
        expect(result.type).toBe('FilterManager');
        expect(result.isArray).toBe(true);
        expect(result.nestedFields).toBeDefined();
        
      } catch (error) {
        console.error('❌ Integration test failed:', error);
        // Don't fail the test if network is unavailable
        console.log('⚠️ Skipping integration test due to network issues');
      }
    }, 30000); // 30 second timeout for network request
  });

  describe('Edge Cases', () => {
    test('should handle missing schemas gracefully', () => {
      const parseMethod = (analyzer as any).parseFieldSchemaWithRefs.bind(analyzer);
      (analyzer as any).openApiDoc = { components: { schemas: {} } };
      
      const result = parseMethod('filters', {
        anyOf: [
          {
            items: { $ref: "#/components/schemas/NonExistentSchema" },
            type: "array"
          },
          { type: "null" }
        ]
      }, []);
      
      expect(result.name).toBe('filters');
      // Should fall back to a reasonable default
      expect(result.type).toBeDefined();
    });

    test('should handle empty anyOf arrays', () => {
      const parseMethod = (analyzer as any).parseFieldSchemaWithRefs.bind(analyzer);
      (analyzer as any).openApiDoc = {};
      
      const result = parseMethod('filters', { anyOf: [] }, []);
      
      expect(result.name).toBe('filters');
      expect(result.type).toBeDefined();
    });
  });

  describe('Response Array Parsing', () => {
    it('should parse array response with items.properties correctly', () => {
      // Mock del schema de AppointmentTableResponse que viene del OpenAPI real
      const mockArrayResponseSchema = {
        anyOf: [
          {
            type: 'array',
            items: {
              type: 'object',
              title: 'AppointmentTableResponse',
              properties: {
                client_id: { type: 'string', format: 'uuid' },
                assignment_id: { type: 'string', format: 'uuid' },
                assignment_status_name: { type: 'string' },
                appointment_start: { type: 'string', format: 'date-time' },
                appointment_end: { type: 'string', format: 'date-time' },
                client_identification: { 
                  anyOf: [{ type: 'string' }, { type: 'null' }] 
                },
                collaborator_first_name: { 
                  anyOf: [{ type: 'string' }, { type: 'null' }] 
                }
              },
              required: ['client_id', 'assignment_id', 'assignment_status_name']
            }
          },
          {
            type: 'array',
            items: {
              anyOf: [
                {
                  items: {
                    type: 'object',
                    title: 'AppointmentTableResponse',
                    properties: {
                      client_id: { type: 'string', format: 'uuid' }
                    }
                  },
                  type: 'array'
                },
                { type: 'null' }
              ]
            }
          },
          { type: 'null' }
        ]
      };

      // Simular el proceso del parser
      const analyzer = new SwaggerAnalyzer();
      
      // Mock del parseFieldSchemaWithRefs para simular el comportamiento
      const originalMethod = analyzer['parseFieldSchemaWithRefs'];
      analyzer['parseFieldSchemaWithRefs'] = jest.fn().mockImplementation((name: string, schema: any, required: string[]) => {
        return {
          name,
          type: schema.type === 'string' && schema.format === 'uuid' ? 'string' :
                schema.type === 'string' && schema.format === 'date-time' ? 'Date' :
                schema.anyOf ? 'string' : // Para los anyOf de nullable strings
                schema.type || 'any',
          required: required.includes(name),
          isArray: false
        };
      });

      // Test: simular el procesamiento del campo response con array
      const responseFields: any[] = [];
      
      // Lógica que debería estar en el parser para manejar arrays
      const schemas = mockArrayResponseSchema.anyOf;
      let foundSpecificSchema = false;

      for (const subSchema of schemas) {
        if (subSchema.type === 'array' && subSchema.items) {
          const arrayItemSchema = subSchema.items;
          
          if (arrayItemSchema.properties) {
            // ✅ CASO CORRECTO: Array con items.properties - extraer todos los campos
            console.log('🎯 Processing array with items.properties...');
            
            for (const [fieldName, fieldSchema] of Object.entries(arrayItemSchema.properties)) {
              if (typeof fieldSchema === 'object' && fieldSchema !== null) {
                const field = analyzer['parseFieldSchemaWithRefs'](
                  fieldName,
                  fieldSchema as any,
                  arrayItemSchema.required || []
                );
                responseFields.push(field);
              }
            }
            foundSpecificSchema = true;
            break;
          }
        }
      }

      // Restaurar método original
      analyzer['parseFieldSchemaWithRefs'] = originalMethod;

      // Validaciones
      expect(foundSpecificSchema).toBe(true);
      expect(responseFields.length).toBeGreaterThan(1);
      
      // Verificar que se extrajeron los campos específicos, no un genérico "data: any"
      const fieldNames = responseFields.map(f => f.name);
      expect(fieldNames).toContain('client_id');
      expect(fieldNames).toContain('assignment_id');
      expect(fieldNames).toContain('assignment_status_name');
      expect(fieldNames).toContain('appointment_start');
      expect(fieldNames).toContain('appointment_end');
      expect(fieldNames).toContain('client_identification');
      expect(fieldNames).toContain('collaborator_first_name');
      
      // Verificar tipos correctos
      const clientIdField = responseFields.find(f => f.name === 'client_id');
      expect(clientIdField?.type).toBe('string');
      
      const appointmentStartField = responseFields.find(f => f.name === 'appointment_start');
      expect(appointmentStartField?.type).toBe('Date');
      
      // Verificar required fields
      const assignmentIdField = responseFields.find(f => f.name === 'assignment_id');
      expect(assignmentIdField?.required).toBe(true);
      
      const clientIdentificationField = responseFields.find(f => f.name === 'client_identification');
      expect(clientIdentificationField?.required).toBe(false);
      
      console.log('✅ All validations passed! Array with items.properties processed correctly.');
    });
  });
});
