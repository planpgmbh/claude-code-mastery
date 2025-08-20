# 🚀 Claude Code Mastery Template - Verwendung

## 📋 Voraussetzungen

Bevor Sie dieses Template verwenden, stellen Sie sicher, dass folgende Tools installiert sind:

- **Node.js** (Version 18+)
- **Docker** & **Docker Compose**
- **VS Code** mit folgenden Extensions:
  - Claude Code Extension
  - Docker Extension
  - GitLens
- **Claude Code CLI**: `npm install -g @anthropic-ai/claude-code`

## 🛠️ Template in bestehendes Projekt integrieren

### Option 1: In bestehendes Repository kopieren

```bash
# 1. In Ihr bestehendes Projekt navigieren
cd /path/to/your/existing/project

# 2. Claude Code Mastery Dateien kopieren
# VS Code Konfiguration
mkdir -p .vscode
cp /path/to/claude-code-mastery/templates/.vscode/* .vscode/

# GitHub Workflows
mkdir -p .github/workflows
cp /path/to/claude-code-mastery/templates/.github/workflows/* .github/workflows/

# Dokumentation kopieren
mkdir -p docs/claude-code-mastery
cp /path/to/claude-code-mastery/docs/* docs/claude-code-mastery/

# 3. CLAUDE.md erstellen (siehe nächster Schritt)
```

### Option 2: Als Git Submodul hinzufügen

```bash
# In Ihrem bestehenden Projekt
git submodule add https://github.com/YOUR_USERNAME/claude-code-mastery.git tools/claude-code-mastery

# Symlinks erstellen
ln -s tools/claude-code-mastery/templates/.vscode .vscode
ln -s tools/claude-code-mastery/templates/.github .github
```

## 📝 CLAUDE.md für Ihr Projekt erstellen

Erstellen Sie eine `CLAUDE.md` Datei im Root Ihres Projekts:

```markdown
# [IHR_PROJEKT_NAME] - Claude Code Konfiguration

## 📊 Projekt Übersicht
- **Typ:** [z.B. React SPA, Node.js API, Full-Stack App]
- **Tech Stack:** [z.B. React, TypeScript, Node.js, PostgreSQL]
- **Architecture:** [z.B. Microservices, Monolith, JAMstack]

## 🏗️ Entwicklungsumgebung

### Lokale Entwicklung
\`\`\`bash
npm install
npm run dev
\`\`\`

### Docker Setup
\`\`\`bash
docker-compose up -d
\`\`\`

## 🎯 Claude Code Integration

### Analysis Agent Fokus
- Bug-Analyse in [spezifische Module]
- Performance-Monitoring für [kritische Bereiche]
- Code Quality Reviews für [wichtige Komponenten]

### Implementation Agent Regeln
- **Code Style:** [ESLint/Prettier Konfiguration]
- **Testing:** [Jest/Cypress/Testing Library]
- **Documentation:** [JSDoc/TypeDoc Standards]

## 📁 Projekt Struktur
\`\`\`
[IHR_PROJEKT]/
├── src/                 # Hauptquelldateien
├── tests/              # Test-Dateien
├── docs/               # Dokumentation
├── docker/             # Docker Konfiguration
└── CLAUDE.md          # Diese Datei
\`\`\`

## 🚀 Deployment
- **Development:** [Dev-Server Details]
- **Staging:** [Staging-Environment]
- **Production:** [Production-Setup]

## 🔧 Custom Commands für dieses Projekt

### Häufige Workflows
- \`/analyze-performance\` - Performance-Analyse
- \`/update-dependencies\` - Dependency Updates
- \`/security-audit\` - Sicherheitsüberprüfung

### Projekt-spezifische Commands
- \`/[custom-command-1]\` - [Beschreibung]
- \`/[custom-command-2]\` - [Beschreibung]
```

## ⚙️ GitHub Repository Setup

### 1. Template Repository markieren

1. Gehen Sie zu Ihren GitHub Repository Settings
2. Scrollen Sie zu "Template repository"
3. Aktivieren Sie "Template repository"

### 2. Repository Beschreibung setzen

```
🤖 Claude Code Mastery Template - Multi-Agent Development System für moderne Web-Apps
```

### 3. Topics hinzufügen

```
claude-code, ai-development, multi-agent, automation, template, workflow
```

### 4. GitHub Project Board erstellen

1. Gehen Sie zu "Projects" → "New Project"
2. Wählen Sie "Board" Template
3. Nennen Sie es "Main Development Board"
4. Erstellen Sie folgende Spalten:
   - **Backlog** (Issues werden hier automatisch erstellt)
   - **Ready** (Nach Analysis Agent Review)
   - **To Do** (Manuell verschoben, bereit für Implementation)
   - **In Progress** (Implementation Agent arbeitet)
   - **Testing** (Automatisch bei PR)
   - **Done** (Automatisch nach Merge)

## 🔑 API Keys & Secrets einrichten

### GitHub Secrets hinzufügen

1. Repository Settings → Secrets and variables → Actions
2. Fügen Sie folgende Secrets hinzu:

```
ANTHROPIC_API_KEY=your-claude-api-key
DOCKER_HUB_USERNAME=your-docker-username  
DOCKER_HUB_TOKEN=your-docker-token
```

### Lokale Entwicklung

```bash
# .env Datei erstellen
cp .env.example .env

# API Keys eintragen
ANTHROPIC_API_KEY=your-claude-api-key
```

## 🎯 Erstes Projekt mit Template

### 1. Template verwenden

1. Klicken Sie auf "Use this template" auf GitHub
2. Erstellen Sie neues Repository
3. Klonen Sie es lokal

### 2. Projekt initialisieren

```bash
# Repository klonen
git clone https://github.com/YOUR_USERNAME/YOUR_NEW_PROJECT.git
cd YOUR_NEW_PROJECT

# Dependencies installieren
npm install

# VS Code öffnen
code .

# Claude Code initialisieren
claude init

# Context priming
# Drücken Sie Ctrl+Shift+C → Ctrl+P
```

### 3. Erstes Ticket erstellen

```bash
# GitHub Issue erstellen (wird automatisch in "Backlog" einsortiert)
# Beispiel: "Bug: Login-Button funktioniert nicht auf Mobile"

# Analysis Agent aktivieren (VS Code):
# Ctrl+Shift+C → Ctrl+B
# oder Command Palette: "Analysis Agent: Bug Deep Dive"
```

## ✅ Checkliste für Template Integration

- [ ] VS Code Konfiguration kopiert
- [ ] GitHub Workflows eingerichtet
- [ ] CLAUDE.md für Projekt erstellt
- [ ] GitHub Project Board konfiguriert
- [ ] API Keys & Secrets eingerichtet
- [ ] Dependencies installiert
- [ ] Erstes Issue getestet
- [ ] Analysis Agent funktioniert
- [ ] Implementation Agent getestet

## 🆘 Häufige Probleme

### Claude Code Verbindung
```bash
# API Key überprüfen
claude config list

# Verbindung testen
claude test-connection
```

### VS Code Integration
```bash
# Extension neu laden
# Command Palette → "Developer: Reload Window"
```

### GitHub Actions Fehler
```bash
# Repository Permissions überprüfen
# Settings → Actions → General → Workflow permissions
```

## 📚 Weiterführende Dokumentation

- [Claude Code Grundlagen](docs/claude-code-mastery/01_Claude_Code_Grundlagen.md)
- [Custom Commands](docs/claude-code-mastery/02_Custom_Commands_Sammlung.md)
- [Multi-Agent System](docs/claude-code-mastery/08_Multi_agent_system.md)

---

**🎉 Viel Erfolg mit Ihrem AI-Enhanced Development Setup!**
