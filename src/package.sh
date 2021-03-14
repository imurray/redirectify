#!/bin/sh

# Create .zip file for release to the Chrome Web Store
# Assumes you have already run ./compile_rules.py

set -e

EXTENSION=redirectify

# Set working directory to location of this script
cd $(dirname $(greadlink -m "$0" 2> /dev/null || readlink -m "$0" 2> /dev/null || echo "$0"))

VERSION=$(grep '"version":' manifest.json | sed 's/.*"\([0-9.]*\)".*/\1/')
OUT="$EXTENSION"-"$VERSION"

# Create .zip file
mkdir -p "../tmp_chrome_version"
cp dnr_rules.json manifest.json r.png ../tmp_chrome_version
cd "../tmp_chrome_version"
rm -f ../"$OUT".zip
zip -r -FS ../"$OUT".zip *
echo Created for chrome: "$OUT".zip

