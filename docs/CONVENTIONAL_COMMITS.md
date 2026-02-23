# 📝 Conventional Commits - Antisèche rapide

> **La référence** : https://www.conventionalcommits.org/

## 🎯 Format basique

```
<type>(<scope>): <subject>

<body>

<footer>
```

---

## 📌 Types de commits

### Aperçu rapide

| Commit | Type | Utilité |
|---|---|---|
| Nouvelle feature | `feat` | ✨ Nouvelle fonctionnalité |
| Correction bug | `fix` | 🐛 Correction de bug |
| Documentation | `docs` | 📚 Documentation uniquement |
| Style/Format | `style` | 🎨 Whitespace, semicolons, etc. |
| Refactoring | `refactor` | ♻️ Réécriture du code sans change le behavior |
| Performance | `perf` | ⚡ Amélioration de perf |
| Tests | `test` | ✅ Ajouter/modifier les tests |
| Maintenance | `chore` | 🔧 Dépendances, build config, etc. |
| CI/CD | `ci` | 🚀 GitHub Actions, deployment, etc. |
| Revert | `revert` | ↩️ Annuler un commit précédent |

---

## 📋 Scopes courants

```
auth          → Authentification & Autorisation
users         → Gestion des utilisateurs  
posts         → Gestion des posts
comments      → Gestion des commentaires
likes         → Système de likes
api           → Routes & API endpoints
controllers   → Logique des controllers
models        → Eloquent models
migrations    → Database migrations
db            → Schema & Database
docker        → Configuration Docker/Compose
frontend      → Interface utilisateur
docs          → Documentation générale
config        → Configuration du projet
deps          → Dépendances
```

---

## ✅ Exemples réels

### Features

```bash
git commit -m "feat(auth): add JWT authentication

- Implement JWT token generation on login
- Add token validation middleware
- Set token expiration to 24 hours"

git commit -m "feat(users): implement user profile page with avatar"

git commit -m "feat(posts): add image upload to posts with validation"

git commit -m "feat(comments): add real-time comment updates with WebSockets"
```

### Fixes

```bash
git commit -m "fix(posts): resolve cascade delete issue for comments

The likes table was not properly deleting when a post was deleted.
Added proper foreign key constraint with ON DELETE CASCADE."

git commit -m "fix(auth): fix password reset email not sending

Corrected SMTP configuration in .env template"

git commit -m "fix(api): return 404 instead of 500 for missing post"
```

### Docs

```bash
git commit -m "docs(api): add missing error codes to endpoint documentation"

git commit -m "docs: update README with Docker setup instructions"

git commit -m "docs(contributing): clarify git workflow and branch naming"
```

### Refactor

```bash
git commit -m "refactor(models): extract validation logic to Form Requests

Move validation from controllers to dedicated Form Request classes.
This improves code reusability and testability."

git commit -m "refactor(auth): simplify login logic in AuthController"

git commit -m "refactor(db): optimize user-to-posts relationship queries"
```

### Tests

```bash
git commit -m "test(auth): add unit tests for user registration

- Test valid registration
- Test duplicate email validation
- Test password hashing"

git commit -m "test(posts): add integration tests for post creation API"
```

### Perf

```bash
git commit -m "perf(db): add index to user.email column for faster lookups"

git commit -m "perf(api): implement query eager loading to reduce N+1 queries"

git commit -m "perf(frontend): optimize image sizes for faster loading"
```

### Chore

```bash
git commit -m "chore: update Laravel dependencies to latest stable versions"

git commit -m "chore(docker): update PHP version from 8.1 to 8.2"

git commit -m "chore: add .env.example to repository"
```

### CI/CD

```bash
git commit -m "ci: setup GitHub Actions for automated testing

- Run PHPUnit on every PR
- Run ESLint on frontend code
- Auto-deploy to staging on dev branch"
```

---

## ⚠️ Règles importantes

### ✅ DO's

| Règle | Exemple |
|---|---|
| **Utiliser l'impératif** | `feat: add user profile` (pas "added" ou "adds") |
| **Minuscules** | `feat(auth)` (pas `FEAT(AUTH)`) |
| **Pas de point final** | `feat: add login` (pas `feat: add login.`) |
| **Scope entre parenthèses** | `feat(auth): ...` (pas `feat - auth:`) |
| **Colon après le scope** | `feat(auth):` (pas `feat(auth)-`) |
| **Court et précis** | Max 50 chars pour le subject |

### ❌ DON'Ts

| ❌ Invalide | ✅ Valide | Problème |
|---|---|---|
| `git commit -m "Update code"` | `git commit -m "feat(db): add user.email index"` | Pas de type ni scope |
| `git commit -m "FEAT: BIG CHANGES"` | `git commit -m "feat: add user authentication"` | Casse incorrecte |
| `git commit -m "feat: fixed stuff"` | `git commit -m "feat: add authentication endpoint"` | Trop vague |
| `git commit -m "feat: add auth."` | `git commit -m "feat(auth): add login endpoint"` | Point final, pas de scope |
| `git commit -m "refactor(posts): Refactored post model"` | `git commit -m "refactor(posts): simplify post model validation"` | Répétitif |

---

## 📱 Commits clés du projet

Ses examples que vous verrez de le projet Connect'In :

```bash
# Jour 1 - Backend API
git commit -m "feat(api): create user authentication endpoints

- POST /register for new user signup
- POST /login for user authentication
- POST /logout to terminate session
- All endpoints include proper validation"

git commit -m "feat(models): add Eloquent relationships between posts and comments"

git commit -m "feat(posts): implement full CRUD operations

- GET /posts (paginated)
- GET /posts/{id}
- POST /posts (create)
- PUT /posts/{id} (update)
- DELETE /posts/{id} (delete)"

git commit -m "feat(db): create migrations for users, posts, comments, likes"

git commit -m "docs(api): add comprehensive API endpoint documentation"

git commit -m "docs: create CONTRIBUTING guide with git workflow"

git commit -m "fix(db): resolve cascade delete issue for post deletion"

# Jour 2+ - Frontend Development
git commit -m "feat(frontend): create login page with form validation"

git commit -m "feat(frontend): build post feed component with pagination"

git commit -m "test(api): add unit tests for authentication endpoints"

git commit -m "ci: setup GitHub Actions for automated testing"
```

---

## 🔗 Breaking Changes

Si un commit **casse la compatibilité** (breaking change), ajouter `!` après le scope :

```bash
git commit -m "feat(api)!: change POST /posts response format

BREAKING CHANGE: The POST /posts endpoint now returns 
the full post object instead of just the ID.

Old response: { id: 123 }
New response: { id: 123, user_id: 1, content: '...', ... }"
```

---

## 📊 Voir l'historique

```bash
# Affichage simple
git log --oneline

# Affichage détaillé
git log --format="%H %s"

# Par type de commit
git log --oneline | grep "^[a-f0-9]* feat"
git log --oneline | grep "^[a-f0-9]* fix"

# Voir les changement d'une branche
git log dev..feature/my-branch --oneline
```

---

## 🛠️ Outils automatiques

### Husky + Commitlint (à installer)

```bash
# Install
npm install -D husky commitlint

# Configure
npx husky install
echo "yarn commitlint --edit \$1" > .husky/commit-msg

# Composer va valider chaque commit
```

### VSCode Extensions

- **Conventional Commits** by vivaxy
- **Commit Message Editor** by Adam Oresten

---

## 🚀 Résumé rapide

```
┌─────────────────────────────────────────────────────┐
│  type(scope): message                               │
├─────────────────────────────────────────────────────┤
│  feat(auth): add JWT authentication                 │
│  fix(db): resolve cascade delete for posts          │
│  docs(readme): update installation steps            │
│  refactor(models): simplify user relationships      │
│  test(auth): add login endpoint unit tests          │
│  perf(api): add database indexes for queries        │
│  chore: update dependencies                         │
│  ci: setup GitHub Actions pipeline                  │
└─────────────────────────────────────────────────────┘
```

---

**Version** : 1.0  
**Dernière mise à jour** : 17 février 2026
