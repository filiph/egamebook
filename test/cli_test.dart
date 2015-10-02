library cli_test;

import 'dart:io';
import 'dart:async';
import 'package:test/test.dart';
import 'package:args/command_runner.dart';
import 'package:path/path.dart' as p;
import 'package:egamebook/command.dart';
import 'package:egamebook/src/cli/cli.dart';
import 'package:egamebook/presenters/html/main_entry_point.dart' show HTML_BOOK_DART_PATH_FROM_ENTRYPOINT, HTML_BOOK_ENTRYPOINT_PATH;

/// Where the template files for tests are located.
String templateFiles = "template_files";

/// Returns full path to the desired [fileName].
String getPath(String fileName) {
  var pathToScript = Platform.script.toFilePath();
  return p.join(p.dirname(pathToScript), fileName);
}

void createTemporaryDir(String path) {
  Directory temp = new Directory(path);
  temp.createSync();

  Directory tempWeb = new Directory(p.join(path, HTML_BOOK_ENTRYPOINT_PATH));
  tempWeb.createSync();
  Directory tempLib = new Directory(p.join(tempWeb.path, HTML_BOOK_DART_PATH_FROM_ENTRYPOINT));
  tempLib.createSync();
}

void deleteTemporaryDir(String path) {
  Directory temp = new Directory(path);
  temp.deleteSync(recursive: true);
}

/// Returns number of valid files in [path].
/// Valid file is either [File] or [Directory].
/// Symlinks are not counted.
int getNumberOfFilesInPath(String path) {
  Directory directory = new Directory(path);
  int validFiles = 0;

  if (!directory.existsSync()) {
    return -1;
  }

  directory.listSync(recursive: true, followLinks: false)
    .forEach((FileSystemEntity entity) {
      if (entity is File || entity is Directory) { //no symlinks
        validFiles++;
      }
  });

  return validFiles;
}

/// Class [ProjectCreatorStub] is a [ProjectCreator] which
/// uses testing templates.
class ProjectCreatorStub extends ProjectCreator {
  final String templates = getPath(templateFiles);
  ProjectCreatorStub(List params) : super(params);
}

/// Class [CreateCommandStub] is a [CreateCommand] which
/// uses [ProjectCreatorStub].
class CreateCommandStub extends CreateCommand {
  Worker createWorker(List params) {
    return new ProjectCreatorStub(params);
  }
}

const String SIMPLE_EGB_CONTENT = """
---
start

Some content of bodega .egb file.
""";

void main() {
  CommandRunner runner =
      new CommandRunner("egamebooktest", "Egamebook test builder.")
      ..addCommand(new CreateCommandStub())
      ..addCommand(new BuildCommand())
      ..addCommand(new WatchCommand());

  group("egamebook create", () {

    setUp(() {
      String path = getPath(templateFiles);

      createTemporaryDir(path);

      File bodega = new File(p.join(path, "bodega.egb"));
      bodega.writeAsStringSync(SIMPLE_EGB_CONTENT);
    });

    tearDown(() {
      String path = getPath(templateFiles);
      deleteTemporaryDir(path);
    });

    test("fails with no parameters", () {
      var callback = expectAsync((message) {
        List lines = message.split("\n");
        expect(lines[0], "Please specify valid name of the project.");
        expect(message.contains("Usage:"), isTrue);
      });

      runner.run(["create"]).catchError(callback);
    });

    test("fails with two parameters", () {
      var callback = expectAsync((message) {
        List lines = message.split("\n");
        expect(lines[0], "Please specify valid name of the project.");
        expect(message.contains("Usage:"), isTrue);
      });

      runner.run(["create", "test1", "test2"]).catchError(callback);
    });

    test("fails with . as a parameter", () {
      var callback = expectAsync((message) {
        List lines = message.split("\n");
        expect(lines[0], "Please specify valid name of the project.");
        expect(message.contains("Usage:"), isTrue);
      });

      runner.run(["create", "."]).catchError(callback);
    });

    test("fails on existing folder", () {
      String path = getPath("egbtemp");
      createTemporaryDir(path);

      var callback = expectAsync((message) {
        expect(message.contains("Folder $path already exists."), isTrue);
        deleteTemporaryDir(path);
      });

      runner.run(["create", path]).catchError(callback);
    });

    test("creates new project", () {
      String path = getPath("project_name");
      Directory temp = new Directory(path);

      if (temp.existsSync()) { //fixes it it remained from previous failed test.
        temp.deleteSync(recursive: true);
      }

      var callback = expectAsync((message) {
        List lines = message.split("\n");
        expect(lines[0], "New project in $path successfully created.");
        expect(temp.existsSync(), isTrue);
        expect(getNumberOfFilesInPath(path),
            getNumberOfFilesInPath(getPath(templateFiles)));
        temp.deleteSync(recursive: true);
      });

      runner.run(["create", path]).then(callback);
    });
  }, skip: "egamebook create is now on hold");

  group("egamebook build", () {

    setUp(() {
      String path = getPath(templateFiles);
      createTemporaryDir(path);

      File bodega = new File(p.join(path, "bodega.egb"));
      bodega.writeAsStringSync(SIMPLE_EGB_CONTENT);
    });

    tearDown(() {
      String path = getPath(templateFiles);
      deleteTemporaryDir(path);
    });

    test("fails with two parameters", () {
      var callback = expectAsync((message) {
        List lines = message.split("\n");
        expect(lines[0], "Please specify one project folder.");
        expect(message.contains("Usage:"), isTrue);
      });

      runner.run(["build", "test1", "test2"]).catchError(callback);
    });

    // TODO stupid - builds all files in test - also files/ - how to?
    // TODO commented to not build all files/
    /*test("builds with no parameters", () {
      var callback = expectAsync((message) {
        expect(message.contains("BUILD SUCCESSFULL!"), isTrue);
      });

      runner.run(["build"]).then(callback);
    });*/

    test("builds test project", () {
      var callback = expectAsync((message) {
        expect(message.contains("DONE."), isTrue);
      });

      runner.run(["build", getPath(templateFiles)]).then(callback);
    });

    test("builds project with no .egb files", () {
      String path = getPath("no_egb");
      createTemporaryDir(path);

      var callback = expectAsync((message) {
        List lines = message.split("\n");
        expect(lines[0], "BUILD FAILED!");
        expect(lines[1], "No .egb file in this directory.");
        deleteTemporaryDir(path);
      });

      runner.run(["build", path]).catchError(callback);
    });

    test("builds with .egb file as parameter", () {
      String path = getPath("test_build_egb_file");
      createTemporaryDir(path);

      File file = new File(p.join(path, "test1.egb"));
      file.writeAsStringSync(SIMPLE_EGB_CONTENT);

      var callback = expectAsync((message) {
        File fileHtmlBuild = new File(p.join(path, "web/test1.html.dart"));
        File fileDartBuild = new File(p.join(path, "lib/test1.dart"));

        expect(message.contains("DONE."), isTrue);
        expect(fileHtmlBuild.existsSync(), isTrue);
        expect(fileDartBuild.existsSync(), isTrue);
        deleteTemporaryDir(path);
      });

      runner.run(["build", "$path${Platform.pathSeparator}test1.egb"]).then(callback);
    });

    test("fails with .other file as parameter", () {
      String path = getPath("test_build_other_file");
      createTemporaryDir(path);

      File file = new File(p.join(path, "test1.other"));
      file.writeAsStringSync('Not supported file!');

      var callback = expectAsync((message) {
        List lines = message.split("\n");
        expect(lines[0], "BUILD FAILED!");
        expect(lines[1],
            "File type of $path${Platform.pathSeparator}test1.other is not supported.");
        deleteTemporaryDir(path);
      });

      runner.run(["build", "$path${Platform.pathSeparator}test1.other"]).catchError(callback);
    });

    test("fails with more than one .egb file in directory", () {
      String path = getPath("test_build_egb_file_more");
      createTemporaryDir(path);

      File file1 = new File(p.join(path, "test1.egb"));
      file1.writeAsStringSync(SIMPLE_EGB_CONTENT);
      File file2 = new File(p.join(path, "test2.egb"));
      file2.writeAsStringSync(SIMPLE_EGB_CONTENT);

      var callback = expectAsync((message) {
        List lines = message.split("\n");
        expect(lines[0], "BUILD FAILED!");
        expect(lines[1],
            "More than one .egb file found in the directory.");
        deleteTemporaryDir(path);
      });

      runner.run(["build", "$path"]).catchError(callback);
    });

    test("builds more .egb files with -f or --full-directory parameter", () {
      String path = getPath("test_build_egb_file_more");
      createTemporaryDir(path);

      File file1 = new File(p.join(path, "test1.egb"));
      file1.writeAsStringSync(SIMPLE_EGB_CONTENT);
      File file2 = new File(p.join(path, "test2.egb"));
      file2.writeAsStringSync(SIMPLE_EGB_CONTENT);

      var callback = expectAsync((message) {
        File fileHtmlBuild1 = new File(p.join(path, "web/test1.html.dart"));
        File fileDartBuild1 = new File(p.join(path, "lib/test1.dart"));
        File fileHtmlBuild2 = new File(p.join(path, "web/test2.html.dart"));
        File fileDartBuild2 = new File(p.join(path, "lib/test2.dart"));
        expect(fileHtmlBuild1.existsSync(), isTrue);
        expect(fileDartBuild1.existsSync(), isTrue);
        expect(fileHtmlBuild2.existsSync(), isTrue);
        expect(fileDartBuild2.existsSync(), isTrue);
        deleteTemporaryDir(path);
      });

      runner.run(["build", "--full-directory", "$path"]).then(callback);
    });
  });

  group("egamebook getEgbFiles", () {
    test("returns correct .egb files", () {
      String path = getPath("test_search_egb");
      createTemporaryDir(path);

      File file1 = new File(p.join(path, "test1.egb"));
      file1.createSync();
      File file2 = new File(p.join(path, "test2.egb"));
      file2.createSync();
      File file3 = new File(p.join(path, "test3.egb"));
      file3.createSync();

      ProjectBuilder builder = new ProjectBuilder([], false, true);

      var callback = expectAsync((List files) {
        expect(files.length, 3);
        expect(p.basename(files[0].path), "test1.egb");
        expect(p.basename(files[1].path), "test2.egb");
        expect(p.basename(files[2].path), "test3.egb");
        deleteTemporaryDir(path);
      });

      builder._getEgbFiles(path).then(callback);
    });
  });

  group("egamebook watch", () {

    test("builds .egb file after change", () {
      String path = getPath("test_watch");
      createTemporaryDir(path);

      File file = new File(p.join(path, "test1.egb"));

      var callback = expectAsync((fileName) {
        // Starts watching
        new Future.delayed(new Duration(seconds: 1), () {
          file.writeAsStringSync(SIMPLE_EGB_CONTENT);
          // Waiting for builder which build file
          new Future.delayed(new Duration(seconds: 2), () {
            File fileHtmlBuild = new File(p.join(path, "web/test1.html.dart"));
            File fileDartBuild = new File(p.join(path, "lib/test1.dart"));
            expect(fileHtmlBuild.existsSync(), isTrue);
            expect(fileDartBuild.existsSync(), isTrue);
            deleteTemporaryDir(path);
          });
        });
      });

      runner.run(["watch", path]).then(callback);
    });
  });
}