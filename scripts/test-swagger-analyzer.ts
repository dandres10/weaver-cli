#!/usr/bin/env node
/**
 * Script para analizar el Swagger y ver qué detecta el parser
 * 
 * Uso: npx ts-node scripts/test-swagger-analyzer.ts
 */

import { SwaggerAnalyzer } from '../src/parsers/swagger-parser';

const DEFAULT_SWAGGER_URL = 'http://backend-platform-prod-env.eba-dddmvypu.us-east-1.elasticbeanstalk.com/openapi.json';

async function main() {
  const swaggerUrl = process.argv[2] || DEFAULT_SWAGGER_URL;
  
  console.log('🔍 Cargando Swagger...');
  const analyzer = new SwaggerAnalyzer();
  await analyzer.loadFromUrl(swaggerUrl);

  // Mostrar entidades disponibles
  const entities = analyzer.getAvailableEntities();
  console.log('\n📦 Entidades (CRUD completo):');
  entities.forEach(e => console.log(`  - ${e}`));

  // Mostrar servicios de negocio
  const businessServices = analyzer.getAvailableBusinessServices();
  console.log('\n💼 Servicios de negocio:');
  businessServices.forEach(s => console.log(`  - ${s}`));

  // Analizar cada servicio de negocio
  for (const serviceName of businessServices) {
    const schema = analyzer.getBusinessServiceSchema(serviceName);
    if (schema?.businessOperations) {
      console.log(`\n\n📋 Servicio: ${serviceName}`);
      console.log('─'.repeat(50));
      
      schema.businessOperations.forEach(op => {
        console.log(`\n  📌 ${op.operationId}`);
        console.log(`     ${op.method} ${op.path}`);
        console.log(`     Summary: ${op.summary || 'N/A'}`);
        
        if (op.pathParameters && op.pathParameters.length > 0) {
          console.log(`     🔗 Path Params: ${op.pathParameters.map(p => p.name).join(', ')}`);
        }
        
        console.log(`     📥 Request Fields (${op.fields.length}):`);
        op.fields.forEach(f => {
          const pathTag = f.isPathParam ? ' [PATH]' : '';
          console.log(`        - ${f.name}: ${f.type}${f.required ? ' (required)' : ''}${pathTag}`);
        });
        
        console.log(`     📤 Response Fields (${op.responseFields?.length || 0}):`);
        op.responseFields?.slice(0, 5).forEach(f => {
          console.log(`        - ${f.name}: ${f.type}`);
        });
        if ((op.responseFields?.length || 0) > 5) {
          console.log(`        ... y ${op.responseFields!.length - 5} más`);
        }
      });
    }
  }
}

main().catch(console.error);

