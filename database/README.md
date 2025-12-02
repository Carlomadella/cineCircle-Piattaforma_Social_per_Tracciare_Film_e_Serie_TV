# Struttura della Cartella Database - Spiegazione Completa

Ottima idea organizzare il progetto in tre cartelle separate! Questa è una pratica professionale che rende tutto più chiaro e manutenibile. Ora ti spiego come strutturare la cartella database in modo logico e utile per il tuo progetto.

## La Filosofia dietro l'Organizzazione

Prima di darti la struttura, voglio spiegarti il ragionamento dietro ogni scelta. La cartella database non serve solo a contenere il diagramma, ma diventa il posto centrale dove tieni tutta la documentazione e gli script relativi al tuo database. Pensa a questa cartella come al manuale di istruzioni del tuo database. Se tra sei mesi devi fare una modifica o se un collega deve capire come funziona il database, tutto quello che serve sarà qui dentro, ben organizzato.

## La Struttura Completa della Cartella Database

Ecco come dovresti organizzare la tua cartella database. Ti spiegherò ogni sottocartella e file uno per uno, così capisci esattamente cosa ci va dentro e perché.

Nella radice della cartella database creerai un file README.md che è un file di testo formattato in Markdown. Questo file serve come introduzione e indice di tutto quello che c'è nella cartella. Dentro spiegherai brevemente com'è strutturato il database, quali sono le tabelle principali, e come usare gli script che hai preparato. È come la copertina di un libro che spiega cosa contiene.

Sempre nella radice metterai il tuo diagramma del database. Se hai fatto lo screenshot o esportato l'immagine da DrawSQL, probabilmente sarà un file PNG o JPG. Chiamalo con un nome chiaro tipo database_diagram.png oppure cinecircle_schema.png. Questo file è prezioso perché con un solo sguardo puoi vedere tutte le tabelle e le relazioni senza dover leggere pagine di codice SQL.

Ora creiamo le sottocartelle che organizzeranno tutto il resto del materiale.

### La Cartella Schema

Crea una cartella chiamata schema. Questa conterrà tutti gli script SQL per creare la struttura del database da zero. Immagina di dover ricreare il database su un nuovo computer o su un server. Questa cartella contiene tutto quello che ti serve per farlo in pochi secondi.

Dentro la cartella schema creerai un file chiamato create_tables.sql. Questo è lo script principale che contiene tutti i comandi CREATE TABLE per ogni tabella del tuo database. Dovresti scrivere le tabelle in un ordine logico, partendo da quelle che non dipendono da nessun'altra. Per esempio, la tabella users viene prima della tabella reviews perché reviews ha una foreign key che punta a users. Se provassi a creare reviews prima di users, MySQL darebbe errore perché non può creare una foreign key verso una tabella che non esiste ancora.

Lo script sarà strutturato così. All'inizio metti un commento che spiega cosa fa questo file, per esempio "Script per creare tutte le tabelle del database CineCircle". Poi per ogni tabella scrivi il comando CREATE TABLE completo con tutti i campi, i tipi di dato, i constraint come NOT NULL e UNIQUE, le chiavi primarie e le foreign key. Tra una tabella e l'altra lascia qualche riga vuota per rendere il codice più leggibile, e magari aggiungi un commento che dice quale tabella stai creando.

Un dettaglio importante è aggiungere all'inizio di ogni CREATE TABLE la clausola IF NOT EXISTS. Questo fa sì che se esegui lo script due volte per errore, MySQL non dia errore perché prova a creare tabelle che già esistono. Semplicemente salta quelle che ci sono già.

Sempre nella cartella schema, crea un altro file chiamato drop_tables.sql. Questo contiene i comandi DROP TABLE per eliminare tutte le tabelle. Può sembrare strano avere uno script per distruggere tutto, ma in realtà è molto utile durante lo sviluppo. Se fai un errore nella struttura delle tabelle e vuoi ricominciare da capo, esegui prima questo script per pulire tutto, poi esegui di nuovo create_tables.sql per ricreare tutto correttamente. Le tabelle devono essere eliminate nell'ordine inverso rispetto a come le hai create, quindi prima elimini quelle che hanno foreign key verso altre tabelle, e solo alla fine elimini quelle che non dipendono da nessuno. Anche qui usa IF EXISTS per evitare errori se una tabella non esiste.

### La Cartella Seeds

Crea una cartella chiamata seeds. Il termine seed viene dal mondo del giardinaggio e significa seme. Questi script "seminano" il database con dati iniziali. Quando crei il database nuovo, è completamente vuoto. Non ci sono generi cinematografici, non ci sono contenuti, nulla. Per poter testare la tua applicazione hai bisogno di dati di esempio, e gli script di seed servono proprio a questo.

Dentro la cartella seeds crea diversi file, uno per ogni tipo di dati che vuoi inserire. Questo approccio modulare ti permette di eseguire solo i seed che ti servono in un dato momento.

Il primo file sarà seed_genres.sql. Questo contiene i comandi INSERT INTO per popolare la tabella genres con tutti i generi cinematografici standard. Scriverai una serie di INSERT INTO genres seguito dalle parentesi con name tra virgolette singole, e il valore del genere. Per esempio INSERT INTO genres seguito da name seguito da VALUES seguito da aperta parentesi aperta virgoletta singola Action chiusa virgoletta singola chiusa parentesi punto e virgola. Farai questo per Action, Comedy, Drama, Horror, Science Fiction, Romance, Thriller, Documentary, Animation, Fantasy, Mystery, Adventure, Crime, Biography, Musical e tutti gli altri generi che vuoi supportare. Avere questi generi già inseriti ti permette di testare subito i filtri per genere nella tua applicazione.

Il secondo file sarà seed_contents.sql. Questo è più corposo perché inserirai dei film e serie TV di esempio. Non serve che ne inserisci centinaia, una ventina vanno benissimo per testare. Per ogni contenuto farai un INSERT INTO contents specificando tutti i campi. Dovrai inventare o copiare dati realistici come titoli di film famosi, i loro slug creati trasformando il titolo in minuscolo e sostituendo gli spazi con trattini, una breve trama che puoi trovare online, un URL fittizio per la locandina che per ora può essere anche un placeholder, il tipo se movie o tv_series, l'anno di uscita, la durata o numero stagioni, il regista e gli attori principali. Non serve che questi dati siano perfetti, serve solo che siano sufficienti per testare come appaiono nella tua interfaccia.

Il terzo file sarà seed_content_genres.sql. Dopo aver inserito i contenuti e i generi, devi collegare i due. Per ogni film che hai inserito, crei delle righe in questa tabella di relazione specificando l'id del contenuto e l'id del genere. Per esempio se il film con id uno è un action movie, inserirai una riga con content_id uguale a uno e genre_id uguale all'id del genere Action nella tabella genres.

Puoi creare anche seed_users.sql per inserire alcuni utenti di test. Ricorda che le password dovrai inserirle già hashate. Puoi generare un hash di una password semplice come "password123" usando bcrypt online o scrivendoti un piccolo script Node.js che hasha una password e ti stampa il risultato, poi copi quell'hash nello script SQL.

Infine puoi creare seed_reviews.sql per inserire alcune recensioni di esempio così quando apri la pagina di un film vedi già delle recensioni e puoi testare come appaiono.

Un file molto utile da aggiungere in questa cartella è seed_all.sql. Questo file non contiene dati suoi, ma importa tutti gli altri file di seed in ordine. In MySQL puoi fare questo usando la direttiva SOURCE seguita dal percorso del file. Così quando vuoi popolare il database completo, esegui solo questo file e lui eseguirà automaticamente tutti gli altri in sequenza.

<!-- TODO COMPLETARE DA QUA IN POI -->

### La Cartella Queries

Crea una cartella chiamata queries. Questa conterrà delle query SQL utili che userai spesso durante lo sviluppo e il testing. Sono come degli appunti pronti all'uso che ti risparmiano di riscrivere le stesse query ogni volta.

Un file potrebbe chiamarsi common_queries.sql e contenere le query che esegui frequentemente. Per esempio una query per vedere tutti gli utenti con SELECT asterisco FROM users. Una query per vedere tutti i contenuti con le loro informazioni base. Una query per vedere quante recensioni ha ogni contenuto facendo un JOIN tra contents e reviews con un GROUP BY e un COUNT. Una query per trovare i generi più popolari. Ogni query dovrebbe avere un commento sopra che spiega cosa fa, così quando riapri il file dopo settimane sai subito quale query ti serve.

Un altro file utile è stats_queries.sql che contiene query più complesse per calcolare statistiche. Per esempio una query che calcola il rating medio di ogni contenuto. Una query che trova i dieci contenuti più popolari basati su quante volte sono stati aggiunti alle collezioni. Una query che mostra quali sono gli utenti più attivi basandosi sul numero di recensioni scritte. Queste query saranno molto simili a quelle che poi implementerai nei tuoi endpoint API, quindi averle qui ti serve come riferimento durante lo sviluppo.

Potresti anche creare test_queries.sql dove metti query che usi per verificare che tutto funzioni correttamente. Per esempio dopo aver inserito una recensione tramite l'applicazione, puoi eseguire una query qui per verificare che sia effettivamente nel database con i dati corretti.

### La Cartella Migrations

Crea una cartella chiamata migrations. Questa è per il futuro, quando il tuo progetto è già funzionante e devi fare modifiche alla struttura del database senza perdere i dati esistenti. Per esempio se dopo aver lanciato CineCircle ti accorgi che vorresti aggiungere un campo email_verified alla tabella users per implementare la verifica email, non puoi semplicemente eliminare e ricreare la tabella perché perderesti tutti gli utenti registrati.

In questo caso crei uno script di migrazione. Ogni migrazione è un file SQL che contiene i comandi ALTER TABLE necessari per modificare la struttura. I file di migrazione dovrebbero avere nomi che includono una data o un numero progressivo, così è chiaro in che ordine vanno eseguiti. Per esempio 001_add_email_verified_to_users.sql oppure 2024_11_28_add_email_verified.sql. Dentro il file metterai il comando ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE.

All'inizio questa cartella sarà vuota, ma è bene crearla subito così sai dove mettere le migrazioni quando serviranno.

### La Cartella Documentation

Crea una cartella chiamata documentation. Qui metterai tutta la documentazione scritta sul database che non è codice SQL. Sono file di testo che spiegano come funzionano le cose.

Un file importante è tables_description.md. Questo è un documento Markdown dove descrivi ogni tabella in dettaglio. Per ogni tabella scrivi il nome, poi una breve spiegazione di cosa contiene quella tabella e a cosa serve. Poi elenchi tutti i campi con il loro tipo, se sono obbligatori o opzionali, e cosa rappresentano. Per esempio per la tabella users scriveresti che contiene le informazioni degli utenti registrati, poi elencheresti id che è la chiave primaria auto-incrementale, username che è il nome utente univoco scelto durante la registrazione, e così via per ogni campo. Questo documento è prezioso quando tra mesi devi ricordarti perché hai fatto certe scelte o quando devi spiegare il database a qualcun altro.

Un altro file utile è relationships_explanation.md dove spieghi a parole come sono collegate le tabelle. Per esempio spieghi che ogni recensione è collegata a un utente che l'ha scritta tramite la foreign key user_id, e a un contenuto a cui si riferisce tramite content_id. Spieghi che la relazione tra contents e genres è molti a molti, quindi esiste la tabella di giunzione content_genres. Questi concetti sono visibili anche nel diagramma, ma averli scritti a parole aiuta a capire meglio.

Potresti anche creare un file conventions.md dove elenchi le convenzioni che hai deciso di seguire. Per esempio che tutti i nomi di tabella sono al plurale in inglese, che tutte le foreign key seguono il pattern nome_tabella_id, che tutti i timestamp si chiamano created_at e updated_at. Avere queste regole scritte ti aiuta a mantenere la coerenza in tutto il database.

### File Aggiuntivi Utili

Nella radice della cartella database, oltre al README e al diagramma, puoi aggiungere un file chiamato database_config_example.txt. Questo contiene un esempio di come configurare la connessione al database. Scriverai le informazioni come host localhost, port tremila trecentosei che è la porta di default di MySQL, database cinecircle che è il nome del database, username e password. Ovviamente userai valori di esempio, non le tue vere credenziali. Questo file serve come promemoria di quali informazioni servono per connettersi.

Un altro file molto utile è backup_instructions.md dove spieghi come fare un backup del database. Per MySQL si usa il comando mysqldump. Nel file scriverai il comando esatto da eseguire nel terminale per creare un file di backup, e anche come ripristinare il database da un backup. Questo è fondamentale per non perdere mai i dati.

## La Struttura Completa Riassunta

Ricapitolando, la tua cartella database sarà organizzata così. Nella radice hai README.md, database_diagram.png, database_config_example.txt e backup_instructions.md. Poi hai la cartella schema con dentro create_tables.sql e drop_tables.sql. La cartella seeds con seed_genres.sql, seed_contents.sql, seed_content_genres.sql, seed_users.sql, seed_reviews.sql e seed_all.sql. La cartella queries con common_queries.sql, stats_queries.sql e test_queries.sql. La cartella migrations che all'inizio è vuota. E la cartella documentation con tables_description.md, relationships_explanation.md e conventions.md.

## Come Userai Questa Struttura

Lascia che ti spieghi il flusso di lavoro pratico con questa organizzazione. Quando inizi il progetto per la prima volta, apri MySQL Workbench e ti connetti al tuo server MySQL locale. Crei un nuovo database chiamato cinecircle. Poi vai nella cartella database slash schema e apri il file create_tables.sql. Lo esegui tutto in MySQL Workbench e questo crea tutte le tabelle vuote. A questo punto hai la struttura ma nessun dato.

Vai nella cartella seeds e apri seed_all.sql. Lo esegui e questo popola il database con tutti i dati di test. Ora hai un database completamente funzionante con generi, film e recensioni di esempio. Puoi iniziare a sviluppare il backend e testare gli endpoint con Postman usando questi dati.

Durante lo sviluppo, quando devi verificare qualcosa nel database, invece di scrivere query da zero apri la cartella queries e usi una delle query già pronte o ne scrivi una nuova che poi salvi per dopo.

Se a un certo punto fai confusione con i dati di test e vuoi ricominciare da capo, vai nella cartella schema, esegui drop_tables.sql per eliminare tutto, poi esegui di nuovo create_tables.sql e seed_all.sql. In pochi secondi hai un database fresco come nuovo.

Quando il progetto è avanzato e devi fare una modifica alla struttura, crei un nuovo file nella cartella migrations con la data e la descrizione della modifica, scrivi i comandi ALTER TABLE necessari, e lo esegui. Questo modifica il database senza perdere i dati esistenti.

## Perché Questa Organizzazione è Importante

Potresti pensare che è un sacco di lavoro creare tutti questi file e cartelle, ma ti assicuro che ti farà risparmiare tantissimo tempo nel lungo periodo. Senza questa organizzazione, ti ritroveresti con script SQL sparsi ovunque, non sapresti quale eseguire in che ordine, e ogni volta che devi ricreare il database dovresti ricordarti tutti i passaggi a memoria.

Con questa struttura invece hai tutto documentato e organizzato. Se tra tre mesi devi riprendere il progetto, basta che apri il README nella cartella database e sai esattamente cosa fare. Se devi passare il progetto a un collega o a un revisore, può capire tutto il database semplicemente esplorando questa cartella.

Inoltre, avere gli script SQL separati per creare tabelle, popolare dati e fare query ti permette di riutilizzare questi pezzi in contesti diversi. Per esempio gli script di seed sono utilissimi quando fai testing automatico perché puoi resettare il database a uno stato noto prima di ogni test.
