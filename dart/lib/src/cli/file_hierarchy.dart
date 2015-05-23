library egb_cli_file_hierarchy;

import 'dart:io';
import 'package:path/path.dart' as p;

/// The [FileHierarchy] class is a wrapper for saving created file hierarchy used
/// for making differences between master files and part files.
///
/// This is necessary because part files are never built alone, builder is
/// always run on their master file. So if we try to build part file, the master
/// file is searched and built.
///
/// Hierarchy is saved as [Map] [_files] where the key is always master file path
/// and value is [List] of part file paths. We are storing full paths as Strings
/// because it's easy to reconstruct back the [File] from full path.
class FileHierarchy {
  /// Allowed fileType
  String fileType = ".egb";
  /// Saved hierarchy of master and part files as a Map
  Map<String, List<String>> _files = {};

  /// Returns list of files of type [File] and extension [fileType]
  /// from [directoryFrom].
  List<File> listFiles(Directory directoryFrom) {
    return directoryFrom.listSync(recursive: true, followLinks: false)
        .where((entity)
            => entity is File && p.extension(entity.path) == fileType)
            .toList();
  }

  /// Creates hierarchy of files from [fromDirectory] or parent of [fromFile].
  ///
  /// Returns [List] of only master files.
  List<File> create({Directory fromDirectory, File fromFile}) {
    List<File> filesToRemove = [];
    // If we use exact file we need to still create hierarchy for parent folder
    if (fromDirectory == null) {
      fromDirectory = fromFile.parent;
    }

    List<File> files = listFiles(fromDirectory);

    // Builds hierarchy masterFile -> partFile
    for (int i = 0; i < files.length; i++) {
      if (isPartFile(files[i])) continue;

      for (int j = i + 1; j < files.length; j++) {
        File master = files[i];
        File part = files[j];

        // TODO we are not comparing full path,
        // so the files can be nested differently
        if (p.basenameWithoutExtension(part.path)
            .startsWith("${p.basenameWithoutExtension(master.path)}_")) {
          _add(master, part);
          filesToRemove.add(part);
          /*if (!files.contains(master)) { // add master file of the part file to files
            files.add(master);
          }*/
        }
      }
    }

    // When we are using one particular .egb file to build, we need to know
    // the master
    if (fromFile != null) {
      files = new List.from([getMasterFile(fromFile)]);
    } else {
      // Remove all part files from files in case of using directory
      for (File file in filesToRemove) {
        files.remove(file);
      }
    }

    return files;
  }

  /// Adds full path from File [part] into the [_files] map on [master] path key.
  ///
  /// The method also validates, if files have correct extension.
  void _add(File master, File part) {
    String masterPath = master.path;
    String partPath = part.path;

    if (p.extension(masterPath) == fileType &&
        p.extension(partPath) == fileType) {
      if (_files[masterPath] == null) {// the key is not in the map
        _files[masterPath] = []; // creates empty list for adding of parts
      }
      _files[masterPath].add(partPath);
    } else {
      throw new ArgumentError("File name provided is not an .egb file.");
    }
  }

  /// Returns if the given file is part file.
  bool isPartFile(File file) {
    bool value = false;

    for (List partFiles in _files.values) {
      if (partFiles.contains(file.path)) {
        value = true;
        break;
      }
    }

    return value;
  }

  /// Returns master file from given [file]. The master file is searched using
  /// the [_files] map which has to be created before;
  ///
  /// If the [file] is already a master file, it returns itself.
  File getMasterFile(File file) {
    File value = file;

    _files.forEach((String masterFile, List partFiles) {
      if (partFiles.contains(file.path)) {
        value = new File(masterFile);
      }
    });

    return value; //it is a master file
  }
}