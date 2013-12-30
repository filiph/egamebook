/**
 * This library allows authors to create game environment similar to those
 * found in Interactive Fiction (IF) like Zork. It takes inspiration from ZIL,
 * the language that Infocom created for their games in the 1980s. (If you're
 * interested, you can read the internal [Infocom manual for ZIL].)
 * 
 * [Infocom manual for ZIL]: http://www.xlisp.org/zil.pdf
 * 
 * The original ZIL is a dialect of Lisp and had great limitations for 
 * performance and memory reasons. These limitations are largely lifted. For
 * this reason, and for convenience of the author, this library is _not_
 * a recreation of the original ZIL. It is inspired by the capabilities of that
 * engine, because Infocom spent many years building games in it and improving
 * on it.
 * 
 * This library will not let you make IF. The egamebook play format is not
 * about writing text, it's about choosing options. But it should make it
 * possible for you to create living, simulated, explorable environments with
 * items in them, NPCs, wandering enemies, etc.
 * 
 * TODO: why ZIL and not Inform7, for example? hint: this is not IF
 * 
 * Canonical implementation:
 * 
 * * Rooms have their own pages with no text and only two script blocks.
 * * First script block includes the zil.update() call (things happen).
 * * Second script block only includes zil.createChoices(). This is important
 *   because we want Scripter to be able to save state (zil.update() could
 *   invalidate that save by changing state).
 * * The preferred style is to include a <variables> block on the page where
 *   the actual Zil implementation of the room is instantiated.
 *   
 *     <variables>
 *       zil = new Zil(this);
 *     </variables>
 *   
 *     ---
 *     livingRoom
 *     
 *     <variables>
 *       livingRoom = zil.rooms.add(new Room("livingRoom" ....));
 *     </variables>
 *     
 *     <script>
 *       zil.update();
 *     </script>
 *     
 *     <script>
 *       zil.createChoices();
 *     </script>
 */
library zil;

import 'package:egamebook/src/book/scripter.dart' show EgbScripter, Saveable, choice, echo, goto, gotoCalledRecently, throwIfNotInInitBlock; 
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
  
  Zil(this._scripter, [this.timeline]) {
    items = new ItemPool(this);
    rooms = new RoomNetwork(this);
    actors = new ActorSociety(this);
    player = new ZilPlayer(this, "player");
    if (timeline == null) timeline = new Timeline();
  }
  
  void update(int ticks, {bool describe: true}) {
    rooms._checkNetworkReady();
    if (_scripter != null) {
      try {
        player.setLocationFromCurrentPage();
      } on PageNotDefinedInZilException catch (e) {
        if (player.location == null) {
          throw e;  // Throw only if location has not been set yet. Otherwise,
                    // we assume the location set previously still applies.
        }
      }
    }
    player.location.update(ticks, describe: describe);
  }
  
  createChoices() {
    rooms._checkNetworkReady();
    player.createChoices();
  }

  String get className => "Zil";
  Map<String, dynamic> toMap() {
    Map<String,dynamic> map = new Map<String,dynamic>();
    map["timeline"] = timeline;
    map["items"] = items.toMap();
    map["actors"] = actors.toMap();
    print(map);
    return map;
  }
  void updateFromMap(Map<String, dynamic> map) {
    timeline.updateFromMap(map["timeline"]);
    items.updateFromMap(map["items"]);
    actors.updateFromMap(map["actors"]);
  }
}
