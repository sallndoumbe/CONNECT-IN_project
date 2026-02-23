# Documentation - Connect'In API

## Table des matières

1. [Vue générale](#vue-générale)
2. [Schéma de base de données](#schéma-de-base-de-données)
3. [Endpoints API](#endpoints-api)
4. [Authentification](#authentification)
5. [Erreurs](#erreurs)

---

## Vue générale

**Connect'In** est un réseau social interne développé pour les collaborateurs d'une ESN (Entreprise de Services du Numérique).

L'application est composée de deux parties :
- **Backend** : API RESTful développée avec Laravel 11
- **Frontend** : Application web moderne consommant l'API

### Technologies utilisées

- **Backend** : PHP 8.2, Laravel 11, MySQL 8.0
- **Frontend** : TypeScript, Vite, Tailwind CSS
- **Authentification** : Sessions Laravel / JWT (optionnel)
- **Documentation API** : Postman, Swagger

---

## Schéma de base de données

### Entités principales

#### 1. Utilisateurs (`users`)
```
users
├── id (PK)
├── email (UNIQUE)
├── firstname
├── lastname
├── password (hashed)
├── image (nullable)
├── bio (nullable)
├── created_at
└── updated_at
```

#### 2. Publications (`posts`)
```
posts
├── id (PK)
├── user_id (FK → users)
├── content
├── image (nullable)
├── created_at
└── updated_at
```

#### 3. Commentaires (`comments`)
```
comments
├── id (PK)
├── post_id (FK → posts)
├── user_id (FK → users)
├── content
├── created_at
└── updated_at
```

#### 4. Likes (`likes`)
```
likes
├── id (PK)
├── post_id (FK → posts)
├── user_id (FK → users)
├── created_at
```
- **Contrainte UNIQUE** sur (post_id, user_id)

---

## Endpoints API

### Base URL
```
http://localhost:8000/api
```

### Authentification

#### Inscription
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "firstname": "Jean",
  "lastname": "Dupont",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Réponse (201)**
```json
{
  "message": "Inscription réussie",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstname": "Jean",
    "lastname": "Dupont"
  }
}
```

---

#### Connexion
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Réponse (200)**
```json
{
  "message": "Connexion réussie",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstname": "Jean",
    "lastname": "Dupont"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..." //(optionnel si JWT)
}
```

---

#### Déconnexion
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

**Réponse (200)**
```json
{
  "message": "Déconnexion réussie"
}
```

---

### Utilisateurs

#### Récupérer le profil actuel
```http
GET /api/users/profile
Authorization: Bearer {token}
```

**Réponse (200)**
```json
{
  "id": 1,
  "email": "user@example.com",
  "firstname": "Jean",
  "lastname": "Dupont",
  "bio": "Développeur passionné",
  "image": "https://...",
  "created_at": "2026-02-17T10:00:00Z"
}
```

---

#### Mettre à jour le profil
```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstname": "Jean",
  "lastname": "Dupont",
  "bio": "Nouveau bio",
  "image": "base64_encoded_image"
}
```

**Réponse (200)**
```json
{
  "message": "Profil mis à jour",
  "user": {...}
}
```

---

#### Changer le mot de passe
```http
PUT /api/users/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "current_password": "ancien_mot_de_passe",
  "new_password": "nouveau_mot_de_passe",
  "password_confirmation": "nouveau_mot_de_passe"
}
```

**Réponse (200)**
```json
{
  "message": "Mot de passe changé"
}
```

---

#### Supprimer le compte
```http
DELETE /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "keep_content": false  // true ou false
}
```

**Réponse (200)**
```json
{
  "message": "Compte supprimé"
}
```

---

### Posts

#### Créer un post
```http
POST /api/posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Mon premier post !",
  "image": "base64_encoded_image" // (optionnel)
}
```

**Réponse (201)**
```json
{
  "id": 1,
  "user_id": 1,
  "user": {
    "id": 1,
    "firstname": "Jean",
    "lastname": "Dupont"
  },
  "content": "Mon premier post !",
  "image": "https://...",
  "likes_count": 0,
  "comments_count": 0,
  "created_at": "2026-02-17T10:00:00Z"
}
```

---

#### Récupérer tous les posts
```http
GET /api/posts
GET /api/posts?page=1&per_page=10
```

**Réponse (200)**
```json
{
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "user": {
        "id": 1,
        "firstname": "Jean",
        "lastname": "Dupont"
      },
      "content": "Mon premier post !",
      "image": "https://...",
      "likes_count": 5,
      "comments_count": 2,
      "liked_by_user": false,
      "created_at": "2026-02-17T10:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total": 25
  }
}
```

---

#### Récupérer un post
```http
GET /api/posts/{id}
```

**Réponse (200)**
```json
{
  "id": 1,
  "user_id": 1,
  "user": {
    "id": 1,
    "firstname": "Jean",
    "lastname": "Dupont"
  },
  "content": "Mon premier post !",
  "image": "https://...",
  "likes_count": 5,
  "comments_count": 2,
  "comments": [
    {
      "id": 1,
      "user_id": 2,
      "user": {
        "id": 2,
        "firstname": "Marie",
        "lastname": "Martin"
      },
      "content": "Super post !",
      "created_at": "2026-02-17T10:30:00Z"
    }
  ],
  "created_at": "2026-02-17T10:00:00Z"
}
```

---

#### Modifier un post
```http
PUT /api/posts/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Post modifié !",
  "image": "base64_encoded_image"
}
```

**Réponse (200)**
```json
{
  "message": "Post mis à jour",
  "post": {...}
}
```

---

#### Supprimer un post
```http
DELETE /api/posts/{id}
Authorization: Bearer {token}
```

**Réponse (200)**
```json
{
  "message": "Post supprimé"
}
```

---

### Commentaires

#### Créer un commentaire
```http
POST /api/posts/{post_id}/comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Très intéressant !"
}
```

**Réponse (201)**
```json
{
  "id": 1,
  "post_id": 1,
  "user_id": 2,
  "user": {
    "id": 2,
    "firstname": "Marie",
    "lastname": "Martin"
  },
  "content": "Très intéressant !",
  "created_at": "2026-02-17T10:30:00Z"
}
```

---

#### Récupérer les commentaires d'un post
```http
GET /api/posts/{post_id}/comments
```

**Réponse (200)**
```json
{
  "data": [
    {
      "id": 1,
      "post_id": 1,
      "user_id": 2,
      "user": {
        "id": 2,
        "firstname": "Marie",
        "lastname": "Martin"
      },
      "content": "Très intéressant !",
      "created_at": "2026-02-17T10:30:00Z"
    }
  ]
}
```

---

#### Modifier un commentaire
```http
PUT /api/comments/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Commentaire modifié"
}
```

**Réponse (200)**
```json
{
  "message": "Commentaire mis à jour",
  "comment": {...}
}
```

---

#### Supprimer un commentaire
```http
DELETE /api/comments/{id}
Authorization: Bearer {token}
```

**Réponse (200)**
```json
{
  "message": "Commentaire supprimé"
}
```

---

### Likes

#### Liker un post
```http
POST /api/posts/{post_id}/like
Authorization: Bearer {token}
```

**Réponse (201)**
```json
{
  "message": "Like ajouté",
  "likes_count": 6
}
```

---

#### Retirer un like
```http
DELETE /api/posts/{post_id}/like
Authorization: Bearer {token}
```

**Réponse (200)**
```json
{
  "message": "Like supprimé",
  "likes_count": 5
}
```

---

## Authentification

### Sessions Laravel (par défaut)

L'authentification par sessions est utilisée par défaut. Les clients conservent un cookie `XSRF-TOKEN` et utilisent les sessions standard de Laravel.

### JWT (optionnel)

Pour implémenter JWT, installer le package `tymon/jwt-auth` et ajouter le token dans le header `Authorization`:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## Erreurs

### Codes HTTP courants

| Code | Signification |
|------|---------------|
| 200 | Succès |
| 201 | Créé |
| 400 | Mauvaise requête |
| 401 | Non authentifié |
| 403 | Non autorisé |
| 404 | Non trouvé |
| 409 | Conflit (ex: email déjà utilisé) |
| 422 | Validation échouée |
| 500 | Erreur serveur |

### Format des erreurs

```json
{
  "message": "Erreur",
  "errors": {
    "email": ["L'email est déjà utilisé"]
  }
}
```

---

## Notes importantes

1. **CORS** : Si le frontend est sur un domaine différent, configurer les headers CORS dans Laravel.
2. **Validation** : Toutes les entrées utilisateur sont validées côté serveur.
3. **Sécurité** : 
   - Les mots de passe sont hashés avec bcrypt (BCRYPT_ROUNDS=12)
   - Utiliser HTTPS en production
   - Implémenter rate limiting sur les endpoints publics
4. **Images** : Stockées en base64 ou sur un service cloud (AWS S3, etc.)

---

**Version** : 1.0  
**Dernière mise à jour** : 17 février 2026
