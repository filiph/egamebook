library builder_test;

import 'package:test/test.dart';
import 'dart:io';
import 'package:path/path.dart' as path;

// importing files to test
import "package:egamebook/src/shared/html_entities.dart";
import "package:egamebook/builder.dart";
import 'package:egamebook/presenters/html/main_entry_point.dart'
    show HTML_BOOK_DART_PATH_FROM_ENTRYPOINT, HTML_BOOK_ENTRYPOINT_PATH;

/**
 * Returns path to the file inside the [:/test/files:] subdirectory with
 * filename [filename]. Convenience function.
 */
String getPath(String filename) {
  return path.join(filesDir, filename);
}

final pathToScript = Platform.script.toFilePath();

/// Path to the `/test` directory.
///
/// Since this script can be run both from `test/builder_test` and
/// `tool/test_coverage`, we go up a directory first.
final testDir = path.join(path.dirname(pathToScript), "..", "test");
final filesDir = path.join(testDir, "files");
final webSubdir = new Directory(path.join(filesDir, HTML_BOOK_ENTRYPOINT_PATH));
final libSubdir = new Directory(
    path.join(webSubdir.path, HTML_BOOK_DART_PATH_FROM_ENTRYPOINT));

void createSubdirs() {
  webSubdir.createSync();
  print("$webSubdir created");
  libSubdir.createSync();
  print("$libSubdir created");
}

void deleteSubdirs() {
  libSubdir.deleteSync(recursive: true);
  webSubdir.deleteSync(recursive: true);
}

typedef dynamic BuilderCallback(Builder b);

void main() {
  group("HTML Entities", () {
    test("ignores basic ASCII", () {
      expect(HtmlEntities.toHtml("abcdefg12345 []/?"),
          equals("abcdefg12345 []/?"));
    });
    test("converts single char", () {
      expect(HtmlEntities.toHtml("φ"), isNot(equals("φ")));
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
        expect(b, new isInstanceOf<Builder>());
        expect(b.pages, allOf([isNotNull, isEmpty]));
      });

      test("throws on nonexistent files", () {
        expect(new Builder().readEgbFile(new File(getPath("./nonexistent"))),
            throws);
      });
    });

    group('simple files', () {
      test("no pages file gives no pages", () {
        var callback = expectAsync((var b) {
          expect(b.pages, hasLength(0));
        });
        new Builder()
            .readEgbFile(new File(getPath("no_pages.egb")))
            .then(callback as BuilderCallback);
      });

      test("reads pages", () {
        var callback = expectAsync((var b) {
          expect(b.pages, hasLength(3));
          expect(b.pages[0].name, equals("start"));
          expect(b.pages[b.pageHandles["squash"]].options,
              unorderedEquals(["visitOnce"]));
          expect(b.pages[b.pageHandles["run"]].options,
              unorderedEquals(["visitOnce", "showOnce"]));
          expect(b.pages[b.pageHandles["squash"]].options.contains("visitOnce"),
              isTrue);
          expect(b.pages[b.pageHandles["run"]].options.contains("showOnce"),
              isTrue);
          expect(b.pages[b.pageHandles["squash"]].toString(),
              equals("BuilderPage <squash> [10:22]"));
        });
        new Builder()
            .readEgbFile(new File(getPath("simple_3pages.egb")))
            .then(callback as BuilderCallback);
      });

      test("reads pageGroups", () {
        var callback = expectAsync((Builder b) {
          expect(b.pageGroups, hasLength(2));
          expect(b.pageGroups[0].pages, hasLength(2));
          expect(b.pageGroups[0].name, equals("Group 1"));
          expect(b.pageGroups[1].name, equals("Group 2"));
          expect(b.pages[b.pageHandles["Single"]].group, isNull);
        });
        new Builder()
            .readEgbFile(new File(getPath("page_group.egb")))
            .then(callback as BuilderCallback);
      });

      test("reads UTF8 pages", () {
        var callback = expectAsync((var b) {
          expect(b.pages, hasLength(3));
          expect(b.pages[0].name, equals("Řeřicha"));
          expect(b.pages[1].name, equals("おはよう"));
        });
        new Builder()
            .readEgbFile(new File(getPath("simple_utf8.egb")))
            .then(callback as BuilderCallback);
      });

      test("reads page at EOF", () {
        var callback = expectAsync((var b) {
          expect(b.pages, hasLength(4));
          expect(b.pages[3].name, equals("thisShouldStillRegister"));
        });
        new Builder()
            .readEgbFile(new File(getPath("page_at_eof.egb")))
            .then(callback as BuilderCallback);
      });

      test("reads text blocks", () {
        var callback = expectAsync((var b) {
          int numBlocks = 0;
          for (var page in b.pages) {
            numBlocks += page.blocks.length;
          }

          expect(numBlocks, equals(8));
          expect(b.pages[b.pageHandles["run"]].blocks, hasLength(2));
          expect(b.pages[b.pageHandles["exit"]].blocks, hasLength(0));
          expect(b.pages[b.pageHandles["squash"]].blocks, hasLength(5));
          var block = b.pages[b.pageHandles["squash"]].blocks[0];
          expect(block.lineStart, equals(20));
          expect(block.lineEnd - block.lineStart, equals(1));
        });
        new Builder()
            .readEgbFile(new File(getPath("simple_8textblocks.egb")))
            .then(callback as BuilderCallback);
      });

      test("reads text block at end of file", () {
        var callback = (var b) {
          var lastpage = b.pages.last;
          expect(lastpage.blocks.length, equals(1));
          expect(lastpage.blocks[0].type, BuilderBlock.BLK_TEXT);
          expect(lastpage.blocks[0].lineStart, 43);
          expect(lastpage.blocks[0].lineEnd, 43);
        };
        new Builder()
            .readEgbFile(new File(getPath("simple_textblock_eof.egb")))
            .then(expectAsync(callback) as BuilderCallback);
      });

      test("reads last text block at end of bigger file", () {
        var callback = (var b) {
          var lastpage = b.pages.last;
          expect(lastpage.blocks.length, equals(2));
          expect(lastpage.blocks[1].type, BuilderBlock.BLK_TEXT);
          expect(lastpage.blocks[1].lineStart, 139);
          expect(lastpage.blocks[1].lineEnd, 139);
        };
        new Builder()
            .readEgbFile(new File(getPath("full_project.egb")))
            .then(expectAsync(callback) as BuilderCallback);
      });

      test("throws on duplicate pagenames", () {
        new Builder()
            .readEgbFile(new File(getPath("duplicate_pagenames.egb")))
            .then((_) => fail("Building duplicate_pagenames.egb should fail."),
                onError: expectAsync((e) {
          expect(e, isNotNull);
        }));
      });
    });

    group('advanced files', () {
      test("throws on unclosed tag", () async {
        expect(new Builder().readEgbFile(new File(getPath("unclosed_tag.egb"))),
            throwsA(new isInstanceOf<BuilderFormatException>()));
      });

      test("multipart egb file", () {
        var callback = expectAsync((Builder b) {
          expect(b.pages.length, 2);
        });
        new Builder()
            .readEgbFile(new File(getPath("with_parts.egb")))
            .then(callback as BuilderCallback);
      });

      test("detects blocks with vars", () {
        var callback = expectAsync((var b) {
          expect(b.pages[0].blocks[0].type, equals(BuilderBlock.BLK_TEXT));
          expect(b.pages[0].blocks[1].type,
              equals(BuilderBlock.BLK_TEXT_WITH_VAR));
          expect(b.pages[0].blocks[2].type,
              equals(BuilderBlock.BLK_TEXT_WITH_VAR));
          expect(b.pages[0].blocks[3].type,
              equals(BuilderBlock.BLK_TEXT_WITH_VAR));
          expect(b.pages[0].blocks[4].type,
              equals(BuilderBlock.BLK_TEXT_WITH_VAR));
          expect(b.pages[0].blocks[5].type,
              equals(BuilderBlock.BLK_TEXT_WITH_VAR));
        });
        new Builder()
            .readEgbFile(new File(getPath("variables_in_text.egb")))
            .then(callback as BuilderCallback);
      });

//      test("detects non-choices (illegally formated) and leaves them alone", () {
//        var callback = expectAsync1((var b) {
//          for (var i = 0; i < 11; i++) {
//            expect(b.pages[0].blocks[i].type,
//              isNot(anyOf([BuilderBlock.BLK_CHOICE, BuilderBlock.BLK_CHOICE_WITH_SCRIPT]))/*,
//              reason:"The option '${b.pages[0].blocks[i].options['string']}' on line "
//                     "${b.pages[0].blocks[i].lineStart} "
//                     "is not actually a valid option and should be not recognized as such."*/);
//          }
//        });
//        new Builder().readEgbFile(new File(getPath("choices_simple.egb"))).then(callback);
//      });

      test("detects individual choiceBlocks", () {
        var b = new Builder();
        expect(b.parseOneLineChoice(""), isNull);
        expect(b.parseOneLineChoice("- Simple choice [goto]"), isNotNull);
        var messy =
            b.parseOneLineChoice("  -   A more meesy choice [ goto  ]  ");
        expect(messy, isNotNull);
        expect(messy.type, BuilderBlock.BLK_CHOICE);
        expect(messy.options["string"], "A more meesy choice");
        expect(messy.options["goto"], "goto");
        var auto = b.parseOneLineChoice("- [automaticGoto]");
        expect(auto, isNotNull);
        expect(auto.type, BuilderBlock.BLK_CHOICE);
        expect(auto.options["string"], isNull);
        expect(auto.options["goto"], "automaticGoto");
        var withscript = b.parseOneLineChoice("- Script [{blick++}]");
        expect(withscript, isNotNull);
        expect(withscript.type, BuilderBlock.BLK_CHOICE_WITH_SCRIPT);
        expect(withscript.options["string"], "Script");
        expect(withscript.options["goto"], null);
        expect(withscript.options["script"], "blick++");
        var empty = b.parseOneLineChoice("- Empty []");
        expect(empty, isNotNull);
        expect(empty.type, BuilderBlock.BLK_CHOICE);
        expect(empty.options["string"], "Empty");
        expect(empty.options["goto"], null);
        expect(empty.options["script"], null);
      });

      test("detects choices", () {
        var callback = expectAsync((var b) {
          // first page, first part (no valid choices)
          for (var i = 0; i <= 10; i++) {
            expect(
                b.pages[0].blocks[i].type,
                isNot(anyOf([
                  BuilderBlock.BLK_CHOICE,
                  BuilderBlock.BLK_CHOICE_WITH_SCRIPT,
                  BuilderBlock.BLK_CHOICE_LIST
                ])));
          }

          // first page, second part (valid choices in one choiceList)
          var choiceList = b.pages[0].blocks[11];
          expect(choiceList.type, BuilderBlock.BLK_CHOICE_LIST);
          expect(choiceList.subBlocks.length, 14);
          expect(choiceList.subBlocks[13].options["script"], isNull);

          // second page
          expect(b.pages[1].blocks[0].type, BuilderBlock.BLK_CHOICE_LIST);
          expect(b.pages[1].blocks[0].subBlocks, hasLength(5));
          expect(b.pages[1].blocks[0].subBlocks[0].options["string"],
              equals("abcdefg 123456"));
          expect(b.pages[1].blocks[0].subBlocks[0].options["script"], isNull);
          expect(b.pages[1].blocks[0].subBlocks[0].options["goto"],
              equals("abc _ xyz"));
          expect(b.pages[1].blocks[0].subBlocks[1].options["string"],
              equals("something"));
          expect(b.pages[1].blocks[0].subBlocks[1].options["script"],
              equals("abcd[]1234;"));
          expect(
              b.pages[1].blocks[0].subBlocks[1].options["goto"], equals("xyz"));
          expect(b.pages[1].blocks[0].subBlocks[2].options["script"],
              equals("for (;;) { print(\"hi!\")}"));
          expect(b.pages[1].blocks[0].subBlocks[2].options["goto"], isNull);
          expect(b.pages[1].blocks[0].subBlocks[3].options["script"],
              equals("for (;;) { print(\"hi!\")}"));
          expect(b.pages[1].blocks[0].subBlocks[3].options["goto"],
              equals("start"));
          expect(b.pages[1].blocks[0].subBlocks[4].options["script"],
              equals("this script } should;"));

          // third page
          expect(b.pages[2].blocks[0].type, BuilderBlock.BLK_CHOICE_LIST);
          expect(b.pages[2].blocks[0].subBlocks, hasLength(2));
          expect(b.pages[2].blocks[0].subBlocks[1].options["string"],
              equals("Empty choice"));
          expect(b.pages[2].blocks[0].subBlocks[1].options["script"], isNull);
          expect(b.pages[2].blocks[0].subBlocks[1].options["goto"], isNull);
        });
        new Builder()
            .readEgbFile(new File(getPath("choices_simple.egb")))
            .then(callback as BuilderCallback);
      });

      test("detects multiline choices", () {
        new Builder()
            .readEgbFile(new File(getPath("choices_multiline.egb")))
            .then(expectAsync((Builder b) {
              var choiceList = b.pages[0].blocks[1];
              expect(choiceList.type, BuilderBlock.BLK_CHOICE_LIST);
              expect(choiceList.subBlocks.length, 4);
              expect(choiceList.subBlocks[0].options["string"], "That's okay.");
              expect(choiceList.subBlocks[0].options["goto"],
                  """The "Do something about it" Page""");
              expect(choiceList.subBlocks[0].options["script"], isNotNull);
              expect(choiceList.subBlocks[1].options["string"],
                  "I need to do something about it.");
              expect(choiceList.subBlocks[1].options["goto"],
                  """The "Do something about it" Page""");
              expect(choiceList.subBlocks[1].options["script"],
                  isNotNull); // Multiline choices' text is rewriten as a echo()
              // and added to the script block. So there's script
              // even though it's not in the egb file.
              expect(choiceList.subBlocks[2].options["string"], "Meh.");
              expect(choiceList.subBlocks[2].options["goto"], isNull);
              expect(choiceList.subBlocks[2].options["script"], isNull);
              expect(
                  choiceList.subBlocks[3].options["string"], "Many people do!");
              expect(choiceList.subBlocks[3].options["goto"], isNull);
              expect(choiceList.subBlocks[3].options["script"], isNotNull);
            }) as BuilderCallback);
      });

      test("detects choices as pageHandlers in pages", () {
        var callback = expectAsync((Builder b) {
          expect(b.pages[b.pageHandles["Day1.WakeUp"]].gotoPageNames,
              ["wakeupDilemma"]);
          expect(b.pages[b.pageHandles["Day1.wakeupDilemma"]].gotoPageNames,
              ["policeBreakIn", "getDressed", "getGun", "warnAmy"]);
        });
        new Builder()
            .readEgbFile(new File(getPath("full_project.egb")))
            .then(callback as BuilderCallback);
      });

      test("detects <declare>", () {
        var callback = expectAsync((var b) {
          expect(b.initBlocks, hasLength(2));
          expect(b.initBlocks[0].type, equals(BuilderInitBlock.BLK_DECLARE));
          expect(b.initBlocks[0].lineStart, equals(2));
          expect(b.initBlocks[0].lineEnd, equals(6));
        });
        new Builder()
            .readEgbFile(new File(getPath("declare.egb")))
            .then(callback as BuilderCallback);
      });

      test("detects different init blocks", () {
        var callback = expectAsync((var b) {
          expect(b.initBlocks, hasLength(3));
          expect(b.initBlocks[0].type, equals(BuilderInitBlock.BLK_DECLARE));
          expect(b.initBlocks[0].lineStart, equals(4));
          expect(b.initBlocks[0].lineEnd, equals(6));
          expect(b.initBlocks[1].type, equals(BuilderInitBlock.BLK_INIT));
          expect(b.initBlocks[1].lineStart, equals(25));
          expect(b.initBlocks[1].lineEnd, equals(27));
          expect(b.initBlocks[2].type, equals(BuilderInitBlock.BLK_DECLARE));
          expect(b.initBlocks[2].lineStart, equals(49));
          expect(b.initBlocks[2].lineEnd, equals(51));
        });
        new Builder()
            .readEgbFile(new File(getPath("initblocks_all.egb")))
            .then(callback as BuilderCallback);
      });

      test("plays well around text blocks", () {
        var callback = expectAsync((var b) {
          var declare = b.initBlocks[1];
          var textblock1 = b.pages[0].blocks[0];
          var textblock2 = b.pages[0].blocks[1];
          expect(declare.type, equals(BuilderInitBlock.BLK_DECLARE));
          expect(declare.lineStart, equals(19));
          expect(declare.lineEnd, equals(21));
          expect(textblock1.type, equals(BuilderBlock.BLK_TEXT));
          expect(textblock2.type, equals(BuilderBlock.BLK_TEXT));
          expect(textblock1.lineStart, equals(18));
          expect(textblock1.lineEnd, equals(18));
          expect(textblock2.lineStart, equals(22));
          expect(textblock2.lineEnd, equals(22));
        });
        new Builder()
            .readEgbFile(new File(getPath("textblock_initblock_proximity.egb")))
            .then(callback as BuilderCallback);
      });

      // TODO: check throws
      test("throws on nested tag", () {
        new Builder()
            .readEgbFile(new File(getPath("initblocks_nested.egb")))
            .catchError(expectAsync((error) => print(error)));
      });
    });

    group('scripts', () {
      test("is detected", () {
        var callback = expectAsync((var b) {
          var script1 = b.pages[0].blocks[1];
          var script2 = b.pages[1].blocks.last;
          var notscript = b.pages[b.pageHandles["run"]].blocks.last;

          expect(script1.type, equals(BuilderBlock.BLK_SCRIPT));
          expect(script1.lineStart, equals(15));
          expect(script1.lineEnd, equals(18));
          expect(script2.type, equals(BuilderBlock.BLK_SCRIPT));
          expect(script2.lineStart, equals(35));
          expect(script2.lineEnd, equals(36));
          expect(notscript.type, isNot(BuilderBlock.BLK_SCRIPT));
          expect(notscript.lineStart, equals(47));
          expect(notscript.lineEnd, equals(47));
        });
        new Builder()
            .readEgbFile(new File(getPath("script_2tags.egb")))
            .then(callback as BuilderCallback);
      });

      test("detects <echo>", () {
        var callback = expectAsync((var b) {
          var script = b.pages[0].blocks[1];
          var echo1 = script.subBlocks[0];
          var echo2 = script.subBlocks[1];
          var echo3 = script.subBlocks[2];

          expect(script.subBlocks, hasLength(3));
          expect(echo1.lineStart, equals(20));
          expect(echo1.lineEnd, equals(22));
          expect(echo2.lineStart, equals(24));
          expect(echo2.lineEnd, equals(26));
          expect(echo3.lineStart, equals(28));
          expect(echo3.lineEnd, equals(36));
        });
        new Builder()
            .readEgbFile(new File(getPath("echo_2tags.egb")))
            .then(callback as BuilderCallback);
      });
    });

    group('metadata', () {
      test("is detected", () {
        var callback = expectAsync((var b) {
          var metadata = b.metadata;
          var title = b.metadata[0];
          var twoValues = b.metadata[2];

          expect(metadata, hasLength(9));
          expect(title.key, equals("Title"));
          expect(title.values, hasLength(1));
          expect(title.values[0], equals("Test Gamebook #1"));
          expect(twoValues.values, hasLength(2));
          expect(twoValues.values[1], equals("John Doe"));
        });
        new Builder()
            .readEgbFile(new File(getPath("metadata_9keys.egb")))
            .then(callback as BuilderCallback);
      });

      test("extracts book UID", () {
        var callback = expectAsync((var b) {
          expect(b.uid, "example.uid.1");
        });
        new Builder()
            .readEgbFile(new File(getPath("metadata_9keys.egb")))
            .then(callback as BuilderCallback);
      });
    });

    group('import', () {
      // TODO: proper unit testing of new import 'something.dart'
      test("is detected", () {
        var callback = expectAsync((var b) {
          expect(b.importLibFiles, hasLength(1));
          expect(b.importLibFiles[0].toString(),
              contains("library_simple_all_tags.egb"));
        });
        new Builder()
            .readEgbFile(new File(getPath("import_1tag.egb")))
            .then(callback as BuilderCallback);
      });

      test("is detected with redundancies covered", () {
        var callback = expectAsync((var b) {
          expect(b.importLibFiles, hasLength(2));
          expect(b.importLibFiles[0].toString(),
              contains("library_simple_all_tags.egb"));
          expect(b.importLibFiles[1].toString(),
              contains("library_simple_all_tags2.egb"));
          expect(b.pages[1].name,
              "squash"); // making sure we're not breaking something else
        });
        new Builder()
            .readEgbFile(new File(getPath("import_2tags_plus1redundant.egb")))
            .then(callback as BuilderCallback);
      });

      test("doesn't touch package: imports", () {
        var callback = expectAsync((var b) {
          expect(b.importLibFiles, hasLength(1));
          expect(b.importLibFiles[0].path, startsWith("package:"));
        });
        new Builder()
            .readEgbFile(new File(getPath("import_package_path.egb")))
            .then(callback as BuilderCallback);
      });
    });

    group('synopsis', () {
      test("is detected", () {
        var callback = expectAsync((var b) {
          expect(b.synopsisLineNumbers, hasLength(9));
          expect(b.synopsisLineNumbers[0], 3);
          expect(b.synopsisLineNumbers.last, 12);
        });
        new Builder()
            .readEgbFile(new File(getPath("synopsis.egb")))
            .then(callback as BuilderCallback);
      });
    });

    group('writeFiles', () {
      setUp(createSubdirs);
      tearDown(deleteSubdirs);

      test("creates a file", () {
        var callback = expectAsync((bool exists) {
          expect(exists, equals(true));
        });
        new File(getPath("full_project.dart")).delete().whenComplete(() {
          new Builder()
              .readEgbFile(new File(getPath("full_project.egb")))
              .then((var b) {
            b.writeDartFiles().then((_) {
              new File(getPath("lib/full_project.dart"))
                  .exists()
                  .then(callback as BoolTakingVoidFunction);
            });
          });
        }).catchError((e) {
          // Ignore error when deleting non-existent file.
        }, test: (e) => e is FileSystemException);
      });
    });

//    group('graphML', () {
//
//      test("creates XML", () {
//        var callback = expectAsync1((Builder b) {
//          b.updateGraphML();
//          expect(b.graphML.groupNodes.length,
//              2);
//          expect(b.graphML.nodes.length,
//              5);
//          expect(b.graphML.groupNodes[0].text,
//              "Group 1");
//          expect(b.graphML.nodes.last.text,
//              "Single");
//          expect(b.graphML.nodes[0].text,
//              "Start");
//          String xml = b.graphML.toString();
//          expect(xml,
//              startsWith("<?xml"));
//        });
//        new Builder().readEgbFile(new File(getPath("page_group.egb"))).then(callback);
//      });
//
//      test("updates builder instance from XML", () {
//        var callback = expectAsync1((Builder b) {
//          expect(b.pages.length,
//              7);
//          expect(b.pages[b.pageHandles["Group 1: Start"]].gotoPageNames,
//              unorderedEquals(["Group 1: New node", "Group 1: End", "Group 2: Start"]));
//          expect(b.pageHandles["New single node"],
//              isNotNull);
//          expect(b.pages[b.pageHandles["Group 2: End"]].gotoPageNames,
//              contains("New single node"));
//        });
//        new Builder().readEgbFile(new File(getPath("update_from_graph.egb")))
//        .then((b) {
//          b.updateFromGraphMLFile();
//          callback(b);
//        });
//      });
//    });

    group('egb writer', () {
      setUpAll(() {
        createSubdirs();
      });
      tearDownAll(() {
        deleteSubdirs();
      });

      test("updates egb file from builder instance", () {
        File orig = new File(getPath("update_egb_original.egb"));
        File egb = new File(getPath("update_egb_file.egb"));

        var callback = expectAsync((Builder b) {
          expect(b.pages.last.name, "Programatically added page");
          expect(
              b.pages[3].gotoPageNames, contains("Programatically added page"));
        });

        var inputStream = orig.openRead();
        var ioSink = egb.openWrite();
        inputStream.pipe(ioSink).then(expectAsync((_) {
          new Builder()
              .readEgbFile(new File(getPath("update_egb_file.egb")))
              .then((Builder b) {
            b.pages.add(new BuilderPage(
                "Programatically added page", b.pages.last.index + 1, null));
            b.pageHandles["Programatically added page"] = b.pages.last.index;
            b.pages[3].gotoPageNames.add("Programatically added page");
            return b.updateEgbFile();
          }).then(callback as BuilderCallback);
        }));
      });

      test("assigns to firstPage", () async {
        var filename = getPath("choices_simple.egb");
        var b = await new Builder().readEgbFile(new File(filename));
        await b.writeScripterFile();
        var f = new File(b.scripterDartPath);
        bool found = false;
        for (String line in await f.readAsLines()) {
          if (line.contains("firstPage")) {
            found = true;
          }
        }
        if (!found) {
          fail("firstPage not found in $f");
        }
      });

      group("with parts", () {
        List<String> outputLines;
        setUpAll(() async {
          var filename = getPath("with_parts.egb");
          var b = await new Builder().readEgbFile(new File(filename));
          await b.writeScripterFile();
          var f = new File(b.scripterDartPath);
          outputLines = await f.readAsLines();
        });

        test("assigns to firstPage", () {
          bool found = false;
          for (String line in outputLines) {
            if (line.contains("firstPage")) {
              found = true;
            }
          }
          if (!found) {
            fail("firstPage not found in with_parts.dart");
          }
        });

        test("copies the contents of the part files", () {
          bool found = false;
          for (String line in outputLines) {
            if (line.contains("This is the second part.")) {
              found = true;
            }
          }
          if (!found) {
            fail("The second part of the book not found in with_parts.dart");
          }
        });
      });
    });
  });
}

typedef dynamic BoolTakingVoidFunction(bool value);
