# 📖 Professional Development Standards - Connect'In

Guide complet des normes professionnelles, bonnes pratiques et workflows pour le projet Connect'In.

---

## 🎯 Quick Reference

### Mes documents à lire

| Document | Lire quand | Durée |
|---|---|---|
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | Avant de coder | 15 min |
| **[Conventional Commits](docs/CONVENTIONAL_COMMITS.md)** | Avant de committer | 5 min |
| **[PR & Code Review](docs/PR_CODE_REVIEW.md)** | Avant de faire une PR | 10 min |
| **[Project Management](docs/PROJECT_MANAGEMENT.md)** | Au planning | 20 min |
| **[Husky Setup](docs/HUSKY_SETUP.md)** | Setup initial | 10 min |

**Total** : 60 minutes pour onboarding complet

---

## 🚀 Quick Start (5 minutes)

### Pour contribuer

```bash
# 1. Créer une branche feature
git checkout -b feature/your-feature-name origin/dev

# 2. Faire des commits Conventional
git commit -m "feat(auth): add login endpoint"
git commit -m "fix(db): resolve cascade delete"

# 3. Pousser et créer une PR
git push origin feature/your-feature-name

# 4. Attendre la code review & merge
# (Via GitHub/GitLab PR interface)
```

### Format: `<type>(<scope>): <subject>`

```bash
✅ Valid
feat(auth): add user registration
fix(posts): resolve delete cascade
docs(api): update endpoint docs
test(users): add unit tests
chore: update dependencies

❌ Invalid
Update code
FEAT: BIG CHANGES
fixed stuff
```

---

## 📊 Normes de code

### 1. Commits - Conventional Commits

**Types** : `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `revert`

**Scopes** : `auth`, `users`, `posts`, `comments`, `likes`, `api`, `db`, `docker`, `frontend`, `docs`

```bash
# Exemple
git commit -m "feat(auth): implement JWT authentication

- Add token generation on login
- Add token validation middleware
- Set expiration to 24 hours"
```

### 2. Branches - GitFlow

```
main (production)
  ↓ hotfix branche si urgent
dev (development)  
  ↓ feature branches
feature/description
feature/description
bugfix/description
```

**Branch naming** :
- `feature/user-profile-edit`
- `bugfix/post-deletion-cascade`
- `chore/update-dependencies`
- **Minuscules, tirets, descriptif**

### 3. Pull Requests

**Processus** :
1. Créer feature branche
2. Faire commits Conventional
3. Push et créer PR
4. Attendre review (minimum 1 approbation)
5. Fixes si demandé
6. Merger via GitHub

**Règles** :
- ✅ Une branche = une feature
- ✅ Description claire dans la PR
- ✅ Tests inclus
- ✅ Min 1 review approbation
- ❌ Pas de self-review
- ❌ Pas de merge sans review

### 4. Code Review

**Reviewer checks** :
- Qualité du code (lisibilité, DRY)
- Logique métier correcte
- Performance (pas de N+1 queries)
- Sécurité (validation, SQL injection)
- Tests présents & adéquates
- Documentation mise à jour

**Types de retours** :
- 💬 Question (optionnel)
- 💡 Suggestion (optionnel)
- 🔴 Blocage (DOIT être fixé)
- ✅ Approval

### 5. Authorization - Qui peut faire quoi?

| Action | Requirement | Approver |
|---|---|---|
| Créer PR | Aucun | Auto |
| Push vers feature | Own la branche | Auto |
| Merge vers dev | 1 approbation | Team lead |
| Merge vers main | 2 approbations | Tech lead |
| Release | Project manager | PM |

---

## 🛠️ Setup technologies

### Backend Stack
```
Laravel 11
├─ PHP 8.2+
├─ MySQL 8.0
├─ Eloquent ORM
└─ Session Auth
```

### Frontend Stack
```
React + TypeScript
├─ Vite (build tool)
├─ Tailwind CSS
├─ Axios/Fetch
└─ Zustand (state)
```

### DevOps
```
Docker & Docker Compose
├─ MySQL service
├─ Laravel backend (port 8000)
└─ React frontend (port 5173)
```

### Configuration Files
- `.env` - Environment variables
- `.env.example` - Template
- `.gitignore` - Files to exclude
- `.commitlintrc.yaml` - Commit validation
- `docker-compose.yml` - Container config

---

## 📋 Project Management Tools

### 🔴 Trello - Sprint Execution
- **Board** : 5 listes (BACKLOG → TODO → IN PROGRESS → IN REVIEW → DONE)
- **Cards** : Détaillées avec checklists, assignées, datées
- **Labels** : Backend, Frontend, Bug, Feature, Easy/Medium/Hard, Urgent
- **Updates** : Daily standup, move cards as progress

### 📚 Confluence - Technical Documentation
```
├─ Getting Started
├─ Architecture
├─ Backend Development
├─ Frontend Development
├─ Security & Best Practices
├─ Testing
├─ Deployment
├─ Processes
└─ Troubleshooting
```

### 🎯 Notion - Long-term Planning
- **Dashboard** : Overview, timeline, metrics
- **Backlog** : Features database with priorities
- **Meeting notes** : Standups, retros, planning
- **Team Wiki** : People, contacts, availability

### 💻 GitHub/GitLab - Code & Issues
- **Repository** : Source code, collaborators
- **Issues** : Bug tracking, feature requests
- **Pull Requests** : Code review portal
- **Actions** : CI/CD automation

### 🔗 Integrations
```
GitHub PR → Auto Archive Trello Card
Slack ← GitHub PR Notifications
Trello → Slack Card Updates
Notion ← GitHub Merge Events
```

---

## 🔄 Daily Workflow

### 09:00 - Morning Standup
```
Review:
1. Notion sprint priorities
2. Trello IN PROGRESS cards
3. GitHub open PRs & CI/CD status

Team discusses:
- What I did yesterday
- What I'm doing today
- Blockers or help needed
```

### 09:30 - Start Coding
```
1. Pick a card from Trello TODO
2. Create branch: feature/description
3. Move card to IN PROGRESS
4. Add PR link when created
```

### 17:00 - End of Day Update
```
1. Update Trello (move done cards)
2. Push all commits
3. Note blockers in Notion
4. Slack summary to #standup
```

### 17:30 - Team Standup (if Daily)
```
Quick 5-min round-robin to sync team
```

---

## 📊 Metrics & KPIs

### Sprint Velocity
```
Ideal: 20-25 story points per sprint
Calculated: Sum of completed story points

Track: Weekly, adjust plans if trending low
```

### Code Quality
```
PR Review Time: < 12 hours average
Test Coverage: > 70%
Bug Detection Rate: Bugs found in review, not production
```

### Team Health
```
Velocity Consistency: ±2 weeks average
Standup Attendance: 100%
PR Approval Rate: All PRs reviewed before merge
```

---

## ✅ Before You Start

### Setup (First time)

```bash
# 1. Clone repository
git clone https://github.com/ESN/connect-in.git

# 2. Install backend dependencies
cd backend
composer install

# 3. Install frontend dependencies
cd ../frontend
npm install

# 4. Setup Husky pre-commit hooks
npm install husky --save-dev
npx husky install

# 5. Test the hooks
git commit -m "test: invalid commit"  # Should fail
git commit -m "test: valid commit"     # Should fail (too short)
git commit -m "test(misc): validate setup"  # Should pass

# 6. Setup environment
cp .env.example .env
# Edit .env with your local values

# 7. Run migrations
cd ../backend
php artisan migrate

# 8. Start development
php artisan serve  # Backend on port 8000
# And in another terminal:
cd ../frontend
npm run dev         # Frontend on port 5173
```

### Development Checklist

Before making a commit:
- [ ] Code follows project style
- [ ] No console.log() or var_dump()
- [ ] Tests written or updated
- [ ] No syntax errors
- [ ] Commit message followsConventional Commits
- [ ] Branch up to date with `dev`

---

## 🎓 Learning Resources

### Internal Documentation
- CONTRIBUTING.md - Contribution guide
- docs/CONVENTIONAL_COMMITS.md - Commit standards
- docs/PR_CODE_REVIEW.md - PR process
- docs/PROJECT_MANAGEMENT.md - Tool usage
- docs/HUSKY_SETUP.md - Pre-commit hooks
- README.md - Project overview

### External Resources
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub PR Guide](https://docs.github.com/en/pull-requests)
- [Husky Docs](https://typicode.github.io/husky/)
- [Laravel Docs](https://laravel.com/docs)
- [React Docs](https://react.dev)

---

## 🆘 Getting Help

| Issue | Contact | Response time |
|---|---|---|
| **Git/GitHub question** | @tech-lead-github | 24h |
| **Code review feedback** | Your reviewer | 12h |
| **Blocking issue** | @project-manager | Immediate |
| **Documentation unclear** | #dev-questions | 4h |
| **Deployment problem** | @devops-engineer | Immediate |

---

## 📝 Changelog

### Version 1.0 (Feb 17, 2026)
✅ Initial setup
- Conventional Commits guide
- Contributing guidelines
- PR & Code Review process
- Project management tools guide
- Husky pre-commit hook setup
- .gitignore configuration

---

## 🎯 Success Criteria

Our team will know we're successful when:

- ✅ All commits follow Conventional Commits
- ✅ All PRs have minimum 1 review approval before merge
- ✅ Average PR review time < 12 hours
- ✅ > 70% test coverage on new code
- ✅ No bugs found in production that weren't caught in review
- ✅ All features tracked in Trello + Notion
- ✅ Documentation kept current (< 1 week stale)
- ✅ Team velocity stable (±2 sprint weeks)

---

**Version** : 1.0  
**Maintainer** : Tech Lead / Project Manager  
**Last Updated** : 17 février 2026

Questions? Ask in #dev or reach out to the tech lead 💬
