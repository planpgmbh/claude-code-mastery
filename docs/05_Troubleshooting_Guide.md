# Troubleshooting Guide - Multi-Agent Claude Code System

## Multi-Agent System Probleme

### Problem: Agent Communication Failures
**Symptome:**
- Analysis Agent Output wird nicht an Implementation Agent weitergegeben
- Incomplete Handoff zwischen Agents
- Sub-Agent Coordination Issues

**Lösungsansätze:**
```bash
# 1. Agent Communication Status prüfen
/agent-status --verbose
/check-agent-coordination

# 2. Inter-Agent Protocol validieren
claude config show agents.communication.protocol
claude config set agents.communication.protocol structured-json

# 3. Agent Session Reset
/agent-reset analysis
/agent-reset implementation
/reload-agent-contexts

# 4. Communication Log Analysis
cat ~/.claude/logs/agent-communication.log
grep "handoff_failed" ~/.claude/logs/agent-*.log

# 5. Manual Agent Synchronization
/sync-agents --force
/validate-agent-state
```

**Häufige Ursachen:**
- Corrupt Agent Context Files
- Network Interruption während Agent Handoff
- Version Mismatch zwischen Agent Specifications
- Insufficient Memory für Multi-Agent Processing

### Problem: Analysis Agent Plan Rejection Rate hoch
**Symptome:**
- Human Review führt häufig zu Plan-Ablehnungen
- Analysis Agent versteht Requirements nicht richtig
- Sub-Agent Specialization funktioniert nicht optimal

**Optimierung Strategien:**
```bash
# 1. Analysis Agent Context Tuning
/tune-analysis-agent --focus=requirements-clarity
/update-analysis-patterns --successful-plans-only

# 2. Sub-Agent Specialization Review
/review-sub-agent-performance bug_detective
/review-sub-agent-performance feature_architect
/optimize-sub-agent-coordination

# 3. Human Feedback Integration
/analyze-rejection-patterns --period=month
/update-agent-learning --feedback-integration=high

# 4. Context Quality Improvement
/improve-project-context --claude-md-optimization
/enhance-domain-knowledge --project-specific

# 5. Success Pattern Analysis
/identify-successful-plans --pattern-extraction
/apply-successful-patterns --to-agent-behavior
```

## Installation & Setup Probleme

### Problem: Claude Code installiert sich nicht
**Symptome:**
- NPM Installation schlägt fehl
- "Command not found" nach Installation
- Permission Errors

**Lösungsansätze:**
```bash
# 1. Node.js Version prüfen
node --version  # Mindestens v18 erforderlich

# 2. NPM Cache leeren
npm cache clean --force

# 3. Globale Installation mit korrekten Permissions
sudo npm install -g @anthropic-ai/claude-code

# 4. Alternative: Verwendung von npx
npx @anthropic-ai/claude-code

# 5. PATH Variable prüfen
echo $PATH | grep npm
```

### Problem: Authentifizierung schlägt fehl
**Symptome:**
- "Authentication failed" Meldungen
- API Rate Limits
- "Invalid API key" Errors

**Lösungsansätze:**
```bash
# 1. API Key neu setzen
claude config set api-key YOUR_API_KEY

# 2. Config Datei manuell prüfen
cat ~/.claude/config.json

# 3. Environment Variables prüfen
echo $ANTHROPIC_API_KEY

# 4. Network Connectivity testen
curl -i https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01"

# 5. Subscription Status prüfen
claude account status
```

## Performance & Memory Probleme

### Problem: Claude Code läuft langsam oder hängt
**Symptome:**
- Lange Response Zeiten (>30 Sekunden)
- Memory Usage über 2GB
- "Context too large" Errors
- Timeouts bei großen Projekten

**Optimierung Strategien:**
```bash
# 1. Context Size reduzieren
/clear  # Kontext löschen
/compact  # Kontext komprimieren

# 2. Token Limits setzen
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=4096
export CLAUDE_CODE_MAX_INPUT_TOKENS=150000

# 3. File Exclusions konfigurieren
# In .claude/settings.json:
{
  "fileExclusions": [
    "node_modules/**",
    ".git/**",
    "dist/**",
    "build/**",
    "*.log",
    "*.lock"
  ]
}

# 4. Memory Monitoring
top -p $(pgrep claude-code)
htop -p $(pgrep claude-code)

# 5. Selective File Loading
/context-prime --files="src/**/*.ts,package.json,README.md"
```

## VS Code Multi-Agent Integration Issues

### Problem: VS Code Agent Selection Interface funktioniert nicht
**Symptome:**
- Agent Tasks nicht verfügbar in Command Palette
- Agent Status nicht sichtbar
- Task Execution schlägt fehl

**VS Code Integration Fix:**
```bash
# 1. Extension Configuration Validation
code --list-extensions | grep claude
cat .vscode/settings.json | grep agent

# 2. Multi-Agent Configuration Reset
# .vscode/settings.json Reset:
{
  "claude.multiAgent.enabled": true,
  "claude.agents.analysis.autoStart": false,
  "claude.agents.implementation.autoStart": false,
  "claude.agents.communication.enabled": true
}

# 3. Task Configuration Validation
# .vscode/tasks.json Syntax Check
cat .vscode/tasks.json | jq .  # JSON Syntax Validation

# 4. Extension Reinstallation
code --uninstall-extension anthropic.claude-code
code --install-extension anthropic.claude-code
# VS Code restart required

# 5. Workspace Reload
# Command Palette: "Developer: Reload Window"
```

## GitHub Integration Multi-Agent Issues

### Problem: Multi-Agent Kanban Board Updates schlagen fehl
**Symptome:**
- Issues werden nicht automatisch zwischen Spalten bewegt
- Agent-generated PRs haben falsche Labels
- Kanban Automation Rules funktionieren nicht

**GitHub Integration Debugging:**
```bash
# 1. GitHub API Token Validation
/validate-github-integration --multi-agent-scope

# 2. Kanban Board Automation Check
/debug-kanban-automation --board="Main Development Board"
/validate-github-actions --agent-workflow

# 3. Issue/PR Template Validation
/validate-issue-templates --agent-generated
/check-pr-automation --multi-agent-workflow

# 4. GitHub Actions Multi-Agent Workflow Debug
# .github/workflows/multi-agent.yml Debug
cat .github/workflows/multi-agent.yml
gh workflow list
gh run list --workflow=multi-agent
```

## Emergency Recovery Procedures

### Multi-Agent System Complete Reset
```bash
# 1. Backup Current Agent States
cp -r ~/.claude/agents ~/.claude/agents.backup.$(date +%Y%m%d)
cp -r ./.claude/agents ./.claude/agents.backup.$(date +%Y%m%d)

# 2. Stop All Active Agents
/stop-all-agents --force
killall claude-agent-*

# 3. Clean Agent Cache und Contexts
rm -rf ~/.claude/agents/cache/*
rm -rf ~/.claude/agents/contexts/*
rm -rf /tmp/claude-agent-*

# 4. Reset Agent Configuration
claude config reset agents
claude config set agents.enabled false

# 5. Reinstall Multi-Agent System
/reinstall-multi-agent-system --clean
/initialize-agents --from-backup-if-needed

# 6. Validation Complete System
/validate-multi-agent-system --comprehensive
/test-agent-coordination --basic-workflow
```

## Häufige Error Messages & Multi-Agent Fixes

| Error Message | Agent | Ursache | Lösung |
|---------------|-------|---------|--------|
| `Agent coordination timeout` | All | Network/Communication Issue | `/reset-agent-communication` |
| `Analysis plan validation failed` | Analysis | Incomplete requirements | `/enhance-analysis-context` |
| `Implementation queue overflow` | Implementation | Too many parallel tasks | `/optimize-implementation-queue` |
| `Sub-agent specialization conflict` | Both | Resource competition | `/resolve-sub-agent-conflicts` |
| `GitHub integration authentication failed` | Both | API token expired | `/refresh-github-integration` |
| `Multi-agent context sync failed` | Both | Context file corruption | `/rebuild-agent-contexts` |
| `Quality gate threshold not met` | Implementation | Code quality below standards | `/adjust-quality-thresholds` |

## Monitoring & Alerting für Multi-Agent System

### Comprehensive Agent Monitoring Setup
```bash
# 1. Agent Health Monitoring
/setup-agent-health-monitoring

# Agent Health Check Dashboard
{
  "analysis_agent": {
    "status": "healthy|degraded|failed",
    "sub_agents": {
      "bug_detective": "healthy",
      "feature_architect": "healthy", 
      "research_specialist": "degraded"
    },
    "performance_metrics": {
      "response_time": "3.2s",
      "success_rate": "94%",
      "resource_usage": "67%"
    }
  },
  "implementation_agent": {
    "status": "healthy",
    "sub_agents": {
      "code_craftsman": "healthy",
      "test_guardian": "healthy",
      "quality_sentinel": "healthy",
      "deployment_orchestrator": "healthy"
    },
    "performance_metrics": {
      "completion_rate": "98%",
      "code_quality": "A+",
      "deployment_success": "100%"
    }
  }
}

# 2. Alert Configuration
claude config set monitoring.alerts.agent_failure immediate
claude config set monitoring.alerts.performance_degradation 15min
claude config set monitoring.alerts.coordination_failure 5min

# 3. Automated Health Checks
# .github/workflows/agent-health-check.yml
cron: '*/15 * * * *'  # Every 15 minutes
actions:
  - agent_status_check
  - performance_metric_collection
  - failure_detection_and_recovery
```

## Best Practices für Multi-Agent Troubleshooting

### Preventive Measures
```bash
# 1. Regular Agent Health Checks
# Cron job für automated health monitoring
0 */6 * * * /path/to/claude /agent-health-check --auto-repair

# 2. Context Backup Strategy
# Daily backup von agent contexts
0 2 * * * tar -czf /backups/agent-contexts-$(date +\%Y\%m\%d).tar.gz ~/.claude/agents/

# 3. Performance Monitoring Alerts
# Real-time performance degradation detection
claude config set monitoring.performance.degradation_threshold 20%
claude config set monitoring.alerts.notification_channels ["email", "slack", "sms"]

# 4. Automated Recovery Procedures
# Self-healing capabilities für common issues
claude config set agents.self_healing.enabled true
claude config set agents.recovery.auto_restart true
claude config set agents.recovery.max_retries 3
```

### Troubleshooting Workflow
```bash
# Systematic Troubleshooting Approach
/systematic-troubleshooting [issue-type]

troubleshooting_workflow:
  step_1_issue_identification:
    - Symptom collection and documentation
    - Error message analysis and categorization
    - Impact assessment (user-facing vs internal)
    
  step_2_root_cause_analysis:
    - Agent log analysis and correlation
    - System resource investigation
    - Configuration drift detection
    - External dependency validation
    
  step_3_solution_implementation:
    - Fix strategy development and testing
    - Gradual rollout with monitoring
    - Validation through synthetic testing
    - Documentation update and learning integration
    
  step_4_prevention:
    - Root cause elimination where possible
    - Monitoring enhancement for early detection
    - Process improvement implementation
    - Team knowledge transfer and training
```

*Dieses umfassende Multi-Agent Troubleshooting Guide stellt sicher, dass dein intelligentes Entwicklungssystem robust, zuverlässig und selbstheilend funktioniert! 🚀*
