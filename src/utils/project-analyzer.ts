import { promises as fs } from 'fs';
import path from 'path';
const { glob } = require('glob');

export interface ProjectInfo {
  name?: string;
  description?: string;
  detectedType?: string;
  hasPackageJson: boolean;
  techStack: string[];
  dependencies: string[];
  devDependencies: string[];
  framework?: string;
  isTypeScript: boolean;
  hasDocker: boolean;
  hasGitHub: boolean;
  structure: ProjectStructure;
}

interface ProjectStructure {
  hasSrcFolder: boolean;
  hasPublicFolder: boolean;
  hasTestFolder: boolean;
  hasDocsFolder: boolean;
  mainFiles: string[];
  configFiles: string[];
}

export class ProjectAnalyzer {
  private projectPath: string;
  
  constructor(projectPath: string) {
    this.projectPath = projectPath;
  }
  
  async analyze(): Promise<ProjectInfo> {
    const info: ProjectInfo = {
      hasPackageJson: false,
      techStack: [],
      dependencies: [],
      devDependencies: [],
      isTypeScript: false,
      hasDocker: false,
      hasGitHub: false,
      structure: {
        hasSrcFolder: false,
        hasPublicFolder: false,
        hasTestFolder: false,
        hasDocsFolder: false,
        mainFiles: [],
        configFiles: []
      }
    };
    
    // Package.json analysieren
    await this.analyzePackageJson(info);
    
    // Projektstruktur analysieren
    await this.analyzeProjectStructure(info);
    
    // Framework detection
    this.detectFramework(info);
    
    // Projekt-Typ bestimmen
    this.determineProjectType(info);
    
    return info;
  }
  
  private async analyzePackageJson(info: ProjectInfo): Promise<void> {
    const packageJsonPath = path.join(this.projectPath, 'package.json');
    
    try {
      const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
      const packageJson = JSON.parse(packageJsonContent);
      
      info.hasPackageJson = true;
      info.name = packageJson.name;
      info.description = packageJson.description;
      info.dependencies = Object.keys(packageJson.dependencies || {});
      info.devDependencies = Object.keys(packageJson.devDependencies || {});
      
      // TypeScript Detection
      info.isTypeScript = 
        info.dependencies.includes('typescript') ||
        info.devDependencies.includes('typescript') ||
        await this.fileExists('tsconfig.json');
      
    } catch (error) {
      // package.json nicht vorhanden oder fehlerhaft
      info.hasPackageJson = false;
    }
  }
  
  private async analyzeProjectStructure(info: ProjectInfo): Promise<void> {
    // Wichtige Ordner prüfen
    info.structure.hasSrcFolder = await this.directoryExists('src');
    info.structure.hasPublicFolder = await this.directoryExists('public');
    info.structure.hasTestFolder = 
      await this.directoryExists('test') || 
      await this.directoryExists('tests') ||
      await this.directoryExists('__tests__');
    info.structure.hasDocsFolder = await this.directoryExists('docs');
    
    // Docker Detection
    info.hasDocker = 
      await this.fileExists('Dockerfile') ||
      await this.fileExists('docker-compose.yml') ||
      await this.fileExists('docker-compose.yaml');
    
    // GitHub Detection
    info.hasGitHub = await this.directoryExists('.github');
    
    // Main Files finden
    const mainFilePatterns = [
      'index.{js,ts,jsx,tsx}',
      'app.{js,ts,jsx,tsx}',
      'main.{js,ts,jsx,tsx}',
      'server.{js,ts}',
      'src/index.{js,ts,jsx,tsx}',
      'src/app.{js,ts,jsx,tsx}',
      'src/main.{js,ts,jsx,tsx}'
    ];
    
    for (const pattern of mainFilePatterns) {
      const files = await glob(pattern, { cwd: this.projectPath });
      info.structure.mainFiles.push(...files);
    }
    
    // Config Files finden
    const configFilePatterns = [
      'tsconfig.json',
      'webpack.config.{js,ts}',
      'vite.config.{js,ts}',
      'next.config.{js,ts}',
      'nuxt.config.{js,ts}',
      'vue.config.{js,ts}',
      'tailwind.config.{js,ts}',
      'eslint.config.{js,json}',
      '.eslintrc.{js,json,yml,yaml}',
      'prettier.config.{js,json}',
      '.prettierrc',
      'jest.config.{js,ts,json}'
    ];
    
    for (const pattern of configFilePatterns) {
      const files = await glob(pattern, { cwd: this.projectPath });
      info.structure.configFiles.push(...files);
    }
  }
  
  private detectFramework(info: ProjectInfo): void {
    // React Detection
    if (info.dependencies.includes('react')) {
      info.framework = 'react';
      info.techStack.push('React');
      
      if (info.dependencies.includes('next')) {
        info.framework = 'nextjs';
        info.techStack.push('Next.js');
      }
    }
    
    // Vue Detection
    if (info.dependencies.includes('vue')) {
      info.framework = 'vue';
      info.techStack.push('Vue.js');
      
      if (info.dependencies.includes('nuxt')) {
        info.framework = 'nuxtjs';
        info.techStack.push('Nuxt.js');
      }
    }
    
    // Node.js Backend Detection
    if (info.dependencies.includes('express') || 
        info.dependencies.includes('fastify') ||
        info.dependencies.includes('@nestjs/core')) {
      info.techStack.push('Node.js Backend');
      
      if (info.dependencies.includes('express')) {
        info.techStack.push('Express.js');
      }
      if (info.dependencies.includes('fastify')) {
        info.techStack.push('Fastify');
      }
      if (info.dependencies.includes('@nestjs/core')) {
        info.techStack.push('NestJS');
      }
    }
    
    // Database Detection
    if (info.dependencies.includes('prisma') || info.dependencies.includes('@prisma/client')) {
      info.techStack.push('Prisma');
    }
    if (info.dependencies.includes('mongoose')) {
      info.techStack.push('MongoDB/Mongoose');
    }
    if (info.dependencies.includes('pg') || info.dependencies.includes('postgres')) {
      info.techStack.push('PostgreSQL');
    }
    
    // Testing Framework Detection
    if (info.devDependencies.includes('jest')) {
      info.techStack.push('Jest');
    }
    if (info.devDependencies.includes('cypress')) {
      info.techStack.push('Cypress');
    }
    if (info.devDependencies.includes('@testing-library/react')) {
      info.techStack.push('React Testing Library');
    }
    
    // Build Tool Detection
    if (info.devDependencies.includes('vite')) {
      info.techStack.push('Vite');
    }
    if (info.devDependencies.includes('webpack')) {
      info.techStack.push('Webpack');
    }
    
    // CSS Framework Detection
    if (info.dependencies.includes('tailwindcss') || info.devDependencies.includes('tailwindcss')) {
      info.techStack.push('Tailwind CSS');
    }
    
    // TypeScript
    if (info.isTypeScript) {
      info.techStack.push('TypeScript');
    }
  }
  
  private determineProjectType(info: ProjectInfo): void {
    // Next.js Projects
    if (info.framework === 'nextjs') {
      info.detectedType = 'nextjs';
      return;
    }
    
    // React SPA
    if (info.framework === 'react' && !this.hasBackendSignals(info)) {
      info.detectedType = 'react-spa';
      return;
    }
    
    // Vue SPA
    if (info.framework === 'vue' && !this.hasBackendSignals(info)) {
      info.detectedType = 'vue-spa';
      return;
    }
    
    // Node.js API
    if (this.hasBackendSignals(info) && !this.hasFrontendSignals(info)) {
      info.detectedType = 'nodejs-api';
      return;
    }
    
    // Full-Stack
    if (this.hasFrontendSignals(info) && this.hasBackendSignals(info)) {
      info.detectedType = 'fullstack';
      return;
    }
    
    // Generic Web Project
    if (info.hasPackageJson) {
      info.detectedType = 'generic';
      return;
    }
    
    // Fallback
    info.detectedType = 'unknown';
  }
  
  private hasFrontendSignals(info: ProjectInfo): boolean {
    return info.dependencies.includes('react') ||
           info.dependencies.includes('vue') ||
           info.dependencies.includes('@angular/core') ||
           info.structure.hasPublicFolder ||
           info.structure.mainFiles.some(f => f.includes('index.html'));
  }
  
  private hasBackendSignals(info: ProjectInfo): boolean {
    return info.dependencies.includes('express') ||
           info.dependencies.includes('fastify') ||
           info.dependencies.includes('@nestjs/core') ||
           info.dependencies.includes('koa') ||
           info.structure.mainFiles.some(f => f.includes('server')) ||
           info.structure.configFiles.some(f => f.includes('prisma'));
  }
  
  private async fileExists(fileName: string): Promise<boolean> {
    try {
      await fs.access(path.join(this.projectPath, fileName));
      return true;
    } catch {
      return false;
    }
  }
  
  private async directoryExists(dirName: string): Promise<boolean> {
    try {
      const stat = await fs.stat(path.join(this.projectPath, dirName));
      return stat.isDirectory();
    } catch {
      return false;
    }
  }
}
