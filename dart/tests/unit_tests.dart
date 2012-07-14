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

    group('basics', () {

      test("new instance is empty", () {
        var b = new Builder();
        expect(b,
          new isInstanceOf<Builder>("Builder"));
        expect(b.pages,
          allOf([isNotNull, isEmpty]));
      });

      test("throws on nonexistent files", () {
        expect(new Builder().readFile(new File(getPath("./nonexistent"))),
          throwsA(new isInstanceOf<FileIOException>("FileIOException")));
      });

    });

    group('simple files', () {

      test("no pages file gives no pages", () {
        var callback = expectAsync1((var b) {
          expect(b.pages,
            hasLength(0));
        });
        new Builder().readFile(new File(getPath("no_pages.egb"))).then(callback);
      });

      test("reads pages", () {
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
        new Builder().readFile(new File(getPath("simple_3pages.egb"))).then(callback);
      });

      test("reads page at EOF", () {
        var callback = expectAsync1((var b) {
          expect(b.pages,
            hasLength(4));
          expect(b.pages[3].name,
            equals("thisShouldStillRegister"));
        });
        new Builder().readFile(new File(getPath("page_at_eof.egb"))).then(callback);
      });

      test("reads text blocks", () {
        var callback = expectAsync1((var b) {
          int numBlocks = 0;
          b.pages.forEach((page) {
            numBlocks += page.blocks.length;
            //page.blocks.forEach((block) => print(block.lines));
          });
          expect(numBlocks,
            equals(8));
          expect(b.pages[b.pageHandles["run"]].blocks,
            hasLength(2));
          expect(b.pages[b.pageHandles["exit"]].blocks,
            hasLength(0));
          expect(b.pages[b.pageHandles["squash"]].blocks,
            hasLength(5));
          var block = b.pages[b.pageHandles["squash"]].blocks[0];
          expect(block.lineStart,
            equals(20));
          expect(block.lineEnd - block.lineStart,
            equals(1));
        });
        new Builder().readFile(new File(getPath("simple_8textblocks.egb"))).then(callback);
      });
    });

    group('advanced files', () {

      test("throws on unclosed tag", () {
        expect(new Builder().readFile(new File(getPath("unclosed_tag.egb"))),
          throwsA(new isInstanceOf<EgbFormatException>("EgbFormatException")));
      });

      test("detects blocks with vars", () {
        var callback = expectAsync1((var b) {
          expect(b.pages[0].blocks[0].type,
            equals(BuilderBlock.BLK_TEXT));
          expect(b.pages[0].blocks[1].type,
            equals(BuilderBlock.BLK_TEXT_WITH_VAR));
          expect(b.pages[0].blocks[2].type,
            equals(BuilderBlock.BLK_TEXT_WITH_VAR));
          expect(b.pages[0].blocks[3].type,
            equals(BuilderBlock.BLK_TEXT_WITH_VAR));
          expect(b.pages[0].blocks[4].type,
            equals(BuilderBlock.BLK_TEXT_WITH_VAR));
        });
        new Builder().readFile(new File(getPath("variables_in_text.egb"))).then(callback);
      });

      test("detects non-choices (illegally formated) and leaves them alone", () {
        var callback = expectAsync1((var b) {
          for (var i = 0; i < 11; i++) {
            expect(b.pages[0].blocks[i].type,
              isNot(anyOf([BuilderBlock.BLK_CHOICE, BuilderBlock.BLK_CHOICE_IN_SCRIPT])));
          }
        });
        new Builder().readFile(new File(getPath("choices.egb"))).then(callback);
      });

      test("detects choices", () {
        var callback = expectAsync1((var b) {
          for (var i = 11; i < b.pages[0].blocks.length; i++) {
            expect(b.pages[0].blocks[i].type,
              anyOf([BuilderBlock.BLK_CHOICE, BuilderBlock.BLK_CHOICE_IN_SCRIPT]));
          }

          expect(b.pages[1].blocks[0].options["string"],
            equals("abcdefg 123456"));
          expect(b.pages[1].blocks[0].options["script"],
            isNull);
          expect(b.pages[1].blocks[0].options["goto"],
            equals("abc _ xyz"));
          expect(b.pages[1].blocks[1].options["string"],
            equals("something"));
          expect(b.pages[1].blocks[1].options["script"],
            equals("abcd[]1234;"));
          expect(b.pages[1].blocks[1].options["goto"],
            equals("xyz"));
        });
        new Builder().readFile(new File(getPath("choices.egb"))).then(callback);
      });

      test("detects <classes>", () {
        var callback = expectAsync1((var b) {
          expect(b.initBlocks,
            hasLength(4));
          expect(b.initBlocks[0].type,
            equals(BuilderInitBlock.BLK_CLASSES));
          expect(b.initBlocks[0].lineStart,
            equals(7));
        });
        new Builder().readFile(new File(getPath("classes_4blocks.egb"))).then(callback);
      });

    });


  });
}
