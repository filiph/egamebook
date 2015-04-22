import 'dart:io';
import 'package:unittest/unittest.dart';
import 'package:args/command_runner.dart';
import 'package:path/path.dart' as p;
import 'package:egamebook/command.dart';
import 'package:egamebook/src/cli/cli.dart';

/// Where the template files for tests are located.
String templateFiles = "files";

/// Returns full path to the desired [fileName].
String getPath(String fileName) {
  var pathToScript = Platform.script.toFilePath();
  return p.join(p.dirname(pathToScript), fileName);
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

void main() {
  group("egamebook create", () {
    CommandRunner runner;
    Command command;

    setUp(() {
      runner =
          new CommandRunner("egamebooktest", "Egamebook test builder.");
      command = new CreateCommandStub();
      runner.addCommand(command);
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
      Directory temp = new Directory(path);
      temp.createSync();

      var callback = expectAsync((message) {
        expect(message.contains("Folder $path already exists."), isTrue);
        temp.deleteSync();
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

    // TODO remains project folder - why?S
    /*test("creates new nested path project", () {
      String path = getPath("project_name${Platform.pathSeparator}project_name2");
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
    });*/
  });

  group("egamebook build", () {
    CommandRunner runner;
    Command command;

    setUp(() {
      runner =
          new CommandRunner("egamebooktest", "Egamebook test builder.");
      command = new BuildCommand();
      runner.addCommand(command);
    });

    test("fails with two parameters", () {
      var callback = expectAsync((message) {
        List lines = message.split("\n");
        expect(lines[0], "Please specify one project folder.");
        expect(message.contains("Usage:"), isTrue);
      });

      runner.run(["build", "test1", "test2"]).catchError(callback);
    });

    test("builds with no parameters", () {
      var callback = expectAsync((message) {
        expect(message.contains("BUILD SUCCESSFULL!"), isTrue);
      });

      runner.run(["build"]).then(callback);
    });

    test("builds test project", () {
      var callback = expectAsync((message) {
        expect(message.contains("BUILD SUCCESSFULL!"), isTrue);
      });

      runner.run(["build", getPath("files")]).then(callback);
    });

    test("builds project with no .egb files", () {
      String path = getPath("no_egb");
      Directory temp = new Directory(path);
      temp.createSync();

      var callback = expectAsync((message) {
        List lines = message.split("\n");
        expect(lines[0], "BUILD FAILED!");
        expect(lines[1], "No .egb file in this directory.");
        temp.deleteSync();
      });

      runner.run(["build", path]).catchError(callback);
    });
  });

  group("egamebook build getEgbFile", () {
    test("returns correct .egb file", () {
      String path = getPath("test_search_egb");
      Directory temp = new Directory(path);
      temp.createSync();

      File file1 = new File(p.join(path, "test1.egb"));
      file1.createSync();
      File file2 = new File(p.join(path, "test2.egb"));
      file2.createSync();
      File file3 = new File(p.join(path, "test3.egb"));
      file3.createSync();

      ProjectBuilder builder = new ProjectBuilder([]);

      var callback = expectAsync((fileName) {
        expect(p.basename(fileName), "test1.egb");
        temp.deleteSync(recursive: true);
      });

      builder.getEgbFile(path).then(callback);
    });
  });
}