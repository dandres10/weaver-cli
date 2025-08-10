const { detectGeneratedEntities } = require('./dist/generators/cleanup-generator');

async function testDetection() {
  console.log('🔍 Probando detección desde test-output...');
  
  const entities = await detectGeneratedEntities('./test-output');
  
  console.log(`📊 Entidades detectadas: ${entities.length}`);
  
  entities.forEach(entity => {
    console.log(`  - ${entity.name} (API: ${entity.apiName})`);
  });
  
  if (entities.length === 0) {
    console.log('❌ No se detectaron entidades');
  } else {
    console.log('✅ Detección exitosa');
  }
}

testDetection().catch(console.error);
