import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/actor.dart';

ClosureActorAction pass = new ClosureActorAction("Stand off.", (_, __) => true,
    (Actor a, w, Storyline s) {
  if (a.isPlayer) {
    a.report(s, "<subject> stand<s> off");
  }
  return "${a.name} passes the opportunity";
}, (_, __, ___) {}, 1.0);
