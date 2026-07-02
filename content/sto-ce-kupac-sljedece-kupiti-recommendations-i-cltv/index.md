---
title: Što će kupac sljedeće kupiti — recommendations i CLTV
description: Preporuke nisu red proizvoda ispod košarice. Dobar sustav procjenjuje sljedeću kupnju, mjeri Recall@K i provjerava stvara li inkrementalnu doprinosnu maržu i CLTV.
type: blog-post
nav: false
date: 2025-12-11
updated: 2025-12-11
author: Goran Peremin
tags: ecommerce, recommendation systems, cltv, retention, machine learning, analytics
sourceURL: https://www.peremin.com/sto-ce-kupac-sljedece-kupiti-recommendations-i-cltv/
---

Većina preporuka u web shopu nije preporuka.

To je polica s naslovom “Moglo bi vas zanimati” na kojoj završavaju proizvodi s najvećom zalihom, najvećom maržom ili najglasnijim category managerom. Ponekad pogodi. I pokvareni sat ponekad pokaže točno vrijeme, ali ga ne bih spojio na naplatu.

Ozbiljnije pitanje glasi:

**Koji će proizvod ovaj kupac najvjerojatnije kupiti sljedeći, u kojem vremenskom prozoru i s kakvim učinkom na doprinosnu maržu?**

Tu recommendations prestaju biti dekoracija, a CLTV prestaje biti naljepnica na segmentu “VIP”.

## Što podaci stvarno trebaju sadržavati

[Instacart Online Grocery Shopping Dataset](https://tech.instacart.com/3-million-instacart-orders-open-sourced-d40d29ead6f2) sadrži više od 3 milijuna narudžbi preko 200.000 anonimnih korisnika. Za svakog korisnika objavljeno je između 4 i 100 narudžbi, redoslijed proizvoda, dan i sat kupnje te relativno vrijeme između narudžbi.

Instacart je dataset izričito objavio za probleme poput predviđanja ponovne kupnje, prve kupnje i sljedećeg proizvoda dodanog u košaricu. U tekstu također navodi da je na sličnim produkcijskim podacima koristio XGBoost, word2vec i Annoy za “buy again” sortiranje i preporuke.

Za osnovni model dovoljna je ova struktura:

| stupac | što iz njega učimo |
|---|---|
| `user_id` | čija je povijest kupnje |
| `order_id` | kojoj narudžbi događaj pripada |
| `order_number` | redoslijed narudžbi korisnika |
| `order_dow` | dan u tjednu |
| `order_hour_of_day` | sat narudžbe |
| `days_since_prior_order` | razmak od prethodne kupnje |
| `product_id` | kupljeni proizvod |
| `add_to_cart_order` | pozicija dodavanja u košaricu |
| `reordered` | je li proizvod već bio kupljen |
| `aisle_id`, `department_id` | hijerarhija kategorije |

Vlastiti web shop treba dodati cijenu, COGS, popust, povrat, dostupnost, kanal i vrijeme prikaza preporuke. Bez toga možeš predviđati proizvod, ali teško možeš dokazati vrijednost.

## Sljedeći proizvod je uvjetna vjerojatnost

Za korisnika `u`, proizvod `p` i njegovu povijest `H_u`, model procjenjuje:

$$P(Y_{u,p}=1 \mid H_u)$$

`Y=1` znači da će proizvod biti kupljen u unaprijed definiranom prozoru, primjerice u sljedećoj narudžbi ili unutar 30 dana. `H_u` može sadržavati broj kupnji proizvoda, dane od zadnje kupnje, tipičan razmak ponovne kupnje, kategorije, sat i dan naručivanja.

“Sljedeća narudžba” i “sljedećih 30 dana” nisu ista meta. Prva zanemaruje koliko dugo treba čekati. Druga korisnika bez kupnje nakon 30 dana tretira kao negativan primjer. Model i poslovna odluka moraju koristiti istu definiciju.

Jednostavan baseline ne treba neuronsku mrežu. Za proizvod i segment stanja može se procijeniti:

$$p_h = \frac{n_h}{n_e}$$

`h` je vremenski horizont. “Prihvatljiv slučaj” znači da korisnik ima dovoljno budućeg vremena u podacima da bismo vidjeli ishod. Ako u uzorak ubaciš korisnike promatrane samo dva dana, a meta je kupnja unutar 30 dana, stvorio si lažne negativne primjere.

## Košarica otkriva veze, ali lift čuva obraz

Za proizvode koji se kupuju zajedno mogu se koristiti support, confidence i lift.

$$support(A \cup B)=\frac{N(A \cup B)}{N}$$

$$confidence(A \rightarrow B)=\frac{support(A \cup B)}{support(A)}$$

$$lift(A \rightarrow B)=\frac{confidence(A \rightarrow B)}{support(B)}$$

Ako je lift veći od 1, `B` se pojavljuje uz `A` češće nego što bismo očekivali prema osnovnoj učestalosti proizvoda `B`. To još uvijek nije uzročni učinak preporuke. Možda se proizvodi prirodno kupuju zajedno i bez ikakvog modula.

Zato “kupci koji su kupili A kupili su i B” nije dokaz da će prikazivanje B povećati prodaju. To je kandidat za test.

## Model mora pogoditi listu, ne samo jedan proizvod

Web shop obično prikazuje `K` preporuka. Recall@K mjeri koliko smo stvarno kupljenih proizvoda uspjeli staviti u tih `K` mjesta:

$$Recall_K = \frac{h_K}{r}$$

`hK` je broj pogođenih proizvoda među prvih `K` preporuka, a `r` broj proizvoda koje je korisnik stvarno kupio u ciljnom prozoru.

Precision@K okreće nazivnik:

$$Precision_K = \frac{h_K}{K}$$

Recall nagrađuje pokrivanje stvarnih kupnji. Precision kažnjava zatrpavanje korisnika kandidatima. Ako korisnik kupi dva proizvoda, a model među prvih pet pogodi jedan, `Recall@5 = 1/2`, a `Precision@5 = 1/5`.

Podjelu za trening i test treba napraviti po vremenu. Model trenira na prošlosti i predviđa budućnost. Nasumično miješanje redaka može pustiti kasniju narudžbu istog korisnika u trening dok raniju pokušavamo predvidjeti. To nije predikcija. To je curenje s boljim marketingom.

## CLTV je buduća marža, ne povijesni promet

Za konačni horizont `H`, očekivani CLTV može se zapisati kao diskontirana očekivana doprinosna marža umanjena za trošak korisnika:

$$CLTV_H(u)=\sum_{t=1}^{H}\frac{E[M_{u,t}]}{(1+r)^t}-E[C_u]$$

`M_{u,t}` je doprinosna marža korisnika u razdoblju `t`, `r` diskontna stopa po razdoblju, a `C_u` očekivani budući trošak zadržavanja i posluživanja. Horizont, stopa i uključeni troškovi moraju biti navedeni.

Ovo je definicija financijskog cilja, ne tvrdnja da možemo savršeno vidjeti budućnost. Za kupce bez ugovornog churn događaja treba procijeniti hoće li ostati aktivni, koliko će transakcija napraviti i koliku će vrijednost imati transakcija. Pareto/NBD i srodni modeli jedan su provjeren pristup za broj budućih transakcija, ali nisu obavezni za prvi korak.

Najjednostavniji pošteni početak je ostvarena doprinosna marža u 90, 180 i 365 dana po akvizicijskoj kohorti.

:::chart
type: line
title: Kumulativna marža po korisniku — primjer A/B mjerenja preporuka
labels: 1 mjesec, 3 mjeseca, 6 mjeseci, 12 mjeseci
series.Kontrola (€): 12, 32, 54, 86
series.Preporuke (€): 12.5, 34, 61, 102
:::

Vrijednosti su radni primjer, ne Instacartov rezultat. Graf namjerno prati kumulativnu doprinosnu maržu, a ne klikove na preporuke. U ovom primjeru razlika nakon 12 mjeseci iznosi 16 eura po korisniku. Tek randomizacija može podržati tvrdnju da su preporuke uzrokovale razliku.

## Offline pobjeda može biti online poraz

Model s boljim Recall@K može u produkciji zaraditi manje. Može preporučivati proizvode koji su već na korisnikovom popisu, proizvode bez zalihe ili artikle s niskom maržom i visokom stopom povrata.

Zato online test treba imati barem tri sloja mjerenja: ponašanje, narudžbu i ekonomiku. Klik na preporuku je dijagnostika. Inkrementalna kupnja i marža su ishod.

Tretman vidi personalizirane preporuke. Kontrola vidi postojeći modul ili ništa, ovisno o pitanju koje testiramo. Primarni KPI može biti doprinosna marža po korisniku kroz 30 ili 90 dana. Guardrail metrike uključuju povrate, otkazivanja, vrijeme učitavanja i udio proizvoda bez zalihe.

Ako istog korisnika prebacuješ između varijanti pri svakom posjetu, tretmani se miješaju. Randomizacija po korisniku obično je čišća za dugoročan CLTV test.

## Sustav koji bih stvarno napravio

Počeo bih s tri kandidata: proizvodi za ponovnu kupnju, proizvodi koji se često kupuju uz trenutačnu košaricu i popularni proizvodi unutar korisnikove kategorije. Zatim bih uklonio artikle bez zalihe, već kupljene trajne proizvode i ono što nema smisla zbog veličine ili kompatibilnosti.

Tek nakon toga model za rangiranje. Ulazne značajke trebaju imati poslovno značenje: frequency, recency, tipičan interval kupnje, afinitet prema kategoriji, trenutnu košaricu, cijenu i dostupnost. Rezultat modela nije konačni redoslijed ako ignorira maržu i ograničenja.

Ne bih u jedan proizvoljni score zbrojio vjerojatnost kupnje, maržu i popularnost s težinama koje smo izmislili u petak popodne. Ako želimo optimizirati očekivanu kratkoročnu maržu, cilj može biti:

$$E[CM_{u,p}] = P(Y_{u,p}=1 \mid H_u)\times CM_p$$

To je jasno, ali i dalje pretpostavlja da prikaz preporuke ne mijenja druge kupnje. Za stvarni inkrementalni učinak treba eksperiment ili causal model.

Preporuka je dobra tek kada pogodi relevantan proizvod, stigne u pravo vrijeme, ne pojede postojeću kupnju i ostavi više buduće marže nego kontrola.

Sve ostalo je samo još jedna polica.

## Izvori i provjera

- [Instacart Engineering — 3 Million Instacart Orders, Open Sourced](https://tech.instacart.com/3-million-instacart-orders-open-sourced-d40d29ead6f2)
- [Fader, Hardie i Lee — RFM and CLV: Using Iso-value Curves](https://www.brucehardie.com/papers/rfm_clv_2005-02-16.pdf)
- [Google Research — A Deep Probabilistic Model for Customer Lifetime Value Prediction](https://research.google/pubs/a-deep-probabilistic-model-for-customer-lifetime-value-prediction/)
