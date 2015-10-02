part of zil;

/**
 * An interface for ZIL objects. It is _decidedly_ not [Saveable], because
 * only the [Zil] object is [Saveable]. The contents of the ZIL object are
 * saved inside the Zil object. This class merely helps with that.
 * 
 * If all Zil objects (such as [Room] and [Item]) were [Saveable], than any
 * helper variable (in [Scripter.vars]) used by the author would have its
 * state saved automatically, thus duplicating the effort (and the memory used)
 * by [Zil.toMap].
 */
abstract class ZilSaveable {
  Map<String, dynamic> toMap();
  void updateFromMap(Map<String, dynamic> map);
}
