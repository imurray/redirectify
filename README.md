# Redirectify

Links to academic papers in emails and on websites often point to the PDF of the
paper. However, on sites like [arXiv](https://arxiv.org/), I'd much rather be
pointed to the HTML page. The index page is quick to load, and has meta-data not
available in the PDF, such as the version history. I've given up trying to ask
people not to deep-link to PDFs, and have instead written a browser extension to
do what I want.

This browser extension redirects links to PDFs on ACM, arXiv, JMLR, NIPS,
OpenReview and PMLR to an HTML index page, unless you clicked on the link from
the hosting site. Examples:

* ACM: [this pdf link](https://dl.acm.org/ft_gateway.cfm?id=2670318&ftid=1557218&dwn=1&CFID=12379622&CFTOKEN=cdcc86cc1f6f814d-6AE9FE9E-CF62-4ED9-0EE360EB7CBB2E50) redirects to [this webpage](https://dl.acm.org/citation.cfm?id=2670318)
* arXiv: [this pdf link](https://arxiv.org/pdf/1602.07527.pdf) redirects to [this webpage](https://arxiv.org/abs/1602.07527)
* JMLR: [this pdf link](http://www.jmlr.org/papers/volume17/16-272/16-272.pdf) redirects to [this webpage](http://www.jmlr.org//papers/v17/16-272.html)
* NIPS: [this pdf link](https://papers.nips.cc/paper/6084-fast-free-inference-of-simulation-models-with-bayesian-conditional-density-estimation.pdf) redirects to [this webpage](https://papers.nips.cc/paper/6084-fast-free-inference-of-simulation-models-with-bayesian-conditional-density-estimation)
* OpenReview: [this pdf link](https://openreview.net/pdf?id=rkdU7tCaZ) redirects to [this webpage](https://openreview.net/forum?id=rkdU7tCaZ)
* PMLR: [this pdf link](http://proceedings.mlr.press/v9/murray10a/murray10a.pdf) redirects to [this webpage](http://proceedings.mlr.press/v9/murray10a.html)

I've given the extension a fairly generic name. The redirect rules are stored in
a list at the top of the code, and can easily be added to. However, making this
list updatable within the extension has been punted to future work.

The code is written as a WebExtension, originally for Firefox. It works nearly
as well from the same code in Chrome. It could probably be made to work in some
other browsers, perhaps with some tweaking. But not by me.


## Download

If you just want to use the extension as it is, get it from one of the official addon
sites:

* [Redirectify for Firefox](https://addons.mozilla.org/en-US/firefox/addon/redirectify/)

* [Redirectify for Chrome](https://chrome.google.com/webstore/detail/redirectify/mhjmbfadcbhilcfdhkkepffbnjaghfie)


## Hacking

If you want to add to the redirect rules, you currently have to edit the source
code. To run the extension from the source:

* Firefox: go to `about:debugging` and click "Load Temporary Add-on".
  Select either of the files in the `src` directory. See [Mozilla's
  WebExtensions documentation](https://developer.mozilla.org/en-US
  /Add-ons/WebExtensions) for more details.

* Chrome: go to `chrome://extensions` check developer mode, click load
  unpacked extension and select the `src` directory. See [Chrome's
  extension development getting started
  guide](https://developer.chrome.com/extensions/getstarted) for more
  details. I've found the Chrome documentation and API harder to work with than Firefox's. Also the Chrome webstore makes you pay to register as a developer and is less responsive, which is a turn-off for casual development.

