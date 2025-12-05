#!/usr/bin/env node
/**
 * Script para analizar una operación específica en detalle
 * 
 * Uso: npx ts-node scripts/test-single-operation.ts delete-user-internal
 */

import { SwaggerAnalyzer } from '../src/parsers/swagger-parser';

const DEFAULT_SWAGGER_URL = 'http://backend-platform-prod-env.eba-dddmvypu.us-east-1.elasticbeanstalk.com/openapi.json';

async function main() {
  const searchTerm = process.argv[2];
  
  if (!searchTerm) {
    console.log('Uso: npx ts-node scripts/test-single-operation.ts <nombre-operacion>');
    console.log('Ejemplo: npx ts-node scripts/test-single-operation.ts delete-user-internal');
    return;
  }
  
  console.log('🔍 Cargando Swagger...');
  const analyzer = new SwaggerAnalyzer();
  await analyzer.loadFromUrl(DEFAULT_SWAGGER_URL);

  // Buscar en todos los servicios de negocio
  const businessServices = analyzer.getAvailableBusinessServices();
  
  for (const serviceName of businessServices) {
    const schema = analyzer.getBusinessServiceSchema(serviceName);
    
    if (schema?.businessOperations) {
      const matchingOps = schema.businessOperations.filter(op => 
        op.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.operationId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      for (const op of matchingOps) {
        console.log(`\n${'═'.repeat(60)}`);
        console.log(`📌 OPERACIÓN ENCONTRADA`);
        console.log(`${'═'.repeat(60)}`);
        console.log(`\nServicio: ${serviceName}`);
        console.log(`Operation ID: ${op.operationId}`);
        console.log(`Method: ${op.method}`);
        console.log(`Path: ${op.path}`);
        console.log(`Summary: ${op.summary || 'N/A'}`);
        
        console.log(`\n📥 REQUEST:`);
        console.log(`   Schema: ${op.requestSchema || 'N/A'}`);
        console.log(`   Fields (${op.fields.length}):`);
        op.fields.forEach(f => {
          const tags = [];
          if (f.required) tags.push('required');
          if (f.isPathParam) tags.push('PATH PARAM');
          if (f.format) tags.push(f.format);
          console.log(`     - ${f.name}: ${f.type} ${tags.length ? `[${tags.join(', ')}]` : ''}`);
          if (f.description) console.log(`       "${f.description}"`);
        });
        
        if (op.pathParameters && op.pathParameters.length > 0) {
          console.log(`\n🔗 PATH PARAMETERS:`);
          op.pathParameters.forEach(p => {
            console.log(`     - ${p.name}: ${p.type} ${p.format ? `[${p.format}]` : ''}`);
          });
        }
        
        console.log(`\n📤 RESPONSE:`);
        console.log(`   Schema: ${op.responseSchema || 'N/A'}`);
        console.log(`   Is Array: ${op.isResponseArray ? 'Yes' : 'No'}`);
        console.log(`   Fields (${op.responseFields?.length || 0}):`);
        op.responseFields?.forEach(f => {
          console.log(`     - ${f.name}: ${f.type}${f.required ? ' (required)' : ''}`);
        });
        
        console.log(`\n📋 JSON COMPLETO:`);
        console.log(JSON.stringify(op, null, 2));
      }
    }
  }
}

main().catch(console.error);

