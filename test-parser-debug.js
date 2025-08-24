#!/usr/bin/env node

/**
 * Test directo del parser para debuggear el problema
 */

const path = require('path');

// Importar el parser compilado
const { SwaggerAnalyzer } = require('./dist/parsers/swagger-parser.js');

async function testParser() {
  console.log('🧪 Testing SwaggerAnalyzer directly...\n');
  
  try {
    const analyzer = new SwaggerAnalyzer();
    
    // Cargar el OpenAPI
    await analyzer.loadFromUrl('http://backend-appointment-prod-env.eba-jpp54fae.us-east-1.elasticbeanstalk.com/openapi.json');
    
    console.log('✅ OpenAPI loaded successfully\n');
    
    // Obtener operaciones de negocio para Availability
    const businessOperations = await analyzer.getBusinessOperations('availability');
    
    console.log(`📊 Found ${businessOperations.length} business operations\n`);
    
    // Buscar específicamente appointment-table
    const appointmentTableOp = businessOperations.find(op => 
      op.path.includes('appointment-table')
    );
    
    if (appointmentTableOp) {
      console.log('🎯 Found appointment-table operation:');
      console.log(`  Path: ${appointmentTableOp.path}`);
      console.log(`  Method: ${appointmentTableOp.method}`);
      console.log(`  Fields: ${appointmentTableOp.fields.length}`);
      console.log('');
      
      // Analizar específicamente el campo filters
      const filtersField = appointmentTableOp.fields.find(field => 
        field.name === 'filters'
      );
      
      if (filtersField) {
        console.log('🔍 Filters field details:');
        console.log(`  Name: ${filtersField.name}`);
        console.log(`  Type: ${filtersField.type}`);
        console.log(`  IsArray: ${filtersField.isArray}`);
        console.log(`  Required: ${filtersField.required}`);
        console.log(`  NestedFields: ${filtersField.nestedFields ? filtersField.nestedFields.length : 'none'}`);
        
        if (filtersField.nestedFields) {
          console.log('  📋 Nested fields:');
          filtersField.nestedFields.forEach(nested => {
            console.log(`    - ${nested.name}: ${nested.type} (required: ${nested.required})`);
          });
        }
        
        console.log('');
        console.log('🎯 Expected result:');
        console.log('  Type: FilterManager');
        console.log('  IsArray: true');
        console.log('  NestedFields: 6 fields (field, condition, value, group, initialValue, finalValue)');
        
      } else {
        console.log('❌ Filters field not found in appointment-table operation');
        console.log('Available fields:');
        appointmentTableOp.fields.forEach(field => {
          console.log(`  - ${field.name}: ${field.type}`);
        });
      }
    } else {
      console.log('❌ appointment-table operation not found');
      console.log('Available operations:');
      businessOperations.forEach(op => {
        console.log(`  - ${op.path}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
  }
}

testParser();
