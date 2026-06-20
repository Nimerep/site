---
title: "Kako Automatski Optimizirati Slike za Web Shop Uz Pomoć Pythona"
description: "Ova skripta štedi sate rada i omogućava vam da brzo optimizirate sve slike za svoj web shop. Brža stranica znači zadovoljnije korisnike, bolju SEO poziciju"
type: blog-post
nav: false
date: 2025-05-25
updated: 2025-05-25
author: Goran Peremin
tags: python, image optimization, ecommerce, web performance, seo
sourceURL: https://www.peremin.com/kako-automatski-optimizirati-slike-za-web-shop-uz-pomoc-pythona/
image: /media/posts/12/Kako-Automatski-Optimizirati-Slike-za-Web-Shop-Uz-Pomoc-Pythona.jpg
---

Ako vodite web shop, već znate koliko je brzina učitavanja stranice ključna za uspjeh.

Brža stranica znači zadovoljnije korisnike, bolju SEO poziciju i, naravno, više prodaje. Jedan od ključnih koraka u optimizaciji brzine je pravilna optimizacija slika, a .webp format je tu neprikosnoveni prvak.

U ovom vodiču pokazat ću vam kako automatizirati proces optimizacije slika.

Skripta će resizeati slike na 1000x1000 piksela, komprimirati ih tako da zadrže kvalitetu, a zatim ih pretvoriti u .webp format, koji je posebno prilagođen za brzi web.

## Zašto koristiti .webp format?

**.webp je Googleov format slika dizajniran za web. **

Njegove prednosti su:

- Manja veličina datoteke: Slike su do 30% manje od JPEG-a ili PNG-a uz istu kvalitetu.
- Brže učitavanje: Manje datoteke znače brže učitavanje stranice.
- Podrška za transparentnost i animacije: Poput PNG-a i GIF-a, ali optimiziranije.

## Skripta za optimizaciju slika

Skripta koju ćemo koristiti obrađuje slike posebno prilagođene za proizvode (1:1 omjer) i automatski ih priprema za korištenje na web shopu.

Koraci:

- Resizea sliku na 1000x1000 piksela.
- Komprimira sliku kako bi zadržala vizualnu kvalitetu.
- Pretvara sliku u .webp format.

## Potrebni alati

Prije nego počnemo, osigurajte da imate instalirane sljedeće alate:

Python: Instalirajte Python 3.8 ili noviju verziju s python.org.

Knjižnice: Instalirajte potrebne knjižnice s: `pip install pillow`

## Kod za optimizaciju slika

```python
from PIL import Image
import os
from pathlib import Path

def optimize_image(input_folder):
    output_folder = os.path.join(input_folder, "optimized")
    os.makedirs(output_folder, exist_ok=True)

    for filename in os.listdir(input_folder):
        if Path(filename).suffix.lower() not in [".jpg", ".jpeg", ".png"]:
            continue

        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, f"{Path(filename).stem}.webp")

        try:
            print(f"Obrađujem: {filename}...")
            with Image.open(input_path) as img:
                if img.size[0] != img.size[1]:
                    print(f"Preskačem {filename}: nije 1:1 format.")
                    continue

                img_resized = img.resize((1000, 1000))
                img_resized.save(output_path, "WEBP", quality=85)
                print(f"Spremljena optimizirana slika: {output_path}")
        except Exception as e:
            print(f"Greška pri obradi {filename}: {e}")

if __name__ == "__main__":
    input_folder = input("Unesite put do mape sa slikama: ").strip()
    if not os.path.exists(input_folder):
        print("Greška: Mapa ne postoji!")
    else:
        optimize_image(input_folder)
        print("\nOptimizacija slika je završena! Provjerite 'optimized' mapu.")
```

## Kako pokrenuti skriptu?

1. Pripremite slike: Stavite sve slike proizvoda u jednu mapu.
2. Pokrenite skriptu: Unesite put do mape kad vas skripta pita.
3. Provjerite rezultate: Optimizirane slike nalazit će se u mapi optimized.

## Što je važno napomenuti?

- Format slike: Skripta radi samo s 1:1 slikama (kvadratni format). Za ostale omjere, trebate dodatne prilagodbe.
- Kvaliteta: Kompresija je postavljena na quality=85, što balansira kvalitetu i veličinu. Ako trebate još manju veličinu, možete smanjiti taj broj, ali pazite na vizualni izgled.

## Prednosti automatizacije

Ova skripta štedi sate rada i omogućava vam da brzo optimizirate sve slike za svoj web shop.

Brzina učitavanja stranica je ključna, a uz .webp format vaša stranica neće samo izgledati profesionalno, već će raditi brže od konkurencije. 🚀
