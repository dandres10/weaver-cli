const { SwaggerAnalyzer } = require('./dist/parsers/swagger-parser');

async function debugAppointmentTable() {
  const analyzer = new SwaggerAnalyzer();
  
  try {
    await analyzer.loadFromUrl('http://backend-appointment-prod-env.eba-jpp54fae.us-east-1.elasticbeanstalk.com/openapi.json');
    
    const schema = analyzer.getBusinessServiceSchema('Availability');
    
    if (schema && schema.businessOperations) {
      const appointmentTableOp = schema.businessOperations.find(op => op.path === '/availability/appointment-table');
      
      if (appointmentTableOp) {
        console.log('\n📋 Appointment Table Operation Details:');
        console.log('  Response fields count:', appointmentTableOp.responseFields?.length || 0);
        
        if (appointmentTableOp.responseFields) {
          appointmentTableOp.responseFields.forEach(field => {
            console.log(`\n  📦 Field: ${field.name}`);
            console.log(`    Type: ${field.type}`);
            console.log(`    IsArray: ${field.isArray || false}`);
            console.log(`    Required: ${field.required}`);
            if (field.nestedFields && field.nestedFields.length > 0) {
              console.log(`    Nested fields (${field.nestedFields.length}):`);
              field.nestedFields.forEach(nested => {
                console.log(`      - ${nested.name}: ${nested.type}${nested.isArray ? '[]' : ''}`);
              });
            }
          });
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

debugAppointmentTable();
