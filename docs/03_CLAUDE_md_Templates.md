# CLAUDE.md Templates für verschiedene Projekttypen

## Template 1: React/TypeScript Web App

```markdown
# Projekt: [PROJECT_NAME]

## Projektübersicht
Moderne React Web-Anwendung gebaut mit TypeScript, fokussiert auf Performance und Benutzererfahrung.

## Entwicklungsumgebung
- **Package Manager:** npm/yarn/pnpm
- **Node Version:** 18+
- **Haupt-Befehle:**
  - `npm run dev` - Development Server
  - `npm run build` - Production Build
  - `npm run test` - Tests ausführen
  - `npm run lint` - Code Linting
  - `npm run type-check` - TypeScript Überprüfung

## Code Standards
- **Sprache:** TypeScript mit strict mode
- **Komponenten:** Funktionale Komponenten mit React Hooks
- **Styling:** Tailwind CSS / CSS Modules / styled-components
- **State Management:** Zustand / Redux Toolkit / React Context
- **Testing:** Vitest + React Testing Library
- **Formatierung:** Prettier + ESLint

## Architektur Richtlinien
- Komponenten-basierte Architektur mit klarer Trennung der Verantwortlichkeiten
- Custom Hooks für Business Logic
- API Layer Trennung mit React Query/SWR
- Responsive Design Mobile-First Ansatz
- Progressive Web App Features

## Dateistruktur Konventionen
```
src/
├── components/     # Wiederverwendbare UI Komponenten
├── pages/         # Route Komponenten
├── hooks/         # Custom React Hooks
├── services/      # API Aufrufe und externe Services
├── utils/         # Hilfsfunktionen
├── types/         # TypeScript Type Definitionen
└── __tests__/     # Test Dateien
```

## API Konventionen
- RESTful API Design mit konsistenter Benennung
- Error Handling mit passenden HTTP Status Codes
- Request/Response Validierung mit Zod
- API Dokumentation mit OpenAPI/Swagger

## Testing Strategie
- 80%+ Test Coverage erforderlich
- Unit Tests für Utility Functions und Hooks
- Integration Tests für User Arbeitsabläufe
- E2E Tests für kritische Pfade mit Playwright

## Performance Anforderungen
- Lighthouse Score 90+ für alle Metriken
- Bundle Size unter 500KB gzipped
- First Contentful Paint unter 2s
- Code Splitting für Route-basierte Chunks

## Sicherheits-Richtlinien
- Input Validierung auf allen User Inputs
- XSS Protection mit ordnungsgemäßem Escaping
- CSRF Protection für authentifizierte Routes
- Environment Variables für sensible Daten
```

## Template 2: Node.js/Express API Backend

```markdown
# Projekt: [API_NAME]

## Projektübersicht
RESTful API Backend gebaut mit Node.js und Express, folgt OpenAPI Spezifikation.

## Entwicklungsumgebung
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Datenbank:** PostgreSQL/MongoDB
- **ORM/ODM:** Prisma/Mongoose
- **Haupt-Befehle:**
  - `npm run dev` - Development mit Hot Reload
  - `npm run build` - TypeScript Kompilierung
  - `npm run start` - Production Server
  - `npm run test` - Test Suite ausführen
  - `npm run db:migrate` - Datenbank Migrationen

## Code Standards
- **Sprache:** TypeScript mit strict mode
- **API Style:** RESTful mit ordnungsgemäßen HTTP Methoden
- **Dokumentation:** OpenAPI 3.0 Spezifikation
- **Validierung:** Joi/Zod für Request Validierung
- **Testing:** Jest + Supertest
- **Code Qualität:** ESLint + Prettier

## API Design Prinzipien
- Konsistente Namenskonventionen (kebab-case für Endpoints)
- Ordnungsgemäße HTTP Status Codes und Error Messages
- Request/Response Schema Validierung
- Paginierung für List Endpoints
- Versionierungsstrategie (URL Pfad: /api/v1/)

## Datenbank Richtlinien
- Normalisiertes Schema Design
- Ordnungsgemäße Indizierung für Query Performance
- Migration Scripts für Schema Änderungen
- Seed Data für Development Environment
- Backup und Recovery Prozeduren

## Sicherheits-Implementierung
- JWT Authentifizierung mit Refresh Tokens
- Rate Limiting pro Endpoint
- Input Sanitization und Validierung
- SQL Injection Prävention
- CORS Konfiguration
- Security Headers mit helmet.js

## Error Handling
- Zentralisierte Error Handling Middleware
- Strukturierte Error Responses
- Logging mit angemessenen Levels
- Error Tracking mit Sentry/ähnlich

## Testing Strategie
- Unit Tests für Business Logic
- Integration Tests für API Endpoints
- Datenbank Testing mit Test Containern
- Load Testing für Performance Validierung
- 90%+ Code Coverage Anforderung

## Performance Optimierung
- Datenbank Query Optimierung
- Response Caching Strategien
- Compression Middleware
- Connection Pooling
- Monitoring und Alerting Setup
```

## Template 3: Full-Stack Next.js Application

```markdown
# Projekt: [NEXTJS_APP_NAME]

## Projektübersicht
Full-Stack Next.js Anwendung mit Server-Side Rendering und modernen Entwicklungspraktiken.

## Entwicklungsumgebung
- **Framework:** Next.js 14+ mit App Router
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **Datenbank:** PostgreSQL mit Prisma
- **Authentifizierung:** NextAuth.js
- **Haupt-Befehle:**
  - `npm run dev` - Development Server
  - `npm run build` - Production Build
  - `npm run start` - Production Server
  - `npm run db:studio` - Datenbank GUI

## Architektur-Entscheidungen
- App Router für dateibasiertes Routing
- Server Components standardmäßig, Client Components bei Bedarf
- API Routes für Backend-Funktionalität
- Incremental Static Regeneration für optimale Performance
- Edge Runtime für globale Verteilung

## Datenbank & ORM
- Prisma ORM mit PostgreSQL
- Type-safe Datenbankabfragen
- Migrations-basiertes Schema Management
- Connection Pooling für Production
- Datenbank Seeding für Development

## Authentifizierung & Autorisierung
- NextAuth.js für Authentifizierung
- Session-basierte Auth mit sicheren Cookies
- Rollenbasierte Zugriffskontrolle
- Geschützte Routes und API Endpoints
- Social Login Provider Integration

## UI/UX Richtlinien
- Mobile-First Responsive Design
- Barrierefreie Komponenten (WCAG 2.1 AA)
- Konsistentes Design System
- Loading States und Error Boundaries
- SEO Optimierung mit korrekten Meta Tags

## Performance Strategie
- Image Optimierung mit next/image
- Font Optimierung mit next/font
- Code Splitting und Lazy Loading
- CDN Integration für statische Assets
- Web Vitals Monitoring

## Testing & Quality Assurance
- Unit Tests mit Jest und Testing Library
- E2E Tests mit Playwright
- Component Testing mit Storybook
- Type Checking in CI/CD Pipeline
- Code Coverage Reporting

## Deployment & DevOps
- Vercel Deployment mit Preview Branches
- Environment-spezifische Konfigurationen
- Datenbank Migrationen in CI/CD
- Monitoring und Error Tracking
- Performance Analytics
```

## Template 4: Vue.js/Nuxt Application

```markdown
# Projekt: [VUE_APP_NAME]

## Projektübersicht
Moderne Vue.js Anwendung mit Nuxt.js Framework für verbesserte Entwicklererfahrung.

## Development Setup
- **Framework:** Nuxt 3 mit Vue 3 Composition API
- **Sprache:** TypeScript
- **Styling:** UnoCSS/Tailwind CSS
- **State Management:** Pinia
- **UI Framework:** Nuxt UI/Vuetify
- **Befehle:**
  - `npm run dev` - Development Server
  - `npm run build` - Production Build
  - `npm run generate` - Static Site Generation

## Code Konventionen
- Composition API mit `<script setup>`
- Auto-importierte Composables und Komponenten
- TypeScript strict mode
- Single File Components (SFC)
- Konsistente Benennung: PascalCase für Komponenten, camelCase für Composables

## Nuxt Features Utilized
- Dateibasiertes Routing mit automatischem Code Splitting
- Server-Side Rendering (SSR) standardmäßig
- Auto-Import für Vue, Nuxt und custom Composables
- Eingebaute SEO und Meta Management
- Image Optimierung und Lazy Loading

## State Management
- Pinia Stores für globalen State
- Composables für lokale State Logic
- Server State mit useFetch/useLazyFetch
- Persistent State für User Preferences
- Type-safe Store Definitionen

## Performance Optimierung
- Lazy Loading für Routes und Komponenten
- Image Optimierung mit Nuxt Image
- Critical CSS Inlining
- Bundle Analyse und Optimierung
- PWA Capabilities mit Nuxt PWA

## Testing Framework
- Vitest für Unit Testing
- Vue Test Utils für Component Testing
- Playwright für E2E Testing
- Storybook für Component Documentation
- Testing Coverage Anforderungen: 85%+
```

## Template 5: Microservices Architecture

```markdown
# Projekt: [MICROSERVICE_NAME]

## Service Übersicht
Individueller Microservice innerhalb größerer verteilter System-Architektur.

## Service Verantwortlichkeiten
- **Domain:** [Spezifische Business Domain]
- **Data Ownership:** [Welche Daten dieser Service besitzt]
- **APIs Provided:** [Externe APIs exposed]
- **Dependencies:** [Andere Services von denen abhängig]

## Technischer Stack
- **Runtime:** Node.js/Python/Go
- **Framework:** Express/FastAPI/Gin
- **Datenbank:** PostgreSQL/MongoDB/Redis
- **Message Queue:** RabbitMQ/Apache Kafka
- **Monitoring:** Prometheus + Grafana

## Kommunikations-Patterns
- Synchron: REST APIs mit OpenAPI Dokumentation
- Asynchron: Event-driven mit Message Queues
- Service Discovery via Consul/etcd
- Circuit Breaker Pattern für Resilience
- API Gateway für externe Kommunikation

## Daten Management
- Single Database per Service
- Event Sourcing für kritische Daten
- CQRS Pattern wo angebracht
- Data Consistency via Saga Pattern
- Backup und Disaster Recovery Prozeduren

## Observability & Monitoring
- Strukturiertes Logging mit Correlation IDs
- Distributed Tracing mit Jaeger/Zipkin
- Custom Metrics für Business KPIs
- Health Check Endpoints
- SLA/SLO Definitionen und Monitoring

## Deployment & Infrastructure
- Docker Containerisierung
- Kubernetes Orchestrierung
- Helm Charts für Deployment
- Infrastructure as Code mit Terraform
- CI/CD Pipeline mit automatisiertem Testing

## Sicherheits-Implementierung
- Service-to-Service Authentifizierung mit mTLS
- API Rate Limiting und Throttling
- Input Validierung und Sanitization
- Secrets Management mit Vault
- Network Policies und Firewalls
```

## Verwendung der Templates

1. **Template auswählen** basierend auf deinem Projekttyp
2. **Projektspezifische Details** anpassen (Namen, Technologien, etc.)
3. **Als CLAUDE.md** in deinem Projekt-Root speichern
4. **Regelmäßig aktualisieren** wenn sich Projektanforderungen ändern
5. **Team-spezifische Anpassungen** basierend auf Arbeitsablauf-Erfahrungen

## Template-Anpassung Checkliste

- [ ] Projektname und Beschreibung aktualisiert
- [ ] Technologie-Stack an aktuelle Tools angepasst
- [ ] Team-spezifische Konventionen eingefügt
- [ ] Performance-Anforderungen an Projekt angepasst
- [ ] Sicherheitsrichtlinien vervollständigt
- [ ] Testing-Strategie detailliert beschrieben
- [ ] Deployment-Prozess dokumentiert
