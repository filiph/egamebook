/// This file contains ids of actors and events and other entities in the game.
///
/// Constants starting with `kb` (like `kbGoblins`) are "knowledge base" topic
/// constants. They should be used to check whether the player has heard
/// of or learned about a particular topic. Use these events with
/// [_HelperAccessor.hearAbout] and its sibling methods.
///
/// Constants starting with `ev` are names of custom events. Use them with
/// [WorldStateBuilder.recordCustom()].

// @dart=2.9

library edgehead.ids;

import 'package:edgehead/fractal_stories/actor.dart';

part 'edgehead_ids_actors.dart';
part 'edgehead_ids_events.dart';
part 'edgehead_ids_items.dart';
