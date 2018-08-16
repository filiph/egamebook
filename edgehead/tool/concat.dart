import 'dart:io';

/// This simple tool exists for the sole purpose of generating a single
/// file from all the text in `assets/text/`. The file can be then sent
/// to Kindle or another reader for a read-through.
void main() {
  Directory d = Directory("assets/text/");

  for (var entity in d.listSync(recursive: true)) {
    if (!entity.path.endsWith(".txt")) continue;
    var file = File(entity.path);
    var lines = file.readAsLinesSync();
    print("\n\n\n");
    print("=== File: ${file.path} ===");
    print("\n");
    for (var line in lines) {
      print(line);
    }
  }
}
