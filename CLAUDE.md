# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 📊 Project Overview
- **Name:** claude-code-mastery-template
- **Type:** NPM Package (CLI Tool)
- **Runtime:** Node.js 18+ with TypeScript
- **Purpose:** Integrates Multi-Agent Claude Code System into existing web projects
- **Main Binary:** `claude-mastery` / `claude-code-mastery`

## 🏗️ Architecture & Structure

### CLI Command Architecture
```
src/
├── commands/           # CLI Command Implementations
│   ├── init.ts        # Main project initialization
│   ├── analyze.ts     # Project analysis command
│   └── setup-board.ts # GitHub project board setup
├── utils/             # Core Utilities
│   ├── project-analyzer.ts    # Project type detection & analysis
│   ├── template-manager.ts    # Template copying & CLAUDE.md generation
│   ├── github-integration.ts  # GitHub API & project board automation
│   └── vscode-integration.ts  # VS Code configuration setup
└── types/             # TypeScript type definitions
```

### Package Structure
- **bin/claude-mastery.js:** CLI entry point using Commander.js
- **templates/:** Template files for different project types
- **scripts/:** NPM lifecycle scripts (postinstall, setup)
- **dist/:** TypeScript compilation output (CommonJS modules)

## 🚀 Development Commands

### Essential Development
```bash
npm run build          # TypeScript compilation to dist/
npm run dev            # Watch mode compilation (tsc --watch)
npm test               # Run Jest test suite
npm run prepublishOnly # Pre-publish build check
```

### CLI Testing & Development
```bash
# Local testing of CLI commands
npm link                          # Link package globally for testing
claude-mastery --help            # Test CLI help
claude-mastery init --type react # Test init command

# Test package installation flow
npm pack                         # Create .tgz for testing
```

### Code Quality
```bash
npm run lint           # ESLint code quality checks
npm run type-check     # TypeScript strict type validation
npm run format         # Prettier code formatting
```

## 🎯 Core Functionality Patterns

### Project Analysis System
The `ProjectAnalyzer` class detects project types through:
- **Package.json Analysis:** Dependencies, scripts, and configuration
- **File Structure Detection:** src/, public/, tests/ folders
- **Framework Detection:** React, Vue, Node.js, Next.js, etc.
- **Technology Stack Identification:** TypeScript, testing frameworks, build tools

### Template Management System
The `TemplateManager` handles:
- **CLAUDE.md Generation:** Project-specific configurations
- **VS Code Integration:** Settings, tasks, keybindings
- **GitHub Templates:** Issue templates, workflows, project boards
- **Environment Setup:** .env.example, .gitignore updates

### Multi-Agent Workflow Integration
- **Analysis Agent:** Bug analysis, feature planning → "Ready" column
- **Implementation Agent:** Code implementation → autonomous after human approval
- **Human Control Points:** Manual review required between analysis and implementation

## 🔧 TypeScript Configuration

### Build Configuration
- **Target:** ES2020 with CommonJS modules
- **Output:** dist/ directory with declaration files
- **Source Maps:** Enabled for debugging
- **Strict Mode:** Full TypeScript strict checking enabled

### Import Patterns
```typescript
// Use require for CommonJS compatibility in CLI context
const { program } = require('commander');
const chalk = require('chalk');

// Use import for TypeScript modules
import { ProjectAnalyzer } from '../utils/project-analyzer';
import { TemplateManager } from '../utils/template-manager';
```

## 📦 Package Development Patterns

### CLI Command Structure
```typescript
// Commander.js pattern for CLI commands
program
  .command('init')
  .description('🚀 Initialisiert Claude Code System')
  .option('-f, --force', 'Überschreibt bestehende Konfiguration')
  .option('-t, --type <type>', 'Projekt-Typ (react, nodejs, fullstack)')
  .action(async (options) => {
    const { initProject } = require('../dist/commands/init');
    await initProject(options);
  });
```

### Error Handling Pattern
```typescript
try {
  const result = await operation();
  spinner.succeed('✅ Operation completed');
} catch (error) {
  spinner.fail('❌ Operation failed');
  console.error('Error:', error.message);
  process.exit(1);
}
```

## 🧪 Testing Strategy

### Unit Tests (Jest)
- **Command Logic:** Test init, analyze, setup-board commands
- **Utility Functions:** ProjectAnalyzer, TemplateManager functionality
- **Template Generation:** CLAUDE.md and configuration file creation
- **Error Scenarios:** Invalid project types, missing dependencies

### Integration Tests
- **CLI Workflow:** End-to-end command execution
- **File System Operations:** Template copying, file creation/modification
- **GitHub API Integration:** Project board creation (with mocks)

## 🔍 Project Type Detection Logic

### Supported Project Types
- **react-spa:** React SPA with TypeScript
- **nodejs-api:** Node.js API backend
- **fullstack:** Combined frontend + backend
- **nextjs:** Next.js projects
- **vue-typescript:** Vue.js with TypeScript
- **generic:** Generic web projects

### Detection Patterns
```typescript
// Framework detection through dependencies
if (dependencies.includes('react')) {
  if (dependencies.includes('next')) return 'nextjs';
  return hasBackendSignals ? 'fullstack' : 'react-spa';
}

// Backend detection
if (dependencies.includes('express') || dependencies.includes('fastify')) {
  return hasFrontendSignals ? 'fullstack' : 'nodejs-api';
}
```

## 🛠️ Dependencies & Stack

### Core Dependencies
- **chalk:** Terminal styling and colors
- **commander:** CLI framework
- **inquirer:** Interactive command prompts
- **fs-extra:** Enhanced file system operations
- **axios:** HTTP requests for GitHub API
- **yaml:** YAML parsing for configurations
- **glob:** File pattern matching

### Development Dependencies
- **typescript:** TypeScript compiler
- **jest:** Testing framework
- **eslint + prettier:** Code quality tools
- **@types/*:** TypeScript type definitions

## 🎨 Template System Architecture

### Template Categories
1. **CLAUDE.md Templates:** Project-specific configurations
2. **VS Code Templates:** Settings, tasks, keybindings
3. **GitHub Templates:** Issue templates, workflows
4. **Environment Templates:** .env.example, configuration files

### Variable Replacement System
```typescript
const replacements = {
  '[IHR_PROJEKT_NAME]': projectName,
  '[PROJEKT_BESCHREIBUNG]': description,
  '[TECH_STACK]': techStack.join(', '),
  '[FRAMEWORK]': framework || 'Generic'
};
```

## 🚀 NPM Package Best Practices

### Package Configuration
- **Main Entry:** dist/index.js (CommonJS)
- **Binary Commands:** claude-mastery, claude-code-mastery
- **Files Array:** Only include necessary files in published package
- **Peer Dependencies:** @anthropic-ai/claude-code for integration

### Version Management
- **Semantic Versioning:** Major.Minor.Patch
- **Prepublish Hooks:** Automatic build before publishing
- **Postinstall Scripts:** Optional setup notifications

---

**🎯 This NPM package enables rapid integration of Claude Code Multi-Agent systems into existing projects with automated project detection, template generation, and workflow setup.**