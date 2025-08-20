import chalk = require('chalk');
import { ProjectAnalyzer } from '../utils/project-analyzer';

export async function analyzeProject(): Promise<void> {
  console.log(chalk.blue.bold('🔍 Projekt-Analyse\n'));
  
  try {
    const analyzer = new ProjectAnalyzer(process.cwd());
    const projectInfo = await analyzer.analyze();
    
    // Projekt-Übersicht
    console.log(chalk.green.bold('📊 Projekt-Übersicht:'));
    console.log(chalk.gray(`   Name: ${projectInfo.name || 'Nicht erkannt'}`));
    console.log(chalk.gray(`   Beschreibung: ${projectInfo.description || 'Keine Beschreibung'}`));
    console.log(chalk.gray(`   Erkannter Typ: ${projectInfo.detectedType || 'Unbekannt'}`));
    console.log(chalk.gray(`   Framework: ${projectInfo.framework || 'Keines erkannt'}`));
    
    // Tech Stack
    console.log(chalk.green.bold('\n🛠️ Tech Stack:'));
    if (projectInfo.techStack.length > 0) {
      projectInfo.techStack.forEach(tech => {
        console.log(chalk.gray(`   • ${tech}`));
      });
    } else {
      console.log(chalk.gray('   Kein Tech Stack erkannt'));
    }
    
    // Projektstruktur
    console.log(chalk.green.bold('\n📁 Projektstruktur:'));
    console.log(chalk.gray(`   package.json: ${projectInfo.hasPackageJson ? '✅' : '❌'}`));
    console.log(chalk.gray(`   src/ Ordner: ${projectInfo.structure.hasSrcFolder ? '✅' : '❌'}`));
    console.log(chalk.gray(`   TypeScript: ${projectInfo.isTypeScript ? '✅' : '❌'}`));
    console.log(chalk.gray(`   Docker: ${projectInfo.hasDocker ? '✅' : '❌'}`));
    console.log(chalk.gray(`   GitHub: ${projectInfo.hasGitHub ? '✅' : '❌'}`));
    
    // Dependencies
    if (projectInfo.dependencies.length > 0) {
      console.log(chalk.green.bold('\n📦 Dependencies:'));
      projectInfo.dependencies.slice(0, 10).forEach(dep => {
        console.log(chalk.gray(`   • ${dep}`));
      });
      if (projectInfo.dependencies.length > 10) {
        console.log(chalk.gray(`   ... und ${projectInfo.dependencies.length - 10} weitere`));
      }
    }
    
    // Empfehlungen
    console.log(chalk.blue.bold('\n💡 Empfehlungen:'));
    
    if (!projectInfo.hasGitHub) {
      console.log(chalk.yellow('   ⚠️ Kein .github Ordner gefunden - GitHub Integration empfohlen'));
    }
    
    if (!projectInfo.isTypeScript && (projectInfo.framework === 'react' || projectInfo.framework === 'vue')) {
      console.log(chalk.yellow('   ⚠️ TypeScript Integration für bessere Code-Qualität empfohlen'));
    }
    
    if (!projectInfo.structure.hasTestFolder) {
      console.log(chalk.yellow('   ⚠️ Kein Test-Ordner gefunden - Testing Framework empfohlen'));
    }
    
    // Claude Code Integration Status
    console.log(chalk.blue.bold('\n🤖 Claude Code Integration:'));
    
    const claudeConfigExists = projectInfo.structure.configFiles.includes('CLAUDE.md');
    const vscodeConfigExists = projectInfo.structure.hasSrcFolder; // Vereinfacht
    
    console.log(chalk.gray(`   CLAUDE.md: ${claudeConfigExists ? '✅ Vorhanden' : '❌ Fehlt'}`));
    console.log(chalk.gray(`   VS Code Setup: ${vscodeConfigExists ? '✅ Bereit' : '❌ Nicht konfiguriert'}`));
    
    if (!claudeConfigExists) {
      console.log(chalk.green.bold('\n🚀 Nächster Schritt:'));
      console.log(chalk.white('   claude-mastery init'));
      console.log(chalk.gray('   → Integriert Claude Code Multi-Agent System'));
    } else {
      console.log(chalk.green.bold('\n✅ Claude Code Integration bereits vorhanden!'));
    }
    
  } catch (error) {
    console.error(chalk.red('❌ Fehler bei Projekt-Analyse:'), (error as Error).message);
    process.exit(1);
  }
}
