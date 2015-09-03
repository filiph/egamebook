/**
 * This library allows authors to create game environment similar to those
 * found in Interactive Fiction (IF) like Zork. It takes inspiration from ZIL,
 * the language that Infocom created for their games in the 1980s. (If you're
 * interested, you can read the internal [Infocom manual for ZIL].)
 * 
 * [Infocom manual for ZIL]: http://www.xlisp.org/zil.pdf
 * 
 * The original ZIL was a dialect of Lisp and had great limitations for 
 * performance and memory reasons. These limitations are largely lifted. For
 * this reason, and for convenience of the author, this library is _not_
 * a recreation of the original ZIL. It is inspired by the capabilities of that
 * engine, because Infocom spent many years building games in it and improving
 * on it.
 * 
 * This library will not let you make IF. The egamebook play format is not
 * about _writing text_, it's about _choosing options_. Nevertheless, the 
 * library should make it possible for you to create living, simulated,
 * explorable environments with items in them, NPCs, wandering enemies, etc.
 * 
 * Side note: Why is this library not inspired by a more modern IF technology,
 * like Inform7, for example? Because these libraries are (understandably) much
 * better suited and optimized for the text input of Interactive Fiction. In
 * contrast, the original ZIL laid the basics of any exploration-based game:
 * rooms, exits, items, NPCs. And it did so while being a relatively simple,
 * code-driven architecture (in contrast with the complex, plain English-driven
 * architecture of Inform7 and the like).
 * 
 * Canonical implementation:
 * 
 * * Rooms have their own pages with no text and only two script blocks.
 * * First script block includes the [:zil.update():] call (things happen).
 * * Second script block only includes [:zil.createChoices():]. This is 
 *   important because we want [EgbScripter] to be able to save state 
 *   ([:zil.update():] could invalidate that save by changing state).
 * * The preferred style is to include a [:<variables>:] block on the page where
 *   the actual Zil implementation of the room is instantiated.
 *   
 * Example use:
 * 
 *     <variables>
 *       zil = new Zil(this);
 *     </variables>
 *   
 *     ---
 *     livingRoom
 *     
 *     <variables>
 *       new Room(zil, "livingRoom" ....));
 *     </variables>
 *     
 *     <script>
 *       zil.update();
 *     </script>
 *     
 *     <script>
 *       zil.createChoices();  // Needs to be in a separate script block
 *                             // so that no state change happens on
 *                             // showing the choices (would break save/load).
 *     </script>
 */
library zil;

import 'package:egamebook/scripter.dart'
    show
        EgbScripter,
        Saveable,
        choice,
        echo,
        goto,
        gotoCalledRecently,
        throwIfNotInInitOrDeclareBlock;
import 'storyline.dart';
import 'dart:collection';
import 'package:a_star/a_star.dart';
import 'dart:math' as Math;
import 'timeline.dart';

part 'zil_room.dart';
part 'zil_exit.dart';
part 'zil_roomnetwork.dart';
part 'zil_item.dart';
part 'zil_itempool.dart';
part 'zil_actor.dart';
part 'zil_aiactor.dart';
part 'zil_goal.dart';
part 'zil_actorsociety.dart';
part 'zil_action.dart';
part 'zil_exception.dart';
part 'zil_saveable.dart';

class Zil implements Saveable {
  EgbScripter _scripter;

  /**
   * The global instance of [RoomNetwork]. Most games will only utilize one
   * RoomNetwork.
   */
  RoomNetwork rooms;

  /// The player.
  ZilPlayer player;

  /// All other actors.
  ActorSociety actors;

  /// All the items.
  ItemPool items;

  /// Timeline
  Timeline timeline;

  /// Create Zil with a pointer to the [EgbScripter] instance and, optionally,
  /// a pre-existing [Timeline].
  Zil(this._scripter, [this.timeline]) {
    items = new ItemPool(this);
    rooms = new RoomNetwork(this);
    actors = new ActorSociety(this);
    player = new ZilPlayer(this, "player");
    if (timeline == null) timeline = new Timeline();
  }

  /// Move time forward by [ticks]-amount of time units. When [describe] is
  /// [:true:], the method will generate text output. Otherwise, it will just
  /// silently simulate.
  ///
  /// If [interactive] is [:true:] (default), the last tick is considered
  /// interactive, which means that [TimedEvent.MAJOR] events from [timeline]
  /// can occur on the last tick. Otherwise, these events (and every other
  /// events that are scheduled after them) are shifted until just after
  /// [Timeline.time] + [ticks]. Set to [:false:] when inside a 'scripted'
  /// event that you don't want to be interrupted by major events.
  ///
  /// The [timeline] output is always shown.
  void update(int ticks,
      {bool describe: true, bool interactive: true, String whileString}) {
    rooms._checkNetworkReady();
    if (_scripter != null) {
      try {
        player.setLocationFromCurrentPage();
      } on PageNotDefinedInZilException catch (e) {
        // zil.update was called on a ScripterPage that doesn't have an
        // associated Room. This can be just the author trying to elapse
        // time during an Action.Goto (okay), but it could also be that
        // they forgot to instantiate the Room or the pagenames don't match.
        if (player.location == null) {
          throw e; // Throw only if no location has not been set yet, ever.
          // Otherwise, we assume the location set previously still
          // applies.
        }
      }
    }
    player.location.update(ticks,
        describe: describe, interactive: interactive, whileString: whileString);
  }

  /// Creates choices for the [player] in the current [Room] and given the
  /// present [Item]s and [AIActor]s.
  ///
  /// Call this from a separate [:<script>:] block than [update] --- while
  /// [update] can change state, a script block that generates choices can not
  /// be changing any state. It would break the save/load contract. (Because
  /// when loading, the choice-generating block is executed, and so some state
  /// would be changed twice.)
  createChoices() {
    rooms._checkNetworkReady();
    player.createChoices();
  }

  String get className => "Zil";
  Map<String, dynamic> toMap() {
    Map<String, dynamic> map = new Map<String, dynamic>();
    map["timeline"] = timeline;
    map["items"] = items.toMap();
    map["actors"] = actors.toMap();
    map["rooms"] = rooms.toMap();
    return map;
  }
  void updateFromMap(Map<String, dynamic> map) {
    timeline.updateFromMap(map["timeline"]);
    items.updateFromMap(map["items"]);
    actors.updateFromMap(map["actors"]);
    rooms.updateFromMap(map["rooms"]);
  }
}
