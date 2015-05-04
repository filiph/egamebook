library egb_cli;

import 'dart:async';
import 'dart:io';
import 'package:path/path.dart' as p;
import 'package:watcher/watcher.dart';
import 'dart:collection';

/// Returns path to build.dart script in the bin/ folder.
/// TODO probably will be rewritten.
/// TODO check on Windows
String getPathToBuildScript() {
  if (Platform.script.toFilePath().endsWith("bin/")) {
    return Platform.script.resolve("build.dart").toFilePath();
  }

  // TODO will this work on Windows?
  /// For the test folder
  return Platform.script.resolve(
      "..${Platform.pathSeparator}bin${Platform.pathSeparator}build.dart")
      .toFilePath();
}

// TODO maybe also test/
/// Returns if the path is within bin/, lib/ or web/ directory.
bool isSourcesDirectory(String path) {
  List segments = p.split(path);

  return segments.contains("bin") || segments.contains("lib") ||
      segments.contains("web");
}

/// Runs build.dart command line tool on given [path].
Future runBuilder(String path) {
  print("Building $path...");
  return Process.start("dart", [getPathToBuildScript(), path]);
}

/// Runs dartanalyzer command line tool on given [path].
Future runAnalyzer(String path) {
  print("Running analyzer on $path...");
  return Process.start("dartanalyzer", [path]);
}

/// Returns .dart built file for .egb file on given [path].
String getBuiltFileFromEgbFile(String path)  =>
    "${p.withoutExtension(path)}.dart";

/// Abstract class [Worker] is an interface for all worker classes
/// which process the commands.
abstract class Worker {
  Future run();
}

/// Class [ProjectCreator] creates new egamebook project by copying files
/// from templates directory.
class ProjectCreator implements Worker {
  /// Directory with template files
  final String templates = "books${Platform.pathSeparator}bodega";
  /// Path where the project is created
  final String _path;

  /// Constructor
  ProjectCreator(List params) : _path = params.first;

  /// Runs creating of new project
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
/// Builder can be launched in forms:
///   build
///   build .
///   build <path>
///   build <egb_file>
///   build -a
///   build -a .
///   build -a <path>
///   build -a <egb_file>
class ProjectBuilder implements Worker {
  /// File extension which is searched
  final String extension = ".egb";
  /// Path used for search
  final String _path;
  final bool _analyze;

  ///Constructor
  ProjectBuilder(List params, this._analyze)
      : _path = (params.isEmpty) ? "." : params.first;

  /// Runs egamebook builder on found .egb files in [_path].
  /// The files are retrieved as a [List] which is then converted to
  /// [ListQueue] and then the build is run on every file in this queue.
  Future run() {
    Completer completer = new Completer();

    getEgbFiles(_path).then((List files) {
      ListQueue queue = new ListQueue.from(files);
      return _buildFile(queue, completer);
    }).catchError(completer.completeError);

    return completer.future;
  }

  /// Builds recursively all files in [queue].
  /// If the queue is already empty, it competes with success.
  /// If analyzer option is set, the analyzer is run after build.
  Future _buildFile(ListQueue queue, Completer completer){
    File file = queue.removeFirst();
    runBuilder(file.path)
      .then((process) {
        Future.wait([
          stdout.addStream(process.stdout),
          stderr.addStream(process.stderr)])
            .then((_) {
              String pathDart = getBuiltFileFromEgbFile(file.path);

              if (!new File(pathDart).existsSync()) {
                print("BUILD FAILED!\n");
                return _buildFileOrComplete(queue, completer); //but move to next
              }

              if (!_analyze) {
                print("BUILD SUCCESSFULL!\n");
                return _buildFileOrComplete(queue, completer);
              } else {
                runAnalyzer(pathDart)
                  .then((process) {
                    Future.wait([
                      stdout.addStream(process.stdout),
                      stderr.addStream(process.stderr)])
                        .then((_) {
                          print("BUILD SUCCESSFULL!\n");
                          return _buildFileOrComplete(queue, completer);
                        });
                  });
               }
            }).catchError(completer.completeError);
    });

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
  /// If no .egb file is found, build fails.
  /// Works also for single file with extension .egb.
  Future getEgbFiles(String path) {

    if (p.extension(path).isNotEmpty) {
      if (p.extension(path) == extension) {
        File file = new File(path);
        if (!file.existsSync()) {
          return new Future.error("BUILD FAILED!\nFile $path doesn't exist.");
        }
        return new Future.value(new List.from([file]));
      }
      return new Future.error(
          "BUILD FAILED!\nFile type of $path is not supported.");
    }

    Directory from = new Directory(path);

    if (!from.existsSync()) {
      return new Future.error("BUILD FAILED!\nDirectory $path doesn't exist.");
    }

    List files = from.listSync(recursive: true, followLinks: false)
        .where((entity)
            => entity is File && p.extension(entity.path) == extension)
            .toList();

    if (files.isEmpty) {
      return new Future.error(
          "BUILD FAILED!\nNo $extension file in this directory.");
    }

    return new Future.value(files);
  }
}

/// Class [ProjectWatcher] watches for desired file types in the project
/// and runs builder after change on the file.
///
/// Watcher can be launched in forms:
///   watch
///   watch .
///   watch <path>
class ProjectWatcher implements Worker {
  /// File extensions watched
  final List extensions = [".egb", ".dart"];
  /// Extension which is not valid for building
  final String invalidExtension = ".html.dart";
  /// Path used for watching
  final String _path;
  /// Filename of last generated file from .egb file
  String _generatedDartFileName;
  /// If builder is building at the moment
  bool _building = false;
  /// Subscription to watcher events. Can be used to cancel watching
  StreamSubscription _subscription;
  /// Getter for [_subscription]
  StreamSubscription get subscription => _subscription;

  /// Constructor
  ProjectWatcher(List params)
      : _path = (params.isEmpty) ? "." : params.first;

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
  Future run() {
    DirectoryWatcher watcher = new DirectoryWatcher(_path);

    _subscription = watcher.events.listen((WatchEvent event) {
      if (!_building &&
          event.type != ChangeType.REMOVE &&
          !isSourcesDirectory(event.path) &&
          _isValidBuilderExtension(event.path) &&
          p.basename(event.path) != _generatedDartFileName) {
        // filename of .dart file from .egb file
        _generatedDartFileName = "${p.basenameWithoutExtension(event.path)}.dart";
        _building = true; // prevents problems with StreamSink

        runBuilder(event.path)
          .then((process) {
            Future.wait([
              stdout.addStream(process.stdout),
              stderr.addStream(process.stderr)])
              .then((_) {
                _building = false;
                print("BUILD SUCCESSFULL!\n");
                new Future.delayed(new Duration(seconds: 1), () {
                  // The value is saved only for small amount of time to prevent
                  // repeating builds on same .dart file.
                  // But we want to also have the possibility to update the file
                  // again by editing manually so it needs to be reseted.
                  _generatedDartFileName = null;
                });
            });
        });
      }
    }, onError: print);

    return new Future.value("Watching for changes in project...");
  }

  /// Returns if the extension of [path] is valid.
  /// In order to be valid it has to be in [extensions]
  /// and it can't be [invalidExtension].
  bool _isValidBuilderExtension(String path) {
    // .html.dart is not regular extension
    if (!extensions.contains(p.extension(path)) ||
        path.endsWith(invalidExtension)) {
      return false;
    }
    return true;
  }
}
