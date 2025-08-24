#!/usr/bin/env node

/**
 * Test específico para la función toPascalCase
 */

function toPascalCase(str) {
  return str
    .replace(/[\[\]]/g, 'Array')  // ← Fix: Convert brackets to 'Array' before PascalCase conversion
    .replace(/(^|_|-)(\w)/g, (_, __, c) => c ? c.toUpperCase() : '')
    .replace(/Dto$/i, 'Entity')
    .replace(/EntityEntity$/, 'Entity');
}

console.log('🧪 Testing toPascalCase with any[] input:');
console.log('');

const testCases = [
  'any[]',
  'string[]',
  'User[]',
  'company_login_response[]',
  'any',
  'string',
  'user_response'
];

testCases.forEach(testCase => {
  const result = toPascalCase(testCase);
  console.log(`Input: "${testCase}" → Output: "${result}"`);
});

console.log('');
console.log('✅ Expected: any[] → AnyArray');
console.log('✅ This should fix the interface naming issue');
