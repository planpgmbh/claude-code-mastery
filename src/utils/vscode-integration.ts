import { promises as fs } from 'fs';
import path from 'path';
import chalk = require('chalk');

export class VSCodeIntegration {
  
  async setup(projectType: string, config: any): Promise<void> {
    try {
      console.log(chalk.blue('🔧 VS Code Integration wird über TemplateManager konfiguriert...'));
      
      // VS Code Settings validieren
      await this.validateVSCodeSetup();
      
      // Empfohlene Extensions anzeigen
      this.showRecommendedExtensions();
      
    } catch (error) {
      console.warn(chalk.yellow('⚠️ VS Code Integration Warnung:'), (error as Error).message);
    }
  }
  
  private async validateVSCodeSetup(): Promise<void> {
    const vscodeDir = path.join(process.cwd(), '.vscode');
    
    if (await this.directoryExists(vscodeDir)) {
      console.log(chalk.green('✅ .vscode Verzeichnis vorhanden'));
      
      const settingsFile = path.join(vscodeDir, 'settings.json');
      if (await this.fileExists(settingsFile)) {
        console.log(chalk.green('✅ VS Code Settings konfiguriert'));
      }
      
      const tasksFile = path.join(vscodeDir, 'tasks.json');
      if (await this.fileExists(tasksFile)) {
        console.log(chalk.green('✅ VS Code Tasks konfiguriert'));
      }
      
      const keybindingsFile = path.join(vscodeDir, 'keybindings.json');
      if (await this.fileExists(keybindingsFile)) {
        console.log(chalk.green('✅ VS Code Keybindings konfiguriert'));
      }
    }
  }
  
  private showRecommendedExtensions(): void {
    console.log(chalk.blue('\n📦 Empfohlene VS Code Extensions:'));
    console.log(chalk.gray('   • anthropic.claude-code'));
    console.log(chalk.gray('   • ms-vscode.vscode-typescript-next'));
    console.log(chalk.gray('   • esbenp.prettier-vscode'));
    console.log(chalk.gray('   • ms-vscode.vscode-json'));
  }
  
  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
  
  private async directoryExists(dirPath: string): Promise<boolean> {
    try {
      const stat = await fs.stat(dirPath);
      return stat.isDirectory();
    } catch {
      return false;
    }
  }
}
