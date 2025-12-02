-- Disabilita i controlli delle chiavi esterne per evitare errori di dipendenza
SET FOREIGN_KEY_CHECKS = 0;

-- Elimina tutte le tabelle se esistono
DROP TABLE IF EXISTS activity_feed;
DROP TABLE IF EXISTS list_items;
DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS user_contents;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS follows;
DROP TABLE IF EXISTS content_genres;
DROP TABLE IF EXISTS contents;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS users;

-- Riabilita i controlli delle chiavi esterne per il futuro
SET FOREIGN_KEY_CHECKS = 1;