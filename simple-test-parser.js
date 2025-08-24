#!/usr/bin/env node

/**
 * Test mínimo para ver el debug logging
 */

// Redirigir console.log para capturar todo
const originalLog = console.log;
const logs = [];

console.log = (...args) => {
  const message = args.join(' ');
  logs.push(message);
  if (message.includes('DEBUG') || message.includes('filters')) {
    originalLog('🎯 CAPTURED:', message);
  }
  // Mantener algunos logs importantes
  if (message.includes('✅') || message.includes('🔗') || message.includes('❌')) {
    originalLog(message);
  }
};

// Crear instancia del CLI programáticamente
async function runTest() {
  try {
    originalLog('🧪 Starting parser test with debug logging...\n');
    
    // Simular entrada del usuario
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // Mock the input
    const mockInput = [
      '💼 Crear flujo de negocio',
      'http://backend-appointment-prod-env.eba-jpp54fae.us-east-1.elasticbeanstalk.com/openapi.json',
      'Yes',
      'appointment',
      'Availability',
      'No'  // Don't continue with generation
    ];
    
    let inputIndex = 0;
    rl.question = (question, callback) => {
      if (inputIndex < mockInput.length) {
        const answer = mockInput[inputIndex++];
        originalLog(`Q: ${question}`);
        originalLog(`A: ${answer}`);
        callback(answer);
      } else {
        callback('No');
      }
    };
    
    // Ejecutar el CLI
    const { main } = require('./dist/cli.js');
    await main(['--local']);
    
    originalLog('\n🔍 Debug logs captured:');
    const debugLogs = logs.filter(log => log.includes('DEBUG') || log.includes('filters'));
    if (debugLogs.length > 0) {
      debugLogs.forEach(log => originalLog(log));
    } else {
      originalLog('❌ No debug logs found for filters field');
    }
    
  } catch (error) {
    originalLog('❌ Error:', error.message);
  }
}

runTest();
