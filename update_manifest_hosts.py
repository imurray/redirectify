#!/usr/bin/env python

# Please don't judge me for this hack... I know it's horrible.
#
# Extracts hosts used in RULES and injects them into the permissions block in
# the manifest. Can use it to help update the manifest when adding new rules.

import os, re, collections

DIR = os.path.join(os.path.realpath(os.path.dirname(__file__)), 'src')

# Grab rules from javascript code
with open(os.path.join(DIR, 'redirectify.js'), 'r') as fid:
    all_code = fid.read()
rules_txt = re.search(r'RULES = \[(.*?)\];\n', all_code, re.DOTALL).groups()[0]

# Find match patterns needed by rules (fragile, not parsing rigorously)
hosts = []
for rule_txt in rules_txt.strip().strip(']').split('],'):
    match = rule_txt.split(',')[0].strip().strip('[')
    hosts.append(' '*4 + match + ",\n")
    # origin of request needs host permission in Chrome (could omit for Firefox)
    final_part = rule_txt.split('[')[-1].strip()
    if final_part.endswith(']'):
        for host in final_part.strip(']').split(','):
            hosts.append(' '*4 + '"*://*' + host.strip()[1:-1] + '/*",\n')
# deduplicate:
hosts = list(collections.OrderedDict.fromkeys(hosts))

# Get other bits of existing manifest
bits1 = []
bits2 = []
with open(os.path.join(DIR, 'manifest.json'), 'r') as fid:
    for line in fid:
        bits1.append(line)
        if '"permissions":' in line:
            break
    for line in fid:
        if '"webRequest",' in line:
            bits2.append(line)
            break
    for line in fid:
        bits2.append(line)

# Spit out new manifest
with open(os.path.join(DIR, 'manifest.json'), 'w') as fid:
    fid.write(''.join(bits1))
    fid.write(''.join(hosts))
    fid.write(''.join(bits2))

