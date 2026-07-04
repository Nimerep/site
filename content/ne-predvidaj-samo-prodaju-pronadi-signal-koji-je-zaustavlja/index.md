---
title: Ne predviđaj samo prodaju — pronađi signal koji je zaustavlja
description: Sezonska prodaja ne završava kada grafikon padne. Završava ranije, kada nestane uvjet koji pokreće potražnju. Evo kako taj signal pronaći u podacima i pretvoriti ga u odluku o zalihama.
type: blog-post
nav: false
date: 2026-07-04
updated: 2026-07-04
author: Goran Peremin
tags: ecommerce, demand forecasting, inventory, predictive analytics, google trends, retail analytics
sourceURL: https://www.peremin.com/ne-predvidaj-samo-prodaju-pronadi-signal-koji-je-zaustavlja/
---

Prodaja sladoleda raste s temperaturom.

Čestitam, upravo smo otkrili ljeto.

Za taj zaključak ne trebaju nam umjetna inteligencija, pet dashboarda ni konzultant koji će riječ *seasonality* staviti na 46 slajdova. Zanimljivo pitanje nije zašto se sladoled bolje prodaje kada je vruće.

Zanimljivo pitanje glasi:

> Koji nam signal može dovoljno rano pokazati da će se prodaja uskoro zaustaviti?

Kada pad konačno vidimo u prodajnim podacima, roba je možda već naručena, kampanja plaćena, a skladište se puni proizvodom čiji je trenutak upravo prošao.

Problem nije samo loša prognoza. Problem je praćenje pogrešnog signala.

## Prodaja je posljednja koja sazna da je sezona završila

Prodaja govori što se već dogodilo. Ako gledamo samo nju, pokušavamo voziti gledajući u retrovizor.

Kod sladoleda signal može biti temperatura. Kod kišobrana oborine. Kod školskih torbi početak školske godine. Kod turističke opreme broj rezervacija. Kod viralnog proizvoda interes na tražilicama i društvenim mrežama.

Signal može biti i:

- ton i intenzitet vijesti na televiziji, portalima i društvenim mrežama
- političko, sigurnosno ili društveno događanje u gradu, regiji ili zemlji
- inflacija, nezaposlenost, kamatne stope ili potrošačko povjerenje
- cijena i aktivnosti konkurencije
- izlazak novog modela proizvoda
- kraj događaja ili marketinške kampanje

Loša vijest pritom ne mora smanjiti svaku prodaju. Ekonomska nesigurnost može srušiti luksuznu kategoriju i istodobno podići potražnju za jeftinijom zamjenom. Oluja može zaustaviti dio kupnji, ali povećati prodaju baterija i zaštitne opreme.

Ne pretpostavljamo reakciju tržišta. Analiziramo podatke i tražimo signal koji dosljedno prethodi promjeni prodaje.

## Ne pitaj što ljudi misle. Pogledaj što podaci pokazuju.

“Završila je sezona” nije analiza. Koji se signal promijenio? Kada? Koliko dana prije pada prodaje? Ponavlja li se obrazac ili samo dobro zvuči na sastanku?

Osjećaj nije vremenska serija. Najsamouvjerenija osoba u prostoriji nije automatski vlasnik istine.

Podaci već postoje:

| izvor | što možemo pratiti |
|---|---|
| ERP | prodaja, cijena, popust, zaliha i nabava |
| Analytics | posjeti, pregledi proizvoda, košarice i konverzije |
| CRM | kampanje, segmenti i ponovljene kupnje |
| Search Console i SEO alati | impresije, klikovi, pozicije i pretraživanja |
| Google Trends | relativno kretanje interesa |
| oglasne platforme | impresije, klikovi, trošak i rezultat kampanje |
| vanjski izvori | vrijeme, vijesti, događaji i stanje tržišta |

Prvi posao nije izabrati algoritam. Prvi posao je složiti vremensku liniju proizvoda i provjeriti što se pomaknulo prije prodaje.

## Drugi su već pronašli korisne signale — i nekoliko zamki

Googleovi ekonomisti Hyunyoung Choi i Hal Varian još su 2009. pokazivali kako podaci o pretragama mogu pomoći pri procjeni maloprodaje, prodaje automobila i putovanja. Pretrage nastaju odmah, dok službeni podaci često kasne. Nazvali su to [predviđanjem sadašnjosti](https://research.google/blog/predicting-the-present-with-google-trends/).

Istraživanje na proizvodima kompanije Sennheiser pronašlo je da pretrage povezane s kompanijom i proizvodom mogu poboljšati prognozu prodaje na razini proizvoda. [Rad je objavljen u časopisu Applied Economics Letters](https://research.uni-hannover.de/en/publications/can-google-trends-improve-sales-forecasts-on-a-product-level/).

Ali online interes nije automatski koristan. Studija u *International Journal of Forecasting* pokazala je da su u njihovim slučajevima jednostavni modeli poput eksponencijalnog izglađivanja bili bolji od modela obogaćenih online informacijama. Autori upozoravaju na loše benchmarke i nedovoljno strogu evaluaciju u dijelu ranijih istraživanja. [Drugim riječima, Google Trends nije vilinska prašina](https://www.sciencedirect.com/science/article/pii/S0169207018300505).

Isto vrijedi za vrijeme. Istraživanje na podacima velikog kanadskog trgovca pokazalo je da temperatura, vlaga, oborine i naoblaka mogu znatno poboljšati objašnjenje prodaje pojedinih proizvoda i kategorija, ali učinak nije jednak za sve proizvode. [Model mora otkriti gdje vrijeme stvarno nosi novu informaciju](https://www.sciencedirect.com/science/article/pii/S2949863524000013).

Google Trends ima i tehničke zamke. Ne prikazuje apsolutan broj pretraga, nego uzorkovan i normaliziran interes na skali od 0 do 100. Niski volumeni mogu sadržavati vidljiv statistički šum. [To navodi i Googleova dokumentacija](https://support.google.com/trends/answer/4365533?hl=en-GB).

Signal zato mora pobijediti jednostavan model na budućem razdoblju. Ako to ne može, izbacujemo ga. Bez sentimentalnosti.

## Kako pronaći signal koji pada prvi

### 1. Spoji podatke po proizvodu, vremenu i tržištu

Za svaki SKU ili kategoriju poveži prodaju, cijenu, popust, zalihu, preglede proizvoda, košarice, organska pretraživanja, kampanje i vanjske signale. Dnevna prodaja u Zagrebu nema mnogo koristi od vijesti ili vremena za drugo tržište.

### 2. Napravi dosadan benchmark

Povijesna prodaja, kalendar, cijena, promocije i nekoliko vremenskih pomaka sasvim su dobar početak. Novi signal mora dokazati da donosi informaciju koju taj model već nema.

### 3. Testiraj što se događa prije prodaje

Padaju li pretrage 7 ili 14 dana prije kupnji? Usporavaju li pregledi proizvoda prije konverzija? Najavljuje li vremenska prognoza promjenu dovoljno rano za nabavu?

Korelacija istog dana možda stiže prekasno. Tražimo prednost u vremenu.

### 4. Ne puštaj budućnost u trening

Ako 1. rujna donosimo odluku za sljedeća dva tjedna, model ne smije vidjeti stvarno vrijeme zabilježeno 10. rujna. Tada je postojala samo vremenska prognoza.

Isto vrijedi za naknadno ažurirane CRM statuse, SEO podatke i stanje zalihe. Sve ostalo nije predviđanje, nego putovanje kroz vrijeme u Excelu.

### 5. Provjeri signal na sljedećoj sezoni

Model treniramo na ranijim razdobljima i testiramo na kasnijima. Nasumično miješanje redaka može pustiti budućnost u trening i proizvesti sjajan rezultat koji u stvarnom svijetu ne postoji.

## Nulta prodaja nije dokaz da je potražnja umrla

Proizvod možda nije prodan zato što ga nije bilo na zalihi, nestao je iz rezultata pretraživanja, cijena je porasla ili je kampanja zaustavljena.

Trgovac ne može prodati više nego što ima. Zabilježena prodaja zato može biti samo cenzurirana verzija stvarne potražnje.

Istraživanja problema izgubljene prodaje pokazuju upravo to: tijekom stockouta ne vidimo kupce koji su htjeli kupiti, ali nisu mogli. Razvijeni su modeli koji istodobno procjenjuju skrivenu potražnju, učinak signala poput cijene i temperature te količinu narudžbe. [International Journal of Production Economics](https://www.sciencedirect.com/science/article/pii/S092552731300203X)

Ako ignoriramo zalihu, model može naučiti da sezona završava svaki put kada nama ponestane robe. To nije inteligencija. To je automatiziranje vlastitog propusta.

## Signal vrijedi tek kada promijeni odluku

“Google Trends korelira s prodajom 0,73” dobro izgleda u prezentaciji, ali ne govori skladištu što treba napraviti.

Koristan rezultat izgleda ovako:

> Kada indeks pretraživanja padne više od 25% tijekom dva uzastopna tjedna, uz stabilnu cijenu i dostupnost, prodaja u sljedećih 14 dana pada ispod razine koja opravdava novu narudžbu.

Sada imamo signal, vremenski horizont i odluku.

Model treba testirati kroz stvarni trošak: izgubljenu prodaju, neprodanu zalihu, skladištenje, popuste i maržu. Istraživanja prognoziranja usmjerenog na poslovne metrike pokazuju da optimiziranje stvarnog troškovnog kompromisa može dati bolje odluke od lova na generičku statističku metriku. [Business Metric-Aware Forecasting for Inventory Management](https://arxiv.org/abs/2308.13118)

Najbolji model nije nužno onaj koji najpreciznije pogađa svaki dan. Najbolji je onaj koji dovoljno rano spriječi pogrešnu narudžbu.

## Pravi proizvod nije forecast. Pravi proizvod je radar.

Koristan sustav ne izbacuje samo novu decimalu na dashboard. On upozorava:

> Interes za prijenosne ventilatore pada drugi tjedan zaredom. Procijenjena preostala prodaja iznosi između 620 i 780 komada. Trenutačna zaliha je 710. Nova narudžba nije preporučena.

To više nije samo prognoza. To je radar za trenutak kada proizvod iz “još se prodaje” prelazi u “uskoro ćemo ga gurati popustom”.

Ne pitamo najglasniju osobu što misli da zaustavlja prodaju. Ne ubacujemo pedeset signala u model i slavimo onaj koji slučajno izgleda najljepše.

Spajamo podatke, gradimo jednostavan benchmark, provjeravamo što pada prije prodaje i mjerimo je li upozorenje donijelo bolju odluku.

Kada pad prodaje postane očit, možda je već prekasno.

Zato ne predviđaj samo prodaju.

> Pronađi signal koji pada prvi.

## Izvori i provjera

- [Google Research — Predicting the Present with Google Trends](https://research.google/blog/predicting-the-present-with-google-trends/)
- [Fritzsch i sur. — Can Google Trends improve sales forecasts on a product level?](https://research.uni-hannover.de/en/publications/can-google-trends-improve-sales-forecasts-on-a-product-level/)
- [Schaer, Kourentzes i Fildes — Demand forecasting with user-generated online information](https://www.sciencedirect.com/science/article/pii/S0169207018300505)
- [A machine learning framework for predicting weather impact on retail sales](https://www.sciencedirect.com/science/article/pii/S2949863524000013)
- [Google Trends — FAQ about Google Trends data](https://support.google.com/trends/answer/4365533?hl=en-GB)
- [Sachs i Minner — The data-driven newsvendor with censored demand observations](https://www.sciencedirect.com/science/article/pii/S092552731300203X)
- [Business Metric-Aware Forecasting for Inventory Management](https://arxiv.org/abs/2308.13118)
