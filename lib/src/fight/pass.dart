import 'package:stranded/action.dart';
import 'package:stranded/storyline/storyline.dart';
import 'package:stranded/actor.dart';

var pass = new ClosureActorAction("Stand firm.", (_, __) => true,
    (Actor a, w, Storyline s) {
  if (a.isPlayer) {
    a.report(
        s,
        "<subject> {stand<s> firm|plant<s> <subject's> feet|"
        "<does>n't move}");
  }
  return "${a.name} passes the opportunity";
}, (_, __, ___) {}, 1.0);
