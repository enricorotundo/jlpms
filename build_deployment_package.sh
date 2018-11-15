#!/usr/bin/env bash

ROOT=$PWD
PACKAGE_NAME="fetcher.zip"

# ! must re-generate the package every time
rm -v $ROOT/$PACKAGE_NAME

# add deps
cd $ROOT/fetcher/venv/lib/python3.6/site-packages
zip -r9 $ROOT/$PACKAGE_NAME .

# add code (manually??)
cd $ROOT/fetcher
zip -g $ROOT/$PACKAGE_NAME fetcher.py
