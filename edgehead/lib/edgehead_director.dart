import 'package:edgehead/edgehead_simulation.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/storyline/storyline.dart';
import 'package:edgehead/ruleset/ruleset.dart';
import 'package:edgehead/writers_helpers.dart';

/// These are the rules that the director in the game will be using
/// whenever there is an idle moment.
Ruleset get edgeheadDirectorRuleset {
  int id = 100000;

  return Ruleset(
    Rule(id++, 1, false, (ApplicabilityContext c) {
      return $(c).isHurt(playerId);
    }, (ActionContext c) {
      final Storyline s = c.outputStoryline;
      s.addParagraph();
      s.add('I still hurt.', wholeSentence: true);
    }),
    Rule(id++, 0, false, (ApplicabilityContext c) {
      return true;
    }, (ActionContext c) {
      // Nothing here. Let's at least "log" this.
      c.outputWorld.recordCustom("director_no_rule_applicable");
    }),
  );
}
