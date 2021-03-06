# Redirectify

Links to academic papers in emails and on websites often point to the PDF of the
paper. However, on sites like [arXiv](https://arxiv.org/), I'd much rather be
pointed to the HTML page. The index page is quick to load, and has meta-data not
available in the PDF, such as the version history. I've given up trying to ask
people not to deep-link to PDFs, and have instead written a browser extension to
do what I want.

Install links: [Firefox](https://addons.mozilla.org/en-US/firefox/addon/redirectify/) and [Chrome](https://chrome.google.com/webstore/detail/redirectify/mhjmbfadcbhilcfdhkkepffbnjaghfie)

After installing this extension, links to PDFs on quite a few academic pages
(listed below) redirect to an HTML index page, unless you clicked on the link
from the main site.

* ACL Anthology: [this pdf link](https://www.aclweb.org/anthology/W19-4427.pdf) redirects to [this webpage](https://www.aclweb.org/anthology/W19-4427)
* ACM: [this pdf link](https://dl.acm.org/ft_gateway.cfm?id=2670318&ftid=1557218&dwn=1&CFID=12379622&CFTOKEN=cdcc86cc1f6f814d-6AE9FE9E-CF62-4ED9-0EE360EB7CBB2E50) redirects to [this webpage](https://dl.acm.org/citation.cfm?id=2670318)
* arXiv: [this pdf link](https://arxiv.org/pdf/1602.07527.pdf) redirects to [this webpage](https://arxiv.org/abs/1602.07527)
* bioRxiv: [this pdf link](https://www.biorxiv.org/content/biorxiv/early/2017/09/18/113480.full.pdf) redirects to [this webpage](https://www.biorxiv.org/content/early/2017/09/18/113480)
* Citeseerx: [this pdf link](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.115.6700&rep=rep1&type=pdf) redirects to [this webpage](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.115.6700)
* Indico: [this pdf link](https://indico.cern.ch/event/24728/attachments/424989/590020/Kraft-Journal_Radiation_Research.07.pdf) redirects to [this webpage](https://indico.cern.ch/event/748043/contributions/3326031/)
* JMLR: [this pdf link](http://www.jmlr.org/papers/volume17/16-272/16-272.pdf) redirects to [this webpage](http://www.jmlr.org//papers/v17/16-272.html)
* JSTOR: [this pdf link](https://www.jstor.org/stable/pdf/105741.pdf?refreqid=excelsior) redirects to [this webpage](https://www.jstor.org/stable/105741)
* NeurIPS: [this old-style pdf link](https://papers.nips.cc/paper/6084-fast-free-inference-of-simulation-models-with-bayesian-conditional-density-estimation.pdf) redirects to [this webpage](https://papers.nips.cc/paper/6084-fast-free-inference-of-simulation-models-with-bayesian-conditional-density-estimation). And [this new-style pdf link](https://papers.neurips.cc/paper/2016/file/6aca97005c68f1206823815f66102863-Paper.pdf) redirects to [this webpage](https://papers.neurips.cc/paper/2016/hash/6aca97005c68f1206823815f66102863-Abstract.html).
* OpenReview: [this pdf link](https://openreview.net/pdf?id=rkdU7tCaZ) redirects to [this webpage](https://openreview.net/forum?id=rkdU7tCaZ)
* PMLR: [this pdf link](http://proceedings.mlr.press/v9/murray10a/murray10a.pdf) redirects to [this webpage](http://proceedings.mlr.press/v9/murray10a.html)
* Project Euclid: [this pdf link](https://projecteuclid.org/download/pdfview_1/euclid.ba/1480129463) redirects to [this webpage](https://projecteuclid.org/euclid.ba/1480129463). (Supporting URLs containing `Download?urlid=` turned out to be complicated. I may have to remove those rules if the cause too many issues.)
* Research Gate: [this pdf link](https://www.researchgate.net/profile/Freek_Stulp/publication/268382567_Path_Integral_Reinforcement_Learning/links/5565ab6208ae94e957207459/Path-Integral-Reinforcement-Learning.pdf) redirects to [this webpage](https://www.researchgate.net/publication/268382567_Path_Integral_Reinforcement_Learning)
* Semantic Scholar: [this pdf link](https://pdfs.semanticscholar.org/2a72/6fc0ea9fd9206b0fc08e69a3ebbdb9aedbcb.pdf) redirects to [this webpage](https://www.semanticscholar.org/paper/Comparing-Topic-Models-for-a-Movie-Recommendation-Bergamaschi-Po/2a726fc0ea9fd9206b0fc08e69a3ebbdb9aedbcb)

I gave the extension a fairly generic name. The redirect rules are stored in
a list at the top of the code, and can easily be added to. However, making this
list updatable within the extension is unlikely to happen soon, partly because
of time, partly because allowing any URL to be redirected opens up security issues.


## Download

If you just want to use the extension as it is, get it from one of the official addon
sites:

* [Redirectify for Firefox](https://addons.mozilla.org/en-US/firefox/addon/redirectify/)

* [Redirectify for Chrome](https://chrome.google.com/webstore/detail/redirectify/mhjmbfadcbhilcfdhkkepffbnjaghfie)


## Alternatives

* [arxiv-url-replacer](https://github.com/jithurjacob/arxiv-url-replacer) a
  different Chrome extension for arXiv, with a GUI. Edits links in pages, instead of
  intercepting requests. A similar approach could be taken using
  [TamperMonkey](https://tampermonkey.net/), which would immediately work in
  multiple browsers. It can be tricky to catch all links though.

* [Allen.YL Lee](https://twitter.com/allenyllee) points out that
  a bookmarklet could be used to escape from a PDF after the fact, and
  [provides an example](https://gist.github.com/allenyllee/0c90341680459203df6453b5d60d28f2).

And see the forks of this Github repo.

## Hacking

The code is written as a WebExtension, originally for Firefox, but it also works
in Chrome too. As of 2021 it seems to work correctly in Chrome, whereas
originally bugs in Chrome made the experience worse. At the time of writing, it's
possible but [a bit of a pain to install on Firefox for Android
(nightly)](https://blog.mozilla.org/addons/2020/09/29/expanded-extension-support-in-firefox-for-android-nightly/).
The extension could probably be made to work in some other browsers, perhaps
with some tweaking. But not by me.

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
github issues (include example URLs demonstrating what you want). Although
experience suggests I might take ages to look at them; sorry. If proposing
code, please check both of the following in both Firefox and Chrome:

* Requests for PDFs from external sites or the location bar are redirected.

* Each redirect ends up at an HTML page with a link to the PDF, and clicking
  that link does give the PDF.

I've found the Chrome documentation and API harder to work with than Firefox's.
Also, to upload extensions, the Chrome webstore makes you pay to register as a
developer, which is a turn-off for casual development.

At some point in 2021, before Google lock things down, I should probably make a
version of the extension that can use Chrome's new Manifest 3 API. It looks
possible. As I use Firefox, I haven't got around to it yet.

