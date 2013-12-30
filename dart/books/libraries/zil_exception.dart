part of zil;

class ZilException implements Exception {
  final String message;
  ZilException(this.message) : super();
  toString() => "ZIL Exception: $message";
}

class PageNotDefinedInZilException extends ZilException {
  PageNotDefinedInZilException(String pageName) : super("Page '$pageName' "
      "is not defined in ZIL. Define it in a <variable> block with "
      "zil.addRoom(new Room ...).");
}