-- TODO rivedere questo file

-- PRIMA FASE
SET FOREIGN_KEY_CHECKS = 0;

-- SECONDA FASE
TRUNCATE TABLE users;

-- TERZA FASE

INSERT INTO users (id, username, email, password, bio, profile_image) VALUES
(1, 'cinefilo_88', 'mario@email.com', '$2b$10$wT0X/u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.', 'Amo il cinema d\'autore.', 'https://i.pravatar.cc/150?u=1'),
(2, 'giulia_series', 'giulia@email.com', '$2b$10$wT0X/u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.', 'Binge watcher seriale.', 'https://i.pravatar.cc/150?u=2'),
(3, 'luca_director', 'luca@email.com', '$2b$10$wT0X/u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.', 'Aspirante regista.', 'https://i.pravatar.cc/150?u=3'),
(4, 'sara_horror', 'sara@email.com', '$2b$10$wT0X/u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.', 'Solo film horror.', 'https://i.pravatar.cc/150?u=4'),
(5, 'marco_poltrona', 'marco@email.com', '$2b$10$wT0X/u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.1u.', 'Guardo film la domenica.', 'https://i.pravatar.cc/150?u=5');

-- QUARTA FASE

SET FOREIGN_KEY_CHECKS = 1;