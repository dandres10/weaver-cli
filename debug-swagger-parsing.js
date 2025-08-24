#!/usr/bin/env node

/**
 * Debug script para analizar exactamente qué está parseando del OpenAPI
 */

const axios = require('axios');

async function debugSwaggerParsing() {
  console.log('🔍 Debugging Swagger parsing for filters field...\n');
  
  try {
    // Descargar el OpenAPI
    const response = await axios.get('http://backend-appointment-prod-env.eba-jpp54fae.us-east-1.elasticbeanstalk.com/openapi.json');
    const openApiDoc = response.data;
    
    console.log('✅ OpenAPI downloaded successfully\n');
    
    // Buscar el schema de Pagination
    const paginationSchema = openApiDoc.components?.schemas?.Pagination;
    
    if (paginationSchema) {
      console.log('📋 Pagination schema found:');
      console.log(JSON.stringify(paginationSchema, null, 2));
      console.log('');
      
      // Analizar específicamente el campo filters
      const filtersProperty = paginationSchema.properties?.filters;
      
      if (filtersProperty) {
        console.log('🔍 Filters property details:');
        console.log(JSON.stringify(filtersProperty, null, 2));
        console.log('');
        
        console.log('📊 Analysis:');
        console.log(`  Type: ${filtersProperty.type}`);
        console.log(`  Items: ${JSON.stringify(filtersProperty.items)}`);
        console.log(`  Items type: ${typeof filtersProperty.items}`);
        console.log(`  Items is empty object: ${JSON.stringify(filtersProperty.items) === '{}'}`);
        console.log(`  Items keys: ${Object.keys(filtersProperty.items || {})}`);
        console.log(`  Items has type: ${!!(filtersProperty.items?.type)}`);
        console.log(`  Items has properties: ${!!(filtersProperty.items?.properties)}`);
        console.log(`  Items has $ref: ${!!(filtersProperty.items?.$ref)}`);
        
        // Simular la condición de mi parser
        const itemSchema = filtersProperty.items;
        const isEmptyOrGenericSchema = !itemSchema?.type && 
                                      !itemSchema?.properties && 
                                      !itemSchema?.$ref &&
                                      Object.keys(itemSchema || {}).length === 0;
                                      
        console.log(`  Would be detected as empty schema: ${isEmptyOrGenericSchema}`);
      } else {
        console.log('❌ Filters property not found in Pagination schema');
      }
    } else {
      console.log('❌ Pagination schema not found');
      console.log('Available schemas:', Object.keys(openApiDoc.components?.schemas || {}));
    }
    
    // Buscar también el endpoint appointment-table
    const appointmentTablePath = openApiDoc.paths?.['/availability/appointment-table'];
    if (appointmentTablePath) {
      console.log('\n📍 Appointment-table endpoint found:');
      const postOperation = appointmentTablePath.post;
      if (postOperation) {
        const requestBodySchema = postOperation.requestBody?.content?.['application/json']?.schema;
        console.log('Request body schema:');
        console.log(JSON.stringify(requestBodySchema, null, 2));
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugSwaggerParsing();
