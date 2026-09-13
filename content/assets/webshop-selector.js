/* Editorial decision guide: keep platform claims aligned with the article. */
(function () {
  'use strict';
  const fields = {
    stage: ['Gdje si sada?', [['new','Tek pokrećem prodaju'],['retail','Već prodajem, trebam webshop'],['move','Mijenjam postojeći webshop']]],
    owner: ['Tko će se brinuti o tehnici?', [['self','Samostalno, bez programera'],['agency','Želim to prepustiti agenciji'],['team','Imamo tehničku osobu u firmi'],['mixed','Dio u firmi, dio vanjski održavatelj']]],
    skill: ['Što vaš održavatelj stvarno poznaje?', [['none','Sadržaj i tablice, bez održavanja sustava'],['wp','WordPress i održavanje dodataka'],['php','PHP i razvoj web aplikacija'],['dotnet','.NET / C#'],['js','JavaScript i web aplikacije'],['unknown','Još nemamo odabranog održavatelja']]],
    model: ['Što najbolje opisuje prodaju?', [['standard','Standardni proizvodi, veličine i boje'],['content','Prodaja uz puno vodiča i sadržaja'],['b2b','B2B, posebni cjenici i pravila kupaca'],['operations','Više skladišta ili prodajnih kanala'],['custom','Poseban konfigurator ili tijek naručivanja']]],
    systems: ['Što već mora ostati povezano?', [['none','Ništa, krećemo od početka'],['wordpress','Postojeća WordPress stranica'],['odoo','Već koristimo Odoo'],['local','Hrvatski program računa ili ERP'],['other','Drugi webshop, ERP ili posebne integracije'],['unknown','Još ne znam što će trebati']]],
    initial: ['Budžet za pokretanje', [['zero','Tražim potpuno besplatno rješenje'],['low','Do 1.500 €'],['mid','1.500–5.000 €'],['upper','5.000–20.000 €'],['high','Više od 20.000 €'],['unknown','Još ne znam']]],
    monthly: ['Mjesečno za tehnički dio', [['zero','Nemam predviđen budžet'],['low','Do 100 €'],['mid','100–300 €'],['upper','300–1.000 €'],['high','Više od 1.000 €'],['unknown','Još ne znam']]],
    priority: ['Koji kompromis ti najviše odgovara?', [['easy','Manje tehničke brige, prihvaćam ograničenja'],['cost','Niži ukupni trošak i gotova rješenja'],['exit','Želim što lakše promijeniti izvođača'],['control','Više kontrole, prihvaćam održavanje']]]
  };
  const platforms = [
    {id:'shopify', name:'Shopify', anchor:'platforme', benefit:'Hosting je uključen, a gotove aplikacije pokrivaju brojne prodajne i marketinške potrebe.', tradeoff:'Pretplate i aplikacije se zbrajaju. Provjeri hrvatske račune, dostavu i ograničenja plana.', exit:'Agenciju možeš promijeniti; prelazak s platforme traži migraciju podataka, teme i aplikacija.', hosting:'Hosting platforme; zaseban server za trgovinu ne trebaš.'},
    {id:'woo', name:'WooCommerce', anchor:'platforme', benefit:'WordPress sadržaj, velik izbor gotovih tema i dodataka te kontrola nad hostingom.', tradeoff:'Netko mora održavati WordPress, temu i dodatke te testirati kupnju nakon promjena.', exit:'Standardna tema i održavani dodaci olakšavaju promjenu izvođača. Custom kod to može poništiti.', hosting:'Kvalitetan managed WooCommerce hosting; veći server tek kada mjerenja pokažu potrebu.'},
    {id:'presta', name:'PrestaShop', anchor:'platforme', benefit:'Trgovinska platforma s modulima; vrijedi je usporediti uz već provjeren lokalni sklop.', tradeoff:'Prvo provjeri verzije teme, modula i konektora te tko ih održava.', exit:'Pristup kodu pomaže, ali posebni moduli i licence mogu otežati preuzimanje.', hosting:'Managed hosting koji podržava odabranu verziju i njezine zahtjeve.'},
    {id:'open', name:'OpenCart', anchor:'platforme', benefit:'Kandidat za standardnu trgovinu kada izvođač već ima provjerene module za tvoje procese.', tradeoff:'Ne biraj prema cijeni licence; traži demonstraciju povrata, računa i nadogradnje.', exit:'Drugi održavatelj treba pristupe, licence i razumljivu dokumentaciju modula.', hosting:'Podržan managed PHP hosting, dimenzioniran prema stvarnom katalogu i prometu.'},
    {id:'nop', name:'nopCommerce', anchor:'platforme', benefit:'.NET platforma zanimljiva za B2B i tim koji već poznaje taj sustav.', tradeoff:'Provjeri lokalne konektore, kompatibilnost dodataka i trošak nadogradnje.', exit:'Standardno rješenje može preuzeti drugi .NET tim; posebne dorade povećavaju ovisnost.', hosting:'Managed .NET okruženje s podržanom bazom; običan PHP paket nije dovoljan.'},
    {id:'odoo', name:'Odoo eCommerce', anchor:'platforme', benefit:'Webshop uz nabavu, skladište i druge poslovne procese u istom okruženju.', tradeoff:'Preciziraj izdanje, API, lokalizaciju i opseg implementacije. Nemoj uvoditi cijeli ERP bez potrebe.', exit:'Povezani poslovni moduli i dorade čine promjenu sustava većim projektom.', hosting:'Odabir između Odoo Onlinea i drugih modela tek nakon provjere potrebnih modula i API-ja.'},
    {id:'shopware', name:'Shopware', anchor:'platforme', benefit:'Kandidat za složeniju prodaju uz partnera koji poznaje njegov ekosustav.', tradeoff:'Projekt i lokalne integracije moraju opravdati trošak; izdanje i hosting utječu na opseg.', exit:'Provjeri licence, posebne dodatke i može li drugi partner preuzeti održavanje.', hosting:'Hosting prilagođen izdanju i implementaciji, uz odgovornog održavatelja.'},
    {id:'big', name:'BigCommerce', anchor:'platforme', benefit:'SaaS alternativa kada želiš manje održavanja infrastrukture.', tradeoff:'Provjeri hrvatske integracije, mogućnosti plana i pragove prodaje koji mijenjaju cijenu.', exit:'Promjena partnera nije isto što i izlazak iz platforme; integracije treba prenijeti.', hosting:'Hosting platforme; zasebna infrastruktura samo za eventualne vanjske integracije.'},
    {id:'headless', name:'Headless po mjeri', anchor:'izlazak', benefit:'Može pokriti poseban prodajni proces koji standardno rješenje stvarno ne može.', tradeoff:'Visok trošak razvoja, testiranja i trajnog održavanja. Nije sigurniji samo zato što je custom.', exit:'Težak izlazak: drugi tim mora preuzeti posebnu aplikaciju i integracije. Ocjena u članku: 1/5.', hosting:'Arhitekturu i trošak infrastrukture određuje tim. AWS ili Google Cloud nisu automatski nužni.'}
  ];
  function recommend(input) {
    const a = {...input};
    if (a.owner === 'self') a.skill = 'none';
    for (const [key, [,options]] of Object.entries(fields)) {
      if (!options.some(([value]) => value === a[key])) throw new Error('Nepotpun ili neispravan odgovor: '+key);
    }
    const score = {shopify:6,woo:5,presta:1,open:0,nop:0,odoo:0,shopware:0,big:2,headless:-10};
    const add = (id, n) => { score[id] += n; };
    const technical = ['wp','php','dotnet','js'].includes(a.skill);
    const funded = ['upper','high'].includes(a.initial) && ['upper','high'].includes(a.monthly);
    if (a.priority === 'easy') {add('shopify',4);add('big',2);}
    if (a.priority === 'exit') {add('woo',5);add('presta',3);add('open',3);add('nop',2);}
    if (a.priority === 'control') {add('woo',3);add('nop',3);add('shopware',2);}
    if (a.priority === 'cost') {add('woo',technical ? 4 : 0);add('shopify',technical ? 0 : 2);}
    if (a.skill === 'wp' || a.skill === 'php') {add('woo',6);add('presta',2);add('open',2);}
    if (a.skill === 'dotnet') add('nop',14);
    if (a.model === 'content') add('woo',5);
    if (a.model === 'b2b') {add('nop',3);add('shopware',4);add('odoo',2);}
    if (a.model === 'operations') {add('odoo',5);add('shopware',2);}
    if (a.systems === 'wordpress') add('woo',8);
    if (a.systems === 'odoo') add('odoo',18);
    if (a.model === 'custom') {add('shopware',4);add('nop',3);}
    const customAllowed = a.model === 'custom' && a.initial === 'high' && a.monthly === 'high' && (['php','dotnet','js'].includes(a.skill) || a.owner === 'agency');
    if (customAllowed) add('headless',25);
    let eligible = platforms.filter(p => p.id !== 'headless' || customAllowed);
    if (!funded) eligible = eligible.filter(p=>!['shopware'].includes(p.id));
    if (!technical && a.owner === 'self') eligible = eligible.filter(p=>['shopify','big','woo'].includes(p.id));
    const status = a.initial === 'zero' || a.monthly === 'zero' ? 'budget' : ['unknown','local','other'].includes(a.systems) || a.initial === 'unknown' || a.monthly === 'unknown' || a.model === 'custom' || a.stage === 'move' || (a.initial === 'low' && a.owner !== 'self') ? 'conditional' : 'ready';
    const flags = [];
    if (status === 'budget') flags.push('Prvo složi budžet: besplatna licenca ne plaća hosting, održavanje ni integracije. Opcije ispod služe za traženje ponude.');
    if (['local','other','unknown'].includes(a.systems)) flags.push('Prije izbora potvrdi konkretan ERP, račune, naplatu i dostavu. Ovaj alat ne potvrđuje kompatibilnost konektora.');
    if (a.stage === 'move') flags.push('Prije migracije usporedi popravak sadašnjeg sustava s prijenosom podataka, URL-ova, narudžbi i integracija.');
    if (a.model === 'custom') flags.push('Prvo traži demonstraciju gotovog rješenja. Budžet sam po sebi nije razlog za razvoj po mjeri.');
    if (a.initial === 'unknown' || a.monthly === 'unknown') flags.push('Bez početnog i mjesečnog budžeta ovo je preliminarni izbor. Zatraži cijenu prve godine i daljnjeg rada.');
    if (a.initial === 'low' && a.owner !== 'self') flags.push('Mali početni budžet i vanjska realizacija traže ograničen opseg i konkretnu ponudu.');
    return {status, choices:eligible.sort((x,y)=>score[y.id]-score[x.id]).slice(0,2), flags, technical};
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {recommend, fields};
  if (typeof document === 'undefined') return;
  const root = document.getElementById('webshop-selector');
  if (!root) return;
  const answers = {}; let step = 0; let started = false;
  const steps = () => ['stage','owner', ...(answers.owner && answers.owner !== 'self' ? ['skill'] : []), 'model','systems','budget','priority'];
  const el = (tag, text, cls) => {const n=document.createElement(tag); if(text)n.textContent=text;if(cls)n.className=cls;return n;};
  function button(text, fn, cls) {const b=el('button',text,cls);b.type='button';b.addEventListener('click',fn);return b;}
  function link(text, anchor) {const a=el('a',text);a.href='#'+anchor;return a;}
  function focusHeading() {const h=root.querySelector('h2,h3');if(h){h.tabIndex=-1;h.focus({preventScroll:true});root.scrollIntoView({block:'start',behavior:'instant'});}}
  function intro() {
    root.replaceChildren();root.append(el('p','PEREMIN · VODIČ ZA ODLUKU','ws-kicker'),el('h2','Koji webshop ima smisla za tebe?'),el('p','Nekoliko pitanja o tvom poslu. Dobit ćeš uži izbor, način održavanja i ono što treba provjeriti prije trošenja novca.'));
    const actions=el('div',null,'ws-actions');actions.append(button('Pronađi svoj smjer →',()=>{started=true;render();},'ws-primary'),link('Radije čitam vodič ↓','pocetak-vodica'));root.append(actions,el('p','Bez prijave. Odgovori ostaju u ovom otvorenom prozoru.','ws-small'));
  }
  function render() {
    if(!started) return intro();
    const order=steps();const key=order[step];root.replaceChildren();
    root.append(el('p',`TVOJ WEBSHOP · ${step+1} / ${order.length}`,'ws-kicker'));
    const progress=el('progress');progress.max=order.length;progress.value=step+1;progress.setAttribute('aria-label','Napredak upitnika');root.append(progress);
    root.append(el('h2',key==='budget'?'Koliko možeš uložiti u tehnički dio?':fields[key][0]));
    if(key==='budget') root.append(el('p','Izrada, hosting, licence i održavanje. Robu, oglase i dostavu računaj zasebno. Rasponi su za usmjeravanje, nisu ponude izvođača.','ws-small'));
    if(key==='model')root.append(el('p','Odaberi glavni izazov. Velik broj artikala sam po sebi ne traži custom webshop.','ws-small'));
    const form=el('form');
    for(const field of key==='budget'?['initial','monthly']:[key]) {
      const group=el('fieldset');group.append(el('legend',fields[field][0]));
      for(const [value,label] of fields[field][1]) {
        const item=el('label',null,'ws-option');const radio=el('input');radio.type='radio';radio.name=field;radio.value=value;radio.required=true;radio.checked=answers[field]===value;
        radio.addEventListener('change',()=>{answers[field]=value;});item.append(radio,el('span',label));group.append(item);
      }form.append(group);
    }
    const actions=el('div',null,'ws-actions');if(step>0)actions.append(button('← Natrag',()=>{step--;render();}));
    const next=el('button',step===order.length-1?'Pokaži moj smjer →':'Dalje →','ws-primary');next.type='submit';actions.append(next);form.append(actions);
    form.addEventListener('submit',e=>{e.preventDefault();if(answers.owner==='self')answers.skill='none';if(step===steps().length-1)result();else{step++;render();}});root.append(form);focusHeading();
  }
  function result() {
    const r=recommend(answers);root.replaceChildren();root.append(el('p','TVOJ UŽI IZBOR','ws-kicker'),el('h2',r.status==='budget'?'Prvo složi održiv budžet':r.status==='conditional'?'Dobar smjer, uz provjeru prije odluke':'Ovdje bih počeo usporedbu'));
    for(const flag of r.flags)root.append(el('p',flag,'ws-notice'));
    const why = {easy:'Prednost daješ jednostavnijem održavanju.',cost:'Važan ti je ukupni trošak, uključujući rad održavatelja.',exit:'Želiš lakše promijeniti izvođača.',control:'Prihvaćaš održavanje radi veće kontrole.'};
    root.append(el('p',why[answers.priority]+' '+(r.technical?'U izbor je uključeno navedeno tehničko znanje.':'Održavanje treba biti pokriveno uslugom ili dodatnom pomoći.')));
    r.choices.forEach((p,i)=>{
      const card=el('section',null,'ws-card');card.append(el('p',i?'ALTERNATIVA':'PRVO PROVJERI','ws-kicker'),el('h3',p.name));
      for(const [label,value] of [['Dobivaš',p.benefit],['Preuzimaš',p.tradeoff],['Promjena izvođača i sustava',p.exit],['Hosting',p.hosting]]) {const line=el('p');line.append(el('strong',label+': '),document.createTextNode(value));card.append(line);}
      card.append(link('Pročitaj usporedbu u članku ↓',p.anchor));root.append(card);
    });
    const support = answers.owner==='agency'?'Ugovori jednu odgovornu agenciju, rok reakcije i predaju pristupa. Premium podrška platforme nije održavanje cijelog webshopa.':answers.owner==='self'?'Samostalno uređivanje proizvoda nije isto što i sigurnosno održavanje. Za kvar naplate unaprijed dogovori pomoć.':'Podijeli odgovornost za server, aplikaciju i konektore. Tehnička osoba treba vrijeme, ovlasti i zamjenu tijekom odsutnosti.';
    root.append(el('h3','Kako bih organizirao ostatak'),el('p',support),el('p','Računi / ERP: prvo testiraj uplatu, pouzeće, djelomični povrat i zalihu. Marketing: počni jednim povezanim email alatom; naprednije preporuke dodaj kad podaci i osnovna prodaja rade.'));
    const reads=el('div',null,'ws-actions');reads.append(link('Troškovi ↓','trosak'),link('Održavanje i sigurnost ↓','odrzavanje'),link('ERP i hosting ↓','erp-hosting'));root.append(reads);
    const details=el('details');details.append(el('summary','Moji odgovori i kako je nastao izbor'));const list=el('ul');for(const key of steps().flatMap(k=>k==='budget'?['initial','monthly']:[k]))list.append(el('li',fields[key][0]+' '+fields[key][1].find(x=>x[0]===answers[key])[1]));details.append(list,el('p','Urednička pravila uspoređuju znanje, odgovornost, prodajni proces, postojeće sustave i budžet. Ovo nije sigurnosni audit ni potvrda cijene. Svi kandidati i njihovi kompromisi opisani su u članku.'));root.append(details);
    root.append(button('← Promijeni odgovore',()=>{step=0;render();}),button('Kreni ispočetka',()=>{Object.keys(answers).forEach(k=>delete answers[k]);step=0;started=false;intro();focusHeading();}));focusHeading();
  }
  intro();
})();
