library egb_cli;

import 'dart:core' hide Resource;
import 'dart:async';
import 'dart:io';
import 'dart:collection';
import 'file_hierarchy.dart';
import 'package:path/path.dart' as p;
import 'package:watcher/watcher.dart';
import 'package:egamebook/builder.dart';
import 'package:egamebook/presenters/html/main_entry_point.dart'
    show HTML_BOOK_DART_PATH_FROM_ENTRYPOINT, HTML_BOOK_ENTRYPOINT_PATH;
import 'package:ansicolor/ansicolor.dart';
import 'package:resource/resource.dart';

/// Abstract class [Worker] is an interface for all worker classes
/// which process the commands.
abstract class Worker {
  /// Runs processing of the command.
  Future run();
}

/// Class [ProjectCreator] creates new egamebook project by generating files
/// from templates in templates directory.
class ProjectCreator implements Worker {
  /// Name of the example .egb book which will be copied into new project.
  static const String NAME_OF_EXAMPLE_BOOK = "example.egb";

  /// Path to the template source files in package.
  static const String RESOURCE_PATH = "package:egamebook/example/";

  /// Map of files and directories to be created in new project.
  final Map _templateFiles = {
    "directory": ["web", "lib"],
    "file": [NAME_OF_EXAMPLE_BOOK, "pubspec.yaml", "README.md", "LICENSE"]
  };

  /// Path where the project is created.
  final String _path;

  /// Creates new ProjectCreator with List of [params].
  ProjectCreator(List params) : _path = params.first;

  /// Runs creating of new project.
  Future run() {
    return createProject();
  }

  /// Creates new project files from template into desired destination.
  /// If desired destination already exists, copying fails and user should select
  /// new destination.
  ///
  /// After successful creation of project, the [:pub get:] is run.
  Future createProject() async {
    Directory to = new Directory(_path);
    if (!await to.exists()) {
      print("Creating new project in $_path...");
      await to.create(recursive: true);
    } else {
      return new Future.error(new StateError(OutputMessage.outputFailed(
          "Folder $_path already exists. Please use different folder name.")));
    }

    await _createProjectFiles(to);
    await _runPubGet(_path);

    return new Future.value(OutputMessage
        .outputSuccessful("New project in $_path successfully created."));
  }

  /// Creates project files and directories from [_templateFiles] Map.
  Future _createProjectFiles(Directory to) async {
    StringBuffer errors = new StringBuffer();

    await Future.forEach(
        _templateFiles.keys,
        ((String type) async {
          await Future.forEach(
              _templateFiles[type],
              ((String name) async {
                String resourcePath = p.join(_path, name);

                if (type == "directory") {
                  Directory directory = new Directory(resourcePath);
                  await directory.create(recursive: true);
                } else if (type == "file") {
                  try {
                    //load resource and read the text from it.
                    Resource resource = new Resource("$RESOURCE_PATH$name");
                    String text = await resource.readAsString();
                    File file = new File(resourcePath);
                    //we are writing text files only at the moment.
                    await file.writeAsString(text);
                  } catch (e) {
                    //when the resource doesn't exist.
                    //pubspec.yaml and example.egb are mandatory for the project
                    //so we need to copy them from template files to be able to
                    //proceed.
                    //When they do not exist, the errors is filled with messages.
                    if (name == "pubspec.yaml" ||
                        name == NAME_OF_EXAMPLE_BOOK) {
                      errors.writeln(
                          "File $name doesn't exist in template files.");
                    }
                  }
                }
              }));
        }));

    //The project creation is unsuccessful in case of any errors and
    //the project directory is then deleted.
    if (errors.isNotEmpty) {
      await to.delete(recursive: true);
      return new Future.error(
          OutputMessage.outputFailed(errors.toString().trim()));
    }
  }

  /// Runs pub get command line tool on given [path].
  Future _runPubGet(String path) async {
    print("Running pub get...");
    var result = await Process.run("pub", ["get"], workingDirectory: path);
    stdout.write(result.stdout);
    stderr.write(result.stderr);
  }
}

/// Class [ProjectBuilder] starts running of the builder from command line.
/// Before building, the .egb file is searched and when it is found,
/// the build process is started.
///
/// It's also possible to run command with -a or --analyze to run analyzer
/// after each build.
///
/// Builder can be launched in forms:
///     build
///     build .
///     build <path>
///     build <egb_file>
///     build -a
///     build -a .
///     build -a <path>
///     build -a <egb_file>
class ProjectBuilder extends Object with BuilderInterface implements Worker {
  /// File extension which is searched.
  static const String EXTENSION = ".egb";

  /// Path used for search.
  final String _path;

  /// If the builder should run on all .egb files in directory.
  final bool _fullDirectory;

  /// File hierarchy for getting master file from part file.
  final FileHierarchy _hierarchy;

  /// Creates new ProjectBuilder with List of [params] and if [_analyze] and
  /// [_fullDirectory].
  ProjectBuilder(List params, bool _analyze, this._fullDirectory)
      : _path = (params.isEmpty) ? "." : params.first,
        _hierarchy = new FileHierarchy() {
    analyze = _analyze;
  }

  /// Runs building of project.
  Future run() {
    return buildProject();
  }

  /// Runs egamebook builder on found .egb file(s) in [_path].
  ///
  /// The files are retrieved as a [List] which is then converted to
  /// [ListQueue] and then the build is run on every file in this queue.
  Future buildProject() async {
    Completer completer = new Completer();

    try {
      ListQueue<File> files = await getEgbFiles(_path);
      build(files, completer);
    } catch (error) {
      completer.completeError(error);
    }

    return completer.future;
  }

  /// Returns every .egb file name from path in [ListQueue].
  /// If no .egb file is found or more than one file, build fails.
  ///
  /// If [_fullDirectory] is true, builder is run on all .ebg files in directory.
  /// Without that only one .egb file to build in folder is allowed.
  Future<ListQueue<File>> getEgbFiles(String path) async {
    ListQueue<File> queue;

    //running on a single .egb file
    if (p.extension(path).isNotEmpty) {
      if (p.extension(path) == EXTENSION) {
        File file = new File(path);
        if (!await file.exists()) {
          throw new StateError(
              OutputMessage.buildFailed("File $path doesn't exist."));
        }
        queue = new ListQueue.from(_hierarchy.create(fromFile: file));
        return queue;
      } else {
        throw new StateError(
            OutputMessage.buildFailed("File type of $path is not supported."));
      }
    }

    Directory from = new Directory(path);
    if (!await from.exists()) {
      throw new StateError(
          OutputMessage.buildFailed("Directory $path doesn't exist."));
    }

    queue = new ListQueue.from(_hierarchy.create(fromDirectory: from));
    if (queue.isEmpty) {
      throw new StateError(
          OutputMessage.buildFailed("No $EXTENSION file in this directory."));
    } else if (!_fullDirectory && queue.length > 1) {
      throw new StateError(OutputMessage
          .buildFailed("More than one .egb file found in the directory.\n"
              "To run builder on more .egb files in directory "
              "use argument --full-directory or -f."));
    }

    return queue;
  }
}

/// Class [ProjectWatcher] watches for desired file types in the project
/// and runs builder after change on the file.
///
/// It's also possible to run command with -a or --analyze to run analyzer
/// after each build.
///
/// Watcher can be launched in forms:
///     watch
///     watch .
///     watch <path>
///     watch -a
///     watch -a .
///     watch -a <path>
class ProjectWatcher extends Object with BuilderInterface implements Worker {
  /// File extension watched.
  static const String EXTENSION = ".egb";

  /// Path used for watching.
  final String _path;

  /// File hierarchy for getting master file from part file.
  final FileHierarchy _hierarchy;

  /// Creates new ProjectWatcher with List of [params] and if [_analyze].
  ProjectWatcher(List params, bool _analyze)
      : _path = (params.isEmpty) ? "." : params.first,
        _hierarchy = new FileHierarchy() {
    analyze = _analyze;
  }

  /// Runs watching of project.
  Future run() {
    return watchProject();
  }

  /// Runs builder after each .egb file change.
  ///
  /// When file is removed, we don't want to rebuild.
  ///
  /// Every valid event (which wraps changed path) for build is added into
  /// [ListQueue] and built when it's right time for it.
  Future watchProject() async {
    Directory directory = new Directory(_path);

    if (p.extension(_path).isNotEmpty) {
      return new Future.error(OutputMessage.outputFailed(
          "Watching of files is not supported. Run watcher on directory"));
    } else if (!await directory.exists()) {
      return new Future.error(OutputMessage
          .outputFailed("Given source directory $_path doesn't exist."));
    }

    // Sanity check.
    if (!await new Directory(p.join(_path, HTML_BOOK_ENTRYPOINT_PATH))
            .exists() ||
        !await new Directory(p.join(_path, HTML_BOOK_ENTRYPOINT_PATH,
                HTML_BOOK_DART_PATH_FROM_ENTRYPOINT))
            .exists()) {
      return new Future.error(OutputMessage
          .outputFailed("Must run watcher on a directory that is a "
              "Dart web applications package (it must have "
              "lib/, web/, pubspec.yaml and all that)."));
    }

    _watch(directory);

    return new Future.value("Watching for changes in project...");
  }

  void _watch(Directory directory) {
    DirectoryWatcher watcher = new DirectoryWatcher(_path);
    ListQueue<File> queue = new ListQueue(); // queue of files
    _hierarchy.create(fromDirectory: directory);

    watcher.events.listen((WatchEvent event) {
      File masterFile = _hierarchy.getMasterFile(new File(event.path));

      if (event.type != ChangeType.REMOVE &&
          p.extension(masterFile.path) == EXTENSION) {
        queue.add(masterFile);
        Completer completer = new Completer();
        build(queue, completer);
      }
    }, onError: print);
  }
}

/// Class [BuilderInterface] wraps the functionality around building of .egb
/// files with possibility of running Dart analyzer.
class BuilderInterface {
  /// If the built file should be analyzed.
  bool analyze;

  /// If builder is building at the moment.
  bool _building = false;

  /// If analyzer is analyzing at the moment.
  bool _analyzing = false;

  /// Builds recursively all files in [queue].
  /// If the queue is already empty, it completes with success.
  /// If analyzer option is set, the analyzer is run after build.
  Future build(ListQueue queue, Completer completer) async {
    if (!_building && !_analyzing) {
      String pathDart;
      bool isError = false;
      File file = queue.removeFirst();

      try {
        pathDart = _getBuiltFileFromEgbFile(file.path);
        _building = true;
        await _runBuilder(file.path);
        _building = false;
      } catch (error) {
        isError = true;
      }

      if (isError || !await new File(pathDart).exists()) {
        print(OutputMessage.buildFailed());
        //failed but still try to build next one.
      } else {
        if (analyze) {
          _analyzing = true;
          await _runAnalyzer(pathDart);
          _analyzing = false;
        }
        print(OutputMessage.buildSuccessful());
      }

      return _buildOrComplete(queue, completer);
    }
  }

  /// Builds next file in [queue] or completes with success.
  Future _buildOrComplete(ListQueue queue, Completer completer) {
    if (queue.isEmpty) {
      completer.complete();
    } else {
      build(queue, completer);
    }

    return completer.future;
  }

  /// Runs [Builder] on path on given [path].
  Future _runBuilder(String path) async {
    print("Building $path...");
    Builder builder = await new Builder().readEgbFile(new File(path));
    return builder.writeDartFiles();
  }

  /// Runs dartanalyzer command line tool on given [path].
  Future _runAnalyzer(String path) async {
    print("Running analyzer on $path...");
    var result = await Process.run("dartanalyzer", [path]);
    stdout.write(result.stdout);
    stderr.write(result.stderr);
  }

  /// Returns built file name from .egb file or [:null:].
  String _getBuiltFileFromEgbFile(String path) {
    return Builder.getExtensionPathFromEgbPath(path, "dart",
        subdirectory: p.join(
            HTML_BOOK_ENTRYPOINT_PATH, HTML_BOOK_DART_PATH_FROM_ENTRYPOINT));
  }
}

/// Class OutputMessage formats build String messages with colored output.
class OutputMessage {
  /// Pens for changing text color in console.
  static AnsiPen _successPen = new AnsiPen()..green();
  static AnsiPen _failurePen = new AnsiPen()..red();

  /// Returns build failed message with [message] and optional [coloredOutput].
  static String buildFailed([String message, bool coloredOutput = true]) {
    message = (message == null) ? "" : "$message\n";
    return outputFailed("${message}BUILD FAILED!", coloredOutput);
  }

  /// Returns build successful message with [message] and optional [coloredOutput].
  static String buildSuccessful([String message, bool coloredOutput = true]) {
    message = (message == null) ? "" : "$message\n";
    return outputSuccessful("${message}BUILD SUCCESSFUL!", coloredOutput);
  }

  static String outputFailed(String message, [bool coloredOutput = true]) =>
      (coloredOutput) ? _failurePen(message) : message;

  static String outputSuccessful(String message, [bool coloredOutput = true]) =>
      (coloredOutput) ? _successPen(message) : message;
}
