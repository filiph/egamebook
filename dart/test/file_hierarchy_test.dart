import 'dart:io';
import 'dart:async';
import 'package:test/test.dart';
import 'package:args/command_runner.dart';
import 'package:path/path.dart' as p;
import 'package:egamebook/command.dart';
import 'package:egamebook/src/cli/cli.dart';
import 'package:egamebook/src/cli/file_hierarchy.dart';

/// Returns full path to the desired [fileName].
String getPath(String fileName) {
  var pathToScript = Platform.script.toFilePath();
  return p.join(p.dirname(pathToScript), fileName);
}

void main() {
  FileHierarchy hierarchy = new FileHierarchy();

  group("file hierarchy", () {

    test("returns correct number of .egb files in directory", () {
      Directory directory = new Directory(getPath("project_egb_files"));
      directory.createSync();

      File file1 = new File(p.join(directory.path, "file1.txt"));
      file1.createSync();
      File file2 = new File(p.join(directory.path, "file2.egb"));
      file2.createSync();

      List files = hierarchy.listFiles(directory);
      expect(files.length, 1);
      expect(p.basename(files[0].path) == "file2.egb", isTrue);

      directory.deleteSync(recursive: true);
    });

    test("gets master file for part file", () {
      Directory directory = new Directory(getPath("project_master_part"));
      directory.createSync();

      File file1 = new File(p.join(directory.path, "file1.egb"));
      file1.createSync();
      File file2 = new File(p.join(directory.path, "file1_ahoj.egb"));
      file2.createSync();

      // Now create a hierarchy
      hierarchy.create(fromDirectory: directory);

      File master = hierarchy.getMasterFile(file2);
      expect(master.path == file1.path, isTrue);

      master = hierarchy.getMasterFile(file1);
      expect(master.path == file1.path, isTrue);

      directory.deleteSync(recursive: true);
    });

    test("gets master file for part file called from master file", () {
      Directory directory = new Directory(getPath("project_master_part"));
      directory.createSync();

      File file1 = new File(p.join(directory.path, "file1.egb"));
      file1.createSync();
      File file2 = new File(p.join(directory.path, "file1_ahoj.egb"));
      file2.createSync();

      // Now create a hierarchy
      hierarchy.create(fromFile: file1);

      File master = hierarchy.getMasterFile(file2);
      expect(master.path == file1.path, isTrue);

      master = hierarchy.getMasterFile(file1);
      expect(master.path == file1.path, isTrue);

      directory.deleteSync(recursive: true);
    });

    test("gets master file for part file called from part file", () {
      Directory directory = new Directory(getPath("project_master_part"));
      directory.createSync();

      File file1 = new File(p.join(directory.path, "file1.egb"));
      file1.createSync();
      File file2 = new File(p.join(directory.path, "file1_ahoj.egb"));
      file2.createSync();

      // Now create a hierarchy
      hierarchy.create(fromFile: file2);

      File master = hierarchy.getMasterFile(file2);
      expect(master.path == file1.path, isTrue);

      master = hierarchy.getMasterFile(file1);
      expect(master.path == file1.path, isTrue);

      directory.deleteSync(recursive: true);
    });

    test("returns if the file is part or not", () {
      Directory directory = new Directory(getPath("project_master_part"));
      directory.createSync();

      File file1 = new File(p.join(directory.path, "file1.egb"));
      file1.createSync();
      File file2 = new File(p.join(directory.path, "file1_ahoj.egb"));
      file2.createSync();

      // Now create a hierarchy
      hierarchy.create(fromDirectory: directory);

      bool isPart = hierarchy.isPartFile(file1);
      expect(isPart, isFalse);

      isPart = hierarchy.isPartFile(file2);
      expect(isPart, isTrue);

      directory.deleteSync(recursive: true);
    });
  });
}