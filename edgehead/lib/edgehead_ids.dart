/// This file contains ids of actors and events and other entities in the game.
///
/// Constants starting with `kb` (like `kbGoblins`) are "knowledge base" topic
/// constants. They should be used to check whether the player has heard
/// of or learned about a particular topic. Use these events with
/// [_HelperAccessor.hearAbout] and its sibling methods.
///
/// Constants starting with `ev` are names of custom events. Use them with
/// [WorldStateBuilder.recordCustom()].
library edgehead.ids;

part 'edgehead_ids_actors.dart';

const evDirectorNoRuleApplicable = "evDirectorNoRuleApplicable";

const evGoblinCampCleared = "evGoblinCampCleared";

const evJisadSeesUndeadLeroy = "evJisadSeesUndeadLeroy";

const kbBlindGuide = "kbBlindGuide";

const kbGoblinSmoke = "kbGoblinSmoke";

const kbGoblinsNearBleeds = "kbGoblinsNearBleeds";

const kbJisadHatesMagic = "kbJisadHatesMagic";

const kbKnightsLeaving = "kbKnightsLeaving";

const kbLeroy = "kbLeroy";

const kbLeroyKnowsGoblinSmoke = "kbLeroyKnowsGoblinSmoke";

const kbOrcsInPyramid = "kbOrcsInPyramid";

const kbTrader = "kbTrader";
