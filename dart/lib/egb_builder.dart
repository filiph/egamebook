#library("egb_builder");

#import('dart:io');

class EgbFormatException implements Exception {
  String msg;
  int line;
  File file;
  EgbFormatException([String this.msg, this.line, this.file]) {
  }

  String toString() {
    StringBuffer strBuf = new StringBuffer();
    strBuf.add("Format exception");
    if (line != null) {
      strBuf.add(" on line [$line]");
    }
    if (file != null) {
      strBuf.add(" in file ${file.name}");
    }
    strBuf.add(": ");
    strBuf.add(msg);
    return strBuf.toString();
  }
}

interface BuilderLineRange {
  int lineStart;
  int lineEnd;
}

class BuilderLineSpan implements BuilderLineRange { // XXX: this should be super-class of the below, but Dart is broken here
  int lineStart;
  int lineEnd;

  BuilderLineSpan({this.lineStart});

  get isClosed => lineStart != null && lineEnd != null && lineStart <= lineEnd;
}

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

class BuilderPage implements BuilderLineRange {
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

  String toString() {
    return "BuilderPage <$name> [$lineStart:$lineEnd]";
  }
}

class BuilderBlock implements BuilderLineRange {
  int lineStart;
  int lineEnd;
  int type = 0;
  Map<String,Dynamic> options;
  List<BuilderLineSpan> subBlocks;

  static final int BLK_TEXT = 1;
  static final int BLK_SCRIPT = 2;
  static final int BLK_CHOICE = 4;
  static final int BLK_TEXT_WITH_VAR = 8;
  static final int BLK_CHOICE_QUESTION = 16;
  static final int BLK_CHOICE_IN_SCRIPT = 32;

  BuilderBlock({this.lineStart}) {
    options = new Map<String,Dynamic>();
    subBlocks = new List<BuilderLineSpan>();
  }
}

class BuilderInitBlock implements BuilderLineRange {
  int lineStart;
  int lineEnd;
  int type;

  static const int BLK_CLASSES = 1;
  static const int BLK_FUNCTIONS = 2;
  static const int BLK_VARIABLES = 4;

  static const String BLK_CLASSES_STRING = "classes";
  static const String BLK_FUNCTIONS_STRING = "functions";
  static const String BLK_VARIABLES_STRING = "variables";

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
    } else {
      throw "Tag <$s> was not recognized as a valid init block tag.";
    }
  }

}




class Builder {

  Builder() {
    metadata = new List<BuilderMetadata>();
    synopsisLineNumbers = new List<int>();
    pages = new List<BuilderPage>();
    pageHandles = new Map<String,int>();
    initBlocks = new List<BuilderInitBlock>();
    importFiles = new List<File>();
    importFilesFullPaths = new Set<String>();

    warningLines = new List<String>();
  }

  /**
    * Main workhorse, reads and parses file to intermediary structure.
    * When the returning Future is ready, use can call [writeFiles()].
    */
  Future<Builder> readFile(File f) {
    var completer = new Completer();

    inputFile = f;

    f.exists()
    .then((exists) {
      if (!exists) {
        completer.completeException(new FileIOException("File ${f.name} doesn't exist."));
      } else {
        f.fullPath().then((String fullPath) {
          inputFileFullPath = fullPath;

          var strInputStream = new StringInputStream(f.openInputStream());

          print("Reading input file ${f.name}");

          // The top of the file can be metadata. This will be changed to MODE_NORMAL
          // in [_checkMetadataLine()] when there is no metadata.
          _mode = MODE_METADATA;

          _lineNumber = 0;
          _pageNumber = 0;
          _blockNumber = 0;

          strInputStream.onLine = () {
            _check().then((_) {
              _lineNumber++;
              _thisLine = strInputStream.readLine();
              //stdout.writeString(".");
            });
          };

          strInputStream.onClosed = () {
            _check().then((_) {  // check last line
              //print("\nReading input file has finished.");

              // end the last page
              if (!pages.isEmpty()) {
                pages.last().lineEnd = _lineNumber - 1;
              }

              _lineNumber = null;  // makes sure following warnings don't get associated with the last line

              if (pages.isEmpty()) {
                WARNING("There are no pages in this egb. If you want it to be playable, "
                        "you will need to include page starts in the form of a line "
                        "containing exclusively dashes (`-`, three or more) and "
                        "an immediately following line with the name of the page.");
              }

              if (_mode != MODE_NORMAL) {
                completer.completeException(
                  newFormatException("Corrupt file, didn't close a tag (_mode = ${_mode})."));
              } else {
                // TODO: if a BLK_CHOICE goto leads to a page with an [[ visitOnce ]] option
                //       or similar, rewrite to BLK_CHOICE_IN_SCRIPT!
                _checkForDoubleImports().then((bool passed) {
                  if (passed) {
                    completer.complete(this);
                  }
                });
              }
            });
          };
        });
      }
    });

    return completer.future;
  }

  /**
    * This method takes care of checking each new line.
    */
  Future<bool> _check() {
    var completer = new Completer();

    // start finding patterns in the line
    // try every pattern at once, in a non-blocking way, using futures
    Futures.wait([
        _checkBlankLine(),
        _checkNewPage(),
        _checkPageOptions(),
        _checkChoice(),
        _checkInitBlockTags(),
        _checkScriptTags(),
        _checkMetadataLine(),
        _checkImportTag()
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
    if (_mode != MODE_NORMAL) {
      return new Future.immediate(false);
    }

    if (_thisLine == null || _thisLine == "" || blankLine.hasMatch(_thisLine)) {
      // close previous unfinished _text_ block if any
      if (!pages.isEmpty()) {
        var lastpage = pages.last();
        if (!lastpage.blocks.isEmpty()) {
          var lastblock = lastpage.blocks.last();
          if (lastblock.type == BuilderBlock.BLK_TEXT
              || lastblock.type == BuilderBlock.BLK_TEXT_WITH_VAR) {
            if (lastblock.lineEnd == null) {
              lastblock.lineEnd = _lineNumber - 1;
            }
          }
        }
      } else {
        synopsisLineNumbers.add(_lineNumber);
      }
      return new Future.immediate(true);
    } else {
      return new Future.immediate(false);
    }
  }

  Future<bool> _checkMetadataLine() {
    if (_mode != MODE_METADATA || _thisLine == null) {
      return new Future.immediate(false);
    }

    Match m = metadataLine.firstMatch(_thisLine);

    if (m != null) {
      // first line of a metadata record
      var key = m.group(1).trim();
      var value = m.group(2).trim();
      metadata.add(new BuilderMetadata(key, firstValue:value));
      return new Future.immediate(true);
    } else {
      m = metadataLineAdd.firstMatch(_thisLine);

      if (m != null && !metadata.isEmpty()) {
        // we have a multi-value key and this is a following value
        var value = m.group(1).trim();
        metadata.last().values.add(value);
        return new Future.immediate(true);
      } else {
        // we have hit the first non-metadata line. Quit metadata mode.
        _mode = MODE_NORMAL;
        return new Future.immediate(false);  // let it be checked by _checkNormalParagraph, too
      }
    }
  }

  // TODO: check inside echo tags, throw error if true
  Future<bool> _checkNewPage() {
    if ((_mode != MODE_METADATA && _mode != MODE_NORMAL) || _thisLine == null) {
      return new Future.immediate(false);
    }

    if (newPageCandidate && validPageName.hasMatch(_thisLine)) {
      // discard the "---" from any previous blocks
      if (pages.isEmpty() && !synopsisLineNumbers.isEmpty()) {
        synopsisLineNumbers.removeLast();
      } else {
        var lastpage = pages.last();
        if (!lastpage.blocks.isEmpty()) {
          var lastblock = lastpage.blocks.last();
          // also close block
          if (lastblock.lineEnd == null) {
              lastblock.lineEnd = _lineNumber - 2;
              if (lastblock.lineEnd < lastblock.lineStart) {
                // a faux text block with only "---" inside
                lastpage.blocks.removeLast();
              }
          }
        }
      }

      // close last page
      if (!pages.isEmpty()) {
        pages.last().lineEnd = _lineNumber - 1;
      }

      // add the new page
      var name = validPageName.firstMatch(_thisLine).group(1);
      pageHandles[name] = _pageNumber;
      pages.add(new BuilderPage(name, _pageNumber++, _lineNumber));
      _mode = MODE_NORMAL;
      newPageCandidate = false;
      return new Future.immediate(true);

    } else {
      // no page, but let's check if this line isn't a "---" (next line could confirm a new page)
      if (hr.hasMatch(_thisLine)) {
        newPageCandidate = true;
        return new Future.immediate(false);  // let it be checked by _checkNormalParagraph, too
      } else {
        newPageCandidate = false;
        return new Future.immediate(false);
      }
    }
  }

  Future<bool> _checkPageOptions() {
    if (_mode != MODE_NORMAL || _thisLine == null) {
      return new Future.immediate(false);
    }

    if (!pages.isEmpty() && pages.last().lineStart == _lineNumber - 1
        && pageOptions.hasMatch(_thisLine)) {
      Match m = pageOptions.firstMatch(_thisLine);
      var lastpage = pages.last();
      for (var i = 1; i <= m.groupCount(); i += 2) {
        var opt = m.group(i);
        if (opt != null) {
          lastpage.options.add(opt);
        }
      }
      return new Future.immediate(true);
    } else {
      return new Future.immediate(false);
    }
  }

  // TODO: allow choices in synopsis?
  // TODO: check even inside ECHO tags, add to script
  Future<bool> _checkChoice() {
    if (_thisLine == null || pages.isEmpty()
        || (_mode != MODE_NORMAL && _mode != MODE_INSIDE_SCRIPT_ECHO)) {
      return new Future.immediate(false);
    }

    if (choice.hasMatch(_thisLine)) {

      var block = new BuilderBlock(lineStart:_lineNumber);

      Match m = choice.firstMatch(_thisLine);
      /*for (int i = 1; i <= m.groupCount(); i++) {*/
        /*print("$i - \"${m.group(i)}\"");*/
      /*}*/
      block.options["string"] = m.group(1);
      block.options["script"] = m.group(2);
      block.options["goto"] = m.group(3);

      // trim the strings
      block.options.forEach((var k, var v) {
        if (v != null) {
          block.options[k] = block.options[k].trim();
        }
      });

      bool hasVarInString = (block.options["string"] != null
          && variableInText.hasMatch(block.options["string"]));

      if (block.options["script"] == null && block.options["goto"] == null) {
        WARNING("Choice in the form of `- something []` is illegal. There must be "
              "a script and/or a goto specified.");
        return new Future.immediate(false);
      }

      if (block.options["script"] != null
          && (const RegExp(r"^[^{]*}").hasMatch(block.options["script"])
              || const RegExp(r"{[^}]*$").hasMatch(block.options["script"]))) {
        WARNING("Inline script `${block.options['script']}` in choice appears to have "
              "an unmatched bracket. This could be an error. Actual format used: `$_thisLine`.");
      }

      // if the previous line is a text block, then that textblock needs to be
      // a BLK_CHOICE_QUESTION.
      var lastpage = pages.last();
      if (!lastpage.blocks.isEmpty()) {
        var lastblock = lastpage.blocks.last();
        if (lastblock.lineEnd == null) {
          lastblock.lineEnd = _lineNumber - 1;
          lastblock.type = BuilderBlock.BLK_CHOICE_QUESTION;
        }
      }

      if (_mode == MODE_INSIDE_SCRIPT_ECHO) {
        // TODO: just add a _choiceToScript(block) to the current script flow
      } else if (_mode == MODE_NORMAL && block.options["script"] == null && !hasVarInString) {
        // we have a simple choice (i.e. no scripts needed)
        block.type = BuilderBlock.BLK_CHOICE;
        block.lineEnd = _lineNumber;  // choice blocks are always one-liners in egb
        pages.last().blocks.add(block);
      } else {
        // the choice will need to be rewritten into a standalone script (closure)
        block.type = BuilderBlock.BLK_CHOICE_IN_SCRIPT;
        block.lineEnd = _lineNumber;  // choice blocks are always one-liners in egb
        pages.last().blocks.add(block);
      }

      return new Future.immediate(true);
    } else {
      return new Future.immediate(false);
    }
  }

  Future<bool> _checkInitBlockTags() {
    if (_mode == MODE_INSIDE_SCRIPT_TAG || _thisLine == null) {
      return new Future.immediate(false);
    }

    var completer = new Completer();

    Match m = initBlockTag.firstMatch(_thisLine);

    if (m != null) {
      bool closing =  m.group(1) == "/";
      var blocktype = m.group(2).toLowerCase();

      if (!closing) {  // opening a new tag
        if (_mode == MODE_NORMAL || _mode == MODE_METADATA) {
          _mode = BuilderInitBlock.modeFromString(blocktype);
          initBlocks.add(new BuilderInitBlock(lineStart:_lineNumber, typeStr:blocktype));
          _closeLastBlock();
          completer.complete(true);
        } else {
          completer.completeException(
            newFormatException("Invalid appearance of of an init "
                  "opening tag `<$blocktype>`. We are already inside "
                  "another tag (mode = $_mode)."));
        }
      } else {  // closing a tag
        if (_mode == MODE_INSIDE_CLASSES || _mode == MODE_INSIDE_FUNCTIONS
            || _mode == MODE_INSIDE_VARIABLES) {
          _mode = MODE_NORMAL;
          initBlocks.last().lineEnd = _lineNumber;
          completer.complete(true);
        } else {
          completer.completeException(
            newFormatException("Invalid appearance of of an init "
                  "closing tag `</$blocktype>`. We are not inside any "
                  "other tag (mode = $_mode)."));
        }
      }
    } else {
      completer.complete(false);
    }

    return completer.future;
  }

  Future<bool> _checkScriptTags() {
    if (_mode == MODE_INSIDE_CLASSES || _mode == MODE_INSIDE_VARIABLES
        || _mode == MODE_INSIDE_FUNCTIONS || _thisLine == null) {
      return new Future.immediate(false);
    }

    var completer = new Completer();

    Match m = scriptOrEchoTag.firstMatch(_thisLine);

    if (pages.isEmpty()) {
      if (m != null) {
        WARNING("No <script> or <echo> blocks will be recognized as such "
                "in the synopsis (i.e. outside a page). Ignoring.");
      }
      return new Future.immediate(false);
    }
    var lastpage = pages.last();

    if (m != null) {
      bool closing =  m.group(1) == "/";
      var type = m.group(2).toLowerCase();
      var tagIsEcho = type == "echo";

      if (!closing) {  // opening a new tag
        if (_mode == MODE_NORMAL && !tagIsEcho) {
          _closeLastBlock();
          _mode = MODE_INSIDE_SCRIPT_TAG;
          var block = new BuilderBlock(lineStart:_lineNumber);
          block.type = BuilderBlock.BLK_SCRIPT;
          lastpage.blocks.add(block);
          completer.complete(true);
        } else if (_mode == MODE_INSIDE_SCRIPT_TAG && tagIsEcho) {
          _mode = MODE_INSIDE_SCRIPT_ECHO;
          if (!lastpage.blocks.isEmpty()
              && lastpage.blocks.last().type == BuilderBlock.BLK_SCRIPT) {
            lastpage.blocks.last().subBlocks.add(new BuilderLineSpan(lineStart:_lineNumber));
            completer.complete(true);
          } else {
            completer.completeException(
              newFormatException("Echo tags must be inside <script> tags."));
          }
        } else {
          completer.completeException(
            newFormatException("Starting a <$type> tag outside NORMAL is illegal. "
                  "We are now in mode=$_mode."));
        }
      } else {  // closing a tag
        if (_mode == MODE_INSIDE_SCRIPT_TAG && !tagIsEcho && !lastpage.blocks.isEmpty()) {
          _mode = MODE_NORMAL;
          lastpage.blocks.last().lineEnd = _lineNumber;
          completer.complete(true);
        } else if (_mode == MODE_INSIDE_SCRIPT_ECHO && !lastpage.blocks.isEmpty()
              && lastpage.blocks.last().type == BuilderBlock.BLK_SCRIPT
              && !lastpage.blocks.last().subBlocks.isEmpty()) {
          _mode = MODE_INSIDE_SCRIPT_TAG;
          lastpage.blocks.last().subBlocks.last().lineEnd = _lineNumber;
          completer.complete(true);
        } else {
          completer.completeException(
            newFormatException("Invalid appearance of of a `</$type>` "
                  "closing tag. We are not inside any $type tag to be"
                  "closed (mode = $_mode)."));
        }
      }
    } else {
      completer.complete(false);
    }

    return completer.future;
  }

  Future<bool> _checkImportTag() {
    if (_mode == MODE_INSIDE_SCRIPT_TAG || _thisLine == null) {
      return new Future.immediate(false);
    }

    var completer = new Completer();

    Match m = importTag.firstMatch(_thisLine);

    if (m != null) {
      _closeLastBlock();
      var importFilePath = m.group(1);
      importFilePath = importFilePath.substring(1, importFilePath.length - 1); //get rid of "" / ''

      var inputFilePath = new Path(inputFileFullPath);
      var pathToImport = inputFilePath.directoryPath
            .join(new Path(importFilePath));

      importFiles.add(new File.fromPath(pathToImport));
      completer.complete(true);
    } else {
      completer.complete(false);
    }

    return completer.future;
  }

  // TODO: check also inside echo tags, add to script block
  Future<bool> _checkNormalParagraph() {
    if (_mode != MODE_NORMAL || _thisLine == null) {
      return new Future.immediate(false);
    }

    if (pages.isEmpty()) {
      synopsisLineNumbers.add(_lineNumber);
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
          //lastblock.lines.add(_thisLine);
          if (variableInText.hasMatch(_thisLine)) {
            lastblock.type = BuilderBlock.BLK_TEXT_WITH_VAR;
          }
        }
      }

      if (!appending) {
        // we create a new block
        var block = new BuilderBlock(lineStart:_lineNumber);
        if (variableInText.hasMatch(_thisLine)) {
          block.type = BuilderBlock.BLK_TEXT_WITH_VAR;
        } else {
          block.type = BuilderBlock.BLK_TEXT;
        }
        //block.lines.add(_thisLine);
        lastpage.blocks.add(block);
      }
    }

    return new Future.immediate(true);
  }

  Future<bool> _checkForDoubleImports() {
    var completer = new Completer();

    var inputFilePath = new Path(inputFileFullPath);

    List<Future<bool>> existsFutures = new List<Future<bool>>();
    List<Future<String>> fullPathFutures = new List<Future<String>>();

    for (File f in importFiles) {
      existsFutures.add(f.exists());
      fullPathFutures.add(f.fullPath());
    }

    Futures.wait(existsFutures)
    .then((List<bool> existsBools) {
      assert(existsBools.length == importFiles.length);

      for (int i = 0; i < existsBools.length; i++) {
        if (existsBools[i] == false) {
          completer.completeException(
              new FileIOException("Source file tries to import a file that "
                    "doesn't exist (${importFiles[i].name})."));
        }
      }

      Futures.wait(fullPathFutures)
      .then((List<String> fullPaths) {
        assert(fullPaths.length == importFiles.length);

        for (int i = 0; i < fullPaths.length; i++) {
          for (int j = 0; j < i; j++) {
            if (fullPaths[i] == fullPaths[j]) {
              WARNING("File '${fullPaths[i]}' has already been imported. Ignoring "
                      "the redundant <import> tag.");
              importFiles[i] = null;
            }
          }
        }

        // delete the nulls
        importFiles = importFiles.filter((f) => f != null);
        completer.complete(true);
      });
    });

    return completer.future;
  }

  void _closeLastBlock({int lineEnd}) {
    if (lineEnd == null) {
      lineEnd = _lineNumber - 1;
    }
    if (!pages.isEmpty() && !pages.last().blocks.isEmpty()) {
      var lastblock = pages.last().blocks.last();
      if (lastblock.lineEnd == null) {
        lastblock.lineEnd = lineEnd;
      }
    }
  }

  EgbFormatException newFormatException(String msg) {
    return new EgbFormatException(msg, line:_lineNumber, file:inputFile);
  }


  // input file given by readFile()
  File inputFile;
  String inputFileFullPath;
  List<File> importFiles;
  Set<String> importFilesFullPaths;

  List<BuilderMetadata> metadata;
  bool newPageCandidate = false;  // when last page was "---", there's a chance of a newpage

  List<int> synopsisLineNumbers;

  List<BuilderPage> pages;
  Map<String, int> pageHandles;
  List<BuilderInitBlock> initBlocks;

  RegExp blankLine = const RegExp(r"^\s*$");
  RegExp hr = const RegExp(r"^\s{0,3}\-\-\-+\s*$"); // ----
  RegExp validPageName = const RegExp(r"^\s{0,3}(.+)\s*$");
  RegExp pageOptions = const RegExp(r"^\s{0,3}\[\[\s*(\w+)([\s,]+(\w+))*\s*]\]\s*$");
  RegExp metadataLine = const RegExp(r"^(\w.+):\s*(\w.*)\s*$");
  RegExp metadataLineAdd = const RegExp(r"^\s+(\w.*)\s*$");
  /*RegExp scriptTag = const RegExp(@"^\s{0,3}<\s*(/?)\s*script\s*>\s*$", ignoreCase:true);*/
  RegExp scriptOrEchoTag = const RegExp(r"^\s{0,3}<\s*(/?)\s*((?:script)|(?:echo))\s*>\s*$", ignoreCase:true);
  /*RegExp scriptTagStart = const RegExp(@"^\s{0,3}<script>\s*$");*/
  /*RegExp scriptTagEnd = const RegExp(@"^\s{0,3}</script>\s*$");*/
  /*RegExp initTagStart = const RegExp(@"^\s{0,3}<init>\s*$");*/
  /*RegExp initTagEnd = const RegExp(@"^\s{0,3}</init>\s*$");*/
  /*RegExp libraryTagStart = const RegExp(@"^\s{0,3}<library>\s*$");*/
  /*RegExp libraryTagEnd = const RegExp(@"^\s{0,3}</library>\s*$");*/
  /*RegExp classesTagStart = const RegExp(@"^\s{0,3}<classes>\s*$");*/
  /*RegExp classesTagEnd = const RegExp(@"^\s{0,3}</classes>\s*$");*/
  RegExp initBlockTag = const RegExp(r"^\s{0,3}<\s*(/?)\s*((?:classes)|(?:functions)|(?:variables))\s*>\s*$", ignoreCase:true);
  RegExp importTag = const RegExp(r"""^\s{0,3}<\s*import\s+((?:\"(?:.+)\")|(?:\'(?:.+)\'))\s*/?>\s*$""", ignoreCase:true);
  RegExp choice = const RegExp(r"^\s{0,3}\-\s+(?:(.+)\s+)?\[\s*(?:\{\s*(.+)\s*\})?[\s,]*([^\{].+)?\s*\]\s*$");
  RegExp variableInText = const RegExp(r"[^\\]\$[a-zA-Z_][a-zA-Z0-9_]*|[^\\]\${[^}]+}");


  /**
    * Writer method.
    */
  Future<bool> writeFiles() {
    var completer = new Completer();

    Futures.wait([
        writeDartFile(),
        writeInterfaceFiles()
    ]).then((_) {
      completer.complete(true);
    });

    return completer.future;
  }

  Future<bool> writeDartFile() {
    var completer = new Completer();

    var inputFilePath = new Path(inputFileFullPath);
    var scriptFilePath = new Path(new Options().script);
    var pathToOutputDart = inputFilePath.directoryPath
          .join(new Path("${inputFilePath.filenameWithoutExtension}.dart"));

    // write the .dart file
    File dartFile = new File.fromPath(pathToOutputDart);
    OutputStream dartOutStream = dartFile.openOutputStream();
    dartOutStream.writeString(implStartFile); // TODO: fix path to #import('../egb_library.dart');
    writeInitBlocks(dartOutStream, BuilderInitBlock.BLK_CLASSES, indent:0)
    .then((_) {
      dartOutStream.writeString(implStartClass);
      writeInitBlocks(dartOutStream, BuilderInitBlock.BLK_FUNCTIONS, indent:2)
      .then((_) {
        dartOutStream.writeString(implStartCtor);

        dartOutStream.writeString("    pageHandles = {\n");
        pageHandles.forEach((String k, int v) {
          dartOutStream.writeString("      @\"\"\"$k\"\"\": $v,\n");
          // TODO: move to writePages, handle last comma
        });
        dartOutStream.writeString("    };\n\n");

        dartOutStream.writeString(implStartPages);
        writePages(dartOutStream)
        .then((_) {
          dartOutStream.writeString(implEndPages);
          dartOutStream.writeString(implEndCtor);
          dartOutStream.writeString(implStartInit);
          writeInitBlocks(dartOutStream, BuilderInitBlock.BLK_VARIABLES, indent:4)
          .then((_) {
            dartOutStream.writeString(implEndInit);
            dartOutStream.writeString(implEndClass);
            dartOutStream.writeString(implEndFile);

            // Close and complete
            dartOutStream.close();
            dartOutStream.onClosed = () {
              completer.complete(true);
            };
            dartOutStream.onError = (var e) {
              completer.completeException(e);
            };
          });
        });
      });
    });

    return completer.future;
  }

  Future<bool> writeInterfaceFiles() {
    var completer = new Completer();

    var inputFilePath = new Path(inputFileFullPath);
    var scriptFilePath = new Path(new Options().script);
    var pathToOutputDart = inputFilePath.directoryPath
          .join(new Path("${inputFilePath.filenameWithoutExtension}.dart"));
    var pathToOutputCmd = inputFilePath.directoryPath
          .join(new Path("${inputFilePath.filenameWithoutExtension}.cmdline.dart"));
    var pathToInputTemplateCmd = scriptFilePath.directoryPath
          .join(new Path("egb_interface_cmdline.dart"));
    var pathToOutputHtml = inputFilePath.directoryPath
          .join(new Path("${inputFilePath.filenameWithoutExtension}.html.dart"));
    var pathToInputTemplateHtml = scriptFilePath.directoryPath
          .join(new Path("egb_interface_html.dart"));

    File cmdLineOutputFile = new File.fromPath(pathToOutputCmd);
    File cmdLineTemplateFile = new File.fromPath(pathToInputTemplateCmd);
    File htmlOutputFile = new File.fromPath(pathToOutputHtml);
    File htmlTemplateFile = new File.fromPath(pathToInputTemplateHtml);

    var substitutions = {
      "#import('egb_library.dart');" :
          "#import('../egb_library.dart');\n", // TODO!!
      "#import('samples/unit-testing.markdown.dart');" :
          "#import('$pathToOutputDart');\n", // TODO!!
    };

    Futures.wait([
        _fileFromTemplate(cmdLineTemplateFile, cmdLineOutputFile, substitutions),
        _fileFromTemplate(htmlTemplateFile, htmlOutputFile, substitutions),
    ]).then((List<bool> bools) => completer.complete(bools.every((b) => b)));

    return completer.future;
  }

Future<List<String>> _fileFromTemplate(File inFile, File outFile,
    [Map<String,String> substitutions]) {
  if (substitutions == null) {
    substitutions = new Map();
  }
  Completer completer = new Completer();

  inFile.exists()
  .then((bool exists) {
    if (!exists) {
      WARNING("Cmd line template doesn't exist in current directory. Skipping.");
      completer.complete(false);
    } else {
      OutputStream outStream = outFile.openOutputStream();
      StringInputStream inStream = new StringInputStream(inFile.openInputStream());

      inStream.onLine = () {
        String line = inStream.readLine();
        if (substitutions.containsKey(line)) {
          outStream.writeString("${substitutions[line]}\n");
        } else {
          outStream.writeString("$line\n");
        }
      };
      inStream.onClosed = () {
        outStream.close();
        completer.complete(true);
      };
      inStream.onError = (e) => completer.completeException(e);
    }
  });

  return completer.future;
}




  Future writeInitBlocks(OutputStream dartOutStream, int initBlockType, {int indent: 0}) {
    var completer = new Completer();

    // TODO: copy <import> classes first

    copyLineRanges(
        initBlocks.filter((block) => block.type == initBlockType),
        new StringInputStream(inputFile.openInputStream()),
        dartOutStream,
        inclusive:false, indentLength:indent)
    .then((_) {
      completer.complete(true);
    });

    return completer.future;
  }

  Future writePages(OutputStream dartOutStream) {
    var completer = new Completer();

    if (pages.isEmpty()) {
      return new Future.immediate(true);
    }  // TODO: unit test this

    String indent = "";
    Function write = (String msg) {
      dartOutStream.writeString("$indent$msg");
    };

    var inStream = new StringInputStream(inputFile.openInputStream());
    int lineNumber = 0;
    BuilderPage curPage;
    int pageIndex = 0;
    BuilderBlock curBlock;
    int blockIndex;

    inStream.onLine = () {
      lineNumber++;
      String line = inStream.readLine();

      // start page
      if (pageIndex < pages.length
          && lineNumber == pages[pageIndex].lineStart) {
        indent = _getIndent(6);
        curPage = pages[pageIndex];
        blockIndex = 0;
        write("// ${curPage.name}\n");
        write("[\n");
      }

      // start of block
      if (curPage != null && !curPage.blocks.isEmpty() && blockIndex < curPage.blocks.length
          && lineNumber == curPage.blocks[blockIndex].lineStart) {
        indent = _getIndent(8);
        curBlock = curPage.blocks[blockIndex];
        String commaOrNot = blockIndex < curPage.blocks.length - 1 ? "," : "";

        if (curBlock.type == BuilderBlock.BLK_TEXT) {
          if (curBlock.lineStart == curBlock.lineEnd) {
            write("\"\"\"$line \"\"\"$commaOrNot\n");
          } else {
            write("\"\"\"$line\n");
          }
        }

        if (curBlock.type == BuilderBlock.BLK_TEXT_WITH_VAR) {
          write("() {\n");
          if (curBlock.lineStart == curBlock.lineEnd) {
            write("  echo(\"\"\"$line \"\"\");\n");
            write("}$commaOrNot\n");
          } else {
            write("  echo(\"\"\"$line\n");
          }
        }

        if (curBlock.type == BuilderBlock.BLK_CHOICE) {
          var string = curBlock.options["string"];
          var goto = curBlock.options["goto"];
          write("{\n");
          write("  \"string\": @\"\"\"${string != null ? string : ''} \"\"\",\n");
          write("  \"goto\": @\"\"\"$goto\"\"\"\n");
          write("}$commaOrNot\n");
        }

        if (curBlock.type == BuilderBlock.BLK_CHOICE_IN_SCRIPT) {
          var string = curBlock.options["string"];
          var goto = curBlock.options["goto"];
          var script = curBlock.options["script"];

          write("() {\n");

          if (string == null) {
            // ex: "- [gotopage]"
            if (script != null) {
              write("  $script;\n");
            }
            if (goto != null) {
              write("  goto(@\"\"\"$goto\"\"\");\n");
            }
          } else {
            // ex: "- Go to there [{{time++}} page]"
            write("  choices.add(new Choice(\n");
            write("      \"\"\"$string \"\"\",\n");
            var commaAfterGoto = ( script != null ) ? "," : "";
            write("      goto:@\"\"\"$goto\"\"\"$commaAfterGoto\n");
            write("      then:() { $script; }\n");
            write("  ));\n");
          }

          write("}$commaOrNot\n");
        }

        if (curBlock.type == BuilderBlock.BLK_SCRIPT) {
          write("() {\n");
        }

      }

      // block line
      if (curPage != null && !curPage.blocks.isEmpty() && blockIndex < curPage.blocks.length
          && _insideLineRange(lineNumber, curPage.blocks[blockIndex])) {
        curBlock = curPage.blocks[blockIndex];

        if ((curBlock.type == BuilderBlock.BLK_TEXT
            || curBlock.type == BuilderBlock.BLK_TEXT_WITH_VAR)
            && _insideLineRange(lineNumber, curBlock, inclusive:false)) {
          indent = _getIndent(0);
          write("$line\n");
        }

        if (curBlock.type == BuilderBlock.BLK_SCRIPT
            && _insideLineRange(lineNumber, curBlock, inclusive:false)) {
          indent = _getIndent(0);
          write("$line\n");
        }
      }


      // end of block
      if (curPage != null && !curPage.blocks.isEmpty() && blockIndex < curPage.blocks.length
          && lineNumber == curPage.blocks[blockIndex].lineEnd) {
        String commaOrNot = blockIndex < curPage.blocks.length - 1 ? "," : "";


        if (curBlock.type == BuilderBlock.BLK_TEXT) {
          if (curBlock.lineStart != curBlock.lineEnd) {
            indent = _getIndent(0);
            write("$line \"\"\"$commaOrNot\n");
          }
        }

        if (curBlock.type == BuilderBlock.BLK_TEXT_WITH_VAR) {
          if (curBlock.lineStart != curBlock.lineEnd) {
            indent = _getIndent(0);
            write("$line \"\"\");\n");
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
        indent = _getIndent(6);
        if (pageIndex < pages.length - 1) {
          write("],\n");
        } else {
          write("]\n");
        }
        pageIndex++;
        curPage = null;
      }

    };
    inStream.onClosed = () {
      completer.complete(true);
    };
    inStream.onError = (e) {
      completer.completeException(e);
    };
    return completer.future;
  }

  Future copyLineRanges(List<BuilderLineRange> lineRanges,
      StringInputStream inStream, OutputStream outStream,
      {bool inclusive: true, int indentLength: 0}) {
    var completer = new Completer();
    outStream.writeString("\n");
    var indent = _getIndent(indentLength);

    int lineNumber = 0;
    inStream.onLine = () {
      lineNumber++;
      String line = inStream.readLine();

      // if lineNumber is in one of the ranges, write
      if (lineRanges.some((var range) => _insideLineRange(lineNumber, range, inclusive:inclusive))) {
        outStream.writeString("$indent$line\n");
      }
    };

    inStream.onClosed = () {
      outStream.writeString("\n");
      completer.complete(true);
    };
    inStream.onError = (e) {
      completer.completeException(e);
    };
    return completer.future;
  }


  String _getIndent(int len) {
    var strBuf = new StringBuffer();
    for (int i = 0; i < len; i++) {
      strBuf.add(" ");
    }
    return strBuf.toString();
  }

  bool _insideLineRange(int lineNumber, BuilderLineRange range, {bool inclusive: true}) {
    if (range.lineEnd == null) {
      print(range.lineStart);
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
  static int MODE_NORMAL = 1;
  static int MODE_INSIDE_CLASSES = 2;
  static int MODE_INSIDE_FUNCTIONS = 4;
  static int MODE_INSIDE_VARIABLES = 8;
  static int MODE_INSIDE_SCRIPT_ECHO = 16;
  static int MODE_INSIDE_SCRIPT_TAG = 32;
  static int MODE_METADATA = 64;
  // This makes sure the parser remembers where it is during reading the file.
  int _mode;


  int _lineNumber;
  int _pageNumber;
  int _blockNumber;

  String _thisLine;

  /** used to communicate problems to caller */
  List<String> warningLines;

  void WARNING(String msg) {
    print("$msg (line:$_lineNumber)");
    warningLines.add("$msg (line:$_lineNumber)");
  }
}
