# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 📊 Project Overview
- **Name:** [YOUR_PROJECT_NAME]
- **Type:** [PROJECT_TYPE] Project
- **Claude Code Mastery:** Enabled

## 🏗️ Architecture & Structure

### Development Commands
```bash
[ADD_YOUR_COMMANDS_HERE]
# Example:
# npm install          # Install dependencies
# npm run dev          # Development server
# npm run build        # Production build
# npm test             # Run tests
```

## 🎯 Claude Code Multi-Agent Integration

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

## 🚀 Workflow

1. **Create GitHub Issue** → Lands in Backlog
2. **Analysis Agent** analyzes → Moves to Ready
3. **Human Review** → Move to To Do when approved
4. **Implementation Agent** → Automatic implementation
5. **Testing & Review** → Quality assurance
6. **Deploy & Done** → Feature complete

## 📚 Documentation

- `docs/01_Claude_Code_Grundlagen.md` - Basic workflow commands
- `docs/02_Custom_Commands_Sammlung.md` - Available custom commands  
- `docs/07_Automated_kanban_workflow.md` - GitHub board automation
- `docs/08_Multi_agent_system.md` - Multi-agent coordination

---

**🤖 Powered by Claude Code Mastery**