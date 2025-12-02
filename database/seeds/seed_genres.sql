-- PRIMA FASE
SET FOREIGN_KEY_CHECKS = 0;

-- SECONDA FASE
TRUNCATE TABLE genres;

-- TERZA FASE

INSERT INTO genres (id, genre_name) VALUES 
(1, 'Action'),
(2, 'Adventure'),
(3, 'Comedy'),
(4, 'Crime'),
(5, 'Drama'),
(6, 'Fantasy'),
(7, 'Horror'),
(8, 'Sci-Fi'),
(9, 'Thriller'),
(10, 'Documentary'),
(11, 'Romance'),
(12, 'Animation'),
(13, 'Mystery'),
(14, 'Biography'),
(15, 'Musical');

-- QUARTA FASE

SET FOREIGN_KEY_CHECKS = 1;