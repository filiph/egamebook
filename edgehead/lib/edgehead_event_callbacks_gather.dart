library edgehead.event_callbacks;

// ignore_for_file: type_annotate_public_apis
// ignore_for_file: non_constant_identifier_names

import 'package:edgehead/edgehead_ids.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:egamebook_builder/instance_serializer.dart';

part 'edgehead_event_callbacks_gather.gathered.dart';

final amak_will_teach_you = EventCallback((c, sim, w, s) {
  var amak = w.getActorById(albinoGoblinId);

  amak.report(s, "<subject> bare<s> <subject's> teeth");
  s.addParagraph();
  amak.report(s, '“Amak will teach you to stay in your village,” he says.',
      wholeSentence: true);
  s.addParagraph();

  w.updateActorById(
      albinoGoblinId,
      (b) => b
        ..name = 'Amak'
        ..nameIsProperNoun = true
        ..adjective = null);
});

final battlefield_floor_have_that_scalp = EventCallback((c, sim, w, s) {
  final orc = w.getActorById(sixtyFiverOrcId);
  if (!orc.isAnimatedAndActive || orc.isUndead) {
    return;
  }

  orc.report(s, '<subject> growl<s>');
  s.addParagraph();
  s.add(
      '“Darg will get that scalp,” he says. '
      ' “One way or another.”',
      isRaw: true);
  s.addParagraph();
});

final battlefield_floor_spit = EventCallback((c, sim, w, s) {
  final goblin = w.getActorById(sixtyFiverGoblinId);
  if (!goblin.isAnimatedAndActive || goblin.isUndead) {
    return;
  }

  goblin.report(s, '<subject> spit<s> in my direction.', wholeSentence: true);
});

final big_o_realize = EventCallback((c, sim, w, s) {
  final bigO = w.getActorById(bigOId);

  s.addParagraph();
  bigO.report(s, "<subject> stare<s> at me with hatred", endSentence: true);
  s.add(
      'He says: “I hope you live just long enough to realize what '
      'a terrible choice you\'ve made.”',
      isRaw: true);
  s.addParagraph();
});

final big_o_shame = EventCallback((c, sim, w, s) {
  final bigO = w.getActorById(bigOId);

  bigO.report(s, "<subject> shake<s> <subject's> head, looking at me",
      endSentence: true);
  s.addParagraph();
  s.add('“Such a shame,” he says. “You would have been perfect.”', isRaw: true);
  s.addParagraph();
});

final darg_fight_berserk = EventCallback((c, sim, w, s) {
  final darg = w.getActorById(dargId);
  if (!darg.isAnimatedAndActive || darg.isUndead) {
    return;
  }

  s.addParagraph();
  s.add(
      "Darg's expression has been getting darker "
      "since the start of the fight. "
      "Now, he's in some kind of a battle trance.",
      isRaw: true);
  s.addParagraph();
});

final darg_fight_impressed = EventCallback((c, sim, w, s) {
  final darg = w.getActorById(dargId);
  if (!darg.isAnimatedAndActive || darg.isUndead) {
    return;
  }

  s.addParagraph();
  s.add(
      'Darg shows his teeth and pauses to observe me. '
      '“You fight better than you look,” he says.',
      isRaw: true);
  s.addParagraph();
});

/// Gathers [EventCallback] instances from this file and puts them
/// into the `edgehead_event_callbacks_gather.gathered.dart` file.
@GatherInstancesFrom(['lib/edgehead_event_callbacks_gather.dart'])
final InstanceSerializer<EventCallback> eventCallbackSerializer =
    _$eventCallbackSerializer;

final goblin_camp_thats_new = EventCallback((c, sim, w, s) {
  var scarFacedGoblin = w.getActorById(campLeaderGoblinId);

  if (!scarFacedGoblin.isAnimatedAndActive || scarFacedGoblin.isUndead) {
    // Bail out. The speaker is dead.
    return;
  }

  s.addParagraph();
  scarFacedGoblin.report(
      s, '''“Well, that's new,” <subject> say<s>. “Peasants attacking.”''',
      wholeSentence: true);
  s.addParagraph();
});

final gods_lair_stand_still = EventCallback((c, sim, w, s) {
  final berserker = w.getActorById(orcBerserkerId);
  if (!berserker.isAnimatedAndActive || berserker.isUndead) {
    return;
  }

  berserker.report(s, "<subject> wrinkle<s> <subject's> nose");
  s.addParagraph();
  s.add('“I said,” he bellows, “stand still.”', isRaw: true);
  s.addParagraph();
});

final jailer_fight_sarn_looking = EventCallback((c, sim, world, storyline) {
  storyline.addParagraph();
  storyline.add(
      "I look over at Sarn. He stopped working, "
      "but he’s not joining the fight. He just looks on.",
      isRaw: true);
  storyline.addParagraph();
});

final jailer_fight_spit = EventCallback((c, sim, w, s) {
  final jailer = w.getActorById(jailerId);

  jailer.report(s, '<subject> spit<s> on the floor, visibly out of breath',
      endSentence: true);
  s.addParagraph();
  s.add(
      '“I thought I’d make you an inmate,” he says. '
      '“But now I just want to kill you dead.” '
      'This somewhat improves his mood, and he shows his teeth.',
      isRaw: true);
  s.addParagraph();
});

final kobold_fight_not_fun = EventCallback((c, sim, w, s) {
  final kobold = w.getActorById(conetKoboldId);

  kobold.report(s, '<subject> fume<s>', endSentence: true);
  s.addParagraph();
  s.add('“This fighting,” he says, “is not as fun as I remembered it.”',
      isRaw: true);
  s.addParagraph();
});

final lady_hope_interested = EventCallback((c, sim, w, s) {
  var ladyHope = w.getActorById(ladyHopeId);

  ladyHope.report(s,
      '''Lady Hope moves her jaw in some uncanny approximation of interest.''',
      wholeSentence: true);
});

final lady_hope_worm = EventCallback((c, sim, w, s) {
  c.player.report(
      s,
      '<subject> notice<s> a worm wiggling just under the paper-thin surface '
      "of Lady Hope's skin",
      endSentence: true);
  s.add('At least _something_ is living in there.', wholeSentence: true);
});

final lizardman_good_fight = EventCallback((c, sim, w, s) {
  s.addParagraph();
  s.add(
      'The lizardman cackles — a strange, wet sound. '
      '“Good fffight,” he says. “For fffood such as yourself.”',
      isRaw: true);
  s.addParagraph();
});

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
  tamara.report(s, '“I hate this place.”', wholeSentence: true);
  s.addParagraph();
});
