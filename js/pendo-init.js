(function(apiKey){
    (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
    v=['initialize','identify','updateOptions','pageLoad','track','trackAgent'];for(w=0,x=v.length;w<x;++w)(function(m){
    o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
    y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
    z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
})('b441c372-5d2b-479f-8815-a8827f2cfb67');

function safeLocalGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}

function safeLocalSet(key, value) {
  try { localStorage.setItem(key, value); } catch (e) {}
}

let visitorId = safeLocalGet('li_visitor_id');
if (!visitorId) {
  visitorId = 'visitor_' + Math.random().toString(36).substring(2, 15);
  safeLocalSet('li_visitor_id', visitorId);
}

pendo.initialize({
  visitor: {
    id: visitorId,
    app: 'LittleInvestors',
    role: 'family_learner',
    hackathon: 'world_product_day_2026'
  },
  account: {
    id: 'acc_little_investors',
    product: 'LittleInvestors',
    segment: 'family_financial_literacy'
  }
});

try {
  pendo.pageLoad({
    page: window.location.pathname,
    title: document.title,
    hackathon: 'world_product_day_2026'
  });
  pendo.track('novus_install_verified', {
    page: window.location.pathname,
    visitorId,
    source: 'littleinvestors_client'
  });
} catch (e) {}
