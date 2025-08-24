#!/usr/bin/env node

/**
 * Debug script para entender qué tipo está llegando para filters
 */

// Simular la función toPascalCase tal como está en el generador
function toPascalCase(str) {
  console.log(`  🔍 toPascalCase input: "${str}"`);
  const result = str
    .replace(/[\[\]]/g, 'Array')  // ← Fix: Convert brackets to 'Array' before PascalCase conversion
    .replace(/(^|_|-)(\w)/g, (_, __, c) => c ? c.toUpperCase() : '')
    .replace(/Dto$/i, 'Entity')
    .replace(/EntityEntity$/, 'Entity');
  console.log(`  🔍 toPascalCase output: "${result}"`);
  return result;
}

// Simular el flujo de generación para el field filters: any[]
function testFieldTypeGeneration() {
  console.log('🧪 Debugging field type generation for filters: any[]\n');
  
  // Datos simulados basados en el swagger
  const field = {
    name: 'filters',
    type: 'any[]',
    required: false
  };
  
  const serviceName = 'Availability';
  const operationName = 'appointment-table';
  const cleanOperationName = 'AppointmentTable';
  const type = 'request';
  const suffix = 'Request';
  
  console.log('📋 Input data:');
  console.log(`  field.type: "${field.type}"`);
  console.log(`  serviceName: "${serviceName}"`);
  console.log(`  operationName: "${operationName}"`);
  console.log(`  cleanOperationName: "${cleanOperationName}"`);
  console.log(`  type: "${type}"`);
  console.log(`  suffix: "${suffix}"`);
  console.log('');
  
  // Verificar si es tipo complejo
  const primitiveTypes = ['string', 'number', 'boolean', 'any', 'object', 'array'];
  const isComplexType = field.type && !primitiveTypes.includes(field.type);
  
  console.log('🔍 Type check:');
  console.log(`  primitiveTypes: [${primitiveTypes.join(', ')}]`);
  console.log(`  field.type ("${field.type}") is complex: ${isComplexType}`);
  console.log('');
  
  if (isComplexType) {
    console.log('🏗️  Generating complex type interface:');
    
    // Simular el flujo de generación de tipo complejo
    const typeName = toPascalCase(field.type);
    console.log(`  typeName after toPascalCase: "${typeName}"`);
    
    // Limpiar el tipo para obtener solo el nombre base sin sufijos
    let cleanTypeName = typeName;
    cleanTypeName = cleanTypeName.replace(/LoginResponse$/, '');
    cleanTypeName = cleanTypeName.replace(/LoginRequest$/, '');
    cleanTypeName = cleanTypeName.replace(/Login$/, '');
    cleanTypeName = cleanTypeName.replace(/Response$/, '');
    cleanTypeName = cleanTypeName.replace(/Request$/, '');
    
    // Limpiar corchetes para nombres de interfaces
    cleanTypeName = cleanTypeName.replace(/[\[\]]/g, 'Array');
    
    console.log(`  cleanTypeName after cleanup: "${cleanTypeName}"`);
    
    const fieldType = `I${toPascalCase(serviceName)}${cleanOperationName}${cleanTypeName}${suffix}DTO`;
    console.log(`  final fieldType: "${fieldType}"`);
    
    // Generar nombre de archivo
    let cleanType = field.type;
    cleanType = cleanType.replace(/LoginResponse$/, '');
    cleanType = cleanType.replace(/LoginRequest$/, '');
    cleanType = cleanType.replace(/Login$/, '');
    cleanType = cleanType.replace(/Response$/, '');
    cleanType = cleanType.replace(/Request$/, '');
    
    const baseFileName = cleanType.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/[\[\]]/g, 'array');
    const serviceNameKebab = serviceName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
    const operationKebab = operationName.replace(/_/g, '-');
    const importFileName = `i-${serviceNameKebab}-${operationKebab}-${baseFileName}-${type}-dto`;
    
    console.log(`  importFileName: "${importFileName}"`);
    console.log('');
    console.log('📄 Generated import line:');
    console.log(`  import { ${fieldType} } from "./${importFileName}";`);
    console.log('');
    console.log('📄 Generated field line:');
    console.log(`  filters?: ${fieldType};`);
    
  } else {
    console.log('🔧 Using primitive type:');
    console.log(`  filters?: ${field.type};`);
  }
}

testFieldTypeGeneration();
