library shipfight;

import '../../lib/src/book/scripter.dart';
import 'actor.dart';
import 'loopedevent.dart';
import 'storyline.dart';
import 'spaceship.dart';


class SpaceshipCombat extends LoopedEvent /* TODO implements Saveable */ {
  SpaceshipCombat({List<Spaceship> ships: const [], timeline}) 
      : super(actors: ships, timeline: timeline) {
    // Find the ship under player's control.
    ships.forEach((ship) {
      if (ship.pilot.isPlayer) playerSpaceship = ship;
    });
  }
  
  Spaceship playerSpaceship;
  int timeToNextInteraction = 0;
  
  void update() {
    actors.forEach((Spaceship ship) {
      ship.update();
    });
    
    // make sure the fight still needs to continue
    if (playerSpaceship != null && !playerSpaceship.isAlive) {
      finished = true;
      return;
    }
    if (!actors.any(
        (a) => a.isAlive && actors.any((b) => b.isAlive && b.team != a.team))) {
      // there are no opposing forces left
      finished = true;
      return;
    }
    
    if (timeToNextInteraction < 0) {
      _createChoices();
      timeToNextInteraction += 5; // TODO
    }
  }
  
  void _createChoices() {
    
  }
  
  /*
   * TODO: toMap, updateFromMap
   * - take care of assigning targets and other links between ships, pilots
   *   something like getCombatEntityByName(str) would be useful
   *   (maybe all saveables should have pointer to combat for this purpose)
   */
}





