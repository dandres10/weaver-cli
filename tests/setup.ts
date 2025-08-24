// Jest setup file
// Configuración global para los tests

// Extend Jest matchers if needed
// import 'jest-extended';

// Mock console.log para tests más limpios (opcional)
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
//   warn: jest.fn(),
//   error: jest.fn(),
// };

// Configurar timeout por defecto para tests de red
jest.setTimeout(30000);

// Mock de axios para tests unitarios que no requieren red real
// jest.mock('axios');

export {};
