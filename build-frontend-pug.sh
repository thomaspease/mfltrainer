#!/bin/bash

# set this script to error if any command errors
set -e 

# compile the files
./node_modules/pug-cli/index.js -c --name-after-file -o public/js/templates/ frontend-views/

# couple edits using regexes, to make the compiled files play nice with Parcel
# doing this via regex rather than a proper syntax-aware preprocessor is a bit brittle, but will probably be fine with our current build pipeline
perl -pi -e 's/(function \\w+Template)/export $1/g' public/js/templates/*
perl -pi -e 's/require\(/global["require"](/g' public/js/templates/*
