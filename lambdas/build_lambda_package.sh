#!/usr/bin/env bash

# Run this from the `lambdas` directory.
# Pass the lambda's folder name as first parameter:
# example: `bash ./build_lambda_package.sh fetcher`

ROOT=$PWD
PACKAGE_NAME=$1
PACKAGE_FILENAME="$PACKAGE_NAME.zip"

# ! must re-generate the package every time
rm -v $ROOT/$PACKAGE_FILENAME

# add deps
cd $ROOT/$PACKAGE_NAME/venv/lib/python3.6/site-packages
zip -r9 $ROOT/$PACKAGE_FILENAME .

# add python scripts (manually??)
cd $ROOT/$PACKAGE_NAME
zip -g $ROOT/$PACKAGE_FILENAME "$PACKAGE_NAME.py"
