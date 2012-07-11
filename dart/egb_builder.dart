#library("egb_builder");

#import('dart:io');

// TODO: convert all non-ASCII characters to HTML entities (&iacute; done, but what about czech chars?)
// TODO: generate a Map<String,int> so that goto("someRoom"); works inside <script> blocks
// TODO: another region is "initialize" - to init vars["smthing"] so that they're there no matter where you open the gamebook.
// XXX: consolidate all the blocks automatically - classes go to class, functions go to library, everything else goes to init.
// TODO: make it easy to package libraries and import them - importLibrary("FGBE", version:1.0);
// XXX: use markdown block_parser.dart for parsing the text (just line parser is fine)
// XXX: make sure v_something -> vars["something"] doesn't break quotes (like in echo("something v_something");)

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
  int index;
  int lineStart;
  int lineEnd;
  int type;
  List<String> lines;

  static final int BLK_TEXT = 1;
  static final int BLK_SCRIPT = 2;
  static final int BLK_CHOICE = 4;

  BuilderBlock(this.lines, this.index, this.type) {}
}

class Builder {

  Builder() {
    pages = new List<BuilderPage>();
    pageHandles = new Map<String,int>();
    initLines = new List<String>();
    libraryLines = new List<String>();
    classesLines = new List<String>();
  }

  Future<Builder> readFile(File f) {
    var completer = new Completer();

    f.exists()
    .then((exists) {
      if (!exists)
        throw new FileIOException("File ${f.name} doesn't exist.");
      else {
        var strInputStream = new StringInputStream(f.openInputStream());

        // iterate over all lines in input file
        print("Reading input file ${f.name}");

        // These are available modes for the [mode] variable.
        final int MODE_NORMAL = 1;
        final int MODE_INSIDE_CLASSES = 1;
        final int MODE_INSIDE_LIBRARY = 1;
        final int MODE_INSIDE_INIT = 1;
        final int MODE_INSIDE_SCRIPT = 1;
        final int MODE_INSIDE_SCRIPT_TAG = 1;
        // This makes sure the parser remembers where it is during reading the file.
        int mode = MODE_NORMAL;

        int lineNumber = 0; int pageNumber = 0; int blockNumber = 0;
        String thisLine = "";
        String prevLine = "";

        // Start reading
        strInputStream.onLine = () {
          thisLine = strInputStream.readLine();
          stdout.writeString(".");

          if (mode == MODE_NORMAL) {
            // new page?
            if (hr.hasMatch(prevLine) && validPageName.hasMatch(thisLine)) {
              var name = validPageName.firstMatch(thisLine).group(1);
              pageHandles[name] = pageNumber;
              pages.add(new BuilderPage(name, pageNumber++, lineNumber));
            }

            // page options?
            if (!pages.isEmpty() && pages.last().lineStart == lineNumber - 1
                && pageOptions.hasMatch(thisLine)) {
              Match m = pageOptions.firstMatch(thisLine);
              for (var i = 1; i <= m.groupCount(); i += 2) {
                var opt = m.group(i);
                if (opt != null)
                  pages.last().options.add(opt);
              }
            }
          }


          // finished reading line
          lineNumber++;
          prevLine = thisLine;
        };

        strInputStream.onClosed = () {
          print("\nReading input file has finished.");
          if (mode != MODE_NORMAL)
            throw "Corrupt file, didn't close a tag.";
          completer.complete(this);
        };
      }
    });

    return completer.future;
  }




  List<BuilderPage> pages;
  Map<String, int> pageHandles;
  List<String> initLines;
  List<String> libraryLines;
  List<String> classesLines;

  RegExp blankLine = const RegExp(@"^\s*$");
  RegExp hr = const RegExp(@"^\s*\-\-\-+\s*$"); // ----
  RegExp validPageName = const RegExp(@"^\s*(.+)\s*$");
  RegExp pageOptions = const RegExp(@"^\s*\[\[\s*(\w+)([\s,]+(\w+))*\s*]\]\s*$");
  RegExp scriptTagStart = const RegExp(@"^\s*<script>\s*$");
  RegExp scriptTagEnd = const RegExp(@"^\s*</script>\s*$");
  RegExp initTagStart = const RegExp(@"^\s*<init>\s*$");
  RegExp initTagEnd = const RegExp(@"^\s*</init>\s*$");
  RegExp libraryTagStart = const RegExp(@"^\s*<library>\s*$");
  RegExp libraryTagEnd = const RegExp(@"^\s*</library>\s*$");
  RegExp classesTagStart = const RegExp(@"^\s*<classes>\s*$");
  RegExp classesTagEnd = const RegExp(@"^\s*</classes>\s*$");
  RegExp choice = const RegExp(@"^\- (.+) \[([a-zA-Z_][a-zA-Z0-9_]*)\]$");

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

}
