#import('dart:io');

#import('html_entities.dart');

// TODO: convert all non-ASCII characters to HTML entities (&iacute; done, but what about czech chars?)

// TODO: generate a Map<String,int> so that goto("someRoom"); works inside <dart> blocks

// TODO: another region is "initialize" - to init vars["smthing"] so that they're there no matter where you open the gamebook. XXX: consolidate all the blocks automatically - classes go to class, functions go to library, everything else goes to init.

// TODO: make it easy to package libraries and import them - importLibrary("FGBE", version:1.0);

// XXX: use markdown block_parser.dart for parsing the text (just line parser is fine)

// XXX: make sure v_something -> vars["something"] doesn't break quotes (like in echo("something v_something");)

class Page {
  int index;
  int lineStart;
  int lineEnd;
  String name;
  List<Block> blocks;

  Page(this.name, this.index, [this.lineStart]) {}
}

class Block {
  int index;
  int lineStart;
  int lineEnd;
  int type;
  List<String> lines;

  static final int BLK_TEXT = 1;
  static final int BLK_DART_SCRIPT = 2;
  static final int BLK_CHOICE = 4;

  Block(this.lines, this.index, this.type) {}
}

String scriptFilePath;
String scriptDirPath;
String inFilePath;
String inFileName;

List<String> inLines;
Map<String,Page> pages;
List<String> initLines;
List<String> libraryLines;
List<String> classesLines;

List<String> outLibLines;
List<String> outPagesLines;

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

/**
  The main workhorse. Parses the input .egb file, finding scripts, pages, etc.
  Saves everything to gobal vars.
  */
void parse() {
  RegExp blankLine = new RegExp(@"^\s*$");
  RegExp hr = new RegExp(@"^\-\-\-+$"); // ----
  RegExp dartTagStart = new RegExp(@"^\s*<dart>\s*$");
  RegExp dartTagEnd = new RegExp(@"^\s*</dart>\s*$");
  RegExp initTagStart = new RegExp(@"^\s*<init>\s*$");
  RegExp initTagEnd = new RegExp(@"^\s*</init>\s*$");
  RegExp libraryTagStart = new RegExp(@"^\s*<library>\s*$");
  RegExp libraryTagEnd = new RegExp(@"^\s*</library>\s*$");
  RegExp classesTagStart = new RegExp(@"^\s*<classes>\s*$");
  RegExp classesTagEnd = new RegExp(@"^\s*</classes>\s*$");
  RegExp choice = new RegExp(@"^\- (.+) \[([a-zA-Z_][a-zA-Z0-9_]*)\]$");
  RegExp validName = new RegExp(@"^[a-zA-Z_][a-zA-Z0-9_]*$");

  pages = new Map<String,Page>();
  initLines = new List<String>();
  libraryLines = new List<String>();
  classesLines = new List<String>();

  // Lines that can be skipped because their contents are already accounted for
  Set<int> _processedLines = new Set<int>();

  Page previousPage;
  int currentPageIndex = 0;

  // first pass - find pages & library/init lines
  for (int i = 0; i < inLines.length; i++) {
    String line = inLines[i].trim();
    if (hr.hasMatch(line) && i < inLines.length - 1) {
      /* PAGE START */
      String nameCandidate = inLines[i+1].trim();
      if (validName.hasMatch(nameCandidate)) {
        if (previousPage != null)
          previousPage.lineEnd = i - 1;
        pages[nameCandidate] = new Page(nameCandidate, currentPageIndex, lineStart:i);
        currentPageIndex++;
        previousPage = pages[nameCandidate];
        i++; // skip next line
        continue;
      }

    } else if (initTagStart.hasMatch(line)) {
      /* INIT */
      int endTagIndex;
      for (int ii = i; ii < inLines.length; ii++) {
        if (initTagEnd.hasMatch(inLines[ii])) {
          endTagIndex = ii;
          break;
        }
      }
      if (endTagIndex == null)
        throw new Exception("No end tag for opening <init> tag at $i found.");
      initLines.addAll(inLines.getRange(i+1, endTagIndex-i-1).map((String line) => substituteVars(line)));
      print("- Found init script.");
      _processedLines.addAll(range(i, endTagIndex));
      i = endTagIndex;
      continue;

    } else if (classesTagStart.hasMatch(line)) {
      /* CLASSES */
      int endTagIndex;
      for (int ii = i; ii < inLines.length; ii++) {
        // print("Line: ${inLines[ii]}");
        if (classesTagEnd.hasMatch(inLines[ii])) {
          endTagIndex = ii;
          break;
        }
      }
      if (endTagIndex == null)
        throw new Exception("No end tag for opening <classes> tag at $i found.");
      classesLines.addAll(inLines.getRange(i+1, endTagIndex-i-1));
      print("- Found classes script.");
      _processedLines.addAll(range(i, endTagIndex));
      i = endTagIndex;
      continue;

    } else if (libraryTagStart.hasMatch(line)) {
      /* LIBRARY */
      int endTagIndex;
      for (int ii = i; ii < inLines.length; ii++) {
        if (libraryTagEnd.hasMatch(inLines[ii])) {
          endTagIndex = ii;
          break;
        }
      }
      if (endTagIndex == null)
        throw new Exception("No end tag for opening <library> tag at $i found.");
      libraryLines.addAll(inLines.getRange(i+1, endTagIndex-i-1));
      print("- Found library script.");
      _processedLines.addAll(range(i, endTagIndex));
      i = endTagIndex;
      continue;
    }
  }
  previousPage.lineEnd = inLines.length;

  // second pass - find blocks inside pages
  pages.forEach((String pageName, Page page) {
      print("Parsing page [${page.name}] <${page.lineStart},${page.lineEnd}>");
      page.blocks = new List<Block>();
      int currentBlockIndex = 0;
      for (int i = page.lineStart + 2; i < page.lineEnd; i++) {
        if (blankLine.hasMatch(inLines[i]))
          continue;
        if (_processedLines.contains(i))
          continue;
        String line = inLines[i].trim();

        if (choice.hasMatch(line)) {
          /* CHOICE */
          Match choiceMatch = choice.firstMatch(line);
          String choiceStr = escapeQuotes(choiceMatch.group(1));
          String choiceLink = choiceMatch.group(2);
          if (!pages.containsKey(choiceLink))
            throw new Exception("$choiceLink page does not exist!");
          page.blocks.add(
            new Block(
              ["\"string\":\"${choiceStr}\",",
              "\"goto\":${pages[choiceLink].index}"],
              currentBlockIndex,
              Block.BLK_CHOICE
              )
            );
          print("- Found a new choice: $choiceStr [$choiceLink].");
          currentBlockIndex++;
          continue;

        } else if (dartTagStart.hasMatch(line)) {
          /* PAGES - DART BLOCK */
          int endTagIndex;
          for (int ii = i; ii < inLines.length; ii++)
            if (dartTagEnd.hasMatch(inLines[ii])) {
              endTagIndex = ii;
              break;
            }
          if (endTagIndex == null)
            throw new Exception("No end tag for opening <dart> tag at $i found.");
          page.blocks.add(
              new Block(
                new List.from(inLines.getRange(i+1, endTagIndex-i-1).map((String line) => substituteVars(line))),
                currentBlockIndex,
                Block.BLK_DART_SCRIPT
                )
              );
          print("- Found new dart script.");
          currentBlockIndex++;
          i = endTagIndex;
          continue;

        } else {
          /* PAGE - TEXT BLOCK */
          page.blocks.add(
              new Block(
                [escapeQuotes(inLines[i])],
                currentBlockIndex,
                Block.BLK_TEXT
                )
              );
          print("- Found paragraph: ${escapeQuotes(inLines[i]).substring(0,Math.min(15,inLines[i].length-1))}...");
          currentBlockIndex++;
        }
      }
  });
}

/**
  Utility function. Returns a set of integers from [start] to [end] (inclusive).
  */
Set<int> range(int start, int end) {
  Set<int> result = new Set<int>();
  for (int i=start; i <= end; i++)
    result.add(i);
  return result;
}


// replace v_vars to vars["vars"]  TODO: make sure it works in "string literals, too"
String substituteVars(String str) {
  RegExp varsRegExp = const RegExp(@"v_([a-zA-Z_][a-zA-Z0-9_]*)");
  Match m;
  while ((m = varsRegExp.firstMatch(str)) != null) {
    str = str.replaceAll(m.group(0), "vars[\"${m.group(1)}\"]");
  }
  return str;
}

void write() {
  print("Data loaded.");
  print("- ${initLines.length} init lines");
  print("- ${classesLines.length} classes lines");
  print("- ${libraryLines.length} library lines");
  print("- ${pages.length} pages");

  RegExp importEgbLibrary = const RegExp(@"#import.*\(.*egb_library.dart.*\).*;");

  int lastDotPosition = inFilePath.lastIndexOf(".");
  int lastSlashPosition = inFilePath.lastIndexOf("/");

  // get filename stubs
  String outFilePathStub;
  String outDirPath = inFilePath.substring(0, lastSlashPosition);
  if (lastDotPosition < lastSlashPosition) // make sure we're actually overwriting a file extension
    outFilePathStub = "$inFilePath";
  else
    outFilePathStub = "${inFilePath.substring(0, lastDotPosition)}";

  // write the ScripterImplementation file
  File outFile = new File("$outFilePathStub.dart");
  outFile.createSync();
  outFile.open(FileMode.WRITE)
  .then((RandomAccessFile file) {
    print("File $outFilePathStub.dart created. Writing.");
    file.writeStringSync(implStartFile); // TODO: fix path to #import('../egb_library.dart');
    classesLines.forEach((line) {
        file.writeStringSync("$line\n");
    });
    file.writeStringSync(implStartClass);
    libraryLines.forEach((line) {
        file.writeStringSync("  $line\n");
    });
    file.writeStringSync(implStartCtor);
    file.writeStringSync(implStartPages);

    for (int i = 0; i < pages.length; i++) {
      Page page;
      pages.forEach((String key, Page p) {
          if (p.index == i)
          page = p;
      });

      String indent = "      ";

      file.writeStringSync("$indent// ${page.name}\n");
      file.writeStringSync("$indent[\n");

      page.blocks.forEach((block) {
          indent = "        ";
          String commaOrNot = block.index < page.blocks.length - 1 ? "," : "";
          if (block.type == Block.BLK_TEXT) {
          // TODO: solve for more than one line?
          file.writeStringSync("$indent\"${block.lines[0]}\"$commaOrNot\n");
          } else if (block.type == Block.BLK_CHOICE) {
          file.writeStringSync("$indent{\n");
          block.lines.forEach((line) {
            file.writeStringSync("$indent$line\n");
          });
          file.writeStringSync("$indent}$commaOrNot\n");
          } else if (block.type == Block.BLK_DART_SCRIPT) {
          file.writeStringSync("$indent() {\n");
          block.lines.forEach((line) {
            file.writeStringSync("$indent$line\n");
          });
          file.writeStringSync("$indent}$commaOrNot\n");
          }
          });

      indent = "      ";

      if (i < pages.length - 1)
        file.writeStringSync("$indent],\n");
      else
        file.writeStringSync("$indent]\n");
    }
    file.writeStringSync(implEndPages);
    file.writeStringSync(implEndCtor);

    file.writeStringSync(implStartInit);
    initLines.forEach((line) {
        file.writeStringSync("    $line\n");
    });
    file.writeStringSync(implEndInit);

    file.writeStringSync(implEndClass);
    file.writeStringSync(implEndFile);

    file.close().then((_) {
        print("Scripter file written and closed.");
    });
  });


  // we have the scripter file, now let's make the others
  outFile.fullPath()
  .then((String outFilePath) {

      // create the cmd_line interface file  TODO: DRY with next file
      print("Writing $outFilePathStub.cmdline.dart file.");
      Future<List<String>> cmdlineLines = getLines("$scriptDirPath/egb_interface_cmdline.dart");

      File cmdLineFile = new File("$outFilePathStub.cmdline.dart");
      cmdLineFile.createSync();
      cmdLineFile.open(FileMode.WRITE)
      .then((RandomAccessFile file) {
        cmdlineLines.then((List<String> lines) {
            for (String line in lines) {
              if (importEgbLibrary.hasMatch(line))
                file.writeString("#import('$scriptDirPath/egb_library.dart');\n");
              else if (line.contains("#import('samples/unit-testing.markdown.dart');")) 
                file.writeString("#import('$outFilePath');\n");
              else
                file.writeString("$line\n");
            }

            file.close().then((_) {
              print("Cmdline file written and closed.");
            });
        });
      });

      // create the html interface file (as opposed to cmdline interface)
      print("Writing $outFilePathStub.html.dart file.");
      Future<List<String>> htmlUiLines = getLines("$scriptDirPath/egb_interface_html.dart");

      File htmlUiFile = new File("$outFilePathStub.html.dart");
      htmlUiFile.createSync();
      htmlUiFile.open(FileMode.WRITE)
      .then((RandomAccessFile file) {
        htmlUiLines.then((List<String> lines) {
            for (String line in lines) {
              if (importEgbLibrary.hasMatch(line))
                file.writeString("#import('$scriptDirPath/egb_library.dart');\n");
              else if (line.contains("#import('samples/unit-testing.markdown.dart');")) 
                file.writeString("#import('$outFilePath');\n");
              else
                file.writeString("$line\n");
            }

            file.close().then((_) {
              print("Html interface file written and closed.");
            });
        });
      });

      // TODO: create the something.dart.html interface file (works directly with the Dart script)

      // TODO: create the something.js.html interface file (works with the compiled JavaScript)
  });
}

String escapeQuotes(String str) {
  String result = HtmlEntities.toHtml(str);
  return result.replaceAll("\n", @"\n").replaceAll(@"$","");
  //return str.replaceAll(@'"', @'\"').replaceAll("\n", @"\n").replaceAll(@"$",""); // TODO: check for '\"' in the original string!
  // TODO: make it work with inline $variables
}


Future<List<String>> getLines(String inFilePath) {
  print("Opening $inFilePath.");
  Completer completer = new Completer();
  
  File inFile = new File(inFilePath);
  if (!inFile.existsSync()) {
    print("File ${inFile.fullPath()} doesn't exist.");
    return null;
  }
  InputStream inStream = inFile.openInputStream();
  StringInputStream strInStream = new StringInputStream(inStream);

  strInStream.onLine = () {
    List<String> lines = new List<String>();
    String line;
    do {
      line = strInStream.readLine();
      lines.add(line);
    } while (line != null);
    lines.removeLast();  // get rid of the null at the end

    // clean up
    inStream.close();
    
    completer.complete(lines);
  };

  return completer.future;
}


void main() {
  Options options = new Options();

  if (options.arguments.length < 1) {
    throw new Exception("Script called without argument. Please provide a file to work on.");
  }
  
  // TODO: make platform agnostic
  scriptFilePath = options.script;
  int lastSlashIndex = scriptFilePath.lastIndexOf('/');
  if (lastSlashIndex == -1)
    scriptDirPath = ".";
  else
    scriptDirPath = "${scriptFilePath.substring(0, scriptFilePath.lastIndexOf('/'))}";

  inFilePath = options.arguments[0];
  inFileName = inFilePath.substring(inFilePath.lastIndexOf("/") + 1);

  /*getLines(inFilePath).then((List<String> lines) {
      inLines = lines;
      parse();
      write();
      // TODO: call dartc/frog to create the JS file (currently in the shell script)
  });*/

  new File(inFilePath).readAsLines().then((List<String> lines) {
      inLines = lines;
      parse();
      write();
  });
}
