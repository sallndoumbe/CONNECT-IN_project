# Schéma de Base de Données - Connect'In

## Modèle Entité-Relation (MER)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         CONNECT'IN DATABASE SCHEMA                       │
└──────────────────────────────────────────────────────────────────────────┘

                        ┌─────────────────────┐
                        │      USERS          │
                        ├─────────────────────┤
                        │ id (PK)             │
                        │ email (UNIQUE)      │
                        │ firstname           │
                        │ lastname            │
                        │ password            │
                        │ image               │
                        │ bio                 │
                        │ created_at          │
                        │ updated_at          │
                        └─────────────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
    ┌──────────────────┐   ┌──────────────┐  ┌──────────────┐
    │      POSTS       │   │  COMMENTS    │  │    LIKES     │
    ├──────────────────┤   ├──────────────┤  ├──────────────┤
    │ id (PK)          │   │ id (PK)      │  │ id (PK)      │
    │ user_id (FK)   ──┼──→│ user_id(FK)──┼→ │ user_id(FK)──┤
    │ content          │   │ post_id(FK)──┼→ │ post_id(FK)──┤
    │ image            │   │ content      │  │              │
    │ created_at       │   │ created_at   │  │ created_at   │
    │ updated_at       │   │ updated_at   │  │              │
    └──────────────────┘   └──────────────┘  └──────────────┘
            │                      ▲                  ▲
            │                      │                  │
            └──────────────────────┴──────────────────┘
```

---

## Tables Détaillées

### 1. TABLE `users`

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | INT | PK, AUTO_INCREMENT | Identifiant unique |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Email professionnel unique |
| `firstname` | VARCHAR(100) | NOT NULL | Prénom |
| `lastname` | VARCHAR(100) | NOT NULL | Nom |
| `password` | VARCHAR(255) | NOT NULL | Mot de passe hashé (bcrypt) |
| `image` | LONGBLOB | NULL | Photo de profil (base64 ou URL) |
| `bio` | TEXT | NULL | Biographie/description personnelle |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Date de modification |

**Index** :
- `UNIQUE (email)`
- `INDEX (created_at)`

---

### 2. TABLE `posts`

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | INT | PK, AUTO_INCREMENT | Identifiant unique |
| `user_id` | INT | FK → users(id), NOT NULL | Auteur du post |
| `content` | TEXT | NOT NULL | Contenu du post |
| `image` | LONGBLOB | NULL | Image attachée (base64 ou URL) |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Date de modification |

**Index** :
- `FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE`
- `INDEX (user_id)`
- `INDEX (created_at)`

**Comportement à la suppression** : 
- Cascade : Supprimer tous les commentaires et likes associés

---

### 3. TABLE `comments`

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | INT | PK, AUTO_INCREMENT | Identifiant unique |
| `post_id` | INT | FK → posts(id), NOT NULL | Post commenté |
| `user_id` | INT | FK → users(id), NOT NULL | Auteur du commentaire |
| `content` | TEXT | NOT NULL | Contenu du commentaire |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE | Date de modification |

**Index** :
- `FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE`
- `FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE`
- `INDEX (post_id)`
- `INDEX (user_id)`
- `INDEX (created_at)`

**Comportement à la suppression** : 
- Cascade sur post_id : Supprimer le commentaire si le post est supprimé
- Cascade sur user_id : Supprimer le commentaire si l'utilisateur est supprimé

---

### 4. TABLE `likes`

| Colonne | Type | Contraintes | Description |
|---------|------|-------------|-------------|
| `id` | INT | PK, AUTO_INCREMENT | Identifiant unique |
| `post_id` | INT | FK → posts(id), NOT NULL | Post liké |
| `user_id` | INT | FK → users(id), NOT NULL | Utilisateur qui like |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Date du like |

**Index** :
- `FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE`
- `FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE`
- `UNIQUE KEY (post_id, user_id)` - **Important** : Un utilisateur ne peut liker qu'une fois par post
- `INDEX (post_id)`
- `INDEX (user_id)`

**Comportement à la suppression** : 
- Cascade : Supprimer les likes si le post ou l'utilisateur est supprimé

---

## Relations

### Relations 1:N

1. **Users → Posts** (1:N)
   - Un utilisateur peut créer plusieurs posts
   - Foreign Key : `posts.user_id` → `users.id`

2. **Posts → Comments** (1:N)
   - Un post peut avoir plusieurs commentaires
   - Foreign Key : `comments.post_id` → `posts.id`

3. **Users → Comments** (1:N)
   - Un utilisateur peut écrire plusieurs commentaires
   - Foreign Key : `comments.user_id` → `users.id`

4. **Posts → Likes** (1:N)
   - Un post peut avoir plusieurs likes
   - Foreign Key : `likes.post_id` → `posts.id`

5. **Users → Likes** (1:N)
   - Un utilisateur peut liker plusieurs posts
   - Foreign Key : `likes.user_id` → `users.id`

---

## Contraintes d'Intégrité

### Contraintes métier

1. **Unicité du like** : Un utilisateur ne peut liker qu'une seule fois un post
   - `UNIQUE (post_id, user_id)` dans la table likes

2. **Unicité de l'email** : Un email ne peut être associé qu'à un seul compte
   - `UNIQUE (email)` dans la table users

3. **Cascade delete** : 
   - Suppression d'un utilisateur → Supprime ses posts, commentaires et likes
   - Suppression d'un post → Supprime ses commentaires et likes

---

## Cas particulier : Suppression d'un utilisateur

Lors de la suppression d'un compte utilisateur, deux options sont possibles :

### Option 1 : Supprimer le contenu
```
DELETE FROM users WHERE id = ?
-- Cascade delete automatique :
-- - DELETE FROM posts WHERE user_id = ?
-- - DELETE FROM comments WHERE user_id = ?
-- - DELETE FROM likes WHERE user_id = ?
```

### Option 2 : Conserver le contenu
```
UPDATE posts SET user_id = NULL WHERE user_id = ?
UPDATE comments SET user_id = NULL WHERE user_id = ?
DELETE FROM likes WHERE user_id = ?
DELETE FROM users WHERE id = ?
```

**Adaptation** : Il faudrait ajouter une migration pour accepter `user_id = NULL` dans posts et comments, ou créer un user "Utilisateur supprimé" fictif.

---

## Scripts SQL

### Création des tables

```sql
-- Table Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    image LONGBLOB NULL,
    bio TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);

-- Table Posts
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    image LONGBLOB NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
);

-- Table Comments
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_post_id (post_id),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
);

-- Table Likes
CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_like (post_id, user_id),
    INDEX idx_post_id (post_id),
    INDEX idx_user_id (user_id)
);
```

---

## Améliorations futures

- Ajouter une table `notifications` pour notifier les utilisateurs
- Ajouter une table `groups` pour les groupes de discussion
- Ajouter une table `direct_messages` pour la messagerie privée
- Ajouter une table `user_roles` pour les modérateurs/admins
- Ajouter des soft deletes pour les données historiques

---

**Version** : 1.0  
**Dernière mise à jour** : 17 février 2026
