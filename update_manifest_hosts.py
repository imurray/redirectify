#!/usr/bin/env python

# Please don't judge me for this hack... I know it's horrible.
#
# Extracts hosts used in RULES and injects them into the permissions block in
# the manifest. Can use it to help update the manifest when adding new rules.

import os

DIR = os.path.join(os.path.realpath(os.path.dirname(__file__)), 'src')

# Find match patterns from code
hosts = []
with open(os.path.join(DIR, 'redirectify.js'), 'r') as fid:
    for line in fid:
        if line.startswith('  ["*://'):
            hosts.append(' '*4 + line[len('  ['):line.index(', /')+1] + '\n')

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

