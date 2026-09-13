# Upitnik za odabir webshopa

Upitnik je ugrađen na početak članka `content/kako-pokrenuti-web-shop-u-hrvatskoj/index.md`. Tekst članka nije proširen: dodani su samo metapodaci i sidra za poveznice iz rezultata. Za obveznu naslovnu sliku koristi se postojeća ilustracija ecommerce growth članka.

JavaScript i CSS nalaze se u `content/assets/webshop-selector.js` i `webshop-selector.css`. Postojeći SEO postprocesor uključuje komponentu samo za članak s `webshopSelector: true`. Globalni predložak nije sadržajno promijenjen. Uključivanje je idempotentno i prekida build ako ne pronađe očekivanu strukturu HTML-a.

Šest koraka, odnosno sedam ako treba pitati za tehničko znanje. Budžet ima dva odvojena odgovora. Uži izbor temelji se na fazi poslovanja, odgovornosti za održavanje, znanju, prodajnom procesu, postojećim sustavima, budžetu i prioritetu. Ocjene su urednička pravila, ne tržišno istraživanje niti potvrda kompatibilnosti.

Rezultat daje dvije opcije, prednosti, obveze, izlazak, hosting i organizaciju podrške. Nepoznat budžet, migracija i neprovjerene integracije daju uvjetnu preporuku. Nulti budžet pokreće upozorenje prije usporedbe. Headless se razmatra samo uz poseban proces, visok početni i mjesečni budžet te razvojnu podršku. Sustav ne predstavlja custom razvoj kao sigurniji.

Nema mrežnih poziva, pohrane odgovora, prijave, analitike ni dodatne ovisnosti u produkciji. Ponovno učitavanje briše odgovore. Bez JavaScripta prikazuje se poveznica na usporedbu u članku.

## Provjera

- `node docs/test_webshop_selector.cjs`: 12 scenarija preporuke i validacije.
- `python -B docs/test_webshop_integration.py`: uključivanje i ponovljena obrada HTML-a.
- `node --check content/assets/webshop-selector.js` i `git diff --check`.
- Lokalni pregled testiran Playwrightom u Edgeu na 390 px i 1440 px: obvezni odgovori, grananje, povratak, promjena tima, zadržavanje odgovora, nulti budžet, sidra i ponovno pokretanje. Nema JavaScript pogrešaka niti horizontalnog prelijevanja u testiranom mobilnom prikazu.
- Usporedbom teksta bez metapodataka i sidara potvrđeno je da sadržaj članka odgovara odobrenom nacrtu.

Samostalni HTML pregled koristi postojeći CSS stranice i Markdown prikazan pomoću Markeda. To nije izlaz punog TileDown builda. TileDown nije dostupan u lokalnom Windows okruženju; završni produkcijski build ostaje provjeriti kroz postojeći workflow prije objave. Nije napravljen push ni objava.
