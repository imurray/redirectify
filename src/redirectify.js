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
  ["*://xxx.lanl.gov/*", /.*xxx\.lanl\.gov\/(.*)/, 'https://arxiv.org/$1'],
  ["*://arxiv-export-lb.library.cornell.edu/pdf/*", /(.*)\/pdf\/(.*?)(\.pdf)?$/, '$1/abs/$2'],
  ["*://arxiv.org/ftp/*pdf", /.*arxiv()\/papers\/....\/(.*)\.pdf|.*\/([^\/]*\/)papers\/....\/([^.]*)\.pdf.*/, 'https://arxiv.org/abs/$1$2$3$4'],
  ["*://*.openreview.net/pdf*", /pdf\?id=/, 'forum?id='],
  ["*://proceedings.mlr.press/*.pdf", /^(.*mlr.press\/([^\/]*)\/)([^\/]*\/|)([^\/]*?)(-supp|Supple|)\.pdf$/, '$1$4.html'],
  ["*://*.jmlr.org/papers/*.pdf", /\/papers\/volume(.*)\/[^\/]*\.pdf$/, '/papers/v$1.html'],
  ["*://jmlr.csail.mit.edu/papers/*.pdf", /\/papers\/volume(.*)\/[^\/]*\.pdf$/, '/papers/v$1.html'],
  ["*://dl.acm.org/doi/pdf/*", /.*\/doi\/pdf\/([^\?#]*).*/, 'https://dl.acm.org/doi/$1', ['.acm.org']],
  ["*://papers.nips.cc/*.pdf", /(.*)\/file\/(.*)-Paper.pdf$/, '$1/hash/$2-Abstract.html'],
  ["*://papers.neurips.cc/*.pdf", /(.*)\/file\/(.*)-Paper.pdf$/, '$1/hash/$2-Abstract.html'],
  ["*://proceedings.nips.cc/*.pdf", /(.*)\/file\/(.*)-Paper.pdf$/, '$1/hash/$2-Abstract.html'],
  ["*://proceedings.neurips.cc/*.pdf", /(.*)\/file\/(.*)-Paper.pdf$/, '$1/hash/$2-Abstract.html'],
  ["*://pdfs.semanticscholar.org/*", /.*lar.org\/([0-9a-f]{4})\/([0-9a-f]{36}).pdf/, 'https://www.semanticscholar.org/paper/$1$2',
    ['.semanticscholar.org']],
  ["*://*.biorxiv.org/content*", /((.*\/)biorxiv\/|)(.*)(\.full\.pdf)(\?.*)?$/, '$2$3'],
  ["*://indico.cern.ch/event/*/attachments/*.pdf", /(.*\/[a-z]*\/.*)\/attachments\/.*/, '$1'],
  ["*://indico.fnal.gov/event/*/attachments/*.pdf", /(.*\/[a-z]*\/.*)\/attachments\/.*/, '$1'],
  ["*://cds.cern.ch/record/*/files/*.pdf", /(.*\/files\/).*\.pdf(|;|\?.*)$/, '$1'],
  ["*://www.jstor.org/stable/pdf/*", /\/stable\/pdf\/([0-9]*)\.pdf.*/, '/stable/$1'],
  ["*://*.projecteuclid.org/download/pdf*", /\/download\/pdf[^\/]*(\/euclid\.[a-z]*\/[0-9]*).*/, '$1'],
  ["*://*.projecteuclid.org/*/Download*", /%2F/g, '/'],
  ["*://*.projecteuclid.org/*/Download*", /.*\/Download\?.*urlid=([a-z][^%&]*)(|&.*)$/, 'https://projecteuclid.org/euclid.$1'],
  ["*://*.projecteuclid.org/*/Download*", /.*\/Download\?.*urlid=([^%&]*)(|&.*)$/, 'https://doi.org/$1'],
  ["*://*.projecteuclid.org/getRecord?id=euclid.*", /getRecord\?id=/, ''],
  ["*://www.researchgate.net/profile/*pdf", /\/profile\/[^\/]*(\/publication\/[^\/]*).*/, '$1'],
  ["*://citeseer.ist.psu.edu/viewdoc/download*type=pdf", /\/download.*(doi=[^&]*).*/, '/summary?$1'],
  ["*://citeseerx.ist.psu.edu/viewdoc/download*type=pdf", /\/download.*(doi=[^&]*).*/, '/summary?$1'],
  ["*://www.aclweb.org/anthology/*.pdf", /(\/anthology\/[A-Z0-9]*-[0-9]*)\.pdf/, '$1']
];

// 2021-03-06
// projecteuclid is complicated because its links are not consistent across journals.
// Sometimes I think we can only get the DOI from the URL. But we can't always use
// doi.org because there doesn't seem to be valid DOI's for some journals.
// The "getRecord?id=euclid" rule fixes (at time of writing) a broken redirect from (e.g.) https://doi.org/10.2996/kmj/1138036064
// We may have to remove all the Download* rules if they are too problematic.

var browser = browser || chrome;

function fix(request, pattern, replacement, bypassDomain) {
  // 2021-03-06: request.initiator below is for Chrome, which doesn't have originUrl.
  //             Unlike before, .initiator now works when opening new tabs and windows :-).
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

