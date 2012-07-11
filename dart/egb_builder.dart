#library("egb_builder");

#import('dart:io');

class EgbFormatException implements Exception {
  String msg;
  EgbFormatException([String this.msg]) {
  }

  String toString() {
    return msg;
  }
}

class BuilderPage {
  int index;
  int lineStart;
  int lineEnd;
  String name;
  List<String> options;
  List<BuilderBlock> blocks;

  BuilderPage(this.name, this.index, [this.lineStart]) {
    blocks = new List<BuilderBlock>();
    options = new List<String>();
  }
}

class BuilderBlock {
  int lineStart;
  int lineEnd;
  int type = 0;
  List<String> lines;
  Map<String,Dynamic> options;

  static final int BLK_TEXT = 1;
  static final int BLK_SCRIPT = 2;
  static final int BLK_CHOICE = 4;
  static final int BLK_TEXT_WITH_VAR = 8;
  static final int BLK_CHOICE_QUESTION = 16;
  static final int BLK_CHOICE_IN_SCRIPT = 32;

  BuilderBlock() {
    lines = new List<String>();
    options = new Map<String,Dynamic>();
  }

  void endWithLine(int lineNumber) {
    lineEnd = lineNumber;
  }
}

class Builder {

  Builder() {
    pages = new List<BuilderPage>();
    pageHandles = new Map<String,int>();
    initLines = new List<String>();
    libraryLines = new List<String>();
    classesLines = new List<String>();

    warningLines = new List<String>();
  }

  /**
    * Main workhorse, reads and parses file to intermediary structure.
    * When the returning Future is ready, use can call [writeFiles()].
    */
  Future<Builder> readFile(File f) {
    var completer = new Completer();

    f.exists()
    .then((exists) {
      if (!exists)
        completer.completeException(new FileIOException("File ${f.name} doesn't exist."));
      else {
        var strInputStream = new StringInputStream(f.openInputStream());

        print("Reading input file ${f.name}");

        // This makes sure the parser remembers where it is during reading the file.
        _mode = _MODE_NORMAL;

        _lineNumber = 0;
        _pageNumber = 0;
        _blockNumber = 0;

        strInputStream.onLine = () {
          _check().then((_) {
            _lineNumber++;
            _prevLine = _thisLine;
            _thisLine = strInputStream.readLine();
            //stdout.writeString(".");
          });
        };

        strInputStream.onClosed = () {
          _check().then((_) {  // check last line
            //print("\nReading input file has finished.");

            _lineNumber = null;  // makes sure following warnings don't get associated with the last line


            if (pages.isEmpty())
              WARNING("There are no pages in this egb. If you want it to be playable, "
                      "you will need to include page starts in the form of a line "
                      "containing exclusively dashes (`-`, three or more) and "
                      "an immediately following line with the name of the page.");

            if (_mode != _MODE_NORMAL) {
              completer.completeException(
                new EgbFormatException("Corrupt file, didn't close a tag (_mode = ${_mode})."));
            } else {
              completer.complete(this);
            }
          });
        };
      }
    });

    return completer.future;
  }

  /**
    * This method takes care of checking each new line.
    */
  Future<bool> _check() {
    var completer = new Completer();

    // start finding every pattern at once, in a non-blocking way
    Futures.wait([
        _checkBlankLine(),
        _checkNewPage(),
        _checkPageOptions(),
        _checkChoice(),
        _checkInitBlocks()
    ]).then((List<bool> checkValues) {
      if (checkValues.every((value) => value == false)) {
        // normal paragraph
        _checkNormalParagraph()
        .then((_) => completer.complete(true));
      } else {
        completer.complete(true);
      }
    });

    return completer.future;
  }


  /*
  Checkers.
  */

  Future<bool> _checkBlankLine() {
    if (_mode != _MODE_NORMAL)
      return new Future.immediate(false);

    if (_thisLine == null || _thisLine == "" || blankLine.hasMatch(_thisLine)) {
      // close previous unfinished text block if any
      if (!pages.isEmpty()) {
        var lastpage = pages.last();
        if (!lastpage.blocks.isEmpty()) {
          var lastblock = lastpage.blocks.last();
          if (lastblock.type == BuilderBlock.BLK_TEXT
              || lastblock.type == BuilderBlock.BLK_TEXT_WITH_VAR) {
            if (lastblock.lineEnd == null)
              lastblock.endWithLine(_lineNumber - 1);
          }
        }
      }
      return new Future.immediate(true);
    } else {
      return new Future.immediate(false);
    }
  }

  Future<bool> _checkNewPage() {
    if (_mode != _MODE_NORMAL || _prevLine == null || _thisLine == null)
      return new Future.immediate(false);

    if (hr.hasMatch(_prevLine) && validPageName.hasMatch(_thisLine)) {
      // discard the "---" from any previous blocks
      if (pages.isEmpty()) {
        // TODO: solve for synopsis
      } else {
        var lastpage = pages.last();
        if (!lastpage.blocks.isEmpty()) {
          var lastblock = lastpage.blocks.last();
          if (!lastblock.lines.isEmpty()) {
            var lastline = lastblock.lines.last();
            if (hr.hasMatch(lastline)) {  // this should always be true, but let's make sure
              lastblock.lines.removeLast();
              if (lastblock.lines.isEmpty())
                lastpage.blocks.removeLast();
              else if (lastpage.blocks.last().lineEnd == null)
                lastpage.blocks.last().endWithLine(_lineNumber - 2);
            }
          }
        }
      }
      // add the new page
      var name = validPageName.firstMatch(_thisLine).group(1);
      pageHandles[name] = _pageNumber;
      pages.add(new BuilderPage(name, _pageNumber++, _lineNumber));
      return new Future.immediate(true);
    } else {
      return new Future.immediate(false);
    }
  }

  Future<bool> _checkPageOptions() {
    if (_mode != _MODE_NORMAL || _prevLine == null || _thisLine == null)
      return new Future.immediate(false);

    if (!pages.isEmpty() && pages.last().lineStart == _lineNumber - 1
        && pageOptions.hasMatch(_thisLine)) {
      Match m = pageOptions.firstMatch(_thisLine);
      var lastpage = pages.last();
      for (var i = 1; i <= m.groupCount(); i += 2) {
        var opt = m.group(i);
        if (opt != null)
          lastpage.options.add(opt);
      }
      return new Future.immediate(true);
    } else {
      return new Future.immediate(false);
    }
  }

  Future<bool> _checkChoice() {
    if (_prevLine == null || _thisLine == null || pages.isEmpty()
        || (_mode != _MODE_NORMAL && _mode != _MODE_INSIDE_SCRIPT_ECHO))
      return new Future.immediate(false);

    if (choice.hasMatch(_thisLine)) {

      var block = new BuilderBlock();

      Match m = choice.firstMatch(_thisLine);
      /*for (int i = 1; i <= m.groupCount(); i++) {*/
        /*print("$i - \"${m.group(i)}\"");*/
      /*}*/
      block.options["string"] = m.group(1);
      block.options["script"] = m.group(2);
      block.options["goto"] = m.group(3);

      // trim the strings
      block.options.forEach((var k, var v) {
        if (v != null)
          block.options[k] = block.options[k].trim();
      });

      bool hasVarInString = (block.options["string"] != null
          && variableInText.hasMatch(block.options["string"]));

      if (block.options["script"] == null && block.options["goto"] == null) {
        WARNING("Choice in the form of `- something []` is illegal. There must be "
              "a script and/or a goto specified.");
        return new Future.immediate(false);
      }

      if (block.options["script"] != null
          && const RegExp(@"^[^{]+}").hasMatch(block.options["script"])) {
        WARNING("Choice can only have one script defined. Looks like you tried to write "
              "a choice in the form of `- something [{{something}} {{something else}}]`. "
              "Actual format used: `$_thisLine`.");
        return new Future.immediate(false);
      }

      if (_mode == _MODE_INSIDE_SCRIPT_ECHO) {
        // TODO: just add a _choiceToScript(block) to the current script flow
      } else if (_mode == _MODE_NORMAL && block.options["script"] == null && !hasVarInString) {
        // we have a simple choice (i.e. no scripts needed)
        block.type = BuilderBlock.BLK_CHOICE;
        block.endWithLine(_lineNumber);  // choice blocks are always one-liners in egb
        pages.last().blocks.add(block);
      } else {
        // the choice will need to be rewritten into a standalone script (closure)
        block.type = BuilderBlock.BLK_CHOICE_IN_SCRIPT;
        block.endWithLine(_lineNumber);  // choice blocks are always one-liners in egb
        pages.last().blocks.add(block);
      }

      // if the previous line is a text block, then that textblock needs to be
      // a BLK_CHOICE_QUESTION.
      var lastpage = pages.last();
      if (!lastpage.blocks.isEmpty()) {
        var lastblock = lastpage.blocks.last();
        if (lastblock.lineEnd == null) {
          lastblock.endWithLine(_lineNumber - 1);
          lastblock.type = BuilderBlock.BLK_CHOICE_QUESTION;
        }
      }

      return new Future.immediate(true);
    } else {
      return new Future.immediate(false);
    }
  }

  Future<bool> _checkInitBlocks() {
    if (_mode == _MODE_INSIDE_SCRIPT_TAG || _thisLine == null)
      return new Future.immediate(false);

    var completer = new Completer();

    Match m = initBlockTag.firstMatch(_thisLine);

    if (m != null) {
      bool closing =  m.group(1) == "/";
      var blocktype = m.group(2).toLowerCase();
      if (!closing) {  // opening a new tag
        if (_mode == _MODE_NORMAL) {
          // TODO: case(blocktype)
          _mode = _MODE_INSIDE_CLASSES;
          completer.complete(true);
        } else {
          completer.completeException(
            new EgbFormatException("Invalid appearance of of an init "
                  "opening tag `<$blocktype>`. We are already inside "
                  "another tag (mode = $_mode). (line:$_lineNumber)"));
        }
      } else {  // closing a tag
        if (_mode == _MODE_INSIDE_CLASSES /* TODO: and others*/) {
          _mode = _MODE_NORMAL;
          completer.complete(true);
        } else {
          completer.completeException(
            new EgbFormatException("Invalid appearance of of an init "
                  "closing tag `</$blocktype>`. We are not inside any "
                  "other tag (mode = $_mode). (line:$_lineNumber)"));
        }
      }
    } else {
      if (_mode == _MODE_INSIDE_CLASSES /*TODO add others*/) {
        classesLines.add(_thisLine);
        completer.complete(true);
      } else {
        completer.complete(false);
      }
    }

    return completer.future;
  }

  Future<bool> _checkNormalParagraph() {
    if (_mode != _MODE_NORMAL || _thisLine == null)
      return new Future.immediate(false);

    if (pages.isEmpty()) {
      // TODO: solve for synopsis
    } else {
      // we have a new block inside a page!
      var lastpage = pages.last();
      bool appending = false;

      if (!lastpage.blocks.isEmpty()) {
        var lastblock = lastpage.blocks.last();
        if (lastblock.lineEnd == null
            && (lastblock.type == BuilderBlock.BLK_TEXT
            || lastblock.type == BuilderBlock.BLK_TEXT_WITH_VAR)) {
          // we have an unfinished text block that we can append to
          appending = true;
          lastblock.lines.add(_thisLine);
          if (variableInText.hasMatch(_thisLine)) {
            lastblock.type = BuilderBlock.BLK_TEXT_WITH_VAR;
          }
        }
      }

      if (!appending) {
        // we create a new block
        var block = new BuilderBlock();
        if (variableInText.hasMatch(_thisLine)) {
          block.type = BuilderBlock.BLK_TEXT_WITH_VAR;
        } else {
          block.type = BuilderBlock.BLK_TEXT;
        }
        block.lines.add(_thisLine);
        lastpage.blocks.add(block);
      }
    }

    return new Future.immediate(true);
  }


  List<BuilderPage> pages;
  Map<String, int> pageHandles;
  List<String> initLines;
  List<String> libraryLines;
  List<String> classesLines;

  RegExp blankLine = const RegExp(@"^\s*$");
  RegExp hr = const RegExp(@"^\s{0,3}\-\-\-+\s*$"); // ----
  RegExp validPageName = const RegExp(@"^\s{0,3}(.+)\s*$");
  RegExp pageOptions = const RegExp(@"^\s{0,3}\[\[\s*(\w+)([\s,]+(\w+))*\s*]\]\s*$");
  RegExp scriptTagStart = const RegExp(@"^\s{0,3}<script>\s*$");
  RegExp scriptTagEnd = const RegExp(@"^\s{0,3}</script>\s*$");
  /*RegExp initTagStart = const RegExp(@"^\s{0,3}<init>\s*$");*/
  /*RegExp initTagEnd = const RegExp(@"^\s{0,3}</init>\s*$");*/
  /*RegExp libraryTagStart = const RegExp(@"^\s{0,3}<library>\s*$");*/
  /*RegExp libraryTagEnd = const RegExp(@"^\s{0,3}</library>\s*$");*/
  /*RegExp classesTagStart = const RegExp(@"^\s{0,3}<classes>\s*$");*/
  /*RegExp classesTagEnd = const RegExp(@"^\s{0,3}</classes>\s*$");*/
  RegExp initBlockTag = const RegExp(@"^\s{0,3}<\s*(/?)\s*((?:classes)|(?:functions)|(?:variables))\s*>\s*$", ignoreCase:true);
  RegExp choice = const RegExp(@"^\s{0,3}\-\s+(?:(.+)\s+)?\[\s*(?:\{\{\s*(.+)\s*\}\})?[\s,]*([^\{][^\{].+)?\s*\]\s*$");
  RegExp variableInText = const RegExp(@"[^\\]\$[a-zA-Z_][a-zA-Z0-9_]*|[^\\]\${[^}]+}");


  /**
    * Writer method.
    */
  Future<bool> writeFiles() {



  }

  Future<bool> writeBlock(BuilderBlock block, OutputStream out) {
        // Block is a normal BLK_CHOICE - output is a Map
        /*
        block.lines = [
            "{",
            "  \"string\": \"\"\"${string != null ? string : ''}\"\"\",",
            "  \"goto\": \"\"\"$goto\"\"\"",
            "}"
        ];
        */

  }

  final String implStartFile = """
  #library('Scripter Implementation');

  #import('../egb_library.dart');
  """;

  final String implStartClass = """
  class ScripterImpl extends Scripter {

    /* LIBRARY */
  """;

  final String implStartCtor = """
    ScripterImpl() : super() {
  """;

  final String implStartPages = """
      pages = [
        /* PAGES & BLOCKS */
  """;

  final String implEndPages = """
      ];
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
  """;




  // These are available modes for the [mode] variable.
  static int _MODE_NORMAL = 1;
  static int _MODE_INSIDE_CLASSES = 2;
  static int _MODE_INSIDE_LIBRARY = 4;
  static int _MODE_INSIDE_INIT = 8;
  static int _MODE_INSIDE_SCRIPT_ECHO = 16;
  static int _MODE_INSIDE_SCRIPT_TAG = 32;
  // This makes sure the parser remembers where it is during reading the file.
  int _mode;


  int _lineNumber;
  int _pageNumber;
  int _blockNumber;

  String _thisLine;
  String _prevLine;


  /** used to communicate problems to caller */
  List<String> warningLines;

  void WARNING(String msg) {
    print("$msg (line:$_lineNumber)");
    warningLines.add("$msg (line:$_lineNumber)");
  }
}
