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
part 'edgehead_ids_items.dart';

const evDeathlessRespectGained = "evDeathlessRespectGained";

const evDirectorNoRuleApplicable = "evDirectorNoRuleApplicable";

const evGoblinCampCleared = "evGoblinCampCleared";

const evJisadSeesUndeadLeroy = "evJisadSeesUndeadLeroy";

const evKarlGuardsKilled = "evKarlGuardsKilled";

const evKarlHeardFirstTime = "evKarlHeardFirstTime";

const evKarlKilled = "evKarlKilled";

const evKarlKilledViaNecromancy = "evKarlKilledViaNecromancy";

const evKeepDestroyedGate = "evKeepDestroyedGate";

const evKeepUnlockedGate = "evKeepUnlockedGate";

const evOpenedDam = "evOpenedDam";

const evQuake1 = "evQuake1";

const kbBlindGuide = "kbBlindGuide";

const kbGoblinCampSmoke = "kbGoblinCampSmoke";

const kbJisadHatesMagic = "kbJisadHatesMagic";

const kbKeepGateUnlock = "kbKeepGateUnlock";

const kbKeepServantsLocation = "kbKeepServantsLocation";

const kbKnightsLeaving = "kbKnightsLeaving";

const kbLeroy = "kbLeroy";

const kbLeroyKnowsGoblinSmoke = "kbLeroyKnowsGoblinSmoke";

const kbOrcsInPyramid = "kbOrcsInPyramid";

const kbTrader = "kbTrader";
