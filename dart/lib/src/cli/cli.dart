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
class ProjectBuilder implements Worker {
  /// File extension which is searched
  final String extension = ".egb";
  /// Path used for search
  final String _path;

  ///Constructor
  ProjectBuilder(List params)
      : _path = (params.isEmpty) ? "." : params.first;

  /// Runs egamebook builder on found .egb files in [_path].
  /// The files are retrieved as a [List] which is then converted to
  /// [ListQueue] and then the build is run on every file in this queue.
  Future run() {
    Completer completer = new Completer();

    getEgbFiles(_path).then((List files) {
      ListQueue queue = new ListQueue.from(files);
      return buildFile(queue, completer);
    }).catchError(completer.completeError);

    return completer.future;
  }

  /// Builds recursively all files in [queue].
  /// If the queue is already empty, it competes with success.
  Future buildFile(ListQueue queue, Completer completer){
    File file = queue.removeFirst();
    print("Building $file...");

    Process.start("dart", [getPathToBuildScript(), file.path])
      .then((process) {
        Future.wait([
          stdout.addStream(process.stdout),
          stderr.addStream(process.stderr)])
            .then((_) {
              if (queue.isEmpty) {
                return completer.complete("BUILD SUCCESSFULL!");
              } else {
                buildFile(queue, completer);
              }
            }).catchError(completer.completeError);
    });

    return completer.future;
  }

  /// Returns every .egb file name in the given [path] as [Future].
  /// If no .egb file is found, build fails.
  Future getEgbFiles(String path) {
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
  Future run() {
    DirectoryWatcher watcher = new DirectoryWatcher(_path);

    var subscription = watcher.events.listen((WatchEvent event) {
      if (!_building &&
          !isSourcesDirectory(event.path) &&
          _isValidBuilderExtension(event.path) &&
          p.basename(event.path) != _generatedDartFileName) {
        // filename of .dart file from .egb file
        _generatedDartFileName = "${p.basenameWithoutExtension(event.path)}.dart";
        _building = true; // prevents problems with StreamSink

        print("Building ${p.basename(event.path)}.");

        /*Process.start("dart", [getPathToBuildScript(), event.path])
          .then((process) {
            Future.wait([
              stdout.addStream(process.stdout),
              stderr.addStream(process.stderr)])
              .then((_) {
                _building = false;
                print("BUILD SUCCESSFULL!");
                new Future.delayed(new Duration(seconds: 1), () {
                  // The value is saved only for small amount of time to prevent
                  // repeating builds on same .dart file.
                  // But we want to also have the possibility to update the file
                  // again by editing manually so it needs to be reseted.
                  _generatedDartFileName = null;
                });
            });
        });*/
      }
    }, onError: print);

    subscription.cancel();

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