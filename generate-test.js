const { SwaggerAnalyzer } = require('./dist/parsers/swagger-parser');
const { generateBusinessFlow } = require('./dist/generators/business-flow-generator');

async function generateTest() {
  try {
    console.log('🔍 Cargando OpenAPI...');
    const analyzer = new SwaggerAnalyzer();
    await analyzer.loadFromUrl('http://backend-appointment-prod-env.eba-jpp54fae.us-east-1.elasticbeanstalk.com/openapi.json');
    
    const schema = analyzer.getBusinessServiceSchema('Availability');
    
    if (schema && schema.businessOperations) {
      console.log('✅ Schema obtenido, generando archivos...');
      
      // Configurar paths como lo hace el CLI
      const paths = {
        domainModels: 'test-output/appointment/domain/models/apis/appointment/business/availability',
        domainRepositories: 'test-output/appointment/domain/services/repositories/apis/appointment/business',
        domainUseCases: 'test-output/appointment/domain/services/use_cases/apis/appointment/business/availability',
        infrastructureEntities: 'test-output/appointment/infrastructure/entities/apis/appointment/business/availability',
        infrastructureMappers: 'test-output/appointment/infrastructure/mappers/apis/appointment/business/availability',
        injectionMappers: 'test-output/appointment/infrastructure/mappers/apis/appointment/injection/business/availability',
        infrastructureRepositories: 'test-output/appointment/infrastructure/repositories/apis/appointment/repositories/business/availability',
        injectionRepositories: 'test-output/appointment/infrastructure/repositories/apis/appointment/repositories/injection/business',
        facade: 'test-output/appointment/facade/apis/appointment/business',
        injectionFacade: 'test-output/appointment/facade/apis/appointment/injection/business',
        injectionUseCases: 'test-output/appointment/domain/services/use_cases/apis/appointment/injection/business'
      };
      
      // Importar la función de generación
      const { createBusinessFlow } = require('./dist/generators/business-flow-generator');
      
      await createBusinessFlow('Availability', 'test-output/appointment', schema, 'appointment');
      
      console.log('✅ Archivos generados exitosamente en test-output/appointment');
    } else {
      console.log('❌ No se pudo obtener el schema');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

generateTest();
