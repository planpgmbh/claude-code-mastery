# 🤖 Claude Code Mastery Template

> **NPM Package für automatische Claude Code Integration in bestehende Web-Projekte**

[![npm version](https://badge.fury.io/js/claude-code-mastery-template.svg)](https://badge.fury.io/js/claude-code-mastery-template)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code Compatible](https://img.shields.io/badge/Claude%20Code-Compatible-blue.svg)](https://docs.anthropic.com/en/docs/claude-code)

## 🎯 Was macht dieses Package?

Integriert **Multi-Agent Claude Code System** in Ihre bestehenden Web-Projekte:

- 🤖 **Analysis Agent** - Automatische Bug-Analyse & Feature-Planning
- ⚡ **Implementation Agent** - Automatische Code-Implementierung
- 📊 **GitHub Project Board** - Vollautomatisches Kanban Board Setup
- 🔧 **VS Code Integration** - Optimierte Entwicklungsumgebung
- 👤 **Human Control Points** - Sie behalten die Kontrolle über kritische Entscheidungen

## 🚀 Installation & Usage

### **Schnellstart - Bestehendes Projekt**

```bash
# 1. In Ihr bestehendes Projekt navigieren
cd /path/to/your/existing/project

# 2. Claude Code Mastery integrieren
npx claude-code-mastery-template init

# 3. GitHub Project Board erstellen (optional)
npx claude-code-mastery-template setup-board

# 4. Fertig! 🎉
```

### **Globale Installation**

```bash
# Global installieren für mehrfache Nutzung
npm install -g claude-code-mastery-template

# Dann in jedem Projekt verwenden
claude-mastery init
```

## 📋 Was passiert beim `init`?

### **Automatische Projekt-Erkennung**
- ✅ **React SPA** (mit TypeScript/JavaScript)
- ✅ **Node.js API** (Express, Fastify, NestJS)
- ✅ **Full-Stack Apps** (React + Backend)
- ✅ **Next.js Projekte**
- ✅ **Vue.js Anwendungen**
- ✅ **Generic Web Projekte**

### **Integration ohne Überschreibung**
```bash
Ihr Projekt/
├── .vscode/           # ✅ VS Code Claude Integration
├── .github/           # ✅ Workflows & Issue Templates
├── CLAUDE.md          # ✅ Projekt-spezifische Config
├── .env.example       # ✅ API Keys Template
└── package.json       # ✅ Erweitert (nicht überschrieben)
```

### **GitHub Project Board Auto-Setup**
```
┌─────────────────────────────────────────────────────────┐
│ 📊 Main Development Board (Automatisch erstellt)       │
├─────────┬─────────┬─────────┬─────────┬─────────────────┤
│ Backlog │ Ready   │ To Do   │ Testing │ Done            │
│ 📥 Auto │ 🤖 Agent│ 👤 Human│ 🔄 Auto │ ✅ Auto         │
└─────────┴─────────┴─────────┴─────────┴─────────────────┘
```

## 🎯 Workflow nach der Integration

### **1. Issue-basierter Workflow**
```bash
# GitHub Issue erstellen:
"Bug: Login-Button funktioniert nicht auf Mobile"

# Automatisch:
├── 📥 Lands in "Backlog"
├── 🤖 Analysis Agent analysiert
├── ➡️ Moved to "Ready" mit Technical Spec
└── 👤 Sie reviewen & schieben zu "To Do"

# Implementation Agent übernimmt:
├── ⚡ Automatische Code-Implementierung
├── 🧪 Tests generiert & ausgeführt
├── 📝 Pull Request erstellt
└── 🚀 Nach Review: Auto-Deploy
```

### **2. VS Code Integration**
```bash
# Keyboard Shortcuts (automatisch konfiguriert):
Ctrl+Shift+C → Ctrl+B  # Analysis Agent: Bug Deep Dive
Ctrl+Shift+C → Ctrl+F  # Analysis Agent: Feature Planning
Ctrl+Shift+C → Ctrl+T  # Implementation Agent: Process Queue
Ctrl+Shift+C → Ctrl+S  # Agent Status Dashboard
```

### **3. Projekt-spezifische CLAUDE.md**
Das Tool erkennt automatisch Ihren Tech Stack und erstellt optimierte Konfiguration:

```markdown
# React TypeScript Projekt → CLAUDE-react-spa.md
# Node.js API Projekt    → CLAUDE-nodejs-api.md
# Full-Stack Projekt     → CLAUDE-fullstack.md
# Generic Projekt        → CLAUDE-generic.md
```

## 📊 Commands & Features

### **Hauptkommandos**
```bash
# Projekt analysieren
claude-mastery analyze

# Integration starten
claude-mastery init [options]

# GitHub Board erstellen
claude-mastery setup-board

# Status prüfen
claude-mastery status

# Templates aktualisieren
claude-mastery update
```

### **Init Optionen**
```bash
# Spezifischen Projekt-Typ forcieren
claude-mastery init --type react-spa

# Bestehende Konfiguration überschreiben
claude-mastery init --force

# GitHub Board Setup überspringen
claude-mastery init --skip-board
```

## 🛠️ Unterstützte Projekt-Typen

### **React SPA Projekte**
```typescript
// Automatisch erkannt bei:
- React Dependencies
- TypeScript/JavaScript
- Vite/Webpack/Create React App
- Tailwind CSS, Material-UI, etc.

// Optimierte CLAUDE.md mit:
- React-spezifischen Custom Commands
- Component Development Workflows
- Performance Optimization Rules
- Testing Strategy (RTL, Jest, Cypress)
```

### **Node.js API Projekte**
```typescript
// Automatisch erkannt bei:
- Express, Fastify, NestJS
- Database Integrations (Prisma, Mongoose)
- Authentication Libraries
- API Documentation Tools

// Optimierte CLAUDE.md mit:
- API Development Best Practices
- Database Optimization Commands
- Security Audit Workflows
- Performance Monitoring Setup
```

### **Full-Stack Projekte**
```typescript
// Automatisch erkannt bei:
- Frontend + Backend Dependencies
- Monorepo Structures
- Shared TypeScript Configs
- Full-Stack Frameworks (Next.js, Nuxt.js)

// Optimierte CLAUDE.md mit:
- End-to-End Development Workflows
- Frontend/Backend Coordination
- Deployment Pipeline Integration
- Cross-Stack Testing Strategies
```

## 🔧 Konfiguration & Anpassung

### **Environment Setup**
```bash
# Nach der Integration .env konfigurieren:
cp .env.example .env

# Wichtige Variablen:
ANTHROPIC_API_KEY=your-claude-api-key
GITHUB_TOKEN=your-github-token  # für Board-Setup
```

### **VS Code Extensions (Empfohlen)**
```json
{
  "recommendations": [
    "anthropic.claude-code",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-json"
  ]
}
```

### **GitHub Token Permissions**
Für automatisches Board Setup benötigt der GitHub Token:
- ✅ `repo` (Repository access)
- ✅ `write:project` (Project boards)
- ✅ `workflow` (GitHub Actions)

## 📈 Erfolgsmetriken

Nach der Integration können Sie erwarten:

### **Development Velocity**
- 📈 **60-90% Zeitersparnis** bei Bug-Fixes
- 📈 **50-70% Schnellere** Feature-Entwicklung
- 📈 **5x Häufigere** Deployments

### **Code Quality**
- ✅ **Automatische Code Reviews** durch Analysis Agent
- ✅ **Konsistente Best Practices** Anwendung
- ✅ **Proaktive Security** Vulnerability Detection

### **Team Produktivität**
- 👥 **Standardisierte Workflows** für alle Entwickler
- 👥 **Reduzierte Context Switches** zwischen Tools
- 👥 **Automatisierte Dokumentation** Updates

## 🆘 Troubleshooting

### **Häufige Probleme**

**🔧 Claude Code CLI nicht gefunden:**
```bash
# Claude Code CLI installieren
npm install -g @anthropic-ai/claude-code

# API Key konfigurieren
claude config set api-key YOUR_API_KEY
```

**📊 GitHub Board wird nicht erstellt:**
```bash
# Token Permissions prüfen
# GitHub → Settings → Developer settings → Personal access tokens
# Benötigt: repo, write:project, workflow

# Board manuell erstellen
claude-mastery setup-board --repo owner/repository
```

**⚙️ VS Code Integration funktioniert nicht:**
```bash
# Extension installieren
code --install-extension anthropic.claude-code

# Workspace neu laden
# Command Palette → "Developer: Reload Window"
```

### **Debug Commands**
```bash
# Projekt-Analyse anzeigen
claude-mastery analyze

# Konfiguration validieren
claude-mastery status

# Verbose Logging aktivieren
DEBUG=claude-mastery:* claude-mastery init
```

## 🤝 Contributing

### **Development Setup**
```bash
# Repository klonen
git clone https://github.com/planpgmbh/claude-code-mastery.git
cd claude-code-mastery

# Dependencies installieren
npm install

# TypeScript kompilieren
npm run build

# Local testen
npm link
claude-mastery --help
```

### **Testing**
```bash
# Tests ausführen
npm test

# Template Integration testen
npm run test:templates

# E2E Test in Sample Projekt
cd test-projects/react-sample
claude-mastery init --type react-spa
```

## 📚 Dokumentation

- 📖 **[Installation Guide](.github/template-usage.md)** - Detaillierte Setup-Anleitung
- 📖 **[Custom Commands](docs/02_Custom_Commands_Sammlung.md)** - Alle verfügbaren Commands
- 📖 **[Multi-Agent System](docs/08_Multi_agent_system.md)** - Architektur & Workflows
- 📖 **[Troubleshooting](docs/05_Troubleshooting_Guide.md)** - Problemlösungen

## 📝 License

MIT License - siehe [LICENSE](LICENSE) für Details.

## 🙏 Credits

- **Anthropic** - Claude Code Tool & API
- **Community** - Best Practices & Feedback
- **Contributors** - Template Development & Testing

---

## 🎉 Quick Start Beispiel

```bash
# Beispiel: React Projekt integrieren
git clone https://github.com/user/my-react-app.git
cd my-react-app

npx claude-code-mastery-template init
# ✅ React TypeScript erkannt
# ✅ VS Code konfiguriert
# ✅ GitHub Workflows hinzugefügt
# ✅ CLAUDE.md für React optimiert

code .
# Ctrl+Shift+C → Ctrl+S (Agent Status)
# 🎯 Bereit für AI-Enhanced Development!
```

**🚀 Revolutionieren Sie Ihre Entwicklung mit Multi-Agent AI Workflows!**
