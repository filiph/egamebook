library egb_cli;

import 'dart:async';
import 'dart:io';
import 'dart:collection';
import 'file_hierarchy.dart';
import 'package:path/path.dart' as p;
import 'package:watcher/watcher.dart';
import 'package:egamebook/builder.dart';
import 'package:egamebook/presenters/html/main_entry_point.dart' show HTML_BOOK_DART_PATH_FROM_ENTRYPOINT, HTML_BOOK_ENTRYPOINT_PATH;

/// Returns path relative to the running script in bin/.
///
/// TODO this will not work with pub run.
String getPath(String path)
  => Platform.script.resolve(path).toFilePath();

/// Returns if the path is within bin/, lib/ or web/ directory.
///
/// TODO maybe also test/.
/// TODO add to constants
bool isSourcesDirectory(String path) {
  List segments = p.split(path);

  return segments.contains("bin") || segments.contains("lib") ||
      segments.contains("web");
}

/// Class _OutputMessage formats String messages into console.
class _OutputMessage {
  static String buildFailed([String message]) {
    return _buildMessage("BUILD FAILED!");
  }
  static String buildSuccessfull([String message]) {
    return _buildMessage("BUILD SUCCESSFULL!");
  }
  static String _buildMessage(String successMessage, [String message]) {
    message = (message == null) ? "" : "\n$message";
    return "$successMessage$message";
  }
}

/// Abstract class [Worker] is an interface for all worker classes
/// which process the commands.
abstract class Worker {
  /// Runs processing of the command.
  Future run();
}

/// Class [ProjectCreator] creates new egamebook project by copying files
/// from templates directory.
class ProjectCreator implements Worker {
  /// Directory with template files.
  final String templates = getPath("../books${Platform.pathSeparator}bodega");
  /// Path where the project is created.
  final String _path;

  /// Creates new ProjectCreator with List of [params].
  ProjectCreator(List params) : _path = params.first;

  /// Runs creating of new project.
  Future run() {
    print("Creating new project...");
    return _copyProjectFilesSync(templates, _path);
  }

  /// Synchronously copies files from [pathFrom] to [pathTo] destination.
  /// If [pathFrom] doesn't exist, copying fails.
  /// If [pathTo] already exists, copying fails and user should select
  /// new destination.
  Future _copyProjectFilesSync(String pathFrom, String pathTo) {
    Directory from = new Directory(pathFrom);
    if (!from.existsSync()) {
      return new Future.error(
          "Given source directory $pathFrom doesn't exist.");
    }

    Directory to = new Directory(pathTo);
    if (!to.existsSync()) {
      to.createSync(recursive: true);
    } else {
      return new Future.error(
          "Folder $pathTo already exists. Please use different folder name.");
    }

    from.listSync(recursive: false, followLinks: false)
      .forEach((FileSystemEntity entity) {
        if (entity is File) {
          _copyFileSync(entity.path, p.join(pathTo, p.basename(entity.path)));
        } else if (entity is Directory) {
          _copyProjectFilesSync(
              entity.path, p.join(pathTo, p.basename(entity.path)));
        } else {
          //nothing, we don't want to use symlinks
        }
    });

    return new Future.value("New project in $_path successfully created.");
  }

  /// Synchronously copies file from [pathFrom] to [pathTo].
  void _copyFileSync(String pathFrom, String pathTo) {
    File from = new File(pathFrom);
    File to = new File(pathTo);

    to.writeAsBytesSync(from.readAsBytesSync());
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
      List files = await _getEgbFiles(_path);
      ListQueue<File> queue = new ListQueue.from(files);
      buildFile(queue, completer);
    } catch(error) {
      completer.completeError(error);
    }

    return completer.future;
  }

  /// Returns every .egb file name in the given [path] as [Future].
  /// If no .egb file is found or more than one file, build fails.
  ///
  /// If [_fullDirectory] is true, builder is run on all .ebg files in directory.
  /// Without that only one .egb file to build in folder is allowed.
  Future _getEgbFiles(String path) {
    List files = [];

    if (p.extension(path).isNotEmpty) { //running on file
      if (p.extension(path) == EXTENSION) {
        File file = new File(path);
        if (!file.existsSync()) {
          return new Future.error(_OutputMessage.buildFailed("File $path doesn't exist."));
        }

        files = _hierarchy.create(fromFile: file);
        return new Future.value(files);
      } else {
        return new Future.error(
            _OutputMessage.buildFailed("File type of $path is not supported."));
      }
    }

    Directory from = new Directory(path);

    if (!from.existsSync()) {
      return new Future.error(_OutputMessage.buildFailed("Directory $path doesn't exist."));
    }

    files = _hierarchy.create(fromDirectory: from);

    if (files.isEmpty) {
      return new Future.error(
          _OutputMessage.buildFailed("No $EXTENSION file in this directory."));
    } else if (!_fullDirectory && files.length > 1) {
      return new Future.error(_OutputMessage.buildFailed(
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
  /// Filename of last built file.
  String _actualBuiltFileName;
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
      return new Future.error(
          "Given source directory $_path doesn't exist.");
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
        !isSourcesDirectory(masterFile.path) &&
        p.extension(masterFile.path) == EXTENSION &&
        _actualBuiltFileName != _getBuiltFileFromEgbFile(masterFile.path)) {//prevents cycle builds
        _actualBuiltFileName = _getBuiltFileFromEgbFile(masterFile.path);
        queue.add(masterFile);
        Completer completer = new Completer();
        buildFile(queue, completer).then((_) {
          _actualBuiltFileName = null;
        });
      }
    }, onError: print);
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
  Future buildFile(ListQueue queue, Completer completer) async {
    if (!_building && !_analyzing) {
      bool isError = false;
      File file = queue.removeFirst();
      _building = true;
      String pathDart;

      try {
        var process = await _runBuilder(file.path);
        await Future.wait([
          stdout.addStream(process.stdout),
          stderr.addStream(process.stderr)]);
        _building = false;
        pathDart = _getBuiltFileFromEgbFile(file.path);
      } catch(error) {
        isError = true;
      }

      if (!new File(pathDart).existsSync() || isError) {
        print(_OutputMessage.buildFailed());
        //failed but still try to build next one.
      } else {
        if (analyze) {
          _analyzing = true;

          var process = await _runAnalyzer(pathDart);
          await Future.wait([
            stdout.addStream(process.stdout),
            stderr.addStream(process.stderr)]);
          _analyzing = false;
        }
        print(_OutputMessage.buildSuccessfull());
      }

      return _buildFileOrComplete(queue, completer);
    }
  }

  /// Builds next file in [queue] or completes with success.
  Future _buildFileOrComplete(ListQueue queue, Completer completer) {
    if (queue.isEmpty) {
      completer.complete();
    } else {
      buildFile(queue, completer);
    }

    return completer.future;
  }

  /// Runs build.dart command line tool on given [path].
  Future _runBuilder(String path) async {
    print("Building $path...");
    /*try {
      Builder builder = await new Builder().readEgbFile(new File(path));
      return builder.writeDartFiles();
    } catch (e) {
      return new Future.error(e);
    }*/
    return Process.start("dart", [_getPathToBuildScript(), path]);
  }

  /// Runs dartanalyzer command line tool on given [path].
  Future _runAnalyzer(String path) {
    print("Running analyzer on $path...");
    return Process.start("dartanalyzer", [path]);
  }

  /// Returns built file name from .egb file or [:null:].
  String _getBuiltFileFromEgbFile(String path) {
    return Builder.getExtensionPathFromEgbPath(path, "dart",
    subdirectory: p.join(HTML_BOOK_ENTRYPOINT_PATH, HTML_BOOK_DART_PATH_FROM_ENTRYPOINT));
  }

  /// Returns path to build.dart script in the bin/ folder.
  String _getPathToBuildScript() {
    // For the pub run
    if (Platform.script.scheme.startsWith("http")) {
      return Platform.script.resolve("build.dart").toString();
    }

    // TODO potential problem on Windows.
    if (Platform.script.toFilePath().endsWith("bin/")) {
      return getPath("build.dart");
    }

    // For the test folder
    return getPath(
        "..${Platform.pathSeparator}bin${Platform.pathSeparator}build.dart");
  }
}
