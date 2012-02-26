#import('dart:io');

// TODO: because of the UTF8 issue, export strings to JSON? it probably has other advantages, too (modularity, less compiling, smaller source

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

String filename;

List<String> inLines;
Map<String,Page> pages;
List<String> libraryLines;

List<String> outLibLines;
List<String> outPagesLines;

final String implStartFile = """
#library('Scripter Implementation');

#import('../egb_library.dart');

class ScripterImpl extends Scripter {

  /* LIBRARY */

""";

final String implStartPages = """
  ScripterImpl() : super() {
    pages = [
      /* PAGES & BLOCKS */
""";


final String implEndFile = """
    ];
  }
}
""";

void parse() {
  RegExp blankLine = new RegExp(@"^\s*$");
  RegExp hr = new RegExp(@"^\-\-\-+$"); // ----
  RegExp dartTagStart = new RegExp(@"^\s*<dart>\s*$");
  RegExp dartTagEnd = new RegExp(@"^\s*</dart>\s*$");
  RegExp libraryTagStart = new RegExp(@"^\s*<library>\s*$");
  RegExp libraryTagEnd = new RegExp(@"^\s*</library>\s*$");
  RegExp choice = new RegExp(@"^\- (.+) \[([a-zA-Z_][a-zA-Z0-9_]*)\]$");
  RegExp validName = new RegExp(@"^[a-zA-Z_][a-zA-Z0-9_]*$");

  pages = new Map<String,Page>();
  libraryLines = new List<String>();
  Page previousPage;
  int currentPageIndex = 0;

  // first pass - find pages
  for (int i = 0; i < inLines.length; i++) {
    String line = inLines[i].trim();
    if (hr.hasMatch(line) && i < inLines.length - 1) {
      String nameCandidate = inLines[i+1].trim();
      if (validName.hasMatch(nameCandidate)) {
	if (previousPage != null)
	  previousPage.lineEnd = i - 1;
	pages[nameCandidate] = new Page(nameCandidate, currentPageIndex, lineStart:i);
	currentPageIndex++;
	previousPage = pages[nameCandidate];
	i++; // skip next line
      }
    }
  }
  previousPage.lineEnd = inLines.length - 1;

  // second pass - find blocks inside pages
  pages.forEach((String pageName, Page page) {
    print("Parsing page [${page.name}] <${page.lineStart},${page.lineEnd}>");
    page.blocks = new List<Block>();
    int currentBlockIndex = 0;
    for (int i = page.lineStart + 2; i < page.lineEnd; i++) {
      if (blankLine.hasMatch(inLines[i]))
	continue;
      String line = inLines[i].trim();
      if (choice.hasMatch(line)) {
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
	    new List.from(inLines.getRange(i+1, endTagIndex-i-1)),
	    currentBlockIndex,
	    Block.BLK_DART_SCRIPT
	  )
	);
	print("- Found new dart script.");
	currentBlockIndex++;
	i = endTagIndex;
	continue;
      } else if (libraryTagStart.hasMatch(line)) {
	int endTagIndex;
	for (int ii = i; ii < inLines.length; ii++)
	  if (libraryTagEnd.hasMatch(inLines[ii])) {
	    endTagIndex = ii;
	    break;
	  }
	if (endTagIndex == null)
	  throw new Exception("No end tag for opening <library> tag at $i found.");
	libraryLines.addAll(inLines.getRange(i+1, endTagIndex-i-1));
	print("- Found library script.");
	// notice: no "currentBlockIndex++". Library is not part of current page.
	i = endTagIndex;
	continue;
      } else {
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

void write() {
  String outFile = new File("$filename.dart");
  outFile.createSync();

  outFile.open(FileMode.WRITE);

  outFile.openHandler = (RandomAccessFile file) {
    file.writeStringSync(implStartFile);
    libraryLines.forEach((line) {
      file.writeStringSync("  $line\n");
    });
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

    file.writeStringSync(implEndFile);

    file.close();
  };

}

String escapeQuotes(String str) {
  return str.replaceAll(@'"', @'\"').replaceAll("\n", @"\n").replaceAll(@"$",""); // TODO: check for '\"' in the original string!
  // TODO: make it work with inline $variables
}

void main() {
  List<String> argv = (new Options()).arguments;

  if (argv.length < 1) {
    throw new Exception("Script called without argument. Please provide a file to work on.");
  }

  filename = argv[0];
  print("Opening $filename.");
  File inFile = new File(filename);
  if (!inFile.existsSync()) {
    print("File ${inFile.fullPath()} doesn't exist.");
    return null;
  }
  InputStream inStream = inFile.openInputStream();
  StringInputStream strInStream = new StringInputStream(inStream);
  
  strInStream.lineHandler = () {
    inLines = new List<String>();
    String line;
    do {
      line = strInStream.readLine();
      inLines.add(line);
    } while (line != null);
    inLines.removeLast();  // get rid of the null at the end

    // clean up
    inStream.close();

    // call the main parse function
    parse();

    // call the write function
    write();
  };

}
