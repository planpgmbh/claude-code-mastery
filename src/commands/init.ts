import { promises as fs } from 'fs';
import path from 'path';
import chalk = require('chalk');
import inquirer = require('inquirer');
import ora = require('ora');
import { ProjectAnalyzer } from '../utils/project-analyzer';
import { TemplateManager } from '../utils/template-manager';
import { GitHubIntegration } from '../utils/github-integration';
import { VSCodeIntegration } from '../utils/vscode-integration';

interface InitOptions {
  force?: boolean;
  skipBoard?: boolean;
  type?: string;
}

export async function initProject(options: InitOptions): Promise<void> {
  const spinner = ora('🔍 Analysiere Projekt...').start();
  
  try {
    // 1. Projekt analysieren
    const analyzer = new ProjectAnalyzer(process.cwd());
    const projectInfo = await analyzer.analyze();
    
    spinner.succeed('✅ Projekt analysiert');
    
    // 2. Projekt-Typ bestimmen oder abfragen
    let projectType = options.type || projectInfo.detectedType || 'generic';
    
    if (!options.type && !projectInfo.detectedType) {
      spinner.stop();
      const { selectedType } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedType',
          message: '🎯 Welcher Projekt-Typ passt am besten?',
          choices: [
            { name: '⚛️  React TypeScript SPA', value: 'react-spa' },
            { name: '🚀 Node.js API Backend', value: 'nodejs-api' },
            { name: '🏗️  Full-Stack Application', value: 'fullstack' },
            { name: '⚡ Next.js Project', value: 'nextjs' },
            { name: '🌐 Vue.js TypeScript', value: 'vue-typescript' },
            { name: '🔧 Generic Web Project', value: 'generic' }
          ]
        }
      ]);
      projectType = selectedType;
    }

    // 3. Konfiguration sammeln
    spinner.start('⚙️ Sammle Konfiguration...');
    
    const config = await gatherConfiguration(projectInfo, projectType);
    
    spinner.succeed('✅ Konfiguration gesammelt');

    // 4. Templates kopieren
    spinner.start('📋 Kopiere Templates...');
    
    const templateManager = new TemplateManager();
    await templateManager.copyTemplates(projectType, config, options.force);
    
    spinner.succeed('✅ Templates kopiert');

    // 5. VS Code Integration
    spinner.start('🔧 Konfiguriere VS Code...');
    
    const vscodeIntegration = new VSCodeIntegration();
    await vscodeIntegration.setup(projectType, config);
    
    spinner.succeed('✅ VS Code konfiguriert');

    // 6. GitHub Project Board (optional)
    if (!options.skipBoard && config.setupGitHubBoard) {
      spinner.start('📊 Erstelle GitHub Project Board...');
      
      const githubIntegration = new GitHubIntegration(config.githubToken);
      await githubIntegration.createProjectBoard(config);
      
      spinner.succeed('✅ GitHub Project Board erstellt');
    }

    // 7. CLAUDE.md erstellen
    spinner.start('📝 Erstelle CLAUDE.md...');
    
    await templateManager.createClaudeConfig(projectType, projectInfo, config);
    
    spinner.succeed('✅ CLAUDE.md erstellt');

    // 8. Package.json erweitern
    if (projectInfo.hasPackageJson) {
      spinner.start('📦 Erweitere package.json...');
      
      await updatePackageJson(config);
      
      spinner.succeed('✅ package.json erweitert');
    }

    // Success Message
    console.log(
      chalk.green.bold('\n🎉 Claude Code Mastery erfolgreich integriert!\n')
    );

    // Nächste Schritte anzeigen
    showNextSteps(projectType, config);

  } catch (error) {
    spinner.fail('❌ Fehler beim Setup');
    throw error;
  }
}

async function gatherConfiguration(projectInfo: any, projectType: string) {
  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: '📝 Projekt Name:',
      default: projectInfo.name || path.basename(process.cwd())
    },
    {
      type: 'input',
      name: 'description',
      message: '📋 Projekt Beschreibung:',
      default: projectInfo.description || `${projectType} project with Claude Code integration`
    },
    {
      type: 'confirm',
      name: 'setupGitHubBoard',
      message: '📊 GitHub Project Board automatisch erstellen?',
      default: true
    }
  ];

  // GitHub Token abfragen wenn Board gewünscht
  const answers = await inquirer.prompt(questions);
  
  if (answers.setupGitHubBoard) {
    const { githubToken } = await inquirer.prompt([
      {
        type: 'password',
        name: 'githubToken',
        message: '🔑 GitHub Personal Access Token (für Board-Erstellung):',
        mask: '*'
      }
    ]);
    answers.githubToken = githubToken;
  }

  return {
    ...answers,
    projectType,
    projectInfo
  };
}

async function updatePackageJson(config: any): Promise<void> {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  try {
    const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    
    // Claude Code Scripts hinzufügen
    packageJson.scripts = {
      ...packageJson.scripts,
      'claude:init': 'claude init && claude context-prime',
      'claude:analyze': 'claude /analyze-project',
      'claude:status': 'claude /agent-status',
      'claude:docs': 'claude /update-documentation'
    };
    
    // Keywords erweitern
    const claudeKeywords = ['claude-code', 'ai-development', 'multi-agent'];
    packageJson.keywords = [
      ...(packageJson.keywords || []),
      ...claudeKeywords
    ].filter((keyword, index, arr) => arr.indexOf(keyword) === index);
    
    // Claude Code Konfiguration hinzufügen
    packageJson['claude-code'] = {
      enabled: true,
      template: 'claude-code-mastery',
      version: '1.0.0',
      projectType: config.projectType
    };
    
    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    
  } catch (error) {
    // package.json existiert nicht oder ist fehlerhaft - überspringen
    console.log(chalk.yellow('⚠️ package.json konnte nicht erweitert werden'));
  }
}

function showNextSteps(projectType: string, config: any): void {
  console.log(chalk.blue.bold('📋 Nächste Schritte:\n'));
  
  console.log(chalk.white('1. 🔑 Claude API Key konfigurieren:'));
  console.log(chalk.gray('   cp .env.example .env'));
  console.log(chalk.gray('   # ANTHROPIC_API_KEY in .env eintragen\n'));
  
  console.log(chalk.white('2. 🤖 Claude Code initialisieren:'));
  console.log(chalk.gray('   claude init'));
  console.log(chalk.gray('   claude context-prime\n'));
  
  if (config.setupGitHubBoard) {
    console.log(chalk.white('3. 📊 GitHub Project Board:'));
    console.log(chalk.gray('   Board "Main Development Board" wurde erstellt'));
    console.log(chalk.gray('   Erstes Issue erstellen zum Testen\n'));
  }
  
  console.log(chalk.white('4. ⚡ VS Code öffnen:'));
  console.log(chalk.gray('   code .'));
  console.log(chalk.gray('   Ctrl+Shift+C → Ctrl+S (Agent Status)\n'));
  
  console.log(chalk.white('5. 🧪 Erstes Issue testen:'));
  console.log(chalk.gray('   GitHub → Issues → New Issue'));
  console.log(chalk.gray('   Wähle "Bug Report" für Auto-Processing\n'));
  
  console.log(chalk.green.bold('🎉 Claude Code Multi-Agent System ist einsatzbereit!'));
  console.log(chalk.gray('📚 Dokumentation: ./docs/ Verzeichnis'));
}
