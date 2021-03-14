#!/usr/bin/env python3

import os, re, json

PWD = os.path.realpath(os.path.dirname(__file__))

def ensure_list(x):
    """Some fields can be a string, or list of strings. Coerce into a list."""
    if isinstance(x, list):
        return x
    else:
        return [x]

RULE_TEMPLATE = """  {
    "id": %(rule_id)d,
    "priority": 1,
    "action": {
      "type": "redirect",
      "redirect": {
        "regexSubstitution": %(replace)s
      }
    },
    "condition": {
      "domainType": "thirdParty",%(exclude_line)s
      "regexFilter": %(pattern)s,
      "resourceTypes": [
        "main_frame", "sub_frame"
      ]
    }
  }"""

EXCLUDE_TEMPLATE = """
      "excludedDomains": %s,
"""

# Read in rules from our custom format:
with open(os.path.join(PWD, 'rules.json'), 'r') as fid:
    data = json.load(fid)
host_perms = []
rules = []
rule_id = 1
for rule in data:
    # permissions
    for host in ensure_list(rule['permits']):
        host_perms.append('"*://%s/*"' % host)

    # rules
    rule['rule_id'] = rule_id
    rule_id += 1
    for field in ["pattern", "replace"]:
        rule[field] = json.dumps(rule[field])
    if 'exclude' in rule:
        rule['exclude_line'] = EXCLUDE_TEMPLATE % json.dumps(ensure_list(rule['exclude']))
    else:
        rule['exclude_line'] = ''
    rules.append(RULE_TEMPLATE % rule)

# Write out verbose rules.json as used by declarativeNetRequest
with open(os.path.join(PWD, 'dnr_rules.json'), 'w') as fid:
    fid.write('[\n' + ',\n'.join(rules) + ']\n')

# Dedup and format host_perms, then inject into manifest
host_perms = list(dict.fromkeys(host_perms))
host_perms = '    ' + ',\n    '.join(host_perms)
with open(os.path.join(PWD, 'manifest.json'), 'r') as fid:
    manifest = fid.read()
manifest = re.sub(r'("host_permissions": \[\n)[^\]]*?(\n* *])',
        r'\1%s\2' % host_perms.replace('\\', r'\\'), manifest)
with open(os.path.join(PWD, 'manifest.json'), 'w') as fid:
    fid.write(manifest)

