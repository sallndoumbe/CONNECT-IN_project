# 🌐 Connect'In - Réseau Social Interne ESN

![Status](https://img.shields.io/badge/status-in%20development-orange)
![PHP](https://img.shields.io/badge/PHP-8.2+-blue)
![Laravel](https://img.shields.io/badge/Laravel-11-red)
![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Table des matières

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Stack Technique](#stack-technique)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Documentation API](#documentation-api)
- [Structure du Projet](#structure-du-projet)
- [Bonnes Pratiques Git](#bonnes-pratiques-git)
- [Contribution](#contribution)
- [Support](#support)

---

## 🎯 À propos

**Connect'In** est une application web de réseau social interne conçue pour les collaborateurs d'une ESN (Entreprise de Services du Numérique).

L'objectif est de :
- 💬 Faciliter la communication entre équipes et projets
- 🤝 Renforcer les liens entre collaborateurs
- 🔐 Créer un espace d'échange professionnel et sécurisé
- ⚡ Permettre une collaboration efficace

---

## ✨ Fonctionnalités

### 👤 Gestion des Utilisateurs
- ✅ Inscription et connexion sécurisée
- ✅ Gestion du profil (modification, suppression)
- ✅ Changement de mot de passe
- ✅ Suppression du compte avec options de conservation du contenu

### 📝 Posts (Publications)
- ✅ Créer, lire, modifier, supprimer des posts (CRUD)
- ✅ Ajouter des images aux posts
- ✅ Affichage chronologique des publications
- ✅ Pagination des posts

### 💬 Commentaires
- ✅ Ajouter des commentaires sur les posts
- ✅ Modifier/supprimer ses propres commentaires
- ✅ Affichage en temps réel (dynamique)

### 👍 Likes
- ✅ Liker/retirer un like sur un post
- ✅ Un seul like par utilisateur par post
- ✅ Compteur de likes en direct

### 🔒 Sécurité
- ✅ Authentification par sessions Laravel
- ✅ Validation des données côté serveur
- ✅ Hachage des mots de passe (bcrypt)
- ✅ Protection CSRF
- ✅ Autorisations granulaires (éditer/supprimer ses propres contenus)

---

## 🏗️ Architecture

```
connect_in/
├── backend/              # API REST (Laravel)
│   ├── app/
│   │   ├── Models/       # Modèles Eloquent
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   └── Requests/
│   │   └── ...
│   ├── routes/
│   │   └── api.php       # Routes API
│   ├── database/
│   │   ├── migrations/   # Migrations
│   │   └── seeders/      # Seeders
│   ├── config/
│   └── tests/            # Tests unitaires

├── frontend/             # Application Web (TypeScript/Vite)
│   ├── src/
│   │   ├── components/   # Composants réutilisables
│   │   ├── pages/        # Pages principales
│   │   ├── api/          # Appels API (fetch/axios)
│   │   ├── styles/       # CSS Tailwind
│   │   └── main.ts
│   ├── public/           # Assets statiques
│   ├── index.html
│   └── vite.config.ts

├── docs/                 # Documentation
│   ├── API.md            # Documentation API
│   ├── DATABASE_SCHEMA.md # Schéma BD
│   ├── POSTMAN_COLLECTION.json
│   └── ...

├── docker-compose.yml    # Orchestration Docker
└── README.md             # Ce fichier
```

---

## 🛠️ Stack Technique

### Backend
- **Framework** : Laravel 11 (PHP 8.2+)
- **Base de données** : MySQL 8.0
- **Architecture** : MVC / POO
- **Authentification** : Sessions Laravel + CSRF Protection
- **API** : RESTful avec JSON
- **Validation** : Form Requests Laravel
- **ORM** : Eloquent

### Frontend
- **Runtime** : Node.js 20+
- **Langage** : TypeScript
- **Build** : Vite (ultra-rapide)
- **Styles** : Tailwind CSS (utility-first, responsive)
- **HTTP Client** : Fetch API ou Axios
- **Gestion d'état** : localStorage pour sessions

### Outils
- **Versioning** : Git & GitHub
- **Containerization** : Docker & Docker Compose
- **Documentation** : Postman Collection, Swagger (optionnel)
- **Testing** : PHPUnit (backend), Jest (frontend - optionnel)
- **Gestion de projet** : Trello

### Infrastructure
- **Local** : Docker Compose
- **Production** : Serveur Linux, reverse proxy (Nginx/Apache)

---

## 📦 Installation

### Prérequis

- `git` >= 2.30
- `docker` >= 20.10
- `docker-compose` >= 1.29
- _(Optionnel)_ `php` >= 8.2 pour développement sans Docker
- _(Optionnel)_ `node` >= 20 pour développement sans Docker

### Étapes d'installation

#### 1. Cloner le repository

```bash
git clone https://github.com/EpitechWebAcademiePromo2027/W-WEB-103-PAR-1-1-connect_in-19.git
cd W-WEB-103-PAR-1-1-connect_in-19
```

#### 2. Configuration avec Docker (Recommandé)

```bash
# Construire les images
docker-compose build

# Démarrer les services
docker-compose up -d

# Les services seront accessibles à :
# - Backend  : http://localhost:8000
# - Frontend : http://localhost:5173
# - MySQL    : localhost:3306
```

#### 3. Configuration sans Docker (Alternative)

**Backend :**
```bash
cd backend

# Copier les variables d'environnement
cp .env.example .env

# Générer la clé de l'application
php artisan key:generate

# Installer les dépendances
composer install

# Exécuter les migrations
php artisan migrate --seed

# Démarrer le serveur
php artisan serve
```

**Frontend :**
```bash
cd frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

---

## ⚙️ Configuration

### Backend

#### Fichier `.env`

Modifier `backend/.env` avec vos variables :

```env
APP_NAME="Connect'In"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=mysql              # ou 127.0.0.1 sans Docker
DB_PORT=3306
DB_DATABASE=connect_in
DB_USERNAME=connect_in_user
DB_PASSWORD=connect_in_pass

# Mail (pour les notifications)
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=votre_username
MAIL_PASSWORD=votre_password
```

#### Migrations

```bash
# Lancer les migrations
docker-compose exec backend php artisan migrate

# Ou sans Docker
php artisan migrate
```

#### Seeders (optionnel)

```bash
# Remplir la BD avec des données de test
docker-compose exec backend php artisan db:seed

# Ou sans Docker
php artisan db:seed
```

### Frontend

#### Configuration API

Modifier `frontend/src/api/config.ts` (ou fichier équivalent) :

```typescript
const API_URL = process.env.VITE_API_URL || 'http://localhost:8000/api';

export default API_URL;
```

#### Variables d'environnement (optionnel)

Créer `frontend/.env` :

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME="Connect'In"
```

---

## 🚀 Utilisation

### Lancer l'application

**Avec Docker :**
```bash
docker-compose up
```

**Sans Docker :**

Terminal 1 (Backend) :
```bash
cd backend
php artisan serve
```

Terminal 2 (Frontend) :
```bash
cd frontend
npm run dev
```

### Accéder à l'application

- **Application** : http://localhost:5173
- **API** : http://localhost:8000/api
- **Phpmyadmin** (optionnel) : http://localhost:8080

### Tester l'API

1. **Importer la collection Postman**
   - Ouvrir Postman
   - Cliquer sur "Import"
   - Sélectionner `docs/POSTMAN_COLLECTION.json`

2. **Variables Postman**
   - Ajouter une variable `base_url` = `http://localhost:8000`
   - Ajouter une variable `token` (sera remplie après login)

3. **Flux de test recommandé**
   - Register un nouveau compte
   - Login pour obtenir le token
   - Créer un post
   - Ajouter un commentaire
   - Liker le post

---

## 📚 Documentation API

### Voir la documentation complète

La documentation détaillée de l'API est disponible dans **[docs/API.md](docs/API.md)**.

### Résumé des endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Créer un compte |
| POST | `/api/auth/login` | Se connecter |
| POST | `/api/auth/logout` | Se déconnecter |
| GET | `/api/users/profile` | Récupérer mon profil |
| PUT | `/api/users/profile` | Modifier mon profil |
| DELETE | `/api/users/profile` | Supprimer mon compte |
| POST | `/api/posts` | Créer un post |
| GET | `/api/posts` | Lister les posts |
| GET | `/api/posts/{id}` | Récupérer un post |
| PUT | `/api/posts/{id}` | Modifier un post |
| DELETE | `/api/posts/{id}` | Supprimer un post |
| POST | `/api/posts/{post_id}/comments` | Créer un commentaire |
| GET | `/api/posts/{post_id}/comments` | Lister les commentaires |
| PUT | `/api/comments/{id}` | Modifier un commentaire |
| DELETE | `/api/comments/{id}` | Supprimer un commentaire |
| POST | `/api/posts/{post_id}/like` | Liker un post |
| DELETE | `/api/posts/{post_id}/like` | Retirer un like |

**Authentification** : Ajouter le header `Authorization: Bearer {token}` pour les endpoints protégés.

---

## 📁 Structure du Projet

### Backend

```
backend/
├── app/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Post.php
│   │   ├── Comment.php
│   │   └── Like.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── UserController.php
│   │   │   ├── PostController.php
│   │   │   ├── CommentController.php
│   │   │   └── LikeController.php
│   │   ├── Requests/
│   │   │   ├── StorePostRequest.php
│   │   │   ├── UpdatePostRequest.php
│   │   │   └── ...
│   │   └── Middleware/
│   │       └── Authenticate.php
│   └── ...
├── routes/
│   ├── api.php
│   └── web.php
├── database/
│   ├── migrations/
│   │   ├── 2025_02_17_000001_create_users_table.php
│   │   ├── 2025_02_17_000002_create_posts_table.php
│   │   ├── 2025_02_17_000003_create_comments_table.php
│   │   └── 2025_02_17_000004_create_likes_table.php
│   ├── seeders/
│   │   └── DatabaseSeeder.php
│   └── factories/
│       ├── UserFactory.php
│       ├── PostFactory.php
│       └── ...
├── config/
│   ├── app.php
│   ├── database.php
│   ├── cors.php
│   └── ...
├── tests/
│   ├── Feature/
│   └── Unit/
├── .env
├── .env.example
├── composer.json
├── Dockerfile
└── artisan
```

### Frontend

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.ts
│   │   ├── Navbar.ts
│   │   ├── PostCard.ts
│   │   ├── CommentForm.ts
│   │   └── ...
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Register.ts
│   │   │   └── Login.ts
│   │   ├── Home.ts
│   │   ├── Profile.ts
│   │   └── ...
│   ├── api/
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── posts.ts
│   │   ├── comments.ts
│   │   └── likes.ts
│   ├── styles/
│   │   ├── tailwind.css
│   │   ├── main.css
│   │   └── ...
│   ├── utils/
│   │   ├── storage.ts
│   │   ├── validators.ts
│   │   └── helpers.ts
│   └── main.ts
├── public/
│   ├── images/
│   └── ...
├── index.html
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── package.json
├── Dockerfile
└── .env.example
```

---

## 🌿 Branches Git

Suivre la convention **GitFlow** :

### Branches principales

- **`main`** : Version stable/production
- **`develop`** : Branche d'intégration (version en développement)

### Branches de travail

Créer des branches pour chaque fonctionnalité :

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nom-de-la-feature

# Développer, commiter, pusher
git push origin feature/nom-de-la-feature

# Ouvrir une Pull Request sur GitHub
# Après approval, merger dans develop
```

### Conventions de nommage

- `feature/auth-api` - Nouvelle fonctionnalité
- `bugfix/fix-login-issue` - Correction de bug
- `refactor/clean-models` - Refactoring
- `docs/api-documentation` - Documentation

---

## 📝 Bonnes Pratiques Git

### Commits

```bash
# Format recommandé : type: description
git commit -m "feat: ajout de la création de posts"
git commit -m "fix: correction validation commentaires"
git commit -m "refactor: nettoyage AuthController"
git commit -m "docs: mise à jour README"
```

### Pull Requests

1. Créer une branche feature depuis `develop`
2. Développer & commiter régulièrement
3. Pusher vers `origin`
4. Ouvrir une PR vers `develop`
5. Attendre la revue & approbation
6. Merger & supprimer la branche

---

## 🤝 Contribution

### Pour contribuer

1. Fork le repository
2. Créer une branche feature : `git checkout -b feature/amazing-feature`
3. Commiter vos changements : `git commit -m 'feat: add amazing feature'`
4. Pusher : `git push origin feature/amazing-feature`
5. Ouvrir une Pull Request

### Standards de code

- **Backend** : PSR-12 (Laravel standard)
- **Frontend** : ESLint + Prettier
- **Tests** : Écrire des tests pour les nouvelles fonctionnalités
- **Documentation** : Documenter les fonctions complexes

---

## 🐳 Docker

### Commandes utiles

```bash
# Démarrer les services
docker-compose up -d

# Arrêter les services
docker-compose down

# Voir les logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Exécuter une commande dans un service
docker-compose exec backend php artisan migrate
docker-compose exec frontend npm run build

# Reconstruire les images
docker-compose build --no-cache
```

### Dépannage Docker

**Erreur : Port déjà utilisé**
```bash
# Trouver le processus
lsof -i :8000

# Terminer le processus
kill -9 <PID>
```

**Erreur : MySQL ne démarre pas**
```bash
# Vérifier les logs
docker-compose logs mysql

# Supprimer les volumes et recommencer
docker-compose down -v
docker-compose up -d
```

---

## 🧪 Tests

### Backend

```bash
# Lancer les tests PHPUnit
docker-compose exec backend php artisan test

# Avec coverage
docker-compose exec backend php artisan test --coverage
```

### Frontend

```bash
# Lancer Jest
npm run test

# Watch mode
npm run test:watch
```

---

## 📊 Architecture de la Base de Données

Voir **[docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)** pour le diagramme complet et les détails.

**Tables principales :**
- `users` - Utilisateurs
- `posts` - Publications
- `comments` - Commentaires
- `likes` - Likes

---

## 🔒 Sécurité

### Recommandations

- ✅ Ne jamais commiter les fichiers `.env` (ils contiennent des secrets)
- ✅ Utiliser HTTPS en production
- ✅ Hacher tous les mots de passe (bcrypt)
- ✅ Valider toutes les entrées utilisateur
- ✅ Implémenter rate limiting
- ✅ Utiliser CORS correctement
- ✅ Ne pas exposer les erreurs détaillées en production

---

## 📞 Support

### Obtenir de l'aide

- 📖 Lire la documentation : [docs/](docs/)
- 🔍 Ouvrir une issue sur GitHub
- 💬 Contacter l'équipe

### Ressources utiles

- [Laravel Documentation](https://laravel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

## 📄 License

Ce projet est sous license MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 👥 Équipe

Développé par les étudiants de **Epitech Web Academy - Promo 2027**

---

## 🎉 Remerciements

Merci à tous les contributeurs et à la communauté pour le soutien !

---

**Version** : 1.0  
**Dernière mise à jour** : 17 février 2026

[⬆ Retour en haut](#-connectin---réseau-social-interne-esn)