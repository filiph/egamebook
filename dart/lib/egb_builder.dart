#library("egb_builder");

#import('dart:io');
#import('package:graphml/dart_graphml.dart');

/**
 * Exception thrown when the input .egb file is badly formatted.
 **/
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
class BuilderPage implements BuilderLineRange {
  int index;
  int lineStart;
  int lineEnd;
  
  final String name;
  
  /**
   * List of options, such as [:visitOnce:]. 
   */
  List<String> options;
  
  /**
   * List of linked page names. Builder makes sure they are specified in
   * their full version (i.e. "Group 1: Something").
   */
  List<String> gotoPageNames;
  
  List<BuilderBlock> blocks;
  BuilderPageGroup group;

  BuilderPage(this.name, this.index, [this.lineStart]) {
    blocks = new List<BuilderBlock>();
    options = new List<String>();
    gotoPageNames = new List<String>();
    
    group = new BuilderPageGroup.fromPage(this);
  }

  String toString() {
    return "BuilderPage <$name> [$lineStart:$lineEnd]";
  }
  
  String get groupName {
    int index = name.indexOf(": ");
    if (index > 0) {
      return name.substring(0, index);
    } else {
      return null;
    }
  }
  
  String get nameWithoutGroup {
    int index = name.indexOf(": ");
    if (index > 0 && index < name.length - 2) {
      return name.substring(index + 2);
    } else {
      return name;
    }
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
    List<BuilderPageGroup> list = _cache.getValues();
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
  Map<String,Dynamic> options;
  List<BuilderLineSpan> subBlocks;

  static final int BLK_TEXT = 1;
  static final int BLK_SCRIPT = 2;
  static final int BLK_CHOICE = 4;
  static final int BLK_TEXT_WITH_VAR = 8;
  static final int BLK_CHOICE_QUESTION = 16;
  static final int BLK_CHOICE_IN_SCRIPT = 32;

  BuilderBlock({int this.lineStart}) {
    options = new Map<String,Dynamic>();
    subBlocks = new List<BuilderLineSpan>();
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
    pageHandles = new Map<String,int>();
    initBlocks = new List<BuilderInitBlock>();
    importEgbFiles = new List<File>();
    importEgbFilesFullPaths = new Set<String>();

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
        completer.completeException(new FileIOException("File ${f.name} doesn't exist."));
      } else {
        f.fullPath().then((String fullPath) {
          inputEgbFileFullPath = fullPath;

          var strInputStream = new StringInputStream(f.openInputStream());

          print("Reading input file ${f.name}");

          // The top of the file can be metadata. This will be changed to 
          // MODE_NORMAL in [_checkMetadataLine()] when there is no metadata.
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
     
              if (!pages.isEmpty()) {
                // end the last page
                pages.last().lineEnd = _lineNumber - 1;
                
                // fully specify gotoPageNames of every page
                for (var page in pages) {
                  for (int i = 0; i < page.gotoPageNames.length; i++) {
                    var gotoPageName = page.gotoPageNames[i];
                    if (pageHandles.containsKey(
                                 "${page.groupName}: $gotoPageName")) {
                      page.gotoPageNames[i] = 
                          "${page.groupName}: $gotoPageName";
                    } else if (pageHandles.containsKey(gotoPageName)) {
                      // great, already done
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
   * This method takes care of checking each new line, trying to find
   * patterns (like a new page).
   * 
   * @return    Future of bool. Always true on completion.
   **/
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
        _checkGotoInsideScript(),
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

  /**
   * Checks if current line is a blank line. Acts accordingly.
   * 
   * @return    Future of bool, indicating the result of the check.
   **/
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

  /**
   * Checks if current line is a metadata line. Acts accordingly.
   * 
   * @return    Future of bool, indicating the result of the check.
   **/
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

  /**
   * Checks if current line is a beginning of a new page. Acts accordingly.
   * 
   * @return    Future of bool, indicating the result of the check.
   **/
  Future<bool> _checkNewPage() {
    // TODO: check inside echo tags, throw error if true
    if ((_mode != MODE_METADATA && _mode != MODE_NORMAL) || _thisLine == null) {
      return new Future.immediate(false);
    }

    if (_newPageCandidate && validPageName.hasMatch(_thisLine)) {
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
        pages.last().lineEnd = _lineNumber - 2;
      }

      // add the new page
      var name = validPageName.firstMatch(_thisLine).group(1);
      pageHandles[name] = _pageNumber;
      pages.add(new BuilderPage(name, _pageNumber++, _lineNumber));
      _mode = MODE_NORMAL;
      _newPageCandidate = false;
      return new Future.immediate(true);

    } else {
      // no page, but let's check if this line isn't a "---" (next line could confirm a new page)
      if (hr.hasMatch(_thisLine)) {
        _newPageCandidate = true;
        return new Future.immediate(false);  // let it be checked by _checkNormalParagraph, too
      } else {
        _newPageCandidate = false;
        return new Future.immediate(false);
      }
    }
  }
  
  /**
   * Checks if current line is an options line below new page line. 
   * Acts accordingly.
   * 
   * @return    Future of bool, indicating the result of the check.
   **/
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

  /**
   * Checks if current line is choice. Acts accordingly.
   * 
   * @return    Future of bool, indicating the result of the check.
   **/
  Future<bool> _checkChoice() {
    // TODO: allow choices in synopsis?
    // TODO: check even inside ECHO tags, add to script
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
      // converted to a BLK_CHOICE_QUESTION.
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
        lastpage.gotoPageNames.add(block.options["goto"]);
        lastpage.blocks.add(block);
      } else {
        // the choice will need to be rewritten into a standalone script (closure)
        block.type = BuilderBlock.BLK_CHOICE_IN_SCRIPT;
        block.lineEnd = _lineNumber;  // choice blocks are always one-liners in egb
        if (block.options["goto"] != null) {
          lastpage.gotoPageNames.add(block.options["goto"]);
        }
        lastpage.blocks.add(block);
      }

      return new Future.immediate(true);
    } else {
      return new Future.immediate(false);
    }
  }

  /**
   * Checks if current line is one of `<classes>`, `<functions>` or 
   * `<variables>` (or their closing tags). Acts accordingly.
   * 
   * @return    Future of bool, indicating the result of the check.
   **/
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

  /**
   * Checks if current line is one of `<script>` or `</script>`. 
   * Acts accordingly.
   * 
   * @return    Future of bool, indicating the result of the check.
   **/
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

  /**
   * Checks if there is a goto("") statement inside a script. Acts accordingly.
   * 
   * @return    Future of bool, indicating the result of the check.
   **/
  Future<bool> _checkGotoInsideScript() {
    if (_thisLine == null) {
      return new Future.immediate(false);
    }
    
    if (_mode == MODE_INSIDE_SCRIPT_TAG) {
      Match m = gotoInsideScript.firstMatch(_thisLine);
      
      if (m != null) {
        pages.last().gotoPageNames.add(m.group(2));
        return new Future.immediate(true);
      }
    }
    
    return new Future.immediate(false);
  }
  
  /**
   * Checks if current line is an `<import>` tag. Acts accordingly.
   * 
   * @return    Future of bool, indicating the result of the check.
   **/
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

      var inputFilePath = new Path(inputEgbFileFullPath);
      var pathToImport = inputFilePath.directoryPath
            .join(new Path(importFilePath));

      importEgbFiles.add(new File.fromPath(pathToImport));
      completer.complete(true);
    } else {
      completer.complete(false);
    }

    return completer.future;
  }

  /**
   * When all above checks fails, this is probably a line in a normal paragraph. 
   * (Unless it's above the first page, in which case it's a line
   * in the synopsis.) 
   * 
   * @return    Future of bool, indicating the result of the check.
   **/
  Future<bool> _checkNormalParagraph() {
    // TODO: check also inside echo tags, add to script block
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

  /**
   * Goes out and checks if the imported files exist. The method finds out
   * if two imports are of the same file, in which case it removes the redundant
   * [importFiles].
   * 
   * @return    Future of bool, always true.
   **/
  Future<bool> _checkForDoubleImports() {
    var completer = new Completer();

    var inputFilePath = new Path(inputEgbFileFullPath);

    List<Future<bool>> existsFutures = new List<Future<bool>>();
    List<Future<String>> fullPathFutures = new List<Future<String>>();

    for (File f in importEgbFiles) {
      existsFutures.add(f.exists());
      fullPathFutures.add(f.fullPath());
    }

    Futures.wait(existsFutures)
    .then((List<bool> existsBools) {
      assert(existsBools.length == importEgbFiles.length);

      for (int i = 0; i < existsBools.length; i++) {
        if (existsBools[i] == false) {
          completer.completeException(
              new FileIOException("Source file tries to import a file that "
                    "doesn't exist (${importEgbFiles[i].name})."));
        }
      }

      Futures.wait(fullPathFutures)
      .then((List<String> fullPaths) {
        assert(fullPaths.length == importEgbFiles.length);

        for (int i = 0; i < fullPaths.length; i++) {
          for (int j = 0; j < i; j++) {
            if (fullPaths[i] == fullPaths[j]) {
              WARNING("File '${fullPaths[i]}' has already been imported. Ignoring "
                      "the redundant <import> tag.");
              importEgbFiles[i] = null;
            }
          }
        }

        // delete the nulls
        importEgbFiles = importEgbFiles.filter((f) => f != null);
        completer.complete(true);
      });
    });

    return completer.future;
  }

  /**
   * Helper function. Finds the previous block and closes it with either
   * the given [lineEnd] param, or the previous line.
   **/
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
    return new EgbFormatException(msg, line:_lineNumber, file:inputEgbFile);
  }

  // input file given by readFile()
  File inputEgbFile;
  String inputEgbFileFullPath;
  List<File> importEgbFiles;
  Set<String> importEgbFilesFullPaths;

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
  
  /**
   * GraphML representation of the page flow.
   **/
  GraphML graphML;

  RegExp blankLine = const RegExp(r"^\s*$");
  RegExp hr = const RegExp(r"^\s{0,3}\-\-\-+\s*$"); // ----
  RegExp validPageName = const RegExp(r"^\s{0,3}(.+)\s*$");
  RegExp pageOptions = const RegExp(r"^\s{0,3}\[\[\s*(\w+)([\s,]+(\w+))*\s*]\]\s*$");
  RegExp metadataLine = const RegExp(r"^(\w.+):\s*(\w.*)\s*$");
  RegExp metadataLineAdd = const RegExp(r"^\s+(\w.*)\s*$");
  /*RegExp scriptTag = const RegExp(@"^\s{0,3}<\s*(/?)\s*script\s*>\s*$", ignoreCase:true);*/
  RegExp scriptOrEchoTag = const RegExp(r"^\s{0,3}<\s*(/?)\s*((?:script)|(?:echo))\s*>\s*$", ignoreCase:true);
  RegExp gotoInsideScript = const RegExp(r"goto\s*\(\s*(" r'"' r"|'" r'|""")(.+?)\1\s*\)\s*;');
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
   * Writes following Dart files to disk:
   * 
   * - xyz.dart (The Scripter implementation)
   * - xyz.cmdline.dart (The command line interface)
   * - xyz.html.dart (The html interface)
   **/
  Future<bool> writeDartFiles() {
    var completer = new Completer();

    Futures.wait([
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

    var pathToOutputDart = getPathFor("dart");

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
          dartOutStream.writeString("      r\"\"\"$k\"\"\": $v,\n");
          // TODO: move to writePages, handle last comma
        });
        dartOutStream.writeString("    };\n\n");

        dartOutStream.writeString(implStartPages);
        writePagesToScripter(dartOutStream)
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

  /**
   * Creates the interface files. These files are the ones that run 
   * the egamebook. They import the scripter file as an Isolate.
   * 
   * There are two interfaces: the command line interface, and the HTML
   * interface.
   */
  Future<bool> writeInterfaceFiles() {
    var completer = new Completer();

    var scriptFilePath = new Path(new Options().script);
    var pathToOutputDart = getPathFor("dart");
    var pathToOutputCmd = getPathFor("cmdline.dart");
    var pathToInputTemplateCmd = scriptFilePath.directoryPath
          .join(new Path("../lib/src/egb_interface_cmdline.dart"));
    var pathToOutputHtml =getPathFor("html.dart");
    var pathToInputTemplateHtml = scriptFilePath.directoryPath
          .join(new Path("../lib/src/egb_interface_html.dart"));

    File cmdLineOutputFile = new File.fromPath(pathToOutputCmd);
    File cmdLineTemplateFile = new File.fromPath(pathToInputTemplateCmd);
    File htmlOutputFile = new File.fromPath(pathToOutputHtml);
    File htmlTemplateFile = new File.fromPath(pathToInputTemplateHtml);

    var substitutions = {
      "#import('egb_library.dart');" :
          "#import('../../lib/src/egb_library.dart');\n", // TODO!!
      "#import('reference_scripter_impl.dart');" :
          "#import('$pathToOutputDart');\n", // TODO!!
    };

    Futures.wait([
        _fileFromTemplate(cmdLineTemplateFile, cmdLineOutputFile, substitutions),
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
      [Map<String,String> substitutions]) {
    if (substitutions == null) {
      substitutions = new Map();
    }
    Completer completer = new Completer();
  
    inFile.exists()
    .then((bool exists) {
      if (!exists) {
        WARNING("Cmd line template ${inFile.name} doesn't exist in current directory. Skipping.");
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

  /**
   * Writes the specified initBlockType from the .egb file 
   * (and its imports TODO) to the OutputStream.
   * 
   * @param dartOutStream Stream to be written to.
   * @param initBlockType The type of blocks whose contents we want to copy.
   * @param indent  Whitespace indent.
   * @return    Always true.
   */
  Future<bool> writeInitBlocks(OutputStream dartOutStream, int initBlockType, 
                         {int indent: 0}) {
    var completer = new Completer();

    // TODO: copy <import> classes first

    copyLineRanges(
        initBlocks.filter((block) => block.type == initBlockType),
        new StringInputStream(inputEgbFile.openInputStream()),
        dartOutStream,
        inclusive:false, indentLength:indent)
    .then((_) {
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
   * @return    Always true.
   */
  Future writePagesToScripter(OutputStream dartOutStream) {
    var completer = new Completer();

    if (pages.isEmpty()) {
      return new Future.immediate(true);
    }  // TODO: unit test this

    String indent = "";
    Function write = (String msg) {
      dartOutStream.writeString("$indent$msg");
    };

    var inStream = new StringInputStream(inputEgbFile.openInputStream());
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
          write("  \"string\": r\"\"\"${string != null ? string : ''} \"\"\",\n");
          write("  \"goto\": r\"\"\"$goto\"\"\"\n");
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
              write("  goto(r\"\"\"$goto\"\"\");\n");
            }
          } else {
            // ex: "- Go to there [{{time++}} page]"
            write("  choices.add(new Choice(\n");
            write("      \"\"\"$string \"\"\",\n");
            var commaAfterGoto = ( script != null ) ? "," : "";
            write("      goto:r\"\"\"$goto\"\"\"$commaAfterGoto\n");
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

  /**
   * Gets lines from inStream and dumps them to outStream.
   * 
   * @param lineRanges  A collection of line ranges that need to be copied.
   * @param inStream  The input stream.
   * @param outStream The output stream.
   * @param inclusive Should the starting and ending lines in the lineRanges
   *                  be included?
   * @param indentLength  Whitespace indent.
   * @return  Always true.
   */
  Future<bool> copyLineRanges(Collection<BuilderLineRange> lineRanges,
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
  
  /**
   * Gets path for the file with specified extension. Therefore, calling
   * [:getPathFor('graphml'):] for [:path/to/example.egb:] will return
   * [:path/to/example.graphml:].
   */
  Path getPathFor(String extension) {
    Path inputFilePath = new Path(inputEgbFileFullPath);
    return inputFilePath.directoryPath
          .join(new Path("${inputFilePath.filenameWithoutExtension}"
          ".$extension"));
  }
  
  /**
   * Writes GraphML file from current Builder object.
   **/
  Future<bool> writeGraphMLFile() {
    var completer = new Completer();
    
    var pathToOutputGraphML = getPathFor("graphml");
    File graphmlOutputFile = new File.fromPath(pathToOutputGraphML);
    OutputStream graphmlOutStream = graphmlOutputFile.openOutputStream();
      
    try {
      updateGraphML();
      graphmlOutStream.writeString(graphML.toString());
    } on Exception catch (e) {
      throw e;
    } finally {
      graphmlOutStream.close();
      graphmlOutStream.onClosed = () => completer.complete(true);
    }
    
    return completer.future;
  }
  
  /**
   * Builds the [graphML] structure from the current Builder instance.
   **/
  void updateGraphML() {
    graphML = new GraphML();
    
    // create group nodes
    Map<String,Node> pageGroupNodes = new Map<String,Node>();
    for (int i = 0; i < pageGroups.length; i++) {
      var node = new Node(pageGroups[i].name);
      pageGroupNodes[pageGroups[i].name] = node;
      graphML.addGroupNode(node);
    }
    
    // create nodes
    Map<String,Node> pageNodes = new Map<String,Node>();
    for (int i = 0; i < pages.length; i++) {
      var node = new Node(pages[i].nameWithoutGroup);
      pageNodes[pages[i].name] = node;
      if (pages[i].group != null) {
        node.parent = pageGroupNodes[pages[i].groupName];
      }
      graphML.addNode(node);
    }
    
    // create graph edges
    for (int i = 0; i < pages.length; i++) {
      BuilderPage page = pages[i];
      for (int j = 0; j < page.gotoPageNames.length; j++) {
        String gotoHandle = page.gotoPageNames[j];
          
        if (pageHandles.containsKey("${page.groupName}: $gotoHandle")) {
          graphML.addEdge(
              pageNodes[page.name], 
              pageNodes["${page.groupName}: $gotoHandle"]);
        } else if (pageHandles.containsKey(gotoHandle)) {
            graphML.addEdge(
                pageNodes[page.name], 
                pageNodes[gotoHandle]);
        } else {
          WARNING( "Choice links to a non-existent page ('$gotoHandle')"
                " in page ${page.name}. Creating new page/node.");
          
          var newPage = new BuilderPage(gotoHandle, pages.length);
          var node = new Node(newPage.nameWithoutGroup);
          pageNodes[newPage.name] = node;
          if (newPage.group != null) {
            node.parent = pageGroupNodes[newPage.groupName];
          }
          graphML.addNode(node);
          
          graphML.addEdge(
              pageNodes[page.name], 
              pageNodes[newPage.name]);
        }
      }
    }
    
    graphML.updateXml();
  }
  
  /**
   * Opens the .graphml file, updates [graphML] from it, then calls
   * [updateFromGraphML()].
   */
  Future<bool> updateFromGraphMLFile() {
//    Completer completer = new Completer();
    
    var pathToInputGraphML = getPathFor("graphml");
    File graphmlInputFile = new File.fromPath(pathToInputGraphML);
    
    graphML = new GraphML.fromFile(graphmlInputFile); // TODO: make async!
    
    updateFromGraphML();
    return new Future.immediate(true);
  }
  
  /**
   * Updates the Builder instance from the current state of [graphML].
   */ 
  void updateFromGraphML() {
    // populate map of all nodes in graph
    Map<String,Node> nodesToAdd = new Map<String,Node>();
    for (var node in graphML.nodes) {
      nodesToAdd[node.fullText] = node;
    }
    
    // walk the existing Builder instance
    for (int i = 0; i < pages.length; i++) {
      BuilderPage page = pages[i];
      bool pageStays = nodesToAdd.containsKey(page.name);
      if (pageStays) {
        Node node = nodesToAdd[page.name];
        // populate map of all linked nodes
        Set<Node> linkedNodesToAdd = new Set<Node>.from(node.linkedNodes);
        Map<String,Node> linkedPageFullNamesToAdd = new Map<String,Node>();
        for (var node in linkedNodesToAdd) {
          linkedPageFullNamesToAdd[node.fullText] = node;
        }
        
        // create set of gotoPageNames to be deleted
        Set<String> gotoPageNamesToDelete = new Set<String>();
        
        // walk through goto links
        for (var gotoPageName in page.gotoPageNames) {
          // make sure 
          bool linkStays = linkedPageFullNamesToAdd.containsKey(gotoPageName);
          if (linkStays) {
            var linkedNode = linkedPageFullNamesToAdd[gotoPageName];
            linkedNodesToAdd.remove(linkedNode);
          } else {
            gotoPageNamesToDelete.add(gotoPageName);
          }
        }
        
        // delete excesive gotos
        page.gotoPageNames = page.gotoPageNames
                       .filter((name) => !gotoPageNamesToDelete.contains(name));
        
        // add remaining linked nodes
        for (var linkedNode in linkedNodesToAdd) {
          page.gotoPageNames.add(linkedNode.fullText);
        }
      } else {
        page.commentOut = true;
      }
      
      // remove the node from "stack" if it's there
      nodesToAdd.remove(page.name);
    }
    
    // TODO: add new groupNodes
    
    // add remaining nodes
    nodesToAdd.forEach((String fullText, Node node) {
      
      int newIndex = pages.last().index + 1;
      var newPage = new BuilderPage(fullText, newIndex);
      pageHandles[fullText] = newIndex;
      node.linkedNodes.forEach(
          (linkedPage) => newPage.gotoPageNames.add(linkedPage.fullText)); // TODO: no need to fully qualify sometimes
      pages.add(newPage);
    });
  }
  
  /**
   * Updates the .egb file according to the current state of the Builder 
   * instance. 
   */
  Future<Builder> updateEgbFile() {
    var completer = new Completer();
    
    var tempFile = new File.fromPath(getPathFor("egb~"));
    File outputEgbFile;
    
    var tempInStream = inputEgbFile.openInputStream();
    tempInStream.pipe(tempFile.openOutputStream(FileMode.WRITE));
    tempInStream.onClosed = () {
      outputEgbFile = inputEgbFile;
      inputEgbFile = tempFile;
      var rawInputStream = inputEgbFile.openInputStream();
      var outStream = outputEgbFile.openOutputStream(FileMode.WRITE);
      
      if (pages.length == 0) {
        // right now, we can only update pages, so a file without pages stays the same
        rawInputStream.pipe(outStream);
      } else {
        var inStream = new StringInputStream(rawInputStream);
        
        // TODO: rewrite based on logical structure (i.e. insert new pages where they belong)
        
        int lineNumber = 0;
        BuilderPage page;
        Set<BuilderPage> pagesToAdd = new Set.from(pages);
        Set<String> gotoPageNamesToAdd;
        inStream.onLine = () {
          lineNumber++;
          String line = inStream.readLine();

          if (page != null && page.lineEnd < lineNumber) {
            // add remaining gotos
            bool addingPages = !gotoPageNamesToAdd.isEmpty();
            for (var gotoPageName in gotoPageNamesToAdd) {
              outStream.writeString(
                  "- $gotoPageName (AUTO) [$gotoPageName]\n");
            }
            if (addingPages) outStream.writeString("\n");
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
            BuilderBlock choiceBlock;
            for (var candidate in page.blocks.filter(
                (block) => block.type == BuilderBlock.BLK_CHOICE)) {
              if (_insideLineRange(lineNumber, candidate)) {
                choiceBlock = candidate;
                break;
              }
            }
            if (choiceBlock != null) {
              if (page.gotoPageNames.some((goto) => goto == choiceBlock.options["goto"])
                  || page.gotoPageNames.some((goto) => goto == "${page.groupName}: ${choiceBlock.options['goto']}")) {
                outStream
                  ..writeString(line)
                  ..writeString("\n");
                gotoPageNamesToAdd.remove(choiceBlock.options["goto"]);
                gotoPageNamesToAdd.remove("${page.groupName}: ${choiceBlock.options['goto']}");
              } else {
                // choiceBlock shouldn't be here, to be deleted -- do nothing
              }
            } else {
              // normal line, just copy
              outStream
                ..writeString(line)
                ..writeString("\n");
            }
          } else {
            // outside any page - just copy
            outStream
              ..writeString(line)
              ..writeString("\n");
          }
        
        };

        inStream.onClosed = () {
          for (var page in pagesToAdd) {
            outStream
              ..writeString("\n---\n")
              ..writeString(page.name)
              ..writeString("\n\n");
            
            for (var gotoPageName in page.gotoPageNames) {
              outStream.writeString(
                  "- $gotoPageName (AUTO) [$gotoPageName]\n");
            }
          }
          
          outStream.close();
          
          // TODO: delete egb~
          inputEgbFile.delete();
          inputEgbFile = outputEgbFile;
          
          new Builder().readEgbFile(inputEgbFile).then((Builder b) {
            completer.complete(b);;
          });
        };
        inStream.onError = (e) {
          completer.completeException(e);
        };
      }
    };
    
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
      strBuf.add(" ");
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
      throw "Range with lineStart == ${range.lineStart} has lineEnd == null.";
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

#import('../../lib/src/egb_library.dart');
#import('dart:math');
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

  void WARNING(String msg, {int line}) {
    if (!?line) {
      line = _lineNumber;
    }
    String str = (line == null) ? msg : "$msg (line:$line)";
    
    print(str);
    warningLines.add(str);
  }
}
