# 🪝 Husky & Pre-commit Hooks Setup Guide

Cette guide explique comment configurer **Husky** et les **pre-commit hooks** pour enforcer les Conventional Commits et les standards de code.

---

## 📋 Table des matières

1. [Pourquoi Husky?](#pourquoi-husky)
2. [Installation](#installation)
3. [Hooks configurés](#hooks-configurés)
4. [Troubleshooting](#troubleshooting)
5. [Désactiver temporairement](#désactiver-temporairement)

---

## 🤔 Pourquoi Husky?

Husky nous permet de :
- ✅ **Valider les commits** avant qu'ils soient pushés
- ✅ **Enforcer les Conventional Commits** automatiquement
- ✅ **Lancer les tests** avant commit
- ✅ **Formater le code** avant commit
- ✅ **Prévenir les erreurs** à la source

Sans Husky :
```bash
❌ git commit -m "Update code" # Commits invalide accepté
❌ git commit -m "FEAT: BIG CHANGES" # Casse incorrecte
❌ git commit -m "feat: broken code"  # Code ne compile pas
```

Avec Husky :
```bash
✅ git commit -m "feat(auth): add login" # ✓ Valide!
```

---

## 📦 Installation

### Prérequis

- Node.js 12+ installé
- npm ou yarn installé
- Se être dans le répertoire racine du projet

### Étape 1 : Installer Husky

```bash
cd /path/to/connect-in
npm install husky --save-dev
npx husky install
```

### Étape 2 : Installer Commitlint

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

### Étape 3 : Créer le hook commit-msg

```bash
npx husky add .husky/commit-msg 'npx commitlint --edit $1'
```

Cela créera un fichier `.husky/commit-msg` :

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx commitlint --edit $1
```

### Étape 4 : (Optionnel) Ajouter un hook pre-commit pour le linting

```bash
npx husky add .husky/pre-commit 'npm run lint'
```

Assurez-vous que vous avez un script `lint` dans `package.json` :

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix"
  }
}
```

### Étape 5 : Vérifier l'installation

```bash
# Vérifier que Husky est installé
ls -la .husky/

# Doit montrer:
# .husky/
# ├── _/
# ├── .gitignore
# ├── commit-msg
# └── pre-commit
```

---

## 🪝 Hooks configurés

### Hook 1: commit-msg (Commitlint)

**Trigger** : Chaque fois que vous créez un commit (après `git commit`)

**Validation** :
- Le type de commit est valides (feat, fix, docs, etc.)
- Le format respecte Conventional Commits
- Le scope est sur la liste autorisé
- Subject fait entre 10-100 caractères

**Exemple**

```bash
# ✅ Valide
git commit -m "feat(auth): add user registration endpoint"

# ❌ Invalide
git commit -m "Update code"
# Erreur: subject should not be empty

# ❌ Invalide
git commit -m "FEAT(AUTH): Add user registration"
# Erreur: type should be lowercase, scope should be lowercase
```

### Hook 2: pre-commit (Linting)

**Trigger** : Avant que le commit soit créé (avant `git commit`)

**Validation** :
- ESLint (vérifier la syntaxe et les erreurs)
- Prettier (formater le code)
- PHPStan (pour le backend)

**Exemple**

```bash
# Vous écrivez du code mal formaté
git add src/index.js

# Vous tentez de commit
git commit -m "feat: add new feature"

# Husky lance pre-commit hook
# ESLint détecte des erreurs
# Le commit est BLOQUÉ

# Vous devez fixer les erreurs
npm run lint:fix
git add src/index.js
git commit -m "feat: add new feature"

# ✅ Maintenant ça passe!
```

---

## 🛠️ Configuration des hooks

### Exemple : .husky/pre-commit

Pour ajouter plus de validations :

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 1. Run linting
echo "🔍 Running ESLint..."
npm run lint:fix

# 2. Run tests (optionnel)
echo "🧪 Running tests..."
npm test

# 3. Check file sizes
echo "📏 Checking file sizes..."
# If files are too large, fail the commit

echo "✅ Pre-commit checks passed!"
```

---

## ❌ Troubleshooting

### Problème 1: Husky n'est pas installé

```bash
# Symptôme : hooks ne se lancent pas

# Solution:
npm install husky --save-dev
npx husky install
```

### Problème 2: Erreur "husky: command not found"

```bash
# Symptôme : bash: husky: command not found

# Solution:
npx husky install
# Or add to .bashrc:
export PATH="./node_modules/.bin:$PATH"
```

### Problème 3: Commit bloqué pour une raison invalide

```bash
# Symptôme : Commit refusé même s'il semble valide

# Solution - Vérifier le format
git log --oneline -1
# Vérifier que le commit suit Conventional Commits

# Vérifier les règles commitlint
cat .commitlintrc.yaml
```

### Problème 4: Git sur une machine différente

```bash
# Symptôme : Les hooks ne fonctionnent pas sur la nouvelle machine

# Solution:
git clone ...
npm install  # Installe les devDependencies
npx husky install  # Configure Husky
```

### Problème 5: Permission denied sur pre-commit

```bash
# Symptôme : permission denied: ./husky/pre-commit

# Solution:
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

---

## 🚫 Désactiver temporairement

### Bypass all hooks

```bash
# Pour un seul commit (dangereux!)
git commit --no-verify -m "feat: quick fix"

# Ou
git commit -n -m "feat: quick fix"
```

### Skip spécifique hook

```bash
# Inclure dans le message que c'est un skip intentionnel
git commit --no-verify -m "WIP: work in progress - will clean up"
```

### Désactiver Husky temporairement

```bash
# Désactiver complètement (dangerous!)
npx husky uninstall

# Réactiver plus tard
npm install husky --save-dev
npx husky install
```

### Ignorer une erreur commitlint spécifique

Dans `.commitlintrc.yaml`, vous pouvez changer une règle à level 0 (warning) :

```yaml
rules:
  scope-enum:
    - 1  # Changed from 2 (error) to 1 (warning)
    - always
    - [auth, users, posts]
```

---

## ✅ Checklist d'installation

- [ ] Node.js 12+ installé
- [ ] `npm install husky @commitlint/cli @commitlint/config-conventional`
- [ ] `npx husky install`
- [ ] `npx husky add .husky/commit-msg 'npx commitlint --edit $1'`
- [ ] (Optionnel) `npx husky add .husky/pre-commit 'npm run lint'`
- [ ] Tester : `git commit -m "test(misc): validate husky"`
- [ ] Commit invalide : `git commit -m "test"` (doit être bloqué)
- [ ] Push vers dev : `git push origin dev`

---

## 📝 Fichiers créés

Après installation, votre projet aurait :

```
.husky/
├── _/
│   ├── .gitignore
│   └── husky.sh
├── .gitignore
├── commit-msg
└── pre-commit (optionnel)

.commitlintrc.yaml
.gitignore
```

---

## 🚀 Next Steps

Une fois Husky installé :

1. **Push vers le repository**
   ```bash
   git add .husky .commitlintrc.yaml
   git commit -m "chore: add Husky pre-commit hooks"
   git push origin dev
   ```

2. **Documenter la configuration**
   - Ajouter à CONTRIBUTING.md

3. **Training de l'équipe**
   - Montrer comment Husky fonctionne
   - Expliquer Conventional Commits

4. **Monitorer les commits**
   - Vérifier que les commits suivent le standard
   - Ajuster les règles si besoin

---

## 📚 Ressources

- **Husky Docs** : https://typicode.github.io/husky/
- **Commitlint** : https://commitlint.js.org/
- **Conventional Commits** : https://www.conventionalcommits.org/

---

**Version** : 1.0  
**Dernière mise à jour** : 17 février 2026
