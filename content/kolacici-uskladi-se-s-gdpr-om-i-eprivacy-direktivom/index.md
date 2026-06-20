---
title: "Kolačići - uskladi se s GDPR-om i ePrivacy Direktivom"
description: "Znaš onu poruku kad dođeš na webshop i iskače ti \"Ova stranica koristi kolačiće kako bi poboljšala iskustvo korisnika\"? Super. Samo što to nije ni…"
type: blog-post
nav: false
date: 2025-05-18
updated: 2025-05-18
author: Goran Peremin
tags: gdpr, cookies, privacy, ecommerce, consent mode
sourceURL: https://www.peremin.com/kolacici-uskladi-se-s-gdpr-om-i-eprivacy-direktivom/
---

# Kolačići - uskladi se s GDPR-om i ePrivacy Direktivom

Znaš onu poruku kad dođeš na webshop i iskače ti "Ova stranica koristi kolačiće kako bi poboljšala iskustvo korisnika"?

Super. Samo što to **nije ni blizu dovoljno da budeš usklađen s GDPR-om i ePrivacy Direktivom. ****U ovom blogu neću ti prodavat template. Nego ti točno pišem što trebaš znati i što napraviti da ne dobiješ kaznu.**

## 🔍 ŠTO SU KOLAČIĆI?

Kolačići su male tekstualne datoteke koje tvoj site šalje na uređaj korisnika.
Zvuči bezazleno, ali preko njih pratiš korisnike, skupljaš podatke i šibaš ih trećim stranama (npr. Meta, Google, TikTok...). To su mali komadići koda koji te prate po webu, skupljaju podatke o tvojim navikama, interesima, pa čak i lokaciji. I ne, nije to samo “za tvoje dobro” i “bolje korisničko iskustvo”. U stvarnosti, to je alat za praćenje i profiliranje korisnika – i tu prestaje šala.

Kolačići se dijele u 3 grupe:

1. **Nužni kolačići** – bez njih site ne radi (npr. spremanje proizvoda u košaricu)
2. **Statistički kolačići** – npr. Google Analytics
3. **Marketinški kolačići** – npr. Facebook Pixel, remarketing, cross-site tracking

## Što zakon stvarno traži?

- **Transparentnost:** Moraš jasno objasniti koje kolačiće koristiš (analitički, marketinški, nužni, itd.), što rade i koliko dugo ih čuvaš.
- **Pristanak:** Ne smiješ automatski postavljati kolačiće osim nužnih prije nego korisnik pristane.
- **Mogućnost odbijanja:** Korisnik mora moći odbiti kolačiće jednako lako kao što ih može prihvatiti.
- **Dokumentacija pristanka:** Moraš moći dokazati da si dobio pristanak (logiranje, timestamp, itd.).

## 🔥 GDJE SVI GRIJEŠE?

### ❌ 1. "Informacijski" banner bez mogućnosti izbora

>

*“Nastavkom korištenja stranice pristajete na kolačiće.”*

Ne. To nije privola.
To je tvoja želja da sve prođe ispod radara.

### ❌ 2. Prethodno učitavanje kolačića

Ako tvoj banner još nije ni kliknut, a kolačići se već šalju (pogledaj u Dev Tools → Application → Cookies), imaš problem.

### ❌ 3. Sve ili ništa opcije

Ne možeš nuditi “Prihvati sve” bez “Odbij sve”.
GDPR traži ravnopravan izbor. Ako jedno dugme imaš istaknuto, drugo mora biti jednako dostupno.

## ✅ KAKO TO IZGLEDA ISPRAVNO?

### 1. **Banner prije ikakvog kolačića (osim nužnih)**

Ništa se ne smije pokrenuti dok korisnik ne klikne “Prihvati”.

### 2. **Jasne kategorije + upravljanje privolom**

Npr.:

- ✅ Nužni
- ⬜ Statistički
- ⬜ Marketinški
- link na detaljan prikaz (tko, što, koliko dugo)

### 3. **Odbij sve = obavezan gumb**

Moraš dati opciju da odbiju sve osim nužnih kolačića.

### 4. **Privolu moraš moći dokazati**

IP, vrijeme, ID korisnika, odabrane postavke – sve moraš logirati. Nema toga “pa to je samo klik”.

### 5. **Privolu moraš omogućiti za povlačenje**

Link u footer: “Upravljaj kolačićima” ili “Promijeni postavke kolačića”. Uvijek dostupan.

## 📌 PRIMJER IZ PRAKSE: SLOVO ZAKONA

U **presudi iz Danske (2021., Datatilsynet)**, web trgovina je kažnjena jer su **učitavali analitičke kolačiće prije pristanka**. Nisu imali odvojene kategorije.
Kazna: 100.000 DKK.
Razlog? **Korisnik nije imao realan izbor.** Ništa nije bilo transparentno.

Isto se ponavlja u Italiji, Njemačkoj, Francuskoj.

## ⚙️ KOJI ALATI SU OK?

Ako ne znaš kako sve gore sprovesti tehnički, koristi neki od ovih alata:

- **Cookiebot** (freemium)
- **Iubenda**
- **Complianz** (za WordPress)
- **CookieYes**

Ali – ne vjeruj da su automatski usklađeni. Moraš ih pravilno konfigurirati.

## 🧠 MOJE ISKUSTVO (DPO perspektiva)

U zadnjih godinu dana, više od 10 webshopova koje sam analizirao imalo je "fake" kolačić-bannere.

Bannere koji samo izgledaju zakonito, ali u pozadini šalju podatke čim se otvori stranica.

Najčešći uzrok?

Ugrađeni tracking kodovi u `<head>` bez kontrole aktivacije.
Rješenje? Tag Manager + condition + consent trigger.

## Što ako ignoriram ove zahtjeve?

Osim potencijalnih kazni (koje mogu doseći i do **20 milijuna eura ili 4% godišnjeg prometa**), riskirate i gubitak povjerenja korisnika. U doba kada je privatnost sve važnija tema, korisnici cijene transparentnost.

Moje iskustvo s klijentima koji su implementirali kvalitetne sustave za upravljanje kolačićima pokazuje da to zapravo može povećati povjerenje korisnika i konverzije. Jedan moj klijent je nakon implementacije transparentnog sustava za upravljanje kolačićima zabilježio **povećanje stope konverzije**!

## 📝 CHECKLISTA ZA KOLAČIĆE

✅ Imaš li funkcionalan banner prije postavljanja bilo kojeg nenužnog kolačića?
✅ Imaš li jasne kategorije + opise?
✅ Imaš li “Odbij sve” opciju?
✅ Bilježiš li sve privole (i odbijanja)?
✅ Može li korisnik kasnije promijeniti izbor?
✅ Imaš li politiku kolačića dostupnu i razumljivu?

Ako bilo što od ovoga fali, nisi usklađen.

## 🎤 ZAKLJUČAK

Kolačići su postali prva točka GDPR inspekcija.
Ne postoji "ali mi to svi tako radimo".
Ako ti kolačići prate korisnika, ti si odgovoran. Točka.

Uredi banner, kontroliraj kodove, dokumentiraj privole.
Sve ostalo je riskiranje kazne.
