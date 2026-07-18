---
title: Prediktivna analitika u eCommerceu: Vodič bez nagađanja
description: Što je prediktivna analitika, kako predviđa kupnju, churn i vrijednost kupca te gdje modeli pomažu eCommerce marketingu, a gdje mogu prevariti.
type: blog-post
nav: false
date: 2025-05-30
updated: 2026-07-18
author: Goran Peremin
tags: ecommerce, predictive analytics, marketing analytics, cro, ai
sourceURL: https://www.peremin.com/napredna-analitika-i-predictive-analytics-marketing-bez-nagadanja/
image: /media/posts/15/Napredna-analitika-i-predictive-analytics.webp
---

Ako i dalje šalješ iste kampanje svima, iskreno – nisi više u marketingu, već u spam-biznisu. Kupac ti šalje jasnu poruku: "Daj mi ono što želim, i to sada!" **Prediktivna analitika **omogućuje ti upravo to – jasne, precizne, algoritmima vođene kampanje koje znaju tko, što i kada želi.

## Što je predictive analytics (PA)?

**Predictive analytics (PA)** u eCommerceu predstavlja primjenu statističkih tehnika, strojnog učenja i algoritama za predviđanje budućeg ponašanja korisnika na temelju povijesnih i trenutnih podataka. Umjesto oslanjanja na intuiciju ili generičke demografske podatke, PA omogućuje trgovcima da anticipiraju što će kupci vjerojatno učiniti – hoće li kupiti, kada će kupiti, što će kupiti i kada bi mogli odustati.

### Zašto je to važno?

U današnjem konkurentnom eCommerce okruženju, sposobnost predviđanja ponašanja kupaca pruža značajnu prednost. **Prema najnovijim istraživanjima iz 2025. godine, personalizirano online shopping iskustvo može zadržati preko 56% eCommerce kupaca**. McKinsey istraživanje pokazuje da CPG kompanije koje prihvaćaju data-driven marketing na velikoj skali mogu povećati neto vrijednost prodaje za 3 do 5 posto i marketinšku efikasnost za 10 do 20 posto.

Dodatno, **istraživanje objavljeno u [International Journal of Computer Applications (2024.)](https://www.ijcaonline.org/archives/volume186/number48/li-2024-ijca-924140.pdf) demonstrira efikasnost Random Forest modela u predviđanju customer churn-a s ROC AUC od 0.9850**. Ovo pokazuje kako napredni algoritmi strojnog učenja mogu značajno poboljšati točnost predviđanja u eCommerce okruženju.

### Kako se koristi u praksi?

Evo nekoliko ključnih primjena PA u eCommerce marketingu:

### Personalizacija ponuda i preporuka proizvoda

Analizom prethodnih kupnji i ponašanja korisnika, PA omogućuje trgovcima da preporuče proizvode koji su najrelevantniji za pojedinog kupca, čime se povećava vjerojatnost konverzije. **[Sephora](https://www.bigcommerce.com/articles/ecommerce/ecommerce-predictive-analytics/)** je svojim personaliziranim preporukama povećala prodaju i zadržala kupce dugoročno. Amazon i Netflix koriste PA za dinamičke preporuke koje su toliko precizne da izgledaju kao da čitaju misli.

### Prognoziranje potražnje i upravljanje zalihama

PA pomaže u predviđanju buduće potražnje za proizvodima, omogućujući trgovcima da optimiziraju zalihe i izbjegnu prekomjerno skladištenje ili nestašice. **Amazon** je čak patentirao "anticipatory shipping" – sustav koji predviđa što će kupac naručiti prije nego što to i učini, čime smanjuje vrijeme.

### Identifikacija rizika od odustajanja (churn)

PA može identificirati kupce koji pokazuju znakove odustajanja, omogućujući trgovcima da poduzmu proaktivne mjere za njihovo zadržavanje. **Netflix** koristi PA za predviđanje churn-a i ciljanje korisnika personaliziranim ponudama. Jedna SaaS kompanija je smanjila churn s 8% na 4.2% samo zahvaljujući PA modelima i proaktivnim kampanjama.

### Optimizacija marketinških kampanja

Analizom podataka o prethodnim kampanjama i ponašanju korisnika, PA omogućuje trgovcima da prilagode svoje marketinške strategije kako bi postigli bolje rezultate. **[Macy’s](https://www.mytotalretail.com/article/macys-uses-predictive-analytics-grow-customer-spend/all/)** je implementirao SAP InfiniteInsight i postigao gotovo 12% rast online prodaje zahvaljujući personaliziranim.

Nakon što smo objasnili što je predictive analytics (PA) i prikazali njegove glavne primjene u eCommerce marketingu, važno je jasno definirati na koji tip PA-a ćemo se fokusirati u ovom blogu i zašto.

## S kojim PA ćemo se baviti u ovom blogu?

U ovom blogu fokusiramo se na primjenu predictive analyticsa za predviđanje ponašanja posjetitelja i kupaca u eCommerce okruženju – konkretno, na modele koji pomažu webshopovima da:

- Identificiraju posjetitelje s najvećom vjerojatnošću konverzije (purchase propensity modeli)
- Predvide rizik od odustajanja postojećih kupaca (churn modeli)
- Segmentiraju korisnike prema profitabilnosti, angažmanu i potencijalu za rast (RFM i klastering)
- Optimiziraju marketinške kampanje i preporuke proizvoda u realnom vremenu, koristeći podatke iz CMS-a, ERP-a i Google Analyticsa

Za razliku od generičke upotrebe PA-a u industriji (npr. predviđanje zaliha ili makroekonomskih trendova), mi ćemo se baviti praktičnim modelima koji su izravno primjenjivi na digitalni marketing i eCommerce. To znači da ćeš naučiti kako koristiti svoje podatke za:

- Precizno ciljanje remarketing kampanja
- Personalizaciju ponuda na temelju stvarnog ponašanja korisnika, a ne samo demografije
- Prepoznavanje i nagrađivanje najvrjednijih kupaca, dok istovremeno filtriraš one koji negativno utječu na ROI
- Aktivno uključivanje i scoring posjetitelja koji još nisu kupci, ali pokazuju signale visoke namjere

Zaključak ovog dijela

Dakle, u nastavku bloga bavit ćemo se upravo onim vrstama predictive analyticsa koje omogućuju webshopovima da iz podataka izvuku maksimalnu vrijednost – kroz bolje ciljanje, personalizaciju i proaktivno upravljanje odnosima s kupcima. Fokus je na praktičnoj primjeni: kako izvući podatke iz CMS-a i ERP-a, trenirati modele, validirati ih i integrirati u svakodnevni marketing proces.

## Koje posjetitelje ciljati – i zašto

U eCommerce marketingu najveća greška je pretpostaviti da su svi posjetitelji jednaki. Nisu. I nikada neće biti. Ako se svaki klik tretira kao da vrijedi isto, rezultat su rasipani budžeti i propuštene prilike.

>

Ključno pitanje za svaki predictive model je: **koga uopće želimo pretvoriti u kupca – i zašto?**

Prema [CXL](https://cxl.com/blog/propensity-modeling/?utm_source=chatgpt.com), posjetitelji koji pokazuju snažnu kupovnu namjeru – npr. pregled proizvoda, dodavanje u košaricu, provjera informacija o dostavi – imaju značajno veću vjerojatnost konverzije. Njih identificiramo kao posjetitelje s visokom sklonosti kupnji.

| Segment | Ponašanje | Akcija |
| --- | --- | --- |
| Visoka namjera | Aktivno istražuju proizvod, dodaju u wishlist, provode 10+ min na PDP | Remarketing, mail unutar 2 sata, pop-up |
| Srednja namjera | Višekratni posjeti, otvaranje emailova, angažman na društvenim mrežama | Edukativni sadržaji, vodiči, UGC recenzije |
| Niska namjera | Kratki posjeti s bounce rateom >80%, bez interakcije | Edukativni blogovi, newsletter signup |

Prema [BigCommerce](https://www.bigcommerce.com/articles/ecommerce/ecommerce-predictive-analytics/), personalizacija po ovim segmentima donosi **15–30 % veću konverziju**, dok generički pristupi često demotiviraju korisnike.

## Koje kupce želimo – a koje ne

U eCommerceu vrijedi pravilo: ne želiš svakog kupca. Neki ti stvaraju prihod, drugi ti jedu marginu, resurse i uništavaju ROI.

## Tko su poželjni kupci i kako ih identificirati

### 1. **Redovito kupuju proizvode visoke marže**

**Izvor:** ERP

- Polja: `customer_id`, `order_count`, `product_margin`, `sku`, `total_revenue`

Formula:

- Filtriraj kupce s ≥ 2 kupnje u posljednjih 60–90 dana
- Uključi samo one čije su narudžbe imale **prosječnu maržu iznad praga** (npr. >30%)

**SQL primjer (ERP ili BI alat):**

```
sql

SELECT customer_id
FROM orders
WHERE order_date > NOW() - INTERVAL '90 days'
GROUP BY customer_id
HAVING COUNT(*) >= 2 AND AVG(product_margin) > 0.3;

```

### 2. **Nizak broj povrata + visoka ocjena zadovoljstva**

**Izvor:** ERP + CRM (ili integracija s anketom u CMS-u)

- Polja: `returns_count`, `return_rate`, `csat_score`, `nps_score`

Pravilo:

- Povrat ispod 10%
- CSAT ili NPS ocjena > 7 (idealno iz ankete nakon isporuke)

**Bonus:** Ako koristiš **email survey** (npr. Typeform, Survicate) u CMS-u, spoji ga s korisničkim ID-jem i ERP narudžbama.

### 3. **Reagiraju na kampanje, koriste popuste, ali bez eksploatacije**

**Izvor:** CMS (newsletter platforma), Google Analytics (GA4 eventi), ERP (korišteni kuponi)

Polja: `campaign_clicks`, `coupon_use_rate`, `avg_discount_percent`, `email_open_rate`

Detekcija:

- Otvorili ≥ 50% kampanja u zadnja 3 mjeseca
- Iskoristili kupon do max. 2× mjesečno
- Prosječan iskorišteni popust < 20%

**GA4 kombinacija:**

- `event_name`: `purchase`, `coupon`, `campaign_click`
- Segmente složiš u GA4 s uvjetom ponašanja kroz **audience builder**

### 4. **Dijele sadržaj i dovode druge korisnike (referrals)**

**Izvor:** CMS (blog/share plugin), Google Analytics, Referral modul u ERP-u/loyalty sustavu

Polja: `referral_code_usage`, `social_shares`, `influencer_id`, `session_referrer`

Detekcija:

- Imaju referral kod koji je barem jednom korišten
- GA4 event `share` ili `outbound_click` zabilježen ≥ 1
- Parametar `ref=` u linkovima koji donose konverzije

**GA4 primjer publike:**

`event_name = share` AND `event_count ≥ 2`

**Poželjni kupci - zaključno:**

- Redovito kupuju, i to proizvode visoke marže
- Imaju nizak broj povrata i visoku ocjenu zadovoljstva
- Reagiraju na kampanje, koriste popuste, ali bez eksploatacije
- Dijele sadržaj i dovode druge korisnike (referrals)

**Neželjeni kupci:**

- Visoka stopa povrata (>40%)
- Kupovina samo na ekstremnim sniženjima ("discount hunters")
- Često kontaktiraju podršku zbog trivijalnosti – visoki CAC
- Nikada ne klikaju na kampanje, iako su u bazi

Zašto to mora biti uključeno u predictive model?
Zato što ne želiš trenirati model koji će nagraditi kupce koji ti zapravo štete. U feature engineering fazi jasno označi:

- **CLTV (Customer Lifetime Value)** kao primarni cilj
- **Korisničku vrijednost po marži, a ne samo prometu**
- **Broj povrata** kao penalizacijski faktor
- **Trošak korisničke podrške** (ako ga mjeriš po korisniku)

Cilj predictive marketinga nije samo konverzija – već profitabilna konverzija. Model koji ne filtrira "loše kupce" vodi do povećanja prometa i smanjenja dobiti.

## Kako ih spojiti?

1. **Identificiraj jedinstveni ID korisnika (npr. e-mail, customer_id) u sva tri sustava.**
2. **Izvuci metrike** iz svakog sustava (ručno ili kroz Data Warehouse / BigQuery).
3. **Kreiraj scoring model** – dodijeli bodove za svaki kriterij (npr. +2 za nisku stopu povrata, +3 za visoku maržu...).
4. **Segmentiraj korisnike** po ukupnom zbroju – oni iznad određenog praga su “Poželjni”.

## Ne samo kupci – uključujemo i posjetitelje

Većina eCommerce shopova ima daleko više posjetitelja nego kupaca. Ignorirati ih u analitici znači ignorirati 90% potencijala. Svaki posjetitelj šalje signal:

- koliko dugo ostaje,
- koje proizvode gleda,
- dolazi li s bloga, kategorije, proizvoda ili oglasa,
- koliko duboko ulazi u site strukturu (funnel depth).

Primjer: netko pročita recept na blogu (SEO lead) i klikne na link za tavu. To je lead visoke namjere, ali niske konverzije – idealan kandidat za remarketing i scoring.

## Koje podatke uzimamo iz CMS-a i ERP-a:

**Iz CMS-a (npr. Laravel, WordPress, Sylius):**

- `session_duration`, `page_depth`, `products_viewed`, `entry_page`, `exit_page`
- `referrer`, `device`, `clickstream`, `search_terms`
- `scroll_depth`, `time_on_product_page`

**Iz ERP-a:**

- `customer_id`, `avg_order_value`, `return_rate`, `payment_method`, `support_tickets`
- `product_margin`, `stock_levels`, `purchase_frequency`, `last_purchase_date`

## Kako trenirati model koji uključuje i posjetitelje

Kod korisnika bez transakcija (npr. samo pregledava), target varijabla je "engagement intent" ili predikcija da će postati kupac u narednih 7 dana.

```
# semi-supervised learning: kombinacija označenih i neoznačenih podataka
from sklearn.ensemble import GradientBoostingClassifier

X_full = combine(visitor_sessions, known_buyers)
y = generate_labels(X_full) # 1 ako je kupio, 0 ako nije (ili proxy varijabla)

model = GradientBoostingClassifier()
model.fit(X_full, y)

```

Nakon toga koristiš output predikcije da odrediš:

- Koga retargetirati u sljedećem newsletteru
- Kome pokazati exit-intent popup
- Tko zaslužuje Facebook Custom Audience remarketing

## Segmentacija ponašanja – kako je izgraditi vlastitim kodom

Zaboravi generičke demografske segmente. Pravi modeli se temelje na:

- **RFM analizi (Recency, Frequency, Monetary)**
- **Clustering algoritmima (npr. K-means)**

```
from sklearn.cluster import KMeans
import pandas as pd

rfm = pd.read_csv('rfm_scores.csv')
kmeans = KMeans(n_clusters=4)
kmeans.fit(rfm)
rfm['segment'] = kmeans.labels_

```

Ova segmentacija se može integrirati u ERP tako da se svakom korisniku dinamički dodeli segment kod prijave ili checkouta – za što se koristi hook u backendu koji poziva ML servis i vraća "segment" koji dalje odlučuje koju kampanju, ponudu ili popust vidi.

## Purchase propensity modeli – zašto su najvažniji i kako ih trenirati

Ovdje je ključno imati:

- Povijest transakcija (kupnje, vrijeme, iznos)
- Ponašanje na sajtu (broj posjeta, bounce rate, pogledani proizvodi)
- Vanjski faktori (dan u tjednu, vrijeme, inflacija)

Model se trenira kao binarna klasifikacija, a u deploy fazi koristi se scoring prag za aktiviranje kampanje.

## Churn modeli: kako spasiti korisnika prije nego ode

Za implementaciju churn predikcije:

1. Izgradi dataset korisnika koji su otišli (churn) vs ostali
2. Treniraj klasifikacijski model (XGBoost, CatBoost preporučeno)
3. Scoriraj aktivne korisnike i flagiraj one iznad praga
4. Integriraj u CRM ili mail sustav da im se automatski pošalje ponuda

```
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(random_state=46)
rf.fit(X_train, y_train)
```

## Operacionalizacija: kako to živi u CMS/ERP sustavu

- **Modeli kao servis:** Hostani na vlastitom API endpointu (Flask/FastAPI), poziva ih CMS kod checkouta ili prijave.
- **Webhook aktivacije:** Kad korisnik klikne na "Dodaj u košaricu", sustav šalje webhook koji scorira korisnika i vraća preporuku.
- **A/B test engine:** Interno izgradi logiku za randomizaciju i mjeri razliku u konverzijama na temelju modelskih preporuka.

## Alati i platforme za predictive analytics

Evo par PA alata:

| Alat | Primjena |
| --- | --- |
| Google Analytics 4 | AI-driven predictive metrics, churn, purchase |
| HubSpot | Lead scoring, personalizacija, automation |
| Salesforce Einstein | Enterprise-grade AI, personalizacija |
| Adobe Analytics | Advanced segmentation, propensity modeling |
| Altair AI Studio | Data mining, model deployment |
| H2O Driverless AI | Automated ML, explainability |

**Google Analytics 4** nudi ugrađene predictive metrics – vjerojatnost kupnje, churn-a i prihoda u sljedećih 7 ili 28 dana.
**HubSpot** i **Salesforce Einstein** omogućuju personalizirano ciljanje i automatizaciju kampanja.
**Adobe Analytics** koristi AI framework Adobe Sensei za naprednu segmentaciju i personalizaciju.

## Validacija modela i mjerenje uspjeha

Ne možeš samo trenirati model i nadati se najboljem. Moraš testirati i validirati rezultate.

- **Splitaj podatke na train/test setove**
- **Koristi stratified k-fold cross-validation**
- **Mjeri ROC AUC, precision, recall i F1 score**
- **Pogledaj confusion matrix za realnu sliku performansi**

ROC AUC od 0.9850 znači da model gotovo savršeno razlikuje kupce koji će otići od onih koji će ostati.
Precision i recall pokazuju koliko model griješi i koliko je pouzdan.

## Ograničenja i izazovi

Predictive analytics nije magična pilula. Evo glavnih izazova:

- **Kvaliteta podataka:** Loši podaci = loši rezultati. Čisti podatke, standardiziraj ih i eliminiraj duplikate.
- **Integracija:** Podaci iz različitih izvora moraju biti spojeni u jednu bazu.
- **Skilovi:** Potreban je tim s razumijevanjem data science-a i marketinga.
- **Privatnost i GDPR:** Poštuj pravila, koristi zero-party data i budi transparentan.
- **ROI:** Rezultati se ne vide odmah. Treba vremena i discipline.

## Zaključak i akcijski koraci

Ne treba ti gotovi alat. Treba ti jasan cilj (npr. smanji churn za 20%), kvalitetan dataset i API pristup CMS/ERP-u gdje će se modeli povezati. Sve ostalo je Python, disciplina i validacija.

**Akcijski plan za sljedećih 30 dana:**

1. **Prikupljaj i čisti podatke** – bez toga nema ništa.
2. **Definiraj ciljne varijable** – što želiš predvidjeti i zašto.
3. **Treniraj jednostavan model** – npr. Random Forest za churn ili purchase propensity.
4. **Testiraj i validiraj model** – koristi ROC AUC, precision, recall i F1 score.
5. **Integriraj model u CMS/ERP** – automatski aktiviraj kampanje na temelju scoringa.
6. **Mjeri rezultate i iteriraj** – marketing je proces, ne događaj.

Prediktivna analitika nije software, to je proces odlučivanja koji zna više od osjećaja u želucu. Ako ti je još uvijek marketing "šalji svima istu poruku i čekaj što će biti", vrijeme je da se probudiš. Konkurencija već koristi PA – i nećeš ih sustići samo s intuicijom i Excelom.

**P.S.** Ako misliš da je ovo previše komplicirano, sjeti se: tvoja konkurencija vjerojatno misli isto. To je tvoja prilika da ih ostaviš u prašini.
