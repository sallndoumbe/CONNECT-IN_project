# 📊 Gestion de Projet - Connect'In

Guide pour utiliser les outils de gestion de projet : **Trello**, **Confluence**, **Notion** pour suivre le développement du projet Connect'In.

---

## 📋 Table des matières

1. [Overview des outils](#overview-des-outils)
2. [Configuration Trello](#configuration-trello)
3. [Documentation Confluence](#documentation-confluence)
4. [Organisation Notion](#organisation-notion)
5. [Flux de travail complet](#flux-de-travail-complet)
6. [Synchronisation inter-outils](#synchronisation-inter-outils)

---

## 🛠️ Overview des outils

### Répartition des rôles

| Outil | Usage | Responsable |
|---|---|---|
| **Trello** | 📌 Suivi des user stories & tâches | Product Manager + Dev Team |
| **Confluence** | 📚 Documentation technique & API | Tech Lead + Dev Team |
| **Notion** | 🎯 Planning à long terme & notes | Project Manager + Team |
| **GitHub** | 💻 Code & issues | Dev Team |

### Flux de données

```
Notion (Planning long terme)
  ↓
Trello (Sprint actuel)
  ↓
GitHub (Code & PRs)
  ↓
Confluence (Documentation mise à jour)
```

---

## 🎯 Configuration Trello

### Structure du board

Notre board Trello devrait avoir les listes suivantes :

```
┌─────────────────────────────────────────────────────┐
│ BACKLOG → TODO → IN PROGRESS → IN REVIEW → DONE   │
└─────────────────────────────────────────────────────┘
```

### Listes détaillées

#### 1. **BACKLOG** 🔵
Toutes les features/bugs qui seront faits plus tard.
- Pas de deadline immédiat
- Triés par priorité (haut = urgent)
- Contient les stories pas encore assignées

**Exemple de cartes** :
```
- Profile image upload
- User search functionality
- Post filtering by date
- Email notifications
```

#### 2. **TODO** 📌
Tâches assignées au sprint actuel, prêtes à d'être commencées.
- Au maximum 5 cartes par sprint
- Assignées à un développeur
- Avec des deadlines claires

**Exemple** :
```
- Implement login page UI
  - Assigné à: Sarah
  - Sprint: Week 2
  - Deadline: 2026-02-20
```

#### 3. **IN PROGRESS** 🔄
Tâches en cours de développement actuellement.
- Limite : 2 cartes max par développeur
- Description détaillée
- Lien vers la PR GitHub

**Exemple** :
```
- Backend: User authentication API
  - Assigné à: Ali
  - PR: #45
  - Deadline: 2026-02-18
```

#### 4. **IN REVIEW** ✅
Tâches terminées, en attente de validation/review.
- Avec lien vers la PR
- Assigné au reviewer
- Mention du deadline de review

**Exemple** :
```
- Frontend: Login page implementation
  - Auteur: Sarah
  - Reviewer: Ndoumbe
  - PR: #67
  - Deadline review: 2026-02-19
```

#### 5. **DONE** ✔️
Tâches complétées et validées.
- Archived à la fin du sprint
- Référence pour la vélocité
- Utilisées pour le rétrospective

**Exemple** :
```
- Database schema setup
  - Merged: 2026-02-10
  - Author: Dev Team
- API documentation
  - Merged: 2026-02-15
```

### Structure d'une carte Trello

Chaque carte doit contenir :

```
┌─────────────────────────────────────────────────┐
│ 📌 TITLE: Implémente user registration UI    │
├─────────────────────────────────────────────────┤
│ Description:                                     │
│ Create a registration form with:                │
│ - Email input                                   │
│ - Password input (with strength indicator)     │
│ - Confirm password                             │
│ - Submit button                                │
│ - Error messages                               │
│                                                 │
│ Acceptance Criteria:                           │
│ - Form validates email format                  │
│ - Passwords match before submit                │
│ - API call on submit                           │
│ - Handle 400/409 responses                     │
│ - Redirect to login on success                 │
│                                                 │
│ Labels:                                        │
│ [Frontend] [UI] [User-Auth] [Easy]            │
│                                                 │
│ Assignee: Sarah Smith                         │
│ Deadline: Feb 20, 2026                        │
│                                                 │
│ Attachments:                                   │
│ - Design mockup (Figma link)                  │
│ - API docs link                                │
│                                                 │
│ Checklist:                                     │
│ ☑ UI coded in TypeScript/React                │
│ ☑ Form validation working                     │
│ ☑ API integration complete                    │
│ ☑ Tests written                               │
│ ☑ Code reviewed                               │
│                                                 │
│ Comments:                                      │
│ @Ndoumbe - Ready for review!                 │
└─────────────────────────────────────────────────┘
```

### Labels (Étiquettes)

Utiliser des couleurs/labels standardisés :

| Label | Couleur | Usage |
|---|---|---|
| **Backend** | 🔵 Bleu | Tâches serveur Laravel |
| **Frontend** | 🟢 Vert | Tâches UI/UX React |
| **Database** | 🟠 Orange | Migrations, schema |
| **DevOps** | 🟣 Violet | Docker, deployment |
| **Documentation** | 🟡 Jaune | Docs, README, API docs |
| **Bug** | 🔴 Rouge | Corrections de bug |
| **Feature** | 🟦 Bleu clair | Nouvelle fonctionnalité |
| **Easy** | 👶 | Tâche simple (~2h) |
| **Medium** | 💪 | Tâche modérée (~5h) |
| **Hard** | 🔥 | Tâche complexe (~10h+) |
| **Blocked** | ⛔ | En attente de quelque chose |
| **Urgent** | ⚠️ | Deadline immédiate |

### Workflow Trello quotidien

**Matin - Daily Standup** (10 min)
```
Chaque développeur présente :
1. Carte actuelle (IN PROGRESS)
2. Blocages ou problèmes
3. Prochaine tâche (TODO)
```

**Au cours de la journée**
```
Lorsque vous commencez une tâche :
1. Assigner la carte à vous-même
2. La déplacer à IN PROGRESS
3. Ajouter un commentaire avec la PR GitHub

Lorsque you terminez :
1. Pousser et créer une PR
2. Déplacer la carte à IN REVIEW
3. Tagger le reviewer avec @username
```

**Fin de jour - Standup export**
```
Générer un résumé :
- Tâches complétées aujourd'hui ✅
- Tâches en cours
- Blocages
- Tâches pour demain
```

---

## 📚 Documentation Confluence

Confluence est l'endroit centraliser pour la **documentation technique**.

### Structure de l'espace Confluence

```
Connect'In Project
├── 📖 Getting Started
│   ├── Installation Setup
│   ├── Development Environment
│   └── Quick Start Guide
├── 🏗️ Architecture
│   ├── System Architecture Diagram
│   ├── Database Schema
│   ├── API Design
│   └── Technology Stack
├── 💻 Backend Development
│   ├── Laravel Setup
│   ├── Models & Relationships
│   ├── Controllers & Routes
│   ├── Authentication Flow
│   └── Error Handling
├── 🎨 Frontend Development
│   ├── React Setup
│   ├── Component Structure
│   ├── State Management
│   ├── Styling Guide
│   └── UI Components Library
├── 🔒 Security & Best Practices
│   ├── Authentication & Authorization
│   ├── Data Validation
│   ├── CORS Configuration
│   ├── Rate Limiting
│   └── Security Checklist
├── 🧪 Testing
│   ├── Unit Testing Guide
│   ├── Integration Testing
│   ├── End-to-End Testing
│   └── Test Coverage Requirements
├── 🚀 Deployment
│   ├── Docker Setup
│   ├── CI/CD Pipeline
│   ├── Production Checklist
│   └── Rollback Procedures
├── 📋 Processes
│   ├── Git Workflow
│   ├── Code Review Process
│   ├── PR Requirements
│   └── Release Process
└── 📔 Troubleshooting
    ├── Common Issues
    ├── FAQ
    ├── Debug Guide
    └── Performance Optimization
```

### Page Confluence - Exemple : API Documentation

```markdown
# API Documentation

**Current Version:** 1.0  
**Base URL:** http://localhost:8000/api/  
**Documentation Updated:** 17 Feb 2026

## Authentication
All endpoints (except /register, /login, /posts) require:
- Session cookie or Bearer token
- User must be authenticated

## Endpoints

### POST /auth/register
Creates a new user account...

### GET /posts
Returns paginated list of posts...

[Full details...]

## Error Codes
- 400: Bad Request
- 401: Unauthorized
...

## Examples
See attached Postman collection.

```

### Bonnes pratiques Confluence

✅ DO
- [ ] Garder la docs synchronisée avec le code
- [ ] Ajouter des diagrammes (architecture, flows)
- [ ] Inclure des exemples de code
- [ ] Linked to GitHub PRs when relevant
- [ ] Versionner (v1.0, v1.1, etc.)

❌ DON'T
- [ ] Ne pas laisser de docs obsolète
- [ ] Ne pas mettre de secrets ou API keys
- [ ] Ne pas dupliquer avec GitHub README
- [ ] Ne pas utiliser pour le planning (→ Trello)

---

## 🎯 Organisation Notion

Notion est utilisée pour la **planification à long terme et les notes personnelles**.

### Dashboard Notion principal

```markdown
# Connect'In - Master Dashboard

## 📊 Project Overview
- Status: In Development
- Launch date: March 2026
- Team size: 5 developers
- Current sprint: Week 2

## 📅 Timeline
- Week 1: Backend API (✅ Completed)
- Week 2: Frontend Implementation
- Week 3: Integration & Testing
- Week 4: Security & Performance
- Week 5+: Bonus Features

## 📈 Progress Metrics
- Backend API: 100% (18 endpoints)
- Frontend: 10% (started)
- Testing: 5% (minimal)
- Documentation: 70%

## 🎯 Sprint Board (Kanban)
[Link to Notion Kanban view]

## 📋 Backlog Features
[List of features with priorities]

## 🚨 Open Issues
- List of blockers
- Dependencies
- Risks

## 💡 Ideas & Notes
- Brainstorming
- Feature requests
- Design considerations

## 📚 Resources
- Links to Trello, Confluence, GitHub
- Team contact information
- Important dates
```

### Database Notion - Features Backlog

Créer une database avec les colonnes :

```
Properties:
- Title: Feature name
- Description: What & why
- Priority: High/Medium/Low
- Status: Backlog/Sprint/In Progress/Done  
- Story Points: 1-13 (Fibonacci)
- Sprint: Which sprint
- Assignee: Who's working on it
- Due Date: When it's due
- Tags: Category (Backend, Frontend, DB, etc.)
- Related PRs: GitHub links
- Notes: Additional context

View 1: Backlog (sorted by priority)
View 2: Sprint Board (kanban)
View 3: Timeline (calendar)
View 4: By Team (assignees)
```

### Database Notion - Meeting Notes

```
Properties:
- Title: Meeting type (Weekly Standup, Retro, Planning, etc.)
- Date: When it happened
- Attendees: Who was there
- Action Items: Tasks from meeting
- Decisions made: Key decisions
- Next steps: What's next
- Recording: Link to recording (if any)
```

### Pages Notion utiles

1. **Team Wiki**
   - Team members & roles
   - Contact information
   - Availability/time zones

2. **Development Wiki**
   - Common problems & solutions
   - Code snippets
   - Tips & tricks

3. **Company Info**
   - ESN background
   - Project goals
   - Success criteria

4. **Calendar**
   - Important dates
   - Sprints & releases
   - Team vacation/OOO

---

## 🔄 Flux de travail complet

### Exemple : Implementing User Profile Feature

#### 1️⃣ Planning (Notion)
```
Dans Notion:
- Create feature in backlog database
- Title: "User Profile Page"
- Description: "Allow users to view and edit their profile..."
- Priority: High
- Story Points: 8
- Add to upcoming sprint
- Break down acceptance criteria
```

#### 2️⃣ Sprint Planning (Trello + Notion)
```
During sprint planning meeting:
- Move "User Profile Page" to Notion current sprint
- Create 3 sub-tasks in Trello:
  a) Backend: Profile endpoint & update logic
  b) Frontend: Profile page UI
  c) Tests: Unit & integration tests
- Assign each to a dev
- Set deadline for sprint end
- Add to Trello TODO list
```

#### 3️⃣ Development (GitHub + Trello)
```
Developer Sarah works on "Frontend: Profile page UI":

1. Create branch: `git checkout -b feature/user-profile-frontend`
2. Move card to "IN PROGRESS" in Trello
3. Code feature
4. Push and create PR #89
5. Update card with PR link
6. Move card to "IN REVIEW"

Developer Ali works on "Backend: Profile endpoint":
(Same flow)
```

#### 4️⃣ Code Review (GitHub)
```
Reviewer checks PR:
- Run through code
- Run locally
- Add comments if needed
- Approve & merge
```

#### 5️⃣ Completion (Trello + Confluence)
```
After merge to dev:
- Move card to "DONE" in Trello
- Create PR to main (if done with feature)
- Update Notion sprint progress
- Add notes to Confluence if needed

Sprint completion:
- Notion: Mark feature as "Done"
- Trello: Archive completed cards
- Generate metrics for retrospective
```

---

## 🔗 Synchronisation inter-outils

### Daily Handoff

```
Morning (9:00 AM):
├─ Notion: Get sprint priorities
├─ Trello: Standup on IN PROGRESS & TODO
├─ GitHub: Check open PRs
└─ Confluence: Update docs if needed

During day:
├─ Actively update Trello (current work)
├─ GitHub: Create/update PRs
└─ Mark blockers in Trello

Evening (5:30 PM):
├─ Update Trello with progress
├─ Move done cards to DONE
├─ Note any blockers in Notion
└─ Sync team on Slack #standup channel
```

### Weekly Sync

**Monday - Sprint Planning** (1 hour)
```
1. Review Notion backlog
2. Select items for sprint (Notion → Trello)
3. Break down into Trello cards
4. Estimate story points
5. Assign to developers
6. Set sprint deadline
```

**Wednesday - Mid-Sprint Check-In** (30 min)
```
1. Review Trello board
2. Identify blockers
3. Adjust sprint if needed
4. Update Confluence if architecture changed
5. Check CI/CD health
```

**Friday - Sprint Review & Retro** (1 hour)
```
1. Demo completed features to stakeholders
2. Update Notion sprint status
3. Archive Trello completed cards
4. Calculate velocity
5. Plan next sprint
6. Discuss improvements (retro)
```

### Monthly Review

```
1. Trello: Export sprint metrics
2. Notion: Update 3-month plan
3. Confluence: Update docs changes summary
4. GitHub: Generate release notes
5. Team meeting: Plan next sprint cycle
```

---

## 📊 Métriques à tracker

### Velocity (Trello/Notion)
```
Sprint Velocity = Story Points completed per sprint

Week 1: 21 points
Week 2: 19 points
Week 3: 20 points

Average: ~20 points/sprint
Goal: Consistent 20-25 points
```

### Burn Down (Trello)
```
Sprint total: 21 points

Day 1: 18 points remaining
Day 2: 15 points remaining
Day 3: 10 points remaining
Day 4: 3 points remaining
Day 5: 0 points (completed)

Goal: Reach 0 by end of sprint
```

### Code Quality (GitHub + Trello)
```
Track per sprint:
- PR review time (avg hours)
- Merge conflict rate
- Test coverage (%)
- Bugs found post-release
```

### Team Metrics
```
- Attendance (standups)
- Velocity per person
- PR approval speed
- Documentation coverage
```

---

## 📱 Intégrations utiles

### Notifications & Automations

| Outil | Intégration | Bénéfice |
|---|---|---|
| **GitHub** | → Trello | Auto-archiver cards on merge |
| **Trello** | → Slack | Notifications sur changements |
| **Slack** | → GitHub | PR notifications dans #dev |
| **Notion** | → Google Calendar | Sync deadlines |
| **GitHub** | → Confluence | Link PRs to docs |

---

## 🎓 Checklist - Mise en place

- [ ] Créer board Trello avec 5 listes
- [ ] Configurer labels Trello
- [ ] Créer espace Confluence
- [ ] Créer Notion workspace
- [ ] Ajouter team members à tous les outils
- [ ] Importer initial backlog
- [ ] Setup intégrations (GitHub-Trello, etc.)
- [ ] Planifier first sprint
- [ ] Training de team sur process
- [ ] Setup slack notifications

---

**Version** : 1.0  
**Dernière mise à jour** : 17 février 2026  
**Mainteneur** : Project Management Lead
