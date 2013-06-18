import 'dart:io';
import 'package:args/args.dart';
import 'package:egamebook/builder.dart';

bool graphInput, graphOutput, compile;

builderReadyHandler(Builder b) {
  if (graphInput) {
    print("Warning: updateFromGraphMLFile currently not implemented."); //b.updateFromGraphMLFile();
    b.updateEgbFile().then(builderReadyHandler);
    graphInput = false;
    return;
  }    
  if (graphOutput) {
    print("Warning: writeGraphMLFile currently not implemented."); //b.writeGraphMLFile();
  }
  if (compile) {
    b.writeDartFiles()
    .then((_) {
      print("Done.");
    });
  }
}

void main() {
  Options options = new Options();
  
  var parser = new ArgParser();
  parser.addFlag("scaffold", defaultsTo:false, negatable:false,
      help:"Creates a scaffold with a 'hello world' egamebook "
           "in the books/ directory."); // TODO
  parser.addFlag("compile", abbr:"c", defaultsTo:true,
      help:"Compile given .egb file to .dart files.");
  parser.addFlag("graph-output", abbr:"g", defaultsTo:false,
      help:"Create or update GraphML (yEd) file from existing .egb file.");
  parser.addFlag("graph-input", abbr:"u", defaultsTo:false,
      help:"Update existing .egb file from given GraphML (yEd) file.");
  
  var results = parser.parse(options.arguments);
  graphInput = results["graph-input"];
  graphOutput = results["graph-output"];
  compile = results["compile"];

  // TODO: if scaffold==true, then make minimal .egb file in example/new.
  
  if (results.rest.length < 1) {
    print("Script called without file argument. Please provide file to work on.");
    print(parser.getUsage());
    return;
  }
  var filename = results.rest[0];
  
  new Builder().readEgbFile(new File(filename))
  .then(builderReadyHandler);
}