const { SwaggerAnalyzer } = require('./dist/parsers/swagger-parser');

async function testAppointmentTableArray() {
  console.log('🧪 Testing AppointmentTable Array Parsing...\n');
  
  const analyzer = new SwaggerAnalyzer();
  
  try {
    await analyzer.loadFromUrl('http://backend-appointment-prod-env.eba-jpp54fae.us-east-1.elasticbeanstalk.com/openapi.json');
    
    // Acceder directamente al OpenAPI doc para examinar la estructura
    const openApiDoc = analyzer.openApiDoc;
    
    console.log('📋 1. Checking AppointmentTableResponse schema...');
    const appointmentTableSchema = openApiDoc.components.schemas['AppointmentTableResponse'];
    if (appointmentTableSchema) {
      console.log('  ✅ Found AppointmentTableResponse schema');
      console.log('  📊 Properties:', Object.keys(appointmentTableSchema.properties || {}));
      console.log('  📋 Required fields:', appointmentTableSchema.required || []);
    } else {
      console.log('  ❌ AppointmentTableResponse schema not found');
    }
    
    console.log('\n📋 2. Checking Response wrapper schema...');
    const responseWrapperSchema = openApiDoc.components.schemas['Response_List_AppointmentTableResponse__'];
    if (responseWrapperSchema) {
      console.log('  ✅ Found Response wrapper schema');
      console.log('  📊 Properties:', Object.keys(responseWrapperSchema.properties || {}));
      
      const responseField = responseWrapperSchema.properties.response;
      if (responseField) {
        console.log('  📦 Response field structure:');
        console.log('    - anyOf length:', responseField.anyOf?.length || 0);
        
        if (responseField.anyOf) {
          responseField.anyOf.forEach((schema, index) => {
            console.log(`    - Schema ${index + 1}:`, {
              type: schema.type,
              hasItems: !!schema.items,
              itemsHasProperties: !!(schema.items?.properties),
              itemsTitle: schema.items?.title,
              itemsRef: schema.items?.$ref
            });
            
            // Si es array con items, mostrar detalles de los items
            if (schema.type === 'array' && schema.items) {
              if (schema.items.properties) {
                console.log(`      📊 Items properties:`, Object.keys(schema.items.properties));
              }
              if (schema.items.$ref) {
                const refName = schema.items.$ref.split('/').pop();
                console.log(`      🔗 Items reference:`, refName);
              }
            }
          });
        }
      }
    }
    
    console.log('\n📋 3. Testing parser output...');
    const schema = analyzer.getBusinessServiceSchema('Availability');
    const appointmentTableOp = schema?.businessOperations?.find(op => op.path === '/availability/appointment-table');
    
    if (appointmentTableOp && appointmentTableOp.responseFields) {
      console.log('  🔍 Parser output:');
      appointmentTableOp.responseFields.forEach(field => {
        console.log(`    - ${field.name}: ${field.type}${field.isArray ? '[]' : ''}`);
        if (field.nestedFields && field.nestedFields.length > 0) {
          console.log(`      📦 Nested fields (${field.nestedFields.length}):`);
          field.nestedFields.slice(0, 5).forEach(nested => {
            console.log(`        - ${nested.name}: ${nested.type}${nested.isArray ? '[]' : ''}`);
          });
          if (field.nestedFields.length > 5) {
            console.log(`        ... and ${field.nestedFields.length - 5} more`);
          }
        }
      });
    }
    
    console.log('\n✅ Test completed!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testAppointmentTableArray();
