# 🤝 Guide de Contribution - Connect'In

Bienvenue dans le projet Connect'In ! Ce document explique comment contribuer au projet en respectant nos normes de qualité et notre workflow de développement.

## 📋 Table des matières

1. [Workflow de développement](#workflow-de-développement)
2. [Conventional Commits](#conventional-commits)
3. [Gestion des branches](#gestion-des-branches)
4. [Pull Requests (PR)](#pull-requests)
5. [Code Review](#code-review)
6. [Règles de fusion](#règles-de-fusion)
7. [Checklist avant de soumettre](#checklist-avant-de-soumettre)

---

## 🔄 Workflow de développement

Notre workflow suit une approche **GitFlow modifiée** avec les branches principales suivantes :

```
main (production)
  ↑
dev (development)
  ↑
feature/* (feature branches)
```

### Cas d'usage des branches :

| Type de branche | Nommage | Création depuis | Merge vers | Exemple |
|---|---|---|---|---|
| Feature | `feature/description` | `dev` | `dev` via PR | `feature/user-authentication` |
| Bug fix | `bugfix/description` | `dev` | `dev` via PR | `bugfix/post-deletion-cascade` |
| Release | `release/x.y.z` | `dev` | `main` + `dev` | `release/1.0.0` |
| Hotfix | `hotfix/description` | `main` | `main` + `dev` | `hotfix/security-patch` |

---

## 📝 Conventional Commits

Tous les commits doivent suivre la norme **Conventional Commits** pour garantir une historique cohérente et faciliter la génération automatique des changelogs.

### Syntaxe

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types de commits autorisés

| Type | Description | Exemple |
|---|---|---|
| **feat** | Nouvelle fonctionnalité | `feat(auth): add JWT authentication` |
| **fix** | Correction de bug | `fix(posts): resolve cascade delete issue` |
| **docs** | Documentation (README, guides, etc.) | `docs(api): update endpoint documentation` |
| **style** | Changements de formatage (whitespace, etc.) | `style: format code with prettier` |
| **refactor** | Refactorisation de code existant | `refactor(models): simplify user relationships` |
| **perf** | Amélioration de performances | `perf(db): add indexes to frequently queried columns` |
| **test** | Ajout ou modification de tests | `test(auth): add controller unit tests` |
| **chore** | Maintenance (dépendances, config, etc.) | `chore: update Laravel to 11.5` |
| **ci** | Configuration CI/CD | `ci: setup GitHub Actions for testing` |
| **revert** | Annulation d'un commit précédent | `revert: undo feature that caused regression` |

### Scopes communes

```
- auth        (Authentification & Autorisation)
- users       (Gestion des utilisateurs)
- posts       (Gestion des posts)
- comments    (Gestion des comentaires)
- likes       (Système de likes)
- api         (Routes & Controllers)
- db          (Migrations & Schema)
- frontend    (Interface utilisateur)
- docker      (Configuration Docker)
- docs        (Documentation)
```

### Exemples de commits valides

```bash
git commit -m "feat(auth): implement user registration endpoint

- Add form validation for email and password
- Hash password with BCRYPT_ROUNDS=12
- Return 201 with user data on success"

git commit -m "fix(posts): fix cascade delete for comments on post deletion"

git commit -m "docs(api): update endpoint documentation with error codes"

git commit -m "refactor(models): extract validation logic to Form Requests"

git commit -m "test(users): add unit tests for password change endpoint"
```

### ❌ Commits invalides

```bash
git commit -m "Update code"                    # ❌ Pas de type
git commit -m "feat: fixed stuff"              # ❌ Trop vague
git commit -m "FEAT(AUTH): BIG CHANGES"        # ❌ Casse incorrecte
```

---

## 🌿 Gestion des branches

### Créer une nouvelle branche

```bash
# Récupérer les derniers changements
git fetch origin
git pull origin dev

# Créer la branche feature
git checkout -b feature/feature-name origin/dev

# Ou en une ligne
git checkout -b feature/feature-name origin/dev
```

### Nommage des branches

- **Minuscules** : `feature/user-profile-edit`
- **Tirets** pour séparer les mots : `feature/user-profile-edit`
- **Pas d'espaces** ni de caractères spéciaux
- **Descriptif** : `feature/add-notification-system`

### Exemples de noms valides

```
feature/user-authentication
feature/post-creation-modal
feature/comment-system
feature/like-counter
bugfix/delete-account-cascade
bugfix/password-reset-email
chore/update-dependencies
```

### Mettre à jour la branche avec les changements de `dev`

```bash
git fetch origin
git rebase origin/dev
# ou
git merge origin/dev
```

---

## 📤 Pull Requests

### Créer une PR

1. **Pousser votre branche**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Créer la PR sur GitHub/GitLab**
   - Base : `dev` (principal) ou `main` (hotfix)
   - Compare : votre `feature/*` branche

3. **Remplir le template de PR** (voir ci-dessous)

### Template de PR

```markdown
## 📌 Description
Brève description de la fonctionnalité ou du changement.

## 🎯 Type de changement
- [ ] Nouvelle fonctionnalité
- [ ] Correction de bug
- [ ] Documentation
- [ ] Refactorisation

## 🔗 Tickets liés
Ferme #123 (Jira, GitHub Issues, etc.)

## 📋 Checklist
- [ ] Code suivi les conventions du projet
- [ ] Tests unitaires ajoutés/mis à jour
- [ ] Documentation mise à jour
- [ ] Pas de console.log() ou code de debug
- [ ] CHANGELOG mis à jour (si applicable)

## 🧪 Instructions de test
Étapes pour tester la fonctionnalité :
1. Checkout la branche
2. Exécuter `npm install` ou `composer install`
3. Lancer l'app
4. Tester [scénario 1]
5. Tester [scénario 2]

## 📸 Screenshots (si applicable)
Ajouter des captures d'écran pour les changements UI.
```

### Règles pour les PR

- ✅ **Une branche = une fonctionnalité** : Pas de mélange de features
- ✅ **Commits atomiques** : Chaque commit doit être logique et functional
- ✅ **Description claire** : Expliquer le "pourquoi", pas juste le "quoi"
- ✅ **Tests inclus** : Ajouter des tests pour les nouvelles fonctionnalités
- ✅ **Zéro conflits** : Résoudre les conflits avant de demander la review
- ❌ **Pas de merge `main` → `feature`** : Utiliser `rebase` ou merge `dev` → `feature`

---

## 👀 Code Review

### Qui review ?

- **Team Lead** ou un senior dev
- **Au minimum 1 approbation** requise avant merge
- Les auteurs de code ne peuvent pas approuver leur propre PR

### Critères de code review

Les reviewers checkeront :

1. **Qualité du code**
   - Lisibilité et nommage
   - Pas de code dupliqué
   - Respect des patterns du projet

2. **Logique métier**
   - Implémentation correcte
   - Gestion des cas limites
   - Validations appropriées

3. **Performance**
   - Pas de N+1 queries
   - Pas de boucles inefficaces
   - Indexes sur les bonnes colonnes (DB)

4. **Sécurité**
   - Pas de SQL injection
   - Validation des inputs
   - Autorisation appropriée

5. **Tests**
   - Tests unitaires présents
   - Couverture suffisante
   - Tests actualisés si besoin

6. **Documentation**
   - Code commenté pour la logique complexe
   - README/docs mis à jour
   - Changelog complété

### Feedback pendant la review

**Commentaires de reviewers** :
- 💬 **Question** : Précision sur la logique ou le choix
- 💡 **Suggestion** : Améliorations recommandées
- 🔴 **Problème** : Blocage, doit être résolu

**Réponses du contributeur** :
- Commiter les changements demandés
- Ajouter un commentaire expliquant les modifications
- _Repo_ush vers la même branche (la PR se met à jour auto)
- Demander une re-review

---

## ✅ Règles de fusion

### Conditions avant le merge

- ✅ Tous les tests passent (CI/CD vert)
- ✅ Au minimum 1 approbation (code review)
- ✅ Pas de changements demandés en attente
- ✅ Branche à jour avec `dev` (pas de conflits)
- ✅ Tous les commits suivent Conventional Commits

### Comment merger

```bash
# Option 1 : Merge simple (préféré)
# Via l'interface GitHub : bouton "Merge pull request"

# Option 2 : Squash (si plusieurs commits)
# Sur GitHub : "Squash and merge"

# Option 3 : Rebase (historique linéaire)
# Sur GitHub : "Rebase and merge"
```

### Post-merge

```bash
# Récupérer les changements
git fetch origin
git pull origin dev

# Supprimer la branche locale
git branch -d feature/your-feature-name

# Supprimer la branche distante
git push origin --delete feature/your-feature-name
```

---

## ☑️ Checklist avant de soumettre

Avant de créer une PR, vérifiez :

### Code
- [ ] Code suit la norme du projet (style, indentation)
- [ ] Pas de `console.log()`, `var_dump()`, ou code de debug
- [ ] Pas de commentaires obsolètes
- [ ] Variables bien nommées (`$user` pas `$u`)

### Commits
- [ ] Tous les commits suivent Conventional Commits
- [ ] Chaque commit est atomique (logique et fonctionnel)
- [ ] Messages de commits en anglais
- [ ] Pas de "WIP" ou "temp" commits

### Tests
- [ ] Tests unitaires écrits pour les nouvelles fonctions
- [ ] Tests sont verts localement
- [ ] Couverture de tests adéquate

### Documentation
- [ ] README/docs mis à jour si besoin
- [ ] Commentaires ajoutés pour la logique complexe
- [ ] Aucune typo dans la documentation

### Base de données (si applicable)
- [ ] Migrations créées pour les changements de schéma
- [ ] Pas de données non versionnées en commit
- [ ] Migrations testées localement

### Performance
- [ ] Pas de requêtes N+1
- [ ] Indexes ajoutés sur les colonnes lentes
- [ ] Pas de boucles inefficaces
- [ ] Images optimisées (le cas échéant)

### Sécurité
- [ ] Pas d'API keys ou secrets en commit
- [ ] Validation des inputs utilisateur
- [ ] Échappement des valeurs SQL
- [ ] Vérifications d'autorisation correctes

---

## 🔧 Setup local

### Avant de commencer

```bash
# Cloner le repository
git clone https://github.com/ESN/connect-in.git
cd connect-in

# Checkout la branche dev
git checkout dev

# Créer une branche feature
git checkout -b feature/your-feature-name

# Installer les dépendances
# Backend
cd backend
composer install

# Frontend
cd ../frontend
npm install
```

### Commandes utiles

```bash
# Voir l'historique des commits
git log --oneline

# Voir les branches locales et distantes
git branch -a

# Voir les changements non validés
git status

# Voir les changements spécifiques
git diff

# Squash des commits (préalable au merge)
git rebase -i HEAD~3  # Combine les 3 derniers commits

# Rebase sur dev (garder l'historique linéaire)
git rebase origin/dev

# Annuler un commit (avant push)
git reset HEAD~1
```

---

## 📚 Ressources supplémentaires

- **Conventional Commits** : https://www.conventionalcommits.org/
- **Git Flow** : https://nvie.com/posts/a-successful-git-branching-model/
- **GitHub Pull Requests** : https://docs.github.com/en/pull-requests
- **Best Practices** : https://github.com/torvalds/linux/blob/master/Documentation/SubmittingPatches

---

## ❓ Questions ?

N'hésitez pas à demander de l'aide sur Slack #dev ou à un team lead ! 🚀

---

**Version** : 1.0  
**Dernière mise à jour** : 17 février 2026  
**Mainteneur** : ESN Dev Team
