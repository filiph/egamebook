part of zil;

class ZilException implements Exception {
  final String message;
  ZilException(this.message) : super();
  toString() => "ZIL Exception: $message";
}