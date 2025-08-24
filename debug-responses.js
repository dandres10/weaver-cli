const { SwaggerAnalyzer } = require('./dist/parsers/swagger-parser');

async function debugResponses() {
  const analyzer = new SwaggerAnalyzer();
  
  try {
    await analyzer.loadFromUrl('http://backend-appointment-prod-env.eba-jpp54fae.us-east-1.elasticbeanstalk.com/openapi.json');
    
    const schema = analyzer.getBusinessServiceSchema('Availability');
    
    if (schema && schema.businessOperations) {
      console.log('\n📋 Operations found:');
      for (const op of schema.businessOperations) {
        console.log(`\n🔧 Operation: ${op.path}`);
        console.log(`  Request fields: ${op.fields?.length || 0}`);
        console.log(`  Response fields: ${op.responseFields?.length || 0}`);
        
        if (op.responseFields && op.responseFields.length > 0) {
          console.log(`  Response field details:`);
          op.responseFields.forEach(field => {
            console.log(`    - ${field.name}: ${field.type}${field.isArray ? '[]' : ''}`);
          });
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

debugResponses();
