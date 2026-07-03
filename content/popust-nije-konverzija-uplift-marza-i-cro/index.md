---
title: Popust nije konverzija — uplift, marža i CRO
description: Kupon može podići conversion rate i istodobno pojesti profit. Uplift odvaja kupce koje je ponuda stvarno pomaknula od onih kojima smo samo platili kupnju koju bi ionako napravili.
type: blog-post
nav: false
date: 2024-11-21
updated: 2024-11-21
author: Goran Peremin
tags: ecommerce, cro, uplift modeling, marketing analytics, profit, experimentation
sourceURL: https://www.peremin.com/popust-nije-konverzija-uplift-marza-i-cro/
image: /media/posts/18/popust-nije-konverzija.webp
---

Popust je najbrži način da conversion rate izgleda bolje na sastanku.

Pustiš kupon od 7 eura, prodaja skoči, dashboard pozeleni i svi nakratko izgledaju kao da znaju što rade. Problem počinje kada netko pita koliko je dodatnog profita ostalo nakon što smo popust dali i ljudima koji bi kupili bez njega.

Tu konverzija prestaje biti odgovor.

Pravo pitanje nije: **tko je kupio nakon kupona?**

Pravo pitanje je: **tko je kupio zbog kupona?**

Ta razlika zove se inkrementalni učinak ili uplift. Nije nova naljepnica za conversion rate. To je pokušaj mjerenja uzroka.

## Podaci koji dopuštaju pošten odgovor

Za ovakav problem trebaju nam tretirana i kontrolna skupina. Bez kontrole imamo prodaju nakon kampanje, ali nemamo vjerodostojan odgovor što bi se dogodilo bez kampanje.

[Criteo Uplift Prediction Dataset](https://ailab.criteo.com/criteo-uplift-prediction-dataset/) nastao je spajanjem više randomiziranih testova inkrementalnosti oglašavanja. Ispravljena, nepristrana verzija sadrži 13.979.592 retka, prosječnu stopu posjeta od 4,6992%, prosječnu stopu konverzije od 0,292% i oko 85% tretiranih korisnika.

Objavljena shema navodi anonimizirane značajke `f0` do `f11` te četiri stupca koja su ovdje bitna:

| stupac | značenje |
|---|---|
| `treatment` | 1 ako je korisnik dodijeljen tretmanu, 0 ako je u kontroli |
| `conversion` | 1 ako je korisnik konvertirao |
| `visit` | 1 ako je korisnik posjetio odredište |
| `exposure` | 1 ako je tretirani korisnik stvarno bio izložen poruci |

Anonimizirani stupci nisu idealni za poslovno objašnjenje, ali struktura testa jest. U vlastitom web shopu umjesto `f0` želiš varijable koje postoje prije odluke o kuponu: broj prethodnih narudžbi, recency, kategoriju zadnje kupnje, prosječnu maržu, uređaj, izvor dolaska i je li proizvod već bio snižen.

Ako u model ubaciš podatak koji nastaje nakon slanja kupona, primjerice vrijednost košarice te narudžbe, model više ne predviđa odluku. Čita tragove događaja koji se već dogodio. To je leakage, samo uredno zapakiran.

## Uplift bez magle

Za randomizirani test prosječni uplift u konverziji je razlika stopa između tretmana i kontrole:

$$\tau = P(Y=1 \mid T=1) - P(Y=1 \mid T=0)$$

`Y` je ishod, ovdje kupnja. `T=1` označava tretman, a `T=0` kontrolu. Ako tretman konvertira 4,20%, a kontrola 3,55%, uplift iznosi 0,65 postotnih bodova.

To nije rast od 0,65%. Relativni rast iznosi približno 18,31%, jer se 0,65 dijeli s početnih 3,55. Miješanje postotaka i postotnih bodova proizvodi vrlo kreativne prezentacije i vrlo loše budžete.

Kasnije možemo tražiti segmente koji reagiraju bolje ili lošije: nove kupce, stare kupce, lovce na popuste ili ljude koji već mjesecima nisu kupili. Ali baza mora ostati ista — nasumično odabrana kontrolna skupina. Kod običnih povijesnih kampanja korisnici s kuponom često nisu usporedivi s onima bez kupona, pa razlika može biti posljedica načina odabira, a ne same ponude.

## Konverzija raste, profit pada

Uzmimo transparentan radni primjer. Nije rezultat Criteovih podataka, nego mali kontrolni račun koji svatko može ponoviti.

U tretmanu imamo 10.000 korisnika i 420 kupnji. U kontroli također imamo 10.000 korisnika i 355 kupnji. Doprinosna marža prije kupona iznosi 24,50 eura po narudžbi, a kupon 7 eura.

| skupina | kupnje | marža po kupnji | ukupna marža |
|---|---:|---:|---:|
| kupon | 420 | 17,50 € | 7.350,00 € |
| kontrola | 355 | 24,50 € | 8.697,50 € |

Dobili smo 65 dodatnih narudžbi i izgubili 1.347,50 eura doprinosa. Razlog nije skriven u nekom sofisticiranom modelu. Kupon smo platili na svih 420 tretiranih kupnji, uključujući 355 kupnji koje kontrolna skupina sugerira da bi se dogodile i bez njega.

Račun je neugodno jednostavan: dodatna marža od novih kupnji mora biti veća od popusta koji smo podijelili na sve kupnje. Ako nije, conversion rate je narastao, a posao se smanjio.

:::chart
type: bar
title: Konverzija po uplift segmentu — radni primjer
labels: negativni uplift, slabi uplift, jaki uplift, svi korisnici
series.Kontrola (%): 3.90, 3.60, 3.15, 3.55
series.Kupon (%): 3.70, 4.00, 4.90, 4.20
:::

Graf pokazuje zašto prosjek skriva novac. Segment s jakim upliftom reagira dovoljno da može pokriti cijenu kupona. Segment s negativnim upliftom kupuje manje uz kupon nego bez njega. Takav rezultat može biti šum, loša izvedba testa ili stvarna reakcija na poruku. U svakom slučaju nije dozvola da mu pošaljemo još tri kupona.

## Četiri vrste kupaca, jedna neugodna istina

Uplift logika korisnike promatra kroz dva potencijalna ishoda: bi li kupili s ponudom i bi li kupili bez nje. Za istu osobu nikada ne možemo istodobno vidjeti oba ishoda. Zato govorimo o procjeni, ne o čitanju misli.

Poslovno su zanimljive četiri skupine. Persuadables kupuju zbog ponude. Sure things kupili bi svakako. Lost causes neće kupiti ni uz ponudu. Sleeping dogs mogu reagirati negativno.

Najskuplja pogreška obično nisu ljudi koji nisu kupili. To su kupci koji jesu kupili, ali bi kupili i bez popusta. Dashboard ih pripiše kampanji, marža ih pamti drukčije.

## CRO test mora imati financijski ishod

Klasični A/B test često završava na stopi kupnje ili prihodu po posjetitelju. Za promociju to nije dovoljno. Minimalna tablica eksperimenta treba imati:

| polje | zašto postoji |
|---|---|
| `assigned_variant` | čuva izvornu randomizaciju |
| `exposed` | razlikuje dodjelu od stvarne izloženosti |
| `converted` | bilježi primarni događaj |
| `gross_revenue` | prihod prije povrata i poreznih prilagodbi |
| `cogs` | trošak robe |
| `discount_amount` | stvarno iskorišten popust |
| `payment_and_fulfilment_cost` | varijabilni trošak narudžbe |
| `returned_amount` | prihod izgubljen povratom |

Doprinosna marža tada nije ukrasni KPI. Od prihoda oduzmemo trošak robe, popust, varijabilne troškove plaćanja i dostave te povrate. Ono što ostane uspoređujemo između tretmana i kontrole.

Prije testa treba odrediti vremenski prozor. Ako kupnju brojimo sedam dana nakon kupona, isti prozor mora vrijediti za tretman i kontrolu. Ako promocija samo pomakne kupnju iz sljedećeg tjedna u ovaj tjedan, kratki prozor može prijaviti pobjedu tamo gdje se samo promijenio datum.

## Što bih stvarno pustio u produkciju

Prvo običan randomizirani test s kontrolom. Zatim izvještaj po marži, ne samo po konverziji. Tek nakon dovoljno podataka uplift model i segmentacija.

Model bih evaluirao na odvojenom testnom razdoblju, a kampanju bih ipak ponovno randomizirao unutar odabranog segmenta. Model može dobro rangirati korisnike i svejedno propasti kada se promijene cijene, sezona ili ponuda.

Najvažnija odluka nije koji algoritam koristiti. Najvažnija odluka je odbiti slanje popusta ljudima za koje nemamo dokaz da ih treba pomaknuti.

Popust nije konverzija. Popust je trošak kojim pokušavamo kupiti inkrementalno ponašanje. Ako ne mjerimo inkrement, ostaje nam samo skuplja verzija prodaje koju smo već imali.

## Izvori i provjera

- [Criteo AI Lab — Uplift Prediction Dataset](https://ailab.criteo.com/criteo-uplift-prediction-dataset/)
- [Diemert i sur. — A Large Scale Benchmark for Uplift Modeling](https://arxiv.org/abs/2111.10106)
