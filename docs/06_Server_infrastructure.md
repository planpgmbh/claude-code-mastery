# Server Infrastructure - Docker/Traefik Setup

## Server Overview

**Host System:** Linux (Debian/Ubuntu)  
**Container Engine:** Docker  
**Orchestration:** docker-compose  
**Reverse Proxy:** Traefik v3.4.0  
**Base Path:** `/etc/docker/`

## Infrastructure Architecture

### Network Topology
```
Internet → Traefik (80/443) → Docker Networks → Services
                ↓
        Let's Encrypt TLS + GoDaddy DNS
```

**Networks:**
- `proxy` (170.0.0.0/24) - Traefik-facing services
- `services` (170.10.0.0/24) - Internal service communication

### Core Services Stack

1. **Traefik** - Reverse proxy mit automatischen TLS-Zertifikaten
2. **Portainer** - Container Management UI (`portainer.webserver.plan-p.de`)
3. **Duplicati** - Backup System (`backup.webserver.plan-p.de`)

## Directory Structure Live Server

```
/etc/docker/
├── docker-compose.yml          # Core services (traefik, portainer, backup)
├── services/
│   └── traefik/
│       ├── traefik.yaml        # Main Traefik config
│       └── data/certs/         # TLS certificates
├── projects/                   # Individual web applications
│   └── [project-name]/
│       ├── docker-compose.yml  # Project-specific services
│       ├── dockerfile          # Multi-stage build
│       └── [source-files]      # Application code
└── volumes/                    # Persistent data
```

## Development Workflow Integration

### Claude Code Commands für Docker Integration

#### `/docker-project-init`
```bash
# Erstelle neue Web-App mit Docker/Traefik Integration
"Initialisiere neues Web-App Projekt für Traefik-Deployment:

1. Projektstruktur in /etc/docker/projects/[PROJECT_NAME]/
2. Multi-stage Dockerfile (Node.js build + Nginx serve)
3. docker-compose.yml mit Traefik Labels
4. Nginx Konfiguration für SPA
5. .env Template für lokale Entwicklung
6. .gitignore für Docker-spezifische Dateien

Berücksichtige Domain-Pattern: [project-name].plan-p.de"
```

#### `/traefik-labels`
```bash
# Generiere Traefik Labels für Service (interne oder externe Domain)
"Erstelle Traefik Labels für neuen Service:

Input: Service-Name, Port, Domain (plan-p.de oder externe Domain)

Für plan-p.de Subdomains:
- traefik.http.routers.[name].rule=Host(`[subdomain].plan-p.de`)

Für externe Domains:
- traefik.http.routers.[name].rule=Host(`[external-domain.com]`)
- traefik.http.routers.[name].rule=Host(`[subdomain].[external-domain.com]`)

Standard Labels:
- traefik.enable=true
- traefik.docker.network=proxy  
- traefik.http.services.[name].loadbalancer.server.port=[port]
- traefik.http.routers.[name].entrypoints=websecure
- traefik.http.routers.[name].tls=true
- traefik.http.routers.[name].tls.certresolver=letsencrypt"
```

#### `/domain-config`
```bash
# Konfiguriere Domain-Setup für Projekt
"Erstelle Domain-Konfiguration für neues Projekt:

Input: 
- Domain-Typ (plan-p.de subdomain oder externe Domain)
- Primary Domain
- Optional: Additional domains/subdomains
- API Endpoint Strategy

Output:
- Traefik Router Rules
- Environment Variable Template
- SSL/TLS Konfiguration
- DNS Setup Hinweise (falls externe Domain)
- nginx.conf angepasst an Domain-Struktur"
```
```bash
# Deployment Workflow für Production
"Führe Production Deployment durch:

1. Build Multi-stage Docker Image
2. Update docker-compose.yml
3. Deploy mit zero-downtime:
   - docker-compose pull
   - docker-compose up -d --remove-orphans
4. Health Check über Traefik
5. Backup alter Container (optional rollback)
6. Cleanup unused images"
```

#### `/nginx-spa-config`
```bash
# Nginx Konfiguration für React/Vue SPAs
"Erstelle optimierte Nginx Config für SPA:

- Gzip Compression aktiviert
- Cache Headers für statische Assets
- History API Fallback (try_files)
- Security Headers
- Performance Optimierungen
- Development vs Production Varianten"
```

## Project Templates

### Standard Web-App Template

### Traefik Labels für externe Domains

**Template für externe Domain:**
```yaml
labels:
  - traefik.enable=true
  - traefik.docker.network=proxy
  - traefik.http.services.[project]-frontend.loadbalancer.server.port=80
  - traefik.http.routers.[project]-frontend.rule=Host(`external-domain.com`)
  - traefik.http.routers.[project]-frontend.entrypoints=websecure
  - traefik.http.routers.[project]-frontend.tls=true
  - traefik.http.routers.[project]-frontend.tls.certresolver=letsencrypt
```

**Template für externe Subdomain:**
```yaml
labels:
  - traefik.enable=true
  - traefik.docker.network=proxy
  - traefik.http.services.[project].loadbalancer.server.port=80
  - traefik.http.routers.[project].rule=Host(`app.external-domain.com`)
  - traefik.http.routers.[project].entrypoints=websecure
  - traefik.http.routers.[project].tls=true
  - traefik.http.routers.[project].tls.certresolver=letsencrypt
```

**Multi-Domain Setup (eine App, mehrere Domains):**
```yaml
labels:
  - traefik.enable=true
  - traefik.docker.network=proxy
  - traefik.http.services.[project].loadbalancer.server.port=80
  - traefik.http.routers.[project].rule=Host(`my-app.plan-p.de`) || Host(`external-domain.com`)
  - traefik.http.routers.[project].entrypoints=websecure
  - traefik.http.routers.[project].tls=true
  - traefik.http.routers.[project].tls.certresolver=letsencrypt
```
```yaml
services:
  [project-name]:
    build:
      context: .
      dockerfile: dockerfile
    container_name: [project-name]
    restart: unless-stopped
    labels:
      - traefik.enable=true
      - traefik.docker.network=proxy
      - traefik.http.services.[project-name].loadbalancer.server.port=80
      - traefik.http.routers.[project-name].rule=Host(`[subdomain].plan-p.de`)
      - traefik.http.routers.[project-name].entrypoints=websecure
      - traefik.http.routers.[project-name].tls=true
      - traefik.http.routers.[project-name].tls.certresolver=letsencrypt
    networks:
      - proxy
    # Optional: Add volumes for persistent data
    # volumes:
    #   - app_data:/app/data

networks:
  proxy:
    external: true

# volumes:
#   app_data:
```

**Multi-stage Dockerfile:**
```dockerfile
# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build

# Production Stage  
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf für SPA:**
```nginx
server {
    listen 80;
    server_name localhost;
    
    # Gzip Compression
    gzip on;
    gzip_types
        text/plain
        text/css
        text/js
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    root /usr/share/nginx/html;
    index index.html;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA History API fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Domain Management

### Current Domains

**Eigene Domains (plan-p.de):**
- `portainer.webserver.plan-p.de` - Portainer Management UI
- `backup.webserver.plan-p.de` - Duplicati Backup System
- `dashboard.plan-p.de` - Dashboard Project

**Externe Domains:**
- `[externe-domain.com]` - Kundendomains oder andere externe Projekte
- `[andere-domain.de]` - Weitere externe Domains
- `[client-domain.org]` - Client-spezifische Domains

### Domain Patterns

**Eigene Projekte (plan-p.de):**
- **Main App:** `[project-name].plan-p.de`
- **API:** `api.[project-name].plan-p.de`
- **Admin:** `admin.[project-name].plan-p.de`
- **Staging:** `staging.[project-name].plan-p.de`

**Externe Domains:**
- **Main App:** `[external-domain.com]`
- **API:** `api.[external-domain.com]` oder `[external-domain.com]/api`
- **Subdomains:** `[subdomain].[external-domain.com]`
- **Staging:** `staging.[external-domain.com]` oder `dev.[external-domain.com]`

## Environment Management

### .env Template für Projekte
```bash
# Project Configuration
PROJECT_NAME=my-web-app

# Domain Configuration (choose one)
# Option 1: plan-p.de subdomain
DOMAIN=my-web-app.plan-p.de
API_DOMAIN=api.my-web-app.plan-p.de

# Option 2: External domain
# DOMAIN=external-domain.com
# API_DOMAIN=api.external-domain.com
# # OR: API_DOMAIN=external-domain.com (with /api path)

# Database (wenn verwendet)
POSTGRES_DB=my_app_db
POSTGRES_USER=my_app_user
POSTGRES_PASSWORD=secure_password_here
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@database:5432/${POSTGRES_DB}

# API Keys (für externe Services)
API_KEY_SERVICE1=your_api_key_here
JWT_SECRET=your_jwt_secret_here

# Development vs Production
NODE_ENV=production
DEBUG=false

# SSL Configuration (für externe Domains)
# TLS_CERT_PATH=/var/traefik/certs/external-domain.com.crt
# TLS_KEY_PATH=/var/traefik/certs/external-domain.com.key
```

## Security Considerations

### Traefik Security Features
- **Automatische HTTPS** via Let's Encrypt
- **TLS 1.2+ Enforcement** mit sicheren Cipher Suites
- **Basic Auth** für sensitive Services (Portainer, Backup)
- **Network Isolation** zwischen proxy und internal networks

### SSL/TLS Konfiguration

**Automatische Let's Encrypt (alle Domains):**
- Funktioniert für plan-p.de Subdomains (GoDaddy DNS Challenge)
- Funktioniert für externe Domains (HTTP Challenge oder DNS Challenge)
- Automatische Renewal alle 60 Tage

**Manuelle Zertifikate (falls erforderlich):**
```yaml
# docker-compose.yml
volumes:
  - /path/to/external-cert.pem:/var/traefik/certs/external-domain.com.crt:ro
  - /path/to/external-key.pem:/var/traefik/certs/external-domain.com.key:ro

# Traefik Labels
labels:
  - traefik.http.routers.[name].tls.domains[0].main=external-domain.com
  - traefik.http.routers.[name].tls.domains[0].sans=*.external-domain.com
```

**DNS Konfiguration für externe Domains:**
```
# A Record für Root Domain
external-domain.com.     IN  A     [SERVER_IP]

# CNAME für Subdomains  
api.external-domain.com. IN  CNAME external-domain.com.
www.external-domain.com. IN  CNAME external-domain.com.
```
```dockerfile
# Use non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Minimize attack surface
FROM node:18-alpine  # Alpine für kleinere Image Size
RUN apk add --no-cache dumb-init  # Proper signal handling
ENTRYPOINT ["dumb-init", "--"]
```

## Monitoring & Logging

### Service Health Checks
```yaml
# In docker-compose.yml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### Logging Configuration
```yaml
# Centralized logging
logging:
  driver: "json-file"
  options:
    max-size: "100m"
    max-file: "3"
```

## Backup Strategy

### Automated Backups via Duplicati
- **Source:** `/etc/docker` (entire Docker setup)
- **Schedule:** Daily incremental, weekly full backup
- **Retention:** 30 days incremental, 12 weeks full
- **Encryption:** AES-256 mit Environment Key

### Manual Backup Commands
```bash
# Backup entire Docker setup
sudo tar -czf docker-backup-$(date +%Y%m%d).tar.gz /etc/docker

# Backup specific project
sudo tar -czf project-backup-$(date +%Y%m%d).tar.gz /etc/docker/projects/[project-name]

# Database Backup (wenn verwendet)
docker exec [project]-db pg_dump -U $POSTGRES_USER $POSTGRES_DB > backup.sql
```

## Deployment Workflows

### Development Workflow
```bash
# 1. Local Development
npm run dev  # Frontend development server

# 2. Docker Build Testing
docker build -t [project]:test .
docker run -p 3000:80 [project]:test

# 3. Production Deployment
cd /etc/docker/projects/[project]
docker-compose up -d --build
```

### CI/CD Integration mit GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.KEY }}
          script: |
            cd /etc/docker/projects/[project]
            git pull origin main
            docker-compose up -d --build
```

## Troubleshooting

### Häufige Docker/Traefik Issues

**Service nicht erreichbar:**
```bash
# Traefik Status prüfen
docker logs traefik
curl -H "Host: [your-domain].plan-p.de" http://localhost

# Network Connectivity
docker network ls
docker network inspect proxy
```

**SSL Zertifikat Probleme:**
```bash
# Let's Encrypt Logs
docker logs traefik | grep -i acme
ls -la /etc/docker/services/traefik/data/certs/

# DNS Challenge Status  
dig TXT _acme-challenge.[domain].plan-p.de
```

**Container Build Failures:**
```bash
# Build mit verbose output
docker build --no-cache --progress=plain .

# Layer-by-layer analysis
docker history [image-name]
```

## Performance Optimization

### Docker Image Optimization
```dockerfile
# Multi-stage builds für kleinere Images
# .dockerignore für unwichtige Dateien
# Alpine Linux für Base Images
# npm ci statt npm install
# Layer Caching optimization
```

### Nginx Performance Tuning
```nginx
# Worker processes optimization
worker_processes auto;
worker_connections 1024;

# Buffer sizes
client_body_buffer_size 128k;
client_max_body_size 10M;

# Keepalive connections
keepalive_timeout 65;
keepalive_requests 100;
```

---

## Integration mit Claude Code Workflows

### Erweiterte CLAUDE.md für Docker-Projekte
```markdown
## Container Architecture
- **Base Image:** node:18-alpine
- **Build Tool:** Multi-stage Docker build
- **Web Server:** Nginx für Production
- **Reverse Proxy:** Traefik mit automatischen TLS
- **Domain Pattern:** [project].plan-p.de

## Deployment Commands
- `docker-compose up -d --build` - Production deployment
- `docker-compose logs -f [service]` - Live logs
- `docker exec -it [container] sh` - Container debugging

## Environment Variables
[Liste der erforderlichen ENV vars]

## Health Checks
- **Frontend:** `http://localhost/health`
- **Backend:** `http://localhost:3000/api/health`
```

### Projekt-spezifische Custom Commands
```bash
# /deploy-to-server
"Führe Production Deployment auf Traefik-Server durch:
1. Build optimiertes Docker Image
2. Update docker-compose.yml mit Traefik Labels
3. Deploy mit Zero-Downtime Strategy
4. Health Check über configured domain
5. Cleanup old containers und images"

# /check-container-health
"Überprüfe Container Health Status:
- Service Logs analysieren
- Network Connectivity testen  
- SSL Certificate Status
- Resource Usage (CPU/Memory)
- Traefik Routing Verification"
```

---

*Dieses Dokument sollte mit neuen Projekten und Infrastructure-Änderungen aktualisiert werden.*