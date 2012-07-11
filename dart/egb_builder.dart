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

        // This makes sure the parser remembers where it is during reading the file.
        _mode = _MODE_NORMAL;

        _lineNumber = 0;
        _pageNumber = 0;
        _blockNumber = 0;

        // Start reading
        strInputStream.onLine = () {

          // start finding every pattern at once, in a non-blocking way
          Futures.wait([
              checkNewPage(),
              checkPageOptions()
          ]).then((_) {
            // finished parsing line
            _lineNumber++;
            _prevLine = _thisLine;
            _thisLine = strInputStream.readLine();
            stdout.writeString(".");
          });
        };

        strInputStream.onClosed = () {
          print("\nReading input file has finished.");
          if (_mode != _MODE_NORMAL)
            throw "Corrupt file, didn't close a tag (_mode = ${_mode}).";
          completer.complete(this);
        };
      }
    });

    return completer.future;
  }


  Future<bool> checkNewPage() {
    if (_mode != _MODE_NORMAL || _prevLine == null || _thisLine == null)
      return new Future.immediate(false);

    if (hr.hasMatch(_prevLine) && validPageName.hasMatch(_thisLine)) {
      var name = validPageName.firstMatch(_thisLine).group(1);
      pageHandles[name] = _pageNumber;
      pages.add(new BuilderPage(name, _pageNumber++, _lineNumber));
      return new Future.immediate(true);
    } else {
      return new Future.immediate(false);
    }
  }

  Future<bool> checkPageOptions() {
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




  // These are available modes for the [mode] variable.
  static int _MODE_NORMAL = 1;
  static int _MODE_INSIDE_CLASSES = 2;
  static int _MODE_INSIDE_LIBRARY = 4;
  static int _MODE_INSIDE_INIT = 8;
  static int _MODE_INSIDE_SCRIPT = 16;
  static int _MODE_INSIDE_SCRIPT_TAG = 32;
  // This makes sure the parser remembers where it is during reading the file.
  int _mode;


  int _lineNumber;
  int _pageNumber;
  int _blockNumber;

  String _thisLine;
  String _prevLine;
}
