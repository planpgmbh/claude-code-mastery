#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

console.log(chalk.blue.bold('\n🤖 Claude Code Mastery - Template Setup\n'));

async function setupTemplate() {
  try {
    // 1. Projekt-Typ ermitteln
    const { projectType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'projectType',
        message: 'Welchen Projekt-Typ möchten Sie einrichten?',
        choices: [
          { name: '⚛️  React TypeScript SPA', value: 'react-spa' },
          { name: '🚀 Node.js API Backend', value: 'nodejs-api' },
          { name: '🏗️  Full-Stack Application', value: 'full-stack' },
          { name: '⚡ Next.js Project', value: 'nextjs' },
          { name: '🔧 Custom Setup', value: 'custom' }
        ]
      }
    ]);

    // 2. Projektdetails erfassen
    const projectDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Projekt Name:',
        default: path.basename(process.cwd())
      },
      {
        type: 'input', 
        name: 'description',
        message: 'Projekt Beschreibung:',
        default: 'Modern web application with Claude Code integration'
      },
      {
        type: 'confirm',
        name: 'useDocker',
        message: 'Docker Setup inkludieren?',
        default: true
      },
      {
        type: 'confirm',
        name: 'useGithubActions',
        message: 'GitHub Actions Workflows einrichten?',
        default: true
      }
    ]);

    console.log(chalk.yellow('\n📋 Setup wird konfiguriert...\n'));

    // 3. VS Code Konfiguration kopieren
    await copyVSCodeConfig();
    
    // 4. GitHub Templates kopieren
    if (projectDetails.useGithubActions) {
      await copyGitHubTemplates();
    }

    // 5. CLAUDE.md erstellen
    await createClaudeConfig(projectType, projectDetails);

    // 6. Environment Datei erstellen
    await createEnvironmentFile();

    // 7. Package.json anpassen (falls vorhanden)
    await updatePackageJson(projectDetails);

    console.log(chalk.green.bold('\n✅ Template Setup erfolgreich abgeschlossen!\n'));
    
    // Nächste Schritte anzeigen
    showNextSteps(projectType);

  } catch (error) {
    console.error(chalk.red('\n❌ Fehler beim Setup:'), error.message);
    process.exit(1);
  }
}

async function copyVSCodeConfig() {
  const templateDir = path.join(__dirname, '../templates/.vscode');
  const targetDir = path.join(process.cwd(), '.vscode');
  
  if (await fs.pathExists(templateDir)) {
    await fs.ensureDir(targetDir);
    await fs.copy(templateDir, targetDir);
    console.log(chalk.green('✓ VS Code Konfiguration kopiert'));
  }
}

async function copyGitHubTemplates() {
  const templateDir = path.join(__dirname, '../templates/.github');
  const targetDir = path.join(process.cwd(), '.github');
  
  if (await fs.pathExists(templateDir)) {
    await fs.ensureDir(targetDir);
    await fs.copy(templateDir, targetDir);
    console.log(chalk.green('✓ GitHub Templates kopiert'));
  }
}

async function createClaudeConfig(projectType, details) {
  const templateFile = path.join(__dirname, `../templates/claude-md-examples/CLAUDE-${projectType}.md`);
  const targetFile = path.join(process.cwd(), 'CLAUDE.md');
  
  let content = '';
  
  if (await fs.pathExists(templateFile)) {
    content = await fs.readFile(templateFile, 'utf8');
  } else {
    // Fallback: Generic Template
    content = createGenericClaudeConfig(details);
  }
  
  // Template-Variablen ersetzen
  content = content.replace(/\[IHR_PROJEKT_NAME\]/g, details.projectName);
  content = content.replace(/\[PROJEKT_BESCHREIBUNG\]/g, details.description);
  
  await fs.writeFile(targetFile, content);
  console.log(chalk.green('✓ CLAUDE.md erstellt'));
}

function createGenericClaudeConfig(details) {
  return `# ${details.projectName} - Claude Code Konfiguration

## 📊 Projekt Übersicht
- **Name:** ${details.projectName}
- **Beschreibung:** ${details.description}
- **Typ:** Web Application
- **Claude Code:** Multi-Agent System aktiviert

## 🎯 Claude Code Integration

### Analysis Agent Fokus
- Code Quality & Best Practices
- Performance Optimization
- Security Audit & Compliance
- Documentation & Testing

### Implementation Agent Regeln
- Clean Code Principles
- Test-Driven Development
- Consistent Code Style
- Automated Quality Gates

## 🚀 Development Workflow

### Lokale Entwicklung
\`\`\`bash
npm install
npm run dev
npm run test
\`\`\`

## 🔧 Custom Commands

### Standard Workflows
- \`/analyze-code\` - Code Quality Analysis
- \`/optimize-performance\` - Performance Optimization
- \`/security-audit\` - Security Scan
- \`/update-docs\` - Documentation Update

---
**🤖 Powered by Claude Code Mastery Template**
`;
}

async function createEnvironmentFile() {
  const templateFile = path.join(__dirname, '../.env.example');
  const targetFile = path.join(process.cwd(), '.env.example');
  
  if (await fs.pathExists(templateFile)) {
    await fs.copy(templateFile, targetFile);
    console.log(chalk.green('✓ .env.example erstellt'));
  }
}

async function updatePackageJson(details) {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJson(packageJsonPath);
    
    // Claude Code Scripts hinzufügen
    packageJson.scripts = {
      ...packageJson.scripts,
      'claude:setup': 'claude init && claude context-prime',
      'claude:analyze': 'claude /analyze-project',
      'claude:docs': 'claude /update-documentation'
    };
    
    // Keywords hinzufügen
    packageJson.keywords = [
      ...(packageJson.keywords || []),
      'claude-code',
      'ai-development'
    ].filter((keyword, index, arr) => arr.indexOf(keyword) === index);
    
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    console.log(chalk.green('✓ package.json erweitert'));
  }
}

function showNextSteps(projectType) {
  console.log(chalk.blue.bold('📋 Nächste Schritte:\n'));
  
  console.log(chalk.white('1. 🔑 API Keys konfigurieren:'));
  console.log(chalk.gray('   cp .env.example .env'));
  console.log(chalk.gray('   # ANTHROPIC_API_KEY in .env eintragen\n'));
  
  console.log(chalk.white('2. 🤖 Claude Code initialisieren:'));
  console.log(chalk.gray('   claude init'));
  console.log(chalk.gray('   claude context-prime\n'));
  
  console.log(chalk.white('3. 🚀 Erstes Issue erstellen:'));
  console.log(chalk.gray('   GitHub → Issues → New Issue'));
  console.log(chalk.gray('   Wähle "Bug Report" oder "Feature Request"\n'));
  
  console.log(chalk.white('4. ⚡ VS Code öffnen:'));
  console.log(chalk.gray('   code .'));
  console.log(chalk.gray('   Ctrl+Shift+C → Ctrl+S (Agent Status)\n'));
  
  console.log(chalk.green.bold('🎉 Happy Coding mit Claude Code Mastery!'));
}

// Script ausführen
if (require.main === module) {
  setupTemplate();
}

module.exports = { setupTemplate };
