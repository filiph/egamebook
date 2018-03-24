import 'package:logging/logging.dart';

final Logger _log = new Logger("escape_dollar_sign");

String escapeDollarSign(String s) {
  if (s.contains(r'$')) {
    _log.warning("String contains a dollar sign: '''$s'''");
  }
  return s?.replaceAll(r'$', r"(DOLLAR_SIGN)");
}
