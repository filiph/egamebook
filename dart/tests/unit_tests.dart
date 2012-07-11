#import('/Applications/dart/dart-sdk/lib/unittest/unittest.dart');
#import('dart:io');


// importing files to test
#import("../html_entities.dart");
#import("../egb_builder.dart");

String getPath(String filename) {
  var options = new Options();
  var pathToScript = new Path(options.script);
  var pathToFilename = pathToScript.directoryPath
        .join(new Path(filename));
  return pathToFilename.toString();
}

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
    /*test("handles Czech chars (lowercase w/ caron)", () {*/
      /*expect(HtmlEntities.toHtml("řščďťň"),*/
        /*equals("&rcaron;&scaron;&ccaron;&dcaron;&tcaron;&ncaron;"));*/
    /*});*/

  });

  group('Builder', () {
    test("new instance is empty", () {
      var b = new Builder();
      expect(b,
        new isInstanceOf<Builder>("Builder"));
      expect(b.pages,
        allOf([isNotNull, isEmpty]));
    });

    group('simple file', () {
      var bFinished;
      setUp(() {
        var b = new Builder();
        bFinished = b.readFile(new File(getPath("simple_3pages.egb")));
      });

      solo_test("reads pages", () {
        var callback = expectAsync1((var b) {
          expect(b.pages,
            hasLength(3));
          expect(b.pages[0].name,
            equals("start"));
          expect(b.pages[b.pageHandles["squash"]].options,
            orderedEquals(["visitOnce"]));
          expect(b.pages[b.pageHandles["run"]].options,
            orderedEquals(["visitOnce", "showOnce"]));
        });
        bFinished.then(callback);
      });

      test("reads blocks", () {
        var callback = expectAsync1((var b) {
          int numBlocks = 0;
          b.pages.forEach((page) => numBlocks += page.blocks.length);
          expect(numBlocks,
            equals(4));
        });
        bFinished.then(callback);
      });
    });

    /*test("detects bad files", () {*/
      /*var b = new Builder();*/
      /*var async = startAsync();*/
      /*guardAsync(() {*/

      /*});*/
      /*async.complete();*/
      /*expect(b.readFile(new File("./nonexistent")),*/
        /*throwsA(new isInstanceOf<FileIOException>("FileIOException")));*/
    /*});*/

//    test("parses simple .egb file", () {
//      var builder = new Builder.fromFile("./simple_test_file.egb");
//      expect(builder.pages.length,
//        equals(5));
//      ...
//    });

  });
}
