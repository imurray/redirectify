#!/bin/sh

set -e

EXTENSION=redirectify
SRC=src

# Set working directory to location of this script
cd $(dirname $(readlink -m "$0"))

VERSION=$(grep '"version":' "$SRC"/manifest.json | sed 's/.*"\([0-9.]*\)".*/\1/')
OUT="$EXTENSION"-"$VERSION"

# Create .xpi zip file for firefox:
rm -f "$OUT"
cd "$SRC"
zip -r -FS ../"$OUT".xpi *
echo Created for firefox: "$OUT".xpi

# Create .zip file for chrome, with some of the RULES removed, because they
# cause problems:
mkdir -p "../tmp_chrome_version"
for a in * ; do
    cat $a | sed -e '/acm.org/d' -e '/semanticscholar/d' > "../tmp_chrome_version/$a"
done
cd "../tmp_chrome_version"
zip -r -FS ../"$OUT".zip *
echo Created for chrome: "$OUT".zip

