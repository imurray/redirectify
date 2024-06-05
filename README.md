# Redirectify

> :warning: **You are looking at a chrome-specific branch.** This branch supports the
> [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/),
> version of Chrome's extensions system now that Google is removing support for V2.
> It requires the new
> [declarativeNetRequest API](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/).
> In theory I intend to update the Firefox extension to use the same `src/rules.json` and make this the main branch.
> But no promises if/when I'll find the time.

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

* ACL Anthology: [this pdf link](https://aclanthology.org/W19-4427.pdf) redirects to [this webpage](https://aclanthology.org/W19-4427/)
* ACL Anthology (old site): [this pdf link](https://www.aclweb.org/anthology/W19-4427.pdf) redirects to [this webpage](https://www.aclweb.org/anthology/W19-4427)
* ACM: [this pdf link](https://dl.acm.org/ft_gateway.cfm?id=2670318&ftid=1557218&dwn=1&CFID=12379622&CFTOKEN=cdcc86cc1f6f814d-6AE9FE9E-CF62-4ED9-0EE360EB7CBB2E50) redirects to [this webpage](https://dl.acm.org/citation.cfm?id=2670318)
* APJ: [this pdf link](https://journals.aps.org/prl/pdf/10.1103/PhysRevLett.132.231903) redirects to [this webpage](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.132.231903)
* arXiv: [this pdf link](https://arxiv.org/pdf/1602.07527.pdf) redirects to [this webpage](https://arxiv.org/abs/1602.07527)
* bioRxiv: [this pdf link](https://www.biorxiv.org/content/biorxiv/early/2017/09/18/113480.full.pdf) redirects to [this webpage](https://www.biorxiv.org/content/early/2017/09/18/113480)
* Citeseerx: At the time of writing I couldn't get any html paper summary pages to load on citeseerx, so I have removed support (but left the site permission in so I can fix it later without the extension autodisabling). Also many old links to PDFs on citeseer have broken. See [this math.meta.stackexchange post](https://math.meta.stackexchange.com/questions/35421/what-happened-to-citeseerx-is-there-a-way-to-fix-those-links) for possible help fixing broken links. You can also try [the internet archive](https://web.archive.org/).
* Indico: [this pdf link](https://indico.cern.ch/event/24728/attachments/424989/590020/Kraft-Journal_Radiation_Research.07.pdf) redirects to [this webpage](https://indico.cern.ch/event/748043/contributions/3326031/)
* JMLR: [this pdf link](http://www.jmlr.org/papers/volume17/16-272/16-272.pdf) redirects to [this webpage](http://www.jmlr.org//papers/v17/16-272.html)
* JSTOR: [this pdf link](https://www.jstor.org/stable/pdf/105741.pdf?refreqid=excelsior) redirects to [this webpage](https://www.jstor.org/stable/105741)
* NeurIPS: [this old-style pdf link](https://papers.nips.cc/paper/6084-fast-free-inference-of-simulation-models-with-bayesian-conditional-density-estimation.pdf) redirects to [this webpage](https://papers.nips.cc/paper/6084-fast-free-inference-of-simulation-models-with-bayesian-conditional-density-estimation). And [this new-style pdf link](https://papers.neurips.cc/paper/2016/file/6aca97005c68f1206823815f66102863-Paper.pdf) redirects to [this webpage](https://papers.neurips.cc/paper/2016/hash/6aca97005c68f1206823815f66102863-Abstract.html).
* OpenReview: [this pdf link](https://openreview.net/pdf?id=rkdU7tCaZ) redirects to [this webpage](https://openreview.net/forum?id=rkdU7tCaZ)
* PMLR: [this pdf link](http://proceedings.mlr.press/v9/murray10a/murray10a.pdf) redirects to [this webpage](http://proceedings.mlr.press/v9/murray10a.html)
* Project Euclid: [this pdf link](https://projecteuclid.org/download/pdfview_1/euclid.ba/1480129463) redirects to [this webpage](https://projecteuclid.org/euclid.ba/1480129463). (Supporting URLs containing `Download?urlid=` turned out to be complicated. I may have to remove those rules if they cause too many issues.)
* ResearchGate: [this pdf link](https://www.researchgate.net/profile/Freek_Stulp/publication/268382567_Path_Integral_Reinforcement_Learning/links/5565ab6208ae94e957207459/Path-Integral-Reinforcement-Learning.pdf) redirects to [this webpage](https://www.researchgate.net/publication/268382567_Path_Integral_Reinforcement_Learning)
* Semantic Scholar: [this pdf link](https://pdfs.semanticscholar.org/2a72/6fc0ea9fd9206b0fc08e69a3ebbdb9aedbcb.pdf) redirects to [this webpage](https://www.semanticscholar.org/paper/Comparing-Topic-Models-for-a-Movie-Recommendation-Bergamaschi-Po/2a726fc0ea9fd9206b0fc08e69a3ebbdb9aedbcb)

I gave the extension a fairly generic name, because I'd like to make it easy for
users to choose and add any redirect rules of their own. However, I haven't
managed to find time for that yet. The redirect rules are stored in
`src/rules.json`, and developers can easily add to them (see below).


## Download

If you just want to use the last release of the extension, get it from one of
the official addon sites:

* [Redirectify for Firefox](https://addons.mozilla.org/en-US/firefox/addon/redirectify/)

* [Redirectify for Chrome](https://chrome.google.com/webstore/detail/redirectify/mhjmbfadcbhilcfdhkkepffbnjaghfie)

Until the branches are unified, the Chome and Firefox versions are likely to be out of sync, so not all the examples above will work as advertised in Firefox.
The Firefox version should work in Firefox for Android. It used to be
[a bit of a pain to install Firefox extensions on Android](https://blog.mozilla.org/addons/2020/09/29/expanded-extension-support-in-firefox-for-android-nightly/),
but may be easier now.


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

Currently this branch only supports Chrome (I mainly use Firefox, but
hacked together this branch for Chrome when Google broke compatibility).
Eventually I may unify the code with the Firefox branch.

To work on the extension:

* Edit the rules in `src/rules.json`

* The `src/compile_rules.py` script updates `src/manifest.json` in place, and
  builds `src/dnr_rules.json`

* To try out your changes, go to `chrome://extensions`, check
  developer mode, click load unpacked extension and select the `src`
  directory. See [Chrome's extension development getting started
  guide](https://developer.chrome.com/extensions/getstarted) for more
  details.

If proposing code, please check both of the following:

* Requests for PDFs from external sites or the location bar are redirected.

* Each redirect ends up at an HTML page with a link to the PDF, and clicking
  that link does give the PDF.

If you add support for a new site, please add an example PDF URL to `test_cases`.
Thanks!

Experience suggests I might take ages to look at proposed changes; sorry.
I don't want to pester 100s of people with permissions warnings, so I
will delay adding support for new sites until I'm forced to make a major update (if ever).
Eventually I hope to make the rules configurable, opt-in, and use optional permissions.
But it's been years, and I haven't found the time to do it yet.

