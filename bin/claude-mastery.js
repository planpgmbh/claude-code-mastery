#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const boxen = require('boxen');
const { initProject } = require('../dist/commands/init');
const { setupBoard } = require('../dist/commands/setup-board');
const { analyzeProject } = require('../dist/commands/analyze');

// Banner anzeigen
console.log(
  boxen(
    chalk.blue.bold('🤖 Claude Code Mastery') + '\n' +
    chalk.gray('Multi-Agent Development System'),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'blue'
    }
  )
);

program
  .name('claude-mastery')
  .description('Integriert Claude Code Multi-Agent System in bestehende Projekte')
  .version('1.0.0');

program
  .command('init')
  .description('🚀 Initialisiert Claude Code System im aktuellen Projekt')
  .option('-f, --force', 'Überschreibt bestehende Konfiguration')
  .option('-s, --skip-board', 'Überspringt GitHub Project Board Setup')
  .option('-t, --type <type>', 'Projekt-Typ (react, nodejs, fullstack)')
  .action(async (options) => {
    try {
      await initProject(options);
    } catch (error) {
      console.error(chalk.red('❌ Fehler:'), error.message);
      process.exit(1);
    }
  });

program
  .command('setup-board')
  .description('📊 Erstellt GitHub Project Board mit Multi-Agent Workflow')
  .option('-n, --name <name>', 'Board Name', 'Main Development Board')
  .option('-r, --repo <repo>', 'GitHub Repository (owner/repo)')
  .action(async (options) => {
    try {
      await setupBoard(options);
    } catch (error) {
      console.error(chalk.red('❌ Fehler:'), error.message);
      process.exit(1);
    }
  });

program
  .command('analyze')
  .description('🔍 Analysiert aktuelles Projekt für Claude Code Integration')
  .action(async () => {
    try {
      await analyzeProject();
    } catch (error) {
      console.error(chalk.red('❌ Fehler:'), error.message);
      process.exit(1);
    }
  });

program
  .command('status')
  .description('📊 Zeigt Status der Claude Code Integration')
  .action(() => {
    console.log(chalk.yellow('🔄 Status Check wird implementiert...'));
  });

program
  .command('update')
  .description('⬆️ Aktualisiert Claude Code Templates auf neueste Version')
  .action(() => {
    console.log(chalk.yellow('🔄 Update wird implementiert...'));
  });

// Hilfe anzeigen wenn keine Argumente
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse();
