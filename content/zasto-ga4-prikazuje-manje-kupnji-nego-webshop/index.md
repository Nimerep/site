---
title: Zašto GA4 prikazuje manje kupnji nego webshop?
description: Razdvoji nedostajuće purchase događaje od razlika u atribuciji. Provjeri iste narudžbe, razdoblje, privolu i načine plaćanja prije promjene trackinga.
type: blog-post
nav: false
background: true
date: 2026-10-11
updated: 2026-10-11
author: Goran Peremin
language: hr
tags: ga4, ecommerce, analitika, atribucija
sourceURL: https://www.peremin.com/zasto-ga4-prikazuje-manje-kupnji-nego-webshop/
---

## Što napraviti, korak po korak

1. **Odaberi isto razdoblje u oba alata.** Provjeri vremensku zonu i pričekaj da izvještaji obrade podatke.
2. **Izdvoji usporedive online narudžbe.** Odvoji testne, otkazane i ručno unesene narudžbe. Uskladi tretman povrata.
3. **Pogledaj ukupan broj kupnji u GA4.** Nemoj ga zamijeniti brojem kupnji pripisanih samo Meti ili Google oglasima.
4. **Usporedi identifikatore narudžbi.** Provjeri koje narudžbe nedostaju i imaju li isti način plaćanja ili neki drugi zajednički podatak.
5. **Provjeri taj put kupnje.** U kontroliranoj probnoj narudžbi provjeri šalje li se događaj `purchase`, odnosno zapis kupnje, s ispravnim ID-jem i iznosom. Uključi i provjeru privole; za tehnički dio po potrebi uključi osobu koja održava webshop.

GA4 može prikazivati manje kupnji jer dio događaja ne stigne do analitike ili uspoređuješ različite narudžbe, razdoblja i izvještaje. Prvo provjeri nedostaju li kupnje u ukupnom GA4 rezultatu ili samo u rezultatu jednog kanala. Zatim usporedi iste narudžbe po identifikatoru transakcije. Sama razlika ne govori je li praćenje neispravno.

Ja bih odvojio pitanje „je li kupnja zabilježena?” od pitanja „kome je pripisana?”. Popravak atribucije neće vratiti događaj koji nikad nije poslan.

## Uspoređuješ li stvarno iste kupnje?

Uzmi jednako razdoblje i provjeri vremensku zonu. Iz webshopa izdvoji usporedive online narudžbe. Razdvoji testne i otkazane narudžbe, povrate te narudžbe koje je osoblje unijelo ručno. Kod plaćanja pouzećem razlikuj zaprimljenu narudžbu od naplaćene i preuzete pošiljke.

Broj događaja `purchase`, broj transakcija i prihod nisu ista mjera. Uskladi i osnovu prihoda: jesu li uključeni dostava, porez i povrati? Shopify u [dokumentaciji o razlikama analitike](https://help.shopify.com/en/manual/reports-and-analytics/discrepancies) objašnjava da izvještaji i alati mogu različito mjeriti podatke.

## Nedostaje li događaj ili zasluga kanala?

| Opažanje | Što prvo provjeriti |
|---|---|
| Narudžba postoji, u GA4 nema transakcije | Slanje događaja, privolu i konkretan put kupnje |
| Kupnja postoji, ali nije pripisana Meti | Opseg izvještaja, atribuciju i oznake kampanje |
| Kupnje se slažu, prihod ne | Vrijednost, valutu, porez, dostavu i povrate |
| Razlika se pojavila nakon izmjene stranice | Integraciju, okidače i ponašanje potvrde narudžbe |

Ako ukupna kupnja postoji, traži problem kanala odvojeno.

## Kako pronaći kupnje koje nedostaju?

Napravi pregled s identifikatorom narudžbe, vremenom, načinom plaćanja i statusom. Usporedi ga s dostupnim GA4 transakcijama. Provjeri mapiraju li obje integracije isti identifikator; broj narudžbe i interni ID ne moraju biti jednaki.

Izdvoji uzorak nedostajućih transakcija. Imaju li isti način plaćanja ili su nastale nakon povratka s vanjske naplate? Prođi taj put u kontroliranom testu i provjeri šalje li se `purchase` za završenu kupnju, s očekivanim `transaction_id`, vrijednošću i valutom.

Googleova [dokumentacija mjerenja eCommercea](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce) opisuje događaje kupnje i povrata. Za pravilnu identifikaciju kupnje pogledaj i [dokumentaciju identifikatora transakcije](https://support.google.com/analytics/answer/12313109?hl=en).

## Hoće li server-side praćenje riješiti sve?

Može pomoći kad je problem u browseru, ali nije automatsko rješenje. Pogrešan ID, vrijednost ili povezivanje događaja ostaju pogrešni i kad ih šalje poslužitelj. Ako dvije integracije šalju istu kupnju, prvo provjeri udvostručavanje.

Privolu provjeri kao dio implementacije. Poslužiteljsko slanje ne uklanja obveze zaštite podataka. Za taj dio nastavi na [kolačiće i privole](/kolacici-uskladi-se-s-gdpr-om-i-eprivacy-direktivom/).

Za operativni pregled prodaje kreni od usklađenih narudžbi, naplate i povrata. GA4 koristi za ponašanje i analizu kanala, uz poznata ograničenja. Ako platforme zajedno prijavljuju višak prodaje, pročitaj [zašto se Meta i Google Ads rezultati ne zbrajaju](/zasto-meta-i-google-ads-prijavljuju-vise-prodaje-nego-webshop/).

Izvori provjereni 11. listopada 2026. Ne postoji jedan postotak razlike koji dokazuje da je svaka implementacija ispravna.
