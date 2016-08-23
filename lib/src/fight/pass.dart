import 'package:stranded/action.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/world.dart';
import 'package:stranded/storyline/storyline.dart';
import 'off_balance_opportunity_situation.dart';

var pass = new ClosureActorAction("Pass.", (_, __) => true, (a, w, s) {
  return "${a.name} passes the opportunity";
}, (_, __, ___) {}, 1.0);
