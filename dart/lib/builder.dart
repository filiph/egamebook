library egb_builder;

import 'dart:async';
import 'dart:io';
import 'package:path/path.dart' as path;
import 'dart:convert';
//import 'package:graphml/dart_graphml.dart';

import 'src/shared/page.dart';
import 'src/shared/user_interaction.dart';

import 'src/builder/vars_generator.dart';

/**
 * Exception thrown when the input .egb file is badly formatted.
 **/
class EgbFormatException implements Exception {
  String msg;
  int line;
  File file;

  EgbFormatException(String this.msg, {this.line, this.file});

  String toString() {
    StringBuffer strBuf = new StringBuffer();
    strBuf.write("Format exception");
    if (line != null) {
      strBuf.write(" on line [$line]");
    }
    if (file != null) {
      strBuf.write(" in ${file}");
    }
    strBuf.write(": ");
    strBuf.write(msg);
    return strBuf.toString();
  }
}

/**
 * Abstract class defining a "line selection".
 */
abstract class BuilderLineRange {
  int lineStart;
  int lineEnd;
}

/**
 * BuilderLineSpan is a "selection" in the input file. In a complete form
 * (`[isClosed] == true`), it has a `lineStart` and a `lineEnd`.
 **/
class BuilderLineSpan implements BuilderLineRange { // XXX: this should be super-class of the below, but Dart is broken here
  int lineStart;
  int lineEnd;

  BuilderLineSpan({this.lineStart});

  get isClosed => lineStart != null && lineEnd != null && lineStart <= lineEnd;
}

/**
 * BuilderMetadata is a key-value pair of metadata associated with
 * the gamebook.
 *
 * An example can be:
 *
 * - key: authors
 * - value: ["Filip Hracek", "John Doe"]
 **/
class BuilderMetadata {
  String key;
  List<String> values;

  BuilderMetadata(this.key, {String firstValue}) {
    values = new List<String>();
    if (firstValue != null) {
      values.add(firstValue);
    }
  }
}

/**
 * BuilderPage defines a page as it is represented in the input .egb file.
 * A BuilderPage has its [name] and also [BuilderBlock]s.
 *
 * BuilderPage also has [options], like `visitOnce`.
 **/
class BuilderPage extends EgbPage implements BuilderLineRange {
  int index;
  int lineStart;
  int lineEnd;

  /**
   * List of options, such as [:visitOnce:].
   */
  Set<String> options;

  bool get visitOnce => options.contains("visitOnce");
  bool get showOnce => options.contains("showOnce");

  /**
   * List of linked page names. Builder makes sure they are specified in
   * their full version (i.e. "Group 1: Something").
   */
  List<String> gotoPageNames;

  List<BuilderBlock> blocks;
  BuilderPageGroup group;

  BuilderPage(String name, this.index, [this.lineStart]) :
      super(name: name) {
    blocks = new List<BuilderBlock>();
    options = new Set<String>();
    gotoPageNames = new List<String>();

    group = new BuilderPageGroup.fromPage(this);
  }

  String toString() {
    return "BuilderPage <$name> [$lineStart:$lineEnd]";
  }

  /**
   * To be commented out – for example when the page is deleted in yEd.
   */
  bool commentOut = false;
}

/**
 * BuilderPageGroup is a form of grouping of the pages. Every time a page's
 * name starts with "Something: ", then "Something" is a pageGroup.
 * Calling goto("xyz") from a page named "Something: abc" when there is
 * a page named "Something: xyz" goes to that page.
 **/
class BuilderPageGroup {
  String name;
  List<BuilderPage> pages;

  static final Map<String, BuilderPageGroup> _cache
                  = new Map<String, BuilderPageGroup>();

  /**
   * Creates group from page. If page has no group, returns null. If group
   * already exists, returns existing group. Also adds the input page
   * to the group.
   */
  factory BuilderPageGroup.fromPage(BuilderPage page) {
    String name = page.groupName;
    if (name == null) {
      return null;
    } else if (_cache.containsKey(name)) {
      _cache[name].pages.add(page);
      return _cache[name];
    } else {
      final group = new BuilderPageGroup._internal(name);
      group.pages.add(page);
      _cache[name] = group;
      return group;
    }
  }

  BuilderPageGroup._internal(this.name) {
    pages = new List<BuilderPage>();
  }

  static List<BuilderPageGroup> get allGroups {
    List<BuilderPageGroup> list = _cache.values.toList();
    list.sort((a,b) => a.pages[0].index - b.pages[0].index); // TODO: check for empty groups
    return list;
  }
}

/**
 * BuilderBlock is a class that defines a "line selection" in the input
 * .egb file. The selection has a type (e.g. BLK_TEXT or BLK_SCRIPT).
 **/
class BuilderBlock implements BuilderLineRange {
  int lineStart;
  int lineEnd;
  int type = 0;
  Map<String, dynamic> options;
  List<BuilderBlock> subBlocks;

  static final int BLK_TEXT = 1;
  static final int BLK_TEXT_WITH_VAR = 8;

  /// Returns [:true:] if block is a text block (no matter if with variable
  /// or without.
  bool get isTextBlock => type == BLK_TEXT || type == BLK_TEXT_WITH_VAR;

  static final int BLK_SCRIPT = 2;
  static final int BLK_SCRIPT_ECHO = 64;

  static final int BLK_CHOICE_LIST = 128;
  static final int BLK_CHOICE_QUESTION = 16; // TODO deprecate
  static final int BLK_CHOICE = 4;
  static final int BLK_CHOICE_WITH_SCRIPT = 32;
  static final int BLK_CHOICE_MULTILINE = 256;

  BuilderBlock({this.lineStart, this.type: 0}) {
    options = new Map<String, dynamic>();
    subBlocks = new List<BuilderBlock>();
  }
}

/**
 * BuilderInitBlock is a class that defines a "line selection" of either
 * a `<classes>`, a `<functions>` or a `<variables>` block.
 **/
class BuilderInitBlock implements BuilderLineRange {
  int lineStart;
  int lineEnd;
  int type;

  @deprecated
  static const int BLK_CLASSES = 1;
  @deprecated
  static const int BLK_FUNCTIONS = 2;
  @deprecated
  static const int BLK_VARIABLES = 4;
  static const int BLK_DECLARE = 8;
  static const int BLK_INIT = 16;

  @deprecated
  static const String BLK_CLASSES_STRING = "classes";
  @deprecated
  static const String BLK_FUNCTIONS_STRING = "functions";
  @deprecated
  static const String BLK_VARIABLES_STRING = "variables";
  static const String BLK_DECLARE_STRING = "declare";
  static const String BLK_INIT_STRING = "init";

  BuilderInitBlock({this.lineStart, this.type, String typeStr}) {
    if (typeStr != null) {
      type = typeFromString(typeStr);
    }
  }

  static int typeFromString(String s) {
    switch (s) {
      case BLK_CLASSES_STRING:
        return BLK_CLASSES;
      case BLK_FUNCTIONS_STRING:
        return BLK_FUNCTIONS;
      case BLK_VARIABLES_STRING:
        return BLK_VARIABLES;
      case BLK_DECLARE_STRING:
        return BLK_DECLARE;
      case BLK_INIT_STRING:
        return BLK_INIT;
      default:
        throw "Tag <$s> was not recognized as a valid init block tag.";
    }
  }

  static int modeFromString(String s) {
    if (s == BLK_CLASSES_STRING) {
      return Builder.MODE_INSIDE_CLASSES;
    } else if (s == BLK_FUNCTIONS_STRING) {
      return Builder.MODE_INSIDE_FUNCTIONS;
    } else if (s == BLK_VARIABLES_STRING) {
      return Builder.MODE_INSIDE_VARIABLES;
    } else if (s == BLK_DECLARE_STRING) {
      return Builder.MODE_INSIDE_DECLARE;
    } else if (s == BLK_INIT_STRING) {
      return Builder.MODE_INSIDE_INIT;
    } else {
      throw "Tag <$s> was not recognized as a valid init block tag.";
    }
  }
}

/**
 * Class that represents a full egamebook. Call [:readEgbFile:] to get
 * data from an existing .egb file. Call [:writeEgbFile:] to output the data
 * into a new .egb file.
 *
 * After it's been created, you can call [:writeDartFiles:] to create
 * the source files (scripter implementation + 2 user interfaces).
 *
 * You can also export the page structure to a GraphML file using
 * [:writeGraphMLFile:] or update existing structure by
 * [:updateFromGraphMLFile:].
 **/
class Builder {
  /**
   * Default constructor. This will allocate memory for members and nothing
   * else. The structure is still empty after calling this.
   **/
  Builder() {
    metadata = new List<BuilderMetadata>();
    synopsisLineNumbers = new List<int>();
    pages = new List<BuilderPage>();
    pageHandles = new Map<String, int>();
    initBlocks = new List<BuilderInitBlock>();
    importLibFiles = new List<File>();
    importLibFilesFullPaths = new Set<String>();

    warningLines = new List<String>();
  }

  /**
    * Main workhorse, reads and parses file to intermediary structure.
    * When the returning Future is ready, use can call [writeDartFiles()],
    * for example.
    * @param  f A well-formed .egb file.
    * @return   A Future. On completion, the future returns `this` for
    *           convenience.
    */
  Future<Builder> readEgbFile(File f) {
    var completer = new Completer();

    inputEgbFile = f;

    f.exists()
    .then((exists) {
      if (!exists) {
        completer.completeError(new Exception("File $f doesn't exist."));
      } else {
        inputEgbFileFullPath = f.path;
        print("Reading input file $f.");

        var inputStream = f.openRead();
        readInputStream(inputStream).then((b) => completer.complete(b),
            onError: (e, stackTrace) => completer.completeError(e, stackTrace));
      }
    });

    return completer.future;
  }

  Future<Builder> readInputStream(Stream<List<int>> inputStream) {
    var completer = new Completer();

    var strInputStream = inputStream
                        .transform(UTF8.decoder)
                        .transform(new LineSplitter());

    // The top of the file can be metadata. This will be changed to
    // MODE_NORMAL in [_checkMetadataLine()] when there is no metadata.
    _mode = MODE_METADATA;

    _lineNumber = 0;
    _pageNumber = 0;
    _blockNumber = 0;

    StreamSubscription subscription;

    subscription = strInputStream.listen((String line) {
      _lineNumber++;
      try {
        _check(_lineNumber, line);
      } on EgbFormatException catch (e) {
        completer.completeError(e);
        subscription.cancel();
      }
      //    stdout.addString(".");
    }, onDone: () {
//      print("\nReading input file has finished.");

      if (!pages.isEmpty) {
        // end the last page
        pages.last.lineEnd = _lineNumber;
        if (pages.last.blocks != null && !pages.last.blocks.isEmpty
            && pages.last.blocks.last.lineEnd == null) {
          pages.last.blocks.last.lineEnd = _lineNumber;
        }

        for (var page in pages) {
          // check for duplicate pages
          if (pages.where((BuilderPage otherPage) =>
              page.name == otherPage.name).length != 1) {
            completer.completeError(
                newFormatException("Duplicate page name ('${page.name}')."));
            return;
          }

          // fully specify gotoPageNames of every page
          for (int i = 0; i < page.gotoPageNames.length; i++) {
            var gotoPageName = page.gotoPageNames[i];
            if (pageHandles.containsKey(
                                        "${page.groupName}: $gotoPageName")) {
              page.gotoPageNames[i] =
                  "${page.groupName}: $gotoPageName";
            } else if (pageHandles.containsKey(gotoPageName)) {
              // great, already done
            } else if (EgbChoice.GO_BACK.hasMatch(gotoPageName)) {
              // great, it's just going back
            } else {
              WARNING("Page ${page.name} specifies a choice that goes "
              "to a non-existing page ($gotoPageName).",
              line:null);
            }
          }
        }
      } else {
        WARNING("There are no pages in this egb. If you want it to be playable, "
            "you will need to include page starts in the form of a line "
            "containing exclusively dashes (`-`, three or more) and "
            "an immediately following line with the name of the page.",
            line:null);
      }

      if (_mode != MODE_NORMAL) {
        completer.completeError(
            newFormatException("Corrupt file, didn't close a tag (_mode = ${_mode})."));
      } else {
        _checkForDoubleImports().then((bool passed) {
          if (passed) {
            completer.complete(this);
          }
        });
      }
    }, onError: (e) {
      completer.completeError(e);
    });

    return completer.future;
  }

  /**
   * This method takes care of checking each new line, trying to find
   * patterns (like a new page).
   *
   **/
  void _check(int number, String line) {
    // start finding patterns in the line
    // try every pattern at once, in a non-blocking way, using futures
    List<bool> checkValues = [
        _checkBlankLine(number, line),
        _checkNewPage(number, line),
        _checkPageOptions(number, line),
        _checkChoiceList(number, line),
        _checkInitBlockTags(number, line),
        _checkScriptTags(number, line),
        _checkGotoInsideScript(number, line),
        _checkMetadataLine(number, line),
        _checkImportTag(number, line)
    ];

    if (checkValues.every((value) => value == false)) {
      _checkNormalParagraph(number, line);
    }
  }


  /*
  Checkers.
  */

  /**
   * Checks if current line is a blank line. Acts accordingly.
   *
   * @return    bool, indicating the result of the check.
   **/
  bool _checkBlankLine(int number, String line) {
    if (_mode != MODE_NORMAL) {
      return false;
    }

    if (line == null || line == "" || blankLine.hasMatch(line)) {
      // close previous unfinished block or choiceList if any
      if (!pages.isEmpty) {
        var lastpage = pages.last;
        if (!lastpage.blocks.isEmpty) {
          var lastblock = lastpage.blocks.last;
          if (lastblock.type == BuilderBlock.BLK_TEXT ||
              lastblock.type == BuilderBlock.BLK_TEXT_WITH_VAR ||
              lastblock.type == BuilderBlock.BLK_CHOICE_LIST) {
            if (lastblock.lineEnd == null) {
              lastblock.lineEnd = number - 1;
            }
          }
        }
      } else {
        synopsisLineNumbers.add(number);
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks if current line is a metadata line. Acts accordingly.
   *
   * @return    bool, indicating the result of the check.
   **/
  bool _checkMetadataLine(int number, String line) {
    if (_mode != MODE_METADATA || line == null) {
      return false;
    }

    Match m = metadataLine.firstMatch(line);

    if (m != null) {
      // first line of a metadata record
      var key = m.group(1).trim();
      var value = m.group(2).trim();
      metadata.add(new BuilderMetadata(key, firstValue:value));
      return true;
    } else {
      m = metadataLineAdd.firstMatch(line);

      if (m != null && !metadata.isEmpty) {
        // we have a multi-value key and this is a following value
        var value = m.group(1).trim();
        metadata.last.values.add(value);
        return true;
      } else {
        // we have hit the first non-metadata line. Quit metadata mode.
        _mode = MODE_NORMAL;
        return false;  // let it be checked by _checkNormalParagraph, too
      }
    }
  }

  /**
   * Checks if current line is a beginning of a new page. Acts accordingly.
   *
   * @return    bool, indicating the result of the check.
   **/
  bool _checkNewPage(int number, String line) {
    // TODO: check inside echo tags, throw error if true
    if ((_mode != MODE_METADATA && _mode != MODE_NORMAL) || line == null) {
      return false;
    }

    if (_newPageCandidate && validPageName.hasMatch(line)) {
      // discard the "---" from any previous blocks
      if (pages.isEmpty) {
        if (!synopsisLineNumbers.isEmpty) {
          synopsisLineNumbers.removeLast();
        }
      } else {
        var lastpage = pages.last;
        if (!lastpage.blocks.isEmpty) {
          var lastblock = lastpage.blocks.last;
          // also close block
          if (lastblock.lineEnd == null) {
            lastblock.lineEnd = number - 2;
            if (lastblock.lineEnd < lastblock.lineStart) {
              // a faux text block with only "---" inside
              lastpage.blocks.removeLast();
            }
          }
        }
      }

      // close last page
      if (!pages.isEmpty) {
        pages.last.lineEnd = number - 2;
      }

      // add the new page
      var name = validPageName.firstMatch(line).group(1);
      pageHandles[name] = _pageNumber;
      pages.add(new BuilderPage(name, _pageNumber++, number));
      _mode = MODE_NORMAL;
      _newPageCandidate = false;
      return true;

    } else {
      // no page, but let's check if this line isn't a "---" (next line could confirm a new page)
      if (hr.hasMatch(line)) {
        _newPageCandidate = true;
        return false;  // let it be checked by _checkNormalParagraph, too
      } else {
        _newPageCandidate = false;
        return false;
      }
    }
  }

  /**
   * Checks if current line is an options line below new page line.
   * Acts accordingly.
   *
   * @return    bool, indicating the result of the check.
   **/
  bool _checkPageOptions(int number, String line) {
    if (_mode != MODE_NORMAL || line == null) {
      return false;
    }

    if (!pages.isEmpty && pages.last.lineStart == number - 1
        && pageOptions.hasMatch(line)) {
      Match m = pageOptions.firstMatch(line);
      var lastpage = pages.last;
      for (var i = 1; i <= m.groupCount; i += 2) {
        var opt = m.group(i);
        if (opt != null) {
          lastpage.options.add(opt);
        }
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks if line is a valid one line choice. If not, returns [:null:].
   * If it is a valid choice, returns the corresponding [BuilderBlock] (without
   * the lineStart or lineEnd).
   */
  BuilderBlock parseOneLineChoice(String line) {
    if (!oneLineChoice.hasMatch(line)) return null;

    var choiceBlock = new BuilderBlock(type: BuilderBlock.BLK_CHOICE);

    Match m = oneLineChoice.firstMatch(line);
    /*for (int i = 1; i <= m.groupCount; i++) {*/
      /*print("$i - \"${m.group(i)}\"");*/
    /*}*/
    choiceBlock.options["string"] = m.group(1);
    choiceBlock.options["script"] = m.group(2);
    choiceBlock.options["goto"] = m.group(3);

    if (choiceBlock.options["script"] == "") {
      choiceBlock.options["script"] = null;
    }

    if (choiceBlock.options["script"] != null) {
      choiceBlock.type = BuilderBlock.BLK_CHOICE_WITH_SCRIPT;
    }

    // trim the strings
    choiceBlock.options.forEach((var k, var v) {
      if (v != null) {
        choiceBlock.options[k] = choiceBlock.options[k].trim();
      }
    });

//    if (choiceBlock.options["script"] == null && choiceBlock.options["goto"] == null) {
//      WARNING("Choice in the form of `- something []` is illegal. There must be "
//            "a script and/or a goto specified.");
//      return null;
//    }

    if (choiceBlock.options["script"] != null
        && (new RegExp(r"^[^{]*}").hasMatch(choiceBlock.options["script"])
            || new RegExp(r"{[^}]*$").hasMatch(choiceBlock.options["script"]))) {
      WARNING("Inline script `${choiceBlock.options['script']}` in choice appears to have "
            "an unmatched bracket. This could be an error. Actual format used: `$line`.");
    }

    return choiceBlock;
  }



  /**
   * Checks if current line is choice. Acts accordingly.
   *
   * @return    bool, indicating the result of the check.
   **/
  bool _checkChoiceList(int number, String line) {
    // TODO: check even inside ECHO tags, add to script
    if (line == null || pages.isEmpty
        || (_mode != MODE_NORMAL && _mode != MODE_INSIDE_CHOICE
        /* && _mode != MODE_INSIDE_SCRIPT_ECHO // TODO: implement */)) {
      return false;
    }

    BuilderBlock choiceSubBlock;

    // First, check for multiline choices - a multiline choice's information
    // is only complete after we have read the last line.
    if (_mode == MODE_INSIDE_CHOICE) {
      // We are inside a choice.
      var lastpage = pages.last;
      assert(lastpage.blocks.isNotEmpty);
      assert(lastpage.blocks.last.type == BuilderBlock.BLK_CHOICE_LIST);
      assert(lastpage.blocks.last.subBlocks.isNotEmpty);
      choiceSubBlock = lastpage.blocks.last.subBlocks.last;

      Match m = multiLineChoiceEnd.firstMatch(line);
      if (m != null) {
        // End of multiline choice.
        var strBuf = new StringBuffer(choiceSubBlock.options["script"]);
        strBuf.writeln("\"\"\");");  // end of echo()
        strBuf.writeln(m.group(1));
        choiceSubBlock.options["script"] = strBuf.toString();
        choiceSubBlock.options["goto"] = m.group(2);
        choiceSubBlock.lineEnd = number;
        _mode = MODE_NORMAL;
        return true;
      } else {
        // A normal line inside the multiline choice.
        var textLine = line.replaceFirst(new RegExp(r"^\s{4}"), "");  // de-indent
        choiceSubBlock.options["script"] += "$textLine\n";
        return true;
      }
    } else {
      Match m = multiLineChoiceStart.firstMatch(line);
      if (m != null) {
        // A new multiline choice.
        choiceSubBlock = new BuilderBlock(type: BuilderBlock.BLK_CHOICE);
        choiceSubBlock.options["string"] = m.group(1);
        choiceSubBlock.options["script"] = "echo(\"\"\"\n";  // start of echo
        choiceSubBlock.lineStart = number;
        _mode = MODE_INSIDE_CHOICE;
      }
    }

    if (choiceSubBlock == null) {
      choiceSubBlock = parseOneLineChoice(line);
      if (choiceSubBlock == null) {
        return false;  // No luck.
      } else {
        choiceSubBlock.lineStart = choiceSubBlock.lineEnd = number;
      }
    }

    BuilderBlock choiceList;
    var lastpage = pages.last;
    if (!lastpage.blocks.isEmpty) {
      var lastblock = lastpage.blocks.last;

      // If there was a choiceList preceding this one, just continue
      // with the preceding choiceList.
      if (lastblock.type == BuilderBlock.BLK_CHOICE_LIST &&
          lastblock.lineEnd == null) {
        choiceList = lastblock;
      } else {
        choiceList = new BuilderBlock(
            lineStart: number, type: BuilderBlock.BLK_CHOICE_LIST);

        // If the previous line is a text block, then that textblock needs to be
        // added to this choiceList as question.
        if (lastblock.isTextBlock && lastblock.lineEnd == null) {
          choiceList.lineStart = lastblock.lineStart;
          lastpage.blocks.removeLast();
        }

        lastpage.blocks.add(choiceList);
      }
    } else {
      choiceList = new BuilderBlock(
          lineStart: number, type: BuilderBlock.BLK_CHOICE_LIST);

      lastpage.blocks.add(choiceList);
    }

    bool hasVarInString = (choiceSubBlock.options["string"] != null
        && variableInText.hasMatch(choiceSubBlock.options["string"]));

    if (_mode == MODE_INSIDE_SCRIPT_ECHO) {
      // TODO: just add a _choiceToScript(block) to the current script flow
    } else if (_mode == MODE_NORMAL && choiceSubBlock.options["script"] == null &&
               !hasVarInString) {
      // we have a simple choice (i.e. no scripts needed)
      choiceSubBlock.type = BuilderBlock.BLK_CHOICE;
    } else if (_mode == MODE_INSIDE_CHOICE) {
      choiceSubBlock.type = BuilderBlock.BLK_CHOICE_MULTILINE;
    } else {
      // the choice will need to be rewritten into a standalone script (closure)
      choiceSubBlock.type = BuilderBlock.BLK_CHOICE_WITH_SCRIPT;
    }

    if (choiceSubBlock.options["goto"] != null) {
      lastpage.gotoPageNames.add(choiceSubBlock.options["goto"]);
    }
    choiceList.subBlocks.add(choiceSubBlock);

    return true;
  }

  /**
   * Checks if current line is one of `<classes>`, `<functions>` or
   * `<variables>` (or their closing tags). Acts accordingly.
   *
   * @return    bool, indicating the result of the check.
   **/
  bool _checkInitBlockTags(int number, String line) {
    if (_mode == MODE_INSIDE_SCRIPT_TAG || line == null) {
      return false;
    }

    Match m = initBlockTag.firstMatch(line);

    if (m != null) {
      bool closing =  m.group(1) == "/";
      var blocktype = m.group(2).toLowerCase();

      if (!closing) {  // opening a new tag
        if (_mode == MODE_NORMAL || _mode == MODE_METADATA) {
          _mode = BuilderInitBlock.modeFromString(blocktype);
          initBlocks.add(new BuilderInitBlock(lineStart:number, typeStr:blocktype));
          _closeLastBlock(number - 1);
          return true;
        } else {
          throw newFormatException("Invalid appearance of of an init "
                  "opening tag `<$blocktype>`. We are already inside "
                  "another tag (mode = $_mode).");
        }
      } else {  // closing a tag
        if (_mode == MODE_INSIDE_CLASSES || _mode == MODE_INSIDE_FUNCTIONS
            || _mode == MODE_INSIDE_VARIABLES || _mode == MODE_INSIDE_DECLARE ||
            _mode == MODE_INSIDE_INIT) {
          _mode = MODE_NORMAL;
          initBlocks.last.lineEnd = number;
          return true;
        } else {
          throw newFormatException("Invalid appearance of of an init "
                  "closing tag `</$blocktype>`. We are not inside any "
                  "other tag (mode = $_mode).");
        }
      }
    } else {
      return false;
    }
  }

  /**
   * Checks if current line is one of `<script>` or `</script>`.
   * Acts accordingly.
   *
   * @return    bool, indicating the result of the check.
   **/
  bool _checkScriptTags(int number, String line) {
    if (_mode == MODE_INSIDE_CLASSES || _mode == MODE_INSIDE_VARIABLES
        || _mode == MODE_INSIDE_FUNCTIONS || _mode == MODE_INSIDE_DECLARE ||
            _mode == MODE_INSIDE_INIT || line == null) {
      return false;
    }

    Match m = scriptOrEchoTag.firstMatch(line);

    if (pages.isEmpty) {
      if (m != null) {
        WARNING("No <script> or <echo> blocks will be recognized as such "
                "in the synopsis (i.e. outside a page). Ignoring.");
      }
      return false;
    }
    var lastpage = pages.last;

    if (m != null) {
      bool closing =  m.group(1) == "/";
      var type = m.group(2).toLowerCase();
      bool tagIsEcho = type == "echo";
      bool tagIsScript = type == "script";

      if (!closing) {  // opening a new tag
        if (_mode == MODE_NORMAL && tagIsScript) {
          _closeLastBlock(number - 1);
          _mode = MODE_INSIDE_SCRIPT_TAG;
          var block = new BuilderBlock(lineStart:number);
          block.type = BuilderBlock.BLK_SCRIPT;
          lastpage.blocks.add(block);
          return true;
        } else if (_mode == MODE_INSIDE_SCRIPT_TAG && tagIsEcho) {
          _mode = MODE_INSIDE_SCRIPT_ECHO;
          if (!lastpage.blocks.isEmpty
              && lastpage.blocks.last.type == BuilderBlock.BLK_SCRIPT) {
            lastpage.blocks.last.subBlocks.add(
                new BuilderBlock(lineStart: number,
                                 type: BuilderBlock.BLK_SCRIPT_ECHO));
            return true;
          } else {
            throw newFormatException("Echo tags must be inside <script> tags.");
          }
        } else {
          throw newFormatException("Starting a <$type> tag outside NORMAL "
              "is illegal. We are now in mode=$_mode.");
        }
      } else {  // closing a tag
        if (_mode == MODE_INSIDE_SCRIPT_TAG && !tagIsEcho && !lastpage.blocks.isEmpty) {
          _mode = MODE_NORMAL;
          lastpage.blocks.last.lineEnd = number;
          return true;
        } else if (_mode == MODE_INSIDE_SCRIPT_ECHO && !lastpage.blocks.isEmpty
              && lastpage.blocks.last.type == BuilderBlock.BLK_SCRIPT
              && !lastpage.blocks.last.subBlocks.isEmpty) {
          _mode = MODE_INSIDE_SCRIPT_TAG;
          lastpage.blocks.last.subBlocks.last.lineEnd = number;
          return true;
        } else {
          throw newFormatException("Invalid appearance of of a `</$type>` "
                  "closing tag. We are not inside any $type tag to be"
                  "closed (mode = $_mode).");
        }
      }
    } else {
      return false;
    }
  }

  /**
   * Checks if there is a goto("") statement inside a script. Acts accordingly.
   *
   * @return    bool, indicating the result of the check.
   **/
  bool _checkGotoInsideScript(int number, String line) {
    if (line == null) {
      return false;
    }

    if (_mode == MODE_INSIDE_SCRIPT_TAG) {
      Match m = gotoInsideScript.firstMatch(line);

      if (m != null) {
        pages.last.gotoPageNames.add(m.group(2));
        return true;
      }
    }
    return false;
  }

  /**
   * Checks if current line is an `<import>` tag. Acts accordingly.
   *
   * @return    bool, indicating the result of the check.
   **/
  bool _checkImportTag(int number, String line) {
    if (_mode == MODE_INSIDE_SCRIPT_TAG || line == null) {
      return false;
    }

    Match m = importTag.firstMatch(line);

    if (m != null) {
      _closeLastBlock(number - 1);
      var importFilePath = m.group(1);
      // Get rid of enclosing "" / ''.
      importFilePath = importFilePath.substring(1, importFilePath.length - 1);

      //var inputFilePath = new Path(inputEgbFileFullPath);
      var pathToImport = path.join(
          path.dirname(inputEgbFileFullPath), importFilePath);

      importLibFiles.add(new File(pathToImport));
      return true;
    } else {
      return false;
    }
  }

  /**
   * When all above checks fails, this is probably a line in a normal paragraph.
   * (Unless it's above the first page, in which case it's a line
   * in the synopsis.)
   *
   * @return    bool, indicating the result of the check.
   **/
  bool _checkNormalParagraph(int number, String line) {
    // TODO: check also inside echo tags, add to script block
    if (_mode != MODE_NORMAL || line == null) {
      return false;
    }

    if (pages.isEmpty) {
      synopsisLineNumbers.add(number);
    } else {
      // we have a new block inside a page!
      var lastpage = pages.last;
      bool appending = false;

      if (!lastpage.blocks.isEmpty) {
        var lastblock = lastpage.blocks.last;
        if (lastblock.lineEnd == null) {
          if (lastblock.type == BuilderBlock.BLK_TEXT ||
              lastblock.type == BuilderBlock.BLK_TEXT_WITH_VAR) {
            // we have an unfinished text block that we can append to
            appending = true;
            //lastblock.lines.add(_thisLine);
            if (variableInText.hasMatch(line)) {
              lastblock.type = BuilderBlock.BLK_TEXT_WITH_VAR;
            }
          } else {
            // the previous block is of different type
            _closeLastBlock(number - 1);
          }
        }
      }

      if (!appending) {
        // we create a new block
        var block = new BuilderBlock(lineStart:number);
        if (variableInText.hasMatch(line)) {
          block.type = BuilderBlock.BLK_TEXT_WITH_VAR;
        } else {
          block.type = BuilderBlock.BLK_TEXT;
        }
        //block.lines.add(_thisLine);
        lastpage.blocks.add(block);
      }
    }

    return true;
  }

  /**
   * Goes out and checks if the imported files exist. The method finds out
   * if two imports are of the same file, in which case it removes the redundant
   * [importLibFiles].
   *
   * @return    Future of bool, always true.
   **/
  Future<bool> _checkForDoubleImports() {
    var completer = new Completer();

    List<Future<bool>> existsFutures = new List<Future<bool>>();
    List<String> fullPaths = new List<String>();

    for (File f in importLibFiles) {
      fullPaths.add(path.normalize(path.absolute(f.path)));
      existsFutures.add(f.exists());
    }

    Future.wait(existsFutures)
    .then((List<bool> existsBools) {
      assert(existsBools.length == importLibFiles.length);

      for (int i = 0; i < existsBools.length; i++) {
        if (existsBools[i] == false) {
          return new Exception("Source file tries to import a file that "
              "doesn't exist (${importLibFiles[i]}).");
        }
      }

    })
    .catchError((e) => completer.complete(e))
    .then((_) {
      assert(fullPaths.length == importLibFiles.length);
      importLibFilesFullPaths = new Set.from(fullPaths);
      for (int i = 0; i < fullPaths.length; i++) {
        for (int j = 0; j < i; j++) {
          if (fullPaths[i] == fullPaths[j]) {
            WARNING("File '${fullPaths[i]}' has already been imported. "
            "Ignoring the redundant <import> tag.");
            importLibFiles[i] = null;
          }
        }
      }
      // remove the nulls
      importLibFiles = importLibFiles.where((f) => f != null).toList();
      completer.complete(true);
    });

    return completer.future;
  }

  /**
   * Helper function. Finds the previous block and closes it with either
   * the given [lineEnd] param, or the previous line.
   **/
  void _closeLastBlock(int lineEnd) {
    if (!pages.isEmpty && !pages.last.blocks.isEmpty) {
      var lastblock = pages.last.blocks.last;
      if (lastblock.lineEnd == null) {
        lastblock.lineEnd = lineEnd;
      }
    }
  }

  EgbFormatException newFormatException(String msg) {
    return new EgbFormatException(msg, line:_lineNumber, file:inputEgbFile);
  }

  // input file given by readFile()
  File inputEgbFile;
  String inputEgbFileFullPath;
  List<File> importLibFiles;
  Set<String> importLibFilesFullPaths;

  List<BuilderMetadata> metadata;
  bool _newPageCandidate = false;  // when last page was "---", there's a chance of a newpage

  List<int> synopsisLineNumbers;

  /**
   * List of pages.
   */
  List<BuilderPage> pages;

  List<BuilderPageGroup> get pageGroups => BuilderPageGroup.allGroups;

  /**
   * A map of pageHandles -> pageIndex. For use of the `goto("something")`
   * funtion.
   */
  Map<String, int> pageHandles;

  /**
   * List of init blocks, such as `<classes>` or `<variables>` blocks.
   */
  List<BuilderInitBlock> initBlocks;

  /// The code generator that analyzes <init> blocks and keeps track of
  /// variables.
  VarsGenerator varsGenerator;

  /**
   * GraphML representation of the page flow.
   **/
  //GraphML graphML;

  static final RegExp blankLine = new RegExp(r"^\s*$");
  static final RegExp hr = new RegExp(r"^\s{0,3}\-\-\-+\s*$"); // ----
  static final RegExp validPageName = new RegExp(r"^\s{0,3}(.+)\s*$");
  static final RegExp pageOptions = new RegExp(r"^\s{0,3}\[\[\s*(\w+)([\s,]+(\w+))*\s*]\]\s*$");
  static final RegExp metadataLine = new RegExp(r"^(\w.+):\s*(\w.*)\s*$");
  static final RegExp metadataLineAdd = new RegExp(r"^\s+(\w.*)\s*$");
  /*static final RegExp scriptTag = new RegExp(@"^\s{0,3}<\s*(/?)\s*script\s*>\s*$", ignoreCase:true);*/
  static final RegExp scriptOrEchoTag = new RegExp(r"^\s{0,}<\s*(/?)\s*((?:script)|(?:echo))\s*>\s*$", caseSensitive: false);
  static final RegExp gotoInsideScript = new RegExp(r"""goto\s*\(\s*(\"|\'|\"\"\")(.+?)\1\s*\)\s*;""");
  /*static final RegExp scriptTagStart = new RegExp(@"^\s{0,3}<script>\s*$");*/
  /*static final RegExp scriptTagEnd = new RegExp(@"^\s{0,3}</script>\s*$");*/
  /*static final RegExp initTagStart = new RegExp(@"^\s{0,3}<init>\s*$");*/
  /*static final RegExp initTagEnd = new RegExp(@"^\s{0,3}</init>\s*$");*/
  /*static final RegExp libraryTagStart = new RegExp(@"^\s{0,3}<library>\s*$");*/
  /*static final RegExp libraryTagEnd = new RegExp(@"^\s{0,3}</library>\s*$");*/
  /*static final RegExp classesTagStart = new RegExp(@"^\s{0,3}<classes>\s*$");*/
  /*static final RegExp classesTagEnd = new RegExp(@"^\s{0,3}</classes>\s*$");*/
  static final RegExp initBlockTag = new RegExp(r"^\s{0,3}<\s*(/?)\s*((?:declare)|(?:init))\s*>\s*$", caseSensitive: false);
  static final RegExp importTag = new RegExp(r"""^\s{0,3}<\s*import\s+((?:\"(?:.+)\")|(?:\'(?:.+)\'))\s*/?>\s*$""", caseSensitive: false);
  static final RegExp oneLineChoice = new RegExp(r"^\s{0,3}\-\s+(?:(.+)\s+)?\[\s*(?:\{\s*(.*)\s*\})?[\s,]*([^\{].+)?\s*\]\s*$");
  static final RegExp multiLineChoiceStart = new RegExp(r"^\s{0,3}\-\s+(?:(.+)\s+)?\[\s*$");  // - Something [
  static final RegExp multiLineChoiceEnd = new RegExp(r"^\s{0,3}\{\s*(.*)\s*\}[\s,]*([^\{].+)?\s*\]\s*$");  // {i++;} somepage]
  static final RegExp variableInText = new RegExp(r"(^|[^\\])\$[a-zA-Z_][a-zA-Z0-9_]*|(^|[^\\])\${[^}]+}");

  /**
   * Writes following Dart files to disk:
   *
   * - xyz.dart (The Scripter implementation)
   * - xyz.cmdline.dart (The command line interface)
   * - xyz.html.dart (The html interface)
   **/
  Future<bool> writeDartFiles() {
    var completer = new Completer();

    Future.wait([
        writeScripterFile(),
        writeInterfaceFiles()
    ]).then((_) {
      completer.complete(true);
    });

    return completer.future;
  }

  /**
   * Creates the scripter implementation file. This file includes the
   * whole egamebooks content.
   */
  Future<bool> writeScripterFile() {
    var completer = new Completer();

    var pathToOutputDart = getPathForExtension("dart");

    // write the .dart file
    File dartFile = new File(pathToOutputDart);
    IOSink dartOutStream = dartFile.openWrite();
    dartOutStream.write(implStartFile); // TODO: fix path to #import('../egb_library.dart');
    _writeLibImports(dartOutStream,
        relativeToPath: path.dirname(dartFile.path));
    dartOutStream.write(implStartClass);
    writeDeclarations(dartOutStream, indent: 2)
    .then((_) {
      dartOutStream.write(implStartCtor);
      dartOutStream.write(implStartPages);
      writePagesToScripter(dartOutStream)
      .then((_) {
        dartOutStream.write(implEndPages);
        dartOutStream.write(implEndCtor);
        dartOutStream.write(implStartInit);
        writeInitBlocks(dartOutStream, BuilderInitBlock.BLK_INIT, indent:4)
        .then((_) {
          dartOutStream.write(implEndInit);
          dartOutStream.write(implEndClass);
          dartOutStream.write(implEndFile);

          // Close and complete
          dartOutStream.close();
          dartOutStream.done.then((_) {
            completer.complete(true);
          });
        });
      });
    });

    return completer.future;
  }

  void _writeLibImports(IOSink dartOutStream, {String relativeToPath}) {
    assert(importLibFilesFullPaths != null);
    dartOutStream.write("\n");
    for (var importPath in importLibFilesFullPaths) {
      if (relativeToPath != null) {
        importPath = path.relative(importPath, from: relativeToPath);
      }
      dartOutStream.write("import '$importPath';\n");
    }
  }

  /**
   * Creates the interface files. These files are the ones that run
   * the egamebook. They import the scripter file as an Isolate.
   *
   * There are two interfaces: the command line interface, and the HTML
   * interface.
   */
  Future<bool> writeInterfaceFiles() {
    var completer = new Completer();

    var scriptFilePath = Platform.script;
    var pathToOutputDart = getPathForExtension("dart");
//    var pathToOutputCmd = getPathForExtension("cmdline.dart");
//    var pathToInputTemplateCmd = path.join(path.dirname(scriptFilePath.path),
//        "../lib/src/cmdline_template.dart");
    var pathToOutputHtml = getPathForExtension("html.dart");
    var pathToInputTemplateHtml = path.join(path.dirname(scriptFilePath.path),
        "../lib/interfaces/html/main_entry_point.dart");

    var pathToOutputDartFromOutputHtml =
        path.relative(pathToOutputDart, from: path.dirname(pathToOutputHtml));

//    File cmdLineOutputFile = new File(pathToOutputCmd);
//    File cmdLineTemplateFile = new File(pathToInputTemplateCmd);
    File htmlOutputFile = new File(pathToOutputHtml);
    File htmlTemplateFile = new File(pathToInputTemplateHtml);

    var substitutions = {
      "import '../runner.dart';" :
          "import 'package:egamebook/runner.dart';\n",
      "import 'interface/interface.dart';" :
          "import 'package:egamebook/src/interface/interface.dart';\n",
      "import 'interface/interface_cmdline.dart';" :
          "import 'package:egamebook/src/interface/interface_cmdline.dart';\n",
      "import 'interface/interface_html.dart';" :
          "import 'package:egamebook/src/interface/interface_html.dart';\n",
      "import 'persistence/storage.dart';" :
        "import 'package:egamebook/src/persistence/storage.dart';\n",
      "import 'persistence/player_profile.dart';" :
        "import 'package:egamebook/src/persistence/player_profile.dart';\n",
      "  var scripterPath = '[[PathToEgbScripterImplementation]]';" :
          "  var scripterPath = '$pathToOutputDartFromOutputHtml';"
    };

    Future.wait([
//        _fileFromTemplate(cmdLineTemplateFile, cmdLineOutputFile, substitutions),
        _fileFromTemplate(htmlTemplateFile, htmlOutputFile, substitutions),
    ]).then((List<bool> bools) => completer.complete(bools.every((b) => b)));

    return completer.future;
  }

  /**
   * Helper function copies contents of the template to a new file,
   * substituting strings as specified by [substitutions].
   *
   * @param inFile  The template file.
   * @param outFile File to be created.
   * @param substitutions A map of String->String substitutions.
   */
  Future<bool> _fileFromTemplate(File inFile, File outFile,
      [Map<String, String> substitutions]) {
    if (substitutions == null) {
      substitutions = new Map();
    }
    Completer completer = new Completer();

    inFile.exists()
    .then((bool exists) {
      if (!exists) {
        WARNING("Cmd line template ${inFile} doesn't exist in current directory. Skipping.");
        completer.complete(false);
      } else {
        IOSink outStream = outFile.openWrite();
        inFile.openRead()
              .transform(UTF8.decoder)
              .transform(new LineSplitter())
              .listen((line) {
                if (substitutions.containsKey(line)) {
                  outStream.write("${substitutions[line]}\n");
                } else {
                  outStream.write("$line\n");
                }
              }, onDone: () {
                outStream.close();
                outStream.done.then((_) {
                  completer.complete(true);
                });
              }, onError: (e) {
                completer.completeError(e);
              });
      }
    });

    return completer.future;
  }

  /**
   * Writes the specified initBlockType from the .egb file
   * (and its imports TODO) to the OutputStream.
   *
   * @param dartOutStream Stream to be written to.
   * @param initBlockType The type of blocks whose contents we want to copy.
   * @param indent  Whitespace indent.
   * @return    Future of bool. Always true.
   */
  Future<bool> writeInitBlocks(IOSink dartOutStream, int initBlockType,
                         {int indent: 0}) {
    var completer = new Completer();

    dartOutStream.write(varsGenerator.generateInitBlockCode());
    copyLineRanges(
        initBlocks.where((block) => block.type == initBlockType).toList(),
        inputEgbFile.openRead(),
        dartOutStream,
        inclusive:false, indentLength:indent)
    .then((_) {
      completer.complete(true);
    });

    return completer.future;
  }

  /// Special case of the [writeInitBlocks] method above that works on
  /// [BuilderInitBlock.BLK_DECLARE] blocks.
  Future writeDeclarations(IOSink dartOutStream, {int indent}) {
    var completer = new Completer();

    StringBuffer contents = new StringBuffer();
    copyLineRanges(
        initBlocks.where((block) => block.type == BuilderInitBlock.BLK_DECLARE)
          .toList(),
        inputEgbFile.openRead(),
        dartOutStream,
        inclusive: false, indentLength: indent,
        contentsCopyDestination: contents)
    .then((_) {
      varsGenerator = new VarsGenerator();
      varsGenerator.addSource(contents.toString());
      dartOutStream.write(varsGenerator.generatePopulateMethodCode());
      dartOutStream.write(varsGenerator.generateExtractMethodCode());
      completer.complete(true);
    });

    return completer.future;
  }

  /**
   * Writes all pages from the .egb file to to the OutputStream. Iterates
   * over all included blocks, taking care of the correct "conversion".
   * (E.g. a choice in .egb is written differently than in the resulting
   * Dart file.)
   *
   * @param dartOutStream Stream to be written to.
   * @return    Future. Always true.
   */
  Future writePagesToScripter(IOSink dartOutStream) {
    var completer = new Completer();

    if (pages.isEmpty) {
      return new Future.value(true);
    }  // TODO: unit test this

    String indent = "";
    Function write = (String msg) {
      dartOutStream.write("$indent$msg");
    };

    var inStream = inputEgbFile.openRead();
    int lineNumber = 0;
    BuilderPage curPage;
    int pageIndex = 0;
    BuilderBlock curBlock;
    int blockIndex;
    int subBlockIndex;
    int subBlockIndent;  // echo block indent

    // this is the main looping function
    Function handleLine = (String line) {
      // start page
      if (pageIndex < pages.length
          && lineNumber == pages[pageIndex].lineStart) {
        curPage = pages[pageIndex];
        blockIndex = 0;
        indent = _getIndent(4);
        write("pageMap[r\"\"\"${curPage.name}\"\"\"] = new EgbScripterPage(\n");
        write("  [\n");
      }

      // start of block
      if (curPage != null && !curPage.blocks.isEmpty && blockIndex < curPage.blocks.length
          && lineNumber == curPage.blocks[blockIndex].lineStart) {
        indent = _getIndent(10);
        curBlock = curPage.blocks[blockIndex];
        subBlockIndex = 0;
        String commaOrNot = blockIndex < curPage.blocks.length - 1 ? "," : "";

        if (curBlock.type == BuilderBlock.BLK_TEXT) {
          if (curBlock.lineStart == curBlock.lineEnd) {
            write("\"\"\"${handleTrailingQuotes(line)}\"\"\"$commaOrNot\n");
          } else {
            write("\"\"\"$line\n");
          }
        }

        if (curBlock.type == BuilderBlock.BLK_TEXT_WITH_VAR) {
          write("() {\n");
          if (curBlock.lineStart == curBlock.lineEnd) {
            write("  echo(\"\"\"${handleTrailingQuotes(line)}\"\"\");\n");
            write("}$commaOrNot\n");
          } else {
            write("  echo(\"\"\"$line\n");
          }
        }

        if (curBlock.type == BuilderBlock.BLK_CHOICE_QUESTION) {
          var question = curBlock.options["question"];
          if (curBlock.lineStart == curBlock.lineEnd) {
            write("{\n");
            write("  \"question\": r\"\"\"${handleTrailingQuotes(line)}\"\"\"\n");
            write("}$commaOrNot\n");
          } else {
            write("{\n");
            write("  \"question\": r\"\"\"\"$line\n");
          }
        }

        if (curBlock.type == BuilderBlock.BLK_CHOICE_LIST) {
          write("[\n");

          var questionLineCount =
              curBlock.subBlocks.first.lineStart - curBlock.lineStart;

          if (questionLineCount == 0) {
            write("  null,\n");
          } else if (questionLineCount == 1) {
            write("  () => \"\"\"${handleTrailingQuotes(line)}\"\"\",\n");
          } else {
            write("  () => \"\"\"$line\n");
          }
        }

//        if (curBlock.type == BuilderBlock.BLK_CHOICE) {
//          var string = curBlock.options["string"];
//          var goto = curBlock.options["goto"];
//          write("{\n");
//          write("  \"string\": r\"\"\"${string != null ? string : ''} \"\"\",\n");
//          write("  \"goto\": r\"\"\"$goto\"\"\"\n");
//          write("}$commaOrNot\n");
//        }

//        if (curBlock.type == BuilderBlock.BLK_CHOICE_WITH_SCRIPT) {
//          var string = curBlock.options["string"];
//          var goto = curBlock.options["goto"];
//          var script = curBlock.options["script"];
//
//          write("() {\n");
//
//          if (string == null) {
//            // ex: "- [gotopage]"
//            if (script != null) {
//              write("  $script;\n");
//            }
//            if (goto != null) {
//              write("  goto(r\"\"\"$goto\"\"\");\n");
//            }
//          } else {
//            // ex: "- Go to there [{{time++}} page]"
//            write("  choices.add(new EgbChoice(\n");
//            write("      \"\"\"$string \"\"\",\n");
//            var commaAfterGoto = ( script != null ) ? "," : "";
//            write("      goto:r\"\"\"$goto\"\"\"$commaAfterGoto\n");
//            write("      then:() { $script; }\n");
//            write("  ));\n");
//          }
//
//          write("}$commaOrNot\n");
//        }

        if (curBlock.type == BuilderBlock.BLK_SCRIPT) {
          write("() {\n");
        }

      }

      // block line
      if (curPage != null && !curPage.blocks.isEmpty && blockIndex < curPage.blocks.length
          && _insideLineRange(lineNumber, curPage.blocks[blockIndex])) {
        curBlock = curPage.blocks[blockIndex];

        if ((curBlock.type == BuilderBlock.BLK_TEXT
            || curBlock.type == BuilderBlock.BLK_TEXT_WITH_VAR)
            && _insideLineRange(lineNumber, curBlock, inclusive:false)) {
          indent = _getIndent(0);
          write("$line\n");
        }

        if (curBlock.type == BuilderBlock.BLK_CHOICE_LIST &&
            _insideLineRange(lineNumber, curBlock, inclusive: true)) {

          if (lineNumber < curBlock.subBlocks.first.lineStart) {
            // we are still in Question territory
            if (lineNumber > curBlock.lineStart) {
              write("$line\n");
              if (lineNumber == curBlock.subBlocks.first.lineStart - 1) {
                write("\"\"\",\n");  // end multiline question
              }
            }
          } else {
            var choiceSubBlock = curBlock.subBlocks.firstWhere((block) =>
                  _insideLineRange(lineNumber, block, inclusive: true),
                  orElse: () => null);

            if (choiceSubBlock != null &&
                choiceSubBlock.lineStart == lineNumber /* don't duplicate multiline blocks */) {
              write("{\n");
              var lines = new List<String>();
              if (choiceSubBlock.options["string"] != null) {
                // TODO: don't use when not needed (no variable)
                lines.add("  \"string\": () => \"\"\"${handleTrailingQuotes(choiceSubBlock.options["string"])}\"\"\"");
              }
              if (choiceSubBlock.options["goto"] != null) {
                lines.add("  \"goto\": r\"\"\"${handleTrailingQuotes(choiceSubBlock.options["goto"])}\"\"\"");
              }
              if (choiceSubBlock.options["script"] != null) {
                lines.add("  \"script\": () {${choiceSubBlock.options["script"]};}");
              }
              write(lines.join(",\n"));
              write("}${lineNumber != curBlock.lineEnd ? "," : ""}\n");
            }
          }
        }



        if (curBlock.type == BuilderBlock.BLK_CHOICE_QUESTION
            && _insideLineRange(lineNumber, curBlock, inclusive:false)) {
          indent = _getIndent(0);
          write("$line\n");
        }

        if (curBlock.type == BuilderBlock.BLK_SCRIPT
            && _insideLineRange(lineNumber, curBlock, inclusive:false)) {
          indent = _getIndent(0);

          bool needsToBeHandled = true;
          // check for <echo>
          if (subBlockIndex < curBlock.subBlocks.length) {
            var curSubBlock = curBlock.subBlocks[subBlockIndex];
            if (_insideLineRange(lineNumber, curSubBlock, inclusive:true)) {
              if (lineNumber == curSubBlock.lineStart) {
                // ignore the <echo> line, but get indenting
                subBlockIndent = line.indexOf("<");
                write("echo(\"\"\"");
              } else if (lineNumber < curSubBlock.lineEnd) {
                if (line.startsWith(_getIndent(subBlockIndent + 2))) {
                  // get rid of indenting
                  write("${line.substring(subBlockIndent + 2)}\n");
                } else {
                  write("$line\n");
                }
              } else {
                write("\"\"\");\n");
                subBlockIndex++;
              }
              needsToBeHandled = false;
            }
          }

          // script line, copy
          if (needsToBeHandled) {
            write("$line\n");
          }
        }
      }

      // end of block
      if (curPage != null && !curPage.blocks.isEmpty && blockIndex < curPage.blocks.length
          && lineNumber == curPage.blocks[blockIndex].lineEnd) {
        String commaOrNot = blockIndex < curPage.blocks.length - 1 ? "," : "";

        if (curBlock.type == BuilderBlock.BLK_TEXT) {
          if (curBlock.lineStart != curBlock.lineEnd) {
            indent = _getIndent(0);
            write("${handleTrailingQuotes(line)}\"\"\"$commaOrNot\n");
          }
        }

        if (curBlock.type == BuilderBlock.BLK_TEXT_WITH_VAR) {
          if (curBlock.lineStart != curBlock.lineEnd) {
            indent = _getIndent(0);
            write("${handleTrailingQuotes(line)}\"\"\");\n");
            indent = _getIndent(8);
            write("}$commaOrNot\n");
          }
        }

        if (curBlock.type == BuilderBlock.BLK_CHOICE_LIST) {
          indent = _getIndent(8);
          write("]\n$commaOrNot");
        }

        if (curBlock.type == BuilderBlock.BLK_CHOICE_QUESTION) {
          if (curBlock.lineStart != curBlock.lineEnd) {
            indent = _getIndent(0);
            write("${handleTrailingQuotes(line)}\"\"\"\n");
            indent = _getIndent(8);
            write("}$commaOrNot\n");
          }
        }

        if (curBlock.type == BuilderBlock.BLK_CHOICE) {
        }

        if (curBlock.type == BuilderBlock.BLK_SCRIPT) {
          indent = _getIndent(8);
          write("}$commaOrNot\n");
        }

        blockIndex++;
        curBlock = null;
      }


      // end page
      if (pageIndex < pages.length && lineNumber == pages[pageIndex].lineEnd) {
        // end blocks
        if (curPage.options.isEmpty) {
          write("]\n");
        } else {
          write("],\n");
          write(
              curPage.options.map((optName) => "$optName: true")
              .join(", ")
          );
        }
        indent = _getIndent(4);
        write(");\n");

        if (pageIndex == pages.length - 1) {
          // that was all of pageMap, now add firstPage and we're done here
          write("");
          write("firstPage = pageMap[r\"\"\"${pages[0].name}\"\"\"];");
        }

        pageIndex++;
        curPage = null;
      }

    };

    inStream.transform(UTF8.decoder)
            .transform(new LineSplitter())
            .listen((String line) {
              lineNumber++;
              handleLine(line);
            }, onDone: () {
              completer.complete(true);
            }, onError: (e) {
              completer.completeError(e);
            });

    return completer.future;
  }

  /**
   * Checks if string has a trailing [:":] char. If so, it is appended with
   * a space.
   *
   * The reason for this is that the Builder will surround the string with
   * triple quotes ([:""":]). A trailing quote in the (already) quoted string
   * will mean a quadruple quote ([:"""":]) which is interpreted by Dart
   * as the ending triple quote plus a hanging single quote.
   */
  String handleTrailingQuotes(String string) {
    if (string.endsWith('"')) {
      return "$string ";
    } else {
      return string;
    }
  }

  /**
   * Gets lines from inStream and dumps them to outStream.
   *
   * Provide [contentsCopyDestination] if you want to get back the actual
   * contents of those lines.
   *
   * @param lineRanges  A collection of line ranges that need to be copied.
   * @param inStream  The input stream.
   * @param outStream The output stream.
   * @param inclusive Should the starting and ending lines in the lineRanges
   *                  be included?
   * @param indentLength  Whitespace indent.
   * @return  Future of bool. Always true.
   */
  Future<bool> copyLineRanges(List<BuilderLineRange> lineRanges,
      Stream<List<int>> inStream, IOSink outStream,
      {bool inclusive: true, int indentLength: 0,
        StringBuffer contentsCopyDestination}) {
    var completer = new Completer();
    outStream.write("\n");
    var indent = _getIndent(indentLength);

    int lineNumber = 0;
    inStream
        .transform(UTF8.decoder)
        .transform(new LineSplitter())
        .listen((line) {
          lineNumber++;

          // if lineNumber is in one of the ranges, write
          if (lineRanges.any((var range) => _insideLineRange(lineNumber, range, inclusive:inclusive))) {
            outStream.write("$indent$line\n");
            if (contentsCopyDestination != null) {
              contentsCopyDestination.writeln(line);
            }
          }
        }, onDone: () {
          outStream.write("\n");
          completer.complete(true);
        }, onError: (e) {
          completer.completeError(e);
        });

    return completer.future;
  }

  /**
   * Gets path for the file with specified extension. Therefore, calling
   * [:getPathFor('graphml'):] for [:path/to/example.egb:] will return
   * [:path/to/example.graphml:].
   */
  String getPathForExtension(String extension) {
    //Path inputFilePath = new Path(inputEgbFileFullPath);
    return path.join(path.dirname(inputEgbFileFullPath),
        "${path.basenameWithoutExtension(inputEgbFileFullPath)}.$extension");
  }

  /**
   * Writes GraphML file from current Builder object.
   **/
//  Future<bool> writeGraphMLFile() {
//    var completer = new Completer();
//
//    var pathToOutputGraphML = getPathFor("graphml");
//    File graphmlOutputFile = new File.fromPath(pathToOutputGraphML);
//    IOSink graphmlOutStream = graphmlOutputFile.openWrite();
//
//    try {
//      updateGraphML();
//      graphmlOutStream.write(graphML.toString());
//    } on Exception catch (e) {
//      throw e;
//    } finally {
//      graphmlOutStream.close();
//      graphmlOutStream.done.then((_) {
//        completer.complete(true);
//      });
//    }
//
//    return completer.future;
//  }

  /**
   * Builds the [graphML] structure from the current Builder instance.
   **/
//  void updateGraphML() {
//    graphML = new GraphML();
//
//    // create group nodes
//    Map<String, Node> pageGroupNodes = new Map<String, Node>();
//    for (int i = 0; i < pageGroups.length; i++) {
//      var node = new Node(pageGroups[i].name);
//      pageGroupNodes[pageGroups[i].name] = node;
//      graphML.addGroupNode(node);
//    }
//
//    // create nodes
//    Map<String, Node> pageNodes = new Map<String, Node>();
//    for (int i = 0; i < pages.length; i++) {
//      var node = new Node(pages[i].nameWithoutGroup);
//      pageNodes[pages[i].name] = node;
//      if (pages[i].group != null) {
//        node.parent = pageGroupNodes[pages[i].groupName];
//      }
//      graphML.addNode(node);
//    }
//
//    // create graph edges
//    for (int i = 0; i < pages.length; i++) {
//      BuilderPage page = pages[i];
//      for (int j = 0; j < page.gotoPageNames.length; j++) {
//        String gotoHandle = page.gotoPageNames[j];
//
//        if (pageHandles.containsKey("${page.groupName}: $gotoHandle")) {
//          graphML.addEdge(
//              pageNodes[page.name],
//              pageNodes["${page.groupName}: $gotoHandle"]);
//        } else if (pageHandles.containsKey(gotoHandle)) {
//            graphML.addEdge(
//                pageNodes[page.name],
//                pageNodes[gotoHandle]);
//        } else {
//          WARNING( "Choice links to a non-existent page ('$gotoHandle')"
//                " in page ${page.name}. Creating new page/node.");
//
//          var newPage = new BuilderPage(gotoHandle, pages.length);
//          var node = new Node(newPage.nameWithoutGroup);
//          pageNodes[newPage.name] = node;
//          if (newPage.group != null) {
//            node.parent = pageGroupNodes[newPage.groupName];
//          }
//          graphML.addNode(node);
//
//          graphML.addEdge(
//              pageNodes[page.name],
//              pageNodes[newPage.name]);
//        }
//      }
//    }
//
//    graphML.updateXml();
//  }

  /**
   * Opens the .graphml file, updates [graphML] from it, then calls
   * [updateFromGraphML()].
   */
//  Future<bool> updateFromGraphMLFile() {
////    Completer completer = new Completer();
//
//    var pathToInputGraphML = getPathFor("graphml");
//    File graphmlInputFile = new File.fromPath(pathToInputGraphML);
//
//    graphML = new GraphML.fromFile(graphmlInputFile); // TODO: make async!
//
//    updateFromGraphML();
//    return new Future.immediate(true);
//  }
//
//  /**
//   * Updates the Builder instance from the current state of [graphML].
//   */
//  void updateFromGraphML() {
//    // populate map of all nodes in graph
//    Map<String, Node> nodesToAdd = new Map<String, Node>();
//    for (var node in graphML.nodes) {
//      nodesToAdd[node.fullText] = node;
//    }
//
//    // walk the existing Builder instance
//    for (int i = 0; i < pages.length; i++) {
//      BuilderPage page = pages[i];
//      bool pageStays = nodesToAdd.containsKey(page.name);
//      if (pageStays) {
//        Node node = nodesToAdd[page.name];
//
//        // populate map of all linked nodes in graphml
//        Set<Node> linkedNodesToAdd = new Set<Node>.from(node.linkedNodes);
//        Map<String, Node> linkedPageFullNamesToAdd = new Map<String, Node>();
//        for (var node in linkedNodesToAdd) {
//          linkedPageFullNamesToAdd[node.fullText] = node;
//        }
//
//        // create set of gotoPageNames to be deleted
//        Set<String> gotoPageNamesToDelete = new Set<String>();
//
//        // walk through goto links in egb
//        for (var gotoPageName in page.gotoPageNames) {
//          // make sure
//          bool linkStays = linkedPageFullNamesToAdd.containsKey(gotoPageName);
//          if (linkStays) {
//            var linkedNode = linkedPageFullNamesToAdd[gotoPageName];
//            linkedNodesToAdd.remove(linkedNode);
//          } else {
//            gotoPageNamesToDelete.add(gotoPageName);
//          }
//        }
//
//        // delete excesive gotos
//        page.gotoPageNames = page.gotoPageNames
//                       .where((name) => !gotoPageNamesToDelete.contains(name)).toList();
//
//        // add remaining linked nodes
//        for (var linkedNode in linkedNodesToAdd) {
//          page.gotoPageNames.add(linkedNode.fullText);
//        }
//      } else {
//        page.commentOut = true;
//      }
//
//      // remove the node from "stack" if it's there
//      nodesToAdd.remove(page.name);
//    }
//
//    // TODO: add new groupNodes
//
//    // add remaining nodes
//    nodesToAdd.forEach((String fullText, Node node) {
//
//      int newIndex = pages.last.index + 1;
//      var newPage = new BuilderPage(fullText, newIndex);
//      pageHandles[fullText] = newIndex;
//      node.linkedNodes.forEach(
//          (linkedPage) => newPage.gotoPageNames.add(linkedPage.fullText)); // TODO: no need to fully qualify sometimes
//      pages.add(newPage);
//    });
//  }

  /**
   * Updates the .egb file according to the current state of the Builder
   * instance.
   */
  Future<Builder> updateEgbFile() {
    var completer = new Completer();

    var tempFile = new File(getPathForExtension("egb~"));
    File outputEgbFile;

    var tempInStream = inputEgbFile.openRead();
    tempInStream.pipe(tempFile.openWrite())
    .then((_) {
      outputEgbFile = inputEgbFile;
      inputEgbFile = tempFile;
      var rawInputStream = inputEgbFile.openRead();
      var outStream = outputEgbFile.openWrite();

      if (pages.length == 0) {
        // right now, we can only update pages, so a file without pages stays the same
        rawInputStream.pipe(outStream);
      } else {
        var inStream = rawInputStream
                       .transform(UTF8.decoder)
                       .transform(new LineSplitter());

        // TODO: rewrite based on logical structure (i.e. insert new pages where they belong)

        int lineNumber = 0;
        BuilderPage page;
        Set<BuilderPage> pagesToAdd = new Set.from(pages);
        Set<String> gotoPageNamesToAdd;
        inStream.listen((String line) {
          lineNumber++;

          if (page != null && page.lineEnd < lineNumber) {
            // add remaining gotos
            bool addingPages = !gotoPageNamesToAdd.isEmpty;
            for (var gotoPageName in gotoPageNamesToAdd) {
              outStream.write(
                  "- $gotoPageName (AUTO) [$gotoPageName]\n");
            }
            if (addingPages) outStream.write("\n");
            page = null;
            gotoPageNamesToAdd = null;
          }

          if (page == null) {
            for (var candidate in pages) {
              if (_insideLineRange(lineNumber, candidate)) {
                page = candidate;
                pagesToAdd.remove(page);
                gotoPageNamesToAdd = new Set.from(page.gotoPageNames);
                break;
              }
            }
          }

          if (page != null) {
            // find out if this line has a goto, if so, remove from pageNamesToAdd
            String goto;
            Match m = oneLineChoice.firstMatch(line);
            if (m != null) {
              goto = m.group(3); // TODO: make this into a function, DRY
            } else {
              m = gotoInsideScript.firstMatch(line);
              if (m != null) {
                goto = m.group(2);
              }
            }
            if (goto != null) {
              if (page.gotoPageNames.any((gotoPageName) => gotoPageName == goto)
                  || page.gotoPageNames.any((gotoPageName) => gotoPageName == "${page.groupName}: $goto")) {
                outStream
                  ..write(line)
                  ..write("\n");
                gotoPageNamesToAdd.remove(goto);
                gotoPageNamesToAdd.remove("${page.groupName}: $goto");
              } else {
                // choiceBlock shouldn't be here, to be deleted => do not copy
              }
            } else {
              // normal line, just copy
              outStream
                ..write(line)
                ..write("\n");
            }
          } else {
            // outside any page - just copy
            outStream
              ..write(line)
              ..write("\n");
          }

        }, onDone: () {
          for (var page in pagesToAdd) {
            outStream
            ..write("\n---\n")
            ..write(page.name)
            ..write("\n\n");

            for (var gotoPageName in page.gotoPageNames) {
              outStream.write(
                  "- $gotoPageName (AUTO) [$gotoPageName]\n");
            }
          }

          outStream.close();
          outStream.done.then((_) {
            // TODO: delete egb~
            inputEgbFile.delete();
            inputEgbFile = outputEgbFile;

            new Builder().readEgbFile(inputEgbFile).then((Builder b) {
              completer.complete(b);;
            });
          });
        }, onError: (e) {
          completer.completeError(e);
        });
      }
    });

    return completer.future;
  }

  /**
   * Helper function creates a string of a given number of spaces. Useful
   * for indentation.
   *
   * @param len Number of spaces to return.
   * @return  The string, e.g. `"    "` for [_getIndent(4)].
   */
  String _getIndent(int len) {
    var strBuf = new StringBuffer();
    for (int i = 0; i < len; i++) {
      strBuf.write(" ");
    }
    return strBuf.toString();
  }

  /**
   * Returns true if given [lineNumber] is in given [range] of lines.
   *
   * @param lineNumber  Line number to check.
   * @param range Range of lines in question.
   * @param inclusive Whether or not to include the starting and ending
   *                  lines of the range in the computation.
   * @return True if line is inside range or if range has no lineStart and
   *                  lineEnd.
   */
  bool _insideLineRange(int lineNumber, BuilderLineRange range,
                        {bool inclusive: true}) {
    if (range.lineStart == null && range.lineEnd == null) {
      return false;
    }
    if (range.lineEnd == null) {
      throw "Range with lineStart == ${range.lineStart} has lineEnd == null "
            "in file $inputEgbFileFullPath.";
    }
    if (lineNumber >= range.lineStart
        && lineNumber <= range.lineEnd) {
      if (inclusive) {
        return true;
      } else if (lineNumber != range.lineStart
              && lineNumber != range.lineEnd) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  final String implStartFile = """
library Scripter_Implementation;

import 'package:egamebook/scripter.dart';
import 'dart:isolate';
""";

  final String implStartClass = """

class ScripterImpl extends EgbScripter {

  /* LIBRARY */
""";

  final String implStartCtor = """
  ScripterImpl() : super() {
""";

  final String implStartPages = """
    /* PAGES & BLOCKS */
""";

  final String implEndPages = """
    
""";

  final String implEndCtor = """
  }
""";

  final String implStartInit = """
  /* INIT */
  void initBlock() {
""";

  final String implEndInit = """
  }
""";

  final String implEndClass = """
}
""";

  final String implEndFile = """

// The entry point of the isolate.
void main(List<String> args, SendPort mainIsolatePort) {
  EgbInterfaceProxy interface = new EgbIsolateInterfaceProxy(mainIsolatePort);
  EgbScripter book = new ScripterImpl();
  book.setInterface(interface);
}
""";


  // These are available modes for the [mode] variable.
  static int MODE_NORMAL = 1;
  @deprecated
  static int MODE_INSIDE_CLASSES = 2;
  @deprecated
  static int MODE_INSIDE_FUNCTIONS = 4;
  @deprecated
  static int MODE_INSIDE_VARIABLES = 8;
  static int MODE_INSIDE_SCRIPT_ECHO = 16;
  static int MODE_INSIDE_SCRIPT_TAG = 32;
  static int MODE_METADATA = 64;
  static int MODE_INSIDE_CHOICE = 128;
  static int MODE_INSIDE_DECLARE = 256;
  static int MODE_INSIDE_INIT = 512;

  /// This makes sure the parser remembers where it is during reading the file.
  int _mode;

  /// Public getter for _mode.
  int get mode => _mode;
  /// Public setter for _mode. This is here for unit testing only.
  set mode(int value) => _mode = value;

  int _lineNumber;  // TODO: Because checking is async right now, this
                    // is only an _unreliable_ way of getting actual line number
  int _pageNumber;
  int _blockNumber;

  //String _thisLine;

  /** used to communicate problems to caller */
  List<String> warningLines;

  void WARNING(String msg, {int line: null}) {
    if (line == null) {
      line = _lineNumber;
    }
    String str = (line == null) ? msg : "$msg (line:$line)";

    print(str);
    warningLines.add(str);
  }
}
