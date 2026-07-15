(function () {
  'use strict';

  var TOPICS = {
    'generative-ai': { label: 'Generativni AI', wiki: 'Generative_artificial_intelligence', query: 'generative artificial intelligence', article: '/besplatno-ab-testiranje-s-umjetnom-inteligencijom-ai-llm/', articleTitle: 'Besplatno A/B testiranje s umjetnom inteligencijom', articleCopy: 'Kako generativne agente pretvoriti u test koji proizvodi pitanja, a ne lažnu sigurnost.' },
    'predictive-analytics': { label: 'Predictive analytics', wiki: 'Predictive_analytics', query: 'predictive analytics marketing', article: '/napredna-analitika-i-predictive-analytics-marketing-bez-nagadanja/', articleTitle: 'Marketing bez nagađanja', articleCopy: 'Praktična primjena propensity, churn i segmentacijskih modela u eCommerceu.' },
    'marketing-mix': { label: 'Marketing mix modeling', wiki: 'Marketing_mix_modeling', query: 'marketing mix modeling', article: '/ekonometrija-u-marketingu-kako-pretvoriti-brojke-u-oruzje/', articleTitle: 'Ekonometrija u marketingu', articleCopy: 'Kako povezati kanale, prodaju i uzročno-posljedične veze bez dashboard mitologije.' },
    'synthetic-data': { label: 'Sintetički podaci', wiki: 'Synthetic_data', query: 'synthetic data', article: '/sinteticki-podaci-u-istrazivanjima-genijalnost-ili-samo-lijenost/', articleTitle: 'Sintetički podaci: genijalnost ili lijenost?', articleCopy: 'Gdje sintetički podaci pomažu, a gdje samo elegantno skrivaju loš uzorak.' },
    personalization: { label: 'Personalizacija', wiki: 'Personalization', query: 'personalization marketing', article: '/sto-ce-kupac-sljedece-kupiti-recommendations-i-cltv/', articleTitle: 'Što će kupac sljedeće kupiti?', articleCopy: 'Recommendations, CLTV i razlika između korisne personalizacije i skupog pogađanja.' },
    'customer-lifetime-value': { label: 'Customer lifetime value', wiki: 'Customer_lifetime_value', query: 'customer lifetime value', article: '/sto-ce-kupac-sljedece-kupiti-recommendations-i-cltv/', articleTitle: 'Recommendations i CLTV', articleCopy: 'Kako povezati sljedeću kupnju s dugoročnom vrijednošću kupca.' },
    geo: { label: 'Generative Engine Optimization (GEO)', wiki: 'Generative_engine_optimization', query: 'generative engine optimization', article: '/marketing-hypeometar-kako-radi/', articleTitle: 'Kako radi Marketing Hypeometar', articleCopy: 'Zašto popularnost teme nije isto što i dokaz da će nešto poslovno funkcionirati.' },
    'autonomous-agents': { label: 'AI autonomous agents', wiki: 'AI_agent', query: 'AI autonomous agents', article: '/marketing-hypeometar-kako-radi/', articleTitle: 'Kako radi Marketing Hypeometar', articleCopy: 'Kako usporediti glasnoću novog trenda s istraživačkom aktivnosti iza njega.' },
    'ai-shoppers': { label: 'Optimization for AI Shoppers', wiki: 'Agentic_commerce', query: 'AI shopping agents', article: '/marketing-hypeometar-kako-radi/', articleTitle: 'Kako radi Marketing Hypeometar', articleCopy: 'Agentic commerce koristim kao mjerljivi proxy za optimizaciju prema AI kupovnim agentima.' },
    'shoppable-feeds': { label: 'Video-First Shoppable Feeds', wiki: 'TikTok_Shop', query: 'shoppable video commerce', article: '/marketing-hypeometar-kako-radi/', articleTitle: 'Kako radi Marketing Hypeometar', articleCopy: 'TikTok Shop koristim kao javni proxy za pažnju oko video-first kupovnih feedova.' },
    'zero-party-data': { label: 'Hyper-Personalized Zero-Party Data', wiki: 'Customer_data_platform', query: 'zero party data personalization', article: '/marketing-hypeometar-kako-radi/', articleTitle: 'Kako radi Marketing Hypeometar', articleCopy: 'Customer data platform koristim kao proxy za širi interes oko zero-party podataka i personalizacije.' }
  };

  var $ = function (id) { return document.getElementById(id); };
  var form = $('hype-form');
  var select = $('topic');

  function isoDate(date) { return date.toISOString().slice(0, 10); }
  function compactDate(date) { return isoDate(date).replace(/-/g, '') + '00'; }
  function daysAgo(n) { var d = new Date(); d.setUTCDate(d.getUTCDate() - n); return d; }
  function average(values) { return values.reduce(function (sum, value) { return sum + value; }, 0) / Math.max(values.length, 1); }
  function clamp(value) { return Math.max(0, Math.min(100, Math.round(value))); }

  function scores(views, currentWorks, previousWorks) {
    var recent = average(views.slice(-14));
    var baseline = average(views.slice(-42, -14)) || recent || 1;
    var attentionChange = (recent / baseline - 1) * 100;
    var evidenceChange = previousWorks ? (currentWorks / previousWorks - 1) * 100 : 0;
    return {
      attention: clamp(50 + attentionChange * 1.7),
      evidence: clamp(50 + evidenceChange * 1.2),
      attentionChange: attentionChange,
      evidenceChange: evidenceChange
    };
  }

  function verdict(result) {
    var gap = result.attention - result.evidence;
    if (gap >= 22) return ['Više dima nego dokaza', 'Pažnja raste osjetno brže od istraživačkog signala. Dobra tema za testiranje, loša za slijepo kopiranje.'];
    if (gap <= -22) return ['Dokazi ispred hypea', 'Istraživački signal je jači od javne pažnje. Možda nije najglasnija tema, ali vrijedi kopati.'];
    if (result.attention >= 65 && result.evidence >= 65) return ['Trend s pokrićem', 'Tema privlači pažnju i istodobno dobiva istraživačku podlogu. Signal nije dokaz učinka, ali nije ni samo buka.'];
    return ['Signal je mlak', 'Ni pažnja ni istraživanja trenutačno ne rade dramatičan pomak. To često znači manje FOMO-a i više prostora za miran test.'];
  }

  function cached(key, loader) {
    try {
      var hit = JSON.parse(localStorage.getItem(key));
      if (hit && Date.now() - hit.saved < 43200000) return Promise.resolve(hit.value);
    } catch (_) {}
    return loader().then(function (value) {
      try { localStorage.setItem(key, JSON.stringify({ saved: Date.now(), value: value })); } catch (_) {}
      return value;
    });
  }

  function fetchViews(topic) {
    var url = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/' + topic.wiki + '/daily/' + compactDate(daysAgo(90)) + '/' + compactDate(daysAgo(1));
    return fetch(url).then(function (response) { if (!response.ok) throw new Error('Wikimedia ' + response.status); return response.json(); }).then(function (data) { return data.items.map(function (item) { return item.views; }); });
  }

  function fetchWorks(topic, from, until) {
    var url = 'https://api.crossref.org/works?rows=0&query.title=' + encodeURIComponent(topic.query) + '&filter=from-pub-date:' + from + ',until-pub-date:' + until;
    return fetch(url).then(function (response) { if (!response.ok) throw new Error('Crossref ' + response.status); return response.json(); }).then(function (data) { return data.message['total-results']; });
  }

  function drawChart(values) {
    var svg = $('attention-chart');
    var width = 800, height = 240, pad = 12;
    var min = Math.min.apply(null, values), max = Math.max.apply(null, values), span = max - min || 1;
    var points = values.map(function (value, index) {
      return (pad + index * (width - pad * 2) / Math.max(values.length - 1, 1)).toFixed(1) + ',' + (height - pad - (value - min) * (height - pad * 2) / span).toFixed(1);
    }).join(' ');
    svg.innerHTML = '<polygon class="chart-area" points="' + pad + ',' + (height - pad) + ' ' + points + ' ' + (width - pad) + ',' + (height - pad) + '"></polygon><polyline class="chart-line" points="' + points + '"></polyline>';
  }

  function signed(value) { return (value >= 0 ? '+' : '') + value.toFixed(1).replace('.', ',') + '%'; }

  function render(topic, views, currentWorks, previousWorks) {
    var result = scores(views, currentWorks, previousWorks);
    var copy = verdict(result);
    $('verdict').textContent = copy[0];
    $('verdict-copy').textContent = copy[1];
    $('attention-score').textContent = result.attention;
    $('attention-detail').textContent = signed(result.attentionChange) + ' prosječnih dnevnih pregleda u odnosu na prethodna četiri tjedna.';
    $('evidence-score').textContent = result.evidence;
    $('evidence-detail').textContent = currentWorks.toLocaleString('hr-HR') + ' Crossref zapisa u zadnjih 12 mjeseci, ' + signed(result.evidenceChange) + ' godišnje.';
    $('related-title').textContent = topic.articleTitle;
    $('related-copy').textContent = topic.articleCopy;
    $('related-link').href = topic.article;
    drawChart(views);
    $('results').hidden = false;
    $('chart-card').hidden = false;
    $('related').hidden = false;
  }

  function load() {
    var topic = TOPICS[select.value];
    var today = daysAgo(1), yearAgo = new Date(today), twoYearsAgo = new Date(today);
    yearAgo.setUTCFullYear(yearAgo.getUTCFullYear() - 1);
    twoYearsAgo.setUTCFullYear(twoYearsAgo.getUTCFullYear() - 2);
    $('status').className = 'hype-status';
    $('status').textContent = 'Mjerim signal za: ' + topic.label + '…';
    form.querySelector('button').disabled = true;
    cached('hypeometar:' + select.value, function () {
      var works = fetchWorks(topic, isoDate(yearAgo), isoDate(today)).then(function (current) {
        return fetchWorks(topic, isoDate(twoYearsAgo), isoDate(yearAgo)).then(function (previous) { return [current, previous]; });
      });
      return Promise.all([fetchViews(topic), works]).then(function (data) { return [data[0], data[1][0], data[1][1]]; });
    }).then(function (data) {
      render(topic, data[0], data[1], data[2]);
      $('status').textContent = 'Podaci osvježeni. Izvori: Wikimedia i Crossref.';
    }).catch(function () {
      $('status').className = 'hype-status is-error';
      $('status').textContent = 'Javni izvor trenutačno ne odgovara. Pokušaj ponovno za koju minutu.';
    }).finally(function () { form.querySelector('button').disabled = false; });
  }

  form.addEventListener('submit', function (event) { event.preventDefault(); load(); });
  console.assert(verdict({ attention: 90, evidence: 40 })[0] === 'Više dima nego dokaza', 'Hypeometar verdict check failed');
  load();
}());
