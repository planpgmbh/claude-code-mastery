# Node.js API Backend - Claude Code Konfiguration

## 📊 Projekt Übersicht
- **Typ:** RESTful API Backend Service
- **Runtime:** Node.js 18+ mit TypeScript
- **Framework:** Express.js / Fastify / NestJS
- **Database:** PostgreSQL / MongoDB mit Prisma/Mongoose
- **Authentication:** JWT + OAuth2.0

## 🏗️ Architektur & Patterns

### API Architektur
```
src/
├── controllers/        # Request/Response Handling
├── services/          # Business Logic Layer
├── repositories/      # Data Access Layer
├── models/            # Data Models & Schemas
├── middleware/        # Custom Middleware Functions
├── routes/            # API Route Definitions
├── utils/             # Helper Functions & Utilities
├── types/             # TypeScript Type Definitions
├── config/            # Configuration Management
└── tests/             # Test Suites
```

### Design Patterns
- **Repository Pattern** für Data Access Abstraction
- **Service Layer Pattern** für Business Logic Isolation
- **Middleware Chain** für Cross-Cutting Concerns
- **Dependency Injection** für Testability

## 🎯 Claude Code Integration

### Analysis Agent Fokus
- **API Performance:** Response Times, Database Queries
- **Security Vulnerabilities:** OWASP Top 10 Compliance
- **Database Optimization:** Query Performance, Index Strategy
- **Error Handling:** Graceful Failures & Logging

### Implementation Agent Regeln

#### Code Style & Standards
```typescript
// API Design Standards
- RESTful Conventions (GET, POST, PUT, DELETE)
- Consistent Error Response Format
- OpenAPI 3.0 Documentation
- API Versioning Strategy (/v1/, /v2/)

// TypeScript Configuration
- Strict Mode für Type Safety
- Input Validation mit Zod/Joi
- Response Types Definition
- Environment Type Safety
```

#### Security Implementation
```typescript
// Security Middleware Stack
- Helmet für Security Headers
- Rate Limiting (Express Rate Limit)
- CORS Configuration
- Input Sanitization & Validation
- SQL Injection Prevention
- JWT Token Validation
```

## 🗄️ Database & Data Management

### Database Strategy
```typescript
// PostgreSQL mit Prisma
- Schema-First Development
- Type-Safe Database Queries
- Migration Management
- Connection Pooling
- Query Performance Monitoring

// MongoDB mit Mongoose
- Document-Based Data Modeling
- Schema Validation
- Aggregation Pipelines
- Index Optimization
```

### Data Validation
```typescript
// Input Validation Pipeline
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().min(18)
});

// Middleware Integration
- Request Body Validation
- Query Parameter Validation
- File Upload Validation
```

## 🔧 Custom Commands für API Development

### Database Operations
- `/generate-migration [description]` - Erstelle Database Migration
- `/optimize-queries` - SQL Query Performance Analysis
- `/backup-database` - Database Backup & Restore
- `/seed-test-data` - Test Data Generation

### API Development
- `/create-endpoint [path]` - Generiere CRUD Endpoint
- `/add-middleware [name]` - Custom Middleware Template
- `/generate-openapi` - OpenAPI Schema Generation
- `/test-api-endpoints` - Automated API Testing

### Security & Monitoring
- `/security-audit` - Dependency & Code Security Scan
- `/performance-profile` - API Performance Profiling
- `/log-analysis` - Error Pattern & Performance Analysis

## 🔐 Authentication & Authorization

### JWT Implementation
```typescript
// Token Strategy
- Access Tokens (15 min TTL)
- Refresh Tokens (7 days TTL)
- Role-Based Access Control (RBAC)
- Token Blacklisting für Logout

// OAuth2.0 Integration
- Google OAuth Provider
- Microsoft OAuth Provider
- Custom OAuth Scopes
- PKCE für Client Security
```

### Role-Based Access Control
```typescript
// Permission System
enum Role {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}

// Middleware Example
const requireRole = (roles: Role[]) => {
  return (req, res, next) => {
    // Role validation logic
  }
}
```

## 📊 Monitoring & Observability

### Logging Strategy
```typescript
// Structured Logging mit Winston
- Request/Response Logging
- Error Stack Traces
- Performance Metrics
- Security Events

// Log Levels
- ERROR: System Errors & Exceptions
- WARN: Performance Issues & Deprecations
- INFO: Business Logic Events
- DEBUG: Development Information
```

### Health Checks & Metrics
```typescript
// Health Check Endpoints
GET /health              // Basic Health
GET /health/detailed     // Database & External Services
GET /metrics            // Prometheus Metrics

// Performance Monitoring
- Response Time Tracking
- Database Query Performance
- Memory Usage Monitoring
- CPU Usage Tracking
```

## 🚀 Development Workflow

### Local Development
```bash
npm install
npm run dev              # Development Server mit Hot Reload
npm run test             # Unit & Integration Tests
npm run test:watch       # Test Watch Mode
npm run lint             # ESLint + Prettier
npm run type-check       # TypeScript Validation
```

### Database Management
```bash
npm run db:migrate       # Run Database Migrations
npm run db:seed          # Seed Development Data
npm run db:reset         # Reset Database
npm run db:studio        # Database GUI (Prisma Studio)
```

## 🐳 Docker & Deployment

### Container Configuration
```dockerfile
# Multi-stage Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Environment Management
```bash
# Development
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/dev
JWT_SECRET=dev-secret
PORT=3000

# Production
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@prod-db:5432/prod
JWT_SECRET=secure-production-secret
PORT=80
```

## 🧪 Testing Strategy

### Test Pyramid
```typescript
// Unit Tests (70%)
- Service Layer Functions
- Utility Functions
- Data Validation Logic

// Integration Tests (20%)
- API Endpoint Testing
- Database Integration
- External Service Mocking

// E2E Tests (10%)
- Complete User Workflows
- Authentication Flows
- Error Scenarios
```

### Testing Tools
```json
{
  "jest": "^29.0.0",
  "supertest": "^6.0.0",
  "testcontainers": "^9.0.0",
  "@types/jest": "^29.0.0"
}
```

## 📈 Performance Optimization

### Caching Strategy
```typescript
// Redis Caching
- Session Storage
- API Response Caching
- Database Query Results
- Rate Limiting Counters

// Cache Patterns
- Cache-Aside Pattern
- Write-Through Caching
- Cache Invalidation Strategy
```

### Database Optimization
```typescript
// Query Optimization
- Proper Index Usage
- Query Execution Plan Analysis
- N+1 Query Prevention
- Connection Pool Tuning

// Performance Monitoring
- Slow Query Logging
- Database Connection Metrics
- Query Performance Insights
```

---

**🎯 Optimiert für skalierbare, sichere und performante API Development mit modernen Node.js Best Practices**
