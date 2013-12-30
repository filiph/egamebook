part of zil;

/**
 * An interface for ZIL objects. It is _decidedly_ not [Saveable], because
 * only the [Zil] object is [Saveable]. The contents of the ZIL object are
 * saved inside the Zil object. This class merely helps with that.
 */
abstract class ZilSaveable {
  Map<String, dynamic> toMap();
  void updateFromMap(Map<String, dynamic> map);
}