---
title: Koliko je loš search skup — SEO, UX i konverzija
description: Loš eCommerce search nije samo UX smetnja. Može se mjeriti kroz relevantnost rezultata, reformulacije upita, izlaze, konverziju i doprinosnu maržu.
type: blog-post
nav: false
date: 2025-06-19
updated: 2026-07-18
author: Goran Peremin
tags: ecommerce, site search, seo, ux, cro, information retrieval
sourceURL: https://www.peremin.com/koliko-je-los-search-skup-seo-ux-i-konverzija/
image: /media/posts/seo-covers/ecommerce-search.webp
---

Kupac u search upiše `crne vodootporne tenisice 42`.

Web shop mu vrati bijele papuče, sprej za impregnaciju i tenisice veličine 39. Negdje dublje u rezultatima možda postoji pravi proizvod, ali kupac nije došao rješavati arheološki problem.

Search je u tom trenutku odradio dvije stvari. Pokazao je da ne razumije upit i vrlo brzo saznao koliko kupac ima strpljenja.

Loš search se često opisuje rečenicama poput “rezultati nisu baš najbolji”. To nije mjerenje. Ako ga ne možemo pretvoriti u stupce, oznake relevantnosti i poslovni ishod, rasprava će završiti tako da netko promijeni placeholder u tražilici.

## Prvo razdvojimo dva searcha

Google Search dovodi osobu na web. Interni search pokušava pronaći proizvod unutar web shopa. Oni se dodiruju, ali nisu ista stvar.

[Search Console API](https://developers.google.com/webmaster-tools/v1/searchanalytics/query) vraća podatke grupirane po dimenzijama kao što su `query`, `page`, `country` i `device`, uz `clicks`, `impressions`, `ctr` i prosječnu poziciju. To pomaže otkriti što ljudi traže prije dolaska.

Interna tražilica treba vlastiti zapis:

| stupac | primjer |
|---|---|
| `search_id` | jedinstveni ID pretrage |
| `session_id` | sesija u kojoj se upit dogodio |
| `query_raw` | crne vodootporne tenisice 42 |
| `query_normalized` | crna vodootporna tenisica 42 |
| `result_count` | broj vraćenih rezultata |
| `product_id` | proizvod prikazan u rezultatu |
| `rank` | pozicija proizvoda |
| `clicked` | je li rezultat kliknut |
| `add_to_cart` | je li proizvod dodan u košaricu |
| `purchased` | je li kupljen u definiranom prozoru |
| `gross_margin` | ostvarena doprinosna marža |

Spajanje ova dva izvora daje korisnu vezu: vanjski upit dovodi posjetitelja na kategoriju ili proizvod, a interni upit pokazuje što još uvijek nije pronašao. To nije formula Googleova rangiranja. Google ne objavljuje jednadžbu kojom možemo izračunati poziciju stranice, a ovaj tekst je neće izmišljati.

## Relevantnost nije isto što i klik

Klik je ponašanje. Relevantnost je procjena odgovara li proizvod upitu. Loš rezultat može dobiti klik jer je prvi, ima agresivnu fotografiju ili je kupac očajan. Dobar rezultat može ostati bez klika jer je iznad njega oglas.

Amazonov javni [Shopping Queries Dataset](https://github.com/amazon-science/esci-data) daje čvrst okvir za označavanje. Veća verzija sadrži 130.652 jedinstvena upita i tablični zbroj od 2.621.288 ručno označenih parova upit–proizvod. Za svaki upit postoji do 40 kandidata, a oznake su:

| oznaka | značenje |
|---|---|
| Exact | proizvod izravno odgovara upitu |
| Substitute | nije isti, ali može zamijeniti traženi proizvod |
| Complement | nadopunjuje traženi proizvod |
| Irrelevant | ne rješava namjeru upita |

Dataset je na engleskom, japanskom i španjolskom. Nije hrvatski katalog i ne treba glumiti da jest. Vrijednost mu je u shemi problema: `query`, `product_id`, naslov, opis, brand, boja, locale i oznaka relevantnosti.

Za vlastiti shop dovoljno je uzeti uzorak najčešćih upita, zero-result upita i upita s visokom stopom izlaza. Dva ocjenjivača označe prvih deset ili dvadeset rezultata. Neslaganja se pregledaju. Nije glamurozno, ali sada imamo nešto preciznije od dojma.

## nDCG mjeri koliko je dobar redoslijed

Search mora pronaći relevantne proizvode i staviti ih dovoljno visoko. Zato običan postotak relevantnih rezultata nije dovoljan. Rezultat na poziciji 1 vrijedi više od istog rezultata na poziciji 20.

Najčešća metrika za to zove se nDCG. Ime zvuči kao nešto što se govori samo uz službenu akreditaciju, ali ideja je jednostavna: usporedi stvarni redoslijed s najboljim mogućim redoslijedom.

$$nDCG_k = \frac{DCG_k}{IDCG_k}$$

Rezultat je između 0 i 1. Vrijednost 1 znači da su najbolji odgovori na vrhu. Što relevantan proizvod gurnemo niže, rezultat više pada.

Formula je standardna metrika rangiranja, opisana i u dokumentaciji za [`sklearn.metrics.ndcg_score`](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html). Međutim, brojevi koje pridružujemo ESCI oznakama nisu prirodni zakon. Moraju biti deklarirani.

Za ovaj primjer koristim `Exact=3`, `Substitute=2`, `Complement=1`, `Irrelevant=0`. Idealni niz `[3,2,1,0,0]` ima `nDCG@5 = 1`. Niz `[0,1,0,2,3]` ima približno `0,493`. Isti proizvodi postoje, ali najbolje odgovore skrivamo pri dnu.

:::chart
type: bar
title: Konverzija po kvaliteti internog searcha — primjer mjernog izvještaja
labels: nDCG 0–0.25, nDCG 0.25–0.50, nDCG 0.50–0.75, nDCG 0.75–1.00
series.Konverzija (%): 1.20, 2.10, 3.40, 5.30
:::

Vrijednosti u grafu su demonstracijski primjer strukture izvještaja, ne univerzalni benchmark. Na vlastitim podacima svaki `search_id` treba spojiti s ocjenom rezultata i ishodom sesije. Tek tada možeš provjeriti raste li konverzija s relevantnošću ili samo gledaš lijepo složen graf bez poslovne veze.

## Koliko košta jedan loš upit

Nekoliko operativnih metrika brzo pokaže gdje search curi.

**Stopa pretraga bez rezultata** govori koliki udio svih pretraga vraća praznu stranicu. Ako je 800 od 10.000 pretraga prazno, stopa je 8%.

**Stopa reformulacije** govori koliko ljudi mora pokušati ponovno. Ako netko upiše `vodootporne tenisice`, ne klikne ništa i nakon minute upiše `goretex tenisice`, prvi rezultat očito nije odradio posao.

Prozor mora biti naveden. “Novi upit unutar 120 sekundi bez klika na proizvod” jedna je moguća operativna definicija. Drugi tim može koristiti 60 sekundi. Oba su legitimna ako se definicija ne mijenja usred izvještaja.

Najvažniji poslovni ishod nije sam search conversion rate nego vrijednost popravka. U A/B testu usporedimo prosječnu doprinosnu maržu po search sesiji. Razliku pomnožimo brojem sesija i dobijemo financijski učinak. Prihod može rasti dok marža pada ako novi ranking gura proizvode koji se prodaju samo na dubokom popustu.

## SEO sadržaj i interni search trebaju razgovarati

Interni upiti su sirova evidencija jezika kupaca. Ako stotine ljudi traže `radne tenisice bez vezica`, a katalog koristi samo naziv `slip-on zaštitna obuća`, problem možda nije samo algoritam. Nedostaju sinonimi, atributi ili stranica koja jasno pokriva namjeru.

Korisna analiza spaja:

| izvor | dimenzije | metrike |
|---|---|---|
| Search Console | `query`, `page`, `device`, `country` | klikovi, impresije, CTR, pozicija |
| interni search | `query_normalized`, `result_count`, `rank` | klik, reformulacija, izlaz |
| katalog | `product_id`, brand, boja, veličina, dostupnost | pokrivenost atributa |
| narudžbe | `session_id`, `order_id` | konverzija, prihod, marža, povrat |

Search Console API pritom ne jamči sve retke; službena dokumentacija navodi interna ograničenja i vraćanje najvažnijih rezultata. To je još jedan razlog da se podaci ne tretiraju kao potpuna inventura potražnje.

## Redoslijed popravka

Prvo bih riješio upite bez rezultata koji imaju velik volumen i postojeće proizvode u katalogu. Zatim upite s mnogo rezultata, ali niskim nDCG-om. Nakon toga sinonime, tipfelere, atribute i dostupnost veličina. Tek onda ima smisla raspravljati o složenijem modelu rangiranja.

Svaku promjenu treba provjeriti na odvojenom skupu ručno označenih upita i u online A/B testu. Offline nDCG govori je li ranking bliži ocjenama relevantnosti. Online test govori je li to kupcu pomoglo i je li ostalo više marže.

Search nije skup zato što koristi server. Skup je kada kupac precizno kaže što želi, katalog to ima, a sustav mu svejedno pokaže nešto treće.

## Izvori i provjera

- [Amazon Science — Shopping Queries Dataset](https://www.amazon.science/code-and-datasets/shopping-queries-dataset-a-large-scale-esci-benchmark-for-improving-product-search)
- [Amazon Science — ESCI data repository i podatkovna shema](https://github.com/amazon-science/esci-data)
- [Google Search Console API — Search Analytics query](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)
- [scikit-learn — nDCG dokumentacija i reference](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html)
