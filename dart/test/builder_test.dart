import 'package:unittest/unittest.dart';
import 'dart:io';

// importing files to test
import "../lib/html_entities.dart";
import "../lib/egb_builder.dart";

String getPath(String filename) {
  var options = new Options();
  var pathToScript = new Path(options.script);
  var pathToFilename = pathToScript.directoryPath
        .join(new Path("files"))
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
        expect(new Builder().readEgbFile(new File(getPath("./nonexistent"))),
          throwsA(new isInstanceOf<FileIOException>("FileIOException")));
      });

    });

    group('simple files', () {

      test("no pages file gives no pages", () {
        var callback = expectAsync1((var b) {
          expect(b.pages,
            hasLength(0));
        });
        new Builder().readEgbFile(new File(getPath("no_pages.egb"))).then(callback);
      });

      test("reads pages", () {
        var callback = expectAsync1((var b) {
          expect(b.pages,
            hasLength(3));
          expect(b.pages[0].name,
            equals("start"));
          expect(b.pages[b.pageHandles["squash"]].options,
            unorderedEquals(["visitOnce"]));
          expect(b.pages[b.pageHandles["run"]].options,
            unorderedEquals(["visitOnce", "showOnce"]));
        });
        new Builder().readEgbFile(new File(getPath("simple_3pages.egb"))).then(callback);
      });
      
      test("reads pageGroups", () {
        var callback = expectAsync1((Builder b) {
          expect(b.pageGroups,
            hasLength(2));
          expect(b.pageGroups[0].pages,
            hasLength(2));
          expect(b.pageGroups[0].name,
            equals("Group 1"));
          expect(b.pageGroups[1].name,
              equals("Group 2"));
          expect(b.pages[b.pageHandles["Single"]].group,
              isNull);
        });
        new Builder().readEgbFile(new File(getPath("page_group.egb"))).then(callback);       
      });

      test("reads UTF8 pages", () {
        var callback = expectAsync1((var b) {
          expect(b.pages,
            hasLength(3));
          expect(b.pages[0].name,
            equals("Řeřicha"));
          expect(b.pages[1].name,
            equals("おはよう"));
        });
        new Builder().readEgbFile(new File(getPath("simple_3pages_utf8.egb"))).then(callback);
      });

      test("reads page at EOF", () {
        var callback = expectAsync1((var b) {
          expect(b.pages,
            hasLength(4));
          expect(b.pages[3].name,
            equals("thisShouldStillRegister"));
        });
        new Builder().readEgbFile(new File(getPath("page_at_eof.egb"))).then(callback);
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
        new Builder().readEgbFile(new File(getPath("simple_8textblocks.egb"))).then(callback);
      });
      
      test("reads text block at end of file", () {
        var callback = (var b) {
          var lastpage = b.pages.last;
          expect(lastpage.blocks.length,
            equals(1));
          expect(lastpage.blocks[0].type,
            BuilderBlock.BLK_TEXT);
          expect(lastpage.blocks[0].lineStart,
              43);
          expect(lastpage.blocks[0].lineEnd,
              43);
        };
        new Builder().readEgbFile(new File(getPath("simple_textblock_eof.egb"))).then(expectAsync1(callback));
      });
      
      test("reads last text block at end of bigger file", () {
        var callback = (var b) {
          var lastpage = b.pages.last;
          expect(lastpage.blocks.length,
            equals(2));
          expect(lastpage.blocks[1].type,
            BuilderBlock.BLK_TEXT);
          expect(lastpage.blocks[1].lineStart,
              140);
          expect(lastpage.blocks[1].lineEnd,
              140);
        };
        new Builder().readEgbFile(new File(getPath("full_project.egb"))).then(expectAsync1(callback));
      });
    });

    group('advanced files', () {

      // TODO unit test async throws
//      test("throws on unclosed tag", () {
//        expect(new Builder().readEgbFile(new File(getPath("unclosed_tag.egb"))),
//          throwsA(new isInstanceOf<EgbFormatException>("EgbFormatException")));
//      });

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
        new Builder().readEgbFile(new File(getPath("variables_in_text.egb"))).then(callback);
      });

//      test("detects non-choices (illegally formated) and leaves them alone", () {
//        var callback = expectAsync1((var b) {
//          for (var i = 0; i < 11; i++) {
//            expect(b.pages[0].blocks[i].type,
//              isNot(anyOf([BuilderBlock.BLK_CHOICE, BuilderBlock.BLK_CHOICE_IN_SCRIPT]))/*,
//              reason:"The option '${b.pages[0].blocks[i].options['string']}' on line "
//                     "${b.pages[0].blocks[i].lineStart} "
//                     "is not actually a valid option and should be not recognized as such."*/);
//          }
//        });
//        new Builder().readEgbFile(new File(getPath("choices.egb"))).then(callback);
//      });
      
      test("detects individual choices", () {
        var b = new Builder();
        b.mode = Builder.MODE_NORMAL;
//        expect(b.);
      });

      test("detects choices", () {
        var callback = expectAsync1((var b) {
          for (var i = 11; i < b.pages[0].blocks.length; i++) {
            expect(b.pages[0].blocks[i].type,
              anyOf([BuilderBlock.BLK_CHOICE, BuilderBlock.BLK_CHOICE_IN_SCRIPT])/*,
              reason:"Line ${b.pages[0].blocks[i].lineStart} is a valid option "
                     "but isn't recognized as such."*/);
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
          expect(b.pages[1].blocks[2].options["script"],
            equals("for (;;) { print(\"hi!\")}"));
          expect(b.pages[1].blocks[2].options["goto"],
            isNull);
          expect(b.pages[1].blocks[3].options["script"],
            equals("for (;;) { print(\"hi!\")}"));
          expect(b.pages[1].blocks[3].options["goto"],
            equals("start"));
          expect(b.pages[1].blocks[4].options["script"],
            equals("this script } should;"));
        });
        new Builder().readEgbFile(new File(getPath("choices.egb"))).then(callback);
      });
      
      test("detects choices as pageHandlers in pages", () {
        var callback = expectAsync1((Builder b) {
          expect(b.pages[b.pageHandles["Day1.WakeUp"]].gotoPageNames,
              ["wakeupDilemma"]);
          expect(b.pages[b.pageHandles["Day1.wakeupDilemma"]].gotoPageNames,
              ["policeBreakIn", "getDressed", "getGun", "warnAmy"]);
        });
        new Builder().readEgbFile(new File(getPath("full_project.egb"))).then(callback);
      });

      test("detects <classes>", () {
        var callback = expectAsync1((var b) {
          expect(b.initBlocks,
            hasLength(4));
          expect(b.initBlocks[0].type,
            equals(BuilderInitBlock.BLK_CLASSES));
          expect(b.initBlocks[0].lineStart,
            equals(7));
          expect(b.initBlocks[0].lineEnd,
            equals(12));
        });
        new Builder().readEgbFile(new File(getPath("classes_4blocks.egb"))).then(callback);
      });

      test("detects <CLASSES>", () {
        var callback = expectAsync1((var b) {
          expect(b.initBlocks[1].type,
            equals(BuilderInitBlock.BLK_CLASSES));
          expect(b.initBlocks[1].lineStart,
            equals(31));
          expect(b.initBlocks[1].lineEnd,
            equals(36));
        });
        new Builder().readEgbFile(new File(getPath("classes_4blocks.egb"))).then(callback);
      });

      test("detects different init blocks", () {
        var callback = expectAsync1((var b) {
          expect(b.initBlocks,
            hasLength(3));
          expect(b.initBlocks[0].type,
            equals(BuilderInitBlock.BLK_FUNCTIONS));
          expect(b.initBlocks[0].lineStart,
            equals(4));
          expect(b.initBlocks[0].lineEnd,
            equals(9));
          expect(b.initBlocks[1].type,
            equals(BuilderInitBlock.BLK_CLASSES));
          expect(b.initBlocks[1].lineStart,
            equals(28));
          expect(b.initBlocks[1].lineEnd,
            equals(33));
          expect(b.initBlocks[2].type,
            equals(BuilderInitBlock.BLK_VARIABLES));
          expect(b.initBlocks[2].lineStart,
            equals(55));
          expect(b.initBlocks[2].lineEnd,
            equals(60));
        });
        new Builder().readEgbFile(new File(getPath("initblocks_all.egb"))).then(callback);
      });

      test("plays well around text blocks", () {
        var callback = expectAsync1((var b) {
          var variables = b.initBlocks[1];
          var textblock1 = b.pages[0].blocks[0];
          var textblock2 = b.pages[0].blocks[1];
          expect(variables.type,
            equals(BuilderInitBlock.BLK_VARIABLES));
          expect(variables.lineStart,
            equals(21));
          expect(variables.lineEnd,
            equals(23));
          expect(textblock1.type,
            equals(BuilderBlock.BLK_TEXT));
          expect(textblock2.type,
            equals(BuilderBlock.BLK_TEXT));
          expect(textblock1.lineStart,
            equals(20));
          expect(textblock1.lineEnd,
            equals(20));
          expect(textblock2.lineStart,
            equals(24));
          expect(textblock2.lineEnd,
            equals(24));
        });
        new Builder().readEgbFile(new File(getPath("textblock_initblock_proximity.egb"))).then(callback);
      });

      // TODO: check throws
//      test("throws on nested tag", () {
//        expect(wrapAsync(new Builder().readEgbFile(new File(getPath("initblocks_nested.egb")))),
//               throwsA(new isInstanceOf<EgbFormatException>("EgbFormatException")));
//      });

    });
    
    group('scripts', () {

      test("is detected", () {
        var callback = expectAsync1((var b) {
          var script1 = b.pages[0].blocks[1];
          var script2 = b.pages[1].blocks.last;
          var notscript = b.pages[b.pageHandles["run"]].blocks.last;

          expect(script1.type,
            equals(BuilderBlock.BLK_SCRIPT));
          expect(script1.lineStart,
            equals(15));
          expect(script1.lineEnd,
            equals(17));
          expect(script2.type,
            equals(BuilderBlock.BLK_SCRIPT));
          expect(script2.lineStart,
            equals(37));
          expect(script2.lineEnd,
            equals(38));
          expect(notscript.type,
            isNot(BuilderBlock.BLK_SCRIPT));
          expect(notscript.lineStart,
            equals(49));
          expect(notscript.lineEnd,
            equals(49));
        });
        new Builder().readEgbFile(new File(getPath("script_2tags.egb"))).then(callback);
      });

      test("detects <echo>", () {
        var callback = expectAsync1((var b) {
          var script = b.pages[0].blocks[1];
          var echo1 = script.subBlocks[0];
          var echo2 = script.subBlocks[1];

          expect(script.subBlocks,
            hasLength(2));
          expect(echo1.lineStart,
            equals(20));
          expect(echo1.lineEnd,
            equals(22));
          expect(echo2.lineStart,
            equals(24));
          expect(echo2.lineEnd,
            equals(26));
        });
        new Builder().readEgbFile(new File(getPath("echo_2tags.egb"))).then(callback);
      });

    });

    group('metadata', () {
      test("is detected", () {
        var callback = expectAsync1((var b) {
          var metadata = b.metadata;
          var title = b.metadata[0];
          var twoValues = b.metadata[2];

          expect(metadata,
            hasLength(9));
          expect(title.key,
            equals("Title"));
          expect(title.values,
            hasLength(1));
          expect(title.values[0],
            equals("Test Gamebook #1"));
          expect(twoValues.values,
            hasLength(2));
          expect(twoValues.values[1],
            equals("John Doe"));
        });
        new Builder().readEgbFile(new File(getPath("metadata_9keys.egb"))).then(callback);
      });
    });

    group('import', () {

      test("is detected", () {
        var callback = expectAsync1((var b) {
          expect(b.importEgbFiles,
            hasLength(1));
          expect(b.importEgbFiles[0].name,
            endsWith("library_simple_all_tags.egb"));
        });
        new Builder().readEgbFile(new File(getPath("import_1tag.egb"))).then(callback);
      });

      test("is detected with redundancies covered", () {
        var callback = expectAsync1((var b) {
          expect(b.importEgbFiles,
            hasLength(2));
          expect(b.importEgbFiles[0].name,
            endsWith("library_simple_all_tags.egb"));
          expect(b.importEgbFiles[1].name,
            endsWith("library_simple_all_tags2.egb"));
          expect(b.pages[1].name,
            "squash");  // making sure we're not breaking something else
        });
        new Builder().readEgbFile(new File(getPath("import_2tags_plus1redundant.egb"))).then(callback);
      });
    });

    group('synopsis', () {

      test("is detected", () {
        var callback = expectAsync1((var b) {
          expect(b.synopsisLineNumbers,
            hasLength(9));
          expect(b.synopsisLineNumbers[0],
            3);
          expect(b.synopsisLineNumbers.last,
            12);
        });
        new Builder().readEgbFile(new File(getPath("synopsis.egb"))).then(callback);
      });
    });

    group('writeFiles', () {

      test("creates a file", () {
        var callback = expectAsync1((bool exists) {
          expect(exists,
            equals(true));
        });
        new File(getPath("full_project.dart")).delete()
        .whenComplete(() {
          new Builder().readEgbFile(new File(getPath("full_project.egb")))
          .then((var b) {
            b.writeDartFiles()
            .then((_) {
              new File(getPath("full_project.dart")).exists()
              .then(callback);
            });
          });
        });
      });

    });
    
    group('graphML', () {

      test("creates XML", () {
        var callback = expectAsync1((Builder b) {
          b.updateGraphML();
          expect(b.graphML.groupNodes.length,
              2);
          expect(b.graphML.nodes.length,
              5);
          expect(b.graphML.groupNodes[0].text,
              "Group 1");
          expect(b.graphML.nodes.last.text,
              "Single");
          expect(b.graphML.nodes[0].text,
              "Start");
          String xml = b.graphML.toString();
          expect(xml,
              startsWith("<?xml"));
        });
        new Builder().readEgbFile(new File(getPath("page_group.egb"))).then(callback);
      });

      test("updates builder instance from XML", () {
        var callback = expectAsync1((Builder b) {
          expect(b.pages.length,
              7);
          expect(b.pages[b.pageHandles["Group 1: Start"]].gotoPageNames,
              unorderedEquals(["Group 1: New node", "Group 1: End", "Group 2: Start"]));
          expect(b.pageHandles["New single node"],
              isNotNull);
          expect(b.pages[b.pageHandles["Group 2: End"]].gotoPageNames,
              contains("New single node"));
        });
        new Builder().readEgbFile(new File(getPath("update_from_graph.egb")))
        .then((b) {
          b.updateFromGraphMLFile();
          callback(b);
        });
      });
    });
    
    group('egb writer', () {
      
      test("updates egb file from builder instance", () {
        File orig = new File(getPath("update_egb_file_original.egb"));
        File egb = new File(getPath("update_egb_file.egb"));
        
        var inputStream = orig.openInputStream();
        inputStream.pipe(egb.openOutputStream(FileMode.WRITE));
        inputStream.onClosed = expectAsync0(() {
          new Builder().readEgbFile(new File(getPath("update_egb_file.egb")))
          .then((Builder b) {
            b.pages.add(new BuilderPage("Programatically added page", 
                b.pages.last.index + 1));
            b.pageHandles["Programatically added page"] = b.pages.last.index;
            b.pages[3].gotoPageNames.add("Programatically added page");
            return b.updateEgbFile();
          })
          .then(expectAsync1((Builder b) {
            expect(b.pages.last.name, 
            "Programatically added page");
            expect(b.pages[3].gotoPageNames,
                contains("Programatically added page"));
          }));
        });
      });
    });
  });

}
