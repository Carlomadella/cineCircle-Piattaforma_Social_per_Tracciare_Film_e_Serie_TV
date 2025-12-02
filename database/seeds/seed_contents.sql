-- PRIMA FASE
SET FOREIGN_KEY_CHECKS = 0;

-- SECONDA FASE

INSERT INTO contents (id, title, slug, description, poster_url, type, year, duration, director, cast, average_rating, popularity_count, is_featured) VALUES
-- FILMS
(1, 'Inception', 'inception', 'Un ladro che ruba segreti aziendali attraverso l\'uso della tecnologia di condivisione dei sogni.', 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', 'movie', 2010, 148, 'Christopher Nolan', 'Leonardo DiCaprio, Joseph Gordon-Levitt', 4.8, 1500, 1),
(2, 'The Godfather', 'the-godfather', 'Il patriarca invecchiato di una dinastia criminale organizzata trasferisce il controllo del suo impero clandestino al figlio riluttante.', 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', 'movie', 1972, 175, 'Francis Ford Coppola', 'Marlon Brando, Al Pacino', 4.9, 1200, 1),
(3, 'Pulp Fiction', 'pulp-fiction', 'Le vite di due sicari della mafia, un pugile, la moglie di un gangster e una coppia di banditi si intrecciano.', 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', 'movie', 1994, 154, 'Quentin Tarantino', 'John Travolta, Uma Thurman', 4.7, 1100, 1),
(4, 'The Dark Knight', 'the-dark-knight', 'Batman deve accettare una delle più grandi prove psicologiche e fisiche per combattere l\'ingiustizia provocata dal Joker.', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'movie', 2008, 152, 'Christopher Nolan', 'Christian Bale, Heath Ledger', 4.9, 1600, 1),
(5, 'Parasite', 'parasite', 'L\'avidità e la discriminazione di classe minacciano il rapporto simbiotico appena formato tra la ricca famiglia Park e l\'indigente clan Kim.', 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', 'movie', 2019, 132, 'Bong Joon-ho', 'Song Kang-ho, Lee Sun-kyun', 4.6, 900, 0),
(6, 'Interstellar', 'interstellar', 'Un team di esploratori viaggia attraverso un wormhole nello spazio nel tentativo di garantire la sopravvivenza dell\'umanità.', 'https://image.tmdb.org/t/p/w500/gEU2QniL6E8AHtMY4kZyRiZsCv7.jpg', 'movie', 2014, 169, 'Christopher Nolan', 'Matthew McConaughey, Anne Hathaway', 4.7, 1400, 1),
(7, 'Fight Club', 'fight-club', 'Un impiegato insonne e un produttore di sapone fondano un fight club sotterraneo che si evolve in qualcosa di molto più grande.', 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', 'movie', 1999, 139, 'David Fincher', 'Brad Pitt, Edward Norton', 4.8, 1000, 0),
(8, 'Forrest Gump', 'forrest-gump', 'Le presidenze di Kennedy e Johnson, la guerra del Vietnam e altri eventi storici si svolgono attraverso la prospettiva di un uomo dell\'Alabama.', 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', 'movie', 1994, 142, 'Robert Zemeckis', 'Tom Hanks, Robin Wright', 4.5, 1300, 0),
(9, 'The Matrix', 'the-matrix', 'Un hacker impara da misteriosi ribelli la vera natura della sua realtà e il suo ruolo nella guerra contro i suoi controllori.', 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', 'movie', 1999, 136, 'Lana Wachowski, Lilly Wachowski', 'Keanu Reeves, Laurence Fishburne', 4.7, 1250, 1),
(10, 'Joker', 'joker', 'A Gotham City, il comico mentalmente disturbato Arthur Fleck viene ignorato e maltrattato dalla società.', 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', 'movie', 2019, 122, 'Todd Phillips', 'Joaquin Phoenix, Robert De Niro', 4.4, 1150, 0),

-- SERIES
(11, 'Breaking Bad', 'breaking-bad', 'Un insegnante di chimica scopre di avere il cancro e inizia a produrre metanfetamina.', 'https://via.placeholder.com/300x450', 'tv_series', 2008, 5, 'Vince Gilligan', 'Bryan Cranston, Aaron Paul', 5.0, 5200, 1),
(12, 'Game of Thrones', 'game-of-thrones', 'Nove nobili famiglie combattono per il controllo delle terre di Westeros.', 'https://via.placeholder.com/300x450', 'tv_series', 2011, 8, 'David Benioff', 'Emilia Clarke, Kit Harington', 4.8, 4800, 1),
(13, 'Stranger Things', 'stranger-things', 'Quando un ragazzo scompare, una piccola città scopre un mistero soprannaturale.', 'https://via.placeholder.com/300x450', 'tv_series', 2016, 4, 'The Duffer Brothers', 'Millie Bobby Brown, Finn Wolfhard', 4.6, 4500, 1),
(14, 'The Office (US)', 'the-office-us', 'Un mockumentary su un gruppo di impiegati d\'ufficio.', 'https://via.placeholder.com/300x450', 'tv_series', 2005, 9, 'Greg Daniels', 'Steve Carell, John Krasinski', 4.7, 3900, 0),
(15, 'Black Mirror', 'black-mirror', 'Serie antologica che esplora un mondo contorto e high-tech.', 'https://via.placeholder.com/300x450', 'tv_series', 2011, 6, 'Charlie Brooker', 'Daniel Lapaine, Hannah John-Kamen', 4.5, 3600, 0);

-- QUARTA FASE
SET FOREIGN_KEY_CHECKS = 1;