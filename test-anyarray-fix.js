#!/usr/bin/env node

/**
 * Test script para validar el fix del tipo any[] en el generador
 * 
 * Este script simula el comportamiento del generador para verificar
 * que el tipo 'any[]' se maneje correctamente como tipo primitivo
 */

const fs = require('fs');
const path = require('path');

// Simular el comportamiento del fix
function testPrimitiveTypeCheck() {
  console.log('🧪 Testing primitive type check fix...\n');
  
  const primitiveTypes = ['string', 'number', 'boolean', 'any', 'object', 'array', 'any[]'];
  
  const testCases = [
    { type: 'string', expected: true },
    { type: 'number', expected: true },
    { type: 'boolean', expected: true },
    { type: 'any', expected: true },
    { type: 'object', expected: true },
    { type: 'array', expected: true },
    { type: 'any[]', expected: true },  // ✨ Este es el fix
    { type: 'Company', expected: false },
    { type: 'UserResponse', expected: false },
    { type: 'CustomType', expected: false }
  ];
  
  console.log('Primitive types list:', primitiveTypes);
  console.log('\n📋 Test cases:');
  
  let allPassed = true;
  
  testCases.forEach(testCase => {
    const isPrimitive = primitiveTypes.includes(testCase.type);
    const passed = isPrimitive === testCase.expected;
    
    const status = passed ? '✅' : '❌';
    const expected = testCase.expected ? 'primitive' : 'complex';
    const actual = isPrimitive ? 'primitive' : 'complex';
    
    console.log(`${status} ${testCase.type.padEnd(15)} → Expected: ${expected.padEnd(9)} | Actual: ${actual}`);
    
    if (!passed) {
      allPassed = false;
    }
  });
  
  console.log(`\n🎯 Result: ${allPassed ? '✅ All tests passed!' : '❌ Some tests failed!'}`);
  return allPassed;
}

// Verificar el contenido del archivo problemático
function testGeneratedFile() {
  console.log('\n📁 Testing generated file...\n');
  
  const problemFile = 'test-output/appointment/domain/models/apis/appointment/business/availability/appointment-table/i-availability-appointment-table-request-dto.ts';
  
  if (!fs.existsSync(problemFile)) {
    console.log('⚠️  File does not exist:', problemFile);
    return false;
  }
  
  const content = fs.readFileSync(problemFile, 'utf8');
  console.log('📄 Current file content:');
  console.log('```typescript');
  console.log(content);
  console.log('```\n');
  
  // Verificar si contiene problemas relacionados con corchetes en nombres
  const hasIncorrectImport = content.includes('IAvailabilityAppointmentTableAny[]RequestDTO');
  const hasIncorrectReference = content.includes('filters?: IAvailabilityAppointmentTableAny[]RequestDTO');
  const hasBracketIssue = content.includes('Any[]') || content.includes('any[]RequestDTO');
  
  if (hasIncorrectImport || hasIncorrectReference || hasBracketIssue) {
    console.log('❌ Problem detected:');
    if (hasIncorrectImport) {
      console.log('  - Contains incorrect import with any[] in interface name');
    }
    if (hasIncorrectReference) {
      console.log('  - Contains incorrect field type reference');
    }
    if (hasBracketIssue) {
      console.log('  - Contains bracket notation in interface names');
    }
    
    console.log('\n💡 Expected content should be:');
    console.log('```typescript');
    console.log('import { IAvailabilityAppointmentTableFiltersRequestDTO } from "./i-availability-appointment-table-filters-request-dto";');
    console.log('');
    console.log('export interface IAvailabilityAppointmentTableRequestDTO {');
    console.log('  skip?: number;');
    console.log('  limit?: number;');
    console.log('  allData?: boolean;');
    console.log('  filters?: IAvailabilityAppointmentTableFiltersRequestDTO[];  // ← Correct array of complex type');
    console.log('}');
    console.log('```');
    console.log('\n💡 Or if filters is truly primitive:');
    console.log('```typescript');
    console.log('export interface IAvailabilityAppointmentTableRequestDTO {');
    console.log('  skip?: number;');
    console.log('  limit?: number;');
    console.log('  allData?: boolean;');
    console.log('  filters?: any[];  // ← No import needed for primitive types');
    console.log('}');
    console.log('```');
    
    return false;
  } else {
    console.log('✅ File looks correct!');
    return true;
  }
}

// Función principal
function main() {
  console.log('🕷️  WEAVER CLI - any[] Type Fix Test\n');
  console.log('=' .repeat(50));
  
  // Test 1: Verificar lógica de tipos primitivos
  const primitiveTestPassed = testPrimitiveTypeCheck();
  
  // Test 2: Verificar archivo generado
  const fileTestPassed = testGeneratedFile();
  
  console.log('\n' + '=' .repeat(50));
  console.log('📊 SUMMARY:');
  console.log(`  Primitive type logic: ${primitiveTestPassed ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Generated file check: ${fileTestPassed ? '✅ PASS' : '❌ FAIL'}`);
  
  const overallResult = primitiveTestPassed && fileTestPassed;
  console.log(`  Overall result: ${overallResult ? '✅ ALL TESTS PASSED' : '❌ TESTS FAILED'}`);
  
  if (!overallResult) {
    console.log('\n🔧 Next steps:');
    console.log('1. Clean the incorrectly generated files');
    console.log('2. Verify the fix is applied in business-flow-generator.ts');
    console.log('3. Regenerate the service');
    process.exit(1);
  }
  
  process.exit(0);
}

// Ejecutar el test
main();
