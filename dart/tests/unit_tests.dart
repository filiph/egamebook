#import('/Applications/dart/dart-sdk/lib/unittest/unittest.dart');


// importing files to test
#import("../html_entities.dart");
//#import("../egb_builder.dart");

void main() {

  group("HTML Entities", () {
    test("ignores basic ASCII", () {
      expect(HtmlEntities.toHtml("abcdefg12345 []/?"),
        equals("abcdefg12345 []/?"));
    });
    test("converts single char", () {
      expect(HtmlEntities.toHtml("φ"),
        isNot(equals("φ")));
    });
    test("converts combination", () {
      expect(HtmlEntities.toHtml("abcφdef\"g♥12345é []/?"),
        equals("abc&phi;def&quot;g&hearts;12345&eacute; []/?"));
    });
    test("handles Czech chars (lowercase w/ caron)", () {
      expect(HtmlEntities.toHtml("řščďťň"),
        equals("&rcaron;&scaron;&ccaron;&dcaron;&tcaron;&ncaron;"));
    });

  });

  group('Builder', () {
    test("sanity check", () {
      expect(5,
        equals(5));
    });

//    test("parses simple .egb file", () {
//      var builder = new Builder.fromFile("./simple_test_file.egb");
//      expect(builder.pages.length,
//        equals(5));
//      ...
//    });

  });
}
