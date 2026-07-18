---
title: Ekonometrija u marketingu: Od podataka do rezultata
description: Kako ekonometrijski modeli odvajaju korelaciju od učinka i pomažu povezati marketinške aktivnosti s prodajom, maržom i poslovnim rezultatom.
type: blog-post
nav: false
date: 2024-10-22
updated: 2026-07-18
author: Goran Peremin
tags: econometrics, marketing analytics, roi, attribution, media mix modeling
sourceURL: https://www.peremin.com/ekonometrija-u-marketingu-kako-pretvoriti-brojke-u-oruzje/
image: /media/posts/4/Ekonometrija-u-marketingu.webp
---

Marketing bez ekonometrije je kao rock koncert bez pojačala – svi trube, ali nitko ne čuje poruku. Evo kako integrirati modele u strategiju, a da ne postaneš rob tablica i formula.

## 1. **Ubij "zombie metriku" – fokusiraj se na pažnju, ne impresije**

Forget CTR i doseg. **Ekonometrija pažnje** pokazuje da je ključno *koliko dugo* korisnik zaustavlja pogled na oglasu, a ne koliko puta ga je vidio.

- **Primjer:** Ako 90% korisnika preskoči tvoj video oglas u prve 2 sekunde, tvoj CPM je bacanje novca.
- **Rješenje:** Koristi eye-tracking podatke i AI analitiku da mjeriš *stvarnu* pažnju (ne samo "viewability").

## 2. **Marketing mix modeliranje: Tko je kriv za pad prodaje?**

Kad šef upita "Zašto nam je ROI pao?", nemoj nagađati. **Hanssens (2014)** nudi framework za otkrivanje uzročno-posljedičnih veza:

- **Korak 1:** Izoliraj utjecaj svakog kanala (npr. koliko je Facebook doprinio, a koliko offline reklame).
- **Korak 2:** Identificiraj *lag efekt* – možda je TikTok kampanja djelovala tek nakon 3 tjedna.
- **Primjer iz prakse:** Jedan brend je otkrio da je 40% rasta prodaje uzrokovano... nestankom konkurentnog proizvoda s police. Bez modela, krivili bi SEO.

## 3. **Direktni marketing + SVM = Love bomb za high-value kupce**

Dosta slanja promo poruka svima. **Istraživanje** pokazuje kako **Support Vector Machine (SVM)** može identificirati kupce koji će ne samo odgovoriti na kampanju, već i biti profitabilni:

- **Balansiranje podataka:** Ako samo 5% baze generira 80% profita, klasični A/B testovi su beskorisni.
- **Tactical move:** Automatiziraj segmentaciju kupaca pomoću Python skripti (npr. scikit-learn biblioteka).

## 4. Dashboardi koji ne izgledaju kao NASA kontrolna ploča

**Pauwels (2014)** naglašava: "Dashboardi su za akciju, ne za impresije." Evo kako ih dizajnirati u rebelskom stilu:

**3 pravila:**

1. **Samo crveno/zeleno** – ako metrika nije alarmantna ili nije pobjeda, ne zaslužuje boju.
2. **Heatmap za kanale** – gdje gori, tamo šalji pojačanja.
3. **"Baci izvještaj" tipka** – ako dashboard ne možeš objasniti za 30 sekundi, redesign.

## 5. Eksperimenti koji ne završavaju otkazima

**Ariely** kaže: "Kompanije ne eksperimentiraju jer se boje da će dokazati da su pogriješile." Evo kako izvući što više iz testova:

- **Metoda:** A/B/n testovi s više varijanti (npr. 10 različitih CTA poruka umjesto 2).
- **Hack:** Koristi Bayesian statistiku da prekineš test čim postane jasno što radi (ne čekaj "95% significance").

## **Eksperimenti s "attention ROI-jem"**

**Michael H. Goldhaber** naglašava: Pažnja je valuta, a ne cilj. Mjeri je kao KPI:

- **Formula:**
`Attention ROI = (Ukupno vrijeme pažnje / Trošak kampanje) x 100`
- **Primjer:** Ako YouTube campaign košta 10,000€ i generira 50,000 minuta pažnje, ROI je 5 min/€. Usporedi s drugim kanalima.

## 6. Integracija modela u stvarni svijet: Što radiš kad algoritam lupi glupost?

Ekonometrijski modeli nisu sveti gral. **Srinivasan et al. (2010)** savjetuju kombinaciju "tvrdih" podataka i "mekih" insightsa:

- **Primjer:** Ako model kaže da cijena treba biti $99, ali fokus grupe kažu da je "prejeftino", poslušaj intuiciju.
- **Lifehack:** Napravi "model sanity check" checklistu (npr. "Jesmo li uključili sezonalnost?").

## Zaključak: Ekonometrija za buntovnike

Integriraj modele kao što Keith Richards integrira rifove – s distinkcijom, ali bez pretjerivanja. Koristi ih da:

- **Razotkriješ lažne uzroke** (npr. pad prodaje nije zbog lošeg SEO-a, već loše usluge)
- **Automatski optimiziraj budžete** (algoritamski, u stvarnom vremenu)
- **Preokreni priču** ("Da, potrošili smo više, ali smo izgradili brend equity")

Najbitnije: **Nikad ne dopusti da modeli postanu religija.** Kao što kaže **Lilien et al.**, najbolje marketinške odluke su mješavina krvi (podataka), znoja (testova) i suza (intuicije).
