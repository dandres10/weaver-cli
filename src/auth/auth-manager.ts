import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';
import chalk from 'chalk';
import inquirer from 'inquirer';

export class AuthManager {
  private static readonly VALID_KEY = 'soyia';
  private static readonly CONFIG_FILE = '.weaver-cli-auth';
  private static readonly CONFIG_DIR = os.homedir();
  
  /**
   * Verifica si el usuario está autenticado
   */
  static async isAuthenticated(): Promise<boolean> {
    const configPath = path.join(this.CONFIG_DIR, this.CONFIG_FILE);
    
    try {
      if (await fs.pathExists(configPath)) {
        const configData = await fs.readFile(configPath, 'utf8');
        const config = JSON.parse(configData);
        
        // Verificar que la clave almacenada sea válida y no haya expirado
        if (config.key === this.VALID_KEY && config.timestamp) {
          const now = new Date().getTime();
          const authTime = new Date(config.timestamp).getTime();
          const thirtyDays = 30 * 24 * 60 * 60 * 1000; // 30 días en milisegundos
          
          // La autenticación es válida por 30 días
          if (now - authTime < thirtyDays) {
            return true;
          }
        }
      }
    } catch (error) {
      // Si hay error leyendo el archivo, considerar no autenticado
      console.log(chalk.yellow('⚠️  Error verificando autenticación, reautenticación requerida'));
    }
    
    return false;
  }

  /**
   * Solicita la clave de acceso al usuario
   */
  static async requestAuthentication(): Promise<boolean> {
    console.log(chalk.blue.bold('\n🔐 Autenticación Requerida'));
    console.log(chalk.gray('🕷️ Weaver CLI requiere una clave de acceso\n'));

    const { accessKey } = await inquirer.prompt([
      {
        type: 'password',
        name: 'accessKey',
        message: 'Ingresa la clave de acceso:',
        mask: '*',
        validate: (input: string) => {
          if (!input.trim()) {
            return 'La clave de acceso es requerida';
          }
          return true;
        }
      }
    ]);

    if (accessKey === this.VALID_KEY) {
      await this.saveAuthentication();
      console.log(chalk.green('✅ Autenticación exitosa!'));
      console.log(chalk.gray('La sesión será válida por 30 días\n'));
      return true;
    } else {
      console.log(chalk.red('❌ Clave de acceso incorrecta'));
      
      const { retry } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'retry',
          message: '¿Intentar nuevamente?',
          default: true
        }
      ]);

      if (retry) {
        return await this.requestAuthentication();
      } else {
        console.log(chalk.yellow('🚪 Saliendo del generador'));
        process.exit(0);
      }
    }
  }

  /**
   * Guarda la autenticación en el sistema
   */
  private static async saveAuthentication(): Promise<void> {
    const configPath = path.join(this.CONFIG_DIR, this.CONFIG_FILE);
    
    const config = {
      key: this.VALID_KEY,
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    };

    try {
      await fs.writeFile(configPath, JSON.stringify(config, null, 2));
      // Hacer el archivo legible solo por el usuario (permisos 600)
      await fs.chmod(configPath, 0o600);
    } catch (error) {
      console.log(chalk.yellow('⚠️  No se pudo guardar la autenticación, requerirá clave en cada uso'));
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  static async logout(): Promise<void> {
    const configPath = path.join(this.CONFIG_DIR, this.CONFIG_FILE);
    
    try {
      if (await fs.pathExists(configPath)) {
        await fs.remove(configPath);
        console.log(chalk.green('✅ Sesión cerrada exitosamente'));
      } else {
        console.log(chalk.yellow('⚠️  No hay sesión activa'));
      }
    } catch (error) {
      console.log(chalk.red('❌ Error cerrando sesión'));
    }
  }

  /**
   * Muestra información de la sesión actual
   */
  static async showSessionInfo(): Promise<void> {
    const configPath = path.join(this.CONFIG_DIR, this.CONFIG_FILE);
    
    try {
      if (await fs.pathExists(configPath)) {
        const configData = await fs.readFile(configPath, 'utf8');
        const config = JSON.parse(configData);
        
        console.log(chalk.blue('\n📊 Información de Sesión:'));
        console.log(chalk.gray(`Autenticado: ${await this.isAuthenticated() ? 'Sí' : 'No'}`));
        console.log(chalk.gray(`Fecha de autenticación: ${new Date(config.timestamp).toLocaleString()}`));
        console.log(chalk.gray(`Versión: ${config.version}`));
        
        const now = new Date().getTime();
        const authTime = new Date(config.timestamp).getTime();
        const daysLeft = Math.max(0, 30 - Math.floor((now - authTime) / (24 * 60 * 60 * 1000)));
        console.log(chalk.gray(`Días restantes: ${daysLeft}`));
      } else {
        console.log(chalk.yellow('⚠️  No hay sesión activa'));
      }
    } catch (error) {
      console.log(chalk.red('❌ Error obteniendo información de sesión'));
    }
  }

  /**
   * Middleware de autenticación que debe ejecutarse antes del menú principal
   */
  static async authenticate(): Promise<boolean> {
    console.log(chalk.blue('🔍 Verificando autenticación...'));
    
    if (await this.isAuthenticated()) {
      console.log(chalk.green('✅ Autenticado correctamente\n'));
      return true;
    } else {
      return await this.requestAuthentication();
    }
  }
}
