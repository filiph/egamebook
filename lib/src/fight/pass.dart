import 'package:stranded/action.dart';

var pass = new ClosureActorAction("Pass.", (_, __) => true, (a, w, s) {
  return "${a.name} passes the opportunity";
}, (_, __, ___) {}, 1.0);
