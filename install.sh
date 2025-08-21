#!/bin/bash

# Claude Code Mastery - Installation Script
# Vereinfachte Installation für bestehende Projekte

set -e

echo "Claude Code Mastery Installation"
echo "================================"
echo ""

# Check prerequisites
if ! command -v git &> /dev/null; then
    echo "Git ist nicht installiert"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "Node.js ist nicht installiert"
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "Nicht in einem Git Repository"
    echo "Bitte navigiere in dein Projekt-Verzeichnis"
    exit 1
fi

# Get repository info
REPO_URL=$(git config --get remote.origin.url)
if [ -z "$REPO_URL" ]; then
    echo "Keine GitHub Repository URL gefunden"
    exit 1
fi

# Extract repository name from URL
REPO_NAME=$(echo $REPO_URL | sed 's/.*\/\([^.]*\)\.git/\1/' | sed 's/.*\/\([^/]*\)$/\1/')

echo "Analysiere Projekt..."
echo "Git Repository: $REPO_NAME"

# Check for package.json and set default project type
PROJECT_TYPE="Generic Project"

if [ -f "package.json" ]; then
    echo "package.json gefunden"
    # Try to detect project type
    if grep -q "react" package.json; then
        PROJECT_TYPE="React"
        if grep -q "typescript" package.json; then
            PROJECT_TYPE="React TypeScript"
        fi
    elif grep -q "vue" package.json; then
        PROJECT_TYPE="Vue.js"
    elif grep -q "express\|fastify\|@nestjs" package.json; then
        PROJECT_TYPE="Node.js API"
    else
        PROJECT_TYPE="Web Project"
    fi
    echo "Projekt-Typ erkannt: $PROJECT_TYPE"
else
    echo "Keine package.json gefunden - verwende generischen Typ"
fi

echo ""
echo "Claude Code Mastery Setup"
echo ""

# Confirm project type
echo "Projekt-Typ erkannt: $PROJECT_TYPE"
read -p "   Korrekt? (Y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Nn]$ ]]; then
    echo "Bitte passe den Projekt-Typ manuell in CLAUDE.md an"
fi

# GitHub Board setup
echo ""
echo "GitHub Project Board erstellen?"
echo "   Repository: $REPO_NAME"
read -p "   Board Name [Main Development Board]: " BOARD_NAME
BOARD_NAME=${BOARD_NAME:-"Main Development Board"}

read -p "   GitHub Board erstellen? (Y/n): " -n 1 -r
echo ""
CREATE_BOARD=true
if [[ $REPLY =~ ^[Nn]$ ]]; then
    CREATE_BOARD=false
fi

if [ "$CREATE_BOARD" = true ]; then
    echo ""
    echo "Für GitHub Board-Erstellung wird ein Personal Access Token benötigt"
    echo "   Erstelle einen Token hier: https://github.com/settings/tokens/new"
    echo "   Benötigte Permissions: repo, write:org"
    echo ""
    read -p "   GitHub Token: " -s GITHUB_TOKEN
    echo ""
fi

# Create directories
echo ""
echo "Erstelle Projekt-Struktur..."
mkdir -p docs
mkdir -p .github/ISSUE_TEMPLATE

# Download and copy essential docs
echo "Lade Claude Code Dokumentation..."

REPO_BASE="https://raw.githubusercontent.com/planpgmbh/claude-code-mastery/main"

curl -s "$REPO_BASE/docs/01_Claude_Code_Grundlagen.md" -o docs/01_Claude_Code_Grundlagen.md
echo "docs/01_Claude_Code_Grundlagen.md kopiert"

curl -s "$REPO_BASE/docs/02_Custom_Commands_Sammlung.md" -o docs/02_Custom_Commands_Sammlung.md  
echo "docs/02_Custom_Commands_Sammlung.md kopiert"

curl -s "$REPO_BASE/docs/07_Automated_kanban_workflow.md" -o docs/07_Automated_kanban_workflow.md
echo "docs/07_Automated_kanban_workflow.md kopiert"

curl -s "$REPO_BASE/docs/08_Multi_agent_system.md" -o docs/08_Multi_agent_system.md
echo "docs/08_Multi_agent_system.md kopiert"

# Create project-specific CLAUDE.md
echo "Erstelle CLAUDE.md für $PROJECT_TYPE..."

cat > CLAUDE.md << EOF
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
- **Name:** $REPO_NAME
- **Type:** $PROJECT_TYPE Project
- **Claude Code Mastery:** Enabled

## Architecture & Structure

### Development Commands
\`\`\`bash
$(if [ -f "package.json" ]; then
    echo "npm install          # Install dependencies"
    if grep -q "\"dev\"" package.json; then
        echo "npm run dev          # Development server"
    fi
    if grep -q "\"build\"" package.json; then
        echo "npm run build        # Production build"
    fi
    if grep -q "\"test\"" package.json; then
        echo "npm test             # Run tests"
    fi
fi)
\`\`\`

## Claude Code Multi-Agent Integration

### Analysis Agent
- Analyzes bugs and creates technical specifications
- Creates detailed implementation plans
- Moves issues from Backlog → Ready

### Implementation Agent
- Implements features after human approval
- Writes tests and documentation
- Creates pull requests
- Moves issues from To Do → In Work → Testing

### Human Control Points
- Review Analysis Agent specifications in "Ready" column
- Approve implementation by moving to "To Do"
- Final review and deployment approval

## Workflow

1. **Create GitHub Issue** → Lands in Backlog
2. **Analysis Agent** analyzes → Moves to Ready
3. **Human Review** → Move to To Do when approved
4. **Implementation Agent** → Automatic implementation
5. **Testing & Review** → Quality assurance
6. **Deploy & Done** → Feature complete

## Documentation

- \`docs/01_Claude_Code_Grundlagen.md\` - Basic workflow commands
- \`docs/02_Custom_Commands_Sammlung.md\` - Available custom commands  
- \`docs/07_Automated_kanban_workflow.md\` - GitHub board automation
- \`docs/08_Multi_agent_system.md\` - Multi-agent coordination

---

**Powered by Claude Code Mastery**
EOF

# Create GitHub Issue Templates
echo "Erstelle GitHub Issue Templates..."

cat > .github/ISSUE_TEMPLATE/bug_report.md << 'EOF'
---
name: Bug Report
about: Create a report to help us improve
title: '[BUG] '
labels: 'bug'
assignees: ''
projects: ['Main Development Board']
---

## Bug Description
A clear and concise description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
A clear description of what you expected to happen.

## Environment
- Device: [e.g. iPhone6]
- OS: [e.g. iOS8.1]
- Browser [e.g. stock browser, safari]
- Version [e.g. 22]

## Additional Context
Add any other context about the problem here.
EOF

cat > .github/ISSUE_TEMPLATE/feature_request.md << 'EOF'
---
name: Feature Request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: 'enhancement'
assignees: ''
projects: ['Main Development Board']
---

## Feature Description
A clear and concise description of what you want to happen.

## Motivation
Why is this feature needed? What problem does it solve?

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Considerations
Any technical requirements or constraints to consider.

## Additional Context
Add any other context or screenshots about the feature request here.
EOF

# GitHub Board setup via API (if token provided)
if [ "$CREATE_BOARD" = true ] && [ -n "$GITHUB_TOKEN" ]; then
    echo ""
    echo "Erstelle GitHub Project Board..."
    
    # This would need the actual GitHub API implementation
    echo "Board '$BOARD_NAME' Konfiguration bereit"
    echo "   (GitHub API Implementation erforderlich)"
fi

# Final success message
echo ""
echo "Claude Code Mastery erfolgreich installiert!"
echo ""
echo "Dein Projekt enthält jetzt:"
echo "├── docs/                    # Claude Code Workflows & Commands"
echo "├── CLAUDE.md                # Projekt-spezifische Konfiguration"  
echo "└── .github/ISSUE_TEMPLATE/  # Issue Templates für Board"
echo ""

if [ "$CREATE_BOARD" = true ]; then
    echo "GitHub Board: https://github.com/$(echo $REPO_URL | sed 's/.*github.com[:/]\([^.]*\)\.git.*/\1/')/projects"
fi

echo ""
echo "Nächste Schritte:"
echo "1. Claude Code Session starten:"
echo "   claude init"
echo ""
echo "2. Projekt-Kontext laden:"
echo "   claude /rsi"
echo ""
echo "3. Erstes Issue testen:"
echo "   - GitHub → Issues → 'Bug Report' oder 'Feature Request'"
echo "   - Issue landet automatisch im Backlog"
echo "   - Claude analysiert → verschiebt zu Ready"
echo "   - Du reviewst → verschiebst zu To Do"  
echo "   - Claude implementiert automatisch"
echo ""
echo "Claude Code Multi-Agent System ist einsatzbereit!"