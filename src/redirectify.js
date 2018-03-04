// Redirect some URLs according to RULES below.
//
// Intended to stop me being bounced straight into viewing PDF documents quite
// so often. The example redirect rules below each redirect a PDF to an HTML
// index page from where clicking on the PDF will work.
//
// Each rule contains: [urlMatch, pattern, replace, (optional) bypassDomain]
// urlMatch in format https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Match_patterns
// pattern+replace are used for regex rewriting of the URL unless request
// initiated at a subdomain of bypassDomain or same domain as URL if
// bypassDomain is missing.
//
// Iain Murray, March 2018.

RULES = [
  ["*://*.arxiv.org/*", /(.*)\/pdf\/(.*?)(.pdf)?$/, '$1/abs/$2'],
  ["*://xxx.lanl.gov/*", /(.*)\/pdf\/(.*?)(.pdf)?$/, '$1/abs/$2'],
  ["*://arxiv-export-lb.library.cornell.edu/*", /(.*)\/pdf\/(.*?)(.pdf)?$/, '$1/abs/$2'],
  ["*://*.openreview.net/*", /pdf\?id=/, 'forum?id='],
  ["*://*.mlr.press/*", /^(.*)\/[^\/]*.pdf$/, '$1.html'],
  ["*://*.jmlr.org/*", /papers\/volume(.*)\/[^\/]*.pdf$/, '/papers/v$1.html'],
  ["*://delivery.acm.org/*", /.*delivery.acm.org\/[0-9.]*\/[0-9.]*\/([0-9]*)\/.*/,
    'https://dl.acm.org/citation.cfm?id=$1', '.acm.org'],
  ["*://papers.nips.cc/*", /\.pdf$/, '']
];

var browser = browser || chrome;

function fix(request, pattern, replacement, bypassDomain) {
  console.log(request);
  // 2018-03-04: request.initiator below is for Chrome, which doesn't have originUrl.
  //             Unfortunately .initiator is missing for new tabs, so in Chrome
  //             middle-clicking a PDF link on arXiv opens the abstract page.
  oldHost = new URL(request.originUrl || request.initiator || 'http://example.com').hostname;
  newHost = bypassDomain || new URL(request.url).hostname;
  if (! ('.' + oldHost).endsWith(newHost)) {
    newUrl = request.url.replace(pattern, replacement);
    if (newUrl != request.url)
      return { redirectUrl: newUrl };
  }
}

RULES.forEach(rule => browser.webRequest.onBeforeRequest.addListener(
  request => fix(request, rule[1], rule[2], rule[3]),
  {urls: [rule[0]], types: ["main_frame", "sub_frame"]},
  ["blocking"]));

