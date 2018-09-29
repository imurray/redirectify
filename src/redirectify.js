// Redirect some URLs according to RULES below.
//
// Intended to stop me being bounced straight into viewing PDF documents quite
// so often. The example redirect rules below each redirect a PDF to an HTML
// index page from where clicking on the PDF will work.
//
// Each rule contains: [urlMatch, pattern, replace, (optional list) bypassDomains]
// - urlMatch in format at:
//   https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Match_patterns
//   This match pattern must also be added to the permissions in the manifest.
//   (Manually or with update_manifest_hosts.py)
// - pattern and replace are used for regex rewriting of the URL
// - rewriting is abandoned if a request is initiated at a subdomain in
//   bypassDomains, or from the same domain as the requested URL.
//
// Iain Murray, March 2018, March 2021.

RULES = [
  ["*://*.arxiv.org/pdf/*", /(.*)\/pdf\/(.*?)(\.pdf)?$/, '$1/abs/$2', ['.inspirehep.net']],
  ["*://xxx.lanl.gov/pdf/*", /(.*)\/pdf\/(.*?)(\.pdf)?$/, '$1/abs/$2'],
  ["*://arxiv-export-lb.library.cornell.edu/pdf/*", /(.*)\/pdf\/(.*?)(\.pdf)?$/, '$1/abs/$2'],
  ["*://arxiv.org/ftp/*pdf", /.*arxiv()\/papers\/....\/(.*)\.pdf|.*\/([^\/]*\/)papers\/....\/([^.]*)\.pdf.*/, 'https://arxiv.org/abs/$1$2$3$4'],
  ["*://*.openreview.net/pdf*", /pdf\?id=/, 'forum?id='],
  ["*://proceedings.mlr.press/*.pdf", /^(.*mlr.press\/([^\/]*)\/)([^\/]*\/|)([^\/]*?)(-supp|Supple|)\.pdf$/, '$1$4.html'],
  ["*://*.jmlr.org/papers/*.pdf", /\/papers\/volume(.*)\/[^\/]*\.pdf$/, '/papers/v$1.html'],
  ["*://jmlr.csail.mit.edu/papers/*.pdf", /\/papers\/volume(.*)\/[^\/]*\.pdf$/, '/papers/v$1.html'],
  ["*://dl.acm.org/doi/pdf/*", /.*\/doi\/pdf\/([^\?#]*).*/, 'https://dl.acm.org/doi/$1', ['.acm.org']],
  ["*://papers.nips.cc/*/file/*.pdf", /(paper\/[^\/]*)\.pdf$/, '$1'],
  ["*://papers.nips.cc/*.pdf", /(.*)\/file\/(.*)-Paper.pdf$/, '$1/hash/$2-Abstract.html'],
  ["*://papers.neurips.cc/*/file/*.pdf", /(paper\/[^\/]*)\.pdf$/, '$1'],
  ["*://papers.neurips.cc/*.pdf", /(.*)\/file\/(.*)-Paper.pdf$/, '$1/hash/$2-Abstract.html'],
  ["*://pdfs.semanticscholar.org/*", /.*lar.org\/([0-9a-f]{4})\/([0-9a-f]{36}).pdf/, 'https://www.semanticscholar.org/paper/$1$2',
    ['.semanticscholar.org']],
  ["*://*.biorxiv.org/content*", /((.*\/)biorxiv\/|)(.*)(\.full\.pdf)(\?.*)?$/, '$2$3'],
  ["*://indico.cern.ch/event/*/contributions/*/attachments/*.pdf", /(.*)\/contributions\/(.*)\/attachments\/.*/, '$1/contributions/$2'],
  ["*://cds.cern.ch/record/*/files/*.pdf", /(.*)\/files\/.*/, '$1/files']
];

var browser = browser || chrome;

function fix(request, pattern, replacement, bypassDomain) {
  // 2018-03-04: request.initiator below is for Chrome, which doesn't have originUrl.
  //             Unfortunately .initiator is missing for new tabs, so in Chrome
  //             middle-clicking a PDF link on arXiv opens the abstract page.
  oldHost = new URL(request.originUrl || request.initiator || 'http://example.com').hostname;
  bypassDomains = (bypassDomain || []).concat(new URL(request.url).hostname);
  console.log('foo:', request, pattern, replacement, bypassDomain);
  if (! bypassDomains.some(x => ('.' + oldHost).endsWith(x))) {
    newUrl = request.url.replace(pattern, replacement);
    console.log('hello:', newUrl);
    if (newUrl != request.url)
      return { redirectUrl: newUrl };
  }
}

RULES.forEach(rule => browser.webRequest.onBeforeRequest.addListener(
  request => fix(request, rule[1], rule[2], rule[3]),
  {urls: [rule[0]], types: ["main_frame", "sub_frame"]},
  ["blocking"]));

