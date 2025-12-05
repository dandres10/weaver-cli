#!/usr/bin/env node
/**
 * Script para generar un flujo de negocio específico sin interacción
 * 
 * Uso: 
 *   npx ts-node scripts/test-generate-business-flow.ts                    # Genera Auth completo
 *   npx ts-node scripts/test-generate-business-flow.ts Auth               # Genera Auth completo
 *   npx ts-node scripts/test-generate-business-flow.ts Auth delete-user   # Genera solo operaciones que contengan "delete-user"
 */

import { SwaggerAnalyzer } from '../src/parsers/swagger-parser';
import { createBusinessFlow } from '../src/generators/business-flow-generator';
import * as path from 'path';

const DEFAULT_SWAGGER_URL = 'http://backend-platform-prod-env.eba-dddmvypu.us-east-1.elasticbeanstalk.com/openapi.json';

async function main() {
  const serviceName = process.argv[2] || 'Auth';
  const operationFilter = process.argv[3] || null;
  
  console.log('🔍 Cargando Swagger...');
  const analyzer = new SwaggerAnalyzer();
  await analyzer.loadFromUrl(DEFAULT_SWAGGER_URL);

  const schema = analyzer.getBusinessServiceSchema(serviceName);
  
  if (!schema) {
    console.error(`❌ No se encontró el servicio: ${serviceName}`);
    console.log('\nServicios disponibles:');
    analyzer.getAvailableBusinessServices().forEach(s => console.log(`  - ${s}`));
    return;
  }

  let operations = schema.businessOperations || [];
  
  // Filtrar operaciones si se especificó un filtro
  if (operationFilter) {
    operations = operations.filter(op => 
      op.path.toLowerCase().includes(operationFilter.toLowerCase()) ||
      op.operationId.toLowerCase().includes(operationFilter.toLowerCase())
    );
    
    if (operations.length === 0) {
      console.error(`❌ No se encontraron operaciones que contengan: ${operationFilter}`);
      console.log('\nOperaciones disponibles:');
      schema.businessOperations?.forEach(op => console.log(`  - ${op.path}`));
      return;
    }
  }

  console.log(`\n📋 Generando ${operations.length} operación(es) para ${serviceName}:`);
  operations.forEach(op => {
    const pathParams = op.pathParameters?.map(p => p.name).join(', ') || '';
    console.log(`  - ${op.method} ${op.path} ${pathParams ? `[Path: ${pathParams}]` : ''}`);
  });

  const testSchema = { ...schema, businessOperations: operations };
  const targetPath = path.resolve('./test-output/platform');

  console.log(`\n🚀 Generando en: ${targetPath}`);
  await createBusinessFlow(serviceName, targetPath, testSchema, 'platform');
  
  console.log('\n✅ ¡Completado! Revisa test-output/platform/');
}

main().catch(console.error);

