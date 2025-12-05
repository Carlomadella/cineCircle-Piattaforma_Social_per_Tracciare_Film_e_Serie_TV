## Come Funzionerà la Piattaforma

Immagina un utente che si registra sulla tua piattaforma. Dopo aver fatto login, si trova davanti a una homepage che mostra immediatamente cosa sta succedendo nella community. Vede le recensioni più recenti degli utenti che segue, i film più popolari del momento nella piattaforma, e magari una sezione dedicata alle nuove uscite al cinema o sulle piattaforme streaming. Tutto questo crea un senso di comunità attiva e lo invoglia a esplorare.

L'utente può usare la barra di ricerca per trovare un film specifico che ha appena visto. Digita il titolo e mentre scrive, la ricerca suggerisce risultati in tempo reale. Può filtrare i risultati per anno di uscita, genere cinematografico come thriller, commedia, fantascienza, o per valutazione media della community. Può anche ordinare i risultati per popolarità sulla piattaforma, per data di uscita, o per rating medio. La visualizzazione può essere a griglia con le locandine grandi e d'impatto, oppure in lista con più informazioni testuali visibili immediatamente come regista, anno e sinossi breve.

Quando clicca su un film che gli interessa, viene portato alla pagina di dettaglio dove trova tutte le informazioni possibili. La locandina è grande e ben visibile, c'è una sinossi completa, il regista, il cast principale, il genere, la durata, l'anno di uscita, e la valutazione media della community basata su tutte le recensioni degli utenti. Sotto queste informazioni, l'utente vede tutte le recensioni scritte dagli altri membri della piattaforma. Se è loggato, ha a disposizione diversi pulsanti interattivi. Può aggiungere il film alla sua collezione personale scegliendo uno stato tra "visto", "sto guardando" se è una serie, o "voglio vedere". Può anche scrivere la sua recensione personale con un voto da una a cinque stelle e un testo descrittivo dove esprime le sue opinioni sul film.

Ogni utente ha un profilo personale che diventa il suo diario cinematografico digitale. Nel profilo può vedere tutta la sua collezione organizzata per stato, quindi una sezione con tutti i film che ha segnato come visti, una con quelli che vuole vedere, e così via. Ci sono statistiche personali che mostrano quanti film ha visto, quali sono i suoi generi preferiti calcolati automaticamente in base ai film che ha nella collezione, quali registi guarda di più. Tutte le sue recensioni sono raccolte in una sezione dedicata, così può rileggerle o modificarle in qualsiasi momento.

Ma la funzionalità più interessante del profilo sono le liste personalizzate. Un utente può creare una lista chiamata "I miei film preferiti degli anni novanta" e aggiungere tutti i titoli che ama di quel periodo. Oppure può creare "Film da vedere ad Halloween" per organizzare i suoi horror preferiti. Ogni lista può essere pubblica, quindi visibile a tutti gli altri utenti, o privata per uso personale. Quando altri utenti visitano il suo profilo, vedono le sue liste pubbliche e possono prendere ispirazione per scoprire nuovi film.

L'aspetto sociale della piattaforma è fondamentale. Gli utenti possono seguirsi a vicenda proprio come su un social network. Quando segui qualcuno, le sue nuove recensioni e attività compaiono nel tuo feed personale. Questo crea un circolo virtuoso dove scopri sempre nuovi film attraverso i gusti delle persone che ammiri o che hanno gusti simili ai tuoi. C'è anche una sezione per esplorare profili di altri utenti basata su interessi comuni, quindi la piattaforma ti suggerisce persone da seguire che hanno visto e apprezzato film simili ai tuoi.

## Frontend con React

Il frontend sarà costruito interamente con React, che ti permette di creare interfacce utente modulari e riutilizzabili organizzate in componenti. React rende molto più facile gestire lo stato dell'applicazione e aggiornare l'interfaccia quando i dati cambiano.

### Struttura delle Cartelle

    src/components (Pezzi riutilizzabili: Navbar, Footer, Cards)

    src/pages (Le viste complete: Home, Login, Profile, Detail)

    src/context (Per lo stato globale dell'utente: AuthContext)

    src/services (Configurazione API e chiamate Axios)

    src/styles (Per il tuo CSS personalizzato)

### Struttura dei Componenti

Organizzerai la tua applicazione in componenti che rappresentano pezzi dell'interfaccia. Avrai componenti grandi che rappresentano pagine intere come HomePage, SearchPage, ContentDetailPage, ProfilePage. E avrai componenti più piccoli e riutilizzabili come ContentCard che mostra un film in una card, ReviewCard che mostra una recensione, Header per la barra di navigazione in alto, Footer per il piè di pagina. Ogni componente sarà in un file separato, così il codice rimane ordinato.

Un componente React è una funzione che restituisce del codice simile a HTML ma che si chiama JSX. All'interno del componente puoi usare JavaScript per gestire logica e dati. Per esempio, un componente ContentCard potrebbe ricevere come prop le informazioni di un film e mostrarle in una bella card con l'immagine della locandina, il titolo e il rating.

### Gestione dello Stato

React ti permette di creare stato all'interno dei componenti usando l'hook useState. Lo stato è una variabile che quando cambia fa sì che React riaggiorni automaticamente l'interfaccia. Per esempio, in una pagina di ricerca potresti avere uno stato per la keyword di ricerca, uno stato per i filtri applicati, uno stato per i risultati ottenuti dal server, e uno stato per indicare se i dati stanno caricando.

Per lo stato che deve essere accessibile da molti componenti diversi, come le informazioni dell'utente loggato, userai Context API di React. Creerai un AuthContext che mantiene lo stato dell'utente e del token JWT, e fornisce funzioni per fare login e logout. Qualsiasi componente nell'applicazione può accedere a questo contesto per sapere se c'è un utente loggato e chi è.

### Navigazione con React Router

Userai React Router per gestire la navigazione tra le diverse pagine senza ricaricare il browser. Definirai tutte le route della tua applicazione in un posto centrale. Ogni route associa un path URL a un componente da mostrare. Per esempio, la route slash mostra HomePage, la route slash search mostra SearchPage, la route slash content slash due punti slug mostra ContentDetailPage. Il due punti slug è un parametro dinamico, quindi ogni film avrà un URL diverso come slash content slash il-padrino.

Per navigare tra le pagine, invece di usare normali tag a href che ricaricherebbero la pagina, userai il componente Link di React Router. Quando l'utente clicca un Link, React Router cambia solo la parte dell'interfaccia che è diversa senza ricaricare nulla, creando un'esperienza molto fluida.

Alcune route richiederanno che l'utente sia autenticato. Per proteggerle creerai un componente PrivateRoute che controlla se c'è un utente loggato, e se non c'è redirige automaticamente alla pagina di login.

### Chiamare l'API

Per comunicare con il tuo backend, farai richieste HTTP dalla tua applicazione React. Il modo più semplice per farlo è con la funzione fetch che è nativa in JavaScript. Quando vuoi ottenere dati dal server, chiamerai fetch passandogli l'URL dell'endpoint. Per esempio, per ottenere la lista di contenuti faresti fetch verso http due punti slash slash localhost due punti tremila slash contents. Fetch restituisce una Promise, quindi dovrai gestirla.

Ecco un esempio semplificato senza usare async e await. Diciamo che hai un componente che deve caricare la lista di contenuti quando viene montato. Nel tuo componente userai l'hook useEffect che ti permette di eseguire codice quando il componente appare sulla pagina. All'interno di useEffect chiamerai fetch. Quando fetch finisce di recuperare i dati, chiamerai il metodo .then sulla Promise per ottenere la risposta. Poi chiamerai response.json per estrarre i dati JSON dalla risposta, e questo restituisce un'altra Promise. Chiamerai .then di nuovo per ottenere i dati effettivi, e a quel punto li salverai nello stato del componente con setState. Se qualcosa va storto, gestirai l'errore con .catch.

Se devi inviare dati al server, per esempio per creare una recensione, userai fetch con il metodo POST. Passerai un oggetto di configurazione come secondo parametro a fetch, specificando il method come POST, gli headers per dire che stai inviando JSON, e il body con i dati convertiti in stringa JSON usando JSON.stringify.

Se l'endpoint richiede autenticazione, dovrai includere il token JWT nell'header della richiesta. Prima recupererai il token dal local storage, poi lo aggiungerai agli headers della richiesta come Authorization due punti Bearer spazio il token.

### Le Pagine Principali

Vediamo in dettaglio cosa conterranno le pagine più importanti della tua applicazione.

La Homepage sarà la prima impressione che gli utenti hanno della tua piattaforma. In alto ci sarà una hero section con un'immagine di sfondo a tema cinematografico, magari una foto di una sala cinematografica o un montaggio di locandine famose. Sopra l'immagine ci sarà il logo di CineCircle e un titolo accattivante che spiega cos'è la piattaforma, tipo "Il tuo diario cinematografico digitale". Sotto la hero section avrai diverse sezioni. La prima mostrerà i contenuti più popolari della settimana, quindi i film e le serie che sono stati aggiunti più volte alle collezioni negli ultimi giorni. Userai un componente griglia con le card dei contenuti. La seconda sezione mostrerà i contenuti meglio recensiti, quindi quelli con il rating medio più alto. Una terza sezione potrebbe mostrare gli ultimi arrivi, cioè i contenuti più recentemente aggiunti alla piattaforma. Se hai implementato i contenuti in evidenza come milestone extra, ci sarà anche una sezione dedicata con uno slider o carosello. Per caricare tutti questi dati farai diverse chiamate API quando il componente HomePage viene montato.

La pagina di ricerca è il cuore dell'esplorazione. In alto avrai una barra di ricerca grande e ben visibile. Mentre l'utente digita, lo stato della keyword si aggiorna. Quando l'utente finisce di digitare o preme invio, farai una chiamata all'API con la keyword per ottenere i risultati. Accanto alla barra di ricerca ci saranno dei controlli per ordinare i risultati. Potresti usare un menu a tendina o dei pulsanti che permettono di scegliere tra ordinamento per nome, anno o rating. Quando l'utente cambia l'ordinamento, aggiornerai lo stato e farai una nuova chiamata API con il parametro sort appropriato. Se hai implementato i filtri avanzati, ci sarà una sezione laterale o un pannello espandibile con tutti i filtri disponibili. Ogni volta che l'utente modifica un filtro, aggiornerai lo stato e farai una nuova ricerca. I risultati verranno mostrati in una griglia di ContentCard. Se hai implementato la doppia visualizzazione, ci sarà un toggle in alto che permette di passare dalla vista griglia alla vista lista. Quando l'utente clicca questo toggle, cambierai uno stato che indica la modalità di visualizzazione corrente, e i componenti si riorganizzeranno di conseguenza. Se hai implementato la paginazione, in fondo alla pagina ci saranno i controlli per cambiare pagina. Quando l'utente clicca su una pagina diversa, aggiornerai lo stato della pagina corrente e farai una nuova chiamata API con il parametro page giusto. Molto importante, ogni volta che cambi ricerca, filtri, ordinamento o pagina, devi anche aggiornare l'URL usando i query parameters. React Router ti permette di farlo facilmente, e questo garantisce che l'URL sia sempre condivisibile e che se l'utente fa refresh rimane sulla stessa ricerca.

La pagina di dettaglio di un contenuto mostra tutte le informazioni su un film o serie TV specifica. Il componente leggerà lo slug dall'URL usando i parametri di React Router. Quando il componente viene montato, farà una chiamata API a GET slash contents slash slug per ottenere tutti i dati. Mentre i dati caricano, mostrerai un loading indicator tipo uno spinner o skeleton screen. Quando i dati arrivano, li salverai nello stato e li mostrerai. Il layout della pagina avrà la locandina grande sulla sinistra, e sulla destra tutte le informazioni testuali organizzate in sezioni chiare. Il titolo sarà grande e prominente, sotto ci sarà l'anno, la durata e i generi mostrati come piccoli badge colorati. Più sotto il regista e il cast, e poi la trama completa. In una posizione ben visibile mostrerai il rating medio con delle stelle o un numero grande, insieme al numero totale di recensioni ricevute. Se l'utente è loggato, vedrai dei pulsanti per interagire. Un pulsante per aggiungere il contenuto alla collezione che quando cliccato apre un piccolo menu dropdown dove l'utente può scegliere lo stato. Quando sceglie uno stato, farai una chiamata POST all'API per salvare questa informazione. Un altro pulsante permetterà di scrivere o modificare la recensione, aprendo un modal o portando a una sezione della pagina dove c'è un form. Sotto le informazioni principali ci sarà la sezione delle recensioni esistenti. Ogni recensione sarà mostrata in una ReviewCard con il nome dell'utente che l'ha scritta, il suo rating con le stelle, il testo della recensione e quando è stata pubblicata. Se è la recensione dell'utente loggato, mostrerà anche pulsanti per modificarla o eliminarla. Se hai implementato i contenuti correlati, in fondo alla pagina ci sarà una sezione che mostra altri film simili, caricati sempre dall'API, in una riga orizzontale scrollabile.

Il profilo utente avrà diverse sezioni accessibili tramite tab o navigazione interna. La prima sezione mostra una panoramica con l'immagine profilo, lo username, la bio se presente, e alcune statistiche chiave come numero di contenuti visti e recensioni scritte. La sezione collezione mostrerà tutti i contenuti che l'utente ha aggiunto organizzati per stato. Potresti avere dei tab per passare tra "Visti", "Voglio vedere" e "Sto guardando". Ogni stato mostrerà una griglia di ContentCard. La sezione liste mostrerà tutte le liste create dall'utente, ognuna come una card con il nome della lista e le prime locandine dei contenuti che contiene. La sezione recensioni mostrerà tutte le ReviewCard delle recensioni scritte dall'utente in ordine cronologico. Se hai implementato le statistiche dettagliate, ci sarà una sezione dedicata con grafici interattivi. Se stai visitando il profilo di un altro utente e hai implementato il sistema di follow, vedrai un pulsante in alto per seguirlo o smettere di seguirlo, che farà chiamate POST o DELETE all'API appropriata.

### Form e Validazione

I form come registrazione, login e scrittura recensioni saranno componenti React controllati. Questo significa che ogni input del form avrà il suo valore collegato allo stato del componente. Quando l'utente digita, un handler onChange aggiornerà lo stato. Quando l'utente sottomette il form, un handler onSubmit verrà chiamato. In questo handler farai la validazione dei dati. Controllerai che tutti i campi obbligatori siano compilati, che le email siano nel formato giusto, che le password rispettino i requisiti. Se c'è un errore, aggiornerai uno stato che contiene i messaggi di errore e li mostrerai sotto i campi appropriati con testo rosso. Se tutto è valido, farai la chiamata API per inviare i dati al server. Se il server risponde con successo, mostrerai un messaggio positivo o naviderai a un'altra pagina. Se il server risponde con un errore, mostrerai il messaggio di errore ricevuto.

### Stile e Responsività

Userai Bootstrap come framework CSS base. Includerai Bootstrap nel tuo progetto tramite CDN mettendo il link nel file HTML principale. Bootstrap ti fornisce una griglia responsive basata su dodici colonne e molti componenti pre-stilizzati come bottoni, card, navbar e form. Quando crei un layout, userai le classi di Bootstrap come container, row e col per strutturare la pagina. Le classi col hanno modificatori per diverse dimensioni di schermo come col-md-sei che significa che su schermi medi quella colonna occupa sei delle dodici colonne disponibili.

Oltre a Bootstrap, scriverai CSS custom per personalizzare l'aspetto e dare alla tua app un'identità unica. Creerai un file style.css dove definirai il tuo color scheme, la tipografia personalizzata da Google Fonts, e gli stili per i tuoi componenti specifici. Userai transizioni CSS per rendere le interazioni fluide, per esempio quando l'utente passa il mouse su una card potresti farla sollevare leggermente con un'ombra più pronunciata usando transition su transform e box-shadow.

Per le icone userai Font Awesome che è una libreria di icone vettoriali. La includerai via CDN e poi potrai usare le icone mettendo tag i con le classi appropriate, per esempio i class equal fas fa-star per una stella piena.

# Palette di colori

La Palette "Cinema Dark"

    Sfondo Principale (Deep Dark): #141414 (Un nero non assoluto, tipico dello streaming).

    Superfici/Card (Dark Grey): #1F1F1F (Per distinguere le card dallo sfondo).

    Colore Primario (Brand Red): #E50914 (Un rosso vibrante per i bottoni importanti e il logo, crea urgenza e passione).

    Testo Principale: #FFFFFF (Bianco puro per massima leggibilità).

    Testo Secondario: #B3B3B3 (Grigio chiaro per info meno importanti come date o generi).

    Accento (Gold): #FFD700 (Oro, specifico per le stelle e i voti).

### Loading States e Feedback

Ogni volta che fai una chiamata API, dovrai gestire tre stati: caricamento, successo ed errore. Creerai uno stato loading booleano che parte come false. Quando inizi la chiamata lo imposti a true. Quando la chiamata finisce, lo rimetti a false. Mentre loading è true, mostrerai un indicatore visivo. Potrebbe essere uno spinner animato, o skeleton screens che sono placeholder con l'aspetto degli elementi finali ma in grigio con un effetto shimmer. Gli skeleton sono ottimi perché danno all'utente un'idea di cosa sta per apparire senza creare ansia. Se la chiamata ha successo, salverai i dati nello stato e li mostrerai. Se fallisce, salverai l'errore in uno stato e mostrerai un messaggio chiaro all'utente, magari con un banner rosso in alto o un alert di Bootstrap.

## Sicurezza e Validazione

La sicurezza deve essere una priorità in ogni fase dello sviluppo. Anche se stai costruendo un progetto per imparare, è importante implementare le pratiche corrette fin dall'inizio così diventano abituali.

### Password Hashing

Mai e poi mai salvare password in chiaro nel database. Userai la libreria bcrypt che installi con npm. Quando un utente si registra, prima di salvare la password la passerai attraverso bcrypt.hash che prende la password e un salt factor, tipo dodici, e restituisce un hash. Questo hash è una stringa lunga e apparentemente casuale che non può essere decifrata per ottenere la password originale. Salverai questo hash nel database. Quando l'utente fa login, userai bcrypt.compare per confrontare la password inserita con l'hash salvato. Questa funzione applica lo stesso processo di hashing e vede se il risultato corrisponde, senza mai decriptare l'hash originale.
