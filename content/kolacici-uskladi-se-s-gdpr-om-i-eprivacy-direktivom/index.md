---
title: Kolačići i GDPR u Hrvatskoj: Što web shop mora imati
description: Praktičan vodič kroz cookie bannere, privolu, Google Analytics, Meta Pixel i Consent Mode prema GDPR-u, ZEK-u i službenim uputama AZOP-a.
type: blog-post
nav: false
date: 2025-05-18
updated: 2026-07-18
author: Goran Peremin
tags: gdpr, cookies, privacy, ecommerce, consent mode
sourceURL: https://www.peremin.com/kolacici-uskladi-se-s-gdpr-om-i-eprivacy-direktivom/
image: /media/posts/seo-covers/kolacici-privola.webp
---

Znaš onaj banner koji kaže: „Nastavkom korištenja stranice prihvaćate kolačiće”?

To nije privola. To je optimizam s obrubom i gumbom.

Ako vodiš web shop u Hrvatskoj, kolačići nisu samo pitanje GDPR-a. Primjenjuju se i hrvatski **Zakon o elektroničkim komunikacijama**, pravila o transparentnosti i privoli iz GDPR-a te praksa AZOP-a. Zato ćemo ovdje razdvojiti što zakon stvarno traži od onoga što cookie alat tvrdi da je „compliant by default”.

> Ovo je praktičan vodič, a ne individualni pravni savjet. Kod složenog praćenja, profiliranja ili prijenosa podataka izvan EGP-a uključi stručnjaka koji može pregledati stvarnu implementaciju, ne samo screenshot bannera.

## Koji se propisi primjenjuju?

Za hrvatski web shop najvažnija su tri sloja:

1. **Zakon o elektroničkim komunikacijama**, članak 43. stavak 4. — pohrana podataka ili pristup podacima na korisnikovu uređaju dopušteni su uz privolu nakon jasne i potpune obavijesti. Iznimka postoji za tehničku pohranu ili pristup koji su nužni za prijenos komunikacije ili uslugu koju je korisnik izričito zatražio. [ZEK, NN 76/22, s izmjenama 14/24 i 45/26](https://narodne-novine.nn.hr/clanci/sluzbeni/full/2022_07_76_1116.html)
2. **GDPR**, članci 6., 7. i 13. — kada se identifikatori i drugi podaci mogu povezati s osobom, trebaš odgovarajuću pravnu osnovu, valjanu i dokazivu privolu te jasne informacije o obradi. [Službeni hrvatski tekst GDPR-a](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=HR)
3. **Praksa AZOP-a** — AZOP je kod kolačića utvrdio povrede članaka 6., 7. i 13. GDPR-a kada nije bilo pravne osnove, zasebnog izbora i odgovarajućih informacija o funkciji i trajanju kolačića. [AZOP: kazne zbog nezakonite obrade putem kolačića](https://azop.hr/upravne-novcane-kazne-zbog-neovlastene-obrade-osobnih-podataka-putem-kolacica/)

Direktiva o e-privatnosti često se spominje u tekstovima i alatima, ali hrvatski web shop ne provodi direktivu iz PowerPointa. Za domaću primjenu gledaš pravilo preneseno u **članak 43. stavak 4. ZEK-a**, zajedno s GDPR-om.

## Nije svaki kolačić isti

Pravna podjela nije „Google kaže da je analytics pa je valjda u redu”. Bitno je što tehnologija stvarno radi i je li nužna za uslugu koju je korisnik zatražio.

### Nužne tehnologije

Primjeri mogu biti:

- identifikator košarice
- sigurnosna zaštita prijave
- raspodjela opterećenja
- spremanje korisnikova izbora privatnosti
- autentifikacija tijekom aktivne sesije

Za njih može vrijediti iznimka iz članka 43. stavka 4. ZEK-a ako su stvarno nužne. „Nama je marketing nužan za poslovanje” nije ta vrsta nužnosti. Lijep pokušaj, ali ne.

### Analitičke i marketinške tehnologije

Google Analytics, Meta Pixel, TikTok Pixel, session recording, atribucijski identifikatori i slične tehnologije u pravilu nisu potrebni da bi kupac otvorio stranicu, dodao proizvod u košaricu ili završio kupnju. Za njih treba provjeriti zahtjeve ZEK-a i GDPR-a prije aktivacije.

Pravilo se ne odnosi samo na datoteke koje se zovu cookies. Local Storage, SDK, fingerprinting, piksel ili drugi način pristupa informacijama na uređaju ne postaje nevidljiv zakonu zato što je tehnički moderniji.

## Kako mora izgledati stvaran izbor?

Na prvom sloju bannera ponudi:

- **Prihvati sve**
- **Odbij sve osim nužnih**
- **Postavke**

Opcija odbijanja treba biti jasna i dostupna bez lova na sivi link veličine fusnote. GDPR u članku 7. traži da povlačenje privole bude jednako jednostavno kao njezino davanje, a AZOP naglašava mogućnost zasebnog davanja i povlačenja privole prema vrstama kolačića.

Unaprijed označene kućice, šutnja, nastavak pregledavanja i banner bez izbora nisu valjana potvrda korisnikove volje. Definicija privole iz članka 4. točke 11. GDPR-a traži dobrovoljno, posebno, informirano i nedvosmisleno izražavanje volje jasnom potvrdnom radnjom.

## Što mora pisati u obavijesti?

Korisniku objasni:

- tko postavlja tehnologiju
- naziv i funkciju
- svrhu obrade
- kategoriju
- trajanje
- prima li podatke treća strana
- odvija li se prijenos izvan EGP-a
- kako promijeniti ili povući izbor
- gdje može pročitati cjelovitu politiku privatnosti

Članak 13. GDPR-a traži informacije o voditelju obrade, svrhama, pravnoj osnovi, primateljima, prijenosima, rokovima i pravima. Popis `cookie_123 — 90 dana` bez objašnjenja funkcije nije transparentnost. To je inventura bez prijevoda za ljude.

## Što se smije pokrenuti prije izbora?

Prije izbora blokiraj sve što nije obuhvaćeno nužnom iznimkom:

- marketinške piksele
- remarketing oznake
- nenužnu analitiku
- session recording
- personalizaciju oglasa
- cross-site identifikatore

Najčešća greška nije u tekstu bannera nego u redoslijedu učitavanja. Banner se nacrta nakon što su `page_view`, IP adresa, identifikator uređaja i marketinški događaj već poslani. U tom trenutku gumb „Odbij” više nije vremeplov.

## Google Consent Mode nije privola

Consent Mode je tehnički način slanja signala Googleovim oznakama o korisnikovu izboru. Ne stvara privolu, ne piše politiku privatnosti i ne popravlja pogrešno konfigurirane oznake.

Ako postaviš zadano stanje na `denied`, to još ne dokazuje da se nijedan drugi vendor nije pokrenuo. Provjeri mrežne zahtjeve, kolačiće i druge spremnike prije i nakon izbora.

Isto vrijedi za Google Tag Manager: GTM je alat za upravljanje oznakama, a ne pravna osnova. Ako je trigger pogrešan, samo će brže i urednije pokrenuti pogrešnu obradu.

## Kako dokazati privolu bez stvaranja nove baze problema?

Članak 7. stavak 1. GDPR-a stavlja teret dokazivanja privole na voditelja obrade. Zabilježi najmanje:

- pseudonimni identifikator privole
- datum i vrijeme
- verziju bannera i politike
- odabrane svrhe ili kategorije
- verziju popisa vendora
- povlačenje ili promjenu izbora

Nije propisano da zbog dokaza moraš vječno čuvati punu IP adresu. Primijeni načelo smanjenja količine podataka iz članka 5. stavka 1. točke (c) GDPR-a i spremi ono što je potrebno da dokažeš događaj.

## Brzi tehnički audit

1. Otvori stranicu u privatnom prozoru.
2. Nemoj kliknuti banner.
3. U DevToolsima pregledaj Network, Cookies, Local Storage i Session Storage.
4. Potraži zahtjeve prema Googleu, Meti, TikToku, Hotjaru i drugim vendorima.
5. Klikni „Odbij sve osim nužnih” i osvježi stranicu.
6. Prihvati samo analitiku i provjeri pokreće li se samo dopuštena kategorija.
7. Povuci privolu preko stalno dostupne poveznice i ponovi provjeru.
8. Usporedi stvarno ponašanje s politikom kolačića.

Audit ponovi nakon promjene teme, plugina, checkouta, GTM kontejnera ili marketinškog alata. Cookie popis nije tetovaža. Mijenja se čim netko u petak u 16:47 doda „samo jedan mali pixel”.

## Konkretno: AZOP-ove kazne od 20.000 i 30.000 eura

AZOP je dvama trgovačkim društvima izrekao kazne od **20.000 i 30.000 eura**. Među utvrđenim povredama bile su obrada putem kolačića bez pravne osnove, nemogućnost odgovarajućeg davanja i povlačenja privole te nedostatne informacije o funkciji i trajanju kolačića.

AZOP se u objavi konkretno pozvao na:

- članak 6. stavak 1. GDPR-a
- članak 7. GDPR-a
- članak 13. stavke 1. i 2. GDPR-a

Drugim riječima, kazna nije došla zato što banner nije bio dovoljno lijep. Došla je zato što obrada, izbor i informacije nisu bili zakoniti i dokazivi.

## Cookie checklista za hrvatski web shop

- [ ] Nenužne tehnologije blokirane su prije privole — članak 43. stavak 4. ZEK-a
- [ ] Privola je dobrovoljna, posebna, informirana i nedvosmislena — članak 4. točka 11. GDPR-a
- [ ] Privolu možeš dokazati — članak 7. stavak 1. GDPR-a
- [ ] Povlačenje je jednako jednostavno kao davanje — članak 7. stavak 3. GDPR-a
- [ ] Obavijest opisuje svrhe, primatelje i rokove — članak 13. GDPR-a
- [ ] Korisnik može zasebno upravljati kategorijama
- [ ] „Odbij sve osim nužnih” nije skriven
- [ ] Consent Mode i svi drugi tagovi tehnički su testirani
- [ ] Politika odgovara stvarnom stanju, uključujući vendore i trajanje
- [ ] Nakon odbijanja i povlačenja ne nastavlja se nenužno praćenje

## Zaključak

Dobar cookie banner nije onaj koji zauzima pola ekrana i ima sedam nijansi plave. Dobar banner zaustavlja nenužnu obradu, daje stvaran izbor, pamti ga u najmanjoj potrebnoj mjeri i omogućuje promjenu bez digitalne arheologije.

Za širu sliku — newsletter, dobavljače, prava kupaca, incidente, zaposlenike i zaštitu potrošača — pročitaj [naprednu GDPR checklistu za web shopove](/gdpr-checklista-za-e-commerce-bez-gluposti-samo-ono-sto-ti-zapravo-treba/).
