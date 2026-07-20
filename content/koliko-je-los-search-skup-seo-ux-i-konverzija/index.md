---
title: Koliko loša interna tražilica košta web shop?
description: Istraživanje 5.041 eCommerce upita pokazuje kako loš redoslijed skriva točne proizvode i kako njegov stvarni trošak testirati kroz maržu.
type: blog-post
nav: false
date: 2025-06-19
updated: 2026-07-20
author: Goran Peremin
tags: ecommerce, interna tražilica, site search, ux, cro, information retrieval, nDCG, A/B testiranje
sourceURL: https://www.peremin.com/koliko-je-los-search-skup-seo-ux-i-konverzija/
image: /media/posts/seo-covers/ecommerce-search.webp
---

Kupac u internu tražilicu upiše `crne vodootporne tenisice 42`.

Web shop mu prvo pokaže bijele papuče, sprej za impregnaciju i tenisice veličine 39. Točan proizvod postoji, ima ga na zalihi i može se isporučiti. Samo je zakopan dovoljno duboko da ga kupac vjerojatno neće vidjeti.

To nije problem praznog rezultata. Prazan rezultat barem pošteno prizna da sustav nije pronašao ništa. Ovo je podmukliji problem: web shop se pravi da je razumio kupca, a zapravo mu pokazuje krivu policu.

Zato sam krenuo istražiti jedno vrlo praktično pitanje: **koliko štete nastaje kada interni search ima prave proizvode, ali ih posloži krivim redoslijedom?**

Nisam koristio tuđe postotke konverzije ni graf koji izgleda uvjerljivo jer ima plave stupce. Uzeo sam javni skup ručno označenih eCommerce upita, napisao ponovljiv eksperiment i objavio kod i rezultate. Tek nakon toga odvojio sam ono što podaci dokazuju od onoga što se mora potvrditi na stvarnom web shopu.

## Što sam zapravo testirao

Koristio sam Amazon Science [Shopping Queries Dataset](https://github.com/amazon-science/esci-data), poznat kao ESCI. Autori rada navode približno 130 tisuća upita i 2,6 milijuna ručno označenih parova upit–proizvod na engleskom, japanskom i španjolskom jeziku.

Za eksperiment sam uzeo:

- malu službenu verziju skupa podataka
- engleske upite iz testnog dijela
- svih **5.041 upita** koji imaju barem jedan rezultat označen kao Exact i barem jedan kao Irrelevant

Namjerno sam tražio upravo takve upite. Zanimalo me što se događa kada traženi proizvod postoji među kandidatima, ali sustav ga može gurnuti ispod smeća.

Svaki par upita i proizvoda u skupu ima jednu od četiri ručno dodijeljene oznake:

| Oznaka | Što znači |
|---|---|
| Exact (E) | proizvod izravno odgovara upitu |
| Substitute (S) | nije isti, ali može zamijeniti traženi proizvod |
| Complement (C) | nadopunjuje traženi proizvod |
| Irrelevant (I) | ne rješava namjeru upita |

Prema metodologiji ESCI rada koristio sam dobitke `E=1`, `S=0,1`, `C=0,01` i `I=0`.

## Četiri verzije iste police

Nisam uspoređivao četiri komercijalna search alata. To bi bez istog kataloga i istih postavki bio cirkus, ne istraživanje. Napravio sam kontrolirani stres-test: iste kandidate svakog upita presložio sam na četiri načina.

1. **Idealni redoslijed** — Exact ide prvi, zatim Substitute, Complement i Irrelevant.
2. **Jedan nerelevantan prvi** — samo jedan Irrelevant rezultat stavljam na vrh, a ostalo ostaje idealno posloženo.
3. **Nasumični redoslijed** — kandidate miješam 50 puta po upitu i računam prosjek. Seed je `20260720`.
4. **Exact rezultati zadnji** — točne proizvode namjerno guram iza ostalih kandidata.

Ovo nisu četiri realna algoritma. To su četiri laboratorijska scenarija kojima izoliram samo jednu stvar: **redoslijed rezultata**.

## Kako sam mjerio štetu

Glavna metrika je `nDCG@10`. Ona nagrađuje relevantne proizvode pri vrhu i kažnjava ih kada su zakopani niže. Pojednostavljeno:

$$DCG@10 = \sum_{i=1}^{10}\frac{gain_i}{\log_2(i+1)}$$

$$nDCG@10 = \frac{DCG@10}{IDCG@10}$$

`IDCG` je najbolji mogući redoslijed za isti skup proizvoda. Zato je idealni rezultat 1, a lošiji redoslijedi padaju prema 0.

Uz nDCG gledao sam još tri stvari:

- **MRR@10** — koliko visoko se pojavljuje prvi Exact proizvod
- **Exact Recall@10** — koliki je udio svih Exact proizvoda završio među prvih deset
- **bez Exacta u top 10** — udio upita kod kojih kupac u prvih deset rezultata ne vidi nijedan točan proizvod

Za prosječni `nDCG@10` izračunao sam i 95-postotne bootstrap intervale pouzdanosti s 2.000 uzoraka na razini upita.

## Rezultati: jedan krivi proizvod na vrhu nije sitnica

| Scenarij | nDCG@10, prosjek (95% CI) | MRR@10 | Exact Recall@10 | Bez Exacta u top 10 |
|---|---:|---:|---:|---:|
| Idealni redoslijed | 1,000 (1,000–1,000) | 1,000 | 87,96% | 0,00% |
| Jedan nerelevantan prvi | 0,769 (0,768–0,770) | 0,500 | 85,37% | 0,00% |
| Nasumični redoslijed | 0,535 (0,531–0,540) | 0,582 | 53,04% | 5,24% |
| Exact rezultati zadnji | 0,196 (0,191–0,200) | 0,060 | 13,80% | 64,49% |

:::chart
type: bar
title: nDCG@10 u četiri kontrolirana scenarija — 5.041 ESCI upit
labels: Idealni redoslijed, Nerelevantan prvi, Nasumični redoslijed, Exact rezultati zadnji
series.nDCG@10: 1.000, 0.769, 0.535, 0.196
:::

Samo jedan nerelevantan proizvod na prvom mjestu smanjio je prosječni nDCG za **23,1%**. Još konkretnije, MRR je pao s 1 na 0,5 jer prvi Exact proizvod više nije prvi nego drugi.

Kod nasumičnog redoslijeda prosječni nDCG pada na 0,535. U prosjeku je samo 53,04% svih Exact kandidata vidljivo među prvih deset, a u 5,24% nasumičnih poredaka upita u top 10 nema nijednog točnog proizvoda.

Najgori stres-test pokazuje brutalnu verziju istog problema. Kada su Exact proizvodi zadnji, u **64,49% upita** prvih deset rezultata nema nijedan točan odgovor — iako on postoji u skupu kandidata.

Mala napomena koja je zapravo važna: Exact Recall idealnog scenarija nije 100% jer neki upiti imaju više od deset Exact kandidata, a mjerim samo prvih deset. To nije greška u računu nego ograničenje prozora `@10`.

## Što ovaj eksperiment dokazuje — a što ne

Dokazuje da je redoslijed ozbiljan dio kvalitete interne tražilice. Nije dovoljno reći: „Proizvod se pojavio negdje u rezultatima.” Ako je pravi odgovor na 23. mjestu, tehnički postoji, a praktično ne postoji.

Eksperiment **ne dokazuje** da pad nDCG-a od 23,1% uzrokuje pad konverzije od 23,1%. ESCI nema sesije, klikove, narudžbe, cijene, povrate ni maržu. Tko iz ovog grafa izračuna univerzalni gubitak prihoda, upravo je izmislio broj i obukao ga u statistiku.

Relevantnost i klik također nisu ista stvar. Prvi rezultat dobiva više pažnje već zato što je prvi. S druge strane, poslovno najbolji poredak nije uvijek čisti poredak relevantnosti. Terenski eksperimenti Ngwea, Ferreire i Teixeire pokazali su da namjerno otežavanje pronalaska sniženih artikala u određenom kontekstu može povećati maržu, pa čak i konverziju. Zvuči kontraintuitivno — i upravo zato se poslovni ishod testira, a ne prorokuje iz offline metrike.

## Kako bih utvrdio stvarni trošak na web shopu

Offline test mi govori gdje ranking puca. Za eure bih napravio randomizirani A/B test na stvarnim search sesijama.

Korisnika bih stabilno rasporedio u kontrolu ili novu verziju tražilice, tako da tijekom eksperimenta ne skače između algoritama. Primarna metrika bila bi **doprinosna marža po search sesiji**, ne prihod i ne broj klikova. Sekundarno bih pratio:

- klik na rezultat
- dodavanje u košaricu
- kupnju
- novi ili preformulirani upit unutar unaprijed definiranog prozora
- izlaz nakon pretrage
- stopu praznih rezultata

Kao zaštitne metrike pratio bih vrijeme odgovora tražilice, otkazivanja i povrate. Uzorak i trajanje testa odredio bih prije gledanja rezultata, a razliku objavio s intervalom pouzdanosti. Bez toga se vrlo lako zaustavi test baš onoga dana kada graf izgleda zgodno.

Primjer računice, čisto da se vidi mehanika — **ovo nije rezultat mog ESCI eksperimenta**:

| Stavka | Primjer |
|---|---:|
| Search sesije mjesečno | 50.000 |
| Kontrola: marža po search sesiji | 2,40 € |
| Nova tražilica: marža po search sesiji | 2,62 € |
| Razlika | 0,22 € |
| Procijenjena dodatna mjesečna marža | 11.000 € |

Račun je `50.000 × 0,22 € = 11.000 €`. Tek od toga oduzimam cijenu alata, implementacije i održavanja. Ako interval pouzdanosti uključuje nulu, ne proglašavam pobjedu samo zato što je srednja vrijednost pozitivna.

## Što bih prvo popravljao

Išao bih ovim redom:

1. upiti s mnogo pretraga kod kojih točan proizvod postoji, ali nije u top 10
2. upiti bez rezultata iako proizvod postoji u katalogu
3. sinonimi, tipfeleri i lokalni jezik kupaca
4. nepotpuni atributi poput boje, veličine, materijala i namjene
5. pravila za dostupnost, rok isporuke i uklanjanje mrtvih proizvoda
6. tek nakon toga skuplji modeli rangiranja i AI ukrasi

Model ne može čarobno znati da su `gojzerice`, `planinarske cipele` i lokalni izraz koji kupci stvarno koriste različiti izrazi za istu namjeru ako je katalog poluprazan i atributi žive u naslovu, opisu i nečijem Excelu.

## Search log nije bezazlena vreća ključnih riječi

Kupci u tražilicu ponekad upisuju ime, broj narudžbe, adresu, telefon ili zdravstveni problem. Zato search log može sadržavati osobne, pa i osjetljive podatke.

Kao DPO ne bih dopustio da se takav log čuva zauvijek „jer bi jednom mogao trebati analitici”. Prije analize definirao bih svrhu, smanjio količinu podataka, pseudonimizirao identifikatore, ograničio pristup i rok čuvanja te provjerio što vanjski search dobavljač prima i gdje to obrađuje. Dobra tražilica ne mora postati loša baza osobnih podataka.

## Podaci i kod za provjeru

Eksperiment se može ponoviti bez vjerovanja meni na riječ:

- [metodologija i upute](/downloads/internal-search-research/README.md)
- [Python skripta](/downloads/internal-search-research/analyze_esci.py)
- [sažetak rezultata](/downloads/internal-search-research/esci_experiment_summary.csv)
- [rezultati za svaki upit i scenarij](/downloads/internal-search-research/esci_query_results.csv)

Skripta koristi 50 nasumičnih permutacija po upitu i fiksni seed, a CSV s upitima zaštićen je od slučajnog izvođenja spreadsheet formula. Javni skup nije hrvatski katalog i rezultati se ne smiju prodavati kao hrvatski eCommerce benchmark. Oni su transparentan dokaz što loš redoslijed radi relevantnosti.

## Zaključak: problem nije search box nego lažno obećanje

Najskuplja interna tražilica nije nužno ona koja vraća nulu. Ona barem prizna poraz. Skuplja je ona koja primi precizan upit, ima pravi proizvod i onda ga sakrije ispod deset krivih odgovora.

Na 5.041 stvarnom, ručno označenom eCommerce upitu jedan nerelevantan rezultat na vrhu smanjio je nDCG za 23,1%. Kada su Exact proizvodi gurnuti na kraj, gotovo dvije trećine upita ostalo je bez ijednog točnog odgovora u prvih deset.

Pouka nije da svaki web shop mora kupiti najskuplji AI search. Pouka je jednostavnija i manje seksi: **prvo izmjeri nalazi li kupac pravi proizvod i koliko visoko. Zatim A/B testom dokaži utjecaj na doprinosnu maržu.**

Interna tražilica nije ukras u zaglavlju. Ona je prevoditelj između jezika kupca i nereda u katalogu. Kada prevoditelj laže, kupac ne piše prigovor algoritmu. Samo ode.

## Izvori

- [Reddy i sur. — Shopping Queries Dataset: A Large-Scale ESCI Benchmark for Improving Product Search](https://arxiv.org/abs/2206.06588)
- [Amazon Science — ESCI repozitorij i podaci](https://github.com/amazon-science/esci-data)
- [Järvelin i Kekäläinen — Cumulated Gain-Based Evaluation of IR Techniques](https://trepo.tuni.fi/bitstream/handle/10024/65718/cumulated_gain_based_indicators_2002.pdf?sequence=1&isAllowed=y)
- [Ngwe, Ferreira i Teixeira — The Impact of Increasing Search Frictions on Online Shopping Behavior](https://journals.sagepub.com/doi/abs/10.1177/0022243719865516)
