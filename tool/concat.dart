import 'dart:io';


void main() {
  Directory d = new Directory("drivedump");

  for (var entity in d.listSync(recursive: true)) {
    if (!entity.path.endsWith(".txt")) continue;
    var file = new File(entity.path);
    var lines = file.readAsLinesSync();
    print("\n\n\n");
    print("=== File: ${file.path} ===");
    print("\n");
    for (var line in lines) {
      print(line);
    }
  }
}
