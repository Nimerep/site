---
title: Zašto Meta i Google Ads zajedno prijavljuju više prodaje nego webshop?
description: Meta i Google Ads mogu pripisati zaslugu istoj narudžbi. Primjer pokazuje zašto se rezultati ne zbrajaju i kako usporediti oglase sa stvarnom prodajom.
type: blog-post
nav: false
background: true
date: 2026-10-11
updated: 2026-10-11
author: Goran Peremin
language: hr
tags: ecommerce, atribucija, meta ads, google ads, roas
sourceURL: https://www.peremin.com/zasto-meta-i-google-ads-prijavljuju-vise-prodaje-nego-webshop/
---

## Što napraviti, korak po korak

1. **Zapiši stvarnu prodaju iz webshopa.** Za odabrano razdoblje provjeri narudžbe, naplatu i povrate.
2. **Zbroji trošak Meta i Google oglasa.** Njihove prijavljene prihode drži odvojeno: ista kupnja može biti u oba izvještaja.
3. **Uskladi usporedbu.** Provjeri vremensku zonu, valutu i uključuju li iznosi porez i dostavu.
4. **Provjeri pravila pripisivanja kupnji.** U oba računa pogledaj koliko dugo nakon klika ili prikaza oglasa platforma može pripisati kupnju sebi i računa li se samo kupnja kao cilj.
5. **Odvoji preklapanje od pogreške.** Ako obje platforme pripisuju istu kupnju, nemoj je brojiti dvaput. Ako jedna platforma istu kupnju bilježi dvaput, provjeri šalje li se zapis kupnje više puta.

Meta i Google Ads mogu prijaviti više prodaje nego webshop jer svaka platforma zasebno pripisuje zaslugu kupnjama prema svojim pravilima. Ista narudžba može biti u oba izvještaja. Zato njihove atribuirane prihode nemoj zbrajati kao jedinstvenu prodaju. Prvo usporedi definicije, razdoblja i postavke, pa provjeri postoje li i tehnički duplikati.

Ja bih za početak pitao koliko je stvarnih narudžbi završilo kupnjom i koliko je ukupno potrošeno na oglase. Tek onda bih gledao kako platforme dijele zaslugu.

## Kako dvije platforme mogu pripisati istu kupnju?

Izmišljeni primjer: kupac klikne Meta oglas, kasnije pretraži brend i klikne Google oglas. Zatim jednom kupi za 80 €. Ako oba dodira zadovoljavaju pravila pripisivanja odgovarajućih platformi, oba izvještaja mogu prikazati tu kupnju.

| Izvor | Prijavljeni prihod |
|---|---:|
| Webshop: jedna narudžba | 80 € |
| Meta: pripisana kupnja | 80 € |
| Google Ads: pripisana kupnja | 80 € |
| Pogrešan zbroj platformi | **160 €** |

Kupac nije platio dvaput. Dvije platforme zasebno su pripisale zaslugu.

## Što provjeriti prije zaključka da praćenje ne radi?

Usporedi što se računa kao konverzija. Je li u oba izvještaja samo kupnja ili su uključeni i drugi ciljevi? Zapiši prozore atribucije i uključuje li izvještaj zaslugu nakon prikaza oglasa ili nakon klika.

Provjeri vremensku zonu, valutu i osnovu prihoda. Pripisivanje prema vremenu interakcije s oglasom može dati drukčiji raspored prodaje od izvještaja prema vremenu kupnje. Google u [dokumentaciji atribucijskih izvještaja](https://support.google.com/google-ads/answer/1722023?hl=en) objašnjava opseg svojih putanja i prozora konverzije.

Preklapanje platformi odvoji od tehničkog duplikata unutar jedne platforme. Dvostruko poslan događaj iste kupnje problem je implementacije. Dodavanje identifikatora u GA4 ne deduplicira automatski Metin i Google Ads izvještaj međusobno.

Ako nedostaju kupnje, koristi [postupak usporedbe GA4 i webshopa](/zasto-ga4-prikazuje-manje-kupnji-nego-webshop/).

## Kako pratiti rezultat bez pogrešnog zbrajanja?

Vodi odvojeno stvarnu prodaju, trošak oglasa i atribuirane rezultate kanala. Za poslovni pregled koristi narudžbe s usklađenim statusima, naplatom i povratima. Iz njih izračunaj doprinos nakon troškova.

Primjer: webshop ima 10.000 € prihoda na dosljednoj neto osnovi, a Meta i Google Ads zajedno stoje 2.000 €. Omjer ukupnog prihoda i ukupne potrošnje na oglase je 5. To nije dokaz da su oglasi uzrokovali svih 10.000 € prodaje: u prihod ulaze i kupnje iz drugih izvora.

Prati taj omjer kroz usporediva razdoblja uz maržu, nove kupce i ponovne kupnje. Za održiv budžet koristi [izračun dopuštenog troška oglasa po narudžbi](/koliko-smijem-potrositi-na-oglase-po-narudzbi/).

## Koji je kanal donio dodatnu prodaju?

Atribucija opisuje dodjelu zasluge. Sama ne dokazuje koliko bi kupnji izostalo bez oglasa. Za taj odgovor trebaju prikladan eksperiment ili pažljivo postavljena procjena, ovisno o prometu i mogućnostima poslovanja.

To je posebno važno kod [oglasa za vlastiti brend](/treba-li-placati-google-oglase-za-vlastiti-brend/). Za širi pogled nastavi na [marketing ROI i poslovni rezultat](/roi-nije-jedan-broj-kako-povezati-metrike-modele-i-zdrav-razum-u-marketingu/).

Izvori provjereni 11. listopada 2026. Svi iznosi su ilustrativni; provjeri stvarne postavke atribucije svojih računa.
