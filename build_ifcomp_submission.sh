#!/usr/bin/env bash

dart -c ../filiphnet/tool/spanify.dart \
        --html ../filiphnet/src/index.template.html \
        web/ifcomp_submission/ifcomp_text.md \
        > web/ifcomp_submission/insignificant_little_vermin.html

mkdir -p ../egamebook/docs/site/vermin/v/ifcomp/
cp -r build/web/* ../egamebook/docs/site/vermin/v/ifcomp/
