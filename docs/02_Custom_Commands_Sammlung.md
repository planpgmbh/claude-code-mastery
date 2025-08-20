# Custom Commands Sammlung - Claude Code

## Git & Versionskontrolle Befehle

### `/commit`
**Zweck:** Erstellt Conventional Commits mit angemessenen Emojis
```
Analysiere die staged Änderungen und erstelle einen präzisen Conventional Commit mit:
- Typ (feat, fix, docs, style, refactor, test, chore)
- Scope (optional)
- Emoji passend zum Commit-Typ
- Klare, prägnante Beschreibung
- Body nur wenn nötig für Kontext
```

### `/create-pr` 
**Zweck:** Automatisiert kompletten Pull Request Workflow
```
Erstelle einen umfassenden Pull Request mit:
- Aussagekräftigem Titel und Beschreibung
- Änderungsübersicht (Added, Changed, Fixed, Removed)
- Testing-Notizen
- Screenshots bei UI-Änderungen
- Breaking Changes Dokumentation
- Reviewer-Vorschläge basierend auf geänderten Dateien
```

### `/fix-github-issue`
**Zweck:** Analysiert und behebt GitHub Issues strukturiert
```
Für Issue #[NUMBER]:
1. Issue gründlich analysieren und Kontext verstehen
2. Lösungsstrategie entwickeln
3. Code implementieren mit Tests
4. Commit mit Issue-Referenz erstellen
5. PR mit "Fixes #[NUMBER]" erstellen
```

## Code-Analyse & Testing Befehle

### `/tdd`
**Zweck:** Test-Driven Development mit Red-Green-Refactor
```
Implementiere TDD Arbeitsablauf:
1. ROT: Schreibe Tests die fehlschlagen
2. GRÜN: Minimaler Code um Tests zu bestehen
3. REFAKTOR: Code verbessern ohne Tests zu brechen
4. Wiederhole für jede neue Funktionalität
Verwende Jest/Vitest für JS/TS, pytest für Python
```

### `/code_analysis`
**Zweck:** Tiefe Code-Inspektion mit Optimierungsvorschlägen
```
Führe umfassende Code-Analyse durch:
- Performance Hotspots identifizieren
- Code Smells und Anti-Patterns finden
- Sicherheitslücken aufdecken
- Accessibility Issues prüfen
- Bundle Size Optimierungen vorschlagen
- Knowledge Graph der Code-Abhängigkeiten erstellen
```

### `/test-coverage`
**Zweck:** Testabdeckung analysieren und verbessern
```
Analysiere aktuelle Testabdeckung und:
- Ungetestete kritische Pfade identifizieren
- Fehlende Edge Cases aufdecken
- Test-Qualität bewerten (Unit vs Integration)
- Konkrete Tests für unabgedeckte Bereiche vorschlagen
- Performance-Tests für kritische Funktionen empfehlen
```

## Context Management Befehle

### `/context-prime`
**Zweck:** Umfassendes Projektverständnis laden
```
Lade vollständiges Projektverständnis:
1. package.json und Abhängigkeiten analysieren
2. Projektstruktur und Architektur verstehen
3. README und Dokumentation lesen
4. CLAUDE.md Konfiguration laden
5. Aktueller Git-Branch und -Status prüfen
6. Entwicklungsumgebung-Setup verstehen
```

### `/load-llms-txt`
**Zweck:** Projektspezifische Terminologie und Konfigurationen
```
Importiere llms.txt Konfiguration:
- Domain-spezifische Terminologie
- Coding Standards und Konventionen
- Architektur-Entscheidungen
- Team-spezifische Arbeitsabläufe
- Compliance und Sicherheitsrichtlinien
```

### `/rsi` (Read, Setup, Initialize)
**Zweck:** Vollständige Session-Initialisierung
```
Komplette Entwicklungssession starten:
1. Alle Custom Commands laden
2. Projektkontext etablieren
3. Aktuelle TODOs und Issues prüfen
4. Development Server Status checken
5. Git-Status und ausstehende Changes reviewen
6. Entwicklungsplan für Session erstellen
```

## Web Development Spezifische Befehle

### `/api-design`
**Zweck:** REST API Design und Implementierung
```
Entwickle vollständige API:
1. OpenAPI Spezifikation erstellen
2. Request/Response Schemas definieren
3. Error Handling Strategien
4. Rate Limiting und Security implementieren
5. API Tests und Dokumentation
6. SDK/Client Code generieren
```

### `/component-architect`
**Zweck:** React/Vue Komponenten-Architektur
```
Design und implementiere Komponenten:
- Komponentenhierarchie planen
- Props Interface definieren
- State Management Strategie
- Performance Optimierungen (memo, useMemo, useCallback)
- Accessibility Features einbauen
- Storybook Stories erstellen
- Unit und Integration Tests
```

### `/db-schema`
**Zweck:** Datenbankschema Design und Migration
```
Entwickle Datenbankarchitektur:
1. Entity Relationship Diagram erstellen
2. Optimale Indizierung planen
3. Data Validation Rules
4. Migration Scripts schreiben
5. Seed Data erstellen
6. Performance Testing Queries
```

## DevOps & Deployment Befehle

### `/docker-optimize`
**Zweck:** Container-Optimierung für Production
```
Optimiere Docker Setup:
- Multi-stage Builds für minimale Image Size
- Security Best Practices implementieren
- Health Checks konfigurieren
- Environment-spezifische Konfigurationen
- Build Cache Optimierung
- Container Registry Deployment
```

### `/k8s-deploy`
**Zweck:** Kubernetes Deployment Manifeste
```
Erstelle vollständige K8s Deployment:
- Deployment, Service, Ingress Manifeste
- ConfigMaps und Secrets Management
- Resource Limits und Requests
- Health Checks und Readiness Probes
- Horizontal Pod Autoscaling
- Network Policies für Security
```

### `/ci-cd-pipeline`
**Zweck:** GitHub Actions CI/CD Pipeline
```
Implementiere vollständige CI/CD:
1. Multi-Environment Strategy (dev, staging, prod)
2. Automated Testing (unit, integration, e2e)
3. Security Scanning (dependencies, code)
4. Build Optimization und Caching
5. Blue-Green oder Canary Deployment
6. Rollback Strategien
```

## Debugging & Performance Befehle

### `/debug-session`
**Zweck:** Systematisches Debugging
```
Strukturiertes Debug-Protokoll:
1. Problem genau beschreiben und reproduzieren
2. Logs und Error Messages analysieren
3. Call Stack und Execution Flow tracken
4. Memory Leaks und Performance Issues finden
5. Fix implementieren mit Tests
6. Root Cause Analysis dokumentieren
```

### `/perf-audit`
**Zweck:** Performance Analyse und Optimierung
```
Umfassende Performance-Prüfung:
- Core Web Vitals Messung
- Bundle Analysis und Tree Shaking
- Database Query Optimierung
- Network Request Minimierung
- Caching Strategien implementieren
- Progressive Loading Techniken
```

## Human-Controlled Kanban Workflow Befehle

### Szenario 1: Bug Discovery & Analysis

#### `/analyze-bug`
**Zweck:** Bug-Beschreibung → Vollständiger Analyse-Plan → Kanban (Ready)
**Input:** Kurze Bug-Beschreibung
**Output:** Detaillierter GitHub Issue + Kanban Ready Spalte

```
Führe vollständige Bug-Analyse durch für: "[USER_INPUT]"

1. **Problem Analysis:**
   - Reproduzierbare Schritte ermitteln
   - Betroffene Browser/Geräte identifizieren
   - Error Messages und Logs analysieren
   - Screenshots/Videos für Dokumentation

2. **Root Cause Investigation:**
   - Relevanten Code-Bereich identifizieren
   - Mögliche Ursachen (CSS, JS, API, etc.)
   - Dependencies und Breaking Changes prüfen
   - Similar Issues in Projekthistorie

3. **Impact Assessment:**
   - User Experience Impact (Critical/High/Medium/Low)
   - Business Impact Bewertung
   - Affected User Groups
   - Workaround-Möglichkeiten

4. **Technical Implementation Plan:**
   - Code-Bereiche die geändert werden müssen
   - Testing Strategy (Unit/Integration/E2E)
   - Rollback Plan falls nötig
   - Estimated Development Time

5. **GitHub Issue Creation:**
   - Structured Bug Report mit Template
   - Alle Findings dokumentieren
   - Labels setzen (bug, priority, browser, etc.)
   - Automatisch in "Ready" Spalte zuweisen

**Human Review Required:** Ja - Du prüfst den Plan und schiebst manuell zu "To Do"
```

#### `/process-ready-todos`
**Zweck:** Alle Tasks in "To Do" Spalte verarbeiten (nach manueller Freigabe)
```
Verarbeite alle freigegebenen Tasks in "To Do" Spalte:

1. **Queue Loading:**
   - Alle Issues in "To Do" Spalte laden
   - Priorität-basierte Reihenfolge erstellen
   - Dependencies zwischen Issues prüfen

2. **Per Issue Processing:**
   - Issue Context vollständig laden
   - Technical Implementation ausführen
   - TDD Cycle (Red → Green → Refactor)
   - Tests für alle Edge Cases schreiben
   - Code Review Readiness sicherstellen

3. **Branch & PR Management:**
   - Feature Branch erstellen (fix/feature-name)
   - Commits mit Conventional Commit Standard
   - Pull Request mit Issue Reference
   - Automatisch zu "In Progress" verschieben

4. **Quality Assurance:**
   - Automated Tests ausführen
   - Code Quality Checks
   - Performance Impact Assessment
   - Security Vulnerability Scan

**Human Review Required:** Nein - Läuft autonom nach Freigabe
```

### Szenario 2: Feature Development & Planning

#### `/plan-feature`
**Zweck:** Feature-Idee → Vollständiger Development Plan → Kanban (Ready)
**Input:** Feature-Beschreibung  
**Output:** Detaillierter Technical Plan + GitHub Issue

```
Erstelle vollständigen Feature Development Plan für: "[USER_INPUT]"

1. **Requirements Engineering:**
   - User Stories und Acceptance Criteria
   - Business Value Assessment
   - User Experience Flow Design
   - API Requirements Definition

2. **Technical Architecture:**
   - Component Design (Frontend/Backend)
   - Database Schema Changes
   - API Endpoint Design
   - Third-party Integrations

3. **Implementation Breakdown:**
   - Development Tasks Auflistung
   - Dependencies und Blockers
   - Estimated Story Points
   - Development Phases (MVP → Full Feature)

4. **Testing Strategy:**
   - Unit Testing Approach
   - Integration Testing Plan
   - E2E Testing Scenarios
   - Performance Testing Requirements

5. **Risk Assessment:**
   - Technical Risks identifizieren
   - Breaking Changes Analyse
   - Migration Requirements
   - Rollback Strategy

6. **GitHub Issue Creation:**
   - Feature Epic mit Sub-Tasks
   - Technical Specification Document
   - Mockups/Wireframes (falls nötig)
   - Automatisch in "Ready" Spalte

**Human Review Required:** Ja - Du prüfst den kompletten Plan
```

### Granulare Task Befehle

#### `/implement-single-issue [issue-number]`
**Zweck:** Einzelnes spezifisches Issue aus "To Do" implementieren
```
Implementiere spezifisches Issue #[ISSUE_NUMBER]:

1. Issue Context Loading
2. Requirements Verification
3. Implementation mit TDD
4. Testing & Quality Checks
5. PR Creation
6. Kanban Movement (To Do → In Progress)

Fokussiert auf ein einzelnes Issue für maximale Kontrolle.
```

#### `/review-implementation-plan [issue-number]`
**Zweck:** Implementation Plan für Issue reviewen ohne Ausführung
```
Erstelle detaillierte Implementation Preview für Issue #[ISSUE_NUMBER]:

- Code Changes Preview
- Testing Strategy
- Estimated Development Time
- Potential Risks/Blockers
- Resource Requirements

Für finale Human Review vor Implementation.
```

---

## Befehl Usage Tips

1. **Verkettung:** Befehle können kombiniert werden: `/context-prime && /tdd`
2. **Parameter:** Verwende Parameter für Spezifika: `/api-design user-management`
3. **Iteration:** Nach Befehl-Ausführung immer Review und Iteration
4. **Dokumentation:** Erfolgreiche Befehl-Modifikationen hier dokumentieren

## Nächste Schritte

- [ ] Befehle in Claude Code als Custom Commands einrichten
- [ ] Team-spezifische Anpassungen vornehmen
- [ ] Neue Befehle basierend auf Arbeitsablauf-Bedürfnissen entwickeln
- [ ] Performance und Effektivität der Befehle regelmäßig reviewen
