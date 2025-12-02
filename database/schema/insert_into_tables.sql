-- Script per popolare tutte le tabelle del database CineCircle

-- Disabilita temporaneamente i controlli delle chiavi esterne per evitare errori durante l'inserimento massivo
SET FOREIGN_KEY_CHECKS = 0;

-- Svuota le tabelle per ripartire da zero (Opzionale, ma consigliato per mantenere coerenza con gli ID di questo script)
TRUNCATE TABLE activity_feed;
TRUNCATE TABLE list_items;
TRUNCATE TABLE lists;
TRUNCATE TABLE user_contents;
TRUNCATE TABLE reviews;
TRUNCATE TABLE follows;
TRUNCATE TABLE content_genres;
TRUNCATE TABLE contents;
TRUNCATE TABLE genres;
TRUNCATE TABLE users;

-- --------------------------------------------------------
-- 1. POPOLAMENTO UTENTI (5 Utenti demo)
-- Password (hash fittizio per demo): $2b$10$fakehash...
-- --------------------------------------------------------
INSERT INTO users (username, email, password, bio, profile_image) VALUES
('cinefilo_88', 'mario@email.com', '$2b$10$abcdefghilmnopqrstuvz', 'Amo il cinema d\'autore e le serie sci-fi.', 'https://i.pravatar.cc/150?u=1'),
('giulia_series', 'giulia@email.com', '$2b$10$abcdefghilmnopqrstuvz', 'Binge watcher professionista. Team Netflix.', 'https://i.pravatar.cc/150?u=2'),
('luca_director', 'luca@email.com', '$2b$10$abcdefghilmnopqrstuvz', 'Aspirante regista. Guardo tutto frame per frame.', 'https://i.pravatar.cc/150?u=3'),
('sara_horror', 'sara@email.com', '$2b$10$abcdefghilmnopqrstuvz', 'Solo film horror e thriller psicologici.', 'https://i.pravatar.cc/150?u=4'),
('marco_poltrona', 'marco@email.com', '$2b$10$abcdefghilmnopqrstuvz', 'Guardo film solo la domenica sera.', 'https://i.pravatar.cc/150?u=5');

-- --------------------------------------------------------
-- 2. POPOLAMENTO GENERI
-- --------------------------------------------------------
INSERT INTO genres (genre_name) VALUES 
('Action'), ('Adventure'), ('Comedy'), ('Crime'), ('Drama'), 
('Fantasy'), ('Horror'), ('Sci-Fi'), ('Thriller'), ('Documentary');

-- --------------------------------------------------------
-- 3. POPOLAMENTO CONTENTS (10 Film + 10 Serie TV)
-- --------------------------------------------------------
INSERT INTO contents (
    title, slug, description, poster_url, type, year, duration, director, cast, average_rating, popularity_count, is_featured
) VALUES
-- FILM (ID 1-10)
('Inception', 'inception', 'Un ladro che ruba segreti aziendali attraverso l\'uso della tecnologia di condivisione dei sogni.', 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', 'movie', 2010, 148, 'Christopher Nolan', 'Leonardo DiCaprio, Joseph Gordon-Levitt', 4.8, 1500, 1),
('The Godfather', 'the-godfather', 'Il patriarca invecchiato di una dinastia criminale organizzata trasferisce il controllo del suo impero clandestino al figlio riluttante.', 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', 'movie', 1972, 175, 'Francis Ford Coppola', 'Marlon Brando, Al Pacino', 4.9, 1200, 1),
('Pulp Fiction', 'pulp-fiction', 'Le vite di due sicari della mafia, un pugile, la moglie di un gangster e una coppia di banditi si intrecciano.', 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', 'movie', 1994, 154, 'Quentin Tarantino', 'John Travolta, Uma Thurman', 4.7, 1100, 1),
('The Dark Knight', 'the-dark-knight', 'Batman deve accettare una delle più grandi prove psicologiche e fisiche per combattere l\'ingiustizia provocata dal Joker.', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'movie', 2008, 152, 'Christopher Nolan', 'Christian Bale, Heath Ledger', 4.9, 1600, 1),
('Parasite', 'parasite', 'L\'avidità e la discriminazione di classe minacciano il rapporto simbiotico appena formato tra la ricca famiglia Park e l\'indigente clan Kim.', 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', 'movie', 2019, 132, 'Bong Joon-ho', 'Song Kang-ho, Lee Sun-kyun', 4.6, 900, 0),
('Interstellar', 'interstellar', 'Un team di esploratori viaggia attraverso un wormhole nello spazio nel tentativo di garantire la sopravvivenza dell\'umanità.', 'https://image.tmdb.org/t/p/w500/gEU2QniL6E8AHtMY4kZyRiZsCv7.jpg', 'movie', 2014, 169, 'Christopher Nolan', 'Matthew McConaughey, Anne Hathaway', 4.7, 1400, 1),
('Fight Club', 'fight-club', 'Un impiegato insonne e un produttore di sapone fondano un fight club sotterraneo che si evolve in qualcosa di molto più grande.', 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', 'movie', 1999, 139, 'David Fincher', 'Brad Pitt, Edward Norton', 4.8, 1000, 0),
('Forrest Gump', 'forrest-gump', 'Le presidenze di Kennedy e Johnson, la guerra del Vietnam e altri eventi storici si svolgono attraverso la prospettiva di un uomo dell\'Alabama.', 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', 'movie', 1994, 142, 'Robert Zemeckis', 'Tom Hanks, Robin Wright', 4.5, 1300, 0),
('The Matrix', 'the-matrix', 'Un hacker impara da misteriosi ribelli la vera natura della sua realtà e il suo ruolo nella guerra contro i suoi controllori.', 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', 'movie', 1999, 136, 'Lana Wachowski, Lilly Wachowski', 'Keanu Reeves, Laurence Fishburne', 4.7, 1250, 1),
('Joker', 'joker', 'A Gotham City, il comico mentalmente disturbato Arthur Fleck viene ignorato e maltrattato dalla società.', 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', 'movie', 2019, 122, 'Todd Phillips', 'Joaquin Phoenix, Robert De Niro', 4.4, 1150, 0),

-- SERIE TV (ID 11-20)
('Breaking Bad', 'breaking-bad', 'Un insegnante di chimica scopre di avere il cancro e inizia a produrre metanfetamina.', 'https://via.placeholder.com/300x450?text=Breaking+Bad', 'tv_series', 2008, 5, 'Vince Gilligan', 'Bryan Cranston, Aaron Paul', 5.0, 5200, 1),
('Game of Thrones', 'game-of-thrones', 'Nove nobili famiglie combattono per il controllo delle terre di Westeros.', 'https://via.placeholder.com/300x450?text=Game+of+Thrones', 'tv_series', 2011, 8, 'David Benioff', 'Emilia Clarke, Kit Harington', 4.8, 4800, 1),
('Stranger Things', 'stranger-things', 'Quando un ragazzo scompare, una piccola città scopre un mistero soprannaturale.', 'https://via.placeholder.com/300x450?text=Stranger+Things', 'tv_series', 2016, 4, 'The Duffer Brothers', 'Millie Bobby Brown, Finn Wolfhard', 4.6, 4500, 1),
('The Office (US)', 'the-office-us', 'Un mockumentary su un gruppo di impiegati d\'ufficio.', 'https://via.placeholder.com/300x450?text=The+Office', 'tv_series', 2005, 9, 'Greg Daniels', 'Steve Carell, John Krasinski', 4.7, 3900, 0),
('Black Mirror', 'black-mirror', 'Serie antologica che esplora un mondo contorto e high-tech.', 'https://via.placeholder.com/300x450?text=Black+Mirror', 'tv_series', 2011, 6, 'Charlie Brooker', 'Daniel Lapaine, Hannah John-Kamen', 4.5, 3600, 0),
('Chernobyl', 'chernobyl', 'La storia della catastrofe nucleare del 1986.', 'https://via.placeholder.com/300x450?text=Chernobyl', 'tv_series', 2019, 1, 'Craig Mazin', 'Jared Harris, Stellan Skarsgård', 4.9, 3100, 1),
('The Crown', 'the-crown', 'Segue le rivalità politiche e la vita della Regina Elisabetta II.', 'https://via.placeholder.com/300x450?text=The+Crown', 'tv_series', 2016, 6, 'Peter Morgan', 'Claire Foy, Olivia Colman', 4.4, 2800, 0),
('The Mandalorian', 'the-mandalorian', 'I viaggi di un cacciatore di taglie solitario nell\'universo di Star Wars.', 'https://via.placeholder.com/300x450?text=The+Mandalorian', 'tv_series', 2019, 3, 'Jon Favreau', 'Pedro Pascal, Grogu', 4.6, 4300, 1),
('Squid Game', 'squid-game', 'Centinaia di giocatori accettano uno strano invito a competere in giochi per bambini.', 'https://via.placeholder.com/300x450?text=Squid+Game', 'tv_series', 2021, 1, 'Hwang Dong-hyuk', 'Lee Jung-jae, Park Hae-soo', 4.2, 5000, 1),
('Friends', 'friends', 'Le vite di sei amici che vivono a Manhattan.', 'https://via.placeholder.com/300x450?text=Friends', 'tv_series', 1994, 10, 'David Crane', 'Jennifer Aniston, Courteney Cox', 4.5, 4100, 0);

-- --------------------------------------------------------
-- 4. POPOLAMENTO CONTENT_GENRES (Colleghiamo contenuti e generi)
-- Nota: ID generi presunti: 1=Action, 5=Drama, 8=Sci-Fi, 4=Crime, 3=Comedy
-- --------------------------------------------------------
INSERT INTO content_genres (content_id, genre_id) VALUES
(1, 1), (1, 8), -- Inception (Action, Sci-Fi)
(2, 5), (2, 4), -- The Godfather (Drama, Crime)
(3, 4), (3, 5), -- Pulp Fiction (Crime, Drama)
(4, 1), (4, 4), -- Dark Knight (Action, Crime)
(5, 5), (5, 9), -- Parasite (Drama, Thriller)
(6, 8), (6, 2), -- Interstellar (Sci-Fi, Adventure)
(11, 4), (11, 5), -- Breaking Bad (Crime, Drama)
(12, 1), (12, 6), -- GOT (Action, Fantasy)
(13, 7), (13, 8), -- Stranger Things (Horror, Sci-Fi)
(14, 3);          -- The Office (Comedy)

-- --------------------------------------------------------
-- 5. POPOLAMENTO FOLLOWS (Chi segue chi)
-- --------------------------------------------------------
INSERT INTO follows (follower_id, following_id) VALUES
(1, 2), -- Mario segue Giulia
(1, 3), -- Mario segue Luca
(2, 1), -- Giulia segue Mario
(3, 1), -- Luca segue Mario
(4, 5), -- Sara segue Marco
(5, 2); -- Marco segue Giulia

-- --------------------------------------------------------
-- 6. POPOLAMENTO REVIEWS (Recensioni)
-- --------------------------------------------------------
INSERT INTO reviews (user_id, content_id, rating, text) VALUES
(1, 1, 5, 'Il miglior film di Nolan. Un capolavoro assoluto della fantascienza.'),
(2, 11, 5, 'Breaking Bad è la serie TV definitiva. Heisenberg è iconico.'),
(3, 2, 5, 'Un classico senza tempo. La regia è impeccabile.'),
(1, 13, 4, 'Molto nostalgica, ottima colonna sonora anni 80.'),
(4, 13, 3, 'Carina, ma la seconda stagione è un po\' lenta.'),
(5, 14, 5, 'Rido ogni volta che la guardo. Michael Scott è un genio.'),
(2, 5, 5, 'Inquietante e sociale allo stesso tempo. Oscar meritato.');

-- --------------------------------------------------------
-- 7. POPOLAMENTO USER_CONTENTS (Collezioni / Watchlist)
-- Status: watched, watching, want_to_watch, dropped
-- --------------------------------------------------------
INSERT INTO user_contents (user_id, content_id, status) VALUES
(1, 1, 'watched'),   -- Mario ha visto Inception
(1, 2, 'watched'),   -- Mario ha visto Il Padrino
(1, 11, 'watched'),  -- Mario ha visto Breaking Bad
(1, 5, 'want_to_watch'), -- Mario vuole vedere Parasite
(2, 11, 'watched'),  -- Giulia ha visto Breaking Bad
(2, 12, 'watching'), -- Giulia sta guardando GOT
(3, 6, 'watched'),   -- Luca ha visto Interstellar
(3, 10, 'want_to_watch'), -- Luca vuole vedere Joker
(4, 13, 'watched'),  -- Sara ha visto Stranger Things
(5, 14, 'watching'); -- Marco sta guardando The Office

-- --------------------------------------------------------
-- 8. POPOLAMENTO LISTS (Liste personalizzate)
-- --------------------------------------------------------
INSERT INTO lists (user_id, name, description, is_public) VALUES
(1, 'I miei film preferiti', 'La lista dei film che non mi stanco mai di rivedere.', 1),
(2, 'Serie da vedere nel weekend', 'Serie leggere per rilassarsi.', 1),
(3, 'Capolavori di Regia', 'Studio tecnico sui migliori film.', 0); -- Lista privata

-- --------------------------------------------------------
-- 9. POPOLAMENTO LIST_ITEMS (Contenuti dentro le liste)
-- --------------------------------------------------------
INSERT INTO list_items (list_id, content_id, position) VALUES
(1, 1, 1), -- Inception nella lista di Mario
(1, 2, 2), -- Il Padrino nella lista di Mario
(1, 4, 3), -- Dark Knight nella lista di Mario
(2, 14, 1), -- The Office nella lista di Giulia
(2, 20, 2), -- Friends nella lista di Giulia
(3, 6, 1); -- Interstellar nella lista di Luca

-- --------------------------------------------------------
-- 10. POPOLAMENTO ACTIVITY_FEED (Simulazione attività recenti)
-- --------------------------------------------------------
INSERT INTO activity_feed (user_id, content_id, activity_type) VALUES
(1, 1, 'review_created'), -- Mario ha recensito Inception
(2, 11, 'review_created'), -- Giulia ha recensito Breaking Bad
(1, NULL, 'list_created'),  -- Mario ha creato una lista (content_id NULL)
(1, 2, 'added_to_collection'), -- Mario ha aggiunto Il Padrino
(3, 1, 'review_created'); -- Luca ha recensito Inception (fittizio, non presente in tabella reviews ma nel feed sì per test)

-- Riabilita i controlli delle chiavi esterne
SET FOREIGN_KEY_CHECKS = 1;