import { promises as fs } from 'fs';
import path from 'path';
import { ProjectInfo } from './project-analyzer';

export class TemplateManager {
  private templatesPath: string;
  
  constructor() {
    this.templatesPath = path.join(__dirname, '../../templates');
  }
  
  async copyTemplates(projectType: string, config: any, force: boolean = false): Promise<void> {
    // 1. VS Code Konfiguration kopieren
    await this.copyVSCodeConfig(force);
    
    // 2. GitHub Templates kopieren
    await this.copyGitHubTemplates(force);
    
    // 3. Git Ignore erweitern
    await this.updateGitIgnore(force);
  }
  
  private async copyVSCodeConfig(force: boolean): Promise<void> {
    const sourceDir = path.join(this.templatesPath, '.vscode');
    const targetDir = path.join(process.cwd(), '.vscode');
    
    await this.ensureDirectory(targetDir);
    
    const files = ['settings.json', 'tasks.json', 'keybindings.json'];
    
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      if (await this.fileExists(sourcePath)) {
        if (force || !await this.fileExists(targetPath)) {
          await fs.copyFile(sourcePath, targetPath);
        } else {
          // Merge mit existierender Konfiguration
          await this.mergeVSCodeConfig(sourcePath, targetPath, file);
        }
      }
    }
  }
  
  private async copyGitHubTemplates(force: boolean): Promise<void> {
    const sourceDir = path.join(this.templatesPath, '.github');
    const targetDir = path.join(process.cwd(), '.github');
    
    await this.copyDirectoryRecursive(sourceDir, targetDir, force);
  }
  
  
  private async updateGitIgnore(force: boolean): Promise<void> {
    const claudeIgnoreContent = `
# Claude Code Mastery
.claude/
claude-sessions/
.claude-context/
`;
    
    const gitIgnorePath = path.join(process.cwd(), '.gitignore');
    
    try {
      if (await this.fileExists(gitIgnorePath)) {
        const existingContent = await fs.readFile(gitIgnorePath, 'utf8');
        
        // Prüfen ob Claude-spezifische Einträge bereits vorhanden
        if (!existingContent.includes('Claude Code Mastery')) {
          await fs.appendFile(gitIgnorePath, claudeIgnoreContent);
        }
      } else {
        // Neue .gitignore erstellen
        const fullIgnoreContent = await fs.readFile(
          path.join(__dirname, '../../.gitignore'), 
          'utf8'
        );
        await fs.writeFile(gitIgnorePath, fullIgnoreContent);
      }
    } catch (error) {
      console.warn('⚠️ .gitignore konnte nicht aktualisiert werden');
    }
  }
  
  async createClaudeConfig(
    projectType: string, 
    projectInfo: ProjectInfo, 
    config: any
  ): Promise<void> {
    const templatePath = path.join(
      this.templatesPath, 
      'claude-md-examples', 
      `CLAUDE-${projectType}.md`
    );
    
    let content = '';
    
    if (await this.fileExists(templatePath)) {
      content = await fs.readFile(templatePath, 'utf8');
    } else {
      content = this.generateGenericClaudeConfig(projectInfo, config);
    }
    
    // Template-Variablen ersetzen
    content = this.replaceTemplateVariables(content, projectInfo, config);
    
    const targetPath = path.join(process.cwd(), 'CLAUDE.md');
    await fs.writeFile(targetPath, content);
  }
  
  private generateGenericClaudeConfig(projectInfo: ProjectInfo, config: any): string {
    const techStackList = projectInfo.techStack.length > 0 
      ? projectInfo.techStack.join(', ')
      : 'Web Technologies';
    
    return `# ${config.projectName} - Claude Code Konfiguration

## 📊 Projekt Übersicht
- **Name:** ${config.projectName}
- **Beschreibung:** ${config.description}
- **Tech Stack:** ${techStackList}
- **TypeScript:** ${projectInfo.isTypeScript ? 'Ja' : 'Nein'}

## 🏗️ Architektur & Struktur

### Projektstruktur
\`\`\`
${config.projectName}/
${projectInfo.structure.hasSrcFolder ? '├── src/              # Hauptquelldateien\n' : ''}${projectInfo.structure.hasPublicFolder ? '├── public/           # Statische Assets\n' : ''}${projectInfo.structure.hasTestFolder ? '├── tests/            # Test-Dateien\n' : ''}${projectInfo.structure.hasDocsFolder ? '├── docs/             # Dokumentation\n' : ''}└── CLAUDE.md         # Diese Datei
\`\`\`

## 🎯 Claude Code Integration

### Analysis Agent Fokus
- **Code Quality:** ${projectInfo.isTypeScript ? 'TypeScript Strict Mode' : 'JavaScript Best Practices'}
- **Performance:** Bundle Size & Runtime Optimization
- **Testing:** Automated Test Coverage
- **Security:** Dependency & Code Security Audit

### Implementation Agent Regeln
- **Code Style:** Consistent Formatting & Conventions
- **Testing Strategy:** ${projectInfo.techStack.includes('Jest') ? 'Jest Unit Tests' : 'Test Framework Integration'}
- **Documentation:** Inline Comments & README Updates
- **Quality Gates:** Automated Linting & Type Checking

## 🚀 Development Workflow

### Lokale Entwicklung
\`\`\`bash
${projectInfo.hasPackageJson ? 'npm install\nnpm run dev' : '# Setup commands hier einfügen'}
\`\`\`

### Testing
\`\`\`bash
${projectInfo.techStack.includes('Jest') ? 'npm run test' : '# Test commands hier einfügen'}
\`\`\`

## 🔧 Custom Commands

### Standard Workflows
- \`/analyze-code\` - Code Quality Analysis
- \`/optimize-performance\` - Performance Optimization
- \`/security-audit\` - Security Vulnerability Scan
- \`/update-docs\` - Documentation Update

### Projekt-spezifische Commands
${projectInfo.framework === 'react' ? '- `/component-analysis` - React Component Optimization' : ''}${projectInfo.techStack.includes('Node.js Backend') ? '- `/api-performance` - Backend Performance Analysis' : ''}${projectInfo.isTypeScript ? '- `/type-check` - TypeScript Error Resolution' : ''}

## 📊 Monitoring & Quality

### Code Quality Metrics
- **TypeScript Coverage:** ${projectInfo.isTypeScript ? 'Strict Mode Enabled' : 'JavaScript'}
- **Test Coverage:** Target 80%+
- **Bundle Size:** Performance Budget Monitoring
- **Dependencies:** Automated Security Updates

---
**🤖 Powered by Claude Code Mastery Template v1.0.0**
`;
  }
  
  private replaceTemplateVariables(
    content: string, 
    projectInfo: ProjectInfo, 
    config: any
  ): string {
    const replacements = {
      '[IHR_PROJEKT_NAME]': config.projectName,
      '[PROJEKT_BESCHREIBUNG]': config.description,
      '[TECH_STACK]': projectInfo.techStack.join(', '),
      '[FRAMEWORK]': projectInfo.framework || 'Generic',
      '[TYPESCRIPT]': projectInfo.isTypeScript ? 'TypeScript' : 'JavaScript'
    };
    
    let result = content;
    for (const [placeholder, value] of Object.entries(replacements)) {
      result = result.replace(new RegExp(placeholder, 'g'), value);
    }
    
    return result;
  }
  
  private async mergeVSCodeConfig(
    sourcePath: string, 
    targetPath: string, 
    fileName: string
  ): Promise<void> {
    try {
      const sourceContent = await fs.readFile(sourcePath, 'utf8');
      const targetContent = await fs.readFile(targetPath, 'utf8');
      
      if (fileName === 'settings.json') {
        await this.mergeJSONFiles(sourceContent, targetContent, targetPath);
      } else if (fileName === 'tasks.json') {
        await this.mergeTasksJSON(sourceContent, targetContent, targetPath);
      } else if (fileName === 'keybindings.json') {
        await this.mergeKeybindingsJSON(sourceContent, targetContent, targetPath);
      }
    } catch (error) {
      // Fallback: Überschreiben
      await fs.copyFile(sourcePath, targetPath);
    }
  }
  
  private async mergeJSONFiles(
    sourceContent: string, 
    targetContent: string, 
    targetPath: string
  ): Promise<void> {
    try {
      const sourceJSON = JSON.parse(sourceContent);
      const targetJSON = JSON.parse(targetContent);
      
      // Claude-spezifische Settings hinzufügen
      const claudeSettings = {
        'claude.code.enabled': true,
        'claude.multiAgent.enabled': true,
        'claude.agents.analysis.autoStart': true,
        'claude.agents.implementation.autoStart': false
      };
      
      const mergedJSON = {
        ...targetJSON,
        ...claudeSettings
      };
      
      await fs.writeFile(targetPath, JSON.stringify(mergedJSON, null, 2));
    } catch (error) {
      console.warn('⚠️ VS Code Settings merge fehlgeschlagen');
    }
  }
  
  private async mergeTasksJSON(
    sourceContent: string, 
    targetContent: string, 
    targetPath: string
  ): Promise<void> {
    try {
      const sourceTasks = JSON.parse(sourceContent);
      const targetTasks = JSON.parse(targetContent);
      
      // Claude Tasks hinzufügen
      const claudeTasks = sourceTasks.tasks.filter((task: any) => 
        task.label.includes('Claude') || task.label.includes('Agent')
      );
      
      const mergedTasks = {
        ...targetTasks,
        tasks: [
          ...(targetTasks.tasks || []),
          ...claudeTasks
        ],
        inputs: [
          ...(targetTasks.inputs || []),
          ...(sourceTasks.inputs || [])
        ]
      };
      
      await fs.writeFile(targetPath, JSON.stringify(mergedTasks, null, 2));
    } catch (error) {
      console.warn('⚠️ VS Code Tasks merge fehlgeschlagen');
    }
  }
  
  private async mergeKeybindingsJSON(
    sourceContent: string, 
    targetContent: string, 
    targetPath: string
  ): Promise<void> {
    try {
      const sourceKeybindings = JSON.parse(sourceContent);
      const targetKeybindings = JSON.parse(targetContent);
      
      // Claude Keybindings hinzufügen (ohne Konflikte)
      const claudeKeybindings = sourceKeybindings.filter((binding: any) => 
        binding.key.includes('ctrl+shift+c')
      );
      
      const mergedKeybindings = [
        ...targetKeybindings,
        ...claudeKeybindings
      ];
      
      await fs.writeFile(targetPath, JSON.stringify(mergedKeybindings, null, 2));
    } catch (error) {
      console.warn('⚠️ VS Code Keybindings merge fehlgeschlagen');
    }
  }
  
  private async copyDirectoryRecursive(
    sourceDir: string, 
    targetDir: string, 
    force: boolean
  ): Promise<void> {
    if (!await this.directoryExists(sourceDir)) {
      return;
    }
    
    await this.ensureDirectory(targetDir);
    
    const items = await fs.readdir(sourceDir, { withFileTypes: true });
    
    for (const item of items) {
      const sourcePath = path.join(sourceDir, item.name);
      const targetPath = path.join(targetDir, item.name);
      
      if (item.isDirectory()) {
        await this.copyDirectoryRecursive(sourcePath, targetPath, force);
      } else {
        if (force || !await this.fileExists(targetPath)) {
          await fs.copyFile(sourcePath, targetPath);
        }
      }
    }
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
  
  private async ensureDirectory(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      // Directory existiert bereits
    }
  }
}
