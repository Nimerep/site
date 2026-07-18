---
title: Marketing Hypeometar — je li trend stvaran ili je samo glasan?
description: Kako Marketing Hypeometar uspoređuje pažnju publike i istraživačku aktivnost te zašto popularnost marketinške teme nije isto što i dokaz poslovnog učinka.
type: blog-post
nav: false
date: 2026-07-15
updated: 2026-07-18
author: Goran Peremin
tags: marketing analytics, growth marketing, AI, research, data visualization, experimentation
sourceURL: https://www.peremin.com/marketing-hypeometar-kako-radi/
image: /media/posts/seo-covers/marketing-hypeometar.webp
---

Marketing svakih nekoliko mjeseci dobije novu temu koju svi moramo hitno razumjeti, implementirati i staviti u prezentaciju.

Jučer je to bila personalizacija. Danas je generativni AI. Sutra će netko izmisliti novi naziv za regresiju i prodavati je kao revoluciju.

Problem nije u novim idejama. Problem nastaje kada popularnost teme zamijenimo dokazom da nešto stvarno funkcionira.

Zato sam napravio [Marketing Hypeometar](/lab/hypeometar/).

Njegov zadatak nije predvidjeti budućnost niti odlučiti umjesto tebe. Hypeometar uspoređuje dva različita signala:

- koliko određena tema trenutačno privlači pažnju publike
- raste li istodobno i količina objavljenih istraživanja o toj temi

Jedan signal pokazuje koliko je tema glasna. Drugi pokazuje pokušava li je netko ozbiljno istražiti. Razlika između njih često je zanimljivija od samih brojeva.

## Odakle dolaze podaci?

Hypeometar koristi dva javno dostupna izvora: Wikimedia Analytics i Crossref.

### Wikipedia kao signal pažnje

Za mjerenje interesa koristim dnevne preglede relevantnog članka na engleskoj Wikipediji tijekom posljednjih 90 dana.

Za generativni AI promatram članak *Generative artificial intelligence*. Za predictive analytics koristim *Predictive analytics*. Kada tema nema vlastiti stabilan članak, koristim najbliži mjerljivi proxy i to ne skrivam. Za Optimization for AI Shoppers proxy je *Agentic commerce*, za Video-First Shoppable Feeds *TikTok Shop*, a za Hyper-Personalized Zero-Party Data *Customer data platform*.

Wikipedia pregled ne znači kupnju, promjenu strategije ili odobren budžet. Ali može biti koristan signal pažnje. Kada tema izađe iz uskog stručnog kruga, ljudi počinju tražiti objašnjenja, a dio tog interesa završava na Wikipediji.

Podaci dolaze iz javnog [Wikimedia Analytics API-ja](https://doc.wikimedia.org/generated-data-platform/aqs/analytics-api/).

### Crossref kao signal istraživačke aktivnosti

Crossref je javna baza metapodataka znanstvenih i stručnih publikacija. Hypeometar pretražuje naslove zapisa povezanih s odabranom temom i uspoređuje broj zapisa iz posljednjih 12 mjeseci s prethodnih 12 mjeseci.

Ako istodobno rastu interes publike i broj publikacija, tema možda ima nešto više temelja od običnog LinkedIn stampeda. Ako pažnja leti, a istraživačka aktivnost stoji, dobivamo drukčiju sliku: puno razgovora, ali još malo provjerenog znanja.

Crossrefov [javni REST API](https://www.crossref.org/documentation/retrieve-metadata/rest-api/) dostupan je bez registracije.

## Kako nastaje rezultat?

Hypeometar ne koristi umjetnu inteligenciju za izmišljanje presude. Račun je namjerno jednostavan i vidljiv.

Za pažnju publike uspoređujem prosječan broj dnevnih Wikipedia pregleda tijekom posljednjih 14 dana s prosjekom prethodna četiri tjedna.

Za istraživački signal uspoređujem broj Crossref zapisa iz posljednjih 12 mjeseci s prethodnim 12-mjesečnim razdobljem.

Oba rezultata pretvaraju se u indeks od 0 do 100:

- rezultat oko 50 znači da nema velikog pomaka
- rezultat iznad 50 označava rast
- rezultat ispod 50 označava pad
- veća udaljenost od 50 znači snažniju promjenu

:::chart
type: bar
title: Primjer čitanja Hypeometra — GEO, presjek 15. srpnja 2026.
labels: pažnja publike, istraživački signal
series.Indeks: 7, 69
:::

Ovaj presjek za Generative Engine Optimization dobro pokazuje zašto gledam oba signala. U trenutku mjerenja kratkoročna Wikipedia pažnja bila je 25,2% niža od prethodnog razdoblja, dok je Crossref bilježio 138.950 rezultata u posljednjih 12 mjeseci, oko 15,5% više nego godinu ranije.

To nije dokaz da GEO radi. Crossrefov rezultat uključuje i šire podudarnosti naslova. Ali pokazuje da dnevna pažnja i publikacijska aktivnost ne moraju hodati u istom smjeru. Upravo je zato konačna presuda manje važna od odnosa između signala.

## Četiri moguće presude

### Više dima nego dokaza

Pažnja raste znatno brže od istraživačke aktivnosti. Tema nije automatski beskorisna, ali je dobar kandidat za mali kontrolirani test, a loš kandidat za slijepo kopiranje.

### Dokazi ispred hypea

Istraživački signal jači je od javne pažnje. Tema možda nije konferencijski hit, ali vrijedi dublje kopati.

### Trend s pokrićem

Pažnja i istraživačka aktivnost istodobno snažno rastu. To još nije dokaz poslovnog učinka, ali nije ni samo buka.

### Signal je mlak

Nema dramatičnog pomaka. To često znači manje FOMO-a i više prostora za normalan eksperiment.

## Zašto sam napravio Hypeometar?

Zato što se u marketingu prečesto miješaju tri različite tvrdnje:

1. nešto je popularno
2. nešto je istraženo
3. nešto će profitabilno raditi u konkretnom poslovnom kontekstu

To nisu iste tvrdnje.

Popularnost može proizvesti dobru ideju za sadržaj. Istraživanja mogu dati kvalitetnu početnu hipotezu. Ali tek dobro postavljen eksperiment pokazuje djeluje li nešto na tvoje kupce, maržu i poslovni model.

Hypeometar zato nije alat za konačnu odluku. To je alat za postavljanje boljeg prvog pitanja:

> Gledam li stvaran signal ili samo temu o kojoj su svi odlučili pričati ovaj tjedan?

## Što rezultat ne govori?

Rezultat od 85 ne znači da će tehnologija povećati prodaju za 85%. Ne znači ni da je 85% pronađenih publikacija kvalitetno.

Hypeometar ne analizira metodološku kvalitetu svakog rada, reprezentativnost uzorka, citiranost, reproduktivnost, tržišnu potražnju ni poslovni rezultat implementacije.

Crossrefov zapis je metapodatak o publikaciji. Broj zapisa mjeri aktivnost, ne istinu. Wikipedia pregled mjeri pažnju, ne slaganje, kupovnu namjeru ni budžet.

Zato Hypeometar koristi kao radar, a ne kao autopilot. Radar ti može pokazati da se nešto događa. I dalje ti moraš odlučiti vrijedi li promijeniti smjer.

## Kako ga koristiti?

Odaberi temu u [Marketing Hypeometru](/lab/hypeometar/) i klikni **Izmjeri signal**.

Nemoj gledati samo konačnu oznaku. Pogledaj raste li pažnja, raste li broj publikacija, postoji li velik razmak između signala i ima li tema smisla za tvoj poslovni problem.

Ako postoji puno hypea i malo dokaza, kreni malim eksperimentom. Ako postoje dokazi, ali malo pažnje, možda si pronašao korisnu temu prije konkurencije. Ako oba signala rastu, istraži dublje — ali nemoj preskočiti validaciju na vlastitim podacima.

A ako oba padaju, nemoj automatski odbaciti temu. Dosadne metode često nastavljaju zarađivati novac dugo nakon što ih konferencije prestanu spominjati.

**Važno:** Hypeometar prikazuje relativnu promjenu javne pažnje i broja publikacija. Ne mjeri kvalitetu istraživanja, tržišnu potražnju ni očekivani poslovni učinak. Koristi ga za pronalaženje tema vrijednih daljnjeg istraživanja — ne kao zamjenu za eksperiment, analizu ili zdrav razum.
