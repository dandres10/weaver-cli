const { SwaggerAnalyzer } = require('./dist/parsers/swagger-parser');
const { createBusinessFlow } = require('./dist/generators/business-flow-generator');

async function validateCompleteGeneration() {
  console.log('🧪 VALIDACIÓN COMPLETA DEL GENERADOR WEAVER CLI\n');
  
  try {
    console.log('📋 1. Cargando y analizando OpenAPI...');
    const analyzer = new SwaggerAnalyzer();
    await analyzer.loadFromUrl('http://backend-appointment-prod-env.eba-jpp54fae.us-east-1.elasticbeanstalk.com/openapi.json');
    
    const schema = analyzer.getBusinessServiceSchema('Availability');
    
    if (schema && schema.businessOperations) {
      console.log(`✅ Se encontraron ${schema.businessOperations.length} operaciones de negocio`);
      
      // Mostrar resumen de operaciones
      schema.businessOperations.forEach(op => {
        const requestCount = op.fields?.length || 0;
        const responseCount = op.responseFields?.length || 0;
        console.log(`  📋 ${op.path}`);
        console.log(`    Request: ${requestCount} campos | Response: ${responseCount} campos`);
      });
      
      console.log('\n📋 2. Generando todos los archivos...');
      await createBusinessFlow('Availability', 'test-output/appointment', schema, 'appointment');
      
      console.log('\n📋 3. Validando archivos generados...');
      
      // Validar el archivo principal que estuvimos corrigiendo
      const fs = require('fs').promises;
      const path = require('path');
      
      const appointmentTableResponsePath = 'test-output/appointment/domain/models/apis/appointment/business/availability/appointment-table/i-availability-appointment-table-response-dto.ts';
      
      try {
        const content = await fs.readFile(appointmentTableResponsePath, 'utf8');
        console.log('\n✅ ARCHIVO GENERADO CORRECTAMENTE:');
        console.log(`📄 ${appointmentTableResponsePath}`);
        console.log('\n📊 CONTENIDO:');
        console.log(content);
        
        // Validaciones específicas
        const validations = [
          { check: content.includes('appointmentStart: string'), desc: 'appointmentStart tipado como string' },
          { check: content.includes('appointmentEnd: string'), desc: 'appointmentEnd tipado como string' },
          { check: content.includes('clientId: string'), desc: 'clientId presente' },
          { check: content.includes('assignmentId: string'), desc: 'assignmentId presente' },
          { check: content.includes('clientIdentification?: string'), desc: 'campos opcionales correctos' },
          { check: !content.includes('data?: any'), desc: 'NO contiene el genérico data: any' },
          { check: content.split('\n').filter(line => line.trim().endsWith(': string;') || line.trim().endsWith(': string,')).length >= 15, desc: 'Múltiples campos específicos extraídos' }
        ];
        
        console.log('\n🔍 VALIDACIONES:');
        validations.forEach(validation => {
          const status = validation.check ? '✅' : '❌';
          console.log(`  ${status} ${validation.desc}`);
        });
        
        const allPassed = validations.every(v => v.check);
        console.log(`\n${allPassed ? '🎉 TODAS LAS VALIDACIONES PASARON' : '⚠️ ALGUNAS VALIDACIONES FALLARON'}`);
        
      } catch (error) {
        console.error('❌ Error leyendo archivo generado:', error.message);
      }
      
      // Validar que también se generaron los request DTOs
      const requestDtoPath = 'test-output/appointment/domain/models/apis/appointment/business/availability/appointment-table/i-availability-appointment-table-request-dto.ts';
      try {
        const requestContent = await fs.readFile(requestDtoPath, 'utf8');
        console.log('\n✅ REQUEST DTO TAMBIÉN GENERADO:');
        console.log('📄 i-availability-appointment-table-request-dto.ts');
        
        // Validar que tiene el filters con el tipo correcto
        if (requestContent.includes('filters?: IAvailabilityAppointmentTableFilterManagerRequestDTO[]')) {
          console.log('  ✅ Campo filters correctamente tipado como array de FilterManager');
        } else {
          console.log('  ⚠️ Campo filters no está correctamente tipado');
        }
      } catch (error) {
        console.error('❌ Error leyendo request DTO:', error.message);
      }
      
      console.log('\n🏆 VALIDACIÓN COMPLETA FINALIZADA');
      
    } else {
      console.log('❌ No se pudo obtener el schema de Availability');
    }
    
  } catch (error) {
    console.error('❌ Error en la validación:', error);
  }
}

validateCompleteGeneration();
