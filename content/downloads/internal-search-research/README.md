# ESCI analiza interne tražilice — Goran Peremin

Ovu analizu i pripadajući kod izradio je Goran Peremin za svoj članak [Koliko loša interna tražilica košta web shop?](https://www.peremin.com/koliko-je-los-search-skup-seo-ux-i-konverzija/).

Eksperiment koristi službeni Amazon Science `shopping_queries_dataset_examples.parquet` iz skupa [Shopping Queries Dataset](https://github.com/amazon-science/esci-data).

- SHA-256: `4a735b693b4a424a6fc67f5be6e4c811495c488bbf66d02a602d308b2744263a`
- verzija podataka analizirana 20. srpnja 2026.
- filter: `small_version=1`, `product_locale=us`, `split=test`
- uključeni su svi upiti koji imaju najmanje jedan Exact i jedan Irrelevant rezultat
- ESCI dobici: `E=1`, `S=0.1`, `C=0.01`, `I=0`
- slučajni scenarij: 50 permutacija po upitu, seed `20260720`
- intervali: 2.000 bootstrap uzoraka na razini upita

Pokretanje:

```bash
python -m pip install pandas==2.3.3 numpy==2.4.2 pyarrow==23.0.1
curl -L https://media.githubusercontent.com/media/amazon-science/esci-data/main/shopping_queries_dataset/shopping_queries_dataset_examples.parquet -o shopping_queries_dataset_examples.parquet
python analyze_esci.py shopping_queries_dataset_examples.parquet output
```

Izlaz su sažetak eksperimenta i rezultati za svaki upit. Javni dataset nije hrvatski katalog i ne sadrži poslovne ishode, pa eksperiment mjeri kvalitetu redoslijeda, a ne konverziju ili maržu.

Rezultat je izrađen s Pythonom 3.14.3. Tekst upita koji počinje znakovima `=`, `+`, `-` ili `@` u izlaznom CSV-u dobiva početni apostrof kako ga tablični program ne bi protumačio kao formulu.
