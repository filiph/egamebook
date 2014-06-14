library shipfight;

import 'loopedevent.dart';
import 'spaceship.dart';
import 'timeline.dart';
import 'storyline.dart';


class SpaceshipCombat extends LoopedEvent /* TODO implements Saveable */ {
  SpaceshipCombat({List<Spaceship> ships: const [], Timeline timeline}) 
      : super(actors: ships, timeline: timeline) {
    // Find the ship under player's control.
    ships.forEach((ship) {
      if (ship.pilot.isPlayer) playerSpaceship = ship;
      ship.currentCombat = this;
    });
  }
  
  Spaceship playerSpaceship;
  Iterable<Spaceship> get spaceships => 
      actors.where((Actor actor) => actor is Spaceship);
  
  void update() {
    timeline.time++;
    for (Spaceship ship in actors) {
      // this trickles down to ship components and CombatMoves and pilots
      ship.update();
    }
    
    // make sure the fight still needs to continue
    if (playerSpaceship != null && !playerSpaceship.isAlive) {
      finished = true;
      return;
    }
    if (!actors.any(
        (a) => a.isAliveAndActive && 
               actors.any((b) => b.isAliveAndActive && b.team != a.team))) {
      // there are no opposing forces left
      finished = true;
      return;
    }
  }
  
  /// Call this after the combat is finished and you no longer need to inpect
  /// it.
  void close() {
    spaceships.forEach((Spaceship ship) {
      ship.currentCombat = null;
    });
  }
  
  /*
   * TODO: toMap, updateFromMap
   * - take care of assigning targets and other links between ships, pilots
   *   something like getCombatEntityByName(str) would be useful
   *   (maybe all saveables should have pointer to combat for this purpose)
   */
}





