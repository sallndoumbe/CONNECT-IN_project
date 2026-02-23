-- ============================================================================
-- CONNECT'IN - Database Schema
-- ============================================================================
-- Ce script crée la structure complète de la base de données Connect'In
-- 
-- Pour exécuter ce script :
-- mysql -u root -p < database.sql
-- 
-- Ou directement dans MySQL :
-- source database.sql;
-- ============================================================================

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS `connect_in` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `connect_in`;

-- ============================================================================
-- TABLE: USERS
-- ============================================================================
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `image` LONGBLOB NULL COMMENT 'Photo de profil (base64 ou URL)',
    `bio` TEXT NULL COMMENT 'Biographie/description personnelle',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX `idx_email` (`email`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Table des utilisateurs';

-- ============================================================================
-- TABLE: POSTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS `posts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL COMMENT 'Auteur du post',
    `content` TEXT NOT NULL COMMENT 'Contenu du post',
    `image` LONGBLOB NULL COMMENT 'Image attachée (base64 ou URL)',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Table des posts/publications';

-- ============================================================================
-- TABLE: COMMENTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS `comments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `post_id` INT NOT NULL COMMENT 'Post commenté',
    `user_id` INT NOT NULL COMMENT 'Auteur du commentaire',
    `content` TEXT NOT NULL COMMENT 'Contenu du commentaire',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_post_id` (`post_id`),
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Table des commentaires';

-- ============================================================================
-- TABLE: LIKES
-- ============================================================================
CREATE TABLE IF NOT EXISTS `likes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `post_id` INT NOT NULL COMMENT 'Post liké',
    `user_id` INT NOT NULL COMMENT 'Utilisateur qui like',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_like` (`post_id`, `user_id`) COMMENT 'Un like par utilisateur par post',
    INDEX `idx_post_id` (`post_id`),
    INDEX `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Table des likes/votes';

-- ============================================================================
-- VUE: Posts avec statistiques (optionnel, pour performance)
-- ============================================================================
CREATE OR REPLACE VIEW `posts_with_stats` AS
SELECT 
    p.id,
    p.user_id,
    u.firstname,
    u.lastname,
    p.content,
    p.image,
    COUNT(DISTINCT l.id) as likes_count,
    COUNT(DISTINCT c.id) as comments_count,
    p.created_at,
    p.updated_at
FROM posts p
JOIN users u ON p.user_id = u.id
LEFT JOIN likes l ON p.id = l.post_id
LEFT JOIN comments c ON p.id = c.post_id
GROUP BY p.id
ORDER BY p.created_at DESC;

-- ============================================================================
-- DONNÉES DE TEST (Optionnel)
-- ============================================================================

-- Créer quelques utilisateurs de test
INSERT INTO `users` (`email`, `firstname`, `lastname`, `password`, `bio`) VALUES
('jean.dupont@esn.fr', 'Jean', 'Dupont', '$2y$12$abcdef...', 'Développeur passionné'),
('marie.martin@esn.fr', 'Marie', 'Martin', '$2y$12$ghijkl...', 'Designer UX'),
('pierre.bernard@esn.fr', 'Pierre', 'Bernard', '$2y$12$mnopqr...', 'Chef de projet'),
('sophie.rousseau@esn.fr', 'Sophie', 'Rousseau', '$2y$12$stuvwx...', 'Manager d\'équipe'),
('luc.lefevre@esn.fr', 'Luc', 'Lefèvre', '$2y$12$yzabcd...', 'DevOps engineer');

-- Créer quelques posts de test
INSERT INTO `posts` (`user_id`, `content`) VALUES
(1, 'Bienvenue sur Connect\'In ! 🎉 Heureux que vous soyez là.'),
(2, 'Nouveau design finalisé pour le projet X'),
(1, 'Conseil : Utiliser GitFlow pour mieux collaborer en équipe'),
(3, 'Sprint 2 démarré ! Beaucoup de nouveautés à venir.'),
(4, 'N\'oubliez pas les réunions de synchronisation ce jeudi');

-- Créer quelques commentaires de test
INSERT INTO `comments` (`post_id`, `user_id`, `content`) VALUES
(1, 2, 'Merci ! Ravi de rejoindre cette communauté.'),
(1, 3, '+1 ! Ça va vraiment faciliter la communication'),
(2, 1, 'Superbe travail ! Les couleurs sont très sympas'),
(3, 4, 'Absolument ! J\'apprécie beaucoup cette approche'),
(4, 5, 'Prêt pour de nouveaux défis ! 💪');

-- Créer quelques likes de test
INSERT INTO `likes` (`post_id`, `user_id`) VALUES
(1, 2), (1, 3), (1, 4), (1, 5),
(2, 1), (2, 3), (2, 4),
(3, 2), (3, 4), (3, 5),
(4, 1), (4, 2), (4, 5),
(5, 1), (5, 2), (5, 3), (5, 4);

-- ============================================================================
-- NOTES IMPORTANTES
-- ============================================================================
/*
1. Les mots de passe en test sont des hashes bcrypt (bcrypt rounds = 12)
   Pour générer un hash : php -r "echo password_hash('password', PASSWORD_BCRYPT);"

2. Les données de test sont créées à titre d'exemple
   À supprimer en production

3. Le charset UTF8MB4 permet de stocker des emojis et caractères spéciaux

4. Les FOREIGN KEY avec ON DELETE CASCADE suppriment automatiquement les
   commentaires et likes lors de la suppression d'un post ou utilisateur

5. La contrainte UNIQUE sur (post_id, user_id) dans likes garantit
   qu'un utilisateur ne peut liker qu'une fois par post

6. Les INDEX sur les colonnes fréquemment requêtées améliorent les performances

7. Les TIMESTAMP automatiques (created_at, updated_at) facilitent le suivi
*/

-- ============================================================================
-- FIN DU SCRIPT
-- ============================================================================
