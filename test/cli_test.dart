library cli_test;

import 'dart:io';
import 'dart:async';
import 'dart:collection';
import 'package:test/test.dart';
import 'package:args/command_runner.dart';
import 'package:path/path.dart' as p;
import 'package:egamebook/command.dart';
import 'package:egamebook/src/cli/cli.dart';
import 'package:egamebook/presenters/html/main_entry_point.dart'
    show HTML_BOOK_DART_PATH_FROM_ENTRYPOINT, HTML_BOOK_ENTRYPOINT_PATH;

/// Where the template files for tests are located.
const String TEMPLATE_FILES = "template_files";
const String TEMPLATE_BOOK_NAME = "bodega.egb";

String getTemplateBookNameWithoutExtension() =>
    p.basenameWithoutExtension(TEMPLATE_BOOK_NAME);

/// Returns full path to the desired [fileName].
String getPath(String fileName) {
  var pathToScript = Platform.script.toFilePath();
  return p.join(p.dirname(pathToScript), fileName);
}

/// Creates temporary dir on [path] with all needed assets
/// to be able to build it.
void createTemporaryDir(String path) {
  Directory temp = new Directory(path);
  temp.createSync();

  Directory tempWeb = new Directory(p.join(path, HTML_BOOK_ENTRYPOINT_PATH));
  tempWeb.createSync();
  Directory tempLib =
      new Directory(p.join(tempWeb.path, HTML_BOOK_DART_PATH_FROM_ENTRYPOINT));
  tempLib.createSync();
}

/// Deletes temporary dir on [path].
void deleteTemporaryDir(String path) {
  Directory temp = new Directory(path);
  temp.deleteSync(recursive: true);
}

const String SIMPLE_EGB_CONTENT = """
---
start

Some content of bodega .egb file.
""";
const String SIMPLE_PUBSPEC = """
name: 'example test'
version: 0.0.1
description: The first full-featured egamebook for test.
author: <author@example.com>
homepage: http://www.example.com

environment:
  sdk: '>=1.0.0 <2.0.0'

dependencies:
  browser: '>=0.10.0 <0.11.0'
""";

void main() {
  CommandRunner runner =
      new CommandRunner("egamebooktest", "Egamebook test builder.")
        ..addCommand(new CreateCommand())
        ..addCommand(new BuildCommand())
        ..addCommand(new WatchCommand());

  group("egamebook create", () {
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
      String path = getPath("folder_exists");
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

      if (temp.existsSync()) {
        //fixes it it remained from previous failed test.
        temp.deleteSync(recursive: true);
      }

      var callback = expectAsync((message) {
        List lines = message.split("\n");
        expect(lines[0].contains("New project in $path successfully created."),
            isTrue);
        expect(temp.existsSync(), isTrue);
        expect(new File(p.join(path, "pubspec.yaml")).existsSync(), isTrue);
        expect(
            new File(p.join(path, ProjectCreator.NAME_OF_EXAMPLE_BOOK))
                .existsSync(),
            isTrue);
        temp.deleteSync(recursive: true);
      });

      runner.run(["create", path]).then(callback);
    });
  });

  group("egamebook build", () {
    setUp(() {
      String path = getPath(TEMPLATE_FILES);
      createTemporaryDir(path);

      File bodega = new File(p.join(path, TEMPLATE_BOOK_NAME));
      bodega.writeAsStringSync(SIMPLE_EGB_CONTENT);
    });

    tearDown(() {
      String path = getPath(TEMPLATE_FILES);
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

    test("builds template project", () {
      String path = getPath(TEMPLATE_FILES);

      var callback = expectAsync((_) {
        File fileHtmlBuild = new File(p.join(
            path, "web/${p.withoutExtension(TEMPLATE_BOOK_NAME)}.html.dart"));
        File fileDartBuild = new File(
            p.join(path, "lib/${p.withoutExtension(TEMPLATE_BOOK_NAME)}.dart"));

        expect(fileHtmlBuild.existsSync(), isTrue);
        expect(fileDartBuild.existsSync(), isTrue);
      });

      runner.run(["build", path]).then(callback);
    });

    test("builds project with no .egb files", () {
      String path = getPath("no_egb");
      createTemporaryDir(path);

      var callback = expectAsync((message) {
        List lines = message.split("\n");
        expect(lines[0].contains("No .egb file in this directory."), isTrue);
        expect(lines[1].contains("BUILD FAILED!"), isTrue);
        deleteTemporaryDir(path);
      });

      runner.run(["build", path]).catchError(callback);
    });

    test("builds with .egb file as parameter", () {
      String path = getPath(TEMPLATE_FILES);

      var callback = expectAsync((message) {
        String templateFileName = getTemplateBookNameWithoutExtension();
        File fileHtmlBuild =
            new File(p.join(path, "web/${templateFileName}.html.dart"));
        File fileDartBuild =
            new File(p.join(path, "lib/${templateFileName}.dart"));

        expect(fileHtmlBuild.existsSync(), isTrue);
        expect(fileDartBuild.existsSync(), isTrue);
      });

      runner.run(["build", p.join(path, TEMPLATE_BOOK_NAME)]).then(callback);
    });

    test("fails with .other file as parameter", () {
      String path = getPath(TEMPLATE_FILES);

      File file = new File(p.join(path, "test1.other"));
      file.writeAsStringSync('Not supported file!');

      var callback = expectAsync((message) {
        List lines = message.split("\n");
        expect(lines[1].contains("BUILD FAILED!"), isTrue);
        expect(
            lines[0].contains(
                "File type of $path${Platform.pathSeparator}test1.other is not supported."),
            isTrue);
      });

      runner.run([
        "build",
        "$path${Platform.pathSeparator}test1.other"
      ]).catchError(callback);
    });

    test("fails with more than one .egb file in directory", () {
      String path = getPath(TEMPLATE_FILES);

      File file1 = new File(p.join(path, "someotherbodega.egb"));
      file1.writeAsStringSync(SIMPLE_EGB_CONTENT);

      var callback = expectAsync((message) {
        List lines = message.split("\n");
        expect(
            lines[0]
                .contains("More than one .egb file found in the directory."),
            isTrue);
        expect(
            lines[1].contains(
                "To run builder on more .egb files in directory use argument --full-directory or -f."),
            isTrue);
        expect(lines[2].contains("BUILD FAILED!"), isTrue);
      });

      runner.run(["build", path]).catchError(callback);
    });

    test("builds more .egb files with -f or --full-directory parameter", () {
      String path = getPath(TEMPLATE_FILES);

      File file1 = new File(p.join(path, "someotherbodega.egb"));
      file1.writeAsStringSync(SIMPLE_EGB_CONTENT);

      var callback = expectAsync((message) {
        String templateFileName = getTemplateBookNameWithoutExtension();
        File fileHtmlBuild1 =
            new File(p.join(path, "web/${templateFileName}.html.dart"));
        File fileDartBuild1 =
            new File(p.join(path, "lib/${templateFileName}.dart"));
        File fileHtmlBuild2 =
            new File(p.join(path, "web/someotherbodega.html.dart"));
        File fileDartBuild2 =
            new File(p.join(path, "lib/someotherbodega.dart"));
        expect(fileHtmlBuild1.existsSync(), isTrue);
        expect(fileDartBuild1.existsSync(), isTrue);
        expect(fileHtmlBuild2.existsSync(), isTrue);
        expect(fileDartBuild2.existsSync(), isTrue);
      });

      runner.run(["build", "--full-directory", "$path"]).then(callback);
    });
  });

  group("egamebook getEgbFiles", () {
    setUp(() {
      String path = getPath(TEMPLATE_FILES);
      createTemporaryDir(path);

      File bodega = new File(p.join(path, TEMPLATE_BOOK_NAME));
      bodega.writeAsStringSync(SIMPLE_EGB_CONTENT);
    });

    tearDown(() {
      String path = getPath(TEMPLATE_FILES);
      deleteTemporaryDir(path);
    });

    test("returns correct .egb files", () {
      String path = getPath(TEMPLATE_FILES);

      File file1 = new File(p.join(path, "${TEMPLATE_BOOK_NAME}2.egb"));
      file1.writeAsStringSync(SIMPLE_EGB_CONTENT);
      File file2 = new File(p.join(path, "${TEMPLATE_BOOK_NAME}3.egb"));
      file2.writeAsStringSync(SIMPLE_EGB_CONTENT);

      ProjectBuilder builder = new ProjectBuilder([], false, true);

      var callback = expectAsync((ListQueue queue) {
        List files = new List.from(queue);
        expect(files.length, 3);
        expect(p.basename(files[0].path), TEMPLATE_BOOK_NAME);
        expect(p.basename(files[1].path), "${TEMPLATE_BOOK_NAME}2.egb");
        expect(p.basename(files[2].path), "${TEMPLATE_BOOK_NAME}3.egb");
      });

      builder.getEgbFiles(path).then(callback as FilesCallback);
    });

    test("returns correct .egb files with part files", () {
      String path = getPath(TEMPLATE_FILES);

      String templateFileName = getTemplateBookNameWithoutExtension();
      File file1 = new File(p.join(path, "${templateFileName}_part1.egb"));
      file1.writeAsStringSync(SIMPLE_EGB_CONTENT);
      File file2 = new File(p.join(path, "${templateFileName}_part2.egb"));
      file2.writeAsStringSync(SIMPLE_EGB_CONTENT);
      File file3 = new File(p.join(path, "${templateFileName}_part3.egb"));
      file3.writeAsStringSync(SIMPLE_EGB_CONTENT);

      ProjectBuilder builder = new ProjectBuilder([], false, true);

      var callback = expectAsync((ListQueue queue) {
        List files = new List.from(queue);
        expect(files.length, 1);
        expect(p.basename(files[0].path), TEMPLATE_BOOK_NAME);
      });

      builder.getEgbFiles(path).then(callback as FilesCallback);
    });

    test("returns correct .egb files from file", () {
      String path = getPath(TEMPLATE_FILES);

      String templateFileName = getTemplateBookNameWithoutExtension();
      String pathFile = p.join(path, "${templateFileName}_part1.egb");
      File file1 = new File(pathFile);
      file1.writeAsStringSync(SIMPLE_EGB_CONTENT);

      ProjectBuilder builder = new ProjectBuilder([], false, true);

      var callback = expectAsync((ListQueue queue) {
        List files = new List.from(queue);
        expect(files.length, 1);
        expect(p.basename(files[0].path), TEMPLATE_BOOK_NAME);
      });

      builder.getEgbFiles(pathFile).then(callback as FilesCallback);
    });
  });

  group("egamebook watch", () {
    test("builds .egb file after change", () {
      String path = getPath(TEMPLATE_FILES);
      createTemporaryDir(path);

      File file = new File(p.join(path, TEMPLATE_BOOK_NAME));

      var callback = expectAsync((fileName) {
        // Starts watching
        new Future.delayed(new Duration(seconds: 1), () {
          file.writeAsStringSync(SIMPLE_EGB_CONTENT);
          // Waiting for builder which builds file
          new Future.delayed(new Duration(seconds: 2), () {
            String templateFileName = getTemplateBookNameWithoutExtension();
            File fileHtmlBuild =
                new File(p.join(path, "web/${templateFileName}.html.dart"));
            File fileDartBuild =
                new File(p.join(path, "lib/${templateFileName}.dart"));
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

typedef void FilesCallback(ListQueue<File> files);