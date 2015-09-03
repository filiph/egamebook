library egb_cli;

import 'dart:async';
import 'dart:io';
import 'dart:collection';
import 'file_hierarchy.dart';
import 'package:path/path.dart' as p;
import 'package:watcher/watcher.dart';
import 'package:egamebook/builder.dart';


const String DART_FILES_OUTPUT_SUBDIR = "web";

/// Returns path to build.dart script in the bin/ folder.
String getPathToBuildScript() {
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

/// Runs build.dart command line tool on given [path].
Future runBuilder(String path) async {
  print("Building $path...");
  try {
    Builder builder = await new Builder().readEgbFile(new File(path));
    return builder.writeDartFiles(subdirectory: DART_FILES_OUTPUT_SUBDIR);
  } catch (e) {
    return new Future.error(e);
  }
}

/// Runs dartanalyzer command line tool on given [path].
Future runAnalyzer(String path) {
  print("Running analyzer on $path...");
  return Process.start("dartanalyzer", [path]);
}

/// Returns built file name from .egb file or [:null:].
String getBuiltFileFromEgbFile(String path) {
  return Builder.getExtensionPathFromEgbPath(path, "dart",
      subdirectory: DART_FILES_OUTPUT_SUBDIR);
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
/// the build proccess is started.
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
class ProjectBuilder implements Worker {
  /// File extension which is searched.
  final String extension = ".egb";
  /// Path used for search.
  final String _path;
  /// If the built file should be analyzed.
  final bool _analyze;
  /// If the builder should run on all .egb files in directory.
  final bool _fullDirectory;
  /// File hierarchy for getting master file from part file.
  final FileHierarchy _hierarchy;

  /// Creates new ProjectBuilder with List of [params] and if [_analyze] and
  /// [_fullDirectory].
  ProjectBuilder(List params, this._analyze, this._fullDirectory)
      : _path = (params.isEmpty) ? "." : params.first,
        _hierarchy = new FileHierarchy();

  /// Runs egamebook builder on found .egb file in [_path].
  ///
  /// The files are retrieved as a [List] which is then converted to
  /// [ListQueue] and then the build is run on every file in this queue.
  Future run() async {
    Completer completer = new Completer();

    try {
      List files = await getEgbFiles(_path);
      ListQueue<File> queue = new ListQueue.from(files);
      _buildFile(queue, completer);
    } catch(e) {
      completer.completeError;
    }

    return completer.future;
  }

  /// Builds recursively all files in [queue].
  /// If the queue is already empty, it competes with success.
  /// If analyzer option is set, the analyzer is run after build.
  Future _buildFile(ListQueue queue, Completer completer) async {
    File file = queue.removeFirst();

    await runBuilder(file.path);
    String pathDart = getBuiltFileFromEgbFile(file.path);

    if (!new File(pathDart).existsSync()) {
      print("BUILD FAILED!\n");
      return _buildFileOrComplete(queue, completer); //but move to next
    }

    if (!_analyze) {
      print("BUILD SUCCESSFULL!\n");
      return _buildFileOrComplete(queue, completer);
    } else {
      var process = await runAnalyzer(pathDart);

      await Future.wait([
          stdout.addStream(process.stdout),
          stderr.addStream(process.stderr)]);

      print("BUILD SUCCESSFULL!\n");
      return _buildFileOrComplete(queue, completer);
    }

    return completer.future;
  }

  /// Builds next file in [queue] or completes with success.
  Future _buildFileOrComplete(ListQueue queue, Completer completer) {
    if (queue.isEmpty) {
      completer.complete("DONE.");
    } else {
      _buildFile(queue, completer);
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
      if (p.extension(path) == extension) {
        File file = new File(path);
        if (!file.existsSync()) {
          return new Future.error("BUILD FAILED!\nFile $path doesn't exist.");
        }
        files = _hierarchy.create(fromFile: file);
        return new Future.value(files);
      }
      return new Future.error(
          "BUILD FAILED!\nFile type of $path is not supported.");
    }

    Directory from = new Directory(path);

    if (!from.existsSync()) {
      return new Future.error("BUILD FAILED!\nDirectory $path doesn't exist.");
    }

    files = _hierarchy.create(fromDirectory: from);

    if (files.isEmpty) {
      return new Future.error(
          "BUILD FAILED!\nNo $extension file in this directory.");
    } else if (!_fullDirectory && files.length > 1) {
      return new Future.error(
          "BUILD FAILED!\nMore than one .egb file found in the directory.\n"
          "To run builder on more .egb files in directory than one .egb file "
          "use argument --full-directory or -f.");
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
class ProjectWatcher implements Worker {
  /// File extension watched.
  final String extension = ".egb";
  /// Path used for watching.
  final String _path;
  /// If the built file should be analyzed.
  final bool _analyze;
  /// Filename of last built file.
  String _actualBuiltFileName;
  /// If builder is building at the moment.
  bool _building = false;
  /// If analyzer is analyzing at the moment.
  bool _analyzing = false;
  /// Subscription to watcher events. Can be used to cancel watching.
  StreamSubscription _subscription;
  /// Getter returns [_subscription].
  StreamSubscription get subscription => _subscription;
  /// File hierarchy for getting master file from part file.
  final FileHierarchy _hierarchy;

  /// Creates new ProjectWatcher with List of [params] and if [_analyze].
  ProjectWatcher(List params, this._analyze)
      : _path = (params.isEmpty) ? "." : params.first,
        _hierarchy = new FileHierarchy();

  /// Runs builder after each file change.
  /// Builder regenerates files of only valid [extensions] and not from files
  /// in sources directory (bin/, lib/, web/).
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
    if (!new Directory(p.join(_path, DART_FILES_OUTPUT_SUBDIR)).existsSync()) {
      return new Future.error("Must run watcher on a directory that is a "
          "Dart web applications package (it must have "
          "$DART_FILES_OUTPUT_SUBDIR/, pubspec.yaml and all that).");
    }

    DirectoryWatcher watcher = new DirectoryWatcher(_path);
    ListQueue<File> queue = new ListQueue(); // queue of files
    _hierarchy.create(fromDirectory: directory);

    _subscription = watcher.events.listen((WatchEvent event) {
      File masterFile = _hierarchy.getMasterFile(new File(event.path));

      if (event.type != ChangeType.REMOVE &&
          !isSourcesDirectory(masterFile.path) &&
          p.extension(masterFile.path) == extension &&
          _actualBuiltFileName != getBuiltFileFromEgbFile(masterFile.path)) {//prevents cycle builds
        _actualBuiltFileName = getBuiltFileFromEgbFile(masterFile.path);

        queue.add(masterFile);
        _buildFile(queue);
      }
    }, onError: print);

    return new Future.value("Watching for changes in project...");
  }

  /// Builds first file in [queue] if nothing is building or analyzing at the
  /// moment.
  /// When build is finished, the next file in [queue] is retrieved, built
  /// and corresponding .dart file analyzed.
  Future _buildFile(ListQueue queue) async {
    if (!_building && !_analyzing) { //because of streams
      _building = true;
      // We run builder only on master file
      File masterFile = queue.removeFirst();

      await runBuilder(masterFile.path);
      String pathDart = getBuiltFileFromEgbFile(masterFile.path);

      _building = false;

      new Future.delayed(new Duration(milliseconds: 500), () {
        // The value is saved only for small amount of time to prevent
        // repeating builds on same file.
        // But we want to also have the possibility to update the file
        // again and again by editing manually so it needs to be reseted.
        _actualBuiltFileName = null;
      });

      if (!new File(pathDart).existsSync()) {
        print("BUILD FAILED!\n");
        _buildFileOrEnd(queue); //but try next one in queue
        return;
      }

      if (!_analyze) {
        print("BUILD SUCCESSFULL!\n");
        _buildFileOrEnd(queue);
      } else {
        _analyzing = true;

        var process = await runAnalyzer(pathDart);
        await Future.wait([
          stdout.addStream(process.stdout),
          stderr.addStream(process.stderr)]);

        _analyzing = false;

        print("BUILD SUCCESSFULL!\n");
        _buildFileOrEnd(queue);
      }
    }
  }

  /// Builds actual file path in [queue] or ends.
  void _buildFileOrEnd(ListQueue queue) {
    if (queue.isNotEmpty) {
      _buildFile(queue);
    }
  }
}
