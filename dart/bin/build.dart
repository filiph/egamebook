#import('dart:io');

#import('../lib/egb_builder.dart');

void main() {
  Options options = new Options();

  if (options.arguments.length < 1) {
    throw new Exception("Script called without argument. Please provide a file to work on.");
  }

  new Builder().readFile(new File(options.arguments[0]))
  .then((Builder b) {
    b.writeDartFiles()
    .then((_) {
      print("Done.");
    });
  });
}
