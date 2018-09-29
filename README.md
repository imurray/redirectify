# Redirectify

Links to academic papers in emails and on websites often point to the PDF of the
paper. However, on sites like [arXiv](https://arxiv.org/), I'd much rather be
pointed to the HTML page. The index page is quick to load, and has meta-data not
available in the PDF, such as the version history. I've given up trying to ask
people not to deep-link to PDFs, and have instead written a browser extension to
do what I want.

Install link: [Firefox](https://addons.mozilla.org/en-US/firefox/addon/redirectify-cern/)

This Firefox/Chrome extension redirects links to PDFs on arXiv, JMLR, NIPS,
OpenReview and PMLR to an HTML index page, unless you clicked on the link from
the hosting site. The Firefox version also handles PDFs on ACM and Semantic
Scholar. Examples:

* ACM (Firefox only): [this pdf link](https://dl.acm.org/ft_gateway.cfm?id=2670318&ftid=1557218&dwn=1&CFID=12379622&CFTOKEN=cdcc86cc1f6f814d-6AE9FE9E-CF62-4ED9-0EE360EB7CBB2E50) redirects to [this webpage](https://dl.acm.org/citation.cfm?id=2670318)
* arXiv: [this pdf link](https://arxiv.org/pdf/1602.07527.pdf) redirects to [this webpage](https://arxiv.org/abs/1602.07527)
* bioRxiv: [this pdf link](https://www.biorxiv.org/content/biorxiv/early/2017/09/18/113480.full.pdf) redirects to [this webpage](https://www.biorxiv.org/content/early/2017/09/18/113480)
* JMLR: [this pdf link](http://www.jmlr.org/papers/volume17/16-272/16-272.pdf) redirects to [this webpage](http://www.jmlr.org//papers/v17/16-272.html)
* NIPS: [this pdf link](https://papers.nips.cc/paper/6084-fast-free-inference-of-simulation-models-with-bayesian-conditional-density-estimation.pdf) redirects to [this webpage](https://papers.nips.cc/paper/6084-fast-free-inference-of-simulation-models-with-bayesian-conditional-density-estimation)
* OpenReview: [this pdf link](https://openreview.net/pdf?id=rkdU7tCaZ) redirects to [this webpage](https://openreview.net/forum?id=rkdU7tCaZ)
* PMLR: [this pdf link](http://proceedings.mlr.press/v9/murray10a/murray10a.pdf) redirects to [this webpage](http://proceedings.mlr.press/v9/murray10a.html)
* Semantic Scholar (Firefox only): [this pdf link](https://pdfs.semanticscholar.org/2a72/6fc0ea9fd9206b0fc08e69a3ebbdb9aedbcb.pdf) redirects to [this webpage](https://www.semanticscholar.org/paper/Comparing-Topic-Models-for-a-Movie-Recommendation-Bergamaschi-Po/2a726fc0ea9fd9206b0fc08e69a3ebbdb9aedbcb)

I've given the extension a fairly generic name. The redirect rules are stored in
a list at the top of the code, and can easily be added to. However, making this
list updatable within the extension is unlikely to happen soon, partly because
of time, partly because allowing any URL to be redirected opens up security issues.

## Alternatives

* [arxiv-url-replacer](https://github.com/jithurjacob/arxiv-url-replacer) a
  different Chrome extension for arXiv, with a GUI. Edits links in pages, instead of
  intercepting requests. A similar approach could be taken using
  [TamperMonkey](https://tampermonkey.net/), which would immediately work in
  multiple browsers. It can be tricky to catch all links though.

* [Allen.YL Lee](https://twitter.com/allenyllee) points out that
  a bookmarklet could be used to escape from a PDF after the fact, and
  [provides an example](https://gist.github.com/allenyllee/0c90341680459203df6453b5d60d28f2).


## Hacking

The code is written as a WebExtension, originally for Firefox. Lots of it, but
not everything, works in Chrome too. The extension could probably be made to
work in some other browsers, perhaps with some tweaking. But not by me.

If you want to add to the redirect rules, you currently have to edit the source
code. To run the extension from the source:

* Firefox: go to `about:debugging` and click "Load Temporary Add-on".
  Select either of the files in the `src` directory. See [Mozilla's
  WebExtensions documentation](https://developer.mozilla.org/en-US/Add-ons/WebExtensions)
  for more details.

* Chrome: go to `chrome://extensions` check developer mode, click load
  unpacked extension and select the `src` directory. See [Chrome's
  extension development getting started
  guide](https://developer.chrome.com/extensions/getstarted) for more
  details. At the moment what I actually deploy is the version in
  `tmp_chrome_version` after running `./package.sh`. At packaging time I remove
  handling of sites that don't work as intended in Chrome yet.

Pull requests providing new rules, fixes, or improvements are welcome, as are
github issues (include example URLs demonstrating what you want). If proposing
code, please check both of the following in both Firefox and Chrome:

* Requests for PDFs from external sites or the location bar are redirected.

* Each redirect ends up at an HTML page with a link to the PDF, and clicking
  that link does give the PDF.

I've found the Chrome documentation and API harder to work with than Firefox's.
Also, to upload extensions, the Chrome webstore makes you pay to register as a
developer, which is a turn-off for casual development.

