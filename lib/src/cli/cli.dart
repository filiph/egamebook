library egb_cli;

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
  static final String _nameOfExampleBook = "example.egb";

  /// Map of files and directories to be created.
  final Map _templateFiles = {
    "directory": ["web", "lib"],
    "file": [_nameOfExampleBook, "pubspec.yaml", "README.md", "LICENSE"]
  };

  /// Path to the template source files in package.
  final String _templateResourcePath = "package:egamebook/example/";

  /// Path where the project is created.
  final String _path;

  /// Creates new ProjectCreator with List of [params].
  ProjectCreator(List params) : _path = params.first;

  /// Runs creating of new project.
  Future run() {
    return _createProjectFiles(_templateResourcePath, _templateFiles, _path);
  }

  /// Creates new project files from template into [pathTo] destination.
  /// If [pathTo] already exists, copying fails and user should select
  /// new destination.
  ///
  /// After successful creation of the project, the [:pub get:] is then run.
  Future _createProjectFiles(
      String resourcePath, Map files, String pathTo) async {
    StringBuffer errors = new StringBuffer();

    Directory to = new Directory(pathTo);
    if (!await to.exists()) {
      print("Creating new project in $pathTo...");
      await to.create(recursive: true);
    } else {
      return new Future.error(OutputMessage.outputFailed(
          "Folder $pathTo already exists. Please use different folder name."));
    }

    await Future.forEach(
        _templateFiles.keys,
        ((String type) async {
          Directory directory;
          File file;
          Resource resource;
          String text;

          await Future.forEach(
              _templateFiles[type],
              ((String name) async {
                String path = p.join(pathTo, name);

                if (type == "directory") {
                  directory = new Directory(path);
                  await directory.create(recursive: true);
                } else if (type == "file") {
                  try {
                    //load resource and read the text from it.
                    resource = new Resource("$resourcePath$name");
                    text = await resource.readAsString();
                    file = new File(path);
                    await file.writeAsString(text);
                  } catch (e) {
                    //when the resource doesn't exist.
                    //pubspec.yaml and example.egb are mandatory for the project
                    //so we need to copy them from template files to be able to proceed.
                    //When they do not exist, the errors is filled with messages.
                    if (name == "pubspec.yaml" || name == _nameOfExampleBook) {
                      errors.writeln(
                          "File $name doesn't exist in template files.");
                    }
                  }
                }
              }));
        }));

    //The project creation is unsuccessful in case of errors.
    if (errors.isNotEmpty) {
      to.deleteSync(recursive: true);
      return new Future.error(OutputMessage.outputFailed(errors.toString()));
    }

    var process = await _runPubGet(pathTo);
    await Future.wait(
        [stdout.addStream(process.stdout), stderr.addStream(process.stderr)]);

    return new Future.value(
        OutputMessage.outputSuccessful("New project in $_path successfully created."));
  }

  /// Synchronously copies file from [pathFrom] to [pathTo].
  void _copyFileSync(String pathFrom, String pathTo) {
    File from = new File(pathFrom);
    File to = new File(pathTo);

    to.writeAsBytesSync(from.readAsBytesSync());
  }

  /// Runs pub get command line tool on given [path].
  Future _runPubGet(String path) {
    print("Running pub get...");
    return Process.start("pub", ["get"], workingDirectory: path);
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

  /// Runs egamebook builder on found .egb file in [_path].
  ///
  /// The files are retrieved as a [List] which is then converted to
  /// [ListQueue] and then the build is run on every file in this queue.
  Future run() async {
    Completer completer = new Completer();

    try {
      List files = await getEgbFiles(_path);
      ListQueue<File> queue = new ListQueue.from(files);
      build(queue, completer);
    } catch (error) {
      completer.completeError(error);
    }

    return completer.future;
  }

  /// Returns every .egb file name in the given [path] as [Future].
  /// If no .egb file is found or more than one file, build fails.
  ///
  /// If [_fullDirectory] is true, builder is run on all .ebg files in directory.
  /// Without that only one .egb file to build in folder is allowed.
  Future getEgbFiles(String path) {
    List files = [];

    if (p.extension(path).isNotEmpty) {
      //running on file
      if (p.extension(path) == EXTENSION) {
        File file = new File(path);
        if (!file.existsSync()) {
          return new Future.error(
              OutputMessage.buildFailed("File $path doesn't exist."));
        }

        files = _hierarchy.create(fromFile: file);
        return new Future.value(files);
      } else {
        return new Future.error(
            OutputMessage.buildFailed("File type of $path is not supported."));
      }
    }

    Directory from = new Directory(path);

    if (!from.existsSync()) {
      return new Future.error(
          OutputMessage.buildFailed("Directory $path doesn't exist."));
    }

    files = _hierarchy.create(fromDirectory: from);

    if (files.isEmpty) {
      return new Future.error(
          OutputMessage.buildFailed("No $EXTENSION file in this directory."));
    } else if (!_fullDirectory && files.length > 1) {
      return new Future.error(OutputMessage.buildFailed(
          "More than one .egb file found in the directory.\n"
          "To run builder on more .egb files in directory than one .egb file "
          "use argument --full-directory or -f."));
    }

    return new Future.value(files);
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

  /// Subscription to watcher events. Can be used to cancel watching.
  StreamSubscription _subscription;

  /// Getter returns [_subscription].
  StreamSubscription get subscription => _subscription;

  /// File hierarchy for getting master file from part file.
  final FileHierarchy _hierarchy;

  /// Creates new ProjectWatcher with List of [params] and if [_analyze].
  ProjectWatcher(List params, bool _analyze)
      : _path = (params.isEmpty) ? "." : params.first,
        _hierarchy = new FileHierarchy() {
    analyze = _analyze;
  }

  /// Runs builder after each file change.
  /// Builder regenerates files of only valid [extensions].
  ///
  /// The flow of builder is follows:
  ///
  /// When .egb file is changed, we don't want to rebuild also new (or updated)
  /// .dart and .html.dart files.
  ///
  /// When .dart file is changed, we don't want it to rebuild again and
  /// we don't want to rebuild also .html.dart file.
  ///
  /// When .html.dart file is changed, we don't want to rebuild anything.
  ///
  /// When file is removed, we don't want to rebuild.
  ///
  /// Every valid event (which wraps changed path) for build is added into
  /// [ListQueue] and built when it's right time for it.
  Future run() {
    Directory directory = new Directory(_path);

    if (p.extension(_path).isNotEmpty) {
      return new Future.error(
          "Watching of files is not supported. Run watcher on directory");
    } else if (!directory.existsSync()) {
      return new Future.error("Given source directory $_path doesn't exist.");
    }

    // Sanity check.
    if (!new Directory(p.join(_path, HTML_BOOK_ENTRYPOINT_PATH)).existsSync() ||
        !new Directory(p.join(_path, HTML_BOOK_ENTRYPOINT_PATH,
            HTML_BOOK_DART_PATH_FROM_ENTRYPOINT)).existsSync()) {
      return new Future.error("Must run watcher on a directory that is a "
          "Dart web applications package (it must have "
          "lib/, web/, pubspec.yaml and all that).");
    }

    _watch(directory);

    return new Future.value("Watching for changes in project...");
  }

  void _watch(Directory directory) {
    DirectoryWatcher watcher = new DirectoryWatcher(_path);
    ListQueue<File> queue = new ListQueue(); // queue of files
    _hierarchy.create(fromDirectory: directory);

    _subscription = watcher.events.listen((WatchEvent event) {
      File masterFile = _hierarchy.getMasterFile(new File(event.path));

      if (event.type != ChangeType.REMOVE &&
          !_isSourcesDirectory(masterFile.path) &&
          p.extension(masterFile.path) == EXTENSION) {
        queue.add(masterFile);
        Completer completer = new Completer();
        build(queue, completer);
      }
    }, onError: print);
  }

  /// Returns if the path is within bin/, lib/ or web/ directory.
  ///
  /// TODO maybe also test/.
  /// TODO add to constants
  bool _isSourcesDirectory(String path) {
    List segments = p.split(path);

    return segments.contains("bin") ||
        segments.contains("lib") ||
        segments.contains("web");
  }
}

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
      _building = true;

      try {
        pathDart = _getBuiltFileFromEgbFile(file.path);

        await _runBuilder(file.path);
        _building = false;
      } catch (error) {
        isError = true;
      }

      if (isError || !new File(pathDart).existsSync()) {
        print(OutputMessage.buildFailed());
        //failed but still try to build next one.
      } else {
        if (analyze) {
          _analyzing = true;

          var process = await _runAnalyzer(pathDart);
          await Future.wait([
            stdout.addStream(process.stdout),
            stderr.addStream(process.stderr)
          ]);
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

  /// Runs build.dart command line tool on given [path].
  Future _runBuilder(String path) async {
    print("Building $path...");
    Builder builder = await new Builder().readEgbFile(new File(path));
    return builder.writeDartFiles();
  }

  /// Runs dartanalyzer command line tool on given [path].
  Future _runAnalyzer(String path) {
    print("Running analyzer on $path...");
    return Process.start("dartanalyzer", [path]);
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
  /// For changing colors in console.
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
