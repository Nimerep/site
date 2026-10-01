/* Peremin editorial planner. Research reviewed 2026-10-01; no network or storage. */
(function () {
  'use strict';
  const checked = '1 October 2026';
  const links = {
    consumer:'https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_en.htm',
    privacy:'https://europa.eu/youreurope/business/governance-and-sustainability/digital-and-data-compliance/data-protection-gdpr/index_en.htm',
    vat:'https://vat-one-stop-shop.ec.europa.eu/one-stop-shop_en',
    b2b:'https://europa.eu/youreurope/business/finance-and-tax/vat/cross-border-vat/index_en.htm',
    safety:'https://eur-lex.europa.eu/eli/reg/2023/988',
    access:'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L0882',
    HR:'https://narodne-novine.nn.hr/clanci/sluzbeni/2025_06_89_1233.html',
    DE:'https://www.verpackungsregister.org/en/registration/find-out-about-registrations',
    FR:'https://entreprendre.service-public.gouv.fr/vosdroits/F23455?lang=en',
    NL:'https://business.gov.nl/regulations/long-distance-sales-and-purchases/',
    BE:'https://efacture.belgium.be/fr/article/pour-qui-la-facturation-electronique-deviendra-t-elle-obligatoire',
    UK:'https://www.gov.uk/online-and-distance-selling-for-businesses/distance-selling',
    CH:'https://www.seco.admin.ch/de/probleme-nach-dem-kauf',
    shopify:'https://help.shopify.com/en/manual/b2b/getting-started/plan-features',
    woo:'https://woocommerce.com/document/b2b-for-woocommerce/',
    shopware:'https://www.shopware.com/en/pricing/',
    big:'https://www.bigcommerce.com/pricing/',
    odoo:'https://www.odoo.com/documentation/19.0/developer/reference/external_api.html',
    presta:'https://docs.prestashop-project.org/v.8-documentation/user-guide/configuring-shop/shop-parameters/customer-settings',
    nop:'https://docs.nopcommerce.com/en/running-your-store/customer-management/customer-roles.html'
  };
  const countries = {HR:'Croatia',DE:'Germany',FR:'France',NL:'Netherlands',BE:'Belgium',UK:'United Kingdom',CH:'Switzerland',otherEU:'Another EU country'};
  const eu = ['HR','DE','FR','NL','BE','otherEU'];
  const options = {
    model:[['b2c','B2C: consumers buying for personal use'],['b2b','B2B: businesses buying for their trade'],['both','Both B2C and B2B']],
    seller:[['US','United States'],...Object.entries(countries),['other','Elsewhere / not decided']],
    stock:[['US','United States'],['EU','An EU country'],['UK','United Kingdom'],['CH','Switzerland'],['other','Elsewhere / not decided']],
    product:[['standard','Ordinary physical goods'],['regulated','Goods with additional requirements: toys, food, cosmetics, electrical products, etc.'],['digital','Digital goods or services']],
    team:[['none','No technical maintainer selected'],['partner','An agency or implementation partner'],['wordpress','A WordPress / PHP maintainer'],['dotnet','An experienced .NET team'],['inhouse','An in-house development team']],
    system:[['none','Starting without a business system'],['wordpress','WordPress content must remain'],['odoo','Odoo is already used'],['erp','Another ERP / accounting system must connect'],['migration','An existing store must be migrated']],
    workflow:[['standard','Standard catalogue and checkout'],['wholesale','Wholesale: quantity rules and a few price groups'],['company','Customer-specific contracts, company catalogues or approval workflows'],['operations','Multiple warehouses / sales channels'],['custom','A genuinely unusual ordering process']],
    budget:[['low','Under €1,500 setup; ongoing budget not confirmed'],['mid','€1,500–€5,000 setup with ongoing support budget'],['upper','€5,000–€20,000 setup with ongoing support budget'],['high','Over €20,000 setup with ongoing support budget'],['unknown','Not decided']],
    priority:[['simple','Reduce technical maintenance'],['control','Control hosting and customisation'],['operations','Keep orders and business operations connected']],
    tracking:[['essential','Only essential store functions'],['email','Email marketing / CRM'],['ads','Advertising pixels / behavioural analytics'],['both','Email marketing and advertising tracking'],['unknown','Not decided']],
    size:[['micro','Fewer than 10 staff AND turnover or balance-sheet total no more than €2m'],['larger','Outside those criteria'],['unknown','Not sure']],
    terms:[['prepaid','Paid before fulfilment'],['credit','B2B invoice / credit terms'],['unknown','Not decided']]
  };
  const labels={model:'Who buys from you?',seller:'Where is the selling business established?',stock:'Where is stock dispatched from?',product:'What do you sell?',team:'Who will maintain the technology?',system:'Which existing system must stay connected?',workflow:'Which process needs the most attention?',budget:'What is the technology budget?',priority:'What is your main priority?',tracking:'Which data uses are planned?',size:'What is the size of your business?',terms:'How will business customers pay?'};
  const platforms=[
    {id:'shopify',name:'Shopify',fit:'A hosted store with less infrastructure maintenance.',delivery:'Hosted service. Confirm the plan and new Markets availability.',b2b:'Company accounts, quantity rules and net terms exist across plans. Direct company catalogues and advanced payment workflows require Plus.',cost:'Subscription, apps, transaction fees, market features and implementation. A low entry price is not a price for your whole B2B process.',exit:'Export data and document app dependencies. The theme and integrations do not automatically transfer to another platform.'},
    {id:'woo',name:'WooCommerce',fit:'WordPress content and a maintained PHP stack.',delivery:'Core plus selected extensions, managed hosting and a named maintainer.',b2b:'Wholesale roles, quotes and visibility can be supplied by extensions. Test conflicts between pricing, tax, subscriptions and checkout.',cost:'Hosting, extension renewals, maintenance, restore tests and connector work. Free core software does not include operating support.',exit:'Own the site files, database and licences. Custom plugins can still make another maintainer expensive.'},
    {id:'shopware',name:'Shopware',fit:'Structured sales channels and more involved commerce processes.',delivery:'Confirm edition, commercial extension and partner scope.',b2b:'Modern B2B Components cover company organisation and purchasing processes on Evolve / Beyond. Community or Rise is not the same feature package.',cost:'Community is separate from paid plans. Official floors: Rise €600/month; Evolve €2,400/month, excluding VAT. Implementation is additional.',exit:'Document rules and integrations, and confirm which commercial features remain available after a licence change.'},
    {id:'big',name:'BigCommerce',fit:'Hosted commerce with a B2B portal route.',delivery:'Core store subscription; B2B Edition and integration scope separately confirmed.',b2b:'B2B Edition supports company users, quotes and invoice workflows. Do not assume its price is the entry store subscription.',cost:'Current pricing uses GMV caps, eligible payment-provider fees and plan changes. Ask for an annual projection using your GMV and payment mix.',exit:'Export core and B2B data separately; keep portal customisations and integration documentation.'},
    {id:'odoo',name:'Odoo eCommerce',fit:'Commerce alongside an already relevant Odoo business system.',delivery:'Specify Online, Odoo.sh or self-hosting, edition and localisations.',b2b:'Map pricelists, customer accounts, quotations, inventory and accounting to one order lifecycle. A demonstration is required for your exact approval process.',cost:'Users, implementation, hosting model and localisations. Official hosted-plan documentation reserves external API access for Custom.',exit:'Document accounting and stock dependencies. Replacing the storefront may still leave the ERP in place.'},
    {id:'presta',name:'PrestaShop',fit:'A PHP commerce project with a partner and proven modules.',delivery:'Confirm supported version, theme, modules and hosting.',b2b:'Documented B2B mode adds company information and customer-group treatment. It is not a full procurement portal by itself.',cost:'Hosting, modules, upgrades and integration acceptance tests. Quote the required B2B additions.',exit:'Obtain database, files, module licences and upgrade documentation.'},
    {id:'nop',name:'nopCommerce',fit:'A store supported by an experienced .NET team.',delivery:'.NET hosting, maintained plugins and deployment responsibility.',b2b:'Customer roles and role-dependent discount rules provide building blocks. Validate quotation, approval and ERP processes separately.',cost:'Licence terms, hosting, plugins, development and supported upgrades. A general server quote is not an application support contract.',exit:'Confirm source and plugin rights and demonstrate takeover by another .NET maintainer.'}
  ];
  function validate(p) {
    if(!p || !options.model.some(x=>x[0]===p.model) || !options.seller.some(x=>x[0]===p.seller) || !options.stock.some(x=>x[0]===p.stock) || !options.product.some(x=>x[0]===p.product) || !Array.isArray(p.markets) || !p.markets.length || p.markets.some(x=>!countries[x])) throw Error('Complete the business profile and select at least one supported market.');
  }
  function recommend(p) {
    validate(p);
    for(const k of ['team','system','workflow','budget','priority']) if(!options[k].some(x=>x[0]===p[k])) throw Error('Complete the technology question: '+labels[k]);
    // ponytail: editorial shortlist, not procurement scoring; use measured comparisons if validation data becomes available.
    const score={shopify:6,woo:3,shopware:1,big:4,odoo:0,presta:1,nop:0};
    const reasons={}; const add=(id,n,why)=>{score[id]+=n;(reasons[id]??=[]).push(why);};
    if(p.priority==='simple') {add('shopify',5,'You prioritise less infrastructure maintenance.');add('big',3,'You prioritise a hosted store.');}
    if(p.priority==='control') {add('woo',5,'You accept maintenance in exchange for control.');add('presta',3,'You accept a maintained PHP commerce stack.');add('nop',2,'You accept operating your application.');}
    if(p.team==='wordpress') {add('woo',6,'Your maintainer knows WordPress / PHP.');add('presta',3,'Your maintainer has relevant PHP experience.');}
    if(p.team==='dotnet') add('nop',16,'Your team already has .NET maintenance skills.');
    if(p.system==='wordpress') add('woo',10,'Your existing WordPress content must remain.');
    if(p.system==='odoo') add('odoo',22,'Your existing Odoo operations are a strong starting point.');
    if(p.workflow==='company') {add('shopware',8,'You need company-level purchasing workflows.');add('big',6,'A separate B2B portal deserves evaluation.');}
    if(p.workflow==='wholesale') {add('woo',3,'Wholesale extensions may cover your price groups.');add('shopify',2,'Quantity rules and group catalogues may fit your wholesale scope.');}
    if(p.workflow==='operations' || p.priority==='operations') {add('odoo',8,'Orders and stock processes need joint design.');add('shopware',3,'Sales channels and operational rules matter.');}
    const flags=['Obtain a first-year and renewal quote covering implementation, support, apps, payments and integrations.'];
    let status='shortlist';
    if(p.budget==='unknown' || p.team==='none' || ['erp','migration'].includes(p.system)) status='provisional';
    if(p.budget==='low' && ['company','operations','custom'].includes(p.workflow)) {status='needs-budget';flags.push('Your budget is not validated for this scope. Simplify the process or obtain an implementation quote before buying a platform.');}
    if(['low','mid'].includes(p.budget)) flags.push('Shopware commercial B2B plan costs may exceed this scope. Confirm recurring cost before considering it.');
    if(p.model!=='b2c') flags.push('B2B: demonstrate the exact price, tax, quote, company access and payment-term workflow.');
    if(p.system==='migration') flags.push('Compare fixing the current store with migrating URLs, consent records, orders and integrations.');
    if(p.product==='digital') {status='provisional';flags.push('Digital goods and services need additional rules. This release researches physical-goods workflows in greater depth.');}
    if(p.workflow==='custom') flags.push('Consider headless only after a supported standard storefront fails a written requirement. Budget ownership of checkout, SEO, accessibility and API changes.');
    let eligible=platforms.filter(x=>p.team!=='none'||!['shopware','presta','nop'].includes(x.id));
    if(['low','mid'].includes(p.budget)) eligible=eligible.filter(x=>x.id!=='shopware');
    const choices=eligible.slice().sort((a,b)=>score[b.id]-score[a.id]).slice(0,2).map(x=>({...x,reasons:reasons[x.id]||['Compare this alternative against the same acceptance tests.']}));
    return {status,choices,flags};
  }
  function requirements(p) {
    validate(p);const out=[];const hasEU=p.markets.some(x=>eu.includes(x));const consumer=p.model!=='b2b';const trade=p.model!=='b2c';
    const add=(id,title,text,source,tag)=>out.push({id,title,text,source,tag});
    if(hasEU||eu.includes(p.seller)) {
      add('privacy','Personal data still matters in B2B','EU establishment or EU targeting can create GDPR duties. Map orders, named company contacts and marketing data. Review processor contracts, retention, security and transfers. B2B does not remove personal-data obligations.',links.privacy,'B2C + B2B');
      if(['ads','both','unknown'].includes(p.tracking)) add('tracking','Test the tracking behaviour','Classify cookies and requests, then test before consent, refusal, partial consent and withdrawal. Confirm country-specific exceptions; neither server-side tagging nor a banner establishes compliance.',links.privacy,'DATA / COUNTRY');
      if(['email','both'].includes(p.tracking)) add('email','Review email permission by country','Separate service messages from promotions. Check local B2C and B2B marketing rules, permitted existing-customer exceptions and opt-out handling.', 'https://www.gesetze-im-internet.de/uwg_2004/__7.html','DATA / COUNTRY');
    }
    if(hasEU) {
      if(consumer) add('eu-b2c','Consumer checkout and returns','Prepare pre-contract information, a clear obligation-to-pay checkout, durable confirmation and withdrawal handling. The ordinary physical-goods baseline is 14 days with exceptions. Confirm national online withdrawal-function implementation.',links.consumer,'B2C');
      if(trade) add('eu-b2b','Business customer status, contracts and tax','Verify business purpose, VAT status, location and transport conditions. A company name or VAT field alone does not prove a zero-rated supply. Document quote acceptance, prices, payment terms and defect claims.',links.b2b,'B2B');
      if(p.stock!=='EU') add('import','Import and landed-cost plan','Identify importer, customer charges, customs process and returns route. Check IOSS eligibility for qualifying imported consignments no more than €150; do not apply the EU €10,000 threshold to a US seller by default.',links.vat,'LOCATION-DEPENDENT');
      else add('oss','EU stock and VAT registration','Map the specific stock country, local registrations and cross-border sales. OSS simplifies covered reporting; it does not replace every stock-country obligation.',links.vat,'LOCATION-DEPENDENT');
      if(p.product!=='digital') add('gpsr','Product information and traceability','For goods in GPSR scope, map manufacturer, EU responsible person where required, identifiers and warnings into catalogue fields. Consumer products can remain relevant in a wholesale supply chain.',links.safety,'PRODUCT-DEPENDENT');
      if(consumer) add('access','Accessible ecommerce journey', (p.size==='micro'?'Your stated size may qualify for the service microenterprise exemption; verify evidence and national implementation. ':p.size==='unknown'?'Business size is unresolved, so exemption eligibility is unknown. ':'Do not assume the service microenterprise exemption applies. ')+'Review payment and checkout accessibility. An accessible theme is not a checkout audit.',links.access,'B2C / SCOPE CHECK');
    }
    for(const c of [...new Set(p.markets)]) {
      if(c==='DE') add('DE','Germany: packaging and storefront duties','Check LUCID producer status and current PPWR responsibilities, including the authorised-representative route for foreign direct sellers. Review DDG identity disclosures and BFSG scope. Registration is not the whole packaging process.',links.DE,'NATIONAL CHECK');
      if(c==='FR') add('FR','France: information and sales terms','Separate consumer terms from business terms, review required disclosures, language and consumer mediation. Do not assume every foreign seller must display a French domestic company identifier.',links.FR,'NATIONAL CHECK');
      if(c==='NL') add('NL','Netherlands: consumer and business routes','Review disclosures and returns. A Netherlands-established webshop needs a Netherlands return address under the official guidance; that sentence does not cover every foreign seller. B2B-only price display differs from consumer display.',links.NL,'NATIONAL CHECK');
      if(c==='BE') add('BE','Belgium: local information requirements','Review business identification, consumer information and checkout against FPS Economy guidance. Domestic structured B2B invoicing depends on establishment and tax status, not merely a Belgian buyer.', 'https://economie.fgov.be/sites/default/files/Files/Entreprises/guidelines-obligations-information-dans-le-cadre-du-e-commerce.pdf','NATIONAL CHECK');
      if(c==='HR') add('HR','Croatia: consumer launch checks','For B2C review current consumer rules and the online withdrawal function. Seller establishment determines additional registration, fiscalisation and accounting checks.', 'https://narodne-novine.nn.hr/clanci/sluzbeni/2026_06_59_728.html','NATIONAL CHECK');
      if(c==='UK') add('UK','United Kingdom is a separate regime','Consumer cancellation, UK GDPR / PECR, VAT and import rules need separate treatment. Great Britain and Northern Ireland can differ. EU OSS does not handle UK VAT.',links.UK,'SEPARATE REGIME');
      if(c==='CH') add('CH','Switzerland is a separate regime','Swiss law does not create a general online-purchase withdrawal right. Review applicable law, promised returns, FADP, import VAT and product requirements. Do not copy the EU position automatically.',links.CH,'SEPARATE REGIME');
      if(c==='otherEU') add('coverage','National research is incomplete for this market','EU baseline only. Name the country and verify local consumer, cookie, packaging, invoicing and enforcement rules before launch.',links.consumer,'COVERAGE GAP');
    }
    if(p.seller==='BE') add('BE-invoice','Belgium-established seller: structured invoicing','Covered domestic B2B transactions require structured invoices from 1 January 2026; review VAT status and exceptions. Non-established businesses without a Belgian fixed establishment are excluded by the official guidance.',links.BE,'SELLER-DEPENDENT');
    if(p.seller==='DE') add('DE-invoice','Germany-established seller: invoice reception','Domestic businesses need e-invoice reception from 2025. Issuing has phased transition rules and exceptions; test the structured file and accounting import, not just a PDF.', 'https://www.bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html','SELLER-DEPENDENT');
    if(p.seller==='FR') add('FR-invoice','France-established seller: invoice rollout','Check reception from September 2026 and issuing / reporting by company size and transaction type. Small-company issuing is scheduled for September 2027.', 'https://entreprendre.service-public.gouv.fr/vosdroits/F39785','SELLER-DEPENDENT');
    if(p.seller==='HR') add('HR-invoice','Croatia-established seller: fiscalisation and e-invoices','Check in-scope consumer fiscalisation and domestic B2B e-invoicing separately, including VAT status and 2026 / 2027 phases. Test refund and correction events.',links.HR,'SELLER-DEPENDENT');
    if(p.product==='regulated') add('category','Additional product rules','Toys, food, cosmetics and electrical goods need category-specific review. CE is not a label for every product; do not buy inventory before resolving market access.',links.safety,'COVERAGE GAP');
    if(p.product==='digital') add('digital','Digital / service scenario needs extra research','This planner does not fully model digital withdrawal, service VAT, licensing or subscriptions. Treat the technology result as preliminary.',links.consumer,'COVERAGE GAP');
    if(p.seller==='other'||p.stock==='other') add('unknown','Establishment or stock location unresolved','No tax or import conclusion is reliable until these locations are specified. Resolve the business setup before committing to integrations.',links.vat,'MISSING INPUT');
    return out;
  }
  function economics(n) {
    const required=['price','vat','cogs','outbound','customerShipping','feePct','feeFixed','handling','returnRate','returnCost','writeoff','cac','fixed','discount'];
    if(['days','finance','badDebt'].some(k=>Object.hasOwn(n,k))) required.push('days','finance','badDebt');
    if(required.some(k=>n[k]===''||n[k]==null)||!['gross','net'].includes(n.basis)) return null;
    const a={};for(const k of [...required,'days','finance','badDebt']) {a[k]=Number(n[k]??0);if(!Number.isFinite(a[k])||a[k]<0)throw Error('Use finite, non-negative amounts.');}
    for(const k of ['vat','feePct','returnRate','writeoff','discount','finance','badDebt'])if(a[k]>100)throw Error('Percentages must be between 0 and 100.');
    const v=1+a.vat/100,retain=1-a.returnRate/100,r=a.returnRate/100;
    const netPrice=a.price*(1-a.discount/100)/(n.basis==='gross'?v:1);
    const netShipping=a.customerShipping/(n.basis==='gross'?v:1);
    const gross=(netPrice+netShipping)*v;
    const revenue=retain*(netPrice+netShipping);
    const productCost=a.cogs*(retain+r*a.writeoff/100);
    const payment=gross*a.feePct/100+a.feeFixed;
    const finance=gross*a.finance/100*a.days/365;
    const badDebt=gross*a.badDebt/100;
    const beforeAcquisition=revenue-productCost-a.outbound-a.handling-payment-r*a.returnCost-finance-badDebt;
    const contribution=beforeAcquisition-a.cac;
    return {revenue,productCost,payment,finance,badDebt,beforeAcquisition,contribution,breakEven:contribution>0?Math.ceil(a.fixed/contribution):null,receivable:gross*a.days/30};
  }
  if(typeof module!=='undefined'&&module.exports)module.exports={recommend,requirements,economics};
  if(typeof document==='undefined')return;
  const root=document.getElementById('eu-launch-planner');if(!root)return;
  let mode='full',step=0,started=false;const answers={};const money={b2c:{},b2b:{days:'',finance:'',badDebt:''}};
  const E=(tag,text,cls)=>{const n=document.createElement(tag);if(text!=null)n.textContent=text;if(cls)n.className=cls;return n;};
  const B=(text,fn,cls)=>{const n=E('button',text,cls);n.type='button';n.addEventListener('click',fn);return n;};
  const A=(text,url)=>{const n=E('a',text);n.href=url;return n;};
  const steps=()=>['profile',...(mode==='full'||mode==='technology'?['technology']:[]),...(mode==='full'||mode==='requirements'?['requirements']:[]),...(mode==='full'||mode==='business'?['business']:[])];
  const focus=()=>{const h=root.querySelector('h2');if(h){h.tabIndex=-1;h.focus({preventScroll:true});root.scrollIntoView({block:'start'});}};
  const choose=m=>{mode=m;step=0;started=true;render();focus();};
  function intro(){root.replaceChildren();root.append(E('p','PEREMIN · EU ECOMMERCE LAUNCH PLANNER','eu-kicker'),E('h2','Which setup fits your online business?'),E('p','Choose your selling model and markets. Compare technology, examine your numbers and see the checks your launch needs.'));
    const actions=E('div',null,'eu-actions');for(const [m,t]of [['full','Build my launch plan'],['technology','Choose technology'],['business','Check the numbers'],['requirements','Explore the requirements']])actions.append(B(t,()=>choose(m),m==='full'?'eu-primary':''));
    root.append(actions,E('p','No account. No email required. Answers stay in this tab and disappear when you reload. Physical goods are the researched focus.','eu-small'),A('Read the guide first ↓','#eu-start'));}
  function select(form,key){const label=E('label',labels[key],'eu-field');const s=E('select');s.name=key;s.required=true;s.append(new Option('Choose an answer',''));for(const [v,t]of options[key])s.append(new Option(t,v));s.value=answers[key]||'';s.addEventListener('change',()=>answers[key]=s.value);label.append(s);form.append(label);}
  const numbers={price:['Product price before discount',0],vat:['Applicable VAT rate (%)',0,100],basis:['Price basis'],cogs:['Landed product cost',0],outbound:['Outbound delivery paid by merchant',0],customerShipping:['Delivery paid by customer',0],feePct:['Payment provider fee (%)',0,100],feeFixed:['Fixed payment fee per order',0],handling:['Packing and order handling',0],returnRate:['Fully returned orders (%)',0,100],returnCost:['Extra merchant cost per returned order',0],writeoff:['Product cost lost on a returned order (%)',0,100],cac:['Acquisition / sales cost per placed order',0],fixed:['Monthly fixed costs',0],discount:['Product discount (%)',0,100],days:['B2B days until payment',0],finance:['Annual financing rate (%)',0,100],badDebt:['Bad debt allowance (% of gross invoice)',0,100]};
  function moneyFields(form,kind){if(kind==='b2b')for(const k of ['days','finance','badDebt'])money.b2b[k]??='';const group=E('fieldset');group.append(E('legend',kind==='b2c'?'B2C order assumptions':'B2B order assumptions'));const grid=E('div',null,'eu-grid');
    for(const [k,[text,min,max]]of Object.entries(numbers)){if(kind==='b2c'&&['days','finance','badDebt'].includes(k))continue;const label=E('label',text,'eu-field');let input;
      if(k==='basis'){input=E('select');input.append(new Option('Choose gross or net',''),new Option('Customer prices include VAT','gross'),new Option('Customer prices exclude VAT','net'));}
      else {input=E('input');input.type='number';input.min=min;input.step=k==='days'?'1':'0.01';if(max!=null)input.max=max;input.placeholder='Unknown';}
      input.name=kind+'_'+k;input.value=money[kind][k]??'';input.addEventListener('input',()=>money[kind][k]=input.value);input.addEventListener('change',()=>money[kind][k]=input.value);label.append(input);grid.append(label);
    }group.append(grid);form.append(group);}
  function render(){if(!started)return intro();root.replaceChildren();const key=steps()[step];root.append(E('p',`STEP ${step+1} OF ${steps().length} · ${key.toUpperCase()}`,'eu-kicker'));const progress=E('progress');progress.max=steps().length;progress.value=step+1;progress.setAttribute('aria-label','Planner progress');root.append(progress,E('h2',{profile:'Describe the business and markets',technology:'Choose the technology constraints',requirements:'Identify the operating checks',business:'Test the order economics'}[key]));const form=E('form');
    if(key==='profile'){for(const k of ['model','seller','stock','product'])select(form,k);const g=E('fieldset');g.append(E('legend','Where will you sell? Select all planned markets.'));for(const [v,t]of Object.entries(countries)){const l=E('label',null,'eu-check');const i=E('input');i.type='checkbox';i.name='markets';i.value=v;i.checked=(answers.markets||[]).includes(v);i.addEventListener('change',()=>{answers.markets=[...form.querySelectorAll('[name=markets]:checked')].map(x=>x.value);});l.append(i,document.createTextNode(t));g.append(l);}form.append(g,E('p','Market chapters cover selected launch issues, not a complete legal audit. Other EU countries receive a baseline with a coverage warning.','eu-small'));}
    if(key==='technology'){for(const k of ['team','system','workflow','budget','priority'])select(form,k);form.append(E('p','Budget bands describe your stated scope, not vendor quotes. B2B requirements can make the entry subscription irrelevant.','eu-small'));}
    if(key==='requirements'){for(const k of ['tracking','size'])select(form,k);if(answers.model!=='b2c')select(form,'terms');form.append(E('p','These answers identify checks. They do not establish legal compliance, tax exemptions or completed registrations.','eu-small'));}
    if(key==='business'){form.append(E('p','All amounts are EUR. Use net costs where VAT is recoverable; otherwise use your actual gross costs. Do not enter customer data. Blank means unknown. Each model uses its own assumptions.','eu-small'));
      form.append(B('Load an illustrative example',()=>{const example={price:120,vat:20,basis:'gross',cogs:40,outbound:5,customerShipping:0,feePct:2,feeFixed:0.3,handling:2,returnRate:10,returnCost:8,writeoff:10,cac:10,fixed:1000,discount:0};money.b2c={...example};money.b2b={...example,basis:'net',price:100,cac:6,returnRate:2,days:30,finance:10,badDebt:1};render();root.querySelector('[name$=_price]')?.focus();}));
      if(answers.model!=='b2b')moneyFields(form,'b2c');if(answers.model!=='b2c')moneyFields(form,'b2b');}
    const error=E('p',null,'eu-error');error.setAttribute('role','alert');form.append(error);const actions=E('div',null,'eu-actions');if(step)actions.append(B('← Back',()=>{step--;render();focus();}));const submit=E('button',step===steps().length-1?'Show my plan':'Continue','eu-primary');submit.type='submit';actions.append(submit);form.append(actions);
    form.addEventListener('submit',e=>{e.preventDefault();try{validate(answers);if(key==='technology')recommend(answers);if(key==='business'){if(answers.model!=='b2b')economics(money.b2c);if(answers.model!=='b2c')economics(money.b2b);}if(step===steps().length-1)result();else{step++;render();focus();}}catch(err){error.textContent=err.message;error.scrollIntoView({block:'nearest'});}});root.append(form);}
  const currency=n=>new Intl.NumberFormat('en',{style:'currency',currency:'EUR'}).format(n);
  function section(title){const s=E('section',null,'eu-result-section');s.append(E('h3',title));root.append(s);return s;}
  function result(){root.replaceChildren();root.append(E('p','YOUR EU ECOMMERCE LAUNCH PLAN','eu-kicker'),E('h2','A shortlist and the checks behind it'),E('p',`${options.model.find(x=>x[0]===answers.model)[1]} · Seller: ${options.seller.find(x=>x[0]===answers.seller)[1]} · Markets: ${answers.markets.map(x=>countries[x]).join(', ')}`),E('p','Reviewed '+checked+'. Editorial guidance, not a price quote or a compliance certificate.','eu-small'));
    if(mode==='full'||mode==='technology'){const r=recommend(answers);const s=section('Technology shortlist');s.append(E('p',{'shortlist':'Compare these candidates using the same acceptance tests.','provisional':'Provisional: resolve the missing maintainer, budget or integration details.','needs-budget':'The stated scope needs a budget review before purchase.'}[r.status],'eu-notice'));for(const p of r.choices){const card=E('div',null,'eu-card');card.append(E('h4',p.name),E('p',p.reasons.join(' ')));for(const [label,text]of [['Fit',p.fit],['Delivery',p.delivery],['B2B depth',p.b2b],['Cost',p.cost],['Exit',p.exit]]){const line=E('p');line.append(E('strong',label+': '),document.createTextNode(text));card.append(line);}card.append(A('Official documentation',links[p.id]));s.append(card);}for(const t of r.flags)s.append(E('p',t,'eu-notice'));s.append(A('Compare the platform details ↓','#eu-platforms'));}
    if(mode==='full'||mode==='business'){const s=section('Commercial assumptions');for(const kind of answers.model==='both'?['b2c','b2b']:[answers.model]){const r=economics(money[kind]);s.append(E('h4',kind.toUpperCase()));if(!r){s.append(E('p','Numbers incomplete. Fill the required amounts, or explicitly enter zero where appropriate. No profitability conclusion is available.','eu-notice'));continue;}const dl=E('dl',null,'eu-metrics');for(const [label,value]of [['Expected net revenue / placed order',currency(r.revenue)],['Before acquisition / sales cost',currency(r.beforeAcquisition)],['Contribution / placed order',currency(r.contribution)],['Monthly orders to cover fixed costs',r.breakEven==null?'No finite break-even at this contribution':String(r.breakEven)]])dl.append(E('dt',label),E('dd',value));s.append(dl);if(kind==='b2b')s.append(E('p',`Financing allowance: ${currency(r.finance)}. Bad debt allowance: ${currency(r.badDebt)} per placed order.`));if(r.contribution<=0)s.append(E('p','More orders at these assumptions do not cover fixed costs. Review pricing and costs before funding growth.','eu-notice'));}
      s.append(E('p','Model: full returns only; customer product and shipping receipts are refunded on returned orders. Outbound delivery, packing and payment fees remain costs. Returned stock is resalable except for your write-off percentage. Extra return cost excludes costs already entered. B2B credit allowances are simplified and do not model VAT recovery on bad debt. No currency conversion.','eu-small'),A('Read the assumptions and worked example ↓','#eu-money'));}
    if(mode==='full'||mode==='requirements'){const s=section('Requirements to verify');for(const r of requirements(answers)){const card=E('div',null,'eu-card');card.append(E('p',r.tag,'eu-kicker'),E('h4',r.title),E('p',r.text),A('Source and scope',r.source));s.append(card);}s.append(A('See actual sanctions and legal ceilings ↓','#eu-cost-of-mistakes'));}
    const next=section('What to do before spending');next.append(E('ol'));const list=next.querySelector('ol');for(const t of ['Write the target-market, stock and customer-status assumptions into your project brief.','Ask shortlisted providers to demonstrate one complete order, invoice, return and data-permission workflow.','Confirm tax, product and national requirements with the responsible specialists.','Replace illustrative costs with supplier and implementation quotes.','Run acceptance tests before taking live orders.'])list.append(E('li',t));
    const actions=E('div',null,'eu-actions');actions.append(B('Edit answers',()=>{step=0;render();focus();}),B('Print / save as PDF',()=>{document.body.classList.add('eu-print-plan');window.print();document.body.classList.remove('eu-print-plan');}),B('Download my answers',()=>{const data={reviewed:'2026-10-01',mode,profile:answers,assumptions:money};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=A('download',url);a.download='peremin-eu-launch-plan.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}));root.append(actions);
    const more=E('div',null,'eu-actions');for(const [m,t]of [['full','Open the full planner'],['technology','Technology'],['business','Business numbers'],['requirements','Requirements']])if(m!==mode)more.append(B(t,()=>choose(m)));root.append(more,A('Discuss this plan with Goran Peremin','https://www.peremin.com/about-me/'),E('p','Use the contact route on my profile. No booking service or email collection is embedded in this preview.','eu-small'),B('Start again',()=>{for(const k of Object.keys(answers))delete answers[k];money.b2c={};money.b2b={};started=false;step=0;intro();focus();}));focus();}
  intro();
})();
