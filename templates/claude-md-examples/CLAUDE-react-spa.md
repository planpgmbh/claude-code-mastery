# React TypeScript SPA - Claude Code Konfiguration

## 📊 Projekt Übersicht
- **Typ:** Single Page Application (SPA)
- **Frontend:** React 18+ mit TypeScript
- **State Management:** Zustand/Redux Toolkit
- **Styling:** Tailwind CSS / Styled Components
- **Testing:** Jest + React Testing Library + Cypress

## 🏗️ Architektur & Patterns

### Komponenten-Architektur
```
src/
├── components/          # Wiederverwendbare UI-Komponenten
├── pages/              # Route-spezifische Seiten
├── hooks/              # Custom React Hooks
├── services/           # API Services & External Integrations
├── utils/              # Helper Functions & Utilities
├── types/              # TypeScript Type Definitionen
└── stores/             # State Management
```

### Design Patterns
- **Container/Presenter Pattern** für Datenlogik-Trennung
- **Custom Hooks** für wiederverwendbare Logik
- **Compound Components** für komplexe UI-Patterns
- **Error Boundaries** für Fehlerbehandlung

## 🎯 Claude Code Integration

### Analysis Agent Fokus
- **Performance Optimization:** Bundle Size, Rendering Performance
- **Accessibility:** WCAG 2.1 AA Compliance
- **TypeScript Strict Mode:** Type Safety & Inference
- **React Best Practices:** Hooks, Context, Memoization

### Implementation Agent Regeln

#### Code Style & Standards
```typescript
// TypeScript Configuration
- Strict Mode aktiviert
- No implicit any
- Consistent return types
- Interface over type aliases für Objects

// React Patterns
- Functional Components mit Hooks
- Custom Hooks für Business Logic
- Memoization für Performance-kritische Komponenten
- Error Boundaries für robuste UX
```

#### Testing Strategy
```typescript
// Unit Tests (Jest + RTL)
- Alle Custom Hooks getestet
- Komponenten mit Business Logic
- Service Layer & API Integration

// Integration Tests (Cypress)
- User Flows & Critical Paths
- Form Validation & Submission
- Navigation & Routing
```

## 🚀 Development Workflow

### Local Development
```bash
npm install
npm run dev          # Development Server
npm run test         # Unit Tests
npm run test:e2e     # Cypress E2E Tests
npm run type-check   # TypeScript Validation
```

### Quality Gates
```bash
npm run lint         # ESLint + Prettier
npm run build        # Production Build Test
npm run analyze      # Bundle Analysis
```

## 🔧 Custom Commands für SPA Development

### Performance & Optimization
- `/analyze-bundle` - Bundle Size & Tree Shaking Analysis
- `/optimize-images` - Image Optimization & WebP Conversion
- `/audit-performance` - Lighthouse Score Optimization

### Component Development
- `/create-component [name]` - Generiere Component mit Tests
- `/refactor-to-hook [logic]` - Extract Logic zu Custom Hook
- `/add-error-boundary [component]` - Error Boundary Integration

### State Management
- `/optimize-state` - State Structure & Performance Review
- `/add-persistence` - LocalStorage/SessionStorage Integration
- `/debug-state-flow` - State Updates & Side Effects Analysis

## 📱 Mobile & Responsive Design

### Breakpoints & Design System
```typescript
// Tailwind Breakpoints
- sm: 640px   // Mobile
- md: 768px   // Tablet
- lg: 1024px  // Desktop
- xl: 1280px  // Large Desktop

// Component Responsive Patterns
- Mobile-First Design
- Touch-Friendly Interactions
- Viewport Meta Configuration
```

## 🔐 Security & Best Practices

### Frontend Security
- **XSS Prevention:** DOMPurify für HTML Sanitization
- **CSRF Protection:** Token-based Authentication
- **Content Security Policy:** Restrictive CSP Headers
- **Environment Variables:** Nie Secrets im Frontend

## 📊 Monitoring & Analytics

### Error Tracking
```typescript
// Sentry Integration
- Component Error Boundaries
- Unhandled Promise Rejections
- Performance Monitoring
- User Session Replay
```

### Performance Metrics
```typescript
// Web Vitals Tracking
- Core Web Vitals (CWV)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
```

## 🚀 Deployment & CI/CD

### Build Configuration
```typescript
// Production Optimizations
- Code Splitting by Route
- Dynamic Imports für Heavy Components
- Service Worker für Caching
- Progressive Web App (PWA) Features
```

### Environment Management
```bash
# Development
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development

# Production
REACT_APP_API_URL=https://api.production.com
REACT_APP_ENV=production
```

## 🛠️ Dependencies & Stack

### Core Dependencies
```json
{
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "react-router-dom": "^6.0.0",
  "zustand": "^4.0.0" // oder Redux Toolkit
}
```

### Development Dependencies
```json
{
  "@testing-library/react": "^13.0.0",
  "cypress": "^12.0.0",
  "eslint": "^8.0.0",
  "prettier": "^2.8.0",
  "tailwindcss": "^3.0.0"
}
```

---

**🎯 Optimiert für moderne React SPA Development mit maximaler TypeScript Integration und Performance**
