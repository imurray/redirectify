#!/bin/sh

set -e

EXTENSION=redirectify
SRC=src

# Set working directory to location of this script
cd $(dirname $(readlink -m "$0"))

VERSION=$(grep '"version":' src/manifest.json | sed 's/.*"\([0-9.]*\)".*/\1/')
OUT="$EXTENSION"-"$VERSION".xpi

rm -f "$OUT"
cd "$SRC"
zip -r -FS ../"$OUT" *
echo Created "$OUT"
