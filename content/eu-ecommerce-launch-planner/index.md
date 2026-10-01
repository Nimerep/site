---
title: How to launch an ecommerce business in Europe: B2C, B2B and the technology behind it
description: Choose ecommerce technology for European markets and connect B2C and B2B workflows with margins, VAT, privacy, returns and country-specific launch checks.
type: blog-post
nav: false
date: 2026-10-01
updated: 2026-10-01
language: en
euLaunchPlanner: true
author: Goran Peremin
tags: ecommerce, b2b, b2c, europe, platform selection, gdpr
sourceURL: https://www.peremin.com/eu-ecommerce-launch-planner/
image: /media/posts/seo-covers/ecommerce-growth-system.webp
---

To launch an online business in Europe, choose your customer model, selling entity and fulfilment route before buying the store technology. Those decisions determine the checkout, invoices, returns, data handling and the margin left after each order.

I would start with the order you need to deliver, then choose the platform that can deliver it. Use the planner below to turn your assumptions into a technology shortlist, separate B2C and B2B numbers, and a set of launch checks.

[[EU_LAUNCH_PLANNER]]

**By Goran Peremin · Research reviewed 1 October 2026.** This guide focuses on physical goods and selected issues in Croatia, Germany, France, the Netherlands and Belgium. The United Kingdom and Switzerland have separate regimes. Digital products, regulated categories and other countries require additional research. Sources describe rules and product features. The platform recommendations are my editorial judgement. A planner result is a starting brief, not a legal opinion, tax decision or vendor quote.

<span id="eu-start"></span>

## What do you need before opening an online store in Europe?

You need a defined seller, buyer type, target country, stock location and order process. “Europe” is too broad for one tax setting or one set of sales terms. A US company shipping to a German consumer has a different launch problem from a Belgian company invoicing another Belgian business.

Write a one-page brief with these answers before requesting proposals:

| Decision | What to specify | Why technology depends on it |
|---|---|---|
| Selling entity | Country of establishment, VAT status, responsible operator | Invoice identity, tax setup, registrations and payment onboarding |
| Customers | Consumers, professional buyers, or both | Price display, account approval, returns, company permissions |
| Markets | Countries you actively target | Language, delivery promises, local obligations and support |
| Inventory | Dispatch country and warehouse owner | Import route, landed cost, stock sync and local tax questions |
| Goods | Ordinary physical goods or a regulated category | Product information, safety documentation and market access |
| Operations | Order, payment, picking, invoice, return and refund | Connector scope and acceptance tests |
| Economics | Landed cost, fulfilment, acquisition, returns and overhead | Whether growth funds the business or increases losses |

Do not describe a requirement as “ERP integration.” Specify which system owns stock, when an order reserves it, what happens after a failed payment, and who resolves an invoice rejected by accounting. This is how a business requirement becomes something a developer can build and a merchant can test.

## What is the difference between B2C and B2B ecommerce in Europe?

B2C means selling to consumers acting outside their trade or profession. B2B means selling to businesses for professional purposes. A “company” checkbox does not safely settle every buyer's legal status. Mixed stores need distinct customer journeys, terms and commercial assumptions.

| Area | B2C route | B2B route |
|---|---|---|
| Pricing | Show the consumer's payable price and required charges clearly | Net pricing and negotiated prices may be appropriate for an identified business audience |
| Accounts | Guest checkout often matters | Verified organisation, authorised users and purchasing permissions may matter |
| Ordering | Individual purchase and immediate payment | Quotes, purchase orders, minimum quantities, approval and credit may be needed |
| Returns | Consumer withdrawal and conformity rights require specific handling | Returns are generally governed by contract and applicable business law. Consumer rules do not simply transfer |
| Tax | Destination and import route can change the treatment | Customer status, VAT evidence and movement of goods matter |
| Data | Customer data and behavioural tracking | Named employees and business contacts are still people whose data needs protection |
| Margin | Acquisition, delivery and consumer returns | Discounts, sales effort, credit exposure and payment delay |

EU consumer distance-selling guidance sets out the usual 14-day withdrawal period, exceptions and information duties. Missing withdrawal information can extend the period by an additional year. Build the return workflow around the applicable transaction, including standard delivery refunds and disclosed return costs. Do not remove statutory consumer rights through a generic “no refunds” sentence. [EU distance-selling guidance](https://europa.eu/youreurope/business/selling-in-eu/selling-goods-services/ecommerce-distance-selling/index_en.htm).

For business customers, agree the order of precedence between quotes, purchase orders and sales terms. Decide when a contract forms, which returns you accept and which credit limit applies. A buyer who can purchase on account needs more than a login form.

## Which ecommerce platform should you choose for European B2C and B2B sales?

Choose the platform that passes your actual order and accounting tests at a support cost you can sustain. There is no single best European ecommerce platform. A maintained WooCommerce installation can be a better fit for an existing WordPress business. A hosted store can suit a small team. A procurement-heavy business may need a different edition, portal or architecture.

<span id="eu-platforms"></span>

The planner uses an editorial shortlist, not a measured vendor ranking. It considers your team, existing system, workflow, budget and priorities. An unknown budget or unresolved integration makes the result provisional. Complex procurement with a small setup budget triggers a scope and budget warning. The output never certifies compatibility.

| Candidate | Useful starting point | What can change the decision |
|---|---|---|
| Shopify | Hosted selling with less infrastructure work | Plan-specific B2B, market configuration, payment economics and app dependencies |
| WooCommerce | WordPress content and a competent PHP maintainer | Extension interactions, performance, restore responsibility and upgrade costs |
| Shopware | Structured sales channels and more involved commerce | Edition, commercial components and implementation scope |
| BigCommerce | Hosted commerce with a separate B2B portal route | GMV rules, payment-provider fees and B2B Edition quote |
| Odoo | Existing Odoo inventory, sales and accounting processes | Hosting model, localisations, API entitlement and implementation quality |
| PrestaShop | Commerce-focused PHP project with proven modules | Version support, modules and depth of purchasing workflows |
| nopCommerce | A business with an experienced .NET team | Plugin rights, support ownership and procurement customisation |

My first filter is the operator. Who takes responsibility when payment succeeds but the warehouse never receives the order? A platform without a named operational owner is an unfinished buying decision.

### When does Shopify make sense, and what does B2B actually include?

Shopify is a candidate when a hosted service fits the business and the required workflow fits the chosen plan. Its current documentation lists B2B features on Basic, Grow, Advanced and Plus. The blanket claim that all Shopify B2B requires Plus is outdated. Lower plans have limits, including three active B2B market catalogues. Direct company catalogue assignment and more advanced payment capabilities remain plan-dependent. Check new Markets availability before contracting. [Shopify B2B plan features](https://help.shopify.com/en/manual/b2b/getting-started/plan-features).

Demonstrate a retail customer and two business organisations buying the same SKU at different prices. Then test a mixed cart, tax evidence, discount interaction, cancellation, partial fulfilment and the accounting export. Record which function is native, which needs an app and which requires a higher plan. A demonstration that only changes the product price leaves most of the purchasing process unanswered.

### When is WooCommerce the right choice?

WooCommerce is a candidate when WordPress is an asset and someone will maintain the application. A documented B2B extension can supply functions such as wholesale pricing, customer roles, quotations and visibility controls. These are extension capabilities, not proof that every WooCommerce installation has them. [B2B for WooCommerce documentation](https://woocommerce.com/document/b2b-for-woocommerce/).

Put the exact theme and extensions into a staging environment. Test tax display after login, cached pages showing the correct customer price, payment method restrictions and refunds. Require a restore demonstration and an upgrade procedure. Your proposal should name hosting, renewal fees, support response and responsibility for conflicts. “Free software” answers the licence question. It does not price this operating work.

### When should you evaluate Shopware?

Evaluate Shopware when sales channels, catalogue rules and purchasing organisation justify the implementation. Community and commercial editions are different buying decisions. Official starting prices reviewed for this guide are €600 per month for Rise and €2,400 per month for Evolve, excluding VAT. Implementation is additional. [Shopware pricing](https://www.shopware.com/en/pricing/).

Modern B2B Components on Evolve and Beyond cover areas such as company organisation and purchasing workflows. Confirm the current component set rather than assuming an old B2B Suite tutorial matches a new installation. [Shopware B2B Components learning path](https://hub.shopware.com/learn/path/shopware-b2b-components-for-merchants).

Ask the partner to show catalogue assignment, buyer roles, approval, company budget handling and fulfilment against your test orders. Price the commercial licence together with migration, connectors and ongoing support. A capable platform can still be an unsuitable purchase if its implementation consumes the money needed for stock and customer acquisition.

### How should you budget for BigCommerce?

Budget BigCommerce using your projected GMV, payment-provider mix and B2B scope. Current US pricing uses Core, Growth, Scale and Performance. Core is listed at $39 monthly or $29 per month billed annually, with a $30,000 trailing-12-month GMV limit. Fees depend on the provider category; “no additional transaction fees” is not a safe blanket statement. Recheck the official definitions, thresholds and automatic plan changes when buying. [BigCommerce pricing](https://www.bigcommerce.com/pricing/).

B2B Edition adds a separate set of company, quotation and invoice workflows. Obtain a quote for that scope rather than treating the entry store subscription as its price. [BigCommerce B2B Edition overview](https://docs.bigcommerce.com/developer/docs/b2b-edition/getting-started/overview).

Model the same annual order volume under your likely payment choices. Include the cost of the portal and connectors. Demonstrate who can place orders, who can see invoices and how a failed accounting sync is repaired without duplicating the order.

### Is Odoo a store platform or a business-system decision?

Odoo should be evaluated as a connected business-system decision when inventory, sales and accounting already belong there. Changing the storefront alone may leave the business dependent on the same ERP. Specify Online, Odoo.sh or self-hosting, the edition, user cost and local accounting requirements.

Official hosted-plan API documentation reserves external API access for Custom. A low entry subscription does not automatically include the integration route you need. [Odoo external API documentation](https://www.odoo.com/documentation/19.0/developer/reference/external_api.html).

Run a complete sale through stock reservation, delivery, invoice and credit note. Then test a partial delivery and returned stock. Ask who owns a failed connector job, how access is logged and whether the implementation partner can be replaced without losing the knowledge needed to operate accounting. Do not migrate working finance processes merely because the storefront demo looks convenient.

### Where do PrestaShop and nopCommerce fit?

PrestaShop can fit a maintained PHP commerce project. Its documented B2B mode adds company-related customer settings. Deeper procurement needs modules or development. Confirm the documentation against the version you will deploy. [PrestaShop customer settings](https://docs.prestashop-project.org/v.8-documentation/user-guide/configuring-shop/shop-parameters/customer-settings).

nopCommerce can fit a business with a .NET team. Customer roles provide building blocks for differentiated access, but roles alone do not demonstrate a full quotation and approval process. [nopCommerce customer roles](https://docs.nopcommerce.com/en/running-your-store/customer-management/customer-roles.html).

For either, ask for supported versions, plugin licences, ownership of source changes, rollback and takeover documentation. Buying modules from different suppliers creates a support boundary: someone still has to determine which component broke checkout. Put that responsibility in the proposal.

## Does a European online store need headless commerce?

No. Headless is justified when a specific requirement cannot be delivered well by the existing storefront, and the business can support the extra application. A standard catalogue, checkout and content site usually needs a working sales process before it needs a separate frontend.

Headless introduces responsibilities for rendered product pages, caching, price freshness, account sessions, search, consent signals and checkout handoff. It does not remove the commerce backend, payment rules or product obligations. If a business customer sees another company's cached contract price, the frontend architecture has become a commercial problem.

Ask what measurable requirement motivates the change: an unusual configurator, several supported interfaces, or a demonstrated limitation in the current storefront. Require the proposed solution to preserve crawlable pages, canonical URLs, stock accuracy and logged-in permissions. Include the team and release process in the cost. “Modern” is not an acceptance criterion.

## Which integrations should you test before launching a web shop?

Test the full order lifecycle across the store, payment service, warehouse, accounting and customer support. An integration is usable when it handles failure and correction, not merely when it transfers one successful order.

| Test | Expected outcome | Failure you are trying to avoid |
|---|---|---|
| Payment retry and repeated webhook | One commercial order, traceable events | Double shipment or duplicate invoice |
| Last unit purchased concurrently | Defined stock reservation and oversell policy | Selling goods you cannot deliver |
| Company-specific catalogue | Only authorised buyers see the agreed price | Contract price disclosed to another customer |
| Invalid or changed VAT evidence | Defined review route and retained evidence | Unjustified tax exemption |
| Partial fulfilment and partial refund | Correct inventory, payment and accounting state | Store and ledger disagreeing |
| Structured invoice rejection | Visible error, correction and resubmission | A PDF mistaken for a valid structured invoice |
| Withdrawal and return | Time-stamped request, return status, refund evidence | A support email losing a statutory request |
| Consent refused and later withdrawn | Optional tags remain blocked or stop as required | Marketing tracking before permission |
| Account access revoked | Company permissions disappear across services | Former employee retaining purchasing access |
| Backup restored | Order state reconciled with payment and warehouse | Restored store reprocessing historical orders |

Assign an owner to each exception. Put API limits, retry behaviour and an audit trail into the integration scope. A daily CSV can be enough at low volume if its delays and reconciliation are acceptable. It becomes inadequate when it cannot keep inventory or credit exposure within the limits the business needs.

## How much does an ecommerce launch in Europe cost?

The relevant price is setup plus the cost of running the required process. Separate platform subscriptions from implementation, stock, fulfilment, local tax work, product compliance, content and customer acquisition. A cheap storefront can sit on top of an expensive operating model.

Use a 12-month comparison with these rows: subscription or licence, hosting, required modules, payment charges, integrations, maintenance, accounting interfaces, translations, support and a priced exit exercise. Label currency, VAT treatment, billing term, volume assumptions and excluded work. Do not compare an annual-billed entry plan with a month-to-month enterprise quote without showing the difference.

Request a base scenario and a growth scenario. What changes at ten times the orders? More storage is only one possibility: subscription thresholds, support hours, warehouse capacity, customer-service staffing and reconciliation can all change. Keep proposed work that is not needed for the first operating process out of the initial contract.

## How do you calculate profit per ecommerce order?

Calculate contribution per placed order after VAT treatment, product cost, delivery, payment fees, handling, expected returns and acquisition. Revenue alone cannot tell you whether another order helps cover fixed costs.

<span id="eu-money"></span>

The planner uses your numbers. It does not infer a national VAT rate or eligibility for an exemption. Blank means unknown. Mixed stores have independent B2C and B2B assumptions. Costs should be net where VAT is recoverable and actual gross costs otherwise.

For an illustrative B2C order priced at €120 including an assumed 20% VAT, net product revenue is €100. With €40 landed product cost, €5 outbound shipping, €2 handling, payment fees of 2% of €120 plus €0.30, and €10 acquisition cost, contribution is **€40.30** before fixed costs when there are no returns. €1,000 monthly fixed costs require **25 placed orders** at those assumptions.

Now assume 10% full returns, €8 extra return handling per returned order and 10% write-off of the returned product's cost. Expected net revenue is €90. Expected product cost is €36.40 because most returned stock remains saleable. Outbound shipping, handling and the assumed non-refunded payment fees still cost money. Expected contribution falls to **€33.10**, requiring **31 orders** for €1,000 fixed costs. These are arithmetic examples, not industry benchmarks.

The model refunds customer product and shipping receipts on fully returned orders. It does not model partial returns, differing return cohorts, currency conversion or every tax adjustment. Enter extra return costs without counting outbound delivery twice. Include landed import and inbound freight costs in product cost consistently. If returned stock cannot be resold, change the write-off assumption.

The amount before acquisition is an upper mathematical allowance, not a recommended advertising bid. Customer-service capacity, overhead and the reliability of your return estimate still constrain spending. Do not use projected repeat purchases to excuse an unmeasured first-order loss.

## How do B2B discounts and payment terms change profitability?

B2B discounts reduce revenue immediately. Credit terms add funding and collection exposure. A high order value can disguise weak contribution when the sales process, delivery and payment delay are expensive.

The planner discounts the product price before calculating tax and expected returns. Its B2B inputs add payment days, annual financing rate and a bad-debt allowance. Financing is a simplified gross-invoice amount multiplied by annual rate and days divided by 365. It does not forecast a full cash-flow statement or VAT recovery on bad debt.

For a €1,200 gross invoice outstanding for 60 days at an assumed 12% annual financing rate, the simple financing allowance is approximately €23.67. A 2% gross-invoice bad-debt allowance adds €24. These are assumptions you choose, not evidence that a particular buyer will default. At scale, review limits by customer, overdue balances and the cash needed to replace stock before the invoice is paid.

EU guidance describes late-payment remedies for qualifying business transactions, including a €40 recovery-cost amount. Applicable law, due dates and statutory rates matter. That remedy is not consumer debt collection and does not replace a credit policy. [EU business late-payment guidance](https://europa.eu/youreurope/business/finance-and-tax/making-receiving-payments/late-payment/index_en.htm).

## Can a US business sell online to European customers?

Yes, but the US seller must map the import, tax, consumer, privacy and product responsibilities for its route. A US registration and US website terms do not settle the obligations created by actively selling to European customers.

Compare direct shipment from the US with EU-held stock. Define who imports, who pays import charges, how the customer sees the landed price, where returns go and who provides required product information. An EU warehouse may shorten delivery while creating additional registration and reporting questions. “Ships to Europe” is a delivery setting, not a complete market-entry plan.

For goods within GPSR scope, online offers need prescribed identification and safety information, including the relevant responsible economic operator where applicable. Product-category law can impose additional requirements; CE marking is not a general label for every item. Resolve this before paying for inventory. [General Product Safety Regulation](https://eur-lex.europa.eu/eli/reg/2023/988).

## How do EU VAT, OSS and IOSS affect your store?

They affect tax collection, reporting and the data your order system must retain. OSS is a reporting simplification for covered transactions, not a universal exemption from every national VAT registration.

The EU €10,000 cross-border threshold has eligibility conditions and is not a general tax-free allowance for a US merchant. IOSS concerns eligible imported consignments not exceeding €150. Excluded goods, intermediary requirements and the dispatch route matter. EU-held stock can create obligations outside the simplified route. [European Commission OSS guidance](https://vat-one-stop-shop.ec.europa.eu/one-stop-shop_en).

For intra-EU B2B goods, a VAT number by itself does not make every order zero-rated. Verify the customer status, movement of goods, applicable conditions and evidence. Other goods and services can follow different rules. [EU cross-border VAT guidance](https://europa.eu/youreurope/business/finance-and-tax/vat/cross-border-vat/index_en.htm).

Your implementation should retain the evidence your adviser specifies, distinguish customer and ship-to identity, apply the correct tax decision and produce corrections consistently. Test a buyer whose VAT validation fails, a changed delivery country and a return after reporting. Ask the accountant to approve sample outputs before the first live sale.

## Does GDPR apply to an American store or a B2B website?

GDPR can apply to a non-EU business offering goods or services to people in the EU or monitoring their behaviour. A B2B label does not remove personal-data obligations: a named purchaser, employee email or account activity can relate to an identifiable person. [EU GDPR guidance for businesses](https://europa.eu/youreurope/business/governance-and-sustainability/digital-and-data-compliance/data-protection-gdpr/index_en.htm).

List the data used for payment, delivery, accounting, support, fraud prevention and marketing. Identify the purpose, legal basis, retention and vendors for each. Determine controller and processor roles, international-transfer arrangements and whether an EU representative is required. A provider's compliance page does not answer these questions for the merchant.

Turn the map into application behaviour. Separate marketing preferences from order communications. Limit employee permissions. Make deletion and retention rules respect accounting duties. Test exports and access requests across connected systems. Do not solve a deletion request by erasing an invoice the business must retain, or retain marketing data indefinitely because it once accompanied an order.

## Do you need cookie consent and permission for B2B marketing?

Advertising tracking generally needs a consent route under the applicable cookie rules. Necessary store functions and permitted low-impact analytics can receive different treatment. The answer depends on what actually runs and on national law. A banner is useful only if the tags obey its choices.

Dutch official guidance distinguishes necessary cookies and analytical cookies with little or no privacy impact from consent-requiring tracking. Do not describe every analytics configuration as exempt. [Netherlands cookie guidance](https://business.gov.nl/regulations/cookies/).

Email permission is a separate question from the GDPR basis for keeping a contact. German UWG rules ordinarily require express prior permission for advertising email, with a narrow existing-customer exception. Calling a prospect a business does not create unrestricted cold-email permission. [German UWG §7](https://www.gesetze-im-internet.de/uwg_2004/__7.html).

Test first visit, refusal, acceptance by purpose, later withdrawal and server-side forwarding. Inspect network traffic, embedded video, chat tools and abandoned-cart systems. Record which service sets or receives data and at what point. A server-side tag or “consent mode” name is not itself permission to send data.

## Which national rules should you check for your first European markets?

Check both the target market and the selling establishment. Consumer-facing duties can follow targeting. Domestic invoicing requirements often depend on establishment, VAT status and transaction type. The chapters below are selected checks, not complete national audits.

### Croatia: what changes the checkout and invoice workflow?

Croatia's 2026 consumer-law amendment introduces an online withdrawal function for covered online contracts. Plan the actual request, acknowledgement and support workflow, rather than only linking to a downloadable form. Check the commencement provisions for each amendment. [2026 consumer-law amendment](https://narodne-novine.nn.hr/clanci/sluzbeni/2026_06_59_728.html).

For a Croatia-established seller, review fiscalisation and domestic e-invoicing separately. The 2025 legislation has different 2026 and 2027 phases according to transaction and VAT status. Do not apply domestic obligations automatically to every foreign store with a Croatian customer. [Croatian Fiscalisation Act](https://narodne-novine.nn.hr/clanci/sluzbeni/2025_06_89_1233.html).

Ask the local accounting provider to demonstrate consumer payment methods, domestic business invoices, refunds and corrections. A connector described as “supports Croatia” must show these events for your actual seller status.

### Germany: is LUCID registration enough?

No. Determine your packaging responsibilities, registration, system participation and reporting. Current ZSVR guidance also addresses the PPWR rules applying from August 2026 and the authorised-representative route for foreign direct sellers. Free registration is not a statement that packaging compliance is free or completed. [ZSVR registration guidance](https://www.verpackungsregister.org/en/registration/find-out-about-registrations).

Check the required provider identity under DDG, alongside consumer information and applicable accessibility duties. [DDG §5](https://www.gesetze-im-internet.de/ddg/__5.html).

For Germany-established businesses, structured-invoice reception has applied since January 2025. Issuing has transition rules and exceptions. A PDF is not the same as the required structured format. [German Ministry of Finance e-invoice FAQ](https://www.bundesfinanzministerium.de/Content/DE/FAQ/e-rechnung.html).

### France: what should the selling terms and invoice project cover?

Separate consumer information and terms from business terms, and review language and applicable mediation duties. The French government guidance explains different obligations and sanctions by audience and legal form. Do not assume every foreign merchant needs a French domestic registration number. [French ecommerce guidance](https://entreprendre.service-public.gouv.fr/vosdroits/F23455?lang=en).

The domestic invoice reform requires reception for in-scope businesses from September 2026, with issuing phased by size. Smaller-business issuing is scheduled for September 2027. E-reporting for other covered transactions is distinct from domestic B2B e-invoicing. [French invoice reform](https://entreprendre.service-public.gouv.fr/vosdroits/F39785).

Include the approved invoice/reporting route in the accounting scope. Do not select a platform on the assumption that emailing a PDF settles all of it.

### Netherlands: what should a foreign store avoid assuming?

Official guidance requires a Netherlands return address for a webshop established in the Netherlands. That sentence should not be copied as a blanket rule for every overseas seller. It also distinguishes consumer distance-selling requirements from B2B-only selling and price presentation. [Dutch distance-selling guidance](https://business.gov.nl/regulations/long-distance-sales-and-purchases/).

Decide what your Dutch customers will see and how returns will operate. Translate important operational information accurately, and confirm the national rules relevant to your establishment and targeting. Review cookie behaviour against the actual privacy impact of your configuration.

### Belgium: does every Belgian customer require a Peppol invoice?

No. The structured-invoice requirement from January 2026 concerns covered domestic Belgian B2B transactions and has defined scope and exceptions. Official guidance excludes non-established businesses without a Belgian fixed establishment, even where they have a Belgian VAT number. B2C outgoing invoices are different. A business may still need to receive covered supplier invoices. [Belgian official e-invoicing scope](https://efacture.belgium.be/fr/article/pour-qui-la-facturation-electronique-deviendra-t-elle-obligatoire).

Review buyer information and the checkout using FPS Economy guidance. [Belgian ecommerce information guidelines](https://economie.fgov.be/sites/default/files/Files/Entreprises/guidelines-obligations-information-dans-le-cadre-du-e-commerce.pdf).

Brussels is a city and EU institutional centre, not a separate ecommerce jurisdiction. A Brussels customer means a Belgian-market question. It does not give your store an EU-wide compliance approval.

## Are the United Kingdom and Switzerland covered by EU ecommerce rules?

No. Treat them as separate launch workstreams. EU OSS does not handle UK VAT, and Swiss online-return rules are not a copy of the EU consumer withdrawal framework.

UK distance-selling rules include consumer information and cancellation requirements. Great Britain and Northern Ireland can differ for goods, and the import/VAT treatment depends on the route and consignment. [UK distance-selling guidance](https://www.gov.uk/online-and-distance-selling-for-businesses/distance-selling), [UK direct-sales VAT guidance](https://www.gov.uk/guidance/charging-vat-on-goods-sold-direct-to-customers-in-the-uk).

Swiss law does not generally create a statutory withdrawal right merely because a purchase was online. Your promised returns and the law applicable to a cross-border contract still matter. Review Swiss identity requirements, privacy, import taxation and product access separately. This guide does not calculate Swiss VAT eligibility. [SECO purchase guidance](https://www.seco.admin.ch/de/probleme-nach-dem-kauf), [SECO online commerce guidance](https://www.seco.admin.ch/de/onlinehandel).

## Does an online store need to meet European accessibility requirements?

Consumer ecommerce services can fall within the European Accessibility Act requirements applying from June 2025. Assess scope, the service-provider microenterprise exemption and national implementation. Do not assume that every B2B portal is covered in exactly the same way. The microenterprise definition uses fewer than ten staff and turnover or balance-sheet criteria. [Directive 2019/882](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L0882).

Technology choices affect the cost of correcting barriers. Test navigation, product options, validation errors, authentication and payment with a keyboard. Check zoom, labels, contrast and whether screen-reader users can understand a failed payment. Third-party widgets are part of the customer's experience, so include them in acceptance testing. An overlay subscription does not demonstrate that these journeys work.

The planner flags a scope check rather than granting an exemption. Even where a legal exemption applies, inaccessible checkout can exclude customers and increase support work.

## How much can ecommerce compliance mistakes cost?

Costs can include sanctions, lost sales, refunds, product withdrawal, corrective development and professional work. Legal ceilings are not predictions of a small merchant's fine. Published decisions are evidence of enforcement, not proof that every announced amount has been paid.

<span id="eu-cost-of-mistakes"></span>

| Issue | Verified amount or ceiling | Scope and status |
|---|---|---|
| GDPR infringements | Up to €10m / 2%, or €20m / 4% of preceding-year worldwide annual turnover, whichever is higher for the applicable category | Article 83 categories and circumstances matter. Not an automatic charge for any privacy error. [GDPR Article 83](https://eur-lex.europa.eu/eli/reg/2016/679/oj), [EDPB fine calculation guidance](https://www.edpb.europa.eu/system/files/2023-06/edpb_guidelines_042022_calculationofadministrativefines_en.pdf) |
| Google cookie and related issues in France | €325m sanction announced by CNIL in September 2025 | National cookie/email rules. Do not relabel the whole decision as GDPR. Payment and later appeal status are not established here. [CNIL Google decision announcement](https://www.cnil.fr/fr/publicites-inserees-entre-les-courriels-et-cookies-la-cnil-sanctionne-google-dune-amende-de-325) |
| Kruidvat tracking cookies in the Netherlands | €600,000 announced in July 2024 | Regulator described invalid consent. The announcement noted an objection. Current outcome/payment not verified. [Dutch regulator announcement](https://autoriteitpersoonsgegevens.nl/actueel/boete-van-600000-euro-voor-tracking-cookies-op-kruidvatnl) |
| Cookie cases in Croatia | €15,000 and €20,000 in two published cases | AZOP's examples concerned bookmakers, not ordinary retail stores. Useful evidence that smaller operators face enforcement, not a webshop tariff. [AZOP announcement](https://azop.hr/devet-novih-upravnih-novcanih-kazni-u-ukupnom-iznosu-od-51-000-eura/) |
| French consumer pre-contract information failure | Up to €3,000 for an individual business operator; €15,000 for a legal entity | Specific information offence, not a ceiling for every consumer-law breach. [French government guidance](https://entreprendre.service-public.gouv.fr/vosdroits/F23455?lang=en) |
| Specified German accessibility offences | Up to €100,000 for listed categories. Other listed offences up to €10,000 | BFSG §37 distinguishes offences. Scope and exemptions must be assessed. [BFSG §37](https://www.gesetze-im-internet.de/bfsg/__37.html) |
| UK substantive consumer-law infringement under CMA direct powers | Maximum £300,000 or 10% of worldwide annual turnover, whichever is greater | Specific statutory enforcement framework. Other procedural breaches have different ceilings. [CMA official guide](https://www.gov.uk/government/publications/how-the-cma-uses-its-direct-consumer-enforcement-powers/how-the-cma-uses-its-direct-consumer-enforcement-powers) |
| Specified intentional Swiss FADP offences | Up to CHF250,000 | Criminal provisions primarily concern responsible individuals. Not an EU-style automatic company-turnover fine. [FDPIC criminal-law guidance](https://www.edoeb.admin.ch/en/criminal-law) |

Google's case shows that size does not remove enforcement exposure. It does not establish that a small shop faces the same amount. For a founder, an order stop, forced tag removal or a recall can threaten the business before a headline-sized fine becomes relevant.

Price the non-fine part as well. As an illustrative estimate, 40 hours of remediation at an assumed €100 hourly rate costs €4,000 before legal work, lost contribution or refunds. Label assumptions and use real quotes. Do not disguise a made-up scenario as a market statistic.

## How should you launch without discovering the problems after your first orders?

Launch after the shortlisted setup passes written commercial, operational and country-specific checks. Start with a limited market and product scope that you can fulfil, support and reconcile, then expand using actual return and cost data.

1. Confirm the entity, markets, stock route and customer-status policy with the responsible specialists.
2. Resolve product access, tax registrations and the required invoice/reporting route.
3. Replace the planner's unknowns and examples with supplier prices and documented assumptions.
4. Obtain demonstrations from the shortlisted providers using the same order tests.
5. Verify checkout information, returns, consent, permissions and accessible purchasing.
6. Run test orders, failures, refunds and accounting reconciliation before enabling live sales.
7. Review contribution, failed integrations and support demand after launch. Expand only with an owner for the new obligations.

The test evidence is the useful output: sample invoices, event logs, return acknowledgements and a list of unresolved issues. A green project dashboard is not evidence that a tax treatment or return process is correct.

## Can this guide help your business appear in AI search answers?

A useful, indexable article with direct answers, named authorship and primary sources gives search systems material they can understand and cite. It cannot guarantee inclusion. Google says its AI search features do not require special AI markup or a new machine-readable file. [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features).

For this guide, the substantive answers remain in public HTML, independent of the questionnaire. Headings ask real buying questions. Examples disclose assumptions. Source links sit beside legal and feature claims. The author and review date help readers assess accountability. Keep the published canonical, language metadata and author profile consistent, and update facts when legislation or vendor plans change.

Do not promote an untested tool as a universal legal adviser. Authority comes from useful decisions, documented limits and repeatable demonstrations. Original case studies can strengthen this work when they contain real results and permission to publish them.

## How can Goran Peremin help plan your European ecommerce launch?

Use the planner output as a starting brief for a discussion about technology, operating costs and the checks your selling route needs. My proposed approach is to turn your order process into platform acceptance tests and a cost model before committing to an implementation.

Bring the selling entity, first countries, product category, dispatch route, existing systems and B2C/B2B split. Identify the accountant, legal adviser and product specialist responsible for confirming regulated decisions. A technical project needs these decisions to implement the right behaviour.

[Discuss your ecommerce plan with Goran Peremin](https://www.peremin.com/about-me/). For a Croatia-specific introduction, see [how to launch a web shop in Croatia](https://www.peremin.com/kako-pokrenuti-web-shop-u-hrvatskoj/). For the growth process after launch, see the [ecommerce growth guide](https://www.peremin.com/ecommerce-growth-vodic-seo-cro-analitika-ai-gdpr/).

**Review scope:** primary legislation, government and regulator guidance, and official vendor documentation were consulted for the claims linked above. National chapters intentionally cover selected launch issues. Verify your exact facts and the current rule before acting. Vendor quotes, appeal outcomes and complete product-category audits are outside this preview.
