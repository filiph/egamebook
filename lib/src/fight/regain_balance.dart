import 'package:stranded/action.dart';
import 'package:stranded/actor.dart';
import 'package:stranded/world.dart';
import 'package:stranded/storyline/storyline.dart';
import 'off_balance_opportunity_situation.dart';
import 'kick.dart';

var regainBalance = new ClosureActorAction(
    "Regain balance.", (Actor a, w) => a.pose == Pose.offBalance, (a, w, s) {
  if (a.isPlayer) {
    a.report(s, "<subject> regain<s> <object>",
        object: balance, positive: true);
  }
  w.updateActorById(a.id, (b) => b.pose = Pose.standing);
  return "${a.name} regains balance";
}, (_, __, ___) {}, 1.0);
