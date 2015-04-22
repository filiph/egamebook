library egb_cli;

import 'dart:async';
import 'dart:io';
import 'package:path/path.dart' as p;
import 'package:watcher/watcher.dart';

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

  /// Runs egamebook builder on found .egb file.
  Future run() {
    Completer completer = new Completer();

    getEgbFile(_path).then((filePath) {
      print("Starting build $filePath...");
      Process.start("dart", [getPathToBuildScript(), filePath])
        .then((process) {
          Future.wait([
            stdout.addStream(process.stdout),
            stderr.addStream(process.stderr)])
              .then((_) => completer.complete("BUILD SUCCESSFULL!"))
              .catchError(completer.completeError);
      });
    }).catchError(completer.completeError);

    return completer.future;
  }

  /// Returns first .egb file name in the given [path] as [Future].
  /// If no .egb file is found, build fails.
  Future getEgbFile(String path) {
    String filePath;
    Directory from = new Directory(path);

    if (!from.existsSync()) {
      return new Future.error("BUILD FAILED!\nDirectory $path doesn't exist.");
    }

    List files = from.listSync(recursive: true, followLinks: false);
    for (var entity in files) {
      if (entity is File && p.extension(entity.path) == extension) {
        filePath = entity.path;
        break;
      }
    }

    if (filePath == null) {
      return new Future.error(
          "BUILD FAILED!\nNo $extension file in this directory.");
    }

    return new Future.value(filePath);
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
  final String ignoredExtension = ".html.dart";
  /// Path used for watching
  final String _path;
  String _actualPath = "";
  String _lastPath = "";

  /// Constructor
  ProjectWatcher(List params)
      : _path = (params.isEmpty) ? "." : params.first;

  //TODO needs more care
  //TODO when files which I am changing are changed again and generate others.
  /// Runs builder after each file change.
  Future run() {
    DirectoryWatcher watcher = new DirectoryWatcher(_path);
    watcher.events.listen((WatchEvent event) {
      print(event);
      print(p.basename(event.path));
      print("$_actualPath$ignoredExtension");

      if (extensions.contains(p.extension(event.path)) &&
          p.basename(event.path) != "$_actualPath$ignoredExtension" &&
          p.basename(event.path) != _lastPath) {
        print("BUILDING");
        print("${p.basename(event.path)} changed.");
        _actualPath = p.basenameWithoutExtension(event.path);
        _lastPath = p.basename(event.path);
        Process.start("dart", [getPathToBuildScript(), event.path])
          .then((process) {
            Future.wait([
              stdout.addStream(process.stdout),
              stderr.addStream(process.stderr)])
              .then((_) {
                print("BUILD SUCCESSFULL!");
                new Future.delayed(new Duration(seconds: 1), () {
                  _actualPath = "";
                  _lastPath = ""; //lastPath gets invalidated after 1 sec
                });
            });
        });
      }
    }, onError: print);

    return new Future.value("Watching for changes in project...");
  }
}
