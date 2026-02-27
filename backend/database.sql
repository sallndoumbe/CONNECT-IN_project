CREATE DATABASE IF NOT EXISTS `connect_in` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `connect_in`;

CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `image` LONGTEXT NULL,
    `bio` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX `idx_email` (`email`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `posts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `content` TEXT NOT NULL,
    `image` LONGTEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `comments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `post_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    INDEX `idx_post_id` (`post_id`),
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `likes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `post_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_like` (`post_id`, `user_id`),
    INDEX `idx_post_id` (`post_id`),
    INDEX `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

INSERT INTO `users` (`email`, `firstname`, `lastname`, `password`, `bio`) VALUES
('jean.dupont@esn.fr', 'Jean', 'Dupont', '$2y$12$abcdef...', 'Développeur passionné'),
('marie.martin@esn.fr', 'Marie', 'Martin', '$2y$12$ghijkl...', 'Designer UX'),
('pierre.bernard@esn.fr', 'Pierre', 'Bernard', '$2y$12$mnopqr...', 'Chef de projet'),
('sophie.rousseau@esn.fr', 'Sophie', 'Rousseau', '$2y$12$stuvwx...', 'Manager d\'équipe'),
('luc.lefevre@esn.fr', 'Luc', 'Lefèvre', '$2y$12$yzabcd...', 'DevOps engineer');

INSERT INTO `posts` (`user_id`, `content`) VALUES
(1, 'Bienvenue sur Connect\'In ! 🎉 Heureux que vous soyez là.'),
(2, 'Nouveau design finalisé pour le projet X'),
(1, 'Conseil : Utiliser GitFlow pour mieux collaborer en équipe'),
(3, 'Sprint 2 démarré ! Beaucoup de nouveautés à venir.'),
(4, 'N\'oubliez pas les réunions de synchronisation ce jeudi');

INSERT INTO `comments` (`post_id`, `user_id`, `content`) VALUES
(1, 2, 'Merci ! Ravi de rejoindre cette communauté.'),
(1, 3, '+1 ! Ça va vraiment faciliter la communication'),
(2, 1, 'Superbe travail ! Les couleurs sont très sympas'),
(3, 4, 'Absolument ! J\'apprécie beaucoup cette approche'),
(4, 5, 'Prêt pour de nouveaux défis ! 💪');

INSERT INTO `likes` (`post_id`, `user_id`) VALUES
(1, 2), (1, 3), (1, 4), (1, 5),
(2, 1), (2, 3), (2, 4),
(3, 2), (3, 4), (3, 5),
(4, 1), (4, 2), (4, 5),
(5, 1), (5, 2), (5, 3), (5, 4);

