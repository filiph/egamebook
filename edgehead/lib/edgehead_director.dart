library edgehead_director;

import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/ruleset/ruleset.dart';
import 'package:edgehead/stateful_random/stateful_random.dart';
import 'package:edgehead/writers_helpers.dart';

import 'edgehead_ids.dart';

part 'director/environmental/karl_heard.dart';
part 'director/situational/darg_leaves_crowdsource.dart';
part 'director/situational/leroy_quits.dart';
part 'director/situational/player_hurts.dart';
part 'director/temporal/caravan_arrival.dart';
part 'director/temporal/caravan_departure.dart';
part 'director/temporal/orc_offensive.dart';
part 'director/temporal/quake_1.dart';
part 'director/temporal/quake_2.dart';
part 'director/temporal/quake_3.dart';

/// A special actor responsible for changing the state of the world at given
/// opportunities, moving the world forward. A "hand of god".
///
/// Not that [Actor.isDirector] is `true`, which means that the director
/// will not participate in normal gameplay.
final Actor edgeheadDirector = Actor.initialized(
  directorId,
  StatefulRandom(directorId + ~42).next,
  "DIRECTOR",
  isDirector: true,
);

final DateTime edgeheadStartingTime = DateTime.utc(1294, 5, 9, 10, 0);

final _default = Rule(_id++, 0, false, (ApplicabilityContext c) {
  return true;
}, (ActionContext c) {
  // Nothing here. Let's at least "log" this.
  c.outputWorld.recordCustom(evDirectorNoRuleApplicable);

  // For now, also write out the time.
  final debugTime = c.world.time.difference(edgeheadStartingTime);
  c.outputStoryline.addParagraph();
  c.outputStoryline.add(
      '(DEBUG: It is ~${debugTime.inMinutes} minutes after I arrived.)',
      isRaw: true);
});

int _id = 100000;

/// These are the rules that the director in the game will be using
/// whenever there is an idle moment.
Ruleset get edgeheadDirectorRuleset {
  return Ruleset.unordered([
    // Situational.
    _default,
    _playerHurt,
    _dargLeavesCrowdsource,
    _leroyQuits,
    // Environmental.
    _karlHeardFirstTime,
    // Temporal.
    _quake1,
    _quake1FromAbove,
    _caravanArrival,
    _quake2,
    _quake2FromAbove,
    _caravanDeparture,
    _orcOffensive,
    _quake3,
    _quake3FromAbove,
  ]);
}
