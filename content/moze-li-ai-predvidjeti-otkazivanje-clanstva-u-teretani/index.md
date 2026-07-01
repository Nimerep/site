---
title: "Može li AI predvidjeti tko će otkazati članstvo u teretani?"
description: "Napravio sam churn model na 12.000 sintetičkih članova teretane. Evo što stvarno može predvidjeti, gdje vara i zašto visok rizik još nije retention strategija."
type: blog-post
nav: false
date: 2026-07-01
updated: 2026-07-01
author: Goran Peremin
tags: predictive analytics, churn, retention, machine learning, synthetic data, growth marketing
sourceURL: https://www.peremin.com/moze-li-ai-predvidjeti-otkazivanje-clanstva-u-teretani/
image: /media/posts/16/gym-churn-prediction.webp
---

Teretana može svaki mjesec dovesti 100 novih članova, otvoriti šampanjac zbog odlične kampanje i svejedno stajati na mjestu.

Zašto? Zato što na druga vrata možda izađe njih 95.

To je ona neugodna growth matematika koju nitko ne stavlja na Instagram. Akvizicija izgleda seksi. Retention izgleda kao Excel koji je netko zaboravio zatvoriti. Zato se budžeti često troše na nove leadove dok postojeći članovi tiho nestaju iz evidencije dolazaka, a zatim i iz prihoda.

Pa sam odlučio testirati jednostavno pitanje:

> Možemo li iz ponašanja člana prepoznati da će u sljedećih 30 dana otkazati članstvo?

Ne pomoću kristalne kugle, motivacijskog gurua ni AI agenta s LinkedIna. Pomoću podataka koje bi normalna teretana već mogla imati: dolasci, rezervacije, onboarding, korištenje aplikacije i plaćanja.

Rezultat je zanimljiv. Ali nije zanimljiv na način na koji ga prodaju AI prezentacije.

## Teretana nema samo problem s leadovima. Ima probušenu kantu

Churn je odlazak korisnika iz pretplatničkog poslovanja. Kod teretane to na prvu izgleda jednostavno: član je otkazao članarinu i više ne plaća.

U stvarnosti postoji nekoliko različitih stanja:

- član je službeno otkazao
- članarina je istekla i nije obnovljena
- naplata nije prošla
- član još plaća, ali već tjednima ne dolazi
- član je zamrznuo članstvo
- član se preselio, ozlijedio ili promijenio životni ritam

Ako sve to strpaš u jednu kolonu `churn = da/ne`, model će nešto izračunati. Računalo je vrlo uslužno na taj način. Neće ti reći da si poslovni problem definirao kao krumpir.

U ovom eksperimentu churn znači samo jedno:

**Član će otkazati ili neće obnoviti članstvo u sljedećih 30 dana.**

To je ista poslovna logika koju je koristio [WSDM Cup 2018 KKBox Churn Prediction Challenge](https://www.wsdm-conference.org/2018/call-for-participants.html). Tamo su natjecatelji predviđali hoće li korisnik obnoviti glazbenu pretplatu unutar 30 dana nakon isteka. Natjecanje je trajalo od rujna do prosinca 2017., a problem i podaci kasnije su opisani u [WSDM radu o preporukama i churnu](https://doi.org/10.1145/3159652.3160605).

Glazbeni streaming nije teretana. Ali pretplatnička matematika ima isti neugodan refren: dovesti korisnika nije dovoljno ako ga ne znaš zadržati.

## Zašto sam koristio sintetičke podatke

Nisam imao legalno dostupan dataset s poviješću dolazaka, naplate i otkazivanja stvarnih članova hrvatske teretane.

Mogao sam skinuti prvi sumnjivi CSV s interneta, ne pitati odakle je došao i ponašati se kao da sam otkrio penicilin. Nisam.

Napravio sam **12.000 sintetičkih mjesečnih snapshotova članova**. Svaki red predstavlja stanje jednog anonimnog člana u određenom mjesecu. Nema stvarnih imena, e-mailova, zdravstvenih podataka ni ljudi koji su se slučajno našli u nečijem exportu.

Generator je namjerno ugradio razumne odnose:

- dulja neaktivnost povećava rizik
- pad broja dolazaka povećava rizik
- neuspjela plaćanja povećavaju rizik
- česta otkazivanja rezervacija povećavaju rizik
- odrađen onboarding smanjuje rizik
- treninzi s trenerom i referral signal smanjuju rizik

To ne znači da su ti odnosi jednaki u svakoj stvarnoj teretani. Znači samo da imamo kontrolirani poligon na kojem možemo provjeriti pipeline bez prodavanja tuđe privatnosti za jedan blog post.

Istraživanja daju razuman kontekst za takvu simulaciju. Longitudinalna studija novih članova 25 fitness centara pratila je dolaske i dropout kroz 3 i 12 mjeseci te navodi da se u ranijoj literaturi procjenjuje kako 40%–65% ljudi koji započnu vježbati odustane u prvih 3–6 mjeseci. Važna sitnica: **exercise dropout nije isto što i otkazivanje plaćene članarine**. Ta razlika je upravo razlog zašto ne treba lijepiti dramatične fitness statistike na financijski churn bez čitanja fusnota. [Studija je javno dostupna u PMC-u](https://pmc.ncbi.nlm.nih.gov/articles/PMC6500212/).

### Što se nalazi u datasetu

| Skup podataka | Primjeri varijabli |
| --- | --- |
| Članstvo | trajanje članstva, tip plana, mjesečna cijena |
| Aktivnost | dolasci zadnjih 30 dana, dolasci mjesec ranije, promjena dolazaka |
| Neaktivnost | broj dana od posljednjeg dolaska |
| Engagement | korištenje aplikacije, rezervacije i otkazivanja termina |
| Odnos s teretanom | onboarding, treninzi s trenerom, referral |
| Operativa | problemi s naplatom i zahtjevi prema podršci |
| Cilj | otkazivanje u sljedećih 30 dana |

Dataset ima dvije godine mjesečnih snapshotova, od siječnja 2024. do prosinca 2025. Ukupna sintetička churn stopa iznosi **4,44%**, a u testnom razdoblju **4,45%**.

Sve možeš provjeriti, skinuti i rastaviti:

> [Preuzmi izvršeni Python notebook](/downloads/gym-churn-prediction/gym_churn_prediction.ipynb)
>
> [Preuzmi sintetički CSV s 12.000 redaka](/downloads/gym-churn-prediction/gym_members_churn_synthetic.csv)
>
> [Preuzmi rezultate u JSON formatu](/downloads/gym-churn-prediction/results.json)

Kod koji generira podatke i notebook nalazi se i u javnom [Nimerep/site repozitoriju](https://github.com/Nimerep/site). Ako dobiješ drugačiji rezultat s istim seedom, nešto se raspalo — i to je korisnija informacija od još jednog savršenog screenshot grafa.

## Kako sam namjerno izbjegao varanje

Kod churn modela vrlo je lako slučajno gledati u budućnost.

Ako u featuree ubaciš datum otkazivanja, konačni status članarine ili transakciju koja se dogodila nakon trenutka predviđanja, model će izgledati kao genij. U stvarnosti si mu dao odgovor na ispitu.

Zato sam napravio vremenski split:

- **9.976 redaka** do kolovoza 2025. koristi se za trening
- **2.024 retka** od rujna do prosinca 2025. koristi se za test

Nema random miješanja prošlosti i budućnosti. Model u testu vidi samo informacije koje bi bile dostupne u trenutku kada se odluka stvarno mora donijeti.

Također nisam ubacio:

- datum budućeg otkazivanja
- konačni status ugovora
- buduće naplate
- razlog odlaska zapisan nakon odlaska
- zdravstvene podatke

To bi trebalo biti očito. U churn projektima često nije.

## Prije AI-ja: pravilo od 14 dana

Prije modela postavio sam glupo jednostavan baseline:

> Ako član nije došao 14 ili više dana, označi ga kao rizičnog.

Nema strojnog učenja. Nema GPU-a. Nema konzultanta koji izgovara “digital transformation” dok traži HDMI adapter.

Pravilo je na testnim podacima imalo:

- precision **17,1%**
- recall **64,4%**
- ROC-AUC **0,749**

Drugim riječima, pravilo uhvati dosta budućih odlazaka, ali istodobno označi mnogo ljudi koji neće otići. To nije katastrofa. To je sasvim pristojan operativni početak koji se može složiti u gotovo svakom CRM-u.

Ako tvoj ML model ne može pobijediti razumno poslovno pravilo, ne treba ti bolji model. Treba ti hrabrost da ugasiš projekt.

## Dva modela. Jer zoološki vrt algoritama nikome ne pomaže

Testirao sam:

1. logističku regresiju
2. random forest

Logistička regresija je namjerno uključena. Objašnjiva je, brza i dosadna. To su često odlične osobine za model koji treba završiti u stvarnom poslovnom procesu.

Random forest je fleksibilniji i može uhvatiti nelinearne odnose. Ali “kompleksniji” nije poslovni KPI.

![Usporedba churn modela](/media/posts/16/model-comparison.png)

| Model | ROC-AUC | PR-AUC | Precision u top 10% | Recall u top 10% |
| --- | ---: | ---: | ---: | ---: |
| Logistička regresija | 0,863 | 0,431 | **26,2%** | **58,9%** |
| Random forest | 0,852 | 0,359 | 24,8% | 55,6% |
| Pravilo: nema dolaska 14+ dana | 0,749 | 0,126 | 17,1%* | 64,4%* |

\* Kod poslovnog pravila prikazani su precision i recall svih članova koje je pravilo označilo, a ne fiksnog top-decile segmenta.

Logistička regresija je pobijedila.

Nije spektakularno. Nije Transformer. Ne traži podatkovni centar veličine manjeg hrvatskog grada. Samo je bolje rangirala članove prema riziku.

## Accuracy je ovdje ukras za lošu prezentaciju

U testnom setu churn je 4,45%.

Model koji svakome kaže “ostat će” imao bi accuracy od 95,55%. Bio bi potpuno beskoristan, ali bi na slajdu izgledao odlično.

Zato sam gledao:

- **ROC-AUC:** koliko dobro model općenito razdvaja churnere od ostalih
- **PR-AUC:** koliko dobro radi kada je pozitivna klasa rijetka
- **precision u top 10%:** koliko je stvarnih budućih churnera među članovima koje možemo kontaktirati
- **recall u top 10%:** koliki dio svih budućih churnera nalazimo u toj maloj grupi

Teretana ne može svaki mjesec zvati sve članove. Može kontaktirati, primjerice, 10% najrizičnijih. Zato je precision u toj grupi operativno razumljiviji od jednog velikog postotka koji ništa ne pokreće.

U našem testu najrizičnijih 10% sadrži **26,2% stvarnih budućih churnera**.

Bazna churn stopa je 4,45%. To znači da model u toj ciljanoj grupi koncentrira budući churn oko **5,9 puta** bolje od nasumičnog odabira. Ujedno u tih 10% članova pronalazi 58,9% svih budućih odlazaka.

To je koristan ranking. Još uvijek nije retention strategija.

## Risk decili pokazuju radi li model ili samo lijepo govori

Članove sam podijelio u deset grupa prema predviđenom riziku. Prvi decil ima najniži rizik, deseti najviši.

![Churn stopa kroz risk decile](/media/posts/16/risk-deciles.png)

Ako se stvarna churn stopa ne povećava prema višim decilima, model nema stabilan ranking. Može imati finu metriku, ali neće dati dobru listu prioriteta.

Ovdje je rast jasan. Najrizičniji decil zaista sadrži znatno više budućih odlazaka.

To je ono što voditelj retentiona treba: ne još jedan dashboard, nego sortiranu listu na kojoj prvih 50 ljudi stvarno zaslužuje pažnju.

## Što je model prepoznao

Najjači pozitivni signali rizika bili su:

- više dana od posljednjeg dolaska
- pad broja posjeta u odnosu na prethodni mjesec
- neuspjela plaćanja
- otkazivanje rezerviranih termina
- vrlo kratko trajanje članstva

Zaštitni signali bili su:

- odrađen onboarding
- aktivnost u aplikaciji
- stabilni dolasci
- treninzi s osobnim trenerom
- doveden prijatelj

![Najjači churn signali](/media/posts/16/top-signals.png)

Ovo nisu kauzalne istine. Koeficijent ne znači da će slanje čovjeka na onboarding automatski poništiti churn. Znači da je u našem generatoru i modelu taj signal povezan s manjim rizikom kada ostale varijable držimo pod kontrolom.

U stvarnom datasetu rezultat može biti drugačiji. Možda problem nije onboarding nego parking. Možda trener odlazi. Možda je klima pokvarena treći tjedan. Model ne živi u teretani; on vidi samo kolone koje mu pošalješ.

## Pad dolazaka je signal. Nije dijagnoza

![Prosječan pad dolazaka prije churn-a](/media/posts/16/attendance-drop.png)

Članovi koji će otkazati u sintetičkim podacima u prosjeku pokazuju pad dolazaka. To ima intuitivnog smisla i poklapa se s idejom da ponašanje često oslabi prije formalnog odlaska.

Ali isti signal može značiti:

- godišnji odmor
- bolest ili ozljedu
- promjenu radnog vremena
- trudnoću
- selidbu
- trening na drugoj lokaciji
- jednostavno loš mjesec

Zato retention poruka ne bi trebala glasiti:

> Naš algoritam je zaključio da ćete nas napustiti. Evo 15% popusta.

To je marketinški ekvivalent tipa koji te prati po trgovini i šapće da zna što želiš.

Bolja intervencija može biti obična, ljudska i nenametljiva:

> Nismo te vidjeli neko vrijeme. Je li se promijenio termin koji ti odgovara ili ti možemo pomoći prilagoditi plan?

Model prioritizira razgovor. Ne vodi ga.

## Najvažniji problem: churn risk nije isto što i mogućnost spašavanja

Ovo je dio koji se zgodno izgubi u prodajnoj prezentaciji.

Churn model odgovara na pitanje:

**Tko će vjerojatno otići?**

Retention tim zapravo treba odgovor na drugo pitanje:

**Kod koga će naša intervencija promijeniti odluku?**

To nisu isti ljudi.

Netko ima visok rizik jer se preselio 300 kilometara dalje. Možeš mu poslati personaliziranu poruku, proteinsku pločicu i fotografiju cijelog tima. I dalje se neće voziti tri sata na leg day.

Druga osoba možda ima srednji rizik, ali bi ostala kada bi dobila novi termin grupnog treninga ili kratak razgovor s trenerom.

Randomizirani terenski eksperiment s tjednim e-mail podsjetnicima pokazao je upravo zašto treba razlikovati aktivnost od poslovnog ishoda: podsjetnici su povećali tjednu učestalost vježbanja za 13%, ali istraživači nisu pronašli učinak na trajanje ili obnovu članstva. [Rezultati su objavljeni u časopisu Experimental Economics](https://link.springer.com/article/10.1007/s10683-020-09693-5).

Više dolazaka zvuči dobro. Ali nije automatski isto što i više obnove.

Za procjenu inkrementalnog učinka treba:

1. odabrati rizične članove
2. nasumično dio staviti u treatment, a dio u holdout grupu
3. provesti istu intervenciju
4. mjeriti razliku u obnovi članstva
5. tek nakon toga graditi uplift model

Uplift modeliranje pokušava pronaći ljude kod kojih će intervencija uzrokovati promjenu, a ne samo ljude s visokim rizikom. Javni churn benchmark za takve modele opisan je u radu [A churn prediction dataset from the telecom sector: a new benchmark for uplift modeling](https://arxiv.org/abs/2312.07206).

Drugim riječima:

> Predikcija govori gdje gori. Eksperiment govori pomaže li tvoj aparat za gašenje.

## Koliko bi ovakav model mogao vrijediti

Napravimo scenarij za 1.000 aktivnih članova:

- kontaktiramo 10% najrizičnijih, odnosno 100 ljudi
- precision modela u toj grupi je 26,2%
- očekujemo oko 26 stvarnih budućih churnera
- pretpostavimo da intervencija spasi 20% njih
- to je oko 5,2 spašena člana
- mjesečna contribution marža je 33 €
- prosječno dodatno zadržavanje traje 6 mjeseci
- intervencija košta 8 € po kontaktiranom članu

Rezultat:

| Stavka | Procjena |
| --- | ---: |
| Bruto vrijednost zadržavanja | oko 1.039 € |
| Trošak intervencije | 800 € |
| Neto vrijednost prije fiksnih troškova | oko 239 € |

Je li to dobar posao? Možda.

Broj ovisi o najvažnijoj pretpostavci: **spašava li intervencija stvarno 20% rizičnih članova?**

Model to nije dokazao. Tu brojku sam postavio za scenarij. Bez holdout grupe ne znaš jesi li spasio člana ili dao popust osobi koja bi ionako ostala.

Upravo zato retention kampanje često izgledaju uspješno dok potajno pale novac. Ljudi koji prime ponudu ostanu, dashboard se zazeleni, svi se čestitaju — a nitko ne zna koliko bi ih ostalo bez ponude.

## Kako bih ovo pustio u stvarnu teretanu

Ne bih prvi dan spojio model na automatizirani sustav za popuste. Nisam toliko hrabar, a ni toliko lud.

Krenuo bih u četiri koraka.

### 1. Definicija churn-a

Dogovoriti razliku između:

- dobrovoljnog otkazivanja
- isteka bez obnove
- payment failurea
- zamrznutog članstva
- neaktivnosti bez otkazivanja

Ako financije, prodaja i marketing koriste tri definicije churn-a, model je najmanji problem u zgradi.

### 2. Jedan mjesečni member snapshot

Za svakog člana spremiti samo podatke dostupne na datum scoriranja. Ne prepisivati konačno stanje iz CRM-a unatrag.

Minimalan dataset:

- `member_id`
- `snapshot_date`
- `tenure_months`
- `visits_30d`
- `visits_prev_30d`
- `days_since_last_visit`
- `classes_cancelled_30d`
- `onboarding_completed`
- `payment_failures_90d`
- `churn_next_30d`

Ne treba ti data lake. Treba ti tablica kojoj vjeruješ.

### 3. Baseline prije modela

Testirati pravilo neaktivnosti od 14 dana i možda kombinaciju:

```text
14+ dana bez dolaska
ILI pad posjeta veći od 50%
ILI neuspjela naplata
```

Ako ta pravila rade dovoljno dobro za kapacitet retention tima, možda je to rješenje za prvu fazu.

### 4. Randomizirani retention test

Najrizičnije članove podijeliti na:

- kontrolnu grupu bez nove intervencije
- ljudsku check-in poruku
- razgovor s trenerom
- prilagodbu termina ili plana

Popust bih testirao zasebno. Popust je najlakši način da naučiš kupca čekati popust.

## Privatnost: ne treba ti krvna grupa za churn model

Fitness podaci mogu vrlo brzo postati osjetljivi.

Za ovaj problem najčešće ti ne trebaju:

- dijagnoze
- ozljede
- tjelesna masa
- fotografije
- detaljni podaci sa smart watcha
- precizna lokacija izvan teretane

Za početak su dovoljni operativni podaci o članstvu i korištenju usluge.

U stvarnom projektu provjerio bih:

- pravnu osnovu obrade
- svrhu i minimalni opseg podataka
- rok čuvanja member snapshotova
- pristup individualnim risk scoreovima
- mogućnost prigovora na automatizirano profiliranje
- koristi li se rezultat za pomoć članu ili agresivno cjenovno razlikovanje

GDPR problem ne nestaje zato što si stupac nazvao `feature_17`.

## Što ovaj eksperiment dokazuje

Dokazuje da:

- churn problem možemo prevesti u jasan prediction window
- jednostavan vremenski pipeline može rangirati rizične članove
- logistička regresija može pobijediti složeniji model
- top-decile precision daje operativno razumljiv rezultat
- sintetički podaci mogu poslužiti za razvoj i provjeru procesa
- churn score možemo prevesti u retention eksperiment i poslovni scenarij

## Što ovaj eksperiment ne dokazuje

Ne dokazuje da:

- model radi na stvarnoj hrvatskoj teretani
- prikazani signali uzrokuju churn
- kontaktiranje rizičnih članova smanjuje churn
- popust donosi inkrementalnu vrijednost
- sintetička stopa predstavlja industrijski benchmark
- AI zna zašto je konkretna osoba prestala dolaziti

Ovaj popis nije pravno pokriće sitnim slovima. To je pola kredibiliteta cijelog projekta.

## Zaključak: model nije retention strategija

Da, model može pomoći teretani prepoznati članove koji pokazuju obrasce odlaska.

U ovom eksperimentu najrizičnijih 10% članova sadrži gotovo šest puta veću koncentraciju budućeg churn-a od prosjeka. To je dovoljno dobro da pametnije rasporedimo ograničeno vrijeme retention tima.

Ali model ne zna:

- tko se može spasiti
- koja će poruka pomoći
- hoće li popust stvoriti vrijednost
- je li problem u cijeni, treneru, parkingu ili životu člana

To otkriva eksperiment.

Najbolji retention sustav zato nije automat koji dijeli kupone svima s crvenim scoreom. To je kombinacija dobrog podatkovnog signala, ljudske intervencije i poštenog mjerenja inkrementalnog učinka.

AI ti može reći kome prvo pokucati na vrata.

Još uvijek moraš znati razgovarati kada ih otvori.
