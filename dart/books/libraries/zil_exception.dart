part of zil;

class ZilException implements Exception {
  final String message;
  ZilException(this.message) : super();
  toString() => "ZIL Exception: $message";
}

class NullInOptionalParametersList extends ZilException {
  NullInOptionalParametersList(String className, String objectBeingCreated, 
      String optionalParameterName) : super("Trying to assign a null item to "
          "$className object '$objectBeingCreated'. Make sure all the "
          "variables in the `$optionalParameterName: [...]` optional parameter "
          "actually exist.");
}

class PageNotDefinedInZilException extends ZilException {
  PageNotDefinedInZilException(String pageName) : super("Page '$pageName' "
      "is not defined in ZIL. Define it in a <variable> block with "
      "zil.addRoom(new Room ...).");
}