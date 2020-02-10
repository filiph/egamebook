library edgehead.event_callbacks;

// ignore_for_file: type_annotate_public_apis
// ignore_for_file: non_constant_identifier_names

import 'package:edgehead/edgehead_ids.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:egamebook_builder/instance_serializer.dart';

part 'edgehead_event_callbacks_gather.gathered.dart';

/// Gathers [EventCallback] instances from this file and puts them
/// into the `edgehead_event_callbacks_gather.gathered.dart` file.
@GatherInstancesFrom(['lib/edgehead_event_callbacks_gather.dart'])
final InstanceSerializer<EventCallback> eventCallbackSerializer =
    _$eventCallbackSerializer;

final start_make_goblin_not_invincible = EventCallback((c, sim, w, s) {
  w.updateActorById(firstGoblinId, (b) => b.isInvincible = false);
});

final start_tamara_bellows = EventCallback((c, sim, w, s) {
  var goblin = w.getActorById(firstGoblinId);
  goblin.report(s, "<subject> {smirk<s>|chuckle<s>}", positive: true);
  var tamara = w.getActorById(tamaraId);
  if (!tamara.isAnimatedAndActive ||
      tamara.isUndead ||
      tamara.anatomy.isBlind) {
    // The rest of this event doesn't make sense if Tamara can't see or talk.
    return;
  }
  s.addParagraph();
  tamara.report(s, "<subject> bellow<s> in {frustration|anger}");
  tamara.report(s, '"I hate this place."', wholeSentence: true);
  s.addParagraph();
});
