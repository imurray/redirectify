#!/bin/sh

set -e

EXTENSION=redirectify
SRC=src

rm -f "$EXTENSION".xpi
cd "$SRC"
zip -r -FS ../"$EXTENSION".xpi *
