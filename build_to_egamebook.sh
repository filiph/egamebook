#!/usr/bin/env bash

set -e

echo "== NOTE: THIS SCRIPT ASSUMES YOU'RE ON THE vermin2017 BRANCH =="

echo "== Test =="
time pub run -c test --run-skipped

echo "== Upload to github.io =="
peanut
git push origin --set-upstream gh-pages

echo "== Ending without pushing to egamebook.com =="
exit 0

echo "== Building the ifcomp upload file =="
echo "   SKIPPED - uncomment if you want to update it"
#dart -c ../filiphnet/tool/spanify.dart \
#        --html ../filiphnet/src/index.template.html \
#        web/ifcomp_submission/ifcomp_text.md \
#        > web/ifcomp_submission/insignificant_little_vermin.html

echo "== Running pub build (production=true) =="
pub build --define production=true

echo "== Moving files =="
mkdir -p ../egamebook/docs/site/vermin/v/latest/
cp -r build/web/* ../egamebook/docs/site/vermin/v/latest/

echo "== Build egamebook.com =="
cd ../egamebook/docs/site/
make clean
make build

echo "== Upload to egamebook.com =="
make deploy

echo "== All done =="
