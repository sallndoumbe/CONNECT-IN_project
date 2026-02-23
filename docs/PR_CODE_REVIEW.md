# 🔍 Pull Requests & Code Review Guide

## 📤 Créer une Pull Request

### Étape 1 : Préparer votre branche

```bash
# Récupérer les derniers changements
git fetch origin
git pull origin dev

# Assurez-vous que votre branche est à jour
git rebase origin/dev
# (ou git merge origin/dev)

# Résoudre les conflits si nécessaire
git status
# Éditer les fichiers en conflit
# Puis: git add <fichier> && git rebase --continue
```

### Étape 2 : Valider localement

```bash
# Tester le build
cd backend
composer install
php artisan migrate

cd ../frontend
npm install
npm run build

# Lancer les tests
npm run test
php artisan test
```

### Étape 3 : Pousser sur une branche feature

```bash
# Pousser la branche
git push origin feature/your-feature-name

# Créer une branche de suivi (tracking)
git push -u origin feature/your-feature-name
```

### Étape 4 : Créer la PR sur GitHub/GitLab

1. Aller sur votre repository
2. Cliquer sur "New Pull Request"
3. **Base branch** : `dev` (ou `main` pour hotfix)
4. **Compare branch** : votre `feature/*`
5. Remplir le template

### Template de PR (à copier/coller)

```markdown
## 📌 Description
Brève description de la fonctionnalité ajoutée ou du bug corrigé.
Contexte : Pourquoi était-ce nécessaire?

## 🎯 Type de changement
- [ ] Nouvelle fonctionnalité
- [ ] Correction de bug  
- [ ] Refactorisation
- [ ] Documentation uniquement
- [ ] Change la performance

## 🔗 Tickets liés
Ferme #123 (GitHub issues / Jira)
Voir aussi : #124, #125

## 📋 Checklist
- [ ] Mon code suive le style du projet
- [ ] J'ai effectué une auto-review de mon code
- [ ] J'ai ajouté des commentaires pour la logique complexe
- [ ] Les tests existants passent toujours
- [ ] J'ai ajouté de nouveaux tests
- [ ] Les nouvelles features sont documentées
- [ ] Aucun changement cassant (breaking changes)
- [ ] Pas de console.log() ou var_dump()

## 🧪 Instructions de test
Étapes pour validater la fonctionnalité :
1. Checkout la branche `git checkout feature/your-feature`
2. Installer les dépendances `composer install && npm install`
3. Lancer `php artisan migrate`
4. Lancer l'app `php artisan serve` and `npm run dev`
5. Test scenario 1: ...
6. Test scenario 2: ...
7. Vérifier que aucun bug de régression

## 📸 Screenshots (UI changes only)
Ajouter des captures d'écran avant/après si c'est une changement visuel.

## 💭 Notes supplémentaires
Toute information pertinente pour le reviewer.
```

---

## 👀 Code Review Process

### Qui fait la review ?

- **Todo reviewer minimum** : 1 développeur
- **Approuvé require** : Au moins 1 ✅
- **Reviewer assignment** : Un team lead assigne les reviewers
- **Self-review** : L'auteur ne peut pas approuver sa propre PR

### Comment faire une review ?

#### 1️⃣ En tant que reviewer

```bash
# Checkout la branche pour tester localement
git fetch origin
git checkout feature/your-feature

# Tester le code
npm install
composer install
php artisan migrate
php artisan serve
npm run dev

# Vérifier le code sur GitHub
```

#### 2️⃣ Points à vérifier

**Qualité du code**
- [ ] Code lisible et bien nommé
- [ ] Pas de code dupliqué (DRY)
- [ ] Suit les patterns du projet
- [ ] Aucune dépendance circulaire
- [ ] Pas de code mort

**Logique métier**
- [ ] La solution est correcte
- [ ] Gère les cas limites
- [ ] Validation des inputs appropriée
- [ ] Gestion des erreurs correcte 
- [ ] Authentification/Autorisation correcte

**Performance**
- [ ] Pas de N+1 queries en base
- [ ] Pas de boucles inefficaces
- [ ] Indexes sur les colonnes interrogées
- [ ] Cache utilisée si pertinent
- [ ] Pas de requêtes inutiles

**Sécurité**
- [ ] Pas de SQL injection
- [ ] Pas de XSS
- [ ] Validation des inputs
- [ ] Pas de secrets en commit
- [ ] Vérifications d'autorisation

**Tests**
- [ ] Tests unitaires présents
- [ ] Tests pour les happy paths ET edge cases
- [ ] Couverture de tests >70%
- [ ] Tests isolés et rapides

**Documentation**
- [ ] Code complexe commenté
- [ ] README/docs mis à jour
- [ ] JSDoc/PHPDoc présents
- [ ] Changelog mis à jour

### 3️⃣ Ajouter des commentaires

**Types de retours**

| Symbole | Meaning | Exemple | Action |
|---|---|---|---|
| 💬 | Question / Clarification | "Pourquoi utilises-tu `map` au lieu de `filter`?" | Répond / Explique |
| 💡 | Suggestion / Améliorable | "On pourrait refactoriser ceci avec une fonction privée" | Optionnel à faire |
| 🔴 | Blocage / Must-fix | "Ici il y a une SQL injection" | DOIT être corrigé |
| ✅ | Approval | "Looks good, LGTM!" | Continue |

**Ajouter un commentaire sur GitHub**

1. Aller dans l'onglet "Files changed"
2. Survoler la ligne de code
3. Cliquer sur le `+` bleu
4. Écrire le commentaire
5. Cliquer "Comment"

**Exemple de commentaire constructif**

```markdown
💬 Question - Pourquoi appeles-tu `formatDate` here?

🔴 Blocage - Cette requête va créer un N+1 issue. 
Utilise eager loading avec `.with('comments')`

💡 Suggestion - Au lieu de une boucle, on pourrait 
utiliser `array_map()` pour plus de clarté.

✅ LGTM - Code looks good! Nice refactorisation.
```

### 4️⃣ Approuver ou Demander des changements

**Approver la PR** (en bas de la PR)
- Cliquer "Review changes"
- Sélectionner "Approve"
- Ajouter un message optionnel
- Cliquer "Submit review"

**Demander des changements**
- Cliquer "Review changes"
- Sélectionner "Request changes"
- Ajouter des commentaires
- Cliquer "Submit review"

---

## 🔧 Pour l'auteur : Répondre aux commentaires

### Implémenter les changements

```bash
# Faire les modifications demandées
# Éditer les fichiers
git add <fichier>
git commit -m "feedback: address review comments"

# Pousser les changements
git push origin feature/your-feature
```

### Répondre aux reviewers

1. Sur GitHub, cliquer sur le commentaire
2. Cliquer "Reply"
3. Écrire votre réponse
4. Cliquer "Comment"

**Exemple de réponse**

```markdown
✅ Merci pour le feedback! J'ai refactoriser la boucle 
pour utiliser `array_map()` comme suggéré.

🔴 Concernant le N+1 issue - j'ai ajouté `.with('comments')` 
et testé localement pour confirmer que ça marche.

💬 Bonne question sur la validation - c'est maintenant 
dans le Form Request comme on l'a discuté en standup.
```

### Demander une re-review

Une fois que vous avez implémenté les changements :
1. Cliquer "Re-request review" à côté du reviewer
2. Le reviewer sera notifié
3. Attendre l'approbation

---

## ✅ Checklist de merge

Avant de merger une PR, vérifier :

- [ ] Tous les tests passent (CI/CD vert ✅)
- [ ] Évaluation au moins 1 reviewer approuvé
- [ ] Pas de changements en attente
- [ ] Branche synced avec la base (pas de conflits)
- [ ] Tous les commits suivent Conventional Commits
- [ ] Description de PR complete et claire
- [ ] Pas de code dupliqué
- [ ] Performance acceptable
- [ ] Aucune dépendance à un autre PR

### Merger la PR

**Commandes**

```bash
# Option 1 : Via GitHub UI (RECOMMANDÉ)
# Cliquer "Merge pull request"
# Choisir: "Create a merge commit" ou "Squash and merge"

# Option 2 : Via CLI
git checkout dev
git pull origin dev
git merge --no-ff feature/your-feature -m "Merge PR #123: feature description"
git push origin dev
```

### Post-merge : Nettoyer

```bash
# Supprimer la branche locale
git branch -d feature/your-feature

# Supprimer la branche distante
git push origin --delete feature/your-feature

# Récupérer les changements
git pull origin dev
```

---

## 🚫 Problèmes courants

### Conflit de merge

```bash
# Situation : votre branche est en arrière
git fetch origin
git rebase origin/dev

# Résoudre les conflits manuellement
# Fichiers avec <<<< ==== >>>> à éditer

# Après edits :
git add <fichier>
git rebase --continue

# Ou annuler le rebase
git rebase --abort
```

### PR trop grande

**Problème** : Une PR avec trop de changements est difficile à reviewer.

**Solution** : Diviser en plusieurs PRs
- PR 1: Core feature
- PR 2: Tests  
- PR 3: Documentation

### Changements demandés après l'approbation

Relancer une re-review si vous avez changé du code.

---

## 📊 Bonnes pratiques de review

### Pour le reviewer

✅ DO
- [ ] Répondre dans les 24h
- [ ] Être constructif et respectueux
- [ ] Expliquer le "pourquoi" pas juste le "quoi"
- [ ] Approuver quand les changements demandés sont faits
- [ ] Tester le code localement
- [ ] Demander des clarifications si besoin

❌ DON'T
- [ ] Ne pas être agressif ou critique
- [ ] Ne pas approuver sans lire le code
- [ ] Ne pas demander des changements si c'est juste une "préférence"
- [ ] Ne pas garder une approbation après des changements majeurs

### Pour l'auteur

✅ DO
- [ ] Répondre aux commentaires rapidement
- [ ] Implémenter les changements dans des commits séparés
- [ ] Demander une re-review
- [ ] Accepter les critiques constructives

❌ DON'T
- [ ] Ne pas ignorer les commentaires
- [ ] Ne pas force-push sans raison
- [ ] Ne pas merger sans approbation
- [ ] Ne pas repousser indefiniment une PR

---

## 🎯 SLA (Service Level Agreement)

| Situation | Temps max | Escalade |
|---|---|---|
| Review initiale | 24h | Slack team lead |
| Réponse aux commentaires | 24h | Slack reviewer |
| Re-review après changements | 12h | PM si blocage |
| Merge après approbation | 2h | Devops pour deploy |

---

## 📝 Exemples réels

### ✅ Bonne review

```markdown
Great PR! Few suggestions:

💡 In the `createPost()` method, you could add error handling 
for when the image upload fails. Consider wrapping in a try/catch:

```php
try {
    $image = $request->file('image')->store('posts');
} catch (Exception $e) {
    return response()->json(['error' => 'Image upload failed']);
}
```

🔴 Also noticed the `posts` table is missing an index on `created_at`.
This will speed up sorting queries. Add to migration:

```php
$table->index('created_at');
```

✅ LGTM otherwise! Just address these two items and we're good to go.
```

### ❌ Mauvaise review

```markdown
This code is bad. Fix it.

WTF is this variable name?

Didn't test this properly.
```

---

**Version** : 1.0  
**Dernière mise à jour** : 17 février 2026
