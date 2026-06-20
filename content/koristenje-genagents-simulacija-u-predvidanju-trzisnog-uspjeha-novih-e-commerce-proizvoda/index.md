---
title: "Korištenje GenAgents simulacija u predviđanju tržišnog uspjeha novih e-commerce proizvoda"
description: "Uvod u GenAgents: Virtualni kupci koji ne lažu Imaš ideju za novi proizvod – kišobran s interaktivnim LED svjetlima. Savršeno za Instagram, cool za TikTok"
type: blog-post
nav: false
date: 2025-05-25
updated: 2025-05-26
author: Goran Peremin
tags: genagents, ai, ecommerce, product research, synthetic research
sourceURL: https://www.peremin.com/koristenje-genagents-simulacija-u-predvidanju-trzisnog-uspjeha-novih-e-commerce-proizvoda/
image: /media/posts/11/Koristenje-GenAgents-simulacija-u-predvidanju-trzisnog-uspjeha-novih-e-commerce-proizvoda.jpg
---

# Korištenje GenAgents simulacija u predviđanju tržišnog uspjeha novih e-commerce proizvoda

## Uvod u GenAgents: Virtualni kupci koji ne lažu

Imaš ideju za novi proizvod – **kišobran s interaktivnim LED svjetlima**. Savršeno za Instagram, cool za TikTok, ali pitanje je: hoće li ga ljudi kupiti?

Želiš znat kako bi tvoj novi LED kišobran prošao u divljini? Bez anketnih botova, politike i "Ča neju sve izmislili danas" komentara od tete Jožice? Umjesto da trošiš novac na skupe i spore ankete, koristi **genagents arhitekturu** iz **Stanforda**, razvijenu kroz rigorozna istraživanja stvarnog ljudskog ponašanja ([Park et al., 2024).](https://arxiv.org/abs/2411.10109)

## Korak 1: Instalacija GenAgents

Prvi korak je postavljanje GenAgents sustava:

```bash
git clone https://github.com/joonspk-research/genagents
cd genagents
pip install -r requirements.txt
```

Zatim konfiguriraj API ključ u `simulation_engine/settings.py`:

```python
OPENAI_API_KEY = "TVOJ_OPENAI_KLJUČ"
DEBUG = False
LLM_VERS = "gpt-4o"
```

## Korak 2: Generiranje realistične populacije

Prema istraživanju (Park et al., 2024), generativni agenti su kreirani temeljem 2-satnih intervjua s 1.052 stvarne osobe. To znači da svaki agent ima:

- Osobne narative i memoriju,
- Refleksivne sposobnosti,
- Konzistentno ponašanje s izvornim osobama.

Primjer definiranja agenta:

```python
from genagents.genagents import GenerativeAgent

agent = GenerativeAgent(agent_folder="agent_bank/populations/single_agent")
agent.update_scratch({
    "first_name": "Luka",
    "age": 29,
    "occupation": "konobar",
    "interests": ["tech", "moda", "urbani lifestyle"]
})
```

## Korak 3: Simulacija reakcije na LED kišobran

Postavimo simulaciju jasno i realistično:

```python
prompt = "Would you click on an Instagram ad for a smart LED umbrella that changes colors and syncs with your phone?"
response = agent.utterance([("Interviewer", prompt)])
print(response)
```

Realni odgovor jednog od agenta:

> "Yeah, sounds cool, I'd definitely click. Seems useful for nights out in the city."

## Korak 4: Skaliranje na 1.000 agenata

GenAgents omogućuje paralelnu simulaciju tisuća korisnika pomoću iste arhitekture:

```bash
python simulate.py --input_data agents.csv --model gpt-4o --output results.json
```

Primjer agregiranog rezultata iz simulacije:

| Reakcija | Broj agenata |
| --- | ---: |
| Kliknuli | 678 |
| Komentirali | 423 |
| Podijelili | 289 |

## Analiza rezultata

- **68% klikova:** Visoki interes, proizvod privlači pažnju.
- **42% komentara:** Ljudi izražavaju mišljenja poput "savršeno za noćne izlaske", "super za TikTok". **To su free UX savjeti (ili hejt za kasniju analizu).**
- **29% dijeljenja:** Dokaz potencijalnog viralityja, posebno među mlađim urbanim korisnicima. **Ako je više od 10%, proizvod ima meme potencijal.**

## Dublji uvid u korisnike

- **Mladi urbani liberali:** najpozitivnije reakcije zbog estetike i društvenih mreža.
- **Stariji konzervativci:** skeptičniji, smatraju "nepotrebnim luksuzom".

Ovo jasno pokazuje ciljanu publiku bez nagađanja.

## Zašto je GenAgents moćan alat?

- **Autentičnost:** Agenti bazirani na stvarnim intervjuima osiguravaju preciznost i realistične reakcije.
- **Ekonomičnost:** Brzo testiranje bez visokih troškova kampanja.
- **Detaljna analiza:** Mogućnost razumijevanja zašto korisnici reagiraju kako reagiraju.

Ako želiš ozbiljno shvatiti svoj e-commerce, GenAgents simulacije su must-have.

### Zašto je ovo zakon?

**Pobuna protiv dosadnih anketa**
Umjesto da pitaš ljude "bi li kupio proizvod", baci ih u virtualni kaos gdje mogu reći sve bez posljedica.

**Agenti imaju trust issues**
Arhitektura koristi transkripte intervjua da smanji stereotipe – nema više "svi mlađi od 30 vole tech".

**Eksperimentiraj bez gubitka followera**
Testiraj ludje ideje: šta ako kišobran ima Bluetooth zvukove kiše? Simulacija će ti reći da li će ljudi biti "WTF" ili "take my money".

## Tajni sastojci arhitekture

Istraživači su namjerno izabrali 1.052 sudionika da reprezentiraju SAD po:

- Dobu (18-84)
- Političkoj ideologiji (od Trumpovih fanova do Berniejevih hipija)
- Sexualnom identitetu (hetero, LGBTQ+, "ne znam, samo sam tu da dobijem 60$")

Zašto je bitno? Da algoritmi ne budu ko TikTok – da ne serendipita samo white milleniale.

AI interviewer nije samo GPT s mikrofonom:
Koristio je refleksijski modul da skrati transkripte u jezgrovite bilješke.

Primjer:

```json
{
  "trust_issues": "Ne vjeruje institucijama nakon što mu se susjed tresao po covid potporama",
  "meme_affinity": "Spominje 'distracted boyfriend' u kontekstu ozbiljnih životnih odluka"
}
```

Ekspertne persone: GPT-4o je generirao 4 verzije svakog agenta – psiholog, ekonomist, politolog i demograf. Odabir ovisi o pitanju.

## Simulirana pobuna protiv demografskih stereotipa

Ključni eksperiment:

Agenti bazirani na intervjuima imali su 14-15% točnije odgovore od onih koji su koristili samo demografske podatke .

Primjer bias mitigacije:

- Za pitanje "Bi li podržao/la restriktivnu imigracionsku politiku?"
- Demografski agenti: "Da, jer si star 50+ i bijelac"
- Intervju agenti: "Ne, jer si spomenuo da ti je najbolji frend iz Meksika"

Kako zapravo izgleda 'agent bank'

Dvostruki pristup:

- Open access: Agregirani podaci za GSS pitanja (npr. "68% klikova na oglas")
- Restricted access: Individualni odgovori za akademike koji prođu IRB provjeru (i obećaju da neće tražiti kišobrane s NFT)

## Statistike koje možete baciti na sastanku

- **85% korelacija između agenta i stvarnih ljudi **– bolje nego što prosječna osoba replicira vlastite odgovore nakon dva tjedna
- 22% komentara u simulaciji = ~220 ljudi koji će vam napisati "ovo je glupo" ili "jel ovo neki phishing"
- 15% dijeljenja = ako ne dobijete bar 150 shareova, vaš proizvod nema "drama potencijala"

## Zašto vas boli glava od ovoga

Memorija agenta nije samo chat history – sustav automatski bilježi:

- **Emocije** (npr. "ljut zbog preplaćene dostave")
- **Kontekstualne reference** (npr. "spominje Bitcoin u vezi s kupovinom mlijeka")

Eksperimenti s power dynamics:

Agenti u "high-power" pozicijama (npr. virtualni šefovi) pokazali su **23% manje povjerenja prema drugima**

### Bonus za one koji su skrolali do kraja:

Evo kako izgleda stvarni transkript intervjua iz istraživanja:

## Reference

-

GitHub: [genagents](https://github.com/joonspk-research/genagents)

-

Glavni rad: [Generative Agent Simulations of 1,000 People](https://arxiv.org/abs/2411.10109)

-

Dodatna literatura: [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442)

- Sljedeći test: usporedba 3 verzije headline-a? Let's roll. 🚀
