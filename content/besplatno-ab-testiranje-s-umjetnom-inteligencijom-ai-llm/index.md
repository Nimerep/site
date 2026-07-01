---
title: "Besplatno A/B testiranje s umjetnom inteligencijom (AI + LLM)"
description: "Testirao sam nešto što klasični marketing nikad ne bi odobrio – besplatno A/B testiranje s umjetnom inteligencijom (AI + LLM) U ovom postupku koristimo gen"
type: blog-post
nav: false
date: 2025-05-26
updated: 2025-05-26
author: Goran Peremin
tags: ai, llm, ab testing, genagents, ecommerce
sourceURL: https://www.peremin.com/besplatno-ab-testiranje-s-umjetnom-inteligencijom-ai-llm/
image: /media/posts/13/Besplatno-AB-testiranje-s-umjetnom-inteligencijom-AI-LLM.webp
---

Testirao sam nešto što klasični marketing nikad ne bi odobrio – **besplatno A/B testiranje s umjetnom inteligencijom (AI + LLM)**

U ovom postupku koristimo generativne agente (**GenAgents**) **temeljene na istraživanjima sa Stanforda**, koji simuliraju ponašanje korisnika s visokim stupnjem podudarnosti sa stvarnim odlukama (do 85%).

Umjesto da bacam pare na klikove koji možda nikad ne dođu, pokrenuo sam simulaciju s 1.000 virtualnih agenata koji reagiraju kao stvarni ljudi. Svaka varijanta oglasa dobila je svoj scenarij, svaki agent imao je stav, predrasude i ponašanja.

## 1. Postavljanje virtualnog laboratorija

Za pokretanje virtualnog laboratorija potreban je Python 3.7 ili noviji te stabilna internetska veza za pristup [OpenAI API](https://platform.openai.com/docs/overview)-ju. Preporučuje se komp s minimalno 8 GB RAM-a za glatko izvođenje simulacija.

Ako još nemaš GenAgents:

```bash
git clone https://github.com/joonspk-research/genagents
cd genagents
pip install -r requirements.txt
```

## Kako dizajnirati vjerodostojne simulacije (napredno)

Prema recentnoj [Stanford studiji](https://arxiv.org/abs/2411.10109), ključno je da agenti imaju detaljnu "povijest života" iz kvalitativnih intervjua, što osigurava visoku razinu realizma u ponašanju.

Primijeni ovaj princip kroz sljedeće korake:

- **Detaljne pozadine agenata**: Umjesto generičkih profila, svaki agent bi trebao imati jedinstvenu povijest kupovine i stavove (npr. "Ne vjerujem u jeftine LED proizvode"). To povećava vjerodostojnost njihovih reakcija.
- **Refleksijski moduli**: [Integriraj refleksiju](https://arxiv.org/abs/2304.03442) kao ključnu komponentu simulacije – agenti bi trebali moći "razmisliti" o tome zašto klikaju ili ignoriraju oglas ("Je li ovaj popust stvarno tako dobar ili mi nešto prodaju?")

Primjer napredne refleksije u JSON obliku:

```json
{
  "id": 512,
  "response": "Privlači me popust, ali iskustvo govori da takve ponude često znače lošiju kvalitetu.",
  "refleksija": "Moja povijest s popustima je mješovita - neke su bile izvrsne prilike, a druge prevara. S obzirom na nisku cijenu, sklon sam oprezu.",
  "sentiment": "Neutralan s dozom skepticizma"
}
```

## 2. Dizajniranje varijanti

Pripremi A/B varijante u JSON formatu u `config/ab_test.json.`

Svaka varijanta sadrži:
naziv, tekst oglasa, skup pitanja na koja agenti odgovaraju (npr. "Bi li kliknuo/la?", "Zašto?").

```json
{
  "varijante": [
    {
      "naziv": "BesplatnaDostava",
      "oglas": "LED kišobran s BESPLATNOM DOSTAVOM za 24h!",
      "pitanja": ["Bi li kliknuo/la?", "Zašto bi odabrao/la ovu opciju?"]
    },
    {
      "naziv": "20PostoPopusta",
      "oglas": "LED kišobran -20% POPUSTA za prvu kupnju!",
      "pitanja": ["Bi li kliknuo/la?", "Što te više privlači: popust ili brzina?"]
    }
  ]
}
```

## 3. Pokretanje simulacije

```bash
# Varijanta A
python simulate.py --scenario "ab_test/BesplatnaDostava" --output results_free.json

# Varijanta B
python simulate.py --scenario "ab_test/20PostoPopusta" --output results_discount.json
```

## 4. Analiza rezultata

| Metrika | Besplatna dostava | 20% popusta |
| --- | --- | --- |
| Komentari | "Volim brzinu..." | "Ne kupujem po punoj cijeni" |
| Share rate | 12% | 18% |

Tumačenje:

- Ljudi koji reagiraju brzo preferiraju dostavu, dok oni osjetljivi na cijenu biraju popust.
- Veći share rate kod popusta sugerira više "hakerske" percepcije ("našao/la sam dobru priliku").

## Zašto ovo ima smisla?

**Simulirani korisnici s poviješću** - Agenti nisu prazni entiteti. Svaki ima vlastitu povijest (npr. "Nikad ne plaćam dostavu").

**Refleksijski moduli** - Agent razmišlja o stvarima kao što bi to radio stvarni korisnik (npr. "Zvuči predobro da bi bilo istinito").

**Balansiranje biasa** - Odgovori se dinamički kalibriraju prema interesima:

```python
if user_interest == "outdoor" and ad_variant == "BesplatnaDostava":
    adjust_confidence(0.7)  # Smanji vjerodostojnost kod planinara
```

**Ekonomija testa** - Vrijeme: 15 minuta (ne tjedni ili više tjedni) Cijena: ~$0.27 (API poziv), u usporedbi s $500 za Meta A/B kampanju

## 5. Kako čitati rezultate?

- Klik rate >55% → testna varijanta privlači pozornost
- Share rate >15% → potencijal za viralnost
- Komentari s hejtom? Dobrodošli. Ljudi troše vrijeme samo na stvari koje ih zanimaju.

## Bonus: Uvid u razmišljanje jednog agenta

```json
{
  "id": 42,
  "response": "Kliknuo bih na popust jer sam student, al vjerujem da će kišobran biti loš ko i sve što je jeftino",
  "sentiment": "Negativan (ali zainteresiran)"
}
```

Ova razina uvida ne dolazi iz CTR-a ili heatmape. Dolazi iz refleksije i razrade agentovog stava.

## Ali... je li ovo stvarno bolje od stvarnog testiranja?

Da i ne.

>

**Simulacije ne zamjenjuju stvarne korisnike – ali pomažu prototipirati ideje, filtrirati loše koncepte i predvidjeti ponašanje.**

Generativni agenti pokazali su 85% podudarnosti sa stvarnim ljudskim odgovorima ([prema Stanford studiji, 2024](https://arxiv.org/abs/2411.10109)) – više nego što ljudi repliciraju vlastita mišljenja nakon 2 tjedna.

Uvjet: dizajn varijante mora biti koncizan i razumljiv, inače se simulacija raspadne u noise.

Ako znaš što testiraš i želiš brzi signal bez oglasnog budžeta, ovo je alat koji vrijedi imati u arsenalu.
