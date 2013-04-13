DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR
scp -P 2222 ./test.html.dart.js* filiph@visible.cz:public_html/egamebook.com/test/
cd -
