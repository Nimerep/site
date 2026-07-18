---
title: GDPR za web shop: Napredna checklista za Hrvatsku
description: GDPR vodič za hrvatske web shopove prema GDPR-u, AZOP-u, ZEK-u te zakonima o zaštiti potrošača, radu i zaštiti na radu.
type: blog-post
nav: false
date: 2026-06-18
updated: 2026-07-18
author: Goran Peremin
tags: gdpr, ecommerce, privacy, compliance, webshop, cookies, data security
sourceURL: https://www.peremin.com/gdpr-checklista-za-e-commerce-bez-gluposti-samo-ono-sto-ti-zapravo-treba/
image: /media/posts/seo-covers/gdpr-webshop.webp
---

Ako vodiš webshop, obrađuješ osobne podatke.

Ime, adresa, e-mail, broj telefona, IP adresa, sadržaj košarice, povijest kupnji, reklamacije, klikovi, uređaj, lokacija, newsletter i remarketing publike — sve su to podaci koji mogu biti povezani s konkretnom osobom.

A ako obrađuješ osobne podatke, GDPR nije dokument koji jednom spremiš u footer i više ga nikada ne otvoriš.

To je sustav pravila, procedura i tehničkih kontrola.

Cookie banner sam po sebi ne znači da si usklađen. Politika privatnosti generirana u tri minute ne znači da znaš gdje su podaci kupaca. Checkbox pored newslettera ne rješava podatke koje Meta Pixel možda već šalje prije privole.

Ovaj vodič zato ne završava na pitanju imaš li politiku privatnosti.

Pitanje je možeš li dokazati:

- koje podatke prikupljaš
- zašto ih prikupljaš
- gdje se nalaze
- tko ih dobiva
- koliko ih čuvaš
- kako ih štitiš
- kako ih brišeš
- što radiš kada korisnik zatraži pristup
- što radiš kada podaci završe kod osobe koja ih nije smjela dobiti

> Ovaj članak služi kao praktičan operativni vodič. Nije zamjena za individualni pravni savjet, posebno kod složenog profiliranja, posebnih kategorija podataka, obrade dječjih podataka ili međunarodnih prijenosa.

## Koji se propisi primjenjuju u Hrvatskoj?

GDPR nije jedini propis koji hrvatski web shop treba otvoriti prije nego što napiše politiku, postavi kameru ili uključi newsletter automatizaciju. Ovaj vodič, ažuriran 18. srpnja 2026., oslanja se na sljedeći okvir:

| Propis | Što uređuje | Posebno važni članci |
|---|---|---|
| [Opća uredba o zaštiti podataka — GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=HR) | načela, pravne osnove, transparentnost, prava, sigurnost i nadzor | 5., 6., 7., 12.–14., 15.–22., 25., 28., 30., 32.–35. |
| [Zakon o provedbi Opće uredbe o zaštiti podataka, NN 42/18](https://narodne-novine.nn.hr/clanci/sluzbeni/2018_05_42_805.html) | ovlasti AZOP-a te hrvatska pravila za biometriju i videonadzor | 22.–24. i 25.–31. |
| [Zakon o elektroničkim komunikacijama, NN 76/22, 14/24 i 45/26](https://narodne-novine.nn.hr/clanci/sluzbeni/full/2022_07_76_1116.html) | kolačići i neželjene elektroničke komunikacije | 43. stavak 4. i 50. |
| [Zakon o zaštiti potrošača, NN 19/22, 59/23 i 59/26](https://narodne-novine.nn.hr/clanci/sluzbeni/2026_06_59_728.html) | obavijesti kupcu, prigovori i ugovori na daljinu | 10., 60. i 79. |
| [Zakon o radu, NN 93/14, 127/17, 98/19 i 151/22](https://narodne-novine.nn.hr/clanci/sluzbeni/2014_07_93_1872.html) | privatnost i osobni podaci radnika | 29. |
| [Zakon o zaštiti na radu, NN 71/14 s izmjenama](https://narodne-novine.nn.hr/clanci/sluzbeni/2014_06_71_1334.html) | nadzorni uređaji kao sredstvo zaštite na radu | 43. |

To nisu sinonimi. GDPR uređuje obradu osobnih podataka. Zakon o zaštiti potrošača uređuje odnos trgovca i kupca. Zakon o radu i Zakon o zaštiti na radu dodaju posebna pravila kada obrađuješ podatke zaposlenika. Jedan footer link ne rješava pet propisa. Bio bi to impresivan link, ali ipak samo link.

## Koliko GDPR pogreška stvarno košta?

Kazna nije automatska za svaki propust, a njezina visina ovisi o nizu okolnosti: težini i trajanju povrede, broju pogođenih osoba, vrsti podataka, suradnji s nadzornim tijelom, ranijim povredama i prometu poduzetnika.

Ali kazne nisu teorija. Evo nekoliko konkretnih odluka i lekcija koje su relevantne za digitalno poslovanje.

### Hrvatska: 20.000 i 30.000 eura zbog kolačića bez pravne osnove

AZOP je dvama trgovačkim društvima za kockanje i klađenje izrekao kazne od **20.000 i 30.000 eura**. Među utvrđenim povredama bila je obrada osobnih podataka putem kolačića bez dokazane pravne osnove.

**Lekcija za webshop:** banner nije zaštita ako se tracking pokrene prije izbora korisnika ili ako ne možeš dokazati pravnu osnovu obrade. [Odluka AZOP-a](https://azop.hr/upravne-novcane-kazne-zbog-neovlastene-obrade-osobnih-podataka-putem-kolacica/)

### Hrvatska: 80.000 eura zbog korištenja podataka za drugu svrhu

Trgovačko društvo koristilo je pristup podacima vlasnika vozila koji je dobilo za jednu svrhu kako bi podatke obrađivalo i za naplatu parkiranja drugih subjekata. AZOP je utvrdio probleme s pravnom osnovom, ograničenjem svrhe, odnosom voditelja i izvršitelja te sigurnosnim mjerama. Izrečena je kazna od **80.000 eura**.

**Lekcija za webshop:** podatak koji već posjeduješ ne smiješ automatski koristiti za novu svrhu. Pristup podacima, svrha i ugovorne uloge moraju biti stvarno uređeni. [Objava AZOP-a](https://azop.hr/sedam-novih-upravnih-novcanih-kazni-u-iznosu-od-169-000-eura/)

### Hrvatska: 380.000 eura zbog preslika bankovnih kartica

Sportskoj kladionici izrečena je kazna od **380.000 eura** zbog obrade preslika bankovnih kartica bez dokazane pravne osnove, nedovoljne transparentnosti te neodgovarajuće primjene zaštite podataka već pri dizajnu novog procesa brze isplate.

**Lekcija za webshop:** “trebat će nam možda kasnije” nije svrha obrade. Financijski podaci ne prikupljaju se zato što ih tehnički možeš zatražiti. Novi checkout ili payment proces mora proći privacy-by-design provjeru prije produkcije. [Odluka AZOP-a](https://azop.hr/sportskoj-kladionici-izrecena-upravna-novcana-kazna-od-380-000-eura/)

### Europska unija: 150.000 eura za netransparentan webshop

Latvijsko nadzorno tijelo kaznilo je online trgovca s **150.000 eura**. Webshop korisniku prije narudžbe nije jasno predstavio identitet voditelja obrade, a politika privatnosti nije pravilno objašnjavala pravne osnove, svrhe i način prikupljanja privole.

**Lekcija za webshop:** generička politika privatnosti nije dovoljna. Korisnik mora moći razumjeti tko obrađuje podatke, zašto i na kojoj osnovi prije nego što ih preda. [Sažetak odluke EDPB-a](https://www.edpb.europa.eu/sites/default/files/article-60-final-decisions/summary/publishable_lv_2020-01_transparency_and_information_summarypublic.pdf)

### Europska unija: 1,2 milijarde eura zbog prijenosa podataka u SAD

Irsko nadzorno tijelo izreklo je Meta Platforms Ireland kaznu od **1,2 milijarde eura** zbog nastavka prijenosa osobnih podataka iz EU/EGP-a u SAD bez zaštitnih mjera koje bi riješile utvrđene rizike za prava ispitanika.

**Lekcija za webshop:** potpisani SCC nije čarobni papir. Moraš znati kamo dobavljač šalje podatke, tko im može pristupiti i jesu li ugovorne, tehničke i organizacijske mjere stvarno dovoljne. [Odluka irskog DPC-a](https://dataprotection.ie/en/dpc-guidance/decisions/inquiry-concerning-data-transfers-eueea-us-meta-platforms-ireland-limited-its-facebook-service)

Poanta nije da će mali webshop sutra dobiti milijardu eura kazne. Poanta je da se u odlukama stalno ponavljaju isti problemi: nejasna svrha, pogrešna pravna osnova, prekomjerno prikupljanje, loša transparentnost, nekontrolirani dobavljači i sigurnost koja postoji samo u politici.

## Brzi test: je li tvoj webshop u problemu?

Odgovori s “da” ili “ne”:

- Pokreće li se Google Analytics prije nego što korisnik prihvati analitičke kolačiće?
- Pokreće li se Meta Pixel prije marketinške privole?
- Imaš li samo gumb “Prihvati”, bez jednako dostupnog odbijanja?
- Je li marketinški checkbox unaprijed označen?
- Mora li korisnik prihvatiti newsletter da bi završio kupnju?
- Čuvaš li napuštene košarice bez definiranog roka?
- Ne znaš koje podizvršitelje koriste CRM, hosting ili newsletter alat?
- Ne znaš obrađuju li se podaci izvan Europskog gospodarskog prostora?
- Svi administratori koriste isti korisnički račun?
- Nemaš MFA za administraciju webshopa?
- CSV datoteke s kupcima šalju se e-mailom?
- Ne postoji evidencija zahtjeva za brisanje i pristup podacima?
- Ne postoji interni registar sigurnosnih incidenata?
- Koristiš AI chatbot s podacima narudžbi, ali to nije navedeno ni u jednoj evidenciji?

Ako imaš više pozitivnih odgovora, problem nije samo tekst politike privatnosti. Problem je što nemaš potpunu kontrolu nad životnim ciklusom podataka.

## 1. Napravi mapu podataka

Prije pisanja politika moraš znati što se stvarno događa. Nemoj početi s dokumentom. Počni s tokom podataka.

| Faza | Podaci | Svrha | Moguća pravna osnova | Primatelji |
|---|---|---|---|---|
| Pregledavanje | IP, uređaj, sigurnosni logovi | sigurnost i dostupnost | legitimni interes | hosting, CDN, sigurnosni alat |
| Analitika | identifikatori, događaji, izvor dolaska | mjerenje korištenja | najčešće privola za nenužne tehnologije | analytics platforma |
| Košarica | session ID, odabrani proizvodi | spremanje košarice | ugovor ili radnje prije ugovora | eCommerce platforma |
| Checkout | ime, kontakt, adresa | obrada narudžbe | ugovor | ERP, dostavljač |
| Plaćanje | status i identifikator transakcije | naplata | ugovor i zakonske obveze | payment provider |
| Račun | identitet, iznos, porezni podaci | računovodstvo | zakonska obveza | računovodstvo |
| Podrška | poruke, reklamacije, narudžbe | rješavanje zahtjeva | ugovor, zakon ili legitimni interes | helpdesk |
| Newsletter | e-mail, status privole | izravni marketing | privola ili strogo određena iznimka | e-mail platforma |
| Personalizacija | pregledi, kupnje, segmenti | preporuke i ponude | ovisi o načinu obrade | CRM, recommendation sustav |
| Sprečavanje prijevara | IP, uređaj, ponašanje, rezultat procjene | antifraud | mogući legitimni interes | antifraud pružatelj |

Za svaku obradu zabilježi kategorije osoba i podataka, svrhu, pravnu osnovu, sustave, primatelje, države obrade, rok čuvanja, način brisanja, sigurnosne mjere i odgovornu osobu.

Ako ne znaš gdje se podaci nalaze, ne možeš ih zaštititi, pronaći ni izbrisati.

## 2. Ne biraj pravnu osnovu kao artikl s police

Za svaku svrhu mora postojati odgovarajuća pravna osnova iz **članka 6. stavka 1. GDPR-a**. GDPR poznaje privolu, ugovor, zakonsku obvezu, životno važne interese, javni interes i legitimni interes.

Webshop ne treba privolu za svaku obradu. Za adresu potrebnu za dostavu osnova je obično ugovor. Za čuvanje računa može biti zakonska obveza. Za sigurnosne logove i sprečavanje prijevara može se razmatrati legitimni interes, ali tek nakon testa nužnosti i ravnoteže interesa.

Legitimni interes nije naljepnica koju zalijepiš na sve za što ne želiš tražiti privolu. AZOP izričito upozorava da svaki izravni marketing nije automatski dopušten samo zato što postoji poslovni interes. [AZOP preporuka](https://azop.hr/preporuka-za-provedbu-testa-legitimnog-interesa-prema-clanku-6-stavku-1-tocki-f-opce-uredbe-o-zastiti-podataka/)

## 3. Politika privatnosti mora opisivati stvarni webshop

Politika mora objasniti voditelja obrade, kontakte, DPO-a ako postoji, podatke, izvore, svrhe, pravne osnove, konkretne legitimne interese, primatelje, međunarodne prijenose, rokove, prava, pritužbu AZOP-u, obveznost davanja podataka te automatizirano odlučivanje i profiliranje.

Informacije moraju biti sažete, transparentne, razumljive i lako dostupne prema **članku 12. GDPR-a**. Ako podatke prikupljaš od osobe, primjenjuje se **članak 13.** Ako ih dobivaš iz drugog izvora, primjenjuje se **članak 14. GDPR-a** i trebaš navesti izvor podataka. [Službeni hrvatski tekst GDPR-a](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=HR)

Uz mjesto prikupljanja koristi kratku slojevitu obavijest, primjerice:

> E-mail koristimo za potvrdu i obradu narudžbe. Više informacija o obradi i rokovima čuvanja dostupno je u Politici privatnosti.

Link u footeru je potreban, ali nije dovoljan ako se važna obrada događa već na checkoutu.

## 4. Cookie banner nije ukras

Za spremanje ili pristup podacima na korisnikovu uređaju ključno je pravilo iz **članka 43. stavka 4. Zakona o elektroničkim komunikacijama**. Privola mora zadovoljiti definiciju iz **članka 4. točke 11.** i uvjete iz **članka 7. GDPR-a**, a informacije o obradi **članak 13. GDPR-a**.

Prije privole ne bi se smjeli aktivirati marketinški pikseli, remarketing oznake, nenužna analitika, session recording ni drugi nenužni identifikatori.

Banner na prvom sloju treba nuditi:

- Prihvati sve
- Odbij sve osim nužnih
- Postavke

EDPB smatra problematičnima unaprijed označene opcije, izostanak jasnog odbijanja i dizajn koji korisnika gura prema prihvaćanju. [EDPB Cookie Banner Taskforce](https://www.edpb.europa.eu/documents/task-force-report/report-of-the-work-undertaken-by-the-cookie-banner-taskforce_en)

### Cookie audit

1. Otvori webshop u privatnom prozoru i nemoj kliknuti banner.
2. Pregledaj Cookies, Local Storage i Network.
3. Potraži zahtjeve prema Googleu, Meti, TikToku, Hotjaru i drugim servisima.
4. Klikni “Odbij”, osvježi stranicu i ponovno provjeri.
5. Prihvati samo analitiku i provjeri pokreće li se samo ta kategorija.
6. Povuci privolu i provjeri prestaje li daljnje praćenje.

Ako banner kaže da je marketing odbijen, a Meta Pixel šalje događaj, pravni tekst i tehnička stvarnost nisu na istoj stranici.

Za dokaz privole spremi pseudonimni identifikator, vrijeme, verziju bannera i politike, dopuštene svrhe i vendore te povijest promjena. Privolu mora biti jednako jednostavno povući kao dati.

Detaljan tehnički i pravni postupak nalazi se u vodiču [Kolačići i GDPR u Hrvatskoj: Što web shop mora imati](/kolacici-uskladi-se-s-gdpr-om-i-eprivacy-direktivom/).

## 5. Newsletter: kupnja nije doživotna dozvola

Za izravnu promidžbu e-mailom, SMS-om i MMS-om polazno je pravilo prethodna privola iz **članka 50. stavka 1. Zakona o elektroničkim komunikacijama**.

Za osobu koja nije kupac marketinški newsletter najčešće traži privolu. Ona mora biti dobrovoljna, specifična, informirana, nedvosmislena, dokaziva i odvojena od uvjeta kupnje.

Za postojeće kupce **članak 50. stavak 2. ZEK-a** propisuje ograničenu iznimku samo ako je adresa dobivena u kontekstu prodaje, promoviraju se vlastiti slični proizvodi ili usluge, kupac je pri prikupljanju mogao odbiti marketing i svaka poruka ima jednostavan besplatan prigovor. Kod izravnog marketinga kupac ima bezuvjetno pravo na prigovor prema **članku 21. stavku 2. GDPR-a**. [AZOP-ova preporuka o legitimnom interesu i izravnom marketingu](https://azop.hr/preporuka-za-provedbu-testa-legitimnog-interesa-prema-clanku-6-stavku-1-tocki-f-opce-uredbe-o-zastiti-podataka/)

Spremi tekst i verziju privole, datum, izvor prijave, kontaktni identifikator, status double opt-ina ako se koristi te povijest povlačenja.

## 6. Evidencija aktivnosti obrade

Evidencija nije kopija politike. To je interni dokument s voditeljem i kontaktima, svrhama, kategorijama ispitanika i podataka, primateljima, međunarodnim prijenosima, rokovima i općim opisom sigurnosnih mjera.

Sadržaj evidencije uređuje **članak 30. GDPR-a**. Može biti tablica ili GRC alat; GDPR ne propisuje Excel. Bitno je da je potpuna, ažurirana i povezana sa stvarnim sustavima.

## 7. Definiraj rokove čuvanja

“Čuvamo koliko je potrebno” nije operativan rok.

Načelo ograničenja pohrane nalazi se u **članku 5. stavku 1. točki (e) GDPR-a**. Rok može proizlaziti iz posebnog propisa ili dokumentiranog kriterija, ali mora postojati i tehnički postupak brisanja.

| Kategorija | Početak roka | Rok ili kriterij | Način brisanja |
|---|---|---|---|
| Napuštena košarica | zadnja aktivnost | definirani broj dana | automatsko brisanje |
| Korisnički račun | zadnja aktivnost ili zahtjev | definirani rok | anonimizacija ili brisanje |
| Račun | izdavanje | prema zakonskoj obvezi | nakon isteka obveze |
| Reklamacija | zatvaranje predmeta | prema pravnim rokovima | kontrolirano brisanje |
| Newsletter privola | povlačenje | dokaz privole i prigovora | ograničena evidencija |
| Sigurnosni logovi | nastanak događaja | prema procjeni rizika | automatska rotacija |
| Backup | nastanak kopije | prema backup politici | automatska rotacija |

Ako dokument kaže 30 dana, a baza čuva sedam godina jer nema cleanup procesa, stvarni rok je sedam godina.

## 8. Razlikuj voditelje, izvršitelje i primatelje

Izvršitelj obrađuje podatke prema tvojim uputama. Samostalni voditelj sam određuje svrhe i bitna sredstva. Zajednički voditelji to određuju zajedno.

Dostavljač, payment provider, marketplace ili oglašivačka platforma mogu imati različite uloge. Ulogu ne određuje naslov ugovora nego stvarni odnos. [EDPB vodič](https://www.edpb.europa.eu/sme/learn-the-basics/data-controller-or-data-processor_en)

Za izvršitelje ugovor prema **članku 28. GDPR-a** treba obuhvatiti upute, povjerljivost, sigurnost, podizvršitelje, pomoć kod prava i incidenata, brisanje ili povrat podataka te pravo na informacije i reviziju.

## 9. Provjeri međunarodne prijenose

Prijenose osobnih podataka u treće zemlje uređuju **članci 44.–49. GDPR-a**.

Provjeri obrađuju li se podaci izvan EGP-a, postoji li odluka o primjerenosti, je li američka organizacija aktivni sudionik EU–US Data Privacy Frameworka, koriste li se SCC, treba li procjena prijenosa i dodatne mjere te je li sve opisano u politici i evidenciji.

EU–US DPF ne pokriva automatski svaku američku tvrtku. [Europska komisija o EU–US prijenosima](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-transfers_en)

## 10. Prava korisnika trebaju proceduru

Korisnik može, ovisno o okolnostima, tražiti pristup, ispravak, brisanje, ograničenje, prenosivost, prigovor i zaštitu od određenih isključivo automatiziranih odluka. Ta prava uređuju **članci 15.–22. GDPR-a**, a rok i način komunikacije **članak 12.**

```text
Zahtjev → evidencija → provjera identiteta → pronalazak podataka
→ provjera iznimki → provedba → obavijest primateljima → odgovor
```

Odgovara se u pravilu unutar jednog mjeseca. Kod složenih zahtjeva rok se može produljiti za još dva mjeseca, uz obavijest unutar prvog mjeseca. [EDPB vodič za prava ispitanika](https://www.edpb.europa.eu/sme/be-compliant/respect-individuals-rights_ga)

Za prenosivost koristi strojno čitljiv format poput CSV-a ili JSON-a. PDF sam po sebi nije nužno dovoljan.

## 11. Sigurnost nije samo HTTPS

Webshop treba MFA, zasebne administratorske račune, pristup prema ulozi, redoviti pregled ovlasti, pravodobne zakrpe, zaštitu od brute-force napada, enkripciju, tokenizaciju plaćanja, sigurnosne logove, testirane backup kopije, kontrolu izvoza i provjeru dobavljača.

GDPR traži sigurnost primjerenu riziku i redovito testiranje učinkovitosti mjera. [GDPR, članak 32.](https://eur-lex.europa.eu/legal-content/EN/TXT/?toc=OJ%3AL%3A2016%3A119%3ATOC&uri=uriserv%3AOJ.L_.2016.119.01.0001.01.ENG)

## 12. Napravi plan za povredu podataka

Povreda može biti pogrešno poslan e-mail, javni backup, ukraden račun, izgubljen laptop, ransomware, pogrešna dozvola, neovlašten izvoz baze ili tuđi račun dostupan kroz URL.

Svaka povreda mora biti dokumentirana. Prijavu AZOP-u uređuje **članak 33. GDPR-a**: nadzorno tijelo obavještava se bez nepotrebnog odgađanja i, ako je izvedivo, najkasnije 72 sata nakon saznanja, osim ako nije vjerojatno da će povreda prouzročiti rizik. Obavještavanje pogođenih osoba kod vjerojatnog visokog rizika uređuje **članak 34. GDPR-a**. [EDPB vodič](https://www.edpb.europa.eu/system/files/2025-03/edpb_summary_092022-012021_data_breach_en.pdf)

Registar treba sadržavati vrijeme otkrivanja, pogođene sustave i osobe, kategorije podataka, posljedice, mjere, procjenu rizika, odluku o prijavi i razloge.

## 13. DPIA, profiliranje i AI

DPIA prema **članku 35. GDPR-a** potrebna je kada je vjerojatan visok rizik, primjerice kod opsežnog profiliranja, značajnih automatiziranih odluka, posebnih kategorija podataka, praćenja ranjivih osoba ili kombinacije nove tehnologije s drugim rizičnim kriterijima. Isključivo automatizirane odluke s pravnim ili slično značajnim učinkom dodatno provjeri prema **članku 22. GDPR-a**.

Za recommendation, churn, propensity, antifraud, dinamičke cijene i AI chatbotove zabilježi ulazne podatke, svrhu, pravnu osnovu, dobavljača, lokaciju, koristi li podatke za treniranje, donosi li odluku, postoji li ljudska provjera, kako se rezultat osporava i koliko se podaci čuvaju.

Nemoj u javni AI alat lijepiti ime, adresu, broj narudžbe i cijelu reklamaciju zato što alat brže piše odgovor.

## 14. Privacy by design u checkoutu

Zaštita podataka od dizajna i prema zadanim postavkama obveza je iz **članka 25. GDPR-a**.

- omogući guest checkout
- ne traži datum rođenja, spol ili OIB bez potrebe
- odvoji kupnju od newslettera
- ne koristi unaprijed označene marketinške opcije
- pokaži kratku obavijest uz mjesto prikupljanja
- ograniči podatke koje prima dostavljač
- ne spremaj kartične podatke u webshop
- ograniči izvoz velikih baza
- automatski čisti stare košarice i privremene podatke
- testiraj može li kupac promjenom ID-a u URL-u vidjeti tuđu narudžbu
- ne šalji osobne podatke kroz analytics evente i URL parametre

Najbolja zaštita podataka često je podatak koji nikada nisi prikupio.

## 15. Zaštita potrošača nije isto što i GDPR

Web shop istodobno obrađuje podatke i sklapa ugovor na daljinu. Zato privatnost i zaštita potrošača moraju biti povezane, ali ih nemoj trpati u isti checkbox.

- **Članak 10. Zakona o zaštiti potrošača** uređuje pisani prigovor, obavijest o načinu njegova podnošenja, odgovor u roku od 15 dana i evidenciju prigovora.
- **Članak 60.** propisuje predugovorne obavijesti kod ugovora na daljinu, uključujući identitet trgovca, kontakt, cijenu, plaćanje, isporuku, prigovore i pravo na raskid. Članak je izmijenjen Zakonom iz NN 59/26.
- **Članak 79.** uređuje opće pravo na jednostrani raskid ugovora sklopljenog na daljinu u roku od 14 dana, uz zakonske iznimke.

Ti podaci mogu istodobno biti osobni podaci. Primjerice, reklamaciju čuvaš radi postupanja prema Zakonu o zaštiti potrošača, ali pristup, sigurnost i brisanje i dalje moraš urediti prema GDPR-u. [Zakon o zaštiti potrošača, NN 19/22](https://narodne-novine.nn.hr/clanci/sluzbeni/2022_02_19_203.html) i [izmjene NN 59/26](https://narodne-novine.nn.hr/clanci/sluzbeni/2026_06_59_728.html)

## 16. Podaci radnika i videonadzor skladišta

Ako web shop ima zaposlenike, skladište ili poslovnicu, ulaziš u dodatni pravni sloj.

**Članak 29. Zakona o radu** dopušta prikupljanje i korištenje osobnih podataka radnika samo kada je to određeno zakonom ili potrebno radi prava i obveza iz radnog odnosa. Propisuje i ovlaštene osobe, ispravak netočnih podataka, uklanjanje podataka za koje više nema razloga te povjerljivost.

Kod kamera treba zajedno čitati:

- **članke 25.–30. Zakona o provedbi Opće uredbe**, posebno članak 29. o čuvanju snimki najviše šest mjeseci, osim propisanih iznimki, i članak 30. o videonadzoru radnih prostorija
- **članak 43. Zakona o zaštiti na radu**, koji dopušta nadzorne uređaje radi kontrole ulazaka i izlazaka te smanjenja rizika od razbojstva, provala, nasilja i krađa, zabranjuje ih u prostorijama za osobnu higijenu i presvlačenje te propisuje dodatne uvjete kada su radnici stalno u vidnom polju

Kamera ne smije postati alat za mjerenje tko je tri minute predugo slagao paket. AZOP-ova praksa i propisi traže konkretnu sigurnosnu svrhu, nužnost, unaprijed obaviještene radnike i ograničen pristup snimkama. [AZOP smjernice za radne odnose](https://azop.hr/wp-content/uploads/2023/11/Smjernice_radni-odnosi.pdf)

## Završna checklist

### Dokumentacija

- [ ] Politika privatnosti odgovara stvarnim procesima
- [ ] Evidencija aktivnosti je ažurirana
- [ ] Postoji matrica pravnih osnova
- [ ] Postoji retention schedule
- [ ] Postoji registar dobavljača i podizvršitelja
- [ ] Ugovori prema članku 28. postoje gdje su potrebni
- [ ] Dokumentirani su međunarodni prijenosi
- [ ] Postoje LIA i DPIA screening gdje su potrebni
- [ ] Postupanje s prigovorima kupaca usklađeno je s člankom 10. Zakona o zaštiti potrošača
- [ ] Podaci radnika uređeni su prema članku 29. Zakona o radu
- [ ] Videonadzor je provjeren prema člancima 25.–30. provedbenog zakona i članku 43. Zakona o zaštiti na radu

### Webshop

- [ ] Nenužne tehnologije ne pokreću se prije privole
- [ ] “Odbij” je jednako dostupan kao “Prihvati”
- [ ] Nema unaprijed označenih opcija
- [ ] Privolu je jednostavno povući
- [ ] Checkout prikuplja samo potrebne podatke
- [ ] Newsletter nije uvjet kupnje
- [ ] Odjava stvarno radi
- [ ] URL-ovi i analytics eventi ne otkrivaju osobne podatke

### Sigurnost i prava

- [ ] Administratori imaju zasebne račune i MFA
- [ ] Pristup se dodjeljuje prema ulozi
- [ ] Backup se redovito testira
- [ ] Postoje incident-response plan i registar incidenata
- [ ] Zahtjevi korisnika se evidentiraju
- [ ] Podaci se mogu pronaći u svim sustavima
- [ ] Odgovara se unutar jednog mjeseca
- [ ] Moguće je provesti brisanje, ograničenje i prigovor

## GDPR usklađenost nije dokument. To je sposobnost.

Najvažnije pitanje nije imaš li politiku privatnosti.

Važnije je možeš li, kada kupac pošalje zahtjev, pronaći njegove podatke u webshopu, CRM-u, newsletteru, helpdesku, ERP-u, analitici i backup proceduri.

Možeš li objasniti zašto svaki podatak postoji? Možeš li dokazati privolu? Možeš li zaustaviti marketing? Možeš li obrisati podatke kojima je istekao rok? Možeš li reagirati na incident prije isteka 72 sata?

Ako možeš, onda imaš sustav.

Ako ne možeš, imaš footer link.
